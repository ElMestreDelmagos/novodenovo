/* ARQUIVO: src/services/auth.service.js — regras de negócio e acesso a dados de autenticação. */

import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const fail = (e) => {
  if (e) throw e;
};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function login(email, senha) {
  const { data: u, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("email", String(email).trim().toLowerCase())
    .maybeSingle();
  fail(error);
  if (!u || !(await bcrypt.compare(String(senha), u.senha))) return null;
  const { data: b, error: eb } = await supabase
    .from("brecho")
    .select("id_brecho")
    .eq("id_usuario", u.id_usuario)
    .maybeSingle();
  fail(eb);
  const { data: z, error: ez } = await supabase
    .from("bazar")
    .select("id_bazar")
    .eq("id_usuario", u.id_usuario)
    .maybeSingle();
  fail(ez);
  return {
    id_usuario: u.id_usuario,
    nome: u.nome,
    email: u.email,
    tipo: b ? "brecho" : z ? "bazar" : "usuario",
  };
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function usuario(id) {
  const { data, error } = await supabase
    .from("usuario")
    .select(
      "id_usuario,nome,email,id_endereco,endereco_usuario(cep,rua,numero,bairro,cidade,estado)",
    )
    .eq("id_usuario", id)
    .single();
  fail(error);
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function atualizarUsuario(id, p) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const upd = {};
  if (p.nome !== undefined) upd.nome = p.nome;
  if (p.email !== undefined) upd.email = String(p.email).trim().toLowerCase();
  const { data: u, error } = await supabase
    .from("usuario")
    .update(upd)
    .eq("id_usuario", id)
    .select("id_usuario,nome,email,id_endereco")
    .single();
  fail(error);
  if (u.id_endereco && p.endereco) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const e = {};
    for (const k of ["cep", "rua", "numero", "bairro", "cidade", "estado"])
      if (p.endereco[k] !== undefined) e[k] = p.endereco[k];
    const { error: ee } = await supabase
      .from("endereco_usuario")
      .update(e)
      .eq("id_endereco", u.id_endereco);
    fail(ee);
  }
  return usuario(id);
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function excluirUsuario(id) {
  const { error } = await supabase
    .from("usuario")
    .delete()
    .eq("id_usuario", id);
  fail(error);
}
