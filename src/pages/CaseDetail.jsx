import { useState } from 'react'
import {
  ArrowLeft, AlertTriangle, Info, ShieldAlert, CheckCircle2,
} from 'lucide-react'
import { getScenarioById } from '../data/scenario'

const bandBadgeClass = {
  LOW: 'badge-low',
  MODERATE: 'badge-moderate',
  HIGH: 'badge-high',
  CRITICAL: 'badge-critical',
}

// Splits transcript text so the evidence substring can be highlighted and clicked
function EvidenceText({ text, indicators, onSelect, activeCode }) {
  // Build a list of {start, end, indicator} matches within the text
  const matches = []
  indicators.forEach((ind) => {
    const idx = text.indexOf(ind.evidence)
    if (idx !== -1) {
      matches.push({ start: idx, end: idx + ind.evidence.length, indicator: ind })
    }
  })
  matches.sort((a, b) => a.start - b.start)

  if (matches.length === 0) return <span>{text}</span>

  const parts = []
  let cursor = 0
  matches.forEach((m, i) => {
    if (m.start > cursor) parts.push(<span key={`t-${i}`}>{text.slice(cursor, m.start)}</span>)
    const isActive = activeCode === m.indicator.code
    parts.push(
      <mark
        key={`e-${i}`}
        className={`evidence-span ${isActive ? 'evidence-active' : ''}`}
        onClick={() => onSelect(m.indicator)}
      >
        {text.slice(m.start, m.end)}
      </mark>
    )
    cursor = m.end
  })
  if (cursor < text.length) parts.push(<span key="t-end">{text.slice(cursor)}</span>)
  return <>{parts}</>
}

function CaseDetail({ scenarioId, onBack, onOpenReview }) {
  const scenario = getScenarioById(scenarioId)
  const [activeIndicator, setActiveIndicator] = useState(null)

  if (!scenario) {
    return (
      <div className="container" style={{ padding: 40 }}>
        <p>Case not found.</p>
        <button className="btn btn-secondary" onClick={onBack}>Back to queue</button>
      </div>
    )
  }

  const { caseId, title, language, channel, band, svi, hardTrigger, sla, transcript, indicators, sviBreakdown, recommendedAction } = scenario

  return (
    <div className="officer-page">
      <div className="case-topbar">
        <div className="container case-topbar-inner">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <ArrowLeft size={15} /> Back to queue
          </button>
          <div className="case-topbar-title">
            <span className="mono">{caseId}</span>
            <span className="muted text-sm">{title}</span>
          </div>
          <span className="badge badge-neutral">Awaiting human review</span>
        </div>
      </div>

      <div className="container case-header-row">
        <div className="case-header-stat">
          <span className="muted text-xs">Priority</span>
          <span className={`badge ${bandBadgeClass[band]}`} style={{ fontSize: 14, padding: '5px 12px' }}>{band}</span>
        </div>
        <div className="case-header-stat">
          <span className="muted text-xs">SVI</span>
          <span className="mono" style={{ fontSize: 20, fontWeight: 700 }}>{svi}</span>
        </div>
        <div className="case-header-stat">
          <span className="muted text-xs">{sla.label}</span>
          <span className={`mono ${sla.status === 'urgent' || sla.status === 'overdue' ? 'sla-urgent' : ''}`} style={{ fontSize: 16, fontWeight: 600 }}>
            {sla.remaining}
          </span>
        </div>
        {hardTrigger && (
          <div className="case-header-stat">
            <span className="hard-trigger-pill">
              <AlertTriangle size={14} /> HARD SAFETY TRIGGER
            </span>
          </div>
        )}
      </div>

      <div className="container case-columns">
        {/* LEFT — case info */}
        <div className="panel case-col">
          <div className="panel-header"><h4 style={{ fontSize: 14 }}>Case Information</h4></div>
          <div className="panel-body case-info-body">
            <div className="info-row"><span className="muted text-sm">Case ID</span><span className="mono">{caseId}</span></div>
            <div className="info-row"><span className="muted text-sm">Language</span><span>{language}</span></div>
            <div className="info-row"><span className="muted text-sm">Channel</span><span>{channel}</span></div>
            <div className="info-row"><span className="muted text-sm">Received</span><span>{scenario.receivedAt}</span></div>
            <div className="info-row"><span className="muted text-sm">Portal</span><span>NHAA (14566)</span></div>
            <hr className="intake-divider" style={{ margin: '14px 0' }} />
            <div className="notice" style={{ fontSize: 12.5 }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Synthetic demonstration data. Not connected to a live case system.</span>
            </div>
          </div>
        </div>

        {/* CENTER — transcript */}
        <div className="panel case-col case-col-transcript">
          <div className="panel-header"><h4 style={{ fontSize: 14 }}>Transcript</h4></div>
          <div className="panel-body">
            {transcript.map((line, i) => (
              <div className="transcript-line" key={i}>
                <span className="transcript-speaker">{line.speaker}</span>
                <p className={`transcript-text ${language === 'Hindi' ? 'lang-hi' : ''}`}>
                  <EvidenceText
                    text={line.text}
                    indicators={indicators}
                    onSelect={setActiveIndicator}
                    activeCode={activeIndicator?.code}
                  />
                </p>
              </div>
            ))}
            <p className="muted text-xs" style={{ marginTop: 14 }}>
              Highlighted text has been identified as evidence supporting an indicator. Click to view details.
            </p>
          </div>
        </div>

        {/* RIGHT — AI-assisted assessment */}
        <div className="panel case-col">
          <div className="panel-header"><h4 style={{ fontSize: 14 }}>AI-Assisted Assessment</h4></div>
          <div className="panel-body">
            {activeIndicator ? (
              <div className="indicator-detail">
                <div className="flex justify-between items-center">
                  <span className="badge badge-neutral">{activeIndicator.code}</span>
                  <button className="btn-ghost text-xs" onClick={() => setActiveIndicator(null)} style={{ border: 'none', background: 'none' }}>
                    Close
                  </button>
                </div>
                <h4 style={{ fontSize: 14, marginTop: 10 }}>{activeIndicator.label}</h4>
                <div className="indicator-field">
                  <span className="muted text-xs">Evidence</span>
                  <p className={`text-sm ${language === 'Hindi' ? 'lang-hi' : ''}`} style={{ fontStyle: 'italic' }}>
                    "{activeIndicator.evidence}"
                  </p>
                </div>
                <div className="indicator-field">
                  <span className="muted text-xs">Source</span>
                  <p className="text-sm">Citizen transcript</p>
                </div>
                <div className="indicator-field">
                  <span className="muted text-xs">Confidence</span>
                  <p className="text-sm">{activeIndicator.confidence}</p>
                </div>
              </div>
            ) : (
              <>
                <p className="muted text-sm" style={{ marginBottom: 14 }}>
                  Click any highlighted phrase in the transcript to view the supporting indicator.
                </p>
                <div className="indicator-list">
                  {indicators.map((ind) => (
                    <button key={ind.code} className="indicator-list-item" onClick={() => setActiveIndicator(ind)}>
                      <span className="badge badge-neutral">{ind.code}</span>
                      <span className="text-sm">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            <hr className="intake-divider" style={{ margin: '18px 0' }} />

            <div className="recommended-action">
              <span className="muted text-xs">Recommended Action</span>
              <p className="text-sm" style={{ marginTop: 6 }}>{recommendedAction}</p>
            </div>

            <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={onOpenReview}>
              <ShieldAlert size={16} /> Open Human Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetail