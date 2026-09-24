'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Package, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Car, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  FileSpreadsheet,
  Download,
  RefreshCcw,
  Sparkles
} from 'lucide-react';

export default function CarboxDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/20">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white">CARBOX77</h1>
            <p className="text-xs text-slate-400">DETAILING, UNIPESSOAL LDA</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistema Ativo
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-slate-800 bg-slate-900/30 px-6 flex space-x-2 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab('orcamentos')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'orcamentos' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Orçamentos & Faturação
        </button>
        <button 
          onClick={() => setActiveTab('analise')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'analise' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Análise & Inteligência
        </button>
        <button 
          onClick={() => setActiveTab('agendamento')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'agendamento' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Agendamento
        </button>
        <button 
          onClick={() => setActiveTab('servicos')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'servicos' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Serviços & Produtos
        </button>
        <button 
          onClick={() => setActiveTab('livro')}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'livro' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Livro de Caixa
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Faturamento Mensal</p>
                <h3 className="text-2xl font-bold text-white mt-2">12.450,00 €</h3>
                <span className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +15% que o mês passado
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Serviços Concluídos</p>
                <h3 className="text-2xl font-bold text-white mt-2">48</h3>
                <span className="text-xs text-cyan-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4 em andamento hoje
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Orçamentos Pendentes</p>
                <h3 className="text-2xl font-bold text-white mt-2">12</h3>
                <span className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Requer atenção
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Satisfação de Clientes</p>
                <h3 className="text-2xl font-bold text-white mt-2">99.4%</h3>
                <span className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Excelente
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Bem-vindo ao Sistema CARBOX77</h3>
              <p className="text-sm text-slate-400">
                Selecione uma aba no menu superior para gerir orçamentos, consultar análises financeiras, agendar serviços ou controlar o livro de caixa.
              </p>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center py-16">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Módulo em Exibição</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Esta secção está pronta a ser utilizada. Podes navegar livremente pelas outras abas ou pedir para personalizarmos este conteúdo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
