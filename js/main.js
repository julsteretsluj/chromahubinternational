(function () {
  const storageKey = "chroma-theme";

  function getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function getTheme() {
    return localStorage.getItem(storageKey) || getPreferredTheme();
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, theme);
    updateThemeToggle(theme);
  }

  function updateThemeToggle(theme) {
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    });
  }

  setTheme(getTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);
        toggle.textContent = isOpen ? "✕" : "☰";
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "☰";
        });
      });
    }

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });

    updateThemeToggle(document.documentElement.getAttribute("data-theme"));

    const form = document.querySelector(".contact-form form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = "Message sent — thank you!";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
        }, 3000);
      });
    }
  });
})();
