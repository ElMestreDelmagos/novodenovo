/* ARQUIVO: src/utils/validacao.js — funções auxiliares para validação de dados. */

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export const vazio = (v) =>
  v === undefined || v === null || String(v).trim() === "";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export function validarConta({ nome, email, senha }) {
  if (vazio(nome)) return "Informe o nome do responsável.";
  if (vazio(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Informe um e-mail válido.";
  if (vazio(senha) || String(senha).length < 8)
    return "A senha deve ter pelo menos 8 caracteres.";
  return null;
}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export function validarEndereco(e) {
  if (
    !e ||
    vazio(e.cep) ||
    vazio(e.rua) ||
    vazio(e.bairro) ||
    vazio(e.cidade) ||
    vazio(e.estado)
  )
    return "Preencha CEP, rua, bairro, cidade e estado.";
  if (String(e.estado).trim().length !== 2)
    return "Use a sigla do estado com 2 letras.";
  return null;
}
