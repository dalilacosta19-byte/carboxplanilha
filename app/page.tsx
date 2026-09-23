'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('metricas');
  const [user, setUser] = useState('admin');

  // Estados para Filtro de Datas no Painel
  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');

  // Estados dos funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista / Atendimento', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
  ]);

  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Estados da Agenda
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Silva', veiculo: 'BMW (00-AA-00)', servico: 'Polimento', data: '2026-06-01', status: 'Agendado' },
    { id: 2, cliente: 'Ana Costa', veiculo: 'Audi A4 (11-BB-11)', servico: 'Lavagem Detalhada', data: '2026-06-02', status: 'Concluído' }
  ]);
  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');

  // Estados do Financeiro & Faturas IA
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Adiantamento Serviço BMW', tipo: 'receita', valor: 150.00, data: '2026-06-01' },
    { id: 2, descricao: 'Compra de Panos Microfibra', tipo: 'despesa', valor: 45.00, data: '2026-06-01' }
  ]);
  const [descTransacao, setDescTransacao] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState<'receita' | 'despesa'>('receita');
  const [valorTransacao, setValorTransacao] = useState('');
  const [dataTransacao, setDataTransacao] = useState('');
  const [aProcessarFoto, setAProcessarFoto] = useState(false);

  // Feriados Oficiais de Portugal (Exemplo estrutural)
  const feriadosPortugal = [
    { data: '2026-01-01', nome: 'Ano Novo' },
    { data: '2026-04-05', nome: 'Páscoa' },
    { data: '2026-04-25', nome: 'Dia da Liberdade' },
    { data: '2026-05-01', nome: 'Dia do Trabalhador' },
    { data: '2026-06-10', nome: 'Dia de Portugal' },
    { data: '2026-08-15', nome: 'Assunção de Nossa Senhora' },
    { data: '2026-10-05', nome: 'Implantação da República' },
    { data: '2026-11-01', nome: 'Dia de Todos os Santos' },
    { data: '2026-12-01', nome: 'Restauração da Independência' },
    { data: '2026-12-08', nome: 'Imaculada Conceição' },
    { data: '2026-12-25', nome: 'Natal' }
  ];

  // Funções de Gestão
  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome || !novoFuncCargo) return;
    const novo = {
      id: Date.now(),
      nome: novoFuncNome,
      cargo: novoFuncCargo,
      tipoRemuneracao,
      valorPctOuFixo: Number(valorRemuneracao) || 0
    };
    setFuncionarios([...funcionarios, novo]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const adicionarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoClienteAgend || !novoServicoAgend || !novaDataAgend) return;
    const novo = {
      id: Date.now(),
      cliente: novoClienteAgend,
      veiculo: novoVeiculoAgend || 'Não especificado',
      servico: novoServicoAgend,
      data: novaDataAgend,
      status: 'Agendado'
    };
    setServicosRealizados([...servicosRealizados, novo]);
    setNovoClienteAgend('');
    setNovoVeiculoAgend('');
    setNovoServicoAgend('');
    setNovaDataAgend('');
  };

  const adicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descTransacao || !valorTransacao || !dataTransacao) return;
    const nova = {
      id: Date.now(),
      descricao: descTransacao,
      tipo: tipoTransacao,
      valor: Number(valorTransacao) || 0,
      data: dataTransacao
    };
    setTransacoes([...transacoes, nova]);
    setDescTransacao('');
    setValorTransacao('');
    setDataTransacao('');
  };

  const removerTransacao = (id: number) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const handleProcessarFotoFatura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAProcessarFoto(true);
    setTimeout(() => {
      setDescTransacao('Fatura Processada (IA): Produtos de Limpeza');
      setTipoTransacao('despesa');
      setValorTransacao('35.50');
      setDataTransacao(new Date().toISOString().split('T')[0]);
      setAProcessarFoto(false);
      alert('Fatura/Talão lido com sucesso! Verifique os dados no formulário.');
    }, 1500);
  };

  const menuItems = [
    { id: 'metricas', label: '📊 Painel & Métricas' },
    { id: 'ordem-servico', label: '🚗 Ordens de Serviço' },
    { id: 'agenda', label: '📅 Agenda & Feriados' },
    { id: 'financeiro', label: '💰 Livro-Caixa & Caixa' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Topo / Header */}
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>CARBOX PLANILHA</h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>Portugal • Estética Automotiva</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Admin</button>
          <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Equipa</button>
        </div>
      </header>

      {/* Navegação por Abas */}
      <nav style={{ backgroundColor: '#0f172a', padding: '0 24px', display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '14px 16px',
              borderRadius: '0px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              borderBottom: tab === item.id ? '2px solid #3b82f6' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: tab === item.id ? '#fff' : '#94a3b8',
              whiteSpace: 'nowrap'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* Painel & Métricas */}
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Painel & Métricas da Oficina</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Acompanhe o balanço diário, mensal e anual escolhendo o período pretendido.</p>
              </div>

              {/* Seletor de Datas Personalizado */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>📅 Filtrar Período:</span>
                <div>
                  <input 
                    type="date" 
                    value={dataInicioFiltro}
                    onChange={(e) => setDataInicioFiltro(e.target.value)}
                    style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                  />
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>até</span>
                <div>
                  <input 
                    type="date" 
                    value={dataFimFiltro}
                    onChange={(e) => setDataFimFiltro(e.target.value)}
                    style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                  />
                </div>
                {(dataInicioFiltro || dataFimFiltro) && (
                  <button 
                    onClick={() => { setDataInicioFiltro(''); setDataFimFiltro(''); }}
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}
                  >
                    Limpar Filtro
                  </button>
                )}
              </div>
            </div>

            {/* Cálculos Dinâmicos baseados no Filtro */}
            {(() => {
              const transacoesFiltradas = transacoes.filter(t => {
                if (dataInicioFiltro && t.data < dataInicioFiltro) return false;
                if (dataFimFiltro && t.data > dataFimFiltro) return false;
                return true;
              });

              const totalReceitas = transacoesFiltradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
              const totalDespesas = transacoesFiltradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
              const balancoPeriodo = totalReceitas - totalDespesas;

              const totalSalariosFixos = funcionarios.reduce((acc, f) => acc + (f.tipoRemuneracao === 'fixo' ? f.valorPctOuFixo : 0), 0);
              const agendamentosFuturosCount = servicosRealizados.filter(s => s.status === 'Agendado').length;

              return (
                <>
                  {/* Cartões de Métricas Principais */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Balanço do Período</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: balancoPeriodo >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{balancoPeriodo.toFixed(2)} €</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Receitas ({totalReceitas.toFixed(2)}€) - Despesas ({totalDespesas.toFixed(2)}€)</span>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Salários Fixos Mensais</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#fbbf24', margin: 0 }}>{totalSalariosFixos.toFixed(2)} €</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Custo base da equipa</span>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Agendamentos Futuros</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#60a5fa', margin: 0 }}>{agendamentosFuturosCount}</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Serviços agendados</span>
                    </div>
                  </div>

                  {/* Detalhe / Transações do Período Selecionado no Painel */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>
                      Movimentos Financeiros no Período {dataInicioFiltro || dataFimFiltro ? '(Filtrado)' : '(Geral)'}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                      {transacoesFiltradas.length === 0 ? (
                        <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>Sem registos financeiros para o intervalo de datas selecionado.</p>
                      ) : (
                        transacoesFiltradas.map(t => (
                          <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{t.descricao}</p>
                              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>📅 {t.data}</p>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: t.tipo === 'receita' ? '#34d399' : '#f87171' }}>
                              {t.tipo === 'receita' ? '+' : '-'}{t.valor.toFixed(2)} €
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Ordens de Serviço */}
        {tab === 'ordem-servico' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Ordens de Serviço</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Módulo de OS em desenvolvimento avançado para gestão de pinturas, polimentos e cerâmicos.</p>
            </div>
          </div>
        )}

        {/* Agenda & Feriados */}
        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Agenda de Marcações & Feriados Nacionais</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Consulte os feriados oficiais de Portugal e faça a gestão dos agendamentos da oficina.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Novo Agendamento */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
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
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Data</label>
                    <input 
                      type="date" 
                      value={novaDataAgend}
                      onChange={(e) => setNovaDataAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Agendar Serviço
                  </button>
                </form>
              </div>

              {/* Lista e Feriados */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Próximos Agendamentos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                    {servicosRealizados.map(s => (
                      <div key={s.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{s.cliente} - {s.servico}</p>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>🚗 {s.veiculo} | 📅 {s.data}</p>
                        </div>
                        <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', fontWeight: 'bold' }}>{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>🇵🇹 Feriados Oficiais em Portugal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                    {feriadosPortugal.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 10px', backgroundColor: '#1e293b', borderRadius: '6px' }}>
                        <span style={{ color: '#fff' }}>{f.nome}</span>
                        <span style={{ color: '#60a5fa' }}>{f.data}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Livro-Caixa & Caixa */}
        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Livro-Caixa & Balanço Financeiro</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registe receitas, despesas e utilize o leitor automático de faturas e talões (PDF ou Foto).</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Formulário Transação com IA para PDF / Foto */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: 0 }}>Nova Transação</h3>
                  
                  <label style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#34d399', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {aProcessarFoto ? '⌛ A ler...' : '📸 Ler Fatura (PDF/Foto)'}
                    <input type="file" accept="image/*,application/pdf" onChange={handleProcessarFotoFatura} style={{ display: 'none' }} />
                  </label>
                </div>

                <form onSubmit={adicionarTransacao} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Descrição</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Compra de panos microfibra"
                      value={descTransacao}
                      onChange={(e) => setDescTransacao(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Tipo</label>
                      <select 
                        value={tipoTransacao}
                        onChange={(e) => setTipoTransacao(e.target.value as 'receita' | 'despesa')}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="receita">Receita (Entrada)</option>
                        <option value="despesa">Despesa (Saída)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor (€)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={valorTransacao}
                        onChange={(e) => setValorTransacao(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Data</label>
                    <input 
                      type="date" 
                      value={dataTransacao}
                      onChange={(e) => setDataTransacao(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Registar Transação
                  </button>
                </form>
              </div>

              {/* Lista de Transações */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico Geral de Caixa</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                  {transacoes.map(t => (
                    <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{t.descricao}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>📅 {t.data}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: t.tipo === 'receita' ? '#34d399' : '#f87171' }}>
                          {t.tipo === 'receita' ? '+' : '-'}{t.valor.toFixed(2)} €
                        </span>
                        <button onClick={() => removerTransacao(t.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Funcionários & Salários */}
        {tab === 'funcionarios' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Gestão de Funcionários & Salários</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Controlo de equipa com remuneração fixa ou baseada em comissões.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Adicionar Funcionário</h3>
                <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Ricardo Mendes"
                      value={novoFuncNome}
                      onChange={(e) => setNovoFuncNome(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Cargo / Especialidade</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Aplicador PPF"
                      value={novoFuncCargo}
                      onChange={(e) => setNovoFuncCargo(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Tipo Remuneração</label>
                      <select 
                        value={tipoRemuneracao}
                        onChange={(e) => setTipoRemuneracao(e.target.value as 'comissao' | 'fixo')}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="comissao">Comissão (%)</option>
                        <option value="fixo">Salário Fixo (€)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor Base</label>
                      <input 
                        type="number" 
                        value={valorRemuneracao}
                        onChange={(e) => setValorRemuneracao(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Guardar Funcionário
                  </button>
                </form>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Equipa Registada</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                  {funcionarios.map(f => (
                    <div key={f.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{f.nome} ({f.cargo})</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          {f.tipoRemuneracao === 'fixo' ? `Salário Fixo: ${f.valorPctOuFixo} €` : `Comissão: ${f.valorPctOuFixo}%`}
                        </p>
                      </div>
                      <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
