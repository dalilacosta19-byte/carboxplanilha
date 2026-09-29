'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [pesquisaPatio, setPesquisaPatio] = useState('');
  const [pesquisaHistorico, setPesquisaHistorico] = useState('');
  
  const [user, setUser] = useState('admin');
  const [subAbaOperacional, setSubAbaOperacional] = useState<'agendamento' | 'orcamento' | 'os'>('os');
  const [novoServicoDescricao, setNovoServicoDescricao] = useState('');
  const [novoServicoValor, setNovoServicoValor] = useState('');
  const [novoServicoDesconto, setNovoServicoDesconto] = useState('');
  const [novoServicoTecnico, setNovoServicoTecnico] = useState('');
  
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

  // Estados para Adicionar Gasto Rápido no Pátio
  const [osAdicionandoGastoId, setOsAdicionandoGastoId] = useState<number | null>(null);
  const [gastoTipoInput, setGastoTipoInput] = useState('Pintor');
  const [gastoDescInput, setGastoDescInput] = useState('');
  const [gastoValorInput, setGastoValorInput] = useState('');

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

  // Despesas Fixas e Variáveis da Empresa
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

  const [novoFuncNome, setNovoFuncNome] = useState('');
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
      servicoAgendado: 'Limpeza Detalhada & Polimento',
      notasAvaliacao: 'Avaliação inicial do estado da pintura e proteções.', 
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
  const [agTipo, setAgTipo] = useState('Avaliação');
  
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

  // Lista dinâmica de Serviços
  const [osItensServicos, setOsItensServicos] = useState<Array<{ id: number; descricao: string; valorBase: number; valorComIva: number; desconto: number; comIva: boolean }>>([
    { id: 1, descricao: 'Limpeza Detalhada & Polimento', valorBase: 350, valorComIva: 430.50, desconto: 0, comIva: true }
  ]);
  const [novoServDesc, setNovoServDesc] = useState('');
  const [novoServValor, setNovoServValor] = useState('');
  const [novoServDesconto, setNovoServDesconto] = useState('0');
  const [novoServComIva, setNovoServComIva] = useState(true);

  // Gastos e Profissionais
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

  // Funções para alterar estado e forma de pagamento diretamente no Pátio
  const alterarEstadoOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
        const atualizada = { ...os, status: novoStatus };
        if (novoStatus === 'Pago / Concluído') {
          setTransacoes(prev => [
            { id: Date.now(), descricao: `Pagamento Final OS #${os.id} (${os.matricula}) - ${os.formaPagamentoFinal}`, matricula: os.matricula, categoria: 'Serviço', tipo: 'receita', valor: os.restanteAPagar, data: new Date().toISOString().split('T')[0] },
            ...prev
          ]);
        }
        return atualizada;
      }
      return os;
    }));
  };

  const alterarFormaPagamentoOS = (id: number, novaForma: string) => {
    setOrdensServico(ordensServico.map(os => os.id === id ? { ...os, formaPagamentoFinal: novaForma } : os));
  };

  const adicionarGastoRapidoNoPatio = (osId: number) => {
    if (!gastoDescInput || !gastoValorInput) return;
    const val = Number(gastoValorInput) || 0;

    setOrdensServico(ordensServico.map(os => {
      if (os.id === osId) {
        const novoGasto = { id: Date.now(), tipo: gastoTipoInput, descricao: gastoDescInput, valor: val };
        return { ...os, gastos: [...(os.gastos || []), novoGasto] };
      }
      return os;
    }));

    setGastoDescInput('');
    setGastoValorInput('');
    setOsAdicionandoGastoId(null);
  };

  const removerGastoDoPatio = (osId: number, gastoId: number) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === osId) {
        return { ...os, gastos: (os.gastos || []).filter(g => g.id !== gastoId) };
      }
      return os;
    }));
  };

  // Adicionar Despesa com suporte a foto/PDF
  const adicionarDespesa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDespDesc || !novaDespVal) return;

    const nova = {
      id: Date.now(),
      tipo: novaDespTipo,
      categoria: novaDespCat,
      descricao: novaDespDesc,
      valor: Number(novaDespVal) || 0,
      data: novaDespData,
      anexoNome: novaDespAnexo || undefined
    };

    setDespesas([nova, ...despesas]);
    setNovaDespDesc('');
    setNovaDespVal('');
    setNovaDespAnexo(null);
    alert('Despesa registada com sucesso!');
  };

  const lidarComFicheiroAnexo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovaDespAnexo(file.name);
    }
  };

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
                            orcamentos.find(o => o.cliente.toLowerCase() === nome.toLowerCase()) ||
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
    ...orcamentos.map(o => o.cliente),
    ...agendamentos.map(a => a.cliente)
  ]));

  const enviarWhatsApp = (cliente: string, veiculo: string, matricula: string, telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${cliente}, informamos que o seu veículo ${veiculo} (${matricula}) na CARBOX77 Detailing está pronto para levantamento. Obrigado!`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  const enviarWhatsAppOrcamento = (orc: any) => {
    const telLimpo = (orc.contacto || '').replace(/\D/g, '');
    const servicosStr = orc.servicos.map((s: any) => `• ${s.descricao}: ${s.valorFinal.toFixed(2)}€`).join('%0A');
    const msg = encodeURIComponent(`🚗 *${dadosEmpresa.nome}*%0A%0AOlá *${orc.cliente}*, segue o orçamento solicitado para a viatura *${orc.veiculo}* (${orc.matricula}):%0A%0A${servicosStr}%0A%0A💰 *VALOR TOTAL:* *${orc.valorFinal.toFixed(2)}€*%0A%0AObrigado pela preferência! Qualquer dúvida estamos ao dispor.`);
    window.open(`https://wa.me/351${telLimpo}?text=${msg}`, '_blank');
  };

  const imprimirOrcamento = (orc: any) => {
    const janelaPrint = window.open('', '_blank', 'width=800,height=600');
    if (!janelaPrint) return;

    const html = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>Orçamento #${orc.id}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #000; padding: 30px; }
          .header { border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; }
          .title { font-size: 24px; font-weight: bold; color: #d4af37; }
          .info { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #f4f4f4; }
          .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; color: #111; }
          .footer { margin-top: 40px; font-size: 12px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">CARBOX77 DETAILING</div>
            <div>${dadosEmpresa.nome}</div>
            <div>NIF: ${dadosEmpresa.nif} | Endereço: ${dadosEmpresa.morada}</div>
          </div>
          <div style="text-align: right;">
            <h2>ORÇAMENTO #${orc.id}</h2>
            <div>Data: ${orc.data}</div>
          </div>
        </div>

        <div class="info">
          <strong>Cliente:</strong> ${orc.cliente} <br/>
          <strong>Telemóvel:</strong> +351 ${orc.contacto} <br/>
          <strong>Viatura:</strong> ${orc.veiculo} (${orc.matricula})
        </div>

        <table>
          <thead>
            <tr>
              <th>Descrição do Serviço</th>
              <th>Valor Total (c/ IVA 23%)</th>
            </tr>
          </thead>
          <tbody>
            ${orc.servicos.map((s: any) => `
              <tr>
                <td>${s.descricao}</td>
                <td>${s.valorFinal.toFixed(2)} €</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total">
          TOTAL A PAGAR: ${orc.valorFinal.toFixed(2)} €
        </div>

        <div class="footer">
          IBAN: ${dadosEmpresa.iban} | SWIFT: ${dadosEmpresa.swift} <br/>
          Processado por programa certificado | Obrigado pela preferência!
        </div>
      </body>
      </html>
    `;
    janelaPrint.document.write(html);
    janelaPrint.document.close();
    janelaPrint.focus();
    setTimeout(() => { janelaPrint.print(); }, 500);
  };

  const adicionarServicoOS = () => {
    if (!novoServDesc || !novoServValor) return;
    const val = Number(novoServValor) || 0;
    const desc = Number(novoServDesconto) || 0;
    const valComIva = novoServComIva ? val * 1.23 : val;

    setOsItensServicos([
      ...osItensServicos,
      { id: Date.now(), descricao: novoServDesc, valorBase: val, valorComIva: valComIva, desconto: desc, comIva: novoServComIva }
    ]);
    setNovoServDesc('');
    setNovoServValor('');
    setNovoServDesconto('0');
  };

  const removerServicoOS = (id: number) => {
    setOsItensServicos(osItensServicos.filter(i => i.id !== id));
  };

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
      servicoAgendado: agServico || 'Limpeza Detalhada',
      notasAvaliacao: agNotas || 'Agendado.',
      data: agData,
      hora: `${agHoraSel}:${agMinSel}`,
      status: 'Agendado'
    };

    setAgendamentos([novo, ...agendamentos]);
    const valSinal = Number(agSinal) || 0;
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
    setAgSinal('0');
    
    alert('Agendamento criado com sucesso!');
    setAgClient(''); setAgTel1(''); setAgTel2(''); setAgVeiculo(''); setAgMatricula(''); setAgServico(''); setAgNotas('');
  };

  const criarOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente || !osMatricula || osItensServicos.length === 0) {
      alert('Preencha o cliente, matrícula e adicione pelo menos um serviço.');
      return;
    }

    const somaBruta = osItensServicos.reduce((acc, item) => acc + item.valorComIva, 0);
    const descPct = Number(osDescontoPct) || 0;
    const valorComDescontoPct = somaBruta * (1 - descPct / 100);
    const descontoTotalItens = osItensServicos.reduce((acc, item) => acc + item.desconto, 0);
    const descontoGlobal = (somaBruta - valorComDescontoPct) + descontoTotalItens;
    const valorFinal = Math.max(0, somaBruta - descontoGlobal);
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);

    const servicosMapeados = osItensServicos.map(item => ({
      descricao: item.descricao,
      valor: item.valorComIva,
      desconto: item.desconto,
      valorFinal: Math.max(0, item.valorComIva - item.desconto)
    }));

    if (subAbaOperacional === 'orcamento') {
      const novoOrc = {
        id: Date.now(),
        cliente: osCliente,
        contacto: osTel1,
        contacto2: osTel2,
        veiculo: osVeiculo || 'Viatura',
        matricula: osMatricula.toUpperCase(),
        servicos: servicosMapeados,
        valorFinal,
        data: new Date().toISOString().split('T')[0]
      };
      setOrcamentos([novoOrc, ...orcamentos]);
      alert('Orçamento gerado com sucesso!');
    } else {
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
        valorTotalBruto: somaBruta,
        descontoTotal: descontoGlobal,
        valorFinal,
        sinalPago: sinal,
        formaPagamentoSinal: osFormaPagamentoSinal,
        restanteAPagar: restante,
        status: 'Em Execução',
        formaPagamentoFinal: 'MBWay',
        data: osDataEntrega
      };
      setOrdensServico([novaOS, ...ordensServico]);
      if (sinal > 0) {
        setTransacoes([{ id: Date.now(), descricao: `Sinal OS #${novaOS.id} (${novaOS.matricula}) - ${osFormaPagamentoSinal}`, matricula: novaOS.matricula, categoria: 'Serviço', tipo: 'receita', valor: sinal, data: novaOS.data }, ...transacoes]);
      }
      alert('Ordem de Serviço emitida com sucesso!');
    }

    setOsCliente(''); setOsTel1(''); setOsTel2(''); setOsVeiculo(''); setOsMatricula(''); setOsSinal('0'); setOsDescontoPct('0');
    setOsItensServicos([{ id: Date.now(), descricao: 'Limpeza Detalhada', valorBase: 250, valorComIva: 307.5, desconto: 0, comIva: true }]);
    setOsGastos([]);
  };

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome) return;
    setFuncionarios([
      ...funcionarios, 
      { 
        id: Date.now(), 
        nome: novoFuncNome, 
        tipoRemuneracao, 
        valorPctOuFixo: Number(valorRemuneracao) || 0, 
        adiantamento: Number(novoFuncAdiantamento) || 0 
      }
    ]);
    setNovoFuncNome(''); setValorRemuneracao('30'); setNovoFuncAdiantamento('0');
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
    { id: 'historico', label: '📜 Histórico & Dossiê' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'operacional', label: '📋 OS / Orçamento / Agendamento' },
    { id: 'despesas', label: '📉 Despesas & Custos' },
    { id: 'agenda', label: '🗓️ Calendário & Agenda' },
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

  const converterParaOS = (agendamento: any) => {
    setOsCliente(agendamento.cliente || '');
    setOsVeiculo(agendamento.veiculo || '');
    setTab('operacional');
    setSubAbaOperacional('os');
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
          
          {/* ABA: VEÍCULOS NO PÁTIO */}
          {tab === 'pateo' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>🚗 Veículos no Pátio</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {ordensServico.map(os => (
                  <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>{os.veiculo}</span>
                      <span style={{ backgroundColor: '#1f293d', color: '#d4af37', padding: '4px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>{os.matricula}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                      <p style={{ margin: '2px 0' }}>👤 <strong>Cliente:</strong> {os.cliente}</p>
                      <p style={{ margin: '2px 0' }}>📞 <strong>Contacto:</strong> {os.contacto}</p>
                      <p style={{ margin: '2px 0' }}>⚙️ <strong>Estado:</strong> <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{os.status}</span></p>
                      <p style={{ margin: '2px 0' }}>💰 <strong>Total:</strong> {os.valorFinal.toFixed(2)}€</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button onClick={() => alterarEstadoOS(os.id, os.status === 'Em Execução' ? 'Pago / Concluído' : 'Em Execução')} style={{ flex: 1, backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {os.status === 'Em Execução' ? 'Concluir' : 'Reabrir'}
                      </button>
                      <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: HISTÓRICO */}
          {tab === 'historico' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📜 Histórico & Dossiê</h2>
              <input 
                type="text" 
                placeholder="Pesquisar por matrícula ou cliente..." 
                value={pesquisaHistorico} 
                onChange={e => setPesquisaHistorico(e.target.value)} 
                style={{ width: '100%', padding: '12px', backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '8px', color: '#fff', marginBottom: '20px', fontSize: '15px' }}
              />
              <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px' }}>
                <p style={{ color: '#94a3b8' }}>Total de registos no histórico: {ordensServico.length}</p>
              </div>
            </div>
          )}

          {/* ABA: MÉTRICAS */}
          {tab === 'metricas' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📊 Painel & Gráficos</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #222b45' }}>
                  <p style={{ color: '#94a3b8', margin: 0 }}>Receitas Totais</p>
                  <h3 style={{ color: '#22c55e', fontSize: '24px', margin: '10px 0 0 0' }}>
                    {transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0).toFixed(2)}€
                  </h3>
                </div>
                <div style={{ backgroundColor: '#131722', padding: '20px', borderRadius: '12px', border: '1px solid #222b45' }}>
                  <p style={{ color: '#94a3b8', margin: 0 }}>Despesas Totais</p>
                  <h3 style={{ color: '#ef4444', fontSize: '24px', margin: '10px 0 0 0' }}>
                    {despesas.reduce((acc, d) => acc + d.valor, 0).toFixed(2)}€
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* ABA: OPERACIONAL */}
          {tab === 'operacional' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📋 OS / Orçamento / Agendamento</h2>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setSubAbaOperacional('os')} style={{ padding: '10px 20px', backgroundColor: subAbaOperacional === 'os' ? '#d4af37' : '#131722', color: subAbaOperacional === 'os' ? '#090a0f' : '#fff', border: '1px solid #222b45', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ordem de Serviço</button>
                <button onClick={() => setSubAbaOperacional('orcamento')} style={{ padding: '10px 20px', backgroundColor: subAbaOperacional === 'orcamento' ? '#d4af37' : '#131722', color: subAbaOperacional === 'orcamento' ? '#090a0f' : '#fff', border: '1px solid #222b45', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Orçamento</button>
                <button onClick={() => setSubAbaOperacional('agendamento')} style={{ padding: '10px 20px', backgroundColor: subAbaOperacional === 'agendamento' ? '#d4af37' : '#131722', color: subAbaOperacional === 'agendamento' ? '#090a0f' : '#fff', border: '1px solid #222b45', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Agendamento</button>
              </div>

              {subAbaOperacional === 'agendamento' ? (
                <form onSubmit={criarAgendamento} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ color: '#d4af37', margin: 0 }}>Novo Agendamento</h3>
                  <input type="text" placeholder="Nome do Cliente" value={agClient} onChange={e => setAgClient(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Telemóvel" value={agTel1} onChange={e => setAgTel1(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Viatura (ex: Renault Captur)" value={agVeiculo} onChange={e => setAgVeiculo(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Matrícula" value={agMatricula} onChange={e => setAgMatricula(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="date" value={agData} onChange={e => setAgData(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Criar Agendamento</button>
                </form>
              ) : (
                <form onSubmit={criarOS} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ color: '#d4af37', margin: 0 }}>{subAbaOperacional === 'orcamento' ? 'Novo Orçamento' : 'Nova Ordem de Serviço'}</h3>
                  <input type="text" placeholder="Nome do Cliente" value={osCliente} onChange={e => setOsCliente(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Telemóvel" value={osTel1} onChange={e => setOsTel1(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Viatura" value={osVeiculo} onChange={e => setOsVeiculo(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <input type="text" placeholder="Matrícula" value={osMatricula} onChange={e => setOsMatricula(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Registar Documento</button>
                </form>
              )}
            </div>
          )}

          {/* ABA: DESPESAS */}
          {tab === 'despesas' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📉 Despesas & Custos</h2>
              <form onSubmit={adicionarDespesa} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                <h3 style={{ color: '#d4af37', margin: 0 }}>Registar Nova Despesa</h3>
                <input type="text" placeholder="Descrição da Despesa" value={novaDespDesc} onChange={e => setNovaDespDesc(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <input type="number" step="0.01" placeholder="Valor (€)" value={novaDespVal} onChange={e => setNovaDespVal(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <input type="date" value={novaDespData} onChange={e => setNovaDespData(e.target.value)} style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Guardar Despesa</button>
              </form>
            </div>
          )}

          {/* ABA: CALENDÁRIO */}
          {tab === 'agenda' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>🗓️ {nomesMeses[mesCalendario]} de {anoCalendario}</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => mudarMes(-1)} style={{ padding: '10px 16px', backgroundColor: '#131722', color: '#fff', border: '1px solid #222b45', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>◀ Mês Anterior</button>
                  <button onClick={() => mudarMes(1)} style={{ padding: '10px 16px', backgroundColor: '#131722', color: '#fff', border: '1px solid #222b45', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Mês Seguinte ▶</button>
                </div>
              </div>
              <div style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45' }}>
                <p style={{ color: '#94a3b8' }}>Total de dias no mês: {totalDiasMes}</p>
              </div>
            </div>
          )}

          {/* ABA: FINANCEIRO */}
          {tab === 'financeiro' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>💰 Livro-Caixa & Relatório Diário</h2>
              <form onSubmit={adicionarTransacaoManual} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                <h3 style={{ color: '#d4af37', margin: 0 }}>Adicionar Receita Manual</h3>
                <input type="text" placeholder="Descrição" value={novaTransDesc} onChange={e => setNovaTransDesc(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <input type="number" step="0.01" placeholder="Valor (€)" value={novaTransVal} onChange={e => setNovaTransVal(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar Receita</button>
              </form>
            </div>
          )}

          {/* ABA: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>👥 Funcionários & Salários</h2>
              <form onSubmit={adicionarFuncionario} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                <h3 style={{ color: '#d4af37', margin: 0 }}>Adicionar Novo Funcionário</h3>
                <input type="text" placeholder="Nome do Funcionário" value={novoFuncNome} onChange={e => setNovoFuncNome(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Guardar Funcionário</button>
              </form>
            </div>
          )}

          {/* ABA: STOCK */}
          {tab === 'stock' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📦 Controlo de Stock</h2>
              <form onSubmit={adicionarStock} style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                <h3 style={{ color: '#d4af37', margin: 0 }}>Adicionar Item ao Stock</h3>
                <input type="text" placeholder="Nome do Produto" value={novoStockNome} onChange={e => setNovoStockNome(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <input type="number" placeholder="Quantidade" value={novoStockQtd} onChange={e => setNovoStockQtd(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <input type="number" step="0.01" placeholder="Custo Unitário (€)" value={novoStockCusto} onChange={e => setNovoStockCusto(e.target.value)} required style={{ padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '8px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar Stock</button>
              </form>
            </div>
          )}

          {/* ABA: CONFIGURAÇÕES / EMPRESA */}
          {tab === 'config' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>⚙️ Dados da Empresa</h2>
              <div style={{ backgroundColor: '#131722', padding: '24px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0 }}><strong>Nome:</strong> {dadosEmpresa.nome}</p>
                <p style={{ margin: 0 }}><strong>NIF:</strong> {dadosEmpresa.nif}</p>
                <p style={{ margin: 0 }}><strong>Morada:</strong> {dadosEmpresa.morada}</p>
                <p style={{ margin: 0 }}><strong>Telefone:</strong> {dadosEmpresa.telefone}</p>
                <p style={{ margin: 0 }}><strong>IBAN:</strong> {dadosEmpresa.iban}</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
