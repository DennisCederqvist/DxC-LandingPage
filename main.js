"use strict";

/**
 * Scroll reveal via IntersectionObserver
 */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.7, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/**
 * i18n (EN/SV) via data-i18n attributes + localStorage
 */
const I18N = {
  en: {
    skipToContent: "Skip to content",
    heroEyebrow: "Portfolio",
    name: "Dennis X Cederqvist",
    title: "Fullstack JS Student",
    tagline: "Focused on frontend UX and solid fundamentals.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    heroNote: "Open to LIA internship (Sweden) or junior roles.",

    projects: "Projects",
    projectsSub: "Live demos and source code.",
    liveDemo: "Live demo",
    code: "Code",
    trakeDesc: "Snake clone.",
    wamDesc: "A proof of concept.",
    hhaDesc: "Commissioned website.",
    weatherDesc: "Created when learning API handling.",

    skills: "Skills",
    skillsSub: "Category overview",
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools",
    extra: "Extra",
    responsiveDesign: "Responsive design",
    databasesBasic: "Databases (basic)",
    debugStructure: "Debugging & structure",
    uiPolish: "UI polish / micro-interactions",
    accessibilityBasics: "Accessibility basics",
    documentation: "Documentation",

    about: "About",
    aboutText:
      "I’m a Fullstack JavaScript student building small web apps and games while improving React state patterns and TypeScript. I care about clean structure, readable code, and smooth user experience. I’m currently looking for a LIA internship (Sweden) or a junior position.",

    contact: "Contact",
    contactSub: "Best way to reach me is email or LinkedIn.",
    emailMe: "Email me",
    messageLinkedIn: "Message on LinkedIn",

    footerText: "Built with HTML/CSS/JS • Hosted on GitHub Pages",
  },
  sv: {
    skipToContent: "Hoppa till innehåll",
    heroEyebrow: "Portfolio",
    name: "Dennis X Cederqvist",
    title: "Fullstack JS Student",
    tagline: "Fokus på frontend-UX och stabila grunder.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-post",
    heroNote: "Öppen för LIA (Sverige) eller juniorroller.",

    projects: "Projekt",
    projectsSub: "Live-demonstrationer och källkod.",
    liveDemo: "Live-demo",
    code: "Kod",
    trakeDesc: "En Snake-klon.",
    wamDesc: "Whack-A-Mole koncepttest.",
    hhaDesc: "En beställnings-/kommissionssida.",
    weatherDesc: "Skapad när jag lärde mig API-hantering.",

    skills: "Kompetenser",
    skillsSub: "Översikt per kategori",
    frontend: "Frontend",
    backend: "Backend",
    tools: "Verktyg",
    extra: "Extra",
    responsiveDesign: "Responsiv design",
    databasesBasic: "Databaser (grundläggande)",
    debugStructure: "Debugging & struktur",
    uiPolish: "UI-polish / mikrointeraktioner",
    accessibilityBasics: "Tillgänglighet (grunder)",
    documentation: "Dokumentation",

    about: "Om mig",
    aboutText:
      "Jag är en Fullstack JavaScript-student som bygger små webbappar och spel samtidigt som jag utvecklar React state-mönster och TypeScript. Jag gillar tydlig struktur, läsbar kod och en smidig användarupplevelse. Jag söker just nu LIA (Sverige) eller en junior position.",

    contact: "Kontakt",
    contactSub: "Bäst att nå mig via e-post eller LinkedIn.",
    emailMe: "Maila mig",
    messageLinkedIn: "Skriv på LinkedIn",

    footerText: "Byggd med HTML/CSS/JS • Hostad på GitHub Pages",
  },
};

function setActiveLangUI(lang) {
  const toggle = document.getElementById("langToggle");
  if (!toggle) return;
  toggle.querySelectorAll("[data-lang]").forEach((el) => {
    el.classList.toggle("lang-toggle__item--active", el.dataset.lang === lang);
  });
}

function applyLanguage(lang) {
  const dict = I18N[lang] ?? I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") el.textContent = value;
  });

  setActiveLangUI(lang);
  localStorage.setItem("lang", lang);
}

function setupLanguageToggle() {
  const toggle = document.getElementById("langToggle");
  if (!toggle) return;

  const saved = localStorage.getItem("lang");
  const initial = saved === "sv" || saved === "en" ? saved : "en";
  applyLanguage(initial);

  toggle.addEventListener("click", () => {
    const current = document.documentElement.lang === "sv" ? "sv" : "en";
    applyLanguage(current === "en" ? "sv" : "en");
  });
}

setupReveal();
setupLanguageToggle();
