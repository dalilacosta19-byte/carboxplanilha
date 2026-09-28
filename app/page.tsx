"use client";

import React, { useState } from 'react';

export default function CarboxApp() {
  const [aba, setAba] = useState('funcionarios');

  // Estados para Despesas
  const [formDataDespesa, setFormDataDespesa] = useState({
    categoria: '',
    tipoDespesa: '',
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
  });
  const [despesas, setDespesas] = useState([
    { id: 1, categoria: 'Aluguer / Renda', tipoDespesa: 'Fixa', descricao: 'Renda Setembro', valor: '1200.00', data: '2026-09-27' },
  ]);

  // Estados para Funcionários & Salários
  const [funcionarioId, setFuncionarioId] = useState('1');
  const [filtroPeriodo, setFiltroPeriodo] = useState('2026-09');

  const servicosFuncionario = [
    { id: 1, data: '2026-09-25', veiculo: 'BMW M3 (AB-12-CD)', servico: 'Polimento Detalhado', valorTotal: 450.00, geradoEmpresa: 270.00, comissaoRecebida: 180.00 },
    { id: 2, data: '2026-09-20', veiculo: 'Audi RS6 (EF-34-GH)', servico: 'Vitrificação', valorTotal: 600.00, geradoEmpresa: 360.00, comissaoRecebida: 240.00 },
  ];

  const adiantamentosFuncionario = [
    { id: 1, data: '2026-09-10', valor: 100.00, nota: 'Adiantamento quinzenal' },
  ];

  const totalServicos = servicosFuncionario.reduce((acc, curr) => acc + curr.valorTotal, 0);
  const totalGeradoEmpresa = servicosFuncionario.reduce((acc, curr) => acc + curr.geradoEmpresa, 0);
  const totalRecebido = servicosFuncionario.reduce((acc, curr) => acc + curr.comissaoRecebida, 0);
  const totalAdiantamentos = adiantamentosFuncionario.reduce((acc, curr) => acc + curr.valor, 0);
  const saldoLiquido = totalRecebido - totalAdiantamentos;

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Menu de Navegação Superior */}
        <div className="flex gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setAba('funcionarios')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              aba === 'funcionarios' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Funcionários & Salários
          </button>
          <button
            onClick={() => setAba('despesas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              aba === 'despesas' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Despesas & Custos
          </button>
        </div>

        {/* CONTEÚDO DA ABA: FUNCIONÁRIOS & SALÁRIOS */}
        {aba === 'funcionarios' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Funcionários & Salários</h1>
              <p className="text-sm text-slate-400">Consulte o desempenho, veículos trabalhados, adiantamentos e valores a receber.</p>
            </div>

            {/* Filtros */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Selecionar Funcionário</label>
                <select
                  value={funcionarioId}
                  onChange={(e) => setFuncionarioId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="1">Carlos Silva</option>
                  <option value="2">Marcos Oliveira</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Filtrar por Mês / Período</label>
                <input
                  type="month"
                  value={filtroPeriodo}
                  onChange={(e) => setFiltroPeriodo(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
            </div>

            {/* Cartões de Resumo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Valor Total Serviços</p>
                <p className="text-2xl font-bold text-white">€ {totalServicos.toFixed(2)}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Gerado p/ Empresa</p>
                <p className="text-2xl font-bold text-blue-400">€ {totalGeradoEmpresa.toFixed(2)}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Comissões</p>
                <p className="text-2xl font-bold text-yellow-400">€ {totalRecebido.toFixed(2)}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md border-l-4 border-l-green-500">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Saldo a Receber Líquido</p>
                <p className="text-2xl font-bold text-green-400">€ {saldoLiquido.toFixed(2)}</p>
                <span className="text-xs text-slate-500">Descontado € {totalAdiantamentos.toFixed(2)} adiantados</span>
              </div>
            </div>

            {/* Tabela de Veículos e Serviços */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Veículos e Serviços Realizados</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Data</th>
                      <th className="px-4 py-3">Veículo</th>
                      <th className="px-4 py-3">Serviço</th>
                      <th className="px-4 py-3 text-right">Valor Serviço (€)</th>
                      <th className="px-4 py-3 text-right">Gerado p/ Empresa (€)</th>
                      <th className="px-4 py-3 text-right">A Receber (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {servicosFuncionario.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-slate-400">{item.data}</td>
                        <td className="px-4 py-3 font-medium text-white">{item.veiculo}</td>
                        <td className="px-4 py-3">{item.servico}</td>
                        <td className="px-4 py-3 text-right">€ {item.valorTotal.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-blue-400">€ {item.geradoEmpresa.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-yellow-400">€ {item.comissaoRecebida.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela de Adiantamentos */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Adiantamentos Registados no Período</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Data</th>
                      <th className="px-4 py-3">Nota / Descrição</th>
                      <th className="px-4 py-3 text-right">Valor Adiantado (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {adiantamentosFuncionario.map((adt) => (
                      <tr key={adt.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-slate-400">{adt.data}</td>
                        <td className="px-4 py-3 text-white">{adt.nota}</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-400">- € {adt.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: DESPESAS & CUSTOS */}
        {aba === 'despesas' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Despesas & Custos</h1>
              <p className="text-sm text-slate-400">Registe custos e faturas da empresa.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <p className="text-slate-300 text-sm">Painel de despesas ativo e pronto a utilizar.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
