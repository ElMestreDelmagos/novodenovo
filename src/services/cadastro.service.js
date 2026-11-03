/* ARQUIVO: src/services/cadastro.service.js — regras de negócio e persistência dos cadastros. */

import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
async function inserir(tabela, dados, select = "*") {
  const { data, error } = await supabase
    .from(tabela)
    .insert(dados)
    .select(select)
    .single();
  if (error) throw error;
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
async function apagar(tabela, coluna, id) {
  if (id != null) await supabase.from(tabela).delete().eq(coluna, id);
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
async function emailExiste(email) {
  const { data, error } = await supabase
    .from("usuario")
    .select("id_usuario")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  if (error) throw error;
  return !!data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
async function criarBase(conta, endereco) {
  if (await emailExiste(conta.email)) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const e = new Error("Este e-mail já está cadastrado.");
    e.status = 409;
    throw e;
  }
  let end = null;
  try {
    end = await inserir(
      "endereco_usuario",
      {
        cep: endereco.cep.trim(),
        rua: endereco.rua.trim(),
        numero: endereco.numero?.trim() || null,
        bairro: endereco.bairro.trim(),
        cidade: endereco.cidade.trim(),
        estado: endereco.estado.trim().toUpperCase(),
      },
      "id_endereco",
    );
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const hash = await bcrypt.hash(conta.senha, 12);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const user = await inserir(
      "usuario",
      {
        id_endereco: end.id_endereco,
        nome: conta.nome.trim(),
        email: conta.email.trim().toLowerCase(),
        senha: hash,
      },
      "id_usuario,nome,email,id_endereco",
    );
    return { user, end };
  } catch (err) {
    if (end) await apagar("endereco_usuario", "id_endereco", end.id_endereco);
    throw err;
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function cadastrarUsuario({ conta, endereco }) {
  return (await criarBase(conta, endereco)).user;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function cadastrarBrecho({ conta, endereco, brecho }) {
  let base;
  try {
    base = await criarBase(conta, endereco);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const item = await inserir(
      "brecho",
      {
        id_usuario: base.user.id_usuario,
        id_endereco: base.end.id_endereco,
        nome_brecho: brecho.nome_brecho.trim(),
        descricao: brecho.descricao?.trim() || null,
        imagem: brecho.imagem?.trim() || null,
        endereco:
          brecho.endereco?.trim() ||
          `${endereco.rua}, ${endereco.numero || "s/n"} - ${endereco.bairro}`,
        preco_min:
          brecho.preco_min === "" || brecho.preco_min == null
            ? null
            : Number(brecho.preco_min),
        preco_max:
          brecho.preco_max === "" || brecho.preco_max == null
            ? null
            : Number(brecho.preco_max),
        estilo: brecho.estilo?.trim() || null,
        categoria: brecho.categoria?.trim() || null,
      },
      "*",
    );
    return { usuario: base.user, brecho: item };
  } catch (err) {
    if (base?.user) await apagar("usuario", "id_usuario", base.user.id_usuario);
    throw err;
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function cadastrarBazar({ conta, endereco, bazar }) {
  let base;
  try {
    base = await criarBase(conta, endereco);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const item = await inserir(
      "bazar",
      {
        id_usuario: base.user.id_usuario,
        id_endereco: base.end.id_endereco,
        nome_bazar: bazar.nome_bazar.trim(),
        descricao: bazar.descricao?.trim() || null,
        imagem: bazar.imagem?.trim() || null,
        data_inicio: bazar.data_inicio,
        data_termino: bazar.data_termino || null,
        horario_inicio: bazar.horario_inicio,
        horario_termino: bazar.horario_termino || null,
      },
      "*",
    );
    return { usuario: base.user, bazar: item };
  } catch (err) {
    if (base?.user) await apagar("usuario", "id_usuario", base.user.id_usuario);
    throw err;
  }
}
