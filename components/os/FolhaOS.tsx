'use client';

import React, { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { mostrarTelefone } from '@/lib/clientes';
import { type OSPatio } from '@/lib/os';

// Folha para imprimir antes do carro ir para o pátio:
// página 1 = vistoria (A4 deitado), página 2 = checklist (A4 em pé).
// O funcionário clica no desenho do carro e a marca + a descrição aparecem sozinhas.

type TipoDano = 'arranhado' | 'quebrado' | 'amassado';
const DANOS: Record<TipoDano, { simbolo: string; nome: string; cor: string }> = {
  arranhado: { simbolo: '✱', nome: 'Arranhado', cor: '#1d4ed8' },
  quebrado: { simbolo: '−', nome: 'Quebrado / partido', cor: '#dc2626' },
  amassado: { simbolo: '+', nome: 'Amassado', cor: '#7c3aed' },
};

type Vista = 'lateral-esquerda' | 'lateral-direita' | 'topo' | 'dianteira' | 'traseira';
const NOME_VISTA: Record<Vista, string> = {
  'lateral-esquerda': 'Lateral esquerda',
  'lateral-direita': 'Lateral direita',
  topo: 'Topo',
  dianteira: 'Frente',
  traseira: 'Traseira',
};

interface Marca { id: number; vista: Vista; x: number; y: number; tipo: TipoDano; texto: string }

// Dá um nome aproximado à zona clicada (o funcionário pode corrigir o texto).
function zona(vista: Vista, x: number, y: number): string {
  const terco = (v: number, a: string, b: string, c: string) => (v < 1 / 3 ? a : v < 2 / 3 ? b : c);
  switch (vista) {
    case 'lateral-esquerda': // frente do carro à direita no desenho
      return `${y > 0.68 ? 'roda/zona baixa' : y < 0.38 ? 'vidros/tejadilho' : terco(x, 'traseira', 'portas', 'frente')}`;
    case 'lateral-direita': // frente do carro à esquerda no desenho
      return `${y > 0.68 ? 'roda/zona baixa' : y < 0.38 ? 'vidros/tejadilho' : terco(x, 'frente', 'portas', 'traseira')}`;
    case 'topo':
      return terco(y, 'capô', 'tejadilho', 'mala/traseira');
    case 'dianteira':
      return `${y < 0.4 ? 'capô/para-brisas' : 'para-choque/faróis'}, ${x < 0.5 ? 'lado direito' : 'lado esquerdo'}`;
    case 'traseira':
      return `${y < 0.4 ? 'vidro traseiro' : 'para-choque/mala'}, ${x < 0.5 ? 'lado esquerdo' : 'lado direito'}`;
  }
}

const CHECKLIST = [
  'Check-up inicial.',
  'Vídeo externo, sistema elétrico, foto painel e diagnóstico do OBD.',
  'Canto de porta.',
  'Limpeza dos tapetes com água.',
  'Remover pertences.',
  'Soprar veículo.',
  'Aspiração interna de 2x a 3x.',
  'Painel, tablier, plásticos e forro de porta, toque no estofo, trilhos dos estofos, console, retrovisor interno, pedal, tubo saída do AC, encaixe da cadeirinha, e chapeleira.',
  'Limpeza das jantes, caixa de roda, vão de roda.',
  'Limpeza da ponteira do escape e emblemas.',
  'Limpeza das borrachas, escovas e plásticos.',
  'Pré-lavagem com pincel.',
  'Remoção de resinas.',
  'Sabão com microfibra.',
  'Cera Líquida.',
  'Hidratação dos plásticos e borrachas.',
  'Abrilhantador de pneus e pára-barros.',
  'Limpeza dos vidros.',
  'Ambientador.',
  'Pertences de Clientes.',
  'Acabamento e secar a boca do tanque.',
  'OBD final e sistema elétrico.',
];

const COMBUSTIVEL = ['Reserva', '1/4', '1/2', '3/4', 'Cheio'];

const ESTILO_IMPRESSAO = `
.folha-os { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.folha-pagina { background: #fff; color: #111; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box; margin: 0 auto 24px auto; box-shadow: 0 4px 24px rgba(0,0,0,.4); }
.folha-pagina.paisagem { width: 297mm; min-height: 210mm; padding: 8mm; }
.folha-pagina.retrato { width: 210mm; min-height: 297mm; padding: 10mm; }
.folha-linha { border-bottom: 1px solid #333; height: 7mm; }
.folha-caixa { display: inline-block; width: 3.6mm; height: 3.6mm; border: 1.4px solid #111; vertical-align: middle; margin-right: 2mm; text-align: center; line-height: 3.4mm; font-size: 3.2mm; }
.folha-campo { font-size: 3mm; font-weight: bold; padding: 1.6mm 2mm; border-bottom: 1px solid #333; }
@page { size: A4 portrait; margin: 0; }
@page paisagem { size: A4 landscape; margin: 0; }
@media print {
  body > *:not(.folha-portal) { display: none !important; }
  .folha-portal { position: static !important; background: #fff !important; overflow: visible !important; padding: 0 !important; }
  .sem-imprimir { display: none !important; }
  .folha-os textarea::placeholder { color: transparent; }
  .folha-pagina { box-shadow: none; margin: 0; break-after: page; }
  .folha-pagina:last-child { break-after: auto; }
  .folha-pagina.paisagem { page: paisagem; height: 210mm; overflow: hidden; }
  .folha-pagina.retrato { height: 297mm; overflow: hidden; }
}
`;

const BOTAO: CSSProperties = { border: '1px solid #222b45', backgroundColor: '#131722', color: '#e2e8f0', padding: '10px 14px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };

const lerGuardado = (chave: string) => {
  try { return JSON.parse(localStorage.getItem(chave) ?? 'null'); } catch { return null; }
};

export default function FolhaOS({ os, onFechar }: { os: OSPatio; onFechar: () => void }) {
  const chave = `vistoria:${os.id}`;
  const guardado = typeof window !== 'undefined' ? lerGuardado(chave) : null;
  const [marcas, setMarcas] = useState<Marca[]>(guardado?.marcas ?? []);
  const [km, setKm] = useState<string>(guardado?.km ?? '');
  const [combustivel, setCombustivel] = useState<string>(guardado?.combustivel ?? '');
  const [notas, setNotas] = useState<string>(guardado?.notas ?? '');
  const [tipo, setTipo] = useState<TipoDano>('arranhado');
  const [feitos, setFeitos] = useState<number[]>(guardado?.feitos ?? []);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);
  // Guarda neste computador, para não perder se fechar a folha sem querer.
  useEffect(() => {
    try { localStorage.setItem(chave, JSON.stringify({ marcas, km, combustivel, notas, feitos })); } catch { /* sem armazenamento: só não guarda */ }
  }, [chave, marcas, km, combustivel, notas, feitos]);

  const marcar = (vista: Vista, e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setMarcas((m) => [...m, { id: Date.now(), vista, x, y, tipo, texto: `${DANOS[tipo].nome} – ${NOME_VISTA[vista]}, ${zona(vista, x, y)}` }]);
  };
  const mudarTexto = (id: number, texto: string) => setMarcas((m) => m.map((x) => (x.id === id ? { ...x, texto } : x)));
  const tirar = (id: number) => setMarcas((m) => m.filter((x) => x.id !== id));

  const cliente = os.cliente ? `${os.cliente.nome}${os.cliente.apelido ? ' ' + os.cliente.apelido : ''}` : '';
  const veiculo = [os.veiculo?.modelo].filter(Boolean).join(' ');
  const data = new Date(os.entrada_em).toLocaleDateString('pt-PT', { timeZone: 'Europe/Lisbon' });
  const colaboradores = [...new Set(os.itens.flatMap((i) => i.tecnicos))].join(', ');
  const servicos = os.itens.map((i) => i.descricao ?? 'Serviço');

  const desenho = (vista: Vista, estilo: CSSProperties) => (
    <div style={{ ...estilo, textAlign: 'center' }}>
      <div style={{ fontSize: '2.6mm', fontWeight: 'bold', marginBottom: '1mm' }}>VISÃO {NOME_VISTA[vista].toUpperCase()}</div>
      <div onClick={(e) => marcar(vista, e)} style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair', lineHeight: 0 }} title="Clique onde está o dano">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/vistoria/${vista}.png`} alt={NOME_VISTA[vista]} style={{ width: '100%', height: 'auto', userSelect: 'none', pointerEvents: 'none' }} draggable={false} />
        {marcas.filter((m) => m.vista === vista).map((m) => (
          <span key={m.id} style={{ position: 'absolute', left: `${m.x * 100}%`, top: `${m.y * 100}%`, transform: 'translate(-50%, -50%)', color: DANOS[m.tipo].cor, fontWeight: 900, fontSize: '5mm', lineHeight: 1, textShadow: '0 0 2px #fff, 0 0 2px #fff' }}>
            {DANOS[m.tipo].simbolo}<sub style={{ fontSize: '2.4mm' }}>{marcas.indexOf(m) + 1}</sub>
          </span>
        ))}
      </div>
    </div>
  );

  const campo = (rotulo: string, valor: string, estilo?: CSSProperties) => (
    <div className="folha-campo" style={estilo}>{rotulo}: <span style={{ fontWeight: 'normal' }}>{valor}</span></div>
  );

  const folha = (
    <div className="folha-portal folha-os" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(7,8,12,0.97)', overflow: 'auto', padding: '16px' }}>
      <style>{ESTILO_IMPRESSAO}</style>

      {/* BARRA (não sai na impressão) */}
      <div className="sem-imprimir" style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', padding: '12px', marginBottom: '16px', backgroundColor: '#0b0d14', border: '1px solid #222b45', borderRadius: '12px' }}>
        <span style={{ color: '#d4af37', fontWeight: 'bold', marginRight: '6px' }}>{os.codigo} · clique no carro para marcar:</span>
        {(Object.keys(DANOS) as TipoDano[]).map((t) => (
          <button key={t} type="button" onClick={() => setTipo(t)} style={{ ...BOTAO, ...(tipo === t ? { backgroundColor: '#d4af37', color: '#090a0f', borderColor: '#d4af37' } : {}) }}>
            {DANOS[t].simbolo} {DANOS[t].nome}
          </button>
        ))}
        <button type="button" style={BOTAO} onClick={() => setMarcas((m) => m.slice(0, -1))} disabled={!marcas.length}>↩ Desfazer</button>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button type="button" style={{ ...BOTAO, backgroundColor: '#d4af37', color: '#090a0f', borderColor: '#d4af37' }} onClick={() => window.print()}>🖨️ Imprimir</button>
          <button type="button" style={BOTAO} onClick={onFechar}>Fechar</button>
        </span>
      </div>

      {/* PÁGINA 1: VISTORIA */}
      <div className="folha-pagina paisagem">
        <div style={{ display: 'grid', gridTemplateColumns: '62mm 1fr 70mm', gap: '4mm', alignItems: 'start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vistoria/logo.png" alt="Carbox77" style={{ width: '58mm', marginTop: '3mm' }} />
          <div style={{ border: '1.4px solid #111', borderRadius: '3mm', overflow: 'hidden' }}>
            {campo('PROPRIETÁRIO', `${cliente}${os.cliente?.telefone ? '  ·  ' + mostrarTelefone(os.cliente.telefone) : ''}`)}
            {campo('VEÍCULO / MODELO', veiculo)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {campo('DATA', data)}{campo('COR', os.veiculo?.cor ?? '')}
              {campo('MATRÍCULA', os.veiculo?.matricula ?? '')}{campo('ANO', os.veiculo?.ano ? String(os.veiculo.ano) : '')}
              <div className="folha-campo">KM: <input value={km} onChange={(e) => setKm(e.target.value)} inputMode="numeric" style={{ border: 'none', width: '30mm', fontSize: '3mm', background: 'transparent' }} placeholder="______" /></div>
              <div className="folha-campo" style={{ display: 'flex', gap: '1.5mm', alignItems: 'center' }}>
                COMB.:
                {COMBUSTIVEL.map((c) => (
                  <span key={c} onClick={() => setCombustivel(combustivel === c ? '' : c)} style={{ cursor: 'pointer', fontWeight: 'normal', fontSize: '2.6mm', whiteSpace: 'nowrap' }}>
                    <span className="folha-caixa" style={{ width: '3mm', height: '3mm', marginRight: '0.6mm' }}>{combustivel === c ? '✕' : ''}</span>{c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {desenho('dianteira', { width: '62mm', justifySelf: 'center' })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40mm 62mm', gap: '4mm', alignItems: 'center', marginTop: '2mm' }}>
          {desenho('lateral-esquerda', {})}
          {desenho('lateral-direita', {})}
          {desenho('topo', {})}
          {desenho('traseira', { width: '62mm', justifySelf: 'center' })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '3.4mm', margin: '3mm 0 2mm 0' }}>
          {(Object.keys(DANOS) as TipoDano[]).map((t) => <span key={t}><span style={{ color: DANOS[t].cor, fontSize: '4.5mm' }}>{DANOS[t].simbolo}</span> {DANOS[t].nome.toUpperCase()}</span>)}
        </div>

        <div style={{ fontSize: '2.8mm', fontWeight: 'bold' }}>OBSERVAÇÕES</div>
        <div style={{ fontSize: '3mm' }}>
          {marcas.map((m, i) => (
            <div key={m.id} className="folha-linha" style={{ display: 'flex', alignItems: 'center', gap: '2mm', height: '6mm' }}>
              <b style={{ color: DANOS[m.tipo].cor }}>{DANOS[m.tipo].simbolo}{i + 1}</b>
              <input value={m.texto} onChange={(e) => mudarTexto(m.id, e.target.value)} style={{ flex: 1, border: 'none', fontSize: '3mm', background: 'transparent', color: '#111' }} />
              <button type="button" className="sem-imprimir" onClick={() => tirar(m.id)} style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '3.5mm' }}>✕</button>
            </div>
          ))}
          <textarea value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Outras observações (objetos deixados no carro, avisos ao cliente…)" rows={2}
            style={{ width: '100%', border: 'none', borderBottom: '1px solid #333', fontSize: '3mm', fontFamily: 'inherit', resize: 'none', background: 'transparent', color: '#111', boxSizing: 'border-box' }} />
          {Array.from({ length: Math.max(0, 4 - marcas.length) }).map((_, i) => <div key={i} className="folha-linha" style={{ height: '6mm' }} />)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10mm', fontSize: '3mm', fontWeight: 'bold', textAlign: 'center' }}>
          <div style={{ width: '90mm', borderTop: '1px solid #111', paddingTop: '1.5mm' }}>ASSINATURA DO PROPRIETÁRIO</div>
          <div style={{ width: '90mm', borderTop: '1px solid #111', paddingTop: '1.5mm' }}>ASSINATURA DO PRESTADOR</div>
        </div>
      </div>

      {/* PÁGINA 2: CHECKLIST */}
      <div className="folha-pagina retrato">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8mm' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vistoria/logo.png" alt="Carbox77" style={{ width: '45mm' }} />
          <div style={{ fontSize: '4.6mm', fontWeight: 'bold' }}>CHECKLIST DOS SERVIÇOS / LIMPEZA DETALHADA</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '6mm', margin: '4mm 0' }}>
          {campo('NOME CLIENTE', cliente)}{campo('CONTATO', os.cliente?.telefone ? mostrarTelefone(os.cliente.telefone) : '')}
          {campo('VEÍCULO', veiculo)}{campo('MATRÍCULA', os.veiculo?.matricula ?? '')}
          {campo('COLABORADOR', colaboradores)}{campo('DATA', `${data}  ·  ${os.codigo}`)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', border: '1.4px solid #111' }}>
          <div style={{ padding: '3mm', borderRight: '1.4px solid #111' }}>
            {CHECKLIST.map((t, i) => (
              <div key={i} onClick={() => setFeitos((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))} style={{ display: 'flex', fontSize: '2.9mm', marginBottom: '2.1mm', cursor: 'pointer' }}>
                <span className="folha-caixa" style={{ flexShrink: 0 }}>{feitos.includes(i) ? '✓' : ''}</span>
                <b style={{ width: '6mm', flexShrink: 0 }}>{i + 1}.</b><span>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '3mm' }}>
            <div style={{ fontSize: '2.8mm', fontWeight: 'bold', marginBottom: '2mm' }}>SERVIÇOS DA OS</div>
            {Array.from({ length: Math.max(21, servicos.length) }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-end', fontSize: '2.9mm', height: '6.2mm' }}>
                <span className="folha-caixa" style={{ flexShrink: 0 }} />
                <b style={{ width: '6mm', flexShrink: 0 }}>{i + 1}.</b>
                <span style={{ flex: 1, borderBottom: '1px solid #333', minHeight: '4mm' }}>{servicos[i] ?? ''}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '3.2mm', fontWeight: 'bold', marginTop: '5mm' }}>SERVIÇOS ADICIONAIS:</div>
        <div className="folha-linha" /><div className="folha-linha" />
        <div style={{ fontSize: '3.2mm', fontWeight: 'bold', marginTop: '5mm' }}>RECOMENDAÇÕES:</div>
        <div style={{ fontSize: '3mm', minHeight: '7mm', borderBottom: '1px solid #333', paddingTop: '1mm' }}>{os.notas ?? ''}</div>
        <div className="folha-linha" /><div className="folha-linha" />
      </div>
    </div>
  );

  return montado ? createPortal(folha, document.body) : null;
}
