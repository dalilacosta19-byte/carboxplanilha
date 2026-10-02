'use client';

import React, { useCallback, useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import {
  adicionarVeiculo,
  atualizarCliente,
  atualizarVeiculo,
  criarCliente,
  listarClientes,
  mensagemErro,
  normalizarMatricula,
  ouNulo,
  type Cliente,
  type DadosCliente,
  type DadosVeiculo,
  type Veiculo,
} from '@/lib/clientes';

// ---------- estilos (iguais ao resto do app) ----------
const CARTAO: CSSProperties = { backgroundColor: 'rgba(19, 23, 34, 0.92)', border: '1px solid #222b45', borderRadius: '14px', padding: '20px' };
const ETIQUETA: CSSProperties = { display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' };
const CAMPO: CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid #222b45', borderRadius: '10px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' };
const BOTAO_OURO: CSSProperties = { backgroundColor: '#d4af37', color: '#090a0f', border: 'none', padding: '12px 18px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const BOTAO_LINHA: CSSProperties = { backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #222b45', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' };
const GRELHA: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' };

// ---------- formulários ----------
interface FormCliente { nome: string; apelido: string; telefone: string; telefone2: string; email: string; notas: string }
interface FormVeiculo { matricula: string; modelo: string; ano: string; cor: string; notas: string }

const clienteVazio: FormCliente = { nome: '', apelido: '', telefone: '', telefone2: '', email: '', notas: '' };
const veiculoVazio: FormVeiculo = { matricula: '', modelo: '', ano: '', cor: '', notas: '' };

// O que está aberto no ecrã: nada, novo cliente, editar cliente, novo veículo ou editar veículo.
type Edicao =
  | { tipo: 'nenhuma' }
  | { tipo: 'novoCliente' }
  | { tipo: 'editarCliente'; cliente: Cliente }
  | { tipo: 'novoVeiculo'; cliente: Cliente }
  | { tipo: 'editarVeiculo'; cliente: Cliente; veiculo: Veiculo };

function paraFormCliente(c: Cliente): FormCliente {
  return { nome: c.nome, apelido: c.apelido ?? '', telefone: c.telefone, telefone2: c.telefone2 ?? '', email: c.email ?? '', notas: c.notas ?? '' };
}
function paraFormVeiculo(v: Veiculo): FormVeiculo {
  return { matricula: v.matricula, modelo: v.modelo ?? '', ano: v.ano ? String(v.ano) : '', cor: v.cor ?? '', notas: v.notas ?? '' };
}

// Valida e converte o formulário do veículo. Devolve texto de erro ou os dados prontos.
function validarVeiculo(f: FormVeiculo): { erro?: string; dados?: DadosVeiculo } {
  const matricula = normalizarMatricula(f.matricula);
  if (!matricula) return { erro: 'A matrícula é obrigatória.' };
  let ano: number | null = null;
  if (f.ano.trim()) {
    ano = Number(f.ano);
    const limite = new Date().getFullYear() + 1;
    if (!Number.isInteger(ano) || ano < 1900 || ano > limite) return { erro: `O ano tem de estar entre 1900 e ${limite}.` };
  }
  return { dados: { matricula, modelo: ouNulo(f.modelo), ano, cor: ouNulo(f.cor), notas: ouNulo(f.notas) } };
}

function validarCliente(f: FormCliente): { erro?: string; dados?: DadosCliente } {
  if (!f.nome.trim()) return { erro: 'O nome é obrigatório.' };
  if (!f.telefone.trim()) return { erro: 'O telefone é obrigatório.' };
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) return { erro: 'O e-mail não parece válido.' };
  return {
    dados: {
      nome: f.nome.trim(),
      apelido: ouNulo(f.apelido),
      telefone: f.telefone.trim(),
      telefone2: ouNulo(f.telefone2),
      email: ouNulo(f.email),
      notas: ouNulo(f.notas),
    },
  };
}

export default function AbaClientes({ onAlterado }: { onAlterado?: () => void }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [aCarregar, setACarregar] = useState(true);
  const [erroLista, setErroLista] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [mostrarInativos, setMostrarInativos] = useState(false);

  const [edicao, setEdicao] = useState<Edicao>({ tipo: 'nenhuma' });
  const [fCliente, setFCliente] = useState<FormCliente>(clienteVazio);
  const [fVeiculo, setFVeiculo] = useState<FormVeiculo>(veiculoVazio);
  const [erroForm, setErroForm] = useState('');
  const [aGuardar, setAGuardar] = useState(false);
  const [aviso, setAviso] = useState('');

  const carregar = useCallback(async () => {
    setACarregar(true);
    setErroLista('');
    try {
      setClientes(await listarClientes());
    } catch (e) {
      setErroLista(mensagemErro(e));
    }
    setACarregar(false);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const abrir = (nova: Edicao) => {
    setErroForm('');
    setAviso('');
    setEdicao(nova);
    if (nova.tipo === 'novoCliente') { setFCliente(clienteVazio); setFVeiculo(veiculoVazio); }
    if (nova.tipo === 'editarCliente') setFCliente(paraFormCliente(nova.cliente));
    if (nova.tipo === 'novoVeiculo') setFVeiculo(veiculoVazio);
    if (nova.tipo === 'editarVeiculo') setFVeiculo(paraFormVeiculo(nova.veiculo));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const fechar = () => { setEdicao({ tipo: 'nenhuma' }); setErroForm(''); };

  const depoisDeGuardar = async (mensagem: string) => {
    setEdicao({ tipo: 'nenhuma' });
    setAviso(mensagem);
    await carregar();
    onAlterado?.();
  };

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    setErroForm('');
    setAGuardar(true);
    try {
      if (edicao.tipo === 'novoCliente') {
        const c = validarCliente(fCliente);
        const v = validarVeiculo(fVeiculo);
        if (c.erro || v.erro) { setErroForm((c.erro ?? v.erro)!); return; }
        if (clientes.some((x) => x.veiculos.some((ve) => ve.matricula === v.dados!.matricula))) {
          setErroForm(`A matrícula ${v.dados!.matricula} já está registada noutro cliente.`);
          return;
        }
        await criarCliente(c.dados!, v.dados!);
        await depoisDeGuardar(`Cliente ${c.dados!.nome} criado.`);
      } else if (edicao.tipo === 'editarCliente') {
        const c = validarCliente(fCliente);
        if (c.erro) { setErroForm(c.erro); return; }
        await atualizarCliente(edicao.cliente.id, c.dados!);
        await depoisDeGuardar('Cliente atualizado.');
      } else if (edicao.tipo === 'novoVeiculo' || edicao.tipo === 'editarVeiculo') {
        const v = validarVeiculo(fVeiculo);
        if (v.erro) { setErroForm(v.erro); return; }
        const idAtual = edicao.tipo === 'editarVeiculo' ? edicao.veiculo.id : null;
        if (clientes.some((x) => x.veiculos.some((ve) => ve.matricula === v.dados!.matricula && ve.id !== idAtual))) {
          setErroForm(`A matrícula ${v.dados!.matricula} já está registada.`);
          return;
        }
        if (edicao.tipo === 'novoVeiculo') await adicionarVeiculo(edicao.cliente.id, v.dados!);
        else await atualizarVeiculo(edicao.veiculo.id, v.dados!);
        await depoisDeGuardar(edicao.tipo === 'novoVeiculo' ? 'Veículo adicionado.' : 'Veículo atualizado.');
      }
    } catch (erro) {
      setErroForm(mensagemErro(erro));
    } finally {
      setAGuardar(false);
    }
  };

  const alternarAtivo = async (c: Cliente) => {
    setAviso('');
    try {
      await atualizarCliente(c.id, { ativo: !c.ativo });
      await depoisDeGuardar(c.ativo ? `${c.nome} foi desativado (não aparece nas sugestões).` : `${c.nome} foi reativado.`);
    } catch (erro) {
      setErroLista(mensagemErro(erro));
    }
  };

  // Pesquisa por nome, apelido, telefone ou matrícula (ignora maiúsculas, espaços e traços na matrícula).
  const visiveis = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    const termoMat = termo.replace(/[\s-]/g, '');
    return clientes
      .filter((c) => mostrarInativos || c.ativo)
      .filter((c) => {
        if (!termo) return true;
        const nome = `${c.nome} ${c.apelido ?? ''}`.toLowerCase();
        const tels = `${c.telefone} ${c.telefone2 ?? ''}`.replace(/\s/g, '');
        const mats = c.veiculos.map((v) => v.matricula.toLowerCase().replace(/[\s-]/g, '')).join(' ');
        return nome.includes(termo) || tels.includes(termo.replace(/\s/g, '')) || (termoMat !== '' && mats.includes(termoMat));
      });
  }, [clientes, pesquisa, mostrarInativos]);

  const tituloForm =
    edicao.tipo === 'novoCliente' ? 'Novo cliente'
      : edicao.tipo === 'editarCliente' ? `Editar cliente — ${edicao.cliente.nome}`
        : edicao.tipo === 'novoVeiculo' ? `Novo veículo para ${edicao.cliente.nome}`
          : edicao.tipo === 'editarVeiculo' ? `Editar veículo ${edicao.veiculo.matricula}`
            : '';
  const mostraCamposCliente = edicao.tipo === 'novoCliente' || edicao.tipo === 'editarCliente';
  const mostraCamposVeiculo = edicao.tipo === 'novoCliente' || edicao.tipo === 'novoVeiculo' || edicao.tipo === 'editarVeiculo';

  const campoC = (k: keyof FormCliente) => ({ value: fCliente[k], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFCliente({ ...fCliente, [k]: e.target.value }) });
  const campoV = (k: keyof FormVeiculo) => ({ value: fVeiculo[k], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFVeiculo({ ...fVeiculo, [k]: e.target.value }) });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Clientes & Veículos</h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>Dados reais, guardados no Supabase.</p>
        </div>
        {edicao.tipo === 'nenhuma' && (
          <button style={BOTAO_OURO} onClick={() => abrir({ tipo: 'novoCliente' })}>+ Novo cliente</button>
        )}
      </div>

      {aviso && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', color: '#4ade80', fontSize: '15px' }}>{aviso}</div>
      )}

      {edicao.tipo !== 'nenhuma' && (
        <form onSubmit={guardar} style={{ ...CARTAO, marginBottom: '24px', borderColor: '#d4af37' }}>
          <h3 style={{ fontSize: '20px', color: '#d4af37', margin: '0 0 16px 0' }}>{tituloForm}</h3>

          {mostraCamposCliente && (
            <div style={{ ...GRELHA, marginBottom: '16px' }}>
              <div><label style={ETIQUETA}>Nome *</label><input style={CAMPO} required {...campoC('nome')} placeholder="Carla" /></div>
              <div><label style={ETIQUETA}>Apelido</label><input style={CAMPO} {...campoC('apelido')} placeholder="Monteiro" /></div>
              <div><label style={ETIQUETA}>Telefone *</label><input style={CAMPO} required type="tel" {...campoC('telefone')} placeholder="912 345 678" /></div>
              <div><label style={ETIQUETA}>Telefone 2</label><input style={CAMPO} type="tel" {...campoC('telefone2')} /></div>
              <div><label style={ETIQUETA}>E-mail</label><input style={CAMPO} type="email" {...campoC('email')} /></div>
              <div><label style={ETIQUETA}>Notas do cliente</label><input style={CAMPO} {...campoC('notas')} /></div>
            </div>
          )}

          {edicao.tipo === 'novoCliente' && (
            <p style={{ fontSize: '15px', color: '#d4af37', fontWeight: 'bold', margin: '4px 0 12px 0' }}>Veículo</p>
          )}

          {mostraCamposVeiculo && (
            <div style={{ ...GRELHA, marginBottom: '16px' }}>
              <div><label style={ETIQUETA}>Matrícula *</label><input style={{ ...CAMPO, textTransform: 'uppercase' }} required {...campoV('matricula')} placeholder="AZ-91-GI" /></div>
              <div><label style={ETIQUETA}>Modelo</label><input style={CAMPO} {...campoV('modelo')} placeholder="Renault Captur" /></div>
              <div><label style={ETIQUETA}>Ano</label><input style={CAMPO} inputMode="numeric" {...campoV('ano')} placeholder="2021" /></div>
              <div><label style={ETIQUETA}>Cor</label><input style={CAMPO} {...campoV('cor')} placeholder="Branco" /></div>
              <div><label style={ETIQUETA}>Notas do veículo</label><input style={CAMPO} {...campoV('notas')} /></div>
            </div>
          )}

          {erroForm && (
            <div style={{ padding: '12px', marginBottom: '14px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>{erroForm}</div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={aGuardar} style={{ ...BOTAO_OURO, opacity: aGuardar ? 0.6 : 1 }}>{aGuardar ? 'A guardar…' : 'Guardar'}</button>
            <button type="button" onClick={fechar} style={BOTAO_LINHA}>Cancelar</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18px' }}>
        <input
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="🔍 Pesquisar por nome, telefone ou matrícula…"
          style={{ ...CAMPO, flex: 1, minWidth: '240px' }}
        />
        <label style={{ fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input type="checkbox" checked={mostrarInativos} onChange={(e) => setMostrarInativos(e.target.checked)} /> Mostrar desativados
        </label>
      </div>

      {erroLista && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '15px' }}>
          {erroLista} <button onClick={() => void carregar()} style={{ ...BOTAO_LINHA, marginLeft: '8px' }}>Tentar de novo</button>
        </div>
      )}

      {aCarregar ? (
        <p style={{ color: '#94a3b8' }}>A carregar clientes…</p>
      ) : visiveis.length === 0 ? (
        <div style={{ ...CARTAO, textAlign: 'center', color: '#94a3b8' }}>
          {clientes.length === 0 ? 'Ainda não há clientes. Clique em "+ Novo cliente" para criar o primeiro.' : 'Nenhum cliente corresponde à pesquisa.'}
        </div>
      ) : (
        <>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 10px 0' }}>{visiveis.length} cliente(s)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {visiveis.map((c) => (
              <div key={c.id} style={{ ...CARTAO, opacity: c.ativo ? 1 : 0.55 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <h3 style={{ fontSize: '19px', color: '#fff', margin: '0 0 6px 0' }}>
                    {c.nome} {c.apelido ?? ''}
                    {!c.ativo && <span style={{ fontSize: '12px', color: '#f87171', marginLeft: '8px' }}>(desativado)</span>}
                  </h3>
                </div>
                <p style={{ margin: '0 0 4px 0', color: '#e2e8f0', fontSize: '15px' }}>📞 {c.telefone}{c.telefone2 ? ` · ${c.telefone2}` : ''}</p>
                {c.email && <p style={{ margin: '0 0 4px 0', color: '#cbd5e1', fontSize: '14px' }}>✉️ {c.email}</p>}
                {c.notas && <p style={{ margin: '0 0 4px 0', color: '#94a3b8', fontSize: '14px' }}>📝 {c.notas}</p>}

                <div style={{ marginTop: '12px', borderTop: '1px solid #222b45', paddingTop: '10px' }}>
                  {c.veiculos.length === 0 && <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 6px 0' }}>Sem veículos.</p>}
                  {c.veiculos.map((v) => (
                    <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '15px', color: '#38bdf8' }}>
                        🚗 <b>{v.matricula}</b>
                        <span style={{ color: '#cbd5e1' }}>{[v.modelo, v.ano, v.cor].filter(Boolean).length ? ` — ${[v.modelo, v.ano, v.cor].filter(Boolean).join(' · ')}` : ''}</span>
                      </span>
                      <button style={{ ...BOTAO_LINHA, padding: '4px 10px', fontSize: '13px' }} onClick={() => abrir({ tipo: 'editarVeiculo', cliente: c, veiculo: v })}>Editar</button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <button style={BOTAO_LINHA} onClick={() => abrir({ tipo: 'editarCliente', cliente: c })}>✏️ Editar cliente</button>
                  <button style={BOTAO_LINHA} onClick={() => abrir({ tipo: 'novoVeiculo', cliente: c })}>+ Veículo</button>
                  <button style={{ ...BOTAO_LINHA, color: c.ativo ? '#f87171' : '#4ade80' }} onClick={() => void alternarAtivo(c)}>
                    {c.ativo ? 'Desativar' : 'Reativar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
