import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import ParallaxScrollFeatureSection from './components/ui/parallax-scroll-feature-section';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import PixelCursorTrail from './components/ui/pixel-trail';

export default function App() {
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'dark'

  return (
    <main className={`w-full min-h-screen overflow-y-auto scroll-smooth ${themeMode === 'dark' ? 'text-white font-mono bg-[#050e2d]' : 'text-slate-900 font-mono bg-[#cbe3f7]'}`}>
      <PixelCursorTrail active={true} />
      <HeroSection themeMode={themeMode} setThemeMode={setThemeMode} />
      <WorkSection themeMode={themeMode} />
      <SkillsSection themeMode={themeMode} />
      <CertificationsSection themeMode={themeMode} />
      <ParallaxScrollFeatureSection themeMode={themeMode} />
      <ContactSection themeMode={themeMode} />
    </main>
  );
}
