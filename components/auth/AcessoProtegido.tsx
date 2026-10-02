'use client';

import React, { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigurado, variaveisEmFalta } from '@/lib/supabase';
import Login from './login';

const ECRA: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#07080c',
  color: '#94a3b8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'system-ui, sans-serif',
  padding: '16px',
  textAlign: 'center',
};

interface InfoUtilizador {
  email: string;
  sair: () => void;
}

// Só mostra o conteúdo (children) a quem tiver iniciado sessão no Supabase.
export default function AcessoProtegido({ children }: { children: (info: InfoUtilizador) => ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [aCarregar, setACarregar] = useState(true);
  const [recuperacao, setRecuperacao] = useState(false);

  useEffect(() => {
    if (!supabaseConfigurado) {
      setACarregar(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session);
      setACarregar(false);
    });
    const { data: escuta } = supabase.auth.onAuthStateChange((evento, novaSessao) => {
      // Quem clica no link de recuperação chega aqui com sessão temporária:
      // primeiro tem de escolher a nova palavra-passe.
      if (evento === 'PASSWORD_RECOVERY') setRecuperacao(true);
      setSessao(novaSessao);
    });
    return () => escuta.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigurado) {
    return (
      <div style={ECRA}>
        <div style={{ maxWidth: '420px' }}>
          <p style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '8px' }}>Falta configurar a ligação ao Supabase</p>
          <p style={{ fontSize: '14px', margin: '0 0 8px 0' }}>
            Este deploy não recebeu {variaveisEmFalta.length === 1 ? 'a variável' : 'as variáveis'}:
          </p>
          {variaveisEmFalta.map((nome) => (
            <p key={nome} style={{ fontSize: '13px', margin: '0 0 4px 0', color: '#d4af37', wordBreak: 'break-all' }}>{nome}</p>
          ))}
          <p style={{ fontSize: '13px', margin: '12px 0 0 0' }}>
            No Vercel (Settings &gt; Environment Variables) confirme o nome e que inclui o ambiente Preview.
            Depois faça um novo deploy (as variáveis só entram quando o site é construído).
          </p>
        </div>
      </div>
    );
  }

  if (aCarregar) {
    return <div style={ECRA}>A carregar…</div>;
  }

  if (recuperacao) {
    return <Login modoInicial="nova" onNovaSenhaGuardada={() => setRecuperacao(false)} />;
  }

  if (!sessao) {
    return <Login />;
  }

  return <>{children({ email: sessao.user.email ?? '', sair: () => void supabase.auth.signOut() })}</>;
}
