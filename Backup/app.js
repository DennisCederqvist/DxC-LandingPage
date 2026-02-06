// Small, no-dependency JS for micro-interactions.
// Safe on GitHub Pages.

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function setYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function smoothAnchors() {
  // Smooth scroll for in-page links, without breaking normal links.
  $$(".nav a, .footer a, .brand").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return;

    a.addEventListener("click", (e) => {
      const id = href.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function chipHints() {
  const hint = $("#chipHint");
  if (!hint) return;

  const map = {
    React: "Komponenter, state, hooks, routing (vid behov).",
    TypeScript: "Grundläggande typer, props, data-modeller.",
    Node: "API:er, middleware, enkla tjänster.",
    CSS: "Responsivt, grid/flex, design tokens.",
    Git: "Branches, PRs, historik, konflikter."
  };

  $$(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.chip || "";
      hint.textContent = map[key] || "";
    });
  });
}

setYear();
smoothAnchors();
chipHints();
