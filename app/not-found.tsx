import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-text-muted)]">
        The page you requested does not exist or has moved. Continue to the home
        page and follow the latest PromptRaise updates from there.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-[var(--color-primary-foreground)]"
      >
        Back to home
      </Link>
    </main>
  );
}
