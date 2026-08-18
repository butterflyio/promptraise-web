"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Copy-to-clipboard command block: a <pre><code> with a Copy button that
 * changes color and label to "Copied!" on every click.
 *
 * The copy handler is intentionally SYNCHRONOUS-first: it runs the legacy
 * execCommand path immediately, fires the modern clipboard API without
 * awaiting it (its promise can hang in cross-origin iframes), and ALWAYS
 * shows the "Copied!" feedback right away - so the click is never silent.
 */
export default function CopyCommand({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    // 1) Synchronous legacy path - immediate, no permission prompts.
    let legacyOk = false;
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      legacyOk = document.execCommand("copy");
      ta.remove();
    } catch {
      legacyOk = false;
    }

    // 2) Modern clipboard API - fire and forget so it can never block the UI.
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    // 3) Feedback ALWAYS shows immediately.
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // 4) Only when no copy path exists at all, give the manual fallback.
    const hasModern =
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function";
    if (!legacyOk && !hasModern) {
      window.prompt("Copy:", text);
    }
  };

  return (
    <div className="relative mt-4">
      <pre className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[#0c0f14] p-4 pr-24 text-xs leading-relaxed text-[var(--text-secondary)]">
        <code>{text}</code>
      </pre>
      <button
        onClick={copy}
        className={cn(
          "absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          copied
            ? "bg-[#67ff67] text-[#0c0f14]"
            : "bg-[var(--accent-primary)] text-[var(--accent-foreground)] hover:opacity-90",
        )}
      >
        {copied ? copiedLabel : label}
      </button>
    </div>
  );
}
