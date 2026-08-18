// Shared merge of the fleschKincaidLanding CMS doc over the in-code defaults.
// Used by both the main calculator page and the embed page so they always
// render identical copy.

import { DEFAULT_COPY, type FleschCopy } from "./flesch-copy";

/** Fallback display names when the CMS leaves a formula label blank. */
export const DEFAULT_FORMULA_LABELS: Record<string, string> = {
  readingEase: "Flesch Reading Ease",
  gradeLevel: "Flesch-Kincaid Grade",
  gunningFog: "Gunning Fog",
  smog: "SMOG",
  colemanLiau: "Coleman-Liau",
  ari: "ARI",
};

/**
 * Merge the CMS doc over the in-code defaults so a blank or missing CMS field
 * never drops a section. `formulaDefinitions`, `genres`, `faq` and `ui` are
 * replaced wholesale when the CMS provides non-empty values, else defaults.
 */
export function mergeCopy(doc: Record<string, unknown> | null): FleschCopy {
  if (!doc) return DEFAULT_COPY;
  const copy = { ...DEFAULT_COPY };

  const simpleKeys: (keyof FleschCopy)[] = [
    "heroTitle",
    "heroSubtitle",
    "privacyBadge",
    "privacyTitle",
    "privacyBody",
    "trustLine",
    "contentTypeLabel",
    "emptyTextError",
    "tooShortError",
    "linkError",
    "invalidContentError",
    "fetchError",
    "disclaimerText",
    "truncationNote",
    "methodologyTitle",
    "methodologyBody",
    "contactEmailLabel",
    "contactEmail",
    "embedSectionTitle",
    "embedBody",
    "embedBadges",
    "apiSectionTitle",
    "apiBody",
    "faqSectionTitle",
    "sampleText",
    "introSectionTitle",
    "introBody1",
    "introBody2",
    "formulasTitle",
    "formulasSubtext",
    "glossaryLinkLabel",
    "engineVerdictTitle",
    "engineVerdictIntro",
    "citationSectionTitle",
    "citationSectionIntro",
    "ctaHeading",
    "ctaBody",
    "ctaLabel",
    "ctaHref",
  ];
  for (const key of simpleKeys) {
    const val = doc[key];
    if (typeof val === "string" && val.trim().length > 0) {
      (copy as Record<string, unknown>)[key] = val;
    }
  }

  const formulas = doc["formulaDefinitions"];
  if (Array.isArray(formulas) && formulas.length > 0) {
    const mapped = formulas
      .map((f) => {
        const entry = f as {
          key?: string;
          label?: string;
          description?: string;
        };
        if (!entry.key || typeof entry.description !== "string") return null;
        return {
          key: entry.key,
          label:
            typeof entry.label === "string" && entry.label.trim().length > 0
              ? entry.label
              : (DEFAULT_FORMULA_LABELS[entry.key] ?? entry.key),
          description: entry.description,
        };
      })
      .filter(
        (x): x is { key: string; label: string; description: string } =>
          x !== null,
      );
    if (mapped.length > 0) copy.formulaDefinitions = mapped;
  }

  const genres = doc["genres"];
  if (Array.isArray(genres) && genres.length > 0) {
    const mapped = genres
      .map((g) => {
        const entry = g as {
          id?: string;
          label?: string;
          targetMin?: number;
          targetMax?: number;
          note?: string;
        };
        if (
          typeof entry.id !== "string" ||
          entry.id.trim().length === 0 ||
          typeof entry.label !== "string" ||
          entry.label.trim().length === 0 ||
          typeof entry.targetMin !== "number" ||
          typeof entry.targetMax !== "number"
        ) {
          return null;
        }
        return {
          id: entry.id,
          label: entry.label,
          targetMin: entry.targetMin,
          targetMax: entry.targetMax,
          note: typeof entry.note === "string" ? entry.note : "",
        };
      })
      .filter(
        (x): x is NonNullable<typeof x> =>
          x !== null && x.targetMax >= x.targetMin,
      );
    if (mapped.length > 0) copy.genres = mapped;
  }

  const ui = doc["ui"];
  if (ui && typeof ui === "object") {
    const uiSrc = ui as Record<string, unknown>;
    const merged: Record<string, unknown> = { ...copy.ui };
    for (const key of [
      "analyzeLabel",
      "exampleLabel",
      "clearLabel",
      "textareaPlaceholder",
      "pasteHint",
      "pasteModeLabel",
      "urlModeLabel",
      "urlInputPlaceholder",
      "fetchButtonLabel",
      "fetchingLabel",
      "fetchedWordsLabel",
      "shareButtonLabel",
      "copiedLabel",
      "sharedStripLabel",
      "citationScoreTitle",
      "readingEaseTitle",
      "scoreSuffix",
      "citationScoreDesc",
      "inTargetLabel",
      "offTargetLabel",
      "forGenreSuffix",
      "gradeLevelPrefix",
      "formulaTargetPrefix",
      "tipPrefix",
      "verdictFootnote",
      "metricWords",
      "metricSentences",
      "metricSyllables",
      "metricCharacters",
      "metricComplexWords",
      "metricAvgSentence",
      "metricAvgSyllables",
      "metricReadingTime",
      "complexWordsTitle",
      "longestSentencesTitle",
      "noComplexWords",
      "noSentences",
      "web3TermsTitlePrefix",
      "web3TermsFootnote",
      "legendComplexWord",
      "legendLongSentence",
      "legendWeb3Term",
      "autoDetectedLabel",
    ]) {
      const val = uiSrc[key];
      if (typeof val === "string" && val.trim().length > 0) {
        merged[key] = val;
      }
    }
    copy.ui = merged as unknown as typeof copy.ui;
  }

  const faq = doc["faq"];
  if (Array.isArray(faq) && faq.length > 0) {
    const mapped = faq
      .map((f) => {
        const entry = f as { question?: string; answer?: string };
        if (
          typeof entry.question !== "string" ||
          typeof entry.answer !== "string"
        ) {
          return null;
        }
        return { question: entry.question, answer: entry.answer };
      })
      .filter(
        (x): x is { question: string; answer: string } =>
          x !== null &&
          x.question.trim().length > 0 &&
          x.answer.trim().length > 0,
      );
    if (mapped.length > 0) copy.faq = mapped;
  }

  const embedSteps = doc["embedSteps"];
  if (Array.isArray(embedSteps) && embedSteps.length > 0) {
    const mapped = embedSteps
      .map((s) => {
        const entry = s as { title?: string; body?: string };
        if (
          typeof entry.title !== "string" ||
          entry.title.trim().length === 0 ||
          typeof entry.body !== "string"
        ) {
          return null;
        }
        return { title: entry.title, body: entry.body };
      })
      .filter((x): x is { title: string; body: string } => x !== null);
    if (mapped.length > 0) copy.embedSteps = mapped;
  }

  const embedFaq = doc["embedFaq"];
  if (Array.isArray(embedFaq) && embedFaq.length > 0) {
    const mapped = embedFaq
      .map((f) => {
        const entry = f as { question?: string; answer?: string };
        if (
          typeof entry.question !== "string" ||
          typeof entry.answer !== "string"
        ) {
          return null;
        }
        return { question: entry.question, answer: entry.answer };
      })
      .filter(
        (x): x is { question: string; answer: string } =>
          x !== null &&
          x.question.trim().length > 0 &&
          x.answer.trim().length > 0,
      );
    if (mapped.length > 0) copy.embedFaq = mapped;
  }

  return copy;
}
