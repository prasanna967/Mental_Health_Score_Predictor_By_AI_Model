import { useState } from 'react'

const COUNTRIES = ['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other']
const PLATFORMS = ['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter', 'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat']
const PURPOSES = ['Networking', 'Education', 'Entertainment', 'News']
const ACADEMIC_LEVELS = ['High School', 'Undergraduate', 'Graduate']
const STRESS_LEVELS = ['Low', 'Medium', 'High', 'Very High']

const FIELDS = {
  age: { type: 'number', label: 'Age', placeholder: 'e.g. 21', hint: 'Years, 10–100', min: 10, max: 100, step: 1 },
  gender: { type: 'select', label: 'Gender', placeholder: 'Select gender', options: ['Male', 'Female'] },
  country: { type: 'select', label: 'Country', placeholder: 'Select country', options: COUNTRIES },
  academic_level: { type: 'select', label: 'Academic level', placeholder: 'Select level', options: ACADEMIC_LEVELS },
  most_used_platform: { type: 'select', label: 'Most used platform', placeholder: 'Select platform', options: PLATFORMS },
  purpose_of_use: { type: 'select', label: 'Main purpose', placeholder: 'Select purpose', options: PURPOSES },
  avg_daily_usage_hours: { type: 'number', label: 'Daily social media', placeholder: 'e.g. 4.5', hint: 'Hours per day', min: 0, max: 24, step: 0.1, unit: 'hrs' },
  daily_unlocks: { type: 'number', label: 'Phone unlocks', placeholder: 'e.g. 120', hint: 'Times per day', min: 0, max: 1000, step: 1 },
  study_hours: { type: 'number', label: 'Study time', placeholder: 'e.g. 4', hint: 'Hours per day', min: 0, max: 24, step: 0.1, unit: 'hrs' },
  physical_activity_hours: { type: 'number', label: 'Physical activity', placeholder: 'e.g. 1.5', hint: 'Hours per day', min: 0, max: 24, step: 0.1, unit: 'hrs' },
  sleep_hours_per_night: { type: 'number', label: 'Sleep', placeholder: 'e.g. 7', hint: 'Hours per night', min: 0, max: 24, step: 0.1, unit: 'hrs' },
  stress_level: { type: 'select', label: 'Stress level', placeholder: 'Select stress level', options: STRESS_LEVELS },
}

const SECTIONS = [
  { title: 'About you', desc: 'Basic background details', icon: '👤', fields: ['age', 'gender', 'country', 'academic_level'] },
  { title: 'Social media', desc: 'How you use your phone and apps', icon: '📱', fields: ['most_used_platform', 'purpose_of_use', 'avg_daily_usage_hours', 'daily_unlocks'] },
  { title: 'Lifestyle', desc: 'Your daily routine and wellbeing', icon: '🌿', fields: ['study_hours', 'physical_activity_hours', 'sleep_hours_per_night', 'stress_level'] },
]

const EMPTY = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, '']))
const INTEGER_FIELDS = ['age', 'daily_unlocks']

function Field({ name, value, onChange }) {
  const f = FIELDS[name]
  const id = `field-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>{f.label}</label>
      {f.type === 'select' ? (
        <div className="select-wrap">
          <select id={id} name={name} value={value} onChange={onChange} required className={value ? '' : 'is-empty'}>
            <option value="" disabled>{f.placeholder}</option>
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      ) : (
        <div className="input-wrap">
          <input
            id={id}
            type="number"
            name={name}
            value={value}
            placeholder={f.placeholder}
            min={f.min}
            max={f.max}
            step={f.step}
            inputMode={f.step === 1 ? 'numeric' : 'decimal'}
            required
            onChange={onChange}
          />
          {f.unit && <span className="unit">{f.unit}</span>}
        </div>
      )}
      {f.hint && <small className="hint">{f.hint}</small>}
    </div>
  )
}

export default function PredictionForm({ onSubmit, onReset, loading }) {
  const [form, setForm] = useState(EMPTY)

  const total = Object.keys(FIELDS).length
  const filled = Object.values(form).filter((v) => v !== '').length

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form }
    for (const [key, f] of Object.entries(FIELDS)) {
      if (f.type === 'number') payload[key] = Number(form[key])
    }
    for (const key of INTEGER_FIELDS) payload[key] = Math.round(payload[key])
    onSubmit(payload)
  }

  function handleReset() {
    setForm(EMPTY)
    onReset?.()
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-header">
        <div>
          <h2>Your profile</h2>
          <p className="muted">Fill in all fields to get your prediction.</p>
        </div>
        <div className="progress" aria-label={`${filled} of ${total} fields completed`}>
          <span className="progress-count">{filled}/{total}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(filled / total) * 100}%` }} />
          </div>
        </div>
      </div>

      {SECTIONS.map((s, i) => {
        const done = s.fields.every((k) => form[k] !== '')
        return (
          <section className="section" key={s.title}>
            <div className="section-head">
              <span className={`step ${done ? 'step-done' : ''}`}>{done ? '✓' : i + 1}</span>
              <span>
                <span className="section-title">{s.icon} {s.title}</span>
                <span className="section-desc">{s.desc}</span>
              </span>
            </div>
            <div className="grid">
              {s.fields.map((k) => <Field key={k} name={k} value={form[k]} onChange={handleChange} />)}
            </div>
          </section>
        )
      })}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={handleReset} disabled={loading || filled === 0}>
          Clear
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <><span className="btn-spinner" /> Predicting…</> : 'Predict my score →'}
        </button>
      </div>
    </form>
  )
}
