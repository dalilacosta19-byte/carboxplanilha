'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
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

  // Lista dinâmica de Serviços (Com desconto percentual individual)
  const [osItensServicos, setOsItensServicos] = useState<Array<{ id: number; descricao: string; valorBase: number; valorComIva: number; descontoPct: number; comIva: boolean }>>([
    { id: 1, descricao: 'Limpeza Detalhada & Polimento', valorBase: 350, valorComIva: 430.50, descontoPct: 0, comIva: true }
  ]);
  const [novoServDesc, setNovoServDesc] = useState('');
  const [novoServValor, setNovoServValor] = useState('');
  const [novoServDescontoPct, setNovoServDescontoPct] = useState('0');
  const [novoServComIva, setNovoServComIva] = useState(true);

  // Gastos
  const [osGastos, setOsGastos] = useState<Array<{ id: number; tipo: string; descricao: string; valor: number }>>([]);
  const [novoGastoTipo, setNovoGastoTipo] = useState('Pintor');
  const [novoGastoDesc, setNovoGastoDesc] = useState('');
  const [novoGastoValor, setNovoGastoValor] = useState('');

  const [ordensServico, setOrdensServico] = useState([
    { 
      id: 101, 
      cliente: 'Carla Monteiro', 
      contacto: '922 333 444',
      contacto2: '911 222 333',
      veiculo: 'Renault Captur', 
      matricula: 'AZ-91-GI', 
      servicos: [{ descricao: 'Limpeza Detalhada & Polimento', valor: 430.50, descontoPct: 0, valorFinal: 430.50 }],
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

  // Funções de Pátio
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

  // Adicionar Despesa
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
    const descPct = Number(novoServDescontoPct) || 0;
    const valComIva = novoServComIva ? val * 1.23 : val;

    setOsItensServicos([
      ...osItensServicos,
      { id: Date.now(), descricao: novoServDesc, valorBase: val, valorComIva: valComIva, descontoPct: descPct, comIva: novoServComIva }
    ]);
    setNovoServDesc('');
    setNovoServValor('');
    setNovoServDescontoPct('0');
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

    // Cálculo considerando o desconto percentual em cada serviço
    const servicosMapeados = osItensServicos.map(item => {
      const valorComDescontoItem = item.valorComIva * (1 - (item.descontoPct || 0) / 100);
      return {
        descricao: item.descricao,
        valor: item.valorComIva,
        descontoPct: item.descontoPct,
        valorFinal: Math.max(0, valorComDescontoItem)
      };
    });

    const somaBruta = osItensServicos.reduce((acc, item) => acc + item.valorComIva, 0);
    const somaFinalServicos = servicosMapeados.reduce((acc, s) => acc + s.valorFinal, 0);
    const descPctGlobal = Number(osDescontoPct) || 0;
    const valorComDescontoGlobal = somaFinalServicos * (1 - descPctGlobal / 100);
    const descontoTotal = somaBruta - valorComDescontoGlobal;
    const valorFinal = Math.max(0, valorComDescontoGlobal);
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinal - sinal);

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
        profissionais: [],
        valorTotalBruto: somaBruta,
        descontoTotal: descontoTotal,
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
    setOsItensServicos([{ id: Date.now(), descricao: 'Limpeza Detalhada', valorBase: 250, valorComIva: 307.5, descontoPct: 0, comIva: true }]);
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>🚗 Veículos no Pátio</h2>
                <input
                  type="text"
                  placeholder="Pesquisar por matrícula ou cliente..."
                  value={pesquisaPatio}
                  onChange={e => setPesquisaPatio(e.target.value)}
                  style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '8px', padding: '10px 16px', color: '#fff', width: '300px' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                {ordensServico
                  .filter(os => os.matricula.toLowerCase().includes(pesquisaPatio.toLowerCase()) || os.cliente.toLowerCase().includes(pesquisaPatio.toLowerCase()))
                  .map(os => (
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
                        <p style={{ margin: '2px 0' }}>💳 <strong>Restante:</strong> {os.restanteAPagar.toFixed(2)}€</p>
                      </div>

                      {/* Pagamento e Ações Rápidas */}
                      <div style={{ borderTop: '1px solid #222b45', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#cbd5e1' }}>Forma Pagamento Final:</span>
                          <select
                            value={os.formaPagamentoFinal}
                            onChange={e => alterarFormaPagamentoOS(os.id, e.target.value)}
                            style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '6px', color: '#fff', padding: '4px 8px', fontSize: '13px' }}
                          >
                            <option value="MBWay">MBWay</option>
                            <option value="Multibanco">Multibanco</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Transferência">Transferência</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                        <button onClick={() => alterarEstadoOS(os.id, os.status === 'Em Execução' ? 'Pago / Concluído' : 'Em Execução')} style={{ flex: 1, backgroundColor: os.status === 'Em Execução' ? '#22c55e' : '#d4af37', color: '#090a0f', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          {os.status === 'Em Execução' ? '✅ Concluir / Pagar' : '🔄 Reabrir'}
                        </button>
                        <button onClick={() => enviarWhatsApp(os.cliente, os.veiculo, os.matricula, os.contacto)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          💬 WhatsApp
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: OPERACIONAL (OS / ORÇAMENTO / AGENDAMENTO) */}
          {tab === 'operacional' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid #222b45', paddingBottom: '16px' }}>
                <button onClick={() => setSubAbaOperacional('os')} style={{ backgroundColor: subAbaOperacional === 'os' ? '#d4af37' : '#1f293d', color: subAbaOperacional === 'os' ? '#090a0f' : '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Emitir Ordem de Serviço (OS)</button>
                <button onClick={() => setSubAbaOperacional('orcamento')} style={{ backgroundColor: subAbaOperacional === 'orcamento' ? '#d4af37' : '#1f293d', color: subAbaOperacional === 'orcamento' ? '#090a0f' : '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Gerar Orçamento</button>
                <button onClick={() => setSubAbaOperacional('agendamento')} style={{ backgroundColor: subAbaOperacional === 'agendamento' ? '#d4af37' : '#1f293d', color: subAbaOperacional === 'agendamento' ? '#090a0f' : '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Novo Agendamento</button>
              </div>

              {subAbaOperacional === 'agendamento' ? (
                <form onSubmit={criarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', color: '#d4af37' }}>📅 Novo Agendamento / Avaliação</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Nome do Cliente</label>
                      <input type="text" list="clientesList" value={agClient} onChange={e => selecionarClienteInteligente(e.target.value, 'ag')} placeholder="Nome completo" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Telemóvel Principal</label>
                      <input type="text" value={agTel1} onChange={e => setAgTel1(e.target.value)} placeholder="912345678" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Viatura (Marca / Modelo)</label>
                      <input type="text" value={agVeiculo} onChange={e => setAgVeiculo(e.target.value)} placeholder="Ex: BMW Série 3" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Matrícula</label>
                      <input type="text" value={agMatricula} onChange={e => setAgMatricula(e.target.value)} placeholder="00-AA-00" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Data do Agendamento</label>
                      <input type="date" value={agData} onChange={e => setAgData(e.target.value)} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Serviço / Nota</label>
                      <input type="text" value={agServico} onChange={e => setAgServico(e.target.value)} placeholder="Ex: Polimento & PPF" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>Salvar Agendamento</button>
                </form>
              ) : (
                <form onSubmit={criarOS} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '20px', color: '#d4af37' }}>{subAbaOperacional === 'os' ? '📋 Emitir Ordem de Serviço (OS)' : '📄 Gerar Orçamento'}</h3>
                  
                  <datalist id="clientesList">
                    {listaClientesUnicos.map((c, idx) => <option key={idx} value={c} />)}
                  </datalist>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Cliente</label>
                      <input type="text" list="clientesList" value={osCliente} onChange={e => selecionarClienteInteligente(e.target.value, 'os')} placeholder="Nome do cliente" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Telemóvel</label>
                      <input type="text" value={osTel1} onChange={e => setOsTel1(e.target.value)} placeholder="912345678" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Matrícula</label>
                      <input type="text" value={osMatricula} onChange={e => setOsMatricula(e.target.value)} placeholder="00-AA-00" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Viatura</label>
                      <input type="text" value={osVeiculo} onChange={e => setOsVeiculo(e.target.value)} placeholder="Ex: Porsche 911" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Data de Entrega</label>
                      <input type="date" value={osDataEntrega} onChange={e => setOsDataEntrega(e.target.value)} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Sinal Inicial (€)</label>
                      <input type="number" value={osSinal} onChange={e => setOsSinal(e.target.value)} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                    </div>
                  </div>

                  {/* SECÇÃO DE SERVIÇOS COM DESCONTO PERCENTUAL INDIVIDUAL */}
                  <div style={{ backgroundColor: '#1f293d', padding: '18px', borderRadius: '12px', marginTop: '10px' }}>
                    <h4 style={{ color: '#d4af37', marginBottom: '12px', fontSize: '16px' }}>🛠️ Serviços e Desconto Percentual</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', marginBottom: '12px' }}>
                      <input type="text" value={novoServDesc} onChange={e => setNovoServDesc(e.target.value)} placeholder="Descrição do serviço" style={{ backgroundColor: '#131722', border: '1px solid #334155', borderRadius: '6px', padding: '10px', color: '#fff' }} />
                      <input type="number" value={novoServValor} onChange={e => setNovoServValor(e.target.value)} placeholder="Valor Base (€)" style={{ backgroundColor: '#131722', border: '1px solid #334155', borderRadius: '6px', padding: '10px', color: '#fff' }} />
                      <input type="number" value={novoServDescontoPct} onChange={e => setNovoServDescontoPct(e.target.value)} placeholder="Desconto (%)" style={{ backgroundColor: '#131722', border: '1px solid #334155', borderRadius: '6px', padding: '10px', color: '#fff' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1', fontSize: '14px' }}>
                        <input type="checkbox" checked={novoServComIva} onChange={e => setNovoServComIva(e.target.checked)} /> +IVA 23%
                      </div>
                      <button type="button" onClick={adicionarServicoOS} style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar</button>
                    </div>

                    {osItensServicos.map(item => {
                      const valorComDesconto = item.valorComIva * (1 - (item.descontoPct || 0) / 100);
                      return (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#131722', padding: '10px 14px', borderRadius: '6px', marginBottom: '6px', fontSize: '14px' }}>
                          <span>{item.descricao} — Base: {item.valorBase.toFixed(2)}€ {item.comIva ? '(c/ IVA)' : ''} | Desconto: {item.descontoPct}%</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <strong style={{ color: '#22c55e' }}>{valorComDesconto.toFixed(2)}€</strong>
                            <button type="button" onClick={() => removerServicoOS(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
                    {subAbaOperacional === 'os' ? 'Emitir Ordem de Serviço' : 'Salvar Orçamento'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* OUTRAS ABAS (HISTÓRICO, MÉTRICAS, DESPESAS, AGENDA, LIVRO-CAIXA, FUNCIONÁRIOS, STOCK, CONFIG) */}
          {tab === 'historico' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📜 Histórico & Orçamentos</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orcamentos.map(orc => (
                  <div key={orc.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#d4af37', margin: '0 0 6px 0' }}>Orçamento #{orc.id} - {orc.cliente} ({orc.veiculo} / {orc.matricula})</h4>
                      <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Valor Total: {orc.valorFinal.toFixed(2)}€ | Data: {orc.data}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => imprimirOrcamento(orc)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️️ Imprimir</button>
                      <button onClick={() => enviarWhatsAppOrcamento(orc)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💬 WhatsApp</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'metricas' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📊 Painel & Gráficos</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>Faturamento Total (OS)</h4>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>
                    {ordensServico.reduce((acc, os) => acc + os.valorFinal, 0).toFixed(2)}€
                  </p>
                </div>
                <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>Total de Despesas</h4>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                    {despesas.reduce((acc, d) => acc + d.valor, 0).toFixed(2)}€
                  </p>
                </div>
                <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>Veículos no Pátio</h4>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>
                    {ordensServico.filter(os => os.status === 'Em Execução').length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === 'despesas' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📉 Despesas & Custos</h2>
              <form onSubmit={adicionarDespesa} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Tipo</label>
                  <select value={novaDespTipo} onChange={e => setNovaDespTipo(e.target.value as any)} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }}>
                    <option value="Fixa">Fixa</option>
                    <option value="Variável">Variável</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Categoria</label>
                  <input type="text" value={novaDespCat} onChange={e => setNovaDespCat(e.target.value)} placeholder="Ex: Aluguel, Materiais" style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Descrição</label>
                  <input type="text" value={novaDespDesc} onChange={e => setNovaDespDesc(e.target.value)} placeholder="Descrição da despesa" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Valor (€)</label>
                  <input type="number" value={novaDespVal} onChange={e => setNovaDespVal(e.target.value)} placeholder="0.00" required style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Registar Despesa</button>
                </div>
              </form>

              <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '15px' }}>Lista de Despesas Registadas</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {despesas.map(d => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1f293d', padding: '14px 18px', borderRadius: '8px', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{d.descricao}</strong> ({d.categoria}) - <span style={{ color: '#94a3b8' }}>{d.data}</span>
                    </div>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>-{d.valor.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'agenda' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>🗓️ Calendário & Agenda</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => mudarMes(-1)} style={{ backgroundColor: '#1f293d', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}>◀ Anterior</button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{nomesMeses[mesCalendario]} {anoCalendario}</span>
                  <button onClick={() => mudarMes(1)} style={{ backgroundColor: '#1f293d', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}>Seguinte ▶</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontWeight: 'bold', color: '#d4af37', padding: '8px' }}>{d}</div>
                ))}
                {Array.from({ length: primeiroDiaMes }).map((_, i) => <div key={`vazio-${i}`} />)}
                {Array.from({ length: totalDiasMes }).map((_, i) => {
                  const dia = i + 1;
                  const dataStr = `${anoCalendario}-${String(mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                  const agsDoDia = agendamentos.filter(a => a.data === dataStr);

                  return (
                    <div key={dia} onClick={() => setDiaSelecionado(dataStr)} style={{ backgroundColor: '#1f293d', border: diaSelecionado === dataStr ? '2px solid #d4af37' : '1px solid #334155', borderRadius: '8px', minHeight: '90px', padding: '8px', cursor: 'pointer' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{dia}</div>
                      {agsDoDia.map(a => (
                        <div key={a.id} onClick={(e) => { e.stopPropagation(); converterParaOS(a); }} style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', fontSize: '11px', padding: '2px 4px', borderRadius: '4px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Clique para converter em OS">
                          {a.hora} - {a.cliente}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'financeiro' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>💰 Livro-Caixa & Transações</h2>
              <form onSubmit={adicionarTransacaoManual} style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
                <input type="text" value={novaTransDesc} onChange={e => setNovaTransDesc(e.target.value)} placeholder="Descrição da receita extra" required style={{ flex: 1, backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <input type="number" value={novaTransVal} onChange={e => setNovaTransVal(e.target.value)} placeholder="Valor (€)" required style={{ width: '150px', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar Receita</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {transacoes.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1f293d', padding: '14px 18px', borderRadius: '8px', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{t.descricao}</strong> - <span style={{ color: '#94a3b8' }}>{t.data}</span>
                    </div>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>+{t.valor.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'funcionarios' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>👥 Funcionários & Salários</h2>
              <form onSubmit={adicionarFuncionario} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                <input type="text" value={novoFuncNome} onChange={e => setNovoFuncNome(e.target.value)} placeholder="Nome do Funcionário" required style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <select value={tipoRemuneracao} onChange={e => setTipoRemuneracao(e.target.value as any)} style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }}>
                  <option value="comissao">Comissão (%)</option>
                  <option value="fixo">Salário Fixo (€)</option>
                  <option value="diaria">Diária (€)</option>
                </select>
                <input type="number" value={valorRemuneracao} onChange={e => setValorRemuneracao(e.target.value)} placeholder="Valor ou %" required style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <div style={{ gridColumn: 'span 3' }}>
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar Funcionário</button>
                </div>
              </form>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {funcionarios.map(f => (
                  <div key={f.id} style={{ backgroundColor: '#1f293d', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h4 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '18px' }}>{f.nome}</h4>
                    <p style={{ color: '#94a3b8', margin: '4px 0', fontSize: '14px' }}>Tipo: {f.tipoRemuneracao} ({f.valorPctOuFixo}{f.tipoRemuneracao === 'comissao' ? '%' : '€'})</p>
                    <p style={{ color: '#94a3b8', margin: '4px 0', fontSize: '14px' }}>Adiantamento: {(f.adiantamento || 0).toFixed(2)}€</p>
                    <button onClick={() => removerFuncionario(f.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>Remover</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'stock' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📦 Controlo de Stock</h2>
              <form onSubmit={adicionarStock} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                <input type="text" value={novoStockNome} onChange={e => setNovoStockNome(e.target.value)} placeholder="Nome do Produto" required style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <input type="number" value={novoStockQtd} onChange={e => setNovoStockQtd(e.target.value)} placeholder="Quantidade" required style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <input type="number" value={novoStockCusto} onChange={e => setNovoStockCusto(e.target.value)} placeholder="Custo Unitário (€)" required style={{ backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                <div style={{ gridColumn: 'span 3' }}>
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar ao Stock</button>
                </div>
              </form>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {stock.map(s => (
                  <div key={s.id} style={{ backgroundColor: '#1f293d', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h4 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '18px' }}>{s.nome}</h4>
                    <p style={{ color: '#94a3b8', margin: '4px 0', fontSize: '14px' }}>Quantidade: {s.qtd}</p>
                    <p style={{ color: '#94a3b8', margin: '4px 0', fontSize: '14px' }}>Custo Unitário: {s.custoUnitario.toFixed(2)}€</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'config' && (
            <div style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '16px', padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>⚙️ Configurações da Empresa</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Nome da Empresa</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={e => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>NIF</label>
                  <input type="text" value={dadosEmpresa.nif} onChange={e => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>Morada</label>
                  <input type="text" value={dadosEmpresa.morada} onChange={e => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})} style={{ width: '100%', backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
