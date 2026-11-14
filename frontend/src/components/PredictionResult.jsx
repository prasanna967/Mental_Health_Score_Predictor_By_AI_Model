function describe(score) {
  if (score >= 8) return {
    label: 'Good', tone: 'good',
    tips: ['Your habits look healthy — keep it up.', 'Keep balancing screen time with sleep and activity.'],
  }
  if (score >= 6) return {
    label: 'Moderate', tone: 'moderate',
    tips: ['Try trimming daily social media time.', 'Aim for 7–9 hours of sleep each night.', 'Add short walks or exercise breaks.'],
  }
  return {
    label: 'Needs attention', tone: 'low',
    tips: ['Reduce time on social media where you can.', 'Prioritise sleep and physical activity.', 'Talk to someone you trust or a counsellor.'],
  }
}

function Gauge({ score, tone }) {
  const r = 52
  const c = 2 * Math.PI * r
  const pct = Math.min(Math.max(score / 10, 0), 1)
  return (
    <div className="gauge">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="gauge-track" />
        <circle
          cx="60" cy="60" r={r}
          className={`gauge-fill stroke-${tone}`}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="gauge-label">
        <span className={`gauge-value tone-${tone}`}>{score.toFixed(1)}</span>
        <span className="gauge-max">out of 10</span>
      </div>
    </div>
  )
}

function Shell({ children }) {
  return (
    <aside className="card result" aria-live="polite">
      <h2>Your result</h2>
      {children}
    </aside>
  )
}

export default function PredictionResult({ score, loading, error }) {
  if (error) {
    return (
      <Shell>
        <div className="alert">
          <strong>Something went wrong</strong>
          <p>{error}</p>
        </div>
      </Shell>
    )
  }

  if (loading) {
    return (
      <Shell>
        <div className="spinner" aria-label="Loading" />
        <p className="muted center">Analysing your profile…</p>
      </Shell>
    )
  }

  if (score === null) {
    return (
      <Shell>
        <div className="empty">
          <div className="empty-icon">🧠</div>
          <p>Your estimated mental health score will appear here.</p>
          <p className="muted small">Complete all three sections and press <strong>Predict my score</strong>.</p>
        </div>
      </Shell>
    )
  }

  const { label, tone, tips } = describe(score)

  return (
    <Shell>
      <Gauge score={score} tone={tone} />
      <span className={`badge bg-soft-${tone} tone-${tone}`}>{label}</span>
      <ul className="tips">
        {tips.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <p className="disclaimer">This is a statistical estimate, not a medical diagnosis.</p>
    </Shell>
  )
}
