import { useState } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';
import { Terminal, CheckCircle2, ShieldCheck, FileText, ArrowRight, Play, Briefcase, Award, Github, Linkedin, Copy, Check, Globe } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const portfolioUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '')
    : '';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerResumePrint = () => {
    window.print();
  };

  return (
    <section id="about" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-950 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute top-12 right-12 w-96 h-96 rounded-full bg-indigo-900/10 blur-[100px]" />
        {/* Fine grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* QA Badge & Highlight */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/50 to-blue-800/20 border border-blue-500/30 px-3 py-1.5 rounded-full"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-mono text-[11px] tracking-wide font-semibold uppercase">
                Available for Senior QA Engineering Roles
              </span>
            </motion.div>

            {/* Title & Name */}
            <div className="space-y-3">
              <motion.h4 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-base text-blue-400 font-mono tracking-wider"
              >
                HELLO, WORLD! I AM
              </motion.h4>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-tight"
              >
                {personalInfo.name}
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl sm:text-2xl font-mono text-slate-300 font-semibold"
              >
                {personalInfo.title}
              </motion.h2>
            </div>

            {/* Personal Statement */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              {personalInfo.about}
            </motion.p>

            {/* Quick Metrics & Achievements */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4"
            >
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:border-blue-500/20 transition-all group">
                <div className="text-3xl font-bold text-blue-400 group-hover:scale-105 transition-transform duration-200">9+</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Core Projects Shipped</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:border-blue-500/20 transition-all group">
                <div className="text-3xl font-bold text-blue-400 group-hover:scale-105 transition-transform duration-200">Elite</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Manual & Automation</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:border-blue-500/20 col-span-2 sm:col-span-1 transition-all group">
                <div className="text-3xl font-bold text-blue-400 group-hover:scale-105 transition-transform duration-200">DU & AIUB</div>
                <div className="text-xs text-slate-400 font-mono mt-1">MBA + MSc Tech</div>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('qa-playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-sans text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Simulate QA Test Suite</span>
              </button>

              <button
                onClick={triggerResumePrint}
                className="flex items-center space-x-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/30 text-slate-200 hover:text-white px-6 py-3 rounded-lg font-sans text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Print & Export Resume / CV</span>
              </button>
            </motion.div>

            {/* Portfolio Link & Social Handles Passport */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="p-4 bg-slate-900/80 border border-blue-900/20 rounded-xl max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8"
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Verified Portfolio URL</span>
                  <span className="block text-xs font-mono text-slate-300 truncate select-all">
                    {portfolioUrl}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-850 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
                  title="Copy portfolio URL to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-400" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
                
                <div className="h-6 w-px bg-slate-800" />

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title="Explore on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive SQA Testing Terminal Simulation Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-5 w-full"
          >
            <div className="w-full bg-slate-900 border border-blue-900/30 rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/40">
              {/* Terminal Head */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-blue-950/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>tahsin-qa-suite.sh</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-left leading-relaxed space-y-4">
                <div className="space-y-1">
                  <p className="text-slate-500">// Initialize Tahsin Ahmed Professional Profile</p>
                  <p className="text-blue-400">$ node --version && npm install -g srv-qa-bench</p>
                  <p className="text-slate-300">v20.11.0 • srv-qa-bench successfully loaded.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-blue-400">$ cat /etc/tahsin-metadata.json</p>
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                    <p><span className="text-blue-400">"academicLevel":</span> "MBA DU + MSc CS AIUB",</p>
                    <p><span className="text-blue-400">"coreExpertise":</span> ["Cypress", "Playwright", "Manual Testing"],</p>
                    <p><span className="text-blue-400">"loadTesting":</span> "K6",</p>
                    <p><span className="text-blue-400">"publicationsCount":</span> 4,</p>
                    <p><span className="text-blue-400">"currentAssociation":</span> "BlueTech Solutions (Robi Axiata)"</p>
                  </div>
                </div>

                <div className="space-y-1.5 p-3.5 bg-blue-950/20 border border-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300 font-bold">▶ RUNNING AUTOMATED SMOKE WORKFLOW</span>
                    <span className="animate-pulse text-blue-400">● ACTIVE</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>bdtickets-booking-automations.spec.js</span>
                      <span className="text-emerald-400 font-semibold">[PASSED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>lunchbd-billing-boundary-limits.spec.js</span>
                      <span className="text-emerald-400 font-semibold">[PASSED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>easy-desk-sla-triggers.spec.ts</span>
                      <span className="text-emerald-400 font-semibold">[PASSED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>gain-io-load-spike-bench.k6.js</span>
                      <span className="text-emerald-400 font-semibold">[PASSED]</span>
                    </div>
                  </div>
                </div>

                {/* Final verdict */}
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">STATUS: ALL TEST CASES PASSING (100% RELIABLE)</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
