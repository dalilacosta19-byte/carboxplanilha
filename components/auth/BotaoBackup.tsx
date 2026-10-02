'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

// Todas as tabelas do negócio (public). Se criar uma tabela nova, acrescente o nome aqui.
const TABELAS = [
  'agendamentos',
  'carteiras',
  'clientes',
  'contadores',
  'despesas',
  'dias_trabalhados',
  'fecho_adiantamentos',
  'fecho_comissoes',
  'fechos_funcionario',
  'fornecedores',
  'funcionarios',
  'historico_atividade',
  'movimentos',
  'orcamento_itens',
  'orcamentos',
  'ordens_servico',
  'os_fotos',
  'os_item_tecnicos',
  'os_itens',
  'os_mes_comissao',
  'os_terceirizados',
  'produtos',
  'servicos',
  'stock_movimentos',
  'veiculos',
];

const PAGINA = 1000; // o Supabase devolve no máximo 1000 linhas de cada vez

async function lerTabelaCompleta(nome: string): Promise<unknown[]> {
  const linhas: unknown[] = [];
  for (let inicio = 0; ; inicio += PAGINA) {
    const { data, error } = await supabase.from(nome).select('*').range(inicio, inicio + PAGINA - 1);
    if (error) throw new Error(error.message);
    linhas.push(...(data ?? []));
    if (!data || data.length < PAGINA) break;
  }
  return linhas;
}

// Descarrega um ficheiro .json com TODAS as tabelas. Só lê, nunca altera nada.
export default function BotaoBackup() {
  const [aTrabalhar, setATrabalhar] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const exportar = async () => {
    setATrabalhar(true);
    setMensagem('');
    const backup: Record<string, unknown[]> = {};
    const falhas: string[] = [];
    for (const nome of TABELAS) {
      try {
        backup[nome] = await lerTabelaCompleta(nome);
      } catch {
        falhas.push(nome);
      }
    }
    const total = Object.values(backup).reduce((soma, l) => soma + l.length, 0);
    const conteudo = JSON.stringify({ exportado_em: new Date().toISOString(), tabelas: backup }, null, 2);
    const ficheiro = new Blob([conteudo], { type: 'application/json' });
    const ligacao = document.createElement('a');
    ligacao.href = URL.createObjectURL(ficheiro);
    ligacao.download = `backup-carbox77-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(ligacao);
    ligacao.click();
    ligacao.remove();
    URL.revokeObjectURL(ligacao.href);
    setATrabalhar(false);
    setMensagem(
      falhas.length === 0
        ? `Backup guardado (${total} registos).`
        : `Backup guardado (${total} registos), mas não foi possível ler: ${falhas.join(', ')}.`
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={exportar}
        disabled={aTrabalhar}
        style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '10px 16px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', opacity: aTrabalhar ? 0.6 : 1 }}
      >
        {aTrabalhar ? 'A exportar…' : 'Exportar backup'}
      </button>
      {mensagem && <span style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '260px' }}>{mensagem}</span>}
    </div>
  );
}
