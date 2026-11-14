import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import PredictionForm from './components/PredictionForm.jsx'
import PredictionResult from './components/PredictionResult.jsx'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePredict(payload) {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        const detail = Array.isArray(data.detail)
          ? data.detail.map((d) => `${d.loc?.at(-1)}: ${d.msg}`).join(', ')
          : data.detail
        throw new Error(detail || `Request failed (${res.status})`)
      }
      setResult(data.predicted_mental_health_score)
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `Cannot reach the API at ${API_URL}. Is the FastAPI server running?`
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <Hero />
      <main className="container main-grid" id="predict">
        <PredictionForm
          onSubmit={handlePredict}
          onReset={() => { setResult(null); setError('') }}
          loading={loading}
        />
        <PredictionResult score={result} loading={loading} error={error} />
      </main>
      <footer className="footer">
        Built with FastAPI, scikit-learn &amp; React · For educational use only — not a medical diagnosis.
      </footer>
    </>
  )
}
