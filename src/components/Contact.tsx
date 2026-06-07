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

  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presets = [
    {
      id: 'hire',
      label: 'Permanent Placement 💼',
      subject: 'Full-Time SQA Position Inquiry',
      message: 'Hi Tahsin,\n\nWe are impressed with your dual technical (MSc CS) and strategic (MBA Dhaka) background. We have an opening for a Software Quality Assurance Engineer to lead manual, API, and automated testing (Cypress/Playwright) suites. Let\'s schedule an interview to discuss next steps.\n\nSincerely,\n[Your Name]'
    },
    {
      id: 'contract',
      label: 'QA Consultancy 🛠️',
      subject: 'Contract QA & Test Suite Advisory',
      message: 'Hi Tahsin,\n\nWe are looking for an experienced SQA consultant to audit our existing platform and establish robust end-to-end automation pipelines (Cypress/K6 load testing). Please let us know your standard consulting slots and rates.\n\nSincerely,\n[Your Name]'
    },
    {
      id: 'audit',
      label: 'Free Bug Audit 🔍',
      subject: 'Complimentary Mobile/Web Bug Check',
      message: 'Hi Tahsin,\n\nWe would love to take advantage of your complimentary high-level exploratory and ad-hoc bug audit check on our digital application. Please let us know what details you require to perform initial quality tests.\n\nSincerely,\n[Your Name]'
    },
    {
      id: 'general',
      label: 'General Inquiry 💬',
      subject: 'General Technical Inquiry / Networking',
      message: 'Hi Tahsin,\n\nI reached out via your portfolio regarding software quality testing systems or to discuss potential collaboration and strategic leadership opportunities in Dhaka.\n\nSincerely,\n[Your Name]'
    }
  ];

  const applyPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    setSelectedPreset(presetId);
    setFormData(prev => {
      const next = {
        ...prev,
        subject: preset.subject,
        message: preset.message
      };
      
      // Update validation in sync
      setSanityChecks({
        nameLength: next.name.trim().length >= 2,
        validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email),
        messageFilled: next.message.trim().length >= 10
      });

      return next;
    });
  };

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

  const [submitError, setSubmitError] = useState('');
  const [apiMode, setApiMode] = useState<'delivered' | 'logged_offline' | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // If not validated, make errors visible and don't submit
    if (!allChecksPass) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    setShowErrors(false);
    setSubmitError('');
    setApiMode(null);
    setIsFallbackMode(false);
    setNeedsActivation(false);

    // Store the generated link for manual contingency usage
    setLastMailto(mailtoUrl);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: subjectText,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.error || 'Failed to submit form directly to server.');
      }

      console.log('API submission result:', result);
      
      let finalMode = result.mode || 'delivered';
      let finalActivation = !!result.needsActivation;
      let finalFallback = result.mode === 'logged_offline';

      if (result.triggerClientSubmit) {
        console.log('🔄 Server-to-SMTP/Proxy was blocked. Initiating direct browser FormSubmit AJAX dispatch in parallel...');
        let hasBrowserSuccess = false;
        let isBrowserActivationRequired = false;
        
        // Dispatch to recipient(s) directly from visitor's browser in parallel
        const targetBrowserRecipients = ['tahsinln30@yahoo.com', 'tahsin@bluetech.solutions'];
        
        const parallelBrowserDispatches = await Promise.allSettled(
          targetBrowserRecipients.map(async (recipient) => {
            try {
              console.log(`📡 Direct browser FormSubmit send to: ${recipient}...`);
              const antiSpamRef = `FS-BRW-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
              const messageWithRef = `Visitor Name: ${formData.name}\nVisitor Email: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\n[Ref Token: ${antiSpamRef}]\n[Inquiry Origin: Direct Browser Dispatch]`;

              const fsResponse = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  _subject: `${subjectText} (${antiSpamRef})`,
                  message: messageWithRef,
                  _captcha: 'false'
                })
              });

              if (fsResponse.ok) {
                const fsData = await fsResponse.json();
                console.log(`✅ Direct browser FormSubmit dispatch to ${recipient} succeeded!`, fsData);
                
                const msgStr = String(fsData?.message || '').toLowerCase();
                const activationNeeded = msgStr.includes('activation') || msgStr.includes('activate');
                return { success: true, needsActivation: activationNeeded };
              } else {
                console.warn(`⚠️ Direct browser FormSubmit to ${recipient} failed with standard status: ${fsResponse.status}`);
                return { success: false, status: fsResponse.status };
              }
            } catch (brwErr: any) {
              console.error(`⚠️ Exception during direct browser FormSubmit call to ${recipient}:`, brwErr);
              return { success: false, error: brwErr?.message || String(brwErr) };
            }
          })
        );

        // Evaluate parallel results
        parallelBrowserDispatches.forEach((item) => {
          if (item.status === 'fulfilled' && item.value.success) {
            hasBrowserSuccess = true;
            if (item.value.needsActivation) {
              isBrowserActivationRequired = true;
            }
          }
        });

        if (hasBrowserSuccess) {
          finalMode = 'delivered';
          finalActivation = isBrowserActivationRequired;
          finalFallback = false;
        } else {
          // Both server and browser dispatches failed, fallback to mailto draft mode
          finalMode = 'logged_offline';
          finalFallback = true;
          setSubmitError('Secure API gateways endpoints were unresponsive. Manual copy-paste or webmail links options are enabled below.');
        }
      }

      setApiMode(finalMode);
      setNeedsActivation(finalActivation);
      setIsFallbackMode(finalFallback);
      
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error('API submission error:', err);
      
      // If server endpoint was totally offline, try browser dispatch directly before failing
      console.log('🔄 API endpoint offline/errored. Attempting direct browser FormSubmit dispatch as emergency parallel recovery...');
      let hasBrowserSuccess = false;
      let isBrowserActivationRequired = false;
      
      try {
        const emergencyRecipients = ['tahsinln30@yahoo.com', 'tahsin@bluetech.solutions'];
        const parallelEmergencyDispatches = await Promise.allSettled(
          emergencyRecipients.map(async (recipient) => {
            try {
              const antiSpamRef = `FS-EMG-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
              const messageWithRef = `Visitor Name: ${formData.name}\nVisitor Email: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\n[Ref Token: ${antiSpamRef}]\n[Inquiry Origin: Emergency Browser Dispatch]`;

              const fsResponse = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  _subject: `${subjectText} (${antiSpamRef})`,
                  message: messageWithRef,
                  _captcha: 'false'
                })
              });

              if (fsResponse.ok) {
                const fsData = await fsResponse.json();
                const msgStr = String(fsData?.message || '').toLowerCase();
                const activationNeeded = msgStr.includes('activation') || msgStr.includes('activate');
                return { success: true, needsActivation: activationNeeded };
              }
              return { success: false };
            } catch (e: any) {
              return { success: false, error: e?.message || String(e) };
            }
          })
        );

        parallelEmergencyDispatches.forEach((item) => {
          if (item.status === 'fulfilled' && item.value.success) {
            hasBrowserSuccess = true;
            if (item.value.needsActivation) {
              isBrowserActivationRequired = true;
            }
          }
        });
      } catch (recoveryErr) {
        console.error('Emergency recovery thread failed:', recoveryErr);
      }

      if (hasBrowserSuccess) {
        setApiMode('delivered');
        setNeedsActivation(isBrowserActivationRequired);
        setIsFallbackMode(false);
      } else {
        setSubmitError(err?.message || 'An error occurred while dispatching your request to the server.');
        setIsFallbackMode(true);
      }
      
      setIsSubmitting(false);
      // Still show the success screen with manual or direct options so the visitor never loses state
      setSubmitted(true);
    }
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
                    Your messages are dispatched directly through our secure backend API gateway, or processed via default mail client configurations for robust delivery.
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
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-inner ${
                    needsActivation 
                      ? 'bg-amber-50 border-amber-100 text-amber-500 animate-pulse'
                      : isFallbackMode
                      ? 'bg-blue-50 border-blue-100 text-blue-600 animate-pulse'
                      : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                  }`}>
                    {needsActivation ? (
                      <Mail className="w-8 h-8 text-amber-500" />
                    ) : isFallbackMode ? (
                      <Mail className="w-8 h-8 text-blue-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-emerald-600 animate-scale" />
                    )}
                  </div>
                  
                  <div className="space-y-2 px-4 w-full">
                    <h3 className="text-xl font-bold text-slate-900 font-sans">
                      {needsActivation 
                        ? 'Verification Check Sent!' 
                        : isFallbackMode 
                        ? 'Secure Email Draft Ready!' 
                        : 'Message Delivered Successfully!'}
                    </h3>
                    <div className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                      {needsActivation ? (
                        <div className="space-y-3">
                          <p>
                            We dispatched your message, but FormSubmit requires a <strong>one-time activation confirmation</strong>.
                          </p>
                          <div className="font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-left max-w-md mx-auto">
                            👉 Please check your inbox (including Spam/Junk/Promo tab) on <strong>{personalInfo.email}</strong> or <strong>tahsinln30@yahoo.com</strong> for an email containing <strong>"Activate FormSubmit"</strong> and click the link inside it. Once clicked, all future submissions will send silently and automatically!
                          </div>
                        </div>
                      ) : isFallbackMode ? (
                        <div className="space-y-2">
                          {submitError ? (
                            <p className="font-mono text-[11px] font-bold text-red-500 bg-red-50 py-1 px-2.5 rounded border border-red-100 inline-block">
                              Status Core Fallback: {submitError}
                            </p>
                          ) : null}
                          <p>
                            To guarantee reliable delivery directly to <strong>{personalInfo.email}</strong>, we have prepared a secure email draft. If your mail app did not open automatically, please click one of the quick options below or copy-paste using the toolkit:
                          </p>
                        </div>
                      ) : (
                        <p>
                          Thank you! Your message has been sent successfully via professional gateway directly to <strong>{personalInfo.email}</strong>. No other action is required — I will reply swiftly!
                        </p>
                      )}
                    </div>
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
                        setSelectedPreset(null);
                      }}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preset Pills container */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      ✨ Blueprint Presets (Pre-fill Form Templates)
                    </span>
                    <div className="flex flex-wrap gap-2 text-left">
                      {presets.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => applyPreset(p.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all border outline-none cursor-pointer ${
                            selectedPreset === p.id 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {showErrors && !allChecksPass && (
                      <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold leading-relaxed">
                        ⚠️ Please make sure to fill out all the fields correctly. Brand names and text inputs must be valid, and your message should contain at least 10 characters.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left font-sans">
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
                      <div className="space-y-1 text-left font-sans">
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
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Your Message</label>
                        <span className={`text-[10px] font-mono font-bold ${formData.message.trim().length >= 10 ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {formData.message.trim().length} chars (min. 10)
                        </span>
                      </div>
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

                    {/* SQA Test Pipeline Assertions Monitor */}
                    <div className="bg-slate-950 text-slate-200 rounded-xl p-4 border border-slate-800 font-mono text-[11px] space-y-2.5 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${allChecksPass ? 'bg-emerald-500 hover:scale-110' : 'bg-amber-500 animate-pulse'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">QA Pipeline Assertion Status</span>
                        </div>
                        <span className="text-[9px] text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">v1.2.5</span>
                      </div>
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">test_case_01 [name_length_assert]:</span>
                          {sanityChecks.nameLength ? (
                            <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30">PASS</span>
                          ) : (
                            <span className="text-slate-500">PENDING [Name &gt;= 2 chars]</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">test_case_02 [email_syntax_match]:</span>
                          {sanityChecks.validEmail ? (
                            <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30">PASS</span>
                          ) : (
                            <span className="text-slate-500">PENDING [Regex Verification]</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">test_case_03 [message_body_integrity]:</span>
                          {sanityChecks.messageFilled ? (
                            <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30">PASS</span>
                          ) : (
                            <span className="text-slate-500">PENDING [Message &gt;= 10 chars]</span>
                          )}
                        </div>
                      </div>
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
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
