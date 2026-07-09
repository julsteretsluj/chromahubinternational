/* ChromaIndex — client-side neuro-inclusion benchmark (localStorage + seed rankings) */
(function () {
  const KEYS = {
    profile: "chroma-index-profile",
    assessment: "chroma-index-assessment",
    verification: "chroma-index-verification",
    submitted: "chroma-index-submitted",
  };

  const STAGES = {
    recruitment: { label: "Recruitment", order: 1 },
    onboarding: { label: "Onboarding", order: 2 },
    accommodation: { label: "Accommodation", order: 3 },
    retention: { label: "Retention", order: 4 },
    advancement: { label: "Advancement", order: 5 },
  };

  const SECTORS = {
    tech: "Technology",
    education: "Education",
    healthcare: "Healthcare",
    government: "Government",
  };

  const SECTOR_BENCHMARKS = {
    tech: 68,
    education: 61,
    healthcare: 58,
    government: 54,
  };

  const SEED_RANKINGS = [
    { id: "org-1", name: "Lumen Grid Systems", sector: "tech", score: 86, verified: true, year: 2026, stages: { recruitment: 88, onboarding: 84, accommodation: 90, retention: 82, advancement: 85 } },
    { id: "org-2", name: "Northbridge Learning Co-op", sector: "education", score: 82, verified: true, year: 2026, stages: { recruitment: 80, onboarding: 85, accommodation: 84, retention: 78, advancement: 81 } },
    { id: "org-3", name: "Harbor Health Collective", sector: "healthcare", score: 74, verified: true, year: 2026, stages: { recruitment: 72, onboarding: 76, accommodation: 78, retention: 70, advancement: 73 } },
    { id: "org-4", name: "Civic Access Bureau", sector: "government", score: 71, verified: false, year: 2026, stages: { recruitment: 68, onboarding: 70, accommodation: 75, retention: 69, advancement: 72 } },
    { id: "org-5", name: "Parallel Stack Inc.", sector: "tech", score: 69, verified: false, year: 2026, stages: { recruitment: 74, onboarding: 65, accommodation: 70, retention: 68, advancement: 67 } },
    { id: "org-6", name: "Ridgeview Public Schools", sector: "education", score: 63, verified: false, year: 2026, stages: { recruitment: 60, onboarding: 66, accommodation: 64, retention: 62, advancement: 61 } },
    { id: "org-7", name: "Summit Care Partners", sector: "healthcare", score: 59, verified: false, year: 2026, stages: { recruitment: 55, onboarding: 58, accommodation: 62, retention: 57, advancement: 56 } },
    { id: "org-8", name: "Metro Transit Authority", sector: "government", score: 56, verified: false, year: 2026, stages: { recruitment: 52, onboarding: 54, accommodation: 58, retention: 55, advancement: 53 } },
  ];

  const QUESTIONS = {
    recruitment: [
      {
        id: "rec-1",
        text: "Job postings and application flows are accessible (plain language, screen-reader friendly, no timed-only steps).",
        options: ["Not in place", "Planned", "Partially implemented", "Fully implemented"],
      },
      {
        id: "rec-2",
        text: "Interview formats offer alternatives (written, async video, structured questions shared in advance).",
        options: ["Never offered", "By request only", "Usually offered", "Default options for all"],
      },
      {
        id: "rec-3",
        text: "Hiring rubrics evaluate task skills — not eye contact, speech pace, or neurotypical social cues.",
        options: ["No rubric", "Informal guidance", "Documented rubric", "Trained interviewers + audits"],
      },
    ],
    onboarding: [
      {
        id: "onb-1",
        text: "New hires receive schedules, org charts, and expectations in predictable formats before day one.",
        options: ["No", "Sometimes", "Usually", "Always"],
      },
      {
        id: "onb-2",
        text: "Managers complete neuro-inclusion onboarding training within 90 days.",
        options: ["No training", "Optional module", "Required for managers", "Required + refreshers"],
      },
      {
        id: "onb-3",
        text: "Accommodation request pathways are explained during onboarding — not buried in HR portals.",
        options: ["Not mentioned", "Link only", "Walkthrough offered", "Proactive check-in scheduled"],
      },
    ],
    accommodation: [
      {
        id: "acc-1",
        text: "Accommodation requests receive a documented response within a defined SLA.",
        options: ["No SLA", "Informal timing", "14-day SLA", "7-day SLA with escalation"],
      },
      {
        id: "acc-2",
        text: "Workspace adjustments (lighting, noise, remote days) are treated as design — not special favors.",
        options: ["Case-by-case friction", "HR discretion", "Standard menu of options", "Default flexible design"],
      },
      {
        id: "acc-3",
        text: "Employees can request accommodations without disclosing diagnosis details.",
        options: ["Diagnosis required", "Strongly encouraged", "Functional needs only", "Policy states functional framing"],
      },
    ],
    retention: [
      {
        id: "ret-1",
        text: "Performance reviews separate outcomes from sensory/masking burden where relevant.",
        options: ["Never considered", "Ad hoc", "Manager guidance exists", "Review template includes it"],
      },
      {
        id: "ret-2",
        text: "Meeting culture includes agendas, notes, and alternatives to live-only participation.",
        options: ["Rarely", "Sometimes", "Team norm", "Org-wide standard"],
      },
      {
        id: "ret-3",
        text: "Burnout and attrition data is reviewed by neurotype-disaggregated signals where lawful.",
        options: ["Not tracked", "Aggregate only", "ERG input considered", "Disaggregated analysis"],
      },
    ],
    advancement: [
      {
        id: "adv-1",
        text: "Promotion criteria are published and tied to deliverables — not visibility in social settings.",
        options: ["Unwritten", "Manager discretion", "Published criteria", "Audited promotion panels"],
      },
      {
        id: "adv-2",
        text: "Leadership pipelines include neurodivergent employees with mentorship support.",
        options: ["No pipeline", "Informal sponsors", "ERG mentorship", "Formal sponsored program"],
      },
      {
        id: "adv-3",
        text: "Advancement interviews offer the same format options as hiring interviews.",
        options: ["No", "Sometimes", "Usually", "Always"],
      },
    ],
  };

  const ROADMAP = {
    recruitment: [
      "Publish interview format options on every job posting.",
      "Remove timed cognitive tests unless job-related and offer alternatives.",
      "Train interviewers on skills-based rubrics — audit for bias quarterly.",
    ],
    onboarding: [
      "Send a visual week-one schedule 72 hours before start date.",
      "Require manager neuro-inclusion training within first 90 days.",
      "Schedule a day-5 accommodation check-in — not waiting for crisis.",
    ],
    accommodation: [
      "Publish accommodation SLA and escalation path on intranet home page.",
      "Create a standard menu: lighting, noise, remote, flexible hours, communication prefs.",
      "Rewrite policy to functional-needs framing — remove diagnosis gatekeeping.",
    ],
    retention: [
      "Add meeting norms: agenda required, notes shared, async participation OK.",
      "Update performance templates to ask about environmental barriers.",
      "Review exit interviews for accommodation-related themes.",
    ],
    advancement: [
      "Publish promotion criteria and rubrics accessible to all employees.",
      "Launch sponsorship program pairing neurodivergent staff with leaders.",
      "Offer advancement interview format choices identical to hiring.",
    ],
  };

  const VERIFY_ITEMS = [
    { id: "v1", label: "Uploaded written accommodation policy (functional needs framing)" },
    { id: "v2", label: "Sample anonymized accommodation response timeline" },
    { id: "v3", label: "Manager training completion report (last 12 months)" },
    { id: "v4", label: "Interview rubric document with bias review date" },
    { id: "v5", label: "Onboarding checklist shown to last cohort of hires" },
    { id: "v6", label: "ERG or neuro-inclusion council meeting minutes (redacted)" },
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
    return readJson(KEYS.profile, { org: "", sector: "tech", contact: "" });
  }

  function saveProfile(profile) {
    writeJson(KEYS.profile, profile);
  }

  function getAnswers() {
    return readJson(KEYS.assessment, {});
  }

  function saveAnswer(questionId, value) {
    const answers = getAnswers();
    answers[questionId] = Number(value);
    writeJson(KEYS.assessment, answers);
    return answers;
  }

  function clearAssessment() {
    localStorage.removeItem(KEYS.assessment);
    localStorage.removeItem(KEYS.submitted);
  }

  function stageScore(stage) {
    const qs = QUESTIONS[stage] || [];
    const answers = getAnswers();
    if (!qs.length) return 0;
    let sum = 0;
    let count = 0;
    qs.forEach((q) => {
      if (answers[q.id] !== undefined) {
        sum += answers[q.id];
        count++;
      }
    });
    if (!count) return 0;
    return Math.round((sum / (count * 3)) * 100);
  }

  function allStagesComplete() {
    return Object.keys(STAGES).every((stage) => {
      const qs = QUESTIONS[stage];
      const answers = getAnswers();
      return qs.every((q) => answers[q.id] !== undefined);
    });
  }

  function overallScore() {
    const stages = Object.keys(STAGES);
    const scores = stages.map((s) => stageScore(s)).filter((n) => n > 0 || getAnswers()[QUESTIONS[s][0]?.id] !== undefined);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / stages.length);
  }

  function getStageScores() {
    const out = {};
    Object.keys(STAGES).forEach((s) => {
      out[s] = stageScore(s);
    });
    return out;
  }

  function getRoadmap() {
    const scores = getStageScores();
    const items = [];
    Object.keys(STAGES)
      .sort((a, b) => scores[a] - scores[b])
      .forEach((stage) => {
        if (scores[stage] < 75) {
          const priority = scores[stage] < 50 ? "High" : "Medium";
          ROADMAP[stage].forEach((action, i) => {
            if (scores[stage] < 50 || i === 0) {
              items.push({ stage, priority, action, score: scores[stage] });
            }
          });
        }
      });
    return items.slice(0, 12);
  }

  function getVerification() {
    return readJson(KEYS.verification, {});
  }

  function toggleVerification(id, checked) {
    const v = getVerification();
    v[id] = checked;
    writeJson(KEYS.verification, v);
    return v;
  }

  function verificationProgress() {
    const v = getVerification();
    const done = VERIFY_ITEMS.filter((item) => v[item.id]).length;
    return { done, total: VERIFY_ITEMS.length, percent: Math.round((done / VERIFY_ITEMS.length) * 100) };
  }

  function isVerifiedEligible() {
    const vp = verificationProgress();
    return allStagesComplete() && vp.done >= VERIFY_ITEMS.length - 1;
  }

  function markSubmitted() {
    const data = {
      at: new Date().toISOString(),
      overall: overallScore(),
      stages: getStageScores(),
      sector: getProfile().sector,
      org: getProfile().org,
    };
    writeJson(KEYS.submitted, data);
    return data;
  }

  function getSubmitted() {
    return readJson(KEYS.submitted, null);
  }

  function filterRankings(sector) {
    let list = SEED_RANKINGS.slice().sort((a, b) => b.score - a.score);
    if (sector) list = list.filter((o) => o.sector === sector);
    return list;
  }

  function exportEsgMarkdown() {
    const profile = getProfile();
    const scores = getStageScores();
    const overall = overallScore();
    const bench = SECTOR_BENCHMARKS[profile.sector] || 60;
    const submitted = getSubmitted();
    let md = "# ChromaIndex ESG / DEI Summary\n\n";
    md += "**Organization:** " + (profile.org || "—") + "  \n";
    md += "**Sector:** " + (SECTORS[profile.sector] || profile.sector) + "  \n";
    md += "**Overall neuro-inclusion score:** " + overall + "/100  \n";
    md += "**Sector benchmark:** " + bench + "/100  \n";
    md += "**Assessment date:** " + (submitted ? formatDate(submitted.at) : formatDate(new Date().toISOString())) + "  \n";
    md += "**Verification status:** " + (isVerifiedEligible() ? "Eligible for verified badge" : "Self-assessment") + "\n\n";
    md += "## Lifecycle scores\n\n";
    Object.keys(STAGES).forEach((s) => {
      md += "- **" + STAGES[s].label + ":** " + scores[s] + "/100\n";
    });
    md += "\n## Priority roadmap\n\n";
    getRoadmap().forEach((item) => {
      md += "- [" + item.priority + "] " + STAGES[item.stage].label + ": " + item.action + "\n";
    });
    md += "\n---\n*Generated by ChromaIndex pilot — align with internal DEI/ESG reporting workflows.*\n";
    return md;
  }

  function exportEsgJson() {
    return {
      framework: "ChromaIndex Neuro-Inclusion Benchmark",
      version: "2026-pilot",
      organization: getProfile().org,
      sector: getProfile().sector,
      overallScore: overallScore(),
      sectorBenchmark: SECTOR_BENCHMARKS[getProfile().sector],
      stageScores: getStageScores(),
      roadmap: getRoadmap(),
      verification: verificationProgress(),
      submittedAt: getSubmitted()?.at || new Date().toISOString(),
    };
  }

  function downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportEsgMdFile() {
    const slug = (getProfile().org || "chroma-index").replace(/[^\w]+/g, "-").toLowerCase();
    downloadFile(exportEsgMarkdown(), slug + "-esg-summary.md", "text/markdown");
  }

  function exportEsgJsonFile() {
    const slug = (getProfile().org || "chroma-index").replace(/[^\w]+/g, "-").toLowerCase();
    downloadFile(JSON.stringify(exportEsgJson(), null, 2), slug + "-esg-summary.json", "application/json");
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "";
    }
  }

  function scoreBand(score) {
    if (score >= 80) return { label: "Leader", class: "leader" };
    if (score >= 65) return { label: "Progressing", class: "progress" };
    if (score >= 50) return { label: "Developing", class: "develop" };
    return { label: "At risk", class: "risk" };
  }

  window.ChromaIndex = {
    KEYS,
    STAGES,
    SECTORS,
    SECTOR_BENCHMARKS,
    SEED_RANKINGS,
    QUESTIONS,
    VERIFY_ITEMS,
    getProfile,
    saveProfile,
    getAnswers,
    saveAnswer,
    clearAssessment,
    stageScore,
    allStagesComplete,
    overallScore,
    getStageScores,
    getRoadmap,
    getVerification,
    toggleVerification,
    verificationProgress,
    isVerifiedEligible,
    markSubmitted,
    getSubmitted,
    filterRankings,
    exportEsgMarkdown,
    exportEsgJson,
    exportEsgMdFile,
    exportEsgJsonFile,
    formatDate,
    scoreBand,
  };
})();
