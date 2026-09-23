'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('metricas');
  const [user, setUser] = useState('admin');

  // Estados dos dados (simulados para persistir na sessão)
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Detailer Master', comissaoPct: 35 },
    { id: 2, nome: 'Miguel Santos', cargo: 'Preparador / Lavagem', comissaoPct: 25 },
  ]);

  const [novoFuncNome, setNovoFuncNome] = useState('');
  const [novoFuncCargo, setNovoFuncCargo] = useState('');
  const [novoFuncPct, setNovoFuncPct] = useState('30');

  // Registo de serviços concluídos para cálculo de comissões
  const [servicosRealizados, setServicosRealizados] = useState([
    { id: 1, cliente: 'Carlos Alcantara', veiculo: 'BMW Série 3', servico: 'Polimento Comercial + Vitrificação', valor: 350, funcionarioId: 1, pago: true },
    { id: 2, cliente: 'Ana Rodrigues', veiculo: 'Audi A4', servico: 'Higienização de Interiores', valor: 120, funcionarioId: 2, pago: true },
  ]);

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoFuncNome.trim()) return;
    const novo = {
      id: Date.now(),
      nome: novoFuncNome,
      cargo: novoFuncCargo || 'Técnico',
      comissaoPct: parseFloat(novoFuncPct) || 30,
    };
    setFuncionarios([...funcionarios, novo]);
    setNovoFuncNome('');
    setNovoFuncCargo('');
    setNovoFuncPct('30');
  };

  const removerFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#60a5fa' }}>CARBOX PLANILHA</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'center', marginBottom: '24px' }}>Gestão de Estética Automotiva</p>
          <button 
            onClick={() => setUser('admin')} 
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>CBX</div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>CARBOX PLANILHA</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Portugal • Estética Automotiva</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '20px', border: '1px solid #334155', color: '#60a5fa' }}>
            👤 {user}
          </span>
          <button 
            onClick={() => setUser('')} 
            style={{ fontSize: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </header>

      <nav style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderBottom: '1px solid #1e293b', padding: '12px 24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[
          { id: 'metricas', label: '📊 Painel & Métricas' },
          { id: 'os', label: '🔧 Ordens de Serviço' },
          { id: 'agenda', label: '📅 Agenda & Feriados' },
          { id: 'financeiro', label: '💰 Financeiro & Caixa' },
          { id: 'comissoes', label: '👥 Funcionários & Comissões' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: tab === item.id ? '#2563eb' : 'transparent',
              color: tab === item.id ? '#fff' : '#94a3b8'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {tab === 'metricas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Painel Principal</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Faturamento Real (Mês)</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#34d399', margin: 0 }}>
                  {servicosRealizados.reduce((acc, s) => acc + s.valor, 0).toFixed(2)} €
                </p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Comissões Devidas</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#fbbf24', margin: 0 }}>
                  {servicosRealizados.reduce((acc, s) => {
                    const func = funcionarios.find(f => f.id === s.funcionarioId);
                    const pct = func ? func.comissaoPct : 0;
                    return acc + (s.valor * pct) / 100;
                  }, 0).toFixed(2)} €
                </p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Serviços Realizados</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#60a5fa', margin: 0 }}>{servicosRealizados.length}</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Equipa Ativa</p>
                <p style={{ fontSize: '24px', fontWeight: 'extrabold', color: '#a78bfa', margin: 0 }}>{funcionarios.length}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'os' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Ordens de Serviço (OS)</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de OS em desenvolvimento.
            </div>
          </div>
        )}

        {tab === 'agenda' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Agenda & Feriados (Portugal)</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de agenda com feriados nacionais.
            </div>
          </div>
        )}

        {tab === 'financeiro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Livro-Caixa & Financeiro</h2>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#94a3b8' }}>
              Módulo de lançamentos financeiros.
            </div>
          </div>
        )}

        {tab === 'comissoes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>Gestão de Funcionários & Comissões</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Registe a equipa e acompanhe os valores calculados por cada serviço.</p>
            </div>

            {/* Formulário para Novo Funcionário */}
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 16px 0' }}>Adicionar Novo Funcionário</h3>
              <form onSubmit={adicionarFuncionario} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Nome do Colaborador</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Pedro Martins"
                    value={novoFuncNome}
                    onChange={(e) => setNovoFuncNome(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Cargo / Especialidade</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Polidor / Esteticista"
                    value={novoFuncCargo}
                    onChange={(e) => setNovoFuncCargo(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Comissão (%)</label>
                  <input 
                    type="number" 
                    value={novoFuncPct}
                    onChange={(e) => setNovoFuncPct(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <button 
                  type="submit" 
                  style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', height: '41px' }}
                >
                  Adicionar
                </button>
              </form>
            </div>

            {/* Lista de Colaboradores e Resumo de Comissões */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Equipa Registada</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {funcionarios.map(f => {
                    const servsFunc = servicosRealizados.filter(s => s.funcionarioId === f.id);
                    const totalServs = servsFunc.reduce((acc, s) => acc + s.valor, 0);
                    const comissaoTotal = (totalServs * f.comissaoPct) / 100;

                    return (
                      <div key={f.id} style={{ backgroundColor: '#1e293b', padding: '14px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{f.nome}</p>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 6px 0' }}>{f.cargo} • <span style={{ color: '#60a5fa' }}>{f.comissaoPct}% comissão</span></p>
                          <p style={{ fontSize: '13px', color: '#34d399', fontWeight: 'bold', margin: 0 }}>A Receber: {comissaoTotal.toFixed(2)} €</p>
                        </div>
                        <button 
                          onClick={() => removerFuncionario(f.id)}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Registo de Serviços Executados */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Serviços Atribuídos & Comissões</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {servicosRealizados.map(s => {
                    const func = funcionarios.find(f => f.id === s.funcionarioId);
                    const pct = func ? func.comissaoPct : 0;
                    const valorComissao = (s.valor * pct) / 100;

                    return (
                      <div key={s.id} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #334155', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px' }}>
                          <span style={{ color: '#fff' }}>{s.servico}</span>
                          <span style={{ color: '#34d399' }}>{s.valor.toFixed(2)} €</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '12px' }}>
                          <span>Cliente: {s.cliente} ({s.veiculo})</span>
                          <span style={{ color: '#fbbf24' }}>Comissão ({pct}%): {valorComissao.toFixed(2)} €</span>
                        </div>
                        <div style={{ marginTop: '6px', fontSize: '11px', color: '#60a5fa' }}>
                          Responsável: {func ? func.nome : 'Não atribuído'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
