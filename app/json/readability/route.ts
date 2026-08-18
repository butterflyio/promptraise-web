import { NextResponse } from "next/server";

import { analyzeText } from "@/lib/readability";

/**
 * JSON endpoint for AI agents, scripts and any programmatic consumer of the
 * readability analysis. POST { text } and get the same numbers the calculator
 * shows, without a browser.
 *
 *   curl -s -X POST https://promptraise.com/json/readability \
 *     -H 'Content-Type: application/json' \
 *     -d '{"text":"Your Web3 copy here"}'
 *
 * Rate/size guard: text is capped at 100,000 chars; no auth needed (client
 * math anyway, just mirrored server-side).
 */

const MAX_TEXT = 100_000;

export async function POST(request: Request) {
  let body: { text?: unknown };
  try {
    body = (await request.json()) as { text?: unknown };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 },
    );
  }
  const text = typeof body?.text === "string" ? body.text : "";
  if (text.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "empty-text" },
      { status: 400 },
    );
  }
  if (text.length > MAX_TEXT) {
    return NextResponse.json(
      { ok: false, error: "too-large", max: MAX_TEXT },
      { status: 413 },
    );
  }

  const r = analyzeText(text);

  return NextResponse.json({
    ok: true,
    text_length: text.length,
    readability: {
      reading_ease: r.readability.readingEase,
      grade_level: r.readability.gradeLevel,
      gunning_fog: r.readability.gunningFog,
      smog: r.readability.smog,
      coleman_liau: r.readability.colemanLiau,
      ari: r.readability.ari,
      words: r.readability.wordCount,
      sentences: r.readability.sentenceCount,
      complex_words: r.readability.complexWordCount,
      avg_sentence_length: r.readability.avgSentenceLength,
      avg_syllables_per_word: r.readability.avgSyllablesPerWord,
      reading_time_minutes: r.readability.readingTimeMinutes,
      web3_terms: r.readability.uniqueWeb3Terms,
    },
    citation: {
      score: r.citation.score,
      entity_clarity: r.citation.entityClarity,
      defined_terms: r.citation.definedTerms,
      groundability: r.citation.groundability,
      structure: r.citation.structure,
      signals: r.citation.signals,
    },
    engine_verdicts: r.engineVerdicts.map((v) => ({
      engine: v.engine,
      score: v.score,
      label: v.label,
      reasoning: v.reasoning,
      tip: v.tip,
    })),
  });
}
