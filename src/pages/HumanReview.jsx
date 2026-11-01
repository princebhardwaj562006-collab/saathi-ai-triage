import { useState } from 'react'
import { ArrowLeft, ShieldAlert, CheckCircle2, ArrowUpCircle, ArrowDownCircle, XCircle } from 'lucide-react'
import { getScenarioById } from '../data/scenario'

const bandBadgeClass = {
  LOW: 'badge-low',
  MODERATE: 'badge-moderate',
  HIGH: 'badge-high',
  CRITICAL: 'badge-critical',
}

const decisionOptions = [
  { key: 'ACCEPT', label: 'Accept', icon: CheckCircle2, needsReason: false },
  { key: 'RAISE', label: 'Raise Priority', icon: ArrowUpCircle, needsReason: true },
  { key: 'LOWER', label: 'Lower Priority', icon: ArrowDownCircle, needsReason: true },
  { key: 'INCORRECT', label: 'Mark AI as Incorrect', icon: XCircle, needsReason: true },
]

function HumanReview({ scenarioId, decision, onConfirmDecision, onBack, onViewAudit }) {
  const scenario = getScenarioById(scenarioId)
  const [selected, setSelected] = useState(null)
  const [reason, setReason] = useState('')
  const [raiseTo, setRaiseTo] = useState('CRITICAL')

  if (!scenario) return null

  const { caseId, band, svi, title, language } = scenario
  const alreadyDecided = !!decision

  const option = decisionOptions.find((o) => o.key === selected)
  const canConfirm = selected === 'ACCEPT' || (option?.needsReason && reason.trim().length > 0)

  const handleConfirm = () => {
    if (!canConfirm) return
    const record = {
      type: selected,
      reason: selected === 'ACCEPT' ? null : reason.trim(),
      raisedTo: selected === 'RAISE' ? raiseTo : null,
      officer: 'Officer R. Sharma (Demo)',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
    onConfirmDecision(scenarioId, record)
  }

  return (
    <div className="officer-page">
      <div className="case-topbar">
        <div className="container case-topbar-inner">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <ArrowLeft size={15} /> Back to case
          </button>
          <div className="case-topbar-title">
            <span className="mono">{caseId}</span>
            <span className="muted text-sm">{title}</span>
          </div>
        </div>
      </div>

      <div className="container review-container">
        {/* AI assessment recap */}
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><h4 style={{ fontSize: 14 }}>AI-Assisted Assessment</h4></div>
          <div className="panel-body flex items-center gap-16">
            <div className="flex-col">
              <span className="muted text-xs">Band</span>
              <span className={`badge ${bandBadgeClass[band]}`} style={{ marginTop: 4 }}>{band}</span>
            </div>
            <div className="flex-col">
              <span className="muted text-xs">SVI</span>
              <span className="mono" style={{ fontSize: 18, fontWeight: 700 }}>{svi}</span>
            </div>
            <div className="notice" style={{ flex: 1 }}>
              This assessment is advisory. It was produced by a deterministic scoring
              engine using AI-extracted, evidence-validated indicators. A trained officer
              must confirm the appropriate action.
            </div>
          </div>
        </div>

        {!alreadyDecided ? (
          <div className="panel review-gate">
            <div className="panel-header">
              <h3 style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldAlert size={18} /> HUMAN REVIEW REQUIRED
              </h3>
            </div>
            <div className="panel-body">
              <p className="text-sm muted" style={{ marginBottom: 20 }}>
                The AI-assisted assessment is advisory. A trained officer must confirm the
                appropriate action before this case proceeds.
              </p>

              <div className="decision-grid">
                {decisionOptions.map((opt) => {
                  const Icon = opt.icon
                  return (
                    <button
                      key={opt.key}
                      className={`decision-option ${selected === opt.key ? 'selected' : ''}`}
                      onClick={() => setSelected(opt.key)}
                    >
                      <Icon size={18} />
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>

              {selected === 'RAISE' && (
                <div className="field" style={{ marginTop: 18 }}>
                  <label>Raise priority to</label>
                  <select className="input" value={raiseTo} onChange={(e) => setRaiseTo(e.target.value)}>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              )}

              {option?.needsReason && (
                <div className="field" style={{ marginTop: 18 }}>
                  <label>Reason for change</label>
                  <textarea
                    className="textarea"
                    style={{ minHeight: 90 }}
                    placeholder="Explain the reason for this decision..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <span className="hint">Required — this will be recorded in the audit trail.</span>
                </div>
              )}

              <button
                className="btn btn-primary btn-block"
                style={{ marginTop: 20 }}
                disabled={!selected || !canConfirm}
                onClick={handleConfirm}
              >
                Confirm decision
              </button>
            </div>
          </div>
        ) : (
          <div className="panel final-decision-panel">
            <div className="panel-header">
              <h3 style={{ fontSize: 16 }}>FINAL HUMAN DECISION</h3>
            </div>
            <div className="panel-body">
              <div className="final-decision-row">
                <div className="final-decision-col">
                  <span className="muted text-xs">AI</span>
                  <span className={`badge ${bandBadgeClass[band]}`}>{band} · SVI {svi}</span>
                </div>
                <span className="final-decision-arrow">→</span>
                <div className="final-decision-col">
                  <span className="muted text-xs">Human (H)</span>
                  <span className={`badge ${bandBadgeClass[decision.raisedTo || band]}`}>
                    {decision.type === 'RAISE'
                      ? decision.raisedTo
                      : decision.type === 'LOWER'
                      ? 'LOWERED'
                      : decision.type === 'INCORRECT'
                      ? 'MARKED INCORRECT'
                      : band}
                  </span>
                </div>
              </div>

              {decision.reason && (
                <div className="notice" style={{ marginTop: 16 }}>
                  <strong style={{ marginRight: 6 }}>Reason:</strong> {decision.reason}
                </div>
              )}

              <p className="muted text-xs" style={{ marginTop: 16 }}>
                Recorded at {decision.time} by {decision.officer}. AI assessment remains unchanged
                and visible for audit — only the human-owned routing decision was updated.
              </p>

              <button className="btn btn-secondary" style={{ marginTop: 18 }} onClick={onViewAudit}>
                View audit timeline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HumanReview
