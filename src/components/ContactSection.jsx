import React, { useState } from 'react';
import { Mail, Sparkles, Check, Copy, Send } from 'lucide-react';
import ThreeContact from './ThreeContact';
import { ScrambleButtonText } from './ui/text-scramble';

export default function ContactSection({ themeMode = 'light' }) {
  const isDark = themeMode === 'dark';
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const emailAddress = "manishnikam0908@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section 
      id="contact"
      className={`relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none font-sans transition-colors duration-500 ${
        isDark 
          ? 'bg-[#050e2d] text-white' 
          : 'bg-[#cbe3f7] text-slate-900'
      }`}
    >
      {/* Background Architectural Vector Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`w-full h-full bg-[size:120px_120px] ${
          isDark 
            ? 'bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)]'
        }`} />
      </div>

      {/* Dark Spotlight Radial Gradient */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,#1d4ed830_0%,transparent_75%)]" />
      )}

      {/* 1. TOP HEADER BAR */}
      <div className="relative z-20 w-full px-6 sm:px-12 pt-10 pb-4 border-b border-current/10 font-mono">
        <div className="flex items-center justify-between text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm sm:text-base">
              INITIATE CONTACT
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 text-current/80 hover:text-current font-mono text-xs transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{emailAddress}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
          </button>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (LEFT: 3D "CONTACT ME" NAME, RIGHT: CONTACT CONTAINER) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: 3D WebGL "contact me" Inflated Tube Typography Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[450px] sm:min-h-[520px]">
          <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
            <ThreeContact themeMode={themeMode} />
          </div>

          <div className="relative z-20 mt-auto pt-4 text-center pointer-events-none">
            <p className="text-xs text-current/60 font-mono tracking-widest uppercase">
              DRAG TO ROTATE 3D TUBE TYPOGRAPHY
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Plain Contact Form Container */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1: Name & E-mail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-5 py-3.5 rounded-xl border outline-none font-sans text-sm transition-all duration-200 ${
                    isDark
                      ? 'bg-transparent border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/5'
                      : 'bg-transparent border-slate-400 text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:bg-slate-900/5'
                  }`}
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-5 py-3.5 rounded-xl border outline-none font-sans text-sm transition-all duration-200 ${
                    isDark
                      ? 'bg-transparent border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/5'
                      : 'bg-transparent border-slate-400 text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:bg-slate-900/5'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Subject */}
            <div>
              <input
                type="text"
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`w-full px-5 py-3.5 rounded-xl border outline-none font-sans text-sm transition-all duration-200 ${
                  isDark
                    ? 'bg-transparent border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/5'
                    : 'bg-transparent border-slate-400 text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:bg-slate-900/5'
                }`}
              />
            </div>

            {/* Row 3: Message... */}
            <div>
              <textarea
                rows={5}
                required
                placeholder="Message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-5 py-4 rounded-xl border outline-none font-sans text-sm transition-all duration-200 resize-none ${
                  isDark
                    ? 'bg-transparent border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/5'
                    : 'bg-transparent border-slate-400 text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:bg-slate-900/5'
                }`}
              />
            </div>

            {/* Row 4: Pill Button "Let's talk" */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitted}
                className={`px-8 py-3.5 rounded-full border font-sans font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  submitted
                    ? 'bg-green-600 border-green-400 text-white'
                    : isDark
                    ? 'bg-transparent border-white text-white hover:bg-white hover:text-slate-950 active:scale-95'
                    : 'bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white active:scale-95'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <ScrambleButtonText text="Let's talk" />
                    <Send className="w-3.5 h-3.5 opacity-80" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* 3. FOOTER */}
      <footer className="relative z-20 w-full px-6 sm:px-12 py-4 border-t border-current/10 flex items-center justify-between text-[11px] font-mono tracking-widest">
        <span>MANISH NIKAM © 2026</span>
        <span>WEB DEVELOPER & AI BUILDER</span>
      </footer>

    </section>
  );
}
