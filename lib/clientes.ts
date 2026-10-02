import { supabase } from '@/lib/supabase';

// Formato das linhas tal como estão no Supabase (tabelas clientes e veiculos).
export interface Veiculo {
  id: string;
  cliente_id: string;
  matricula: string;
  modelo: string | null;
  ano: number | null;
  cor: string | null;
  notas: string | null;
  criado_em: string;
}

export interface Cliente {
  id: string;
  nome: string;
  apelido: string | null;
  telefone: string;
  telefone2: string | null;
  email: string | null;
  notas: string | null;
  ativo: boolean;
  criado_em: string;
  veiculos: Veiculo[];
}

export type DadosCliente = Pick<Cliente, 'nome' | 'apelido' | 'telefone' | 'telefone2' | 'email' | 'notas'>;
export type DadosVeiculo = Pick<Veiculo, 'matricula' | 'modelo' | 'ano' | 'cor' | 'notas'>;

const PAGINA = 1000;

async function lerTudo<T>(tabela: string, ordem: string): Promise<T[]> {
  const linhas: T[] = [];
  for (let inicio = 0; ; inicio += PAGINA) {
    const { data, error } = await supabase
      .from(tabela)
      .select('*')
      .order(ordem)
      .range(inicio, inicio + PAGINA - 1);
    if (error) throw error;
    linhas.push(...((data ?? []) as T[]));
    if (!data || data.length < PAGINA) break;
  }
  return linhas;
}

// Lê todos os clientes e junta a cada um os seus veículos.
export async function listarClientes(): Promise<Cliente[]> {
  const [clientes, veiculos] = await Promise.all([
    lerTudo<Omit<Cliente, 'veiculos'>>('clientes', 'nome'),
    lerTudo<Veiculo>('veiculos', 'matricula'),
  ]);
  const porCliente = new Map<string, Veiculo[]>();
  for (const v of veiculos) {
    const lista = porCliente.get(v.cliente_id) ?? [];
    lista.push(v);
    porCliente.set(v.cliente_id, lista);
  }
  return clientes.map((c) => ({ ...c, veiculos: porCliente.get(c.id) ?? [] }));
}

// "az 91 gi" -> "AZ-91-GI"
export function normalizarMatricula(texto: string): string {
  return texto.trim().toUpperCase().replace(/\s+/g, '-');
}

// Texto vazio passa a null (para as colunas opcionais ficarem vazias no banco).
export const ouNulo = (t: string | null | undefined): string | null => {
  const limpo = (t ?? '').trim();
  return limpo === '' ? null : limpo;
};

export async function criarCliente(dados: DadosCliente, veiculo: DadosVeiculo): Promise<void> {
  const { data, error } = await supabase.from('clientes').insert(dados).select('id').single();
  if (error) throw error;
  const { error: erroVeiculo } = await supabase.from('veiculos').insert({ ...veiculo, cliente_id: data.id });
  if (erroVeiculo) {
    // Se o veículo falhar (ex.: matrícula repetida), desfaz o cliente para não ficar incompleto.
    await supabase.from('clientes').delete().eq('id', data.id);
    throw erroVeiculo;
  }
}

export async function atualizarCliente(id: string, dados: Partial<DadosCliente> & { ativo?: boolean }): Promise<void> {
  const { error } = await supabase.from('clientes').update(dados).eq('id', id);
  if (error) throw error;
}

export async function adicionarVeiculo(clienteId: string, veiculo: DadosVeiculo): Promise<void> {
  const { error } = await supabase.from('veiculos').insert({ ...veiculo, cliente_id: clienteId });
  if (error) throw error;
}

export async function atualizarVeiculo(id: string, veiculo: DadosVeiculo): Promise<void> {
  const { error } = await supabase.from('veiculos').update(veiculo).eq('id', id);
  if (error) throw error;
}

// Traduz os erros mais comuns do banco para português.
export function mensagemErro(erro: unknown): string {
  const e = erro as { code?: string; message?: string };
  if (e?.code === '23505') return 'Já existe um registo com estes dados (provavelmente a matrícula já está registada).';
  if (e?.code === '42501') return 'Sem permissão para esta ação. Só o administrador pode criar ou alterar clientes.';
  if (e?.code === '23514') return 'Algum campo tem um valor que o banco não aceita (ex.: ano ou matrícula fora do formato).';
  if (e?.code === '23502') return 'Falta preencher um campo obrigatório.';
  return `Não foi possível concluir. ${e?.message ?? ''}`.trim();
}
