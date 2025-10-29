import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <img src="/hr_logo.png" alt="HellRaiser Logo" className="logo-image" />
          <h1 className="logo-text">HellRaiser</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/accounts">Accounts</Link></li>
          <li><Link to="/equipments">Equipments</Link></li>
          <li><Link to="/overview">Overview</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
