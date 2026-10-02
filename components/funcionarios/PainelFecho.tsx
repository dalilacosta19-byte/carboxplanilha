'use client';

import React, { useState, type CSSProperties } from 'react';
import { mensagemErro } from '@/lib/clientes';
import { euros, hojeLisboa, type Carteira } from '@/lib/os';
import {
  calcularFecho,
  fecharMes,
  mesAtualLisboa,
  pagarFecho,
  prepararFecho,
  type Fecho,
  type Func,
  type PreparacaoFecho,
} from '@/lib/funcionarios';

const CAMPO: CSSProperties = { width: '100%', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '15px', boxSizing: 'border-box', colorScheme: 'dark' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '4px' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const LINHA: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '4px 0', borderBottom: '1px solid #222b45', fontSize: '15px' };

const erroFecho = (e: unknown) => mensagemErro(e).replace('clientes', 'salários');
const NOME_ESTADO = { por_pagar: 'Por pagar', pago: 'Pago', sem_pagamento: 'Sem pagamento (nada a receber)' };

function EscolherCarteira({ carteiras, carteira, setCarteira, data, setData }: {
  carteiras: Carteira[]; carteira: string; setCarteira: (v: string) => void; data: string; setData: (v: string) => void;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginTop: '10px' }}>
      <div>
        <label style={ETIQUETA}>Pago de</label>
        <select style={CAMPO} value={carteira} onChange={(e) => setCarteira(e.target.value)}>
          {carteiras.length === 0 && <option value="">(sem carteiras)</option>}
          {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </div>
      <div><label style={ETIQUETA}>Data do pagamento</label><input style={CAMPO} type="date" value={data} onChange={(e) => setData(e.target.value)} /></div>
    </div>
  );
}

// Fecho do mês de um funcionário: mostra a conta, fecha e (se quiser) paga.
export default function PainelFecho({ f, mes, fecho, carteiras, onFeito }: {
  f: Func; mes: string; fecho: Fecho | undefined; carteiras: Carteira[]; onFeito: (texto: string) => Promise<void>;
}) {
  const [aberto, setAberto] = useState(false);
  const [prep, setPrep] = useState<PreparacaoFecho | null>(null);
  const [dias, setDias] = useState('0');
  const [notas, setNotas] = useState('');
  const [carteira, setCarteira] = useState(carteiras[0]?.id ?? '');
  const [data, setData] = useState(hojeLisboa());
  const [erro, setErro] = useState('');
  const [aGravar, setAGravar] = useState(false);

  // Mês já fechado: mostra o resumo e, se faltar, o botão de pagar.
  if (fecho) {
    return (
      <div style={{ marginTop: '12px', padding: '12px', border: `1px solid ${fecho.estado === 'pago' ? 'rgba(34,197,94,0.4)' : 'rgba(56,189,248,0.4)'}`, borderRadius: '10px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '15px', color: '#cbd5e1' }}>
          <b style={{ color: fecho.estado === 'pago' ? '#4ade80' : '#38bdf8' }}>🔒 Mês fechado · {NOME_ESTADO[fecho.estado]}</b>
          <span>Comissões {euros(fecho.comissoes_cents)}</span>
          {fecho.diarias_cents > 0 && <span>Diárias {euros(fecho.diarias_cents)} ({fecho.dias_trabalhados} dias)</span>}
          {fecho.fixo_cents > 0 && <span>Fixo {euros(fecho.fixo_cents)}</span>}
          {fecho.adiantamentos_cents > 0 && <span>− Adiantamentos {euros(fecho.adiantamentos_cents)}</span>}
          {fecho.saldo_anterior_cents !== 0 && <span>Saldo anterior {euros(fecho.saldo_anterior_cents)}</span>}
          <b style={{ color: '#fff' }}>Total {euros(fecho.total_cents)}</b>
          {fecho.data_pagamento && <span>Pago em {fecho.data_pagamento.split('-').reverse().join('/')}</span>}
        </div>
        {fecho.estado === 'por_pagar' && (
          <>
            <EscolherCarteira carteiras={carteiras} carteira={carteira} setCarteira={setCarteira} data={data} setData={setData} />
            {erro && <div style={{ color: '#f87171', fontSize: '14px', marginTop: '8px' }}>{erro}</div>}
            <button disabled={aGravar} style={{ ...BOTAO_OURO, marginTop: '10px' }} onClick={async () => {
              if (!carteira) return setErro('Escolha a carteira.');
              setAGravar(true); setErro('');
              try {
                await pagarFecho(fecho, f.nome, carteira, data);
                await onFeito(`${f.nome}: pagamento de ${euros(fecho.total_cents)} registado.`);
              } catch (e) { setErro(erroFecho(e)); } finally { setAGravar(false); }
            }}>{aGravar ? 'A gravar…' : `💶 Pagar ${euros(fecho.total_cents)}`}</button>
          </>
        )}
        {fecho.total_cents < 0 && <p style={{ fontSize: '13px', color: '#f59e0b', margin: '8px 0 0 0' }}>Ficou a dever {euros(-fecho.total_cents)}: será descontado no próximo fecho.</p>}
      </div>
    );
  }

  const abrir = async () => {
    setErro(''); setAberto(true); setPrep(null);
    try {
      const p = await prepararFecho(f.id, mes);
      setPrep(p);
      setDias(String(p.dias).replace('.', ','));
      setCarteira((c) => c || carteiras[0]?.id || '');
    } catch (e) { setErro(erroFecho(e)); }
  };

  if (!aberto) {
    return f.ativo ? <button style={{ ...BOTAO_LINHA, marginTop: '12px', color: '#d4af37', borderColor: 'rgba(212,175,55,0.5)' }} onClick={abrir}>📋 Fechar o mês e pagar</button> : null;
  }

  const nDias = Number(dias.replace(',', '.'));
  const c = prep && Number.isFinite(nDias) ? calcularFecho(f, prep, nDias) : null;

  const fechar = async (pagarAgora: boolean) => {
    if (!prep || !c) return;
    setErro('');
    if (!(nDias >= 0)) return setErro('O número de dias não é válido.');
    if (pagarAgora && c.total > 0 && !carteira) return setErro('Escolha de que carteira sai o pagamento.');
    if (!window.confirm(`Fechar o mês de ${f.nome} com total de ${euros(c.total)}?\n\nDepois de fechado, estas comissões e adiantamentos ficam marcados e não voltam a contar.`)) return;
    setAGravar(true);
    try {
      await fecharMes(f, mes, prep, nDias, notas, pagarAgora ? { carteira_id: carteira, data } : null);
      await onFeito(pagarAgora && c.total > 0 ? `${f.nome}: mês fechado e ${euros(c.total)} pagos.` : `${f.nome}: mês fechado (${euros(c.total)}).`);
    } catch (e) { setErro(erroFecho(e)); setAGravar(false); }
  };

  return (
    <div style={{ marginTop: '12px', padding: '14px', border: '1px solid rgba(212,175,55,0.5)', borderRadius: '10px' }}>
      <h3 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '17px' }}>Fecho do mês de {f.nome}</h3>
      {mes === mesAtualLisboa() && <p style={{ fontSize: '13px', color: '#f59e0b', margin: '0 0 10px 0' }}>⚠️ Este mês ainda não acabou. OS pagas depois do fecho passam para o próximo mês.</p>}
      {!prep && !erro && <p style={{ color: '#94a3b8' }}>A calcular…</p>}
      {prep && c && (
        <div>
          <div style={LINHA}><span>Comissões ({prep.comissoes.length} serviço{prep.comissoes.length === 1 ? '' : 's'})</span><b style={{ color: '#d4af37' }}>{euros(c.comissoes)}</b></div>
          {prep.comissoes.map((x, i) => (
            <div key={i} style={{ ...LINHA, fontSize: '13px', color: '#94a3b8', paddingLeft: '14px' }}>
              <span>{x.os_codigo}{x.funcao === 'indicou' ? ' (indicou)' : ''}{x.mes.slice(0, 7) !== mes ? ` · de ${x.mes.slice(5, 7)}/${x.mes.slice(0, 4)}` : ''}</span><span>{euros(x.comissao_cents)}</span>
            </div>
          ))}
          {f.valor_diaria_cents != null && (
            <div style={{ ...LINHA, alignItems: 'center' }}>
              <span>Dias trabalhados <input style={{ ...CAMPO, width: '70px', display: 'inline-block', padding: '6px' }} inputMode="decimal" value={dias} onChange={(e) => setDias(e.target.value)} /> × {euros(f.valor_diaria_cents)}</span>
              <b>{euros(c.diarias)}</b>
            </div>
          )}
          {c.fixo > 0 && <div style={LINHA}><span>Salário fixo</span><b>{euros(c.fixo)}</b></div>}
          {prep.adiantamentos.map((a) => (
            <div key={a.id} style={{ ...LINHA, color: '#f87171' }}><span>− Adiantamento {a.data.split('-').reverse().join('/')}</span><b>{euros(a.valor_cents)}</b></div>
          ))}
          {prep.saldo_anterior_cents !== 0 && <div style={{ ...LINHA, color: '#f87171' }}><span>Ficou a dever do mês anterior</span><b>{euros(prep.saldo_anterior_cents)}</b></div>}
          <div style={{ ...LINHA, borderBottom: 'none', fontSize: '18px', marginTop: '4px' }}><b>Total a pagar</b><b style={{ color: c.total < 0 ? '#f87171' : '#4ade80' }}>{euros(c.total)}</b></div>
          {c.total < 0 && <p style={{ fontSize: '13px', color: '#f59e0b', margin: '4px 0 0 0' }}>Os adiantamentos passam o que ganhou. Os {euros(-c.total)} em falta passam para o próximo fecho.</p>}

          <div style={{ marginTop: '10px' }}><label style={ETIQUETA}>Notas (opcional)</label><input style={CAMPO} value={notas} onChange={(e) => setNotas(e.target.value)} /></div>
          {c.total > 0 && <EscolherCarteira carteiras={carteiras} carteira={carteira} setCarteira={setCarteira} data={data} setData={setData} />}
        </div>
      )}
      {erro && <div style={{ color: '#f87171', fontSize: '14px', marginTop: '8px' }}>{erro}</div>}
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {c && c.total > 0 && <button disabled={aGravar} style={BOTAO_OURO} onClick={() => fechar(true)}>{aGravar ? 'A gravar…' : `Fechar e pagar ${euros(c.total)}`}</button>}
        {c && <button disabled={aGravar} style={BOTAO_LINHA} onClick={() => fechar(false)}>{c.total > 0 ? 'Fechar e pagar depois' : 'Fechar o mês'}</button>}
        <button style={BOTAO_LINHA} onClick={() => setAberto(false)}>Cancelar</button>
      </div>
    </div>
  );
}
