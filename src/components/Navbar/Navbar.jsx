// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2L12 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                <div className="navbar-left">
                    <img src="public\Logo.svg" alt="Logo" className="navbar-svg-logo" height={32} />
                </div>
                <div className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#pricing">Demo</a>
                    <a href="#contact">Pricing</a>
                </div>
                <div className="navbar-right">
                    <button className="theme-toggle">
                    </button>
                    <a href="/login" className="login-link">Contact</a>
                </div>
            </nav>
        </header>
    );
}
