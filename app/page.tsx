'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('metricas');
  const [user, setUser] = useState('admin');

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
          <h1 className="text-2xl font-bold text-center mb-2 text-blue-400">CARBOX PLANILHA</h1>
          <p className="text-sm text-slate-400 text-center mb-6">Gestão de Estética Automotiva</p>
          <button 
            onClick={() => setUser('admin')} 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-600/30"
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-lg shadow-md shadow-blue-600/40">CBX</div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">CARBOX PLANILHA</h1>
            <p className="text-xs text-slate-400">Portugal • Estética Automotiva</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-blue-400 font-medium">
            👤 {user}
          </span>
          <button 
            onClick={() => setUser('')} 
            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Menu de Abas */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-6 flex space-x-2 overflow-x-auto py-3">
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
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
              tab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {tab === 'metricas' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Painel Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <p className="text-xs text-slate-400 uppercase font-semibold">Faturamento Real (Mês)</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-2">0,00 €</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <p className="text-xs text-slate-400 uppercase font-semibold">Serviços "A Receber"</p>
                <p className="text-2xl font-extrabold text-amber-400 mt-2">0,00 €</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <p className="text-xs text-slate-400 uppercase font-semibold">OS Concluídas Hoje</p>
                <p className="text-2xl font-extrabold text-blue-400 mt-2">0</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <p className="text-xs text-slate-400 uppercase font-semibold">Faturas a Pagar</p>
                <p className="text-2xl font-extrabold text-red-400 mt-2">0,00 €</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Bem-vindo à CARBOXPLANILHA</h3>
              <p className="text-sm text-slate-400">Sistema integrado de estética automotiva em Portugal com cálculo automático de comissões líquidas.</p>
            </div>
          </div>
        )}

        {tab === 'os' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Ordens de Serviço (OS)</h2>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-md shadow-blue-600/30">
                + Nova Ordem de Serviço
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center text-slate-400">
              Nenhuma OS registada no momento. Clique no botão acima para começar.
            </div>
          </div>
        )}

        {tab === 'agenda' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Agenda & Feriados</h2>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center text-slate-400">
              Módulo de Agenda com feriados de Portugal integrado.
            </div>
          </div>
        )}

        {tab === 'financeiro' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Livro-Caixa & Financeiro</h2>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center text-slate-400">
              Módulo de lançamentos e balanço real financeiro.
            </div>
          </div>
        )}

        {tab === 'comissoes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Gestão de Funcionários & Comissões</h2>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center text-slate-400">
              Módulo de comissões calculadas sobre o valor líquido.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
