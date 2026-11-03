/* ARQUIVO: src/routes/cadastro.routes.js — mapeia URLs de cadastro para seus controladores. */

import { Router } from "express";
import * as c from "../controllers/cadastro.controller.js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const r = Router();
r.post("/usuario", c.usuario);
r.post("/brecho", c.brecho);
r.post("/bazar", c.bazar);
export default r;
