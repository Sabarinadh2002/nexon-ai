// src/pages/FeaturesPage/FeaturesPage.jsx
import React from 'react';
import './FeaturesPage.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';

import calender from '../../assets/calender.png';
import call from '../../assets/call.png'; // Add your other images here
import config from '../../assets/config.png';

const mainFeaturesData = [
    {
        icon: "📊",
        title: "Notifications & Analytics",
        imageUrl: calender, // You'll add your actual images here
        isExpanded: true
        
    },
    {
        icon: "🔍",
        title: "Audit AI actions",
        imageUrl: config,
        isExpanded: false
        
    },
    {
        icon: "🎙️",
        title: "Conversations recordings",
        imageUrl: call,
        isExpanded: false
        
    }
];

const additionalFeaturesData = [
    {
        icon: "🎯",
        title: "Instruct AI",
        description: "Teach the AI assistant in plain English"
    },
    {
        icon: "📚",
        title: "Knowledge Base",
        description: "Add clinic-specific FAQs to your knowledge base"
    },
    {
        icon: "🔄",
        title: "Sync Clinic Changes",
        description: "Sync updates from your PMS / EHR instantly"
    }
];

export default function FeaturesPage() {
    return (
        <div className="features-page-wrapper">
            <Navbar />
            
            <main className="features-page-main">
                {/* Hero Section */}
                <section className="features-hero-section">
                    <h1>Transparency and control</h1>
                    <p>
                        Chasing reports from your call centres? Battling AI software to actually work for you? 
                        <span className="highlight"> Stop the guess work, use Nexon</span>
                    </p>
                </section>

                {/* Main Features Grid */}
                <section className="main-features-section">
                    <div className="main-features-grid">
                        {mainFeaturesData.map((feature, index) => (
                            <div key={index} className={`main-feature-card ${feature.isExpanded ? 'expanded' : ''}`}>
                                <div className="feature-card-header">
                                    <span className="feature-icon">{feature.icon}</span>
                                    <h3>{feature.title}</h3>
                                </div>
                                <div className="feature-card-content">
                                    <div className="feature-card-image">
                                        <img src={feature.imageUrl} alt={feature.title} loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Additional Features Section */}
                <section className="additional-features-section">
                    <div className="additional-features-grid">
                        {additionalFeaturesData.map((feature, index) => (
                            <div key={index} className="additional-feature-card">
                                <span className="additional-feature-icon">{feature.icon}</span>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
