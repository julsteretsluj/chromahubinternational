/* Safety screen — shown at the start of each browser session before site content */
(function () {
  const gateKey = "chroma-safety-gate-seen";
  const seizureKey = "chroma-seizure-safe";

  if (sessionStorage.getItem(gateKey) !== "true") {
    document.documentElement.classList.add("safety-gate-pending");
  }

  function setSeizureSafe(enabled) {
    document.documentElement.setAttribute("data-seizure-safe", enabled ? "true" : "false");
    localStorage.setItem(seizureKey, String(enabled));
    document.querySelectorAll(".safety-toggle").forEach((button) => {
      button.textContent = enabled ? "Safe On" : "Safe";
      button.setAttribute(
        "aria-label",
        enabled ? "Disable epilepsy safe mode" : "Enable epilepsy safe mode"
      );
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
    });
    document.dispatchEvent(
      new CustomEvent("chroma-seizure-safe-change", { detail: { enabled } })
    );
  }

  function closeSafetyGate() {
    const gate = document.querySelector(".safety-gate");
    if (gate) gate.remove();
    document.body.classList.remove("safety-gate-active");
    document.documentElement.classList.remove("safety-gate-pending");
    document.body.classList.add("site-ready");
  }

  function openSafetyGate() {
    if (document.querySelector(".safety-gate")) return;

    document.body.classList.add("safety-gate-active");
    const gate = document.createElement("section");
    gate.className = "safety-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-label", "Safety screen");
    gate.innerHTML =
      '<div class="safety-gate-card">' +
      "<h1>Safety Screen</h1>" +
      "<p>Before continuing, let us know if you are photosensitive or epileptic.</p>" +
      "<p>If yes, we will automatically enable reduced contrast and reduced motion mode.</p>" +
      '<div class="safety-gate-actions">' +
      '<button type="button" class="safety-gate-btn safety-gate-btn-primary" data-epilepsy-choice="yes">Yes, enable epilepsy safe mode</button>' +
      '<button type="button" class="safety-gate-btn" data-epilepsy-choice="no">No, continue standard mode</button>' +
      "</div></div>";

    document.body.appendChild(gate);

    gate.querySelector('[data-epilepsy-choice="yes"]').addEventListener("click", () => {
      setSeizureSafe(true);
      sessionStorage.setItem(gateKey, "true");
      closeSafetyGate();
    });

    gate.querySelector('[data-epilepsy-choice="no"]').addEventListener("click", () => {
      setSeizureSafe(false);
      sessionStorage.setItem(gateKey, "true");
      closeSafetyGate();
    });

    gate.querySelector('[data-epilepsy-choice="yes"]').focus();
  }

  function initSafetyGate() {
    if (sessionStorage.getItem(gateKey) === "true") {
      document.documentElement.classList.remove("safety-gate-pending");
      document.body.classList.add("site-ready");
      return;
    }
    openSafetyGate();
  }

  window.chromaSafetyGate = {
    open: openSafetyGate,
    setSeizureSafe,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSafetyGate);
  } else {
    initSafetyGate();
  }
})();
