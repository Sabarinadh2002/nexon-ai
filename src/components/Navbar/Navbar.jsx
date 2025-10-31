// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2L12 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

export default function Navbar() {
    return (
        <header className="navbar-container">
            <nav className="navbar">
                {/* --- Left Section --- */}
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">
                        <Logo />
                        <span>Startup</span>
                    </a>
                </div>

                {/* --- Center Section (Moved from navbar-left) --- */}
                <div className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#contact">Contact</a>
                </div>

                {/* --- Right Section --- */}
                <div className="navbar-right">
                    <button className="theme-toggle">
                        <MoonIcon />
                    </button>
                    <a href="/login" className="login-link">Login</a>
                    <a href="/book-call" className="cta-button">Book a call</a>
                </div>
            </nav>
        </header>
    );
}
