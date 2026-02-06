"use strict";

(function setupMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");

  if (!menuBtn || !menu) return;

  const closeEls = menu.querySelectorAll("[data-menu-close]");
  const panel = menu.querySelector(".menu__panel");

  function openMenu() {
    menu.hidden = false;
    // next frame so CSS transition can run
    requestAnimationFrame(() => {
      menu.classList.add("is-open");
    });

    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");

    // prevent background scroll while menu is open
    document.documentElement.style.overflow = "hidden";

    // focus close button or first link for accessibility
    const firstFocusable =
      menu.querySelector(".menu__close") || menu.querySelector(".menu__link");
    if (firstFocusable) firstFocusable.focus();
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");

    document.documentElement.style.overflow = "";

    // wait for animation, then hide
    window.setTimeout(() => {
      menu.hidden = true;
    }, 200);

    // return focus to the button
    menuBtn.focus();
  }

  function toggleMenu() {
    const isOpen = !menu.hidden && menu.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  }

  // Open/close on hamburger button
  menuBtn.addEventListener("click", toggleMenu);

  // Close when clicking backdrop or any element with data-menu-close
  closeEls.forEach((el) => el.addEventListener("click", closeMenu));

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const isOpen = !menu.hidden && menu.classList.contains("is-open");
    if (isOpen) closeMenu();
  });

  // Safety: stop clicks inside panel from closing when backdrop handler exists
  if (panel) {
    panel.addEventListener("click", (e) => e.stopPropagation());
  }
})();
