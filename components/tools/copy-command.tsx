"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Copy-to-clipboard command block: a <pre><code> with a Copy button that
 * changes color and label to "Copied!" after a successful copy.
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
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Fallback for older/insecure contexts.
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    // Always show feedback so the user knows the click registered.
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (!ok) window.prompt("Copy:", text);
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
