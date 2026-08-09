import React, { useState, useEffect, useRef } from 'react';
import ThreeHello from './ThreeHello';
import { TextScramble, ScrambleButtonText } from './ui/text-scramble';
import { Globe, Volume2, VolumeX } from 'lucide-react';
import bgMusic from '../assets/Glass_Office_Morning.mp3';

export default function HeroSection({ themeMode, setThemeMode }) {
  const [mouseCoords, setMouseCoords] = useState({ x: '0290', y: '0291' });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xStr = String(e.clientX).padStart(4, '0');
      const yStr = String(e.clientY).padStart(4, '0');
      setMouseCoords({ x: xStr, y: yStr });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch((err) => console.log('Audio autoplay prevented:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isDark = themeMode === 'dark';

  return (
    <section 
      id="hero"
      className={`relative w-full h-screen flex flex-col justify-between overflow-hidden select-none font-mono text-xs transition-colors duration-500 ${
        isDark 
          ? 'bg-[#050e2d] text-white' 
          : 'bg-[#cbe3f7] text-slate-900'
      }`}
    >
      {/* Background Audio Player */}
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />
      
      {/* Background Vector Grid & Light Beam */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className={`w-full h-full bg-[size:120px_120px] ${
          isDark 
            ? 'bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)]'
        }`} />
      </div>

      {/* Dark Theme Diagonal Spotlight Beam Overlay */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,#1d4ed840_0%,transparent_70%)]" />
      )}

      {/* 1. TOP HEADER & 3-COLUMN CONTENT GRID */}
      <div className="relative z-20 w-full px-6 sm:px-10 pt-6">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6">
          <button
            onClick={(e) => scrollToSection(e, 'hero')}
            className="font-bold text-sm sm:text-base tracking-widest uppercase font-mono hover:opacity-80 transition-opacity cursor-pointer text-left"
          >
            MANISH.DESIGN
          </button>

          {/* Right Navigation */}
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 tracking-wider font-semibold font-mono text-xs">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <ScrambleButtonText text="ABOUT" />
            </a>
            <a 
              href="#skills" 
              onClick={(e) => scrollToSection(e, 'skills')}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <ScrambleButtonText text="SKILLS" />
            </a>
            <a 
              href="#certifications" 
              onClick={(e) => scrollToSection(e, 'certifications')}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <ScrambleButtonText text="CERTIFICATES" />
            </a>
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <ScrambleButtonText text="PROJECTS" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <ScrambleButtonText text="CONTACT" />
            </a>
            <button 
              onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}
              className="hover:opacity-75 transition-opacity font-mono cursor-pointer"
            >
              THEME[{isDark ? 'A' : 'L'}]
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="hover:opacity-75 transition-opacity font-mono cursor-pointer flex items-center gap-1"
              title="Toggle background music: Glass Office Morning"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
              <span>SOUND[{soundEnabled ? 'ON' : 'OFF'}]</span>
            </button>
          </nav>
        </div>

        {/* 3-Column Sub-Header Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-current/10 font-mono">
          
          {/* Left Column */}
          <div>
            <p className="font-heading font-extrabold text-base sm:text-xl leading-tight uppercase tracking-tight font-mono">
              Web Developer &<br />AI Builder
            </p>
          </div>

          {/* Center Column */}
          <div className="text-current/90 font-mono leading-[1.65] text-xs sm:text-sm">
            <p>Thinking in systems.</p>
            <p>Designing with care.</p>
          </div>

          {/* Right Column (Bio Text) */}
          <div className="text-current/90 max-w-lg font-mono text-xs sm:text-sm leading-[1.65] tracking-normal font-normal">
            <p>
              I design and build modern, high-performance websites and intelligent AI applications. From premium 3D web experiences to real-world AI projects, I turn ideas into fast, interactive digital products.
            </p>
          </div>

        </div>

      </div>

      {/* 2. CENTERED 3D WEBGL "hello" CANVAS */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
        <ThreeHello themeMode={themeMode} />
      </div>

      {/* 3. MIDDLE OVERLAY HEADLINE */}
      <div className="relative z-20 px-6 sm:px-10 pointer-events-none mb-10 max-w-2xl">
        <TextScramble
          as="h1"
          duration={1.5}
          speed={0.03}
          trigger={true}
          className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase drop-shadow-sm font-mono text-current"
        >
          WEB DEVELOPER & AI BUILDER.
        </TextScramble>
      </div>

      {/* 4. SEAMLESS BOTTOM METADATA BAR (No harsh divider line) */}
      <footer className="relative z-20 w-full px-6 sm:px-10 py-4 flex items-center justify-between text-[11px] tracking-widest font-mono">
        <div>
          GMT+5:30 26°C
        </div>

        <div className="hidden sm:block font-mono">
          {mouseCoords.x} X {mouseCoords.y} Y
        </div>

        <div className="flex items-center gap-2 font-mono">
          <Globe className="w-4 h-4 opacity-90" />
        </div>
      </footer>

    </section>
  );
}
