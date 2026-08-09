import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import InteractiveTechStackBuilder from './ui/interactive-tech-stack-builder';

export default function SkillsSection({ themeMode = 'light' }) {
  const isDark = themeMode === 'dark';

  return (
    <section 
      id="skills"
      className={`relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none font-mono transition-colors duration-500 ${
        isDark 
          ? 'bg-[#050e2d] text-white' 
          : 'bg-[#cbe3f7] text-slate-900'
      }`}
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`w-full h-full ${
          isDark 
            ? 'bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)]'
        } bg-[size:120px_120px]` } />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-20 w-full px-6 sm:px-12 pt-16 pb-6 border-b border-current/10">
        <div className="flex items-center justify-between font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="font-bold uppercase tracking-widest text-sm sm:text-base">
              SKILLS & TECH STACK BUILDER
            </span>
          </div>
          <span className="text-current/60 font-mono hidden sm:inline">
            [INTERACTIVE 3D LEGO STACK]
          </span>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
            TECHNICAL SKILLS & <br />
            <span className={isDark ? "text-cyan-400" : "text-indigo-600"}>
              TOOLKIT BUILDER
            </span>
          </h2>

          <p className="max-w-md text-current/70 text-xs sm:text-sm leading-relaxed">
            Click on any tech stack block below to dynamically build Manish's developer profile tower with custom arc animations.
          </p>
        </div>
      </div>

      {/* Interactive Tech Stack Builder Component */}
      <div className="relative z-20 w-full my-auto">
        <InteractiveTechStackBuilder isDark={isDark} />
      </div>

      {/* Section Footer */}
      <footer className="relative z-20 w-full px-6 sm:px-12 py-4 border-t border-current/10 flex items-center justify-between text-[11px] text-current/70 font-mono tracking-widest">
        <span>INTERACTIVE LEGO STACK SYSTEM</span>
        <div className="flex items-center gap-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FULL STACK & AI TOOLKIT</span>
        </div>
      </footer>
    </section>
  );
}
