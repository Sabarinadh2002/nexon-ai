// src/components/PhoneHero/PhoneHero.jsx
import React from 'react';
import './PhoneHero.css';

// It's better to use an actual image for the phone, but for now, a placeholder div works.
// You can replace this with an <img src={phoneImageUrl} /> later.
const PhoneGraphic = () => (
    <div className="phone-graphic">
        <div className="phone-screen">
            <div className="sound-wave"></div>
            <div className="no-code-text">No-code AI Voice Engine</div>
        </div>
    </div>
);

export default function PhoneHero() {
    return (
        <section className="phone-hero-container">
            <PhoneGraphic />
            <h1 className="phone-hero-title">
                AUTOMATE PHONE CALLS<br />WITH HUMAN-LIKE AI REPS
            </h1>
            <p className="phone-hero-subtitle">
                Create Human-like AI voice agents to handle outbound and inbound calls, book meetings, and take actions 24/7.
            </p>
            <div className="stats-badges">
                <span className="badge">5X PRODUCTIVITY</span>
                <span className="badge">100X SCALIBILITY</span>
            </div>
            <button className="get-started-button">
                GET STARTED
            </button>
            <div className="trial-info">
                <span>✓ 14-day Free Trial</span>
                <span>✓ Free $10 Credit</span>
            </div>
        </section>
    );
}
