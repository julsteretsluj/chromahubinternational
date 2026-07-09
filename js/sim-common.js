(function () {
  const themeKey = "chroma-theme";
  const seizureKey = "chroma-seizure-safe";

  function getTheme() {
    return (
      localStorage.getItem(themeKey) ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    );
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(themeKey, theme);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      const next = theme === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", `Switch to ${next} mode`);
    });
  }

  function applySeizureSafe(enabled) {
    document.documentElement.setAttribute("data-seizure-safe", enabled ? "true" : "false");
    localStorage.setItem(seizureKey, String(enabled));
    document.querySelectorAll(".safety-toggle").forEach((btn) => {
      btn.textContent = enabled ? "Safe On" : "Safe";
      btn.setAttribute(
        "aria-label",
        enabled ? "Disable epilepsy safe mode" : "Enable epilepsy safe mode"
      );
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
    });
    document.dispatchEvent(
      new CustomEvent("chroma-seizure-safe-change", { detail: { enabled } })
    );
  }

  window.chromaSeizureSafe = function () {
    return document.documentElement.getAttribute("data-seizure-safe") === "true";
  };

  applySeizureSafe(localStorage.getItem(seizureKey) === "true");

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-container").forEach((container) => {
      if (container.querySelector(".nav-end")) return;
      const navEnd = document.createElement("div");
      navEnd.className = "nav-end";
      navEnd.innerHTML =
        '<button class="theme-toggle" type="button" aria-label="Switch theme">' +
        '<span class="theme-icon-sun" aria-hidden="true">☀</span>' +
        '<span class="theme-icon-moon" aria-hidden="true">☽</span>' +
        "</button>" +
        '<button class="safety-toggle" type="button">Safe</button>';
      container.appendChild(navEnd);
    });

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    });

    document.querySelectorAll(".safety-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        applySeizureSafe(!window.chromaSeizureSafe());
      });
    });

    applyTheme(getTheme());
    applySeizureSafe(localStorage.getItem(seizureKey) === "true");

    if (window.chromaAccessInject) window.chromaAccessInject();

    window.addEventListener("storage", (e) => {
      if (e.key === seizureKey) applySeizureSafe(e.newValue === "true");
      if (e.key === themeKey && e.newValue) applyTheme(e.newValue);
    });
  });
})();
