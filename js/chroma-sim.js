/* ChromaSim — shared simulation utilities */
(function () {
  const SWAP = {
    b: "d", d: "b", p: "q", q: "p", n: "u", u: "n", m: "w", w: "m",
    i: "l", l: "i", e: "a", a: "e", s: "z", z: "s", g: "q", h: "n",
  };

  function isSafe() {
    return window.chromaSeizureSafe?.() || false;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function dyslexiaSwap(text, rate) {
    const r = rate ?? 0.35;
    return [...text]
      .map((ch) => {
        const low = ch.toLowerCase();
        if (SWAP[low] && Math.random() < r) {
          return ch === low ? SWAP[low] : SWAP[low].toUpperCase();
        }
        return ch;
      })
      .join("");
  }

  function wrapDrift(text) {
    return [...text]
      .map((ch) => `<span class="cs-drift-char">${ch === " " ? "&nbsp;" : escapeHtml(ch)}</span>`)
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function bindDrift(el, opts) {
    if (!el || el.dataset.driftBound) return;
    el.dataset.driftBound = "1";
    const raw = el.textContent;
    el.innerHTML = wrapDrift(raw);
    el.addEventListener("mousemove", (e) => {
      if (opts?.paused?.() || isSafe()) return;
      const v = Math.min(5, Math.abs(e.movementX) + Math.abs(e.movementY) + 1);
      el.querySelectorAll(".cs-drift-char").forEach((node, i) => {
        const x = Math.sin((i + e.clientX) * 0.09) * v;
        const y = Math.cos((i + e.clientY) * 0.09) * v;
        const rot = Math.sin(i * 0.4 + e.clientX * 0.02) * (v * 0.8);
        node.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
      });
    });
    el.addEventListener("mouseleave", () => {
      if (opts?.paused?.()) return;
      el.querySelectorAll(".cs-drift-char").forEach((node) => {
        node.style.transform = "";
      });
    });
  }

  function speakScrambled(sentence, onDone) {
    const words = sentence.replace(/[.,!?]/g, "").split(/\s+/).filter(Boolean);
    const order = shuffle(words);
    window.speechSynthesis.cancel();
    let i = 0;
    function next() {
      if (i >= order.length) {
        if (onDone) onDone(order.join(" "));
        return;
      }
      const u = new SpeechSynthesisUtterance(order[i]);
      u.rate = 0.85 + Math.random() * 0.25;
      u.pitch = 0.9 + Math.random() * 0.2;
      u.onend = () => {
        i++;
        setTimeout(next, 120 + Math.random() * 280);
      };
      window.speechSynthesis.speak(u);
    }
    next();
    return order;
  }

  function bindLaggyInput(input, delayMs) {
    let timer = null;
    let buffer = "";
    input.addEventListener("keydown", (e) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const ch = e.key;
        const wait = (delayMs ?? 180) + Math.random() * 220;
        clearTimeout(timer);
        timer = setTimeout(() => {
          buffer += ch;
          input.value = buffer;
          input.dispatchEvent(new Event("input"));
        }, wait);
      }
    });
    input.addEventListener("paste", (e) => e.preventDefault());
  }

  function bindMisspellMirror(input, output) {
    input.addEventListener("input", () => {
      output.value = dyslexiaSwap(input.value, 0.42);
    });
  }

  function initTabs(root) {
    const tabs = root.querySelectorAll("[data-cs-tab]");
    const panels = root.querySelectorAll("[data-cs-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.dataset.csTab;
        tabs.forEach((t) => {
          const on = t.dataset.csTab === name;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        panels.forEach((p) => {
          const on = p.dataset.csPanel === name;
          p.classList.toggle("active", on);
          p.hidden = !on;
        });
      });
    });
  }

  function toast(msg, container) {
    const el = document.createElement("div");
    el.className = "cs-toast";
    el.textContent = msg;
    (container || document.body).appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  window.ChromaSim = {
    isSafe,
    shuffle,
    dyslexiaSwap,
    wrapDrift,
    bindDrift,
    speakScrambled,
    bindLaggyInput,
    bindMisspellMirror,
    initTabs,
    toast,
    escapeHtml,
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-cs-tabs]").forEach((el) => initTabs(el));
  });
})();
