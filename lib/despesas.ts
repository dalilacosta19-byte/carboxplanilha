/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

// ---------- Tipos (iguais à tabela despesas do Supabase) ----------
// tipo: 'fixa' (renda, luz…) | 'variavel' (material, pintor…)
// estado: 'pendente' | 'paga' | 'anulada'
// Quando está paga, o dinheiro sai de uma carteira: isso é um movimento de saída (categoria 'despesa').
export type TipoDespesa = 'fixa' | 'variavel';
export type EstadoDespesa = 'pendente' | 'paga' | 'anulada';

export interface Despesa {
  id: string;
  tipo: TipoDespesa;
  categoria: string;
  descricao: string;
  fornecedor_nome: string | null;
  numero_fatura: string | null;
  data_fatura: string | null;
  vencimento: string | null;
  valor_sem_iva_cents: number | null;
  iva_cents: number;
  valor_total_cents: number;
  estado: EstadoDespesa;
  data_pagamento: string | null;
  carteira_id: string | null;
  movimento_id: string | null;
  recorrente: boolean;
  notas: string | null;
  criado_em: string;
}

export interface Fornecedor { id: string; nome: string }

export const CATEGORIAS = ['Material / produtos', 'Pintor / terceiros', 'Renda', 'Água / luz / gás', 'Internet / telefone', 'Combustível', 'Ferramentas / equipamento', 'Marketing', 'Contabilidade / impostos', 'Seguros', 'Outros'];

// Data que conta para o mês (igual à vista despesas_gerais_mes do banco).
export const dataDoMes = (d: Despesa) => d.data_fatura ?? d.data_pagamento ?? d.criado_em.slice(0, 10);

// Divide um total com IVA: 123,00 € com 23% = 100,00 € + 23,00 € de IVA.
export function separarIva(totalCents: number, ivaPct: number) {
  const semIva = Math.round(totalCents / (1 + ivaPct / 100));
  return { semIva, iva: totalCents - semIva };
}

export async function listarDespesas(mes: string): Promise<Despesa[]> {
  // Despesas gerais (sem os_item_id): as do mês escolhido + todas as pendentes de qualquer mês.
  // (Para uma oficina, as últimas 3000 chegam e sobram; o filtro do mês faz-se aqui.)
  const { data, error } = await supabase.from('despesas').select('*').is('os_item_id', null).order('criado_em', { ascending: false }).limit(3000);
  if (error) throw error;
  return ((data ?? []) as Despesa[])
    .filter((d) => dataDoMes(d).slice(0, 7) === mes || d.estado === 'pendente')
    .sort((x, y) => dataDoMes(y).localeCompare(dataDoMes(x)));
}

export async function listarFornecedores(): Promise<Fornecedor[]> {
  const { data, error } = await supabase.from('fornecedores').select('id, nome').eq('ativo', true).order('nome');
  if (error) throw error;
  return data ?? [];
}

// Categorias já usadas, para sugerir enquanto se escreve.
export async function categoriasUsadas(): Promise<string[]> {
  const { data, error } = await supabase.from('despesas').select('categoria').limit(1000);
  if (error) throw error;
  return [...new Set(((data ?? []) as any[]).map((d) => d.categoria as string))];
}

export interface NovaDespesa {
  tipo: TipoDespesa;
  categoria: string;
  descricao: string;
  fornecedor_nome: string | null;
  fornecedor_id: string | null;
  numero_fatura: string | null;
  data_fatura: string;
  vencimento: string | null;
  valor_total_cents: number;
  iva_pct: number;
  recorrente: boolean;
  notas: string | null;
  pagar: { carteira_id: string; data: string } | null; // null = fica pendente
}

async function criarMovimento(descricao: string, valorCents: number, carteiraId: string, data: string): Promise<string> {
  const { data: mov, error } = await supabase.from('movimentos').insert({
    carteira_id: carteiraId, data, sentido: 'saida', valor_cents: valorCents, categoria: 'despesa', descricao,
  }).select('id').single();
  if (error) throw error;
  return mov.id as string;
}

export async function criarDespesa(d: NovaDespesa): Promise<void> {
  const { semIva, iva } = separarIva(d.valor_total_cents, d.iva_pct);
  let movimentoId: string | null = null;
  if (d.pagar) movimentoId = await criarMovimento(`Despesa: ${d.descricao}`, d.valor_total_cents, d.pagar.carteira_id, d.pagar.data);
  const { error } = await supabase.from('despesas').insert({
    tipo: d.tipo,
    categoria: d.categoria,
    descricao: d.descricao,
    fornecedor_nome: d.fornecedor_nome,
    fornecedor_id: d.fornecedor_id,
    numero_fatura: d.numero_fatura,
    data_fatura: d.data_fatura,
    vencimento: d.vencimento,
    valor_sem_iva_cents: semIva,
    iva_cents: iva,
    valor_total_cents: d.valor_total_cents,
    estado: d.pagar ? 'paga' : 'pendente',
    data_pagamento: d.pagar?.data ?? null,
    carteira_id: d.pagar?.carteira_id ?? null,
    movimento_id: movimentoId,
    recorrente: d.recorrente,
    periodicidade: d.recorrente ? 'mensal' : null,
    origem: 'manual',
    ia_estado: 'nenhuma',
    notas: d.notas,
  });
  if (error) {
    if (movimentoId) await supabase.from('movimentos').delete().eq('id', movimentoId);
    throw error;
  }
}

// Pagar uma despesa que estava pendente.
export async function pagarDespesa(d: Despesa, carteiraId: string, data: string): Promise<void> {
  const movimentoId = await criarMovimento(`Despesa: ${d.descricao}`, d.valor_total_cents, carteiraId, data);
  const { error } = await supabase.from('despesas')
    .update({ estado: 'paga', carteira_id: carteiraId, data_pagamento: data, movimento_id: movimentoId }).eq('id', d.id);
  if (error) {
    await supabase.from('movimentos').delete().eq('id', movimentoId);
    throw error;
  }
}

// Anular (nunca apagar): a despesa fica "anulada" e, se já tinha sido paga, o movimento também é anulado.
export async function anularDespesa(d: Despesa, motivo: string): Promise<void> {
  if (d.movimento_id) {
    const { error: e1 } = await supabase.from('movimentos').update({ anulado: true, anulado_motivo: motivo }).eq('id', d.movimento_id);
    if (e1) throw e1;
  }
  const { error } = await supabase.from('despesas')
    .update({ estado: 'anulada', notas: [d.notas, `Anulada: ${motivo}`].filter(Boolean).join(' · ') }).eq('id', d.id);
  if (error) throw error;
}

// Repetir uma despesa fixa (ex.: renda) para outro mês, já pendente.
export async function repetirDespesa(d: Despesa, mes: string): Promise<void> {
  const dia = (d.data_fatura ?? `${mes}-01`).slice(8, 10);
  const [a, m] = mes.split('-').map(Number);
  const ultimoDia = new Date(Date.UTC(a, m, 0)).getUTCDate();
  const data = `${mes}-${String(Math.min(Number(dia), ultimoDia)).padStart(2, '0')}`;
  const { error } = await supabase.from('despesas').insert({
    tipo: d.tipo, categoria: d.categoria, descricao: d.descricao, fornecedor_nome: d.fornecedor_nome,
    data_fatura: data, vencimento: data, valor_sem_iva_cents: d.valor_sem_iva_cents, iva_cents: d.iva_cents,
    valor_total_cents: d.valor_total_cents, estado: 'pendente', recorrente: d.recorrente,
    periodicidade: d.recorrente ? 'mensal' : null, origem: 'manual', ia_estado: 'nenhuma',
  });
  if (error) throw error;
}
