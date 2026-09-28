{/* Sugestões Inteligentes de Serviços Anteriores */}
<datalist id="sugestoes-servicos">
  {Array.from(new Set(ordensServico.flatMap(o => (o.servicos || []).map(s => s.descricao)))).map((desc, i) => (
    <option key={i} value={desc} />
  ))}
  <option value="Limpeza Detalhada" />
  <option value="Polimento" />
  <option value="Lavagem Completa" />
  <option value="Proteção Cerâmica" />
  <option value="Tratamento de Pele" />
</datalist>

{/* Secção de Adição de Serviços com Memória e Desconto */}
<div style={{ backgroundColor: '#1a2238', padding: '15px', borderRadius: '10px', border: '1px solid #2a3655', marginBottom: '15px' }}>
  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px' }}>🛠️ Adicionar Serviço com Desconto e Técnico</div>
  
  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr auto', gap: '10px', alignItems: 'center' }}>
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
    <button 
      type="button"
      onClick={() => {
        if (!novoServicoDescricao || !novoServicoValor) return;
        const val = parseFloat(novoServicoValor) || 0;
        const desc = parseFloat(novoServicoDesconto) || 0;
        const final = Math.max(0, val - desc);
        
        setServicosTemp([...servicosTemp, {
          descricao: novoServicoDescricao,
          valor: val,
          desconto: desc,
          valorFinal: final,
          tecnico: novoServicoTecnico || 'Equipa CARBOX77'
        }]);
        setNovoServicoDescricao('');
        setNovoServicoValor('');
        setNovoServicoDesconto('');
      }}
      style={{ padding: '10px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
    >
      Adicionar
    </button>
  </div>
</div>
