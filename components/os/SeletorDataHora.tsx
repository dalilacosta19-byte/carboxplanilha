'use client';

import React, { type CSSProperties } from 'react';

// Escolher dia e hora só com cliques.
// O valor é um texto "AAAA-MM-DDTHH:MM" (hora de Lisboa) ou "" se nada escolhido.

const CHIP: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const CHIP_ATIVO: CSSProperties = { ...CHIP, backgroundColor: '#d4af37', color: '#090a0f', borderColor: '#d4af37' };
const CAMPO: CSSProperties = { padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', colorScheme: 'dark', cursor: 'pointer' };

const HORAS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const diaLisboa = (somarDias: number) => {
  const d = new Date();
  d.setDate(d.getDate() + somarDias);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon' }).format(d);
};

const nomeDia = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });

// Abre o calendário ao clicar em qualquer parte do campo (e não só no ícone).
const abrirCalendario = (e: React.MouseEvent<HTMLInputElement>) => {
  try { e.currentTarget.showPicker?.(); } catch { /* navegador antigo: abre pelo ícone */ }
};

export default function SeletorDataHora({ valor, onChange }: { valor: string; onChange: (v: string) => void }) {
  const [dia, hora] = valor ? valor.split('T') : ['', ''];
  const mudar = (novoDia: string, novaHora: string) => onChange(novoDia ? `${novoDia}T${novaHora || '18:00'}` : '');

  const atalhos = [
    { texto: 'Hoje', dia: diaLisboa(0) },
    { texto: 'Amanhã', dia: diaLisboa(1) },
    { texto: 'Depois de amanhã', dia: diaLisboa(2) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        {atalhos.map((a) => (
          <button type="button" key={a.texto} style={dia === a.dia ? CHIP_ATIVO : CHIP} onClick={() => mudar(a.dia, hora)}>{a.texto}</button>
        ))}
        <input type="date" style={CAMPO} value={dia} onClick={abrirCalendario} onChange={(e) => mudar(e.target.value, hora)} title="Clique para abrir o calendário" />
        {valor && <button type="button" style={{ ...CHIP, color: '#f87171' }} onClick={() => onChange('')}>Limpar</button>}
      </div>
      {dia && (
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {HORAS.map((h) => (
              <button type="button" key={h} style={hora === h ? CHIP_ATIVO : CHIP} onClick={() => mudar(dia, h)}>{h}</button>
            ))}
            <input type="time" style={{ ...CAMPO, padding: '7px' }} value={hora} onClick={abrirCalendario} onChange={(e) => mudar(dia, e.target.value)} title="Outra hora" />
          </div>
          <span style={{ fontSize: '14px', color: '#d4af37' }}>Entrega: {nomeDia(dia)}, às {hora}</span>
        </>
      )}
    </div>
  );
}
