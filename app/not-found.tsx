import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mobile:px-6 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        The page you requested does not exist or has moved. Continue to the home
        page and follow the latest PromptRaise updates from there.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
