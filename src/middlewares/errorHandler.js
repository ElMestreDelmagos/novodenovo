/* ARQUIVO: src/middlewares/errorHandler.js — middleware central de tratamento de erros HTTP. */

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export function errorHandler(err, _req, res, _next) {
  console.error(err);
  let status = err.status || 500;
  let msg = err.message || "Erro interno do servidor.";
  if (err.code === "23505") {
    status = 409;
    msg = "Já existe um cadastro com esses dados.";
  }
  if (err.code === "23503") {
    status = 400;
    msg = "Relacionamento inválido entre os dados.";
  }
  if (err.code === "23514") {
    status = 400;
    msg = "Os dados não atendem às regras do cadastro.";
  }
  res.status(status).json({ sucesso: false, mensagem: msg });
}
