// src/components/SectionWrapper.jsx
import React from 'react';
import './SectionWrapper.css';

export default function SectionWrapper({ children }) {
    return (
        <div className="section-wrapper">
            {children}
        </div>
    );
}
