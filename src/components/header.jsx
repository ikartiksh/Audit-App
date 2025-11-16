import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">📝</div>
          <div className="logo-text-container">
            <h1 className="logo-text">GSoC Proposal Reviewer</h1>
            <p className="logo-subtitle">AI-Powered Proposal Analysis Tool</p>
          </div>
        </div>
        <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <a href="#analyze" className="nav-link">Analyze</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#tips" className="nav-link">Tips</a>
        </nav>
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}
export default Header;