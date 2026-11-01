import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import { scenarios } from '../data/scenario'

// Synthetic statutory tracking rows — derived loosely from the scenarios plus filler
const statutoryRows = [
  { caseId: 'SA-1038', item: 'Chargesheet', detail: 'Day 61 / 60', status: 'OVERDUE' },
  { caseId: 'SA-1038', item: 'Relief', detail: 'Payment pending', status: 'DUE' },
  { caseId: 'SA-1042', item: 'FIR Registration', detail: 'Refused — escalation required', status: 'OVERDUE' },
  { caseId: 'SA-1049', item: 'First Contact', detail: 'Day 1 / 3', status: 'ON-TRACK' },
  { caseId: 'SA-1051', item: 'Relief Enquiry Response', detail: 'Day 2 / 5', status: 'ON-TRACK' },
  { caseId: 'SA-1027', item: 'Chargesheet', detail: 'Day 45 / 60', status: 'ON-TRACK' },
]

const statusStyle = {
  OVERDUE: { cls: 'badge-critical', icon: AlertTriangle },
  DUE: { cls: 'badge-moderate', icon: Clock },
  'ON-TRACK': { cls: 'badge-low', icon: CheckCircle2 },
}

function StatutoryClock({ onNavigate, onBack }) {
  return (
    <div className="officer-page">
      <div className="officer-topbar">
        <div className="container officer-topbar-inner">
          <div className="flex items-center gap-12">
            <div className="brand-mark" style={{ width: 34, height: 34, fontSize: 14 }}>स</div>
            <div>
              <div className="brand-name" style={{ fontSize: 15 }}>SAATHI</div>
              <div className="brand-sub" style={{ fontSize: 11.5 }}>Officer Console</div>
            </div>
          </div>
          <nav className="officer-nav">
            <button className="officer-nav-link" onClick={() => onNavigate?.('dashboard')}>Triage Queue</button>
            <button className="officer-nav-link active">Statutory Clock</button>
            <button className="officer-nav-link" onClick={() => onNavigate?.('assurance')}>Assurance</button>
            <button className="officer-nav-link" onClick={() => onNavigate?.('modelcard')}>Model Card</button>
          </nav>
          <div className="officer-identity">
            <span className="text-sm">Officer R. Sharma</span>
            <span className="badge badge-neutral">Demo</span>
          </div>
        </div>
      </div>

      <div className="container officer-body">
        <h3 style={{ marginBottom: 4 }}>Statutory Clock</h3>
        <p className="muted text-sm" style={{ marginBottom: 20 }}>
          Tracks statutory timelines across open cases — chargesheet deadlines, relief payments,
          and mandated first-contact windows.
        </p>

        <div className="statutory-summary">
          <div className="stat-summary-item">
            <span className="stat-summary-value" style={{ color: 'var(--status-critical-text)' }}>
              {statutoryRows.filter((r) => r.status === 'OVERDUE').length}
            </span>
            <span className="muted text-sm">Overdue</span>
          </div>
          <div className="stat-summary-item">
            <span className="stat-summary-value" style={{ color: 'var(--status-moderate-text)' }}>
              {statutoryRows.filter((r) => r.status === 'DUE').length}
            </span>
            <span className="muted text-sm">Due</span>
          </div>
          <div className="stat-summary-item">
            <span className="stat-summary-value" style={{ color: 'var(--status-low-text)' }}>
              {statutoryRows.filter((r) => r.status === 'ON-TRACK').length}
            </span>
            <span className="muted text-sm">On track</span>
          </div>
        </div>

        <div className="panel" style={{ marginTop: 16 }}>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Statutory item</th>
                  <th>Detail</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {statutoryRows.map((row, i) => {
                  const s = statusStyle[row.status]
                  const Icon = s.icon
                  return (
                    <tr key={i}>
                      <td className="mono">{row.caseId}</td>
                      <td>{row.item}</td>
                      <td className="muted">{row.detail}</td>
                      <td>
                        <span className={`badge ${s.cls}`}>
                          <Icon size={12} /> {row.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatutoryClock