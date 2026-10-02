'use client';

import React, { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import FolhaOS from './FolhaOS';
import { abrirWhatsApp, mensagemErro, mostrarTelefone } from '@/lib/clientes';
import {
  NOMES_ESTADO,
  euros,
  hojeLisboa,
  adicionarDespesaServico,
  adicionarServicoOS,
  listarCarteiras,
  listarPatio,
  listarSugestoesServicos,
  listarTecnicos,
  mudarEstado,
  paraCents,
  registarPagamento,
  type Carteira,
  type EstadoOS,
  type Funcionario,
  type OSPatio,
  type SugestaoServico,
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


// Painel para acrescentar um serviço novo ou uma despesa a uma OS que já está no pátio.
function Acrescentar({ os, tecnicos, sugestoes, onFeito, onFechar }: {
  os: OSPatio; tecnicos: Funcionario[]; sugestoes: SugestaoServico[]; onFeito: (texto: string) => Promise<void>; onFechar: () => void;
}) {
  const [modo, setModo] = useState<'servico' | 'despesa'>('servico');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [desconto, setDesconto] = useState('0');
  const [tecs, setTecs] = useState<string[]>([]);
  const [comissoes, setComissoes] = useState<Record<string, string>>({});
  const [itemId, setItemId] = useState(os.itens[0]?.id ?? '');
  const [erro, setErro] = useState('');
  const [aGravar, setAGravar] = useState(false);

  const marcar = (fid: string) => {
    const novos = tecs.includes(fid) ? tecs.filter((x) => x !== fid) : [...tecs, fid];
    const padrao = tecnicos.find((t) => t.id === fid)?.comissao_pct;
    if (novos.includes(fid) && comissoes[fid] === undefined) setComissoes({ ...comissoes, [fid]: padrao != null ? String(padrao).replace('.', ',') : '' });
    setTecs(novos);
  };

  const gravar = async () => {
    setErro('');
    const v = paraCents(valor);
    if (!descricao.trim()) return setErro(modo === 'servico' ? 'Escreva o nome do serviço.' : 'Escreva o que é a despesa (ex.: Pintor).');
    if (!Number.isFinite(v) || v <= 0) return setErro('Escreva um valor maior que zero (ex.: 150,00).');
    setAGravar(true);
    try {
      if (modo === 'servico') {
        const d = Number(desconto.replace(',', '.') || 0);
        if (!(d >= 0 && d <= 100)) throw new Error('O desconto tem de estar entre 0 e 100%.');
        const lista = tecs.map((fid) => ({ id: fid, txt: (comissoes[fid] ?? '').trim() }));
        for (const t of lista) {
          const c = Number(t.txt.replace(',', '.'));
          if (!t.txt || !(c >= 0 && c <= 100)) throw new Error(`Escreva a % de comissão de ${tecnicos.find((x) => x.id === t.id)?.nome ?? 'cada técnico'} (0 a 100).`);
        }
        const s = sugestoes.find((x) => x.nome.toLowerCase() === descricao.trim().toLowerCase());
        await adicionarServicoOS(os.id, { descricao: descricao.trim(), servico_id: s?.servico_id ?? null, valor_cents: v, desconto_pct: d, tecnicos: lista.map((t) => ({ id: t.id, comissao_pct: Number(t.txt.replace(',', '.')) })), terceiros: [] });
        await onFeito(`Serviço "${descricao.trim()}" (${euros(v)}) acrescentado à ${os.codigo}.`);
      } else {
        if (!itemId) throw new Error('Escolha a que serviço pertence a despesa.');
        await adicionarDespesaServico(itemId, [{ descricao: descricao.trim(), custo_cents: v }]);
        await onFeito(`Despesa "${descricao.trim()}" (${euros(v)}) registada na ${os.codigo}.`);
      }
    } catch (e) {
      setErro(e instanceof Error && !(e as { code?: string }).code ? e.message : erroOS(e));
      setAGravar(false);
    }
  };

  return (
    <div style={{ marginTop: '14px', padding: '14px', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button type="button" style={modo === 'servico' ? BOTAO_OURO : BOTAO_LINHA} onClick={() => setModo('servico')}>Novo serviço</button>
        <button type="button" style={modo === 'despesa' ? BOTAO_OURO : BOTAO_LINHA} onClick={() => setModo('despesa')} disabled={os.itens.length === 0}>Despesa (pintor, peças…)</button>
      </div>
      {modo === 'despesa' && (
        <div style={{ marginBottom: '10px' }}>
          <label style={ETIQUETA}>Em que serviço?</label>
          <select style={CAMPO} value={itemId} onChange={(e) => setItemId(e.target.value)}>
            {os.itens.map((i) => <option key={i.id} value={i.id}>{i.descricao ?? 'Serviço'} ({euros(i.valor_cents)})</option>)}
          </select>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: modo === 'servico' ? 'minmax(160px, 3fr) minmax(100px, 1fr) minmax(80px, 1fr)' : 'minmax(160px, 3fr) minmax(100px, 1fr)', gap: '10px' }}>
        <div>
          <label style={ETIQUETA}>{modo === 'servico' ? 'Serviço' : 'Despesa'}</label>
          <input style={CAMPO} list={modo === 'servico' ? 'patio-servicos' : undefined} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder={modo === 'servico' ? 'Comece a escrever…' : 'Ex.: Pintor João'} />
        </div>
        <div><label style={ETIQUETA}>Valor (€)</label><input style={CAMPO} inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" /></div>
        {modo === 'servico' && <div><label style={ETIQUETA}>Desconto %</label><input style={CAMPO} inputMode="decimal" value={desconto} onChange={(e) => setDesconto(e.target.value)} /></div>}
      </div>
      <datalist id="patio-servicos">{sugestoes.map((s) => <option key={s.nome} value={s.nome} />)}</datalist>
      {modo === 'servico' && (
        <div style={{ marginTop: '10px', fontSize: '15px' }}>
          <span style={{ color: '#d4af37', fontWeight: 'bold', marginRight: '10px' }}>👷 Quem executa:</span>
          {tecnicos.length === 0 && <span style={{ color: '#f59e0b' }}>⚠️ Sem funcionários ativos no banco.</span>}
          {tecnicos.map((t) => (
            <label key={t.id} style={{ marginRight: '14px', color: '#e2e8f0', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={tecs.includes(t.id)} onChange={() => marcar(t.id)} /> {t.nome}
            </label>
          ))}
          {tecs.map((fid) => (
            <label key={fid} style={{ color: '#cbd5e1', marginLeft: '6px', whiteSpace: 'nowrap' }}>
              {tecnicos.find((t) => t.id === fid)?.nome} % <input style={{ ...CAMPO, width: '64px', padding: '6px', display: 'inline-block' }} inputMode="decimal" value={comissoes[fid] ?? ''} onChange={(e) => setComissoes({ ...comissoes, [fid]: e.target.value })} placeholder="40" />
            </label>
          ))}
        </div>
      )}
      {erro && <div style={{ marginTop: '10px', color: '#f87171', fontSize: '14px' }}>{erro}</div>}
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button type="button" disabled={aGravar} style={BOTAO_OURO} onClick={gravar}>{aGravar ? 'A gravar…' : 'Gravar'}</button>
        <button type="button" style={BOTAO_LINHA} onClick={onFechar}>Cancelar</button>
      </div>
    </div>
  );
}

// Aba "Veículos no Pátio" ligada ao Supabase.
// Mostra as OS em andamento. Uma OS sai do pátio quando está entregue E paga (ou se for cancelada).
export default function PatioReal({ onNovaOS, abrirFolha, onFolhaAberta }: { onNovaOS?: () => void; abrirFolha?: string | null; onFolhaAberta?: () => void }) {
  const [lista, setLista] = useState<OSPatio[]>([]);
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [tecnicos, setTecnicos] = useState<Funcionario[]>([]);
  const [sugestoes, setSugestoes] = useState<SugestaoServico[]>([]);
  const [acrescentarOS, setAcrescentarOS] = useState<string | null>(null);
  const [folhaOS, setFolhaOS] = useState<string | null>(null);
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
      const [p, c, t, sg] = await Promise.all([listarPatio(), listarCarteiras(), listarTecnicos(), listarSugestoesServicos()]);
      setLista(p);
      setCarteiras(c);
      setTecnicos(t);
      setSugestoes(sg);
    } catch (e) {
      setErro(erroOS(e));
    } finally {
      setACarregar(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  // Depois de gravar uma OS nova, abre logo a folha de checklist e vistoria dela.
  useEffect(() => {
    if (!abrirFolha) return;
    const os = lista.find((o) => o.codigo === abrirFolha);
    if (os) { setFolhaOS(os.id); onFolhaAberta?.(); }
  }, [abrirFolha, lista, onFolhaAberta]);
  const osDaFolha = lista.find((o) => o.id === folhaOS);

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

      {osDaFolha && <FolhaOS key={osDaFolha.id} os={osDaFolha} onFechar={() => setFolhaOS(null)} />}

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
                  <React.Fragment key={i.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '14px', color: '#cbd5e1', marginBottom: '4px' }}>
                    <span>
                      {i.descricao ?? 'Serviço'}
                      {i.desconto_pct > 0 && <span style={{ color: '#94a3b8' }}> (−{i.desconto_pct}%)</span>}
                      {i.tecnicos.length > 0 && <span style={{ color: '#94a3b8' }}> · 🔧 {i.tecnicos.join(', ')}</span>}
                    </span>
                    <span style={{ whiteSpace: 'nowrap' }}>{euros(i.valor_cents)}</span>
                  </div>
                  {i.despesas.map((d, k) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#f87171', margin: '0 0 4px 12px' }}>
                      <span>− {d.descricao ?? 'Despesa'}</span><span>{euros(d.custo_cents)}</span>
                    </div>
                  ))}
                  </React.Fragment>
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
                <button style={BOTAO_LINHA} onClick={() => setFolhaOS(os.id)}>🖨️ Checklist e vistoria</button>
                <button disabled={ocupado} style={BOTAO_LINHA} onClick={() => setAcrescentarOS(acrescentarOS === os.id ? null : os.id)}>➕ Serviço / despesa</button>
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

              {acrescentarOS === os.id && (
                <Acrescentar
                  os={os}
                  tecnicos={tecnicos}
                  sugestoes={sugestoes}
                  onFechar={() => setAcrescentarOS(null)}
                  onFeito={async (texto) => { setAcrescentarOS(null); setAviso(texto); setErro(''); await carregar(); }}
                />
              )}

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
