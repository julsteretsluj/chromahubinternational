/* ChromaHorizon — client-side peer mentorship pilot (localStorage + seed data) */
(function () {
  const KEYS = {
    profile: "chroma-horizon-profile",
    mentor: "chroma-horizon-mentor",
    milestones: "chroma-horizon-milestones",
    playbooks: "chroma-horizon-playbooks",
    joinedRooms: "chroma-horizon-rooms",
    savedStories: "chroma-horizon-stories",
  };

  const PATHS = {
    entering: "Entering the workforce",
    changing: "Changing roles",
    advocating: "Advocating at work",
  };

  const INDUSTRIES = {
    tech: "Technology",
    education: "Education",
    healthcare: "Healthcare",
    government: "Government",
    other: "Other / cross-sector",
  };

  const COMM_PREFS = {
    async: "Async messaging preferred",
    "video-optional": "Video optional",
    "text-only": "Text-only sessions",
  };

  const MILESTONE_DEFS = [
    { id: "m-profile", label: "Complete your profile and transition path" },
    { id: "m-mentor", label: "Match with a peer mentor" },
    { id: "m-playbook", label: "Work through a career playbook" },
    { id: "m-advocacy", label: "Draft an accommodation request" },
    { id: "m-community", label: "Join a support circle" },
    { id: "m-story", label: "Save a success story for reference" },
  ];

  const SEED_MENTORS = [
    {
      id: "mh-1",
      name: "Jordan Lee",
      neurotype: "Autistic + ADHD",
      paths: ["entering", "changing"],
      industries: ["tech"],
      bio: "Software engineer who navigated first disclosure, remote accommodations, and a promotion without masking through standups.",
      style: "Async Slack-style check-ins, optional 15-min voice",
      expertise: ["Interview formats", "Remote work design", "Manager scripts"],
    },
    {
      id: "mh-2",
      name: "Priya Nair",
      neurotype: "Dyslexic",
      paths: ["entering", "advocating"],
      industries: ["education"],
      bio: "Special education teacher turned instructional coach. Expert in IEP-adjacent workplace requests and documentation habits.",
      style: "Weekly written agendas, no surprise calls",
      expertise: ["Documentation", "School-to-work transition", "Written communication prefs"],
    },
    {
      id: "mh-3",
      name: "Marcus Webb",
      neurotype: "AuDHD",
      paths: ["changing", "advocating"],
      industries: ["healthcare"],
      bio: "Clinical researcher who changed employers after burnout, negotiated sensory-friendly lab schedules, and mentors on red-flag employers.",
      style: "Biweekly structured sessions with shared notes doc",
      expertise: ["Burnout recovery", "Employer evaluation", "Shift scheduling"],
    },
    {
      id: "mh-4",
      name: "Elena Vasquez",
      neurotype: "Autistic",
      paths: ["advocating", "changing"],
      industries: ["government"],
      bio: "Policy analyst who built accommodation pathways in a large public agency — knows HR bureaucracy and how to escalate without burning bridges.",
      style: "Text-first, pre-shared question lists",
      expertise: ["HR navigation", "Union/ERG pathways", "Escalation timing"],
    },
    {
      id: "mh-5",
      name: "Sam Okonkwo",
      neurotype: "ADHD",
      paths: ["entering"],
      industries: ["tech", "other"],
      bio: "Recent graduate who landed a first role through skills-based interviews and portfolio-first applications.",
      style: "Short voice memos + bullet summaries",
      expertise: ["First job search", "Portfolio interviews", "Onboarding week-one"],
    },
    {
      id: "mh-6",
      name: "Riley Chen",
      neurotype: "Dyspraxic + autistic",
      paths: ["changing", "entering"],
      industries: ["education", "healthcare"],
      bio: "Occupational therapist who pivoted careers twice — helps mentees evaluate offers and plan transitions that protect energy.",
      style: "Flexible pacing, pause-friendly mentorship",
      expertise: ["Career pivots", "Offer comparison", "Energy budgeting"],
    },
    {
      id: "mh-7",
      name: "Avery Kim",
      neurotype: "Autistic",
      paths: ["advocating"],
      industries: ["tech", "government"],
      bio: "Engineering manager who coaches accommodation conversations from the employee side and helps mentees practice scripts before live meetings.",
      style: "Role-play in writing, then optional practice call",
      expertise: ["Manager conversations", "Reasonable adjustments", "Follow-up emails"],
    },
    {
      id: "mh-8",
      name: "Devon Hart",
      neurotype: "AuDHD",
      paths: ["entering", "changing", "advocating"],
      industries: ["other"],
      bio: "Freelance designer and community organizer — supports non-linear careers, gig work, and building boundaries with clients.",
      style: "No fixed schedule — milestone-based async",
      expertise: ["Freelance boundaries", "Non-linear paths", "Self-advocacy"],
    },
  ];

  const PLAYBOOKS = [
    {
      id: "pb-enter-tech",
      path: "entering",
      industry: "tech",
      title: "First Tech Role — From Application to Day 30",
      duration: "6–12 weeks",
      steps: [
        "Audit job posts for timed-only steps and vague \"culture fit\" language — skip or ask for alternatives early.",
        "Request interview format options in your first reply (written Q&A, take-home, structured live).",
        "Prepare a one-page accommodation menu before offer stage — not after burnout.",
        "Week one: get written schedule, team norms, and meeting expectations before accepting optional social events.",
        "Day 30 check-in: document what worked, what drained you, and one adjustment to request.",
      ],
      redFlags: ["Unlimited \"urgent\" Slack", "Mystery panel interviews", "No written job description"],
      greenFlags: ["Async standup options", "Published engineering values", "ERG or neuro-inclusion mention"],
    },
    {
      id: "pb-enter-edu",
      path: "entering",
      industry: "education",
      title: "Entering Education — Classroom to Staff Room",
      duration: "4–8 weeks",
      steps: [
        "Clarify student-facing vs admin load before accepting — many burnout paths start with undisclosed duties.",
        "Ask about co-planning time, duty schedules, and observation rubrics in writing.",
        "Build a documentation habit from week one (dates, agreements, observation feedback).",
        "Identify one ally in the building for low-stakes check-ins.",
        "Plan your first accommodation request around task demands, not diagnosis disclosure.",
      ],
      redFlags: ["\"Family atmosphere\" with no boundaries", "Observation without rubric", "No prep time protected"],
      greenFlags: ["Mentor teacher assigned", "Union or staff council", "Clear duty calendar"],
    },
    {
      id: "pb-change-any",
      path: "changing",
      industry: "other",
      title: "Role Change or Employer Switch — Energy-First Planning",
      duration: "8–16 weeks",
      steps: [
        "List non-negotiables (commute, meeting load, sensory environment) before browsing openings.",
        "Use ChromaIndex rankings where available — compare sector benchmarks.",
        "Run informational chats before formal interviews to test culture signals.",
        "Negotiate accommodations at offer stage when possible — harder to retrofit later.",
        "Plan a transition buffer week between roles if financially feasible.",
      ],
      redFlags: ["Pressure to decide in 48 hours", "Verbal-only promises", "High turnover on team you would join"],
      greenFlags: ["Written flexible work policy", "Structured onboarding", "Clear promotion criteria"],
    },
    {
      id: "pb-advocate-hc",
      path: "advocating",
      industry: "healthcare",
      title: "Healthcare Settings — Shifts, Stimulus, and Safety",
      duration: "Ongoing",
      steps: [
        "Map shift patterns against your peak energy — request predictable schedules where possible.",
        "Document functional needs (lighting, break timing, communication mode) without unnecessary clinical detail.",
        "Identify infection-control or safety rules that cannot bend vs those that have workarounds.",
        "Build a escalation path: supervisor → occupational health → union/HR per your context.",
        "Schedule recovery time after high-stimulus shifts — treat it as workload planning.",
      ],
      redFlags: ["\"Everyone works like this\"", "Retaliation after requests", "No quiet break space"],
      greenFlags: ["Occupational health engagement", "Shift swap systems", "Written break policies"],
    },
    {
      id: "pb-advocate-gov",
      path: "advocating",
      industry: "government",
      title: "Public Sector — Policy, Process, and Patience",
      duration: "Ongoing",
      steps: [
        "Locate the official reasonable adjustment policy — cite it in requests.",
        "Use functional language tied to job duties and public service outcomes.",
        "Expect longer timelines — set follow-up dates in every email.",
        "Connect with disability staff network or ERG if one exists.",
        "Keep a single running log of requests, responses, and deadlines.",
      ],
      redFlags: ["Informal-only processes", "Repeated \"we'll get back to you\"", "No single point of contact"],
      greenFlags: ["Published adjustment policy", "Staff disability network", "Documented SLAs"],
    },
    {
      id: "pb-change-tech",
      path: "changing",
      industry: "tech",
      title: "Promotion or Pivot Inside Tech",
      duration: "3–6 months",
      steps: [
        "Request published promotion rubric — visibility in social settings should not be a hidden criterion.",
        "Ask if advancement interviews offer the same format options as hiring.",
        "Sponsor or mentor search: find someone who will advocate in calibration rooms.",
        "Document impact in writing — async-friendly evidence for review cycles.",
        "If pivoting IC → management (or reverse), clarify sensory and meeting load changes.",
      ],
      redFlags: ["\"Just be more visible\"", "Surprise promotion panels", "Unclear leveling"],
      greenFlags: ["Written leveling guide", "Sponsorship program", "Async promotion packets"],
    },
  ];

  const ACCOMMODATION_TEMPLATES = [
    {
      id: "acc-letter",
      title: "Formal Accommodation Request Letter",
      type: "letter",
      body:
        "Subject: Reasonable adjustment request — [Your name], [Role/team]\n\n" +
        "Dear [Manager/HR contact],\n\n" +
        "I am writing to request reasonable adjustments to help me meet the core requirements of my role.\n\n" +
        "**Task demand:** [e.g., Attend daily live standups while contributing to sprint work]\n" +
        "**Barrier:** [e.g., Simultaneous verbal processing and performance under observation overloads my working memory]\n" +
        "**Requested adjustment:** [e.g., Async standup updates via written summary 3x/week, with live attendance 2x/week]\n\n" +
        "This adjustment does not change my deliverables or deadlines. I am happy to discuss alternative formats that meet the same team communication needs.\n\n" +
        "Please confirm receipt and a timeline for response. I would appreciate a written summary of any agreed actions.\n\n" +
        "Thank you,\n[Your name]",
    },
    {
      id: "acc-manager",
      title: "Manager Conversation Script (1:1 opener)",
      type: "script",
      body:
        "**Opening (choose one):**\n" +
        "• \"I'd like to discuss how I work best so I can keep delivering [specific outcome].\"\n" +
        "• \"I have a concrete adjustment that would help me meet our team's goals — can we walk through it?\"\n\n" +
        "**Structure:**\n" +
        "1. Name the task demand (what the job requires)\n" +
        "2. Name the barrier (environmental, not personal failing)\n" +
        "3. Offer 1–2 acceptable options\n" +
        "4. Ask: \"What would you need from me to make this work for the team?\"\n\n" +
        "**If pushed for diagnosis:**\n" +
        "\"I'm framing this around functional needs related to my work. I'm happy to discuss what helps me perform the role.\"\n\n" +
        "**Close:**\n" +
        "\"Can we agree on next steps and a follow-up date? I'll send a brief email summarizing what we discussed.\"",
    },
    {
      id: "acc-followup",
      title: "Follow-Up Email After Verbal Agreement",
      type: "letter",
      body:
        "Subject: Follow-up — accommodation discussion [date]\n\n" +
        "Hi [Name],\n\n" +
        "Thank you for meeting today. I am writing to confirm our discussion:\n\n" +
        "• **Agreed adjustment:** [specific change]\n" +
        "• **Start date:** [date]\n" +
        "• **Review date:** [date — suggest 30 days]\n" +
        "• **My commitment:** [deliverables unchanged / how you will stay accountable]\n\n" +
        "Please reply if I have missed anything. I appreciate your support in making this workable.\n\n" +
        "Best,\n[Your name]",
    },
    {
      id: "acc-escalation",
      title: "Escalation Note (when requests stall)",
      type: "script",
      body:
        "**When to escalate:** No written response within your org's SLA, or agreed adjustments not implemented after review date.\n\n" +
        "**Email template:**\n" +
        "Subject: Follow-up — reasonable adjustment request [original date]\n\n" +
        "I submitted a request on [date] regarding [brief summary]. I have not received [a response / implementation] as of today.\n\n" +
        "I am copying [HR/disability contact] for visibility. I remain committed to my role and would like to resolve this promptly.\n\n" +
        "Requested next step: [written timeline for response / implementation date]\n\n" +
        "**Peer mentor tip:** Escalation is not aggression — it is documentation. Stay factual, cite policies where possible, and never send when dysregulated; draft, wait, send.",
    },
    {
      id: "acc-checklist",
      title: "Pre-Meeting Preparation Checklist",
      type: "checklist",
      body:
        "□ Task demand written in one sentence\n" +
        "□ Barrier framed as environmental (not \"I can't handle...\")\n" +
        "□ Two acceptable adjustment options ready\n" +
        "□ Calendar invite has agenda if it is a live meeting\n" +
        "□ Quiet space or async alternative planned if meeting is draining\n" +
        "□ Follow-up email template drafted in advance\n" +
        "□ Mentor or ally on standby for debrief (optional)\n" +
        "□ ChromaIndex employer score checked if evaluating whether to stay",
    },
  ];

  const COMMUNITY_ROOMS = [
    {
      id: "room-entering",
      name: "First Job Cohort",
      path: "entering",
      format: "Text-only thread",
      topic: "Applications, interviews, first 90 days",
      description: "Low-stimulation space for people entering the workforce. No camera, no mandatory live sessions.",
      members: 34,
    },
    {
      id: "room-changing",
      name: "Transition Lounge",
      path: "changing",
      format: "Async + optional voice room",
      topic: "Offers, pivots, resignations",
      description: "Compare offers, plan exits, and celebrate moves — on your timeline.",
      members: 28,
    },
    {
      id: "room-advocating",
      name: "Advocacy Circle",
      path: "advocating",
      format: "Structured weekly prompts",
      topic: "Accommodations, HR, pushback",
      description: "Share scripts, wins, and stalls. Moderated, trauma-informed facilitation.",
      members: 41,
    },
    {
      id: "room-burnout",
      name: "Burnout Recovery",
      path: "changing",
      format: "Text-only, slow mode",
      topic: "Rest, boundaries, return-to-work",
      description: "No hustle culture. Pause-friendly participation — lurk as long as you need.",
      members: 52,
    },
    {
      id: "room-tech",
      name: "Tech Professionals",
      path: "advocating",
      format: "Async channel",
      topic: "Standups, on-call, remote work",
      description: "Industry-specific tactics for engineering, product, and IT roles.",
      members: 37,
    },
    {
      id: "room-mentors",
      name: "Peer Mentor Hub",
      path: "advocating",
      format: "Mentor office hours",
      topic: "Volunteer mentors, give-back",
      description: "For mentees ready to support others — or mentors swapping strategies.",
      members: 19,
    },
  ];

  const STORIES = [
    {
      id: "st-1",
      title: "Async standups saved my first engineering job",
      path: "entering",
      industry: "tech",
      challenge: "Live standups",
      body:
        "I almost quit in month two. Daily live standups meant masking, losing my train of thought, and fixing mistakes all morning.\n\n" +
        "My mentor helped me draft a request tied to sprint outcomes — not social performance. We asked for written updates four days a week.\n\n" +
        "**Before:** Panic before 9am call, code quality dropped.\n" +
        "**After:** Manager agreed to hybrid format; team adopted async notes for everyone.\n\n" +
        "Lesson: Frame adjustments as team communication upgrades, not personal exceptions.",
    },
    {
      id: "st-2",
      title: "Leaving a \"family culture\" school",
      path: "changing",
      industry: "education",
      challenge: "Burnout",
      body:
        "Unpaid duties kept expanding. When I asked for a written schedule, I was told \"we all pitch in.\"\n\n" +
        "I used a playbook red-flag list and started interviewing elsewhere. I did not disclose diagnosis — I compared prep time and observation policies.\n\n" +
        "**Outcome:** New district with union protections, mentor teacher, and clear duty calendar. Took a small pay cut; gained 12 hours/week back.",
    },
    {
      id: "st-3",
      title: "Promotion without the happy hour circuit",
      path: "changing",
      industry: "tech",
      challenge: "Advancement",
      body:
        "Promotion criteria were unpublished. I asked HR for the rubric and learned visibility in social settings was an informal factor.\n\n" +
        "I built an async impact portfolio — shipped projects, written testimonials, calibration-ready summaries. My mentor role-played the panel.\n\n" +
        "**Outcome:** Promoted with a written record of criteria used. Still skip most happy hours.",
    },
    {
      id: "st-4",
      title: "Shift swap system in healthcare",
      path: "advocating",
      industry: "healthcare",
      challenge: "Scheduling",
      body:
        "Rotating nights destroyed my regulation. Occupational health engaged after my union rep joined the thread.\n\n" +
        "We negotiated predictable blocks and a swap board — not every preferred shift, but enough pattern to plan recovery.\n\n" +
        "Documentation over six weeks was what made the difference. Single emotional email would not have worked.",
    },
    {
      id: "st-5",
      title: "First disclosure that actually went OK",
      path: "entering",
      industry: "government",
      challenge: "Disclosure",
      body:
        "I disclosed functional needs only — no diagnosis letter. Cited the agency's own adjustment policy.\n\n" +
        "Requested: noise-reducing headphones in open plan, written meeting agendas 24h ahead, one remote day/week.\n\n" +
        "**Outcome:** HR responded in 10 days. Two items approved immediately; remote day trialed for 30 days then made permanent.",
    },
    {
      id: "st-6",
      title: "When to walk away from pushback",
      path: "advocating",
      industry: "tech",
      challenge: "Retaliation",
      body:
        "After two documented requests, my manager moved me to a high-interruption desk \"for collaboration.\"\n\n" +
        "Mentor helped me log timelines and consult ChromaIndex — employer scored 56. I activated a quiet job search while keeping documentation clean.\n\n" +
        "**Outcome:** New role at 74-scored org. Old company not worth the energy fight.",
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

  function getProfile() {
    return readJson(KEYS.profile, {
      name: "",
      path: "entering",
      industry: "tech",
      comm: "async",
      goals: "",
    });
  }

  function saveProfile(profile) {
    writeJson(KEYS.profile, profile);
    autoMilestone("m-profile", profileComplete(profile));
    return profile;
  }

  function profileComplete(profile) {
    const p = profile || getProfile();
    return !!(p.name && p.name.trim() && p.path && p.industry);
  }

  function getMentor() {
    const id = localStorage.getItem(KEYS.mentor);
    return SEED_MENTORS.find((m) => m.id === id) || null;
  }

  function setMentor(id) {
    localStorage.setItem(KEYS.mentor, id);
    autoMilestone("m-mentor", true);
    return getMentor();
  }

  function clearMentor() {
    localStorage.removeItem(KEYS.mentor);
  }

  function mentorMatchScore(mentor, profile) {
    const p = profile || getProfile();
    let score = 0;
    if (mentor.paths.includes(p.path)) score += 40;
    if (mentor.industries.includes(p.industry)) score += 35;
    if (mentor.industries.includes("other")) score += 10;
    if (p.comm === "text-only" && mentor.style.toLowerCase().includes("text")) score += 15;
    if (p.comm === "async" && mentor.style.toLowerCase().includes("async")) score += 10;
    return score;
  }

  function rankMentors(profile) {
    const p = profile || getProfile();
    return SEED_MENTORS.map((m) => ({
      mentor: m,
      score: mentorMatchScore(m, p),
    })).sort((a, b) => b.score - a.score);
  }

  function getPlaybookProgress() {
    return readJson(KEYS.playbooks, {});
  }

  function markPlaybookRead(id) {
    const prog = getPlaybookProgress();
    prog[id] = { readAt: new Date().toISOString(), done: prog[id]?.done || false };
    writeJson(KEYS.playbooks, prog);
    return prog;
  }

  function markPlaybookDone(id) {
    const prog = getPlaybookProgress();
    prog[id] = { readAt: prog[id]?.readAt || new Date().toISOString(), done: true };
    writeJson(KEYS.playbooks, prog);
    autoMilestone("m-playbook", true);
    return prog;
  }

  function filterPlaybooks(path, industry) {
    let list = PLAYBOOKS.slice();
    if (path) list = list.filter((pb) => pb.path === path || pb.industry === "other");
    if (industry) {
      list = list.filter((pb) => pb.industry === industry || pb.industry === "other");
    }
    return list;
  }

  function getJoinedRooms() {
    return readJson(KEYS.joinedRooms, []);
  }

  function joinRoom(id) {
    const rooms = getJoinedRooms();
    if (!rooms.includes(id)) rooms.push(id);
    writeJson(KEYS.joinedRooms, rooms);
    autoMilestone("m-community", rooms.length > 0);
    return rooms;
  }

  function leaveRoom(id) {
    const rooms = getJoinedRooms().filter((r) => r !== id);
    writeJson(KEYS.joinedRooms, rooms);
    return rooms;
  }

  function isRoomJoined(id) {
    return getJoinedRooms().includes(id);
  }

  function getSavedStories() {
    return readJson(KEYS.savedStories, []);
  }

  function toggleSaveStory(id) {
    let saved = getSavedStories();
    if (saved.includes(id)) saved = saved.filter((s) => s !== id);
    else saved.push(id);
    writeJson(KEYS.savedStories, saved);
    autoMilestone("m-story", saved.length > 0);
    return saved;
  }

  function isStorySaved(id) {
    return getSavedStories().includes(id);
  }

  function filterStories(path, industry, query) {
    let list = STORIES.slice();
    if (path) list = list.filter((s) => s.path === path);
    if (industry) list = list.filter((s) => s.industry === industry || industry === "other");
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.challenge.toLowerCase().includes(q) ||
          s.body.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function getMilestones() {
    return readJson(KEYS.milestones, {});
  }

  function autoMilestone(id, done) {
    if (!done) return;
    const m = getMilestones();
    if (!m[id]) {
      m[id] = new Date().toISOString();
      writeJson(KEYS.milestones, m);
    }
  }

  function markAdvocacyDrafted() {
    autoMilestone("m-advocacy", true);
  }

  function milestoneProgress() {
    const m = getMilestones();
    const done = MILESTONE_DEFS.filter((d) => m[d.id]).length;
    return { done, total: MILESTONE_DEFS.length, percent: Math.round((done / MILESTONE_DEFS.length) * 100) };
  }

  function exportTransitionPlan() {
    const profile = getProfile();
    const mentor = getMentor();
    const mp = milestoneProgress();
    let md = "# ChromaHorizon Transition Plan\n\n";
    md += "**Name:** " + (profile.name || "—") + "  \n";
    md += "**Path:** " + (PATHS[profile.path] || profile.path) + "  \n";
    md += "**Industry:** " + (INDUSTRIES[profile.industry] || profile.industry) + "  \n";
    md += "**Communication preference:** " + (COMM_PREFS[profile.comm] || profile.comm) + "  \n";
    if (profile.goals) md += "**Goals:** " + profile.goals + "  \n";
    md += "**Milestone progress:** " + mp.done + "/" + mp.total + "  \n\n";
    if (mentor) {
      md += "## Matched mentor\n\n";
      md += "- **" + mentor.name + "** (" + mentor.neurotype + ")\n";
      md += "- Style: " + mentor.style + "\n";
      md += "- Expertise: " + mentor.expertise.join(", ") + "\n\n";
    }
    const playbooks = getPlaybookProgress();
    const donePb = Object.keys(playbooks).filter((k) => playbooks[k].done);
    if (donePb.length) {
      md += "## Completed playbooks\n\n";
      donePb.forEach((id) => {
        const pb = PLAYBOOKS.find((p) => p.id === id);
        if (pb) md += "- " + pb.title + "\n";
      });
      md += "\n";
    }
    const rooms = getJoinedRooms();
    if (rooms.length) {
      md += "## Community circles\n\n";
      rooms.forEach((id) => {
        const room = COMMUNITY_ROOMS.find((r) => r.id === id);
        if (room) md += "- " + room.name + " (" + room.format + ")\n";
      });
      md += "\n";
    }
    md += "---\n*ChromaHorizon pilot export — pair with [ChromaIndex](chroma-index-benchmark.html) employer benchmarks.*\n";
    return md;
  }

  function downloadPlan() {
    const slug = (getProfile().name || "chroma-horizon").replace(/[^\w]+/g, "-").toLowerCase();
    const blob = new Blob([exportTransitionPlan()], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug + "-transition-plan.md";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  window.ChromaHorizon = {
    KEYS,
    PATHS,
    INDUSTRIES,
    COMM_PREFS,
    MILESTONE_DEFS,
    SEED_MENTORS,
    PLAYBOOKS,
    ACCOMMODATION_TEMPLATES,
    COMMUNITY_ROOMS,
    STORIES,
    getProfile,
    saveProfile,
    profileComplete,
    getMentor,
    setMentor,
    clearMentor,
    mentorMatchScore,
    rankMentors,
    getPlaybookProgress,
    markPlaybookRead,
    markPlaybookDone,
    filterPlaybooks,
    getJoinedRooms,
    joinRoom,
    leaveRoom,
    isRoomJoined,
    getSavedStories,
    toggleSaveStory,
    isStorySaved,
    filterStories,
    getMilestones,
    markAdvocacyDrafted,
    milestoneProgress,
    exportTransitionPlan,
    downloadPlan,
  };
})();
