import React, { useState, useEffect, useRef } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import BlurText from './ui/BlurText';
import PixelCursorTrail from './ui/pixel-trail';
import aboutImage from '../assets/about-image.png';

export default function WorkSection({ themeMode = 'light' }) {
  const isDark = themeMode === 'dark';
  const sectionRef = useRef(null);
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const rows = [0, 1, 2, 3, 4, 5];
  const cols = [0, 1, 2, 3, 4];

  return (
    <section 
      id="about"
      ref={sectionRef}
      onMouseEnter={() => setIsSectionActive(true)}
      className={`relative w-full min-h-screen select-none transition-colors duration-500 overflow-hidden font-mono ${
        isDark 
          ? 'bg-[#050e2d] text-white' 
          : 'bg-[#cbe3f7] text-slate-900'
      }`}
    >
      {/* Anchor for #work navigation */}
      <div id="work" className="absolute top-0 left-0" />
      {/* 1. Continuous Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className={`w-full h-full ${
          isDark ? 'architectural-grid-dark' : 'architectural-grid-light'
        }`} />
      </div>

      {/* 2. SVG Crosshair (+) Markers at Grid Intersections */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {rows.map((rIdx) => (
          <div key={`row-${rIdx}`} className="w-full flex justify-between px-6 sm:px-12" style={{ top: `${rIdx * 240}px`, position: 'absolute', left: 0, right: 0 }}>
            {cols.map((cIdx) => (
              <div key={`col-${rIdx}-${cIdx}`} className="relative flex items-center justify-center">
                <Plus className={`w-3.5 h-3.5 opacity-60 stroke-[1.5] ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 3. Section Content Container */}
      <div className="relative z-20 w-full min-h-screen px-6 sm:px-12 py-16 flex flex-col justify-between">
        
        {/* Top Section Header Bar */}
        <div className="flex items-center justify-between border-b border-current/10 pb-4 font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold uppercase tracking-widest">
              ABOUT & PHILOSOPHY
            </span>
          </div>
          <span className="text-current/60 font-mono">
            [2024 — 2026]
          </span>
        </div>

        {/* Main Grid: Avatar + 𝓶.𝓷𝓲𝓴𝓪𝓶 Cursive Signature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto py-12">
          
          {/* Left Side: Avatar + Neon 𝓶.𝓷𝓲𝓴𝓪𝓶 Signature */}
          <div className="lg:col-span-5 flex justify-start pl-2 sm:pl-6 lg:pl-10">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px]">
              {/* Neon Green Signature overlay matching 𝓶.𝓷𝓲𝓴𝓪𝓶 */}
              <span className="absolute -top-5 -left-4 z-20 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wider text-[#ccff00] transform -rotate-12 select-none pointer-events-none">
                𝓶.𝓷𝓲𝓴𝓪𝓶
              </span>

              {/* Square Image Container */}
              <div className="w-full h-full overflow-hidden shadow-2xl border border-current/20 bg-slate-900/10">
                <img 
                  src={aboutImage} 
                  alt="𝓶.𝓷𝓲𝓴𝓪𝓶" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Side: High-Impact JetBrains Mono BlurText Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Top Large Headline */}
            <div className="font-mono font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.15]">
              <BlurText
                text="Building modern websites with code & AI."
                delay={100}
                animateBy="words"
                direction="top"
                className="font-mono font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.15]"
              />
            </div>

            {/* Bottom Secondary Paragraph */}
            <div className={`font-mono text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-[1.55] tracking-tight transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <BlurText
                text="Crafting premium digital experiences. Passionate Computer Engineering student crafting modern websites, immersive UI, and premium web experiences with code, creativity, and AI."
                delay={130}
                animateBy="words"
                direction="bottom"
                stepDuration={0.35}
                className="font-mono text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-[1.55]"
              />
            </div>

          </div>

        </div>

        {/* Section Footer */}
        <div className="flex items-center justify-between border-t border-current/10 pt-4 text-[11px] text-current/70 font-mono tracking-widest">
          <span>ARCHITECTURAL GRID SYSTEM</span>
          <span>CONTINUOUS SCROLL</span>
        </div>

      </div>

    </section>
  );
}
