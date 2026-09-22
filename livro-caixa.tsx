'use client'

import React, { useState } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface Transacao {
  id: number
  descricao: string
  valor: number
  tipo: 'entrada' | 'saida'
  data: string
}

export default function LivroCaixa() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('entrada')

  const adicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!descricao || !valor) return

    const novaTransacao: Transacao = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      tipo,
      data: new Date().toLocaleDateString('pt-BR'),
    }

    setTransacoes([...transacoes, novaTransacao])
    setDescricao('')
    setValor('')
  }

  const removerTransacao = (id: number) => {
    setTransacoes(transacoes.filter((t) => t.id !== id))
  }

  const entradas = transacoes
    .filter((t) => t.tipo === 'entrada')
    .reduce((acc, t) => acc + t.valor, 0)

  const saidas = transacoes
    .filter((t) => t.tipo === 'saida')
    .reduce((acc, t) => acc + t.valor, 0)

  const saldo = entradas - saidas

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center py-4 border-b bg-white rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Livro Caixa - Carbox</h1>
          <p className="text-gray-500 text-sm">Controlo Financeiro Simples</p>
        </header>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Entradas</p>
              <p className="text-2xl font-bold text-emerald-600">
                R$ {entradas.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
              <TrendingUp size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-rose-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saídas</p>
              <p className="text-2xl font-bold text-rose-600">
                R$ {saidas.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-rose-50 rounded-full text-rose-600">
              <TrendingDown size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={adicionarTransacao} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Nova Transação</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 text-gray-800"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'entrada' | 'saida')}
              className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Plus size={20} /> Adicionar
          </button>
        </form>

        {/* Lista de Histórico */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Histórico</h2>
          {transacoes.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhuma transação registada.</p>
          ) : (
            <div className="space-y-3">
              {transacoes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        t.tipo === 'entrada'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {t.tipo.toUpperCase()}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{t.descricao}</p>
                      <p className="text-xs text-gray-400">{t.data}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-semibold ${
                        t.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removerTransacao(t.id)}
                      className="text-gray-400 hover:text-rose-600 p-1 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}