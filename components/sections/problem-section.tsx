import { ProblemSectionClient } from './problem-section-client';

const PROBLEMS = [
  {
    id: 1,
    title: '72% of B2B buyers start research with AI',
    desc: 'Not through Google. Not through your website.',
    pos: { top: '12%', left: '8%' },
  },
  {
    id: 2,
    title: 'Traditional marketing doesn&apos;t reach AI',
    desc: 'Your SEO tactics won&apos;t work on Claude, ChatGPT, or Perplexity.',
    pos: { top: '58%', left: '6%' },
  },
  {
    id: 3,
    title: 'You&apos;re invisible where decisions are made',
    desc: 'Founders, investors, and users discover you through AI. Or they don&apos;t.',
    pos: { top: '28%', right: '7%' },
  },
  {
    id: 4,
    title: 'Competitors are already in ChatGPT',
    desc: 'They&apos;re getting cited. They&apos;re getting traffic. You&apos;re not.',
    pos: { top: '64%', right: '6%' },
  },
];

export function ProblemSection() {
  return <ProblemSectionClient problems={PROBLEMS} />;
}
