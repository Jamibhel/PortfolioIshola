import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent, diagnosticQuestions } from '../data/content';
import {
  Mail,
  MapPin,
  Copy,
  Check,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Download
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, isZBMode, incrementGauge } = useApp();
  const [copied, setCopied] = useState(false);

  // Diagnostic states
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const contactData = siteContent.contact;
  const currentQ = diagnosticQuestions[currentStep];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectOption = (score: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: score }));
    incrementGauge(0.15);

    if (currentStep < diagnosticQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetDiagnostic = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const totalScore = Object.values(selectedAnswers).reduce((a, b) => a + b, 0);

  const getDiagnosis = () => {
    if (totalScore >= 10) {
      return {
        level: language === 'fr' ? 'Architecture Scalable & Résiliente' : 'Production-Grade Scalability',
        color: 'text-emerald-400',
        report:
          language === 'fr'
            ? 'Votre stack Web & Mobile respecte les meilleures pratiques de résilience : sécurité à la couche de données (PostgreSQL RLS), virtualisation et pipelines automatisés. Le prochain levier : intégrer Supabase pgvector et des micro-frontends mobiles pour accélérer la modularité.'
            : 'Your Web & Mobile stack demonstrates high architectural maturity: data-layer security (PostgreSQL RLS), 60fps UI virtualization, and automated EAS/CI pipelines. Next lever: integrate Supabase pgvector and modular micro-frontends.'
      };
    } else if (totalScore >= 6) {
      return {
        level: language === 'fr' ? 'Friction Réseau & Optimisation Requise' : 'Moderate Bottlenecks & Network Risk',
        color: 'text-orange-400',
        report:
          language === 'fr'
            ? 'Des bases solides existent, mais la gestion des déconnexions réseau et le rendu mobile présentent des risques de blocage en production. Une refonte de la couche de synchronisation offline (SQLite + Supabase Realtime) stabilisera vos applications.'
            : 'Solid foundation, but unhandled mobile network drops and heavy re-renders introduce production friction. Implementing offline-first sync (SQLite + Supabase Realtime) will dramatically improve user retention.'
      };
    } else {
      return {
        level: language === 'fr' ? 'Risque Critique de Scalabilité' : 'Critical Stack Fragility',
        color: 'text-rose-400',
        report:
          language === 'fr'
            ? 'Votre architecture repose sur du code intermédiaire fragile sans protection RLS ni mode offline. Vos utilisateurs subissent des freezes et des pertes de données. Un audit et une migration vers une architecture typée de bout en bout s’imposent d’urgence.'
            : 'Your application suffers from fragile middleware authorization, unhandled network timeouts, and lack of offline persistence. An immediate architecture overhaul and migration to strict end-to-end typing with Supabase is recommended.'
      };
    }
  };

  return (
    <section
      id="diagnostic"
      className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
        isZBMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-900 text-stone-100'
      }`}
    >
      {/* Scanlines Background Effect */}
      <div className="scanlines absolute inset-0 opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 font-mono text-[10px] uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5 text-orange-400" />
            {contactData.sectionTitle[language]}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-stone-50 leading-tight">
            {isZBMode
              ? contactData.headline[language === 'fr' ? 'zbFr' : 'zbEn']
              : contactData.headline[language]}
          </h2>

          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed mt-4">
            {isZBMode
              ? contactData.subtext[language === 'fr' ? 'zbFr' : 'zbEn']
              : contactData.subtext[language]}
          </p>
        </div>

        {/* Contact Grid: Direct Email Card & Stack Audit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Email Focus Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Primary Email Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/95 border border-stone-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-orange-400">
                  {language === 'fr' ? 'Contact direct par email' : 'Direct Email Contact'}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'fr' ? 'Réponse < 24h' : 'Inbox Active (< 24h)'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
                {language === 'fr'
                  ? 'Pour toute opportunité UI/UX Design, Développeur Full-Stack, création d’app mobile ou refonte d’architecture, écrivez-moi directement.'
                  : 'For UI/UX design roles, full-stack development, mobile apps, or system architecture consulting, reach out directly.'}
              </p>

              {/* Email Display & Copy Button */}
              <div className="flex items-center justify-between gap-3 bg-stone-950 p-4 rounded-xl border border-stone-800 mb-5">
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-orange-400 hover:underline truncate"
                >
                  {contactData.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons: Direct Mailto, WhatsApp & Download CV */}
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${contactData.email}?subject=Project%20Collaboration%20-%20Bello%20Jamiu%20Ishola`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 hover:scale-[1.02]"
                >
                  <Mail className="w-4 h-4" />
                  {contactData.writeEmail[language]}
                </a>

                {contactData.whatsapp && (
                  <a
                    href={contactData.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
                  >
                    <span>💬</span>
                    <span>WhatsApp ({contactData.whatsappDisplay})</span>
                  </a>
                )}

                <a
                  href="/Bello_Jamiu_Ishola_CV.pdf"
                  download="Bello_Jamiu_Ishola_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-stone-700 hover:border-orange-400/60 bg-stone-950 hover:bg-stone-900 text-stone-200 font-bold text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <Download className="w-4 h-4 text-orange-400" />
                  {contactData.downloadCv[language]}
                </a>
              </div>
            </div>

            {/* Quick Details & Social Profiles Card */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex flex-col gap-3 text-xs font-mono text-stone-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>{contactData.location[language]}</span>
              </div>

              <div className="flex items-center gap-3 text-stone-400">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a
                  href={`mailto:${contactData.email}`}
                  className="hover:text-orange-400 transition-colors underline underline-offset-4 truncate"
                >
                  {contactData.email}
                </a>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 mt-1">
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-orange-400 transition-colors uppercase font-bold text-[10px] tracking-wider"
                >
                  GitHub ↗
                </a>
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-orange-400 transition-colors uppercase font-bold text-[10px] tracking-wider"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={contactData.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-orange-400 transition-colors uppercase font-bold text-[10px] tracking-wider"
                >
                  isholabello.space ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic V8 Interactive Terminal */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              {/* Terminal Title Bar */}
              <div className="flex justify-between items-center pb-5 border-b border-stone-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-stone-400 ml-2">
                    {siteContent.diagnostic.sectionTitle[language]}
                  </span>
                </div>

                <div className="font-mono text-xs text-stone-400">
                  {!isCompleted ? (
                    <span>
                      STEP {currentStep + 1} / {diagnosticQuestions.length}
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETE
                    </span>
                  )}
                </div>
              </div>

              {!isCompleted ? (
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-stone-100 mb-6 leading-snug">
                    {isZBMode
                      ? currentQ.question[language === 'fr' ? 'zbFr' : 'zbEn']
                      : currentQ.question[language]}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {currentQ.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.score)}
                        className="flex items-start text-left p-3.5 rounded-xl border border-stone-800 bg-stone-950/60 hover:bg-stone-800 hover:border-orange-500/40 transition-all duration-200 group"
                      >
                        <span className="font-mono text-xs text-orange-400 font-bold mr-3 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                        <span className="text-xs sm:text-sm font-light text-stone-200 group-hover:text-stone-50">
                          {isZBMode
                            ? opt.text[language === 'fr' ? 'zbFr' : 'zbEn']
                            : opt.text[language]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in flex flex-col gap-6">
                  <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">
                        Score: {totalScore} / 12
                      </span>
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          getDiagnosis().color
                        }`}
                      >
                        {getDiagnosis().level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-light leading-relaxed text-stone-300">
                      {getDiagnosis().report}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`mailto:${contactData.email}?subject=Stack%20Audit%20Results%20(${totalScore}/12)%20-%20Shamsideen%20Tairu`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-bold text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      {siteContent.diagnostic.cta[language]}
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={handleResetDiagnostic}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-800 hover:bg-stone-800 text-stone-300 font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {language === 'fr' ? 'Recommencer' : 'Restart'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
