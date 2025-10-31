// src/components/DemoSection/DemoSection.jsx
import React from 'react';
import './DemoSection.css';

const demoCardsData = [
  {
    icon: '🐾',
    title: 'Pawstead Veterinary AI Receptionist',
    description: 'Better care starts with faster support. Pawstead’s AI Receptionist makes it simple for pet owners to schedule appointments, get treatment information, and access aftercare guidance—instantly, anytime, without the wait.',
    ctaText: 'Need help booking your pet’s appointment? Call our AI demo now to see how quickly you can schedule visits and get answers for your furry friend.'
  },
  {
    icon: '🦷',
    title: 'Harmony dental AI Assistant',
    description: 'Enjoy seamless service with our Dental AI Assistant. Instantly manage appointments, get answers to your questions, and receive personalized dental care recommendations—available 24/7 to support you.',
    ctaText: 'Need to manage a dental appointment? Call our AI demo to get advice, cancel, reschedule, or check bookings instantly.'
  },
  {
    icon: '✨',
    title: 'Lumira Plastic Surgery AI receptionist',
    description: 'The Lumira Plastics AI Assistant allows you to schedule consultations in seconds, explore detailed information about treatments like rhinoplasty, facelifts, and body contouring, and get instant answers—anytime, with seamless AI support.',
    ctaText: 'Thinking about rhinoplasty or a facelift? Call our AI demo now to see how easy it is to get expert answers and book consultations instantly.'
  },
  {
    icon: '🛍️',
    title: 'SkinClear E-commerce AI Assistant',
    description: 'Enjoy seamless shopping with SkinClear’s AI Assistant. Instantly track your orders, get answers to your questions, and discover personalized skincare recommendations—available 24/7 to support you at every step.',
    ctaText: 'Curious about skincare or a recent order? Call our AI demo now to see how easily you can get expert recommendations and track your orders instantly.'
  }
];

export default function DemoSection() {
    return (
        <section className="demo-section-container">
            <div className="demo-content-wrapper">
                <div className="demo-header">
                    <h2 className="demo-title">Try Demo</h2>
                </div>
                <div className="demo-grid">
                    {demoCardsData.map((card, index) => (
                        <div key={index} className="demo-card">
                            <div className="card-top">
                                <h3><span className="card-icon">{card.icon}</span> {card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                            <div className="card-bottom">
                                <div className="cta-box">
                                    <p>{card.ctaText}</p>
                                    <div className="cta-button-demo">
                                        Call the AI Demo Now
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
