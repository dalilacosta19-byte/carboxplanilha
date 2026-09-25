'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('agendamento');
  const [user, setUser] = useState('admin');

  // Dados da Empresa
  const [dadosEmpresa] = useState({
    nome: 'CARBOX77 DETAILING, UNIPESSOAL LDA',
    nif: '513 401 890',
    morada: 'Rua da Torre, Pavilhão Guilherme Pinto Basto, 2750-748 Cascais, Portugal',
    telefone: '+351 211 515 449',
    email: 'carbox77detailing@gmail.com',
    iban: 'PT50 0033 0000 4546 1405 9370 5'
  });

  // Lista de Agendamentos / Avaliações
  const [agendamentos, setAgendamentos] = useState([
    { 
      id: 1, 
      tipo: 'Avaliação', 
      cliente: 'Carla Monteiro', 
      paisTel1: '+351',
      telefone1: '922 333 444', 
      paisTel2: '+351',
      telefone2: '911 222 333', 
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      notasAvaliacao: 'Avaliação inicial do estado da pintura e proteções.', 
      data: '2026-09-30', 
      hora: '14:00', 
      status: 'Agendado' 
    }
  ]);

  // Estados para Novo Agendamento / Avaliação
  const [agClient, setAgClient] = useState('');
  const [paisTel1, setPaisTel1] = useState('+351');
  const [agTel1, setAgTel1] = useState('');
  const [paisTel2, setPaisTel2] = useState(''); // Em branco por padrão
  const [agTel2, setAgTel2] = useState('');
  const [agVeiculo, setAgVeiculo] = useState('');
  const [agMatricula, setAgMatricula] = useState('');
  const [agData, setAgData] = useState('');
  const [agHora, setAgHora] = useState('');
  const [agNotas, setAgNotas] = useState('');

  const horariosRapidos = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const criarAgendamentoAvaliacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agClient || !agTel1 || !agData || !agHora) {
      alert('Por favor, preencha o Nome do Cliente, o Telefone Principal, a Data e a Hora.');
      return;
    }

    const novoAg = {
      id: Date.now(),
      tipo: 'Avaliação',
      cliente: agClient,
      paisTel1,
      telefone1: agTel1,
      paisTel2,
      telefone2: agTel2,
      veiculo: agVeiculo || 'Viatura Geral',
      matricula: agMatricula ? agMatricula.toUpperCase() : 'Não informada',
      notasAvaliacao: agNotas || 'Avaliação técnica agendada.',
      data: agData,
      hora: agHora,
      status: 'Agendado'
    };

    setAgendamentos([novoAg, ...agendamentos]);
    setAgClient('');
    setAgTel1('');
    setAgTel2('');
    setPaisTel2('');
    setAgVeiculo('');
    setAgMatricula('');
    setAgData('');
    setAgHora('');
    setAgNotas('');
    alert('Agendamento de Avaliação registado com sucesso!');
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'ordem-servico', label: '📋 OS / Orçamento' },
    { id: 'agendamento', label: '📅 Agendamento (Avaliação)' },
    { id: 'agenda', label: '🗓️ Calendário & Agenda' },
    { id: 'financeiro', label: '💰 Livro-Caixa' },
    { id: 'funcionarios', label: '👥 Funcionários' },
    { id: 'config', label: '⚙️ Empresa' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090a0f', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#0d0f17', borderBottom: '1px solid #1e2235', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>CARBOX77 DETAILING</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Estética Automotiva de Alta Performance • Cascais</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: '#131722', padding: '6px', borderRadius: '10px', border: '1px solid #222b45' }}>
            <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#d4af37' : 'transparent', color: user === 'admin' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Admin</button>
            <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#d4af37' : 'transparent', color: user === 'funcionario' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Equipa</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* MENU LATERAL COM TODAS AS OPÇÕES */}
        <nav style={{ 
          width: '280px', 
          backgroundColor: '#0d0f17', 
          borderRight: '1px solid #1e2235', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px', 
          padding: '24px 16px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 'bold', padding: '0 12px', marginBottom: '8px', letterSpacing: '1px' }}>Menu Principal</p>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                fontSize: '14px',
                fontWeight: tab === item.id ? 'bold' : '500',
                cursor: 'pointer',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: tab === item.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                color: tab === item.id ? '#d4af37' : '#e2e8f0',
                borderLeft: tab === item.id ? '4px solid #d4af37' : '4px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTEÚDO PRINCIPAL */}
        <main style={{ flex: 1, padding: '36px 44px', width: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
          
          {tab === 'agendamento' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Agendamento de Avaliações</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Agende avaliações de veículos sem custos, sinal ou IVA.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px' }}>
                
                {/* FORMULÁRIO */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Marcar Nova Avaliação</h3>
                  
                  <form onSubmit={criarAgendamentoAvaliacao} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Nome */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Nome do Cliente *</label>
                      <input 
                        type="text" 
                        required
                        value={agClient}
                        onChange={(e) => setAgClient(e.target.value)}
                        placeholder="Ex: Carla Monteiro"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Telefone Principal */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone Principal *</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select 
                          value={paisTel1}
                          onChange={(e) => setPaisTel1(e.target.value)}
                          style={{ width: '110px', padding: '12px 10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}
                        >
                          <option value="+351">+351 (PT)</option>
                          <option value="+55">+55 (BR)</option>
                          <option value="+41">+41 (CH)</option>
                          <option value="+33">+33 (FR)</option>
                          <option value="+34">+34 (ES)</option>
                        </select>
                        <input 
                          type="text" 
                          required
                          value={agTel1}
                          onChange={(e) => setAgTel1(e.target.value)}
                          placeholder="922 333 444"
                          style={{ flex: 1, padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Telefone 2 Opcional (País em branco) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone 2 (Opcional)</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select 
                          value={paisTel2}
                          onChange={(e) => setPaisTel2(e.target.value)}
                          style={{ width: '110px', padding: '12px 10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#94a3b8', fontSize: '14px' }}
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
                          type="text" 
                          value={agTel2}
                          onChange={(e) => setAgTel2(e.target.value)}
                          placeholder="Número alternativo"
                          style={{ flex: 1, padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Viatura e Matrícula */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Viatura</label>
                        <input 
                          type="text" 
                          value={agVeiculo}
                          onChange={(e) => setAgVeiculo(e.target.value)}
                          placeholder="Renault Captur"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Matrícula</label>
                        <input 
                          type="text" 
                          value={agMatricula}
                          onChange={(e) => setAgMatricula(e.target.value)}
                          placeholder="AZ-91-GI"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Data (Calendário Nativo) & Hora */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Data *</label>
                        <input 
                          type="date" 
                          required
                          value={agData}
                          onChange={(e) => setAgData(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box', cursor: 'pointer' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Hora *</label>
                        <input 
                          type="time" 
                          required
                          value={agHora}
                          onChange={(e) => setAgHora(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Botões de Horários Rápidos para Clicar */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Ou clique num horário rápido:</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {horariosRapidos.map(h => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setAgHora(h)}
                            style={{
                              backgroundColor: agHora === h ? '#d4af37' : '#090a0f',
                              color: agHora === h ? '#090a0f' : '#cbd5e1',
                              border: '1px solid #222b45',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: agHora === h ? 'bold' : 'normal',
                              cursor: 'pointer'
                            }}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notas */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Notas / Motivo da Avaliação</label>
                      <textarea 
                        rows={3}
                        value={agNotas}
                        onChange={(e) => setAgNotas(e.target.value)}
                        placeholder="Descreva o que será avaliado..."
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      type="submit"
                      style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '6px', width: '100%' }}
                    >
                      Confirmar Agendamento de Avaliação
                    </button>

                  </form>
                </div>

                {/* LISTA DE AVALIAÇÕES MARCADAS */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Avaliações Marcadas</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '600px', overflowY: 'auto' }}>
                    {agendamentos.length === 0 ? (
                      <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0' }}>Nenhuma avaliação agendada.</p>
                    ) : (
                      agendamentos.map(ag => (
                        <div key={ag.id} style={{ backgroundColor: '#090a0f', border: '1px solid #1e2235', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{ag.cliente}</h4>
                              <p style={{ fontSize: '13px', color: '#d4af37', margin: '4px 0 0 0' }}>🚗 {ag.veiculo} ({ag.matricula})</p>
                            </div>
                            <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                              📅 {ag.data} às {ag.hora}
                            </span>
                          </div>

                          <div style={{ fontSize: '13px', color: '#cbd5e1', borderTop: '1px solid #1e2235', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <p style={{ margin: 0 }}>📞 Principal: <b>{ag.paisTel1} {ag.telefone1}</b></p>
                            {ag.telefone2 && <p style={{ margin: 0 }}>📞 Tel 2: <b>{ag.paisTel2} {ag.telefone2}</b></p>}
                            <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontStyle: 'italic', backgroundColor: '#131722', padding: '8px', borderRadius: '6px' }}>&quot;{ag.notasAvaliacao}&quot;</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: '0 0 10px 0' }}>Módulo Selecionado</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>Secção integrada no sistema principal CARBOX77.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
