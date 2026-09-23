'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  // Dados da Empresa (Personalizados)
  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX PLANILHA - Estética Automotiva',
    nif: '500 123 456',
    morada: 'Av. Principal, nº 100, Lisboa',
    telefone: '+351 912 345 678',
    email: 'geral@carbox.pt'
  });

  // Estados para Filtro de Datas no Painel
  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');

  // Estados dos funcionários
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista / Atendimento', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
  ]);

  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Estados da Agenda & Histórico por Matrícula
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Silva', veiculo: 'BMW', matricula: '00-AA-00', servico: 'Polimento Cerâmico', data: '2026-06-01', status: 'Concluído' },
    { id: 2, cliente: 'Ana Costa', veiculo: 'Audi A4', matricula: '11-BB-11', servico: 'Lavagem Detalhada', data: '2026-06-15', status: 'Agendado' }
  ]);
  const [novoClienteAgend, setNovoClienteAgend] = useState('');
  const [novoVeiculoAgend, setNovoVeiculoAgend] = useState('');
  const [novaMatriculaAgend, setNovaMatriculaAgend] = useState('');
  const [novoServicoAgend, setNovoServicoAgend] = useState('');
  const [novaDataAgend, setNovaDataAgend] = useState('');

  // Estados de Ordens de Serviço (OS) avançadas com Múltiplos Funcionários, Custos e Sinal
  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carlos Silva', 
      veiculo: 'BMW Série 3', 
      matricula: '00-AA-00', 
      servico: 'Polimento de 2 Passos + Cerâmico', 
      observacoes: 'Riscos ligeiros no para-choques traseiro.', 
      funcionariosAtgados: ['João Silva'],
      custosPecas: 45.00, // ex: compra de ceramico / pintura
      valorOriginal: 380.00, 
      desconto: 30.00, 
      valorFinal: 350.00, 
      sinalPago: 100.00,
      contaRecebimentoSinal: 'MB WAY',
      restanteAPagar: 250.00,
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

  // Estados do Financeiro & Faturas IA
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal Serviço BMW (Polimento)', categoria: 'Polimento', tipo: 'receita', valor: 100.00, data: '2026-06-01' },
    { id: 2, descricao: 'Compra de Panos Microfibra & Quimicos', categoria: 'Produtos', tipo: 'despesa', valor: 45.00, data: '2026-06-01' }
  ]);
  const [descTransacao, setDescTransacao] = useState('');
  const [categoriaTransacao, setCategoriaTransacao] = useState('Polimento');
  const [tipoTransacao, setTipoTransacao] = useState<'receita' | 'despesa'>('receita');
  const [valorTransacao, setValorTransacao] = useState('');
  const [dataTransacao, setDataTransacao] = useState('');
  const [aProcessarFoto, setAProcessarFoto] = useState(false);

  // Feriados Oficiais de Portugal
  const feriadosPortugal = [
    { data: '2026-01-01', nome: 'Ano Novo' },
    { data: '2026-04-05', nome: 'Páscoa' },
    { data: '2026-04-25', nome: 'Dia da Liberdade' },
    { data: '2026-05-01', nome: 'Dia do Trabalhador' },
    { data: '2026-06-10', nome: 'Dia de Portugal' },
    { data: '2026-08-15', nome: 'Assunção de Nossa Senhora' },
    { data: '2026-10-05', nome: 'Implantação da República' },
    { data: '2026-11-01', nome: 'Dia de Todos os Santos' },
    { data: '2026-12-01', nome: 'Restauração da Independência' },
    { data: '2026-12-08', nome: 'Imaculada Conceição' },
    { data: '2026-12-25', nome: 'Natal' }
  ];

  const handleOsMatriculaChange = (matriculaInput: string) => {
    const matriculaLimpa = matriculaInput.toUpperCase();
    setOsMatricula(matriculaLimpa);
    const historicoAnterior = ordensServico.find(o => o.matricula.toUpperCase() === matriculaLimpa) || servicosRealizados.find(s => s.matricula.toUpperCase() === matriculaLimpa);
    if (historicoAnterior) {
      setOsCliente(historicoAnterior.cliente);
      setOsVeiculo(historicoAnterior.veiculo);
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
    const novo = {
      id: Date.now(),
      nome: novoFuncNome,
      cargo: novoFuncCargo,
      tipoRemuneracao,
      valorPctOuFixo: Number(valorRemuneracao) || 0
    };
    setFuncionarios([...funcionarios, novo]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const adicionarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoClienteAgend || !novoServicoAgend || !novaDataAgend || !novaMatriculaAgend) return;
    const novo = {
      id: Date.now(),
      cliente: novoClienteAgend,
      veiculo: novoVeiculoAgend || 'Desconhecido',
      matricula: novaMatriculaAgend.toUpperCase(),
      servico: novoServicoAgend,
      data: novaDataAgend,
      status: 'Agendado'
    };
    setServicosRealizados([...servicosRealizados, novo]);
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
      observacoes: osObs || 'Nenhuma observação registada à entrada.',
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

    // Se houve pagamento de sinal, gera entrada automática no livro-caixa
    if (sinal > 0) {
      const novaTrans = {
        id: Date.now(),
        descricao: `Sinal OS #${novaOS.id} (${osCliente} - ${osMatricula}) via ${osContaRecebimento}`,
        categoria: 'Serviço',
        tipo: 'receita' as const,
        valor: sinal,
        data: new Date().toISOString().split('T')[0]
      };
      setTransacoes([novaTrans, ...transacoes]);
    }

    // Se houve custos com peças/pintura, gera despesa automática
    if (custos > 0) {
      const transDespesa = {
        id: Date.now() + 1,
        descricao: `Custos/Peças OS #${novaOS.id} (${osMatricula})`,
        categoria: 'Produtos/Peças',
        tipo: 'despesa' as const,
        valor: custos,
        data: new Date().toISOString().split('T')[0]
      };
      setTransacoes(prev => [transDespesa, ...prev]);
    }

    // Limpar campos
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
  };

  // Atualizar Status Direto na Tabela do Pátio
  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
        // Se mudou para Concluído/Entregue e havia saldo restante a pagar, podemos liquidar automaticamente
        if (novoStatus === 'Pronto / Entregue' && os.restanteAPagar > 0) {
          const saldoRestante = os.restanteAPagar;
          // Registra o restante no caixa
          const transLiquidacao = {
            id: Date.now(),
            descricao: `Liquidação Final OS #${os.id} (${os.cliente})`,
            categoria: 'Serviço',
            tipo: 'receita' as const,
            valor: saldoRestante,
            data: new Date().toISOString().split('T')[0]
          };
          setTransacoes(prev => [transLiquidacao, ...prev]);
          return { ...os, status: novoStatus, sinalPago: os.sinalPago + saldoRestante, restanteAPagar: 0 };
        }
        return { ...os, status: novoStatus };
      }
      return os;
    }));
  };

  // Ficha de OS em PDF Ultra-Profissional (Estilo Corporativo com Dados da Empresa)
  const imprimirFichaOS = (os: any) => {
    const janelaPrint = window.open('', '_blank');
    if (!janelaPrint) return;

    janelaPrint.document.write(`
      <html>
        <head>
          <title>Ordem de Serviço #${os.id} - ${dadosEmpresa.nome}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; padding: 40px; margin: 0; background: #fff; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 25px; }
            .logo h1 { font-size: 20px; color: #1e3a8a; margin: 0; font-weight: 800; letter-spacing: 0.5px; }
            .logo p { font-size: 11px; color: #666; margin: 2px 0 0 0; }
            .os-info { text-align: right; }
            .os-info h2 { font-size: 18px; color: #0f172a; margin: 0; }
            .os-info p { font-size: 12px; color: #555; margin: 3px 0 0 0; }
            
            .section-title { font-size: 13px; text-transform: uppercase; background-color: #f1f5f9; color: #334155; padding: 6px 10px; font-weight: bold; margin-bottom: 10px; border-left: 4px solid #2563eb; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .box { border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin-bottom: 20px; background-color: #f8fafc; }
            .box p { margin: 6px 0; font-size: 13px; color: #334155; }
            .box b { color: #0f172a; }

            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 13px; }
            th { background-color: #f1f5f9; color: #1e293b; font-weight: bold; }

            .totais-box { width: 320px; margin-left: auto; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; background: #f8fafc; margin-bottom: 40px; }
            .totais-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #475569; }
            .totais-final { display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; color: #059669; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 6px; }

            .assinaturas { display: flex; justify-content: space-between; margin-top: 50px; }
            .linha-assinatura { width: 42%; border-top: 1px solid #475569; text-align: center; padding-top: 8px; font-size: 12px; color: #334155; }
            .footer-obs { font-size: 11px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
              <h1>${dadosEmpresa.nome}</h1>
              <p>${dadosEmpresa.morada} • NIF: ${dadosEmpresa.nif}</p>
              <p>Tel: ${dadosEmpresa.telefone} | ${dadosEmpresa.email}</p>
            </div>
            <div class="os-info">
              <h2>ORDEM DE SERVIÇO</h2>
              <p><b>Nº:</b> #${os.id}</p>
              <p><b>Data:</b> ${os.data}</p>
            </div>
          </div>

          <div class="section-title">1. Dados do Cliente e da Viatura</div>
          <div class="grid-2">
            <div class="box">
              <p><b>Cliente:</b> ${os.cliente}</p>
              <p><b>Estado Atual:</b> <span style="color: #2563eb; font-weight: bold;">${os.status}</span></p>
              <p><b>Equipa Atribuída:</b> ${os.funcionariosAtgados?.length > 0 ? os.funcionariosAtgados.join(', ') : 'Nenhum atribuído'}</p>
            </div>
            <div class="box">
              <p><b>Viatura:</b> ${os.veiculo}</p>
              <p><b>Matrícula:</b> <span style="font-size: 15px; font-weight: bold; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${os.matricula}</span></p>
            </div>
          </div>

          <div class="section-title">2. Descrição do Serviço & Condição à Entrada</div>
          <table>
            <thead>
              <tr>
                <th>Serviço Solicitado</th>
                <th>Observações / Danos / Riscos Detetados à Entrada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: bold; color: #1e3a8a; width: 45%;">${os.servico}</td>
                <td style="color: #475569;">${os.observacoes}</td>
              </tr>
            </tbody>
          </table>

          <div class="section-title">3. Resumo Financeiro & Pagamentos</div>
          <div class="totais-box">
            <div class="totais-row">
              <span>Subtotal Serviços:</span>
              <span>${os.valorOriginal.toFixed(2)} €</span>
            </div>
            <div class="totais-row">
              <span>Desconto:</span>
              <span style="color: #dc2626;">-${os.desconto.toFixed(2)} €</span>
            </div>
            <div class="totais-row" style="font-weight: bold; border-top: 1px dashed #cbd5e1; padding-top: 4px;">
              <span>Total Final:</span>
              <span>${os.valorFinal.toFixed(2)} €</span>
            </div>
            <div class="totais-row" style="color: #059669; margin-top: 4px;">
              <span>Sinal Pago (${os.contaRecebimentoSinal}):</span>
              <span>-${os.sinalPago.toFixed(2)} €</span>
            </div>
            <div class="totais-final">
              <span>Restante a Pagar:</span>
              <span style="color: ${os.restanteAPagar > 0 ? '#d97706' : '#059669'};">${os.restanteAPagar.toFixed(2)} €</span>
            </div>
          </div>

          <div class="assinaturas">
            <div class="linha-assinatura">Assinatura do Responsável da Oficina</div>
            <div class="linha-assinatura">Assinatura / Aceitação do Cliente</div>
          </div>

          <div class="footer-obs">
            Documento emitido por ${dadosEmpresa.nome} • Obrigado pela preferência.
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    janelaPrint.document.close();
  };

  const adicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descTransacao || !valorTransacao || !dataTransacao) return;
    const nova = {
      id: Date.now(),
      descricao: descTransacao,
      categoria: categoriaTransacao,
      tipo: tipoTransacao,
      valor: Number(valorTransacao) || 0,
      data: dataTransacao
    };
    setTransacoes([nova, ...transacoes]);
    setDescTransacao('');
    setValorTransacao('');
    setDataTransacao('');
  };

  const removerTransacao = (id: number) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const handleProcessarFotoFatura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAProcessarFoto(true);
    setTimeout(() => {
      setDescTransacao('Fatura Processada (IA): Produtos de Estética');
      setCategoriaTransacao('Produtos/Peças');
      setTipoTransacao('despesa');
      setValorTransacao('42.50');
      setDataTransacao(new Date().toISOString().split('T')[0]);
      setAProcessarFoto(false);
      alert('Fatura/Talão lido com sucesso! Verifique os dados no formulário.');
    }, 1500);
  };

  const exportarRelatorioPDF = () => {
    const transacoesFiltradas = transacoes.filter(t => {
      if (dataInicioFiltro && t.data < dataInicioFiltro) return false;
      if (dataFimFiltro && t.data > dataFimFiltro) return false;
      return true;
    });

    const totalReceitas = transacoesFiltradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoesFiltradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    const balancoFinal = totalReceitas - totalDespesas;

    const periodoTexto = (dataInicioFiltro || dataFimFiltro) 
      ? `Período: ${dataInicioFiltro || 'Início'} até ${dataFimFiltro || 'Hoje'}` 
      : 'Período: Histórico Geral Completo';

    const janelaPrint = window.open('', '_blank');
    if (!janelaPrint) return;

    janelaPrint.document.write(`
      <html>
        <head>
          <title>Relatório Financeiro - ${dadosEmpresa.nome}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #111; padding: 30px; margin: 0; }
            h1 { font-size: 20px; color: #1e3a8a; margin-bottom: 4px; }
            p { font-size: 12px; color: #555; margin-top: 0; }
            .resumo { display: flex; gap: 20px; margin: 20px 0; }
            .card { border: 1px solid #ccc; padding: 15px; border-radius: 6px; flex: 1; }
            .card h3 { margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #555; }
            .card p { margin: 0; font-size: 18px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 12px; }
            th { background-color: #f3f4f6; color: #1f2937; }
            .receita { color: #059669; font-weight: bold; }
            .despesa { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${dadosEmpresa.nome} - RELATÓRIO CONTABILIDADE</h1>
          <p>${periodoTexto} | NIF: ${dadosEmpresa.nif} | Emitido em: ${new Date().toLocaleDateString('pt-PT')}</p>
          
          <div class="resumo">
            <div class="card">
              <h3>Total Receitas</h3>
              <p class="receita">+${totalReceitas.toFixed(2)} €</p>
            </div>
            <div class="card">
              <h3>Total Despesas</h3>
              <p class="despesa">-${totalDespesas.toFixed(2)} €</p>
            </div>
            <div class="card">
              <h3>Balanço Líquido</h3>
              <p>${balancoFinal.toFixed(2)} €</p>
            </div>
          </div>

          <h3>Movimentos Detalhados</h3>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor (€)</th>
              </tr>
            </thead>
            <tbody>
              ${transacoesFiltradas.length === 0 ? `
                <tr><td colspan="5" style="text-align:center; color:#777;">Sem registos no período selecionado.</td></tr>
              ` : transacoesFiltradas.map(t => `
                <tr>
                  <td>${t.data}</td>
                  <td><span class="${t.tipo}">${t.tipo.toUpperCase()}</span></td>
                  <td>${t.categoria}</td>
                  <td>${t.descricao}</td>
                  <td class="${t.tipo}">${t.tipo === 'receita' ? '+' : '-'}${t.valor.toFixed(2)} €</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    janelaPrint.document.close();
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos na Oficina (Pátio)' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'ordem-servico', label: '📋 Ordens de Serviço & Custos' },
    { id: 'agenda', label: '📅 Agenda & Matrículas' },
    { id: 'financeiro', label: '💰 Livro-Caixa & Contabilidade' },
    { id: 'funcionarios', label: '👥 Funcionários & Salários' },
    { id: 'config', label: '⚙️ Dados da Empresa' },
  ];

  // Helper para cor do status em botões coloridos
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Pendente Aprovação':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' };
      case 'Aguardando Peças':
        return { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' };
      case 'Em Execução':
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' };
      case 'Aguardando Pagamento':
        return { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' };
      case 'Pronto / Entregue':
        return { bg: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' };
      default:
        return { bg: '#1e293b', color: '#fff', border: '1px solid #334155' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{dadosEmpresa.nome}</h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>NIF: {dadosEmpresa.nif} • Portugal</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setUser('admin')} style={{ backgroundColor: user === 'admin' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Admin</button>
          <button onClick={() => setUser('funcionario')} style={{ backgroundColor: user === 'funcionario' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Equipa</button>
        </div>
      </header>

      <nav style={{ backgroundColor: '#0f172a', padding: '0 24px', display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '14px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              borderBottom: tab === item.id ? '2px solid #3b82f6' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: tab === item.id ? '#fff' : '#94a3b8',
              whiteSpace: 'nowrap'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '24px', maxWidth: '1280px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* ABA 1: VEÍCULOS NA OFICINA (PÁTIO INTERativo com Status Coloridos) */}
        {tab === 'pateo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>🚗 Veículos presentemente na Oficina (Pátio)</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Altere o status em tempo real com botões coloridos, consulte saldos em falta e equipa encarregue.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {ordensServico.map(os => {
                const styleBadge = getBadgeStyle(os.status);
                return (
                  <div key={os.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 'bold' }}>OS #{os.id}</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '2px 0 0 0' }}>{os.veiculo}</h3>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>Matrícula: <b style={{ color: '#fff', background: '#1e293b', padding: '2px 6px', borderRadius: '4px' }}>{os.matricula}</b></p>
                      </div>
                      
                      {/* Dropdown de status colorido */}
                      <select 
                        value={os.status}
                        onChange={(e) => atualizarStatusOS(os.id, e.target.value)}
                        style={{ 
                          backgroundColor: styleBadge.bg, 
                          color: styleBadge.color, 
                          border: styleBadge.border, 
                          padding: '6px 10px', 
                          borderRadius: '8px', 
                          fontSize: '12px', 
                          fontWeight: 'bold', 
                          cursor: 'pointer' 
                        }}
                      >
                        <option value="Pendente Aprovação" style={{ background: '#0f172a', color: '#f87171' }}>Pendente Aprovação</option>
                        <option value="Aguardando Peças" style={{ background: '#0f172a', color: '#fbbf24' }}>Aguardando Peças</option>
                        <option value="Em Execução" style={{ background: '#0f172a', color: '#60a5fa' }}>Em Execução</option>
                        <option value="Aguardando Pagamento" style={{ background: '#0f172a', color: '#c084fc' }}>Aguardando Pagamento</option>
                        <option value="Pronto / Entregue" style={{ background: '#0f172a', color: '#34d399' }}>Pronto / Entregue</option>
                      </select>
                    </div>

                    <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                      <p style={{ margin: 0, color: '#e2e8f0' }}><b>Cliente:</b> {os.cliente}</p>
                      <p style={{ margin: 0, color: '#e2e8f0' }}><b>Serviço:</b> {os.servico}</p>
                      <p style={{ margin: 0, color: '#94a3b8' }}><b>Equipa:</b> {os.funcionariosAtgados?.length > 0 ? os.funcionariosAtgados.join(', ') : 'Nenhum atribuído'}</p>
                    </div>

                    {/* Resumo Financeiro na OS */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                      <div>
                        <span style={{ color: '#94a3b8' }}>Total: <b>{os.valorFinal.toFixed(2)}€</b></span><br/>
                        <span style={{ color: '#34d399' }}>Sinal ({os.contaRecebimentoSinal}): <b>{os.sinalPago.toFixed(2)}€</b></span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#94a3b8' }}>Restante a Pagar:</span><br/>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: os.restanteAPagar > 0 ? '#f87171' : '#34d399' }}>
                          {os.restanteAPagar.toFixed(2)} €
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                      <button 
                        onClick={() => imprimirFichaOS(os)}
                        style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        🖨️ Imprimir OS Profissional (PDF)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ABA 2: ORDENS DE SERVIÇO & CUSTOS + MÚLTIPLOS FUNCIONÁRIOS */}
        {tab === 'ordem-servico' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Nova Ordem de Serviço (OS) com Custos e Equipa Múltipla</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Atribua vários técnicos, adicione custos de peças/pintura e registe o sinal recebido por conta.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <form onSubmit={criarOrdemServico} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Matrícula (Ex: 00-AA-00)</label>
                    <input 
                      type="text" 
                      placeholder="00-AA-00"
                      value={osMatricula}
                      onChange={(e) => handleOsMatriculaChange(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome do Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Nome do cliente"
                      value={osCliente}
                      onChange={(e) => setOsCliente(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Modelo da Viatura</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Audi A4"
                      value={osVeiculo}
                      onChange={(e) => setOsVeiculo(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Serviço a Executar</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Polimento + Tratamento Cerâmico"
                      value={osServico}
                      onChange={(e) => setOsServico(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  
                  {/* Seleção de Múltiplos Funcionários */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#60a5fa', marginBottom: '6px', fontWeight: 'bold' }}>👥 Técnicos / Funcionários Encarregues:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', backgroundColor: '#1e293b', padding: '10px', borderRadius: '8px' }}>
                      {funcionarios.map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => toggleFuncionarioOS(f.nome)}
                          style={{
                            backgroundColor: osFuncionarios.includes(f.nome) ? '#2563eb' : '#0f172a',
                            color: '#fff',
                            border: '1px solid #334155',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          {osFuncionarios.includes(f.nome) ? '✓ ' : ''}{f.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Observações / Riscos à Entrada</label>
                    <textarea 
                      placeholder="Ex: Risco no para-choques..."
                      value={osObs}
                      onChange={(e) => setOsObs(e.target.value)}
                      rows={2}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor Original (€)</label>
                      <input 
                        type="number" step="0.01" placeholder="0.00"
                        value={osValor} onChange={(e) => setOsValor(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Desconto (€)</label>
                      <input 
                        type="number" step="0.01" placeholder="0.00"
                        value={osDesconto} onChange={(e) => setOsDesconto(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#f87171', marginBottom: '4px', fontWeight: 'bold' }}>Custos (Peças/Pintura) €</label>
                      <input 
                        type="number" step="0.01" placeholder="0.00"
                        value={osCustos} onChange={(e) => setOsCustos(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#34d399', marginBottom: '4px', fontWeight: 'bold' }}>Sinal de Entrada (€)</label>
                      <input 
                        type="number" step="0.01" placeholder="0.00"
                        value={osSinal} onChange={(e) => setOsSinal(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {Number(osSinal) > 0 && (
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#34d399', marginBottom: '4px' }}>Conta / Método de Recebimento do Sinal</label>
                      <select 
                        value={osContaRecebimento}
                        onChange={(e) => setOsContaRecebimento(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="MB WAY">MB WAY</option>
                        <option value="Multibanco">Multibanco (POS)</option>
                        <option value="Transferência Bancária">Transferência Bancária</option>
                        <option value="Dinheiro Caixa">Dinheiro Caixa</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Status Inicial</label>
                    <select 
                      value={osStatus} onChange={(e) => setOsStatus(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    >
                      <option value="Pendente Aprovação">Pendente Aprovação</option>
                      <option value="Aguardando Peças">Aguardando Peças</option>
                      <option value="Em Execução">Em Execução</option>
                      <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                      <option value="Pronto / Entregue">Pronto / Entregue</option>
                    </select>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Criar Ordem de Serviço & Registar Sinal
                  </button>
                </form>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico de OS Registadas</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
                  {ordensServico.map(os => (
                    <div key={os.id} style={{ backgroundColor: '#1e293b', padding: '14px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>OS #{os.id} - {os.cliente}</span>
                        <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backgroundColor: getBadgeStyle(os.status).bg, color: getBadgeStyle(os.status).color, fontWeight: 'bold' }}>
                          {os.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#60a5fa', margin: 0 }}>🚗 {os.veiculo} ({os.matricula})</p>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '2px 0' }}><b>Serviço:</b> {os.servico}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}><b>Técnicos:</b> {os.funcionariosAtgados?.length > 0 ? os.funcionariosAtgados.join(', ') : 'Nenhum'}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', borderTop: '1px solid #334155', paddingTop: '6px', marginTop: '4px' }}>
                        <span>Total: <b>{os.valorFinal.toFixed(2)}€</b> | Custos: <span style={{ color: '#f87171' }}>{os.custosPecas.toFixed(2)}€</span></span>
                        <span style={{ color: '#34d399' }}>Restante: <b>{os.restanteAPagar.toFixed(2)}€</b></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: PAINEL & GRÁFICOS */}
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Painel & Gráficos de Desempenho</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Análise financeira líquida por período.</p>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>📅 Filtrar Período:</span>
                <input 
                  type="date" value={dataInicioFiltro} onChange={(e) => setDataInicioFiltro(e.target.value)}
                  style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                />
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>até</span>
                <input 
                  type="date" value={dataFimFiltro} onChange={(e) => setDataFimFiltro(e.target.value)}
                  style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}
                />
              </div>
            </div>

            {(() => {
              const transacoesFiltradas = transacoes.filter(t => {
                if (dataInicioFiltro && t.data < dataInicioFiltro) return false;
                if (dataFimFiltro && t.data > dataFimFiltro) return false;
                return true;
              });

              const totalReceitas = transacoesFiltradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
              const totalDespesas = transacoesFiltradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
              const balancoPeriodo = totalReceitas - totalDespesas;

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                    <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: balancoPeriodo >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{balancoPeriodo.toFixed(2)} €</p>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Receitas (Sinais + Saldos)</p>
                    <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{totalReceitas.toFixed(2)} €</p>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Despesas & Custos</p>
                    <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{totalDespesas.toFixed(2)} €</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ABA 4: AGENDA & MATRÍCULAS */}
        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Agenda & Feriados Nacionais</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Consulte agendamentos e feriados em Portugal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Novo Agendamento</h3>
                <form onSubmit={adicionarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Matrícula</label>
                    <input 
                      type="text" placeholder="00-AA-00" value={novaMatriculaAgend} onChange={(e) => setNovaMatriculaAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Cliente</label>
                    <input 
                      type="text" placeholder="Nome" value={novoClienteAgend} onChange={(e) => setNovoClienteAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Veículo</label>
                    <input 
                      type="text" placeholder="Modelo" value={novoVeiculoAgend} onChange={(e) => setNovoVeiculoAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Serviço</label>
                    <input 
                      type="text" placeholder="Serviço" value={novoServicoAgend} onChange={(e) => setNovoServicoAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Data</label>
                    <input 
                      type="date" value={novaDataAgend} onChange={(e) => setNovaDataAgend(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Agendar
                  </button>
                </form>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>🇵🇹 Feriados Nacionais de Portugal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                    {feriadosPortugal.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 10px', backgroundColor: '#1e293b', borderRadius: '6px' }}>
                        <span style={{ color: '#fff' }}>{f.nome}</span>
                        <span style={{ color: '#60a5fa' }}>{f.data}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 5: LIVRO-CAIXA & CONTABILIDADE */}
        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Livro-Caixa & Contabilidade</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registo financeiro integrado com sinais e custos de OS.</p>
              </div>

              <button 
                onClick={exportarRelatorioPDF}
                style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                📄 Gerar Relatório Contabilidade (PDF)
              </button>
            </div>

            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico Geral de Caixa</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                {transacoes.map(t => (
                  <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{t.descricao} <span style={{ fontSize: '11px', color: '#60a5fa' }}>[{t.categoria}]</span></p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>📅 {t.data}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: t.tipo === 'receita' ? '#34d399' : '#f87171' }}>
                        {t.tipo === 'receita' ? '+' : '-'}{t.valor.toFixed(2)} €
                      </span>
                      <button onClick={() => removerTransacao(t.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                        ✕
                      </button>
                    </div>
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
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Gestão de Funcionários & Salários</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Controlo de equipa com remuneração fixa ou comissões.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Adicionar Funcionário</h3>
                <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome</label>
                    <input 
                      type="text" placeholder="Nome" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Cargo</label>
                    <input 
                      type="text" placeholder="Cargo" value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Tipo</label>
                      <select 
                        value={tipoRemuneracao} onChange={(e) => setTipoRemuneracao(e.target.value as 'comissao' | 'fixo')}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="comissao">Comissão (%)</option>
                        <option value="fixo">Salário Fixo (€)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Valor</label>
                      <input 
                        type="number" value={valorRemuneracao} onChange={(e) => setValorRemuneracao(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                    Guardar
                  </button>
                </form>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Equipa Registada</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                  {funcionarios.map(f => (
                    <div key={f.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{f.nome} ({f.cargo})</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          {f.tipoRemuneracao === 'fixo' ? `Salário Fixo: ${f.valorPctOuFixo} €` : `Comissão: ${f.valorPctOuFixo}%`}
                        </p>
                      </div>
                      <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 7: CONFIGURAÇÕES / DADOS DA EMPRESA */}
        {tab === 'config' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>⚙️ Configuração dos Dados da Empresa</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Estes dados saem no cabeçalho de todas as Fichas de OS e relatórios PDF.</p>
            </div>

            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Nome Comercial da Empresa</label>
                <input 
                  type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>NIF</label>
                  <input 
                    type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Telefone</label>
                  <input 
                    type="text" value={dadosEmpresa.telefone} onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Morada</label>
                <input 
                  type="text" value={dadosEmpresa.morada} onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Email</label>
                <input 
                  type="text" value={dadosEmpresa.email} onChange={(e) => setDadosEmpresa({...dadosEmpresa, email: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#34d399', margin: '4px 0 0 0' }}>✓ As alterações são aplicadas instantaneamente aos PDFs impressos.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
