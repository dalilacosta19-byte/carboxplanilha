'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('metricas');
  const [user, setUser] = useState('admin');

  // Estados dos funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 35 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista / Atendimento', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
  ]);

  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Registo de serviços concluídos
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Alcantara', veiculo: 'BMW Série 3', servico: 'Polimento Comercial + Vitrificação', valor: 350, funcionarioId: 1, pago: true },
    { id: 2, cliente: 'Ana Rodrigues', veiculo: 'Audi A4', servico: 'Higienização de Interiores', valor: 120, funcionarioId: 1, pago: true },
  ]);

  // Feriados Nacionais de Portugal (Exemplo para 2026)
  const feriadosPortugal2026 = [
    { data: '2026-01-01', nome: 'Ano Novo' },
    { data: '2026-04-03', nome: 'Sexta-Feira Santa' },
    { data: '2026-04-05', nome: 'Páscoa' },
    { data: '2026-04-25', nome: 'Dia da Liberdade' },
    { data: '2026-05-01', nome: 'Dia do Trabalhador' },
    { data: '2026-06-04', nome: 'Corpo de Deus' },
    { data: '2026-06-10', nome: 'Dia de Portugal' },
    { data: '2026-08-15', nome: 'Assunção de Nossa Senhora' },
    { data: '2026-10-05', nome: 'Implantação da República' },
    { data: '2026-11-01', nome: 'Dia de Todos os Santos' },
    { data: '2026-12-01', nome: 'Restauração da Independência' },
    { data: '2026-12-08', nome: 'Imaculada Conceição' },
    { data: '2026-12-25', nome: 'Natal' }
  ];

  // Estado dos agendamentos
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: 'Gonçalo Ribeiro', veiculo: 'Mercedes CLA', servico: 'Polimento de Faróis & Lavagem', data: '2026-09-25', hora: '10:00' },
    { id: 2, cliente: 'Mariana Costa', veiculo: 'Tesla Model 3', servico: 'Tratamento Cerâmico', data: '2026-09-28', hora: '14:30' }
  ]);

  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');
  const [novaHoraAgend, setNovaHoraAgend] = useState('09:00');

  const adicionarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoClienteAgend.trim() || !novaDataAgend) return;
    const novo = {
      id: Date.now(),
      cliente: novoClienteAgend,
      veiculo: novoVeiculoAgend || 'Viatura',
      servico: novoServicoAgend || 'Estética Automotiva',
      data: novaDataAgend,
      hora: novaHoraAgend
    };
    setAgendamentos([...agendamentos, novo]);
    setNovoClienteAgend('');
    setNovoVeiculoAgend('');
    setNovoServicoAgend('');
    setNovaDataAgend('');
  };

  const removerAgendamento = (id: number) => {
    setAgendamentos(agendamentos.filter(a => a.id !== id));
  };

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome.trim()) return;
    const novo = {
      id: Date.now(),
      nome: novoFuncNome,
      cargo: novoFuncCargo || (tipoRemuneracao === 'fixo' ? 'Colaborador Fixo' : 'Técnico'),
      tipoRemuneracao: tipoRemuneracao,
      valorPctOuFixo: parseFloat(valorRemuneracao) || (tipoRemuneracao === 'fixo' ? 900 : 30),
    };
    setFuncionarios([...funcionarios, novo]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
    setValorRemuneracao('30');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const totalSalariosFixos = funcionarios
    .filter(f => f.tipoRemuneracao === 'fixo')
    .reduce((acc, f) => acc + f.valorPctOuFixo, 0);

  const totalComissoesDevidas = servicosRealizados.reduce((acc, s) => {
    const func = funcionarios.find(f => f.id === s.funcionarioId);
    if (func && func.tipoRemuneracao === 'comissao') {
      return acc + (s.valor * func.valorPctOuFixo) / 100;
    }
    return acc;
  }, 0);

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#60a5fa' }}>CARBOX PLANILHA</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'center', marginBottom: '24px' }}>Gestão de Estética Automotiva</p>
          <button 
            onClick={() => setUser('admin')} 
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>CBX</div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>CARBOX PLANILHA</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Portugal • Estética Automotiva</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '20px', border: '1px solid #334155', color: '#60a5fa' }}>
            👤 {user}
          </span>
          <button 
            onClick={() => setUser('')} 
            style={{ fontSize: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </header>

      <nav style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderBottom: '1px solid #1e293b', padding: '12px 24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[
          { id: 'metricas', label: '📊 Painel & Métricas' },
          { id: 'os', label: '🔧 Ordens de Serviço' },
          { id: 'agenda', label: '📅 Agenda & Feriados' },
          { id: 'financeiro', label: '💰 Financeiro & Caixa' },
          { id: 'comissoes', label: '👥 Funcionários & Salários' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: tab === item.id ? '#2563eb' : 'transparent',
              color: tab === item.id ? '#fff' : '#94a3b8'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Painel Principal</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Faturamento Real (Mês)</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>
                  {servicosRealizados.reduce((acc, s) => acc + s.valor, 0).toFixed(2)} €
                </p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Salários Fixos Mensais</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#fbbf24', margin: 0 }}>
                  {totalSalariosFixos.toFixed(2)} €
                </p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Comissões Variáveis</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#60a5fa', margin: 0 }}>
                  {totalComissoesDevidas.toFixed(2)} €
                </p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Agendamentos Futuros</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#a78bfa', margin: 0 }}>{agendamentos.length}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'os' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Ordens de Serviço (OS)</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de OS em desenvolvimento.
            </div>
          </div>
        )}

        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Agenda de Marcações & Feriados Nacionais</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Consulte os feriados oficiais de Portugal e faça a gestão dos agendamentos da oficina.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Adicionar / Lista de Agendamentos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Novo Agendamento</h3>
                  <form onSubmit={adicionarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome do Cliente</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Carlos Silva"
                        value={novoClienteAgend}
                        onChange={(e) => setNovoClienteAgend(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Veículo & Matrícula</label>
                        <input 
                          type="text" 
                          placeholder="Ex: BMW (00-AA-00)"
                          value={novoVeiculoAgend}
                          onChange={(e) => setNovoVeiculoAgend(e.target.value)}
                          style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Serviço</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Polimento"
                          value={novoServicoAgend}
                          onChange={(e) => setNovoServicoAgend(e.target.value)}
                          style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Data</label>
                        <input 
                          type="date" 
                          value={novaDataAgend}
                          onChange={(e) => setNovaDataAgend(e.target.value)}
                          style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Hora</label>
                        <input 
                          type="time" 
                          value={novaHoraAgend}
                          onChange={(e) => setNovaHoraAgend(e.target.value)}
                          style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}
                    >
                      Agendar Cliente
                    </button>
                  </form>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Próximas Marcações</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {agendamentos.map(a => (
                      <div key={a.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{a.cliente} ({a.veiculo})</p>
                          <p style={{ fontSize: '12px', color: '#60a5fa', margin: '0 0 4px 0' }}>{a.servico}</p>
                          <p style={{ fontSize: '11px', color: '#fbbf24', margin: 0 }}>📅 {a.data} às {a.hora}</p>
                        </div>
                        <button 
                          onClick={() => removerAgendamento(a.id)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Concluir / Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feriados Oficiais em Portugal */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>🇵🇹 Feriados Nacionais (Portugal)</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0' }}>Dias em que a oficina estará encerrada ou com horário especial.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
                  {feriadosPortugal2026.map((f, idx) => (
                    <div key={idx} style={{ backgroundColor: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <span style={{ color: '#fff', fontWeight: '500' }}>{f.nome}</span>
                      <span style={{ color: '#34d399', fontSize: '12px', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>{f.data}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Livro-Caixa & Financeiro</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo financeiro em desenvolvimento.
            </div>
          </div>
        )}

        {tab === 'comissoes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Gestão de Funcionários, Salários & Comissões</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registe colaboradores com vencimento fixo ou comissão por serviços executados.</p>
            </div>

            {/* Formulário para Novo Funcionário */}
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Adicionar Colaborador</h3>
              <form onSubmit={adicionarFuncionario} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Nome</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Rita Ferreira"
                    value={novoFuncNome}
                    onChange={(e) => setNovoFuncNome(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Cargo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Gestora de Cliente"
                    value={novoFuncCargo}
                    onChange={(e) => setNovoFuncCargo(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Tipo de Remuneração</label>
                  <select 
                    value={tipoRemuneracao} 
                    onChange={(e) => {
                      const val = e.target.value as 'comissao' | 'fixo';
                      setTipoRemuneracao(val);
                      setValorRemuneracao(val === 'fixo' ? '900' : '30');
                    }}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  >
                    <option value="comissao">Comissão (%)</option>
                    <option value="fixo">Salário Fixo (€)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                    {tipoRemuneracao === 'fixo' ? 'Valor do Salário (€)' : 'Percentual de Comissão (%)'}
                  </label>
                  <input 
                    type="number" 
                    value={valorRemuneracao}
                    onChange={(e) => setValorRemuneracao(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <button 
                  type="submit" 
                  style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', height: '41px' }}
                >
                  Adicionar
                </button>
              </form>
            </div>

            {/* Listas e Resumos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Equipa & Condições de Pagamento</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {funcionarios.map(f => {
                    let totalGanho = 0;
                    if (f.tipoRemuneracao === 'fixo') {
                      totalGanho = f.valorPctOuFixo;
                    } else {
                      const servsFunc = servicosRealizados.filter(s => s.funcionarioId === f.id);
                      const somaServs = servsFunc.reduce((acc, s) => acc + s.valor, 0);
                      totalGanho = (somaServs * f.valorPctOuFixo) / 100;
                    }

                    return (
                      <div key={f.id} style={{ backgroundColor: '#1e293b', padding: '14px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{f.nome}</p>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 6px 0' }}>
                            {f.cargo} • <span style={{ color: f.tipoRemuneracao === 'fixo' ? '#fbbf24' : '#60a5fa' }}>
                              {f.tipoRemuneracao === 'fixo' ? `Salário Fixo: ${f.valorPctOuFixo.toFixed(2)} €` : `Comissão: ${f.valorPctOuFixo}%`}
                            </span>
                          </p>
                          <p style={{ fontSize: '13px', color: '#34d399', fontWeight: 'bold', margin: 0 }}>
                            Total a Pagar: {totalGanho.toFixed(2)} €
                          </p>
                        </div>
                        <button 
                          onClick={() => removerFuncionario(f.id)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Registo de Serviços */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Serviços Realizados (Comissões)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {servicosRealizados.map(s => {
                    const func = funcionarios.find(f => f.id === s.funcionarioId);
                    const isFixo = func?.tipoRemuneracao === 'fixo';
                    const valorComissao = (!isFixo && func) ? (s.valor * func.valorPctOuFixo) / 100 : 0;

                    return (
                      <div key={s.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px' }}>
                          <span style={{ color: '#fff' }}>{s.servico}</span>
                          <span style={{ color: '#34d399' }}>{s.valor.toFixed(2)} €</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '12px' }}>
                          <span>Cliente: {s.cliente} ({s.veiculo})</span>
                          <span style={{ color: isFixo ? '#94a3b8' : '#fbbf24' }}>
                            {isFixo ? 'Colaborador com Salário Fixo' : `Comissão (${func?.valorPctOuFixo}%): ${valorComissao.toFixed(2)} €`}
                          </span>
                        </div>
                        <div style={{ marginTop: '6px', fontSize: '11px', color: '#60a5fa' }}>
                          Responsável: {func ? func.nome : 'Não atribuído'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
