// src/components/FaqSection.jsx
import React, { useState } from 'react';
import './FaqSection.css';

const faqData = [
    {
        question: "Do I need to install anything?",
        answer: "No, our platform is a fully cloud-based solution. You can access it from any web browser without any installation required."
    },
    {
        question: "Can I use this for Sales Calls?",
        answer: "Absolutely. Our AI is designed to handle a wide variety of sales scenarios, from lead qualification to appointment setting."
    },
    {
        question: "Will this be a good fit for my Ecommerce?",
        answer: "Yes, it's a perfect fit. The AI can handle order tracking, product questions, and customer support, freeing up your team to focus on growth."
    },
    {
        question: "Can I use this for my local business?",
        answer: "Definitely. Our system is ideal for local businesses, managing everything from booking appointments to answering common customer inquiries 24/7."
    }
];

function FaqItem({ faq, index, toggleFAQ }) {
    return (
        <div
            className={`faq-item ${faq.open ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
        >
            <div className="faq-question">
                {faq.question}
                <div className="faq-icon">{'>'}</div>
            </div>
            <div className="faq-answer">
                {faq.answer}
            </div>
        </div>
    );
}

export default function FaqSection() {
    const [faqs, setFaqs] = useState(
        faqData.map(item => ({ ...item, open: false }))
    );

    // --- THIS FUNCTION IS NOW CORRECTED ---
    const toggleFAQ = index => {
        setFaqs(currentFaqs => 
            currentFaqs.map((faq, i) => {
                if (i === index) {
                    // Create a new object for the clicked item
                    return { ...faq, open: !faq.open };
                } else {
                    // Create a new object and ensure it's closed
                    return { ...faq, open: false };
                }
            })
        );
    };

    return (
        <section className="faq-container">
            <div className="faq-header">
                <h2>FAQ</h2>
                <p>Not convinced yet?</p>
                <p>Send any questions to <a href="mailto:nexon@ai.ai">nexon@ai</a></p>
            </div>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        index={index}
                        toggleFAQ={toggleFAQ}
                    />
                ))}
            </div>
        </section>
    );
}
