import Link from "next/link";

/**
 * Global 404 / not-found page.
 *
 * Renders a styled, self-contained "page not found" that never looks like an
 * empty or dead-end page: it explains what happened, gives a clear "Back to
 * home" action, and offers a few discoverable escapes (blog, authors). Since
 * notFound() responses can be served through the app-level error boundary that
 * bypasses the normal route chrome, this page does not depend on the site
 * shell being present - it carries its own navigation affordances.
 */
export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mobile:px-6 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        The page you requested does not exist or has moved. Double-check the
        URL, or continue from one of these.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
        >
          Browse the blog
        </Link>
        <Link
          href="/blog/authors"
          className="inline-flex items-center rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
        >
          Meet the authors
        </Link>
      </div>
    </main>
  );
}
