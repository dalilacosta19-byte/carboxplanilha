'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');
  const [subAbaOperacional, setSubAbaOperacional] = useState<'agendamento' | 'orcamento' | 'os'>('os');

  // Estado do Calendário
  const dataAtualObj = new Date();
  const [mesCalendario, setMesCalendario] = useState(dataAtualObj.getMonth());
  const [anoCalendario, setAnoCalendario] = useState(dataAtualObj.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState<string>(dataAtualObj.toISOString().split('T')[0]);

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

  // Agendamentos
  const [agendamentos, setAgendamentos] = useState([
    { 
      id: 1, 
      tipo: 'Avaliação', 
      cliente: 'Carla Monteiro', 
      telefone1: '922 333 444', 
      telefone2: '911 222 333', 
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicoAgendado: '13 - Limpeza Detalhada',
      notasAvaliacao: 'Avaliação inicial do estado da pintura e proteções.', 
      data: new Date().toISOString().split('T')[0], 
      hora: '14:00', 
      status: 'Agendado' 
    }
  ]);

  const [agClient, setAgClient] = useState('');
  const [agTel1, setAgTel1] = useState('');
  const [agTel2, setAgTel2] = useState('');
  const [agVeiculo, setAgVeiculo] = useState('');
  const [agMatricula, setAgMatricula] = useState('');
  const [agServico, setAgServico] = useState('');
  const [agData, setAgData] = useState(new Date().toISOString().split('T')[0]);
  const [agHoraSel, setAgHoraSel] = useState('10');
  const [agMinSel, setAgMinSel] = useState('00');
  const [agNotas, setAgNotas] = useState('');

  // OS / Orçamento com múltiplos serviços, gastos e múltiplos profissionais
  const [osCliente, setOsCliente] = useState('');
  const [osTel1, setOsTel1] = useState('');
  const [osTel2, setOsTel2] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osSinal, setOsSinal] = useState('0');

  // Lista dinâmica de Serviços da OS
  const [osItensServicos, setOsItensServicos] = useState<Array<{ id: number; descricao: string; valor: number; desconto: number; comIva: boolean }>>([
    { id: 1, descricao: 'Limpeza Detalhada & Polimento', valor: 350, desconto: 0, comIva: true }
  ]);
  const [novoServDesc, setNovoServDesc] = useState('');
  const [novoServValor, setNovoServValor] = useState('');
  const [novoServDesconto, setNovoServDesconto] = useState('0');
  const [novoServComIva, setNovoServComIva] = useState(true);

  // Lista dinâmica de Gastos (Pintor, Peças, PPF, etc.)
  const [osGastos, setOsGastos] = useState<Array<{ id: number; tipo: string; descricao: string; valor: number }>>([]);
  const [novoGastoTipo, setNovoGastoTipo] = useState('Pintor');
  const [novoGastoDesc, setNovoGastoDesc] = useState('');
  const [novoGastoValor, setNovoGastoValor] = useState('');

  // Múltiplos Profissionais Selecionados
  const [osProfissionaisSelecionados, setOsProfissionaisSelecionados] = useState<string[]>(['João Silva']);

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '922 333 444',
      contacto2: '911 222 333',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicos: [{ descricao: '13 - Limpeza Detalhada', valor: 400, desconto: 50, valorFinal: 350 }],
      gastos: [] as Array<{ id: number; tipo: string; descricao: string; valor: number }>,
      profissionais: ['João Silva'],
      valorTotalBruto: 400.00,
      descontoTotal: 50.00,
      valorFinal: 350.00,
      sinalPago: 150.00,
      restanteAPagar: 200.00,
      status: 'Em Execução', 
      data: new Date().toISOString().split('T')[0] 
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 150.00, data: new Date().toISOString().split('T')[0] }
  ]);

  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransVal, setNovaTransVal] = useState('');

  // Feriados Nacionais de Portugal
  const isFeriadoPortugal = (ano: number, mes: number, dia: number) => {
    const m = mes + 1;
    const fixos = [
      { m: 1, d: 1 }, { m: 4, d: 25 }, { m: 5, d: 1 }, { m: 6, d: 10 },
      { m: 8, d: 15 }, { m: 10, d: 5 }, { m: 11, d: 1 }, { m: 12, d: 1 },
      { m: 12, d: 8 }, { m: 12, d: 25 }
    ];
    if (fixos.some(f => f.m === m && f.d === dia)) return true;
    if (ano === 2026) {
      if (m === 4 && dia === 3) return true;
      if (m === 6 && dia === 4) return true;
    }
    return false;
  };

  const selecionarClienteInteligente = (nome: string, tipo: 'ag' | 'os') => {
    if (tipo === 'ag') setAgClient(nome);
    if (tipo === 'os') setOsCliente(nome);

    const encontrado: any = ordensServico.find(o => o.cliente.toLowerCase() === nome.toLowerCase()) ||
                            agendamentos.find(a => a.cliente.toLowerCase() === nome.toLowerCase());
    
    if (encontrado) {
      if (tipo === 'ag') {
        setAgTel1(encontrado.contacto || encontrado.telefone1 || '');
        setAgTel2(encontrado.contacto2 || encontrado.telefone2 || '');
        setAgVeiculo(encontrado.veiculo || '');
        setAgMatricula(encontrado.matricula || '');
      } else {
        setOsTel1(encontrado.contacto || encontrado.telefone1 || '');
        setOsTel2(encontrado.contacto2 || encontrado.telefone2 || '');
        setOsVeiculo(encontrado.veiculo || '');
        setOsMatricula(encontrado.matricula || '');
      }
    }
  };

  const listaClientesUnicos = Array.from(new Set([
    ...ordensServico.map(o => o.cliente),
    ...agendamentos.map(a => a.cliente)
  ]));

  const enviarWhatsApp = (cliente: string, veiculo: string, matricula: string, telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${cliente}, informamos que o seu veículo ${veiculo} (${matricula}) na CARBOX77 Detailing está pronto para levantamento. Obrigado!`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  // Adicionar Serviço à OS atual
  const adicionarServicoOS = () => {
    if (!novoServDesc || !novoServValor) return;
    const val = Number(novoServValor) || 0;
    const desc = Number(novoServDesconto) || 0;
    const valorComIva = novoServComIva ? val * 1.23 : val;

    setOsItensServicos([
      ...osItensServicos,
      { id: Date.now(), descricao: novoServDesc, valor: valorComIva, desconto: desc, comIva: novoServComIva }
    ]);
    setNovoServDesc('');
    setNovoServValor('');
    setNovoServDesconto('0');
  };

  const removerServicoOS = (id: number) => {
    setOsItensServicos(osItensServicos.filter(i => i.id !== id));
  };

  // Adicionar Gasto à OS (Pintor, Peças, PPF)
  const adicionarGastoOS = () => {
    if (!novoGastoDesc || !novoGastoValor) return;
    setOsGastos([
      ...osGastos,
      { id: Date.now(), tipo: novoGastoTipo, descricao: novoGastoDesc, valor: Number(novoGastoValor) || 0 }
    ]);
    setNovoGastoDesc('');
    setNovoGastoValor('');
  };

  const removerGastoOS = (id: number) => {
    setOsGastos(osGastos.filter(g => g.id !== id));
  };

  const toggleProfissionalOS = (nomeFunc: string) => {
    if (osProfissionaisSelecionados.includes(nomeFunc)) {
      setOsProfissionaisSelecionados(osProfissionaisSelecionados.filter(n => n !== nomeFunc));
    } else {
      setOsProfissionaisSelecionados([...osProfissionaisSelecionados, nomeFunc]);
    }
  };

  const criarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agClient || !agTel1 || !agData) return;

    const novo = {
      id: Date.now(),
      tipo: 'Avaliação',
      cliente: agClient,
      telefone1: agTel1,
      telefone2: agTel2,
      veiculo: agVeiculo || 'Viatura',
      matricula: agMatricula ? agMatricula.toUpperCase() : 'N/D',
      servicoAgendado: agServico || 'Avaliação técnica',
      notasAvaliacao: agNotas || 'Agendado.',
      data: agData,
      hora: `${agHoraSel}:${agMinSel}`,
      status: 'Agendado'
    };

    setAgendamentos([novo, ...agendamentos]);
    alert('Agendamento criado com sucesso!');
    setAgClient(''); setAgTel1(''); setAgTel2(''); setAgVeiculo(''); setAgMatricula(''); setAgServico(''); setAgNotas('');
  };

  const criarOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente || !osMatricula || osItensServicos.length === 0) {
      alert('Preencha o cliente, matrícula e adicione pelo menos um serviço.');
      return;
    }

    const valorTotalBruto = osItensServicos.reduce((acc, item) => acc + item.valor, 0);
    const descontoTotal = osItensServicos.reduce((acc, item) => acc + item.desconto, 0);
    const valorFinal = Math.max(0, valorTotalBruto - descontoTotal);
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);

    // Mapeamento correto para corresponder à estrutura exigida com valorFinal
    const servicosMapeados = osItensServicos.map(item => ({
      descricao: item.descricao,
      valor: item.valor,
      desconto: item.desconto,
      valorFinal: Math.max(0, item.valor - item.desconto)
    }));

    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      contacto: osTel1,
      contacto2: osTel2,
      veiculo: osVeiculo || 'Viatura',
      matricula: osMatricula.toUpperCase(),
      servicos: servicosMapeados,
      gastos: osGastos,
      profissionais: osProfissionaisSelecionados,
      valorTotalBruto,
      descontoTotal,
      valorFinal,
      sinalPago: sinal,
      restanteAPagar: restante,
      status: 'Em Execução',
      data: new Date().toISOString().split('T')[0]
    };

    setOrdensServico([novaOS, ...ordensServico]);
    if (sinal > 0) {
      setTransacoes([{ id: Date.now(), descricao: `Sinal OS #${novaOS.id} (${novaOS.matricula})`, matricula: novaOS.matricula, categoria: 'Serviço', tipo: 'receita', valor: sinal, data: novaOS.data }, ...transacoes]);
    }

    alert('Ordem de Serviço emitida com sucesso!');
    setOsCliente(''); setOsTel1(''); setOsTel2(''); setOsVeiculo(''); setOsMatricula(''); setOsSinal('0');
    setOsItensServicos([{ id: Date.now(), descricao: 'Limpeza Detalhada', valor: 250, desconto: 0, comIva: true }]);
    setOsGastos([]);
  };

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
    setNovoFuncNome(''); setNovoFuncCargo(''); setValorRemuneracao('30'); setNovoFuncAdiantamento('0');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const confirmarAdiantamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (funcSelecionadoId === null || !valorAdiantamentoInput) return;
    const valorAd = Number(valorAdiantamentoInput) || 0;

    setFuncionarios(funcionarios.map(f => {
      if (f.id === funcSelecionadoId) {
        return { ...f, adiantamento: (f.adiantamento || 0) + valorAd };
      }
      return f;
    }));

    alert(`Adiantamento de ${valorAd.toFixed(2)}€ registado com sucesso!`);
    setModalAdiantamentoOpen(false);
    setFuncSelecionadoId(null);
    setValorAdiantamentoInput('');
  };

  const adicionarStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoStockNome || !novoStockQtd || !novoStockCusto) return;
    setStock([...stock, { id: Date.now(), nome: novoStockNome, qtd: Number(novoStockQtd) || 0, custoUnitario: Number(novoStockCusto) || 0 }]);
    setNovoStockNome(''); setNovoStockQtd(''); setNovoStockCusto('');
  };

  const adicionarTransacaoManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTransDesc || !novaTransVal) return;
    setTransacoes([{ id: Date.now(), descricao: novaTransDesc, matricula: 'GERAL', categoria: 'Serviço', tipo: 'receita', valor: Number(novaTransVal) || 0, data: new Date().toISOString().split('T')[0] }, ...transacoes]);
    setNovaTransDesc(''); setNovaTransVal('');
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'operacional', label: '📋 OS / Orçamento / Agendamento' },
    { id: 'agenda', label: '🗓️ Calendário & Agenda' },
    { id: 'financeiro', label: '💰 Livro-Caixa' },
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
      minHeight: '100vh', 
      backgroundColor: '#07080c', 
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
          
          {/* ABA 1: VEÍCULOS NO PÁTIO */}
          {tab === 'pateo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Veículos no Pátio</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Acompanhe o status e envie avisos por WhatsApp.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
                {ordensServico.map(os => (
                  <div key={os.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{os.veiculo} ({os.matricula})</h3>
                    <p style={{ margin: 0, color: '#cbd5e1' }}><b>Cliente:</b> {os.cliente} (+351 {os.contacto}) {os.contacto2 ? `| 2º: ${os.contacto2}` : ''}</p>
                    <p style={{ margin: 0, color: '#d4af37' }}><b>Técnicos:</b> {os.profissionais ? os.profissionais.join(', ') : 'N/D'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1f293d', paddingTop: '10px', alignItems: 'center' }}>
                      <span>Total: <b>{os.valorFinal.toFixed(2)}€</b></span>
                      <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>💬 WhatsApp</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 2: MÉTRICAS */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Gráficos</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Balanço financeiro global.</p>
              </div>

              {(() => {
                const rec = transacoes.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0' }}>LÍQUIDO</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0' }}>RECEITAS</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: OPERACIONAL (COM MÚLTIPLOS SERVIÇOS, IVA, GASTOS E PROFISSIONAIS) */}
          {tab === 'operacional' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Central de Operações</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Emita OS, Orçamentos ou Agendamentos com total flexibilidade:</p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSubAbaOperacional('os')} style={{ backgroundColor: subAbaOperacional === 'os' ? '#d4af37' : '#131722', color: subAbaOperacional === 'os' ? '#090a0f' : '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>📋 Ordem de Serviço (OS)</button>
                <button onClick={() => setSubAbaOperacional('orcamento')} style={{ backgroundColor: subAbaOperacional === 'orcamento' ? '#d4af37' : '#131722', color: subAbaOperacional === 'orcamento' ? '#090a0f' : '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>📑 Orçamento</button>
                <button onClick={() => setSubAbaOperacional('agendamento')} style={{ backgroundColor: subAbaOperacional === 'agendamento' ? '#2563eb' : '#131722', color: '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>📅 Agendamento</button>
              </div>

              <datalist id="lista-clientes-geral">
                {listaClientesUnicos.map((nome, idx) => <option key={idx} value={nome} />)}
              </datalist>

              {subAbaOperacional === 'agendamento' && (
                <form onSubmit={criarAgendamento} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>📅 Novo Agendamento de Avaliação</h3>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Cliente *</label>
                    <input type="text" required list="lista-clientes-geral" value={agClient} onChange={(e) => selecionarClienteInteligente(e.target.value, 'ag')} placeholder="Ex: Carla Monteiro" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telemóvel Principal (+351) *</label>
                      <input type="text" required value={agTel1} onChange={(e) => setAgTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                      <input type="text" value={agVeiculo} onChange={(e) => setAgVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Data *</label>
                      <input type="date" required value={agData} onChange={(e) => setAgData(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Hora *</label>
                      <input type="text" value={`${agHoraSel}:${agMinSel}`} onChange={(e) => setAgHoraSel(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer' }}>Guardar Agendamento</button>
                </form>
              )}

              {(subAbaOperacional === 'os' || subAbaOperacional === 'orcamento') && (
                <form onSubmit={criarOS} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>
                    {subAbaOperacional === 'os' ? '📋 Emitir Ordem de Serviço (OS)' : '📑 Emitir Orçamento'}
                  </h3>

                  {/* Dados do Cliente e Veículo */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Cliente *</label>
                      <input type="text" required list="lista-clientes-geral" value={osCliente} onChange={(e) => selecionarClienteInteligente(e.target.value, 'os')} placeholder="Ex: Carla Monteiro" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Matrícula *</label>
                      <input type="text" required value={osMatricula} onChange={(e) => setOsMatricula(e.target.value)} placeholder="AZ-91-GI" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telemóvel 1 (PT)</label>
                      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', padding: '0 10px' }}>
                        <span style={{ color: '#d4af37', fontWeight: 'bold', marginRight: '8px' }}>+351</span>
                        <input type="text" value={osTel1} onChange={(e) => setOsTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '14px 0', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '16px', outline: 'none' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telemóvel 2 (Opcional)</label>
                      <input type="text" value={osTel2} onChange={(e) => setOsTel2(e.target.value)} placeholder="911 222 333" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                      <input type="text" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  {/* SEÇÃO DE MÚLTIPLOS SERVIÇOS */}
                  <div style={{ backgroundColor: '#131722', padding: '18px', borderRadius: '14px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h4 style={{ fontSize: '17px', color: '#d4af37', margin: 0 }}>🛠️ Serviços Incluídos</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {osItensServicos.map((item, idx) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1f293d' }}>
                          <span style={{ color: '#fff' }}><b>{idx + 1}.</b> {item.descricao} — <b>{item.valor.toFixed(2)}€</b> {item.comIva ? '(c/ IVA 23%)' : ''} {item.desconto > 0 ? `| Desc: -${item.desconto}€` : ''}</span>
                          <button type="button" onClick={() => removerServicoOS(item.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Remover</button>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                      <input type="text" placeholder="Nome do Serviço (ex: Polimento Comercial)" value={novoServDesc} onChange={(e) => setNovoServDesc(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                      <input type="text" placeholder="Valor (€)" value={novoServValor} onChange={(e) => setNovoServValor(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                      <input type="text" placeholder="Desconto (€)" value={novoServDesconto} onChange={(e) => setNovoServDesconto(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                      <button type="button" onClick={adicionarServicoOS} style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Adicionar</button>
                    </div>
                  </div>

                  {/* SEÇÃO DE GASTOS (Pintor, Peças, PPF) */}
                  <div style={{ backgroundColor: '#131722', padding: '18px', borderRadius: '14px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h4 style={{ fontSize: '17px', color: '#f87171', margin: 0 }}>💸 Gastos / Custos Associados (Pintor, Peças, PPF)</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {osGastos.map((gasto) => (
                        <div key={gasto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1f293d' }}>
                          <span style={{ color: '#fff' }}>[{gasto.tipo}] {gasto.descricao} — <b style={{ color: '#f87171' }}>-{gasto.valor.toFixed(2)}€</b></span>
                          <button type="button" onClick={() => removerGastoOS(gasto.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Remover</button>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr auto', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                      <select value={novoGastoTipo} onChange={(e) => setNovoGastoTipo(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }}>
                        <option value="Pintor">Pintor</option>
                        <option value="PPF">Material PPF</option>
                        <option value="Peças">Peças</option>
                        <option value="Outro">Outro Gasto</option>
                      </select>
                      <input type="text" placeholder="Descrição (ex: Pintura guarda-lamas)" value={novoGastoDesc} onChange={(e) => setNovoGastoDesc(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                      <input type="text" placeholder="Valor (€)" value={novoGastoValor} onChange={(e) => setNovoGastoValor(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                      <button type="button" onClick={adicionarGastoOS} style={{ backgroundColor: '#f87171', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Gasto</button>
                    </div>
                  </div>

                  {/* SEÇÃO DE MÚLTIPLOS PROFISSIONAIS */}
                  <div style={{ backgroundColor: '#131722', padding: '18px', borderRadius: '14px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ fontSize: '17px', color: '#38bdf8', margin: 0 }}>👥 Profissionais Responsáveis (Múltiplos)</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {funcionarios.map(f => {
                        const selecionado = osProfissionaisSelecionados.includes(f.nome);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => toggleProfissionalOS(f.nome)}
                            style={{
                              padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
                              backgroundColor: selecionado ? '#38bdf8' : '#090a0f',
                              color: selecionado ? '#090a0f' : '#cbd5e1',
                              border: selecionado ? '1px solid #38bdf8' : '1px solid #222b45'
                            }}
                          >
                            {selecionado ? '✓ ' : '+ '} {f.nome} ({f.cargo})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Sinal Pago (€)</label>
                      <input type="text" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '10px' }}>
                    Emitir Ordem de Serviço Completa
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ABA 4: CALENDÁRIO */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário & Agenda</h2>
                  <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Consulte agendamentos e feriados nacionais de Portugal.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '12px 20px', borderRadius: '12px', border: '1px solid #1f293d', fontSize: '14px' }}>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>● Avaliações</span>
                  <span style={{ color: '#d4af37', fontWeight: 'bold' }}>● Serviços / OS</span>
                  <span style={{ color: '#f87171', fontWeight: 'bold' }}>● Feriados PT</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: '28px', alignItems: 'start' }}>
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1f293d', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{nomesMeses[mesCalendario]} de {anoCalendario}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => mudarMes(-1)} style={{ backgroundColor: '#090a0f', color: '#d4af37', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}>◀</button>
                      <button onClick={() => mudarMes(1)} style={{ backgroundColor: '#090a0f', color: '#d4af37', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}>▶</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', color: '#94a3b8', fontSize: '14px', paddingBottom: '8px', borderBottom: '1px solid #1f293d' }}>
                    <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {Array.from({ length: primeiroDiaMes }).map((_, idx) => <div key={`empty-${idx}`} style={{ padding: '12px', height: '65px' }}></div>)}

                    {Array.from({ length: totalDiasMes }).map((_, idx) => {
                      const diaNum = idx + 1;
                      const mesStr = String(mesCalendario + 1).padStart(2, '0');
                      const diaStr = String(diaNum).padStart(2, '0');
                      const dataFormatada = `${anoCalendario}-${mesStr}-${diaStr}`;
                      const isFeriado = isFeriadoPortugal(anoCalendario, mesCalendario, diaNum);
                      const isSelecionado = diaSelecionado === dataFormatada;

                      const agsDoDia = agendamentos.filter(a => a.data === dataFormatada);
                      const ossDoDia = ordensServico.filter(o => o.data === dataFormatada);

                      return (
                        <div key={dataFormatada} onClick={() => setDiaSelecionado(dataFormatada)} style={{ backgroundColor: isSelecionado ? 'rgba(212, 175, 55, 0.3)' : isFeriado ? 'rgba(239, 68, 68, 0.15)' : '#090a0f', border: isSelecionado ? '2px solid #d4af37' : isFeriado ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid #1f293d', borderRadius: '10px', padding: '10px', minHeight: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', color: isFeriado ? '#f87171' : '#fff' }}>{diaNum}</span>
                            {isFeriado && <span style={{ fontSize: '9px', backgroundColor: '#f87171', color: '#090a0f', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold' }}>Feriado</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                            {agsDoDia.map((_, i) => <div key={`ag-${i}`} style={{ width: '9px', height: '9px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>)}
                            {ossDoDia.map((_, i) => <div key={`os-${i}`} style={{ width: '9px', height: '9px', backgroundColor: '#d4af37', borderRadius: '50%' }}></div>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PAINEL LATERAL */}
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.95)', border: '1px solid #222b45', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#d4af37', margin: 0, borderBottom: '1px solid #1f293d', paddingBottom: '12px' }}>
                    📅 Agenda de {diaSelecionado}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '600px', overflowY: 'auto' }}>
                    {agendamentos.filter(a => a.data === diaSelecionado).map(ag => (
                      <div key={ag.id} style={{ backgroundColor: 'rgba(11, 15, 25, 0.95)', borderLeft: '6px solid #3b82f6', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', backgroundColor: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa', padding: '3px 10px', borderRadius: '6px', fontWeight: 'bold' }}>AVALIAÇÃO</span>
                          <span style={{ fontSize: '15px', color: '#60a5fa', fontWeight: 'bold' }}>{ag.hora}</span>
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{ag.cliente}</h4>
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '15px' }}>🚗 {ag.veiculo} ({ag.matricula})</p>
                        <button onClick={() => enviarWhatsApp(ag.cliente, ag.veiculo, ag.matricula, ag.telefone1)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>💬 WhatsApp</button>
                      </div>
                    ))}

                    {ordensServico.filter(o => o.data === diaSelecionado).map(os => (
                      <div key={os.id} style={{ backgroundColor: 'rgba(11, 15, 25, 0.95)', borderLeft: '6px solid #d4af37', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', backgroundColor: 'rgba(212, 175, 55, 0.25)', color: '#fde047', padding: '3px 10px', borderRadius: '6px', fontWeight: 'bold' }}>ORDEM DE SERVIÇO</span>
                          <span style={{ fontSize: '16px', color: '#34d399', fontWeight: 'bold' }}>{os.valorFinal.toFixed(2)} €</span>
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{os.cliente}</h4>
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '15px' }}>🚗 {os.veiculo} ({os.matricula})</p>
                        <p style={{ margin: 0, color: '#38bdf8', fontSize: '14px' }}>👥 Técnicos: {os.profissionais ? os.profissionais.join(', ') : 'N/D'}</p>
                        <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>💬 WhatsApp</button>
                      </div>
                    ))}

                    {agendamentos.filter(a => a.data === diaSelecionado).length === 0 && ordensServico.filter(o => o.data === diaSelecionado).length === 0 && (
                      <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>Nenhum evento neste dia.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: LIVRO-CAIXA */}
          {tab === 'financeiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa & Finanças</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Registo de entradas e saídas.</p>
              </div>

              <form onSubmit={adicionarTransacaoManual} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', maxWidth: '800px' }}>
                <input type="text" placeholder="Descrição" value={novaTransDesc} onChange={(e) => setNovaTransDesc(e.target.value)} style={{ flex: 1, minWidth: '240px', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <input type="text" placeholder="Valor (€)" value={novaTransVal} onChange={(e) => setNovaTransVal(e.target.value)} style={{ width: '130px', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px' }}>
                {transacoes.map(tr => (
                  <div key={tr.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff' }}>{tr.descricao} ({tr.data})</span>
                    <span style={{ color: tr.tipo === 'receita' ? '#34d399' : '#f87171', fontWeight: 'bold' }}>+{tr.valor.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 6: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários & Salários</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Configure comissões, salários fixos e registe adiantamentos.</p>
              </div>

              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '24px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                <input type="text" placeholder="Nome" required value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ flex: 1, minWidth: '180px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <input type="text" placeholder="Cargo" required value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <select value={tipoRemuneracao} onChange={(e) => setTipoRemuneracao(e.target.value as any)} style={{ padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', cursor: 'pointer' }}>
                  <option value="comissao">Porcentagem (%)</option>
                  <option value="fixo">Salário Fixo (€)</option>
                  <option value="diaria">Diária (€)</option>
                </select>
                <input type="text" placeholder="Valor/Taxa" value={valorRemuneracao} onChange={(e) => setValorRemuneracao(e.target.value)} style={{ width: '120px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Adicionar Funcionário</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{f.nome}</span> <span style={{ color: '#94a3b8', fontSize: '15px' }}>({f.cargo})</span>
                      <div style={{ marginTop: '8px', display: 'flex', gap: '18px', fontSize: '15px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#d4af37' }}>
                          Remuneração: <b>{f.tipoRemuneracao === 'comissao' ? `${f.valorPctOuFixo}% (Comissão Líquida)` : f.tipoRemuneracao === 'fixo' ? `${f.valorPctOuFixo}€ (Fixo)` : `${f.valorPctOuFixo}€ (Diária)`}</b>
                        </span>
                        <span style={{ color: '#f87171' }}>Adiantamento: <b>{Number(f.adiantamento || 0).toFixed(2)} €</b></span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => { setFuncSelecionadoId(f.id); setModalAdiantamentoOpen(true); }} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                        + Adiantamento
                      </button>
                      <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#f87171', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 7: STOCK */}
          {tab === 'stock' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Controlo de Stock</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Gestão de produtos e películas.</p>
              </div>

              <form onSubmit={adicionarStock} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', maxWidth: '800px' }}>
                <input type="text" placeholder="Material" required value={novoStockNome} onChange={(e) => setNovoStockNome(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <input type="text" placeholder="Qtd" required value={novoStockQtd} onChange={(e) => setNovoStockQtd(e.target.value)} style={{ width: '100px', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <input type="text" placeholder="Custo (€)" required value={novoStockCusto} onChange={(e) => setNovoStockCusto(e.target.value)} style={{ width: '120px', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px' }}>
                {stock.map(s => (
                  <div key={s.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff' }}><b>{s.nome}</b> - Qtd: {s.qtd}</span>
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{s.custoUnitario.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 8: EMPRESA */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Dados da Empresa</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Informações fiscais.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Nome</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>NIF</label>
                  <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DE REGISTO DE ADIANTAMENTO */}
      {modalAdiantamentoOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#131722', border: '1px solid #1f293d', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>➕ Inserir Adiantamento</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Insira o valor do adiantamento a ser debitado ao funcionário:</p>
            
            <form onSubmit={confirmarAdiantamento} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                required 
                placeholder="Ex: 50.00" 
                value={valorAdiantamentoInput}
                onChange={(e) => setValorAdiantamentoInput(e.target.value)}
                style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} 
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalAdiantamentoOpen(false)} style={{ backgroundColor: '#1f293d', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
