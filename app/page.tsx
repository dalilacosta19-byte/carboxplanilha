'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('hub');
  const [user, setUser] = useState('admin');

  // Controlos de Modais (Popups na mesma página)
  const [modalAtivo, setModalAtivo] = useState<'nenhum' | 'agendamento' | 'os'>('nenhum');

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

  // OS / Orçamento (Com campos detalhados pedidos)
  const [osCliente, setOsCliente] = useState('');
  const [osTel1, setOsTel1] = useState('');
  const [osTel2, setOsTel2] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osServicoDesc, setOsServicoDesc] = useState('');
  const [osFuncionario, setOsFuncionario] = useState('João Silva');
  const [osValorTotal, setOsValorTotal] = useState('');
  const [osComIva, setOsComIva] = useState(false); // 23% IVA opcional
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
      servico: 'Limpeza Detalhada',
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
      notasAvaliacao: agNotas || 'Avaliação agendada.',
      data: agData,
      hora: `${agHoraSel}:${agMinSel}`,
      status: 'Agendado'
    };

    setAgendamentos([novo, ...agendamentos]);
    setModalAtivo('nenhum');
    alert('Agendamento criado com sucesso!');
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

    setModalAtivo('nenhum');
    alert('Ordem de Serviço / Orçamento emitido com sucesso!');
  };

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome || !novoFuncCargo) return;
    setFuncionarios([...funcionarios, { id: Date.now(), nome: novoFuncNome, cargo: novoFuncCargo, tipoRemuneracao, valorPctOuFixo: Number(valorRemuneracao) || 0, adiantamento: Number(novoFuncAdiantamento) || 0 }]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
  };

  const menuItems = [
    { id: 'hub', label: '🚀 Painel Principal & Agenda' },
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Gráficos & Desempenho' },
    { id: 'financeiro', label: '💰 Livro-Caixa' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
    { id: 'stock', label: '📦 Controlo de Stock' },
    { id: 'config', label: '⚙️ Empresa' },
  ];

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Em Execução': return { bg: 'rgba(37, 99, 235, 0.25)', color: '#93c5fd', border: '1px solid rgba(37, 99, 235, 0.5)' };
      case 'Pronto / Entregue': return { bg: 'rgba(52, 211, 153, 0.25)', color: '#6ee7b7', border: '1px solid rgba(52, 211, 153, 0.5)' };
      default: return { bg: 'rgba(251, 191, 36, 0.25)', color: '#fde047', border: '1px solid rgba(251, 191, 36, 0.5)' };
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
          
          {/* ABA HUB: TUDO EM UMA SÓ PÁGINA COM BOTÕES PARA ABRIR POPUPS */}
          {tab === 'hub' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Central de Operações Carbox77</h2>
                  <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Crie agendamentos ou ordens de serviço instantaneamente.</p>
                </div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <button 
                    onClick={() => setModalAtivo('agendamento')}
                    style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                  >
                    📅 + Novo Agendamento
                  </button>
                  <button 
                    onClick={() => setModalAtivo('os')}
                    style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                  >
                    📋 + Nova OS / Orçamento
                  </button>
                </div>
              </div>

              {/* GRELHA RESUMO DA AGENDA E PÁTIO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                
                {/* AGENDA ATUAL */}
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>📅 Próximos Agendamentos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto' }}>
                    {agendamentos.map(ag => (
                      <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{ag.cliente} ({ag.veiculo} - {ag.matricula})</p>
                          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>Tel: {ag.telefone1}</p>
                        </div>
                        <span style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>{ag.data} {ag.hora}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VEÍCULOS NO PÁTIO */}
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(6px)', border: '1px solid #1f293d', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🚗 Veículos em Execução (OS)</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto' }}>
                    {ordensServico.map(os => (
                      <div key={os.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{os.veiculo} ({os.matricula})</p>
                          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>Serviço: {os.servico} | Resp: {os.funcionario}</p>
                        </div>
                        <button 
                          onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)}
                          style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          💬 WhatsApp
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* OUTRAS ABAS */}
          {tab === 'pateo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>Veículos no Pátio</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
                {ordensServico.map(os => (
                  <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #1f293d', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{os.veiculo} ({os.matricula})</h3>
                    <p style={{ margin: 0, color: '#cbd5e1' }}><b>Cliente:</b> {os.cliente} ({os.contacto})</p>
                    <p style={{ margin: 0, color: '#cbd5e1' }}><b>Serviço:</b> {os.servico}</p>
                    <p style={{ margin: 0, color: '#d4af37' }}><b>Técnico Responsável:</b> {os.funcionario}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1f293d', paddingTop: '10px' }}>
                      <span>Total: <b>{os.valorFinal.toFixed(2)}€</b></span>
                      <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar WhatsApp</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'metricas' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff', margin: '0 0 10px 0' }}>Gráficos & Desempenho</h2>
              <p style={{ color: '#94a3b8' }}>Balanço financeiro global e produtividade da equipa.</p>
            </div>
          )}

          {tab === 'financeiro' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff', margin: 0 }}>Livro-Caixa</h2>
              {transacoes.map(t => (
                <div key={t.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.descricao} ({t.data})</span>
                  <span style={{ color: '#34d399', fontWeight: 'bold' }}>+{t.valor.toFixed(2)} €</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'funcionarios' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff', margin: 0 }}>Gestão de Funcionários & Salários</h2>
              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Nome" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '8px', flex: 1 }} />
                <input type="text" placeholder="Cargo" value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)} style={{ padding: '10px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '8px', flex: 1 }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span><b>{f.nome}</b> - {f.cargo} ({f.tipoRemuneracao})</span>
                    <span style={{ color: '#f87171' }}>Adiantamento: {f.adiantamento.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'stock' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff', margin: '0 0 10px 0' }}>Controlo de Stock</h2>
              {stock.map(s => (
                <div key={s.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '8px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{s.nome}</span>
                  <span>Qtd: {s.qtd} | Custo Unit: {s.custoUnitario.toFixed(2)}€</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'config' && (
            <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff', margin: '0 0 10px 0' }}>Dados da Empresa</h2>
              <p style={{ color: '#94a3b8' }}><b>{dadosEmpresa.nome}</b> • NIF: {dadosEmpresa.nif}</p>
              <p style={{ color: '#94a3b8' }}>📍 {dadosEmpresa.morada}</p>
              <p style={{ color: '#94a3b8' }}>📞 {dadosEmpresa.telefone}</p>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DE AGENDAMENTO */}
      {modalAtivo === 'agendamento' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '18px', padding: '32px', width: '100%', maxWidth: '550px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>📅 Novo Agendamento de Avaliação</h3>
              <button onClick={() => setModalAtivo('nenhum')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={criarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Cliente *</label>
                <input type="text" required value={agClient} onChange={(e) => setAgClient(e.target.value)} placeholder="Ex: Carla Monteiro" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone Principal *</label>
                  <input type="text" required value={agTel1} onChange={(e) => setAgTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone 2 (Opcional)</label>
                  <input type="text" value={agTel2} onChange={(e) => setAgTel2(e.target.value)} placeholder="Opcional" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                  <input type="text" value={agVeiculo} onChange={(e) => setAgVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Matrícula</label>
                  <input type="text" value={agMatricula} onChange={(e) => setAgMatricula(e.target.value)} placeholder="AZ-91-GI" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Data *</label>
                  <input type="date" required value={agData} onChange={(e) => setAgData(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Hora *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <select value={agHoraSel} onChange={(e) => setAgHoraSel(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '8px' }}>
                      {['09','10','11','12','14','15','16','17','18','19'].h => <option key={h} value={h}>{h}h</option>}
                    </select>
                    <select value={agMinSel} onChange={(e) => setAgMinSel(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '8px' }}>
                      {['00','15','30','45'].map(m => <option key={m} value={m}>{m}m</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>Salvar Agendamento</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE OS / ORÇAMENTO */}
      {modalAtivo === 'os' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '18px', padding: '32px', width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>📋 Emitir Ordem de Serviço / Orçamento</h3>
              <button onClick={() => setModalAtivo('nenhum')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={criarOS} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Cliente *</label>
                  <input type="text" required value={osCliente} onChange={(e) => setOsCliente(e.target.value)} placeholder="Ex: Carla Monteiro" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Matrícula *</label>
                  <input type="text" required value={osMatricula} onChange={(e) => setOsMatricula(e.target.value)} placeholder="AZ-91-GI" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', textTransform: 'uppercase' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone Principal</label>
                  <input type="text" value={osTel1} onChange={(e) => setOsTel1(e.target.value)} placeholder="922 333 444" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Telefone 2</label>
                  <input type="text" value={osTel2} onChange={(e) => setOsTel2(e.target.value)} placeholder="Opcional" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                  <input type="text" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
              </div>

              {/* SERVIÇO INTELIGENTE (COM SETINHA E ESCRITA LIVRE) */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Serviço Realizado / Descrição</label>
                <input 
                  type="text" 
                  list="sugestoes-servicos" 
                  value={osServicoDesc} 
                  onChange={(e) => setOsServicoDesc(e.target.value)} 
                  placeholder="Selecione ou escreva o serviço..." 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}
                />
                <datalist id="sugestoes-servicos">
                  <option value="13 - Limpeza Detalhada" />
                  <option value="57 - Aplicação de PPF nos Black Piano" />
                  <option value="111 - Fusion Coating (Proteção Cerâmica)" />
                  <option value="Polimento Comercial" />
                  <option value="Higienização de Interiores" />
                </datalist>
              </div>

              {/* QUEM VAI REALIZAR O SERVIÇO */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Quem vai realizar o serviço (Técnico/Funcionário)</label>
                <select value={osFuncionario} onChange={(e) => setOsFuncionario(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', borderRadius: '8px', fontSize: '15px' }}>
                  {funcionarios.map(f => (
                    <option key={f.id} value={f.nome}>{f.nome} ({f.cargo})</option>
                  ))}
                </select>
              </div>

              {/* VALORES, IVA 23%, DESCONTO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Valor Total (€) *</label>
                  <input type="text" required value={osValorTotal} onChange={(e) => setOsValorTotal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Desconto (€)</label>
                  <input type="text" value={osDesconto} onChange={(e) => setOsDesconto(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Sinal Pago (€)</label>
                  <input type="text" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', fontSize: '15px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <input type="checkbox" id="ivaCheck" checked={osComIva} onChange={(e) => setOsComIva(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="ivaCheck" style={{ fontSize: '15px', color: '#cbd5e1', cursor: 'pointer' }}>Aplicar IVA 23% sobre o valor total</label>
              </div>

              <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>Emitir OS / Orçamento</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
