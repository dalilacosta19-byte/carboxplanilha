'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX77 DETAILING, UNIPESSOAL LDA',
    nif: '513 401 890',
    morada: 'Rua da Torre, Pavilhão Guilherme Pinto Basto, 2750-748 Cascais, Portugal',
    telefone: '+351 211 515 449',
    email: 'carbox77detailing@gmail.com',
    iban: 'PT50 0033 0000 4546 1405 9370 5',
    swift: 'BCOPTPL'
  });

  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', tipoRemuneracao: 'comissao', valorRemuneracao: '30' },
    { id: 2, nome: 'Miguel Santos', tipoRemuneracao: 'fixo', valorRemuneracao: '1000' },
    { id: 3, nome: 'Ricardo Costa', tipoRemuneracao: 'diaria', valorRemuneracao: '75' },
    { id: 4, nome: 'Kevin', tipoRemuneracao: 'comissao', valorRemuneracao: '30' }
  ]);
  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncTipo, setNovoFuncTipo] = useState<'comissao' | 'fixo' | 'diaria'>('comissao');
  const [novoFuncValor, setNovoFuncValor] = useState('30');

  const dataHojeObj = new Date();
  const anoAtualReal = dataHojeObj.getFullYear();
  const mesAtualReal = dataHojeObj.getMonth();
  const diaHojeIso = dataHojeObj.toISOString().split('T')[0];

  const [agendamentos, setAgendamentos] = useState([
    { id: 1, tipo: 'Serviço', cliente: 'Carla Monteiro', contacto: '+351 922 333 444', veiculo: 'Renault Captur', matricula: 'AZ-91-GI', servico: 'Limpeza Detalhada + PPF', data: diaHojeIso, hora: '14:00', status: 'Agendado' },
    { id: 2, tipo: 'Avaliação / Orçamento', cliente: 'Bernardo Silva', contacto: '+351 911 222 333', veiculo: 'BMW M3', matricula: '45-XX-89', servico: 'Orçamento Polimento e Cerâmica', data: diaHojeIso, hora: '10:30', status: 'Pendente' }
  ]);

  const [anoAtualCal, setAnoAtualCal] = useState(anoAtualReal);
  const [mesAtualCal, setMesAtualCal] = useState(mesAtualReal); 
  const [diaSelecionadoCal, setDiaSelecionadoCal] = useState(diaHojeIso);

  const [tipoRegistroOS, setTipoRegistroOS] = useState<'os' | 'agendamento' | 'orcamento'>('orcamento');
  const [tipoDocumentoGerar, setTipoDocumentoGerar] = useState<'ORÇAMENTO' | 'ORDEM DE SERVIÇO'>('ORÇAMENTO');
  const [tipoAgendamentoForm, setTipoAgendamentoForm] = useState<'Serviço' | 'Avaliação / Orçamento'>('Serviço');
  
  const [osCliente, setOsCliente] = useState('Carla Monteiro');
  const [osContacto, setOsContacto] = useState('+351 922 333 444');
  const [osVeiculo, setOsVeiculo] = useState('Renault Captur');
  const [osMatricula, setOsMatricula] = useState('AZ-91-GI');
  const [osIvaTaxa, setOsIvaTaxa] = useState<'23' | 'isento'>('23');
  const [osObs, setOsObs] = useState('Renault Captur matrícula AZ-91-GI.');

  const [osDataAgend, setOsDataAgend] = useState(diaHojeIso);
  const [osHoraAgend, setOsHoraAgend] = useState('14:00');

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
  
  const [osEmEdicao, setOsEmEdicao] = useState<any | null>(null);
  const [contaFinalMetodo, setContaFinalMetodo] = useState('MB WAY');

  // Estados para nova despesa manual / por foto / PDF
  const [novaDespDescricao, setNovaDespDescricao] = useState('');
  const [novaDespValor, setNovaDespValor] = useState('');
  const [novaDespCategoria, setNovaDespCategoria] = useState('Produtos/Peças');
  const [arquivoCarregadoNome, setArchivoCarregadoNome] = useState('');

  const [mostrarSugestoesCliente, setMostrarSugestoesCliente] = useState(false);
  const [mostrarSugestoesServicoIndex, setMostrarSugestoesServicoIndex] = useState<number | null>(null);

  const sugestoesServicosAutomotivos = [
    '13 - LIMPEZA DETALHADA',
    '57 - APLICAÇÃO DE PPF NOS BLACK PIANO',
    '111 - FUSION COATING',
    'Vitrificação Cerâmica Completa (Paint Protection)',
    'PPF (Paint Protection Film) Frontal',
    'PPF Completo Carroçaria',
    'Polimento de Correção (2 Passos)',
    'Polimento Comercial / Brilho',
    'Restauro de Faróis'
  ];

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
      ivaTaxa: '23',
      observacoes: 'Renault Captur matrícula AZ-91-GI.', 
      custosDetalhados: [{ descricao: 'Película PPF', valor: 150.00 }], 
      valorBruto: 1420.00, 
      descontoTotal: 120.00, 
      subtotal: 1300.00,
      valorIva: 299.00,
      valorFinal: 1599.00, 
      sinalPago: 300.00,
      contaRecebimentoSinal: 'MB WAY',
      restanteAPagar: 1299.00,
      status: 'Em Execução', 
      data: diaHojeIso 
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: diaHojeIso },
    { id: 2, descricao: 'Compra Película PPF', matricula: 'AZ-91-GI', categoria: 'Produtos/Peças', tipo: 'despesa', valor: 150.00, data: diaHojeIso }
  ]);

  const feriadosPortugal = [
    { data: `${anoAtualCal}-01-01`, nome: 'Ano Novo' },
    { data: `${anoAtualCal}-04-25`, nome: 'Dia da Liberdade' },
    { data: `${anoAtualCal}-05-01`, nome: 'Dia do Trabalhador' },
    { data: `${anoAtualCal}-06-10`, nome: 'Dia de Portugal' },
    { data: `${anoAtualCal}-08-15`, nome: 'Assunção de Nossa Senhora' },
    { data: `${anoAtualCal}-10-05`, nome: 'Implantação da República' },
    { data: `${anoAtualCal}-12-01`, nome: 'Restauração da Independência' },
    { data: `${anoAtualCal}-12-25`, nome: 'Natal' }
  ];

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

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome) return;
    setFuncionarios([...funcionarios, { id: Date.now(), nome: novoFuncNome, tipoRemuneracao: novoFuncTipo, valorRemuneracao: novoFuncValor }]);
    setNovoFuncNome('');
    setNovoFuncValor('30');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const lidarComSubmissaoRegisto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osCliente) {
      alert('Por favor, preencha o nome do cliente.');
      return;
    }

    if (tipoRegistroOS === 'agendamento') {
      const novoAg = {
        id: Date.now(),
        tipo: tipoAgendamentoForm,
        cliente: osCliente,
        contacto: osContacto || 'Sem contacto',
        veiculo: osVeiculo || 'Renault Captur',
        matricula: osMatricula ? osMatricula.toUpperCase() : 'N/D',
        servico: listaItensServico[0]?.descricao || 'Estética Geral',
        data: osDataAgend,
        hora: osHoraAgend,
        status: 'Agendado'
      };
      setAgendamentos([...agendamentos, novoAg]);
      alert('Agendamento guardado com sucesso na Agenda!');
      return;
    }

    const tituloDoc = tipoRegistroOS === 'orcamento' ? 'ORÇAMENTO' : tipoDocumentoGerar;

    let valorBruto = 0;
    let totalDesc = 0;

    const servicosDetalhesArray = listaItensServico.map(i => {
      const val = Number(i.valor) || 0;
      const desc = Number(i.desconto) || 0;
      valorBruto += val;
      totalDesc += desc;
      return { 
        descricao: i.descricao || 'Serviço Geral', 
        funcionario: i.funcionario || 'Não atribuído', 
        valor: val,
        desconto: desc
      };
    });

    const subtotal = Math.max(0, valorBruto - totalDesc);
    const valorIva = osIvaTaxa === '23' ? subtotal * 0.23 : 0;
    const valorFinalComIva = subtotal + valorIva;
    
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFinalComIva - sinal);
    const custosArray = listaCustosDetalhados.filter(c => c.descricao && Number(c.valor) > 0).map(c => ({ descricao: c.descricao, valor: Number(c.valor) }));
    const matriculaU = osMatricula ? osMatricula.toUpperCase() : 'SEM MATRÍCULA';
    const docId = Date.now().toString().slice(-4);

    if (tipoRegistroOS === 'os') {
      const novoRegisto = {
        id: Number(docId),
        cliente: osCliente,
        contacto: osContacto,
        veiculo: osVeiculo || 'Renault Captur',
        matricula: matriculaU,
        servicosDetalhes: servicosDetalhesArray,
        ivaTaxa: osIvaTaxa,
        servico: servicosDetalhesArray.map(s => s.descricao).join(' + '),
        observacoes: osObs || `${osVeiculo} matrícula ${matriculaU}.`,
        custosDetalhados: custosArray,
        valorBruto,
        descontoTotal: totalDesc,
        subtotal,
        valorIva,
        valorFinal: valorFinalComIva,
        sinalPago: sinal,
        contaRecebimentoSinal: sinal > 0 ? osContaRecebimentoSinal : 'Nenhum',
        restanteAPagar: restante,
        status: 'Em Execução',
        data: diaHojeIso
      };

      setOrdensServico([novoRegisto, ...ordensServico]);

      if (sinal > 0) {
        setTransacoes(prev => [{
          id: Date.now(),
          descricao: `Sinal OS #${docId} (${matriculaU}) via ${osContaRecebimentoSinal}`,
          matricula: matriculaU,
          categoria: 'Serviço',
          tipo: 'receita' as const,
          valor: sinal,
          data: diaHojeIso
        }, ...prev]);
      }

      custosArray.forEach((custo, cIdx) => {
        setTransacoes(prev => [{
          id: Date.now() + 10 + cIdx,
          descricao: `Custo (${custo.descricao}) OS #${docId} (${matriculaU})`,
          matricula: matriculaU,
          categoria: 'Produtos/Peças',
          tipo: 'despesa' as const,
          valor: custo.valor,
          data: diaHojeIso
        }, ...prev]);
      });
    }

    const w = window.open('', '_blank');
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <title>${tituloDoc} #${docId} - ${dadosEmpresa.nome}</title>
          <style>
            body { font-family: Helvetica, Arial, sans-serif; color: #111; padding: 40px; background: #fff; margin: 0; }
            .header-container { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 20px; }
            
            .brand-logo { font-size: 28px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; font-family: Arial Black, sans-serif; }
            .brand-logo span.car { color: #d4af37; }
            .brand-logo span.box { color: #111; }
            .brand-logo span.detailing { display: block; font-size: 10px; letter-spacing: 3px; color: #d4af37; font-weight: bold; margin-top: -2px; }

            .doc-title-box { text-align: right; }
            .doc-title-box h2 { font-size: 22px; margin: 0 0 4px 0; color: #111; text-transform: uppercase; letter-spacing: 0.5px; }
            .doc-title-box p { font-size: 12px; margin: 2px 0; color: #555; }
            
            .company-details { font-size: 11px; color: #444; line-height: 1.5; margin-bottom: 20px; }
            .client-box { border: 1px solid #ccc; padding: 12px; border-radius: 4px; margin-bottom: 20px; background: #fafafa; display: flex; justify-content: space-between; font-size: 13px; }

            table.items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            table.items-table th { background: #111; color: #fff; font-size: 11px; text-transform: uppercase; padding: 8px 10px; text-align: left; }
            table.items-table td { border-bottom: 1px solid #ddd; padding: 10px; font-size: 12px; }
            
            .summary-container { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px; }
            .bank-info { font-size: 11px; color: #333; line-height: 1.5; }
            .totals-box { width: 320px; font-size: 12px; }
            .totals-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
            .totals-row.final { font-size: 15px; font-weight: bold; color: #111; border-top: 2px solid #111; border-bottom: none; padding-top: 8px; margin-top: 4px; }
            
            .obs-box { margin-top: 20px; font-size: 11px; color: #333; background: #f4f4f4; padding: 10px; border-radius: 4px; }
            
            .print-btn-bar { position: fixed; top: 10px; right: 10px; background: #111; color: #fff; border: none; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer; z-index: 999; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
            @media print { .print-btn-bar { display: none; } }
          </style>
        </head>
        <body>
          <button class="print-btn-bar" onclick="window.print()">🖨️ Imprimir Orçamento</button>

          <div class="header-container">
            <div>
              <div class="brand-logo">
                <span class="car">CAR</span><span class="box">BOX</span><span style="color:#d4af37">77</span>
                <span class="detailing">DETAILING</span>
              </div>
            </div>
            <div class="doc-title-box">
              <h2>${tituloDoc}</h2>
              <p><b>Data de Emissão:</b> ${diaHojeIso}</p>
            </div>
          </div>

          <div class="company-details">
            <b>${dadosEmpresa.nome}</b><br/>
            ${dadosEmpresa.morada}<br/>
            <b>E-mail:</b> ${dadosEmpresa.email} | <b>Telemóvel:</b> ${dadosEmpresa.telefone}<br/>
            <b>NIF:</b> ${dadosEmpresa.nif}
          </div>

          <div class="client-box">
            <div>
              <b>Cliente:</b> ${osCliente}<br/>
              <b>Contacto:</b> ${osContacto || 'N/D'}
            </div>
            <div style="text-align: right;">
              <b>Viatura:</b> ${osVeiculo}<br/>
              <b>Matrícula:</b> ${osMatricula}
            </div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Preço Unit.</th>
                <th>Quant.</th>
                <th>Total s/ IVA</th>
                <th>Desc.</th>
                <th>IVA</th>
                <th>Total c/ IVA</th>
              </tr>
            </thead>
            <tbody>
              ${servicosDetalhesArray.map((s) => {
                const itemTotalSemIva = s.valor - (s.desconto || 0);
                const itemIvaVal = osIvaTaxa === '23' ? itemTotalSemIva * 0.23 : 0;
                const itemTotalComIva = itemTotalSemIva + itemIvaVal;
                return `
                  <tr>
                    <td><b>${s.descricao}</b> ${s.funcionario ? `<br/><span style="color:#666; font-size:11px;">Técnico: ${s.funcionario}</span>` : ''}</td>
                    <td>${s.valor.toFixed(2)}€</td>
                    <td>1,0</td>
                    <td>${itemTotalSemIva.toFixed(2)}€</td>
                    <td>${s.desconto ? s.desconto.toFixed(2) + '€' : '0,00€'}</td>
                    <td>${osIvaTaxa === '23' ? '23,00%' : 'Isento'}</td>
                    <td><b>${itemTotalComIva.toFixed(2)}€</b></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="summary-container">
            <div class="bank-info">
              <b>Transferência Bancária:</b><br/>
              <b>IBAN:</b> ${dadosEmpresa.iban}<br/>
              <b>SWIFT/BIC:</b> ${dadosEmpresa.swift}
            </div>

            <div class="totals-box">
              <div class="totals-row">
                <span>Total Bruto:</span>
                <span>${valorBruto.toFixed(2)}€</span>
              </div>
              <div class="totals-row">
                <span>Desconto Total:</span>
                <span>-${totalDesc.toFixed(2)}€</span>
              </div>
              <div class="totals-row">
                <span>Total Sem IVA:</span>
                <span><b>${subtotal.toFixed(2)}€</b></span>
              </div>
              <div class="totals-row">
                <span>IVA (${osIvaTaxa === '23' ? '23%' : 'Isento'}):</span>
                <span>+${valorIva.toFixed(2)}€</span>
              </div>
              ${sinal > 0 ? `
              <div class="totals-row">
                <span>Sinal (${osContaRecebimentoSinal}):</span>
                <span style="color:#059669;">-${sinal.toFixed(2)}€</span>
              </div>` : ''}
              <div class="totals-row final">
                <span>Total Final c/ IVA:</span>
                <span>${valorFinalComIva.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          ${osObs ? `<div class="obs-box"><b>Observações:</b> ${osObs} ${osIvaTaxa === 'isento' ? '<br/>IVA - Regime de isenção.' : ''}</div>` : ''}
        </body>
      </html>
    `);
    w.document.close();
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    const osEncontrada = ordensServico.find(o => o.id === id);
    if (!osEncontrada) return;

    if (novoStatus === 'Pronto / Entregue' && osEncontrada.restanteAPagar > 0) {
      setOsEmEdicao(osEncontrada);
      return;
    }

    setOrdensServico(ordensServico.map(os => os.id === id ? { ...os, status: novoStatus } : os));
  };

  const confirmarFinalizacaoComPagamento = (osId: number) => {
    const osObj = ordensServico.find(o => o.id === osId);
    if (!osObj) return;

    const saldo = osObj.restanteAPagar;

    if (saldo > 0) {
      setTransacoes(prev => [{
        id: Date.now(),
        descricao: `Liquidação Final OS #${osObj.id} (${osObj.cliente}) via ${contaFinalMetodo}`,
        matricula: osObj.matricula,
        categoria: 'Serviço',
        tipo: 'receita' as const,
        valor: saldo,
        data: diaHojeIso
      }, ...prev]);
    }

    setOrdensServico(ordensServico.map(os => {
      if (os.id === osId) {
        return {
          ...os,
          status: 'Pronto / Entregue',
          sinalPago: os.sinalPago + saldo,
          restanteAPagar: 0
        };
      }
      return os;
    }));

    setOsEmEdicao(null);
  };

  const adicionarDespesaInteligente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDespDescricao || !novaDespValor) {
      alert('Por favor, preencha a descrição e o valor da despesa.');
      return;
    }

    const val = Number(novaDespValor) || 0;
    const novaTransacao = {
      id: Date.now(),
      descricao: arquivoCarregadoNome ? `${novaDespDescricao} [Doc/Foto: ${arquivoCarregadoNome}]` : novaDespDescricao,
      matricula: 'GERAL',
      categoria: novaDespCategoria,
      tipo: 'despesa' as const,
      valor: val,
      data: diaHojeIso
    };

    setTransacoes([novaTransacao, ...transacoes]);
    setNovaDespDescricao('');
    setNovaDespValor('');
    setArchivoCarregadoNome('');
    alert('Despesa adicionada com sucesso ao Livro-Caixa!');
  };

  const processarUploadArquivoSimulado = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArchivoCarregadoNome(file.name);
    const nomeLimpo = file.name.replace(/\.[^/.]+$/, "");
    setNovaDespDescricao(`Fatura/Recibo: ${nomeLimpo}`);
    setNovaDespValor('45.00');
  };

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
    { id: 'analise-ia', label: '📈 Análise & Inteligência' },
    { id: 'ordem-servico', label: '📋 OS / Agendamento / Orçamento' },
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
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: `linear-gradient(rgba(9, 10, 15, 0.92), rgba(9, 10, 15, 0.95)), url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1920&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#f8fafc', 
      fontFamily: 'system-ui, sans-serif', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* HEADER DA APLICAÇÃO */}
      <header style={{ backgroundColor: 'rgba(13, 15, 23, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e2235', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'Arial Black, sans-serif', textTransform: 'uppercase', lineHeight: '1' }}>
              <span style={{ color: '#d4af37' }}>CAR</span><span style={{ color: '#fff' }}>BOX</span><span style={{ color: '#d4af37' }}>77</span>
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{dadosEmpresa.nome}</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Estética Automotiva de Alta Performance • Cascais</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#131722', padding: '8px 16px', borderRadius: '10px', border: '1px solid #222b45', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>
            📅 Hoje: {dataHojeObj.toLocaleDateString('pt-PT')}
          </div>
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
          backgroundColor: 'rgba(13, 15, 23, 0.85)', 
          backdropFilter: 'blur(10px)',
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
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Acompanhe o status em tempo real.</p>
                </div>
                <button 
                  onClick={() => setTab('ordem-servico')}
                  style={{ backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  + Novo Registo / OS / Agendamento
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {ordensServico.map(os => {
                  const badge = getBadgeStyle(os.status);
                  return (
                    <div key={os.id} style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
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

                      <div style={{ backgroundColor: 'rgba(9, 10, 15, 0.8)', padding: '16px', borderRadius: '12px', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #1e2235' }}>
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente} {os.contacto && <span style={{ color: '#94a3b8', fontSize: '13px' }}>({os.contacto})</span>}</p>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <p style={{ margin: 0, color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>Serviços e Descontos:</p>
                            <button 
                              onClick={() => setOsEmEdicao(os)}
                              style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid rgba(37, 99, 235, 0.4)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              ✏️ Adicionar / Modificar Serviços
                            </button>
                          </div>
                          {os.servicosDetalhes && os.servicosDetalhes.map((s: any, idx: number) => (
                            <p key={idx} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: '14px' }}>• {s.descricao} - <b>{(s.valor - (s.desconto || 0)).toFixed(2)}€</b> {s.desconto > 0 && <span style={{ color: '#f87171', fontSize: '12px' }}>(Desc: {s.desconto.toFixed(2)}€)</span>}</p>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', borderTop: '1px solid #1e2235', paddingTop: '14px' }}>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Total c/ IVA: <b>{os.valorFinal.toFixed(2)}€</b></span><br/>
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

          {/* MODAL DE LIQUIDAÇÃO FINAL OU EDIÇÃO DE SERVIÇOS NO PÁTIO */}
          {osEmEdicao && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <div style={{ backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                    {osEmEdicao.restanteAPagar > 0 ? '💰 Liquidar Restante e Finalizar OS' : '✏️ Modificar Serviços - Registo #' + osEmEdicao.id}
                  </h3>
                  <button onClick={() => setOsEmEdicao(null)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
                </div>

                {osEmEdicao.restanteAPagar > 0 && osEmEdicao.status !== 'Pronto / Entregue' && (
                  <div style={{ backgroundColor: '#090a0f', padding: '20px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px' }}>O cliente vai liquidar o valor restante de <b style={{ color: '#f87171', fontSize: '18px' }}>{osEmEdicao.restanteAPagar.toFixed(2)} €</b>.</p>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>Método de Pagamento:</label>
                      <select 
                        value={contaFinalMetodo} 
                        onChange={(e) => setContaFinalMetodo(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#34d399', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}
                      >
                        <option value="MB WAY">MB WAY</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Empresa / Transferência">Empresa / Transferência</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => confirmarFinalizacaoComPagamento(osEmEdicao.id)}
                      style={{ backgroundColor: '#34d399', color: '#090a0f', fontWeight: 'bold', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
                    >
                      ✅ Confirmar Recebimento e Marcar como Pronto / Entregue
                    </button>
                  </div>
                )}

                <div style={{ backgroundColor: '#090a0f', padding: '20px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ margin: 0, color: '#d4af37', fontWeight: 'bold', fontSize: '15px' }}>🛠️ Acrescentar ou Alterar Serviços:</p>
                  
                  {osEmEdicao.servicosDetalhes.map((s: any, sIdx: number) => (
                    <div key={sIdx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={s.descricao} 
                        onChange={(e) => {
                          const novaLista = [...osEmEdicao.servicosDetalhes];
                          novaLista[sIdx].descricao = e.target.value;
                          setOsEmEdicao({...osEmEdicao, servicosDetalhes: novaLista});
                        }}
                        style={{ backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '14px' }}
                      />
                      <input 
                        type="number" 
                        step="0.01"
                        value={s.valor} 
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const novaLista = [...osEmEdicao.servicosDetalhes];
                          novaLista[sIdx].valor = val;
                          setOsEmEdicao({...osEmEdicao, servicosDetalhes: novaLista});
                        }}
                        style={{ backgroundColor: '#131722', border: '1px solid #222b45', color: '#34d399', padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}
                      />
                      <input 
                        type="number" 
                        step="0.01"
                        value={s.desconto} 
                        onChange={(e) => {
                          const desc = Number(e.target.value) || 0;
                          const novaLista = [...osEmEdicao.servicosDetalhes];
                          novaLista[sIdx].desconto = desc;
                          setOsEmEdicao({...osEmEdicao, servicosDetalhes: novaLista});
                        }}
                        style={{ backgroundColor: '#131722', border: '1px solid #222b45', color: '#f87171', padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}
                      />
                      <button 
                        onClick={() => {
                          const novaLista = osEmEdicao.servicosDetalhes.filter((_: any, i: number) => i !== sIdx);
                          setOsEmEdicao({...osEmEdicao, servicosDetalhes: novaLista});
                        }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const novaLista = [...osEmEdicao.servicosDetalhes, { descricao: 'Novo Serviço Adicional', funcionario: 'Não atribuído', valor: 0, desconto: 0 }];
                      setOsEmEdicao({...osEmEdicao, servicosDetalhes: novaLista});
                    }}
                    style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    + Adicionar Nova Linha de Serviço
                  </button>

                  <button 
                    onClick={() => {
                      let bruto = 0;
                      let descTotal = 0;
                      osEmEdicao.servicosDetalhes.forEach((s: any) => {
                        bruto += Number(s.valor) || 0;
                        descTotal += Number(s.desconto) || 0;
                      });
                      const sub = Math.max(0, bruto - descTotal);
                      const ivaVal = osEmEdicao.ivaTaxa === '23' ? sub * 0.23 : 0;
                      const final = sub + ivaVal;
                      const restanteCalc = Math.max(0, final - osEmEdicao.sinalPago);

                      const atualizado = {
                        ...osEmEdicao,
                        valorBruto: bruto,
                        descontoTotal: descTotal,
                        subtotal: sub,
                        valorIva: ivaVal,
                        valorFinal: final,
                        restanteAPagar: restanteCalc
                      };

                      setOrdensServico(ordensServico.map(o => o.id === atualizado.id ? atualizado : o));
                      setOsEmEdicao(null);
                      alert('Serviços atualizados com sucesso!');
                    }}
                    style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '10px' }}
                  >
                    💾 Guardar Alterações na OS
                  </button>
                </div>
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
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: liq >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liq.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Receitas</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Custos / Despesas</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA NOVA: ANÁLISE & INTELIGÊNCIA DE DESPESAS */}
          {tab === 'analise-ia' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>📈 Análise Visual & Inteligência de Despesas</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Gráficos automáticos e insights para otimizar os custos da oficina.</p>
              </div>

              {(() => {
                const despesasArr = transacoes.filter(t => t.tipo === 'despesa');
                const totalDespesas = despesasArr.reduce((acc, t) => acc + t.valor, 0);

                const categoriasMap: { [key: string]: number } = {
                  'Produtos/Peças': 0,
                  'Serviço Externo / Pintor': 0,
                  'Aluguer / Instalações': 0,
                  'Outros': 0
                };

                despesasArr.forEach(t => {
                  if (categoriasMap[t.categoria] !== undefined) {
                    categoriasMap[t.categoria] += t.valor;
                  } else {
                    categoriasMap['Outros'] += t.valor;
                  }
                });

                const catCores: { [key: string]: string } = {
                  'Produtos/Peças': '#d4af37',
                  'Serviço Externo / Pintor': '#60a5fa',
                  'Aluguer / Instalações': '#c084fc',
                  'Outros': '#f87171'
                };

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    
                    {/* CARDS DE RESUMO ANALÍTICO */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total de Despesas Registadas</p>
                        <p style={{ fontSize: '28px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{totalDespesas.toFixed(2)} €</p>
                      </div>

                      <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Categoria com Maior Impacto</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>
                          {Object.keys(categoriasMap).reduce((a, b) => categoriasMap[a] > categoriasMap[b] ? a : b)}
                        </p>
                      </div>

                      <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1e2235', padding: '24px', borderRadius: '16px' }}>
                        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Estado de Eficiência</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>🟢 Sob Controlo</p>
                      </div>
                    </div>

                    {/* BLOCOS DE GRÁFICOS E INSIGHTS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'stretch' }}>
                      
                      {/* DISTRIBUIÇÃO POR CATEGORIA */}
                      <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>📊 Distribuição de Custos por Categoria</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', flex: 1 }}>
                          {Object.entries(categoriasMap).map(([cat, val]) => {
                            const percent = totalDespesas > 0 ? (val / totalDespesas) * 100 : 0;
                            const cor = catCores[cat] || '#d4af37';
                            return (
                              <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                  <span style={{ color: '#cbd5e1', fontWeight: 'bold' }}>{cat}</span>
                                  <span style={{ color: '#fff' }}>{val.toFixed(2)} € ({percent.toFixed(1)}%)</span>
                                </div>
                                <div style={{ width: '100%', height: '10px', backgroundColor: '#090a0f', borderRadius: '5px', overflow: 'hidden', border: '1px solid #222b45' }}>
                                  <div style={{ width: `${percent}%`, height: '100%', backgroundColor: cor, borderRadius: '5px', transition: 'width 0.5s ease' }}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* PAINEL DE INSIGHTS DA IA */}
                      <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '24px' }}>🤖</span>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>Insights Inteligentes CARBOX77</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: '#e2e8f0', lineHeight: '1.6' }}>
                          <div style={{ backgroundColor: 'rgba(9, 10, 15, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>💡 Análise de Stock e Consumíveis:</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#cbd5e1' }}>A categoria <b>Produtos/Peças</b> mantém-se estável face aos serviços de PPF executados este mês.</p>
                          </div>

                          <div style={{ backgroundColor: 'rgba(9, 10, 15, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>⚡ Recomendação de Otimização:</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#cbd5e1' }}>Podes verificar os prazos de entrega dos fornecedores de películas na aba de PDF/Faturas para evitar custos de urgência.</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ABA 3: ORDEM DE SERVIÇO / AGENDAMENTO / ORÇAMENTO */}
          {tab === 'ordem-servico' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Registo Unificado (OS / Agendamento / Orçamento)</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Crie Agendamentos, Orçamentos ou Ordens de Serviço completas com PDF oficial.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', maxWidth: '950px' }}>
                <form onSubmit={lidarComSubmissaoRegisto} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>Selecione o Tipo de Ação:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <button type="button" onClick={() => setTipoRegistroOS('os')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'os' ? '2px solid #2563eb' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'os' ? 'rgba(37, 99, 235, 0.2)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📋 Ordem de Serviço (PDF)
                      </button>
                      <button type="button" onClick={() => setTipoRegistroOS('orcamento')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'orcamento' ? '2px solid #d4af37' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'orcamento' ? 'rgba(212, 175, 55, 0.2)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📄 Pedido Orçamento (PDF)
                      </button>
                      <button type="button" onClick={() => setTipoRegistroOS('agendamento')} style={{ padding: '12px', borderRadius: '8px', border: tipoRegistroOS === 'agendamento' ? '2px solid #60a5fa' : '1px solid #222b45', backgroundColor: tipoRegistroOS === 'agendamento' ? 'rgba(96, 165, 250, 0.2)' : '#090a0f', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                        📅 Agendamento
                      </button>
                    </div>
                  </div>

                  {tipoRegistroOS === 'os' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 'bold' }}>Documento PDF a Emitir:</label>
                      <select value={tipoDocumentoGerar} onChange={(e) => setTipoDocumentoGerar(e.target.value as any)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px' }}>
                        <option value="ORÇAMENTO">Orçamento Oficial</option>
                        <option value="ORDEM DE SERVIÇO">Ordem de Serviço Oficial</option>
                      </select>
                    </div>
                  )}

                  {tipoRegistroOS === 'agendamento' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>Categoria do Agendamento:</label>
                      <select value={tipoAgendamentoForm} onChange={(e) => setTipoAgendamentoForm(e.target.value as any)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold' }}>
                        <option value="Serviço">🟢 Serviço (Execução)</option>
                        <option value="Avaliação / Orçamento">🟣 Avaliação / Orçamento</option>
                      </select>
                    </div>
                  )}

                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Nome do cliente (ex: Carla Monteiro)" 
                      value={osCliente} 
                      onChange={(e) => {
                        setOsCliente(e.target.value);
                        setMostrarSugestoesCliente(true);
                      }} 
                      onFocus={() => setMostrarSugestoesCliente(true)}
                      style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} 
                    />

                    {mostrarSugestoesCliente && clientesCadastrados.filter(c => c.cliente.toLowerCase().includes(osCliente.toLowerCase())).length > 0 && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#131722', border: '1px solid #d4af37', borderRadius: '10px', marginTop: '4px', zIndex: 50, maxHeight: '200px', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222b45', padding: '8px 12px' }}>
                          <p style={{ fontSize: '12px', color: '#d4af37', margin: 0, fontWeight: 'bold' }}>⚡ Clientes registados:</p>
                          <button type="button" onClick={() => setMostrarSugestoesCliente(false)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>✕ Fechar</button>
                        </div>
                        {clientesCadastrados
                          .filter(c => c.cliente.toLowerCase().includes(osCliente.toLowerCase()))
                          .map((c, idx) => (
                            <div 
                              key={idx}
                              onClick={() => selecionarClienteExistente(c)}
                              style={{ padding: '12px', borderBottom: '1px solid #1e2235', cursor: 'pointer' }}
                            >
                              <p style={{ margin: 0, fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>{c.cliente}</p>
                              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Tel: {c.contacto || 'N/D'} | Viatura: {c.veiculo} ({c.matricula})</p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Contacto / Telefone</label>
                      <input type="text" placeholder="Ex: +351 922 333 444" value={osContacto} onChange={(e) => setOsContacto(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Matrícula</label>
                      <input type="text" placeholder="Ex: AZ-91-GI" value={osMatricula} onChange={(e) => handleOsMatriculaChange(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Viatura</label>
                      <input type="text" placeholder="Ex: Renault Captur" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>Regime de IVA</label>
                      <select value={osIvaTaxa} onChange={(e) => setOsIvaTaxa(e.target.value as any)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <option value="23">IVA 23% (Normal)</option>
                        <option value="isento">Isento (0%)</option>
                      </select>
                    </div>
                  </div>

                  {tipoRegistroOS === 'agendamento' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>Data do Agendamento</label>
                        <input type="date" value={osDataAgend} onChange={(e) => setOsDataAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#d4af37', marginBottom: '6px', fontWeight: 'bold' }}>Hora</label>
                        <input type="time" value={osHoraAgend} onChange={(e) => setOsHoraAgend(e.target.value)} style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '15px' }} />
                      </div>
                    </div>
                  )}

                  <div style={{ backgroundColor: '#090a0f', padding: '20px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '15px', color: '#d4af37', fontWeight: 'bold' }}>🛠️ Serviços, Valores e Descontos:</label>
                      <button type="button" onClick={adicionarLinhaServico} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                        + Adicionar Serviço
                      </button>
                    </div>

                    {listaItensServico.map((item, index) => (
                      <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 40px', gap: '10px', alignItems: 'center', position: 'relative' }}>
                        
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            placeholder="Descrição do serviço" 
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
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222b45', padding: '6px 10px' }}>
                                <p style={{ fontSize: '11px', color: '#d4af37', margin: 0, fontWeight: 'bold' }}>💡 Sugestões:</p>
                                <button type="button" onClick={() => setMostrarSugestoesServicoIndex(null)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>✕</button>
                              </div>
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
                                  >
                                    {sug}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <select 
                            value={item.funcionario} 
                            onChange={(e) => atualizarItemServico(index, 'funcionario', e.target.value)}
                            style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
                          >
                            <option value="">👤 Técnico...</option>
                            {funcionarios.map(f => (
                              <option key={f.id} value={f.nome}>{f.nome}</option>
                            ))}
                          </select>
                        </div>

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

                        <div>
                          <input 
                            type="number" 
                            step="0.01" 
                            placeholder="Desc. (€)" 
                            value={item.desconto} 
                            onChange={(e) => atualizarItemServico(index, 'desconto', e.target.value)} 
                            style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#f87171', fontWeight: 'bold', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                          />
                        </div>

                        <div>
                          {listaItensServico.length > 1 && (
                            <button type="button" onClick={() => removerLinhaServico(index)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: '#090a0f', padding: '20px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '15px', color: '#f87171', fontWeight: 'bold' }}>💸 Custos (Pintor / Peças / Produtos / Outros):</label>
                      <button type="button" onClick={adicionarLinhaCusto} style={{ backgroundColor: '#991b1b', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                        + Adicionar Custo
                      </button>
                    </div>

                    {listaCustosDetalhados.map((custo, index) => (
                      <div key={custo.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 40px', gap: '10px', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          placeholder="Descrição (ex: Pintor, Película PPF, Produto XPTO)" 
                          value={custo.descricao} 
                          onChange={(e) => atualizarItemCusto(index, 'descricao', e.target.value)}
                          style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                        />
                        <input 
                          type="number" 
                          step="0.01" 
                          placeholder="Valor (€)" 
                          value={custo.valor} 
                          onChange={(e) => atualizarItemCusto(index, 'valor', e.target.value)} 
                          style={{ width: '100%', backgroundColor: '#131722', border: '1px solid #222b45', color: '#f87171', fontWeight: 'bold', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                        />
                        <div>
                          {listaCustosDetalhados.length > 1 && (
                            <button type="button" onClick={() => removerLinhaCusto(index)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#34d399', marginBottom: '8px', fontWeight: 'bold' }}>Sinal / Adiantamento (€)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="number" step="0.01" value={osSinal} onChange={(e) => setOsSinal(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                      <select 
                        value={osContaRecebimentoSinal} 
                        onChange={(e) => setOsContaRecebimentoSinal(e.target.value)}
                        style={{ backgroundColor: '#090a0f', color: '#34d399', border: '1px solid #222b45', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        <option value="MB WAY">MB WAY</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Empresa / Transferência">Empresa / Transferência</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Observações</label>
                    <textarea value={osObs} onChange={(e) => setOsObs(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '15px' }} />
                  </div>

                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '12px', fontSize: '17px' }}>
                    {tipoRegistroOS === 'os' ? '🖨️ Gerar e Imprimir Ordem de Serviço' : tipoRegistroOS === 'orcamento' ? '🖨️ Gerar e Imprimir Orçamento PDF' : '📅 Guardar Agendamento na Agenda'}
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
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário de Agendamentos & Avaliações</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Selecione um dia no calendário para ver as marcações (Verde = Serviço, Roxo = Avaliação/Orçamento).</p>
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
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
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
                      const agsDoDia = agendamentos.filter(ag => ag.data === dataStr);
                      const isHoje = dataStr === diaHojeIso;
                      const isSelecionado = diaSelecionadoCal === dataStr;

                      return (
                        <div 
                          key={diaNum}
                          onClick={() => setDiaSelecionadoCal(dataStr)}
                          style={{ 
                            backgroundColor: isSelecionado ? '#d4af37' : isHoje ? 'rgba(212, 175, 55, 0.2)' : feriadoDia ? 'rgba(239, 68, 68, 0.15)' : '#090a0f',
                            border: isHoje ? '2px solid #d4af37' : feriadoDia ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid #222b45',
                            borderRadius: '12px',
                            padding: '16px 8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            minHeight: '75px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: isSelecionado ? '#090a0f' : feriadoDia ? '#f87171' : '#fff' }}>{diaNum}</span>
                          {feriadoDia && <span style={{ fontSize: '10px', color: '#f87171', display: 'block', marginTop: '2px' }}>{feriadoDia.nome}</span>}
                          
                          {agsDoDia.length > 0 && (
                            <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                              {agsDoDia.map((ag, aIdx) => (
                                <span 
                                  key={aIdx} 
                                  style={{ 
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    backgroundColor: ag.tipo === 'Avaliação / Orçamento' ? '#c084fc' : '#34d399' 
                                  }} 
                                  title={ag.tipo}
                                ></span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      <p style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', margin: '10px 0' }}>Nenhum agendamento para este dia.</p>
                    ) : (
                      agendamentos
                        .filter(ag => ag.data === diaSelecionadoCal)
                        .map(ag => {
                          const corTipo = ag.tipo === 'Avaliação / Orçamento' ? '#c084fc' : '#34d399';
                          const bgTipo = ag.tipo === 'Avaliação / Orçamento' ? 'rgba(192, 132, 252, 0.15)' : 'rgba(52, 211, 153, 0.15)';
                          return (
                            <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: `1px solid ${corTipo}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', color: corTipo, backgroundColor: bgTipo, padding: '2px 8px', borderRadius: '4px' }}>{ag.tipo}</span>
                                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d4af37' }}>🕒 {ag.hora}</span>
                              </div>
                              <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '2px 0 0 0' }}>{ag.veiculo} <span style={{ fontSize: '12px', color: '#94a3b8' }}>({ag.matricula})</span></p>
                              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}><b>Cliente:</b> {ag.cliente} ({ag.contacto})</p>
                              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}><b>Detalhe:</b> {ag.servico}</p>
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: LIVRO-CAIXA COM UPLOAD DE FOTO/PDF DE DESPESAS */}
          {tab === 'financeiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa & Despesas Inteligentes</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Registe despesas manualmente ou tire foto / carregue PDF para preenchimento automático.</p>
              </div>

              {/* ÁREA DE UPLOAD DE FOTO / PDF PARA DESPESAS */}
              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '2px dashed #d4af37', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: 0 }}>📸📷 Inserir Despesa via Fatura (PDF / Foto)</h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>Carregue o PDF da fatura do fornecedor ou tire uma foto do recibo para o sistema extrair os dados e registar a despesa.</p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    📁 Carregar PDF / Fatura
                    <input type="file" accept=".pdf,image/*" onChange={processarUploadArquivoSimulado} style={{ display: 'none' }} />
                  </label>

                  <label style={{ backgroundColor: '#059669', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    📷 Tirar Foto (Câmara)
                    <input type="file" accept="image/*" capture="environment" onChange={processarUploadArquivoSimulado} style={{ display: 'none' }} />
                  </label>

                  {arquivoCarregadoNome && (
                    <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 'bold' }}>✓ Ficheiro detetado: {arquivoCarregadoNome}</span>
                  )}
                </div>

                <form onSubmit={adicionarDespesaInteligente} style={{ display: 'grid', gap: '14px', marginTop: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '10px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      placeholder="Descrição da Despesa" 
                      value={novaDespDescricao} 
                      onChange={(e) => setNovaDespDescricao(e.target.value)}
                      style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }} 
                    />
                    <input 
                      type="number" 
                      step="0.01" 
                      placeholder="Valor (€)" 
                      value={novaDespValor} 
                      onChange={(e) => setNovaDespValor(e.target.value)}
                      style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#f87171', fontWeight: 'bold', padding: '12px', borderRadius: '8px', fontSize: '14px' }} 
                    />
                    <select 
                      value={novaDespCategoria} 
                      onChange={(e) => setNovaDespCategoria(e.target.value)}
                      style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px' }}
                    >
                      <option value="Produtos/Peças">Produtos / Peças</option>
                      <option value="Serviço Externo / Pintor">Serviço Externo / Pintor</option>
                      <option value="Aluguer / Instalações">Aluguer / Instalações</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: '#d4af37', color: '#090a0f', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                      + Registar Despesa
                    </button>
                  </div>
                </form>
              </div>

              {/* LISTAGEM DE TRANSAÇÕES */}
              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Histórico de Movimentos (Livro-Caixa)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '500px', overflowY: 'auto' }}>
                  {transacoes.map(t => (
                    <div key={t.id} style={{ backgroundColor: '#090a0f', padding: '18px', borderRadius: '12px', border: '1px solid #222b45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>
                          {t.descricao} <span style={{ fontSize: '13px', color: '#60a5fa' }}>[{t.categoria}]</span>
                          {t.matricula && t.matricula !== 'GERAL' && <span style={{ marginLeft: '8px', backgroundColor: '#131722', border: '1px solid #222b45', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', color: '#d4af37' }}>🚗 {t.matricula}</span>}
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
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Gestão de Funcionários & Remuneração</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Controlo de equipa por Diária, Salário Fixo ou Porcentagem.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 18px 0' }}>Novo Funcionário</h3>
                  <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>Nome do Colaborador</label>
                      <input type="text" placeholder="Ex: João Silva" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>Tipo de Remuneração</label>
                      <select value={novoFuncTipo} onChange={(e) => setNovoFuncTipo(e.target.value as any)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }}>
                        <option value="comissao">Porcentagem / Comissão (%)</option>
                        <option value="fixo">Salário Fixo (€)</option>
                        <option value="diaria">Diária (€)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>{novoFuncTipo === 'comissao' ? 'Percentagem (%)' : 'Valor (€)'}</label>
                      <input type="number" step="0.01" value={novoFuncValor} onChange={(e) => setNovoFuncValor(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#34d399', fontWeight: 'bold', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    </div>

                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '10px' }}>Guardar Funcionário</button>
                  </form>
                </div>

                <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 18px 0' }}>Equipa Registada</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {funcionarios.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{f.nome}</p>
                          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#d4af37' }}>
                            {f.tipoRemuneracao === 'comissao' ? `Comissão: ${f.valorRemuneracao}%` : f.tipoRemuneracao === 'fixo' ? `Salário Fixo: ${f.valorRemuneracao}€` : `Diária: ${f.valorRemuneracao}€`}
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

          {/* ABA 7: CONFIGURAÇÕES */}
          {tab === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>⚙️ Dados Oficiais da Empresa</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Informações apresentadas nos orçamentos e ordens de serviço.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(19, 23, 34, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Nome / Razão Social</label>
                  <input type="text" value={dadosEmpresa.nome} onChange={(e) => setDadosEmpresa({...dadosEmpresa, nome: e.target.value})} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
