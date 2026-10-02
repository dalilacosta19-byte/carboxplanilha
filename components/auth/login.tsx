'use client';

import React, { useState, type CSSProperties, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type Modo = 'entrar' | 'recuperar' | 'nova';

interface LoginProps {
  // "nova" abre o ecrã de escolher nova palavra-passe (depois de clicar no link do e-mail).
  modoInicial?: Modo;
  // Chamado quando a nova palavra-passe fica guardada.
  onNovaSenhaGuardada?: () => void;
}

const ECRA: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#07080c',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  fontFamily: 'system-ui, sans-serif',
  color: '#f8fafc',
};
const CARTAO: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  backgroundColor: '#0b0d14',
  border: '1px solid #1f293d',
  borderRadius: '16px',
  padding: '32px',
  boxSizing: 'border-box',
};
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' };
const CAMPO: CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#131722',
  border: '1px solid #222b45',
  borderRadius: '10px',
  color: '#f8fafc',
  fontSize: '16px',
  boxSizing: 'border-box',
};
const BOTAO: CSSProperties = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#d4af37',
  color: '#090a0f',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
const LIGACAO: CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#d4af37',
  fontSize: '14px',
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0,
};

// Traduz as mensagens de erro mais comuns do Supabase.
function traduzirErro(mensagem: string): string {
  const m = mensagem.toLowerCase();
  if (m.includes('invalid login credentials')) return 'E-mail ou palavra-passe incorretos.';
  if (m.includes('email not confirmed')) return 'Este e-mail ainda não foi confirmado.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Muitas tentativas. Espere uns minutos e tente de novo.';
  if (m.includes('at least') && m.includes('characters')) return 'A palavra-passe é curta demais (mínimo 6 caracteres).';
  if (m.includes('different from the old password')) return 'A nova palavra-passe tem de ser diferente da anterior.';
  return 'Não foi possível concluir. Tente de novo.';
}

export default function Login({ modoInicial = 'entrar', onNovaSenhaGuardada }: LoginProps) {
  const [modo, setModo] = useState<Modo>(modoInicial);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [erro, setErro] = useState('');
  const [info, setInfo] = useState('');
  const [aTrabalhar, setATrabalhar] = useState(false);

  const limpar = () => {
    setErro('');
    setInfo('');
  };

  const entrar = async (e: FormEvent) => {
    e.preventDefault();
    limpar();
    setATrabalhar(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
    setATrabalhar(false);
    if (error) setErro(traduzirErro(error.message));
    // Se correr bem, o ecrã muda sozinho (quem escuta a sessão trata disso).
  };

  const pedirRecuperacao = async (e: FormEvent) => {
    e.preventDefault();
    limpar();
    setATrabalhar(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    setATrabalhar(false);
    if (error) {
      setErro(traduzirErro(error.message));
    } else {
      // Mensagem igual quer o e-mail exista ou não, para não revelar quem tem conta.
      setInfo('Se este e-mail tiver conta, enviámos um link para escolher uma nova palavra-passe.');
    }
  };

  const guardarNovaSenha = async (e: FormEvent) => {
    e.preventDefault();
    limpar();
    if (senha.length < 8) {
      setErro('Escolha uma palavra-passe com pelo menos 8 caracteres.');
      return;
    }
    if (senha !== senha2) {
      setErro('As duas palavras-passe não são iguais.');
      return;
    }
    setATrabalhar(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    setATrabalhar(false);
    if (error) {
      setErro(traduzirErro(error.message));
    } else {
      setInfo('Palavra-passe guardada.');
      onNovaSenhaGuardada?.();
    }
  };

  const titulo =
    modo === 'entrar' ? 'Acesso CARBOX77' : modo === 'recuperar' ? 'Recuperar palavra-passe' : 'Nova palavra-passe';
  const subtitulo =
    modo === 'entrar'
      ? 'Insira as suas credenciais para continuar'
      : modo === 'recuperar'
        ? 'Indique o seu e-mail e enviamos um link'
        : 'Escolha a sua nova palavra-passe';

  return (
    <div style={ECRA}>
      <div style={CARTAO}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '1px', color: '#d4af37' }}>
            CARBOX<span style={{ color: '#fff' }}>77</span>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '3px', fontWeight: 'bold' }}>DETAILING</div>
          <h2 style={{ fontSize: '20px', margin: '20px 0 4px 0' }}>{titulo}</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>{subtitulo}</p>
        </div>

        {erro && (
          <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '14px', textAlign: 'center' }}>
            {erro}
          </div>
        )}
        {info && (
          <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', color: '#4ade80', fontSize: '14px', textAlign: 'center' }}>
            {info}
          </div>
        )}

        {modo === 'entrar' && (
          <form onSubmit={entrar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={ETIQUETA}>E-mail</label>
              <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} style={CAMPO} placeholder="nome@exemplo.com" />
            </div>
            <div>
              <label style={ETIQUETA}>Palavra-passe</label>
              <input type="password" required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} style={CAMPO} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={aTrabalhar} style={{ ...BOTAO, opacity: aTrabalhar ? 0.6 : 1 }}>
              {aTrabalhar ? 'A entrar…' : 'Entrar no Sistema'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" style={LIGACAO} onClick={() => { limpar(); setModo('recuperar'); }}>
                Esqueci a palavra-passe
              </button>
            </div>
          </form>
        )}

        {modo === 'recuperar' && (
          <form onSubmit={pedirRecuperacao} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={ETIQUETA}>E-mail</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={CAMPO} placeholder="nome@exemplo.com" />
            </div>
            <button type="submit" disabled={aTrabalhar} style={{ ...BOTAO, opacity: aTrabalhar ? 0.6 : 1 }}>
              {aTrabalhar ? 'A enviar…' : 'Enviar link'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" style={LIGACAO} onClick={() => { limpar(); setModo('entrar'); }}>
                Voltar ao início de sessão
              </button>
            </div>
          </form>
        )}

        {modo === 'nova' && (
          <form onSubmit={guardarNovaSenha} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={ETIQUETA}>Nova palavra-passe (mínimo 8 caracteres)</label>
              <input type="password" required autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} style={CAMPO} />
            </div>
            <div>
              <label style={ETIQUETA}>Repita a palavra-passe</label>
              <input type="password" required autoComplete="new-password" value={senha2} onChange={(e) => setSenha2(e.target.value)} style={CAMPO} />
            </div>
            <button type="submit" disabled={aTrabalhar} style={{ ...BOTAO, opacity: aTrabalhar ? 0.6 : 1 }}>
              {aTrabalhar ? 'A guardar…' : 'Guardar palavra-passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
