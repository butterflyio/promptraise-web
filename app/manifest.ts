import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PromptRaise",
    short_name: "PromptRaise",
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0F",
    theme_color: "#67FF67",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
