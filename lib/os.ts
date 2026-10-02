/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

// ---------- Tipos (iguais às tabelas do Supabase) ----------
export type EstadoOS = 'aberta' | 'em_execucao' | 'pronta' | 'entregue' | 'cancelada';

export const NOMES_ESTADO: Record<EstadoOS, string> = {
  aberta: 'Aberta',
  em_execucao: 'Em execução',
  pronta: 'Pronta',
  entregue: 'Entregue',
  cancelada: 'Cancelada',
};

export interface Carteira { id: string; nome: string }
export interface Funcionario { id: string; nome: string; comissao_pct: number | null }
export interface Servico { id: string; nome: string }

export interface ItemOS {
  id: string;
  ordem: number;
  descricao: string | null;
  servico_id: string | null;
  valor_cents: number;
  desconto_pct: number;
  tecnicos: string[]; // nomes
  comissao_pct: number | null;
  despesas: { descricao: string | null; custo_cents: number }[];
}

export interface OSPatio {
  id: string;
  codigo: string;
  estado: EstadoOS;
  com_iva: boolean;
  iva_pct: number;
  desconto_pct: number;
  entrada_em: string;
  saida_combinada: string | null;
  notas: string | null;
  cliente: { id: string; nome: string; apelido: string | null; telefone: string; telefone2: string | null } | null;
  veiculo: { id: string; matricula: string; modelo: string | null; cor: string | null } | null;
  itens: ItemOS[];
  total_cents: number;
  pago_cents: number;
  a_receber_cents: number;
  paga: boolean;
}

// ---------- Dinheiro ----------
// O banco guarda cêntimos (inteiros). 12,50 € = 1250.
export const paraCents = (texto: string): number => {
  const n = Number(String(texto).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? Math.round(n * 100) : NaN;
};
export const euros = (cents: number) =>
  (cents / 100).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

// Estimativa do total no ecrã (o valor oficial é o que o banco calcula na vista os_financeiro).
export function estimarTotal(linhas: { valor_cents: number; desconto_pct: number }[], descontoGeralPct: number, comIva: boolean, ivaPct = 23) {
  const semIva = linhas.reduce((s, l) => s + l.valor_cents * (1 - l.desconto_pct / 100), 0) * (1 - descontoGeralPct / 100);
  const iva = comIva ? semIva * (ivaPct / 100) : 0;
  return { semIva: Math.round(semIva), iva: Math.round(iva), total: Math.round(semIva + iva) };
}

// ---------- Listas de apoio ----------
export async function listarCarteiras(): Promise<Carteira[]> {
  const { data, error } = await supabase.from('carteiras').select('id, nome').eq('ativo', true).order('nome');
  if (error) throw error;
  return data ?? [];
}
export async function listarTecnicos(): Promise<Funcionario[]> {
  const { data, error } = await supabase.from('funcionarios').select('id, nome, comissao_pct').eq('ativo', true).order('nome');
  if (error) throw error;
  return data ?? [];
}
export async function listarServicos(): Promise<Servico[]> {
  const { data, error } = await supabase.from('servicos').select('id, nome').eq('ativo', true).order('nome');
  if (error) throw error;
  return data ?? [];
}

// Resposta vazia com o mesmo formato das consultas (para quando não há nada para pedir).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VAZIO: { data: any[]; error: null } = { data: [], error: null };

// Serviços já usados em OS anteriores, para sugerir enquanto se escreve.
// O sistema "aprende" sozinho: cada serviço gravado numa OS passa a aparecer aqui,
// com o último valor cobrado. Junta também a lista oficial da tabela servicos.
export interface SugestaoServico { nome: string; servico_id: string | null; ultimo_valor_cents: number | null; vezes: number }

export async function listarSugestoesServicos(): Promise<SugestaoServico[]> {
  const [oficiais, recentes] = await Promise.all([
    listarServicos(),
    supabase.from('ordens_servico').select('id, entrada_em').order('entrada_em', { ascending: false }).limit(300),
  ]);
  if (recentes.error) throw recentes.error;
  const ordem = new Map<string, number>(((recentes.data ?? []) as any[]).map((o, i) => [o.id, i] as [string, number]));
  const itens = ordem.size
    ? await supabase.from('os_itens').select('os_id, descricao, servico_id, valor_cents').in('os_id', [...ordem.keys()])
    : VAZIO;
  if (itens.error) throw itens.error;

  const porNome = new Map<string, SugestaoServico & { pos: number }>();
  for (const s of oficiais) porNome.set(s.nome.trim().toLowerCase(), { nome: s.nome, servico_id: s.id, ultimo_valor_cents: null, vezes: 0, pos: Infinity });
  for (const i of (itens.data ?? []) as any[]) {
    const nome = (i.descricao ?? '').trim();
    if (!nome) continue;
    const chave = nome.toLowerCase();
    const pos = ordem.get(i.os_id) ?? Infinity; // 0 = OS mais recente
    const atual = porNome.get(chave);
    if (!atual) {
      porNome.set(chave, { nome, servico_id: i.servico_id, ultimo_valor_cents: i.valor_cents, vezes: 1, pos });
    } else {
      atual.vezes += 1;
      if (pos < atual.pos) { atual.pos = pos; atual.ultimo_valor_cents = i.valor_cents; }
      if (!atual.servico_id && i.servico_id) atual.servico_id = i.servico_id;
    }
  }
  // Os mais usados primeiro.
  return [...porNome.values()]
    .sort((a, b) => b.vezes - a.vezes || a.nome.localeCompare(b.nome, 'pt'))
    .map(({ pos: _pos, ...s }) => s);
}

// ---------- Pátio ----------
// No pátio ficam as OS que não foram canceladas e ainda não estão "entregues e pagas".
export async function listarPatio(): Promise<OSPatio[]> {
  const { data: oss, error } = await supabase
    .from('ordens_servico')
    .select('id, codigo, estado, com_iva, iva_pct, desconto_pct, entrada_em, saida_combinada, notas, cliente_id, veiculo_id')
    .eq('arquivado', false)
    .neq('estado', 'cancelada')
    .order('entrada_em', { ascending: false });
  if (error) throw error;
  if (!oss || oss.length === 0) return [];

  const ids = oss.map((o: any) => o.id);
  const clienteIds = [...new Set(oss.map((o: any) => o.cliente_id).filter(Boolean))] as string[];
  const veiculoIds = [...new Set(oss.map((o: any) => o.veiculo_id).filter(Boolean))] as string[];

  const [fin, itens, clientes, veiculos] = await Promise.all([
    supabase.from('os_financeiro').select('os_id, total_cents, pago_cents, a_receber_cents, paga').in('os_id', ids),
    supabase.from('os_itens').select('id, os_id, ordem, descricao, servico_id, valor_cents, desconto_pct').in('os_id', ids).order('ordem'),
    clienteIds.length ? supabase.from('clientes').select('id, nome, apelido, telefone, telefone2').in('id', clienteIds) : Promise.resolve(VAZIO),
    veiculoIds.length ? supabase.from('veiculos').select('id, matricula, modelo, cor').in('id', veiculoIds) : Promise.resolve(VAZIO),
  ]);
  for (const r of [fin, itens, clientes, veiculos]) if (r.error) throw r.error;

  const itemIds = ((itens.data ?? []) as any[]).map((i) => i.id);
  const tecs = itemIds.length
    ? await supabase.from('os_item_tecnicos').select('os_item_id, funcionario_id, funcao, comissao_pct').in('os_item_id', itemIds)
    : VAZIO;
  if (tecs.error) throw tecs.error;
  const terc = itemIds.length
    ? await supabase.from('os_terceirizados').select('os_item_id, descricao, custo_cents').in('os_item_id', itemIds)
    : VAZIO;
  if (terc.error) throw terc.error;
  const despesasPorItem = new Map<string, { descricao: string | null; custo_cents: number }[]>();
  for (const t of (terc.data ?? []) as any[]) {
    const l = despesasPorItem.get(t.os_item_id) ?? [];
    l.push({ descricao: t.descricao, custo_cents: t.custo_cents });
    despesasPorItem.set(t.os_item_id, l);
  }
  const funcIds = [...new Set(((tecs.data ?? []) as any[]).map((t) => t.funcionario_id))];
  const funcs = funcIds.length ? await supabase.from('funcionarios').select('id, nome').in('id', funcIds) : VAZIO;
  if (funcs.error) throw funcs.error;
  const nomeFunc = new Map<string, string>(((funcs.data ?? []) as any[]).map((f) => [f.id, f.nome] as [string, string]));

  const tecnicosPorItem = new Map<string, string[]>();
  const comissaoPorItem = new Map<string, number>();
  for (const t of tecs.data ?? []) {
    if (t.funcao !== 'executou') continue;
    if (t.comissao_pct != null) comissaoPorItem.set(t.os_item_id, Number(t.comissao_pct));
    const l = tecnicosPorItem.get(t.os_item_id) ?? [];
    l.push(nomeFunc.get(t.funcionario_id) ?? '?');
    tecnicosPorItem.set(t.os_item_id, l);
  }
  const finPorOS = new Map<string, any>(((fin.data ?? []) as any[]).map((f) => [f.os_id, f] as [string, any]));
  const cliPorId = new Map<string, any>(((clientes.data ?? []) as any[]).map((c) => [c.id, c] as [string, any]));
  const veiPorId = new Map<string, any>(((veiculos.data ?? []) as any[]).map((v) => [v.id, v] as [string, any]));

  return oss
    .map((o: any) => {
      const f = finPorOS.get(o.id);
      return {
        id: o.id,
        codigo: o.codigo,
        estado: o.estado as EstadoOS,
        com_iva: o.com_iva,
        iva_pct: Number(o.iva_pct),
        desconto_pct: Number(o.desconto_pct),
        entrada_em: o.entrada_em,
        saida_combinada: o.saida_combinada,
        notas: o.notas,
        cliente: (o.cliente_id && cliPorId.get(o.cliente_id)) || null,
        veiculo: (o.veiculo_id && veiPorId.get(o.veiculo_id)) || null,
        itens: ((itens.data ?? []) as any[])
          .filter((i) => i.os_id === o.id)
          .map((i) => ({ ...i, desconto_pct: Number(i.desconto_pct), tecnicos: tecnicosPorItem.get(i.id) ?? [], comissao_pct: comissaoPorItem.get(i.id) ?? null, despesas: despesasPorItem.get(i.id) ?? [] })),
        total_cents: f?.total_cents ?? 0,
        pago_cents: f?.pago_cents ?? 0,
        a_receber_cents: f?.a_receber_cents ?? 0,
        paga: Boolean(f?.paga),
      } as OSPatio;
    })
      .filter((o: OSPatio) => !(o.estado === 'entregue' && o.paga));
}

// ---------- Criar OS ----------
// comissao_pct: % sobre o lucro do serviço (valor com desconto − material − terceirizados).
// Com vários técnicos, a comissão divide-se em partes iguais (parte_pct).
export interface NovaLinha { descricao: string; servico_id: string | null; valor_cents: number; desconto_pct: number; tecnicos: string[]; comissao_pct: number | null; terceiros: { descricao: string; custo_cents: number }[] }
export interface NovaOS {
  cliente_id: string;
  veiculo_id: string;
  desconto_pct: number;
  com_iva: boolean;
  saida_combinada: string | null;
  notas: string | null;
  linhas: NovaLinha[];
  sinal_cents: number;
  sinal_carteira_id: string | null;
}

// Grava um serviço (linha) numa OS, com os técnicos e as despesas a terceiros.
async function inserirLinha(osId: string, ordem: number, l: NovaLinha): Promise<string> {
  const { data: item, error: e1 } = await supabase
    .from('os_itens')
    .insert({ os_id: osId, ordem, descricao: l.descricao, servico_id: l.servico_id, valor_cents: l.valor_cents, desconto_pct: l.desconto_pct })
    .select('id')
    .single();
  if (e1) throw e1;
  try {
    if (l.tecnicos.length) {
      const parte = Math.round((100 / l.tecnicos.length) * 100) / 100; // 2 técnicos = 50% cada
      const { error: e2 } = await supabase
        .from('os_item_tecnicos')
        .insert(l.tecnicos.map((fid) => ({ os_item_id: item.id, funcionario_id: fid, parte_pct: parte, funcao: 'executou', comissao_pct: l.comissao_pct ?? 0 })));
      if (e2) throw e2;
    }
    // Despesas deste serviço pagas a terceiros (ex.: pintor). Entram no cálculo do lucro e da comissão.
    if (l.terceiros.length) await adicionarDespesaServico(item.id, l.terceiros);
  } catch (erro) {
    await supabase.from('os_item_tecnicos').delete().eq('os_item_id', item.id);
    await supabase.from('os_terceirizados').delete().eq('os_item_id', item.id);
    await supabase.from('os_itens').delete().eq('id', item.id);
    throw erro;
  }
  return item.id as string;
}

// Acrescenta um serviço a uma OS que já existe (ex.: o cliente pediu mais um trabalho no pátio).
export async function adicionarServicoOS(osId: string, l: NovaLinha): Promise<void> {
  const { data, error } = await supabase.from('os_itens').select('ordem').eq('os_id', osId).order('ordem', { ascending: false }).limit(1);
  if (error) throw error;
  const proxima = ((data?.[0]?.ordem as number | undefined) ?? 0) + 1;
  await inserirLinha(osId, proxima, l);
}

// Acrescenta despesas (pintor, peças…) a um serviço que já existe.
export async function adicionarDespesaServico(osItemId: string, despesas: { descricao: string; custo_cents: number }[]): Promise<void> {
  const { error } = await supabase
    .from('os_terceirizados')
    .insert(despesas.map((t) => ({ os_item_id: osItemId, descricao: t.descricao, custo_cents: t.custo_cents })));
  if (error) throw error;
}

// Cria a OS, as linhas, os técnicos e (se houver) o sinal. Se algo falhar, apaga o que já foi criado.
export async function criarOS(d: NovaOS): Promise<string> {
  const { data: os, error } = await supabase
    .from('ordens_servico')
    .insert({
      tipo: 'cliente',
      estado: 'aberta',
      cliente_id: d.cliente_id,
      veiculo_id: d.veiculo_id,
      desconto_pct: d.desconto_pct,
      com_iva: d.com_iva,
      saida_combinada: d.saida_combinada,
      notas: d.notas,
    })
    .select('id, codigo')
    .single();
  if (error) throw error;

  try {
    for (let i = 0; i < d.linhas.length; i++) await inserirLinha(os.id, i + 1, d.linhas[i]);
    if (d.sinal_cents > 0 && d.sinal_carteira_id) {
      const { error: e3 } = await supabase.from('movimentos').insert({
        carteira_id: d.sinal_carteira_id,
        data: hojeLisboa(),
        sentido: 'entrada',
        valor_cents: d.sinal_cents,
        categoria: 'sinal_agendamento',
        descricao: `Sinal da OS ${os.codigo}`,
        os_id: os.id,
      });
      if (e3) throw e3;
    }
  } catch (erro) {
    await supabase.from('movimentos').delete().eq('os_id', os.id);
    const { data: its } = await supabase.from('os_itens').select('id').eq('os_id', os.id);
    const itIds = ((its ?? []) as any[]).map((x: any) => x.id);
    if (itIds.length) await supabase.from('os_item_tecnicos').delete().in('os_item_id', itIds);
    if (itIds.length) await supabase.from('os_terceirizados').delete().in('os_item_id', itIds);
    await supabase.from('os_itens').delete().eq('os_id', os.id);
    await supabase.from('ordens_servico').delete().eq('id', os.id);
    throw erro;
  }
  return os.codigo as string;
}

// ---------- Ações no pátio ----------
export async function mudarEstado(osId: string, estado: EstadoOS): Promise<void> {
  const extra = estado === 'entregue' ? { entregue_em: new Date().toISOString() } : {};
  const { error } = await supabase.from('ordens_servico').update({ estado, ...extra }).eq('id', osId);
  if (error) throw error;
}

export async function registarPagamento(osId: string, codigo: string, carteiraId: string, valorCents: number, data: string): Promise<void> {
  const { error } = await supabase.from('movimentos').insert({
    carteira_id: carteiraId,
    data,
    sentido: 'entrada',
    valor_cents: valorCents,
    categoria: 'recebimento_os',
    descricao: `Pagamento da OS ${codigo}`,
    os_id: osId,
  });
  if (error) throw error;
}

export function hojeLisboa(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon' }).format(new Date());
}
