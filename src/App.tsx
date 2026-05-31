import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import QAPlayground from './components/QAPlayground';
import Publications from './components/Publications';
import Education from './components/Education';
import Honors from './components/Honors';
import Contact from './components/Contact';
import { personalInfo } from './data';
import { Bug, ArrowUp, Briefcase, Github, Linkedin } from 'lucide-react';
import LinkedInPreviewModal from './components/LinkedInPreviewModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  // Intercept all LinkedIn clicks globally to display our public login-bypass mirror
  useEffect(() => {
    const handleLinkedInClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href && (target.href.includes('linkedin.com') || target.href.includes('linkedin'))) {
        e.preventDefault();
        setIsLinkedInModalOpen(true);
      }
    };
    document.addEventListener('click', handleLinkedInClick, true);
    return () => document.removeEventListener('click', handleLinkedInClick, true);
  }, []);

  // ScrollSpy to update Navbar links automatically as user scrolls
  useEffect(() => {
    const sections = [
      'about',
      'experience',
      'education',
      'skills',
      'projects',
      'publications',
      'honors',
      'analytics-dashboard',
      'qa-playground',
      'contact'
    ];

    const handleScroll = () => {
      // Toggle back-to-top button
      setShowScrollTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 200; // threshold offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Sections */}
      <main>
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Publications />
        <Honors />
        <AnalyticsDashboard />
        <QAPlayground />
        <Contact />
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-950 border-t border-blue-950 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-11 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Bug className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="block text-white font-mono font-bold text-xs leading-none tracking-wide">Tahsin Ahmed</span>
              <span className="block text-[8px] text-blue-400 font-mono tracking-wider uppercase mt-0.5">Software QA Engineer</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3.5">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-blue-950/60 bg-slate-900/40 hover:bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-900/40 transition-all shadow-inner"
              title="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-blue-950/60 bg-slate-900/40 hover:bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-900/40 transition-all shadow-inner"
              title="Explore on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright notice & credentials */}
          <div className="text-center md:text-right font-sans text-xs text-slate-400 space-y-1">
            <p>© 2026 Tahsin Ahmed. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-500 font-mono">
              Certified Profile • Built with React, Tailwind & Motion • Packaged for GitHub Export
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Indicator */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="btn-scroll-top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-95 hover:scale-105 transition-all outline-none cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* LinkedIn Profile Emulator Overlay for logged-out guests */}
      <LinkedInPreviewModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
    </div>
  );
}
