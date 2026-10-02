'use client';

import React, { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { mensagemErro } from '@/lib/clientes';
import { euros, hojeLisboa, listarCarteiras, paraCents, type Carteira } from '@/lib/os';
import { mesAtualLisboa } from '@/lib/funcionarios';
import {
  CATEGORIAS,
  anularDespesa,
  categoriasUsadas,
  criarDespesa,
  dataDoMes,
  listarDespesas,
  listarFornecedores,
  pagarDespesa,
  repetirDespesa,
  separarIva,
  type Despesa,
  type Fornecedor,
  type TipoDespesa,
} from '@/lib/despesas';

const CARTAO: CSSProperties = { backgroundColor: 'rgba(19, 23, 34, 0.92)', border: '1px solid #222b45', borderRadius: '14px', padding: '20px' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' };
const CAMPO: CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', colorScheme: 'dark' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 18px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const CHIP: CSSProperties = { ...BOTAO_LINHA, padding: '8px 12px' };
const CHIP_ATIVO: CSSProperties = { ...CHIP, backgroundColor: '#d4af37', color: '#090a0f', borderColor: '#d4af37' };
const GRELHA: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' };

const erroDesp = (e: unknown) => mensagemErro(e).replace('clientes', 'despesas');
const dataPT = (iso: string | null) => (iso ? iso.slice(0, 10).split('-').reverse().join('/') : '—');
const nomeMes = (mes: string) => new Date(`${mes}-15T12:00:00`).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
const mesSeguinte = (mes: string) => {
  const [a, m] = mes.split('-').map(Number);
  return m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, '0')}`;
};
const IVAS = [0, 6, 13, 23];

interface Form {
  descricao: string; categoria: string; tipo: TipoDespesa; valor: string; iva: number; fornecedor: string;
  fatura: string; data: string; paga: boolean; carteira: string; dataPagamento: string; vencimento: string; recorrente: boolean; notas: string;
}
const formVazio = (carteira: string): Form => ({
  descricao: '', categoria: '', tipo: 'variavel', valor: '', iva: 23, fornecedor: '', fatura: '', data: hojeLisboa(),
  paga: true, carteira, dataPagamento: hojeLisboa(), vencimento: '', recorrente: false, notas: '',
});

// Aba "Despesas & Custos" ligada ao Supabase.
// Aqui entra TODO o dinheiro que sai (material, pintor, renda…). As despesas dentro das OS servem só para comissões.
export default function AbaDespesas() {
  const [mes, setMes] = useState(mesAtualLisboa());
  const [lista, setLista] = useState<Despesa[]>([]);
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [categorias, setCategorias] = useState<string[]>(CATEGORIAS);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [form, setForm] = useState<Form | null>(null);
  const [aGravar, setAGravar] = useState(false);
  const [pagar, setPagar] = useState<string | null>(null);
  const [pagCarteira, setPagCarteira] = useState('');
  const [pagData, setPagData] = useState(hojeLisboa());

  const carregar = useCallback(async () => {
    setErro('');
    try {
      const [d, c, f, cat] = await Promise.all([listarDespesas(mes), listarCarteiras(), listarFornecedores(), categoriasUsadas()]);
      setLista(d);
      setCarteiras(c);
      setFornecedores(f);
      setCategorias([...new Set([...CATEGORIAS, ...cat])]);
      setPagCarteira((x) => x || c[0]?.id || '');
    } catch (e) {
      setErro(erroDesp(e));
    } finally {
      setACarregar(false);
    }
  }, [mes]);

  useEffect(() => { carregar(); }, [carregar]);

  const nomeCarteira = (id: string | null) => carteiras.find((c) => c.id === id)?.nome ?? '';
  const doMes = lista.filter((d) => dataDoMes(d).slice(0, 7) === mes && d.estado !== 'anulada');
  const pendentes = lista.filter((d) => d.estado === 'pendente').sort((a, b) => (a.vencimento ?? dataDoMes(a)).localeCompare(b.vencimento ?? dataDoMes(b)));
  const totalMes = doMes.reduce((s, d) => s + d.valor_total_cents, 0);
  const pagoMes = doMes.filter((d) => d.estado === 'paga').reduce((s, d) => s + d.valor_total_cents, 0);
  const totalPendente = pendentes.reduce((s, d) => s + d.valor_total_cents, 0);
  const hoje = hojeLisboa();

  // Onde foi o dinheiro: total por categoria no mês.
  const porCategoria = useMemo(() => {
    const m = new Map<string, number>();
    for (const d of doMes) m.set(d.categoria, (m.get(d.categoria) ?? 0) + d.valor_total_cents);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [doMes]);

  const mudar = (alt: Partial<Form>) => setForm((f) => (f ? { ...f, ...alt } : f));

  const gravar = async () => {
    if (!form) return;
    setErro(''); setAviso('');
    const v = paraCents(form.valor);
    if (!form.descricao.trim()) return setErro('Escreva o que é a despesa (ex.: Rolo de PPF 15 m).');
    if (!form.categoria.trim()) return setErro('Escolha ou escreva a categoria.');
    if (!Number.isFinite(v) || v <= 0) return setErro('Escreva o valor total pago, com IVA (ex.: 123,00).');
    if (!form.data) return setErro('Escolha a data da despesa.');
    if (form.paga && !form.carteira) return setErro('Escolha de que carteira saiu o dinheiro.');
    const nomeForn = form.fornecedor.trim();
    const forn = fornecedores.find((x) => x.nome.toLowerCase() === nomeForn.toLowerCase());
    setAGravar(true);
    try {
      await criarDespesa({
        tipo: form.tipo, categoria: form.categoria.trim(), descricao: form.descricao.trim(),
        fornecedor_nome: nomeForn || null, fornecedor_id: forn?.id ?? null, numero_fatura: form.fatura.trim() || null,
        data_fatura: form.data, vencimento: form.paga ? null : form.vencimento || null, valor_total_cents: v, iva_pct: form.iva,
        recorrente: form.recorrente, notas: form.notas.trim() || null,
        pagar: form.paga ? { carteira_id: form.carteira, data: form.dataPagamento || form.data } : null,
      });
      setAviso(form.paga ? `Despesa de ${euros(v)} gravada e paga (saiu de ${nomeCarteira(form.carteira)}).` : `Despesa de ${euros(v)} gravada como pendente.`);
      setForm(null);
      if (form.data.slice(0, 7) !== mes) setMes(form.data.slice(0, 7));
      else await carregar();
    } catch (e) {
      setErro(erroDesp(e));
    } finally {
      setAGravar(false);
    }
  };

  const fazerPagamento = async (d: Despesa) => {
    if (!pagCarteira) return setErro('Escolha a carteira.');
    setAGravar(true); setErro('');
    try {
      await pagarDespesa(d, pagCarteira, pagData);
      setAviso(`"${d.descricao}" paga (${euros(d.valor_total_cents)} saiu de ${nomeCarteira(pagCarteira)}).`);
      setPagar(null);
      await carregar();
    } catch (e) {
      setErro(erroDesp(e));
    } finally {
      setAGravar(false);
    }
  };

  const anular = async (d: Despesa) => {
    const motivo = window.prompt(`Anular "${d.descricao}" (${euros(d.valor_total_cents)})?${d.estado === 'paga' ? '\nO dinheiro volta a contar na carteira.' : ''}\n\nEscreva o motivo:`);
    if (!motivo?.trim()) return;
    try {
      await anularDespesa(d, motivo.trim());
      setAviso('Despesa anulada.');
      await carregar();
    } catch (e) {
      setErro(erroDesp(e));
    }
  };

  const repetir = async (d: Despesa) => {
    const proximo = mesSeguinte(dataDoMes(d).slice(0, 7));
    if (!window.confirm(`Criar "${d.descricao}" (${euros(d.valor_total_cents)}) para ${nomeMes(proximo)}, como pendente?`)) return;
    try {
      await repetirDespesa(d, proximo);
      setAviso(`Criada para ${nomeMes(proximo)} (pendente).`);
      await carregar();
    } catch (e) {
      setErro(erroDesp(e));
    }
  };

  const formPagar = (d: Despesa) => (
    <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'end' }}>
      <div style={{ minWidth: '160px' }}>
        <label style={ETIQUETA}>Pago de</label>
        <select style={CAMPO} value={pagCarteira} onChange={(e) => setPagCarteira(e.target.value)}>
          {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </div>
      <div><label style={ETIQUETA}>Data</label><input style={CAMPO} type="date" value={pagData} onChange={(e) => setPagData(e.target.value)} /></div>
      <button disabled={aGravar} style={BOTAO_OURO} onClick={() => fazerPagamento(d)}>{aGravar ? 'A gravar…' : `Pagar ${euros(d.valor_total_cents)}`}</button>
      <button style={BOTAO_LINHA} onClick={() => setPagar(null)}>Cancelar</button>
    </div>
  );

  const linha = (d: Despesa) => {
    const atrasada = d.estado === 'pendente' && d.vencimento != null && d.vencimento < hoje;
    return (
      <div key={d.id} style={{ padding: '12px 0', borderBottom: '1px solid #222b45', opacity: d.estado === 'anulada' ? 0.45 : 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textDecoration: d.estado === 'anulada' ? 'line-through' : 'none' }}>{d.descricao}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '3px' }}>
              {dataPT(dataDoMes(d))} · {d.categoria} · {d.tipo === 'fixa' ? 'Fixa' : 'Variável'}
              {d.fornecedor_nome ? ` · ${d.fornecedor_nome}` : ''}{d.numero_fatura ? ` · Fatura ${d.numero_fatura}` : ''}{d.recorrente ? ' · 🔁 mensal' : ''}
            </div>
            <div style={{ fontSize: '13px', marginTop: '3px', color: d.estado === 'paga' ? '#4ade80' : d.estado === 'anulada' ? '#94a3b8' : atrasada ? '#f87171' : '#f59e0b' }}>
              {d.estado === 'paga' && `✔ Paga em ${dataPT(d.data_pagamento)} · ${nomeCarteira(d.carteira_id)}`}
              {d.estado === 'pendente' && (d.vencimento ? `${atrasada ? '⚠️ Atrasada · venceu' : '⏳ Pendente · vence'} ${dataPT(d.vencimento)}` : '⏳ Pendente')}
              {d.estado === 'anulada' && 'Anulada'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#f87171', fontWeight: 'bold', fontSize: '17px' }}>{euros(d.valor_total_cents)}</div>
            {d.iva_cents > 0 && <div style={{ fontSize: '12px', color: '#94a3b8' }}>IVA {euros(d.iva_cents)}</div>}
          </div>
        </div>
        {d.estado !== 'anulada' && (
          <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {d.estado === 'pendente' && <button style={{ ...BOTAO_LINHA, color: '#4ade80' }} onClick={() => { setPagar(pagar === d.id ? null : d.id); setPagData(hojeLisboa()); }}>💶 Pagar</button>}
            {(d.recorrente || d.tipo === 'fixa') && <button style={BOTAO_LINHA} onClick={() => repetir(d)}>🔁 Repetir no mês seguinte</button>}
            <button style={{ ...BOTAO_LINHA, color: '#f87171' }} onClick={() => anular(d)}>Anular</button>
          </div>
        )}
        {pagar === d.id && formPagar(d)}
      </div>
    );
  };

  const total = form ? paraCents(form.valor) : NaN;
  const iva = form && Number.isFinite(total) && total > 0 ? separarIva(total, form.iva) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Despesas & Custos</h2>
        <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Aqui entra todo o dinheiro que sai: material, pintor, renda, luz… É isto que conta no lucro do mês.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="month" style={{ ...CAMPO, width: 'auto' }} value={mes} onChange={(e) => e.target.value && setMes(e.target.value)} />
        <span style={{ color: '#d4af37', textTransform: 'capitalize' }}>{nomeMes(mes)}</span>
        <button style={{ ...BOTAO_OURO, marginLeft: 'auto' }} onClick={() => { setForm(formVazio(carteiras[0]?.id ?? '')); setAviso(''); setErro(''); }}>+ Nova despesa</button>
      </div>

      {/* RESUMO */}
      <div style={GRELHA}>
        <div style={CARTAO}><div style={{ color: '#94a3b8', fontSize: '14px' }}>Despesas do mês</div><div style={{ color: '#f87171', fontSize: '24px', fontWeight: 'bold' }}>{euros(totalMes)}</div></div>
        <div style={CARTAO}><div style={{ color: '#94a3b8', fontSize: '14px' }}>Já pago neste mês</div><div style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>{euros(pagoMes)}</div></div>
        <div style={CARTAO}><div style={{ color: '#94a3b8', fontSize: '14px' }}>Por pagar (todos os meses)</div><div style={{ color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>{euros(totalPendente)}</div></div>
      </div>

      {erro && <div style={{ padding: '12px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erro}</div>}
      {aviso && <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '10px', color: '#4ade80', fontSize: '15px' }}>{aviso}</div>}

      {/* NOVA DESPESA */}
      {form && (
        <div style={{ ...CARTAO, borderColor: 'rgba(212,175,55,0.5)' }}>
          <h3 style={{ color: '#d4af37', margin: '0 0 14px 0' }}>Nova despesa</h3>
          <datalist id="desp-categorias">{categorias.map((c) => <option key={c} value={c} />)}</datalist>
          <datalist id="desp-fornecedores">{fornecedores.map((f) => <option key={f.id} value={f.nome} />)}</datalist>
          <div style={GRELHA}>
            <div style={{ gridColumn: '1 / -1' }}><label style={ETIQUETA}>O que foi? *</label><input style={CAMPO} value={form.descricao} onChange={(e) => mudar({ descricao: e.target.value })} placeholder="Ex.: Rolo de PPF 15 m, Renda de outubro, Pintura do capô (João)" /></div>
            <div><label style={ETIQUETA}>Categoria *</label><input style={CAMPO} list="desp-categorias" value={form.categoria} onChange={(e) => mudar({ categoria: e.target.value })} placeholder="Clique para ver a lista" /></div>
            <div>
              <label style={ETIQUETA}>Tipo</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" style={form.tipo === 'variavel' ? CHIP_ATIVO : CHIP} onClick={() => mudar({ tipo: 'variavel' })}>Variável</button>
                <button type="button" style={form.tipo === 'fixa' ? CHIP_ATIVO : CHIP} onClick={() => mudar({ tipo: 'fixa', recorrente: true })}>Fixa (todo mês)</button>
              </div>
            </div>
            <div><label style={ETIQUETA}>Valor total pago, com IVA (€) *</label><input style={CAMPO} inputMode="decimal" value={form.valor} onChange={(e) => mudar({ valor: e.target.value })} placeholder="123,00" /></div>
            <div>
              <label style={ETIQUETA}>IVA da fatura</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {IVAS.map((p) => <button type="button" key={p} style={form.iva === p ? CHIP_ATIVO : CHIP} onClick={() => mudar({ iva: p })}>{p === 0 ? 'Sem IVA' : `${p}%`}</button>)}
              </div>
              {iva && form.iva > 0 && <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>{euros(iva.semIva)} + IVA {euros(iva.iva)}</div>}
            </div>
            <div><label style={ETIQUETA}>Fornecedor</label><input style={CAMPO} list="desp-fornecedores" value={form.fornecedor} onChange={(e) => mudar({ fornecedor: e.target.value })} placeholder="Opcional" /></div>
            <div><label style={ETIQUETA}>N.º da fatura</label><input style={CAMPO} value={form.fatura} onChange={(e) => mudar({ fatura: e.target.value })} placeholder="Opcional" /></div>
            <div><label style={ETIQUETA}>Data da despesa *</label><input style={CAMPO} type="date" value={form.data} onChange={(e) => mudar({ data: e.target.value })} /></div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '6px' }}>
            <button type="button" style={form.paga ? CHIP_ATIVO : CHIP} onClick={() => mudar({ paga: true })}>✔ Já paguei</button>
            <button type="button" style={!form.paga ? CHIP_ATIVO : CHIP} onClick={() => mudar({ paga: false })}>⏳ Ainda vou pagar</button>
          </div>
          <div style={{ ...GRELHA, marginTop: '10px' }}>
            {form.paga ? (
              <>
                <div>
                  <label style={ETIQUETA}>Saiu de</label>
                  <select style={CAMPO} value={form.carteira} onChange={(e) => mudar({ carteira: e.target.value })}>
                    {carteiras.length === 0 && <option value="">(sem carteiras)</option>}
                    {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>
                </div>
                <div><label style={ETIQUETA}>Data do pagamento</label><input style={CAMPO} type="date" value={form.dataPagamento} onChange={(e) => mudar({ dataPagamento: e.target.value })} /></div>
              </>
            ) : (
              <div><label style={ETIQUETA}>Vence em</label><input style={CAMPO} type="date" value={form.vencimento} onChange={(e) => mudar({ vencimento: e.target.value })} /></div>
            )}
            <div><label style={ETIQUETA}>Notas</label><input style={CAMPO} value={form.notas} onChange={(e) => mudar({ notas: e.target.value })} placeholder="Opcional" /></div>
          </div>
          <label style={{ display: 'block', marginTop: '12px', color: '#cbd5e1', fontSize: '15px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.recorrente} onChange={(e) => mudar({ recorrente: e.target.checked })} /> Repete todos os meses (renda, internet…)
          </label>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button disabled={aGravar} style={BOTAO_OURO} onClick={gravar}>{aGravar ? 'A gravar…' : 'Gravar despesa'}</button>
            <button style={BOTAO_LINHA} onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {aCarregar && <p style={{ color: '#94a3b8' }}>A carregar…</p>}

      {/* PENDENTES */}
      {pendentes.length > 0 && (
        <div style={{ ...CARTAO, borderColor: 'rgba(245,158,11,0.4)' }}>
          <h3 style={{ color: '#f59e0b', margin: '0 0 4px 0' }}>⏳ Por pagar ({pendentes.length})</h3>
          {pendentes.map(linha)}
        </div>
      )}

      {/* ONDE FOI O DINHEIRO */}
      {porCategoria.length > 0 && (
        <div style={CARTAO}>
          <h3 style={{ color: '#d4af37', margin: '0 0 12px 0' }}>Para onde foi o dinheiro em <span style={{ textTransform: 'capitalize' }}>{nomeMes(mes)}</span></h3>
          {porCategoria.map(([cat, v]) => (
            <div key={cat} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#e2e8f0' }}><span>{cat}</span><b>{euros(v)}</b></div>
              <div style={{ height: '8px', backgroundColor: '#090a0f', borderRadius: '4px', marginTop: '4px' }}>
                <div style={{ height: '8px', width: `${Math.max(2, (v / totalMes) * 100)}%`, backgroundColor: '#d4af37', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DESPESAS DO MÊS */}
      <div style={CARTAO}>
        <h3 style={{ color: '#fff', margin: '0 0 4px 0' }}>Despesas de <span style={{ textTransform: 'capitalize' }}>{nomeMes(mes)}</span></h3>
        {!aCarregar && lista.filter((d) => dataDoMes(d).slice(0, 7) === mes).length === 0 && <p style={{ color: '#94a3b8' }}>Ainda não há despesas neste mês.</p>}
        {lista.filter((d) => dataDoMes(d).slice(0, 7) === mes && d.estado !== 'pendente').map(linha)}
      </div>
    </div>
  );
}
