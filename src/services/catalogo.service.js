/* ARQUIVO: src/services/catalogo.service.js — consultas e alterações de bazares e brechós. */

import { supabase } from "../config/supabase.js";

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const throwIf = (error) => {
  if (error) throw error;
};

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function listarBrechos() {
  const { data, error } = await supabase
    .from("brecho")
    .select(
      "*, endereco_usuario:id_endereco(cep,rua,numero,bairro,cidade,estado)",
    )
    .order("id_brecho", { ascending: false });
  throwIf(error);
  return data || [];
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function listarBazares() {
  const { data, error } = await supabase
    .from("bazar")
    .select(
      "*, endereco_usuario:id_endereco(cep,rua,numero,bairro,cidade,estado)",
    )
    .order("data_inicio", { ascending: true });
  throwIf(error);
  return data || [];
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function meuBrecho(idUsuario) {
  const { data, error } = await supabase
    .from("brecho")
    .select("*, endereco_usuario:id_endereco(*)")
    .eq("id_usuario", idUsuario)
    .maybeSingle();
  throwIf(error);
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function meuBazar(idUsuario) {
  const { data, error } = await supabase
    .from("bazar")
    .select("*, endereco_usuario:id_endereco(*)")
    .eq("id_usuario", idUsuario)
    .maybeSingle();
  throwIf(error);
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function atualizarBrecho(idUsuario, payload) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const allowed = {
    nome_brecho: payload.nome_brecho,
    descricao: payload.descricao || null,
    imagem: payload.imagem || null,
    endereco: payload.endereco || null,
    preco_min: payload.preco_min === "" ? null : Number(payload.preco_min),
    preco_max: payload.preco_max === "" ? null : Number(payload.preco_max),
    estilo: payload.estilo || null,
    categoria: payload.categoria || null,
  };
  const { data, error } = await supabase
    .from("brecho")
    .update(allowed)
    .eq("id_usuario", idUsuario)
    .select("*")
    .single();
  throwIf(error);
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function atualizarBazar(idUsuario, payload) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const allowed = {
    nome_bazar: payload.nome_bazar,
    descricao: payload.descricao || null,
    imagem: payload.imagem || null,
    data_inicio: payload.data_inicio,
    data_termino: payload.data_termino || null,
    horario_inicio: payload.horario_inicio,
    horario_termino: payload.horario_termino || null,
  };
  const { data, error } = await supabase
    .from("bazar")
    .update(allowed)
    .eq("id_usuario", idUsuario)
    .select("*")
    .single();
  throwIf(error);
  return data;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function excluirBrecho(idUsuario) {
  const { error } = await supabase
    .from("brecho")
    .delete()
    .eq("id_usuario", idUsuario);
  throwIf(error);
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function excluirBazar(idUsuario) {
  const { error } = await supabase
    .from("bazar")
    .delete()
    .eq("id_usuario", idUsuario);
  throwIf(error);
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function favoritosUsuario(idUsuario) {
  const { data: brechos, error } = await supabase
    .from("favorito")
    .select(
      "id_fav,id_brecho,brecho:id_brecho(id_brecho,nome_brecho,descricao,imagem,endereco,preco_min,preco_max,estilo,categoria,endereco_usuario:id_endereco(cidade,estado))",
    )
    .eq("id_usuario", idUsuario)
    .order("id_fav", { ascending: false });
  throwIf(error);
  return {
    brechos: (brechos || []).map((x) => x.id_brecho),
    itens: brechos || [],
  };
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function favoritarBrecho(idUsuario, idBrecho) {
  const { error } = await supabase
    .from("favorito")
    .upsert(
      { id_usuario: idUsuario, id_brecho: Number(idBrecho) },
      { onConflict: "id_brecho,id_usuario" },
    );
  throwIf(error);
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function desfavoritarBrecho(idUsuario, idBrecho) {
  const { error } = await supabase
    .from("favorito")
    .delete()
    .eq("id_usuario", idUsuario)
    .eq("id_brecho", Number(idBrecho));
  throwIf(error);
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function lembretesUsuario(idUsuario) {
  const { data, error } = await supabase
    .from("lembrete")
    .select(
      "id_lembrete,id_bazar,bazar:id_bazar(id_bazar,nome_bazar,descricao,imagem,data_inicio,data_termino,horario_inicio,horario_termino,endereco_usuario:id_endereco(cidade,estado))",
    )
    .eq("id_usuario", idUsuario)
    .order("id_lembrete", { ascending: false });
  throwIf(error);
  return data || [];
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function adicionarLembrete(idUsuario, idBazar) {
  const { error } = await supabase
    .from("lembrete")
    .upsert(
      { id_usuario: idUsuario, id_bazar: Number(idBazar) },
      { onConflict: "id_bazar,id_usuario" },
    );
  throwIf(error);
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function removerLembrete(idUsuario, idBazar) {
  const { error } = await supabase
    .from("lembrete")
    .delete()
    .eq("id_usuario", idUsuario)
    .eq("id_bazar", Number(idBazar));
  throwIf(error);
}
