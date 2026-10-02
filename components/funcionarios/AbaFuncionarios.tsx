'use client';

import React, { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { mensagemErro } from '@/lib/clientes';
import { euros, paraCents } from '@/lib/os';
import {
  atualizarFuncionario,
  listarFuncionarios,
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

  const carregar = useCallback(async () => {
    setErro('');
    try {
      const [f, p] = await Promise.all([listarFuncionarios(), producaoDoMes(mes)]);
      setLista(f);
      setProducao(p);
    } catch (e) {
      setErro(erroFunc(e));
    } finally {
      setACarregar(false);
    }
  }, [mes]);

  useEffect(() => { carregar(); }, [carregar]);

  const abrirEdicao = (f: Func) => { setEditar(f.id); setForm(paraForm(f)); setAviso(''); setErro(''); };

  const gravar = async (f: Func) => {
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
      await atualizarFuncionario(f.id, {
        nome: form.nome.trim(), telefone: form.telefone.trim() || null, email: form.email.trim() || null, cargo: form.cargo.trim() || null,
        comissao_pct: pct, valor_fixo_cents: fixo, valor_diaria_cents: diaria,
      });
      setAviso(`Ficha de ${form.nome.trim()} gravada. A nova % vale para os serviços que marcares daqui para a frente.`);
      setEditar(null);
      await carregar();
    } catch (e) {
      setErro(erroFunc(e));
    } finally {
      setAGravar(false);
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
      </div>

      {erro && <div style={{ padding: '12px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erro}</div>}
      {aviso && <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '10px', color: '#4ade80', fontSize: '15px' }}>{aviso}</div>}
      {aCarregar && <p style={{ color: '#94a3b8' }}>A carregar…</p>}
      {!aCarregar && !erro && lista.length === 0 && (
        <div style={{ ...CARTAO, color: '#94a3b8' }}>Ainda não há funcionários no banco. Em breve vais poder criá-los aqui.</div>
      )}

      {lista.map((f) => {
        const p = producao.get(f.id) ?? { comissoes_cents: 0, servicos: 0, dias: 0, detalhe: [] };
        const diarias = Math.round(p.dias * (f.valor_diaria_cents ?? 0));
        const fixo = f.valor_fixo_cents ?? 0;
        const total = fixo + diarias + p.comissoes_cents;
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
              {p.detalhe.length > 0 && <button style={{ ...BOTAO_LINHA, padding: '4px 10px', fontSize: '13px' }} onClick={() => setDetalhe(detalhe === f.id ? null : f.id)}>{detalhe === f.id ? 'Esconder' : 'Ver'} OS</button>}
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0 0' }}>As comissões só contam depois de a OS estar paga. Adiantamentos e "quanto falta pagar" chegam no próximo passo.</p>
            {detalhe === f.id && (
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                {p.detalhe.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222b45', padding: '4px 0' }}>
                    <span>{d.os_codigo} {d.funcao === 'indicou' && <span style={{ color: '#94a3b8' }}>(indicou)</span>}</span><b>{euros(d.comissao_cents)}</b>
                  </div>
                ))}
              </div>
            )}

            {/* Edição da ficha */}
            {editar === f.id && form && (
              <div style={{ marginTop: '14px', padding: '14px', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px' }}>
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
                  <button disabled={aGravar} style={BOTAO_OURO} onClick={() => gravar(f)}>{aGravar ? 'A gravar…' : 'Gravar ficha'}</button>
                  <button style={BOTAO_LINHA} onClick={() => setEditar(null)}>Cancelar</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
