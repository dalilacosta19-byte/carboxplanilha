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
      data: '2026-09-30', 
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
  const [agHoraSel, setAgHoraSel] = useState('09');
  const [agMinSel, setAgMinSel] = useState('00');
  const [agNotas, setAgNotas] = useState('');

  // Navegação do Calendário
  const [anoAtualCal, setAnoAtualCal] = useState(2026);
  const [mesAtualCal, setMesAtualCal] = useState(8); // Setembro

  // Formulário OS / Orçamento
  const [tipoDocumentoGerar, setTipoDocumentoGerar] = useState<'ORÇAMENTO' | 'ORDEM DE SERVIÇO'>('ORÇAMENTO');
  const [osCliente, setOsCliente] = useState('Carla Monteiro');
  const [osContacto, setOsContacto] = useState('+351 922 333 444');
  const [osVeiculo, setOsVeiculo] = useState('Renault Captur');
  const [osMatricula, setOsMatricula] = useState('AZ-91-GI');
  const [osObs, setOsObs] = useState('Renault Captur matrícula AZ-91-GI. Regime de isenção.');

  const [listaItensServico, setListaItensServico] = useState([
    { id: 1, descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: '120.00', desconto: '120.00' },
    { id: 2, descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: '400.00', desconto: '0.00' },
    { id: 3, descricao: '111 - FUSION COATING', funcionario: 'Ricardo Costa', valor: '900.00', desconto: '0.00' }
  ]);

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

  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransMat, setNovaTransMat] = useState('');
  const [novaTransCat, setNovaTransCat] = useState('Serviço');
  const [novaTransTipo, setNovaTransTipo] = useState<'receita' | 'despesa'>('receita');
  const [novaTransVal, setNovaTransVal] = useState('');
  const [novaTransData, setNovaTransData] = useState(new Date().toISOString().split('T')[0]);

  // Funções de Apoio
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
    alert('Registo criado com sucesso!');
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
    if (!agClient || !agTel1 || !agData) {
      alert('Por favor, preencha o Nome do Cliente, o Telefone Principal e a Data.');
      return;
    }

    const horaFormatada = `${agHoraSel}:${agMinSel}`;

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
      hora: horaFormatada,
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
    alert('Agendamento de Avaliação registado com sucesso!');
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
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
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>{dadosEmpresa.nome}</h1>
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
        
        {/* MENU LATERAL COMPLETO */}
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
                          <p style={{ margin: '0 0 4px 0', color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>Serviços:</p>
                          {os.servicosDetalhes ? (
                            os.servicosDetalhes.map((s: any, idx: number) => (
                              <p key={idx} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: '14px' }}>• {s.descricao} - <b>{(s.valor - (s.desconto || 0)).toFixed(2)}€</b></p>
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
                );
              })()}
            </div>
          )}

          {/* ABA 3: OS / ORÇAMENTO */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Emissão de Orçamento / OS</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Regime de isenção de IVA (Art. 53º do CIVA).</p>
              </div>

              <form onSubmit={criarOSOuOrcamento} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Dados do Cliente e Viatura</h3>
                  
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

                <button 
                  type="submit"
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', width: '100%' }}
                >
                  Registar Orçamento / OS
                </button>
              </form>
            </div>
          )}

          {/* ABA 4: AGENDAMENTO (AVALIAÇÃO) - HORA COM SELETORES SEPARADOS */}
          {tab === 'agendamento' && (
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
                    
                    {/* Nome do Cliente */}
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

                    {/* Telefone Principal: Apenas +351 fixo (sem PT) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone Principal *</label>
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

                    {/* Telefone 2: Apenas espaço livre (sem país) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Contacto / Telefone 2 (Opcional)</label>
                      <input 
                        type="text" 
                        value={agTel2}
                        onChange={(e) => setAgTel2(e.target.value)}
                        placeholder="Número alternativo"
                        style={{ width: '100%', padding: '12px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                      />
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

                    {/* Data (Calendário) & Hora (Setas separadas para Hora e Minutos) */}
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
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          <select
                            value={agHoraSel}
                            onChange={(e) => setAgHoraSel(e.target.value)}
                            style={{ padding: '12px 8px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}
                          >
                            {['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].map(h => (
                              <option key={h} value={h}>{h}h</option>
                            ))}
                          </select>
                          <select
                            value={agMinSel}
                            onChange={(e) => setAgMinSel(e.target.value)}
                            style={{ padding: '12px 8px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}
                          >
                            {['00', '15', '30', '45'].map(m => (
                              <option key={m} value={m}>{m}m</option>
                            ))}
                          </select>
                        </div>
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
            <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Calendário & Agenda</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>Visualização de compromissos e avaliações agendadas.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {agendamentos.map(ag => (
                  <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '15px' }}><b>{ag.cliente}</b> - {ag.veiculo} ({ag.matricula})</span>
                    <span style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>{ag.data} às {ag.hora}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 6: LIVRO-CAIXA */}
          {tab === 'financeiro' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Livro-Caixa & Finanças</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>Registo de receitas, despesas e saldo geral.</p>
              
              <form onSubmit={adicionarTransacaoManual} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Descrição da transação" 
                  value={novaTransDesc}
                  onChange={(e) => setNovaTransDesc(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }}
                />
                <input 
                  type="text" 
                  placeholder="Valor (€)" 
                  value={novaTransVal}
                  onChange={(e) => setNovaTransVal(e.target.value)}
                  style={{ width: '100px', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                {transacoes.map(tr => (
                  <div key={tr.id} style={{ backgroundColor: '#090a0f', padding: '12px', borderRadius: '8px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px' }}>{tr.descricao} ({tr.data})</span>
                    <span style={{ color: tr.tipo === 'receita' ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                      {tr.tipo === 'receita' ? '+' : '-'}{tr.valor.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 7: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Gestão de Funcionários</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>Colaboradores e modelos de remuneração.</p>
              
              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Nome do funcionário" 
                  value={novoFuncNome}
                  onChange={(e) => setNovoFuncNome(e.target.value)}
                  style={{ flex: 1, minWidth: '180px', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }}
                />
                <input 
                  type="text" 
                  placeholder="Cargo (ex: Detailer)" 
                  value={novoFuncCargo}
                  onChange={(e) => setNovoFuncCargo(e.target.value)}
                  style={{ flex: 1, minWidth: '150px', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: '#090a0f', padding: '12px', borderRadius: '8px', border: '1px solid #1e2235', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px' }}><b>{f.nome}</b> - {f.cargo}</span>
                    <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>Remover</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 8: EMPRESA */}
          {tab === 'config' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Dados da Empresa</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>Informações fiscais e de faturação.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '6px' }}>Nome</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '6px' }}>NIF</label>
                  <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
