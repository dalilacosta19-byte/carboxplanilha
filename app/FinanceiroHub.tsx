'use client';

import React, { useState } from 'react';

export default function FinanceiroHub() {
  const [subTab, setSubTab] = useState<'geral' | 'lancamentos' | 'comissoes'>('geral');
  const [periodo, setPeriodo] = useState<'hoje' | 'semana' | 'mes'>('mes');

  // Estados da Calculadora de Comissões integrada
  const [valorServico, setValorServico] = useState<number>(150);
  const [custosVeiculo, setCustosVeiculo] = useState<number>(30);
  const [percentagem, setPercentagem] = useState<number>(40);
  const [vales, setVales] = useState<number>(20);

  const baseLiquida = Math.max(0, valorServico - custosVeiculo);
  const comissaoBruta = baseLiquida * (percentagem / 100);
  const comissaoFinal = comissaoBruta - vales;

  return (
    <div style={{ backgroundColor: '#0b0f19', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', color: '#fff', minHeight: '80vh' }}>
      
      {/* Cabeçalho do Módulo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>💰 Centro Financeiro CARBOX77</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Gestão unificada de lucros, faturas OCR e comissões da equipa.</p>
        </div>

        {/* Seletor Temporal Global */}
        <div style={{ display: 'flex', backgroundColor: '#131722', padding: '4px', borderRadius: '8px', border: '1px solid #2a3655' }}>
          <button onClick={() => setPeriodo('hoje')} style={{ padding: '6px 12px', background: periodo === 'hoje' ? '#3b82f6' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Hoje</button>
          <button onClick={() => setPeriodo('semana')} style={{ padding: '6px 12px', background: periodo === 'semana' ? '#3b82f6' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Esta Semana</button>
          <button onClick={() => setPeriodo('mes')} style={{ padding: '6px 12px', background: periodo === 'mes' ? '#3b82f6' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Este Mês</button>
        </div>
      </div>

      {/* Sub-Menu de Navegação Interna (Abas limpas) */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '24px' }}>
        <button 
          onClick={() => setSubTab('geral')} 
          style={{ padding: '10px 18px', backgroundColor: subTab === 'geral' ? '#1d4ed8' : '#131722', color: '#fff', border: '1px solid #2a3655', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          📊 Visão Geral & KPIs
        </button>
        <button 
          onClick={() => setSubTab('lancamentos')} 
          style={{ padding: '10px 18px', backgroundColor: subTab === 'lancamentos' ? '#1d4ed8' : '#131722', color: '#fff', border: '1px solid #2a3655', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          🧾 Faturas & OCR
        </button>
        <button 
          onClick={() => setSubTab('comissoes')} 
          style={{ padding: '10px 18px', backgroundColor: subTab === 'comissoes' ? '#1d4ed8' : '#131722', color: '#fff', border: '1px solid #2a3655', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          ⚙️ Comissões & Vales
        </button>
      </div>

      {/* CONTEÚDO DA ABA 1: VISÃO GERAL */}
      {subTab === 'geral' && (
        <div>
          {/* Cartões de KPI */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>FATURAMENTO BRUTO</span>
              <h3 style={{ fontSize: '28px', color: '#4ade80', margin: '8px 0 0 0' }}>+1,850.00 €</h3>
            </div>
            <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>CUSTOS & DESPESAS TOTAIS</span>
              <h3 style={{ fontSize: '28px', color: '#f87171', margin: '8px 0 0 0' }}>-620.00 €</h3>
            </div>
            <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655', borderColor: '#3b82f6' }}>
              <span style={{ fontSize: '13px', color: '#93c5fd' }}>LUCRO LÍQUIDO REAL</span>
              <h3 style={{ fontSize: '28px', color: '#60a5fa', margin: '8px 0 0 0' }}>1,230.00 €</h3>
            </div>
          </div>
          <div style={{ backgroundColor: '#131722', padding: '25px', borderRadius: '12px', border: '1px solid #2a3655', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', margin: 0 }}>Gráfico de evolução e resumo diário para o período selecionado ({periodo}).</p>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: LANÇAMENTOS E OCR */}
      {subTab === 'lancamentos' && (
        <div style={{ backgroundColor: '#131722', padding: '25px', borderRadius: '12px', border: '1px solid #2a3655' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#fff' }}>📸 Leitor Inteligente de Faturas (OCR)</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Tira uma foto ou carrega o PDF da fatura do fornecedor. O sistema lê e lança automaticamente nas despesas.</p>
          
          <div style={{ border: '2px dashed #334155', padding: '30px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#07080c' }}>
            <span style={{ fontSize: '16px', color: '#60a5fa' }}>📂 Clica aqui para carregar fatura ou tirar foto</span>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 3: COMISSÕES E VALES */}
      {subTab === 'comissoes' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#93c5fd' }}>⚙️ Simulação de Acerto por Serviço</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <label>Valor do Serviço (€):
                <input type="number" value={valorServico} onChange={(e) => setValorServico(Number(e.target.value))} style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }} />
              </label>
              <label>Custos de Peças/Produtos do Veículo (€):
                <input type="number" value={custosVeiculo} onChange={(e) => setCustosVeiculo(Number(e.target.value))} style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }} />
              </label>
              <label>Percentagem do Técnico (%):
                <input type="number" value={percentagem} onChange={(e) => setPercentagem(Number(e.target.value))} style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }} />
              </label>
              <label>Vales / Adiantamentos a Descontar (€):
                <input type="number" value={vales} onChange={(e) => setVales(Number(e.target.value))} style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#07080c', border: '1px solid #2a3655', borderRadius: '6px', color: '#fff' }} />
              </label>
            </div>
          </div>

          <div style={{ backgroundColor: '#131722', padding: '25px', borderRadius: '12px', border: '1px solid #2a3655', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#fff', fontSize: '18px' }}>Resumo do Acerto</h4>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#94a3b8' }}>Base Líquida (Serviço - Custos): <strong>{baseLiquida.toFixed(2)} €</strong></p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#94a3b8' }}>Comissão Bruta ({percentagem}%): <strong>{comissaoBruta.toFixed(2)} €</strong></p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#f87171' }}>Menos Vales / Adiantamentos: <strong>-{vales.toFixed(2)} €</strong></p>
            <hr style={{ borderColor: '#2a3655', margin: '15px 0' }}/>
            <p style={{ margin: 0, fontSize: '18px', color: '#4ade80' }}>Total a Pagar ao Técnico: <strong>{comissaoFinal.toFixed(2)} €</strong></p>
          </div>
        </div>
      )}

    </div>
  );
}
