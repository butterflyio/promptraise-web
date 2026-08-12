import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata = {
  title: "Cookie Usage",
  description:
    "How PromptRaise uses cookies and similar technologies, first- and third-party cookies, and how you can control them.",
};

export default async function CookiesPage() {
  const html = await readFile(
    path.join(process.cwd(), "app/cookies/cookies-content.html"),
    "utf8",
  );

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-3xl px-4 py-16">
      <div
        data-custom-class="body"
        className="leading-relaxed text-[var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
