/* ARQUIVO: src/controllers/auth.controller.js — recebe requisições de autenticação e coordena a resposta. */

import * as svc from "../services/auth.service.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function entrar(req, res, next) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res
        .status(400)
        .json({ sucesso: false, mensagem: "Informe e-mail e senha." });
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const u = await svc.login(email, senha);
    if (!u)
      return res
        .status(401)
        .json({ sucesso: false, mensagem: "E-mail ou senha incorretos." });
    req.session.id_usuario = u.id_usuario;
    req.session.tipo = u.tipo;
    req.session.nome = u.nome;
    res.json({ sucesso: true, mensagem: "Login realizado!", data: u });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export function sessao(req, res) {
  if (!req.session?.id_usuario)
    return res.json({ sucesso: true, autenticado: false });
  res.json({
    sucesso: true,
    autenticado: true,
    data: {
      id_usuario: req.session.id_usuario,
      tipo: req.session.tipo,
      nome: req.session.nome,
    },
  });
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export function sair(req, res) {
  req.session.destroy(() =>
    res.json({ sucesso: true, mensagem: "Sessão encerrada." }),
  );
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const user = (req, res, next) =>
  !req.session?.id_usuario
    ? res
        .status(401)
        .json({ sucesso: false, mensagem: "Faça login para continuar." })
    : next();
export { user };
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function getUsuario(req, res, next) {
  try {
    res.json({
      sucesso: true,
      data: await svc.usuario(req.session.id_usuario),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function putUsuario(req, res, next) {
  try {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const data = await svc.atualizarUsuario(req.session.id_usuario, req.body);
    req.session.nome = data.nome;
    res.json({ sucesso: true, mensagem: "Perfil atualizado!", data });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function delUsuario(req, res, next) {
  try {
    await svc.excluirUsuario(req.session.id_usuario);
    req.session.destroy(() =>
      res.json({ sucesso: true, mensagem: "Conta excluída." }),
    );
  } catch (e) {
    next(e);
  }
}
