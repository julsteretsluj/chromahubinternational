(function () {
  const storageKey = "chroma-theme";
  const seizureSafeKey = "chroma-seizure-safe";
  const safetyGateSeenKey = "chroma-safety-gate-seen";

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

  function isSeizureSafeEnabled() {
    return localStorage.getItem(seizureSafeKey) === "true";
  }

  function setSeizureSafe(enabled) {
    document.documentElement.setAttribute("data-seizure-safe", enabled ? "true" : "false");
    localStorage.setItem(seizureSafeKey, String(enabled));
    document.querySelectorAll(".safety-toggle").forEach((button) => {
      button.textContent = enabled ? "Safe On" : "Safe";
      button.setAttribute(
        "aria-label",
        enabled ? "Disable epilepsy safe mode" : "Enable epilepsy safe mode"
      );
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
    });
  }

  setTheme(getTheme());
  setSeizureSafe(isSeizureSafeEnabled());

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

    document.querySelectorAll(".nav-end").forEach((navEnd) => {
      if (navEnd.querySelector(".safety-toggle")) return;
      const safetyButton = document.createElement("button");
      safetyButton.type = "button";
      safetyButton.className = "safety-toggle";
      navEnd.insertBefore(safetyButton, navEnd.querySelector(".nav-toggle") || null);
      safetyButton.addEventListener("click", () => {
        const enabled = document.documentElement.getAttribute("data-seizure-safe") === "true";
        setSeizureSafe(!enabled);
      });
    });

    updateThemeToggle(document.documentElement.getAttribute("data-theme"));
    setSeizureSafe(document.documentElement.getAttribute("data-seizure-safe") === "true");

    function closeSafetyGate() {
      const gate = document.querySelector(".safety-gate");
      if (gate) gate.remove();
      document.body.classList.remove("safety-gate-active");
      document.body.classList.add("site-ready");
    }

    function openSafetyGate() {
      document.body.classList.add("safety-gate-active");
      const gate = document.createElement("section");
      gate.className = "safety-gate";
      gate.setAttribute("aria-label", "Safety screen");
      gate.innerHTML = `
        <div class="safety-gate-card">
          <h1>Safety Screen</h1>
          <p>Before continuing, let us know if you are photosensitive or epileptic.</p>
          <p>If yes, we will automatically enable reduced contrast and reduced motion mode.</p>
          <div class="safety-gate-actions">
            <button type="button" class="safety-gate-btn safety-gate-btn-primary" data-epilepsy-choice="yes">Yes, enable epilepsy safe mode</button>
            <button type="button" class="safety-gate-btn" data-epilepsy-choice="no">No, continue standard mode</button>
          </div>
        </div>
      `;
      document.body.appendChild(gate);
      document.body.classList.add("site-ready");

      gate.querySelector('[data-epilepsy-choice="yes"]').addEventListener("click", () => {
        setSeizureSafe(true);
        localStorage.setItem(safetyGateSeenKey, "true");
        closeSafetyGate();
      });

      gate.querySelector('[data-epilepsy-choice="no"]').addEventListener("click", () => {
        setSeizureSafe(false);
        localStorage.setItem(safetyGateSeenKey, "true");
        closeSafetyGate();
      });
    }

    if (localStorage.getItem(safetyGateSeenKey) === "true") {
      document.body.classList.add("site-ready");
    } else {
      openSafetyGate();
    }

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
