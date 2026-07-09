/* ChromaShare — client-side resource library (localStorage + seed catalog) */
(function () {
  const KEYS = {
    profile: "chroma-share-profile",
    resources: "chroma-share-user-resources",
    forum: "chroma-share-forum",
  };

  const TYPES = {
    "lesson-plan": "Lesson plan",
    strategy: "Accessibility strategy",
    audit: "Audit report",
    template: "UDL template",
  };

  const SEED_RESOURCES = [
    {
      id: "seed-udl-intro",
      seed: true,
      title: "UDL Lesson Shell — Multi-Modal Science Unit",
      author: "M. Chen",
      type: "lesson-plan",
      subject: "science",
      age: "6-8",
      language: "en",
      license: "CC BY 4.0",
      tags: ["UDL", "multi-modal", "elementary"],
      forks: 12,
      body: "## Learning goal\nStudents explain how plants get energy.\n\n## Anticipated barriers\n- Dense textbook language\n- Fine-motor load on note-taking\n- Timing pressure on labs\n\n## Multiple pathways\n- **Engagement:** choice of plant topic (food crop vs local wildflower)\n- **Representation:** video, labeled diagram, or read-aloud article\n- **Expression:** oral explanation, comic strip, or structured paragraph\n\n## Assessment alternatives\n- Record a 60-second explanation OR\n- Label a diagram with full captions OR\n- Complete a cloze summary with word bank",
    },
    {
      id: "seed-visual-schedule",
      seed: true,
      title: "Visual Schedule for Low-Stimulation Transitions",
      author: "A. Okonkwo",
      type: "strategy",
      subject: "general",
      age: "k-2",
      language: "en",
      license: "CC BY 4.0",
      tags: ["transitions", "visual-schedule", "sensory"],
      forks: 28,
      body: "A wall-mounted strip with: Arrival → Morning meeting → Literacy block → Movement break → Math → Lunch.\n\nEach block uses the same icon + text format. A movable clip shows \"now\" and \"next.\"\n\n**Why it works:** Predictability reduces transition anxiety. Icons support pre-readers.\n\n**Tip:** Preview any schedule change the day before — never swap icons without warning.",
    },
    {
      id: "seed-math-blocks",
      seed: true,
      title: "Dyscalculia-Friendly Magnitude Blocks Activity",
      author: "J. Rivera",
      type: "lesson-plan",
      subject: "math",
      age: "3-5",
      language: "en",
      license: "CC BY-SA 4.0",
      tags: ["dyscalculia", "manipulatives", "magnitude"],
      forks: 9,
      body: "Replace abstract comparison worksheets with physical block piles.\n\n1. Students build two piles without seeing numerals first.\n2. Only after comparing physically, reveal number cards.\n3. Discuss when numbers and blocks disagree.\n\n**Accommodation notes:** Allow extra time; no timed drills. Offer graph paper for alignment.",
    },
    {
      id: "seed-audit-literacy",
      seed: true,
      title: "Before/After: Grade 4 Literacy Worksheet Audit",
      author: "ChromaShare Community",
      type: "audit",
      subject: "literacy",
      age: "3-5",
      language: "en",
      license: "CC BY 4.0",
      tags: ["audit", "readability", "worksheet"],
      forks: 6,
      body: "**Before:** 800-word passage, 12 comprehension questions, no headings, 9pt font.\n\n**After fixes:**\n- Split passage into 3 headed sections\n- Increased line height to 1.8\n- Reduced questions to 6 with sentence starters\n- Added optional audio link\n\n**Outcome:** Completion rate rose; teacher reported fewer overwhelm complaints.",
    },
    {
      id: "seed-sel-regulation",
      seed: true,
      title: "Co-Regulation Corner Setup Guide",
      author: "S. Patel",
      type: "strategy",
      subject: "sel",
      age: "k-2",
      language: "en",
      license: "CC BY 4.0",
      tags: ["regulation", "classroom-design", "autism"],
      forks: 15,
      body: "Designate a low-stimulation corner with: dimmable light, noise-reducing headphones, textured fidget basket, visual timer, and a one-page \"I need\" card set.\n\nRules: optional use, no punishment for visiting, max 10 min unless student requests extension.\n\nTrain all staff on the purpose — not a timeout space.",
    },
    {
      id: "seed-es-plantas",
      seed: true,
      title: "Plan de lección UDL — Ciclo de las plantas",
      author: "L. Morales",
      type: "lesson-plan",
      subject: "science",
      age: "6-8",
      language: "es",
      license: "CC BY 4.0",
      tags: ["UDL", "español", "ciencias"],
      forks: 4,
      body: "## Objetivo\nExplicar el ciclo de vida de una planta con evidencia.\n\n## Barreras anticipadas\n- Vocabulario técnico denso\n- Carga visual en diagramas pequeños\n\n## Opciones\n- Video con subtítulos O lectura guiada\n- Diagrama etiquetado O maqueta tridimensional\n- Informe escrito O presentación oral de 2 minutos",
    },
    {
      id: "seed-assessment-alt",
      seed: true,
      title: "Assessment Alternatives Menu (Copy-Paste)",
      author: "ChromaShare Templates",
      type: "template",
      subject: "general",
      age: "9-12",
      language: "en",
      license: "CC0",
      tags: ["UDL", "assessment", "template"],
      forks: 31,
      body: "Students demonstrate the same learning goal by choosing ONE:\n\n□ Written response (with extended time)\n□ Oral response (recorded or live)\n□ Visual product (poster, slide deck, infographic)\n□ Practical demonstration\n□ Structured interview with prompt card\n\nTeacher notes which option was chosen for portfolio tracking — not for ranking students.",
    },
    {
      id: "seed-gbs-barrier",
      seed: true,
      title: "Goal–Barrier–Strategy Worksheet",
      author: "ChromaShare Templates",
      type: "template",
      subject: "general",
      age: "adult",
      language: "en",
      license: "CC0",
      tags: ["UDL", "planning", "template"],
      forks: 22,
      body: "| Learning goal | Anticipated barrier | UDL strategy |\n|---|---|---|\n| | | Engagement: |\n| | | Representation: |\n| | | Expression: |\n\n**Instructions:** Fill one row per goal. Strategies must name a concrete classroom change, not a student deficit fix.",
    },
  ];

  const UDL_TEMPLATES = [
    {
      id: "tpl-gbs",
      title: "Goal–Barrier–Strategy Worksheet",
      description: "Plan accommodations from anticipated barriers, not deficits.",
      body: SEED_RESOURCES.find((r) => r.id === "seed-gbs-barrier").body,
    },
    {
      id: "tpl-lesson",
      title: "Multi-Modal Lesson Plan Shell",
      description: "Engagement, representation, and expression built into every unit.",
      body: SEED_RESOURCES.find((r) => r.id === "seed-udl-intro").body,
    },
    {
      id: "tpl-assess",
      title: "Assessment Alternatives Menu",
      description: "Equivalent ways to demonstrate the same learning goal.",
      body: SEED_RESOURCES.find((r) => r.id === "seed-assessment-alt").body,
    },
  ];

  const SEED_FORUM = [
    {
      id: "topic-1",
      seed: true,
      title: "How do you introduce UDL without overwhelming colleagues?",
      author: "Community",
      created: "2026-03-12T10:00:00Z",
      posts: [
        {
          id: "p1",
          author: "R. Kim",
          body: "Start with one lesson swap, not a full curriculum rewrite. Share the before/after student work — that lands better than theory.",
          created: "2026-03-12T14:22:00Z",
        },
        {
          id: "p2",
          author: "D. Alvarez",
          body: "We ran a 20-minute lunch demo using ChromaShare's barrier worksheet. Teachers left with one strategy to try that week.",
          created: "2026-03-13T09:05:00Z",
        },
      ],
    },
    {
      id: "topic-2",
      seed: true,
      title: "Visual schedule routines that actually survive Mondays?",
      author: "Community",
      created: "2026-03-08T08:00:00Z",
      posts: [
        {
          id: "p3",
          author: "A. Okonkwo",
          body: "Laminate the strip, use Velcro for the clip, and assign one student per week as 'schedule captain' — builds ownership.",
          created: "2026-03-08T11:30:00Z",
        },
      ],
    },
  ];

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getProfile() {
    return readJson(KEYS.profile, { name: "", school: "" });
  }

  function saveProfile(profile) {
    writeJson(KEYS.profile, profile);
  }

  function getUserResources() {
    return readJson(KEYS.resources, []);
  }

  function saveUserResources(list) {
    writeJson(KEYS.resources, list);
  }

  function getAllResources() {
    const user = getUserResources();
    const seedIds = new Set(SEED_RESOURCES.map((r) => r.id));
    const merged = [...SEED_RESOURCES];
    user.forEach((r) => {
      if (!seedIds.has(r.id)) merged.push(r);
    });
    return merged;
  }

  function getResource(id) {
    return getAllResources().find((r) => r.id === id) || null;
  }

  function addResource(data) {
    const profile = getProfile();
    const resource = {
      id: uid("res"),
      seed: false,
      title: data.title.trim(),
      author: data.author?.trim() || profile.name || "Anonymous educator",
      type: data.type,
      subject: data.subject,
      age: data.age,
      language: data.language,
      license: data.license || "CC BY 4.0",
      tags: (data.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      forks: 0,
      forkedFrom: data.forkedFrom || null,
      body: data.body.trim(),
      created: new Date().toISOString(),
    };
    const list = getUserResources();
    list.unshift(resource);
    saveUserResources(list);
    return resource;
  }

  function forkResource(id) {
    const source = getResource(id);
    if (!source) return null;
    return addResource({
      title: source.title + " (adapted)",
      type: source.type,
      subject: source.subject,
      age: source.age,
      language: source.language,
      license: source.license,
      tags: source.tags.join(", "),
      body: source.body,
      forkedFrom: source.id,
    });
  }

  function exportResourceJson(id) {
    const r = getResource(id);
    if (!r) return;
    const blob = new Blob([JSON.stringify(r, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (r.title.replace(/[^\w]+/g, "-").toLowerCase() || "resource") + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportResourceMarkdown(id) {
    const r = getResource(id);
    if (!r) return;
    const md =
      "# " + r.title + "\n\n" +
      "**Author:** " + r.author + "  \n" +
      "**Type:** " + (TYPES[r.type] || r.type) + "  \n" +
      "**License:** " + r.license + "  \n" +
      "**Tags:** " + r.tags.join(", ") + "\n\n---\n\n" +
      r.body;
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (r.title.replace(/[^\w]+/g, "-").toLowerCase() || "resource") + ".md";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function runAudit(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      return { score: 0, checks: [], suggestions: ["Paste or type curriculum content to audit."] };
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const avgWordsPerSentence = sentences.length
      ? words.length / sentences.length
      : words.length;
    const avgWordLen =
      words.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, "").length, 0) /
      Math.max(words.length, 1);
    const capsRatio =
      words.filter((w) => w.length > 2 && w === w.toUpperCase()).length /
      Math.max(words.length, 1);
    const hasHeadings = /^#{1,3}\s/m.test(trimmed) || /<h[1-3]/i.test(trimmed);
    const hasLists = /^[\s]*[-*•]\s/m.test(trimmed) || /^\d+\.\s/m.test(trimmed);
    const sensoryHeavy = (trimmed.match(/\b(flash|strobe|loud|bright|chaos|overwhelm|fast-paced)\b/gi) || []).length;
    const longParagraphs = trimmed.split(/\n\n+/).some((p) => p.split(/\s+/).length > 120);

    const checks = [
      {
        id: "headings",
        label: "Clear structure (headings or sections)",
        pass: hasHeadings || trimmed.split(/\n\n+/).length >= 3,
        tip: "Add ## section headings or break content into shorter blocks.",
      },
      {
        id: "sentence-length",
        label: "Readable sentence length (avg ≤ 22 words)",
        pass: avgWordsPerSentence <= 22,
        tip: "Split long sentences. Current average: " + avgWordsPerSentence.toFixed(1) + " words.",
      },
      {
        id: "word-complexity",
        label: "Moderate vocabulary load (avg word length ≤ 6)",
        pass: avgWordLen <= 6,
        tip: "Swap jargon for plain language where possible. Current avg: " + avgWordLen.toFixed(1) + " chars.",
      },
      {
        id: "caps",
        label: "Low ALL-CAPS usage",
        pass: capsRatio < 0.05,
        tip: "Reduce shouting caps — they increase visual stress.",
      },
      {
        id: "lists",
        label: "Scannable lists or steps",
        pass: hasLists,
        tip: "Use bullet lists for instructions and options.",
      },
      {
        id: "paragraphs",
        label: "No wall-of-text paragraphs",
        pass: !longParagraphs,
        tip: "Break paragraphs longer than ~120 words.",
      },
      {
        id: "sensory",
        label: "Sensory load language reviewed",
        pass: sensoryHeavy <= 1,
        tip: "Flag high-stimulation activities; offer low-stim alternatives.",
      },
      {
        id: "images",
        label: "Images described (manual check)",
        pass: null,
        tip: "Ensure every image has alt text and a text equivalent.",
      },
    ];

    const scored = checks.filter((c) => c.pass !== null);
    const passed = scored.filter((c) => c.pass).length;
    const score = Math.round((passed / scored.length) * 100);
    const suggestions = checks
      .filter((c) => c.pass === false || c.pass === null)
      .map((c) => c.tip);

    return { score, checks, suggestions, wordCount: words.length };
  }

  function getForumTopics() {
    const user = readJson(KEYS.forum, []);
    const seedIds = new Set(SEED_FORUM.map((t) => t.id));
    const merged = [...SEED_FORUM];
    user.forEach((t) => {
      if (!seedIds.has(t.id)) merged.unshift(t);
    });
    return merged.sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  function saveForumTopics(userTopics) {
    writeJson(KEYS.forum, userTopics);
  }

  function addForumTopic(title, body) {
    const profile = getProfile();
    const topic = {
      id: uid("topic"),
      seed: false,
      title: title.trim(),
      author: profile.name || "Educator",
      created: new Date().toISOString(),
      posts: body.trim()
        ? [{ id: uid("post"), author: profile.name || "Educator", body: body.trim(), created: new Date().toISOString() }]
        : [],
    };
    const user = readJson(KEYS.forum, []);
    user.unshift(topic);
    saveForumTopics(user);
    return topic;
  }

  function addForumReply(topicId, body) {
    const profile = getProfile();
    const post = {
      id: uid("post"),
      author: profile.name || "Educator",
      body: body.trim(),
      created: new Date().toISOString(),
    };
    const user = readJson(KEYS.forum, []);
    let topic = user.find((t) => t.id === topicId);
    if (topic) {
      topic.posts.push(post);
      saveForumTopics(user);
      return topic;
    }
    const seed = SEED_FORUM.find((t) => t.id === topicId);
    if (seed) {
      topic = JSON.parse(JSON.stringify(seed));
      topic.seed = false;
      topic.posts.push(post);
      user.unshift(topic);
      saveForumTopics(user);
      return topic;
    }
    return null;
  }

  function filterResources(list, filters) {
    const q = (filters.q || "").toLowerCase();
    return list.filter((r) => {
      if (filters.type && r.type !== filters.type) return false;
      if (filters.subject && r.subject !== filters.subject) return false;
      if (filters.age && r.age !== filters.age) return false;
      if (filters.language && r.language !== filters.language) return false;
      if (!q) return true;
      const hay = [r.title, r.author, r.body, r.tags.join(" ")].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "";
    }
  }

  function renderMarkdownLite(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/^## (.+)$/gm, "<h3>$1</h3>")
      .replace(/^# (.+)$/gm, "<h2>$1</h2>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^[\s]*[-*•]\s+(.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[hul])/gm, (line) => (line.trim() ? line : ""))
      .replace(/^(.+)$/gm, (line) => {
        if (/^<(h[23]|ul|li)/.test(line)) return line;
        return line ? "<p>" + line + "</p>" : "";
      });
  }

  window.ChromaShare = {
    KEYS,
    TYPES,
    UDL_TEMPLATES,
    getProfile,
    saveProfile,
    getAllResources,
    getResource,
    addResource,
    forkResource,
    exportResourceJson,
    exportResourceMarkdown,
    runAudit,
    getForumTopics,
    addForumTopic,
    addForumReply,
    filterResources,
    formatDate,
    renderMarkdownLite,
  };
})();
