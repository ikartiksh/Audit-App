import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">GSoC Proposal Reviewer</h3>
                    <p className="footer-description">
                        AI-powered tool for analyzing and reviewing Google Summer of Code proposals
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-links">
                        <li><a href="#about" className="footer-link">About</a></li>
                        <li><a href="#tips" className="footer-link">Writing Tips</a></li>
                        <li><a href="https://summerofcode.withgoogle.com" target="_blank" rel="noopener noreferrer" className="footer-link">GSoC Official</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Documentation</a></li>
                        <li><a href="#" className="footer-link">FAQ</a></li>
                        <li><a href="#" className="footer-link">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-divider"></div>
                <div className="footer-copyright">
                    <p>&copy; {currentYear} GSoC Proposal Reviewer. Built with ❤️ for the open source community.</p>
                    <div className="footer-tech">
                        <span>Powered by AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;