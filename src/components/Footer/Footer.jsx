// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

// --- Social Icon Components (same as before) ---
const LinkedInIcon = () => (
  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Main footer grid */}
        <div className="footer-grid">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <a href="#">
              <img className="footer-logo" src="/Logo.svg" alt="Nexon AI" />
            </a>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Help centre</a></li>
              <li><a href="#">Policy hub</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li><a href="#">Team</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><a href="#">Partnerships</a></li>
              <li><a href="#">Cliniko</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="footer-subscribe">
            <h3 className="footer-heading">Subscribe</h3>
            <form className="subscribe-form">
              <input type="email" placeholder="Your email here" className="subscribe-input" />
              <button type="submit" className="subscribe-button">Join</button>
            </form>
            <p className="subscribe-notice">By subscribing, you agree to our Privacy Policy and consent to updates.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            Made with <span className="heart">♥</span> in the World © {new Date().getFullYear()} Nexon AI. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
