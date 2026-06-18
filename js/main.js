const APPS_SCRIPT_URL = window.config?.SHEET_URL;

const ICONS = {
  play:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none"/></svg>`,
  film:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="1.5"/><line x1="3" y1="9" x2="7" y2="9"/><line x1="3" y1="15" x2="7" y2="15"/><line x1="17" y1="9" x2="21" y2="9"/><line x1="17" y1="15" x2="21" y2="15"/></svg>`,
  controller:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="8" width="19" height="10" rx="5"/><line x1="7.5" y1="11" x2("M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z"/><path d("M3 9l2-5 4 2-2 3Z"/><path d("M9 9l2-5 4 2-2 3Z"/><path d("M１５９ｌ２－５３２－１．５３Ｚ"/></svg>`,
  ball:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><polygon points="12,8 15,10.5 13.8,14 10.2,14 9,10.5" fill="currentColor" stroke="none"/></svg>`,
  bag:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>`,
  clapper:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z"/><path d="M3 9l2-5 4 2-2 3Z"/><path d="M9 9l2-5 4 2-2 3Z"/><path d="M15 9l2-5 3 2-1.5 3Z"/></svg>`,
  swatch:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="9" r="5.2"/><circle cx="15" cy="15" r="5.2"/></svg>`,
  star:        `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9"/></svg>`,
  megaphone:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 10v4h3l6 4V6l-6 4H3Z"/><path d="M15 9a4 4 0 0 1 0 6"/><path d="M18 7a8 8 0 0 1 0 10"/></svg>`,
};

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTimecodeRuler();
  initForms();
  initCategoryChips();
  if (document.getElementById("portfolio-grid")) initPortfolio();
});

function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links){
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
  }
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const target = a.getAttribute("href");
    if (target === here || (here === "" && target === "index.html")){
      a.classList.add("active");
    }
  });
}

function initTimecodeRuler(){
  const readout = document.querySelector("[data-tc-live]");
  if (!readout) return;
  let frame = 0;
  const fps = 24;
  setInterval(() => {
    frame++;
    const totalSeconds = Math.floor(frame / fps);
    const ff = frame % fps;
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
    readout.textContent = `${hh}:${mm}:${ss}:${String(ff).padStart(2, "0")}`;
  }, 1000 / fps);
}

function initCategoryChips(){
  const grid = document.querySelector("[data-cat-grid]");
  if (!grid || typeof CATEGORIES === "undefined") return;
  grid.innerHTML = CATEGORIES.map(c => {
    const count = (typeof PORTFOLIO_ITEMS !== "undefined")
      ? PORTFOLIO_ITEMS.filter(i => i.cat === c.slug).length
      : "";
    return `
      <a class="cat-chip" style="--swatch:${c.swatch}" href="portfolio.html?cat=${c.slug}">
        <span class="icon">${ICONS[c.icon] || ICONS.play}</span>
        <span class="name">${c.name}</span>
        <span class="count">${count} cuts in the bin</span>
      </a>`;
  }).join("");
}

function initPortfolio(){
  const grid = document.getElementById("portfolio-grid");
  const filterBar = document.getElementById("filter-bar");
  if (!grid || !filterBar) return;

  const params = new URLSearchParams(location.search);
  let activeCat = params.get("cat") || "all";

  filterBar.innerHTML = ["all", ...CATEGORIES.map(c => c.slug)].map(slug => {
    if (slug === "all"){
      return `<button class="filter-pill" data-slug="all"><span class="sw"></span>All</button>`;
    }
    const c = CATEGORIES.find(c => c.slug === slug);
    return `<button class="filter-pill" data-slug="${c.slug}" style="--swatch:${c.swatch}"><span class="sw"></span>${c.name}</button>`;
  }).join("");

  function render(){
    const items = activeCat === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(i => i.cat === activeCat);

    filterBar.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.slug === activeCat);
    });

    if (!items.length){
      grid.innerHTML = `<div class="empty-state">No cuts filed under this category yet.</div>`;
      return;
    }

    grid.innerHTML = items.map(item => {
      const cat = CATEGORIES.find(c => c.slug === item.cat);
      return `
        <article class="media-card" data-id="${item.id}" tabindex="0" style="--swatch:${cat.swatch}">
          <div class="thumb">
            <span class="icon">${ICONS[cat.icon] || ICONS.play}</span>
            <span class="cat-burn">${cat.name}</span>
            <span class="tc-burn">${item.tc}</span>
          </div>
          <div class="meta">
            <h3>${item.title}</h3>
            <div class="meta-row"><span>${cat.name}</span><span>${item.duration}</span></div>
          </div>
        </article>`;
    }).join("");
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    activeCat = btn.dataset.slug;
    const url = new URL(location.href);
    if (activeCat === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", activeCat);
    history.replaceState(null, "", url);
    render();
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".media-card");
    if (card) openLightbox(card.dataset.id);
  });
  grid.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
      const card = e.target.closest(".media-card");
      if (card) openLightbox(card.dataset.id);
    }
  });

  render();
  initLightbox();
}

function initLightbox(){
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest("[data-lb-close]")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(id){
  const lb = document.getElementById("lightbox");
  const item = PORTFOLIO_ITEMS.find(i => i.id === id);
  const cat = CATEGORIES.find(c => c.slug === item.cat);
  if (!lb || !item) return;
  lb.querySelector("[data-lb-content]").innerHTML = `
    <div class="thumb" style="--swatch:${cat.swatch}">
      <span class="icon">${ICONS[cat.icon] || ICONS.play}</span>
      <span class="cat-burn">${cat.name}</span>
      <span class="tc-burn">${item.tc}</span>
    </div>
    <div class="lightbox-body">
      <h3>${item.title}</h3>
      <p>${item.blurb}</p>
      <div class="meta-row" style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;">
        <span>${cat.name}</span><span>Runtime ${item.duration}</span>
      </div>
    </div>`;
  lb.classList.add("open");
}

function closeLightbox(){
  document.getElementById("lightbox")?.classList.remove("open");
}

function initForms(){
  document.querySelectorAll("form[data-form-type]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const submitBtn = form.querySelector("button[type=submit]");
      const payload = { formType: form.dataset.formType };
      new FormData(form).forEach((v, k) => payload[k] = v);

      if (APPS_SCRIPT_URL.includes("PASTE_YOUR")){
        setStatus(status, "Form wiring works — connect the Apps Script URL in js/main.js to start saving entries.", "err");
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";

      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setStatus(status, "Got it — thanks! We'll be in touch.", "ok");
        form.reset();
      } catch (err) {
        setStatus(status, "Couldn't confirm delivery — check your connection and try again.", "err");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  });
}

function setStatus(el, msg, type){
  if (!el) return;
  el.textContent = msg;
  el.className = "form-status " + type;
}
