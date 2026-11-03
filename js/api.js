/* ARQUIVO: js/api.js — funções para comunicação HTTP com os endpoints do backend. */

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const API = (() => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const BASE_URL = "../api";

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function primeiroValor(objeto, chaves, padrao = null) {
    for (const chave of chaves) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const valor = objeto?.[chave];
      if (valor !== undefined && valor !== null && valor !== "") return valor;
    }
    return padrao;
  }

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function numero(valor, padrao = 0) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const convertido = Number(valor);
    return Number.isFinite(convertido) ? convertido : padrao;
  }

  /**
   * Converte o formato do banco para o formato que os componentes atuais usam.
   * Assim o front continua funcionando enquanto o banco permanece com nomes
   * de colunas em português.
   */
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function normalizarBrecho(brecho) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const nome = primeiroValor(brecho, ["nome", "name"], "Brechó sem nome");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const cidade = primeiroValor(brecho, ["cidade", "city"], "Matão, SP");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const imagem = primeiroValor(
      brecho,
      ["imagem_url", "image", "imagem"],
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    );

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const precoMin = numero(
      primeiroValor(brecho, ["preco_minimo", "preco_min", "priceMin"], 0)
    );
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const precoMax = numero(
      primeiroValor(brecho, ["preco_maximo", "preco_max", "priceMax"], precoMin)
    );

    return {
      ...brecho,
      id: primeiroValor(brecho, ["id"], null),
      name: nome,
      city: cidade,
      image: imagem,
      priceMin: precoMin,
      priceMax: precoMax,
      style: primeiroValor(brecho, ["categoria", "estilo", "style"], "Outros"),
      tag: primeiroValor(brecho, ["tag", "categoria"], "Brechó"),
      products: numero(primeiroValor(brecho, ["quantidade_produtos", "produtos", "products"], 0)),
      rating: String(primeiroValor(brecho, ["avaliacao", "rating"], "—"))
    };
  }

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  async function buscarBrechos() {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const resposta = await fetch(`${BASE_URL}/brechos/listar.php`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    let dados;

    try {
      dados = await resposta.json();
    } catch {
      throw new Error("O backend não retornou um JSON válido.");
    }

    if (!resposta.ok || dados?.erro) {
      throw new Error(dados?.mensagem || `Erro HTTP ${resposta.status} ao carregar brechós.`);
    }

    if (!Array.isArray(dados)) {
      throw new Error("Formato inesperado ao carregar os brechós.");
    }

    return dados.map(normalizarBrecho);
  }

  return {
    buscarBrechos,
    normalizarBrecho
  };
})();
