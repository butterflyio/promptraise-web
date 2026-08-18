"use client";

import { useState } from "react";

/**
 * Copy-to-clipboard command block: a <pre><code> with a Copy button.
 * Used for the AI-agent command and the embed snippet.
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
        className="absolute top-2 right-2 rounded-full bg-[var(--accent-primary)] px-3 py-1 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
      >
        {copied ? copiedLabel : label}
      </button>
    </div>
  );
}
