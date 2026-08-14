// Seeds the X article "The Science Behind AI Brand Visibility" (by Cicada
// Market Making, featuring PromptRaise founders) as a new draft/review blog
// post in the production Sanity dataset. Idempotent (createOrReplace).
//
// Rebuilds the portable-text body programmatically from the fxtwitter article
// Draft.js JSON (/tmp/promptraise_article.json), preserving blockquotes,
// h2 headings, bold segments, bullet/numbered lists, and inline images with
// captions. Status = "review" (NOT published) so Zain reviews in Studio first.
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const projectId = "4pws3pyj";
const dataset = "production"; // single live dataset (per infra memory)
const token = ""; // set via SANITY_API_WRITE_TOKEN below

// Read tokens from .env.local
const envRaw = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
function envVar(name: string): string {
  const m = envRaw.match(new RegExp(`^${name}[=\\s"']*(.*?)[\\s"']*$`, "m"));
  return m?.[1] ?? "";
}
const writeToken = envVar("SANITY_API_WRITE_TOKEN");
if (!writeToken) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: writeToken,
});

// ── Load article JSON ────────────────────────────────────────────────────────
const art = JSON.parse(fs.readFileSync("/tmp/promptraise_article.json", "utf8"))
  .tweet.article;

const blocks = art.content.blocks;
const entityMap = art.content.entityMap;

// Map entity key -> MEDIA info (mediaId + caption)
const mediaByEntity: Record<string, { mediaId: string; caption: string }> = {};
for (const ent of entityMap) {
  if (ent.value.type === "MEDIA") {
    const data = ent.value.data;
    mediaByEntity[ent.key] = {
      mediaId: data.mediaItems?.[0]?.mediaId ?? "",
      caption: data.caption ?? "",
    };
  }
}

// Map mediaId -> local downloaded file path
const mediaFile: Record<string, string> = {
  "2036460643629539332": "/tmp/pra_assets/img2_orig.jpg", // HEL2Km6aIAQFEan
  "2036466878403706880": "/tmp/pra_assets/img3_orig.jpg", // HEL71hQaAAAXLKD
  "2036462100219043844": "/tmp/pra_assets/img4_orig.jpg", // HEL3fZIaIAQ4OFX
};

const styleToSanity: Record<string, string> = {
  "header-one": "h1",
  "header-two": "h2",
  "header-three": "h3",
  blockquote: "blockquote",
  "unordered-list-item": "bullet",
  "ordered-list-item": "number",
};

/**
 * Build a Sanity block from a Draft.js block, splitting children at bold
 * segment boundaries.
 */
function toSanityBlock(draftBlock: any, keyIdx: number): any {
  const text = draftBlock.text ?? "";
  const type = draftBlock.type;
  let ents = draftBlock.entityRanges ?? [];

  if (type === "atomic") {
    // Media (drop-column image). The entity maps to a MEDIA entity.
    const entityKey = ents[0]?.key;
    const media =
      entityKey !== undefined ? mediaByEntity[entityKey] : undefined;
    if (media) {
      const filePath = mediaFile[media.mediaId];
      if (!filePath) {
        console.warn("  (no local file for mediaId", media.mediaId, ")");
        return null;
      }
      return { type: "image", filePath, caption: media.caption };
    }
    return null; // DIVIDER spacers are ignored
  }

  const style = styleToSanity[type] ?? "normal";

  // Only media entities matter for links here; text has no real hyperlinks.
  const boldRanges = (draftBlock.inlineStyleRanges ?? []).filter(
    (r: any) => r.style === "Bold",
  );

  // Build children spans, breaking text into bold/non-bold pieces.
  const children: any[] = [];
  let pos = 0;
  for (const br of boldRanges) {
    if (br.offset > pos) {
      children.push({
        _type: "span",
        marks: [],
        text: text.slice(pos, br.offset),
      });
    }
    children.push({
      _type: "span",
      marks: ["strong"],
      text: text.slice(br.offset, br.offset + br.length),
    });
    pos = br.offset + br.length;
  }
  if (pos < text.length) {
    children.push({ _type: "span", marks: [], text: text.slice(pos) });
  }
  if (children.length === 0) {
    children.push({ _type: "span", marks: [], text: "" });
  }

  // Sanity text blocks cannot be empty; use a non-breaking space placeholder
  if (!children.some((c) => c.text.trim().length > 0)) {
    children[0].text = " ";
  }

  return {
    _type: "block",
    _key: `b_${keyIdx}`,
    style,
    markDefs: [],
    children,
  };
}

// ── Upload images to Sanity asset pipeline ───────────────────────────────────
async function uploadImage(filePath: string, label: string): Promise<string> {
  if (!fs.existsSync(filePath)) throw new Error("missing " + filePath);
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(filePath),
    {
      filename: path.basename(filePath),
      contentType: "image/jpeg",
    },
  );
  console.log("  uploaded", label, "->", asset._id);
  return asset._id;
}

// ── Build body ───────────────────────────────────────────────────────────────
async function buildBody(): Promise<{ body: any[]; coverAssetId: string }> {
  const body: any[] = [];
  const uploaded: Record<string, string> = {}; // mediaId -> asset _id
  let keyIdx = 0;

  // Cover image upload
  const coverAssetId = await uploadImage(
    "/tmp/pra_assets/cover_orig.jpg",
    "cover",
  );

  for (const b of blocks) {
    const sb = toSanityBlock(b, keyIdx);
    if (!sb) continue;
    keyIdx++;
    if (sb.type === "image") {
      if (!uploaded[sb.filePath]) {
        uploaded[sb.filePath] = await uploadImage(sb.filePath, "inline");
      }
      body.push({
        _type: "image",
        _key: `img_${keyIdx}`,
        asset: { _ref: uploaded[sb.filePath], _type: "reference" },
        alt: sb.caption,
        caption: sb.caption,
      });
    } else {
      body.push(sb);
    }
  }
  console.log("  body blocks:", body.length);
  return { body, coverAssetId };
}

// ── Author / meta ────────────────────────────────────────────────────────────
const AUTHOR = {
  name: "PromptRaise",
  role: "Brand Visibility Research",
};

const META = {
  title: "The Science Behind AI Brand Visibility",
  slug: "the-science-behind-ai-brand-visibility",
  excerpt:
    "The marketing world is facing a tectonic shift: 72% of B2B buyers now begin their journey in AI. Here's how PromptRaise turns AI visibility into measurable leadership.",
  category: "AI Strategy",
  metaTitle: "The Science Behind AI Brand Visibility | PromptRaise",
  metaDescription:
    "72% of B2B buyers now start with ChatGPT, Claude, Perplexity, or Gemini. How PromptRaise's GEO system turns AI visibility into verifiable, measurable growth.",
};

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Building body from article (", blocks.length, "blocks )...");
  const { body, coverAssetId } = await buildBody();

  const doc = {
    _id: `post-${META.slug}`,
    _type: "post",
    title: META.title,
    slug: { _type: "slug", current: META.slug },
    excerpt: META.excerpt,
    coverImage: {
      _type: "image",
      asset: { _ref: coverAssetId, _type: "reference" },
    },
    categories: [META.category],
    body,
    author: { name: AUTHOR.name, role: AUTHOR.role },
    status: "review", // leave unpublished for Zain to review & publish
    metaTitle: META.metaTitle,
    metaDescription: META.metaDescription,
    // publishedAt intentionally unset
  };

  console.log("Creating document post-" + META.slug, "(status: review)...");
  const res = await client.createOrReplace(doc);
  console.log("OK ->", res._id, "| published:", res.status);
  console.log(
    "\nStudio:" + ` https://promptraise.com/studio/blog/post-${META.slug}`,
  );
}

main().catch((e) => {
  console.error("FAILED", e.message);
  process.exit(1);
});
