import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle, Bug, Github, Linkedin, Copy, Check } from 'lucide-react';
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

    const subject = formData.subject.trim() || 'Software Quality Inquiry';
    const emailBody = `Hi Tahsin,\n\n${formData.message}\n\nSincerely,\n${formData.name}\nEmail: ${formData.email}`;
    
    // Set up standard mailtoUrl. CC the sender so they are guaranteed to receive a copy of this thread.
    const mailtoUrl = `mailto:${personalInfo.email}?cc=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Store the generated link for fallback
    setLastMailto(mailtoUrl);

    // Synchronously try opening the mail application to bypass async popup & security blocks!
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn("Mailto redirection issue:", err);
    }

    // Delay showing the success view slightly for better user pacing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
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
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto animate-bounce shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-1.5 px-4 w-full">
                    <h3 className="text-xl font-bold text-slate-900 font-sans">Message Prepared & Ready!</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      To ensure you get a duplicate of your message, please choose one of the reliable methods below to finalize sending.
                    </p>
                  </div>

                  {/* Two-Column Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto text-left pt-2 pb-1 px-1">
                    {/* Column 1: Direct Link */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block animate-ping"></span>
                          <span>Option A: Auto-Draft (Recommended)</span>
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          Opens your computer or phone's standard mail app (like Outlook, Mail, or Gmail) with all fields pre-filled. You are CC'ed automatically.
                        </p>
                      </div>
                      
                      {lastMailto && (
                        <a
                          href={lastMailto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-1.5 w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-blue-500/10 transition-all cursor-pointer text-center"
                        >
                          <Send className="w-3.5 h-3.5 text-white" />
                          <span>Launch Mail Application</span>
                        </a>
                      )}
                    </div>

                    {/* Column 2: Explanation of Manual Copy */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 font-sans flex items-center space-x-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                          <span>Option B: Manual Send (100% Secure)</span>
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          If clicking the button didn't open your client, or you use webmail (Gmail/Outlook on browsers), copy the draft parameters from our copy assistant tool.
                        </p>
                      </div>
                      
                      <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                        <span className="inline-block bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Backup Mode</span>
                        <span>Interactive draft below 👇</span>
                      </div>
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
