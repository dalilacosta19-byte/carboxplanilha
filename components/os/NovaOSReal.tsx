'use client';

import React, { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { listarClientes, mensagemErro, mostrarTelefone, type Cliente } from '@/lib/clientes';
import {
  criarOS,
  estimarTotal,
  euros,
  listarCarteiras,
  listarServicos,
  listarTecnicos,
  paraCents,
  type Carteira,
  type Funcionario,
  type Servico,
} from '@/lib/os';

const CARTAO: CSSProperties = { backgroundColor: 'rgba(19, 23, 34, 0.92)', border: '1px solid #222b45', borderRadius: '14px', padding: '20px', marginBottom: '18px' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' };
const CAMPO: CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 22px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const GRELHA: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' };

interface Linha { chave: number; descricao: string; valor: string; desconto: string; tecnicos: string[] }
const linhaVazia = (chave: number): Linha => ({ chave, descricao: '', valor: '', desconto: '0', tecnicos: [] });

const nomeCompleto = (c: Cliente) => `${c.nome}${c.apelido ? ' ' + c.apelido : ''}`;

// Formulário de nova OS ligado ao Supabase. Quando grava, a OS aparece no Pátio.
export default function NovaOSReal({ onCriada }: { onCriada?: (codigo: string) => void }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tecnicos, setTecnicos] = useState<Funcionario[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [erroCarregar, setErroCarregar] = useState('');

  const [pesquisaCliente, setPesquisaCliente] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [veiculoId, setVeiculoId] = useState('');
  const [linhas, setLinhas] = useState<Linha[]>([linhaVazia(1)]);
  const [descontoGeral, setDescontoGeral] = useState('0');
  const [comIva, setComIva] = useState(false);
  const [sinal, setSinal] = useState('');
  const [sinalCarteira, setSinalCarteira] = useState('');
  const [saida, setSaida] = useState('');
  const [notas, setNotas] = useState('');

  const [erro, setErro] = useState('');
  const [aGuardar, setAGuardar] = useState(false);
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    Promise.all([listarClientes(), listarTecnicos(), listarServicos(), listarCarteiras()])
      .then(([c, t, s, ca]) => {
        setClientes(c.filter((x) => x.ativo));
        setTecnicos(t);
        setServicos(s);
        setCarteiras(ca);
        if (ca[0]) setSinalCarteira(ca[0].id);
      })
      .catch((e) => setErroCarregar(mensagemErro(e)));
  }, []);

  const cliente = clientes.find((c) => c.id === clienteId);

  // Sugestões: procura por nome, telefone ou matrícula.
  const sugestoes = useMemo(() => {
    const t = pesquisaCliente.trim().toLowerCase();
    if (!t || cliente) return [];
    const tm = t.replace(/[\s-]/g, '');
    return clientes
      .filter((c) =>
        nomeCompleto(c).toLowerCase().includes(t) ||
        c.telefone.includes(t.replace(/\s/g, '')) ||
        (tm !== '' && c.veiculos.some((v) => v.matricula.toLowerCase().replace(/[\s-]/g, '').includes(tm))))
      .slice(0, 8);
  }, [pesquisaCliente, clientes, cliente]);

  const escolherCliente = (c: Cliente) => {
    setClienteId(c.id);
    setPesquisaCliente(nomeCompleto(c));
    setVeiculoId(c.veiculos[0]?.id ?? '');
  };
  const limparCliente = () => { setClienteId(''); setVeiculoId(''); setPesquisaCliente(''); };

  const mudarLinha = (chave: number, alt: Partial<Linha>) =>
    setLinhas((ls) => ls.map((l) => (l.chave === chave ? { ...l, ...alt } : l)));
  const alternarTecnico = (chave: number, fid: string) =>
    setLinhas((ls) => ls.map((l) => (l.chave !== chave ? l : { ...l, tecnicos: l.tecnicos.includes(fid) ? l.tecnicos.filter((x) => x !== fid) : [...l.tecnicos, fid] })));

  const totais = estimarTotal(
    linhas.map((l) => ({ valor_cents: paraCents(l.valor) || 0, desconto_pct: Number(l.desconto) || 0 })),
    Number(descontoGeral) || 0,
    comIva,
  );

  const limparTudo = () => {
    limparCliente();
    setLinhas([linhaVazia(Date.now())]);
    setDescontoGeral('0'); setComIva(false); setSinal(''); setSaida(''); setNotas('');
  };

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    if (!cliente) return setErro('Escolha o cliente (pesquise e clique no nome). Se for novo, crie-o primeiro na aba Clientes & Veículos.');
    if (!veiculoId) return setErro('Este cliente não tem veículo. Adicione um na aba Clientes & Veículos.');
    const preenchidas = linhas.filter((l) => l.descricao.trim() || l.valor.trim());
    if (preenchidas.length === 0) return setErro('Adicione pelo menos um serviço.');
    for (const [i, l] of preenchidas.entries()) {
      if (!l.descricao.trim()) return setErro(`Falta a descrição do serviço ${i + 1}.`);
      const v = paraCents(l.valor);
      if (!Number.isFinite(v) || v < 0) return setErro(`O valor do serviço ${i + 1} não é válido.`);
      const d = Number(l.desconto || 0);
      if (!(d >= 0 && d <= 100)) return setErro(`O desconto do serviço ${i + 1} tem de estar entre 0 e 100%.`);
    }
    const dg = Number(descontoGeral || 0);
    if (!(dg >= 0 && dg <= 100)) return setErro('O desconto geral tem de estar entre 0 e 100%.');
    const sinalCents = sinal.trim() ? paraCents(sinal) : 0;
    if (!Number.isFinite(sinalCents) || sinalCents < 0) return setErro('O valor do sinal não é válido.');
    if (sinalCents > 0 && !sinalCarteira) return setErro('Escolha a carteira onde entrou o sinal.');

    setAGuardar(true);
    try {
      const codigo = await criarOS({
        cliente_id: cliente.id,
        veiculo_id: veiculoId,
        desconto_pct: dg,
        com_iva: comIva,
        saida_combinada: saida ? new Date(saida).toISOString() : null,
        notas: notas.trim() || null,
        sinal_cents: sinalCents,
        sinal_carteira_id: sinalCents > 0 ? sinalCarteira : null,
        linhas: preenchidas.map((l) => {
          const s = servicos.find((x) => x.nome.toLowerCase() === l.descricao.trim().toLowerCase());
          return { descricao: l.descricao.trim(), servico_id: s?.id ?? null, valor_cents: paraCents(l.valor), desconto_pct: Number(l.desconto || 0), tecnicos: l.tecnicos };
        }),
      });
      setSucesso(`OS ${codigo} criada. Já está no Pátio.`);
      limparTudo();
      onCriada?.(codigo);
    } catch (e2) {
      setErro(mensagemErro(e2).replace('clientes', 'OS'));
    } finally {
      setAGuardar(false);
    }
  };

  return (
    <form onSubmit={guardar}>
      <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Nova Ordem de Serviço</h2>
      <p style={{ fontSize: '16px', color: '#94a3b8', margin: '0 0 20px 0' }}>Gravada no Supabase. O código (OS-…) é criado sozinho.</p>

      {erroCarregar && <div style={{ ...CARTAO, color: '#f87171' }}>{erroCarregar}</div>}
      {sucesso && <div style={{ ...CARTAO, color: '#4ade80', borderColor: 'rgba(34,197,94,0.4)' }}>{sucesso}</div>}

      {/* 1. CLIENTE */}
      <div style={CARTAO}>
        <h3 style={{ color: '#d4af37', margin: '0 0 12px 0' }}>1. Cliente e veículo</h3>
        <label style={ETIQUETA}>Pesquisar cliente (nome, telefone ou matrícula) *</label>
        <div style={{ position: 'relative' }}>
          <input
            style={CAMPO}
            value={pesquisaCliente}
            onChange={(e) => { setPesquisaCliente(e.target.value); if (cliente) { setClienteId(''); setVeiculoId(''); } }}
            placeholder="Ex.: Carla, 912…, AZ-91-GI"
          />
          {sugestoes.length > 0 && (
            <div style={{ position: 'absolute', zIndex: 10, left: 0, right: 0, top: '100%', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', marginTop: '4px', overflow: 'hidden' }}>
              {sugestoes.map((c) => (
                <button type="button" key={c.id} onClick={() => escolherCliente(c)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', borderBottom: '1px solid #222b45', color: '#fff', cursor: 'pointer', fontSize: '15px' }}>
                  <b>{nomeCompleto(c)}</b> <span style={{ color: '#94a3b8' }}>· {mostrarTelefone(c.telefone)} · {c.veiculos.map((v) => v.matricula).join(', ')}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {pesquisaCliente.trim() && !cliente && sugestoes.length === 0 && (
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '8px 0 0 0' }}>Nenhum cliente encontrado. Crie-o primeiro na aba 👤 Clientes & Veículos.</p>
        )}
        {cliente && (
          <div style={{ ...GRELHA, marginTop: '14px' }}>
            <div>
              <label style={ETIQUETA}>Veículo *</label>
              <select style={CAMPO} value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)}>
                {cliente.veiculos.length === 0 && <option value="">(sem veículos)</option>}
                {cliente.veiculos.map((v) => <option key={v.id} value={v.id}>{v.matricula}{v.modelo ? ` — ${v.modelo}` : ''}</option>)}
              </select>
            </div>
            <div style={{ alignSelf: 'end', color: '#cbd5e1', fontSize: '15px' }}>
              📞 {mostrarTelefone(cliente.telefone)} <button type="button" style={{ ...BOTAO_LINHA, marginLeft: '8px' }} onClick={limparCliente}>Trocar cliente</button>
            </div>
          </div>
        )}
      </div>

      {/* 2. SERVIÇOS */}
      <div style={CARTAO}>
        <h3 style={{ color: '#d4af37', margin: '0 0 12px 0' }}>2. Serviços</h3>
        <datalist id="lista-servicos-bd">{servicos.map((s) => <option key={s.id} value={s.nome} />)}</datalist>
        {linhas.map((l, i) => (
          <div key={l.chave} style={{ borderBottom: '1px solid #222b45', paddingBottom: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 3fr) minmax(110px, 1fr) minmax(90px, 1fr) auto', gap: '10px', alignItems: 'end' }}>
              <div><label style={ETIQUETA}>Serviço {i + 1} *</label><input style={CAMPO} list="lista-servicos-bd" value={l.descricao} onChange={(e) => mudarLinha(l.chave, { descricao: e.target.value })} placeholder="Ex.: Polimento + cerâmica" /></div>
              <div><label style={ETIQUETA}>Valor (€) *</label><input style={CAMPO} inputMode="decimal" value={l.valor} onChange={(e) => mudarLinha(l.chave, { valor: e.target.value })} placeholder="350,00" /></div>
              <div><label style={ETIQUETA}>Desconto %</label><input style={CAMPO} inputMode="decimal" value={l.desconto} onChange={(e) => mudarLinha(l.chave, { desconto: e.target.value })} /></div>
              <button type="button" disabled={linhas.length === 1} onClick={() => setLinhas((ls) => ls.filter((x) => x.chave !== l.chave))} style={{ ...BOTAO_LINHA, color: '#f87171', opacity: linhas.length === 1 ? 0.4 : 1 }}>Remover</button>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8', marginRight: '10px' }}>Quem executa:</span>
              {tecnicos.length === 0 && <span style={{ fontSize: '14px', color: '#94a3b8' }}>(sem funcionários registados)</span>}
              {tecnicos.map((t) => (
                <label key={t.id} style={{ marginRight: '14px', fontSize: '15px', color: '#e2e8f0', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <input type="checkbox" checked={l.tecnicos.includes(t.id)} onChange={() => alternarTecnico(l.chave, t.id)} /> {t.nome}
                </label>
              ))}
              {l.tecnicos.length > 1 && <span style={{ fontSize: '13px', color: '#d4af37' }}> (comissão dividida a meio)</span>}
            </div>
          </div>
        ))}
        <button type="button" style={BOTAO_LINHA} onClick={() => setLinhas((ls) => [...ls, linhaVazia(Date.now())])}>+ Adicionar serviço</button>
      </div>

      {/* 3. VALORES */}
      <div style={CARTAO}>
        <h3 style={{ color: '#d4af37', margin: '0 0 12px 0' }}>3. Valores, sinal e entrega</h3>
        <div style={GRELHA}>
          <div><label style={ETIQUETA}>Desconto geral %</label><input style={CAMPO} inputMode="decimal" value={descontoGeral} onChange={(e) => setDescontoGeral(e.target.value)} /></div>
          <div>
            <label style={ETIQUETA}>Fatura com IVA (23%)?</label>
            <button type="button" onClick={() => setComIva(!comIva)} style={{ ...CAMPO, cursor: 'pointer', fontWeight: 'bold', color: comIva ? '#090a0f' : '#cbd5e1', backgroundColor: comIva ? '#d4af37' : '#090a0f' }}>
              {comIva ? 'Sim, com IVA' : 'Não, sem IVA'}
            </button>
          </div>
          <div><label style={ETIQUETA}>Sinal recebido (€)</label><input style={CAMPO} inputMode="decimal" value={sinal} onChange={(e) => setSinal(e.target.value)} placeholder="0,00" /></div>
          <div>
            <label style={ETIQUETA}>Sinal entrou em</label>
            <select style={CAMPO} value={sinalCarteira} onChange={(e) => setSinalCarteira(e.target.value)}>
              {carteiras.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div><label style={ETIQUETA}>Saída combinada</label><input style={CAMPO} type="datetime-local" value={saida} onChange={(e) => setSaida(e.target.value)} /></div>
          <div><label style={ETIQUETA}>Notas da OS</label><input style={CAMPO} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Ex.: cliente pediu atenção às jantes" /></div>
        </div>

        <div style={{ marginTop: '18px', padding: '14px', backgroundColor: '#090a0f', borderRadius: '10px', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '16px' }}>
          <span style={{ color: '#cbd5e1' }}>Sem IVA: <b>{euros(totais.semIva)}</b></span>
          {comIva && <span style={{ color: '#cbd5e1' }}>IVA: <b>{euros(totais.iva)}</b></span>}
          <span style={{ color: '#d4af37', fontSize: '18px' }}>Total: <b>{euros(totais.total)}</b></span>
          {paraCents(sinal) > 0 && <span style={{ color: '#38bdf8' }}>A receber: <b>{euros(Math.max(0, totais.total - paraCents(sinal)))}</b></span>}
        </div>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '8px 0 0 0' }}>Estimativa. Depois de gravar, o valor oficial é calculado pelo banco.</p>
      </div>

      {erro && <div style={{ padding: '12px', marginBottom: '14px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erro}</div>}

      <button type="submit" disabled={aGuardar} style={{ ...BOTAO_OURO, opacity: aGuardar ? 0.6 : 1 }}>{aGuardar ? 'A gravar…' : 'Gravar OS e enviar para o Pátio'}</button>
    </form>
  );
}
