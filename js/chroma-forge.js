/* ChromaForge — client-side advocacy learning platform (localStorage + seed modules) */
(function () {
  const KEYS = {
    profile: "chroma-forge-profile",
    progress: "chroma-forge-progress",
    mentor: "chroma-forge-mentor",
    capstone: "chroma-forge-capstone",
    checkins: "chroma-forge-checkins",
  };

  const TRACKS = {
    classroom: { label: "Classroom Advocate", icon: "📚" },
    workplace: { label: "Workplace Champion", icon: "💼" },
    community: { label: "Community Organizer", icon: "🌍" },
  };

  const MODES = {
    text: "Text",
    audio: "Audio script",
    visual: "Visual outline",
    interactive: "Interactive",
  };

  const MENTORS = [
    {
      id: "mentor-class",
      track: "classroom",
      name: "R. Kim",
      bio: "High school teacher and IEP meeting coach. 12 years advocating for UDL in public schools.",
      style: "Async messaging, weekly 20-min check-ins",
    },
    {
      id: "mentor-work",
      track: "workplace",
      name: "D. Alvarez",
      bio: "Neurodivergent software lead who navigated disclosure, accommodations, and promotion.",
      style: "Script review for manager conversations",
    },
    {
      id: "mentor-community",
      track: "community",
      name: "T. Okafor",
      bio: "Grassroots organizer focused on accessible events and policy testimony.",
      style: "Capstone feedback and coalition intros",
    },
  ];

  const CAPSTONE_PROMPTS = {
    classroom:
      "Design one concrete change in your classroom or school: what barrier did you identify, what advocacy strategy will you use, and how will you measure impact in 4 weeks?",
    workplace:
      "Outline a workplace inclusion initiative: audience (manager, HR, ERG), the accommodation or policy ask, and your first three action steps.",
    community:
      "Describe a community advocacy project: who is affected, what decision-makers you will reach, and one accessible event or campaign tactic you will pilot.",
  };

  function module(id, track, title, duration, content) {
    return { id, track, title, duration, modes: content };
  }

  const MODULES = [
    module("class-1", "classroom", "Foundations of Neuro-Inclusive Advocacy", "20 min", {
      text:
        "Advocacy starts with naming barriers in the **environment**, not deficits in the learner.\n\n" +
        "Key ideas:\n" +
        "• **Rights framing:** access is not charity — it is design.\n" +
        "• **Documentation:** keep dates, emails, and agreed actions.\n" +
        "• **Allies:** identify one colleague who will witness and co-sign requests.\n\n" +
        "Reflection: What is one systemic barrier in your setting that individual grit cannot fix?",
      audio:
        "[Audio script — read aloud or use text-to-speech]\n\n" +
        "Welcome to module one. Today we reframe advocacy. When a student struggles, ask what the lesson, schedule, or sensory environment demands — not what is wrong with the student.\n\n" +
        "Pause here. Name one barrier you have seen repeated across multiple learners.\n\n" +
        "Next: document everything. If a meeting happens, send a follow-up email listing agreements. Allies matter — find someone who will say the same thing in the room.\n\n" +
        "Take a breath. You do not need perfect words to start.",
      visual:
        "▸ Barrier in environment (not student)\n" +
        "▸ Document dates + agreements\n" +
        "▸ Find one ally witness\n" +
        "▸ Ask: What design change would help many?",
      interactive: "scenario-class-1",
    }),
    module("class-2", "classroom", "Accommodation Requests That Land", "25 min", {
      text:
        "Effective requests are **specific, reasonable, and tied to task demands**.\n\n" +
        "Template:\n" +
        "1. Task demand: \"Students must copy notes while listening.\"\n" +
        "2. Barrier: \"Simultaneous listening + writing overloads working memory.\"\n" +
        "3. Request: \"Provide slides 24h early + guided notes template.\"\n\n" +
        "Avoid vague asks like \"be more flexible.\" Offer two acceptable options.",
      audio:
        "[Audio script]\n\n" +
        "Read the template slowly. Your request should name the task, the barrier, and a concrete adjustment.\n\n" +
        "Practice aloud: I am requesting X because Y interferes with Z. I can meet the learning goal if...\n\n" +
        "Pause. Draft one sentence using that structure before moving on.",
      visual:
        "TASK → BARRIER → REQUEST\n" +
        "         ↓\n" +
        "    Option A / Option B",
      interactive: "scenario-class-2",
    }),
    module("class-3", "classroom", "Building Peer & Family Coalitions", "30 min", {
      text:
        "Sustainable classroom change needs **coalitions** — students, families, colleagues, and disability services aligned on the same language.\n\n" +
        "Tactics:\n" +
        "• Host a low-stim info session (not a surprise assembly).\n" +
        "• Share one-page \"why this accommodation exists\" handouts.\n" +
        "• Celebrate small wins publicly; debrief setbacks privately.",
      audio:
        "[Audio script]\n\n" +
        "Coalitions reduce the burden on one person. Identify three stakeholders who benefit from the same design change.\n\n" +
        "Plan one conversation this week that is curious, not confrontational: What would make this easier for you too?",
      visual:
        "Students ↔ Families ↔ Colleagues ↔ Admin\n" +
        "              ↓\n" +
        "        Shared language",
      interactive: "scenario-class-3",
    }),
    module("work-1", "workplace", "Disclosure on Your Terms", "20 min", {
      text:
        "Disclosure is **optional, contextual, and reversible**. You choose what, when, and to whom.\n\n" +
        "Framework:\n" +
        "• **Need-to-know:** who must understand to implement accommodations?\n" +
        "• **Script:** \"I work best when… I am requesting…\"\n" +
        "• **Boundaries:** you do not owe medical detail to coworkers.",
      audio:
        "[Audio script]\n\n" +
        "You control the narrative. Practice a 30-second script focused on task success, not diagnosis labels.\n\n" +
        "Pause. Write one sentence you would be comfortable saying to a manager.",
      visual:
        "Who needs to know? → Script → Boundaries\n" +
        "No medical overshare required",
      interactive: "scenario-work-1",
    }),
    module("work-2", "workplace", "Reasonable Adjustments Playbook", "25 min", {
      text:
        "Map **job demands** to **supports** — not personality fixes.\n\n" +
        "Examples:\n" +
        "• Open office → quiet hours + noise-canceling policy\n" +
        "• Ambiguous tasks → written briefs + clarification channel\n" +
        "• Back-to-back meetings → 10-min buffers on calendar\n\n" +
        "Pair each request with how it protects output quality.",
      audio:
        "[Audio script]\n\n" +
        "List your top three job demands that drain energy. For each, name one environmental adjustment — not a willpower strategy.\n\n" +
        "Rehearse linking the adjustment to business outcomes.",
      visual:
        "Demand → Drain → Adjustment → Outcome",
      interactive: "scenario-work-2",
    }),
    module("work-3", "workplace", "Navigating Pushback & Escalation", "30 min", {
      text:
        "When managers push back, **return to documented agreements** and escalation paths.\n\n" +
        "Steps:\n" +
        "1. Restate the task-barrier-request chain in writing.\n" +
        "2. Ask what alternative they propose that meets the same goal.\n" +
        "3. Escalate to HR/ERG only with paper trail intact.\n\n" +
        "ChromaHorizon peers can review emails before you send.",
      audio:
        "[Audio script]\n\n" +
        "Pushback is common; it is not proof you are unreasonable. Slow down, document, and ask for alternatives in writing.\n\n" +
        "You are building a record, not winning an argument in one meeting.",
      visual:
        "Pushback → Written restatement → Alternatives? → Escalate if needed",
      interactive: "scenario-work-3",
    }),
    module("comm-1", "community", "Storytelling for Policy Change", "25 min", {
      text:
        "Policy makers remember **stories + one statistic**, not jargon decks.\n\n" +
        "Structure:\n" +
        "• **Hook:** 30-second lived moment.\n" +
        "• **Stakes:** who is harmed by status quo.\n" +
        "• **Ask:** one specific policy or budget line.\n\n" +
        "Protect privacy — composite stories are valid when labeled.",
      audio:
        "[Audio script]\n\n" +
        "Record a 60-second story with your phone. Listen back. Did you name a clear ask?\n\n" +
        "Trim jargon. Replace \"awareness\" with a verb: fund, mandate, measure.",
      visual:
        "Hook → Stakes → Ask\n" +
        "60 seconds max",
      interactive: "scenario-comm-1",
    }),
    module("comm-2", "community", "Accessible Event Design", "25 min", {
      text:
        "Events exclude when **sensory, communication, and pacing** are afterthoughts.\n\n" +
        "Checklist:\n" +
        "□ Quiet room advertised upfront\n" +
        "□ Captions on all video\n" +
        "□ Agenda published in advance\n" +
        "□ No flashing visuals without warning\n" +
        "□ Multiple ways to participate (chat, async, in-room)",
      audio:
        "[Audio script]\n\n" +
        "Walk through the checklist for an event you attend or run. Mark one item missing. Draft an email requesting that item for the next date.",
      visual:
        "Sensory | Communication | Pacing | Participation options",
      interactive: "scenario-comm-2",
    }),
    module("comm-3", "community", "Coalition Building & Testimony", "30 min", {
      text:
        "Coalitions win when **roles are clear** and **burden is shared**.\n\n" +
        "Roles: researcher, storyteller, logistics, policy drafter, social lead.\n" +
        "Testimony tips: submit written comments even if you skip public comment period.\n" +
        "Schedule recovery after high-stim hearings.",
      audio:
        "[Audio script]\n\n" +
        "Name which coalition role fits your energy this month — you do not have to do everything.\n\n" +
        "Block recovery time on your calendar after any testimony day.",
      visual:
        "Roles split → Written testimony → Recovery scheduled",
      interactive: "scenario-comm-3",
    }),
  ];

  const SCENARIOS = {
    "scenario-class-1": {
      prompt: "A colleague says: \"That student just needs to try harder.\" Your best first response?",
      options: [
        "Ask what task demands might be overloading working memory",
        "Agree so the meeting moves on",
        "Share the student's diagnosis to justify accommodations",
      ],
      correct: 0,
      feedback: "Lead with environmental barriers — keeps focus on design, not deficit.",
    },
    "scenario-class-2": {
      prompt: "Which accommodation request is most actionable?",
      options: [
        "Please be more flexible with this student",
        "Provide slides 24h early because simultaneous listen-write overloads memory",
        "Reduce standards so they can pass",
      ],
      correct: 1,
      feedback: "Task + barrier + specific request is the template that administrators can implement.",
    },
    "scenario-class-3": {
      prompt: "You want families to support a new quiet lunch option. Best first step?",
      options: [
        "Surprise announcement at a loud assembly",
        "One-page explainer sent home with opt-in signup",
        "Wait until someone complains publicly",
      ],
      correct: 1,
      feedback: "Predictable, low-stim communication builds trust before change.",
    },
    "scenario-work-1": {
      prompt: "A manager asks for your full medical history. You should:",
      options: [
        "Share everything to prove legitimacy",
        "Redirect to functional needs and task-related adjustments only",
        "Refuse to discuss anything ever",
      ],
      correct: 1,
      feedback: "Functional framing protects privacy while securing accommodations.",
    },
    "scenario-work-2": {
      prompt: "Open office noise blocks deep work. Strongest ask?",
      options: [
        "I need you to make the office quieter for everyone",
        "I produce better analysis with two protected focus blocks and CC on calendar",
        "I cannot do this job",
      ],
      correct: 1,
      feedback: "Tie the adjustment to output — and make it concrete.",
    },
    "scenario-work-3": {
      prompt: "HR says your request is \"undue hardship\" without detail. Next step?",
      options: [
        "Quit immediately",
        "Request written explanation of alternatives considered",
        "Argue in the hallway",
      ],
      correct: 1,
      feedback: "Paper trail and specific alternatives keep the process accountable.",
    },
    "scenario-comm-1": {
      prompt: "Your testimony draft ends with \"raise awareness.\" Improve it by:",
      options: [
        "Adding more adjectives",
        "Naming one fund line or policy clause to change",
        "Removing all personal story",
      ],
      correct: 1,
      feedback: "Decision-makers need a verb — fund, mandate, measure — not awareness alone.",
    },
    "scenario-comm-2": {
      prompt: "A rally has strobing stage lights advertised. You should:",
      options: [
        "Skip safety — it's only an hour",
        "Request strobe-free programming or remote participation path",
        "Only warn people at the door",
      ],
      correct: 1,
      feedback: "Accessibility is designed in advance, not patched at the entrance.",
    },
    "scenario-comm-3": {
      prompt: "After giving public testimony you feel drained. Best practice?",
      options: [
        "Schedule back-to-back meetings to power through",
        "Block recovery time and debrief with one coalition partner",
        "Quit organizing forever",
      ],
      correct: 1,
      feedback: "Recovery is part of sustainable advocacy — plan it like any other task.",
    },
  };

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

  function getProfile() {
    return readJson(KEYS.profile, {
      name: "",
      track: "classroom",
      mode: "text",
      lowStim: false,
    });
  }

  function saveProfile(profile) {
    writeJson(KEYS.profile, profile);
  }

  function getProgress() {
    return readJson(KEYS.progress, {});
  }

  function saveProgress(progress) {
    writeJson(KEYS.progress, progress);
  }

  function getModulesForTrack(track) {
    return MODULES.filter((m) => m.track === track);
  }

  function getModule(id) {
    return MODULES.find((m) => m.id === id) || null;
  }

  function completeModule(moduleId, mode) {
    const progress = getProgress();
    progress[moduleId] = {
      completed: true,
      mode: mode || getProfile().mode,
      completedAt: new Date().toISOString(),
    };
    saveProgress(progress);
    return progress;
  }

  function getTrackProgress(track) {
    const mods = getModulesForTrack(track);
    const progress = getProgress();
    const done = mods.filter((m) => progress[m.id]?.completed).length;
    return { done, total: mods.length, percent: mods.length ? Math.round((done / mods.length) * 100) : 0 };
  }

  function getMentor() {
    const id = localStorage.getItem(KEYS.mentor);
    return MENTORS.find((m) => m.id === id) || null;
  }

  function matchMentor(track) {
    const mentor = MENTORS.find((m) => m.track === track) || MENTORS[0];
    localStorage.setItem(KEYS.mentor, mentor.id);
    return mentor;
  }

  function clearMentor() {
    localStorage.removeItem(KEYS.mentor);
  }

  function getCheckins() {
    return readJson(KEYS.checkins, []);
  }

  function addCheckin(note) {
    const list = getCheckins();
    list.unshift({
      id: "chk-" + Date.now(),
      note: note.trim(),
      created: new Date().toISOString(),
    });
    writeJson(KEYS.checkins, list.slice(0, 20));
    return list;
  }

  function getCapstone() {
    return readJson(KEYS.capstone, null);
  }

  function saveCapstone(data) {
    const cap = {
      title: data.title.trim(),
      body: data.body.trim(),
      track: data.track,
      submittedAt: new Date().toISOString(),
    };
    writeJson(KEYS.capstone, cap);
    return cap;
  }

  function certificateEligible() {
    const profile = getProfile();
    const tp = getTrackProgress(profile.track);
    const cap = getCapstone();
    return tp.done === tp.total && tp.total > 0 && cap && cap.track === profile.track;
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "";
    }
  }

  function renderContent(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^▸ (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>")
      .replace(/□ (.+)/g, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .split("\n")
      .map((line) => {
        if (/^<(ul|li)/.test(line)) return line;
        if (line.trim().startsWith("[")) return "<p><em>" + line + "</em></p>";
        return line.trim() ? "<p>" + line + "</p>" : "";
      })
      .join("");
  }

  window.ChromaForge = {
    KEYS,
    TRACKS,
    MODES,
    MENTORS,
    MODULES,
    SCENARIOS,
    CAPSTONE_PROMPTS,
    getProfile,
    saveProfile,
    getProgress,
    completeModule,
    getModulesForTrack,
    getModule,
    getTrackProgress,
    getMentor,
    matchMentor,
    clearMentor,
    getCheckins,
    addCheckin,
    getCapstone,
    saveCapstone,
    certificateEligible,
    formatDate,
    renderContent,
  };
})();
