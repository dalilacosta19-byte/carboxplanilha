'use client';

import React, { useState } from 'react';

export default function CalculadoraComissao() {
  const [valorServico, setValorServico] = useState<number>(150);
  const [custosVeiculo, setCustosVeiculo] = useState<number>(30);
  const [percentagem, setPercentagem] = useState<number>(40);
  const [vales, setVales] = useState<number>(20);

  // Cálculos automáticos em tempo real
  const baseLiquida = Math.max(0, valorServico - custosVeiculo);
  const comissaoBruta = baseLiquida * (percentagem / 100);
  const comissaoFinal = comissaoBruta - vales;

  return (
    <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655', color: '#fff', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#93c5fd' }}>⚙️ Acerto de Comissão do Técnico</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
        <label>
          Valor do Serviço (€):
          <input 
            type="number" 
            value={valorServico} 
            onChange={(e) => setValorServico(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }}
          />
        </label>

        <label>
          Custos de Peças/Produtos do Veículo (€):
          <input 
            type="number" 
            value={custosVeiculo} 
            onChange={(e) => setCustosVeiculo(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }}
          />
        </label>

        <label>
          Percentagem do Técnico (%):
          <input 
            type="number" 
            value={percentagem} 
            onChange={(e) => setPercentagem(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }}
          />
        </label>

        <label>
          Vales / Adiantamentos a Descontar (€):
          <input 
            type="number" 
            value={vales} 
            onChange={(e) => setVales(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#07080c', borderRadius: '8px', border: '1px solid #1e293b' }}>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#94a3b8' }}>Base Líquida: <strong>{baseLiquida.toFixed(2)}€</strong></p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#94a3b8' }}>Comissão Bruta ({percentagem}%): <strong>{comissaoBruta.toFixed(2)}€</strong></p>
        <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: '#4ade80' }}>A Pagar ao Técnico: <strong>{comissaoFinal.toFixed(2)}€</strong></p>
      </div>
    </div>
  );
}
