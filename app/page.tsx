'use client';

import React, { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('patio');
  const [user, setUser] = useState('admin');

  // Estado dos Funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', tipo: 'comissao', valor: 30 },
    { id: 2, nome: 'Miguel Santos', tipo: 'fixo', valor: 1000 },
    { id: 3, nome: 'Ricardo Costa', tipo: 'diaria', valor: 75 }
  ]);
  const [novoNomeFunc, setNovoNomeFunc] = useState('');
  const [novoTipoFunc, setNovoTipoFunc] = useState('comissao');
  const [novoValorFunc, setNovoValorFunc] = useState('');

  // Adiantamentos de Funcionários
  const [adiantamentos, setAdiantamentos] = useState([
    { id: 1, funcionarioId: 1, data: '2026-09-10', descricao: 'Adiantamento quinzenal', valor: 100, formaPagamento: 'MB Way' }
  ]);
  const [funcSelecionadoAdiantamento, setFuncSelecionadoAdiantamento] = useState<number>(1);
  const [valorAdiantamento, setValorAdiantamento] = useState('');
  const [formaPgtoAdiantamento, setFormaPgtoAdiantamento] = useState('MB Way');

  // Estado de OS e Orçamentos com Matrícula, Profissional por Serviço e Desconto por Serviço
  const [pesquisaMatriculaCliente, setPesquisaMatriculaCliente] = useState('');
  const [osLista, setOsLista] = useState([
    {
      id: 1,
      cliente: 'Carlos Silva',
      matricula: 'AB-12-CD',
      veiculo: 'BMW M3',
      servicos: [
        { descricao: 'Polimento Detalhado', profissional: 'João Silva', valor: 450, desconto: 20 },
        { descricao: 'Vitrificação', profissional: 'João Silva', valor: 600, desconto: 0 }
      ],
      status: 'Em Andamento',
      data: '2026-09-25'
    }
  ]);

  // Função para adicionar funcionário
  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNomeFunc || !novoValorFunc) return;
    setFuncionarios([...funcionarios, {
      id: Date.now(),
      nome: novoNomeFunc,
      tipo: novoTipoFunc,
      valor: Number(novoValorFunc)
    }]);
    setNovoNomeFunc('');
    setNovoValorFunc('');
  };

  // Função para registar adiantamento
  const registarAdiantamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valorAdiantamento) return;
    setAdiantamentos([...adiantamentos, {
      id: Date.now(),
      funcionarioId: Number(funcSelecionadoAdiantamento),
      data: new Date().toISOString().split('T')[0],
      descricao: 'Adiantamento registado',
      valor: Number(valorAdiantamento),
      formaPagamento: formaPgtoAdiantamento
    }]);
    setValorAdiantamento('');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Topo / Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-amber-500">CARBOX77 DETAILING, UNIPESSOAL LDA</h1>
          <p className="text-xs text-slate-400">Pavilhão Guilherme Pinto Baiao, R. da Torre, 2750-748 Cascais, Portugal | +351 21 151 5649</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setUser(user === 'admin' ? 'operacional' : 'admin')}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold px-4 py-2 rounded text-sm transition"
          >
            {user === 'admin' ? 'Modo: Administrador' : 'Modo: Operacional'}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Menu Lateral */}
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setTab('patio')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'patio' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            🚗 Veículos no Pátio
          </button>
          <button 
            onClick={() => setTab('os')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'os' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            📋 Ordens de Serviço (OS)
          </button>
          <button 
            onClick={() => setTab('orcamento')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'orcamento' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            📑 Orçamentos
          </button>
          <button 
            onClick={() => setTab('agenda')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'agenda' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            📅 Agenda
          </button>
          <button 
            onClick={() => setTab('relatorio')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'relatorio' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            📊 Relatório Diário
          </button>
          <button 
            onClick={() => setTab('funcionarios')}
            className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'funcionarios' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            👥 Gestão de Funcionários & Salários
          </button>
          {user === 'admin' && (
            <button 
              onClick={() => setTab('financeiro')}
              className={`text-left px-4 py-2.5 rounded text-sm font-medium transition ${tab === 'financeiro' ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              💰 Financeiro & Custos
            </button>
          )}
        </aside>

        {/* Conteúdo Principal */}
        <section className="flex-1 p-8 overflow-y-auto">
          {tab === 'patio' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Veículos no Pátio</h2>
              <p className="text-slate-400 mb-6">Consulte os veículos presentes na oficina e o estado dos serviços.</p>
              
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-sm text-slate-300">Nenhum alerta pendente. O pátio está atualizado.</p>
              </div>
            </div>
          )}

          {tab === 'os' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Ordens de Serviço (OS)</h2>
              <p className="text-slate-400 mb-6">Gestão de OS com atribuição de profissionais por serviço e descontos individuais.</p>

              {/* Barra de Pesquisa por Matrícula ou Cliente */}
              <div className="mb-6">
                <input 
                  type="text"
                  placeholder="Pesquisar por Matrícula (ex: AB-12-CD) ou Cliente..."
                  value={pesquisaMatriculaCliente}
                  onChange={(e) => setPesquisaMatriculaCliente(e.target.value)}
                  className="w-full max-w-md bg-slate-900 border border-slate-700 rounded px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-4">
                {osLista
                  .filter(os => 
                    os.matricula.toLowerCase().includes(pesquisaMatriculaCliente.toLowerCase()) || 
                    os.cliente.toLowerCase().includes(pesquisaMatriculaCliente.toLowerCase())
                  )
                  .map(os => (
                    <div key={os.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-amber-400">{os.veiculo} - <span className="text-white">{os.matricula}</span></h3>
                          <p className="text-xs text-slate-400">Cliente: {os.cliente} | Data: {os.data}</p>
                        </div>
                        <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-xs font-semibold">{os.status}</span>
                      </div>

                      <div className="border-t border-slate-800 pt-4">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Serviços, Profissionais e Descontos:</h4>
                        <div className="space-y-2">
                          {os.servicos.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-slate-950 p-3 rounded text-sm border border-slate-800/60">
                              <div>
                                <span className="font-medium text-slate-200">{s.descricao}</span>
                                <span className="text-xs text-amber-500/90 ml-3">👤 Profissional: {s.profissional}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-slate-400 line-through mr-2">€{s.desconto > 0 ? s.valor.toFixed(2) : ''}</span>
                                <span className="font-bold text-slate-100">€{(s.valor - s.desconto).toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {tab === 'orcamento' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Orçamentos</h2>
              <p className="text-slate-400 mb-6">Crie e consulte orçamentos com desconto aplicado por serviço individual.</p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-sm text-slate-300">Módulo de orçamentos preparado para novos registos com atribuição de profissionais por linha.</p>
              </div>
            </div>
          )}

          {tab === 'agenda' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Agenda</h2>
              <p className="text-slate-400 mb-6">Consulte os agendamentos e sinais recebidos.</p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-sm text-slate-300">Calendário de marcações limpo e organizado.</p>
              </div>
            </div>
          )}

          {tab === 'relatorio' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Relatório Diário</h2>
              <p className="text-slate-400 mb-6">Acompanhe o movimento do dia.</p>
            </div>
          )}

          {tab === 'funcionarios' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Gestão de Funcionários & Salários</h2>
              <p className="text-slate-400 mb-6">Configure comissões, salários fixos, diárias e registe adiantamentos.</p>
              
              {/* Formulário Novo Funcionário */}
              <form onSubmit={adicionarFuncionario} className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6 flex gap-4 items-end">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nome do Funcionário</label>
                  <input 
                    type="text"
                    value={novoNomeFunc}
                    onChange={(e) => setNovoNomeFunc(e.target.value)}
                    placeholder="Ex: Ana Souza"
                    className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tipo de Remuneração</label>
                  <select 
                    value={novoTipoFunc}
                    onChange={(e) => setNovoTipoFunc(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="comissao">Porcentagem (%)</option>
                    <option value="fixo">Salário Fixo (€)</option>
                    <option value="diaria">Diária (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Valor / %</label>
                  <input 
                    type="number"
                    value={novoValorFunc}
                    onChange={(e) => setNovoValorFunc(e.target.value)}
                    placeholder="30"
                    className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500 w-28"
                  />
                </div>
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded text-sm transition">
                  Adicionar Funcionário
                </button>
              </form>

              {/* Lista de Funcionários */}
              <div className="space-y-4">
                {funcionarios.map(f => (
                  <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white">{f.nome}</h3>
                      <p className="text-xs text-slate-400">
                        Remuneração: {f.valor}{f.tipo === 'comissao' ? '% (Comissão Líquida)' : f.tipo === 'fixo' ? '€ (Fixo)' : '€ (Diária)'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'financeiro' && user === 'admin' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Financeiro & Custos</h2>
              <p className="text-slate-400 mb-6">Visão centralizada de entradas, custos fixos e lucro real.</p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-sm text-slate-300">Módulo financeiro inteligente pronto a receber os próximos ajustes.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
