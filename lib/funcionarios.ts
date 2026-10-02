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
