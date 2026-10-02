'use client';

import React, { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { abrirWhatsApp, mensagemErro, mostrarTelefone } from '@/lib/clientes';
import {
  NOMES_ESTADO,
  euros,
  hojeLisboa,
  listarCarteiras,
  listarPatio,
  mudarEstado,
  paraCents,
  registarPagamento,
  type Carteira,
  type EstadoOS,
  type OSPatio,
} from '@/lib/os';

const CARTAO: CSSProperties = { backgroundColor: 'rgba(19, 23, 34, 0.92)', border: '1px solid #222b45', borderRadius: '14px', padding: '20px' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' };
const CAMPO: CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_VERDE: CSSProperties = { ...BOTAO_LINHA, color: '#4ade80', borderColor: 'rgba(34,197,94,0.4)' };

const COR_ESTADO: Record<EstadoOS, string> = {
  aberta: '#38bdf8',
  em_execucao: '#f59e0b',
  pronta: '#4ade80',
  entregue: '#a78bfa',
  cancelada: '#f87171',
};

// O passo seguinte de cada estado (o botão grande do cartão).
const PROXIMO: Partial<Record<EstadoOS, { estado: EstadoOS; texto: string }>> = {
  aberta: { estado: 'em_execucao', texto: '▶️ Iniciar execução' },
  em_execucao: { estado: 'pronta', texto: '✅ Marcar como pronta' },
  pronta: { estado: 'entregue', texto: '🔑 Entregar ao cliente' },
};

const dataHora = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—';

// Erros traduzidos: a mensagem genérica fala de "clientes", aqui é sobre OS.
const erroOS = (e: unknown) => mensagemErro(e).replace('clientes', 'OS');

function mensagemPronto(os: OSPatio): string {
  const nome = os.cliente?.nome ?? '';
  const carro = [os.veiculo?.modelo, os.veiculo?.matricula ? `(${os.veiculo.matricula})` : ''].filter(Boolean).join(' ');
  const falta = os.a_receber_cents > 0 ? ` Valor a pagar no levantamento: ${euros(os.a_receber_cents)}.` : '';
  return `Olá ${nome}! O seu veículo ${carro} já está pronto para levantar na Carbox77 Detailing.${falta} Obrigado pela preferência!`;
}

// Aba "Veículos no Pátio" ligada ao Supabase.
// Mostra as OS em andamento. Uma OS sai do pátio quando está entregue E paga (ou se for cancelada).
export default function PatioReal({ onNovaOS }: { onNovaOS?: () => void }) {
  const [lista, setLista] = useState<OSPatio[]>([]);
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState<EstadoOS | 'todas'>('todas');
  const [ocupada, setOcupada] = useState<string | null>(null); // id da OS que está a gravar

  // Formulário de pagamento aberto (só um de cada vez)
  const [pagOS, setPagOS] = useState<string | null>(null);
  const [pagValor, setPagValor] = useState('');
  const [pagCarteira, setPagCarteira] = useState('');
  const [pagData, setPagData] = useState(hojeLisboa());

  const carregar = useCallback(async () => {
    setErro('');
    try {
      const [p, c] = await Promise.all([listarPatio(), listarCarteiras()]);
      setLista(p);
      setCarteiras(c);
    } catch (e) {
      setErro(erroOS(e));
    } finally {
      setACarregar(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const visiveis = useMemo(() => {
    const t = pesquisa.trim().toLowerCase();
    const tm = t.replace(/[\s-]/g, '');
    return lista.filter((os) => {
      if (filtro !== 'todas' && os.estado !== filtro) return false;
      if (!t) return true;
      const nome = `${os.cliente?.nome ?? ''} ${os.cliente?.apelido ?? ''}`.toLowerCase();
      const mat = (os.veiculo?.matricula ?? '').toLowerCase().replace(/[\s-]/g, '');
      return nome.includes(t) || os.codigo.toLowerCase().includes(t) || (tm !== '' && mat.includes(tm));
    });
  }, [lista, pesquisa, filtro]);

  const contagem = useMemo(() => {
    const c: Record<string, number> = {};
    for (const os of lista) c[os.estado] = (c[os.estado] ?? 0) + 1;
    return c;
  }, [lista]);

  const aReceberTotal = lista.reduce((s, os) => s + os.a_receber_cents, 0);

  const trocarEstado = async (os: OSPatio, estado: EstadoOS) => {
    if (estado === 'entregue' && os.a_receber_cents > 0 &&
        !window.confirm(`A ${os.codigo} ainda tem ${euros(os.a_receber_cents)} por receber.\n\nEntregar mesmo assim? (Fica no pátio até ser paga.)`)) return;
    if (estado === 'cancelada' &&
        !window.confirm(`Cancelar a ${os.codigo}? Ela sai do pátio. Os pagamentos já registados continuam no livro-caixa.`)) return;
    setOcupada(os.id); setErro(''); setAviso('');
    try {
      await mudarEstado(os.id, estado);
      setAviso(`${os.codigo}: estado mudou para "${NOMES_ESTADO[estado]}".`);
      await carregar();
    } catch (e) {
      setErro(erroOS(e));
    } finally {
      setOcupada(null);
    }
  };

  const abrirPagamento = (os: OSPatio) => {
    setPagOS(os.id);
    setPagValor(os.a_receber_cents > 0 ? (os.a_receber_cents / 100).toFixed(2).replace('.', ',') : '');
    setPagCarteira((c) => c || carteiras[0]?.id || '');
    setPagData(hojeLisboa());
  };

  const gravarPagamento = async (os: OSPatio) => {
    setErro(''); setAviso('');
    const v = paraCents(pagValor);
    if (!Number.isFinite(v) || v <= 0) return setErro('Escreva um valor de pagamento maior que zero (ex.: 150,00).');
    if (!pagCarteira) return setErro('Escolha a carteira onde entrou o dinheiro.');
    if (!pagData) return setErro('Escolha a data do pagamento.');
    if (v > os.a_receber_cents &&
        !window.confirm(`O valor (${euros(v)}) é maior do que o que falta receber (${euros(os.a_receber_cents)}). Gravar mesmo assim?`)) return;
    setOcupada(os.id);
    try {
      await registarPagamento(os.id, os.codigo, pagCarteira, v, pagData);
      const nomeCarteira = carteiras.find((c) => c.id === pagCarteira)?.nome ?? '';
      setAviso(`Pagamento de ${euros(v)} registado na ${os.codigo} (${nomeCarteira}).`);
      setPagOS(null);
      await carregar();
    } catch (e) {
      setErro(erroOS(e));
    } finally {
      setOcupada(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Veículos no Pátio</h2>
        <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>
          Dados reais do Supabase. Uma OS sai daqui quando está entregue <b>e</b> paga.
        </p>
      </div>

      {/* RESUMO */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button style={{ ...BOTAO_LINHA, ...(filtro === 'todas' ? { color: '#090a0f', backgroundColor: '#d4af37', borderColor: '#d4af37' } : {}) }} onClick={() => setFiltro('todas')}>
          Todas ({lista.length})
        </button>
        {(['aberta', 'em_execucao', 'pronta', 'entregue'] as EstadoOS[]).map((e) => (
          <button key={e} onClick={() => setFiltro(e)} style={{ ...BOTAO_LINHA, color: filtro === e ? '#090a0f' : COR_ESTADO[e], backgroundColor: filtro === e ? COR_ESTADO[e] : 'transparent', borderColor: COR_ESTADO[e] }}>
            {NOMES_ESTADO[e]} ({contagem[e] ?? 0})
          </button>
        ))}
        <span style={{ marginLeft: 'auto', color: '#38bdf8', fontSize: '16px' }}>A receber no pátio: <b>{euros(aReceberTotal)}</b></span>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          style={{ ...CAMPO, maxWidth: '450px' }}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="🔍 Matrícula, nome do cliente ou código da OS"
        />
        <button style={BOTAO_LINHA} onClick={() => { setACarregar(true); carregar(); }}>🔄 Atualizar</button>
        {onNovaOS && <button style={BOTAO_OURO} onClick={onNovaOS}>+ Nova OS</button>}
      </div>

      {erro && <div style={{ padding: '12px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erro}</div>}
      {aviso && <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '10px', color: '#4ade80', fontSize: '15px' }}>{aviso}</div>}

      {aCarregar && <p style={{ color: '#94a3b8' }}>A carregar…</p>}
      {!aCarregar && !erro && visiveis.length === 0 && (
        <div style={{ ...CARTAO, color: '#94a3b8' }}>
          {lista.length === 0 ? 'O pátio está vazio. Crie uma OS em 📋 OS / Orçamento / Agendamento.' : 'Nenhuma OS corresponde à pesquisa ou ao filtro.'}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '18px' }}>
        {visiveis.map((os) => {
          const prox = PROXIMO[os.estado];
          const ocupado = ocupada === os.id;
          return (
            <div key={os.id} style={{ ...CARTAO, borderLeft: `4px solid ${COR_ESTADO[os.estado]}`, opacity: ocupado ? 0.6 : 1 }}>
              {/* Cabeçalho */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{os.veiculo?.matricula ?? '(sem veículo)'}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>{[os.veiculo?.modelo, os.veiculo?.cor].filter(Boolean).join(' · ')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold', color: '#090a0f', backgroundColor: COR_ESTADO[os.estado] }}>{NOMES_ESTADO[os.estado]}</span>
                  <div style={{ fontSize: '13px', color: '#d4af37', marginTop: '4px' }}>{os.codigo}</div>
                </div>
              </div>

              {/* Cliente */}
              <div style={{ marginTop: '12px', fontSize: '15px', color: '#e2e8f0' }}>
                👤 {os.cliente ? `${os.cliente.nome}${os.cliente.apelido ? ' ' + os.cliente.apelido : ''}` : '—'}
                {os.cliente?.telefone && <span style={{ color: '#94a3b8' }}> · 📞 {mostrarTelefone(os.cliente.telefone)}</span>}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                Entrada: {dataHora(os.entrada_em)} · Saída combinada: {dataHora(os.saida_combinada)}
              </div>

              {/* Serviços */}
              <div style={{ marginTop: '12px', borderTop: '1px solid #222b45', paddingTop: '10px' }}>
                {os.itens.map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '14px', color: '#cbd5e1', marginBottom: '4px' }}>
                    <span>
                      {i.descricao ?? 'Serviço'}
                      {i.desconto_pct > 0 && <span style={{ color: '#94a3b8' }}> (−{i.desconto_pct}%)</span>}
                      {i.tecnicos.length > 0 && <span style={{ color: '#94a3b8' }}> · 🔧 {i.tecnicos.join(', ')}</span>}
                    </span>
                    <span style={{ whiteSpace: 'nowrap' }}>{euros(i.valor_cents)}</span>
                  </div>
                ))}
                {os.notas && <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>📝 {os.notas}</div>}
              </div>

              {/* Valores (oficiais, da vista os_financeiro) */}
              <div style={{ marginTop: '12px', padding: '10px 12px', backgroundColor: '#090a0f', borderRadius: '10px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '15px' }}>
                <span style={{ color: '#d4af37' }}>Total: <b>{euros(os.total_cents)}</b>{os.com_iva && <span style={{ fontSize: '12px' }}> c/ IVA</span>}</span>
                <span style={{ color: '#4ade80' }}>Pago: <b>{euros(os.pago_cents)}</b></span>
                {os.paga
                  ? <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✔ Paga</span>
                  : <span style={{ color: '#38bdf8' }}>Falta: <b>{euros(os.a_receber_cents)}</b></span>}
              </div>

              {/* Ações */}
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {prox && <button disabled={ocupado} style={BOTAO_OURO} onClick={() => trocarEstado(os, prox.estado)}>{prox.texto}</button>}
                {!os.paga && <button disabled={ocupado} style={BOTAO_VERDE} onClick={() => (pagOS === os.id ? setPagOS(null) : abrirPagamento(os))}>💶 Registar pagamento</button>}
                {os.estado === 'pronta' && os.cliente?.telefone && (
                  <button style={BOTAO_VERDE} onClick={() => abrirWhatsApp(os.cliente!.telefone, mensagemPronto(os))}>💬 WhatsApp &quot;veículo pronto&quot;</button>
                )}
                <select
                  disabled={ocupado}
                  value=""
                  onChange={(e) => e.target.value && trocarEstado(os, e.target.value as EstadoOS)}
                  style={{ ...BOTAO_LINHA, backgroundColor: '#090a0f' }}
                  title="Corrigir o estado à mão"
                >
                  <option value="">Mudar estado…</option>
                  {(Object.keys(NOMES_ESTADO) as EstadoOS[]).filter((e) => e !== os.estado).map((e) => <option key={e} value={e}>{NOMES_ESTADO[e]}</option>)}
                </select>
              </div>

              {/* Formulário de pagamento */}
              {pagOS === os.id && (
                <div style={{ marginTop: '14px', padding: '14px', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    <div><label style={ETIQUETA}>Valor (€)</label><input style={CAMPO} inputMode="decimal" value={pagValor} onChange={(e) => setPagValor(e.target.value)} /></div>
                    <div>
                      <label style={ETIQUETA}>Entrou em</label>
                      <select style={CAMPO} value={pagCarteira} onChange={(e) => setPagCarteira(e.target.value)}>
                        {carteiras.length === 0 && <option value="">(sem carteiras)</option>}
                        {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                      </select>
                    </div>
                    <div><label style={ETIQUETA}>Data</label><input style={CAMPO} type="date" value={pagData} onChange={(e) => setPagData(e.target.value)} /></div>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button disabled={ocupado} style={BOTAO_OURO} onClick={() => gravarPagamento(os)}>{ocupado ? 'A gravar…' : 'Gravar pagamento'}</button>
                    <button style={BOTAO_LINHA} onClick={() => setPagOS(null)}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
