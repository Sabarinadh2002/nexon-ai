import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Logo = () => (
  <img src="/logo.svg" alt="Logo" className="navbar-svg-logo" height={32} />
);

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Configurable thresholds for each stage
  const stage2Scroll = 10;    // when fading in starts
  const stage3Scroll = 48;   // when fully opaque at 30% width
  const stage4Scroll = 48;   // start expanding at full opacity
  const stage5Scroll = 130;  // when navbar reaches full width

  // Stage 1: Completely hidden (at top)
  if (scrollY < stage2Scroll) {
    return null;
  }

  // Stage 2: Fade in from transparent to opaque (width locked at 30%)
  if (scrollY >= stage2Scroll && scrollY < stage3Scroll) {
    const opacity = (scrollY - stage2Scroll) / (stage3Scroll - stage2Scroll);
    return (
      <div
        className="navbar-container"
        style={{
          width: '20%',
          opacity,
          transition: 'opacity 0.35s, width 0.35s'
        }}
      >
        <nav className="navbar">
          <div className="navbar-left">
            {/* <img src="public\Logo.svg" alt="Logo" className="navbar-svg-logo" height={32} /> */}
          </div>
          <div className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#pricing">Demo</a>
                    <a href="#contact">Pricing</a>
                </div>
          <div className="navbar-right">
            {/* <a href="/login" className="login-link">Contact</a> */}
          </div>
        </nav>
      </div>
    );
  }

  // Stage 3/4/5: Opaque, width expands from 30% to 100%
  // Calculates percentage width based on |stage4Scroll, stage5Scroll|
  let width = '20%';
  if (scrollY >= stage4Scroll && scrollY < stage5Scroll) {
    const expandRatio = (scrollY - stage4Scroll) / (stage5Scroll - stage4Scroll);
    width = `${30 + (100 - 30) * expandRatio}%`;
  } else if (scrollY >= stage5Scroll) {
    width = '100%';
  }

  return (
    <div
      className="navbar-container"
      style={{
        width,
        opacity: 1,
        transition: 'width 0.5s cubic-bezier(.47,1.64,.41,.8), opacity 0.35s'
      }}
    >
        <nav className="navbar">
          <div className="navbar-left">
            <img src="public\Logo.svg" alt="Logo" className="navbar-svg-logo" height={32} />
          </div>
          <div className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#pricing">Demo</a>
                    <a href="#contact">Pricing</a>
                </div>
          <div className="navbar-right">
            <a href="/login" className="login-link">Contact</a>
          </div>
        </nav>
    </div>
  );
}
