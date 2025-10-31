// src/App.jsx
import React from 'react';

// Import all your components using the aliases we set up
import SpaceBackground from '@components/SpaceBackground.jsx';
import Navbar from '@components/Navbar/Navbar.jsx';
import Hero from '@components/Hero/Hero.jsx';
import Pricing from '@components/Pricing/Pricing.jsx';
import VideoPlayer from '@components/VideoPlayer/VideoPlayer.jsx';
import DemoSection from '@components/DemoSection/DemoSection.jsx'; // <-- IMPORT NEW COMPONENT
import './App.css';

// --- NEW: A simple component for the main title ---
function MainHero() {
  return (
    <div style={{
      color: 'white',
      textAlign: 'center',
      paddingTop: '8rem', // Pushes content below the navbar
      paddingBottom: '3rem',
    }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '3.5rem', marginBottom: '0.5rem' }}>AI Agent</h1>
      <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>Welcome on board</p>
    </div>
  );
}

function App() {
  const youtubeVideoId = '16y1AkoZkmQ'; 

  return (
    <>
      <SpaceBackground />
      <Navbar />
      
      <main style={{ position: 'relative', zIndex: 1, padding: '0 2rem' }}>
        
        {/* --- Section 1: Main Title --- */}
        <MainHero />
        
        {/* --- Section 2: YouTube Video --- */}
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto 5rem auto' }}>
          <VideoPlayer embedId={youtubeVideoId} />
        </div>
        
        {/* --- Section 3 & 4: Deployments and Pricing --- */}
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Hero /> {/* This is the "Deployments made easy" section */}
          <DemoSection />
          <Pricing />
          
        </div>

        {/* Extra space at the bottom to allow for more scrolling */}
        <div style={{ height: '50vh' }}></div>

      </main>
    </>
  );
}

export default App;
