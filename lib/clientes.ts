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

// ---------- Telefones e WhatsApp ----------
// Telefone 1: sempre de Portugal. Guarda-se só os 9 dígitos (ex.: "912345678"); o +351 é fixo no ecrã.
// Telefone 2: livre. Se for de outro país começa por + e o indicativo (ex.: "+41 79 123 45 67").

export const soDigitos = (t: string) => t.replace(/\D/g, '');

// Aceita "912 345 678", "+351 912345678" ou "00351912345678" e devolve "912345678" (ou null se inválido).
export function limparTelefonePT(texto: string): string | null {
  let d = soDigitos(texto);
  if (d.startsWith('00351')) d = d.slice(5);
  else if (d.startsWith('351') && d.length === 12) d = d.slice(3);
  return /^[29]\d{8}$/.test(d) ? d : null;
}

// Telefone 2: devolve o número pronto a guardar, ou null se inválido.
export function limparTelefoneLivre(texto: string): string | null {
  const t = texto.trim();
  if (t.startsWith('+') || t.startsWith('00')) {
    const d = soDigitos(t).replace(/^00/, '');
    return d.length >= 7 && d.length <= 15 ? `+${d}` : null;
  }
  return limparTelefonePT(t); // sem indicativo: assume Portugal
}

// "912345678" -> "+351 912 345 678"
export function mostrarTelefone(guardado: string | null): string {
  if (!guardado) return '';
  if (guardado.startsWith('+')) return guardado;
  const d = soDigitos(guardado);
  return d.length === 9 ? `+351 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : guardado;
}

// Número no formato que o WhatsApp precisa (só dígitos, com indicativo do país).
export function numeroWhatsApp(guardado: string): string {
  if (guardado.startsWith('+')) return soDigitos(guardado);
  return `351${soDigitos(guardado)}`;
}

export function abrirWhatsApp(guardado: string, texto: string) {
  window.open(`https://wa.me/${numeroWhatsApp(guardado)}?text=${encodeURIComponent(texto)}`, '_blank');
}
