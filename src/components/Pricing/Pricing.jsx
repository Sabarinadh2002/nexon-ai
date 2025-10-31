// src/components/Pricing/Pricing.jsx
import React from 'react';
import './Pricing.css';

const pricingPlans = [
    { title: 'Hobby', price: '99', features: ['Access to basic analytics', 'Up to 10,000 data points', 'Email support', 'Cancel anytime'] },
    { title: 'Starter', price: '299', features: ['Advanced analytics', 'Customizable reports', 'Real-time data tracking', 'Everything in Hobby'], featured: true },
    { title: 'Pro', price: '1490', features: ['Unlimited data storage', 'AI-powered insights', 'Advanced data segmentation', 'Everything in Starter'] }
];

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default function Pricing() {
    return (
        <div className="pricing-section">
            <div className="pricing-grid">
                {pricingPlans.map((plan, index) => (
                    <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                        <div className="card-content">
                            <div className="plan-header">
                               <h3>{plan.title}</h3>
                                {plan.featured && <span className="featured-badge">Featured</span>}
                            </div>
                            <div className="plan-price">
                                <sup>$</sup>{plan.price}<sub>/month</sub>
                            </div>
                            <button className="get-started-btn">Get {plan.title}</button>
                            <ul className="features-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}><CheckIcon /> {feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
