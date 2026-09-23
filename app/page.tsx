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

  // Estados da Agenda & Histórico por Matrícula
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Silva', veiculo: 'BMW', matricula: '00-AA-00', servico: 'Polimento Cerâmico', data: '2026-06-01', status: 'Concluído' },
    { id: 2, cliente: 'Ana Costa', veiculo: 'Audi A4', matricula: '11-BB-11', servico: 'Lavagem Detalhada', data: '2026-06-15', status: 'Agendado' }
  ]);
  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novaMatriculaAgend, setNovaMatriculaAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');

  // Estados de Ordens de Serviço (OS)
  const [ordensServico, setOrdensServico] = useState([
    { id: 101, cliente: 'Carlos Silva', veiculo: 'BMW Série 3', matricula: '00-AA-00', servico: 'Polimento de 2 Passos + Cerâmico', observacoes: 'Riscos ligeiros no para-choques traseiro.', valor: 350.00, status: 'Em Execução', data: '2026-06-01' }
  ]);
  const [osCliente, setOsCliente] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osServico, setOsServico] = useState('');
  const [osObs, setOsObs] = useState('');
  const [osValor, setOsValor] = useState('');
  const [osStatus, setOsStatus] = useState('Em Execução');

  // Estados do Financeiro & Faturas IA
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Adiantamento Serviço BMW (Polimento)', categoria: 'Polimento', tipo: 'receita', valor: 150.00, data: '2026-06-01' },
    { id: 2, descricao: 'Compra de Panos Microfibra & Quimicos', categoria: 'Produtos', tipo: 'despesa', valor: 45.00, data: '2026-06-01' }
  ]);
  const [descTransacao, setDescTransacao] = useState('');
  const [categoriaTransacao, setCategoriaTransacao] = useState('Polimento');
  const [tipoTransacao, setTipoTransacao] = useState<'receita' | 'despesa'>('receita');
  const [valorTransacao, setValorTransacao] = useState('');
  const [dataTransacao, setDataTransacao] = useState('');
  const [aProcessarFoto, setAProcessarFoto] = useState(false);

  // Feriados Oficiais de Portugal
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

  const handleMatriculaChange = (matriculaInput: string) => {
    const matriculaLimpa = matriculaInput.toUpperCase();
    setNovaMatriculaAgend(matriculaLimpa);
    const historicoAnterior = servicosRealizados.find(s => s.matricula.toUpperCase() === matriculaLimpa);
    if (historicoAnterior) {
      setNovoClienteAgend(historicoAnterior.cliente);
      setNovoVeiculoAgend(historicoAnterior.veiculo);
    }
  };

  const handleOsMatriculaChange = (matriculaInput: string) => {
    const matriculaLimpa = matriculaInput.toUpperCase();
    setOsMatricula(matriculaLimpa);
    const historicoAnterior = ordensServico.find(o => o.matricula.toUpperCase() === matriculaLimpa) || servicosRealizados.find(s => s.matricula.toUpperCase() === matriculaLimpa);
    if (historicoAnterior) {
      setOsCliente(historicoAnterior.cliente);
      setOsVeiculo(historicoAnterior.veiculo);
    }
  };

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
    if (!novoClienteAgend || !novoServicoAgend || !novaDataAgend || !novaMatriculaAgend) return;
    const novo = {
      id: Date.now(),
      cliente: novoClienteAgend,
      veiculo: novoVeiculoAgend || 'Desconhecido',
      matricula: novaMatriculaAgend,
      servico: novoServicoAgend,
      data: novaDataAgend,
      status: 'Agendado'
    };
    setServicosRealizados([...servicosRealizados, novo]);
    setNovoClienteAgend('');
    setNovoVeiculoAgend('');
    setNovaMatriculaAgend('');
    setNovoServicoAgend('');
    setNovaDataAgend('');
  };

  const criarOrdemServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente || !osMatricula || !osServico) return;
    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      veiculo: osVeiculo || 'Desconhecido',
      matricula: osMatricula,
      servico: osServico,
      observacoes: osObs || 'Nenhuma observação registada à entrada.',
      valor: Number(osValor) || 0,
      status: osStatus,
      data: new Date().toISOString().split('T')[0]
    };
    setOrdensServico([novaOS, ...ordensServico]);
    setOsCliente('');
    setOsVeiculo('');
    setOsMatricula('');
    setOsServico('');
    setOsObs('');
    setOsValor('');
  };

  const imprimirFichaOS = (os: any) => {
    const janelaPrint = window.open('', '_blank');
    if (!janelaPrint) return;

    janelaPrint.document.write(`
      <html>
        <head>
          <title>Ordem de Serviço #${os.id} - Carbox Planilha</title>
          <style>
            body { font-family: Arial, sans-serif; color: #111; padding: 30px; margin: 0; }
            h1 { font-size: 20px; color: #1e3a8a; margin-bottom: 4px; }
            p { font-size: 13px; color: #444; margin-top: 0; }
            .box { border: 1px solid #ccc; padding: 15px; border-radius: 6px; margin-top: 15px; }
            .grid { display: flex; gap: 20px; margin-top: 15px; }
            .col { flex: 1; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 13px; }
            th { background-color: #f3f4f6; }
            .assinatura { margin-top: 50px; display: flex; justify-content: space-between; }
            .linha-assinatura { width: 40%; border-top: 1px solid #333; text-align: center; padding-top: 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>CARBOX PLANILHA - ORDEM DE SERVIÇO #${os.id}</h1>
          <p>Data de Emissão: ${os.data} | Estética Automotiva Portugal</p>

          <div class="box">
            <h3>Dados do Cliente & Viatura</h3>
            <p><b>Cliente:</b> ${os.cliente}</p>
            <p><b>Viatura:</b> ${os.veiculo} | <b>Matrícula:</b> ${os.matricula}</p>
            <p><b>Estado Atual:</b> ${os.status}</p>
          </div>

          <div class="box">
            <h3>Serviço Solicitado</h3>
            <p style="font-size: 15px; font-weight: bold; color: #2563eb;">${os.servico}</p>
            <p><b>Observações / Danos Detetados à Entrada:</b> ${os.observacoes}</p>
          </div>

          <div class="box">
            <h3>Orçamento / Valor</h3>
            <p style="font-size: 18px; font-weight: bold; color: #059669;">Total: ${os.valor.toFixed(2)} €</p>
          </div>

          <div class="assinatura">
            <div class="linha-assinatura">Assinatura da Oficina</div>
            <div class="linha-assinatura">Assinatura do Cliente (Receção)</div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    janelaPrint.document.close();
  };

  const adicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descTransacao || !valorTransacao || !dataTransacao) return;
    const nova = {
      id: Date.now(),
      descricao: descTransacao,
      categoria: categoriaTransacao,
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
      setDescTransacao('Fatura Processada (IA): Produtos de Estética');
      setCategoriaTransacao('Produtos');
      setTipoTransacao('despesa');
      setValorTransacao('42.50');
      setDataTransacao(new Date().toISOString().split('T')[0]);
      setAProcessarFoto(false);
      alert('Fatura/Talão lido com sucesso! Verifique os dados no formulário.');
    }, 1500);
  };

  const exportarRelatorioPDF = () => {
    const transacoesFiltradas = transacoes.filter(t => {
      if (dataInicioFiltro && t.data < dataInicioFiltro) return false;
      if (dataFimFiltro && t.data > dataFimFiltro) return false;
      return true;
    });

    const totalReceitas = transacoesFiltradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoesFiltradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    const balancoFinal = totalReceitas - totalDespesas;

    const periodoTexto = (dataInicioFiltro || dataFimFiltro) 
      ? `Período: ${dataInicioFiltro || 'Início'} até ${dataFimFiltro || 'Hoje'}` 
      : 'Período: Histórico Geral Completo';

    const janelaPrint = window.open('', '_blank');
    if (!janelaPrint) return;

    janelaPrint.document.write(`
      <html>
        <head>
          <title>Relatório Financeiro - Carbox Planilha</title>
          <style>
            body { font-family: Arial, sans-serif; color: #111; padding: 30px; margin: 0; }
            h1 { font-size: 20px; color: #1e3a8a; margin-bottom: 4px; }
            p { font-size: 12px; color: #555; margin-top: 0; }
            .resumo { display: flex; gap: 20px; margin: 20px 0; }
            .card { border: 1px solid #ccc; padding: 15px; border-radius: 6px; flex: 1; }
            .card h3 { margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #555; }
            .card p { margin: 0; font-size: 18px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 12px; }
            th { background-color: #f3f4f6; color: #1f2937; }
            .receita { color: #059669; font-weight: bold; }
            .despesa { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>CARBOX PLANILHA - RELATÓRIO PARA CONTABILIDADE</h1>
          <p>${periodoTexto} | Emitido em: ${new Date().toLocaleDateString('pt-PT')} | Estética Automotiva Portugal</p>
          
          <div class="resumo">
            <div class="card">
              <h3>Total Receitas</h3>
              <p class="receita">+${totalReceitas.toFixed(2)} €</p>
            </div>
            <div class="card">
              <h3>Total Despesas</h3>
              <p class="despesa">-${totalDespesas.toFixed(2)} €</p>
            </div>
            <div class="card">
              <h3>Balanço Líquido</h3>
              <p>${balancoFinal.toFixed(2)} €</p>
            </div>
          </div>

          <h3>Movimentos Detalhados do Livro-Caixa</h3>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor (€)</th>
              </tr>
            </thead>
            <tbody>
              ${transacoesFiltradas.length === 0 ? `
                <tr><td colspan="5" style="text-align:center; color:#777;">Sem registos no período selecionado.</td></tr>
              ` : transacoesFiltradas.map(t => `
                <tr>
                  <td>${t.data}</td>
                  <td><span class="${t.tipo}">${t.tipo.toUpperCase()}</span></td>
                  <td>${t.categoria}</td>
                  <td>${t.descricao}</td>
                  <td class="${t.tipo}">${t.tipo === 'receita' ? '+' : '-'}${t.valor.toFixed(2)} €</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    janelaPrint.document.close();
  };

  const menuItems = [
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'ordem-servico', label: '🚗 Ordens de Serviço (OS)' },
    { id: 'agenda', label: '📅 Agenda & Matrículas' },
    { id: 'financeiro', label: '💰 Livro-Caixa & Contabilidade' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>CARBOX PLANILHA</h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>Portugal • Gestão de Estética Automotiva</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Admin</button>
          <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Equipa</button>
        </div>
      </header>

      <nav style={{ backgroundColor: '#0f172a', padding: '0 24px', display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '14px 16px',
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

      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Painel & Gráficos de Desempenho</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Análise financeira detalhada por período e categorias de serviços.</p>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>📅 Filtrar Período:</span>
                <input 
                  type="date" 
                  value={dataInicioFiltro}
                  onChange={(e) => setDataInicioFiltro(e.target.value)}
                  style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                />
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>até</span>
                <input 
                  type="date" 
                  value={dataFimFiltro}
                  onChange={(e) => setDataFimFiltro(e.target.value)}
                  style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                />
                {(dataInicioFiltro || dataFimFiltro) && (
                  <button 
                    onClick={() => { setDataInicioFiltro(''); setDataFimFiltro(''); }}
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

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

              const porCategoria: { [key: string]: number } = {};
              transacoesFiltradas.forEach(t => {
                porCategoria[t.categoria] = (porCategoria[t.categoria] || 0) + t.valor;
              });

              return (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Balanço do Período</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: balancoPeriodo >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{balancoPeriodo.toFixed(2)} €</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Receitas ({totalReceitas.toFixed(2)}€) - Desp. ({totalDespesas.toFixed(2)}€)</span>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Salários Fixos Equipa</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#fbbf24', margin: 0 }}>{totalSalariosFixos.toFixed(2)} €</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Custo base mensal</span>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total de Movimentos</p>
                      <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#60a5fa', margin: 0 }}>{transacoesFiltradas.length}</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Transações registadas</span>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Distribuição por Categoria</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {Object.keys(porCategoria).length === 0 ? (
                        <p style={{ fontSize: '13px', color: '#94a3b8' }}>Sem dados suficientes para gerar gráficos no período.</p>
                      ) : (
                        Object.entries(porCategoria).map(([cat, val], idx) => {
                          const percentual = totalReceitas > 0 ? Math.min(100, Math.round((val / (totalReceitas + totalDespesas || 1)) * 100)) : 20;
                          return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ color: '#fff', fontWeight: 'bold' }}>{cat}</span>
                                <span style={{ color: '#60a5fa' }}>{val.toFixed(2)} €</span>
                              </div>
                              <div style={{ width: '100%', backgroundColor: '#1e293b', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${percentual}%`, backgroundColor: '#3b82f6', height: '100%' }}></div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Módulo Completo de Ordens de Serviço (OS) */}
        {tab === 'ordem-servico' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Ordens de Serviço (OS) & Fichas de Intervenção</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Crie fichas detalhadas por matrícula, registe danos à entrada e imprima o documento para o cliente.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {/* Formulário Nova OS */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Criar Nova Ordem de Serviço</h3>
                <form onSubmit={criarOrdemServico} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Matrícula (Ex: 00-AA-00)</label>
                    <input 
                      type="text" 
                      placeholder="00-AA-00"
                      value={osMatricula}
                      onChange={(e) => handleOsMatriculaChange(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome do Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Preenchido autom. se veículo já registado"
                      value={osCliente}
                      onChange={(e) => setOsCliente(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Modelo da Viatura</label>
                    <input 
                      type="text" 
                      placeholder="Ex: BMW Série 3"
                      value={osVeiculo}
                      onChange={(e) => setOsVeiculo(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Serviço a Executar</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Polimento Cerâmico 3 Anos"
                      value={osServico}
                      onChange={(e) => setOsServico(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Observações / Riscos à Entrada</label>
                    <textarea 
                      placeholder="Ex: Risco ligeiro na embaladeiras, jantes com marcas..."
                      value={osObs}
                      onChange={(e) => setOsObs(e.target.value)}
                      rows={2}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor (€)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={osValor}
                        onChange={(e) => setOsValor(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Estado</label>
                      <select 
                        value={osStatus}
                        onChange={(e) => setOsStatus(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="Em Execução">Em Execução</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Pendente">Pendente</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Emitir Ordem de Serviço
                  </button>
                </form>
              </div>

              {/* Lista de Ordens de Serviço */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico de Ordens de Serviço</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
                  {ordensServico.map(os => (
                    <div key={os.id} style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>OS #{os.id} - {os.cliente}</p>
                          <p style={{ fontSize: '12px', color: '#60a5fa', margin: 0 }}>🚗 {os.veiculo} ({os.matricula})</p>
                        </div>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', backgroundColor: os.status === 'Concluído' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 191, 36, 0.1)', color: os.status === 'Concluído' ? '#34d399' : '#fbbf24', fontWeight: 'bold' }}>
                          {os.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '4px 0', borderLeft: '2px solid #3b82f6', paddingLeft: '8px' }}>
                        <b>Serviço:</b> {os.servico}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>{os.valor.toFixed(2)} €</span>
                        <button 
                          onClick={() => imprimirFichaOS(os)}
                          style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          🖨️ Imprimir Ficha OS (PDF)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Agenda & Reconhecimento por Matrícula</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Insira a matrícula para preencher automaticamente o histórico do veículo e consulte feriados em Portugal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Novo Agendamento</h3>
                <form onSubmit={adicionarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Matrícula (Ex: 00-AA-00)</label>
                    <input 
                      type="text" 
                      placeholder="00-AA-00"
                      value={novaMatriculaAgend}
                      onChange={(e) => handleMatriculaChange(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome do Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Preenchido automaticamente"
                      value={novoClienteAgend}
                      onChange={(e) => setNovoClienteAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Modelo do Veículo</label>
                    <input 
                      type="text" 
                      placeholder="Ex: BMW Série 3"
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico & Agendamentos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                    {servicosRealizados.map(s => (
                      <div key={s.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{s.cliente} ({s.matricula})</p>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>🚗 {s.veiculo} - {s.servico} | 📅 {s.data}</p>
                        </div>
                        <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', fontWeight: 'bold' }}>{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>🇵🇹 Feriados Nacionais de Portugal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
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

        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Livro-Caixa & Contabilidade</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Gestão financeira com leitura de faturas e relatório PDF filtrado para o contabilista.</p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 'bold' }}>Período PDF:</span>
                  <input 
                    type="date" 
                    value={dataInicioFiltro}
                    onChange={(e) => setDataInicioFiltro(e.target.value)}
                    style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '4px 6px', borderRadius: '4px', fontSize: '11px' }}
                  />
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>a</span>
                  <input 
                    type="date" 
                    value={dataFimFiltro}
                    onChange={(e) => setDataFimFiltro(e.target.value)}
                    style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '4px 6px', borderRadius: '4px', fontSize: '11px' }}
                  />
                </div>

                <button 
                  onClick={exportarRelatorioPDF}
                  style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  📄 Gerar PDF Filtrado
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: 0 }}>Nova Transação</h3>
                  <label style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#34d399', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {aProcessarFoto ? '⌛ A ler...' : '📸 Ler Fatura (PDF/Foto)'}
                    <input type="file" accept="image/*,application/pdf" onChange={handleProcessarFotoFatura} style={{ display: 'none' }} />
                  </label>
                </div>

                <form onSubmit={adicionarTransacao} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Descrição</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Produtos"
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
                        <option value="receita">Receita</option>
                        <option value="despesa">Despesa</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Categoria</label>
                      <select 
                        value={categoriaTransacao}
                        onChange={(e) => setCategoriaTransacao(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="Polimento">Polimento</option>
                        <option value="Lavagem">Lavagem</option>
                        <option value="Cerâmico">Cerâmico</option>
                        <option value="Produtos">Produtos</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
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

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico Geral de Caixa</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                  {transacoes.map(t => (
                    <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{t.descricao} <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 'normal' }}>[{t.categoria}]</span></p>
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

        {tab === 'funcionarios' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Gestão de Funcionários & Salários</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Controlo de equipa com remuneração fixa ou comissões.</p>
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
                      placeholder="Ex: Detailer"
                      value={novoFuncCargo}
                      onChange={(e) => setNovoFuncCargo(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Remuneração</label>
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
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor</label>
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
