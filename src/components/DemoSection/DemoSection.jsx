// src/components/DemoSection/DemoSection.jsx
import React from 'react';
import './DemoSection.css';

// Import your images here
import webDesignImage from '../../assets/call.png';
import graphicDesignImage from '../../assets/calender.png';
import lumiraImage from '../../assets/config.png';
import skinClearImage from '../../assets/call.png';

const demoCardsData = [
    {
        number: "01",
        title: 'Pawstead Veterinary AI Receptionist',
        description: 'Better care starts with faster support. Pawstead’s AI Receptionist makes it simple for pet owners to schedule appointments, get treatment information, and access aftercare guidance—instantly, anytime, without the wait.',
        imageUrl: webDesignImage,
    },
    {
        number: "02",
        title: 'Harmony dental AI Assistant',
        description: 'Enjoy seamless service with our Dental AI Assistant. Instantly manage appointments, get answers to your questions, and receive personalized dental care recommendations—available 24/7 to support you.',
        imageUrl: graphicDesignImage,
    },
    {
        number: "03",
        title: 'Lumira Plastic Surgery AI receptionist',
        description: 'The Lumira Plastics AI Assistant allows you to schedule consultations in seconds, explore detailed information about treatments like rhinoplasty, facelifts, and body contouring, and get instant answers—anytime, with seamless AI support.',
        imageUrl: lumiraImage,
    },
    {
        number: "04",
        title: 'SkinClear E-commerce AI Assistant',
        description: 'Enjoy seamless shopping with SkinClear’s AI Assistant. Instantly track your orders, get answers to your questions, and discover personalized skincare recommendations—available 24/7 to support you at every step.',
        imageUrl: skinClearImage,
    }
];

export default function DemoSection() {
    return (
        <section className="new-demo-section">
            <h2 className="new-demo-header">Try Our Demos</h2>
            <div className="new-demo-grid">
                {demoCardsData.map((card, index) => (
                    <div key={index} className="demo-card">
                        <div className="demo-card-content">
                            <div className="demo-card-number">{card.number}</div>
                            <h3 className="demo-card-title">{card.title}</h3>
                            <p className="demo-card-description">{card.description}</p>
                        </div>
                        <div className="demo-card-image-container">
                            <img src={card.imageUrl} alt={card.title} className="demo-card-image" />
                        </div>
                        <div className="demo-card-cta">
                            <button className="call-now-button">Call Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
