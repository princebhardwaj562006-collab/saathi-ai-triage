import { ArrowLeft, Clock, User, FileEdit } from 'lucide-react'
import { getScenarioById } from '../data/scenario'

function AuditTimeline({ scenarioId, decision, onBack }) {
  const scenario = getScenarioById(scenarioId)
  if (!scenario) return null

  const { caseId, title, auditTrail } = scenario

  // If a human decision was made during this session, append it live to the trail
  const fullTrail = [...auditTrail]
  if (decision && !auditTrail.some((e) => e.time === decision.time && e.actor === decision.officer)) {
    let actionLabel = 'Officer accepted AI assessment'
    if (decision.type === 'RAISE') actionLabel = `Priority raised to ${decision.raisedTo}`
    if (decision.type === 'LOWER') actionLabel = 'Priority lowered'
    if (decision.type === 'INCORRECT') actionLabel = 'AI assessment marked incorrect'

    fullTrail.push({
      time: decision.time,
      actor: decision.officer,
      action: actionLabel,
      reason: decision.reason || undefined,
    })
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
            <span className="muted text-sm">{title} — Audit Timeline</span>
          </div>
        </div>
      </div>

      <div className="container audit-container">
        <div className="panel">
          <div className="panel-header">
            <h4 style={{ fontSize: 14 }}>Audit Timeline</h4>
            <span className="muted text-sm">{fullTrail.length} events</span>
          </div>
          <div className="panel-body">
            <div className="timeline">
              {fullTrail.map((event, i) => (
                <div className="timeline-event" key={i}>
                  <div className="timeline-marker">
                    <span className={`timeline-dot ${event.actor !== 'System' ? 'timeline-dot-human' : ''}`} />
                    {i < fullTrail.length - 1 && <span className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="mono text-sm timeline-time"><Clock size={12} /> {event.time}</span>
                      <span className="timeline-actor">
                        <User size={12} /> {event.actor}
                      </span>
                    </div>
                    <p className="text-sm timeline-action">{event.action}</p>
                    {event.reason && (
                      <div className="timeline-reason">
                        <FileEdit size={12} />
                        <span>{event.reason}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="notice" style={{ marginTop: 16 }}>
          Every decision that changes a case's routing or priority is permanently recorded here,
          with a timestamp, the responsible actor, and — where applicable — a reason. This record
          cannot be edited or removed.
        </div>
      </div>
    </div>
  )
}

export default AuditTimeline