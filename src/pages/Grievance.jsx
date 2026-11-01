import { useState, useEffect } from 'react'
import { Check, Circle } from 'lucide-react'

export function Processing({ language, onDone }) {
  const isHindi = language === 'hindi'

  const steps = [
    isHindi ? 'प्राप्त हुआ' : 'Received',
    isHindi ? 'ट्रांसक्रिप्ट तैयार' : 'Transcript prepared',
    isHindi ? 'जानकारी निकाली गई' : 'Information extracted',
    isHindi ? 'साक्ष्य सत्यापित' : 'Evidence validated',
    isHindi ? 'आकलन तैयार' : 'Assessment prepared',
  ]
  const finalStep = isHindi ? 'मानव समीक्षा आवश्यक' : 'Human review required'

  // Auto-advance the pipeline visualization, then hand off to confirmation
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCompleted((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval)
          setTimeout(onDone, 700)
          return prev
        }
        return prev + 1
      })
    }, 450)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="intake-page">
      <div className="container">
        <div className="panel processing-panel">
          <div className="panel-body">
            <h3 style={{ marginBottom: 6 }}>
              {isHindi ? 'आपकी शिकायत तैयार की जा रही है' : "Preparing your submission"}
            </h3>
            <p className="muted text-sm" style={{ marginBottom: 24 }}>
              {isHindi
                ? 'साथी अधिकारी की समीक्षा के लिए जानकारी तैयार कर रहा है। यह स्वचालित रूप से अंतिम निर्णय नहीं लेता।'
                : 'SAATHI is preparing information for trained officer review. It does not make a final decision automatically.'}
            </p>
            <div className="pipeline-list">
              {steps.map((label, i) => (
                <div className="pipeline-row" key={label}>
                  {i < completed ? (
                    <Check size={16} className="pipeline-check" />
                  ) : (
                    <Circle size={16} className="pipeline-pending" />
                  )}
                  <span className={i < completed ? '' : 'muted'}>{label}</span>
                </div>
              ))}
              <div className="pipeline-row pipeline-final">
                <span className="pipeline-dot" />
                <span>{finalStep}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Confirmation({ language, docketId, onTrack, onHome }) {
  const isHindi = language === 'hindi'
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="intake-page">
      <div className="container confirmation-container">
        <div className="panel docket-card">
          <div className="panel-body" style={{ textAlign: 'center' }}>
            <div className="docket-mark">साथी</div>
            <h3 style={{ marginTop: 12 }}>
              {isHindi ? 'शिकायत प्राप्त हुई' : 'Grievance received'}
            </h3>
            <div className="docket-id">{docketId}</div>
            <p className="muted text-sm">
              {isHindi ? 'दर्ज किया गया' : 'Submitted'}: {isHindi ? 'आज' : 'Today'}, {timeStr}
            </p>
            <hr className="intake-divider" />
            <p className="text-sm">
              {isHindi
                ? 'अगला कदम: एक शिकायत अधिकारी सबमिशन की समीक्षा करेगा।'
                : 'Next step: A grievance officer will review the submission.'}
            </p>
          </div>
        </div>

        <div className="panel" style={{ marginTop: 20 }}>
          <div className="panel-body">
            <h4 style={{ marginBottom: 14 }}>{isHindi ? 'आगे क्या होगा' : 'What happens next'}</h4>
            <ol className="next-steps-list">
              <li>{isHindi ? 'आपकी शिकायत दर्ज कर ली गई है।' : 'Your grievance is recorded.'}</li>
              <li>{isHindi ? 'समीक्षा के लिए प्रासंगिक जानकारी तैयार की जाती है।' : 'Relevant information is prepared for review.'}</li>
              <li>{isHindi ? 'एक प्रशिक्षित अधिकारी मामले की समीक्षा करता है।' : 'A trained officer reviews the case.'}</li>
              <li>{isHindi ? 'आप प्रगति को ट्रैक कर सकते हैं।' : 'You can track the progress.'}</li>
            </ol>
            <div className="flex gap-12" style={{ marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={onTrack}>
                {isHindi ? 'शिकायत ट्रैक करें' : 'Track grievance'}
              </button>
              <button className="btn btn-ghost" onClick={onHome}>
                {isHindi ? 'होम पर जाएं' : 'Back to home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}