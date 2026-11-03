/* ARQUIVO: js/filters.js — pesquisa, filtros e ordenação dos resultados. */

// function brechoCard(brecho, index) {
//     const fav = window.NovoDeNovoCards?.ativo('brechos', brecho.id); return `
// <article class="brecho-card" data-brecho-index="${index}" tabindex="0" role="button" aria-label="Ver detalhes de ${brecho.name}">
// <div class="brecho-image"><img src="${brecho.image}" alt="${brecho.name}" loading="lazy"><span class="tag">${brecho.tag}</span><span class="price">R$ ${brecho.priceMin}–${brecho.priceMax}</span></div>
// <div class="brecho-content"><h3>${brecho.name}</h3><p>📍 ${brecho.city}</p><p>🛍️ ${brecho.products} produtos</p><p class="rating">★★★★★ <span>${brecho.rating}</span></p>
// <div class="card-actions"><button class="button button-primary small brecho-details" data-brecho-index="${index}">Visitar Brechó</button><button class="mini-button favorite-button ${fav ? 'selected' : ''}" aria-label="Favoritar ${brecho.name}" aria-pressed="${fav ? 'true' : 'false'}">${fav ? '♥' : '♡'}</button><button class="mini-button share-button" aria-label="Compartilhar ${brecho.name}">⌯</button></div></div></article>`
// }
// function renderBrechos(list, target) {
//     target.innerHTML = list.map(b => brechoCard(b, BRECHOS.indexOf(b))).join("");
//     target.querySelectorAll(".brecho-card").forEach(card => { card.addEventListener("click", e => { if (!e.target.closest(".mini-button")) openDetailModal("brecho", +card.dataset.brechoIndex) }); card.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && !e.target.closest("button")) { e.preventDefault(); openDetailModal("brecho", +card.dataset.brechoIndex) } }) });
//     target.querySelectorAll(".brecho-details").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); openDetailModal("brecho", +b.dataset.brechoIndex) }));
//     target.querySelectorAll(".favorite-button").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); const item = BRECHOS[+b.closest(".brecho-card").dataset.brechoIndex]; window.NovoDeNovoCards.alternar('brecho', item.id, b) }));
//     target.querySelectorAll(".share-button").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); const item = BRECHOS[+b.closest(".brecho-card").dataset.brechoIndex]; window.NovoDeNovoCards.compartilhar(item, 'brecho') }))
// }
// function applyBrechoFilters() {
//     const search = document.querySelector("#searchInput"), all = document.querySelector("#allBrechosGrid"), empty = document.querySelector("#emptyState"); if (!search || !all) return; const query = search.value.trim().toLowerCase(), price = window.selectedPrice || "all", styles = window.selectedStyles || new Set(), categories = window.selectedCategories || new Set();
//     const filtered = BRECHOS.filter(item => { const textMatch = `${item.name} ${item.city}`.toLowerCase().includes(query), styleMatch = styles.size === 0 || styles.has(item.style), categoryMatch = categories.size === 0 || categories.has(item.tag); let priceMatch = true; if (price === "50") priceMatch = item.priceMin <= 50; if (price === "100") priceMatch = item.priceMin <= 100 && item.priceMax >= 50; if (price === "200") priceMatch = item.priceMax >= 100 && item.priceMin <= 200; if (price === "high") priceMatch = item.priceMax > 200; return textMatch && styleMatch && categoryMatch && priceMatch }); renderBrechos(filtered, all); empty.classList.toggle("hidden", filtered.length !== 0)
// }
// function setupMulti(selector, setName, allValue) { document.querySelectorAll(selector).forEach(b => b.addEventListener('click', () => { const set = window[setName]; if (b.dataset.style === allValue || b.dataset.category === allValue) { set.clear(); document.querySelectorAll(selector).forEach(x => x.classList.remove('active')); b.classList.add('active'); } else { const value = b.dataset.style || b.dataset.category; b.classList.toggle('active'); b.classList.contains('active') ? set.add(value) : set.delete(value); const all = document.querySelector(`${selector}[data-style="${allValue}"],${selector}[data-category="${allValue}"]`); if (all) all.classList.toggle('active', set.size === 0); } applyBrechoFilters() })) }
// document.addEventListener("DOMContentLoaded", () => {
//     const featured = document.querySelector("#featuredGrid"), search = document.querySelector("#searchInput"); if (!featured || !search) return; window.selectedPrice = "all"; window.selectedStyles = new Set(); window.selectedCategories = new Set(); renderBrechos(BRECHOS.slice(0, 4), featured); applyBrechoFilters(); search.addEventListener("input", applyBrechoFilters);
//     document.querySelectorAll("#priceFilters .filter").forEach(b => b.addEventListener("click", () => { document.querySelectorAll("#priceFilters .filter").forEach(x => x.classList.remove("active")); b.classList.add("active"); window.selectedPrice = b.dataset.price; applyBrechoFilters() })); setupMulti('.style.filter', 'selectedStyles', 'all'); setupMulti('.category.filter', 'selectedCategories', 'all');
// });
// document.addEventListener("DOMContentLoaded", () => { const toggle = document.querySelector("#filtersToggle"), panel = document.querySelector("#filtersPanel"); if (!toggle || !panel) return; toggle.addEventListener("click", () => { const open = panel.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)) }) });
// document.addEventListener("novodenovo:data-loaded", () => { const featured = document.querySelector("#featuredGrid"); if (featured) renderBrechos(BRECHOS.slice(0, 4), featured); applyBrechoFilters() });
// document.addEventListener("novodenovo:favoritos-loaded", () => { const featured = document.querySelector("#featuredGrid"); if (featured) renderBrechos(BRECHOS.slice(0, 4), featured); applyBrechoFilters() });

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function brechoCard(brecho, index) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const fav = window.NovoDeNovoCards?.ativo("brechos", brecho.id);
  return `
<article class="brecho-card" data-brecho-index="${index}" tabindex="0" role="button" aria-label="Ver detalhes de ${
    brecho.name
  }">
<div class="brecho-image"><img src="${brecho.image}" alt="${
    brecho.name
  }" loading="lazy"><span class="tag">${brecho.tag}</span><span class="price">R$ ${
    brecho.priceMin
  }–${brecho.priceMax}</span></div>
<div class="brecho-content"><h3>${brecho.name}</h3><p>📍 ${
    brecho.city
  }</p><p>🛍️ ${brecho.products} produtos</p><p class="rating">★★★★★ <span>${
    brecho.rating
  }</span></p>
<div class="card-actions"><button class="button button-primary small brecho-details" data-brecho-index="${index}">Visitar Brechó</button><button class="mini-button favorite-button ${
    fav ? "selected" : ""
  }" aria-label="Favoritar ${brecho.name}" aria-pressed="${
    fav ? "true" : "false"
  }">${
    fav ? "♥" : "♡"
  }</button><button class="mini-button share-button" aria-label="Compartilhar ${
    brecho.name
  }">⌯</button></div></div></article>`;
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function renderBrechos(list, target) {
  target.innerHTML = list
    .map((b) => brechoCard(b, BRECHOS.indexOf(b)))
    .join("");

  target.querySelectorAll(".brecho-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".mini-button")) {
        openDetailModal("brecho", +card.dataset.brechoIndex);
      }
    });
    card.addEventListener("keydown", (e) => {
      if (
        (e.key === "Enter" || e.key === " ") &&
        !e.target.closest("button")
      ) {
        e.preventDefault();
        openDetailModal("brecho", +card.dataset.brechoIndex);
      }
    });
  });

  target.querySelectorAll(".brecho-details").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetailModal("brecho", +b.dataset.brechoIndex);
    })
  );

  target.querySelectorAll(".favorite-button").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const item = BRECHOS[+b.closest(".brecho-card").dataset.brechoIndex];
      window.NovoDeNovoCards.alternar("brecho", item.id, b);
    })
  );

  target.querySelectorAll(".share-button").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const item = BRECHOS[+b.closest(".brecho-card").dataset.brechoIndex];
      window.NovoDeNovoCards.compartilhar(item, "brecho");
    })
  );
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function applyBrechoFilters() {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const search = document.querySelector("#searchInput");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const all = document.querySelector("#allBrechosGrid");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const empty = document.querySelector("#emptyState");

  if (!search || !all) return;

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const query = search.value.trim().toLowerCase();
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const price = window.selectedPrice || "all";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const styles = window.selectedStyles || new Set();
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const categories = window.selectedCategories || new Set();

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const filtered = BRECHOS.filter((item) => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const textMatch = `${item.name} ${item.city}`.toLowerCase().includes(query);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const styleMatch = styles.size === 0 || styles.has(item.style);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const categoryMatch = categories.size === 0 || categories.has(item.tag);

    let priceMatch = true;
    if (price === "50") priceMatch = item.priceMin <= 50;
    if (price === "100") priceMatch = item.priceMin <= 100 && item.priceMax >= 50;
    if (price === "200") priceMatch = item.priceMax >= 100 && item.priceMin <= 200;
    if (price === "high") priceMatch = item.priceMax > 200;

    return textMatch && styleMatch && categoryMatch && priceMatch;
  });

  renderBrechos(filtered, all);
  empty.classList.toggle("hidden", filtered.length !== 0);
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function setupMulti(selector, setName, allValue) {
  document.querySelectorAll(selector).forEach((b) =>
    b.addEventListener("click", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const set = window[setName];
      if (
        b.dataset.style === allValue ||
        b.dataset.category === allValue
      ) {
        set.clear();
        document
          .querySelectorAll(selector)
          .forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      } else {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
        const value = b.dataset.style || b.dataset.category;
        b.classList.toggle("active");
        b.classList.contains("active")
          ? set.add(value)
          : set.delete(value);

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
        const all = document.querySelector(
          `${selector}[data-style="${allValue}"],${selector}[data-category="${allValue}"]`
        );
        if (all) all.classList.toggle("active", set.size === 0);
      }
      applyBrechoFilters();
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const featured = document.querySelector("#featuredGrid");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const search = document.querySelector("#searchInput");

  if (!featured || !search) return;

  window.selectedPrice = "all";
  window.selectedStyles = new Set();
  window.selectedCategories = new Set();

  renderBrechos(BRECHOS.slice(0, 4), featured);
  applyBrechoFilters();

  search.addEventListener("input", applyBrechoFilters);

  document.querySelectorAll("#priceFilters .filter").forEach((b) =>
    b.addEventListener("click", () => {
      document
        .querySelectorAll("#priceFilters .filter")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      window.selectedPrice = b.dataset.price;
      applyBrechoFilters();
    })
  );

  setupMulti(".style.filter", "selectedStyles", "all");
  setupMulti(".category.filter", "selectedCategories", "all");
});

document.addEventListener("DOMContentLoaded", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const toggle = document.querySelector("#filtersToggle");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const panel = document.querySelector("#filtersPanel");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
});

document.addEventListener("novodenovo:data-loaded", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const featured = document.querySelector("#featuredGrid");
  if (featured) renderBrechos(BRECHOS.slice(0, 4), featured);
  applyBrechoFilters();
});

document.addEventListener("novodenovo:favoritos-loaded", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const featured = document.querySelector("#featuredGrid");
  if (featured) renderBrechos(BRECHOS.slice(0, 4), featured);
  applyBrechoFilters();
});
