'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  // Dados da Empresa
  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX77 DETAILING, UNIPESSOAL LDA',
    nif: '513 401 890',
    morada: 'Pavilhão Guilherme Pinto Basto, R. da Torre, 2750-748 Cascais, Portugal',
    telefone: '+351 21 151 5449',
    email: 'carbox77detailing@gmail.com',
    capitalSocial: '50000,00',
    conservatoria: 'Registo Comercial de Lisboa',
    iban: 'PT50 0033 0000 4546 1405 9370 5',
    swift: 'BCOPTPL'
  });

  // Stock / Produtos (Materiais Caros)
  const [stock, setStock] = useState([
    { id: 1, nome: 'Película PPF (metros)', qtd: 20, custoUnitario: 35.00 },
    { id: 2, nome: 'Fusion Coating (ml)', qtd: 250, custoUnitario: 45.00 },
    { id: 3, nome: 'Shampoo Neutro Detail (L)', qtd: 10, custoUnitario: 12.00 }
  ]);
  const [novoStockNome, setNovoStockNome] = useState('');
  const [novoStockQtd, setNovoStockQtd] = useState('');
  const [novoStockCusto, setNovoStockCusto] = useState('');

  // Funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30, adiantamento: 150.00 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000.00, adiantamento: 0.00 },
    { id: 3, nome: 'Ricardo Costa', cargo: 'Polidor Externo', tipoRemuneracao: 'diaria', valorPctOuFixo: 75.00, adiantamento: 50.00 },
    { id: 4, nome: 'Kevin', cargo: 'Detailer', tipoRemuneracao: 'comissao', valorPctOuFixo: 30, adiantamento: 0.00 }
  ]);

  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo' | 'diaria'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');
  const [novoFuncAdiantamento, setNovoFuncAdiantamento] = useState('0');

  // Agenda / Avaliações
  const [agendamentos, setAgendamentos] = useState([
    { 
      id: 1, 
      tipo: 'Avaliação', 
      cliente: 'Carla Monteiro', 
      telefone1: '+351 922 333 444', 
      telefone2: '+351 911 222 333', 
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      notasAvaliacao: 'Avaliação inicial do estado da pintura e proteções.', 
      data: '2026-09-30', 
      hora: '14:00', 
      status: 'Agendado' 
    }
  ]);

  const [agClient, setAgClient] = useState('');
  const [agTel1, setAgTel1] = useState('');
  const [agTel2, setAgTel2] = useState('');
  const [agVeiculo, setAgVeiculo] = useState('');
  const [agMatricula, setAgMatricula] = useState('');
  const [agData, setAgData] = useState('');
  const [agHoraSel, setAgHoraSel] = useState('10');
  const [agMinSel, setAgMinSel] = useState('00');
  const [agNotas, setAgNotas] = useState('');

  // OS / Orçamento
  const [osCliente, setOsCliente] = useState('Carla Monteiro');
  const [osContacto, setOsContacto] = useState('922 333 444');
  const [osVeiculo, setOsVeiculo] = useState('Renault Captur');
  const [osMatricula, setOsMatricula] = useState('AZ-91-GI');
  const [osObs, setOsObs] = useState('Renault Captur matrícula AZ-91-GI. Regime de isenção.');

  const [listaItensServico, setListaItensServico] = useState([
    { id: 1, descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: '120.00', desconto: '120.00' },
    { id: 2, descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: '400.00', desconto: '0.00' }
  ]);

  const [listaCustosOS, setListaCustosOS] = useState([
    { produto: 'Película PPF (metros)', qtdUtilizada: 2 }
  ]);

  const [osSinal, setOsSinal] = useState('300.00');

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '922 333 444',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicosDetalhes: [
        { descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: 120.00, desconto: 120.00 },
        { descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: 400.00, desconto: 0.00 }
      ],
      materiaisConsumidos: [{ produto: 'Película PPF (metros)', qtd: 2, custoTotal: 70.00 }],
      custoTotalMateriais: 70.00,
      valorOriginal: 520.00, 
      descontoTotal: 120.00, 
      valorFinal: 400.00, 
      sinalPago: 300.00,
      restanteAPagar: 100.00,
      status: 'Em Execução', 
      data: '2026-09-23' 
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: '2026-09-23' }
  ]);

  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransVal, setNovaTransVal] = useState('');
  const [novaTransData, setNovaTransData] = useState(new Date().toISOString().split('T')[0]);

  // Função WhatsApp
  const enviarWhatsApp = (cliente: string, veiculo: string, matricula: string, telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${cliente}, informamos que o seu veículo ${veiculo} (${matricula}) na CARBOX77 Detailing está pronto para levantamento. Obrigado pela preferência!`);
    window.open(`https://wa.me/${telLimpo}?text=${msg}`, '_blank');
  };

  // Funções Gestão
  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome || !novoFuncCargo) return;
    setFuncionarios([
      ...funcionarios, 
      { 
        id: Date.now(), 
        nome: novoFuncNome, 
        cargo: novoFuncCargo, 
        tipoRemuneracao, 
        valorPctOuFixo: Number(valorRemuneracao) || 0,
        adiantamento: Number(novoFuncAdiantamento) || 0
      }
    ]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
    setValorRemuneracao('30');
    setNovoFuncAdiantamento('0');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const adicionarStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoStockNome || !novoStockQtd || !novoStockCusto) return;
    setStock([...stock, { id: Date.now(), nome: novoStockNome, qtd: Number(novoStockQtd) || 0, custoUnitario: Number(novoStockCusto) || 0 }]);
    setNovoStockNome('');
    setNovoStockQtd('');
    setNovoStockCusto('');
  };

  const criarOSOuOrcamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente || !osMatricula) {
      alert('Por favor, preencha o Nome do Cliente e a Matrícula.');
      return;
    }

    let valOrig = 0;
    let descTot = 0;
    const servicosFormatados = listaItensServico.map(item => {
      const v = Number(item.valor) || 0;
      const d = Number(item.desconto) || 0;
      valOrig += v;
      descTot += d;
      return {
        descricao: item.descricao || 'Serviço Detalhado',
        funcionario: item.funcionario || 'Não atribuído',
        valor: v,
        desconto: d
      };
    });

    let custoMatTotal = 0;
    const materiaisFormatados = listaCustosOS.map(c => {
      const itemStock = stock.find(s => s.nome === c.produto);
      const custoUni = itemStock ? itemStock.custoUnitario : 0;
      const subT = custoUni * (c.qtdUtilizada || 1);
      custoMatTotal += subT;
      return { produto: c.produto, qtd: c.qtdUtilizada, custoTotal: subT };
    });

    const valorFinal = valOrig - descTot;
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);

    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      contacto: osContacto,
      veiculo: osVeiculo || 'Viatura',
      matricula: osMatricula.toUpperCase(),
      servicosDetalhes: servicosFormatados,
      materiaisConsumidos: materiaisFormatados,
      custoTotalMateriais: custoMatTotal,
      valorOriginal: valOrig,
      descontoTotal: descTot,
      valorFinal: valorFinal,
      sinalPago: sinal,
      restanteAPagar: restante,
      status: 'Em Execução',
      data: new Date().toISOString().split('T')[0]
    };

    setOrdensServico([novaOS, ...ordensServico]);
    alert('Registo criado com sucesso!');
    setTab('pateo');
  };

  const criarAgendamentoAvaliacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agClient || !agTel1 || !agData) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const novoAg = {
      id: Date.now(),
      tipo: 'Avaliação',
      cliente: agClient,
      telefone1: `+351 ${agTel1}`,
      telefone2: agTel2 ? agTel2 : '',
      veiculo: agVeiculo || 'Viatura Geral',
      matricula: agMatricula ? agMatricula.toUpperCase() : 'Não informada',
      notasAvaliacao: agNotas || 'Avaliação técnica agendada.',
      data: agData,
      hora: `${agHoraSel}:${agMinSel}`,
      status: 'Agendado'
    };

    setAgendamentos([novoAg, ...agendamentos]);
    setAgClient('');
    setAgTel1('');
    setAgTel2('');
    setAgVeiculo('');
    setAgMatricula('');
    setAgData('');
    setAgNotas('');
    alert('Agendamento registado com sucesso!');
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => os.id === id ? { ...os, status: novoStatus } : os));
  };

  const adicionarTransacaoManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTransDesc || !novaTransVal || !novaTransData) return;
    setTransacoes([{ id: Date.now(), descricao: novaTransDesc, matricula: 'GERAL', categoria: 'Serviço', tipo: 'receita', valor: Number(novaTransVal) || 0, data: novaTransData }, ...transacoes]);
    setNovaTransDesc('');
    setNovaTransVal('');
    alert('Transação registada!');
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'ordem-servico', label: '📋 OS / Orçamento' },
    { id: 'agendamento', label: '📅 Agendamento (Avaliação)' },
    { id: 'agenda', label: '🗓️ Calendário & Agenda' },
    { id: 'financeiro', label: '💰 Livro-Caixa' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
    { id: 'stock', label: '📦 Controlo de Stock' },
    { id: 'config', label: '⚙️ Empresa' },
  ];

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Pendente Aprovação': return { bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)' };
      case 'Aguardando Peças': return { bg: 'rgba(251, 191, 36, 0.25)', color: '#fde047', border: '1px solid rgba(251, 191, 36, 0.5)' };
      case 'Em Execução': return { bg: 'rgba(37, 99, 235, 0.25)', color: '#93c5fd', border: '1px solid rgba(37, 99, 235, 0.5)' };
      case 'Aguardando Pagamento': return { bg: 'rgba(168, 85, 247, 0.25)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.5)' };
      case 'Pronto / Entregue': return { bg: 'rgba(52, 211, 153, 0.25)', color: '#6ee7b7', border: '1px solid rgba(52, 211, 153, 0.5)' };
      default: return { bg: '#1e293b', color: '#fff', border: '1px solid #334155' };
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#07080c', 
      backgroundImage: `linear-gradient(rgba(7, 8, 12, 0.93), rgba(7, 8, 12, 0.95)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#f8fafc', 
      fontFamily: 'system-ui, sans-serif', 
      display: 'flex', 
      flexDirection: 'column',
      fontSize: '16px'
    }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: 'rgba(11, 13, 20, 0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1f293d', padding: '22px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '1px', color: '#d4af37', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              CARBOX<span style={{ color: '#fff' }}>77</span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '3px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              DETAILING
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #222b45', paddingLeft: '20px' }}>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{dadosEmpresa.nome}</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>📍 {dadosEmpresa.morada} | 📞 {dadosEmpresa.telefone}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: '#131722', padding: '6px', borderRadius: '10px', border: '1px solid #222b45' }}>
            <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#d4af37' : 'transparent', color: user === 'admin' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Admin</button>
            <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#d4af37' : 'transparent', color: user === 'funcionario' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Equipa</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* MENU LATERAL */}
        <nav style={{ 
          width: '300px', 
          backgroundColor: 'rgba(11, 13, 20, 0.88)', 
          backdropFilter: 'blur(8px)',
          borderRight: '1px solid #1f293d', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          padding: '28px 18px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 'bold', padding: '0 12px', marginBottom: '8px', letterSpacing: '1px' }}>Menu Principal</p>
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
                borderRadius: '12px',
                border: 'none',
                backgroundColor: tab === item.id ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
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
        <main style={{ flex: 1, padding: '40px 48px', width: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
          
          {/* ABA 1: VEÍCULOS NO PÁTIO (COM BOTÃO WHATSAPP) */}
          {tab === 'pateo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Veículos no Pátio</h2>
                  <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Acompanhe o status e envie avisos por WhatsApp.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px 26px', borderRadius: '12px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer' }}
                >
                  + Novo Registo / OS / Orçamento
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '26px' }}>
                {ordensServico.map(os => {
                  const badge = getBadgeStyle(os.status);
                  return (
                    <div key={os.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '15px', color: '#60a5fa', fontWeight: 'bold' }}>Registo #{os.id}</span>
                          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{os.veiculo}</h3>
                          <p style={{ fontSize: '16px', color: '#cbd5e1', margin: '8px 0 0 0' }}>Matrícula: <b style={{ color: '#fff', background: '#090a0f', padding: '6px 12px', borderRadius: '8px', fontSize: '17px', border: '1px solid #222b45' }}>{os.matricula}</b></p>
                        </div>
                        <select 
                          value={os.status}
                          onChange={(e) => atualizarStatusOS(os.id, e.target.value)}
                          style={{ backgroundColor: badge.bg, color: badge.color, border: badge.border, padding: '12px 16px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          <option value="Pendente Aprovação">Pendente Aprovação</option>
                          <option value="Aguardando Peças">Aguardando Peças</option>
                          <option value="Em Execução">Em Execução</option>
                          <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                          <option value="Pronto / Entregue">Pronto / Entregue</option>
                        </select>
                      </div>

                      <div style={{ backgroundColor: 'rgba(9, 10, 15, 0.7)', padding: '18px', borderRadius: '14px', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #1f293d' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente} ({os.contacto})</p>
                          <button 
                            onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)}
                            style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            💬 WhatsApp
                          </button>
                        </div>
                        <div>
                          <p style={{ margin: '0 0 6px 0', color: '#d4af37', fontWeight: 'bold', fontSize: '15px' }}>Serviços:</p>
                          {os.servicosDetalhes.map((s: any, idx: number) => (
                            <div key={idx} style={{ margin: '4px 0', color: '#cbd5e1', fontSize: '15px', display: 'flex', justifyContent: 'space-between' }}>
                              <span>• {s.descricao} ({s.funcionario})</span>
                              <b>{(s.valor - (s.desconto || 0)).toFixed(2)}€</b>
                            </div>
                          ))}
                          {os.custoTotalMateriais ? (
                            <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#f87171' }}>Custo Material Aplicado: -{os.custoTotalMateriais.toFixed(2)}€</p>
                          ) : null}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', borderTop: '1px solid #1f293d', paddingTop: '16px' }}>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Total: <b>{os.valorFinal.toFixed(2)}€</b></span><br/>
                          <span style={{ color: '#34d399' }}>Sinal: <b>{os.sinalPago.toFixed(2)}€</b></span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: '#94a3b8' }}>Falta Pagar:</span><br/>
                          <span style={{ fontSize: '20px', fontWeight: 'bold', color: os.restanteAPagar > 0 ? '#f87171' : '#34d399' }}>{os.restanteAPagar.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: PAINEL & GRÁFICOS */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Desempenho</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Balanço financeiro por período.</p>
              </div>

              {(() => {
                const rec = transacoes.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const desp = transacoes.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
                const liq = rec - desp;

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', padding: '32px', borderRadius: '18px' }}>
                      <p style={{ fontSize: '15px', color: '#d4af37', fontWeight: 'bold', margin: '0 0 12px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                      <p style={{ fontSize: '36px', fontWeight: 'extrabold', color: liq >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liq.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', padding: '32px', borderRadius: '18px' }}>
                      <p style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 12px 0', textTransform: 'uppercase' }}>Total Receitas</p>
                      <p style={{ fontSize: '36px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', padding: '32px', borderRadius: '18px' }}>
                      <p style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 12px 0', textTransform: 'uppercase' }}>Total Custos / Despesas</p>
                      <p style={{ fontSize: '36px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: OS / ORÇAMENTO (COM CONSUMO DE STOCK) */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Emissão de Orçamento / OS</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Regime de isenção de IVA (Art. 53º do CIVA).</p>
              </div>

              <form onSubmit={criarOSOuOrcamento} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Dados do Cliente e Viatura</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Nome do Cliente *</label>
                      <input 
                        type="text" 
                        required
                        value={osCliente}
                        onChange={(e) => setOsCliente(e.target.value)}
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Matrícula *</label>
                      <input 
                        type="text" 
                        required
                        value={osMatricula}
                        onChange={(e) => setOsMatricula(e.target.value)}
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '18px', borderRadius: '12px', fontWeight: 'bold', fontSize: '19px', cursor: 'pointer', width: '100%' }}
                >
                  Registar Orçamento / OS
                </button>
              </form>
            </div>
          )}

          {/* ABA 4: AGENDAMENTO (AVALIAÇÃO) */}
          {tab === 'agendamento' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Agendamento de Avaliações</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Agende avaliações de veículos sem custos, sinal ou IVA.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
                
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Marcar Nova Avaliação</h3>
                  
                  <form onSubmit={criarAgendamentoAvaliacao} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Nome do Cliente *</label>
                      <input 
                        type="text" 
                        required
                        value={agClient}
                        onChange={(e) => setAgClient(e.target.value)}
                        placeholder="Ex: Carla Monteiro"
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Contacto / Telefone Principal *</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '14px 16px', backgroundColor: '#1e2235', border: '1px solid #222b45', borderRight: 'none', borderRadius: '10px 0 0 10px', color: '#d4af37', fontSize: '16px', fontWeight: 'bold' }}>+351</span>
                        <input 
                          type="text" 
                          required
                          value={agTel1}
                          onChange={(e) => setAgTel1(e.target.value)}
                          placeholder="922 333 444"
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '0 10px 10px 0', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Contacto / Telefone 2 (Opcional)</label>
                      <input 
                        type="text" 
                        value={agTel2}
                        onChange={(e) => setAgTel2(e.target.value)}
                        placeholder="Número alternativo"
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Viatura</label>
                        <input 
                          type="text" 
                          value={agVeiculo}
                          onChange={(e) => setAgVeiculo(e.target.value)}
                          placeholder="Renault Captur"
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Matrícula</label>
                        <input 
                          type="text" 
                          value={agMatricula}
                          onChange={(e) => setAgMatricula(e.target.value)}
                          placeholder="AZ-91-GI"
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Data *</label>
                        <input 
                          type="date" 
                          required
                          value={agData}
                          onChange={(e) => setAgData(e.target.value)}
                          style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', cursor: 'pointer' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Hora *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <select
                            value={agHoraSel}
                            onChange={(e) => setAgHoraSel(e.target.value)}
                            style={{ padding: '14px 10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
                          >
                            {['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].map(h => (
                              <option key={h} value={h}>{h}h</option>
                            ))}
                          </select>
                          <select
                            value={agMinSel}
                            onChange={(e) => setAgMinSel(e.target.value)}
                            style={{ padding: '14px 10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
                          >
                            {['00', '15', '30', '45'].map(m => (
                              <option key={m} value={m}>{m}m</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Notas / Motivo</label>
                      <textarea 
                        rows={3}
                        value={agNotas}
                        onChange={(e) => setAgNotas(e.target.value)}
                        placeholder="Descreva o que será avaliado..."
                        style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      type="submit"
                      style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '8px', width: '100%' }}
                    >
                      Confirmar Agendamento de Avaliação
                    </button>
                  </form>
                </div>

                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Avaliações Marcadas</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '620px', overflowY: 'auto' }}>
                    {agendamentos.map(ag => (
                      <div key={ag.id} style={{ backgroundColor: '#090a0f', border: '1px solid #1f293d', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{ag.cliente}</h4>
                            <p style={{ fontSize: '15px', color: '#d4af37', margin: '6px 0 0 0' }}>🚗 {ag.veiculo} ({ag.matricula})</p>
                          </div>
                          <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                            📅 {ag.data} às {ag.hora}
                          </span>
                        </div>

                        <div style={{ fontSize: '15px', color: '#cbd5e1', borderTop: '1px solid #1f293d', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <p style={{ margin: 0 }}>📞 Principal: <b>{ag.telefone1}</b></p>
                          <button 
                            onClick={() => enviarWhatsApp(ag.cliente, ag.veiculo, ag.matricula, ag.telefone1)}
                            style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', width: 'fit-content', marginTop: '6px' }}
                          >
                            💬 Enviar Confirmação WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ABA 5: CALENDÁRIO & AGENDA */}
          {tab === 'agenda' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Calendário & Agenda</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Visualização de compromissos e avaliações agendadas.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {agendamentos.map(ag => (
                  <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}><b>{ag.cliente}</b> - {ag.veiculo} ({ag.matricula})</span>
                    <span style={{ color: '#d4af37', fontSize: '15px', fontWeight: 'bold' }}>{ag.data} às {ag.hora}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 6: LIVRO-CAIXA */}
          {tab === 'financeiro' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Livro-Caixa & Finanças</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Registo de receitas, despesas e saldo geral.</p>
              
              <form onSubmit={adicionarTransacaoManual} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Descrição da transação" 
                  value={novaTransDesc}
                  onChange={(e) => setNovaTransDesc(e.target.value)}
                  style={{ flex: 1, minWidth: '240px', padding: '12px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Valor (€)" 
                  value={novaTransVal}
                  onChange={(e) => setNovaTransVal(e.target.value)}
                  style={{ width: '130px', padding: '12px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {transacoes.map(tr => (
                  <div key={tr.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}>{tr.descricao} ({tr.data})</span>
                    <span style={{ color: tr.tipo === 'receita' ? '#34d399' : '#f87171', fontWeight: 'bold', fontSize: '16px' }}>
                      {tr.tipo === 'receita' ? '+' : '-'}{tr.valor.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 7: FUNCIONÁRIOS & FECHO DE SALÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Gestão de Funcionários & Fecho de Salários</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Registe colaboradores, defina comissões/fixo/diária e controle adiantamentos automaticamente.</p>
              
              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: '#090a0f', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d' }}>
                <input 
                  type="text" 
                  placeholder="Nome do funcionário" 
                  required
                  value={novoFuncNome}
                  onChange={(e) => setNovoFuncNome(e.target.value)}
                  style={{ flex: 1, minWidth: '180px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Cargo (ex: Detailer)" 
                  required
                  value={novoFuncCargo}
                  onChange={(e) => setNovoFuncCargo(e.target.value)}
                  style={{ flex: 1, minWidth: '150px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <select
                  value={tipoRemuneracao}
                  onChange={(e) => setTipoRemuneracao(e.target.value as any)}
                  style={{ padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
                >
                  <option value="comissao">Porcentagem (%)</option>
                  <option value="fixo">Salário Fixo (€)</option>
                  <option value="diaria">Diária (€)</option>
                </select>
                <input 
                  type="text" 
                  placeholder={tipoRemuneracao === 'comissao' ? 'Taxa (%)' : 'Valor (€)'}
                  value={valorRemuneracao}
                  onChange={(e) => setValorRemuneracao(e.target.value)}
                  style={{ width: '130px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Adiantamento (€)"
                  value={novoFuncAdiantamento}
                  onChange={(e) => setNovoFuncAdiantamento(e.target.value)}
                  style={{ width: '150px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '100%' }}>Adicionar Funcionário</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {funcionarios.map(f => {
                  // Calcular produção se for comissão
                  let producaoTotal = 0;
                  if (f.tipoRemuneracao === 'comissao') {
                    ordensServico.forEach(os => {
                      os.servicosDetalhes.forEach(s => {
                        if (s.funcionario === f.nome) {
                          const liqServico = s.valor - (s.desconto || 0);
                          producaoTotal += liqServico * (f.valorPctOuFixo / 100);
                        }
                      });
                    });
                  }

                  const salarioBruto = f.tipoRemuneracao === 'fixo' ? f.valorPctOuFixo : (f.tipoRemuneracao === 'diaria' ? f.valorPctOuFixo * 20 : producaoTotal);
                  const liquidoAReceber = Math.max(0, salarioBruto - (f.adiantamento || 0));

                  return (
                    <div key={f.id} style={{ backgroundColor: '#090a0f', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                      <div>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{f.nome}</span> <span style={{ color: '#94a3b8', fontSize: '15px' }}>({f.cargo})</span>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '15px', flexWrap: 'wrap' }}>
                          <span style={{ color: '#d4af37' }}>
                            Base: <b>{f.tipoRemuneracao === 'comissao' ? `${f.valorPctOuFixo}% (Comissão)` : f.tipoRemuneracao === 'fixo' ? `${f.valorPctOuFixo}€ (Fixo)` : `${f.valorPctOuFixo}€ (Diária)`}</b>
                          </span>
                          <span style={{ color: '#f87171' }}>Adiantamento: <b>{Number(f.adiantamento || 0).toFixed(2)} €</b></span>
                          <span style={{ color: '#34d399' }}>Líquido a Pagar: <b>{liquidoAReceber.toFixed(2)} €</b></span>
                        </div>
                      </div>
                      <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#f87171', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Remover</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 8: CONTROLO DE STOCK */}
          {tab === 'stock' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Controlo de Stock & Materiais</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Registe os materiais caros em stock (películas, cerâmicos, etc.).</p>
              
              <form onSubmit={adicionarStock} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: '#090a0f', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d' }}>
                <input 
                  type="text" 
                  placeholder="Nome do Material" 
                  required
                  value={novoStockNome}
                  onChange={(e) => setNovoStockNome(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Quantidade" 
                  required
                  value={novoStockQtd}
                  onChange={(e) => setNovoStockQtd(e.target.value)}
                  style={{ width: '130px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Custo Unitário (€)" 
                  required
                  value={novoStockCusto}
                  onChange={(e) => setNovoStockCusto(e.target.value)}
                  style={{ width: '150px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '100%' }}>Adicionar ao Stock</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {stock.map(s => (
                  <div key={s.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}><b>{s.nome}</b> - Qtd: {s.qtd}</span>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '16px' }}>Custo Unit.: {s.custoUnitario.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 9: EMPRESA */}
          {tab === 'config' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Dados da Empresa</h2>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Informações fiscais e de contacto oficiais.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Nome</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>NIF</label>
                  <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Morada</label>
                  <input type="text" value={dadosEmpresa.morada} onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})} style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Telefone</label>
                  <input type="text" value={dadosEmpresa.telefone} onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})} style={{ width: '100%', padding: '14px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
