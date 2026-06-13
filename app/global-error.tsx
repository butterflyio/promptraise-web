"use client";

import { useEffect } from "react";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-6 text-[var(--text-primary)]">
        <main className="mx-auto w-full max-w-3xl text-center">
          <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
            Fatal Error
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            We could not render this page
          </h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Please refresh or try again. If this keeps happening, contact the
            PromptRaise team.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex h-14 items-center rounded-full border border-[var(--border-strong)] bg-[var(--accent-primary)] px-6 text-[16px] leading-none font-normal text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
