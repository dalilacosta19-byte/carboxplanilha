'use client';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [tab, setTab] = useState('pateo');
  const [user, setUser] = useState('admin');

  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: 'CARBOX77 DETAILING, UNIPESSOAL LDA',
    nif: 'Rascunho',
    morada: 'Rua da Torre, Pavilhão Guilherme Pinto Basto, 2750-748 Cascais, Portugal',
    telefone: '+351 211 515 449',
    email: 'carbox77detailing@gmail.com',
    capitalSocial: '50000,00',
    conservatoria: 'Registo Comercial de Lisboa',
    iban: 'PT50 0033 0000 4546 1405 9370 5',
    swift: 'BCOPTPL'
  });

  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');
  const [mesFiltro, setMesFiltro] = useState('');
  const [matriculaFiltro, setMatriculaFiltro] = useState('');

  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Rececionista', tipoRemuneracao: 'fixo', valorPctOuFixo: 1000 },
    { id: 3, nome: 'Ricardo Costa', cargo: 'Polidor Externo', tipoRemuneracao: 'diaria', valorPctOuFixo: 75 },
    { id: 4, nome: 'Kevin', cargo: 'Detailer', tipoRemuneracao: 'comissao', valorPctOuFixo: 30 }
  ]);
  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [tipoRemuneracao, setTipoRemuneracao] = useState<'comissao' | 'fixo' | 'diaria'>('comissao');
  const [valorRemuneracao, setValorRemuneracao] = useState('30');

  // Agenda integrada
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, tipo: 'Agendamento', cliente: 'Carla Monteiro', contacto: '+351 922 333 444', veiculo: 'Renault Captur', matricula: 'AZ-91-GI', servico: 'Limpeza Detalhada + PPF', data: '2026-09-23', hora: '14:00', status: 'Agendado' }
  ]);

  // Navegação do Calendário
  const [anoAtualCal, setAnoAtualCal] = useState(2026);
  const [mesAtualCal, setMesAtualCal] = useState(8); // Setembro
  const [diaSelecionadoCal, setDiaSelecionadoCal] = useState('2026-09-23');

  // Formulário Unificado (OS / Orçamento / Agendamento)
  const [tipoRegistroOS, setTipoRegistroOS] = useState<'os' | 'agendamento' | 'orcamento'>('orcamento');
  const [tipoDocumentoGerar, setTipoDocumentoGerar] = useState<'ORÇAMENTO' | 'ORDEM DE SERVIÇO'>('ORÇAMENTO');
  
  const [osCliente, setOsCliente] = useState('Carla Monteiro');
  const [osContacto, setOsContacto] = useState('+351 922 333 444');
  const [osVeiculo, setOsVeiculo] = useState('Renault Captur');
  const [osMatricula, setOsMatricula] = useState('AZ-91-GI');
  const [osObs, setOsObs] = useState('Renault Captur matrícula AZ-91-GI. IVA - regime de isenção.');

  const [osDataAgend, setOsDataAgend] = useState('2026-09-23');
  const [osHoraAgend, setOsHoraAgend] = useState('14:00');

  // Múltiplos serviços com técnicos, valores e descontos individuais
  const [listaItensServico, setListaItensServico] = useState([
    { id: 1, descricao: '13 - LIMPEZA DETALHADA', funcionario: 'João Silva', valor: '120.00', desconto: '120.00' },
    { id: 2, descricao: '57 - APLICAÇÃO DE PPF NOS BLACK PIANO', funcionario: 'Kevin', valor: '400.00', desconto: '0.00' },
    { id: 3, descricao: '111 - FUSION COATING', funcionario: 'Ricardo Costa', valor: '900.00', desconto: '0.00' }
  ]);

  // Custos detalhados
  const [listaCustosDetalhados, setListaCustosDetalhados] = useState([
    { id: 1, descricao: 'Película PPF', valor: '150.00' }
  ]);

  const [osSinal, setOsSinal] = useState('300.00');
  const [osContaRecebimentoSinal, setOsContaRecebimentoSinal] = useState('MB WAY');
  const [osContaRecebimentoFinal, setOsContaRecebimentoFinal] = useState('MB WAY');

  // Estados para autocompletar sugestões
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
      servico: 'Limpeza Detalhada + PPF Black Piano + Fusion Coating',
      observacoes: 'Renault Captur matrícula AZ-91-GI. IVA - regime de isenção.', 
      custosDetalhados: [{ descricao: 'Película PPF', valor: 150.00 }], 
      valorOriginal: 1420.00, 
      descontoTotal: 120.00, 
      valorFinal: 1300.00, 
      sinalPago: 300.00,
      contaRecebimentoSinal: 'MB WAY',
      restanteAPagar: 1000.00,
      status: 'Em Execução', 
      data: '2026-09-23' 
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: 'Sinal OS #101 (Renault Captur)', matricula: 'AZ-91-GI', categoria: 'Serviço', tipo: 'receita', valor: 300.00, data: '2026-09-23' },
    { id: 2, descricao: 'Compra Película PPF', matricula: 'AZ-91-GI', categoria: 'Produtos/Peças', tipo: 'despesa', valor: 150.00, data: '2026-09-23' }
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
    if (!novoFuncNome || !novoFuncCargo) return;
    setFuncionarios([...funcionarios, { id: Date.now(), nome: novoFuncNome, cargo: novoFuncCargo, tipoRemuneracao, valorPctOuFixo: Number(valorRemuneracao) || 0 }]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
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

    // Se for apenas Agendamento puro, guarda na agenda
    if (tipoRegistroOS === 'agendamento') {
      const novoAg = {
        id: Date.now(),
        tipo: 'Agendamento',
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

    // Se for Orçamento ou Ordem de Serviço, gera e imprime o PDF oficial
    const tituloDoc = tipoRegistroOS === 'orcamento' ? 'ORÇAMENTO' : tipoDocumentoGerar;

    let valorOrig = 0;
    let totalDesc = 0;

    const servicosDetalhesArray = listaItensServico.map(i => {
      const val = Number(i.valor) || 0;
      const desc = Number(i.desconto) || 0;
      valorOrig += val;
      totalDesc += desc;
      return { 
        descricao: i.descricao || 'Serviço Geral', 
        funcionario: i.funcionario || 'Não atribuído', 
        valor: val,
        desconto: desc
      };
    });

    const valorFin = Math.max(0, valorOrig - totalDesc);
    const sinal = Number(osSinal) || 0;
    const restante = Math.max(0, valorFin - sinal);
    const custosArray = listaCustosDetalhados.filter(c => c.descricao && Number(c.valor) > 0).map(c => ({ descricao: c.descricao, valor: Number(c.valor) }));
    const matriculaU = osMatricula ? osMatricula.toUpperCase() : 'SEM MATRÍCULA';
    const dataHoje = new Date().toISOString().split('T')[0];
    const docId = Date.now().toString().slice(-4);

    if (tipoRegistroOS === 'os') {
      const novoRegisto = {
        id: Number(docId),
        cliente: osCliente,
        contacto: osContacto,
        veiculo: osVeiculo || 'Renault Captur',
        matricula: matriculaU,
        servicosDetalhes: servicosDetalhesArray,
        servico: servicosDetalhesArray.map(s => s.descricao).join(' + '),
        observacoes: osObs || `${osVeiculo} matrícula ${matriculaU}. IVA - regime de isenção.`,
        custosDetalhados: custosArray,
        valorOriginal: valorOrig,
        descontoTotal: totalDesc,
        valorFinal: valorFin,
        sinalPago: sinal,
        contaRecebimentoSinal: sinal > 0 ? osContaRecebimentoSinal : 'Nenhum',
        restanteAPagar: restante,
        status: 'Em Execução',
        data: dataHoje
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
          data: dataHoje
        }, ...prev]);
      }

      custosArray.forEach((custo, cIdx) => {
        setTransacoes(prev => [{
          id: Date.now() + 10 + cIdx,
          descricao: `Custo (${custo.descricao}) OS #${docId} (${matriculaU})`,
          matricula: matriculaU,
          categoria: 'Produtos/Peças/Pintor',
          tipo: 'despesa' as const,
          valor: custo.valor,
          data: dataHoje
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
            .top-bar { display: flex; justify-content: flex-end; gap: 15px; margin-bottom: 10px; font-size: 11px; }
            .badge-box { border: 1px solid #999; padding: 3px 10px; font-weight: bold; background: #f5f5f5; }
            .header-container { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 20px; }
            
            .carbox-logo-container { display: inline-block; }
            .carbox-main-row { display: flex; align-items: baseline; }
            .carbox-gold-text { font-family: Arial, sans-serif; font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #f3e792 0%, #c59b27 50%, #b8860b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px; }
            .carbox-black-text { font-family: Arial, sans-serif; font-size: 32px; font-weight: 900; color: #111; letter-spacing: -0.5px; }
            .carbox-subtext { font-family: Arial, sans-serif; font-size: 9px; font-weight: bold; letter-spacing: 5px; color: #b8860b; margin-top: -2px; margin-left: 38px; }

            .doc-title-box { text-align: right; }
            .doc-title-box h2 { font-size: 22px; margin: 0 0 4px 0; color: #111; text-transform: uppercase; letter-spacing: 0.5px; }
            .doc-title-box p { font-size: 12px; margin: 2px 0; color: #555; }
            
            .company-details { font-size: 11px; color: #444; line-height: 1.5; margin-bottom: 20px; }
            .client-box { border: 1px solid #ccc; padding: 12px; border-radius: 4px; margin-bottom: 20px; background: #fafafa; display: flex; justify-content: space-between; font-size: 13px; }
            
            .meta-grid { display: grid; grid-template-columns: repeat(5, 1fr); border: 1px solid #ccc; background: #f9f9f9; text-align: center; font-size: 11px; margin-bottom: 20px; }
            .meta-cell { padding: 8px; border-right: 1px solid #ccc; }
            .meta-cell:last-child { border-right: none; }
            .meta-cell b { display: block; margin-top: 2px; font-size: 12px; color: #111; }

            table.items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            table.items-table th { background: #111; color: #fff; font-size: 11px; text-transform: uppercase; padding: 8px 10px; text-align: left; }
            table.items-table td { border-bottom: 1px solid #ddd; padding: 10px; font-size: 12px; }
            
            .summary-container { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px; }
            .bank-info { font-size: 11px; color: #333; line-height: 1.5; }
            .totals-box { width: 300px; font-size: 12px; }
            .totals-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
            .totals-row.final { font-size: 15px; font-weight: bold; color: #111; border-top: 2px solid #111; border-bottom: none; padding-top: 8px; margin-top: 4px; }
            
            .obs-box { margin-top: 20px; font-size: 11px; color: #333; background: #f4f4f4; padding: 10px; border-radius: 4px; }
            .footer-note { margin-top: 30px; font-size: 10px; text-align: center; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="top-bar">
            <span class="badge-box">ORIGINAL</span>
            <span class="badge-box" style="background:#fff; color:#777;">RASCUNHO</span>
          </div>

          <div class="header-container">
            <div>
              <div class="carbox-logo-container">
                <div class="carbox-main-row">
                  <span class="carbox-gold-text">CAR</span>
                  <span class="carbox-black-text">BO</span>
                  <span class="carbox-black-text" style="position:relative;">X</span>
                  <div style="display:inline-block; margin-left:-2px; vertical-align:top;">
                    <svg width="36" height="34" viewBox="0 0 100 90" style="overflow:visible;">
                      <path d="M10,15 L85,15 L70,45 L35,45 L25,75 L60,75" fill="none" stroke="url(#goldGrad)" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/>
                      <path d="M30,0 L95,0 L80,30 L45,30 L35,60 L70,60" fill="none" stroke="url(#goldGrad)" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>
                      <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#fae17d" />
                          <stop offset="50%" stop-color="#d4af37" />
                          <stop offset="100%" stop-color="#996515" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div class="carbox-subtext">DETAILING</div>
              </div>
            </div>

            <div class="doc-title-box">
              <h2>${tituloDoc}</h2>
              <p><b>Data de Emissão:</b> ${dataHoje}</p>
            </div>
          </div>

          <div class="company-details">
            <b>${dadosEmpresa.nome}</b><br/>
            ${dadosEmpresa.morada}<br/>
            <b>E-mail:</b> ${dadosEmpresa.email}<br/>
            <b>NIF:</b> ${dadosEmpresa.nif}<br/>
            <b>Capital Social:</b> ${dadosEmpresa.capitalSocial}<br/>
            <b>Conservatória:</b> ${dadosEmpresa.conservatoria}
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

          <div class="meta-grid">
            <div class="meta-cell">NIF:<b>Rascunho</b></div>
            <div class="meta-cell">Referência:<b>-</b></div>
            <div class="meta-cell">Válido até:<b>${dataHoje}</b></div>
            <div class="meta-cell">IVA:<b>0,00€</b></div>
            <div class="meta-cell" style="border-right:none;">Total:<b>${valorFin.toFixed(2)}€</b></div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Preço Unit.</th>
                <th>Quant.</th>
                <th>Total c/ IVA</th>
                <th>Desc.</th>
                <th>IVA</th>
                <th>Total c/ IVA</th>
              </tr>
            </thead>
            <tbody>
              ${servicosDetalhesArray.map((s) => `
                <tr>
                  <td><b>${s.descricao}</b> ${s.funcionario ? `<br/><span style="color:#666; font-size:11px;">Técnico: ${s.funcionario}</span>` : ''}</td>
                  <td>${s.valor.toFixed(2)}€</td>
                  <td>1,0</td>
                  <td>${s.valor.toFixed(2)}€</td>
                  <td>${s.desconto ? s.desconto.toFixed(2) + '€' : '0,00€'}</td>
                  <td>23,00%</td>
                  <td><b>${(s.valor - (s.desconto || 0)).toFixed(2)}€</b></td>
                </tr>
              `).join('')}
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
                <span>${valorOrig.toFixed(2)}€</span>
              </div>
              <div class="totals-row">
                <span>Desconto Total:</span>
                <span>-${totalDesc.toFixed(2)}€</span>
              </div>
              ${sinal > 0 ? `
              <div class="totals-row">
                <span>Sinal (${osContaRecebimentoSinal}):</span>
                <span style="color:#059669;">-${sinal.toFixed(2)}€</span>
              </div>` : ''}
              <div class="totals-row final">
                <span>Total:</span>
                <span>${restante.toFixed(2)}€</span>
              </div>
              <div style="font-size:11px; color:#555; margin-top:8px; text-align:right;">
                Total Sem IVA: ${valorFin.toFixed(2)}€<br/>
                IVA: 0,00€
              </div>
            </div>
          </div>

          ${osObs ? `<div class="obs-box"><b>Observações:</b> ${osObs}</div>` : ''}

          <div class="footer-note">
            Este documento não serve de factura • Documento processado por computador • Página 1/1
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    w.document.close();
  };

  const atualizarStatusOS = (id: number, novoStatus: string) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === id) {
        const dataHoje = new Date().toISOString().split('T')[0];
        if (novoStatus === 'Pronto / Entregue' && os.restanteAPagar > 0) {
          const saldo = os.restanteAPagar;
          setTransacoes(prev => [{
            id: Date.now(),
            descricao: `Liquidação Final OS #${os.id} (${os.cliente}) via ${osContaRecebimentoFinal}`,
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

  const menuItems = [
    { id: 'pateo', label: '🚗 Veículos no Pátio' },
    { id: 'metricas', label: '📊 Painel & Gráficos' },
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
    <div style={{ minHeight: '100vh', backgroundColor: '#090a0f', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER COM LOGÓTIPO IDÊNTICO À MARCA */}
      <header style={{ backgroundColor: '#0d0f17', borderBottom: '1px solid #1e2235', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #f3e792 0%, #c59b27 50%, #b8860b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CAR</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>BOX</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#d4af37', marginLeft: '4px' }}>77</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '4px', color: '#d4af37', margin: 0 }}>DETAILING</p>
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{dadosEmpresa.nome}</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Estética Automotiva de Alta Performance • Cascais</p>
          </div>
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
                    <div key={os.id} style={{ backgroundColor: '#131722', border: '1px solid #1e2235', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
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

                      <div style={{ backgroundColor: '#090a0f', padding: '16px', borderRadius: '12px', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #1e2235' }}>
                        <p style={{ margin: 0, color: '#f1f5f9' }}><b>Cliente:</b> {os.cliente} {os.contacto && <span style={{ color: '#94a3b8', fontSize: '13px' }}>({os.contacto})</span>}</p>
                        <div>
                          <p style={{ margin: '0 0 4px 0', color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>Serviços e Descontos:</p>
                          {os.servicosDetalhes ? (
                            os.servicosDetalhes.map((s: any, idx: number) => (
                              <p key={idx} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: '14px' }}>• {s.descricao} - <b>{(s.valor - (s.desconto || 0)).toFixed(2)}€</b> {s.desconto > 0 && <span style={{ color: '#f87171', fontSize: '12px' }}>(Desc: {s.desconto.toFixed(2)}€)</span>}</p>
                            ))
                          ) : (
                            <p style={{ margin: 0, color: '#cbd5e1' }}>{(os as any).servico}</p>
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
                    </div>
                  );
                })}
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
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Balanço Líquido</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: liq >= 0 ? '#34d399' : '#f87171', margin: 0 }}>{liq.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Receitas</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>+{rec.toFixed(2)} €</p>
                    </div>
                    <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>Total Custos / Despesas</p>
                      <p style={{ fontSize: '32px', fontWeight: 'extrabold', color: '#f87171', margin: 0 }}>-{desp.toFixed(2)} €</p>
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

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', maxWidth: '950px' }}>
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

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>Viatura</label>
                    <input type="text" placeholder="Ex: Renault Captur" value={osVeiculo} onChange={(e) => setOsVeiculo(e.target.value)} style={{ width: '100%', backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', boxSizing: 'border-box', fontSize: '16px' }} />
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
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Calendário de Agendamentos & Orçamentos</h2>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Selecione um dia no calendário para ver todas as marcações.</p>
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
                          {temAgendamento && !feriadoDia && <span style={{ width: '6px', height: '6px', backgroundColor: '#60a5fa', borderRadius: '50%', marginTop: '4px' }}></span>}
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
                      <p style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', margin: '10px 0' }}>Nenhum agendamento para este dia.</p>
                    ) : (
                      agendamentos
                        .filter(ag => ag.data === diaSelecionadoCal)
                        .map(ag => (
                          <div key={ag.id} style={{ backgroundColor: '#090a0f', padding: '14px', borderRadius: '10px', border: '1px solid #222b45', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '11px', fontWeight: 'bold', color: ag.tipo === 'Orçamento' ? '#c084fc' : '#60a5fa', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{ag.tipo}</span>
                              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d4af37' }}>🕒 {ag.hora}</span>
                            </div>
                            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '2px 0 0 0' }}>{ag.veiculo} <span style={{ fontSize: '12px', color: '#94a3b8' }}>({ag.matricula})</span></p>
                            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}><b>Cliente:</b> {ag.cliente} ({ag.contacto})</p>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}><b>Serviço:</b> {ag.servico}</p>
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
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Livro-Caixa</h2>
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Registo financeiro com receitas e custos detalhados.</p>
              </div>

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '500px', overflowY: 'auto' }}>
                  {transacoes.map(t => (
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
                <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Controlo de equipa e técnicos.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', margin: '0 0 18px 0' }}>Novo Funcionário</h3>
                  <form onSubmit={adicionarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="text" placeholder="Nome" value={novoFuncNome} onChange={(e) => setNovoFuncNome(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    <input type="text" placeholder="Cargo" value={novoFuncCargo} onChange={(e) => setNovoFuncCargo(e.target.value)} style={{ backgroundColor: '#090a0f', border: '1px solid #222b45', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px' }} />
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Guardar</button>
                  </form>
                </div>

                <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '28px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 18px 0' }}>Equipa</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {funcionarios.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090a0f', padding: '16px', borderRadius: '10px', border: '1px solid #222b45' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{f.nome} ({f.cargo})</p>
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

              <div style={{ backgroundColor: '#131722', border: '1px solid #1e2235', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
