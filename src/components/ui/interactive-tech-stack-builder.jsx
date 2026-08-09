"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation, useMotionValue, useMotionTemplate } from "framer-motion";
import { Code, Terminal, Database, Layout, Server, Cpu, GitBranch, Cloud, User, CheckCircle2 } from "lucide-react";

const IconUser = ({ className, size }) => (
  <User size={size || 24} className={className} />
);

const GRID_CONSTANTS = {
  STUD_WIDTH: 65,
  ROW_HEIGHT: 80,
  MAX_ROWS: 25,
  COLS: 6,
  APEX_HEIGHT: 150
};

const STUD_THEMES = {
  green: {
    wall: "linear-gradient(90deg, #087028 0%, #10923b 20%, #1ab84d 38%, #20cc55 50%, #1ab84d 62%, #10923b 80%, #087028 100%)",
    cap: "linear-gradient(135deg, #42f585 0%, #25dd62 40%, #18c04e 70%, #10a040 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,40,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  dark: {
    wall: "linear-gradient(90deg, #09090b 0%, #18181b 20%, #27272a 38%, #3f3f46 50%, #27272a 62%, #18181b 80%, #09090b 100%)",
    cap: "linear-gradient(135deg, #52525b 0%, #3f3f46 40%, #27272a 70%, #18181b 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.2)",
  },
  yellow: {
    wall: "linear-gradient(90deg, #a16207 0%, #ca8a04 20%, #eab308 38%, #facc15 50%, #eab308 62%, #ca8a04 80%, #a16207 100%)",
    cap: "linear-gradient(135deg, #fef08a 0%, #fde047 40%, #eab308 70%, #ca8a04 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,50,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  blue: {
    wall: "linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 20%, #2563eb 38%, #3b82f6 50%, #2563eb 62%, #1d4ed8 80%, #1e3a8a 100%)",
    cap: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 40%, #3b82f6 70%, #2563eb 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,80,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  red: {
    wall: "linear-gradient(90deg, #7f1d1d 0%, #b91c1c 20%, #dc2626 38%, #ef4444 50%, #dc2626 62%, #b91c1c 80%, #7f1d1d 100%)",
    cap: "linear-gradient(135deg, #fca5a5 0%, #f87171 40%, #ef4444 70%, #dc2626 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,0,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  purple: {
    wall: "linear-gradient(90deg, #581c87 0%, #7e22ce 20%, #9333ea 38%, #a855f7 50%, #9333ea 62%, #7e22ce 80%, #581c87 100%)",
    cap: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 40%, #a855f7 70%, #9333ea 100%)",
    shadow: "radial-gradient(ellipse, rgba(50,0,80,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  }
};

const LegoStud = ({ color = "green", yOffset = 0 }) => {
  const t = STUD_THEMES[color] || STUD_THEMES.green;
  const studHeight = 16;
  const studWidth = 72; 
  const studCapHeight = 16;
  
  return (
    <div className="flex-1 flex items-end justify-center relative" style={{ transform: `translateY(${yOffset}px)` }}>
      <div
        className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[75%] rounded-[50%] z-0"
        style={{ height: "10px", background: t.shadow }}
      />
      
      <div className="relative z-10" style={{ width: `${studWidth}%`, maxWidth: "42px", marginBottom: "-1px" }}>
        <div
          className="w-full relative overflow-hidden"
          style={{ height: `${studHeight}px`, borderRadius: "50% / 20%", background: t.wall }}
        >
          <div
            className="absolute top-0 h-full w-[25%] left-[20%]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)" }}
          />
        </div>
        
        <div
          className="absolute left-0 w-full rounded-[50%] flex items-center justify-center overflow-hidden"
          style={{
            top: `-${studCapHeight / 2}px`, 
            height: `${studCapHeight}px`, 
            background: t.cap,
            boxShadow: `inset 0px 2px 4px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.4)`,
            borderTop: `1px solid ${t.rim}`,
          }}
        >
          <span className="text-[10px] font-black tracking-widest select-none pointer-events-none opacity-80" style={{
            color: "rgba(0,0,0,0.15)",
            textShadow: "0px 1px 0px rgba(255,255,255,0.6)",
            transform: "scaleY(0.55) translateY(-1px)", 
          }}>
            DEV
          </span>
        </div>
      </div>
    </div>
  );
};

const LegoBlock = ({
  mouseX, mouseY,
  topColor, faceGradient, bottomColor,
  topHeight = 19, bottomHeight = 15,
  roundedTop = false, roundedBottom = false,
  className = "",
  children, studs = 0, studColor = "green", hideStuds = false,
  studYOffset = 12,
}) => {
  const topDarkenEnd = 100;
  const topShadow = "inset 0px 0px 4px rgba(0,0,0,0.28)";
  const faceShadow = "inset 0px 2px 6px rgba(255,255,255,0.47)";

  const highlightBg = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.25), transparent)`;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full"
        style={{
          height: `${topHeight}px`,
          background: `linear-gradient(to bottom, ${topColor}, color-mix(in srgb, ${topColor} ${topDarkenEnd}%, black))`,
          boxShadow: topShadow,
          borderRadius: roundedTop ? "4px 4px 0 0" : "0",
        }}
      >
        {studs > 0 && (
          <div className="absolute bottom-full left-0 w-full flex">
            {[...Array(studs)].map((_, i) => {
              const isHidden = Array.isArray(hideStuds) ? hideStuds.includes(i) : hideStuds;
              return isHidden ? (
                <div key={i} className="flex-1" />
              ) : (
                <LegoStud key={i} color={studColor} yOffset={studYOffset} />
              );
            })}
          </div>
        )}
      </div>
      <div
        className="relative w-full border-x border-black/5 overflow-hidden"
        style={{
          background: faceGradient,
          boxShadow: faceShadow,
        }}
      >
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-60"
          style={{
            background: highlightBg
          }}
        />
        <div className="relative z-30">{children}</div>
      </div>
      <div
        className="relative w-full"
        style={{
          height: `${bottomHeight}px`,
          background: bottomColor,
          boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.15)",
          borderRadius: roundedBottom ? "0 0 4px 4px" : "0",
        }}
      />
    </div>
  );
};

export const MANISH_SKILLS_MODULES = [
  {
    id: "java",
    name: "Java",
    desc: "Core & OOP",
    icon: Code,
    studs: 4,
    colors: {
      topColor: "#f97316",
      faceGradient: "linear-gradient(180deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)",
      bottomColor: "#7c2d12",
      studColor: "red",
      text: "text-white drop-shadow-md",
      subtext: "text-orange-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "cpp",
    name: "C / C++",
    desc: "DSA & Systems",
    icon: Terminal,
    studs: 4,
    colors: {
      topColor: "#38bdf8",
      faceGradient: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      bottomColor: "#075985",
      studColor: "blue",
      text: "text-white drop-shadow-md",
      subtext: "text-sky-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "sql",
    name: "SQL & DBMS",
    desc: "MySQL / Postgres",
    icon: Database,
    studs: 4,
    colors: {
      topColor: "#eab308",
      faceGradient: "linear-gradient(180deg, #ca8a04 0%, #a16207 50%, #854d0e 100%)",
      bottomColor: "#713f12",
      studColor: "yellow",
      text: "text-white drop-shadow-md",
      subtext: "text-amber-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "frontend",
    name: "Frontend Dev",
    desc: "React & Tailwind",
    icon: Layout,
    studs: 4,
    colors: {
      topColor: "#2dd4bf",
      faceGradient: "linear-gradient(180deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
      bottomColor: "#115e59",
      studColor: "green",
      text: "text-white drop-shadow-md",
      subtext: "text-teal-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "backend",
    name: "Backend Dev",
    desc: "Node.js & APIs",
    icon: Server,
    studs: 4,
    colors: {
      topColor: "#22c55e",
      faceGradient: "linear-gradient(180deg, #16a34a 0%, #15803d 50%, #166534 100%)",
      bottomColor: "#14532d",
      studColor: "green",
      text: "text-white drop-shadow-md",
      subtext: "text-green-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "ai_tools",
    name: "AI Dev Tools",
    desc: "Cursor, Antigravity, Flow",
    icon: Cpu,
    studs: 4,
    colors: {
      topColor: "#c084fc",
      faceGradient: "linear-gradient(180deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)",
      bottomColor: "#581c87",
      studColor: "purple",
      text: "text-white drop-shadow-md",
      subtext: "text-purple-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "git_github",
    name: "Git & GitHub",
    desc: "Version Control",
    icon: GitBranch,
    studs: 4,
    colors: {
      topColor: "#27272a",
      faceGradient: "linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)",
      bottomColor: "#09090b",
      studColor: "dark",
      text: "text-white drop-shadow-md",
      subtext: "text-zinc-300",
      iconBg: "bg-white/10 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  },
  {
    id: "cloud",
    name: "Vercel, Netlify & Atlas",
    desc: "Cloud & Database",
    icon: Cloud,
    studs: 4,
    colors: {
      topColor: "#6366f1",
      faceGradient: "linear-gradient(180deg, #4f46e5 0%, #4338ca 50%, #3730a3 100%)",
      bottomColor: "#312e81",
      studColor: "blue",
      text: "text-white drop-shadow-md",
      subtext: "text-indigo-100",
      iconBg: "bg-black/20 shadow-inner",
      iconColor: "text-white drop-shadow-sm",
    }
  }
];

const ModuleBlock = ({ 
  module, 
  hiddenStuds = [], 
  onClick, 
  isAnimating,
  startRect,
  mouseX,
  mouseY,
  onAnimationComplete
}) => {
  const widthPx = module.studs * GRID_CONSTANTS.STUD_WIDTH;
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isAnimating && startRect && wrapperRef.current) {
      const endRect = wrapperRef.current.getBoundingClientRect();
      const dx = startRect.left - endRect.left;
      const dy = startRect.top - endRect.top;

      const apexY = Math.min(dy, 0) - GRID_CONSTANTS.APEX_HEIGHT;

      const animation = wrapperRef.current.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 0 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.1, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.15 },
        { transform: `translate(${dx * 0.75}px, ${dy + (apexY - dy) * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.35 },
        { transform: `translate(${dx * 0.5}px, ${apexY}px) scale(1, 1)`, filter: 'drop-shadow(0px 40px 20px rgba(0,0,0,0))', offset: 0.55 },
        { transform: `translate(${dx * 0.25}px, ${apexY * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.75 },
        { transform: `translate(0px, 0px) scale(1.15, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.9 },
        { transform: `translate(0px, 0px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 1 }
      ], {
        duration: 1200,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", 
        fill: "both"
      });

      animation.onfinish = () => onAnimationComplete?.();
      
      return () => animation.cancel();
    }
  }, [isAnimating, startRect]);

  return (
    <div ref={wrapperRef} className="z-50 relative lego-block-wrapper" style={{ width: widthPx }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Equip ${module.name}`}
        className="cursor-pointer w-full shrink-0 touch-none group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ccff00] rounded-lg hover:-translate-y-1.5 active:scale-95 transition-all duration-200 text-left"
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors z-30 rounded-lg pointer-events-none" />
        <LegoBlock
          mouseX={mouseX}
          mouseY={mouseY}
          topColor={module.colors.topColor}
          faceGradient={module.colors.faceGradient}
          bottomColor={module.colors.bottomColor}
          roundedTop roundedBottom
          studs={module.studs}
          studColor={module.colors.studColor}
          hideStuds={hiddenStuds}
        >
          <div className="flex items-center w-full h-[60px] px-4 gap-3">
            <div className={`w-9 h-9 rounded-lg ${module.colors.iconBg} flex items-center justify-center shrink-0`}>
              <module.icon className={module.colors.iconColor} size={22} />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-sans font-bold text-white text-[15px] tracking-wide truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                {module.name}
              </h4>
              <p className={`font-mono text-[10px] ${module.colors.subtext} truncate opacity-90`}>
                {module.desc}
              </p>
            </div>
          </div>
        </LegoBlock>
      </button>
    </div>
  );
};

export default function InteractiveTechStackBuilder({ 
  modules = MANISH_SKILLS_MODULES,
  onComplete,
  className = "",
  isDark = true
}) {
  const [equippedIds, setEquippedIds] = useState([]);
  const [animatingBlocks, setAnimatingBlocks] = useState({});
  
  const controls = useAnimation();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const handlePointerMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth) * 100);
    mouseY.set((e.clientY / window.innerHeight) * 100);
  };

  const handleToggleEquip = (id, e) => {
    if (animatingBlocks[id]) return;

    const el = e.currentTarget.closest('.lego-block-wrapper');
    if (!el) return;
    const startRect = el.getBoundingClientRect();
    
    setAnimatingBlocks(prev => ({ ...prev, [id]: startRect }));
    
    setEquippedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });

    setTimeout(() => {
      controls.start({ y: [0, 10, -3, 0], transition: { duration: 0.4, times: [0, 0.4, 0.7, 1], ease: "easeInOut" } });
    }, 1080);
  };

  const equippedModules = equippedIds.map(id => modules.find(m => m.id === id)).filter(Boolean);
  const unequippedModules = modules.filter(m => !equippedIds.includes(m.id));

  const { grid, positionedModules } = useMemo(() => {
    const calculatedGrid = [];
    const positioned = equippedModules.map(m => {
      let placedRow = -1;
      let placedCol = -1;
      for (let r = 0; r < GRID_CONSTANTS.MAX_ROWS; r++) {
        if (!calculatedGrid[r]) calculatedGrid[r] = Array(GRID_CONSTANTS.COLS).fill(null);
        let contiguous = 0;
        for (let c = 0; c < GRID_CONSTANTS.COLS; c++) {
          if (!calculatedGrid[r][c]) {
            contiguous++;
            if (contiguous === m.studs) {
              placedRow = r;
              placedCol = c - m.studs + 1;
              break;
            }
          } else {
            contiguous = 0;
          }
        }
        if (placedRow !== -1) break;
      }
      if (placedRow !== -1) {
        for (let i = 0; i < m.studs; i++) {
          calculatedGrid[placedRow][placedCol + i] = m.id;
        }
      } else {
        placedRow = 0;
        placedCol = 0;
      }
      return { module: m, rowIndex: placedRow, colIndex: placedCol };
    });
    return { grid: calculatedGrid, positionedModules: positioned };
  }, [equippedModules]);

  const hiddenServerStuds = [];
  if (grid[0]) {
    grid[0].forEach((occupantId, idx) => {
      if (occupantId && !animatingBlocks[occupantId]) hiddenServerStuds.push(idx);
    });
  }

  const towerHeight = equippedModules.length > 0 
    ? (Math.max(...positionedModules.map(m => m.rowIndex)) + 1) * GRID_CONSTANTS.ROW_HEIGHT 
    : 0;

  return (
    <div 
      onPointerMove={handlePointerMove}
      className={`w-full relative overflow-hidden select-none font-mono flex flex-col ${className}`}
    >
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 py-10 px-6 sm:px-12 w-full">
        
        {/* LEFT: Available Skill Blocks */}
        <div className="flex-1 w-full max-w-[600px] flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-wider mb-2">
              CLICK TO EQUIP SKILLS
            </h3>
            <p className="text-current/70 text-xs sm:text-sm">
              Build Manish's tech stack by clicking on the skill blocks below to snap them into the 3D profile stack.
            </p>
          </div>

          <div className="flex flex-wrap justify-start gap-4 relative z-20 min-h-[220px]">
            {unequippedModules.map((module) => {
              const startRect = animatingBlocks[module.id];
              return (
                <ModuleBlock 
                  key={module.id}
                  module={module}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isAnimating={!!startRect}
                  startRect={startRect || null}
                  onAnimationComplete={() => {
                    setAnimatingBlocks(prev => {
                      const next = { ...prev };
                      delete next[module.id];
                      return next;
                    });
                  }}
                  onClick={(e) => handleToggleEquip(module.id, e)} 
                />
              )
            })}
          </div>
        </div>

        {/* RIGHT: Profile Stack Structure */}
        <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-8 lg:mt-0">
          <div className="scale-[0.75] sm:scale-[0.85] lg:scale-100 origin-bottom shrink-0 flex flex-col items-center">
            <motion.div 
              animate={controls}
              className="relative w-[390px] shadow-[0_15px_35px_rgba(0,0,0,0.35)] rounded-xl transition-all duration-700 ease-out"
              style={{ marginTop: `${towerHeight}px` }}
            >
            
              {/* Stacked Equipped Modules */}
              <div className="absolute left-0 w-full h-0 z-20" style={{ bottom: "calc(100% - 14px)" }}>
                {positionedModules.map(({ module, rowIndex, colIndex }) => {
                  const hiddenLocalStuds = [];
                  if (grid[rowIndex + 1]) {
                    for (let i = 0; i < module.studs; i++) {
                      const occupantId = grid[rowIndex + 1][colIndex + i];
                      if (occupantId && !animatingBlocks[occupantId]) {
                        hiddenLocalStuds.push(i);
                      }
                    }
                  }

                  const startRect = animatingBlocks[module.id];

                  return (
                    <div 
                      key={module.id}
                      className="absolute"
                      style={{ 
                        bottom: rowIndex * GRID_CONSTANTS.ROW_HEIGHT, 
                        left: colIndex * GRID_CONSTANTS.STUD_WIDTH,
                        zIndex: rowIndex * 10
                      }}
                    >
                      <ModuleBlock 
                        module={module} 
                        hiddenStuds={hiddenLocalStuds}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        isAnimating={!!startRect}
                        startRect={startRect || null}
                        onAnimationComplete={() => {
                          setAnimatingBlocks(prev => {
                            const next = { ...prev };
                            delete next[module.id];
                            return next;
                          });
                        }}
                        onClick={(e) => handleToggleEquip(module.id, e)} 
                      />
                    </div>
                  );
                })}
              </div>

              {/* Base Profile Block */}
              <LegoBlock
                mouseX={mouseX}
                mouseY={mouseY}
                topColor="#eab308"
                faceGradient="linear-gradient(180deg, #facc15 0%, #eab308 50%, #ca8a04 100%)"
                bottomColor="#a16207"
                roundedTop roundedBottom
                studs={6} studColor="yellow"
                hideStuds={hiddenServerStuds}
                className="relative z-10"
              >
                <div className="px-5 py-4 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shadow-inner shrink-0">
                      <IconUser className="w-6 h-6 text-white drop-shadow-md" size={24} />
                    </div>
                    <div className="text-white drop-shadow-md">
                      <h3 className="font-sans font-bold text-[17px] tracking-wide truncate drop-shadow-md">Manish Nikam</h3>
                      <p className="font-mono text-[10px] font-bold text-yellow-100/90 tracking-[0.2em] uppercase mt-1.5 drop-shadow-sm">
                        {equippedModules.length === 0 ? "EQUIP SKILLS ABOVE" : `LEVEL ${equippedModules.length * 15} • ${equippedModules.length} SKILLS EQUIPPED`}
                      </p>
                    </div>
                  </div>

                  {equippedModules.length > 0 && (
                    <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md animate-pulse" />
                  )}
                </div>
              </LegoBlock>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
