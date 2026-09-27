"use client";

import React, { useState } from 'react';

export default function DespesasCustos() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    categoria: '',
    tipoDespesa: '',
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    ficheiro: null as File | null,
  });

  // Lista de despesas (exemplo inicial)
  const [despesas, setDespesas] = useState([
    { id: 1, categoria: 'Aluguer / Renda', tipoDespesa: 'Fixa', descricao: 'Renda Setembro', valor: '1200.00', data: '2026-09-27' },
    { id: 2, categoria: 'Produtos', tipoDespesa: 'Variável', descricao: 'Compra Polidores OS #102', valor: '150.50', data: '2026-09-26' },
  ]);

  // Estados dos Filtros
  const [filtroPedido, setFiltroPedido] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, ficheiro: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoria || !formData.tipoDespesa || !formData.descricao || !formData.valor || !formData.data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaDespesa = {
      id: Date.now(),
      categoria: formData.categoria,
      tipoDespesa: formData.tipoDespesa,
      descricao: formData.descricao,
      valor: formData.valor,
      data: formData.data,
    };

    setDespesas([novaDespesa, ...despesas]);
    
    // Limpar formulário (mantendo a data atual)
    setFormData({
      categoria: '',
      tipoDespesa: '',
      descricao: '',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      ficheiro: null,
    });
  };

  // Lógica de Filtragem
  const despesasFiltradas = despesas.filter((despesa) => {
    const matchPedido = filtroPedido === '' || 
      despesa.descricao.toLowerCase().includes(filtroPedido.toLowerCase()) || 
      despesa.categoria.toLowerCase().includes(filtroPedido.toLowerCase());
      
    const matchData = filtroData === '' || despesa.data === filtroData;

    return matchPedido && matchData;
  });

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Despesas & Custos</h1>
          <p className="text-sm text-slate-400">Registe custos como aluguer, contabilidade, produtos e adicione fotos ou PDFs das faturas.</p>
        </div>

        {/* Formulário de Nova Despesa */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">+ Nova Despesa ou Fatura</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* 1. Categoria (Agora vem primeiro) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="Aluguer / Renda">Aluguer / Renda</option>
                  <option value="Contabilidade">Contabilidade</option>
                  <option value="Produtos">Produtos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              {/* 2. Tipo de Despesa (Fixa/Variável) em texto simples */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Tipo de Despesa (Fixa / Variável) *
                </label>
                <input
                  type="text"
                  name="tipoDespesa"
                  value={formData.tipoDespesa}
                  onChange={handleChange}
                  placeholder="Ex: Fixa ou Variável"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Descrição */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Descrição *
                </label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Ex: Renda Setembro ou Compra Polidores"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* Valor */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Valor (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* Data */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Data *
                </label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Anexar Fatura */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Anexar Fatura (Tirar Foto ou Inserir PDF)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Tirar Foto / Carregar PDF
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
                </label>
                <span className="text-sm text-slate-400">
                  {formData.ficheiro ? formData.ficheiro.name : 'Nenhum ficheiro selecionado'}
                </span>
              </div>
            </div>

            {/* Botão Guardar */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm shadow-md"
            >
              Guardar Despesa
            </button>
          </form>
        </div>

        {/* Secção de Filtros (Pedido/Descrição e Data) */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Filtrar por Pedido / Descrição
            </label>
            <input
              type="text"
              placeholder="Ex: OS, Cliente ou Descrição"
              value={filtroPedido}
              onChange={(e) => setFiltroPedido(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Filtrar por Data
            </label>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <button
              onClick={() => { setFiltroPedido(''); setFiltroData(''); }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Lista de Despesas Registadas */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Despesas Registadas</h2>
          
          {despesasFiltradas.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">Nenhuma despesa encontrada com os filtros selecionados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Categoria</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Descrição</th>
                    <th className="px-4 py-3 text-right">Valor (€)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {despesasFiltradas.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3">{item.data}</td>
                      <td className="px-4 py-3 font-medium text-white">{item.categoria}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs">
                          {item.tipoDespesa}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.descricao}</td>
                      <td className="px-4 py-3 text-right font-semibold text-white">€ {Number(item.valor).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
