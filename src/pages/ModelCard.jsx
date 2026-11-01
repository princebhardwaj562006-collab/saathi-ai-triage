import { ArrowLeft } from 'lucide-react'

const sections = [
  {
    title: 'Purpose',
    body: 'SAATHI assists trained grievance officers by extracting observable indicators and evidence from a citizen\'s own account, so that safety and support needs can be reviewed faster and more consistently.',
  },
  {
    title: 'What the system does',
    list: [
      'Transcribes voice input where applicable',
      'Extracts observable indicators from what the person said, with evidence quotes',
      'Validates that evidence quotes exist verbatim in the transcript',
      'Calculates a Severity/Vulnerability Indicator (SVI) using a deterministic, policy-owned engine',
      'Checks for hard safety triggers',
      'Recommends a priority band and next action for officer review',
    ],
  },
  {
    title: 'What the system does NOT do',
    list: [
      'Does not diagnose trauma or any mental-health condition',
      'Does not detect emotions or lies',
      'Does not predict future violence',
      'Does not determine whether a complaint is truthful',
      'Does not make a final decision on any case',
    ],
  },
  { title: 'Inputs', body: 'Citizen-submitted text or voice transcript, in English or Hindi, provided with informed consent.' },
  { title: 'Outputs', body: 'Extracted indicators with evidence, a deterministic SVI score (0–100), a priority band, and a recommended action — visible to authorized officers only.' },
  {
    title: 'Safety constraints',
    list: [
      'The extraction model never calculates the SVI score or decides the risk band',
      'Evidence quotes not found verbatim in the transcript are rejected',
      'Hard safety triggers force a CRITICAL band regardless of the computed score',
      'Protective factors never cancel a hard safety trigger',
      'Citizens never see the SVI score, band, or internal indicators',
    ],
  },
  {
    title: 'Known limitations',
    list: [
      'Performance may vary across dialects, speech patterns, and connection quality',
      'Indicator extraction is based on stated/observed language, not verified fact',
      'This is a demonstration prototype using synthetic data only',
    ],
  },
  {
    title: 'Human oversight',
    body: 'Every case requires mandatory human review before any action is taken. Officers can accept, raise, or lower the recommended priority, or mark the AI assessment as incorrect — each with a recorded reason where applicable.',
  },
  {
    title: 'Bias / failure modes',
    body: 'Override rates are monitored by language, district, and channel to surface potential disparities. Elevated override rates in voice-channel or specific-language cases may indicate transcription or extraction quality issues requiring review.',
  },
  { title: 'Deployment preconditions', body: 'Requires trained officer onboarding, a functioning human-review workflow, an audit-logging system, and statutory-timeline integration before any production use.' },
  { title: 'Evaluation status', body: 'No accuracy claim is made by this prototype. This is a Smart India Hackathon 2026 demonstration build using four synthetic scenarios.' },
]

function ModelCard({ onBack }) {
  return (
    <div className="officer-page">
      <div className="case-topbar">
        <div className="container case-topbar-inner">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <ArrowLeft size={15} /> Back
          </button>
          <div className="case-topbar-title">
            <span style={{ fontWeight: 700 }}>Model Card</span>
            <span className="muted text-sm">SAATHI — AI-assisted grievance triage</span>
          </div>
        </div>
      </div>

      <div className="container model-card-container">
        {sections.map((s) => (
          <div className="panel model-card-section" key={s.title}>
            <div className="panel-header"><h4 style={{ fontSize: 14 }}>{s.title}</h4></div>
            <div className="panel-body">
              {s.body && <p className="text-sm">{s.body}</p>}
              {s.list && (
                <ul className="model-card-list">
                  {s.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModelCard