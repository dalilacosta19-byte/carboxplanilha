'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'Carbox77 Detailing Unipessoal Lda',
    nif: '513401890',
    morada: 'Pavilhão Guilherme Pinto Basto, R. da Torre, 2750-748 Cascais',
    telefone: '+351 211 515 449',
    email: 'carbox77detailing@gmail.com'
  });

  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');
  const [mesFiltro, setMesFiltro] = useState('');
  const [matriculaFiltro, setMatriculaFiltro] = useState('');

  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
    { id: 3, nome: 'Ricardo Costa', cargo: 'Polidor Externo', tipoRemuneracao: 'diaria', valorPctOuFixo: 75 },
  ]);
  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo' | 'diaria'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Agenda com suporte a Hora
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Silva', veiculo: 'Porsche 911 Turbo', matricula: '0KM-7700', servico: 'PPF Frontal + Vitrificação', data: '2026-06-01', hora: '09:30', status: 'Agendado' }
  ]);
  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novaMatriculaAgend, setNovaMatriculaAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');
  const [novaHoraAgend, setNovaHoraAgend] = useState('09:00');

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carlos Silva', 
      veiculo: 'Porsche 911 Turbo', 
      matricula: '0KM-7700', 
      servico: 'PPF Frontal + Vitrificação Completa', 
      observacoes: 'Inspeção rigorosa à chegada. Sem riscos prévios.', 
      funcionariosAtgados: ['João Silva'],
      custosPecas: 150.00, 
      valorOriginal: 1200.00, 
      desconto: 50.00, 
      valorFinal: 1150.00, 
      sinalPago: 300.00,
      contaRecebimentoSinal: 'MB WAY',
      restanteAPagar: 850.00,
      status: 'Em Execução', 
      data: '2026-06-01' 
    }
  ]);

  const [osCliente, setOsCliente] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osServico, setOsServico] = useState('');
  const [osObs, setOsObs] = useState('');
  const [osFuncionarios, setOsFuncionarios] = useState<string[]>([]);
  const [osCustos, setOsCustos] = useState('0');
  const [osValor, setOsValor] = useState('');
  const [osDesconto, setOsDesconto] = useState('0');
  const [osSinal, setOsSinal] = useState('0');
  const [osContaRecebimento, setOsContaRecebimento] = useState('MB WAY');
  const [osStatus, setOsStatus] = useState('Em Execução');

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Porsche 911)', matricula: '0KM-7700', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: '2026-06-01' },
    { id: 2, descricao: 'Compra Película PPF', matricula: '0KM-7700', categoria: 'Produtos/Peças', tipo: 'despesa', valor: 150.00, data: '2026-06-01' }
  ]);

  const feriadosPortugal = [
    { data: '2026-01-01', nome: 'Ano Novo' },
    { data: '2026-04-25', nome: 'Dia da Liberdade' },
    { data: '2026-05-01', nome: 'Dia do Trabalhador' },
    { data: '2026-06-10', nome: 'Dia de Portugal' },
    { data: '2026-08-15', nome: 'Assunção de Nossa Senhora' },
    { data: '2026-10-05', nome: 'Implantação da República' },
    { data: '2026-12-01', nome: 'Restauração da Independência' },
    { data: '2026-12-25', nome: 'Natal' }
  ];

  const handleOsMatriculaChange = (matriculaInput: string) => {
    const matriculaLimpa = matriculaInput.toUpperCase();
    setOsMatricula(matriculaLimpa);
    const historico = ordensServico.find(o => o.matricula.toUpperCase() === matriculaLimpa);
    if (historico) {
      setOsCliente(historico.cliente);
      setOsVeiculo(historico.veiculo);
    }
  };

  const toggleFuncionarioOS = (nomeFunc: string) => {
    if (osFuncionarios.includes(nomeFunc)) {
      setOsFuncionarios(osFuncionarios.filter(f => f !== nomeFunc));
    } else {
      setOsFuncionarios([...osFuncionarios, nomeFunc]);
    }
  };

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome || !novoFuncCargo) return;
    setFuncionarios([...funcionarios, { id: Date.now(), nome: novoFuncNome, cargo: novoFuncCargo, tipoRemuneracao, valorPctOuFixo: Number(valorRemuneracao) || 0 }]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const adicionarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoClienteAgend || !novaMatriculaAgend || !novaDataAgend) return;
    setServicosRealizados([...servicosRealizados, { 
      id: Date.now(), 
      cliente: novoClienteAgend, 
      veiculo: novoVeiculoAgend || 'Desconhecido', 
      matricula: novaMatriculaAgend.toUpperCase(), 
      servico: novoServicoAgend || 'Estética Geral', 
      data: novaDataAgend, 
      hora: novaHoraAgend || '09:00',
      status: 'Agendado' 
    }]);
    setNovoClienteAgend('');
    setNovoVeiculoAgend('');
    setNovaMatriculaAgend('');
    setNovoServicoAgend('');
    setNovaDataAgend('');
    setNovaHoraAgend('09:00');
    alert('Agendamento criado com sucesso!');
  };

  const criarOrdemServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente || !osMatricula || !osServico) return;
    const valorOrig = Number(osValor) || 0;
    const desc = Number(osDesconto) || 0;
    const valorFin = Math.max(0, valorOrig - desc);
    const sinal = Number(osSinal) || 0;
    const custos = Number(osCustos) || 0;
    const restante = Math.max(0, valorFin - sinal);
    const matriculaU = osMatricula.toUpperCase();
    const dataHoje = new Date().toISOString().split('T')[0];

    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      veiculo: osVeiculo || 'Desconhecido',
      matricula: matriculaU,
      servico: osServico,
      observacoes: osObs || 'Sem observações registadas.',
      funcionariosAtgados: osFuncionarios,
      custosPecas: custos,
      valorOriginal: valorOrig,
      desconto: desc,
      valorFinal: valorFin,
      sinalPago: sinal,
      contaRecebimentoSinal: sinal > 0 ? osContaRecebimento : 'Nenhum',
      restanteAPagar: restante,
      status: osStatus,
      data: dataHoje
    };

    setOrdensServico([novaOS, ...ordensServico]);

    if (sinal > 0) {
      setTransacoes(prev => [{
        id: Date.now(),
        descricao: `Sinal OS #${novaOS.id} (${matriculaU}) via ${osContaRecebimento}`,
        matricula: matriculaU,
        categoria: 'Serviço',
        tipo: 'receita' as const,
        valor: sinal,
        data: dataHoje
      }, ...prev]);
    }

    if (custos > 0) {
      setTransacoes(prev => [{
        id: Date.now() + 1,
        descricao: `Custos/Peças OS #${novaOS.id} (${matriculaU})`,
        matricula: matriculaU,
        categoria: 'Produtos/Peças',
        tipo: 'despesa' as const,
        valor: custos,
        data: dataHoje
      }, ...prev]);
    }

    setOsCliente('');
    setOsVeiculo('');
    setOsMatricula('');
    setOsServico('');
    setOsObs('');
    setOsFuncionarios([]);
    setOsCustos('0');
    setOsValor('');
    setOsDesconto('0');
    setOsSinal('0');
    alert('Ordem de Serviço criada com sucesso!');
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
        const dataHoje = new Date().toISOString().split('T')[0];
        if (novoStatus === 'Pronto / Entregue' && os.restanteAPagar > 0) {
          const saldo = os.restanteAPagar;
          setTransacoes(prev => [{
            id: Date.now(),
            descricao: `Liquidação Final OS #${os.id} (${os.cliente})`,
            matricula: os.matricula,
            categoria: 'Serviço',
            tipo: 'receita' as const,
            valor: saldo,
            data: dataHoje
          }, ...prev]);
          return { ...os, status: novoStatus, sinalPago: os.sinalPago + saldo, restanteAPagar: 0 };
        }
        return { ...os, status: novoStatus };
      }
      return os;
    }));
  };

  const imprimirFichaOS = (os: any) => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`
      <html>
        <head><title>OS #${os.id} - ${dadosEmpresa.nome}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #111; }
          .header { border-bottom: 2px solid #d4af37; padding-bottom: 10px; display: flex; justify-content: space-between; }
          h1 { color: #d4af37; margin: 0; font-size: 20px; }
          .box { background: #f9f9f9; border: 1px solid #ddd; padding: 12px; border-radius: 6px; margin: 15px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ccc; padding: 10px; font-size: 15px; text-align: left; }
          th { background: #111; color: #d4af37; }
        </style>
        </head>
        <body>
          <div class="header">
            <div><h1>${dadosEmpresa.nome}</h1><p>${dadosEmpresa.morada} | NIF: ${dadosEmpresa.nif} | Tel: ${dadosEmpresa.telefone}</p></div>
            <div style="text-align: right;"><b>OS Nº:</b> #${os.id}<br/><b>Data:</b> ${os.data}</div>
          </div>
          <div class="box">
            <p><b>Cliente:</b> ${os.cliente}</p>
            <p><b>Viatura:</b> ${os.veiculo} | <b>Matrícula:</b> ${os.matricula}</p>
            <p><b>Status:</b> ${os.status} | <b>Equipa:</b> ${os.funcionariosAtgados.join(', ') || 'Nenhum'}</p>
          </div>
          <table>
            <tr><th>Serviço Solicitado</th><th>Observações</th></tr>
            <tr><td><b>${os.servico}</b></td><td>${os.observacoes}</td></tr>
          </table>
          <div style="margin-top: 20px; text-align: right; font-size: 16px;">
            <p>Subtotal: ${os.valorOriginal.toFixed(2)}€ | Desconto: -${os.desconto.toFixed(2)}€</p>
            <p style="color: #059669;">Sinal Pago: -${os.sinalPago.toFixed(2)}€</p>
            <h3 style="color: #d4af37;">Restante a Pagar: ${os.restanteAPagar.toFixed(2)}€</h3>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  const exportarRelatorioPDF = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    const filtradas = transacoes.filter(t => {
      const matchInicio = !dataInicioFiltro || t.data >= dataInicioFiltro;
      const matchFim = !dataFimFiltro || t.data <= dataFimFiltro;
      const matchMes = !mesFiltro || t.data.startsWith(mesFiltro);
      const matchMatricula = !matriculaFiltro || (t.matricula && t.matricula.toUpperCase().includes(matriculaFiltro.toUpperCase()));
      return matchInicio && matchFim && matchMes && matchMatricula;
    });

    const rec = filtradas.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
    const desp = filtradas.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);

    w.document.write(`
      <html>
        <head><title>Relatório Livro-Caixa - ${dadosEmpresa.nome}</title>
        <style>body{font-family:Arial;padding:30px;color:#111;} h1{color:#d4af37;}</style>
        </head>
        <body>
          <h1>${dadosEmpresa.nome} - Relatório Financeiro</h1>
          <p>NIF: ${dadosEmpresa.nif} | Tel: ${dadosEmpresa.telefone}</p>
          <p style="font-size: 16px;">Receitas: <b>+${rec.toFixed(2)}€</b> | Despesas: <b style="color:red;">-${desp.toFixed(2)}€</b> | Líquido: <b>${(rec - desp).toFixed(2)}€</b></p>
          <hr/>
          <table width="100%" border="1" cellspacing="0" cellpadding="10" style="border-collapse:collapse;font-size:14px;">
            <tr><th>Data</th><th>Matrícula</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Valor</th></tr>
            ${filtradas.map(t => `<tr><td>${t.data}</td><td>${t.matricula || '-'}</td><td>${t.tipo.toUpperCase()}</td><td>${t.categoria}</td><td>${t.descricao}</td><td>${t.valor.toFixed(2)}€</td></tr>`).join('')}
          </table>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'ordem-servico', label: '📋 Nova Ordem de Serviço' },
    { id: 'agenda', label: '📅 Agenda & Feriados' },
    { id: 'financeiro', label: '💰 Livro-Caixa' },
    { id: 'funcionarios', label: '👥 Funcionários' },
    { id: 'config', label: '⚙️ Empresa' },
  ];

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Pendente Aprovação': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)' };
      case 'Aguardando Peças': return { bg: 'rgba(251, 191, 36, 0.2)', color: '#fde047', border: '1px solid rgba(251, 191, 36, 0.4)' };
      case 'Em Execução': return { bg: 'rgba(37, 99, 235, 0.2)', color: '#93c5fd', border: '1px solid rgba(37, 99, 235, 0.4)' };
      case 'Aguardando Pagamento': return { bg: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.4)' };
      case 'Pronto / Entregue': return { bg: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', border: '1px solid rgba(52, 211, 153, 0.4)' };
      default: return { bg: '#1e293b', color: '#fff', border: '1px solid #334155' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090a0f', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#0d0f17', borderBottom: '1px solid #1e2235', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#d4af37', margin: 0, letterSpacing: '0.5px' }}>{dadosEmpresa.nome}</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Estética Automotiva de Alta Performance • Cascais • NIF: {dadosEmpresa.nif}</p>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: '#131722', padding: '6px', borderRadius: '10px', border: '1px solid #222b45' }}>
            <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#d4af37' : 'transparent', color: user === 'admin' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Admin</button>
            <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#d4af37' : 'transparent', color: user === 'funcionario' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Equipa</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* MENU LATERAL */}
        <nav style={{ 
          width: '300px', 
          backgroundColor: '#0d0f17', 
          borderRight: '1px solid #1e2235', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          padding: '24px 16px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 'bold', padding: '0 12px', marginBottom: '12px', letterSpacing: '1px' }}>Menu Principal</p>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                textAlign: 'left',
                padding: '16px 18px',
                fontSize: '16px',
                fontWeight: tab === item.id ? 'bold' : '500',
                cursor: 'pointer',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: tab === item.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                color: tab === item.id ? '#d4af37' : '#e2e8f0',
                borderLeft: tab === item.id ? '5px solid #d4af37' : '5px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTEÚDO PRINCIPAL */}
        <main style={{ flex: 1, padding: '36px 44px', width: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
          
          {/* ABA 1: VEÍCULOS NO PÁTIO */}
          {tab === 'pateo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Veículos no Pátio</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Acompanhe o status em tempo real com botões dinâmicos.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  + Dar Entrada em Veículo
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {ordensServico.map(os => {
                  const badge = getBadgeStyle(os.status);
                  return (
                    <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '14px', color: '#60a5fa', fontWeight: 'bold' }}>OS #{os.id}</span>
                          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{os.veiculo}</h3>
                          <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0' }}>Matrícula: <b style={{ color: '#fff', background: '#090a0f', padding: '4px 10px', borderRadius: '6px', fontSize: '16px', border: '1px solid #222b45' }}>{os.matricula}</b></p>
                        </div>
                        <select 
                          value={os.status}
                          onChange={(e) => atualizarStatusOS(os.id, e.target.value)}
                          style={{ backgroundColor: badge.bg, color: badge.color, border: badge.border, padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          <option value="Pendente Aprovação">Pendente Aprovação</option>
                          <option value="Aguardando Peças">Aguardando Peças</option>
                          <option value="Em Execução">Em Execução</option>
                          <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                          <option value="Pronto / Entregue">Pronto / Entregue</option>
                        </select>
                      </div>

                      <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #1e2235' }}>
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente}</p>
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Serviço:</b> {os.servico}</p>
                        <p style={{ margin: 0, color: '#cbd5e1' }}><b>Técnico(s):</b> {os.funcionariosAtgados.join(', ') || 'Nenhum'}</p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', borderTop: '1px solid #1e2235', paddingTop: '14px' }}>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Total: <b>{os.valorFinal.toFixed(2)}€</b></span><br/>
                          <span style={{ color: '#34d399' }}>Sinal: <b>{os.sinalPago.toFixed(2)}€</b></span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: '#94a3b8' }}>Falta Pagar:</span><br/>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: os.restanteAPagar > 0 ? '#f87171' : '#34d399' }}>{os.restanteAPagar.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => imprimirFichaOS(os)} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                          🖨️ Imprimir OS (PDF)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: PAINEL & GRÁFICOS */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Desempenho</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Balanço financeiro por período.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: '#131722', padding: '14px', borderRadius: '12px', border: '1px solid #1e2235' }}>
                  <input type="date" value={dataInicioFiltro} onChange={(e) => setDataInicioFiltro(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '15px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '15px' }}>até</span>
                  <input type="date" value={dataFimFiltro} onChange={(e) => setDataFimFiltro(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '15px' }} />
                </div>
              </div>

              {(() => {
                const filtradas = transacoes.filter(t => (!dataInicioFiltro || t.data >= dataInicioFiltro) && (!dataFimFiltro || t.data <= dataFimFiltro));
                const rec = filtradas.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const desp = filtradas.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
                const liq = rec - desp;

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: liq >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liq.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Receitas</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Despesas / Custos</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: NOVA ORDEM DE SERVIÇO */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Nova Ordem de Serviço</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Registe a entrada da viatura, custos de peças e equipa.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', maxWidth: '900px' }}>
                <form onSubmit={criarOrdemServico} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Matrícula</label>
                      <input type="text" placeholder="0KM-7700" value={osMatricula} onChange={(e) => handleOsMatriculaChange(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Cliente</label>
                      <input type="text" placeholder="Nome do cliente" value={osCliente} onChange={(e) => setOsCliente(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Viatura</label>
                      <input type="text" placeholder="Ex: Porsche 911" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Serviço</label>
                      <input type="text" placeholder="Ex: Vitrificação" value={osServico} onChange={(e) => setOsServico(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>👥 Técnicos Encarregues:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                      {funcionarios.map(f => (
                        <button key={f.id} type="button" onClick={() => toggleFuncionarioOS(f.nome)} style={{ backgroundColor: osFuncionarios.includes(f.nome) ? '#2563eb' : '#131722', color: '#fff', border: '1px solid #222b45', padding: '10px 18px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
                          {osFuncionarios.includes(f.nome) ? '✓ ' : ''}{f.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Valor (€)</label>
                      <input type="number" step="0.01" value={osValor} onChange={(e) => setOsValor(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#f87171', marginBottom: '8px', fontWeight: 'bold' }}>Custos (Peças) (€)</label>
                      <input type="number" step="0.01" value={osCustos} onChange={(e) => setOsCustos(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#34d399', marginBottom: '8px', fontWeight: 'bold' }}>Sinal Entrada (€)</label>
                      <input type="number" step="0.01" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '12px', fontSize: '17px' }}>
                    Criar Ordem de Serviço
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ABA 4: AGENDA & FERIADOS (Com campo de Hora) */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Agenda & Feriados Nacionais</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Consulte agendamentos com horários e feriados em Portugal.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 18px 0' }}>Novo Agendamento</h3>
                  <form onSubmit={adicionarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="text" placeholder="Matrícula (Ex: 0KM-7700)" value={novaMatriculaAgend} onChange={(e) => setNovaMatriculaAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px', textTransform: 'uppercase' }} />
                    <input type="text" placeholder="Nome Cliente" value={novoClienteAgend} onChange={(e) => setNovoClienteAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    <input type="text" placeholder="Serviço (Ex: Vitrificação)" value={novoServicoAgend} onChange={(e) => setNovoServicoAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Data</label>
                        <input type="date" value={novaDataAgend} onChange={(e) => setNovaDataAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Hora</label>
                        <input type="time" value={novaHoraAgend} onChange={(e) => setNovaHoraAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '6px' }}>Criar Agendamento</button>
                  </form>

                  {/* Lista de Agendamentos */}
                  <div style={{ marginTop: '24px', borderTop: '1px solid #1e2235', paddingTop: '18px' }}>
                    <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '12px' }}>Lista de Agendados</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                      {servicosRealizados.map(ag => (
                        <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '12px', borderRadius: '8px', border: '1px solid #222b45', fontSize: '14px' }}>
                          <p style={{ margin: '0 0 2px 0', color: '#fff', fontWeight: 'bold' }}>{ag.veiculo} ({ag.matricula})</p>
                          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>📅 {ag.data} às <b>{ag.hora || '09:00'}</b> | {ag.servico}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 18px 0' }}>🇵🇹 Feriados Nacionais</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                    {feriadosPortugal.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', padding: '12px 16px', backgroundColor: '#090a0f', borderRadius: '8px', border: '1px solid #1e2235' }}>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>{f.nome}</span>
                        <span style={{ color: '#60a5fa' }}>{f.data}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: LIVRO-CAIXA */}
          {tab === 'financeiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Registo financeiro com filtros por mês, datas e matrícula.</p>
                </div>
                <button onClick={exportarRelatorioPDF} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                  📄 Gerar Relatório PDF
                </button>
              </div>

              {/* BARRA DE FILTROS AVANÇADOS */}
              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '20px', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>🔍 Filtrar por Matrícula / Veículo</label>
                  <input type="text" placeholder="Ex: 0KM-7700" value={matriculaFiltro} onChange={(e) => setMatriculaFiltro(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '14px', textTransform: 'uppercase' }} />
                </div>
                <div style={{ flex: '1', minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>📅 Filtrar por Mês (Ano-Mês)</label>
                  <input type="month" value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                {(matriculaFiltro || mesFiltro) && (
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={() => { setMatriculaFiltro(''); setMesFiltro(''); }} style={{ backgroundColor: '#222b45', color: '#f87171', border: 'none', padding: '11px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      Limpar Filtros ✕
                    </button>
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '500px', overflowY: 'auto' }}>
                  {transacoes
                    .filter(t => {
                      const matchMes = !mesFiltro || t.data.startsWith(mesFiltro);
                      const matchMatricula = !matriculaFiltro || (t.matricula && t.matricula.toUpperCase().includes(matriculaFiltro.toUpperCase()));
                      return matchMes && matchMatricula;
                    })
                    .map(t => (
                      <div key={t.id} style={{ backgroundColor: '#090a0f', padding: '18px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>
                            {t.descricao} <span style={{ fontSize: '13px', color: '#60a5fa' }}>[{t.categoria}]</span>
                            {t.matricula && <span style={{ marginLeft: '8px', backgroundColor: '#131722', border: '1px solid #222b45', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', color: '#d4af37' }}>🚗 {t.matricula}</span>}
                          </p>
                          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>📅 {t.data}</p>
                        </div>
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: t.tipo === 'receita' ? '#34d399' : '#f87171' }}>
                          {t.tipo === 'receita' ? '+' : '-'}{t.valor.toFixed(2)} €
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA 6: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Controlo de equipa com salários fixos, comissões e diárias.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 18px 0' }}>Novo Funcionário</h3>
                  <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="text" placeholder="Nome" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    <input type="text" placeholder="Cargo" value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <select value={tipoRemuneracao} onChange={(e) => setTipoRemuneracao(e.target.value as any)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }}>
                        <option value="comissao">Comissão (%)</option>
                        <option value="fixo">Salário Fixo (€)</option>
                        <option value="diaria">Diária (€)</option>
                      </select>
                      <input type="number" value={valorRemuneracao} onChange={(e) => setValorRemuneracao(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Guardar</button>
                  </form>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 18px 0' }}>Equipa</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {funcionarios.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{f.nome} ({f.cargo})</p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                            {f.tipoRemuneracao === 'fixo' && `Salário Fixo: ${f.valorPctOuFixo}€`}
                            {f.tipoRemuneracao === 'comissao' && `Comissão: ${f.valorPctOuFixo}%`}
                            {f.tipoRemuneracao === 'diaria' && `Diária: ${f.valorPctOuFixo}€ / dia`}
                          </p>
                        </div>
                        <button onClick={() => removerFuncionario(f.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 7: CONFIGURAÇÕES DA EMPRESA */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>⚙️ Dados da Empresa</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Informações oficiais impressas nos documentos.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Nome Comercial</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>NIF</label>
                    <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Telefone</label>
                    <input type="text" value={dadosEmpresa.telefone} onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Morada</label>
                  <input type="text" value={dadosEmpresa.morada} onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
                  <input type="text" value={dadosEmpresa.email} onChange={(e) => setDadosEmpresa({...dadosEmpresa, email: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
