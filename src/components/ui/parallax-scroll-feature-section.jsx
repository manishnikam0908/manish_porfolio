'use client';

import React from 'react';
import { ExternalLink, Sparkles, Layers } from 'lucide-react';
import FlowArt, { FlowSection } from './story-scroll';
import FoldText from './FoldText';
import { ScrambleButtonText } from './text-scramble';

import giftShopImg from '../../assets/giftshop_project_1.png';
import clothesImg from '../../assets/cloths_website_project_2.png';
import carImg from '../../assets/car_website_project_3.png';
import projectManagerImg from '../../assets/project_manager_project_4.png';
import coffeeImg from '../../assets/coffe_website_project_5.png';
import shoesImg from '../../assets/shose_website_project_6.png';

export function ParallaxScrollFeatureSection({ themeMode = 'light' }) {
  const isDark = themeMode === 'dark';

  const projects = [
    {
      id: 1,
      title: "GIFT SHOP E-COMMERCE",
      category: "FULL STACK & E-COMMERCE",
      description: "A premium online gift curation platform featuring customized gift bundles, real-time inventory tracking, smooth checkout flow, and reactive shopping animations.",
      tags: ["React", "Tailwind CSS", "Node.js", "Framer Motion"],
      imageUrl: giftShopImg,
      demoUrl: "https://gifts-bice.vercel.app/",
      bgColorDark: "#050e2d",
      bgColorLight: "#cbe3f7"
    },
    {
      id: 2,
      title: "URBAN CLOTHING STORE",
      category: "FASHION & APPAREL",
      description: "High-end street fashion web experience with dynamic filter systems, immersive product showcases, size configurators, and modern minimal aesthetics.",
      tags: ["React", "Tailwind CSS", "GSAP", "Vite"],
      imageUrl: clothesImg,
      demoUrl: "https://clothswebsite-lilac.vercel.app/",
      bgColorDark: "#091747",
      bgColorLight: "#bddef7"
    },
    {
      id: 3,
      title: "HYPERCAR SHOWROOM",
      category: "AUTOMOTIVE & 3D EXPERIENCE",
      description: "Interactive hypercar platform offering 360-degree vehicle customization, engine sound simulation, telemetry dashboards, and high-performance WebGL graphics.",
      tags: ["Three.js", "React", "WebGL", "Tailwind CSS"],
      imageUrl: carImg,
      demoUrl: "https://car-website-sage.vercel.app/",
      bgColorDark: "#0c1d57",
      bgColorLight: "#b1d8f7"
    },
    {
      id: 4,
      title: "PROJECT MANAGER SAAS",
      category: "AI & PRODUCTIVITY PLATFORM",
      description: "AI-assisted task management suite with drag-and-drop Kanban boards, team analytics, timeline views, and real-time collaboration tools.",
      tags: ["TypeScript", "React", "Tailwind CSS", "Lucide"],
      imageUrl: projectManagerImg,
      demoUrl: "https://project-manger-jgue.vercel.app/",
      bgColorDark: "#102366",
      bgColorLight: "#a6d3f7"
    },
    {
      id: 5,
      title: "ARTISANAL COFFEE HOUSE",
      category: "FOOD & HOSPITALITY",
      description: "Rich, tactile digital brand experience for a specialty coffee house with online ordering, bean roast selectors, and interactive menu stories.",
      tags: ["React", "Framer Motion", "Tailwind CSS"],
      imageUrl: coffeeImg,
      demoUrl: "https://coffestorecom-alpha.vercel.app/",
      bgColorDark: "#081640",
      bgColorLight: "#c3e1f7"
    },
    {
      id: 6,
      title: "NEXT-GEN SNEAKER STORE",
      category: "E-COMMERCE & LIMITED EDITIONS",
      description: "Interactive footwear marketplace featuring 3D product viewports, background removal photo tools, drop countdown timers, and seamless cart operations.",
      tags: ["React", "Python", "Tailwind CSS", "Three.js"],
      imageUrl: shoesImg,
      demoUrl: "https://shoose-store.vercel.app/",
      bgColorDark: "#061233",
      bgColorLight: "#d0e7f7"
    }
  ];

  return (
    <div id="projects" className="w-full relative">
      <FlowArt aria-label="Featured Projects Story Scroll">
        {projects.map((project) => {
          const currentBg = isDark ? project.bgColorDark : project.bgColorLight;

          return (
            <FlowSection
              key={project.id}
              aria-label={project.title}
              style={{ 
                backgroundColor: currentBg, 
                color: isDark ? '#ffffff' : '#0f172a' 
              }}
              className="font-mono transition-colors duration-500 border-t border-current/10"
            >
              {/* Architectural Grid Background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className={`w-full h-full ${
                  isDark 
                    ? 'bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]' 
                    : 'bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)]'
                } bg-[size:120px_120px]` } />
              </div>

              {/* 1. Header Bar */}
              <div className="relative z-20 flex items-center justify-between border-b border-current/10 pb-4 text-xs font-mono tracking-wider">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="font-bold uppercase tracking-widest">
                    PROJECT 0{project.id} — {project.category}
                  </span>
                </div>
                <span className="text-current/60 font-mono">
                  [0{project.id} / 06]
                </span>
              </div>

              {/* 2. Main Content Grid: Details + Large Plain Screenshot */}
              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6">
                
                {/* Left Side: 3D Unfold Title & Project Meta */}
                <div className="lg:col-span-5 flex flex-col space-y-6">
                  <FoldText
                    text={project.title}
                    splitBy="char"
                    hinge="top"
                    trigger="scroll"
                    duration={0.65}
                    stagger={0.045}
                    ease="power3.out"
                    perspective={700}
                    creaseShading={0.55}
                    fontSize="clamp(1.8rem, 3.5vw, 3rem)"
                    fontWeight={900}
                    color={isDark ? "#ffffff" : "#050e2d"}
                    className="font-heading font-black tracking-tight uppercase"
                  />

                  <p className="text-current/80 font-mono text-sm sm:text-base leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-3 py-1 text-xs font-mono rounded-md border ${
                          isDark
                            ? 'bg-slate-900/80 border-slate-700/80 text-cyan-300'
                            : 'bg-white/80 border-slate-300 text-slate-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
                        isDark
                          ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-cyan-400/25'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-600/25'
                      }`}
                    >
                      <ScrambleButtonText text="LIVE PREVIEW" />
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Plain Large Project Screenshot (No Border, No Radius) */}
                <div className="lg:col-span-7 flex justify-center items-center">
                  <div className="w-full max-w-3xl aspect-[16/10] overflow-hidden shadow-2xl">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top rounded-none"
                    />
                  </div>
                </div>

              </div>

              {/* 3. Section Footer */}
              <div className="relative z-20 flex items-center justify-between border-t border-current/10 pt-4 text-[11px] text-current/70 font-mono tracking-widest">
                <span>STORY SCROLL SYSTEM — 3D ROTATION</span>
                <span>[0{project.id} OF 06]</span>
              </div>

            </FlowSection>
          );
        })}
      </FlowArt>
    </div>
  );
}

export default ParallaxScrollFeatureSection;
