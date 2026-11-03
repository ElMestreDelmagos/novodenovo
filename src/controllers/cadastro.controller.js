/* ARQUIVO: src/controllers/cadastro.controller.js — recebe requisições de cadastro e coordena a resposta. */

import { validarConta, validarEndereco, vazio } from "../utils/validacao.js";
import {
  cadastrarUsuario,
  cadastrarBrecho,
  cadastrarBazar,
} from "../services/cadastro.service.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const falha = (res, msg, status = 400) =>
  res.status(status).json({ sucesso: false, mensagem: msg });
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function validarBase(body) {
  return validarConta(body.conta || {}) || validarEndereco(body.endereco || {});
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function usuario(req, res, next) {
  try {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const erro = validarBase(req.body);
    if (erro) return falha(res, erro);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const data = await cadastrarUsuario(req.body);
    req.session.id_usuario = data.id_usuario;
    req.session.tipo = "usuario";
    res
      .status(201)
      .json({
        sucesso: true,
        mensagem: "Usuário cadastrado com sucesso!",
        data,
      });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function brecho(req, res, next) {
  try {
    let erro = validarBase(req.body);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const b = req.body.brecho || {};
    if (!erro && vazio(b.nome_brecho)) erro = "Informe o nome do brechó.";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const min = b.preco_min === "" ? null : Number(b.preco_min),
      max = b.preco_max === "" ? null : Number(b.preco_max);
    if (!erro && min != null && max != null && max < min)
      erro = "O preço máximo não pode ser menor que o mínimo.";
    if (erro) return falha(res, erro);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const data = await cadastrarBrecho(req.body);
    req.session.id_usuario = data.usuario.id_usuario;
    req.session.tipo = "brecho";
    res
      .status(201)
      .json({
        sucesso: true,
        mensagem: "Brechó cadastrado com sucesso!",
        data,
      });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function bazar(req, res, next) {
  try {
    let erro = validarBase(req.body);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const b = req.body.bazar || {};
    if (!erro && vazio(b.nome_bazar)) erro = "Informe o nome do bazar.";
    if (!erro && vazio(b.data_inicio)) erro = "Informe a data inicial.";
    if (!erro && vazio(b.horario_inicio)) erro = "Informe o horário inicial.";
    if (!erro && b.data_termino && b.data_termino < b.data_inicio)
      erro = "A data final não pode ser anterior à inicial.";
    if (erro) return falha(res, erro);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const data = await cadastrarBazar(req.body);
    req.session.id_usuario = data.usuario.id_usuario;
    req.session.tipo = "bazar";
    res
      .status(201)
      .json({ sucesso: true, mensagem: "Bazar cadastrado com sucesso!", data });
  } catch (e) {
    next(e);
  }
}
