// src/components/Pricing/Pricing.jsx
import React, { useState } from 'react';
import './Pricing.css';

// A detailed data structure for all pricing plans
const plans = [
  {
    name: 'Essential',
    monthlyPrice: 14.95,
    annualPrice: 12.95,
    trialDays: 30,
    isPopular: false,
    features: [
      { text: '2 charts per tab', included: true },
      { text: '5 indicators per chart', included: true },
      { text: '10k historical bars', included: true },
      { text: '10 parallel chart connections', included: true },
      { text: '20 price alerts', included: true },
      { text: '0 watchlist alerts', included: false },
      // ... more features can be added here
    ]
  },
  {
    name: 'Plus',
    monthlyPrice: 33.95,
    annualPrice: 29.95,
    trialDays: 30,
    isPopular: false,
    features: [
      { text: '4 charts per tab', included: true },
      { text: '10 indicators per chart', included: true },
      { text: '10k historical bars', included: true },
      { text: '20 parallel chart connections', included: true },
      { text: '100 price alerts', included: true },
      { text: '0 watchlist alerts', included: false },
       // ... more features can be added here
    ]
  },
  {
    name: 'Premium',
    monthlyPrice: 67.95,
    annualPrice: 59.95,
    trialDays: 30,
    isPopular: true,
    features: [
      { text: '8 charts per tab', included: true },
      { text: '25 indicators per chart', included: true },
      { text: '20k historical bars', included: true },
      { text: '50 parallel chart connections', included: true },
      { text: '400 price alerts', included: true },
      { text: '2 watchlist alerts', included: true },
       // ... more features can be added here
    ]
  },
  {
    name: 'Ultimate',
    monthlyPrice: 239.95,
    annualPrice: 199.95,
    trialDays: 7,
    isPopular: false,
    features: [
      { text: '16 charts per tab', included: true },
      { text: '50 indicators per chart', included: true },
      { text: '40k historical bars', included: true },
      { text: '200 parallel chart connections', included: true },
      { text: '1,000 price alerts', included: true },
      { text: '15 watchlist alerts', included: true },
       // ... more features can be added here
    ]
  }
];

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section className="pricing-section">
            
            <div className="pricing-header">
                <h1>Plans for every level of ambition</h1>
                <div className="billing-toggle">
                    <button 
                        className={billingCycle === 'monthly' ? 'active' : ''}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                    <button 
                        className={billingCycle === 'annually' ? 'active' : ''}
                        onClick={() => setBillingCycle('annually')}
                    >
                        Annually
                    </button>
                    <span className="save-badge">Save up to 17%</span>
                </div>
            </div>

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <div key={index} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                        <div className="card-header">
                            <h3>{plan.name}</h3>
                            <div className="price">
                                <span className="price-currency">£</span>
                                <span className="price-amount">
                                    {billingCycle === 'monthly' ? plan.monthlyPrice.toFixed(2) : plan.annualPrice.toFixed(2)}
                                </span>
                                <span className="price-period">/mo</span>
                            </div>
                            <p className="billing-info">billed {billingCycle}</p>
                        </div>
                        <div className="card-body">
                            <button className="try-button">Try free for {plan.trialDays} days</button>
                            <a href="#" className="pay-link">
                                {plan.name === 'Ultimate' ? 'or get in touch for enterprise solutions' : 'or skip trial and pay now'}
                            </a>
                            <ul className="features-list">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className={feature.included ? 'included' : 'excluded'}>
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer">
                             <button className="try-button">Try free for {plan.trialDays} days</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="pricing-footer">
                <p>
                    Learn more about plans for professionals <a href="#">ⓘ</a>
                </p>
                <p className="disclaimer">
                    Nexon, Inc. is registered for sales tax purposes in certain countries. As a result, depending on your location, a sales tax could be added to your final bill. ⓘ
                </p>
            </div>
        </section>
    );
}
