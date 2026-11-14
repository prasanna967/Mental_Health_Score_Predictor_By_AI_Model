export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="brand">
          <span className="brand-logo">🧠</span> MindCheck
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#predict" className="nav-cta">Start prediction</a>
        </div>
      </div>
    </nav>
  )
}
