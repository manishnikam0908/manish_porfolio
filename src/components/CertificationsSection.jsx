import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import InfiniteGallery from './ui/3d-gallery-photography';

import cppCert from '../assets/certificates/C++.png';
import outskillCert from '../assets/certificates/Certificate_outskill.png';
import dbmsCert from '../assets/certificates/DBMS.png';
import javaCert from '../assets/certificates/JAVA.png';
import sqlCert from '../assets/certificates/SQL.png';
import techshalaCert from '../assets/certificates/TechShala-Certificate-Manish-Nikam-Industrial-Hackathon-2026.png';

export default function CertificationsSection({ themeMode = 'light' }) {
  const isDark = themeMode === 'dark';

  const certImages = [
    { src: techshalaCert, alt: 'TechShala Industrial Hackathon 2026 Certificate' },
    { src: cppCert, alt: 'C++ Certification' },
    { src: outskillCert, alt: 'Outskill Full Stack Certificate' },
    { src: javaCert, alt: 'Java Programming Certification' },
    { src: dbmsCert, alt: 'Database Management Systems (DBMS) Certificate' },
    { src: sqlCert, alt: 'SQL & Database Architecture Certificate' },
  ];

  return (
    <section 
      id="certifications"
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

      {/* Header Bar */}
      <div className="relative z-20 w-full px-6 sm:px-12 pt-16 pb-6 border-b border-current/10">
        <div className="flex items-center justify-between font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="font-bold uppercase tracking-widest text-sm sm:text-base">
              CERTIFICATIONS & ACCOMPLISHMENTS
            </span>
          </div>
          <span className="text-current/60 font-mono hidden sm:inline">
            [06 VERIFIED CERTIFICATES]
          </span>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
            3D CERTIFICATE <br />
            <span className={isDark ? "text-cyan-400" : "text-indigo-600"}>
              INFINITE GALLERY
            </span>
          </h2>

          <p className="max-w-md text-current/70 text-xs sm:text-sm leading-relaxed">
            Scroll or use arrow keys to navigate through verified credentials, hackathon wins, and technical certifications in 3D WebGL space.
          </p>
        </div>
      </div>

      {/* 3D Infinite Canvas Gallery Container */}
      <div className="relative z-20 w-full h-[65vh] sm:h-[70vh] flex items-center justify-center">
        <InfiniteGallery
          images={certImages}
          speed={1.2}
          visibleCount={12}
          className="w-full h-full overflow-hidden"
        />

        {/* Floating Instruction Overlay */}
        <div className="absolute bottom-6 left-0 right-0 pointer-events-none text-center font-mono uppercase text-[11px] font-semibold tracking-widest z-30 opacity-80">
          <p className="px-4 py-1.5 inline-block rounded-full bg-black/60 text-cyan-300 backdrop-blur-md border border-white/10 shadow-lg">
            Hover to wave • Scroll / Arrow keys to navigate in 3D depth
          </p>
        </div>
      </div>

      {/* Section Footer */}
      <footer className="relative z-20 w-full px-6 sm:px-12 py-4 border-t border-current/10 flex items-center justify-between text-[11px] text-current/70 font-mono tracking-widest">
        <span>THREE.JS WEBGL CANVAS</span>
        <div className="flex items-center gap-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>VERIFIED CREDENTIALS</span>
        </div>
      </footer>
    </section>
  );
}
