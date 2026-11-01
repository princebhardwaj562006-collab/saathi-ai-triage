// ============================================================
// SAATHI — Synthetic Demonstration Scenarios
// All data here is synthetic and built for SIH demonstration only.
// ============================================================

export const scenarios = [
  {
    id: "S1",
    caseId: "SA-1051",
    title: "Information-seeking enquiry",
    language: "English",
    channel: "Text",
    receivedAt: "Today, 10:12",
    band: "LOW",
    svi: 9,
    hardTrigger: false,
    sla: { label: "First contact", remaining: "23:40:00", status: "on-track" },
    transcript: [
      {
        speaker: "Citizen",
        text: "I wanted to ask when the next relief instalment under my case will be credited. I have not received any update since last month.",
      },
    ],
    indicators: [
      {
        code: "INF-01",
        label: "Information request",
        evidence: "when the next relief instalment under my case will be credited",
        confidence: "High",
      },
    ],
    sviBreakdown: {
      safety: { score: 1, max: 35 },
      vulnerability: { score: 2, max: 20 },
      protectionGap: { score: 4, max: 20 },
      distress: { score: 2, max: 15 },
      protective: { score: 0, max: 10 },
    },
    recommendedAction:
      "Route to relief-payment status desk. No elevated handling required.",
    officerNote:
      "Demonstrates system restraint — an ordinary status enquiry is not over-classified.",
    override: null,
    auditTrail: [
      { time: "10:12", actor: "System", action: "Grievance received" },
      { time: "10:12", actor: "System", action: "Transcript prepared" },
      { time: "10:13", actor: "System", action: "Indicators extracted" },
      { time: "10:13", actor: "System", action: "Evidence validated" },
      { time: "10:13", actor: "System", action: "SVI calculated — 9 (LOW)" },
      { time: "10:14", actor: "System", action: "Assessment prepared, routed to standard queue" },
    ],
  },

  {
    id: "S2",
    caseId: "SA-1038",
    title: "Chargesheet overdue / relief unpaid",
    language: "Hindi",
    channel: "Voice (simulated)",
    receivedAt: "Today, 13:51",
    band: "MODERATE",
    svi: 33,
    hardTrigger: false,
    sla: { label: "Chargesheet", remaining: "Day 61 / 60", status: "overdue" },
    transcript: [
      {
        speaker: "Citizen",
        text: "मेरा केस दर्ज हुए दो महीने हो गए हैं। चार्जशीट अभी तक दाखिल नहीं हुई है और मुझे जो राहत राशि मिलनी थी, वह भी नहीं आई। मैं बार-बार थाने जाती हूं पर कोई जवाब नहीं मिलता।",
      },
    ],
    indicators: [
      {
        code: "PG-02",
        label: "Statutory delay — chargesheet",
        evidence: "चार्जशीट अभी तक दाखिल नहीं हुई है",
        confidence: "High",
      },
      {
        code: "PG-01",
        label: "Relief payment pending",
        evidence: "जो राहत राशि मिलनी थी, वह भी नहीं आई",
        confidence: "High",
      },
      {
        code: "DIS-02",
        label: "Repeated unanswered follow-up",
        evidence: "मैं बार-बार थाने जाती हूं पर कोई जवाब नहीं मिलता",
        confidence: "Medium",
      },
    ],
    sviBreakdown: {
      safety: { score: 4, max: 35 },
      vulnerability: { score: 6, max: 20 },
      protectionGap: { score: 15, max: 20 },
      distress: { score: 8, max: 15 },
      protective: { score: 0, max: 10 },
    },
    recommendedAction:
      "Escalate to case officer for chargesheet-delay review and relief-payment reconciliation. Contact within statutory follow-up window.",
    officerNote:
      "Demonstrates statutory grounding — the score is driven by an overdue chargesheet and unpaid relief, not by tone of voice.",
    override: null,
    auditTrail: [
      { time: "13:51", actor: "System", action: "Grievance received (voice)" },
      { time: "13:52", actor: "System", action: "Transcript prepared" },
      { time: "13:52", actor: "System", action: "Indicators extracted" },
      { time: "13:53", actor: "System", action: "Evidence validated" },
      { time: "13:53", actor: "System", action: "SVI calculated — 33 (MODERATE)" },
      { time: "13:54", actor: "System", action: "Assessment prepared, routed to triage queue" },
    ],
  },

  {
    id: "S3",
    caseId: "SA-1042",
    title: "Ongoing threat / FIR refused",
    language: "Hindi",
    channel: "Voice (simulated)",
    receivedAt: "Today, 14:32",
    band: "CRITICAL",
    svi: 77,
    hardTrigger: true,
    sla: { label: "Human review", remaining: "01:42:18", status: "urgent" },
    transcript: [
      {
        speaker: "Citizen",
        text: "धमकी अभी भी मिल रही है। कल रात भी कोई घर के बाहर आया था। मैं थाने गई थी, लेकिन उन्होंने एफआईआर दर्ज करने से मना कर दिया।",
      },
    ],
    indicators: [
      {
        code: "SAF-01",
        label: "Ongoing / imminent threat",
        evidence: "धमकी अभी भी मिल रही है",
        confidence: "High",
      },
      {
        code: "SAF-02",
        label: "Recent proximity incident",
        evidence: "कल रात भी कोई घर के बाहर आया था",
        confidence: "High",
      },
      {
        code: "PG-03",
        label: "FIR registration refused",
        evidence: "उन्होंने एफआईआर दर्ज करने से मना कर दिया",
        confidence: "High",
      },
    ],
    sviBreakdown: {
      safety: { score: 30, max: 35 },
      vulnerability: { score: 12, max: 20 },
      protectionGap: { score: 10, max: 20 },
      distress: { score: 8, max: 15 },
      protective: { score: -3, max: 10 },
    },
    recommendedAction:
      "Immediate human review required. Hard safety trigger present (ongoing threat + refused FIR). Escalate to protection-desk officer without delay.",
    officerNote:
      "Demonstrates the deterministic safety override — an ongoing threat combined with a refused FIR forces CRITICAL regardless of the computed score.",
    override: null,
    auditTrail: [
      { time: "14:32", actor: "System", action: "Grievance received (voice)" },
      { time: "14:33", actor: "System", action: "Transcript prepared" },
      { time: "14:33", actor: "System", action: "Indicators extracted" },
      { time: "14:34", actor: "System", action: "Evidence validated" },
      { time: "14:34", actor: "System", action: "SVI calculated — 57" },
      { time: "14:34", actor: "System", action: "Hard safety trigger detected" },
      { time: "14:35", actor: "System", action: "CRITICAL assessment prepared" },
      { time: "14:36", actor: "System", action: "Officer review opened" },
    ],
  },

  {
    id: "S4",
    caseId: "SA-1049",
    title: "Human override — limited information",
    language: "Hindi",
    channel: "Voice (simulated)",
    receivedAt: "Today, 14:20",
    band: "MODERATE",
    svi: 28,
    hardTrigger: false,
    sla: { label: "Human review", remaining: "02:10:44", status: "urgent" },
    transcript: [
      {
        speaker: "Citizen",
        text: "हां... सब ठीक है। बस पूछना था कि केस का क्या हुआ। ज्यादा बात नहीं कर सकती अभी, कोई पास में है।",
      },
    ],
    indicators: [
      {
        code: "DIS-01",
        label: "Case-status enquiry",
        evidence: "पूछना था कि केस का क्या हुआ",
        confidence: "Medium",
      },
      {
        code: "OBS-01",
        label: "Statement suggesting restricted ability to speak",
        evidence: "ज्यादा बात नहीं कर सकती अभी, कोई पास में है",
        confidence: "Medium",
      },
    ],
    sviBreakdown: {
      safety: { score: 8, max: 35 },
      vulnerability: { score: 6, max: 20 },
      protectionGap: { score: 6, max: 20 },
      distress: { score: 8, max: 15 },
      protective: { score: 0, max: 10 },
    },
    recommendedAction:
      "Standard follow-up contact. Limited information available from this call.",
    officerNote:
      "This is the most important demo scenario. The AI-assisted assessment is MODERATE / SVI 28, based on limited information. A trained officer, on review, notices the caller may not be able to speak freely and raises the case to CRITICAL. The SVI itself does not change — only the human-owned routing decision does.",
    override: {
      raisedTo: "CRITICAL",
      reason:
        "Caller appears unable to communicate freely; additional human review is required.",
      officer: "Officer R. Sharma (Demo)",
      time: "14:41",
    },
    auditTrail: [
      { time: "14:20", actor: "System", action: "Grievance received (voice)" },
      { time: "14:21", actor: "System", action: "Transcript prepared" },
      { time: "14:21", actor: "System", action: "Indicators extracted" },
      { time: "14:22", actor: "System", action: "Evidence validated" },
      { time: "14:22", actor: "System", action: "SVI calculated — 28 (MODERATE)" },
      { time: "14:23", actor: "System", action: "Assessment prepared, routed to triage queue" },
      { time: "14:38", actor: "Officer R. Sharma", action: "Case opened for review" },
      {
        time: "14:41",
        actor: "Officer R. Sharma",
        action: "Priority raised from MODERATE to CRITICAL",
        reason: "Caller may not be able to speak freely.",
      },
    ],
  },
];

export const getScenarioById = (id) => scenarios.find((s) => s.id === id);

// ------------------------------------------------------------
// Dashboard summary numbers (synthetic, for officer console)
// ------------------------------------------------------------
export const dashboardMetrics = {
  criticalOpen: 2,
  highOpen: 5,
  awaitingFirstContact: 11,
  slaBreachesToday: 1,
  overriddenToday: 1,
};

// ------------------------------------------------------------
// Triage queue rows (mix of the 4 scenarios + filler rows)
// ------------------------------------------------------------
export const triageQueue = [
  {
    caseId: "SA-1042",
    scenarioId: "S3",
    receivedAt: "Today 14:32",
    language: "Hindi",
    channel: "Voice",
    priority: "CRITICAL",
    svi: 77,
    sla: "01:42:18",
    status: "Review",
  },
  {
    caseId: "SA-1049",
    scenarioId: "S4",
    receivedAt: "Today 14:20",
    language: "Hindi",
    channel: "Voice",
    priority: "CRITICAL",
    svi: 28,
    sla: "02:10:44",
    status: "Overridden",
  },
  {
    caseId: "SA-1038",
    scenarioId: "S2",
    receivedAt: "Today 13:51",
    language: "Hindi",
    channel: "Text",
    priority: "MODERATE",
    svi: 33,
    sla: "03:21:10",
    status: "Awaiting contact",
  },
  {
    caseId: "SA-1051",
    scenarioId: "S1",
    receivedAt: "Today 10:12",
    language: "English",
    channel: "Text",
    priority: "LOW",
    svi: 9,
    sla: "23:40:00",
    status: "Awaiting contact",
  },
  {
    caseId: "SA-1027",
    scenarioId: null,
    receivedAt: "Yesterday 18:04",
    language: "English",
    channel: "Text",
    priority: "HIGH",
    svi: 62,
    sla: "00:12:40",
    status: "Awaiting contact",
  },
];