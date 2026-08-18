"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import {
  DEFAULT_COPY,
  MIN_ANALYZE_WORDS,
  type FleschCopy,
  type FleschGenre,
} from "@/lib/flesch-copy";
import {
  analyzeText,
  detectContentGenre,
  gradeLevelLabel,
  readingEaseLabel,
  type EngineVerdict,
  type ReadabilityResult,
  type SentenceBreakdown,
} from "@/lib/readability";

/**
 * URL/link detection for the input validation. Catches explicit http(s)/www
 * links and bare domains (aave.com, docs.aave.com). Kept at module scope and
 * without the /g flag so .test() has no lastIndex state between calls.
 */
const LINK_RE =
  /(?:https?:\/\/|www\.)\S+|(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:com|org|net|io|xyz|app|dev|ai|co|eth|me|finance|exchange|link|fi|one|sol)\b/i;

/**
 * Maps each readability formula key to its glossary term name, so the formula
 * card label becomes an internal link to that term's anchor on
 * /academy/glossary (and /glossary). Anchors use #term-<slug>.
 */
const FORMULA_GLOSSARY: Record<string, string> = {
  readingEase: "Flesch Reading Ease",
  gradeLevel: "Flesch-Kincaid Grade Level",
  gunningFog: "Gunning Fog Index",
  smog: "SMOG Index",
  colemanLiau: "Coleman-Liau Index",
  ari: "Automated Readability Index",
};

/** Same slug rule the glossary pages use for their #term- | #category anchors. */
function glossarySlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const GLOSSARY_URL = "/academy/glossary";

export default function ReadabilityTool({
  copy = DEFAULT_COPY,
}: {
  copy?: FleschCopy;
}) {
  const [text, setText] = useState("");
  // Snapshot taken when the user clicks Analyze. Results render only from this
  // snapshot, and editing the box clears it until they click Analyze again.
  const [analyzedText, setAnalyzedText] = useState<string | null>(null);
  const [tried, setTried] = useState(false);
  const [genre, setGenre] = useState<string>(() => {
    const defaultGenre = copy.genres.find((g) => g.id === "explainer");
    return (defaultGenre ?? copy.genres[0])?.id ?? "explainer";
  });
  // false until the user clicks a genre pill themselves - auto-detection only
  // runs while the user hasn't manually picked.
  const [manualGenre, setManualGenre] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);

  // Paste vs URL-fetch mode.
  const [mode, setMode] = useState<"paste" | "url">("paste");
  const [url, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState<string | null>(null);
  const [fetchedInfo, setFetchedInfo] = useState<{
    words: number;
    url: string;
  } | null>(null);

  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const isEmpty = trimmed.length === 0;
  const isTooShort = !isEmpty && wordCount < MIN_ANALYZE_WORDS;
  // A link/URL pasted in place of text (explicit http/www or a bare domain
  // like aave.com). The analyzer would happily score it as garbage words, so
  // we reject it up front with a clear message.
  const containsLink = !isEmpty && LINK_RE.test(trimmed);
  // Content with no letters at all (numbers/symbols/code) is not analyzable.
  const hasNoLetters = !isEmpty && !/[a-z]/i.test(trimmed);
  const valid = !isEmpty && !containsLink && !hasNoLetters && !isTooShort;

  // Strictly click-gated: analysis only ever runs on the Analyze snapshot.
  const result = useMemo(
    () => (analyzedText ? analyzeText(analyzedText) : null),
    [analyzedText],
  );

  // Clear, user-facing validation message shown after they hit Analyze.
  const error = tried
    ? isEmpty
      ? copy.emptyTextError
      : containsLink
        ? copy.linkError
        : hasNoLetters
          ? copy.invalidContentError
          : isTooShort
            ? copy.tooShortError
            : null
    : null;

  const activeGenre: FleschGenre = copy.genres.find((g) => g.id === genre) ??
    copy.genres[0] ?? {
      id: "explainer",
      label: "Web3 explainer",
      targetMin: 45,
      targetMax: 60,
      note: "",
    };
  const inTarget =
    result != null &&
    result.readability.readingEase != null &&
    result.readability.readingEase >= activeGenre.targetMin &&
    result.readability.readingEase <= activeGenre.targetMax;

  const { ui } = copy;

  const handleAnalyze = () => {
    setTried(true);
    if (!valid) return;
    const r = analyzeText(text);
    if (!manualGenre) {
      setGenre(detectContentGenre(text, r.readability));
      setAutoDetected(true);
    }
    setAnalyzedText(text);
  };

  const handleExample = () => {
    setTried(false);
    setText(copy.sampleText);
    if (!manualGenre) {
      const r = analyzeText(copy.sampleText);
      setGenre(detectContentGenre(copy.sampleText, r.readability));
      setAutoDetected(true);
    }
    setAnalyzedText(copy.sampleText);
  };

  const handleClear = () => {
    setText("");
    setAnalyzedText(null);
    setTried(false);
  };

  const selectGenre = (id: string) => {
    setGenre(id);
    setManualGenre(true);
    setAutoDetected(false);
  };

  const handleFetch = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setFetchErrorMsg(copy.emptyTextError);
      return;
    }
    if (!/^https?:\/\/[^\s]+/.test(trimmed)) {
      setFetchErrorMsg(copy.fetchError);
      return;
    }
    setFetching(true);
    setFetchErrorMsg(null);
    try {
      const res = await fetch(
        `/api/fetch-text?url=${encodeURIComponent(trimmed)}`,
      );
      const data = (await res.json()) as {
        ok?: boolean;
        words?: number;
        text?: string;
        url?: string;
      };
      if (!res.ok || !data.ok || !data.text) {
        setFetchErrorMsg(copy.fetchError);
        return;
      }
      setText(data.text);
      setTried(false);
      setFetchedInfo({ words: data.words ?? 0, url: data.url ?? trimmed });
      if (!manualGenre) {
        const r = analyzeText(data.text);
        setGenre(detectContentGenre(data.text, r.readability));
        setAutoDetected(true);
      }
      // Fetching a page is an explicit action - analyze it immediately.
      setAnalyzedText(data.text);
    } catch {
      setFetchErrorMsg(copy.fetchError);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ---- Controls ---- */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[var(--text-muted)]">
            {copy.contentTypeLabel}
          </span>
          {copy.genres.map((g) => (
            <button
              key={g.id}
              onClick={() => selectGenre(g.id)}
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
        <p className="text-sm text-[var(--text-muted)]">
          {activeGenre.note}
          {autoDetected && (
            <span className="ml-2 text-xs font-medium text-[var(--accent-primary)]">
              · {ui.autoDetectedLabel}
            </span>
          )}
        </p>

        {/* Paste vs URL-fetch toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode("paste")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              mode === "paste"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
            )}
          >
            {ui.pasteModeLabel}
          </button>
          <button
            onClick={() => setMode("url")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              mode === "url"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
            )}
          >
            {ui.urlModeLabel}
          </button>
        </div>

        {mode === "paste" ? (
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setTried(false);
              // Strict gating: any edit invalidates the previous analysis.
              setAnalyzedText(null);
            }}
            placeholder={ui.textareaPlaceholder}
            className="min-h-[200px] w-full resize-y rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
          />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setFetchErrorMsg(null);
                }}
                placeholder={ui.urlInputPlaceholder}
                type="url"
                className="min-w-[260px] flex-1 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-5 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
              />
              <button
                onClick={handleFetch}
                disabled={fetching}
                className="rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {fetching ? ui.fetchingLabel : ui.fetchButtonLabel}
              </button>
            </div>
            {fetchErrorMsg && (
              <div
                role="alert"
                className="rounded-2xl border border-[#ff7a6e]/50 bg-[#ff7a6e]/10 px-4 py-3 text-sm leading-relaxed text-[#ff9d94]"
              >
                {fetchErrorMsg}
              </div>
            )}
            {fetchedInfo && (
              <p className="text-xs text-[var(--text-muted)]">
                {ui.fetchedWordsLabel
                  .replace("{words}", String(fetchedInfo.words))
                  .replace("{url}", fetchedInfo.url)}
              </p>
            )}
          </div>
        )}

        {/* Validation feedback - shown when they try to analyze too little text */}
        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-[#ff7a6e]/50 bg-[#ff7a6e]/10 px-4 py-3 text-sm leading-relaxed text-[#ff9d94]"
          >
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAnalyze}
            className="rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            {ui.analyzeLabel}
          </button>
          <button
            onClick={handleExample}
            className="rounded-full border border-[var(--border-default)] px-6 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
          >
            {ui.exampleLabel}
          </button>
          {text && (
            <button
              onClick={handleClear}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {ui.clearLabel}
            </button>
          )}
        </div>
      </div>

      {/* ---- Results (only after using Analyze / Try Web3 example) ---- */}
      {result ? (
        <div className="flex flex-col gap-8">
          <HighlightedText
            text={analyzedText ?? ""}
            result={result.readability}
            ui={ui}
          />

          <ScoreHeader
            citationScore={result.citation.score}
            readingEase={result.readability.readingEase}
            gradeLevel={result.readability.gradeLevel}
            inTarget={inTarget}
            genreLabel={activeGenre.label}
            ui={ui}
          />

          <FormulaGrid
            readability={result.readability}
            target={[activeGenre.targetMin, activeGenre.targetMax]}
            copy={copy}
          />

          <EngineVerdicts verdicts={result.engineVerdicts} copy={copy} />

          {result.citation.signals.length > 0 && (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {copy.citationSectionTitle}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {copy.citationSectionIntro}
              </p>
              <ol className="mt-4 flex flex-col gap-3">
                {result.citation.signals.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)]/15 text-xs font-semibold text-[var(--accent-primary)]">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <MetricGrid readability={result.readability} ui={ui} />

          <BreakdownPanels
            complexWords={result.readability.complexWordList}
            longestSentences={result.readability.longestSentences}
            ui={ui}
          />

          {result.readability.uniqueWeb3Terms.length > 0 && (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
                {ui.web3TermsTitlePrefix} (
                {result.readability.uniqueWeb3Terms.length})
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
                {ui.web3TermsFootnote}
              </p>
            </div>
          )}

          {/* Lead capture - the real point of the tool */}
          <div className="rounded-2xl border border-[var(--accent-primary)] bg-[var(--bg-surface)] p-8 text-center">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              {copy.ctaHeading}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
              {copy.ctaBody}
            </p>
            <a
              href={copy.ctaHref}
              className="mt-6 inline-flex items-center rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
            >
              {copy.ctaLabel}
            </a>
          </div>
        </div>
      ) : !error ? (
        <p className="text-sm text-[var(--text-muted)]">{ui.pasteHint}</p>
      ) : null}
    </div>
  );
}

/* ---- Inline highlighting -------------------------------------------------- */

function HighlightedText({
  text,
  result,
  ui,
}: {
  text: string;
  result: ReadabilityResult;
  ui: FleschCopy["ui"];
}) {
  const complexSet = new Set(result.complexWordList);
  const hardSets = result.longestSentences
    .filter((s) => s.hard)
    .map((s) => s.text);

  // Split on word boundaries so we can wrap complex words, then rebuild.
  const tokens: { kind: "word" | "other"; value: string }[] = [];
  const re = /([a-z0-9]+(?:'[a-z]+)?)/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last)
      tokens.push({ kind: "other", value: text.slice(last, m.index) });
    tokens.push({ kind: "word", value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length)
    tokens.push({ kind: "other", value: text.slice(last) });

  const isInHardSentence = (word: string) => {
    // Rough association: complex word sits inside a flagged-hard sentence
    // if that sentence contains the word. Cheap substring match is fine here.
    return hardSets.some((s) => s.includes(word));
  };

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
      <div className="mb-2 flex items-center gap-4 text-xs text-[var(--text-muted)]">
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#ff7a6e]" />
          {ui.legendComplexWord}
        </span>
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#e8c766]" />
          {ui.legendLongSentence}
        </span>
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#67ff67]/60" />
          {ui.legendWeb3Term}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        {tokens.map((t, i) => {
          if (t.kind === "other") return <span key={i}>{t.value}</span>;
          const lower = t.value.toLowerCase();
          const isComplex = complexSet.has(lower);
          const isWeb3 =
            result.uniqueWeb3Terms.includes(lower) ||
            result.wordAnalyses.some((w) => w.word === lower && w.isWeb3Term);
          const inHard = isInHardSentence(t.value);
          return (
            <span
              key={i}
              className={cn(
                "rounded px-0.5",
                isComplex && "bg-[#ff7a6e]/25 text-[#ff9d94]",
                (inHard || isComplex) && "bg-[#e8c766]/20",
                isWeb3 && "bg-[#67ff67]/15",
                !isComplex && !isWeb3 && !inHard && "bg-transparent",
              )}
            >
              {t.value}
            </span>
          );
        })}
      </p>
    </div>
  );
}

/* ---- Score header --------------------------------------------------------- */

function ScoreHeader({
  citationScore,
  readingEase,
  gradeLevel,
  inTarget,
  genreLabel,
  ui,
}: {
  citationScore: number;
  readingEase: number | null;
  gradeLevel: number | null;
  inTarget: boolean;
  genreLabel: string;
  ui: FleschCopy["ui"];
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
            {ui.citationScoreTitle}
          </h3>
          <span className={cn("text-sm font-semibold", citeColor)}>
            {citeLabel}
          </span>
        </div>
        <p className="mt-2 flex items-baseline gap-2">
          <span className={cn("text-5xl font-bold", citeColor)}>
            {citationScore}
          </span>
          <span className="text-sm text-[var(--text-muted)]">
            {ui.scoreSuffix}
          </span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
          {ui.citationScoreDesc}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium tracking-wide text-[var(--text-muted)] uppercase">
            {ui.readingEaseTitle}
          </h3>
          <span
            className={cn(
              "text-sm font-semibold",
              inTarget ? "text-[#67ff67]" : "text-[#e8c766]",
            )}
          >
            {inTarget ? ui.inTargetLabel : ui.offTargetLabel}
            {ui.forGenreSuffix}
            {genreLabel}
          </span>
        </div>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-5xl font-bold text-[var(--text-primary)]">
            {readingEase ?? "-"}
          </span>
          <span className="text-sm text-[var(--text-muted)]">
            {ui.scoreSuffix}
          </span>
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {easeLabel} · {ui.gradeLevelPrefix}{" "}
          <span className="text-[var(--text-primary)]">
            {gradeLevelLabel(gradeLevel)}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---- Formula grid --------------------------------------------------------- */

function FormulaGrid({
  readability,
  target,
  copy,
}: {
  readability: ReadabilityResult;
  target: [number, number];
  copy: FleschCopy;
}) {
  const defByKey = new Map(copy.formulaDefinitions.map((d) => [d.key, d]));
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <div className="mb-4 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {copy.formulasTitle}
          </h3>
          <span className="text-xs text-[var(--text-muted)]">
            {copy.formulasSubtext}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {copy.formulaDefinitions.map((f) => {
          const main = f.key === "readingEase";
          const raw = readability[f.key as keyof ReadabilityResult];
          const val = typeof raw === "number" ? raw : "-";
          const isTarget =
            main &&
            typeof raw === "number" &&
            raw >= target[0] &&
            raw <= target[1];
          const glossaryTerm = FORMULA_GLOSSARY[f.key];
          const termHref = glossaryTerm
            ? `${GLOSSARY_URL}#term-${glossarySlug(glossaryTerm)}`
            : null;
          return (
            <div
              key={f.key}
              className="flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4"
            >
              {termHref ? (
                <a
                  href={termHref}
                  className="text-xs font-medium text-[var(--text-muted)] transition-colors group-hover:underline hover:text-[var(--accent-primary)]"
                >
                  {f.label}
                </a>
              ) : (
                <p className="text-xs font-medium text-[var(--text-muted)]">
                  {f.label}
                </p>
              )}
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                {val}
              </p>
              {main && (
                <p
                  className={cn(
                    "mt-1 text-xs",
                    isTarget ? "text-[#67ff67]" : "text-[#e8c766]",
                  )}
                >
                  {copy.ui.formulaTargetPrefix} {target[0]}-{target[1]}
                </p>
              )}
              {f.description && (
                <p className="mt-2 border-t border-[var(--border-default)] pt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  {f.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <a
        href={GLOSSARY_URL}
        className="mt-4 inline-block text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]"
      >
        {copy.glossaryLinkLabel}
      </a>
    </div>
  );
}

/* ---- Per-engine verdicts -------------------------------------------------- */

function EngineVerdicts({
  verdicts,
  copy,
}: {
  verdicts: EngineVerdict[];
  copy: FleschCopy;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
        {copy.engineVerdictTitle}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
        {copy.engineVerdictIntro}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {verdicts.map((v) => {
          const color =
            v.score >= 70
              ? "text-[#67ff67]"
              : v.score >= 45
                ? "text-[#e8c766]"
                : "text-[#ff7a6e]";
          return (
            <div
              key={v.engine}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                  <span>{v.emoji}</span> {v.engine}
                </span>
                <span className={cn("text-sm font-semibold", color)}>
                  {v.score} · {v.label}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {v.reasoning}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                <span className="text-[var(--accent-primary)]">
                  {copy.ui.tipPrefix}
                </span>{" "}
                {v.tip}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        {copy.ui.verdictFootnote}
      </p>
    </div>
  );
}

/* ---- Metric grid ---------------------------------------------------------- */

function MetricGrid({
  readability,
  ui,
}: {
  readability: ReadabilityResult;
  ui: FleschCopy["ui"];
}) {
  const metrics: { label: string; value: string }[] = [
    { label: ui.metricWords, value: String(readability.wordCount) },
    { label: ui.metricSentences, value: String(readability.sentenceCount) },
    { label: ui.metricSyllables, value: String(readability.syllableCount) },
    { label: ui.metricCharacters, value: String(readability.charCount) },
    {
      label: ui.metricComplexWords,
      value: `${readability.complexWordCount} (${readability.complexWordPct.toFixed(1)}%)`,
    },
    {
      label: ui.metricAvgSentence,
      value: `${readability.avgSentenceLength.toFixed(1)} words`,
    },
    {
      label: ui.metricAvgSyllables,
      value: readability.avgSyllablesPerWord.toFixed(2),
    },
    {
      label: ui.metricReadingTime,
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

/* ---- Breakdown panels ----------------------------------------------------- */

function BreakdownPanels({
  complexWords,
  longestSentences,
  ui,
}: {
  complexWords: string[];
  longestSentences: SentenceBreakdown[];
  ui: FleschCopy["ui"];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
          {ui.complexWordsTitle}
        </h3>
        {complexWords.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            {ui.noComplexWords}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {complexWords.map((w) => (
              <span
                key={w}
                className="rounded-full border border-[#ff7a6e]/50 bg-[#ff7a6e]/10 px-3 py-1 text-xs text-[#ff9d94]"
              >
                {w}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
          {ui.longestSentencesTitle}
        </h3>
        {longestSentences.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">{ui.noSentences}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {longestSentences.map((s, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                <span
                  className={cn(
                    "mr-2 font-medium",
                    s.hard ? "text-[#e8c766]" : "text-[var(--text-muted)]",
                  )}
                >
                  {s.wordCount}w
                </span>
                {s.text}
              </li>
            ))}
          </ul>
        )}
      </div>
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
