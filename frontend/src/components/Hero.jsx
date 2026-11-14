export default function Hero() {
  return (
    <header className="hero" id="about">
      <div className="container hero-inner">
        <span className="hero-badge">✨ Machine learning powered</span>
        <h1>
          How is social media affecting your <span className="gradient-text">mental health?</span>
        </h1>
        <p>
          Share a few details about your daily habits — screen time, sleep, study and activity —
          and our Random Forest model, trained on student survey data, estimates your mental health score.
        </p>
        <div className="hero-actions">
          <a href="#predict" className="btn btn-primary btn-lg">Get my score</a>
        </div>
        <ul className="hero-stats">
          <li><strong>12</strong><span>quick questions</span></li>
          <li><strong>1–10</strong><span>score scale</span></li>
          <li><strong>&lt;1s</strong><span>instant result</span></li>
        </ul>
      </div>
    </header>
  )
}
