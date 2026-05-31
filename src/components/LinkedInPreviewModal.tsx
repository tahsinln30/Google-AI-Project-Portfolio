import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Linkedin,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  Droplet,
  Copy,
  Check,
  Search,
  Home,
  Users,
  MessageSquare,
  Bell,
  Heart,
  Grid,
  X,
  Share2,
  Lock,
  Plus,
  Send,
  Sparkles,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { personalInfo, experienceList, educationList, skillsList, publicationsList, honorsList } from '../data';

interface LinkedInPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkedInPreviewModal({ isOpen, onClose }: LinkedInPreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'all-details'>('profile');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'tahsin'; text: string; time: string }>>([
    { sender: 'tahsin', text: 'Hi! Thank you for checking my LinkedIn profile companion. Are you interested in collaborating or discussing QA Automation opportunities?', time: 'Just now' }
  ]);

  const profileUrl = 'https://www.linkedin.com/in/mdtahsinahmed/';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    
    const userMsg = msgInput;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Now' }]);
    setMsgInput('');
    setIsSendingMsg(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'tahsin',
          text: 'Thanks for the message! Since this is a public mirror, your message is saved to local state. To discuss further, feel free to submit the contact form at the bottom of the main website or write to tahsinln30@yahoo.com directly!',
          time: 'Just now'
        }
      ]);
      setIsSendingMsg(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="linkedin-modal-root" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 text-slate-900 font-sans">
          {/* Main Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-5xl bg-[#f3f2f0] rounded-2xl shadow-2xl border border-slate-700/30 overflow-hidden flex flex-col max-h-[92vh] text-left"
          >
            {/* Top Bypass Header Banner */}
            <div className="bg-blue-600 text-white px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-2 font-medium">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-300 animate-pulse" />
                <p>
                  <span className="font-bold">Public LinkedIn Viewer:</span> Bypass Login Wall Active • Fully accessible without a LinkedIn account!
                </p>
              </div>
              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <button
                  onClick={handleCopyLink}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Profile Link'}</span>
                </button>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 font-bold px-3 py-1 rounded hover:bg-slate-50 transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Open Real LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* LinkedIn Style Top Nav (Desktop View Mock) */}
            <header className="bg-white border-b border-[#e0dfdc] px-4 py-2 hidden md:block">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2.5 flex-1 max-w-sm">
                  <div className="bg-[#0a66c2] text-white p-1 rounded font-bold text-lg select-none leading-none tracking-tighter shrink-0 flex items-center justify-center w-8 h-8">
                    in
                  </div>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      disabled
                      placeholder="Search jobs, people, skills..."
                      className="w-full bg-[#edf3f8] border-none rounded-md py-1.5 pl-9 pr-4 text-xs font-medium placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <nav className="flex items-center space-x-6 text-[#00000099] font-sans text-[11px] font-medium mt-0.5">
                  <div className="flex flex-col items-center cursor-not-allowed hover:text-slate-900">
                    <Home className="w-5 h-5 text-[#000000e6]" />
                    <span className="mt-0.5 text-slate-950">Home</span>
                  </div>
                  <div className="flex flex-col items-center cursor-not-allowed hover:text-slate-900">
                    <Users className="w-5 h-5" />
                    <span className="mt-0.5">My Network</span>
                  </div>
                  <div className="flex flex-col items-center cursor-not-allowed hover:text-slate-900">
                    <Briefcase className="w-5 h-5" />
                    <span className="mt-0.5">Jobs</span>
                  </div>
                  <div className="flex flex-col items-center cursor-not-allowed hover:text-slate-900">
                    <MessageSquare className="w-5 h-5" />
                    <span className="mt-0.5">Messaging</span>
                  </div>
                  <div className="flex flex-col items-center cursor-not-allowed hover:text-slate-900">
                    <Bell className="w-5 h-5" />
                    <span className="mt-0.5">Notifications</span>
                  </div>
                  <div className="h-5 w-px bg-slate-200" />
                  <div className="flex flex-col items-center cursor-pointer border px-2 py-0.5 rounded border-amber-600 bg-amber-50 text-amber-800 font-bold hover:bg-amber-100 transition-colors">
                    <span>Premium Gold</span>
                  </div>
                </nav>
              </div>
            </header>

            {/* Scrolling Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 max-h-[82vh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Left/Middle Column (Profile Main Content) */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Card 1: Profile Top Header Card */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl overflow-hidden relative shadow-sm">
                    {/* Header Banner - Grey styled pattern */}
                    <div className="h-32 sm:h-44 bg-gradient-to-r from-slate-800 via-blue-950 to-slate-900 relative">
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/40 text-white backdrop-blur-md text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-mono border border-white/10 flex items-center gap-1.5 shadow">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Public Profile Guest Mode</span>
                      </div>
                    </div>

                    {/* Profile Floating Avatar, overlaps banner */}
                    <div className="relative px-6 pb-6">
                      <div className="absolute -top-16 sm:-top-20 left-6">
                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-slate-900 shadow-lg overflow-hidden flex items-center justify-center font-bold text-3xl sm:text-4xl text-white select-none group">
                          {/* Simulated Avatar with Open To Work Frame */}
                          <div className="absolute inset-0 bg-[#004b7c] flex flex-col items-center justify-center font-mono hover:scale-105 transition-transform duration-300">
                            <span className="text-white drop-shadow-md">TA</span>
                            <span className="text-[9px] sm:text-[11px] font-bold text-yellow-400 mt-1 uppercase tracking-wide">QA Eng</span>
                          </div>
                          
                          {/* LinkedIn open to work ring badge */}
                          <div className="absolute -bottom-1 inset-x-0 bg-emerald-600/90 text-[7px] sm:text-[8px] font-black uppercase text-center py-1 tracking-widest text-emerald-100 border-t border-emerald-500">
                            #OpenToWork
                          </div>
                        </div>
                      </div>

                      {/* Header content push details */}
                      <div className="pt-16 sm:pt-20 space-y-4 text-left">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h2 className="text-xl sm:text-2xl font-bold text-[#000000e6]">{personalInfo.name}</h2>
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wide border border-amber-200">
                                <Linkedin className="w-2.5 h-2.5 fill-amber-800" />
                                Premium Gold Member
                              </span>
                            </div>
                            <p className="text-sm text-[#000000e6] font-medium leading-tight">
                              {personalInfo.title} at <span className="font-bold text-[#0a66c2] hover:underline">BlueTech Solutions</span>
                            </p>
                            <p className="text-xs text-[#00000099] flex items-center gap-1 flex-wrap pt-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{personalInfo.location}</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-[#0a66c2] font-semibold hover:underline cursor-not-allowed">500+ connections</span>
                            </p>
                          </div>

                          {/* Company / Education badges in header right */}
                          <div className="space-y-2 text-xs font-semibold text-slate-700 sm:text-right">
                            <div className="flex items-center sm:justify-end space-x-2">
                              <div className="w-5 h-5 bg-blue-100 rounded text-blue-800 text-[10px] flex items-center justify-center font-bold">B</div>
                              <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">BlueTech Solutions</span>
                            </div>
                            <div className="flex items-center sm:justify-end space-x-2">
                              <div className="w-5 h-5 bg-red-100 rounded text-red-800 text-[10px] flex items-center justify-center font-bold">D</div>
                              <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">University of Dhaka</span>
                            </div>
                          </div>
                        </div>

                        {/* Connection Controls layout */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button
                            onClick={() => {
                              const alertMsg = 'You are now simulating connection details! Direct email is tahsinln30@yahoo.com.';
                              alert(alertMsg);
                            }}
                            className="bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm px-5 py-2 rounded-full cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Connect</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              const el = document.getElementById('msg-chat-pane');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="border border-[#0a66c2] text-[#0a66c2] font-bold text-sm px-5 py-2 rounded-full hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>InMail Message</span>
                          </button>
                          
                          <button
                            onClick={handleCopyLink}
                            className="border border-slate-300 text-[#00000099] font-bold text-sm px-5 py-2 rounded-full hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                            <span>{copied ? 'Copied' : 'Share Profile'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: About Card */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-6 shadow-sm space-y-3.5">
                    <h3 className="text-lg font-bold text-[#000000e6]">About</h3>
                    <p className="text-[#000000e6] text-sm leading-relaxed whitespace-pre-line">
                      {personalInfo.about}
                    </p>
                    <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>Corporate: {personalInfo.corporateEmail}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>Call: {personalInfo.phone}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Droplet className="w-4 h-4 text-red-500" />
                        <span>Blood Group: {personalInfo.bloodGroup}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Experience Card */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-[#000000e6] flex items-center gap-1.5">
                        <Briefcase className="w-5 h-5 text-slate-600" />
                        <span>Experience</span>
                      </h3>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {experienceList.map((exp, index) => (
                        <div key={exp.id} className={`py-4 space-y-3 ${index === 0 ? 'pt-0' : ''} ${index === experienceList.length - 1 ? 'pb-0' : ''}`}>
                          <div className="flex gap-3 text-left">
                            {/* Dummy Company Icon */}
                            <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center shrink-0 border font-mono font-bold text-[#0a66c2] text-sm capitalize">
                              {exp.company.substring(0, 2)}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-[#000000e6] font-sans">{exp.role}</h4>
                              <p className="text-xs text-slate-800 font-medium">{exp.company}</p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {exp.duration} {exp.isCurrent && <span className="text-emerald-600 font-bold ml-1.5">• Active Position</span>}
                              </p>
                            </div>
                          </div>
                          
                          {/* Details Lists */}
                          <ul className="pl-15 space-y-1.5 text-xs text-slate-700 list-disc leading-relaxed">
                            {exp.details.map((detail, idx) => (
                              <li key={idx} className="marker:text-slate-400 pl-0.5">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column (Sidebar & Widgets) */}
                <div className="space-y-4">
                  
                  {/* Top Bar Button Quick dismiss */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-4 shadow-sm space-y-3.5">
                    <button
                      onClick={onClose}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-md"
                    >
                      <X className="w-4 h-4" />
                      <span>Back to Portfolio Space</span>
                    </button>
                    <p className="text-[10px] text-slate-500 leading-normal text-center">
                      Close this overlay view to resume browsing Tahsin's beautiful personal portfolio sandbox.
                    </p>
                  </div>

                  {/* Education Cards right sidebar wrapper */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-5 shadow-sm space-y-3.5">
                    <h3 className="text-sm font-bold text-[#000000e6] flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-600" />
                      <span>Education</span>
                    </h3>
                    <div className="space-y-3 text-xs leading-normal">
                      {educationList.map(edu => (
                        <div key={edu.id} className="border-l-2 border-[#0a66c2]/40 pl-3 py-0.5 space-y-0.5">
                          <h4 className="font-bold text-[#000000e6]">{edu.degree}</h4>
                          <p className="text-[#00000099]">{edu.institution}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{edu.duration}</p>
                          {edu.grade && <p className="text-[10px] text-emerald-600 font-bold">{edu.grade}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High Quality Skills Card */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-5 shadow-sm space-y-3.5">
                    <h3 className="text-sm font-bold text-[#000000e6] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-600" />
                      <span>QA Skills & Endorsements</span>
                    </h3>
                    
                    <div className="space-y-3">
                      {skillsList.slice(0, 6).map(skill => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-[#000000e6]">{skill.name}</span>
                            <span className="text-[#0a66c2] text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                              Endorsed
                            </span>
                          </div>
                          
                          {/* Endorser message mockup */}
                          <p className="text-[9px] text-slate-500 leading-none">
                            🎯 Endorsed by 15 colleagues at BlueTech Solutions
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Honors & Awards sidebar list */}
                  <div className="bg-white border border-[#e0dfdc] rounded-xl p-5 shadow-sm space-y-3.5">
                    <h3 className="text-sm font-bold text-[#000000e6] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-800" />
                      <span>Honors & Awards</span>
                    </h3>
                    <div className="space-y-3 text-xs">
                      {honorsList.slice(0, 2).map(honor => (
                        <div key={honor.id} className="bg-[#f8f9fa] p-2.5 rounded border border-dashed border-slate-200 space-y-0.5">
                          <h4 className="font-bold text-slate-800 leading-tight">{honor.title}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold">{honor.awardedBy}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inline Contact Chat Widget (InMail Simulator) */}
                  <div id="msg-chat-pane" className="bg-white border border-blue-100 rounded-xl overflow-hidden shadow-md flex flex-col">
                    <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                      <div>
                        <span className="block text-xs font-bold font-sans">Simulated LinkedIn Chat</span>
                        <span className="block text-[8px] text-slate-400 font-mono tracking-wide uppercase leading-none">InMail Direct Gateway</span>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="p-3 space-y-2 max-h-48 overflow-y-auto bg-slate-50 flex-1">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col max-w-[85%] text-left ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                          <div className={`p-2 rounded-lg text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white border text-slate-800 rounded-bl-none shadow-sm'
                          }`}>
                            {msg.text}
                          </div>
                          <span className="text-[8px] text-slate-400 mt-0.5">{msg.time}</span>
                        </div>
                      ))}
                      {isSendingMsg && (
                        <div className="text-[10px] text-slate-400 italic font-mono flex items-center space-x-1 pl-1">
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75" />
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150" />
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-300" />
                          <span>Tahsin is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-100 flex gap-1.5 bg-white">
                      <input
                        type="text"
                        value={msgInput}
                        onChange={e => setMsgInput(e.target.value)}
                        placeholder="Write an InMail message..."
                        className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#0a66c2]"
                      />
                      <button
                        type="submit"
                        className="bg-[#0a66c2] hover:bg-[#004182] text-white p-1.5 rounded-lg shrink-0 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Footer Credits */}
            <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 gap-2">
              <p>© 2026 Tahsin Ahmed. Authentic LinkedIn emulator container built for guest accessibility.</p>
              <div className="flex items-center space-x-2">
                <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">Authenticated Mirror Verified</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
