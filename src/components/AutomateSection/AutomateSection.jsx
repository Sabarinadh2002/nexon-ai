// src/components/AutomateSection/AutomateSection.jsx
import React from 'react';
import './AutomateSection.css';

// --- Icon Components ---
const SmsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const ZapierIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
);
const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.469L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 1.27 2.154-3.67 1.225 1.224-3.535.004.002z"></path></svg>
);
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const automationCardsData = [
    { icon: <SmsIcon />, text: "Send SMS messages to customers immediately during phone calls" },
    { icon: <PhoneIcon />, text: "Redirect or transfer calls to a live human agent" },
    { icon: <ZapierIcon />, text: "Collect customer data & automate actions using Zapier and Webhooks" },
    { icon: <EmailIcon />, text: "Send emails effortlessly during or after a call" },
    { icon: <WhatsAppIcon />, text: "Send WhatsApp messages to customers during phone calls" },
    { icon: <CalendarIcon />, text: "Schedule appointments and send calendar invites during the call" }
];

export default function AutomateSection() {
    return (
        <section className="automate-section-container">
            <div className="wavy-line">
                <svg width="2" height="120" viewBox="0 0 2 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V120" stroke="url(#paint0_linear_wavy)" strokeWidth="1.5" />
                    <defs>
                        <linearGradient id="paint0_linear_wavy" x1="1.5" y1="0" x2="1.5" y2="120" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white" stopOpacity="0"/>
                            <stop offset="0.5" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h2 className="automate-title">Automate Tasks & Actions</h2>
            <p className="automate-subtitle">Configure the AI Agents to automate a variety of tasks and actions, like:</p>
            <div className="automate-grid">
                {automationCardsData.map((card, index) => (
                    <div key={index} className="automate-card">
                        <div className="automate-card-icon">{card.icon}</div>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
