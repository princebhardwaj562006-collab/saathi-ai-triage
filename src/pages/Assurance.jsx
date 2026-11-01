import { AlertCircle } from 'lucide-react'

const byLanguage = [
  { label: 'Hindi', assessed: 142, overridden: 9, overrideRate: '6.3%', missingEvidence: 2 },
  { label: 'English', assessed: 118, overridden: 4, overrideRate: '3.4%', missingEvidence: 1 },
]

const byDistrict = [
  { label: 'District A', assessed: 88, overridden: 6, overrideRate: '6.8%', missingEvidence: 1 },
  { label: 'District B', assessed: 102, overridden: 3, overrideRate: '2.9%', missingEvidence: 0 },
  { label: 'District C', assessed: 70, overridden: 4, overrideRate: '5.7%', missingEvidence: 2 },
]

const byChannel = [
  { label: 'Voice', assessed: 96, overridden: 8, overrideRate: '8.3%', missingEvidence: 3 },
  { label: 'Text', assessed: 164, overridden: 5, overrideRate: '3.0%', missingEvidence: 0 },
]

function BreakdownTable({ title, rows }) {
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-header"><h4 style={{ fontSize: 14 }}>{title}</h4></div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>{title.replace('By ', '')}</th>
              <th>Cases assessed</th>
              <th>Human overrides</th>
              <th>Override rate</th>
              <th>Missing evidence flags</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td className="mono">{r.assessed}</td>
                <td className="mono">{r.overridden}</td>
                <td className="mono">{r.overrideRate}</td>
                <td className="mono">{r.missingEvidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Assurance({ onNavigate }) {
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
            <button className="officer-nav-link" onClick={() => onNavigate?.('statutory')}>Statutory Clock</button>
            <button className="officer-nav-link active">Assurance</button>
            <button className="officer-nav-link" onClick={() => onNavigate?.('modelcard')}>Model Card</button>
          </nav>
          <div className="officer-identity">
            <span className="text-sm">Officer R. Sharma</span>
            <span className="badge badge-neutral">Demo</span>
          </div>
        </div>
      </div>

      <div className="container officer-body">
        <h3 style={{ marginBottom: 4 }}>Assurance &amp; Bias Monitor</h3>
        <p className="muted text-sm" style={{ marginBottom: 4 }}>
          Tracks how often officers override the AI-assisted assessment, broken down by language,
          district, and channel — to help identify potential disparities in system performance.
        </p>
        <div className="notice notice-warning" style={{ marginTop: 12, marginBottom: 20 }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Synthetic demonstration data. No accuracy claim is made by this prototype.</span>
        </div>

        <BreakdownTable title="By Language" rows={byLanguage} />
        <BreakdownTable title="By District" rows={byDistrict} />
        <BreakdownTable title="By Channel" rows={byChannel} />
      </div>
    </div>
  )
}

export default Assurance