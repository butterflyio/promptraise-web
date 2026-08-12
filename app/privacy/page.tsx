import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata = {
  title: "Privacy Notice",
  description:
    "The PromptRaise Transparency Notice: how and why we process your personal information, your rights, and our privacy practices.",
};

export default async function PrivacyPage() {
  const html = await readFile(
    path.join(process.cwd(), "app/privacy/privacy-content.html"),
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
