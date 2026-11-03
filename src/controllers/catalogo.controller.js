/* ARQUIVO: src/controllers/catalogo.controller.js — coordena consultas e atualizações do catálogo. */

import * as svc from "../services/catalogo.service.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const owner = (tipo) => (req, res, next) => {
  if (!req.session?.id_usuario || req.session.tipo !== tipo)
    return res
      .status(401)
      .json({
        sucesso: false,
        mensagem:
          "Sessão do responsável não encontrada. Cadastre-se/entre novamente.",
      });
  next();
};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export const donoBrecho = owner("brecho"),
  donoBazar = owner("bazar");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function brechos(_req, res, next) {
  try {
    res.json({ sucesso: true, data: await svc.listarBrechos() });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function bazares(_req, res, next) {
  try {
    res.json({ sucesso: true, data: await svc.listarBazares() });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function getMeuBrecho(req, res, next) {
  try {
    res.json({
      sucesso: true,
      data: await svc.meuBrecho(req.session.id_usuario),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function getMeuBazar(req, res, next) {
  try {
    res.json({
      sucesso: true,
      data: await svc.meuBazar(req.session.id_usuario),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function putBrecho(req, res, next) {
  try {
    res.json({
      sucesso: true,
      mensagem: "Brechó atualizado com sucesso!",
      data: await svc.atualizarBrecho(req.session.id_usuario, req.body),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function putBazar(req, res, next) {
  try {
    res.json({
      sucesso: true,
      mensagem: "Bazar atualizado com sucesso!",
      data: await svc.atualizarBazar(req.session.id_usuario, req.body),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function delBrecho(req, res, next) {
  try {
    await svc.excluirBrecho(req.session.id_usuario);
    res.json({ sucesso: true, mensagem: "Brechó excluído com sucesso!" });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function delBazar(req, res, next) {
  try {
    await svc.excluirBazar(req.session.id_usuario);
    res.json({ sucesso: true, mensagem: "Bazar excluído com sucesso!" });
  } catch (e) {
    next(e);
  }
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function getFavoritos(req, res, next) {
  try {
    res.json({
      sucesso: true,
      data: await svc.favoritosUsuario(req.session.id_usuario),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function postFavoritoBrecho(req, res, next) {
  try {
    await svc.favoritarBrecho(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function deleteFavoritoBrecho(req, res, next) {
  try {
    await svc.desfavoritarBrecho(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function postFavoritoBazar(req, res, next) {
  try {
    await svc.favoritarBazar(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function deleteFavoritoBazar(req, res, next) {
  try {
    await svc.desfavoritarBazar(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true });
  } catch (e) {
    next(e);
  }
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function getLembretes(req, res, next) {
  try {
    res.json({
      sucesso: true,
      data: await svc.lembretesUsuario(req.session.id_usuario),
    });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function postLembrete(req, res, next) {
  try {
    await svc.adicionarLembrete(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true, mensagem: "Bazar adicionado à sua agenda." });
  } catch (e) {
    next(e);
  }
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export async function deleteLembrete(req, res, next) {
  try {
    await svc.removerLembrete(req.session.id_usuario, req.params.id);
    res.json({ sucesso: true, mensagem: "Lembrete removido da sua agenda." });
  } catch (e) {
    next(e);
  }
}
