"use client";

import React, { useState } from "react";
import { UserPlus, Car, Phone, Mail, Search, History, User, FileText, Plus, X, DollarSign } from "lucide-react";

interface ServicoHistorico {
  id: string;
  data: string;
  veiculo: string;
  matricula: string;
  servico: string;
  valor: number;
  observacoes: string;
}

interface Cliente {
  id: string;
  nome: string;
  apelido: string;
  telefone: string;
  email: string;
  matricula: string;
  modelo: string;
  ano: string;
  historico: ServicoHistorico[];
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "João",
      apelido: "Silva",
      telefone: "+351 912 345 678",
      email: "joao@email.com",
      matricula: "AA-00-BB",
      modelo: "BMW Série 3",
      ano: "2021",
      historico: [
        {
          id: "h1",
          data: "2026-02-10",
          veiculo: "BMW Série 3",
          matricula: "AA-00-BB",
          servico: "Polimento Comercial + Proteção Cerâmica",
          valor: 350,
          observacoes: "Pintura com alguns swirls leves, resultado excelente."
        }
      ]
    },
  ]);

  const [busca, setBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  
  // Estados para novo serviço no histórico
  const [novoServico, setNovoServico] = useState({
    servico: "",
    valor: "",
    veiculo: "",
    matricula: "",
    observacoes: ""
  });
  const [mostrarModalServico, setMostrarModalServico] = useState(false);

  const [novoCliente, setNovoCliente] = useState<Omit<Cliente, "id" | "historico">>({
    nome: "",
    apelido: "",
    telefone: "",
    email: "",
    matricula: "",
    modelo: "",
    ano: "",
  });

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCliente.nome || !novoCliente.telefone || !novoCliente.matricula) {
      alert("Por favor, preencha o Nome, Telefone e a Matrícula!");
      return;
    }

    const item: Cliente = {
      ...novoCliente,
      id: Date.now().toString(),
      historico: [
        {
          id: Date.now().toString(),
          data: new Date().toISOString().split('T')[0],
          veiculo: novoCliente.modelo || "Veículo Principal",
          matricula: novoCliente.matricula,
          servico: "Registo Inicial / Orçamento",
          valor: 0,
          observacoes: "Registo inicial do cliente no sistema."
        }
      ]
    };

    setClientes([item, ...clientes]);
    setNovoCliente({
      nome: "",
      apelido: "",
      telefone: "",
      email: "",
      matricula: "",
      modelo: "",
      ano: "",
    });
    alert("Cliente e Veículo registados com sucesso!");
  };

  const handleAdicionarServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionado || !novoServico.servico || !novoServico.valor) {
      alert("Preencha o serviço e o valor!");
      return;
    }

    const novoRegisto: ServicoHistorico = {
      id: Date.now().toString(),
      data: new Date().toISOString().split('T')[0],
      veiculo: novoServico.veiculo || clienteSelecionado.modelo,
      matricula: novoServico.matricula || clienteSelecionado.matricula,
      servico: novoServico.servico,
      valor: parseFloat(novoServico.valor) || 0,
      observacoes: novoServico.observacoes
    };

    const clientesAtualizados = clientes.map(c => {
      if (c.id === clienteSelecionado.id) {
        const atualizado = {
          ...c,
          historico: [novoRegisto, ...c.historico]
        };
        setClienteSelecionado(atualizado);
        return atualizado;
      }
      return c;
    });

    setClientes(clientesAtualizados);
    setNovoServico({ servico: "", valor: "", veiculo: "", matricula: "", observacoes: "" });
    setMostrarModalServico(false);
    alert("Serviço adicionado ao prontuário do cliente com sucesso!");
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.matricula.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone.includes(busca)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="text-blue-500" /> Gestão de Clientes & Prontuários
          </h2>
          <p className="text-xs text-slate-400">Histórico completo, viaturas e serviços prestados por cliente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Registo */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-400" /> Novo Registo
          </h3>

          <form onSubmit={handleCadastrar} className="space-y-3 text-sm">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nome *</label>
              <input
                type="text"
                required
                value={novoCliente.nome}
                onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                placeholder="Ex: Carlos"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Apelido</label>
              <input
                type="text"
                value={novoCliente.apelido}
                onChange={(e) => setNovoCliente({ ...novoCliente, apelido: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                placeholder="Ex: Ferreira"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Telefone (Obrigatório) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={novoCliente.telefone}
                  onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                  className="w-full pl-9 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="+351 910 000 000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  value={novoCliente.email}
                  onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                  className="w-full pl-9 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="cliente@email.com"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">
                Dados do Veículo
              </span>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Matrícula *</label>
                  <div className="relative">
                    <Car className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={novoCliente.matricula}
                      onChange={(e) => setNovoCliente({ ...novoCliente, matricula: e.target.value.toUpperCase() })}
                      className="w-full pl-9 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white uppercase font-mono"
                      placeholder="AA-00-BB"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Modelo</label>
                    <input
                      type="text"
                      value={novoCliente.modelo}
                      onChange={(e) => setNovoCliente({ ...novoCliente, modelo: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      placeholder="Ex: Audi A4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Ano</label>
                    <input
                      type="text"
                      value={novoCliente.ano}
                      onChange={(e) => setNovoCliente({ ...novoCliente, ano: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      placeholder="2020"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all mt-4"
            >
              Guardar Cliente & Veículo
            </button>
          </form>
        </div>

        {/* Lista de Clientes */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <h3 className="text-lg font-bold text-white">Clientes Cadastrados</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                placeholder="Pesquisar por Nome, Matrícula..."
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {clientesFiltrados.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Nenhum cliente ou veículo encontrado.</p>
            ) : (
              clientesFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-600 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">
                        {item.nome} {item.apelido}
                      </span>
                      <span className="bg-blue-900/60 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-700 font-mono font-bold">
                        {item.matricula}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-3">
                      <span>📞 {item.telefone}</span>
                      {item.email && <span>✉️ {item.email}</span>}
                    </p>
                    <p className="text-xs text-slate-400">
                      🚗 {item.modelo || "Sem modelo"} {item.ano ? `(${item.ano})` : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => setClienteSelecionado(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs text-white rounded-lg transition-all font-semibold"
                  >
                    <History className="w-3.5 h-3.5" /> Ver Prontuário
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE PRONTUÁRIO / HISTÓRICO DO CLIENTE */}
      {clienteSelecionado && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-3xl rounded-xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs text-blue-400 uppercase font-bold tracking-wider">Prontuário 360º</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                  {clienteSelecionado.nome} {clienteSelecionado.apelido}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  📞 {clienteSelecionado.telefone} {clienteSelecionado.email ? `| ✉️ ${clienteSelecionado.email}` : ""}
                </p>
              </div>
              <button
                onClick={() => setClienteSelecionado(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resumo Financeiro do Cliente */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-lg border border-slate-700">
              <div>
                <span className="text-xs text-slate-400 block">Total Investido</span>
                <span className="text-lg font-bold text-emerald-400">
                  {clienteSelecionado.historico.reduce((acc, h) => acc + h.valor, 0).toFixed(2)} €
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Serviços Realizados</span>
                <span className="text-lg font-bold text-white">{clienteSelecionado.historico.length}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Viatura Principal</span>
                <span className="text-sm font-bold text-blue-400">{clienteSelecionado.modelo || clienteSelecionado.matricula}</span>
              </div>
            </div>

            {/* Histórico / Linha do Tempo */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" /> Histórico de Serviços & Viaturas
                </h4>
                <button
                  onClick={() => setMostrarModalServico(!mostrarModalServico)}
                  className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Registo
                </button>
              </div>

              {/* Formulário rápido para adicionar serviço ao histórico */}
              {mostrarModalServico && (
                <form onSubmit={handleAdicionarServico} className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3">
                  <h5 className="text-xs font-bold text-blue-400 uppercase">Novo Registo no Prontuário</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Serviço Realizado *</label>
                      <input
                        type="text"
                        required
                        value={novoServico.servico}
                        onChange={(e) => setNovoServico({ ...novoServico, servico: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                        placeholder="Ex: Vitrificação de Pintura"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Valor (€) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={novoServico.valor}
                        onChange={(e) => setNovoServico({ ...novoServico, valor: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                        placeholder="Ex: 250.00"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Modelo da Viatura</label>
                      <input
                        type="text"
                        value={novoServico.veiculo || clienteSelecionado.modelo}
                        onChange={(e) => setNovoServico({ ...novoServico, veiculo: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Matrícula</label>
                      <input
                        type="text"
                        value={novoServico.matricula || clienteSelecionado.matricula}
                        onChange={(e) => setNovoServico({ ...novoServico, matricula: e.target.value.toUpperCase() })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white uppercase font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Observações Técnicas</label>
                    <textarea
                      value={novoServico.observacoes}
                      onChange={(e) => setNovoServico({ ...novoServico, observacoes: e.target.value })}
                      className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                      placeholder="Ex: Notas sobre o estado da pintura, produtos aplicados..."
                      rows={2}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setMostrarModalServico(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded"
                    >
                      Salvar no Prontuário
                    </button>
                  </div>
                </form>
              )}

              {/* Listagem do Histórico */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {clienteSelecionado.historico.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">Sem registos no histórico.</p>
                ) : (
                  clienteSelecionado.historico.map((hist) => (
                    <div key={hist.id} className="bg-slate-900 p-3 rounded border border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{hist.servico}</span>
                          <span className="text-xs px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">{hist.matricula}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          📅 {hist.data} | 🚗 {hist.veiculo} {hist.observacoes ? `| 📝 ${hist.observacoes}` : ""}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-800">
                        {hist.valor.toFixed(2)} €
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-700">
              <button
                onClick={() => setClienteSelecionado(null)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-all"
              >
                Fechar Prontuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
