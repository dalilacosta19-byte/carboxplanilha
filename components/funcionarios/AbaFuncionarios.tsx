'use client';

import React, { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { mensagemErro } from '@/lib/clientes';
import { euros, hojeLisboa, listarCarteiras, paraCents, type Carteira } from '@/lib/os';
import {
  anularAdiantamento,
  atualizarFuncionario,
  criarFuncionario,
  listarAdiantamentosPendentes,
  listarFuncionarios,
  registarAdiantamento,
  type Adiantamento,
  mesAtualLisboa,
  producaoDoMes,
  type Func,
  type Producao,
} from '@/lib/funcionarios';

const CARTAO: CSSProperties = { backgroundColor: 'rgba(19, 23, 34, 0.92)', border: '1px solid #222b45', borderRadius: '14px', padding: '20px' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' };
const CAMPO: CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', colorScheme: 'dark' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const GRELHA: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' };

const erroFunc = (e: unknown) => mensagemErro(e).replace('clientes', 'funcionários');
const centsParaTexto = (c: number | null) => (c == null ? '' : (c / 100).toFixed(2).replace('.', ','));
const nomeMes = (mes: string) => new Date(`${mes}-15T12:00:00`).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });

interface Form { nome: string; telefone: string; email: string; cargo: string; comissao: string; fixo: string; diaria: string }
const formVazio: Form = { nome: '', telefone: '', email: '', cargo: '', comissao: '', fixo: '', diaria: '' };
const paraForm = (f: Func): Form => ({
  nome: f.nome, telefone: f.telefone ?? '', email: f.email ?? '', cargo: f.cargo ?? '',
  comissao: f.comissao_pct == null ? '' : String(f.comissao_pct).replace('.', ','),
  fixo: centsParaTexto(f.valor_fixo_cents), diaria: centsParaTexto(f.valor_diaria_cents),
});

// Aba "Funcionários & Salários" ligada ao Supabase.
export default function AbaFuncionarios() {
  const [lista, setLista] = useState<Func[]>([]);
  const [producao, setProducao] = useState<Map<string, Producao>>(new Map());
  const [mes, setMes] = useState(mesAtualLisboa());
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [editar, setEditar] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [detalhe, setDetalhe] = useState<string | null>(null);
  const [aGravar, setAGravar] = useState(false);
  const [adiantamentos, setAdiantamentos] = useState<Adiantamento[]>([]);
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [adiantar, setAdiantar] = useState<string | null>(null); // id do funcionário com o formulário aberto
  const [adValor, setAdValor] = useState('');
  const [adCarteira, setAdCarteira] = useState('');
  const [adData, setAdData] = useState(hojeLisboa());
  const [adNota, setAdNota] = useState('');

  const carregar = useCallback(async () => {
    setErro('');
    try {
      const [f, p, a, c] = await Promise.all([listarFuncionarios(), producaoDoMes(mes), listarAdiantamentosPendentes(), listarCarteiras()]);
      setLista(f);
      setProducao(p);
      setAdiantamentos(a);
      setCarteiras(c);
    } catch (e) {
      setErro(erroFunc(e));
    } finally {
      setACarregar(false);
    }
  }, [mes]);

  useEffect(() => { carregar(); }, [carregar]);

  const abrirEdicao = (f: Func) => { setEditar(f.id); setForm(paraForm(f)); setAviso(''); setErro(''); };

  const gravar = async (f: Func | null) => {
    if (!form) return;
    setErro('');
    if (!form.nome.trim()) return setErro('O nome é obrigatório.');
    const pct = form.comissao.trim() ? Number(form.comissao.replace(',', '.')) : null;
    if (pct != null && !(pct >= 0 && pct <= 100)) return setErro('A % de comissão tem de estar entre 0 e 100.');
    const fixo = form.fixo.trim() ? paraCents(form.fixo) : null;
    const diaria = form.diaria.trim() ? paraCents(form.diaria) : null;
    if ((fixo != null && !(fixo >= 0)) || (diaria != null && !(diaria >= 0))) return setErro('O salário fixo e a diária têm de ser valores válidos (ex.: 850,00).');
    setAGravar(true);
    try {
      const dados = {
        nome: form.nome.trim(), telefone: form.telefone.trim() || null, email: form.email.trim() || null, cargo: form.cargo.trim() || null,
        comissao_pct: pct, valor_fixo_cents: fixo, valor_diaria_cents: diaria,
      };
      if (f) {
        await atualizarFuncionario(f.id, dados);
        setAviso(`Ficha de ${dados.nome} gravada. A nova % vale para os serviços que marcares daqui para a frente.`);
      } else {
        await criarFuncionario({ ...dados, ativo: true });
        setAviso(`${dados.nome} criado. Já aparece para marcar nas OS.`);
      }
      setEditar(null);
      await carregar();
    } catch (e) {
      setErro(erroFunc(e));
    } finally {
      setAGravar(false);
    }
  };

  const abrirAdiantamento = (f: Func) => {
    setAdiantar(adiantar === f.id ? null : f.id);
    setAdValor(''); setAdNota(''); setAdData(hojeLisboa());
    setAdCarteira((c) => c || carteiras[0]?.id || '');
  };

  const gravarAdiantamento = async (f: Func) => {
    setErro(''); setAviso('');
    const v = paraCents(adValor);
    if (!Number.isFinite(v) || v <= 0) return setErro('Escreva o valor do adiantamento (ex.: 100,00).');
    if (!adCarteira) return setErro('Escolha de que carteira saiu o dinheiro.');
    setAGravar(true);
    try {
      await registarAdiantamento(f.id, f.nome, adCarteira, v, adData, adNota);
      setAviso(`Adiantamento de ${euros(v)} a ${f.nome} registado. Sai da carteira e vai ser descontado no fecho do mês.`);
      setAdiantar(null);
      await carregar();
    } catch (e) {
      setErro(erroFunc(e));
    } finally {
      setAGravar(false);
    }
  };

  const anular = async (a: Adiantamento) => {
    const motivo = window.prompt(`Anular o adiantamento de ${euros(a.valor_cents)} de ${a.data}? Escreva o motivo:`);
    if (!motivo?.trim()) return;
    try {
      await anularAdiantamento(a.id, motivo.trim());
      setAviso('Adiantamento anulado.');
      await carregar();
    } catch (e) {
      setErro(erroFunc(e));
    }
  };

  const alternarAtivo = async (f: Func) => {
    if (f.ativo && !window.confirm(`Desativar ${f.nome}? Deixa de aparecer para marcar nas OS. O histórico fica guardado.`)) return;
    try {
      await atualizarFuncionario(f.id, { ativo: !f.ativo });
      await carregar();
    } catch (e) {
      setErro(erroFunc(e));
    }
  };

  const campo = (rotulo: string, chave: keyof Form, extra?: Partial<React.InputHTMLAttributes<HTMLInputElement>>) => (
    <div>
      <label style={ETIQUETA}>{rotulo}</label>
      <input style={CAMPO} value={form?.[chave] ?? ''} onChange={(e) => setForm((x) => (x ? { ...x, [chave]: e.target.value } : x))} {...extra} />
    </div>
  );

  const formulario = (f: Func | null) => form && (
    <div style={{ marginTop: '14px', padding: '14px', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px' }}>
      {!f && <h3 style={{ color: '#d4af37', margin: '0 0 12px 0' }}>Novo funcionário</h3>}
      <div style={GRELHA}>
        {campo('Nome *', 'nome')}
        {campo('Cargo', 'cargo', { placeholder: 'Ex.: Técnico de polimento' })}
        {campo('Telefone', 'telefone', { inputMode: 'tel' })}
        {campo('E-mail', 'email', { type: 'email' })}
        {campo('Comissão % (sobre o líquido)', 'comissao', { inputMode: 'decimal', placeholder: '40' })}
        {campo('Salário fixo mensal (€)', 'fixo', { inputMode: 'decimal', placeholder: '0,00' })}
        {campo('Valor da diária (€)', 'diaria', { inputMode: 'decimal', placeholder: '0,00' })}
      </div>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button disabled={aGravar} style={BOTAO_OURO} onClick={() => gravar(f)}>{aGravar ? 'A gravar…' : f ? 'Gravar ficha' : 'Criar funcionário'}</button>
        <button style={BOTAO_LINHA} onClick={() => setEditar(null)}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Funcionários & Salários</h2>
        <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Dados reais do Supabase. A % da ficha vem já preenchida quando marcas o técnico numa OS.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ color: '#cbd5e1', fontSize: '15px' }}>Produção do mês:</label>
        <input type="month" style={{ ...CAMPO, width: 'auto' }} value={mes} onChange={(e) => e.target.value && setMes(e.target.value)} />
        <span style={{ color: '#d4af37', fontSize: '15px', textTransform: 'capitalize' }}>{nomeMes(mes)}</span>
        <button style={{ ...BOTAO_OURO, marginLeft: 'auto' }} onClick={() => { setEditar('novo'); setForm(formVazio); setAviso(''); setErro(''); }}>+ Novo funcionário</button>
      </div>
      {editar === 'novo' && formulario(null)}

      {erro && <div style={{ padding: '12px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erro}</div>}
      {aviso && <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '10px', color: '#4ade80', fontSize: '15px' }}>{aviso}</div>}
      {aCarregar && <p style={{ color: '#94a3b8' }}>A carregar…</p>}
      {!aCarregar && !erro && lista.length === 0 && (
        <div style={{ ...CARTAO, color: '#94a3b8' }}>Ainda não há funcionários no banco. Clica em «+ Novo funcionário».</div>
      )}

      {lista.map((f) => {
        const p = producao.get(f.id) ?? { comissoes_cents: 0, servicos: 0, dias: 0, detalhe: [] };
        const diarias = Math.round(p.dias * (f.valor_diaria_cents ?? 0));
        const fixo = f.valor_fixo_cents ?? 0;
        const total = fixo + diarias + p.comissoes_cents;
        const ads = adiantamentos.filter((a) => a.funcionario_id === f.id);
        const totalAds = ads.reduce((t, a) => t + a.valor_cents, 0);
        return (
          <div key={f.id} style={{ ...CARTAO, opacity: f.ativo ? 1 : 0.55 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{f.nome} {!f.ativo && <span style={{ fontSize: '13px', color: '#f87171' }}>(inativo)</span>}</div>
                <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{[f.cargo, f.telefone].filter(Boolean).join(' · ') || '—'}</div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '15px', marginTop: '8px' }}>
                  <span style={{ color: '#d4af37' }}>Comissão: <b>{f.comissao_pct != null ? `${f.comissao_pct}%` : '—'}</b></span>
                  <span style={{ color: '#cbd5e1' }}>Fixo: <b>{f.valor_fixo_cents != null ? euros(f.valor_fixo_cents) : '—'}</b></span>
                  <span style={{ color: '#cbd5e1' }}>Diária: <b>{f.valor_diaria_cents != null ? euros(f.valor_diaria_cents) : '—'}</b></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                {f.ativo && <button style={{ ...BOTAO_LINHA, color: '#38bdf8' }} onClick={() => abrirAdiantamento(f)}>💸 Adiantamento</button>}
                <button style={BOTAO_LINHA} onClick={() => (editar === f.id ? setEditar(null) : abrirEdicao(f))}>✏️ Editar ficha</button>
                <button style={{ ...BOTAO_LINHA, color: f.ativo ? '#f87171' : '#4ade80' }} onClick={() => alternarAtivo(f)}>{f.ativo ? 'Desativar' : 'Reativar'}</button>
              </div>
            </div>

            {/* Produção do mês */}
            <div style={{ marginTop: '14px', padding: '12px', backgroundColor: '#090a0f', borderRadius: '10px', display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '15px' }}>
              <span style={{ color: '#cbd5e1' }}>Serviços: <b>{p.servicos}</b></span>
              <span style={{ color: '#d4af37' }}>Comissões: <b>{euros(p.comissoes_cents)}</b></span>
              {f.valor_diaria_cents != null && <span style={{ color: '#cbd5e1' }}>Dias: <b>{p.dias}</b> = <b>{euros(diarias)}</b></span>}
              {fixo > 0 && <span style={{ color: '#cbd5e1' }}>Fixo: <b>{euros(fixo)}</b></span>}
              <span style={{ color: '#4ade80', fontSize: '16px' }}>Total do mês: <b>{euros(total)}</b></span>
              {ads.length > 0 && <span style={{ color: '#f87171' }}>− Adiantamentos: <b>{euros(totalAds)}</b></span>}
              <span style={{ color: '#38bdf8', fontSize: '16px' }}>Falta pagar: <b>{euros(total - totalAds)}</b></span>
              {p.detalhe.length > 0 && <button style={{ ...BOTAO_LINHA, padding: '4px 10px', fontSize: '13px' }} onClick={() => setDetalhe(detalhe === f.id ? null : f.id)}>{detalhe === f.id ? 'Esconder' : 'Ver'} OS</button>}
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0 0' }}>As comissões só contam depois de a OS estar paga. Os adiantamentos contam até serem descontados num fecho de mês.</p>
            {ads.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                {ads.map((a) => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid #222b45', padding: '4px 0' }}>
                    <span>💸 {a.data.split('-').reverse().join('/')} · {a.carteira}{a.descricao ? ` · ${a.descricao}` : ''}</span>
                    <span><b>{euros(a.valor_cents)}</b> <button style={{ border: 'none', background: 'none', color: '#f87171', cursor: 'pointer' }} onClick={() => anular(a)} title="Anular">✕</button></span>
                  </div>
                ))}
              </div>
            )}
            {adiantar === f.id && (
              <div style={{ marginTop: '12px', padding: '14px', border: '1px solid rgba(56,189,248,0.4)', borderRadius: '10px' }}>
                <div style={GRELHA}>
                  <div><label style={ETIQUETA}>Valor (€)</label><input style={CAMPO} inputMode="decimal" value={adValor} onChange={(e) => setAdValor(e.target.value)} placeholder="100,00" /></div>
                  <div>
                    <label style={ETIQUETA}>Saiu de</label>
                    <select style={CAMPO} value={adCarteira} onChange={(e) => setAdCarteira(e.target.value)}>
                      {carteiras.length === 0 && <option value="">(sem carteiras)</option>}
                      {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div><label style={ETIQUETA}>Data</label><input style={CAMPO} type="date" value={adData} onChange={(e) => setAdData(e.target.value)} /></div>
                  <div><label style={ETIQUETA}>Nota</label><input style={CAMPO} value={adNota} onChange={(e) => setAdNota(e.target.value)} placeholder="Opcional" /></div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <button disabled={aGravar} style={BOTAO_OURO} onClick={() => gravarAdiantamento(f)}>{aGravar ? 'A gravar…' : 'Gravar adiantamento'}</button>
                  <button style={BOTAO_LINHA} onClick={() => setAdiantar(null)}>Cancelar</button>
                </div>
              </div>
            )}
            {detalhe === f.id && (
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                {p.detalhe.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222b45', padding: '4px 0' }}>
                    <span>{d.os_codigo} {d.funcao === 'indicou' && <span style={{ color: '#94a3b8' }}>(indicou)</span>}</span><b>{euros(d.comissao_cents)}</b>
                  </div>
                ))}
              </div>
            )}

            {editar === f.id && formulario(f)}
          </div>
        );
      })}
    </div>
  );
}
