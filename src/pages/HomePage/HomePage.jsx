// src/pages/HomePage/HomePage.jsx
import React from 'react';

// Corrected relative paths from the pages directory
import SpaceBackground from '../../components/SpaceBackground.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PhoneHero from '../../components/PhoneHero/PhoneHero.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import Pricing from '../../components/Pricing/Pricing.jsx';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer.jsx';
import DemoSection from '../../components/DemoSection/DemoSection.jsx';
import AutomateSection from '../../components/AutomateSection/AutomateSection.jsx';
import FaqSection from '../../components/FaqSection/FaqSection.jsx';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx';
import FlexibleCover from '../../components/FlexibleCover/FlexibleCover.jsx';
import Footer from '../../components/footer/Footer.jsx';
import DiveInSection from '../../components/DiveInSection/DiveInSection.jsx';

export default function HomePage() {
  const youtubeVideoId = '16y1AkoZkmQ'; 

  return (
    <>
      <SpaceBackground />
      <Navbar />
      
      <main style={{ position: 'relative', zIndex: 1, padding: '0 2rem' }}>
        <PhoneHero />
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto 5rem auto' }}>
          <VideoPlayer embedId={youtubeVideoId} />
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '0 2rem' }}>
          <Hero />
          
          <DemoSection />
          <DiveInSection />
          <div id="features-section">
            <AutomateSection />
          </div>
          <FlexibleCover />
          <Pricing />
          
        </div>
        <SectionWrapper>
          <FaqSection />
        </SectionWrapper>
        
      </main>
      <Footer />
    </>
  );
}
