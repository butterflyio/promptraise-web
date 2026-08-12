"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import {
  analyzeText,
  gradeLevelLabel,
  readingEaseLabel,
  type ReadabilityResult,
} from "@/lib/readability";

const GENRES: {
  id: string;
  label: string;
  target: [number, number];
  note: string;
}[] = [
  {
    id: "general",
    label: "General audience",
    target: [60, 70],
    note: "Flesch 60-70 (plain English).",
  },
  {
    id: "explainer",
    label: "Web3 explainer",
    target: [45, 60],
    note: "Flesch 45-60 (a bit denser, still readable).",
  },
  {
    id: "whitepaper",
    label: "Whitepaper",
    target: [30, 50],
    note: "Flesch 30-50 (technical is OK).",
  },
  {
    id: "tutorial",
    label: "Tutorial / docs",
    target: [55, 70],
    note: "Flesch 55-70 (step-following friendly).",
  },
];

// Sample text so the tool demos instantly (also serves as a Web3 test case).
const SAMPLE = `Renzo is a liquid restaking protocol. It turns restaked ETH into a liquid token called ezETH. Users can deposit ether and receive ezETH in return, which keeps earning yield while staying spendable. The protocol is audited by multiple leading security firms. As of this quarter, Renzo manages over three billion dollars in total value locked across its vaults.`;

const EMPTY: ReadabilityResult = {
  charCount: 0,
  charCountNoSpaces: 0,
  wordCount: 0,
  sentenceCount: 0,
  syllableCount: 0,
  complexWordCount: 0,
  complexWordPct: 0,
  avgSentenceLength: 0,
  avgSyllablesPerWord: 0,
  readingEase: null,
  gradeLevel: null,
  readingTimeMinutes: 0,
  uniqueWeb3Terms: [],
  wordAnalyses: [],
};

export default function ReadabilityTool() {
  const [text, setText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [genre, setGenre] = useState<string>(GENRES[1]!.id);

  const result = useMemo(
    () => (analyzed && text.trim().length > 0 ? analyzeText(text) : null),
    [analyzed, text],
  );

  const activeGenre = GENRES.find((g) => g.id === genre) ?? GENRES[0]!;
  const inTarget =
    result != null &&
    result.readability.readingEase != null &&
    result.readability.readingEase >= activeGenre.target[0] &&
    result.readability.readingEase <= activeGenre.target[1];

  return (
    <div className="flex flex-col gap-10">
      {/* ---- Controls ---- */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[var(--text-muted)]">Genre:</span>
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setGenre(g.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                genre === g.id
                  ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                  : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--text-muted)]">{activeGenre.note}</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your Web3 copy, whitepaper excerpt, or landing page text here..."
          className="min-h-[220px] w-full resize-y rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAnalyzed(true)}
            className="rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Analyze text
          </button>
          <button
            onClick={() => {
              setText(SAMPLE);
              setAnalyzed(true);
            }}
            className="rounded-full border border-[var(--border-default)] px-6 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
          >
            Try Web3 example
          </button>
          {text && (
            <button
              onClick={() => {
                setText("");
                setAnalyzed(false);
              }}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ---- Results ---- */}
      {result ? (
        <div className="flex flex-col gap-8">
          <ScoreHeader
            citationScore={result.citation.score}
            citationSignals={result.citation.signals}
            readingEase={result.readability.readingEase}
            gradeLevel={result.readability.gradeLevel}
            inTarget={inTarget}
            genreLabel={activeGenre.label}
          />

          <MetricGrid readability={result.readability} />

          {result.citation.signals.length > 0 && (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
                How to make this more citable
              </h3>
              <ul className="flex flex-col gap-2">
                {result.citation.signals.map((s, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mr-2 text-[var(--accent-primary)]">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.readability.uniqueWeb3Terms.length > 0 && (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
                Web3 terms detected ({result.readability.uniqueWeb3Terms.length}
                )
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.readability.uniqueWeb3Terms.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--accent-secondary)] px-3 py-1 text-xs text-[var(--accent-primary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                These are scored with Web3-aware rules, so industry terms are
                not falsely punished as &ldquo;complex.&rdquo;
              </p>
            </div>
          )}

          {/* Lead capture - the real point of the tool */}
          <div className="rounded-2xl border border-[var(--accent-primary)] bg-[var(--bg-surface)] p-8 text-center">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              Want AI to actually cite your protocol?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
              Get a free AI-viability audit and see how ChatGPT, Perplexity and
              Claude currently talk about your project - and how to become the
              answer instead of the rumor.
            </p>
            <a
              href="https://audit.promptraise.com"
              className="mt-6 inline-flex items-center rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
            >
              Get free audit
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[var(--text-muted)]">
          Paste text above and hit{" "}
          <span className="text-[var(--accent-primary)]">Analyze</span> - or use
          the Web3 example to see how it works.
        </p>
      )}
    </div>
  );
}

/* ---- Score header --------------------------------------------------------- */

function ScoreHeader({
  citationScore,
  citationSignals,
  readingEase,
  gradeLevel,
  inTarget,
  genreLabel,
}: {
  citationScore: number;
  citationSignals: string[];
  readingEase: number | null;
  gradeLevel: number | null;
  inTarget: boolean;
  genreLabel: string;
}) {
  const citeColor =
    citationScore >= 70
      ? "text-[#67ff67]"
      : citationScore >= 45
        ? "text-[#e8c766]"
        : "text-[#ff7a6e]";
  const easeLabel = readingEaseLabel(readingEase);
  const citeLabel =
    citationScore >= 70 ? "High" : citationScore >= 45 ? "Medium" : "Low";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium tracking-wide text-[var(--text-muted)] uppercase">
            Citation Readiness
          </h3>
          <span className={cn("text-sm font-semibold", citeColor)}>
            {citeLabel}
          </span>
        </div>
        <p className={cn("mt-2 text-5xl font-bold", citeColor)}>
          {citationScore}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
          How likely answer engines are to pull a clean, grounded, citable
          sentence from your text (PromptRaise proprietary GEO signal).
        </p>
        {citationSignals.length === 0 && (
          <p className="mt-3 text-xs font-medium text-[var(--accent-primary)]">
            Strong citation readiness - keep the grounded facts.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium tracking-wide text-[var(--text-muted)] uppercase">
            Flesch Reading Ease
          </h3>
          <span
            className={cn(
              "text-sm font-semibold",
              inTarget ? "text-[#67ff67]" : "text-[#e8c766]",
            )}
          >
            {inTarget ? "In target" : "Off target"} for {genreLabel}
          </span>
        </div>
        <p className="mt-2 text-5xl font-bold text-[var(--text-primary)]">
          {readingEase ?? "-"}
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {easeLabel} · Grade level{" "}
          <span className="text-[var(--text-primary)]">
            {gradeLevelLabel(gradeLevel)}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---- Metric grid ---------------------------------------------------------- */

function MetricGrid({ readability }: { readability: ReadabilityResult }) {
  const metrics: { label: string; value: string }[] = [
    { label: "Words", value: String(readability.wordCount) },
    { label: "Sentences", value: String(readability.sentenceCount) },
    { label: "Syllables", value: String(readability.syllableCount) },
    { label: "Characters", value: String(readability.charCount) },
    {
      label: "Complex words",
      value: `${readability.complexWordCount} (${readability.complexWordPct.toFixed(1)}%)`,
    },
    {
      label: "Avg sentence",
      value: `${readability.avgSentenceLength.toFixed(1)} words`,
    },
    {
      label: "Avg syllables/word",
      value: readability.avgSyllablesPerWord.toFixed(2),
    },
    {
      label: "Reading time",
      value: `${formatTime(readability.readingTimeMinutes)}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4"
        >
          <p className="text-xs text-[var(--text-muted)]">{m.label}</p>
          <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---- Helpers -------------------------------------------------------------- */

function formatTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const h = Math.floor(minutes / 60);
  return `${h}h ${Math.round(minutes % 60)}m`;
}
