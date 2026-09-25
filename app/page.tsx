'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  // Dados da Empresa
  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX77 DETAILING, UNIPESSOAL LDA',
    nif: '513 401 890',
    morada: 'Rua da Torre, Pavilhão Guilherme Pinto Basto, 2750-748 Cascais, Portugal',
    telefone: '+351 211 515 449',
    email: 'carbox77detailing@gmail.com',
    capitalSocial: '50000,00',
    conservatoria: 'Registo Comercial de Lisboa',
    iban: 'PT50 0033 0000 4546 1405 9370 5',
    swift: 'BCOPTPL'
  });

  // Funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
    { id: 3, nome: 'Ricardo Costa', cargo: 'Polidor Externo', tipoRemuneracao: 'diaria', valorPctOuFixo: 75 },
    { id: 4, nome: 'Kevin', cargo: 'Detailer', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 }
  ]);
  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo' | 'diaria'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Agenda integrada / Avaliações
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
      data: '2026-09-23', 
      hora: '14:00', 
      status: 'Agendado' 
    }
  ]);

  // Estados para Novo Agendamento / Avaliação
  const [agClient, setAgClient] = useState('');
  const [agTel1, setAgTel1] = useState('');
  const [agTel2, setAgTel2] = useState('');
  const [agVeiculo, setAgVeiculo] = useState('');
  const [agMatricula, setAgMatricula] = useState('');
  const [agData, setAgData] = useState('');
  const [agHora, setAgHora] = useState('');
  const [agNotas, setAgNotas] = useState('');

  // Navegação do Calendário
  const [anoAtualCal, setAnoAtualCal] = useState(2026);
  const [mesAtualCal, setMesAtualCal] = useState(8); // Setembro

  // Formulário Unificado (OS / Orçamento / Agendamento)
  const [tipoRegistroOS, setTipoRegistroOS] = useState<'os' | 'agendamento' | 'orcamento'>('orcamento');
  const [tipoDocumentoGerar, setTipoDocumentoGerar] = useState<'ORÇAMENTO' | 'ORDEM DE SERVIÇO'>('ORÇAMENTO');
  
  const [osCliente, setOsCliente] = useState('Carla Monteiro');
  const [osContacto, setOsContacto] = useState('+351 922 333 444');
  const [osVeiculo, setOsVeiculo] = useState('Renault Captur');
  const [osMatricula, setOsMatricula] = useState('AZ-91-GI');
  const [osObs, setOsObs] = useState('Renault Captur matrícula AZ-91-GI. Regime de isenção.');

  // Múltiplos serviços com técnicos, valores e descontos individuais
  const [listaItensServico, setListaItensServico] = useState([
    { id: 1, descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: '120.00', desconto: '120.00' },
    { id: 2, descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: '400.00', desconto: '0.00' },
    { id: 3, descricao: '111 - FUSION COATING', funcionario: 'Ricardo Costa', valor: '900.00', desconto: '0.00' }
  ]);

  // Custos detalhados
  const [listaCustosDetalhados, setListaCustosDetalhados] = useState([
    { id: 1, descricao: 'Película PPF', valor: '150.00' }
  ]);

  const [osSinal, setOsSinal] = useState('300.00');
  const [osContaRecebimentoSinal, setOsContaRecebimentoSinal] = useState('MB WAY');
  const [osContaRecebimentoFinal, setOsContaRecebimentoFinal] = useState('MB WAY');

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '+351 922 333 444',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicosDetalhes: [
        { descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: 120.00, desconto: 120.00 },
        { descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: 400.00, desconto: 0.00 },
        { descricao: '111 - FUSION COATING', funcionario: 'Ricardo Costa', valor: 900.00, desconto: 0.00 }
      ],
      servico: 'Limpeza Detalhada + PPF Black Piano + Fusion Coating',
      observacoes: 'Renault Captur matrícula AZ-91-GI. Regime de isenção.', 
      custosDetalhados: [{ descricao: 'Película PPF', valor: 150.00 }], 
      valorOriginal: 1420.00, 
      descontoTotal: 120.00, 
      valorFinal: 1300.00, 
      sinalPago: 300.00,
      contaRecebimentoSinal: 'MB WAY',
      restanteAPagar: 1000.00,
      status: 'Em Execução', 
      data: '2026-09-23' 
    }
  ]);

  // Transações Livro-Caixa
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: '2026-09-23' },
    { id: 2, descricao: 'Compra Película PPF', matricula: 'AZ-91-GI', categoria: 'Produtos/Peças', tipo: 'despesa', valor: 150.00, data: '2026-09-23' }
  ]);

  // Estados para nova transação no Livro-Caixa
  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransMat, setNovaTransMat] = useState('');
  const [novaTransCat, setNovaTransCat] = useState('Serviço');
  const [novaTransTipo, setNovaTransTipo] = useState<'receita' | 'despesa'>('receita');
  const [novaTransVal, setNovaTransVal] = useState('');
  const [novaTransData, setNovaTransData] = useState(new Date().toISOString().split('T')[0]);

  // Funções de OS / Serviços
  const adicionarLinhaServico = () => {
    setListaItensServico([...listaItensServico, { id: Date.now(), descricao: '', funcionario: '', valor: '', desconto: '0.00' }]);
  };

  const removerLinhaServico = (index: number) => {
    if (listaItensServico.length === 1) return;
    setListaItensServico(listaItensServico.filter((_, i) => i !== index));
  };

  const atualizarItemServico = (index: number, campo: string, valor: string) => {
    const novaLista = [...listaItensServico];
    (novaLista[index] as any)[campo] = valor;
    setListaItensServico(novaLista);
  };

  const adicionarLinhaCusto = () => {
    setListaCustosDetalhados([...listaCustosDetalhados, { id: Date.now(), descricao: '', valor: '' }]);
  };

  const removerLinhaCusto = (index: number) => {
    if (listaCustosDetalhados.length === 1) return;
    setListaCustosDetalhados(listaCustosDetalhados.filter((_, i) => i !== index));
  };

  const atualizarItemCusto = (index: number, campo: string, valor: string) => {
    const novaLista = [...listaCustosDetalhados];
    (novaLista[index] as any)[campo] = valor;
    setListaCustosDetalhados(novaLista);
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

    const valorFinal = valOrig - descTot;
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);
    const custosFormatados = listaCustosDetalhados.map(c => ({
      descricao: c.descricao || 'Custo',
      valor: Number(c.valor) || 0
    }));

    const novaOSId = Date.now();
    const dataHoje = new Date().toISOString().split('T')[0];

    const novaOS = {
      id: novaOSId,
      cliente: osCliente,
      contacto: osContacto,
      veiculo: osVeiculo || 'Viatura',
      matricula: osMatricula.toUpperCase(),
      servicosDetalhes: servicosFormatados,
      servico: servicosFormatados.map(s => s.descricao).join(' + '),
      observacoes: osObs,
      custosDetalhados: custosFormatados,
      valorOriginal: valOrig,
      descontoTotal: descTot,
      valorFinal: valorFinal,
      sinalPago: sinal,
      contaRecebimentoSinal: osContaRecebimentoSinal,
      restanteAPagar: restante,
      status: 'Em Execução',
      data: dataHoje
    };

    setOrdensServico([novaOS, ...ordensServico]);

    if (sinal > 0) {
      const novaTr = {
        id: Date.now() + 1,
        descricao: `Sinal OS #${novaOSId} (${osCliente}) via ${osContaRecebimentoSinal}`,
        matricula: osMatricula.toUpperCase(),
        categoria: 'Serviço',
        tipo: 'receita' as const,
        valor: sinal,
        data: dataHoje
      };
      setTransacoes(prev => [novaTr, ...prev]);
    }

    custosFormatados.forEach((custo, idx) => {
      if (custo.valor > 0) {
        setTransacoes(prev => [{
          id: Date.now() + 10 + idx,
          descricao: `Custo OS #${novaOSId}: ${custo.descricao}`,
          matricula: osMatricula.toUpperCase(),
          categoria: 'Produtos/Peças',
          tipo: 'despesa' as const,
          valor: custo.valor,
          data: dataHoje
        }, ...prev]);
      }
    });

    alert('Registo / Ordem de Serviço criado com sucesso!');
    setTab('pateo');
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
      telefone1: `+351 ${agTel1}`,
      telefone2: agTel2 ? `+351 ${agTel2}` : '',
      veiculo: agVeiculo || 'Viatura Geral',
      matricula: agMatricula ? agMatricula.toUpperCase() : 'Não informada',
      notasAvaliacao: agNotas || 'Avaliação técnica agendada.',
      data: agData,
      hora: agHora,
      status: 'Agendado'
    };

    setAgendamentos([...agendamentos, novoAg]);
    setAgClient('');
    setAgTel1('');
    setAgTel2('');
    setAgVeiculo('');
    setAgMatricula('');
    setAgData('');
    setAgHora('');
    setAgNotas('');
    alert('Agendamento de Avaliação registado com sucesso!');
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
        const dataHoje = new Date().toISOString().split('T')[0];
        if (novoStatus === 'Pronto / Entregue' && os.restanteAPagar > 0) {
          const saldo = os.restanteAPagar;
          setTransacoes(prev => [{
            id: Date.now(),
            descricao: `Liquidação Final OS #${os.id} (${os.cliente}) via ${osContaRecebimentoFinal}`,
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

  const adicionarTransacaoManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTransDesc || !novaTransVal || !novaTransData) {
      alert('Preencha a descrição, valor e data.');
      return;
    }
    const tr = {
      id: Date.now(),
      descricao: novaTransDesc,
      matricula: novaTransMat.toUpperCase() || 'GERAL',
      categoria: novaTransCat,
      tipo: novaTransTipo,
      valor: Number(novaTransVal) || 0,
      data: novaTransData
    };
    setTransacoes([tr, ...transacoes]);
    setNovaTransDesc('');
    setNovaTransMat('');
    setNovaTransVal('');
    alert('Transação registada no Livro-Caixa com sucesso!');
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <img src="https://i.ibb.co/30B3v5C/carbox-logo.png" alt="CarBox77 Detailing" style={{ height: '45px', width: 'auto' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{dadosEmpresa.nome}</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Estética Automotiva de Alta Performance • Cascais</p>
          </div>
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
                fontSize: '15px',
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
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Acompanhe o status em tempo real.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  + Novo Registo / OS / Orçamento
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {ordensServico.map(os => {
                  const badge = getBadgeStyle(os.status);
                  return (
                    <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '14px', color: '#60a5fa', fontWeight: 'bold' }}>Registo #{os.id}</span>
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
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente} {os.contacto && <span style={{ color: '#94a3b8', fontSize: '13px' }}>({os.contacto})</span>}</p>
                        <div>
                          <p style={{ margin: '0 0 4px 0', color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>Serviços e Descontos:</p>
                          {os.servicosDetalhes ? (
                            os.servicosDetalhes.map((s: any, idx: number) => (
                              <p key={idx} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: '14px' }}>• {s.descricao} - <b>{(s.valor - (s.desconto || 0)).toFixed(2)}€</b> {s.desconto > 0 && <span style={{ color: '#f87171', fontSize: '12px' }}>(Desc: {s.desconto.toFixed(2)}€)</span>}</p>
                            ))
                          ) : (
                            <p style={{ margin: 0, color: '#cbd5e1' }}>{(os as any).servico}</p>
                          )}
                        </div>
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: PAINEL & GRÁFICOS */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Desempenho</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Balanço financeiro por período.</p>
              </div>

              {(() => {
                const rec = transacoes.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const desp = transacoes.filter(t => t.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
                const liq = rec - desp;

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                        <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Custos / Despesas</p>
                        <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Resumo de Veículos e Ordens de Serviço</h3>
                      <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Total de viaturas registadas: <b>{ordensServico.length}</b></p>
                      <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Avaliações agendadas: <b>{agendamentos.length}</b></p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: ORDEM DE SERVIÇO / ORÇAMENTO */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Emissão de Orçamento / OS</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Regime de isenção de IVA (Art. 53º do CIVA) e dados oficiais CARBOX77.</p>
                </div>
                <div style={{ display: 'flex', backgroundColor: '#131722', padding: '6px', borderRadius: '10px', border: '1px solid #222b45' }}>
                  <button 
                    type="button" 
                    onClick={() => setTipoDocumentoGerar('ORÇAMENTO')}
                    style={{ backgroundColor: tipoDocumentoGerar === 'ORÇAMENTO' ? '#d4af37' : 'transparent', color: tipoDocumentoGerar === 'ORÇAMENTO' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Orçamento
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setTipoDocumentoGerar('ORDEM DE SERVIÇO')}
                    style={{ backgroundColor: tipoDocumentoGerar === 'ORDEM DE SERVIÇO' ? '#d4af37' : 'transparent', color: tipoDocumentoGerar === 'ORDEM DE SERVIÇO' ? '#090a0f' : '#cbd5e1', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Ordem de Serviço
                  </button>
                </div>
              </div>

              <form onSubmit={criarOSOuOrcamento} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Dados do Cliente e Veículo */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>1. Dados do Cliente e Viatura</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Nome do Cliente *</label>
                      <input 
                        type="text" 
                        required
                        value={osCliente}
                        onChange={(e) => setOsCliente(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone</label>
                      <input 
                        type="text" 
                        value={osContacto}
                        onChange={(e) => setOsContacto(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Viatura (Marca / Modelo)</label>
                      <input 
                        type="text" 
                        value={osVeiculo}
                        onChange={(e) => setOsVeiculo(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Matrícula *</label>
                      <input 
                        type="text" 
                        required
                        value={osMatricula}
                        onChange={(e) => setOsMatricula(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Serviços e Técnicos */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>2. Serviços, Técnicos e Valores</h3>
                    <button 
                      type="button" 
                      onClick={adicionarLinhaServico}
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      + Adicionar Serviço
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {listaItensServico.map((item, index) => (
                      <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 100px 100px 40px', gap: '12px', alignItems: 'center', backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: '1px solid #1e2235' }}>
                        <input 
                          type="text" 
                          placeholder="Descrição do Serviço" 
                          value={item.descricao}
                          onChange={(e) => atualizarItemServico(index, 'descricao', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        />
                        <select 
                          value={item.funcionario}
                          onChange={(e) => atualizarItemServico(index, 'funcionario', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        >
                          <option value="">Selecione Técnico</option>
                          {funcionarios.map(f => (
                            <option key={f.id} value={f.nome}>{f.nome}</option>
                          ))}
                        </select>
                        <input 
                          type="text" 
                          placeholder="Valor (€)" 
                          value={item.valor}
                          onChange={(e) => atualizarItemServico(index, 'valor', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Desconto (€)" 
                          value={item.desconto}
                          onChange={(e) => atualizarItemServico(index, 'desconto', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => removerLinhaServico(index)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '6px', height: '38px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custos Detalhados */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>3. Custos / Materiais / Peças (Despesas Internas)</h3>
                    <button 
                      type="button" 
                      onClick={adicionarLinhaCusto}
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      + Adicionar Custo
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {listaCustosDetalhados.map((custo, index) => (
                      <div key={custo.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 40px', gap: '12px', alignItems: 'center', backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: '1px solid #1e2235' }}>
                        <input 
                          type="text" 
                          placeholder="Descrição do Custo (ex: Película PPF)" 
                          value={custo.descricao}
                          onChange={(e) => atualizarItemCusto(index, 'descricao', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Valor (€)" 
                          value={custo.valor}
                          onChange={(e) => atualizarItemCusto(index, 'valor', e.target.value)}
                          style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '6px', color: '#fff', fontSize: '14px' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => removerLinhaCusto(index)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '6px', height: '38px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condições de Pagamento e Sinal */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>4. Condições de Pagamento & Sinal</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Valor do Sinal (€)</label>
                      <input 
                        type="text" 
                        value={osSinal}
                        onChange={(e) => setOsSinal(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Conta Recebimento Sinal</label>
                      <select 
                        value={osContaRecebimentoSinal}
                        onChange={(e) => setOsContaRecebimentoSinal(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      >
                        <option value="MB WAY">MB WAY</option>
                        <option value="Transferência Bancária">Transferência Bancária</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Multibanco">Multibanco</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Conta Recebimento Final</label>
                      <select 
                        value={osContaRecebimentoFinal}
                        onChange={(e) => setOsContaRecebimentoFinal(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      >
                        <option value="MB WAY">MB WAY</option>
                        <option value="Transferência Bancária">Transferência Bancária</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Multibanco">Multibanco</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Observações / Notas</label>
                    <textarea 
                      rows={3}
                      value={osObs}
                      onChange={(e) => setOsObs(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', width: '100%' }}
                >
                  Registar e Gerir {tipoDocumentoGerar}
                </button>

              </form>
            </div>
          )}

          {/* ABA 4: AGENDAMENTO (AVALIAÇÃO) */}
          {tab === 'agendamento' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Agendamento de Avaliações</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Agende avaliações de veículos sem custos, sinal, IVA ou atribuição de funcionários.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px' }}>
                
                {/* Formulário de Novo Agendamento de Avaliação */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Marcar Nova Avaliação</h3>
                  
                  <form onSubmit={criarAgendamentoAvaliacao} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Nome do Cliente */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Nome do Cliente *</label>
                      <input 
                        type="text" 
                        required
                        value={agClient}
                        onChange={(e) => setAgClient(e.target.value)}
                        placeholder="Ex: Carla Monteiro"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Telefone 1 com Prefixo +351 Fixo */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone Principal *</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '12px 14px', backgroundColor: '#1e2235', border: '1px solid #222b45', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#d4af37', fontSize: '15px', fontWeight: 'bold' }}>
                          +351
                        </span>
                        <input 
                          type="text" 
                          required
                          value={agTel1}
                          onChange={(e) => setAgTel1(e.target.value)}
                          placeholder="922 333 444"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '0 8px 8px 0', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Telefone 2 Opcional */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone 2 (Opcional)</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '12px 14px', backgroundColor: '#1e2235', border: '1px solid #222b45', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#94a3b8', fontSize: '15px' }}>
                          +351
                        </span>
                        <input 
                          type="text" 
                          value={agTel2}
                          onChange={(e) => setAgTel2(e.target.value)}
                          placeholder="911 222 333"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '0 8px 8px 0', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Viatura e Matrícula (Opcional) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Viatura</label>
                        <input 
                          type="text" 
                          value={agVeiculo}
                          onChange={(e) => setAgVeiculo(e.target.value)}
                          placeholder="Renault Captur"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Matrícula (Opcional)</label>
                        <input 
                          type="text" 
                          value={agMatricula}
                          onChange={(e) => setAgMatricula(e.target.value)}
                          placeholder="AZ-91-GI"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Data e Hora */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Data *</label>
                        <input 
                          type="date" 
                          required
                          value={agData}
                          onChange={(e) => setAgData(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Hora *</label>
                        <input 
                          type="time" 
                          required
                          value={agHora}
                          onChange={(e) => setAgHora(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Notas da Avaliação */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Notas / Motivo da Avaliação</label>
                      <textarea 
                        rows={3}
                        value={agNotas}
                        onChange={(e) => setAgNotas(e.target.value)}
                        placeholder="Descreva o que será avaliado no veículo..."
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      type="submit"
                      style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px', width: '100%' }}
                    >
                      Confirmar Agendamento de Avaliação
                    </button>

                  </form>
                </div>

                {/* Lista de Avaliações Agendadas */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Avaliações Marcadas</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '550px', overflowY: 'auto' }}>
                    {agendamentos.length === 0 ? (
                      <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0' }}>Nenhuma avaliação agendada de momento.</p>
                    ) : (
                      agendamentos.map(ag => (
                        <div key={ag.id} style={{ backgroundColor: '#090a0f', border: '1px solid #1e2235', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{ag.cliente}</h4>
                              <p style={{ fontSize: '14px', color: '#d4af37', margin: '4px 0 0 0' }}>🚗 {ag.veiculo} {ag.matricula !== 'Não informada' ? `(${ag.matricula})` : ''}</p>
                            </div>
                            <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                              📅 {ag.data} às {ag.hora}
                            </span>
                          </div>

                          <div style={{ fontSize: '14px', color: '#cbd5e1', borderTop: '1px solid #1e2235', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <p style={{ margin: 0 }}>📞 Principal: <b>{ag.telefone1}</b></p>
                            {ag.telefone2 && <p style={{ margin: 0 }}>📞 Tel 2: <b>{ag.telefone2}</b></p>}
                            <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontStyle: 'italic', backgroundColor: '#131722', padding: '8px', borderRadius: '6px' }}>&quot;{ag.notasAvaliacao}&quot;</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ABA 5: CALENDÁRIO & AGENDA */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário & Agenda</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Visualização de agendamentos e compromissos.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      if (mesAtualCal === 0) { setMesAtualCal(11); setAnoAtualCal(anoAtualCal - 1); }
                      else { setMesAtualCal(mesAtualCal - 1); }
                    }}
                    style={{ backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ◀ Mês Anterior
                  </button>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d4af37' }}>
                    {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][mesAtualCal]} {anoAtualCal}
                  </span>
                  <button 
                    onClick={() => {
                      if (mesAtualCal === 11) { setMesAtualCal(0); setAnoAtualCal(anoAtualCal + 1); }
                      else { setMesAtualCal(mesAtualCal + 1); }
                    }}
                    style={{ backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Próximo Mês ▶
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Lista de Agendamentos no Período</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {agendamentos.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>Nenhum agendamento registado.</p>
                  ) : (
                    agendamentos.map(ag => (
                      <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{ag.cliente} - <span style={{ color: '#d4af37' }}>{ag.veiculo} ({ag.matricula})</span></p>
                          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Notas: {ag.notasAvaliacao}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                            {ag.data} às {ag.hora}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ABA 6: LIVRO-CAIXA */}
          {tab === 'financeiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa & Finanças</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Registo de receitas e despesas.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px' }}>
                
                {/* Registar Transação Manual */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Registar Receita / Despesa</h3>
                  
                  <form onSubmit={adicionarTransacaoManual} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Tipo *</label>
                      <select 
                        value={novaTransTipo}
                        onChange={(e) => setNovaTransTipo(e.target.value as 'receita' | 'despesa')}
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                      >
                        <option value="receita">Receita (+)</option>
                        <option value="despesa">Despesa / Custo (-)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Descrição *</label>
                      <input 
                        type="text" 
                        required
                        value={novaTransDesc}
                        onChange={(e) => setNovaTransDesc(e.target.value)}
                        placeholder="Ex: Compra de produtos de lavagem"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Valor (€) *</label>
                        <input 
                          type="text" 
                          required
                          value={novaTransVal}
                          onChange={(e) => setNovaTransVal(e.target.value)}
                          placeholder="50.00"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Matrícula (Opcional)</label>
                        <input 
                          type="text" 
                          value={novaTransMat}
                          onChange={(e) => setNovaTransMat(e.target.value)}
                          placeholder="AZ-91-GI"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Categoria</label>
                        <select 
                          value={novaTransCat}
                          onChange={(e) => setNovaTransCat(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                        >
                          <option value="Serviço">Serviço</option>
                          <option value="Produtos/Peças">Produtos / Peças</option>
                          <option value="Aluguer/Instalações">Aluguer / Instalações</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Data *</label>
                        <input 
                          type="date" 
                          required
                          value={novaTransData}
                          onChange={(e) => setNovaTransData(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px', width: '100%' }}
                    >
                      Adicionar ao Livro-Caixa
                    </button>
                  </form>
                </div>

                {/* Lista de Transações */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Histórico de Transações</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                    {transacoes.length === 0 ? (
                      <p style={{ color: '#94a3b8' }}>Nenhuma transação registada.</p>
                    ) : (
                      transacoes.map(tr => (
                        <div key={tr.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{tr.descricao}</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{tr.categoria} {tr.matricula ? `• Matrícula: ${tr.matricula}` : ''} • {tr.data}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: tr.tipo === 'receita' ? '#34d399' : '#f87171' }}>
                              {tr.tipo === 'receita' ? '+' : '-'}{tr.valor.toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ABA 7: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários & Remunerações</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Adicione colaboradores e configure o modelo de remuneração.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px' }}>
                
                {/* Formulário Novo Funcionário */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Adicionar Novo Funcionário</h3>
                  
                  <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Nome Completo *</label>
                      <input 
                        type="text" 
                        required
                        value={novoFuncNome}
                        onChange={(e) => setNovoFuncNome(e.target.value)}
                        placeholder="Ex: Carlos Mendes"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Cargo / Função *</label>
                      <input 
                        type="text" 
                        required
                        value={novoFuncCargo}
                        onChange={(e) => setNovoFuncCargo(e.target.value)}
                        placeholder="Ex: Detailer"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Tipo Remuneração</label>
                        <select 
                          value={tipoRemuneracao}
                          onChange={(e) => setTipoRemuneracao(e.target.value as any)}
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                        >
                          <option value="comissao">Comissão (%)</option>
                          <option value="fixo">Salário Fixo (€)</option>
                          <option value="diaria">Diária (€)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Valor / Pct</label>
                        <input 
                          type="text" 
                          value={valorRemuneracao}
                          onChange={(e) => setValorRemuneracao(e.target.value)}
                          placeholder="30"
                          style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px', width: '100%' }}
                    >
                      Registar Funcionário
                    </button>
                  </form>
                </div>

                {/* Lista de Funcionários */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Equipa Atual</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                    {funcionarios.map(f => (
                      <div key={f.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{f.nome}</p>
                          <p style={{ margin: 0, fontSize: '14px', color: '#d4af37' }}>{f.cargo} • <span style={{ color: '#cbd5e1' }}>{f.tipoRemuneracao === 'comissao' ? `${f.valorPctOuFixo}% Comissão` : f.tipoRemuneracao === 'fixo' ? `${f.valorPctOuFixo}€ Fixo` : `${f.valorPctOuFixo}€ Diária`}</span></p>
                        </div>
                        <button 
                          onClick={() => removerFuncionario(f.id)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ABA 8: EMPRESA */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Dados da Empresa</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Informações fiscais e bancárias impressas nos documentos.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Nome / Razão Social</label>
                    <input 
                      type="text" 
                      value={dadosEmpresa.nome}
                      onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>NIF</label>
                    <input 
                      type="text" 
                      value={dadosEmpresa.nif}
                      onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Morada</label>
                    <input 
                      type="text" 
                      value={dadosEmpresa.morada}
                      onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>IBAN</label>
                    <input 
                      type="text" 
                      value={dadosEmpresa.iban}
                      onChange={(e) => setDadosEmpresa({...dadosEmpresa, iban: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
                    />
                  </div>
                </div>

                <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #1e2235', marginTop: '10px' }}>
                  <p style={{ margin: 0, color: '#34d399', fontSize: '14px', fontWeight: 'bold' }}>✓ Regime de Isenção de IVA Ativo (Artigo 53.º do CIVA)</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
