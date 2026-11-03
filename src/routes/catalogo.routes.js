/* ARQUIVO: src/routes/catalogo.routes.js — mapeia URLs do catálogo para seus controladores. */

import { Router } from "express";
import { user as authUser } from "../controllers/auth.controller.js";
import {
  brechos,
  bazares,
  donoBrecho,
  donoBazar,
  getMeuBrecho,
  getMeuBazar,
  putBrecho,
  putBazar,
  delBrecho,
  delBazar,
  getFavoritos,
  postFavoritoBrecho,
  deleteFavoritoBrecho,
  getLembretes,
  postLembrete,
  deleteLembrete,
} from "../controllers/catalogo.controller.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const r = Router();
r.get("/brechos", brechos);
r.get("/bazares", bazares);
r.get("/me/favoritos", authUser, getFavoritos);
r.post("/me/favoritos/brechos/:id", authUser, postFavoritoBrecho);
r.delete("/me/favoritos/brechos/:id", authUser, deleteFavoritoBrecho);
r.get("/me/lembretes", authUser, getLembretes);
r.post("/me/lembretes/bazares/:id", authUser, postLembrete);
r.delete("/me/lembretes/bazares/:id", authUser, deleteLembrete);
r.get("/me/brecho", donoBrecho, getMeuBrecho);
r.put("/me/brecho", donoBrecho, putBrecho);
r.delete("/me/brecho", donoBrecho, delBrecho);
r.get("/me/bazar", donoBazar, getMeuBazar);
r.put("/me/bazar", donoBazar, putBazar);
r.delete("/me/bazar", donoBazar, delBazar);
export default r;
