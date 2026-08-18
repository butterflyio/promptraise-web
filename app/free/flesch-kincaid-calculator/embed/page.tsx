import { draftMode } from "next/headers";

import ReadabilityTool from "@/components/tools/readability-tool";
import { mergeCopy } from "@/lib/flesch-merge";
import {
  getFleschKincaidLanding,
  getFleschKincaidLandingPreview,
} from "@/sanity/lib/queries";

export const revalidate = 30;

/**
 * Embeddable version of the calculator - no site chrome, just the tool, so it
 * can be iframed into any docs/blog/landing page. Includes a small "powered
 * by" line for the backlink. Renders the same CMS copy as the main page.
 */
export default async function EmbedPage() {
  const isDraft = (await draftMode()).isEnabled;
  const doc = isDraft
    ? await getFleschKincaidLandingPreview()
    : await getFleschKincaidLanding();
  const copy = mergeCopy(doc);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <ReadabilityTool copy={copy} />
      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        Powered by{" "}
        <a
          href="/free/flesch-kincaid-calculator"
          className="text-[var(--accent-primary)] hover:underline"
        >
          PromptRaise Flesch-Kincaid Calculator
        </a>{" "}
        - free, no signup, 100% offline
      </p>
    </main>
  );
}
