"use client";

import React, { useState } from 'react';
import { 
  Car, 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Calendar, 
  BookOpen, 
  Users, 
  Building2, 
  Menu, 
  X,
  Search,
  Plus,
  Trash2,
  Edit,
  Save
} from 'lucide-react';
import ClientesComponent from '@/components/clientes/clientes';

export default function Home() {
  const [menuAtivo, setMenuAtivo] = useState('clientes'); // Definido para abrir diretamente a aba de clientes/prontuários
  const [sidebarAberta, setSidebarAberta] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar / Menu Lateral */}
      <aside className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col ${sidebarAberta ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarAberta && <span className="font-bold text-lg tracking-wider text-blue-400">CARBOX77</span>}
          <button 
            onClick={() => setSidebarAberta(!sidebarAberta)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setMenuAtivo('veiculos')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'veiculos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Car className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>Veículos no Pátio</span>}
          </button>

          <button 
            onClick={() => setMenuAtivo('painel')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'painel' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>Painel & Gráficos</span>}
          </button>

          <button 
            onClick={() => setMenuAtivo('analise')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'analise' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BarChart3 className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>Análise & Inteligência</span>}
          </button>

          <button 
            onClick={() => setMenuAtivo('os')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'os' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>OS / Agendamento</span>}
          </button>

          <button 
            onClick={() => setMenuAtivo('clientes')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'clientes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>Clientes & Prontuário</span>}
          </button>

          <button 
            onClick={() => setMenuAtivo('caixa')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${menuAtivo === 'caixa' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            {sidebarAberta && <span>Livro-Caixa</span>}
          </button>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">CARBOX77 DETAILING, UNIPESSOAL LDA</h1>
          <span className="text-xs bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full border border-blue-700">Sistema Ativo</span>
        </header>

        <div className="p-6 flex-1">
          {menuAtivo === 'clientes' ? (
            <ClientesComponent />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
              <FileText className="w-16 h-16 mb-4 opacity-40" />
              <p className="text-lg">Módulo em exibição / selecione "Clientes & Prontuário" no menu lateral.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
