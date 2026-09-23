'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('metricas');
  const [user, setUser] = useState('admin');

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#60a5fa' }}>CARBOX PLANILHA</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'center', marginBottom: '24px' }}>Gestão de Estética Automotiva</p>
          <button 
            onClick={() => setUser('admin')} 
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(37,99,235,0.4)' }}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Cabeçalho */}
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>CBX</div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>CARBOX PLANILHA</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Portugal • Estética Automotiva</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '20px', border: '1px solid #334155', color: '#60a5fa' }}>
            👤 {user}
          </span>
          <button 
            onClick={() => setUser('')} 
            style={{ fontSize: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Menu de Abas */}
      <nav style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderBottom: '1px solid #1e293b', padding: '12px 24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[
          { id: 'metricas', label: '📊 Painel & Métricas' },
          { id: 'os', label: '🔧 Ordens de Serviço' },
          { id: 'agenda', label: '📅 Agenda & Feriados' },
          { id: 'financeiro', label: '💰 Financeiro & Caixa' },
          { id: 'comissoes', label: '👥 Funcionários & Comissões' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: tab === item.id ? '#2563eb' : 'transparent',
              color: tab === item.id ? '#fff' : '#94a3b8',
              boxShadow: tab === item.id ? '0 10px 15px -3px rgba(37,99,235,0.3)' : 'none'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Painel Principal</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Faturamento Real (Mês)</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>0,00 €</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Serviços "A Receber"</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#fbbf24', margin: 0 }}>0,00 €</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>OS Concluídas Hoje</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#60a5fa', margin: 0 }}>0</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Faturas a Pagar</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>0,00 €</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#fff', marginTop: 0 }}>Bem-vindo à CARBOXPLANILHA</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: 0 }}>Sistema integrado de estética automotiva em Portugal com cálculo automático de comissões líquidas.</p>
            </div>
          </div>
        )}

        {tab === 'os' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Ordens de Serviço (OS)</h2>
              <button style={{ backgroundColor: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: 'semibold', padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
                + Nova Ordem de Serviço
              </button>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Nenhuma OS registada no momento. Clique no botão acima para começar.
            </div>
          </div>
        )}

        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Agenda & Feriados</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de Agenda com feriados de Portugal integrado.
            </div>
          </div>
        )}

        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px'}}}}
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Livro-Caixa & Financeiro</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de lançamentos e balanço real financeiro.
            </div>
          </div>
        )}

        {tab === 'comissoes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Gestão de Funcionários & Comissões</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de comissões calculadas sobre o valor líquido.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
