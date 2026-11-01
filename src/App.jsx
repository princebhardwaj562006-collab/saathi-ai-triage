import { useState } from 'react'
import './index.css'

import Home from './pages/Home'
import ChatIntake from './pages/ChatIntake'
import { Processing, Confirmation } from './pages/Grievance'
import OfficerDashboard from './pages/OfficerDashboard'
import CaseDetail from './pages/CaseDetail'
import HumanReview from './pages/HumanReview'
import AuditTimeline from './pages/AuditTimeline'
import StatutoryClock from './pages/StatutoryClock'
import Assurance from './pages/Assurance'
import ModelCard from './pages/ModelCard'

function App() {
  // ---------- Global navigation state ----------
  const [screen, setScreen] = useState('home')

  // ---------- Citizen flow state ----------
  const [language, setLanguage] = useState('english')
  const [docketId, setDocketId] = useState('')

  // ---------- Officer flow state ----------
  const [activeScenarioId, setActiveScenarioId] = useState(null)
  const [decisions, setDecisions] = useState({}) // { S4: { type, reason, raisedTo, officer, time } }

  const goTo = (s) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ---------- Citizen flow handlers ----------
  const startGrievance = () => {
    goTo('intake')
  }

  const onProcessingDone = () => {
    const id = `SA-${1000 + Math.floor(Math.random() * 900)}`
    setDocketId(id)
    goTo('confirmation')
  }

  // ---------- Officer flow handlers ----------
  const openCase = (scenarioId) => {
    setActiveScenarioId(scenarioId)
    goTo('caseDetail')
  }

  const openHumanReview = () => goTo('humanReview')

  const confirmDecision = (scenarioId, record) => {
    setDecisions((prev) => ({ ...prev, [scenarioId]: record }))
  }

  const viewAudit = () => goTo('auditTimeline')

  // ---------- Demo mode: quick scenario jump ----------
  const scenarioLabels = { S1: 'S1 — Low', S2: 'S2 — Moderate', S3: 'S3 — Critical', S4: 'S4 — Override' }

  const jumpToScenario = (id) => {
    setActiveScenarioId(id)
    goTo('caseDetail')
  }

  const resetDemo = () => {
    setDecisions({})
    setActiveScenarioId(null)
    goTo('home')
  }

  // ---------- Officer console top-nav handler ----------
  const handleOfficerNav = (target) => {
    if (target === 'dashboard') goTo('officerDashboard')
    if (target === 'statutory') goTo('statutoryClock')
    if (target === 'assurance') goTo('assurance')
    if (target === 'modelcard') goTo('modelCard')
  }

  // ============================================================
  // SCREEN ROUTING
  // ============================================================

  let content = null

  switch (screen) {
    case 'home':
      content = (
        <Home
          language={language}
          onStartGrievance={startGrievance}
          onTrackGrievance={() => goTo('officerDashboard')}
          onOfficerLogin={() => goTo('officerDashboard')}
        />
      )
      break

    case 'intake':
      content = (
        <ChatIntake
          language={language}
          onComplete={() => goTo('processing')}
        />
      )
      break

    case 'processing':
      content = <Processing language={language} onDone={onProcessingDone} />
      break

    case 'confirmation':
      content = (
        <Confirmation
          language={language}
          docketId={docketId}
          onTrack={() => goTo('officerDashboard')}
          onHome={() => goTo('home')}
        />
      )
      break

    case 'officerDashboard':
      content = (
        <OfficerDashboard
          onOpenCase={openCase}
          onNavigate={handleOfficerNav}
        />
      )
      break

    case 'caseDetail':
      content = (
        <CaseDetail
          scenarioId={activeScenarioId}
          onBack={() => goTo('officerDashboard')}
          onOpenReview={openHumanReview}
        />
      )
      break

    case 'humanReview':
      content = (
        <HumanReview
          scenarioId={activeScenarioId}
          decision={decisions[activeScenarioId]}
          onConfirmDecision={confirmDecision}
          onBack={() => goTo('caseDetail')}
          onViewAudit={viewAudit}
        />
      )
      break

    case 'auditTimeline':
      content = (
        <AuditTimeline
          scenarioId={activeScenarioId}
          decision={decisions[activeScenarioId]}
          onBack={() => goTo('caseDetail')}
        />
      )
      break

    case 'statutoryClock':
      content = <StatutoryClock onNavigate={handleOfficerNav} />
      break

    case 'assurance':
      content = <Assurance onNavigate={handleOfficerNav} />
      break

    case 'modelCard':
      content = <ModelCard onBack={() => goTo('officerDashboard')} />
      break

    default:
      content = <Home language={language} onStartGrievance={startGrievance} onTrackGrievance={() => goTo('officerDashboard')} onOfficerLogin={() => goTo('officerDashboard')} />
  }

  // Only show the gov strip + header on citizen-facing screens
  const isCitizenScreen = ['home', 'intake', 'processing', 'confirmation'].includes(screen)

  return (
    <div className="saathi-app">
      {isCitizenScreen && (
        <>
          <div className="gov-strip">
            <span>Government of India</span>
            <span>Ministry of Social Justice &amp; Empowerment</span>
          </div>
          <header className="site-header">
            <div className="brand" style={{ cursor: 'pointer' }} onClick={() => goTo('home')}>
              <div className="brand-mark">स</div>
              <div>
                <div className="brand-name">SAATHI</div>
                <div className="brand-sub">AI-Assisted Grievance Triage</div>
              </div>
            </div>
            <nav className="site-nav">
              <span>How SAATHI works</span>
              <span>For citizens</span>
              <button className="btn-ghost" style={{ border: 'none', background: 'none', font: 'inherit', color: 'inherit' }} onClick={() => goTo('officerDashboard')}>
                For officers
              </button>
              <span>Support</span>
            </nav>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
            >
              {language === 'english' ? 'हिन्दी / English' : 'English / हिन्दी'}
            </button>
          </header>
        </>
      )}

      {content}

      {/* Demo mode badge + scenario selector — visible everywhere */}
      <DemoPanel activeScenarioId={activeScenarioId} onJump={jumpToScenario} onReset={resetDemo} scenarioLabels={scenarioLabels} />
    </div>
  )
}

// ============================================================
// DEMO MODE PANEL — floating, always accessible to judges
// ============================================================
function DemoPanel({ onJump, onReset, scenarioLabels, activeScenarioId }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="demo-panel-wrap">
      {open && (
        <div className="demo-panel">
          <div className="demo-panel-header">
            <span>DEMONSTRATION MODE</span>
            <button className="btn-ghost btn-sm" style={{ border: 'none', background: 'none' }} onClick={() => setOpen(false)}>✕</button>
          </div>
          <p className="text-xs muted" style={{ padding: '0 14px 10px' }}>
            Jump directly to any synthetic scenario for demonstration.
          </p>
          <div className="demo-panel-list">
            {Object.entries(scenarioLabels).map(([id, label]) => (
              <button
                key={id}
                className={`demo-scenario-btn ${activeScenarioId === id ? 'active' : ''}`}
                onClick={() => onJump(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm btn-block" style={{ margin: '10px 14px 14px', width: 'calc(100% - 28px)' }} onClick={onReset}>
            Reset demo
          </button>
        </div>
      )}
      <button className="demo-badge" onClick={() => setOpen((o) => !o)}>
        DEMONSTRATION MODE
      </button>
    </div>
  )
}

export default App