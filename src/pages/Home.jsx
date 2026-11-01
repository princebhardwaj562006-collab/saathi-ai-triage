import { Shield, FileCheck, Users, Ear, Brain, Gavel, ScrollText } from 'lucide-react'

function Home({ language, onStartGrievance, onTrackGrievance, onOfficerLogin }) {
  const isHindi = language === 'hindi'

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">
              <span className="dot" /> SAFE &nbsp;•&nbsp; HUMAN-CENTRIC &nbsp;•&nbsp; ACCOUNTABLE
            </div>
            <h1 className="hero-title">
              {isHindi
                ? 'शिकायत सहायता, मानव निर्णय के साथ।'
                : (
                  <>Grievance support, with <span className="accent">human judgement</span> at the centre.</>
                )}
            </h1>
            <p className="hero-sub">
              {isHindi
                ? 'साथी प्रशिक्षित अधिकारियों को व्यक्ति के अपने शब्दों से सुरक्षा और सहायता संकेत समझने में मदद करता है — हर महत्वपूर्ण निर्णय मानव नियंत्रण में रहता है।'
                : "SAATHI helps grievance officers understand important safety and support indicators from a person's own words — while every important decision remains under human control."}
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onStartGrievance}>
                Start a grievance →
              </button>
              <button className="btn btn-secondary" onClick={onTrackGrievance}>
                Track an existing grievance
              </button>
            </div>
            <div className="hero-checks">
              <span>✓ Human-reviewed</span>
              <span>✓ Privacy-conscious</span>
              <span>✓ No automated decisions</span>
            </div>
          </div>

          <aside className="hero-card panel">
            <div className="hero-card-mark">साथी</div>
            <h3 style={{ marginTop: 14 }}>SAATHI</h3>
            <p className="muted text-sm" style={{ marginBottom: 16 }}>AI-assisted support</p>
            <ul className="hero-card-list">
              <li><Ear size={16} /> Listening</li>
              <li><FileCheck size={16} /> Evidence-based</li>
              <li><Users size={16} /> Human in control</li>
            </ul>
          </aside>
        </div>

        <div className="container">
          <div className="notice" role="note">
            <Shield size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>Important:</strong> SAATHI does not diagnose trauma, determine whether
              someone is telling the truth, or make final decisions about a grievance.
              Its role is to assist trained human officers.
            </span>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">What you can do</h2>
        <div className="card-grid">
          <button className="action-card" onClick={onStartGrievance}>
            <FileCheck size={20} />
            <span>Submit a grievance</span>
          </button>
          <button className="action-card" onClick={onTrackGrievance}>
            <ScrollText size={20} />
            <span>Track your case</span>
          </button>
          <button className="action-card" onClick={onStartGrievance}>
            <Users size={20} />
            <span>Understand next steps</span>
          </button>
          <button className="action-card" onClick={onStartGrievance}>
            <Shield size={20} />
            <span>Request support</span>
          </button>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">How SAATHI helps</h2>
        <div className="steps-row">
          {[
            { icon: <Ear size={18} />, label: 'Listen', desc: 'Records what you share, in your own words, in text or voice.' },
            { icon: <Brain size={18} />, label: 'Understand', desc: 'AI-assisted extraction identifies observable indicators with evidence.' },
            { icon: <ScrollText size={18} />, label: 'Assess', desc: 'A deterministic, policy-owned engine calculates a priority indicator.' },
            { icon: <Gavel size={18} />, label: 'Human review', desc: 'A trained officer reviews evidence and makes the final decision.' },
          ].map((s, i) => (
            <div className="step-card panel" key={s.label}>
              <div className="step-card-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="step-card-icon">{s.icon}</div>
              <h4>{s.label}</h4>
              <p className="muted text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Important safeguards</h2>
        <div className="safeguard-grid">
          <div className="safeguard-item">
            <strong>Human review required</strong>
            <p className="muted text-sm">Every case is reviewed by a trained officer before action is taken.</p>
          </div>
          <div className="safeguard-item">
            <strong>No automated final decisions</strong>
            <p className="muted text-sm">The AI-assisted assessment is advisory, never final.</p>
          </div>
          <div className="safeguard-item">
            <strong>Evidence-based assistance</strong>
            <p className="muted text-sm">Every indicator is backed by a quote validated against the transcript.</p>
          </div>
          <div className="safeguard-item">
            <strong>Synthetic demo data</strong>
            <p className="muted text-sm">This prototype uses synthetic demonstration scenarios only.</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-name" style={{ color: '#fff' }}>SAATHI</div>
            <p className="text-sm" style={{ color: '#9fb0bd', marginTop: 6, maxWidth: 320 }}>
              AI-assisted grievance triage for NHAA (14566) and the Integrated Portal.
              Built for Smart India Hackathon 2026.
            </p>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">For citizens</span>
            <button className="footer-link" onClick={onStartGrievance}>Start a grievance</button>
            <button className="footer-link" onClick={onTrackGrievance}>Track a grievance</button>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">For officers</span>
            <button className="footer-link" onClick={onOfficerLogin}>Officer console</button>
          </div>
        </div>
        <div className="container">
          <p className="text-xs" style={{ color: '#6b7c88', marginTop: 24 }}>
            Government of India · Ministry of Social Justice &amp; Empowerment · Demonstration prototype — synthetic data only.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home