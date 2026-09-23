'use client';

import React, { useState } from 'react';

export default function CarboxPlanilhaApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setUserRole('admin');
    } else if (username === 'gerente' && password === '1234') {
      setIsAuthenticated(true);
      setUserRole('gerente');
    } else if (username === 'funcionario' && password === '1234') {
      setIsAuthenticated(true);
      setUserRole('funcionario');
    } else {
      alert('Credenciais inválidas! Use admin / 1234');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">CARBOX PLANILHA</h1>
            <p className="text-sm text-slate-500 mt-1">Estética Automotiva — Portugal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Utilizador</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: admin"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Palavra-passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              Entrar no Sistema
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400">
            Acesso padrão: <span className="font-mono text-slate-600">admin</span> / <span className="font-mono text-slate-600">1234</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-slate-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-lg tracking-wider text-blue-400">CARBOX PLANILHA</span>
            <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 uppercase">
              Perfil: {userRole}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-300">Sessão iniciada como: <strong>{username}</strong></span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 Painel & Métricas
          </button>
          <button
            onClick={() => setActiveTab('os')}
            className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'os' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            🚗 Ordens de Serviço (OS)
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'agenda' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📅 Agenda & Feriados
          </button>
          <button
            onClick={() => setActiveTab('financeiro')}
            className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'financeiro' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            💶 Financeiro & Caixa
          </button>
          <button
            onClick={() => setActiveTab('funcionarios')}
            className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'funcionarios' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            👥 Funcionários & Comissões
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Painel Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Faturamento Real (Mês)</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">0,00 €</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Serviços "A Receber"</p>
                <p className="text-2xl font-bold text-amber-600 mt-2">0,00 €</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">OS Concluídas Hoje</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Faturas a Pagar (Fornecedores)</p>
                <p className="text-2xl font-bold text-red-600 mt-2">0,00 €</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-md font-semibold text-slate-700 mb-3">Bem-vindo à CARBOXPLANILHA</h3>
              <p className="text-sm text-slate-600">
                Sistema integrado de estética automotiva em Portugal com cálculo automático de comissões líquidas.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'os' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Ordens de Serviço (OS)</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                + Nova Ordem de Serviço
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center py-12 text-slate-400">
              Módulo de OS em preparação.
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Agenda & Feriados</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center py-12 text-slate-400">
              Módulo de Agenda com feriados de Portugal.
            </div>
          </div>
        )}

        {activeTab === 'financeiro' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Livro-Caixa & Financeiro</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center py-12 text-slate-400">
              Módulo de lançamentos e balanço real.
            </div>
          </div>
        )}

        {activeTab === 'funcionarios' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Gestão de Funcionários & Comissões</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center py-12 text-slate-400">
              Módulo de comissões calculadas sobre o valor líquido.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
