'use client';
import { useState, useRef, useEffect } from 'react';

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

  // Agenda integrada
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, tipo: 'Agendamento', cliente: 'Carlos Silva', contacto: '+351 911 222 333', veiculo: 'Porsche 911 Turbo', matricula: '0KM-7700', servico: 'PPF Frontal + Vitrificação', data: '2026-06-01', hora: '09:30', status: 'Agendado' },
    { id: 2, tipo: 'Orçamento', cliente: 'Maria Santos', contacto: '+351 922 333 444', veiculo: 'BMW M4', matricula: 'AA-99-BB', servico: 'Polimento Comercial', data: '2026-06-10', hora: '14:00', status: 'Orçamento Pendente' }
  ]);

  // Navegação do Calendário
  const [anoAtualCal, setAnoAtualCal] = useState(2026);
  const [mesAtualCal, setMesAtualCal] = useState(5);
  const [diaSelecionadoCal, setDiaSelecionadoCal] = useState('2026-06-01');

  // Formulário OS / Agendamento / Orçamento
  const [tipoRegistroOS, setTipoRegistroOS] = useState<'os' | 'agendamento' | 'orcamento'>('os');
  const [osCliente, setOsCliente] = useState('');
  const [osContacto, setOsContacto] = useState('');
  const [osVeiculo, setOsVeiculo] = useState('');
  const [osMatricula, setOsMatricula] = useState('');
  const [osObs, setOsObs] = useState('');

  // Múltiplos serviços com técnicos e valores individuais
  const [listaItensServico, setListaItensServico] = useState([
    { id: 1, descricao: '', funcionario: '', valor: '' }
  ]);

  const [osCustos, setOsCustos] = useState('0');
  const [osDesconto, setOsDesconto] = useState('0');
  const [osSinal, setOsSinal] = useState('0');
  const [osContaRecebimento, setOsContaRecebimento] = useState('MB WAY');
  const [osDataAgend, setOsDataAgend] = useState('2026-06-01');
  const [osHoraAgend, setOsHoraAgend] = useState('09:00');

  // Estados para autocompletar sugestões
  const [mostrarSugestoesCliente, setMostrarSugestoesCliente] = useState(false);
  const [mostrarSugestoesServicoIndex, setMostrarSugestoesServicoIndex] = useState<number | null>(null);

  const sugestoesServicosAutomotivos = [
    'Vitrificação Cerâmica Completa (Paint Protection)',
    'PPF (Paint Protection Film) Frontal',
    'PPF Completo Carroçaria',
    'Polimento de Correção (2 Passos)',
    'Polimento Comercial / Brilho',
    'Lavagem Detalhada Premium',
    'Higienização de Interiores & Bancos em Pele',
    'Restauro de Faróis',
    'Tratamento de Vidros / Impermeabilização',
    'Limpeza e Descontaminação de Jantes'
  ];

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carlos Silva', 
      contacto: '+351 911 222 333',
      veiculo: 'Porsche 911 Turbo', 
      matricula: '0KM-7700', 
      servicosDetalhes: [
        { descricao: 'PPF Frontal', funcionario: 'João Silva', valor: 800.00 },
        { descricao: 'Vitrificação Completa', funcionario: 'Ricardo Costa', valor: 400.00 }
      ],
      observacoes: 'Inspeção rigorosa à chegada. Sem riscos prévios.', 
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

  // Extrair base de clientes únicos já cadastrados no sistema
  const clientesCadastrados = Array.from(new Set([
    ...ordensServico.map(o => o.cliente),
    ...agendamentos.map(a => a.cliente)
  ])).map(nome => {
    const osFound = ordensServico.find(o => o.cliente === nome);
    const agFound = agendamentos.find(a => a.cliente === nome);
    return {
      cliente: nome,
      contacto: osFound?.contacto || agFound?.contacto || '',
      veiculo: osFound?.veiculo || agFound?.veiculo || '',
      matricula: osFound?.matricula || agFound?.matricula || ''
    };
  });

  const selecionarClienteExistente = (c: any) => {
    setOsCliente(c.cliente);
    setOsContacto(c.contacto);
    setOsVeiculo(c.veiculo);
    if (c.matricula && c.matricula !== 'N/D' && c.matricula !== 'SEM MATRÍCULA') {
      setOsMatricula(c.matricula);
    }
    setMostrarSugestoesCliente(false);
  };

  const handleOsMatriculaChange = (matriculaInput: string) => {
    const matriculaLimpa = matriculaInput.toUpperCase();
    setOsMatricula(matriculaLimpa);
    const historico = ordensServico.find(o => o.matricula.toUpperCase() === matriculaLimpa);
    if (historico) {
      setOsCliente(historico.cliente);
      setOsVeiculo(historico.veiculo);
      if (historico.contacto) setOsContacto(historico.contacto);
    }
  };

  // Gestão da lista de serviços dinâmicos na OS
  const adicionarLinhaServico = () => {
    setListaItensServico([...listaItensServico, { id: Date.now(), descricao: '', funcionario: '', valor: '' }]);
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

  const calcularValorTotalServicos = () => {
    return listaItensServico.reduce((acc, item) => acc + (Number(item.valor) || 0), 0);
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

  const processarRegistoUnificado = (e: React.FormEvent) => {
    e.preventDefault();

    if (tipoRegistroOS === 'os') {
      if (!osCliente || !osMatricula) {
        alert('Para Ordem de Serviço, preencha pelo menos o Cliente e a Matrícula.');
        return;
      }
    } else if (tipoRegistroOS === 'agendamento') {
      if (!osCliente) {
        alert('Por favor, preencha pelo menos o nome do cliente.');
        return;
      }
    }

    const matriculaU = osMatricula ? osMatricula.toUpperCase() : 'SEM MATRÍCULA';
    const dataHoje = new Date().toISOString().split('T')[0];

    if (tipoRegistroOS === 'os') {
      const somaServicos = calcularValorTotalServicos();
      const valorOrig = somaServicos > 0 ? somaServicos : (Number(osValorInput) || 0);
      const desc = Number(osDesconto) || 0;
      const valorFin = Math.max(0, valorOrig - desc);
      const sinal = Number(osSinal) || 0;
      const custos = Number(osCustos) || 0;
      const restante = Math.max(0, valorFin - sinal);

      const novaOS = {
        id: Date.now(),
        cliente: osCliente,
        contacto: osContacto,
        veiculo: osVeiculo || 'Desconhecido',
        matricula: matriculaU,
        servicosDetalhes: listaItensServico.map(i => ({ descricao: i.descricao || 'Serviço Geral', funcionario: i.funcionario || 'Não atribuído', valor: Number(i.valor) || 0 })),
        observacoes: osObs || 'Sem observações registadas.',
        custosPecas: custos,
        valorOriginal: valorOrig,
        desconto: desc,
        valorFinal: valorFin,
        sinalPago: sinal,
        contaRecebimentoSinal: sinal > 0 ? osContaRecebimento : 'Nenhum',
        restanteAPagar: restante,
        status: 'Em Execução',
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

      alert('Ordem de Serviço criada com sucesso!');
    } else if (tipoRegistroOS === 'agendamento') {
      setAgendamentos([...agendamentos, {
        id: Date.now(),
        tipo: 'Agendamento',
        cliente: osCliente,
        contacto: osContacto || 'Sem contacto',
        veiculo: osVeiculo || 'Desconhecido',
        matricula: osMatricula ? osMatricula.toUpperCase() : 'N/D',
        servico: listaItensServico[0]?.descricao || 'Estética Geral',
        data: osDataAgend,
        hora: osHoraAgend,
        status: 'Agendado'
      }]);
      alert('Agendamento registado com sucesso!');
    } else {
      setAgendamentos([...agendamentos, {
        id: Date.now(),
        tipo: 'Orçamento',
        cliente: osCliente || 'Cliente Balcão',
        contacto: osContacto || 'Sem contacto',
        veiculo: osVeiculo || 'Desconhecido',
        matricula: osMatricula ? osMatricula.toUpperCase() : 'N/D',
        servico: listaItensServico[0]?.descricao || 'Orçamento Geral',
        data: osDataAgend,
        hora: osHoraAgend,
        status: 'Orçamento Pendente'
      }]);
      alert('Pedido de orçamento registado com sucesso!');
    }

    setOsCliente('');
    setOsContacto('');
    setOsVeiculo('');
    setOsMatricula('');
    setListaItensServico([{ id: Date.now(), descricao: '', funcionario: '', valor: '' }]);
    setOsObs('');
    setOsCustos('0');
    setOsDesconto('0');
    setOsSinal('0');
  };

  const [osValorInput, setOsValorInput] = useState('');

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
          th, td { border: 1px solid #ccc; padding: 10px; font-size: 14px; text-align: left; }
          th { background: #111; color: #d4af37; }
        </style>
        </head>
        <body>
          <div class="header">
            <div><h1>${dadosEmpresa.nome}</h1><p>${dadosEmpresa.morada} | NIF: ${dadosEmpresa.nif} | Tel: ${dadosEmpresa.telefone}</p></div>
            <div style="text-align: right;"><b>OS Nº:</b> #${os.id}<br/><b>Data:</b> ${os.data}</div>
          </div>
          <div class="box">
            <p><b>Cliente:</b> ${os.cliente} | <b>Contacto:</b> ${os.contacto || 'N/D'}</p>
            <p><b>Viatura:</b> ${os.veiculo} | <b>Matrícula:</b> ${os.matricula}</p>
            <p><b>Status:</b> ${os.status}</p>
          </div>
          <table>
            <tr><th>Serviço Solicitado</th><th>Técnico Responsável</th><th>Valor</th></tr>
            ${os.servicosDetalhes ? os.servicosDetalhes.map((s: any) => `<tr><td><b>${s.descricao}</b></td><td>${s.funcionario}</td><td>${s.valor.toFixed(2)}€</td></tr>`).join('') : `<tr><td colspan="3">${os.servico}</td></tr>`}
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
    { id: 'ordem-servico', label: '📋 Nova OS / Orçamento / Agendamento' },
    { id: 'agenda', label: '📅 Calendário & Agenda' },
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

  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const primeiroDiaMes = new Date(anoAtualCal, mesAtualCal, 1).getDay();
  const totalDiasMes = new Date(anoAtualCal, mesAtualCal + 1, 0).getDate();

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
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Acompanhe o status em tempo real com botões dinâmicos.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  + Nova OS / Agendamento
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
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente} {os.contacto && <span style={{ color: '#94a3b8', fontSize: '13px' }}>({os.contacto})</span>}</p>
                        <div>
                          <p style={{ margin: '0 0 4px 0', color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>Serviços e Técnicos:</p>
                          {os.servicosDetalhes ? (
                            os.servicosDetalhes.map((s: any, idx: number) => (
                              <p key={idx} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: '14px' }}>• {s.descricao} (<span style={{ color: '#60a5fa' }}>{s.funcionario}</span>) - <b>{s.valor.toFixed(2)}€</b></p>
                            ))
                          ) : (
                            <p style={{ margin: 0, color: '#cbd5e1' }}>{os.servico}</p>
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

          {/* ABA 3: NOVA ORDEM DE SERVIÇO / AGENDAMENTO / ORÇAMENTO COM INTELIGÊNCIA */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Registo Inteligente de Trabalho</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Seleção automática de clientes existentes, múltiplos serviços e técnicos.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', maxWidth: '950px' }}>
                <form onSubmit={processarRegistoUnificado} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* SELETOR DO TIPO DE REGISTO */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>Tipo de Registo:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <button type="button" onClick={() => setTipoRegistroOS('os')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'os' ? '2px solid #d4af37' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'os' ? 'rgba(212, 175, 55, 0.15)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📋 Ordem de Serviço
                      </button>
                      <button type="button" onClick={() => setTipoRegistroOS('agendamento')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'agendamento' ? '2px solid #60a5fa' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'agendamento' ? 'rgba(96, 165, 250, 0.15)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📅 Agendamento
                      </button>
                      <button type="button" onClick={() => setTipoRegistroOS('orcamento')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'orcamento' ? '2px solid #c084fc' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'orcamento' ? 'rgba(192, 132, 252, 0.15)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📄 Pedido Orçamento
                      </button>
                    </div>
                  </div>

                  {/* CAMPO CLIENTE COM AUTOCOMPLETAR INTELIGENTE */}
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Nome do cliente (comece a escrever para sugerir cadastrados)" 
                      value={osCliente} 
                      onChange={(e) => {
                        setOsCliente(e.target.value);
                        setMostrarSugestoesCliente(true);
                      }} 
                      onFocus={() => setMostrarSugestoesCliente(true)}
                      style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} 
                    />

                    {mostrarSugestoesCliente && clientesCadastrados.filter(c => c.cliente.toLowerCase().includes(osCliente.toLowerCase())).length > 0 && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '10px', marginTop: '4px', zIndex: 50, maxHeight: '200px', overflowY: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                        <p style={{ fontSize: '12px', color: '#d4af37', padding: '8px 12px', margin: 0, borderBottom: '1px solid #222b45', fontWeight: 'bold' }}>⚡ Clientes já registados no sistema (Clique para selecionar):</p>
                        {clientesCadastrados
                          .filter(c => c.cliente.toLowerCase().includes(osCliente.toLowerCase()))
                          .map((c, idx) => (
                            <div 
                              key={idx}
                              onClick={() => selecionarClienteExistente(c)}
                              style={{ padding: '12px', borderBottom: '1px solid #1e2235', cursor: 'pointer', transition: 'background 0.2s' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2030'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <p style={{ margin: 0, fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>{c.cliente}</p>
                              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Tel: {c.contacto || 'N/D'} | Viatura: {c.veiculo || 'N/D'} ({c.matricula || 'N/D'})</p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Contacto / Telefone</label>
                      <input type="text" placeholder="Ex: +351 911 222 333" value={osContacto} onChange={(e) => setOsContacto(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>
                        Matrícula {tipoRegistroOS === 'agendamento' || tipoRegistroOS === 'orcamento' ? <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>(Opcional)</span> : ''}
                      </label>
                      <input type="text" placeholder="Ex: 0KM-7700" value={osMatricula} onChange={(e) => handleOsMatriculaChange(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Viatura</label>
                    <input type="text" placeholder="Ex: Porsche 911 Turbo" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                  </div>

                  {/* MÚLTIPLOS SERVIÇOS INTELIGENTES COM TÉCNICO E VALOR */}
                  <div style={{ backgroundColor: '#090a0f', padding: '20px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '15px', color: '#d4af37', fontWeight: 'bold' }}>🛠️ Serviços de Estética Automotiva, Técnicos e Valores:</label>
                      <button type="button" onClick={adicionarLinhaServico} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                        + Adicionar Outro Serviço
                      </button>
                    </div>

                    {listaItensServico.map((item, index) => (
                      <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 40px', gap: '10px', alignItems: 'center', position: 'relative' }}>
                        
                        {/* Sugestões inteligentes de serviços */}
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            placeholder="Nome do serviço (ex: Vitrificação)" 
                            value={item.descricao} 
                            onChange={(e) => {
                              atualizarItemServico(index, 'descricao', e.target.value);
                              setMostrarSugestoesServicoIndex(index);
                            }}
                            onFocus={() => setMostrarSugestoesServicoIndex(index)}
                            style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                          />

                          {mostrarSugestoesServicoIndex === index && sugestoesServicosAutomotivos.filter(s => s.toLowerCase().includes(item.descricao.toLowerCase())).length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '8px', marginTop: '4px', zIndex: 60, maxHeight: '180px', overflowY: 'auto' }}>
                              <p style={{ fontSize: '11px', color: '#d4af37', padding: '6px 10px', margin: 0, borderBottom: '1px solid #222b45', fontWeight: 'bold' }}>💡 Sugestões inteligentes:</p>
                              {sugestoesServicosAutomotivos
                                .filter(s => s.toLowerCase().includes(item.descricao.toLowerCase()))
                                .map((sug, sIdx) => (
                                  <div 
                                    key={sIdx}
                                    onClick={() => {
                                      atualizarItemServico(index, 'descricao', sug);
                                      setMostrarSugestoesServicoIndex(null);
                                    }}
                                    style={{ padding: '10px', borderBottom: '1px solid #1e2235', cursor: 'pointer', fontSize: '13px', color: '#fff' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2030'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    {sug}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        {/* Técnico com Seta de Seleção */}
                        <div style={{ position: 'relative' }}>
                          <select 
                            value={item.funcionario} 
                            onChange={(e) => atualizarItemServico(index, 'funcionario', e.target.value)}
                            style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', appearance: 'auto', cursor: 'pointer' }}
                          >
                            <option value="">👤 Selecionar Técnico...</option>
                            {funcionarios.map(f => (
                              <option key={f.id} value={f.nome}>{f.nome} ({f.cargo})</option>
                            ))}
                          </select>
                        </div>

                        {/* Valor do Serviço */}
                        <div>
                          <input 
                            type="number" 
                            step="0.01" 
                            placeholder="Valor (€)" 
                            value={item.valor} 
                            onChange={(e) => atualizarItemServico(index, 'valor', e.target.value)} 
                            style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#34d399', fontWeight: 'bold', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                          />
                        </div>

                        {/* Botão Remover */}
                        <div>
                          {listaItensServico.length > 1 && (
                            <button type="button" onClick={() => removerLinhaServico(index)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* CAMPOS ESPECÍFICOS PARA AGENDAMENTO OU ORÇAMENTO */}
                  {tipoRegistroOS !== 'os' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Data</label>
                        <input type="date" value={osDataAgend} onChange={(e) => setOsDataAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Hora</label>
                        <input type="time" value={osHoraAgend} onChange={(e) => setOsHoraAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  )}

                  {/* CAMPOS FINANCEIROS EXTRAS PARA ORDEM DE SERVIÇO */}
                  {tipoRegistroOS === 'os' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Custos (Peças) (€)</label>
                        <input type="number" step="0.01" value={osCustos} onChange={(e) => setOsCustos(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#f87171', marginBottom: '8px', fontWeight: 'bold' }}>Desconto (€)</label>
                        <input type="number" step="0.01" value={osDesconto} onChange={(e) => setOsDesconto(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#34d399', marginBottom: '8px', fontWeight: 'bold' }}>Sinal Entrada (€)</label>
                        <input type="number" step="0.01" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                      </div>
                    </div>
                  )}

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '12px', fontSize: '17px' }}>
                    {tipoRegistroOS === 'os' ? 'Criar Ordem de Serviço' : tipoRegistroOS === 'agendamento' ? 'Confirmar Agendamento' : 'Guardar Pedido de Orçamento'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ABA 4: CALENDÁRIO & AGENDA PROFISSIONAL */}
          {tab === 'agenda' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário de Agendamentos & Orçamentos</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Selecione um dia no calendário para ver todas as marcações e feriados de Portugal.</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: '#131722', padding: '10px 16px', borderRadius: '12px', border: '1px solid #1e2235' }}>
                  <select 
                    value={mesAtualCal} 
                    onChange={(e) => setMesAtualCal(Number(e.target.value))}
                    style={{ backgroundColor: '#090a0f', color: '#d4af37', border: '1px solid #222b45', padding: '8px 12px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {nomesMeses.map((m, idx) => (
                      <option key={idx} value={idx}>{m}</option>
                    ))}
                  </select>
                  <select 
                    value={anoAtualCal} 
                    onChange={(e) => setAnoAtualCal(Number(e.target.value))}
                    style={{ backgroundColor: '#090a0f', color: '#fff', border: '1px solid #222b45', padding: '8px 12px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', alignItems: 'start' }}>
                
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px' }}>
                    {diasSemana.map((d, i) => (
                      <div key={i} style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#d4af37', padding: '8px 0' }}>{d}</div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                    {Array.from({ length: primeiroDiaMes }).map((_, i) => (
                      <div key={`empty-${i}`} style={{ padding: '20px' }}></div>
                    ))}

                    {Array.from({ length: totalDiasMes }).map((_, i) => {
                      const diaNum = i + 1;
                      const mesFormatado = String(mesAtualCal + 1).padStart(2, '0');
                      const diaFormatado = String(diaNum).padStart(2, '0');
                      const dataStr = `${anoAtualCal}-${mesFormatado}-${diaFormatado}`;

                      const feriadoDia = feriadosPortugal.find(f => f.data === dataStr);
                      const temAgendamento = agendamentos.some(ag => ag.data === dataStr);
                      const isSelecionado = diaSelecionadoCal === dataStr;

                      return (
                        <div 
                          key={diaNum}
                          onClick={() => setDiaSelecionadoCal(dataStr)}
                          style={{ 
                            backgroundColor: isSelecionado ? '#d4af37' : feriadoDia ? 'rgba(239, 68, 68, 0.15)' : temAgendamento ? 'rgba(37, 99, 235, 0.2)' : '#090a0f',
                            border: feriadoDia ? '1px solid rgba(239, 68, 68, 0.5)' : temAgendamento ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid #222b45',
                            borderRadius: '12px',
                            padding: '16px 8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '75px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: isSelecionado ? '#090a0f' : feriadoDia ? '#f87171' : '#fff' }}>{diaNum}</span>
                          
                          {feriadoDia && (
                            <span style={{ fontSize: '10px', color: '#f87171', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{feriadoDia.nome}</span>
                          )}

                          {temAgendamento && !feriadoDia && (
                            <span style={{ width: '6px', height: '6px', backgroundColor: '#60a5fa', borderRadius: '50%', marginTop: '4px' }}></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>
                    📅 Marcações para {diaSelecionadoCal}
                  </h3>

                  {feriadosPortugal.find(f => f.data === diaSelecionadoCal) && (
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '8px', color: '#f87171', fontSize: '14px', fontWeight: 'bold' }}>
                      🇵🇹 Feriado: {feriadosPortugal.find(f => f.data === diaSelecionadoCal)?.nome}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                    {agendamentos.filter(ag => ag.data === diaSelecionadoCal).length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '15px', fontStyle: 'italic', margin: '20px 0', textAlign: 'center' }}>Nenhum agendamento ou orçamento para este dia.</p>
                    ) : (
                      agendamentos
                        .filter(ag => ag.data === diaSelecionadoCal)
                        .map(ag => (
                          <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', fontWeight: 'bold', color: ag.tipo === 'Orçamento' ? '#c084fc' : '#60a5fa', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{ag.tipo}</span>
                              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#d4af37' }}>🕒 {ag.hora}</span>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{ag.veiculo} <span style={{ fontSize: '13px', color: '#94a3b8' }}>({ag.matricula})</span></p>
                            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}><b>Cliente:</b> {ag.cliente} {ag.contacto && <span style={{ color: '#94a3b8' }}>• Tel: {ag.contacto}</span>}</p>
                            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}><b>Serviço:</b> {ag.servico}</p>
                          </div>
                        ))
                    )}
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
