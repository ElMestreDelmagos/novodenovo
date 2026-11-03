/* ARQUIVO: src/routes/auth.routes.js — mapeia URLs de autenticação para seus controladores. */

import { Router } from "express";
import {
  entrar,
  sessao,
  sair,
  user,
  getUsuario,
  putUsuario,
  delUsuario,
} from "../controllers/auth.controller.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const r = Router();
r.post("/login", entrar);
r.get("/session", sessao);
r.post("/logout", sair);
r.get("/me/usuario", user, getUsuario);
r.put("/me/usuario", user, putUsuario);
r.delete("/me/usuario", user, delUsuario);
export default r;
