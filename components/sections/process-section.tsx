'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROCESS_STEPS = [
  {
    id: 1,
    number: '01',
    title: 'Content Gap Analysis',
    description: 'Identify gaps, opportunities and competitors. We identify: what your audience asks, what nobody covers, which words and topics have high demand.',
    label: 'Audit',
    icon: '◯',
    labelBg: 'bg-[#1a3d2a]',
  },
  {
    id: 2,
    number: '02',
    title: 'Tracking & Monthly Report',
    description: 'Every 2 weeks: target queries in ChatGPT, Perplexity, Google, DeepSeek, Gemini, and Grok. Monthly reports with before/after numbers, top queries, and next priorities.',
    label: 'Analytics',
    icon: '📊',
    labelBg: 'bg-[#1a3d2a]',
  },
  {
    id: 3,
    number: '03',
    title: 'Tier-1-2 Media PR',
    description: 'In-parallel — publications in CoinTelegraph, Cointimist, Decrypt, BenCrypto, The Block. LLMs trained on these sources. This builds entity authority.',
    label: 'PR',
    icon: '🔗',
    labelBg: 'bg-[#1a3d2a]',
  },
  {
    id: 4,
    number: '04',
    title: 'Current Visibility Audit',
    description: 'We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now. We fix the baseline — how often you\'re mentioned in target queries and alongside competitors.',
    label: 'Audit',
    icon: '🔍',
    labelBg: 'bg-[#1a3d2a]',
  },
  {
    id: 5,
    number: '05',
    title: 'Content from Real Creators',
    description: 'We work with unique takes to real creators. Each has their own angle, audience, platform. Not 20 identical articles. 20 different voices about one project.',
    label: 'Creators',
    icon: '💬',
    labelBg: 'bg-[#1a3d2a]',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setCanScroll(true);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const scrollLeft = scroller.scrollLeft;
      const itemWidth = scroller.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveStep(Math.min(index, PROCESS_STEPS.length - 1));
    };

    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercentage = ((activeStep + 1) / PROCESS_STEPS.length) * 100;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#0F0F0F]">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(103,255,103,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(0deg, rgba(103,255,103,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(103,255,103,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          perspective: '1000px',
          transform: 'rotateX(65deg)',
        }} />
      </div>

      <div className="relative z-10 px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-2 rounded-full border border-[#67FF67]/30 bg-[#67FF67]/5 mb-6">
            <span className="text-[#67FF67] text-xs tracking-wider font-medium">Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From analysis to ChatGPT answer
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
            Five steps — from a visibility audit to measurable growth in AI mentions.
          </p>
        </div>

        {/* Scrollable steps */}
        {canScroll && (
          <div className="mb-12">
            <div
              ref={scrollerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className="flex-shrink-0 w-full md:w-[600px] snap-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative group">
                    {/* Card with green glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#67FF67]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative p-8 md:p-10 rounded-2xl border border-[#67FF67]/20 bg-gradient-to-b from-[#1a3d2a]/30 to-[#0a1f15]/30 backdrop-blur-sm">
                      {/* Number badge */}
                      <div className="absolute top-6 right-6 text-2xl font-bold text-[#67FF67]/40">
                        {step.number}
                      </div>

                      {/* Icon placeholder */}
                      <div className="w-16 h-16 rounded-xl bg-[#67FF67]/10 border border-[#67FF67]/30 flex items-center justify-center mb-6 text-2xl">
                        {step.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-8">
                        {step.description}
                      </p>

                      {/* Label badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-[#67FF67] ${step.labelBg} border border-[#67FF67]/30`}>
                        {step.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="relative h-20 flex items-center">
          <div className="w-full h-1 bg-[#1a3d2a] rounded-full relative">
            {/* Active progress */}
            <motion.div
              className="absolute h-full bg-[#67FF67] rounded-full"
              initial={{ width: `${(1 / PROCESS_STEPS.length) * 100}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />

            {/* Step markers */}
            <div className="absolute inset-0 flex items-center justify-between px-0">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${(idx / (PROCESS_STEPS.length - 1)) * 100}%` }}
                >
                  <div className={`w-3 h-3 rounded-full transition-all ${
                    idx <= activeStep ? 'bg-[#67FF67]' : 'bg-[#1a3d2a]'
                  }`} />
                  <span className="text-xs text-white/50 mt-4 whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
