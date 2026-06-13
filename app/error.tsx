"use client";

import { useEffect } from "react";

import { DsButton } from "@/components/design-system";

export default function Error({
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
    <main className="mobile:px-6 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        500
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        We hit an unexpected error while loading this page. Try again or return
        to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-14 items-center rounded-full border border-[var(--border-strong)] bg-[var(--accent-primary)] px-6 text-[16px] leading-none font-normal text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <DsButton href="/" variant="light">
          Back to home
        </DsButton>
      </div>
    </main>
  );
}

