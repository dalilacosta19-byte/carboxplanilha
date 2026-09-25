"use client";

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Car, 
  FileText, 
  DollarSign, 
  Building, 
  LayoutDashboard
} from 'lucide-react';

interface Agendamento {
  id: number;
  nome: string;
  paisTel1: string;
  telefonePrincipal: string;
  paisTel2: string;
  telefone2: string;
  viatura: string;
  matricula: string;
  data: string;
  hora: string;
  notas: string;
  telPrincipal?: string;
  tel2?: string;
}

export default function AgendamentoPage() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    paisTel1: '+351',
    telefonePrincipal: '',
    paisTel2: '', // Deixado em branco por padrão para aceitar qualquer país
    telefone2: '',
    viatura: '',
    matricula: '',
    data: '',
    hora: '',
    notas: ''
  });

  // Lista de agendamentos (para exibir no painel da direita)
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      nome: 'Carla Monteiro',
      viatura: 'Renault Captur',
      matricula: 'AZ-91-GI',
      paisTel1: '+351',
      telefonePrincipal: '922 333 444',
      paisTel2: '+351',
      telefone2: '911 222 333',
      notas: 'Avaliação inicial do estado da pintura',
      data: '2026-09-30',
      hora: '10:00',
      telPrincipal: '+351 922 333 444',
      tel2: '+351 911 222 333'
    }
  ]);

  const horariosDisponiveis = [
    '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '14:00', '14:30', '15:00', 
    '15:30', '16:00', '16:30', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefonePrincipal || !formData.data || !formData.hora) {
      alert('Por favor, preencha os campos obrigatórios (*)');
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      ...formData,
      telPrincipal: `${formData.paisTel1} ${formData.telefonePrincipal}`,
      tel2: formData.telefone2 ? `${formData.paisTel2} ${formData.telefone2}` : 'Não informado'
    };

    setAgendamentos([novoAgendamento, ...agendamentos]);
    
    // Limpar formulário
    setFormData({
      nome: '',
      paisTel1: '+351',
      telefonePrincipal: '',
      paisTel2: '',
      telefone2: '',
      viatura: '',
      matricula: '',
      data: '',
      hora: '',
      notas: ''
    });

    alert('Agendamento confirmado com sucesso!');
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      
      {/* SIDEBAR ESQUERDA */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between hidden md:flex">
        <div className="p-4 space-y-1">
          <div className="text-xl font-bold text-yellow-500 mb-6 px-3 tracking-wide">CARBOX77</div>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <Car size={18} /> Veículos no Pátio
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <LayoutDashboard size={18} /> Painel & Gráficos
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <FileText size={18} /> OS / Orçamento
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-yellow-500/10 text-yellow-400 font-medium">
            <CalendarIcon size={18} /> Agendamento (Avaliação)
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <Clock size={18} /> Calendário & Agenda
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <DollarSign size={18} /> Livro-Caixa
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <Users size={18} /> Funcionários
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition">
            <Building size={18} /> Empresa
          </a>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col md:flex-row overflow-y-auto">
        
        {/* FORMULÁRIO */}
        <div className="flex-1 p-6 lg:p-10 max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-100 mb-6">Agendamento de Avaliações</h1>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-yellow-500 mb-5">Marcar Nova Avaliação</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nome do Cliente */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo do cliente"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 transition"
                />
              </div>

              {/* Telefone Principal */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Contacto / Telefone Principal *</label>
                <div className="flex gap-2">
                  <select
                    value={formData.paisTel1}
                    onChange={(e) => setFormData({ ...formData, paisTel1: e.target.value })}
                    className="w-28 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  >
                    <option value="+351">+351 (PT)</option>
                    <option value="+55">+55 (BR)</option>
                    <option value="+41">+41 (CH)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+34">+34 (ES)</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="911 222 333"
                    value={formData.telefonePrincipal}
                    onChange={(e) => setFormData({ ...formData, telefonePrincipal: e.target.value })}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Segundo Telefone (Opcional - País em branco por padrão) */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Contacto / Telefone 2 (Opcional)</label>
                <div className="flex gap-2">
                  <select
                    value={formData.paisTel2}
                    onChange={(e) => setFormData({ ...formData, paisTel2: e.target.value })}
                    className="w-28 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  >
                    <option value="">País</option>
                    <option value="+351">+351 (PT)</option>
                    <option value="+55">+55 (BR)</option>
                    <option value="+41">+41 (CH)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+34">+34 (ES)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+1">+1 (US/CA)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Número alternativo"
                    value={formData.telefone2}
                    onChange={(e) => setFormData({ ...formData, telefone2: e.target.value })}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Viatura e Matrícula */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Viatura</label>
                  <input
                    type="text"
                    placeholder="Ex: Renault Captur"
                    value={formData.viatura}
                    onChange={(e) => setFormData({ ...formData, viatura: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Matrícula (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: AZ-91-GI"
                    value={formData.matricula}
                    onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Data (Calendário Nativo) & Hora (Clique Rápido) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Data *</label>
                  <input
                    type="date"
                    required
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Hora *</label>
                  <input
                    type="time"
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 mb-2"
                  />
                </div>
              </div>

              {/* Números/Horários para Clicar Rápido */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Ou selecione um horário rápido:</label>
                <div className="grid grid-cols-7 gap-1.5">
                  {horariosDisponiveis.map((horario) => (
                    <button
                      key={horario}
                      type="button"
                      onClick={() => setFormData({ ...formData, hora: horario })}
                      className={`py-1.5 rounded text-xs font-medium transition ${
                        formData.hora === horario
                          ? 'bg-yellow-500 text-black font-bold shadow'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notas / Motivo */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Notas / Motivo da Avaliação</label>
                <textarea
                  rows={3}
                  placeholder="Descreva o que será avaliado no veículo..."
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 resize-none"
                />
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition shadow-lg text-sm mt-4 cursor-pointer"
              >
                Confirmar Agendamento de Avaliação
              </button>

            </form>
          </div>
        </div>

        {/* PAINEL DIREITO: AVALIAÇÕES MARCADAS */}
        <div className="w-full md:w-80 bg-zinc-900 border-l border-zinc-800 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-zinc-100 mb-4">Avaliações Marcadas</h2>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {agendamentos.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">Nenhum agendamento recente.</p>
            ) : (
              agendamentos.map((item) => (
                <div key={item.id} className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3.5 space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-zinc-200">{item.nome}</span>
                    <span className="text-[10px] bg-yellow-500/10 text-yellow-400 font-medium px-2 py-0.5 rounded">
                      {item.data ? `${item.data} às ${item.hora}` : item.hora}
                    </span>
                  </div>
                  
                  {item.viatura && (
                    <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <Car size={13} className="text-yellow-500" /> 
                      <span>{item.viatura} {item.matricula ? `(${item.matricula})` : ''}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-zinc-400 space-y-0.5 pt-1 border-t border-zinc-900">
                    <div><strong className="text-zinc-300">Principal:</strong> {item.telPrincipal}</div>
                    {item.telefone2 && <div><strong className="text-zinc-300">Tel 2:</strong> {item.tel2}</div>}
                  </div>

                  {item.notas && (
                    <p className="text-[11px] text-zinc-500 italic mt-1 bg-zinc-900/50 p-1.5 rounded">
                      "{item.notas}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
