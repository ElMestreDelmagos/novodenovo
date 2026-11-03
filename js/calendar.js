/* ARQUIVO: js/calendar.js — renderização e interação com calendário/agenda de eventos. */

(() => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  let viewDate = new Date();
  let selectedDate = null;

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const byId = id => document.getElementById(id);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const pad = n => String(n).padStart(2, "0");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const dateKey = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function parseEventDate(value) {
    if (!value) return null;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const raw = String(value).trim();

    // Datas vindas do Supabase (YYYY-MM-DD) devem ser interpretadas como data local,
    // evitando que o fuso horário faça o evento aparecer no dia anterior.
    const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

    // Compatibilidade com os eventos demonstrativos antigos, como "05 Jul".
    const match = raw.match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]{3})/i);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const months = { jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };
    if (!match) return null;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const month = months[match[2].slice(0, 3).toLowerCase()];
    if (month === undefined) return null;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const now = new Date();
    return new Date(now.getFullYear(), month, Number(match[1]));
  }

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function eventDate(eventOrIndex) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const event = typeof eventOrIndex === "number" ? EVENTOS[eventOrIndex] : eventOrIndex;
    // A data de início cadastrada é a fonte principal para posicionar o evento.
    return parseEventDate(event?.data_inicio || event?.date);
  }

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function renderCalendar() {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const title = byId("calendarMonth");
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const grid = byId("calendarGrid");
    if (!title || !grid) return;

    title.textContent = `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    grid.innerHTML = weekDays.map(day => `<span class="calendar-weekday">${day}</span>`).join("");

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const last = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const offset = first.getDay();
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const eventsByDate = {};

    EVENTOS.forEach((event, index) => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const date = eventDate(event);
      if (date) (eventsByDate[dateKey(date)] ||= []).push(index);
    });

    for (let i = 0; i < offset; i++) {
      grid.insertAdjacentHTML("beforeend", `<span class="calendar-day empty"></span>`);
    }

    for (let day = 1; day <= last.getDate(); day++) {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const key = dateKey(date);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const items = eventsByDate[key] || [];
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const isToday = key === dateKey(new Date());
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const isSelected = selectedDate === key;
      grid.insertAdjacentHTML("beforeend", `
        <button class="calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${items.length ? "has-event" : ""}" data-date="${key}" aria-label="${day} de ${monthNames[viewDate.getMonth()]}${items.length ? ", com evento disponível" : ""}">
          <span>${day}</span>
          ${items.length > 1 ? `<i>${items.length}</i>` : ""}
        </button>`);
    }

    grid.querySelectorAll(".calendar-day:not(.empty)").forEach(btn => {
      btn.addEventListener("click", () => selectDate(btn.dataset.date));
    });
  }

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function selectDate(key) {
    selectedDate = key;
    const [y, m, d] = key.split("-").map(Number);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const date = new Date(y, m - 1, d);
    viewDate = new Date(y, m - 1, 1);

    byId("calendarSelectedDate").textContent = date.toLocaleDateString("pt-BR", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric"
    });

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const matches = EVENTOS.map((event, index) => ({ event, index, date: eventDate(event) }))
      .filter(x => x.date && dateKey(x.date) === key);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const list = byId("calendarDayEvents");
    list.innerHTML = "";

    matches.forEach(({ event }) => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const card = document.createElement("div");
      card.className = "calendar-event-item";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const startDate = eventDate(event);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const formattedDate = startDate ? startDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "Data não informada";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const time = event.horario_inicio ? ` · ${String(event.horario_inicio).slice(0, 5)}` : "";
      card.innerHTML = `<strong>${event.name}</strong><span>${event.city}</span><small>Início: ${formattedDate}${time}</small><small>${event.exhibitors ?? "—"} expositores · evento disponível</small>`;
      list.appendChild(card);
    });

    if (!list.children.length) {
      list.innerHTML = `<p class="calendar-empty">Nenhum evento disponível nesta data.</p>`;
    }

    renderCalendar();
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!byId("calendarGrid")) return;

    byId("calendarPrev")?.addEventListener("click", () => {
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });

    byId("calendarNext")?.addEventListener("click", () => {
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });

    byId("calendarToday")?.addEventListener("click", () => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
      const today = new Date();
      selectDate(dateKey(today));
    });

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const firstEventDate = EVENTOS.map(event => eventDate(event)).find(Boolean) || new Date();
    viewDate = new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1);
    selectDate(dateKey(firstEventDate));
  });

  // O catálogo é carregado de forma assíncrona. Atualiza o calendário assim que
  // os eventos reais do Supabase substituírem os dados demonstrativos.
  document.addEventListener("novodenovo:data-loaded", () => {
    if (!byId("calendarGrid")) return;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const firstEventDate = EVENTOS.map(event => eventDate(event)).find(Boolean);
    if (firstEventDate) {
      viewDate = new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1);
      selectedDate = dateKey(firstEventDate);
      selectDate(selectedDate);
    } else {
      renderCalendar();
    }
  });
})();
