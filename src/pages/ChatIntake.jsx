import { useState, useRef, useEffect } from 'react'
import { Send, Shield, Phone } from 'lucide-react'

// Empathetic, validating responses — never a "solution", never a diagnosis.
// Rotates so repeated demo runs don't feel robotic.
const empathyResponses = {
  english: [
    "Thank you for sharing that with me. That sounds really difficult.",
    "I hear you. It's okay to feel this way — you don't have to go through this alone.",
    "That must be hard to carry. I'm noting everything you've told me carefully.",
    "I'm really glad you're speaking up about this. You're doing the right thing.",
  ],
  hindi: [
    "यह बताने के लिए धन्यवाद। यह वाकई मुश्किल लगता है।",
    "मैं समझती हूं। ऐसा महसूस करना ठीक है — आपको यह अकेले सहने की ज़रूरत नहीं है।",
    "यह सहना कठिन रहा होगा। मैं आपकी बात ध्यान से नोट कर रही हूं।",
    "मुझे खुशी है कि आपने यह बात साझा की। आप सही कर रहे हैं।",
  ],
}

const followUps = {
  english: [
    "Can you tell me a bit more about when this started?",
    "Is this something that's still happening, or did it happen in the past?",
    "Is there anything else about the situation you'd like me to know?",
  ],
  hindi: [
    "क्या आप बता सकते हैं कि यह कब शुरू हुआ?",
    "क्या यह अभी भी हो रहा है, या यह पहले हुआ था?",
    "क्या इस स्थिति के बारे में कुछ और है जो आप बताना चाहेंगे?",
  ],
}

const hardTriggerWords = ['threat', 'danger', 'kill', 'धमकी', 'खतरा', 'मार']

function ChatIntake({ language, onComplete }) {
  const isHindi = language === 'hindi'
  const [consented, setConsented] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [turnCount, setTurnCount] = useState(0)
  const [urgent, setUrgent] = useState(false)
  const [done, setDone] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (consented && messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: isHindi
          ? 'नमस्ते। आप कैसा महसूस कर रहे हैं? आप जो चाहें, अपने शब्दों में साझा कर सकते हैं।'
          : "Hello. How are you feeling? You can share whatever happened, in your own words.",
      }])
    }
  }, [consented])

  const sendMessage = () => {
    if (!input.trim() || done) return
    const userText = input.trim()
    const lower = userText.toLowerCase()
    const triggered = hardTriggerWords.some((w) => lower.includes(w))
    if (triggered) setUrgent(true)

    const newMessages = [...messages, { sender: 'user', text: userText }]
    setInput('')
    setTurnCount((c) => c + 1)

    setTimeout(() => {
      const pool = empathyResponses[language]
      const fpool = followUps[language]
      const reply = pool[turnCount % pool.length]
      const isClosing = turnCount >= 2 || triggered

      if (isClosing) {
        const closingText = triggered
          ? (isHindi
              ? 'यह महत्वपूर्ण जानकारी है। मैं इसे अभी एक प्रशिक्षित अधिकारी तक पहुंचा रही हूं ताकि वे जल्द आपसे संपर्क कर सकें।'
              : "This is important information. I'm passing this to a trained officer right now so they can reach out to you soon.")
          : (isHindi
              ? 'आपकी बात सुनने के लिए धन्यवाद। मैं यह जानकारी एक प्रशिक्षित अधिकारी तक पहुंचा रही हूं, जो जल्द ही आपसे संपर्क करेंगे।'
              : "Thank you for sharing this with me. I'm passing this information to a trained officer, who will follow up with you soon.")

        setMessages([...newMessages, { sender: 'bot', text: reply }, { sender: 'bot', text: closingText, closing: true }])
        setDone(true)
      } else {
        const followUp = fpool[turnCount % fpool.length]
        setMessages([...newMessages, { sender: 'bot', text: `${reply} ${followUp}` }])
      }
    }, 550)

    setMessages(newMessages)
  }

  if (!consented) {
    return (
      <div className="intake-page">
        <div className="container chat-consent-container">
          <div className="panel">
            <div className="panel-body">
              <h3>{isHindi ? 'शुरू करने से पहले' : 'Before we begin'}</h3>
              <div className="notice" style={{ marginTop: 14, marginBottom: 16 }}>
                {isHindi
                  ? 'यह एक प्रदर्शन प्रोटोटाइप है। आपकी बातचीत एक प्रशिक्षित अधिकारी द्वारा समीक्षा की जाएगी। AI कोई अंतिम निर्णय नहीं लेता।'
                  : 'This is a demonstration prototype. Your conversation will be reviewed by a trained officer. AI does not make any final decision.'}
              </div>
              <button className="btn btn-primary btn-block" onClick={() => setConsented(true)}>
                {isHindi ? 'आगे बढ़ें' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="intake-page">
      <div className="container chat-container">
        <div className={`panel chat-panel ${urgent ? 'chat-urgent' : ''}`}>
          <div className="chat-header">
            <div className="brand-mark" style={{ width: 32, height: 32, fontSize: 13 }}>स</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>SAATHI</div>
              <div className="muted text-xs">{isHindi ? 'AI-सहायक — मानव समीक्षा आवश्यक' : 'AI-assisted — human review required'}</div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble-row ${m.sender === 'user' ? 'row-user' : 'row-bot'}`}>
                <div className={`chat-bubble ${m.sender === 'user' ? 'bubble-user' : 'bubble-bot'} ${m.closing ? 'bubble-closing' : ''}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {!done ? (
            <div className="chat-input-row">
              <textarea
                className="chat-input"
                rows={1}
                placeholder={isHindi ? 'यहां लिखें...' : 'Type here...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              />
              <button className="chat-send-btn" onClick={sendMessage} disabled={!input.trim()}>
                <Send size={17} />
              </button>
            </div>
          ) : (
            <div className="chat-footer">
              <div className="notice" style={{ marginBottom: 12 }}>
                <Phone size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  {isHindi
                    ? 'यदि आपको तुरंत सहायता चाहिए, तो कृपया वुमन हेल्पलाइन 181 या पुलिस 112 पर संपर्क करें।'
                    : 'If you need immediate help, please contact the Women Helpline 181 or Police 112.'}
                </span>
              </div>
              <button className="btn btn-primary btn-block" onClick={onComplete}>
                <Shield size={16} /> {isHindi ? 'जारी रखें' : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatIntake