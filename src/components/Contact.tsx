import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle, Bug, Github, Linkedin, Copy, Check, ExternalLink, FileText } from 'lucide-react';
import { personalInfo } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [lastMailto, setLastMailto] = useState('');

  const [copiedStates, setCopiedStates] = useState({
    to: false,
    cc: false,
    subject: false,
    body: false,
  });

  // QA Sanity Checklist
  const [sanityChecks, setSanityChecks] = useState({
    nameLength: false,
    validEmail: false,
    messageFilled: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      
      // Perform live QA validations
      setSanityChecks({
        nameLength: next.name.trim().length >= 2,
        validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email),
        messageFilled: next.message.trim().length >= 10
      });

      return next;
    });
  };

  const allChecksPass = sanityChecks.nameLength && sanityChecks.validEmail && sanityChecks.messageFilled;

  // Precompile direct and webmail links in sync with user form inputs
  const subjectText = formData.subject.trim() || 'Software Quality Inquiry';
  const emailBody = `Hi Tahsin,\n\n${formData.message}\n\nSincerely,\n${formData.name}\nEmail: ${formData.email}`;
  const mailtoUrl = `mailto:${personalInfo.email}?cc=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;
  
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&cc=${encodeURIComponent(formData.email)}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;
  const outlookComposeUrl = `https://outlook.live.com/default.aspx?rru=compose&to=${encodeURIComponent(personalInfo.email)}&subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;
  const yahooComposeUrl = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(personalInfo.email)}&subj=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;

  const copyToClipboard = (text: string, key: 'to' | 'cc' | 'subject' | 'body') => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // If not validated, make errors visible and don't submit
    if (!allChecksPass) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    setShowErrors(false);

    // Store the generated link
    setLastMailto(mailtoUrl);

    // Direct client mailto invocation
    try {
      window.location.href = mailtoUrl;
    } catch (mailtoErr) {
      console.warn('Mailto redirection issue:', mailtoErr);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden text-slate-800">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Secure Connection
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Interested in setting up automated testing suites, quality checks, or coordinating business leadership strategies? Connect directly using the certified gateway below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SQA Contact details info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow flex flex-col justify-between text-left h-full">
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-sans text-slate-950 pb-3 border-b border-slate-100">
                  Tahsin Ahmed CV Index
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  You can contact me directly for professional queries, contract testing advisories, or permanent QA placements in Dhaka or remote frameworks.
                </p>

                <div className="space-y-4">
                  {/* Mail and Address fields */}
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Primary Mail</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 font-sans mt-1 block">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Operational Office</span>
                      <span className="text-sm font-bold text-slate-900 font-sans mt-1 block">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SQA Verification statement */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-900 font-bold font-sans">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Direct Mail Transmission</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Your messages are built dynamically and opened straight in your local e-mail dispatcher. This ensures secure, zero-tracked, and direct communication.
                  </p>
                </div>
              </div>

              {/* Technical Social icons block */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 mt-6">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Explore on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive validation form column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all text-left">
              
              {submitted ? (
                <div className="py-6 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-inner bg-blue-50 border-blue-100 text-blue-600 animate-pulse">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <div className="space-y-2 px-4 w-full">
                    <h3 className="text-xl font-bold text-slate-900 font-sans">
                      Secure Email Draft Ready!
                    </h3>
                    <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                      To guarantee reliable, direct delivery directly to <strong>{personalInfo.email}</strong>, we have prepared a secure email draft. If your mail app did not open automatically, please click one of the quick options below or copy-paste using the toolkit:
                    </p>
                  </div>

                  {/* 1-Click Send Grid */}
                  <div className="space-y-3 max-w-2xl mx-auto pt-1 pb-2 text-left px-1">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono pl-1">
                      ⚡ Instant Send Options (1-Click)
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Default Client Mailto */}
                      <a
                        href={lastMailto || mailtoUrl}
                        className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <div className="bg-white/15 p-2 rounded-lg shrink-0">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="block text-xs font-bold font-sans">Launch Default App</span>
                          <span className="block text-[10px] opacity-80 truncate">Windows/Mail/Outlook Client</span>
                        </div>
                      </a>

                      {/* Gmail Compose */}
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-rose-50 border border-rose-100 hover:bg-rose-100/50 text-rose-700 rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <div className="bg-rose-500 text-white p-2 rounded-lg shrink-0">
                          <Send className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="block text-xs font-bold font-sans">Send via Gmail Web</span>
                          <span className="block text-[10px] text-rose-500/90 truncate">Compose inside mail.google.com</span>
                        </div>
                      </a>

                      {/* Outlook Compose */}
                      <a
                        href={outlookComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-sky-50 border border-sky-100 hover:bg-sky-100/50 text-sky-700 rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <div className="bg-sky-500 text-white p-2 rounded-lg shrink-0">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="block text-xs font-bold font-sans">Send via Outlook.com</span>
                          <span className="block text-[10px] text-sky-600/90 truncate">Compose inside outlook.live.com</span>
                        </div>
                      </a>

                      {/* Yahoo Compose */}
                      <a
                        href={yahooComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-purple-50 border border-purple-100 hover:bg-purple-100/50 text-purple-700 rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <div className="bg-purple-600 text-white p-2 rounded-lg shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="block text-xs font-bold font-sans">Send via Yahoo Mail</span>
                          <span className="block text-[10px] text-purple-600/90 truncate">Compose in compose.mail.yahoo.com</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Manual Copy Interactive Box */}
                  <div className="max-w-2xl mx-auto border border-slate-200 rounded-2xl overflow-hidden bg-white text-left shadow-sm">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">Email Draft Assistant</span>
                      <span className="text-[10px] text-slate-400 font-medium bg-white px-2 py-0.5 rounded border border-slate-200">Copy-Paste Toolkit</span>
                    </div>

                    <div className="p-4 space-y-3 text-xs">
                      {/* Recipient To */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Send To (Primary)</span>
                          <span className="text-slate-800 font-medium font-mono select-all break-all">{personalInfo.email}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(personalInfo.email, 'to')}
                          className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          {copiedStates.to ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
                              <span className="text-[10px] text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Carbon Copy */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Your Copy (CC)</span>
                          <span className="text-slate-800 font-medium font-mono select-all break-all">
                            {formData.email || 'cooper@company.com'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.email, 'cc')}
                          className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          {copiedStates.cc ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
                              <span className="text-[10px] text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                        <div className="space-y-0.5 w-full max-w-md">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Subject Title</span>
                          <span className="text-slate-800 font-medium block truncate select-all">
                            {formData.subject.trim() || 'Software Quality Inquiry'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.subject.trim() || 'Software Quality Inquiry', 'subject')}
                          className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          {copiedStates.subject ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
                              <span className="text-[10px] text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Message Body */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-left">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Email Message Body</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`Hi Tahsin,\n\n${formData.message}\n\nSincerely,\n${formData.name}\nEmail: ${formData.email}`, 'body')}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
                          >
                            {copiedStates.body ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
                                <span className="text-[10px] text-emerald-600">Copied Entire Body!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Copy Full Message</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 font-mono text-[11px] text-slate-700 whitespace-pre-wrap max-h-32 overflow-y-auto leading-relaxed select-all">
                          {`Hi Tahsin,\n\n${formData.message}\n\nSincerely,\n${formData.name}\nEmail: ${formData.email}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                        setSanityChecks({ nameLength: false, validEmail: false, messageFilled: false });
                      }}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {showErrors && !allChecksPass && (
                    <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold leading-relaxed">
                      ⚠️ Please make sure to fill out all the fields correctly. Brand names and text inputs must be valid, and your message should contain at least 10 characters.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Jane Cooper"
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm ${showErrors && !sanityChecks.nameLength ? 'border-rose-400 ring-1 ring-rose-400 bg-rose-50/20' : 'border-slate-200'}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., cooper@company.com"
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm ${showErrors && !sanityChecks.validEmail ? 'border-rose-400 ring-1 ring-rose-400 bg-rose-50/20' : 'border-slate-200'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Inquiry regarding professional services, contract placements, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Type your message here... (min. 10 characters)"
                      className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm min-h-[96px] ${showErrors && !sanityChecks.messageFilled ? 'border-rose-400 ring-1 ring-rose-400 bg-rose-50/20' : 'border-slate-200'}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-blue-600/10 active:scale-95 transition-all outline-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin shrink-0" />
                        <span>Dispatching Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
