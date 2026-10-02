import { createClient } from '@supabase/supabase-js';

// As duas chaves vêm das variáveis de ambiente do Vercel (Settings > Environment Variables).
// São chaves PÚBLICAS: a proteção dos dados está nas regras de acesso (RLS) do Supabase.
// NUNCA colocar aqui a chave "secret" / "service_role".
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const chave = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Se faltar alguma, o app mostra um aviso em vez de falhar.
export const supabaseConfigurado = Boolean(url && chave);

// Nomes (nunca os valores) das variáveis que não chegaram a este deploy.
export const variaveisEmFalta: string[] = [
  ...(url ? [] : ['NEXT_PUBLIC_SUPABASE_URL']),
  ...(chave ? [] : ['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']),
];

export const supabase = createClient(
  url ?? 'https://exemplo.supabase.co',
  chave ?? 'chave-em-falta'
);
