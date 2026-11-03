/* ARQUIVO: js/app.js — comportamentos gerais da página inicial e componentes interativos. */

// A barra inferior só é exibida em dispositivos móveis reais.
(() => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const mobileDevice = /Android|iPhone|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|Mobile/i.test(navigator.userAgent);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const narrowScreen = window.matchMedia("(max-width: 760px)").matches;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  if (mobileDevice && (narrowScreen || coarsePointer)) {
    document.documentElement.classList.add("is-mobile-device");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const heroImage = document.querySelector("#heroImage");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const heroTitle = document.querySelector("#heroTitle");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const heroSubtitle = document.querySelector("#heroSubtitle");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const heroDots = document.querySelector("#heroDots");
  let heroIndex = 0;

  if (heroImage && heroTitle && heroSubtitle && heroDots) {
    HERO_SLIDES.forEach((_, index) => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const dot = document.createElement("button");
      dot.className = "dot" + (index === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Mostrar slide ${index + 1}`);
      dot.addEventListener("click", () => showHero(index));
      heroDots.appendChild(dot);
    });

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    function showHero(index) {
      heroIndex = index;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const slide = HERO_SLIDES[index];
      heroImage.src = slide.image;
      heroImage.alt = slide.title;
      heroTitle.textContent = slide.title;
      heroSubtitle.textContent = slide.subtitle;
      document.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    setInterval(() => showHero((heroIndex + 1) % HERO_SLIDES.length), 5000);
  }

  setupParticipationModal();
});

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function setupParticipationModal() {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const overlay = document.querySelector("#participationOverlay");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const close = document.querySelector("#participationClose");
  if (!overlay) return;

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const open = () => {
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    close?.focus();
  };

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const hide = () => {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll(".participation-trigger").forEach(button => {
    button.addEventListener("click", open);
  });

  close?.addEventListener("click", hide);
  overlay.addEventListener("click", event => {
    if (event.target === overlay) hide();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("show")) hide();
  });
}

let currentDetailType=null,currentDetailItem=null;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function openDetailModal(type, index) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const overlay = document.querySelector("#detailOverlay");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const item = type === "brecho" ? BRECHOS[index] : EVENTOS[index];
  currentDetailType=type; currentDetailItem=item;
  if (!overlay || !item) return;

  document.querySelector("#detailImage").src = item.image;
  document.querySelector("#detailImage").alt = item.name;
  document.querySelector("#detailTitle").textContent = item.name;
  document.querySelector("#detailLocation").textContent = "📍 " + item.city;

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const info = document.querySelector("#detailInfo");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const desc = document.querySelector("#detailDescription");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const main = document.querySelector("#detailMainButton");

  if (type === "brecho") {
    document.querySelector("#detailEyebrow").textContent = item.tag.toUpperCase();
    info.innerHTML = `<div><strong>${item.rating}</strong><small>Avaliação</small></div><div><strong>${item.products}</strong><small>Produtos</small></div><div><strong>R$ ${item.priceMin}</strong><small>Preço inicial</small></div><div><strong>${item.style}</strong><small>Estilo</small></div>`;
    desc.textContent = `Conheça o ${item.name}, um espaço de moda circular com peças ${item.style.toLowerCase()} e opções para diferentes estilos e bolsos.`;
  } else {
    document.querySelector("#detailEyebrow").textContent = "PRÓXIMO EVENTO";
    info.innerHTML = `<div><strong>${item.date}</strong><small>Data</small></div><div><strong>${item.exhibitors}</strong><small>Expositores</small></div><div><strong>${item.city.split(",")[0]}</strong><small>Cidade</small></div>`;
    desc.textContent = `Participe do ${item.name} e descubra novos garimpos, brechós e iniciativas de moda circular.`;
  }

  // A localização continua disponível apenas para brechós; bazares exibem somente a agenda.
  main.textContent = "Ver localização";
  main.style.display = type === "brecho" ? "" : "none";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const favBtn=document.querySelector("#detailFavorite");
  if(favBtn){if(type==="brecho"){const on=window.NovoDeNovoCards?.ativo("brechos",item.id);favBtn.textContent=on?"♥ Favoritado":"♡ Favoritar";favBtn.classList.toggle("selected",!!on);}else{const on=window.NovoDeNovoCards?.lembreteAtivo(item.id);favBtn.textContent=on?"✓ Na agenda":"▣ Adicionar à agenda";favBtn.classList.toggle("selected",!!on);}}
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.querySelector("#detailClose")?.focus();
}

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function closeDetailModal() {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const overlay = document.querySelector("#detailOverlay");
  if (!overlay) return;
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#detailClose")?.addEventListener("click", closeDetailModal);
  document.querySelector("#detailOverlay")?.addEventListener("click", event => {
    if (event.target.id === "detailOverlay") closeDetailModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDetailModal();
  });
  document.querySelector("#detailFavorite")?.addEventListener("click", async event => {
    if(!currentDetailItem||!window.NovoDeNovoCards)return;
    if(currentDetailType==="brecho"){await window.NovoDeNovoCards.alternar("brecho",currentDetailItem.id,event.currentTarget);const on=window.NovoDeNovoCards.ativo("brechos",currentDetailItem.id);event.currentTarget.textContent=on?"♥ Favoritado":"♡ Favoritar";}
    else{await window.NovoDeNovoCards.alternarLembrete(currentDetailItem.id,event.currentTarget);const on=window.NovoDeNovoCards.lembreteAtivo(currentDetailItem.id);event.currentTarget.textContent=on?"✓ Na agenda":"▣ Adicionar à agenda";}
  });
  document.querySelector("#detailMainButton")?.addEventListener("click", () => {
    document.querySelector("#mapa")?.scrollIntoView({ behavior: "smooth" });
  });

  // Os botões da seção "Faça parte" continuam demonstrativos até a integração com cadastro/backend.
  document.querySelectorAll(".join-button").forEach(button => {
    button.addEventListener("click", () => alert(`${button.dataset.join}: esta ação está pronta para receber a integração com cadastro no próximo passo.`));
  });
});
