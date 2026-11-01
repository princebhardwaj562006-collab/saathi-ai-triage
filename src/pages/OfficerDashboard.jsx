import { useState } from 'react'
import {
  AlertTriangle, Clock, Users, RotateCcw, ChevronRight,
  Filter, LayoutGrid, ScrollText, ShieldCheck, FileText,
} from 'lucide-react'
import { dashboardMetrics, triageQueue } from '../data/scenario'

const priorityBadgeClass = {
  LOW: 'badge-low',
  MODERATE: 'badge-moderate',
  HIGH: 'badge-high',
  CRITICAL: 'badge-critical',
}

function MetricCard({ label, value, tone }) {
  return (
    <div className={`metric-card ${tone ? `metric-${tone}` : ''}`}>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  )
}

function OfficerDashboard({ onOpenCase, onNavigate }) {
  const [filters, setFilters] = useState({
    priority: 'All',
    language: 'All',
    channel: 'All',
    status: 'All',
  })

  const filterOptions = {
    priority: ['All', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'],
    language: ['All', 'English', 'Hindi'],
    channel: ['All', 'Text', 'Voice'],
    status: ['All', 'Review', 'Awaiting contact', 'Overridden'],
  }

  const filteredQueue = triageQueue.filter((row) => {
    if (filters.priority !== 'All' && row.priority !== filters.priority) return false
    if (filters.language !== 'All' && row.language !== filters.language) return false
    if (filters.channel !== 'All' && row.channel !== filters.channel) return false
    if (filters.status !== 'All' && row.status !== filters.status) return false
    return true
  })

  return (
    <div className="officer-page">
      {/* Officer top nav */}
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
            <button className="officer-nav-link active">Triage Queue</button>
            <button className="officer-nav-link" onClick={() => onNavigate?.('statutory')}>Statutory Clock</button>
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
        {/* Metrics */}
        <div className="metrics-row">
          <MetricCard label="Critical Open" value={dashboardMetrics.criticalOpen} tone="critical" />
          <MetricCard label="High Open" value={dashboardMetrics.highOpen} tone="high" />
          <MetricCard label="Awaiting First Contact" value={dashboardMetrics.awaitingFirstContact} />
          <MetricCard label="SLA Breaches Today" value={dashboardMetrics.slaBreachesToday} tone="critical" />
          <MetricCard label="Overridden Today" value={dashboardMetrics.overriddenToday} />
        </div>

        {/* Filters */}
        <div className="panel filter-bar">
          <div className="filter-bar-inner">
            <div className="filter-bar-label">
              <Filter size={14} /> Filters
            </div>
            {Object.entries(filterOptions).map(([key, options]) => (
              <select
                key={key}
                className="input filter-select"
                value={filters[key]}
                onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {opt}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Triage queue table */}
        <div className="panel" style={{ marginTop: 16 }}>
          <div className="panel-header">
            <h3 style={{ fontSize: 15 }}>Triage Queue</h3>
            <span className="muted text-sm">{filteredQueue.length} cases</span>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Received</th>
                  <th>Language</th>
                  <th>Channel</th>
                  <th>Priority</th>
                  <th>SVI</th>
                  <th>SLA</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredQueue.map((row) => (
                  <tr key={row.caseId}>
                    <td className="mono">{row.caseId}</td>
                    <td className="muted">{row.receivedAt}</td>
                    <td>{row.language}</td>
                    <td>{row.channel}</td>
                    <td>
                      <span className={`badge ${priorityBadgeClass[row.priority]}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="mono">{row.svi}</td>
                    <td className={row.sla.startsWith('00') ? 'sla-urgent mono' : 'mono muted'}>
                      {row.sla}
                    </td>
                    <td>
                      <span className="badge badge-neutral">{row.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => row.scenarioId && onOpenCase(row.scenarioId)}
                        disabled={!row.scenarioId}
                      >
                        Open <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQueue.length === 0 && (
                  <tr>
                    <td colSpan={9} className="muted text-sm" style={{ textAlign: 'center', padding: '24px 0' }}>
                      No cases match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficerDashboard