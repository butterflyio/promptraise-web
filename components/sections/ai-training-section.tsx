'use client';

import { DsBadge, DsSection, DsSectionContainer } from '@/components/design-system';
import { CheckCircle2 } from 'lucide-react';

const LAYERS = [
  {
    id: 1,
    number: '01',
    title: 'PromptRaise Engine',
    description:
      'AI content gap analysis engine. Scans Reddit, Twitter/X, Telegram, and the LLM landscape to deliver a precise plan: what to write, for whom, on which platforms.',
    benefits: [
      'Community and audience question analysis',
      'Competitive content audit',
      'High LLM-intent keyword identification',
      'Individual briefs for each creator',
      'Atlas Dashboard: three priority cards',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Content from Real People',
    description:
      'Every piece is created by a real author with a real audience and published on platforms LLM models trust. No AI-generated filler. Real voices in authoritative sources.',
    benefits: [
      'Unique angle and voice for each creator',
      'Publications in Tier-1–2 crypto media',
      'Medium, Twitter, Substack, niche blogs',
      'Quality control before every publication',
      'Transparent reporting — client sees everything',
    ],
  },
];

export function AiTrainingSection() {
  return (
    <DsSection>
      <DsSectionContainer>
        {/* Header with badge */}
        <div className="relative mb-16 flex items-start justify-between">
          <div>
            <h2 className="font-sans text-4xl font-bold text-white leading-tight mb-6 max-w-2xl">
              We create content that trains AI
            </h2>
            <p className="text-sm text-white/60 max-w-xl leading-relaxed">
              Real creators, authoritative media, right structure.
              <br />
              This is exactly the content LLM models read, index, and reproduce in their answers.
            </p>
          </div>

          {/* "How we solve it" badge — circuit-board style connector */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-0">
              {/* Left line */}
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))',
                }}
              />
              {/* Badge pill */}
              <div
                className="px-4 py-1.5 rounded-full text-xs tracking-wide font-medium text-white/60 shrink-0"
                style={{
                  background: 'rgba(20,22,20,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                How we solve it
              </div>
              {/* Right line */}
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Layer cards grid — 2 rows × 1 column, each with left content + right benefits */}
        <div className="space-y-0">
          {LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              className={`relative grid grid-cols-2 gap-12 items-start ${
                idx === 0
                  ? 'border-b border-white/5 pb-12'
                  : 'border-t border-white/5 pt-12'
              }`}
            >
              {/* Left: Layer number + title + description */}
              <div>
                <div className="text-white/40 text-xs font-mono mb-3">
                  Layer {layer.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {layer.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {layer.description}
                </p>
              </div>

              {/* Right: Benefits list with green checkmarks */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-white/40 mb-4">
                  Benefits
                </div>
                <ul className="space-y-3">
                  {layer.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-green-500 mt-1"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm text-white/70 leading-snug">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
