(function () {
  const dyslexiaKey = "chroma-dyslexia-mode";
  const colorblindKey = "chroma-colorblind-mode";

  function applyDyslexia(enabled) {
    document.documentElement.setAttribute("data-dyslexia-mode", enabled ? "true" : "false");
    localStorage.setItem(dyslexiaKey, String(enabled));
    document.querySelectorAll("[data-dyslexia-toggle]").forEach((el) => {
      if (el.type === "checkbox") el.checked = enabled;
      el.setAttribute("aria-pressed", enabled ? "true" : "false");
    });
    document.dispatchEvent(
      new CustomEvent("chroma-dyslexia-change", { detail: { enabled } })
    );
  }

  function applyColorblind(mode) {
    const value = mode || "off";
    if (value === "off") {
      document.documentElement.removeAttribute("data-colorblind-mode");
    } else {
      document.documentElement.setAttribute("data-colorblind-mode", value);
    }
    localStorage.setItem(colorblindKey, value);
    document.querySelectorAll("[data-colorblind-select]").forEach((el) => {
      el.value = value;
    });
    document.dispatchEvent(
      new CustomEvent("chroma-colorblind-change", { detail: { mode: value } })
    );
  }

  window.chromaDyslexiaMode = function () {
    return document.documentElement.getAttribute("data-dyslexia-mode") === "true";
  };

  window.chromaColorblindMode = function () {
    return localStorage.getItem(colorblindKey) || "off";
  };

  applyDyslexia(localStorage.getItem(dyslexiaKey) === "true");
  applyColorblind(localStorage.getItem(colorblindKey) || "off");

  function buildAccessPanel() {
    const wrap = document.createElement("div");
    wrap.className = "access-wrap";
    wrap.innerHTML =
      '<button type="button" class="access-toggle" aria-expanded="false" aria-controls="chromaAccessPanel" data-access-toggle>Access</button>' +
      '<div id="chromaAccessPanel" class="access-panel" hidden>' +
      '<p class="access-panel-title">Reading &amp; color options</p>' +
      '<label class="access-row">' +
      '<input type="checkbox" data-dyslexia-toggle aria-label="OpenDyslexic reading mode">' +
      "<span>OpenDyslexic reading</span></label>" +
      '<label class="access-row">Color vision<select data-colorblind-select aria-label="Color vision mode">' +
      '<option value="off">Standard</option>' +
      '<option value="deuteranopia">Deuteranopia (red-green)</option>' +
      '<option value="protanopia">Protanopia (red-green)</option>' +
      '<option value="tritanopia">Tritanopia (blue-yellow)</option>' +
      "</select></label></div>";
    return wrap;
  }

  function wireAccessPanel(wrap) {
    const toggle = wrap.querySelector("[data-access-toggle]");
    const panel = wrap.querySelector("#chromaAccessPanel");
    const dyslexiaToggle = wrap.querySelector("[data-dyslexia-toggle]");
    const colorblindSelect = wrap.querySelector("[data-colorblind-select]");

    dyslexiaToggle.checked = window.chromaDyslexiaMode();
    colorblindSelect.value = window.chromaColorblindMode();

    toggle.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    dyslexiaToggle.addEventListener("change", () => {
      applyDyslexia(dyslexiaToggle.checked);
    });

    colorblindSelect.addEventListener("change", () => {
      applyColorblind(colorblindSelect.value);
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function injectAccessUi() {
    document.querySelectorAll(".nav-end").forEach((navEnd) => {
      if (navEnd.querySelector(".access-wrap")) return;
      const wrap = buildAccessPanel();
      wireAccessPanel(wrap);
      const safety = navEnd.querySelector(".safety-toggle");
      const theme = navEnd.querySelector(".theme-toggle");
      if (safety) {
        navEnd.insertBefore(wrap, safety);
      } else if (theme) {
        navEnd.insertBefore(wrap, theme.nextSibling);
      } else {
        navEnd.prepend(wrap);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectAccessUi();
    applyDyslexia(localStorage.getItem(dyslexiaKey) === "true");
    applyColorblind(localStorage.getItem(colorblindKey) || "off");
  });

  window.chromaAccessInject = injectAccessUi;

  window.addEventListener("storage", (e) => {
    if (e.key === dyslexiaKey) applyDyslexia(e.newValue === "true");
    if (e.key === colorblindKey) applyColorblind(e.newValue || "off");
  });
})();
