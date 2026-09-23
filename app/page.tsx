'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX 77 - Estética Automotiva',
    nif: '500 123 456',
    morada: 'Pavilhão Guilherme Pinto Basto, R. da Torre, 2750-748 Cascais',
    telefone: '+351 963 800 568',
    email: 'geral@carbox77.pt'
  });

  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');

  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
  ]);
  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Silva', veiculo: 'Porsche 911 Turbo', matricula: '0KM-7700', servico: 'PPF Frontal + Vitrificação', data: '2026-06-01', status: 'Em Execução' }
  ]);
  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novaMatriculaAgend, setNovaMatriculaAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');

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
    { id: 1, descricao: 'Sinal OS #101 (Porsche 911)', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: '2026-06-01' },
    { id: 2, descricao: 'Compra Película PPF', categoria: 'Produtos/Peças', tipo: 'despesa', valor: 150.00, data: '2026-06-01' }
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
    setServicosRealizados([...servicosRealizados, { id: Date.now(), cliente: novoClienteAgend, veiculo: novoVeiculoAgend || 'Desconhecido', matricula: novaMatriculaAgend.toUpperCase(), servico: novoServicoAgend || 'Estética Geral', data: novaDataAgend, status: 'Agendado' }]);
    setNovoClienteAgend('');
    setNovoVeiculoAgend('');
    setNovaMatriculaAgend('');
    setNovoServicoAgend('');
    setNovaDataAgend('');
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

    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      veiculo: osVeiculo || 'Desconhecido',
      matricula: osMatricula.toUpperCase(),
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
      data: new Date().toISOString().split('T')[0]
    };

    setOrdensServico([novaOS, ...ordensServico]);

    if (sinal > 0) {
      setTransacoes(prev => [{
        id: Date.now(),
        descricao: `Sinal OS #${novaOS.id} (${osMatricula}) via ${osContaRecebimento}`,
        categoria: 'Serviço',
        tipo: 'receita' as const,
        valor: sinal,
        data: new Date().toISOString().split('T')[0]
      }, ...prev]);
    }

    if (custos > 0) {
      setTransacoes(prev => [{
        id: Date.now() + 1,
        descricao: `Custos/Peças OS #${novaOS.id} (${osMatricula})`,
        categoria: 'Produtos/Peças',
        tipo: 'despesa' as const,
        valor: custos,
        data: new Date().toISOString().split('T')[0]
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
        if (novoStatus === 'Pronto / Entregue' && os.restanteAPagar > 0) {
          const saldo = os.restanteAPagar;
          setTransacoes(prev => [{
            id: Date.now(),
            descricao: `Liquidação Final OS #${os.id} (${os.cliente})`,
            categoria: 'Serviço',
            tipo: 'receita' as const,
            valor: saldo,
            data: new Date().toISOString().split('T')[0]
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
          h1 { color: #d4af37; margin: 0; font-size: 22px; }
          .box { background: #f9f9f9; border: 1px solid #ddd; padding: 12px; border-radius: 6px; margin: 15px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ccc; padding: 8px; font-size: 14px; text-align: left; }
          th { background: #111; color: #d4af37; }
        </style>
        </head>
        <body>
          <div class="header">
            <div><h1>${dadosEmpresa.nome}</h1><p>${dadosEmpresa.morada} | NIF: ${dadosEmpresa.nif}</p></div>
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
          <div style="margin-top: 20px; text-align: right; font-size: 15px;">
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
    const filtradas = transacoes.filter(t => (!dataInicioFiltro || t.data >= dataInicioFiltro) && (!dataFimFiltro || t.data <= dataFimFiltro));
    const rec = filtradas.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
    const desp = filtradas.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);

    w.document.write(`
      <html>
        <head><title>Relatório Contabilidade - ${dadosEmpresa.nome}</title>
        <style>body{font-family:Arial;padding:30px;color:#111;} h1{color:#d4af37;}</style>
        </head>
        <body>
          <h1>${dadosEmpresa.nome} - Relatório Financeiro</h1>
          <p>Receitas: <b>+${rec.toFixed(2)}€</b> | Despesas: <b style="color:red;">-${desp.toFixed(2)}€</b> | Líquido: <b>${(rec - desp).toFixed(2)}€</b></p>
          <hr/>
          <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse;font-size:13px;">
            <tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Valor</th></tr>
            ${filtradas.map(t => `<tr><td>${t.data}</td><td>${t.tipo.toUpperCase()}</td><td>${t.categoria}</td><td>${t.descricao}</td><td>${t.valor.toFixed(2)}€</td></tr>`).join('')}
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
      case 'Pendente Aprovação': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' };
      case 'Aguardando Peças': return { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' };
      case 'Em Execução': return { bg: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', border: '1px solid rgba(37, 99, 235, 0.3)' };
      case 'Aguardando Pagamento': return { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' };
      case 'Pronto / Entregue': return { bg: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' };
      default: return { bg: '#1e293b', color: '#fff', border: '1px solid #334155' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090a0f', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#0d0f17', borderBottom: '1px solid #1e2235', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0, letterSpacing: '0.5px' }}>{dadosEmpresa.nome}</h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '3px 0 0 0' }}>Estética Automotiva de Alta Performance • Cascais</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: '#131722', padding: '4px', borderRadius: '8px', border: '1px solid #222b45' }}>
            <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#d4af37' : 'transparent', color: user === 'admin' ? '#090a0f' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Admin</button>
            <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#d4af37' : 'transparent', color: user === 'funcionario' ? '#090a0f' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Equipa</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* MENU LATERAL */}
        <nav style={{ 
          width: '280px', 
          backgroundColor: '#0d0f17', 
          borderRight: '1px solid #1e2235', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px', 
          padding: '20px 14px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 'bold', padding: '0 12px', marginBottom: '10px', letterSpacing: '1px' }}>Menu Principal</p>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setMenuMobileAberto(false); }}
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                fontSize: '14px',
                fontWeight: tab === item.id ? 'bold' : '500',
                cursor: 'pointer',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: tab === item.id ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                color: tab === item.id ? '#d4af37' : '#cbd5e1',
                borderLeft: tab === item.id ? '4px solid #d4af37' : '4px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTEÚDO PRINCIPAL EXPANDIDO (100% da tela) */}
        <main style={{ flex: 1, padding: '32px 40px', width: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
          
          {/* ABA 1: VEÍCULOS NO PÁTIO */}
          {tab === 'pateo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Veículos no Pátio</h2>
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Acompanhe o status em tempo real com botões dinâmicos.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  + Dar Entrada em Veículo
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                {ordensServico.map(os => {
                  const badge = getBadgeStyle(os.status);
                  return (
                    <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>OS #{os.id}</span>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{os.veiculo}</h3>
                          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>Matrícula: <b style={{ color: '#fff', background: '#090a0f', padding: '3px 8px', borderRadius: '4px', fontSize: '14px' }}>{os.matricula}</b></p>
                        </div>
                        <select 
                          value={os.status}
                          onChange={(e) => atualizarStatusOS(os.id, e.target.value)}
                          style={{ backgroundColor: badge.bg, color: badge.color, border: badge.border, padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          <option value="Pendente Aprovação">Pendente Aprovação</option>
                          <option value="Aguardando Peças">Aguardando Peças</option>
                          <option value="Em Execução">Em Execução</option>
                          <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                          <option value="Pronto / Entregue">Pronto / Entregue</option>
                        </select>
                      </div>

                      <div style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid #1e2235' }}>
                        <p style={{ margin: 0, color: '#e2e8f0' }}><b>Cliente:</b> {os.cliente}</p>
                        <p style={{ margin: 0, color: '#e2e8f0' }}><b>Serviço:</b> {os.servico}</p>
                        <p style={{ margin: 0, color: '#94a3b8' }}><b>Técnico(s):</b> {os.funcionariosAtgados.join(', ') || 'Nenhum'}</p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', borderTop: '1px solid #1e2235', paddingTop: '12px' }}>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Total: <b>{os.valorFinal.toFixed(2)}€</b></span><br/>
                          <span style={{ color: '#34d399' }}>Sinal: <b>{os.sinalPago.toFixed(2)}€</b></span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: '#94a3b8' }}>Falta Pagar:</span><br/>
                          <span style={{ fontSize: '16px', fontWeight: 'bold', color: os.restanteAPagar > 0 ? '#f87171' : '#34d399' }}>{os.restanteAPagar.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => imprimirFichaOS(os)} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Desempenho</h2>
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Balanço financeiro por período.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#131722', padding: '12px', borderRadius: '12px', border: '1px solid #1e2235' }}>
                  <input type="date" value={dataInicioFiltro} onChange={(e) => setDataInicioFiltro(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '8px', borderRadius: '6px', fontSize: '13px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>até</span>
                  <input type="date" value={dataFimFiltro} onChange={(e) => setDataFimFiltro(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '8px', borderRadius: '6px', fontSize: '13px' }} />
                </div>
              </div>

              {(() => {
                const filtradas = transacoes.filter(t => (!dataInicioFiltro || t.data >= dataInicioFiltro) && (!dataFimFiltro || t.data <= dataFimFiltro));
                const rec = filtradas.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const desp = filtradas.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
                const liq = rec - desp;

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                      <p style={{ fontSize: '28px', fontWeight: 'extrabold', color: liq >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liq.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Receitas</p>
                      <p style={{ fontSize: '28px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Despesas / Custos</p>
                      <p style={{ fontSize: '28px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: NOVA ORDEM DE SERVIÇO */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Nova Ordem de Serviço</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registe a entrada da viatura, custos de peças e equipa.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', maxWidth: '850px' }}>
                <form onSubmit={criarOrdemServico} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Matrícula</label>
                      <input type="text" placeholder="0KM-7700" value={osMatricula} onChange={(e) => handleOsMatriculaChange(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Cliente</label>
                      <input type="text" placeholder="Nome do cliente" value={osCliente} onChange={(e) => setOsCliente(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Viatura</label>
                      <input type="text" placeholder="Ex: Porsche 911" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Serviço</label>
                      <input type="text" placeholder="Ex: Vitrificação" value={osServico} onChange={(e) => setOsServico(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>👥 Técnicos Encarregues:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', border: '1px solid #222b45' }}>
                      {funcionarios.map(f => (
                        <button key={f.id} type="button" onClick={() => toggleFuncionarioOS(f.nome)} style={{ backgroundColor: osFuncionarios.includes(f.nome) ? '#2563eb' : '#131722', color: '#fff', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>
                          {osFuncionarios.includes(f.nome) ? '✓ ' : ''}{f.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Valor (€)</label>
                      <input type="number" step="0.01" value={osValor} onChange={(e) => setOsValor(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#f87171', marginBottom: '6px' }}>Custos (Peças) (€)</label>
                      <input type="number" step="0.01" value={osCustos} onChange={(e) => setOsCustos(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#34d399', marginBottom: '6px' }}>Sinal Entrada (€)</label>
                      <input type="number" step="0.01" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '10px', fontSize: '15px' }}>
                    Criar Ordem de Serviço
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ABA 4: AGENDA & FERIADOS */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Agenda & Feriados Nacionais</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Consulte agendamentos e feriados em Portugal.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 16px 0' }}>Novo Agendamento</h3>
                  <form onSubmit={adicionarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input type="text" placeholder="Matrícula (Ex: 0KM-7700)" value={novaMatriculaAgend} onChange={(e) => setNovaMatriculaAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    <input type="text" placeholder="Nome Cliente" value={novoClienteAgend} onChange={(e) => setNovoClienteAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    <input type="date" value={novaDataAgend} onChange={(e) => setNovaDataAgend(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Agendar</button>
                  </form>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>🇵🇹 Feriados Nacionais</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                    {feriadosPortugal.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '10px 14px', backgroundColor: '#090a0f', borderRadius: '8px', border: '1px solid #1e2235' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa</h2>
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registo financeiro integrado com sinais e despesas.</p>
                </div>
                <button onClick={exportarRelatorioPDF} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                  📄 Gerar Relatório PDF
                </button>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto' }}>
                  {transacoes.map(t => (
                    <div key={t.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>{t.descricao} <span style={{ fontSize: '12px', color: '#60a5fa' }}>[{t.categoria}]</span></p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>📅 {t.data}</p>
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: t.tipo === 'receita' ? '#34d399' : '#f87171' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Controlo de equipa com salários e comissões.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 16px 0' }}>Novo Funcionário</h3>
                  <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input type="text" placeholder="Nome" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    <input type="text" placeholder="Cargo" value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <select value={tipoRemuneracao} onChange={(e) => setTipoRemuneracao(e.target.value as any)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
                        <option value="comissao">Comissão (%)</option>
                        <option value="fixo">Fixo (€)</option>
                      </select>
                      <input type="number" value={valorRemuneracao} onChange={(e) => setValorRemuneracao(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Guardar</button>
                  </form>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Equipa</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {funcionarios.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', border: '1px solid #222b45' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{f.nome} ({f.cargo})</p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{f.tipoRemuneracao === 'fixo' ? `Fixo: ${f.valorPctOuFixo}€` : `Comissão: ${f.valorPctOuFixo}%`}</p>
                        </div>
                        <button onClick={() => removerFuncionario(f.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 7: CONFIGURAÇÕES DA EMPRESA */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '750px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>⚙️ Dados da Empresa</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Informações oficiais impressas nos documentos.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Nome Comercial</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>NIF</label>
                    <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Telefone</label>
                    <input type="text" value={dadosEmpresa.telefone} onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Morada</label>
                  <input type="text" value={dadosEmpresa.morada} onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Email</label>
                  <input type="text" value={dadosEmpresa.email} onChange={(e) => setDadosEmpresa({...dadosEmpresa, email: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
