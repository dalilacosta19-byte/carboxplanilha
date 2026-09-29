'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('agenda');
  const [pesquisaPatio, setPesquisaPatio] = useState('');
  const [pesquisaHistorico, setPesquisaHistorico] = useState('');
  
  const [user, setUser] = useState('admin');
  const [subAbaOperacional, setSubAbaOperacional] = useState<'agendamento' | 'orcamento' | 'os'>('os');
  
  // Estado do Calendário Principal
  const dataAtualObj = new Date();
  const [mesCalendario, setMesCalendario] = useState(dataAtualObj.getMonth());
  const [anoCalendario, setAnoCalendario] = useState(dataAtualObj.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState<string>(dataAtualObj.toISOString().split('T')[0]);

  // Estado do Relatório Diário no Livro-Caixa
  const [dataRelatorioSel, setDataRelatorioSel] = useState<string>(dataAtualObj.toISOString().split('T')[0]);

  // Modal de Adiantamento para Funcionários
  const [modalAdiantamentoOpen, setModalAdiantamentoOpen] = useState(false);
  const [funcSelecionadoId, setFuncSelecionadoId] = useState<number | null>(null);
  const [valorAdiantamentoInput, setValorAdiantamentoInput] = useState('');

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

  // Stock / Produtos
  const [stock, setStock] = useState([
    { id: 1, nome: 'Película PPF (metros)', qtd: 20, custoUnitario: 35.00 },
    { id: 2, nome: 'Fusion Coating (ml)', qtd: 250, custoUnitario: 45.00 }
  ]);
  const [novoStockNome, setNovoStockNome] = useState('');
  const [novoStockQtd, setNovoStockQtd] = useState('');
  const [novoStockCusto, setNovoStockCusto] = useState('');

  // Despesas Fixas e Variáveis
  const [despesas, setDespesas] = useState<Array<{ id: number; tipo: 'Fixa' | 'Variável'; categoria: string; descricao: string; valor: number; data: string; anexoNome?: string }>>([
    { id: 1, tipo: 'Fixa', categoria: 'Aluguel / Renda', descricao: 'Renda Pavilhão', valor: 1200.00, data: '2026-09-01' },
    { id: 2, tipo: 'Fixa', categoria: 'Contabilidade', descricao: 'Honorários Contabilista', valor: 200.00, data: '2026-09-05' },
    { id: 3, tipo: 'Variável', categoria: 'Produtos & Insumos', descricao: 'Compra de microfibras e champô', valor: 150.00, data: '2026-09-10' }
  ]);

  const [novaDespTipo, setNovaDespTipo] = useState<'Fixa' | 'Variável'>('Fixa');
  const [novaDespCat, setNovaDespCat] = useState('Aluguel / Renda');
  const [novaDespDesc, setNovaDespDesc] = useState('');
  const [novaDespVal, setNovaDespVal] = useState('');
  const [novaDespData, setNovaDespData] = useState(new Date().toISOString().split('T')[0]);
  const [novaDespAnexo, setNovaDespAnexo] = useState<string | null>(null);

  // Funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', tipoRemuneracao: 'comissao', valorPctOuFixo: 30, adiantamento: 150.00 },
    { id: 2, nome: 'Miguel Santos', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000.00, adiantamento: 0.00 },
    { id: 3, nome: 'Ricardo Costa', tipoRemuneracao: 'diaria', valorPctOuFixo: 75.00, adiantamento: 50.00 },
    { id: 4, nome: 'Kevin', tipoRemuneracao: 'comissao', valorPctOuFixo: 30, adiantamento: 0.00 }
  ]);

  // Agendamentos (com suporte a Sinal e Conta/Método)
  const [agendamentos, setAgendamentos] = useState([
    { 
      id: 1, 
      cliente: 'Carla Monteiro', 
      telefone1: '922 333 444', 
      telefone2: '911 222 333', 
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicoAgendado: 'Limpeza Detalhada & Polimento',
      sinal: 50.00,
      contaSinal: 'MBWay / Conta Corrente',
      notas: 'Avaliação inicial do estado da pintura.', 
      data: new Date().toISOString().split('T')[0], 
      hora: '10:00', 
      status: 'Agendado' 
    }
  ]);

  const [agClient, setAgClient] = useState('');
  const [agTel1, setAgTel1] = useState('');
  const [agTel2, setAgTel2] = useState('');
  const [agVeiculo, setAgVeiculo] = useState('');
  const [agMatricula, setAgMatricula] = useState('');
  const [agServico, setAgServico] = useState('');
  const [agSinal, setAgSinal] = useState('0');
  const [agContaSinal, setAgContaSinal] = useState('MBWay');
  const [agData, setAgData] = useState(new Date().toISOString().split('T')[0]);
  const [agHoraSel, setAgHoraSel] = useState('10');
  const [agMinSel, setAgMinSel] = useState('00');
  const [agNotas, setAgNotas] = useState('');

  // OS / Orçamento
  const [osCliente, setOsCliente] = useState('');
  const [osTel1, setOsTel1] = useState('');
  const [osTel2, setOsTel2] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osSinal, setOsSinal] = useState('0');
  const [osFormaPagamentoSinal, setOsFormaPagamentoSinal] = useState('MBWay');
  const [osDescontoPct, setOsDescontoPct] = useState('0');
  const [osDataEntrega, setOsDataEntrega] = useState(new Date().toISOString().split('T')[0]);

  const [osItensServicos, setOsItensServicos] = useState<Array<{ id: number; descricao: string; valorBase: number; valorComIva: number; desconto: number; comIva: boolean }>>([
    { id: 1, descricao: 'Limpeza Detalhada & Polimento', valorBase: 350, valorComIva: 430.50, desconto: 0, comIva: true }
  ]);
  const [novoServDesc, setNovoServDesc] = useState('');
  const [novoServValor, setNovoServValor] = useState('');
  const [novoServDesconto, setNovoServDesconto] = useState('0');
  const [novoServComIva, setNovoServComIva] = useState(true);

  const [osGastos, setOsGastos] = useState<Array<{ id: number; tipo: string; descricao: string; valor: number }>>([]);
  const [novoGastoTipo, setNovoGastoTipo] = useState('Pintor');
  const [novoGastoDesc, setNovoGastoDesc] = useState('');
  const [novoGastoValor, setNovoGastoValor] = useState('');
  const [osProfissionaisSelecionados, setOsProfissionaisSelecionados] = useState<string[]>(['João Silva']);

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '922 333 444',
      contacto2: '911 222 333',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicos: [{ descricao: 'Limpeza Detalhada & Polimento', valor: 430.50, desconto: 0, valorFinal: 430.50 }],
      gastos: [] as Array<{ id: number; tipo: string; descricao: string; valor: number }>,
      profissionais: ['João Silva'],
      valorTotalBruto: 430.50,
      descontoTotal: 0.00,
      valorFinal: 430.50,
      sinalPago: 150.00,
      formaPagamentoSinal: 'MBWay',
      restanteAPagar: 280.50,
      status: 'Em Execução', 
      formaPagamentoFinal: 'MBWay',
      data: new Date().toISOString().split('T')[0] 
    }
  ]);

  const [orcamentos, setOrcamentos] = useState<Array<any>>([
    {
      id: 201,
      cliente: 'António Ferreira',
      contacto: '912 345 678',
      veiculo: 'BMW Série 3',
      matricula: '45-GH-89',
      servicos: [{ descricao: 'Proteção PPF Frontal', valorFinal: 1200.00 }],
      valorFinal: 1200.00,
      data: new Date().toISOString().split('T')[0]
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 150.00, data: new Date().toISOString().split('T')[0] }
  ]);

  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransVal, setNovaTransVal] = useState('');

  // Função para criar Agendamento com Sinal e registar no Caixa
  const criarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agClient || !agTel1 || !agData) return;

    const valSinal = Number(agSinal) || 0;

    const novoAg = {
      id: Date.now(),
      cliente: agClient,
      telefone1: agTel1,
      telefone2: agTel2,
      veiculo: agVeiculo || 'Viatura',
      matricula: agMatricula ? agMatricula.toUpperCase() : 'N/D',
      servicoAgendado: agServico || 'Limpeza Detalhada',
      sinal: valSinal,
      contaSinal: agContaSinal,
      notas: agNotas || 'Agendamento registado.',
      data: agData,
      hora: `${agHoraSel}:${agMinSel}`,
      status: 'Agendado'
    };

    setAgendamentos([novoAg, ...agendamentos]);

    // Se houver sinal, entra automaticamente nas transações do Livro-Caixa
    if (valSinal > 0) {
      setTransacoes([
        {
          id: Date.now() + 1,
          descricao: `Sinal Agendamento - ${agClient} (${agMatricula || 'N/D'}) via ${agContaSinal}`,
          matricula: agMatricula ? agMatricula.toUpperCase() : 'GERAL',
          categoria: 'Sinal / Adiantamento',
          tipo: 'receita',
          valor: valSinal,
          data: agData
        },
        ...transacoes
      ]);
    }

    alert('Agendamento e sinal registados com sucesso!');
    setAgClient(''); setAgTel1(''); setAgTel2(''); setAgVeiculo(''); setAgMatricula(''); setAgServico(''); setAgSinal('0'); setAgNotas('');
  };

  // Conversão Automática de Agendamento para OS
  const converterAgendamentoParaOS = (ag: any) => {
    setOsCliente(ag.cliente);
    setOsTel1(ag.telefone1 || '');
    setOsTel2(ag.telefone2 || '');
    setOsVeiculo(ag.veiculo || '');
    setOsMatricula(ag.matricula || '');
    setOsSinal(String(ag.sinal || 0));
    setOsFormaPagamentoSinal(ag.contaSinal || 'MBWay');
    
    if (ag.servicoAgendado) {
      setOsItensServicos([
        { id: Date.now(), descricao: ag.servicoAgendado, valorBase: 200, valorComIva: 246, desconto: 0, comIva: true }
      ]);
    }

    // Marcar agendamento como Convertido
    setAgendamentos(agendamentos.map(a => a.id === ag.id ? { ...a, status: 'Convertido em OS' } : a));

    // Mudar para a aba operacional na secção de OS
    setSubAbaOperacional('os');
    setTab('operacional');
  };

  // Enviar WhatsApp de Agendamento
  const enviarWhatsAppAgendamento = (ag: any) => {
    const telLimpo = (ag.telefone1 || '').replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá *${ag.cliente}*, confirmamos o seu agendamento na *${dadosEmpresa.nome}* para o dia *${ag.data}* às *${ag.hora}* referente à viatura *${ag.veiculo}* (${ag.matricula}). Serviço: *${ag.servicoAgendado}*. Obrigado!`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  const alterarEstadoOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => os.id === id ? { ...os, status: novoStatus } : os));
  };

  const enviarWhatsApp = (cliente: string, veiculo: string, matricula: string, telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${cliente}, informamos que o seu veículo ${veiculo} (${matricula}) na CARBOX77 Detailing está pronto para levantamento. Obrigado!`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  const adicionarDespesa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDespDesc || !novaDespVal) return;
    setDespesas([{
      id: Date.now(),
      tipo: novaDespTipo,
      categoria: novaDespCat,
      descricao: novaDespDesc,
      valor: Number(novaDespVal) || 0,
      data: novaDespData,
      anexoNome: novaDespAnexo || undefined
    }, ...despesas]);
    setNovaDespDesc(''); setNovaDespVal(''); setNovaDespAnexo(null);
    alert('Despesa registada com sucesso!');
  };

  const menuItems = [
    { id: 'agenda', label: '🗓️ Calendário & Agenda' },
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'historico', label: '📜 Histórico & Dossiê' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'operacional', label: '📋 OS / Orçamento / Agendamento' },
    { id: 'despesas', label: '📉 Despesas & Custos' },
    { id: 'financeiro', label: '💰 Livro-Caixa & Relatório Diário' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
    { id: 'stock', label: '📦 Controlo de Stock' },
    { id: 'config', label: '⚙️ Empresa' },
  ];

  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const primeiroDiaMes = new Date(anoCalendario, mesCalendario, 1).getDay();
  const totalDiasMes = new Date(anoCalendario, mesCalendario + 1, 0).getDate();

  const mudarMes = (direcao: number) => {
    let novoMes = mesCalendario + direcao;
    let novoAno = anoCalendario;
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    else if (novoMes < 0) { novoMes = 11; novoAno--; }
    setMesCalendario(novoMes);
    setAnoCalendario(novoAno);
  };

  return (
    <div style={{ 
      minHeight: '100vh', backgroundColor: '#07080c', 
      backgroundImage: `linear-gradient(rgba(7, 8, 12, 0.93), rgba(7, 8, 12, 0.95)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      color: '#f8fafc', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', fontSize: '16px'
    }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: 'rgba(11, 13, 20, 0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1f293d', padding: '22px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '1px', color: '#d4af37', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              CARBOX<span style={{ color: '#fff' }}>77</span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '3px', fontWeight: 'bold', textTransform: 'uppercase' }}>DETAILING</div>
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
        <nav style={{ width: '300px', backgroundColor: 'rgba(11, 13, 20, 0.88)', backdropFilter: 'blur(8px)', borderRight: '1px solid #1f293d', display: 'flex', flexDirection: 'column', gap: '8px', padding: '28px 18px', boxSizing: 'border-box', flexShrink: 0 }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 'bold', padding: '0 12px', marginBottom: '8px', letterSpacing: '1px' }}>Menu Principal</p>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                textAlign: 'left', padding: '16px 18px', fontSize: '16px', fontWeight: tab === item.id ? 'bold' : '500', cursor: 'pointer', borderRadius: '12px', border: 'none',
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
          
          {/* ABA: AGENDA & CALENDÁRIO (PARTE 2) */}
          {tab === 'agenda' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário & Agenda</h2>
                  <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Gestão de marcações, sinais e lembretes de contas anuais/fixas.</p>
                </div>
                {/* Lembretes Anuais Destacados */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#facc15' }}>
                    ⚠️ <b>Outubro:</b> Fechos / Faturas Anuais
                  </div>
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#f87171' }}>
                    🚨 <b>Maio:</b> Prazo de Impostos / IRC
                  </div>
                </div>
              </div>

              {/* Calendário Visual & Novo Agendamento */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', alignItems: 'start' }}>
                
                {/* Calendário Mensal */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={() => mudarMes(-1)} style={{ backgroundColor: '#07080c', color: '#fff', border: '1px solid #222b45', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>◀</button>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37' }}>{nomesMeses[mesCalendario]} {anoCalendario}</span>
                    <button onClick={() => mudarMes(1)} style={{ backgroundColor: '#07080c', color: '#fff', border: '1px solid #222b45', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>▶</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '10px' }}>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                      <span key={d} style={{ fontSize: '13px', fontWeight: 'bold', color: '#94a3b8' }}>{d}</span>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {Array.from({ length: primeiroDiaMes }).map((_, i) => <div key={` vazio-${i} `} />)}
                    {Array.from({ length: totalDiasMes }).map((_, i) => {
                      const diaNum = i + 1;
                      const diaStr = `${anoCalendario}-${String(mesCalendario + 1).padStart(2, '0')}-${String(diaNum).padStart(2, '0')}`;
                      const temAgendamento = agendamentos.some(a => a.data === diaStr);
                      const isSel = diaSelecionado === diaStr;

                      return (
                        <button
                          key={diaNum}
                          onClick={() => setDiaSelecionado(diaStr)}
                          style={{
                            aspectRatio: '1', borderRadius: '8px', border: isSel ? '2px solid #d4af37' : '1px solid #222b45',
                            backgroundColor: isSel ? 'rgba(212,175,55,0.2)' : temAgendamento ? 'rgba(56,189,248,0.15)' : '#07080c',
                            color: '#fff', fontWeight: temAgendamento ? 'bold' : 'normal', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
                          }}
                        >
                          <span>{diaNum}</span>
                          {temAgendamento && <span style={{ width: '5px', height: '5px', backgroundColor: '#38bdf8', borderRadius: '50%', marginTop: '2px' }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Formulário de Novo Agendamento com Sinal e Conta */}
                <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: 0, marginBottom: '16px' }}>Novo Agendamento</h3>
                  
                  <form onSubmit={criarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input type="text" placeholder="Nome do Cliente" value={agClient} onChange={e => setAgClient(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} required />
                      <input type="text" placeholder="Telemóvel (ex: 922333444)" value={agTel1} onChange={e => setAgTel1(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input type="text" placeholder="Viatura (ex: BMW Série 3)" value={agVeiculo} onChange={e => setAgVeiculo(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} />
                      <input type="text" placeholder="Matrícula (ex: 45-GH-89)" value={agMatricula} onChange={e => setAgMatricula(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} />
                    </div>

                    <input type="text" placeholder="Serviço Agendado (ex: Polimento & PPF)" value={agServico} onChange={e => setAgServico(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '13px', color: '#94a3b8' }}>Valor do Sinal (€)</label>
                        <input type="number" placeholder="0.00" value={agSinal} onChange={e => setAgSinal(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '13px', color: '#94a3b8' }}>Conta / Método do Sinal</label>
                        <select value={agContaSinal} onChange={e => setAgContaSinal(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }}>
                          <option value="MBWay">MBWay</option>
                          <option value="Transferência Bancária">Transferência Bancária</option>
                          <option value="Dinheiro / Caixa">Dinheiro / Caixa</option>
                          <option value="Multibanco / TPA">Multibanco / TPA</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                      <input type="date" value={agData} onChange={e => setAgData(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <select value={agHoraSel} onChange={e => setAgHoraSel(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px', flex: 1 }}>
                         {['08','09','10','11','12','14','15','16','17','18'].map(h => <option key={h} value={h}>{h}h</option>)}
                          
                        </select>
                        <select value={agMinSel} onChange={e => setAgMinSel(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px', flex: 1 }}>
                          <option value="00">00</option><option value="30">30</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                      💾 Registar Agendamento & Sinal
                    </button>
                  </form>
                </div>

              </div>

              {/* Lista de Agendamentos para a Data Selecionada */}
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Marcações para {diaSelecionado}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {agendamentos.filter(a => a.data === diaSelecionado).length === 0 ? (
                    <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#64748b' }}>
                      Sem marcações agendadas para este dia.
                    </div>
                  ) : (
                    agendamentos.filter(a => a.data === diaSelecionado).map(ag => (
                      <div key={ag.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8' }}>⏰ {ag.hora} — {ag.cliente} ({ag.veiculo} / {ag.matricula})</div>
                          <div style={{ fontSize: '14px', color: '#94a3b8' }}><b>Serviço:</b> {ag.servicoAgendado} | <b>Sinal:</b> {ag.sinal > 0 ? `${ag.sinal.toFixed(2)}€ (${ag.contaSinal})` : 'Sem sinal'}</div>
                          <div style={{ fontSize: '13px', color: '#cbd5e1' }}>📞 {ag.telefone1} {ag.telefone2 ? `| 📞 ${ag.telefone2}` : ''}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', backgroundColor: ag.status === 'Convertido em OS' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)', color: ag.status === 'Convertido em OS' ? '#4ade80' : '#facc15' }}>
                            {ag.status}
                          </span>
                          
                          <button onClick={() => enviarWhatsAppAgendamento(ag)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            📲 WhatsApp
                          </button>

                          {ag.status !== 'Convertido em OS' && (
                            <button onClick={() => converterAgendamentoParaOS(ag)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                              🔄 Converter em OS
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ABA: PÁTIO */}
          {tab === 'pateo' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Veículos no Pátio</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Gestão operacional em tempo real das viaturas em oficina:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {ordensServico.map(os => (
                  <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #222b45', paddingBottom: '10px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8' }}>🚗 {os.matricula} — {os.veiculo}</span>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                          value={os.status}
                          onChange={(e) => alterarEstadoOS(os.id, e.target.value)}
                          style={{ padding: '6px 10px', backgroundColor: '#07080c', color: '#fff', border: '1px solid #38bdf8', borderRadius: '6px' }}
                        >
                          <option value="Em Execução">Em Execução</option>
                          <option value="Pronto">Pronto</option>
                          <option value="Pago / Concluído">Pago / Concluído</option>
                        </select>
                        <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                          📲 WhatsApp
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '14px', color: '#94a3b8' }}>
                      <div>👤 <b>Cliente:</b> {os.cliente}</div>
                      <div>📞 <b>Telemóvel:</b> {os.contacto}</div>
                      <div>💰 <b>Total:</b> {os.valorFinal.toFixed(2)}€</div>
                      <div>📉 <b>Restante:</b> {os.restanteAPagar.toFixed(2)}€</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: HISTÓRICO */}
          {tab === 'historico' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Histórico & Dossiê de Matrículas</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 16px 0' }}>Consulte o histórico completo de serviços e valores por matrícula:</p>
              
              <input 
                type="text"
                placeholder="🔍 Digite a matrícula (ex: AZ-91-GI) ou nome do cliente..."
                value={pesquisaHistorico}
                onChange={(e) => setPesquisaHistorico(e.target.value)}
                style={{ width: '100%', maxWidth: '450px', padding: '12px 16px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none', marginBottom: '20px' }}
              />

              {pesquisaHistorico.trim() === '' ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', backgroundColor: '#131722', borderRadius: '12px', border: '1px solid #222b45' }}>
                  Digite uma matrícula na caixa acima para consultar o histórico completo.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {ordensServico.filter(os => os.matricula.toLowerCase().includes(pesquisaHistorico.toLowerCase()) || os.cliente.toLowerCase().includes(pesquisaHistorico.toLowerCase())).map(os => (
                    <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', color: '#fff' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8' }}>🚗 {os.matricula} — {os.veiculo}</span>
                      <p style={{ color: '#94a3b8', margin: '8px 0 0 0' }}>Cliente: {os.cliente} | Valor: {os.valorFinal.toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA: MÉTRICAS */}
          {tab === 'metricas' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Gráficos</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Resumo de desempenho financeiro e operacional.</p>
              <div style={{ backgroundColor: '#131722', padding: '30px', borderRadius: '12px', border: '1px solid #222b45' }}>
                <p style={{ color: '#fff', fontSize: '16px' }}>Total Faturado: <b>{ordensServico.reduce((acc, o) => acc + o.valorFinal, 0).toFixed(2)}€</b></p>
                <p style={{ color: '#fff', fontSize: '16px' }}>Total Despesas: <b>{despesas.reduce((acc, d) => acc + d.valor, 0).toFixed(2)}€</b></p>
              </div>
            </div>
          )}

          {/* ABA: OPERACIONAL */}
          {tab === 'operacional' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão Operacional</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Emissão de Ordens de Serviço e Orçamentos.</p>
              <div style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', color: '#fff' }}>
                <p><b>Cliente Selecionado:</b> {osCliente || 'Nenhum'}</p>
                <p><b>Matrícula:</b> {osMatricula || 'N/A'}</p>
                <p><b>Sinal Abatido:</b> {osSinal}€ ({osFormaPagamentoSinal})</p>
              </div>
            </div>
          )}

          {/* ABA: DESPESAS */}
          {tab === 'despesas' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Despesas & Custos</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Registo de custos operacionais.</p>
              <form onSubmit={adicionarDespesa} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Descrição da Despesa" value={novaDespDesc} onChange={e => setNovaDespDesc(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} required />
                <input type="number" placeholder="Valor (€)" value={novaDespVal} onChange={e => setNovaDespVal(e.target.value)} style={{ padding: '10px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px' }} required />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Registar Despesa</button>
              </form>
            </div>
          )}

          {/* ABA: FINANCEIRO */}
          {tab === 'financeiro' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa & Relatório Diário</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Fluxo de caixa e entradas de sinais.</p>
              <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #222b45' }}>
                {transacoes.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222b45', color: '#fff' }}>
                    <span>{t.descricao}</span>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>+ {t.valor.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Funcionários & Salários</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Gestão de equipa e adiantamentos.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: '#131722', padding: '16px', borderRadius: '10px', border: '1px solid #222b45', display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span><b>{f.nome}</b></span>
                    <span>Adiantamentos: {f.adiantamento.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: STOCK */}
          {tab === 'stock' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Controlo de Stock</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Produtos e películas em armazém.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stock.map(s => (
                  <div key={s.id} style={{ backgroundColor: '#131722', padding: '16px', borderRadius: '10px', border: '1px solid #222b45', display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span><b>{s.nome}</b></span>
                    <span>Qtd: {s.qtd}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: CONFIGURAÇÕES */}
          {tab === 'config' && (
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Configurações da Empresa</h2>
              <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 20px 0' }}>Dados fiscais e legais.</p>
              <div style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', color: '#fff' }}>
                <p><b>Empresa:</b> {dadosEmpresa.nome}</p>
                <p><b>NIF:</b> {dadosEmpresa.nif}</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
