'use client';
import CalculadoraComissao from './CalculadoraComissao';
import { useEffect, useState } from 'react';
import AcessoProtegido from '@/components/auth/AcessoProtegido';
import BotaoBackup from '@/components/auth/BotaoBackup';
import AbaClientes from '@/components/clientes/AbaClientes';
import NovaOSReal from '@/components/os/NovaOSReal';
import PatioReal from '@/components/os/PatioReal';
import { listarClientes, type Cliente } from '@/lib/clientes';

function Painel({ emailUtilizador, onSair }: { emailUtilizador: string; onSair: () => void }) {
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
      // Aqui podes futuramente processar a leitura por IA/OCR se desejado
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

  // Clientes reais do Supabase (para as sugestões na OS e no agendamento).
  const [clientesBD, setClientesBD] = useState<Cliente[]>([]);
  const recarregarClientesBD = () => {
    listarClientes().then(setClientesBD).catch(() => setClientesBD([]));
  };
  useEffect(() => { recarregarClientesBD(); }, []);
  const nomeCompleto = (c: Cliente) => `${c.nome}${c.apelido ? ' ' + c.apelido : ''}`;

  const selecionarClienteInteligente = (nome: string, tipo: 'ag' | 'os') => {
    if (tipo === 'ag') setAgClient(nome);
    if (tipo === 'os') setOsCliente(nome);

    // 1.º procura nos clientes reais do Supabase
    const real = clientesBD.find(c => c.ativo && nomeCompleto(c).toLowerCase() === nome.toLowerCase());
    if (real) {
      const v = real.veiculos[0];
      if (tipo === 'ag') {
        setAgTel1(real.telefone); setAgTel2(real.telefone2 || '');
        setAgVeiculo(v?.modelo || ''); setAgMatricula(v?.matricula || '');
      } else {
        setOsTel1(real.telefone); setOsTel2(real.telefone2 || '');
        setOsVeiculo(v?.modelo || ''); setOsMatricula(v?.matricula || '');
      }
      return;
    }

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
    ...clientesBD.filter(c => c.ativo).map(nomeCompleto),
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
    { id: 'clientes', label: '👤 Clientes & Veículos' },
    
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'operacional', label: '📋 OS / Orçamento / Agendamento' },
    { id: 'despesas', label: '📉 Despesas & Custos' },
    { id: 'agenda', label: '🗓️ Agenda' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BotaoBackup />
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{emailUtilizador}</span>
            <button onClick={onSair} style={{ backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '10px 16px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Sair</button>
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
         {tab === 'historico' && (
  <div>
    <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Histórico & Dossiê de Matrículas</h2>
    <p style={{ fontSize: '17px', color: '#94a3b8', margin: '0 0 16px 0' }}>Consulte o histórico completo de serviços, valores e intervenções anteriores por matrícula:</p>
    
    <input 
      type="text"
      placeholder="🔍 Digite a matrícula (ex: AZ-91-GI) ou nome do cliente para ver o dossiê..."
      value={pesquisaHistorico}
      onChange={(e) => setPesquisaHistorico(e.target.value)}
      style={{
        width: '100%',
        maxWidth: '450px',
        padding: '12px 16px',
        backgroundColor: '#131722',
        border: '1px solid #222b45',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        marginBottom: '20px'
      }}
    />

    {pesquisaHistorico.trim() === '' ? (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', backgroundColor: '#131722', borderRadius: '12px', border: '1px solid #222b45' }}>
        Digite uma matrícula na caixa acima para consultar o histórico completo de visitas do veículo.
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {(() => {
          const termo = pesquisaHistorico.toLowerCase().trim();
          const termoLimpo = termo.replace(/[^a-z0-9]/g, '');
          const resultados = ordensServico.filter(os => {
            const matLimpa = (os.matricula || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const clienteLower = (os.cliente || '').toLowerCase();
            return (termoLimpo && matLimpa.includes(termoLimpo)) || (termo && clienteLower.includes(termo));
          });

          if (resultados.length === 0) {
            return (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', backgroundColor: '#131722', borderRadius: '12px', border: '1px solid #222b45' }}>
                Nenhum registo encontrado para esta pesquisa.
              </div>
            );
          }

          return resultados.map(os => (
            <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '12px', padding: '20px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #222b45', paddingBottom: '10px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8' }}>🚗 {os.matricula} — {os.veiculo}</span>
                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', backgroundColor: os.status === 'Pago / Concluído' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: os.status === 'Pago / Concluído' ? '#4ade80' : '#facc15' }}>
                  {os.status}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '14px', color: '#94a3b8' }}>
                <div>👤 <b>Cliente:</b> {os.cliente}</div>
                <div>📞 <b>Telemóvel:</b> {os.contacto}</div>
                <div>🛠️ <b>Serviço:</b> {os.servicos ? os.servicos.map(s => s.descricao).join(', ') : 'Serviço Geral'}</div>
                <div>👨‍🔧 <b>Técnico:</b> Equipa CARBOX77</div>
                <div>📅 <b>Data:</b> {os.data}</div>
                <div>💰 <b>Total:</b> {os.servicos ? os.servicos.reduce((acc, s) => acc + (s.valorFinal || 0), 0) : 0}€</div>
              </div>
            </div>
          ));
        })()}
      </div>
    )}
  </div>
)}
          
    
          
          {tab === 'clientes' && <AbaClientes onAlterado={recarregarClientesBD} />}

          {tab === 'pateo' && <PatioReal onNovaOS={() => { setTab('operacional'); setSubAbaOperacional('os'); }} />}

          {/* ABA 2: MÉTRICAS */}
          {tab === 'metricas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Painel & Gráficos</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Balanço financeiro global.</p>
              </div>

              {(() => {
                const rec = transacoes.filter(t => t.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
                const totalDesp = despesas.reduce((a, b) => a + b.valor, 0);
                const liquido = rec - totalDesp;
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0' }}>LÍQUIDI REAL</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: liquido >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liquido.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0' }}>TOTAL RECEITAS</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                      <p style={{ color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0' }}>TOTAL DESPESAS</p>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f87171', margin: 0 }}>-{totalDesp.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: OPERACIONAL */}
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
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>📅 Novo Agendamento </h3>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
  <label style={{ fontSize: '15px', color: '#cbd5e1' }}>Tipo de Marcação</label>
  <select 
    value={agTipo} 
    onChange={e => setAgTipo(e.target.value)} 
    style={{ padding: '12px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px', width: '100%' }}
  >
    <option value="Avaliação">Avaliação</option>
    <option value="Serviço">Serviço</option>
  </select>
</div>
                    
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
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Serviço Pretendido</label>
                    <input type="text" value={agServico} onChange={(e) => setAgServico(e.target.value)} placeholder="Ex: Limpeza Detalhada, Polimento, PPF..." style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '15px', color: '#cbd5e1' }}>Valor do Sinal (€)</label>
    <input 
      type="number" 
      placeholder="0.00" 
      value={agSinal} 
      onChange={e => setAgSinal(e.target.value)} 
      style={{ padding: '12px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px', width: '100%' }} 
    />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '15px', color: '#cbd5e1' }}>Conta / Método do Sinal</label>
    <select 
      value={agContaSinal} 
      onChange={e => setAgContaSinal(e.target.value)} 
      style={{ padding: '12px', backgroundColor: '#07080c', border: '1px solid #222b45', color: '#fff', borderRadius: '8px', width: '100%' }}
    >
      <option value="MBWay">MBWay</option>
      <option value="Transferência Bancária">Transferência Bancária</option>
      <option value="Dinheiro / Caixa">Dinheiro / Caixa</option>
      <option value="Multibanco / TPA">Multibanco / TPA</option>
    </select>
  </div>
</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Data *</label>
                      <input type="date" required value={agData} onChange={(e) => setAgData(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', cursor: 'pointer', colorScheme: 'dark' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Hora e Minutos *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <select value={agHoraSel} onChange={(e) => setAgHoraSel(e.target.value)} style={{ padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}>
                          {['08','09','10','11','12','13','14','15','16','17','18','19','20'].map(h => <option key={h} value={h}>{h}h</option>)}
                        </select>
                        <select value={agMinSel} onChange={(e) => setAgMinSel(e.target.value)} style={{ padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px' }}>
                          {['00','15','30','45'].map(m => <option key={m} value={m}>{m}m</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer' }}>Guardar Agendamento</button>
                </form>
              )}

              {subAbaOperacional === 'os' && <NovaOSReal onCriada={() => setTab('pateo')} />}

              {/* O formulário antigo fica só para Orçamento (a OS agora usa o NovaOSReal acima) */}
              {['orcamento'].includes(subAbaOperacional) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <form onSubmit={criarOS} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>
                      {subAbaOperacional === 'os' ? '📋 Emitir Ordem de Serviço (OS)' : '📑 Emitir Orçamento'}
                    </h3>

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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: subAbaOperacional === 'os' ? '1fr 1fr' : '1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Viatura</label>
                        <input type="text" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} placeholder="Renault Captur" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                      </div>
                      {subAbaOperacional === 'os' && (
                        <div>
                          <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Data de Entrega Prevista *</label>
                          <input type="date" required value={osDataEntrega} onChange={(e) => setOsDataEntrega(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', cursor: 'pointer', colorScheme: 'dark' }} />
                        </div>
                      )}
                    </div>

                    <div style={{ backgroundColor: '#131722', padding: '18px', borderRadius: '14px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <h4 style={{ fontSize: '17px', color: '#d4af37', margin: 0 }}>🛠️ Serviços Incluídos</h4>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {osItensServicos.map((item, idx) => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1f293d' }}>
                            <span style={{ color: '#fff' }}>
                              <b>{idx + 1}.</b> {item.descricao} — <b>{item.valorComIva.toFixed(2)}€</b> {item.comIva ? '(c/ IVA 23%)' : '(s/ IVA)'} {item.desconto > 0 ? `| Desc: -${item.desconto}€` : ''}
                            </span>
                            <button type="button" onClick={() => removerServicoOS(item.id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Remover</button>
                          </div>
                        ))}
                      </div>
                      {/* Sugestões Inteligentes de Serviços Anteriores */}
<datalist id="sugestoes-servicos">
  {Array.from(new Set(ordensServico.flatMap(o => (o.servicos || []).map(s => s.descricao)))).map((desc, i) => (
    <option key={i} value={desc} />
  ))}
  <option value="Limpeza Detalhada" />
  <option value="Polimento" />
  <option value="Lavagem Completa" />
  <option value="Proteção Cerâmica" />
</datalist>

<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1.5fr auto', gap: '10px', alignItems: 'center' }}>
  <input 
    type="text" 
    list="sugestoes-servicos"
    placeholder="Nome do Serviço (clique para ver histórico)..."
    value={novoServicoDescricao}
    onChange={(e) => setNovoServicoDescricao(e.target.value)}
    style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #2a3655', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
  />
  <input 
    type="number" 
    placeholder="Valor (€)"
    value={novoServicoValor}
    onChange={(e) => setNovoServicoValor(e.target.value)}
    style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #2a3655', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
  />
  <input 
    type="number" 
    placeholder="Desconto (€)"
    value={novoServicoDesconto || ''}
    onChange={(e) => setNovoServicoDesconto(e.target.value)}
    style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #2a3655', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
  />
  <select
    value={novoServicoTecnico || 'Equipa CARBOX77'}
    onChange={(e) => setNovoServicoTecnico(e.target.value)}
    style={{ padding: '10px', backgroundColor: '#131722', border: '1px solid #2a3655', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
  >
    <option value="Equipa CARBOX77">Equipa CARBOX77</option>
    <option value="João Silva">João Silva</option>
    <option value="Miguel Santos">Miguel Santos</option>
    <option value="Ricardo Costa">Ricardo Costa</option>
    <option value="Kevin">Kevin</option>
  </select>
  
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                          <input type="checkbox" checked={novoServComIva} onChange={(e) => setNovoServComIva(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                          IVA 23%
                        </label>
                        <button type="button" onClick={adicionarServicoOS} style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Adicionar</button>
                      </div>
                    </div>

                    {subAbaOperacional === 'os' && (
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
                    )}

                    {subAbaOperacional === 'os' && (
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
                                {selecionado ? '✓ ' : '+ '} {f.nome}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Desconto Global (%)</label>
                        <input type="text" value={osDescontoPct} onChange={(e) => setOsDescontoPct(e.target.value)} placeholder="0" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                      </div>
                      {subAbaOperacional === 'os' && (
                        <>
                          <div>
                            <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Sinal Pago (€)</label>
                            <input type="text" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Forma Pagamento Sinal</label>
                            <select value={osFormaPagamentoSinal} onChange={(e) => setOsFormaPagamentoSinal(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}>
                              <option value="MBWay">MBWay</option>
                              <option value="Dinheiro">Dinheiro</option>
                              <option value="Empresa">Empresa / Transf.</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>

                    <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '10px' }}>
                      {subAbaOperacional === 'os' ? 'Emitir Ordem de Serviço Completa' : 'Gerar Orçamento'}
                    </button>
                  </form>

                  {/* O formulário antigo fica só para Orçamento (a OS agora usa o NovaOSReal acima) */}
              {['orcamento'].includes(subAbaOperacional) && (
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', maxWidth: '850px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px' }}>📑 Orçamentos Emitidos</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {orcamentos.map(orc => (
                          <div key={orc.id} style={{ backgroundColor: '#131722', border: '1px solid #222b45', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                              <h4 style={{ fontSize: '18px', color: '#fff', margin: '0 0 6px 0' }}>{orc.cliente} — <span style={{ color: '#d4af37' }}>{orc.veiculo} ({orc.matricula})</span></h4>
                              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Data: {orc.data} | Total: <b style={{ color: '#34d399' }}>{orc.valorFinal.toFixed(2)} €</b></p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button onClick={() => imprimirOrcamento(orc)} style={{ backgroundColor: '#38bdf8', color: '#090a0f', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                                🖨️ Imprimir
                              </button>
                              <button onClick={() => enviarWhatsAppOrcamento(orc)} style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                                💬 WhatsApp
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ABA 4: DESPESAS & CUSTOS (COM SUPORTE A FOTO / PDF) */}
          {tab === 'despesas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>📉 Despesas Fixas & Variáveis</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Registe custos como aluguer, contabilidade, produtos e adicione fotos ou PDFs das faturas.</p>
              </div>

              <form onSubmit={adicionarDespesa} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>➕ Nova Despesa ou Fatura</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Tipo de Despesa *</label>
                    <select value={novaDespTipo} onChange={(e) => setNovaDespTipo(e.target.value as any)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
                      <option value="Fixa">Fixa (Ex: Aluguer, Contabilidade)</option>
                      <option value="Variável">Variável (Ex: Produtos, Ferramentas)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Categoria *</label>
                    <select value={novaDespCat} onChange={(e) => setNovaDespCat(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
                      <option value="Aluguel / Renda">Aluguel / Renda</option>
                      <option value="Contabilidade">Contabilidade</option>
                      <option value="Produtos & Insumos">Produtos & Insumos</option>
                      <option value="Ferramentas & Equipamentos">Ferramentas & Equipamentos</option>
                      <option value="Água / Luz / Internet">Água / Luz / Internet</option>
                      <option value="Outras Despesas">Outras Despesas</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Descrição *</label>
                    <input type="text" required placeholder="Ex: Renda Setembro ou Compra Polidores" value={novaDespDesc} onChange={(e) => setNovaDespDesc(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Valor (€) *</label>
                    <input type="text" required placeholder="0.00" value={novaDespVal} onChange={(e) => setNovaDespVal(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1', marginBottom: '6px' }}>Data *</label>
                    <input type="date" required value={novaDespData} onChange={(e) => setNovaDespData(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', cursor: 'pointer', colorScheme: 'dark' }} />
                  </div>
                </div>

                {/* BOTÃO PARA TIRAR FOTO OU INSERIR PDF */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'block', fontSize: '15px', color: '#cbd5e1' }}>Anexar Fatura (Tirar Foto ou Inserir PDF)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <label style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
                      📷 Tirar Foto / Carregar PDF
                      <input type="file" accept="image/*,application/pdf" capture="environment" onChange={lidarComFicheiroAnexo} style={{ display: 'none' }} />
                    </label>
                    {novaDespAnexo ? (
                      <span style={{ color: '#34d399', fontSize: '14px', fontWeight: 'bold' }}>✓ Ficheiro anexado: {novaDespAnexo}</span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '14px' }}>Nenhum ficheiro selecionado</span>
                    )}
                  </div>
                </div>

                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', marginTop: '6px' }}>
                  Guardar Despesa
                </button>
              </form>

              {/* LISTA DE DESPESAS REGISTADAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Despesas Registadas</h3>
                {despesas.map(d => (
                  <div key={d.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', backgroundColor: d.tipo === 'Fixa' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(249, 115, 22, 0.2)', color: d.tipo === 'Fixa' ? '#60a5fa' : '#f97316', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>{d.tipo}</span>
                        <span style={{ fontSize: '13px', color: '#d4af37' }}>{d.categoria}</span>
                      </div>
                      <h4 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>{d.descricao}</h4>
                      <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>Data: {d.data} {d.anexoNome ? `| 📎 Anexo: ${d.anexoNome}` : ''}</p>
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171' }}>-{d.valor.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 5: CALENDÁRIO & AGENDA */}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 700px', gap: '28px', alignItems: 'start' }}>
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1f293d', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{nomesMeses[mesCalendario]} de {anoCalendario}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => mudarMes(-1)} style={{ backgroundColor: '#090a0f', color: '#d4af37', border: '1px solid #222b45', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>◀</button>
                      <button onClick={() => mudarMes(1)} style={{ backgroundColor: '#090a0f', color: '#d4af37', border: '1px solid #222b45', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>▶</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', color: '#94a3b8', fontSize: '13px', paddingBottom: '6px', borderBottom: '1px solid #1f293d' }}>
                    <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {Array.from({ length: primeiroDiaMes }).map((_, idx) => <div key={`empty-${idx}`} style={{ padding: '8px', height: '50px' }}></div>)}

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
                        <div key={dataFormatada} onClick={() => setDiaSelecionado(dataFormatada)} style={{ backgroundColor: isSelecionado ? 'rgba(212, 175, 55, 0.3)' : isFeriado ? 'rgba(239, 68, 68, 0.15)' : '#090a0f', border: isSelecionado ? '2px solid #d4af37' : isFeriado ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid #1f293d', borderRadius: '8px', padding: '6px', minHeight: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: isFeriado ? '#f87171' : '#fff' }}>{diaNum}</span>
                            {isFeriado && <span style={{ fontSize: '8px', backgroundColor: '#f87171', color: '#090a0f', padding: '1px 3px', borderRadius: '3px', fontWeight: 'bold' }}>Feriado</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                            {agsDoDia.map((_, i) => <div key={`ag-${i}`} style={{ width: '7px', height: '7px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>)}
                            {ossDoDia.map((_, i) => <div key={`os-${i}`} style={{ width: '7px', height: '7px', backgroundColor: '#d4af37', borderRadius: '50%' }}></div>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

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
                        <p style={{ margin: 0, color: '#d4af37', fontSize: '15px' }}>🛠️ Serviço: {ag.servicoAgendado}</p>
                       <button 
  onClick={() => converterParaOS(ag)}
  style={{
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px',
    marginLeft: '8px'
  }}
>
  🔄 Converter para OS
</button>
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

          {/* ABA 6: LIVRO-CAIXA & RELATÓRIO DIÁRIO */}
          {tab === 'financeiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa & Relatório Diário Inteligente</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Consulte o resumo financeiro detalhado de qualquer dia ou registe transações manuais.</p>
              </div>
<CalculadoraComissao />
              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #222b45', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>🔍 Relatório Diário por Data</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label style={{ fontSize: '15px', color: '#cbd5e1' }}>Escolher Dia:</label>
                    <input 
                      type="date" 
                      value={dataRelatorioSel} 
                      onChange={(e) => setDataRelatorioSel(e.target.value)} 
                      style={{ padding: '10px 14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '15px', cursor: 'pointer', colorScheme: 'dark' }} 
                    />
                  </div>
                </div>

                {(() => {
                  const transDia = transacoes.filter(t => t.data === dataRelatorioSel && t.tipo === 'receita');
                  const totalEntradasDia = transDia.reduce((acc, t) => acc + t.valor, 0);
                  const osDia = ordensServico.filter(o => o.data === dataRelatorioSel);
                  const agDia = agendamentos.filter(a => a.data === dataRelatorioSel);

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', border: '1px solid #1f293d', textAlign: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Total Entradas no Dia</span>
                          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', margin: '6px 0 0 0' }}>+{totalEntradasDia.toFixed(2)}€</p>
                        </div>
                        <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', border: '1px solid #1f293d', textAlign: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#94a3b8' }}>OS Emitidas</span>
                          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d4af37', margin: '6px 0 0 0' }}>{osDia.length}</p>
                        </div>
                        <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', border: '1px solid #1f293d', textAlign: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Avaliações Agendadas</span>
                          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: '6px 0 0 0' }}>{agDia.length}</p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ backgroundColor: '#090a0f', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <h4 style={{ fontSize: '16px', color: '#34d399', margin: 0 }}>💰 Entradas Financeiras ({dataRelatorioSel})</h4>
                          {transDia.map(tr => (
                            <div key={tr.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#131722', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}>
                              <span style={{ color: '#fff' }}>{tr.descricao}</span>
                              <span style={{ color: '#34d399', fontWeight: 'bold' }}>+{tr.valor.toFixed(2)}€</span>
                            </div>
                          ))}
                          {transDia.length === 0 && <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Nenhuma receita registada neste dia.</p>}
                        </div>

                        <div style={{ backgroundColor: '#090a0f', padding: '18px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <h4 style={{ fontSize: '16px', color: '#d4af37', margin: 0 }}>🚗 Viaturas & Serviços ({dataRelatorioSel})</h4>
                          {osDia.map(os => (
                            <div key={os.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#131722', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}>
                              <span style={{ color: '#fff' }}><b>{os.veiculo}</b> ({os.matricula}) — {os.status}</span>
                              <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{os.valorFinal.toFixed(2)}€</span>
                            </div>
                          ))}
                          {osDia.length === 0 && <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Nenhuma OS emitida neste dia.</p>}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Registo Manual & Livro-Caixa Geral</h3>
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

            </div>
          )}

          {/* ABA 7: FUNCIONÁRIOS */}
          {tab === 'funcionarios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários & Salários</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Configure comissões, salários fixos e registe adiantamentos.</p>
              </div>

              <form onSubmit={adicionarFuncionario} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', backgroundColor: 'rgba(19, 23, 34, 0.9)', padding: '24px', borderRadius: '16px', border: '1px solid #1f293d' }}>
                <input type="text" placeholder="Nome do Funcionário" required value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ flex: 1, minWidth: '220px', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff' }} />
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
                      <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{f.nome}</span>
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

          {/* ABA 8: STOCK */}
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

          {/* ABA 9: EMPRESA */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Dados da Empresa</h2>
                <p style={{ fontSize: '17px', color: '#94a3b8', margin: 0 }}>Informações fiscais e endereço.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1f293d', borderRadius: '18px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Nome da Empresa</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>NIF</label>
                  <input type="text" value={dadosEmpresa.nif} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nif: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Endereço / Morada</label>
                  <input type="text" value={dadosEmpresa.morada} onChange={(e) => setDadosEmpresa({...dadosEmpresa, morada: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>Telefone</label>
                  <input type="text" value={dadosEmpresa.telefone} onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>IBAN</label>
                  <input type="text" value={dadosEmpresa.iban} onChange={(e) => setDadosEmpresa({...dadosEmpresa, iban: e.target.value})} style={{ width: '100%', padding: '14px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

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

// Porta de entrada: só mostra o painel a quem iniciou sessão no Supabase.
export default function Home() {
  return (
    <AcessoProtegido>
      {({ email, sair }) => <Painel emailUtilizador={email} onSair={sair} />}
    </AcessoProtegido>
  );
}
