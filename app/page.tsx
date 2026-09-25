'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');
  const [subAbaOperacional, setSubAbaOperacional] = useState<'agendamento' | 'orcamento' | 'os'>('os');

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
  const [agServico, setAgServico] = useState('');
  const [agData, setAgData] = useState('');
  const [agHoraSel, setAgHoraSel] = useState('10');
  const [agMinSel, setAgMinSel] = useState('00');
  const [agNotas, setAgNotas] = useState('');

  // OS / Orçamento
  const [osCliente, setOsCliente] = useState('');
  const [osTel1, setOsTel1] = useState('');
  const [osTel2, setOsTel2] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osServicoDesc, setOsServicoDesc] = useState('');
  const [osFuncionario, setOsFuncionario] = useState('João Silva');
  const [osValorTotal, setOsValorTotal] = useState('');
  const [osComIva, setOsComIva] = useState(false);
  const [osDesconto, setOsDesconto] = useState('0');
  const [osSinal, setOsSinal] = useState('0');

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '922 333 444',
      contacto2: '911 222 333',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servico: '13 - Limpeza Detalhada',
      funcionario: 'João Silva',
      valorTotal: 400.00,
      iva23: 0.00,
      desconto: 50.00,
      valorFinal: 350.00,
      sinalPago: 150.00,
      restanteAPagar: 200.00,
      status: 'Em Execução', 
      data: '2026-09-23' 
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 150.00, data: '2026-09-23' }
  ]);

  const [novaTransDesc, setNovaTransDesc] = useState('');
  const [novaTransVal, setNovaTransVal] = useState('');
  const [novaTransData, setNovaTransData] = useState(new Date().toISOString().split('T')[0]);

  // Função para autocompletar dados do cliente de forma inteligente
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

  // Função WhatsApp
  const enviarWhatsApp = (cliente: string, veiculo: string, matricula: string, telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${cliente}, informamos que o seu veículo ${veiculo} (${matricula}) na CARBOX77 Detailing está pronto para levantamento. Obrigado!`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  // Funções de Registo
  const criarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agClient || !agTel1 || !agData) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

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
    if (!osCliente || !osMatricula || !osValorTotal) {
      alert('Preencha o Cliente, Matrícula e Valor Total.');
      return;
    }

    const valOrig = Number(osValorTotal) || 0;
    const desc = Number(osDesconto) || 0;
    const ivaVal = osComIva ? (valOrig * 0.23) : 0;
    const valorFinal = (valOrig + ivaVal) - desc;
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);

    const novaOS = {
      id: Date.now(),
      cliente: osCliente,
      contacto: osTel1,
      contacto2: osTel2,
      veiculo: osVeiculo || 'Viatura',
      matricula: osMatricula.toUpperCase(),
      servico: osServicoDesc || 'Serviço de Detail',
      funcionario: osFuncionario,
      valorTotal: valOrig,
      iva23: ivaVal,
      desconto: desc,
      valorFinal: valorFinal,
      sinalPago: sinal,
      restanteAPagar: restante,
      status: 'Em Execução',
      data: new Date().toISOString().split('T')[0]
    };

    setOrdensServico([novaOS, ...ordensServico]);
    if (sinal > 0) {
      setTransacoes([{ id: Date.now(), descricao: `Sinal OS #${novaOS.id} (${novaOS.matricula})`, matricula: novaOS.matricula, categoria: 'Serviço', tipo: 'receita', valor: sinal, data: novaOS.data }, ...transacoes]);
    }

    alert('Ordem de Serviço / Orçamento emitido com sucesso!');
    setOsCliente(''); setOsTel1(''); setOsTel2(''); setOsVeiculo(''); setOsMatricula(''); setOsServicoDesc(''); setOsValorTotal(''); setOsDesconto('0'); setOsSinal('0');
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

  const adicionarStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoStockNome || !novoStockQtd || !novoStockCusto) return;
    setStock([...stock, { id: Date.now(), nome: novoStockNome, qtd: Number(novoStockQtd) || 0, custoUnitario: Number(novoStockCusto) || 0 }]);
    setNovoStockNome(''); setNovoStockQtd(''); setNovoStockCusto('');
  };

  const adicionarTransacaoManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTransDesc || !novaTransVal || !novaTransData) return;
    setTransacoes([{ id: Date.now(), descricao: novaTransDesc, matricula: 'GERAL', categoria: 'Serviço', tipo: 'receita', valor: Number(novaTransVal) || 0, data: novaTransData }, ...transacoes]);
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
                    <p style={{ margin: 0, color: '#cbd5e1' }}><b>Cliente:</b> {os.cliente} ({os.contacto})</p>
                    <p style={{ margin: 0, color: '#cbd5e1' }}><b>Serviço:</b> {os.servico}</p>
                    <p style={{ margin: 0, color: '#d4af37' }}><b>Técnico Responsável:</b> {os.funcionario}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1f293d', paddingTop: '10px', alignItems: 'center' }}>
                      <span>Total: <b>{os.valorFinal.toFixed(2)}€</b></span>
                      <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>💬 WhatsApp</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 2: GRÁFICOS & DESEMPENHO */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Gráficos</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Balanço financeiro global.</p>
              </div>

              {(() => {
                const rec = transacoes.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const liq = rec;

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0' }}>LÍQUIDO</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>{liq.toFixed(2)} €</p>
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

          {/* ABA 3: OS / ORÇAMENTO / AGENDAMENTO */}
          {tab === 'operacional' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Central de Operações</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Selecione abaixo o que deseja emitir:</p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setSubAbaOperacional('os')}
                  style={{ backgroundColor: subAbaOperacional === 'os' ? '#d4af37' : '#131722', color: subAbaOperacional === 'os' ? '#090a0f' : '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  📋 Ordem de Serviço (OS)
                </button>
                <button 
                  onClick={() => setSubAbaOperacional('orcamento')}
                  style={{ backgroundColor: subAbaOperacional === 'orcamento' ? '#d4af37' : '#131722', color: subAbaOperacional === 'orcamento' ? '#090a0f' : '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  📑 Orçamento
                </button>
                <button 
                  onClick={() => setSubAbaOperacional('agendamento')}
                  style={{ backgroundColor: subAbaOperacional === 'agendamento' ? '#2563eb' : '#131722', color: '#fff', border: '1px solid #222b45', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  📅 Agendamento
                </button>
              </div>

              <datalist id="lista-clientes-geral">
                {listaClientesUnicos.map((nome, idx) => (
                  <option key={idx} value={nome} />
                ))}
              </datalist>

              {/* FORMULÁRIO DE AGENDAMENTO */}
              {subAbaOperacional === 'agendamento' && (
                <form onSubmit={criarAgendamento} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>📅 Novo Agendamento de Avaliação</h3>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Cliente * (Inteligente)</label>
                    <input 
                      type="text" 
                      required 
                      list="lista-clientes-geral"
                      value={agClient} 
                      onChange={(e) => selecionarClienteInteligente(e.target.value, 'ag')} 
                      placeholder="Ex: Carla Monteiro" 
                      style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone Principal *</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '14px 16px', backgroundColor: '#1e2235', border: '1px solid #222b45', borderRight: 'none', borderRadius: '10px 0 0 10px', color: '#d4af37', fontSize: '16px', fontWeight: 'bold' }}>+351</span>
                        <input type="text" required value={agTel1} onChange={(e) => setAgTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '0 10px 10px 0', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone 2 (Opcional)</label>
                      <input type="text" value={agTel2} onChange={(e) => setAgTel2(e.target.value)} placeholder="Opcional" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                      <input type="text" value={agVeiculo} onChange={(e) => setAgVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Matrícula</label>
                      <input type="text" value={agMatricula} onChange={(e) => setAgMatricula(e.target.value)} placeholder="AZ-91-GI" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Tipo de Serviço / Avaliação</label>
                    <input 
                      type="text" 
                      list="sugestoes-servicos" 
                      value={agServico} 
                      onChange={(e) => setAgServico(e.target.value)} 
                      placeholder="Selecione ou escreva o serviço..." 
                      style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                    />
                    <datalist id="sugestoes-servicos">
                      <option value="13 - Limpeza Detalhada" />
                      <option value="57 - Aplicação de PPF nos Black Piano" />
                      <option value="111 - Fusion Coating (Proteção Cerâmica)" />
                      <option value="Polimento Comercial" />
                      <option value="Higienização de Interiores" />
                    </datalist>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Data *</label>
                      <input type="date" required value={agData} onChange={(e) => setAgData(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Hora *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <select value={agHoraSel} onChange={(e) => setAgHoraSel(e.target.value)} style={{ padding: '14px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '10px' }}>
                          {['09','10','11','12','14','15','16','17','18','19'].map(h => <option key={h} value={h}>{h}h</option>)}
                        </select>
                        <select value={agMinSel} onChange={(e) => setAgMinSel(e.target.value)} style={{ padding: '14px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '10px' }}>
                          {['00','15','30','45'].map(m => <option key={m} value={m}>{m}m</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '10px' }}>Guardar Agendamento</button>
                </form>
              )}

              {/* FORMULÁRIO DE OS / ORÇAMENTO */}
              {(subAbaOperacional === 'os' || subAbaOperacional === 'orcamento') && (
                <form onSubmit={criarOS} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '750px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>
                    {subAbaOperacional === 'os' ? '📋 Emitir Ordem de Serviço (OS)' : '📑 Emitir Orçamento'}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Cliente * (Inteligente)</label>
                      <input 
                        type="text" 
                        required 
                        list="lista-clientes-geral"
                        value={osCliente} 
                        onChange={(e) => selecionarClienteInteligente(e.target.value, 'os')} 
                        placeholder="Ex: Carla Monteiro" 
                        style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Matrícula *</label>
                      <input type="text" required value={osMatricula} onChange={(e) => setOsMatricula(e.target.value)} placeholder="AZ-91-GI" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone Principal</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '14px 12px', backgroundColor: '#1e2235', border: '1px solid #222b45', borderRight: 'none', borderRadius: '10px 0 0 10px', color: '#d4af37', fontSize: '15px', fontWeight: 'bold' }}>+351</span>
                        <input type="text" value={osTel1} onChange={(e) => setOsTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '0 10px 10px 0', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone 2</label>
                      <input type="text" value={osTel2} onChange={(e) => setOsTel2(e.target.value)} placeholder="Opcional" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                      <input type="text" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Serviço Realizado / Descrição</label>
                    <input 
                      type="text" 
                      list="sugestoes-servicos" 
                      value={osServicoDesc} 
                      onChange={(e) => setOsServicoDesc(e.target.value)} 
                      placeholder="Selecione ou escreva o serviço..." 
                      style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Quem vai realizar o serviço (Técnico/Funcionário)</label>
                    <select value={osFuncionario} onChange={(e) => setOsFuncionario(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '10px', fontSize: '16px' }}>
                      {funcionarios.map(f => (
                        <option key={f.id} value={f.nome}>{f.nome} ({f.cargo})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Valor Total (€) *</label>
                      <input type="text" required value={osValorTotal} onChange={(e) => setOsValorTotal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Desconto (€)</label>
                      <input type="text" value={osDesconto} onChange={(e) => setOsDesconto(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Sinal Pago (€)</label>
                      <input type="text" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <input type="checkbox" id="ivaCheck" checked={osComIva} onChange={(e) => setOsComIva(e.target.checked)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <label htmlFor="ivaCheck" style={{ fontSize: '16px', color: '#cbd5e1', cursor: 'pointer' }}>Aplicar IVA 23% sobre o valor total</label>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '10px' }}>
                    {subAbaOperacional === 'os' ? 'Emitir Ordem de Serviço (OS)' : 'Emitir Orçamento'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ABA 4: CALENDÁRIO & AGENDA */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário & Agenda</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Visualização de todos os agendamentos e avaliações.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '800px' }}>
                {agendamentos.map(ag => (
                  <div key={ag.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{ag.cliente} - {ag.veiculo} ({ag.matricula})</h4>
                      <p style={{ margin: '4px 0 0 0', color: '#d4af37', fontSize: '14px' }}>Serviço: {ag.servicoAgendado}</p>
                      <p style={{ margin: '6px 0 0 0', color: '#cbd5e1', fontSize: '15px' }}>📞 +351 {ag.telefone1} {ag.telefone2 ? `| ${ag.telefone2}` : ''}</p>
                    </div>
                    <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '8px 14px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold' }}>
                      📅 {ag.data} às {ag.hora}
                    </span>
                  </div>
                ))}
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px' }}>
                {transacoes.map(tr => (
                  <div key={tr.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}>{tr.descricao} ({tr.data})</span>
                    <span style={{ color: tr.tipo === 'receita' ? '#34d399' : '#f87171', fontWeight: 'bold', fontSize: '16px' }}>
                      {tr.tipo === 'receita' ? '+' : '-'}{tr.valor.toFixed(2)} €
                    </span>
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
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Configure comissões, diárias, salários fixos e adiantamentos.</p>
              </div>

              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '24px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                <input 
                  type="text" 
                  placeholder="Nome do funcionário" 
                  required
                  value={novoFuncNome}
                  onChange={(e) => setNovoFuncNome(e.target.value)}
                  style={{ flex: 1, minWidth: '180px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Cargo (ex: Detailer)" 
                  required
                  value={novoFuncCargo}
                  onChange={(e) => setNovoFuncCargo(e.target.value)}
                  style={{ flex: 1, minWidth: '150px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <select
                  value={tipoRemuneracao}
                  onChange={(e) => setTipoRemuneracao(e.target.value as any)}
                  style={{ padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
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
                  style={{ width: '130px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Adiantamento (€)"
                  value={novoFuncAdiantamento}
                  onChange={(e) => setNovoFuncAdiantamento(e.target.value)}
                  style={{ width: '150px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '100%' }}>Adicionar Funcionário</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{f.nome}</span> <span style={{ color: '#94a3b8', fontSize: '15px' }}>({f.cargo})</span>
                      <div style={{ marginTop: '8px', display: 'flex', gap: '18px', fontSize: '15px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#d4af37' }}>
                          Remuneração: <b>{f.tipoRemuneracao === 'comissao' ? `${f.valorPctOuFixo}% (Comissão)` : f.tipoRemuneracao === 'fixo' ? `${f.valorPctOuFixo}€ (Fixo)` : `${f.valorPctOuFixo}€ (Diária)`}</b>
                        </span>
                        <span style={{ color: '#f87171' }}>Adiantamento: <b>{Number(f.adiantamento || 0).toFixed(2)} €</b></span>
                      </div>
                    </div>
                    <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#f87171', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Remover</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 7: CONTROLO DE STOCK */}
          {tab === 'stock' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Controlo de Stock & Materiais</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Gestão de películas e produtos de detalhe.</p>
              </div>

              <form onSubmit={adicionarStock} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '20px', borderRadius: '14px', border: '1px solid #1f293d', maxWidth: '800px' }}>
                <input 
                  type="text" 
                  placeholder="Nome do Material" 
                  required
                  value={novoStockNome}
                  onChange={(e) => setNovoStockNome(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '12px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Quantidade" 
                  required
                  value={novoStockQtd}
                  onChange={(e) => setNovoStockQtd(e.target.value)}
                  style={{ width: '130px', padding: '12px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <input 
                  type="text" 
                  placeholder="Custo Unitário (€)" 
                  required
                  value={novoStockCusto}
                  onChange={(e) => setNovoStockCusto(e.target.value)}
                  style={{ width: '150px', padding: '12px 16px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}
                />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Adicionar</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px' }}>
                {stock.map(s => (
                  <div key={s.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}><b>{s.nome}</b> - Qtd: {s.qtd}</span>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '16px' }}>Custo Unit.: {s.custoUnitario.toFixed(2)} €</span>
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
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Informações fiscais e de contacto oficiais.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
