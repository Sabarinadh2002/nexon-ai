// src/components/FlexibleCover/FlexibleCover.jsx
import React from 'react';
import './FlexibleCover.css';

const coverData = [
    {
        icon: '✱',
        title: 'Full-time (24/7)',
        description: 'First point of contact. Answering and managing every call instantly. With the option to hand over live calls to the clinic if needed.'
    },
    {
        icon: '☾',
        title: 'After hours + Busy periods',
        description: "Only answer when your team can't. Whether it's because a patient in the clinic needs looking after or because you don't have cover for the day."
    }
];

export default function FlexibleCover() {
    return (
        <div className="cover-wrapper">
            <div className="flexible-cover-container">
                <div className="cover-header">
                    <h2>Flexible cover</h2>
                    <p>Made to collaborate with your admin team and workflows - not work against them. Choose what works best for you</p>
                </div>
                <div className="flexible-cards-grid">
                    {coverData.map((card, index) => (
                        <div key={index} className="cover-card">
                            <div className="cover-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
