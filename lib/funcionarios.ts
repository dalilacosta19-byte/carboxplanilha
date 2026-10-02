/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

// ---------- Tipos (iguais à tabela funcionarios do Supabase) ----------
export interface Func {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  cargo: string | null;
  papel: string;
  valor_diaria_cents: number | null;
  valor_fixo_cents: number | null;
  comissao_pct: number | null;
  ativo: boolean;
}
export type DadosFunc = Pick<Func, 'nome' | 'email' | 'telefone' | 'cargo' | 'valor_diaria_cents' | 'valor_fixo_cents' | 'comissao_pct' | 'ativo'>;

export async function listarFuncionarios(): Promise<Func[]> {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('id, nome, email, telefone, cargo, papel, valor_diaria_cents, valor_fixo_cents, comissao_pct, ativo')
    .order('ativo', { ascending: false })
    .order('nome');
  if (error) throw error;
  return ((data ?? []) as any[]).map((f) => ({ ...f, comissao_pct: f.comissao_pct == null ? null : Number(f.comissao_pct) }));
}

export async function atualizarFuncionario(id: string, dados: Partial<DadosFunc>): Promise<void> {
  const { error } = await supabase.from('funcionarios').update(dados).eq('id', id);
  if (error) throw error;
}

// ---------- Produção do mês ----------
// Comissões: vista comissoes_por_pagar (só conta OS já pagas; o mês é o do pagamento).
// Diárias: dias_trabalhados × valor da diária. Fixo: valor_fixo_cents.
export interface Producao {
  comissoes_cents: number;
  servicos: number;
  dias: number;
  detalhe: { os_codigo: string; comissao_cents: number; funcao: string }[];
}

// mes = "AAAA-MM"
export async function producaoDoMes(mes: string): Promise<Map<string, Producao>> {
  const inicio = `${mes}-01`;
  const [a, m] = mes.split('-').map(Number);
  const fim = new Date(Date.UTC(a, m, 1)).toISOString().slice(0, 10); // 1.º dia do mês seguinte
  const [com, dias] = await Promise.all([
    supabase.from('comissoes_por_pagar').select('funcionario_id, os_codigo, funcao, comissao_cents').eq('mes', inicio),
    supabase.from('dias_trabalhados').select('funcionario_id, fracao').gte('data', inicio).lt('data', fim),
  ]);
  if (com.error) throw com.error;
  if (dias.error) throw dias.error;
  const mapa = new Map<string, Producao>();
  const de = (id: string) => {
    if (!mapa.has(id)) mapa.set(id, { comissoes_cents: 0, servicos: 0, dias: 0, detalhe: [] });
    return mapa.get(id)!;
  };
  for (const c of (com.data ?? []) as any[]) {
    const p = de(c.funcionario_id);
    p.comissoes_cents += c.comissao_cents ?? 0;
    p.servicos += 1;
    p.detalhe.push({ os_codigo: c.os_codigo, comissao_cents: c.comissao_cents ?? 0, funcao: c.funcao });
  }
  for (const d of (dias.data ?? []) as any[]) de(d.funcionario_id).dias += Number(d.fracao);
  return mapa;
}

export function mesAtualLisboa(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon' }).format(new Date()).slice(0, 7);
}

// ---------- Criar ----------
// papel no banco: 'admin' | 'gerente' | 'funcionario'. Técnicos são 'funcionario'.
export async function criarFuncionario(dados: DadosFunc): Promise<void> {
  const { error } = await supabase.from('funcionarios').insert({ ...dados, papel: 'funcionario' });
  if (error) throw error;
}

// ---------- Adiantamentos ----------
// Um adiantamento é um movimento de saída (categoria 'adiantamento') ligado ao funcionário.
// Fica "pendente" até entrar num fecho do mês (tabela fecho_adiantamentos), onde é descontado.
export interface Adiantamento { id: string; funcionario_id: string; data: string; valor_cents: number; descricao: string | null; carteira: string }

export async function listarAdiantamentosPendentes(): Promise<Adiantamento[]> {
  const [mov, usados, cart] = await Promise.all([
    supabase.from('movimentos').select('id, funcionario_id, data, valor_cents, descricao, carteira_id').eq('categoria', 'adiantamento').eq('anulado', false).order('data'),
    supabase.from('fecho_adiantamentos').select('movimento_id'),
    supabase.from('carteiras').select('id, nome'),
  ]);
  for (const r of [mov, usados, cart]) if (r.error) throw r.error;
  const jaDescontados = new Set(((usados.data ?? []) as any[]).map((u) => u.movimento_id));
  const nomeCarteira = new Map<string, string>(((cart.data ?? []) as any[]).map((c) => [c.id, c.nome] as [string, string]));
  return ((mov.data ?? []) as any[])
    .filter((m) => !jaDescontados.has(m.id))
    .map((m) => ({ id: m.id, funcionario_id: m.funcionario_id, data: m.data, valor_cents: m.valor_cents, descricao: m.descricao, carteira: nomeCarteira.get(m.carteira_id) ?? '' }));
}

export async function registarAdiantamento(funcionarioId: string, nome: string, carteiraId: string, valorCents: number, data: string, nota: string): Promise<void> {
  const { error } = await supabase.from('movimentos').insert({
    carteira_id: carteiraId,
    data,
    sentido: 'saida',
    valor_cents: valorCents,
    categoria: 'adiantamento',
    descricao: nota.trim() ? `Adiantamento ${nome}: ${nota.trim()}` : `Adiantamento ${nome}`,
    funcionario_id: funcionarioId,
  });
  if (error) throw error;
}

// Não se apaga: anula-se com motivo (fica registado no livro-caixa).
export async function anularAdiantamento(id: string, motivo: string): Promise<void> {
  const { error } = await supabase.from('movimentos').update({ anulado: true, anulado_motivo: motivo }).eq('id', id);
  if (error) throw error;
}

// ---------- Fecho do mês ----------
// Um fecho junta, para um funcionário e um mês: diárias + fixo + comissões − adiantamentos (+ saldo anterior).
// As comissões e os adiantamentos que entram ficam ligados ao fecho (fecho_comissoes / fecho_adiantamentos),
// por isso deixam de aparecer como "por pagar" e nunca são pagos duas vezes.
// O pagamento é um movimento de saída (categoria 'salario') na carteira escolhida.
export type EstadoFecho = 'por_pagar' | 'pago' | 'sem_pagamento';
export interface Fecho {
  id: string; funcionario_id: string; mes: string; dias_trabalhados: number; diarias_cents: number; fixo_cents: number;
  comissoes_cents: number; adiantamentos_cents: number; saldo_anterior_cents: number; total_cents: number;
  estado: EstadoFecho; data_pagamento: string | null;
}
export interface ComissaoAberta { os_id: string; os_item_id: string; os_codigo: string; funcao: string; comissao_cents: number; mes: string }
export interface PreparacaoFecho { comissoes: ComissaoAberta[]; dias: number; adiantamentos: Adiantamento[]; saldo_anterior_cents: number }

export async function listarFechosDoMes(mes: string): Promise<Fecho[]> {
  const { data, error } = await supabase.from('fechos_funcionario').select('*').eq('mes', `${mes}-01`);
  if (error) throw error;
  return ((data ?? []) as any[]).map((f) => ({ ...f, dias_trabalhados: Number(f.dias_trabalhados) }));
}

export async function prepararFecho(funcionarioId: string, mes: string): Promise<PreparacaoFecho> {
  const inicio = `${mes}-01`;
  const [a, m] = mes.split('-').map(Number);
  const fim = new Date(Date.UTC(a, m, 1)).toISOString().slice(0, 10);
  const [com, dias, anterior, ads] = await Promise.all([
    // comissões ainda não fechadas deste mês e de meses anteriores
    supabase.from('comissoes_por_pagar').select('os_id, os_item_id, os_codigo, funcao, comissao_cents, mes').eq('funcionario_id', funcionarioId).lte('mes', inicio),
    supabase.from('dias_trabalhados').select('fracao').eq('funcionario_id', funcionarioId).gte('data', inicio).lt('data', fim),
    supabase.from('fechos_funcionario').select('total_cents, mes').eq('funcionario_id', funcionarioId).lt('mes', inicio).order('mes', { ascending: false }).limit(1),
    listarAdiantamentosPendentes(),
  ]);
  for (const r of [com, dias, anterior]) if (r.error) throw r.error;
  const ultimo = ((anterior.data ?? []) as any[])[0];
  return {
    comissoes: (com.data ?? []) as ComissaoAberta[],
    dias: ((dias.data ?? []) as any[]).reduce((s, d) => s + Number(d.fracao), 0),
    adiantamentos: ads.filter((x) => x.funcionario_id === funcionarioId),
    // se o último fecho ficou negativo (adiantou mais do que ganhou), essa dívida passa para este mês
    saldo_anterior_cents: ultimo && ultimo.total_cents < 0 ? ultimo.total_cents : 0,
  };
}

export function calcularFecho(f: Func, p: PreparacaoFecho, dias: number) {
  const diarias = Math.round(dias * (f.valor_diaria_cents ?? 0));
  const fixo = f.valor_fixo_cents ?? 0;
  const comissoes = p.comissoes.reduce((s, c) => s + c.comissao_cents, 0);
  const adiantamentos = p.adiantamentos.reduce((s, x) => s + x.valor_cents, 0);
  const total = diarias + fixo + comissoes - adiantamentos + p.saldo_anterior_cents;
  return { diarias, fixo, comissoes, adiantamentos, total };
}

async function pagarComMovimento(fechoId: string, nome: string, mes: string, funcionarioId: string, totalCents: number, carteiraId: string, data: string) {
  const { data: mov, error } = await supabase.from('movimentos').insert({
    carteira_id: carteiraId, data, sentido: 'saida', valor_cents: totalCents, categoria: 'salario',
    descricao: `Pagamento ${nome} (${mes})`, funcionario_id: funcionarioId,
  }).select('id').single();
  if (error) throw error;
  const { error: e2 } = await supabase.from('fechos_funcionario')
    .update({ estado: 'pago', carteira_id: carteiraId, data_pagamento: data, movimento_id: mov.id }).eq('id', fechoId);
  if (e2) {
    await supabase.from('movimentos').delete().eq('id', mov.id);
    throw e2;
  }
}

// Cria o fecho. Se vier "pagar", regista logo o pagamento. Se algo falhar, desfaz tudo.
export async function fecharMes(f: Func, mes: string, p: PreparacaoFecho, dias: number, notas: string, pagar: { carteira_id: string; data: string } | null): Promise<void> {
  const c = calcularFecho(f, p, dias);
  const { data: fecho, error } = await supabase.from('fechos_funcionario').insert({
    funcionario_id: f.id, mes: `${mes}-01`, dias_trabalhados: dias, diarias_cents: c.diarias, fixo_cents: c.fixo,
    comissoes_cents: c.comissoes, adiantamentos_cents: c.adiantamentos, saldo_anterior_cents: p.saldo_anterior_cents,
    total_cents: c.total, estado: c.total > 0 ? 'por_pagar' : 'sem_pagamento', notas: notas.trim() || null,
  }).select('id').single();
  if (error) throw error;
  try {
    if (p.comissoes.length) {
      const { error: e1 } = await supabase.from('fecho_comissoes').insert(p.comissoes.map((x) => ({
        fecho_id: fecho.id, os_id: x.os_id, os_item_id: x.os_item_id, funcionario_id: f.id, funcao: x.funcao, comissao_cents: x.comissao_cents,
      })));
      if (e1) throw e1;
    }
    if (p.adiantamentos.length) {
      const { error: e2 } = await supabase.from('fecho_adiantamentos').insert(p.adiantamentos.map((x) => ({
        fecho_id: fecho.id, movimento_id: x.id, valor_cents: x.valor_cents,
      })));
      if (e2) throw e2;
    }
    if (pagar && c.total > 0) await pagarComMovimento(fecho.id, f.nome, mes, f.id, c.total, pagar.carteira_id, pagar.data);
  } catch (erro) {
    await supabase.from('fecho_comissoes').delete().eq('fecho_id', fecho.id);
    await supabase.from('fecho_adiantamentos').delete().eq('fecho_id', fecho.id);
    await supabase.from('fechos_funcionario').delete().eq('id', fecho.id);
    throw erro;
  }
}

// Pagar um fecho que ficou "por pagar".
export async function pagarFecho(fecho: Fecho, nome: string, carteiraId: string, data: string): Promise<void> {
  await pagarComMovimento(fecho.id, nome, fecho.mes.slice(0, 7), fecho.funcionario_id, fecho.total_cents, carteiraId, data);
}
