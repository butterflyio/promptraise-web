import { NextResponse } from "next/server";

/**
 * Fetches the main readable text of a URL so the Flesch-Kincaid calculator can
 * analyze a live page (paste-vs-URL toggle), like readabilitycheck.com.
 *
 * Security: SSRF-guarded (http/https only, public hosts only - refuses
 * localhost/private/loopback/link-local), time-bounded fetch, and the body is
 * capped so we never send a huge payload to the client.
 */

const MAX_BODY = 200_000; // chars of raw HTML to read
const MAX_OUT = 50_000; // chars of extracted text to return
const TIMEOUT_MS = 15_000;

function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal")
  ) {
    return true;
  }
  const v4 = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const parts = v4.slice(1).map(Number);
    const a = parts[0] ?? 0;
    const b = parts[1] ?? 0;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a >= 224) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }
  if (h.includes(":")) {
    // IPv6: only allow a normal global unicast address is a hard check; for a
    // tool like this we simply refuse any literal IPv6 to be safe.
    if (/^[0-9a-f:]+$/i.test(h)) return true;
  }
  return false;
}

/** Roughly extract the main readable text from HTML. */
function extractText(html: string): string {
  // Pull the part most likely to be the article body.
  const mainMatch =
    html.match(/<main[\s>][\s\S]*?<\/main>/i) ??
    html.match(/<article[\s>][\s\S]*?<\/article>/i) ??
    html.match(/<div[^>]*role=["']main["'][\s\S]*?<\/div>/i);
  let body = mainMatch ? mainMatch[0] : html;

  // Drop non-content blocks.
  body = body.replace(
    /<(script|style|noscript|template|svg|nav|footer|header|aside|form|button|iframe)[\s>][\s\S]*?<\/\1>/gi,
    " ",
  );

  // Remove tags, unescape, collapse whitespace.
  let text = body
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, MAX_OUT);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = (searchParams.get("url") ?? "").trim();

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-url" },
      { status: 400 },
    );
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json(
      { ok: false, error: "invalid-protocol" },
      { status: 400 },
    );
  }
  if (isPrivateHost(parsed.hostname)) {
    return NextResponse.json(
      { ok: false, error: "private-host" },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(parsed.toString(), {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; PromptraiseBot/1.0; +https://promptraise.com)",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "http-status", status: res.status },
        { status: 502 },
      );
    }
    const ct = res.headers.get("content-type") ?? "";
    if (!/text\/html|application\/xhtml/.test(ct)) {
      return NextResponse.json(
        { ok: false, error: "not-html", contentType: ct },
        { status: 422 },
      );
    }
    const html = (await res.text()).slice(0, MAX_BODY);
    const text = extractText(html);
    const words = text.split(/\s+/).filter((w) => w.length > 0).length;
    if (words === 0) {
      return NextResponse.json(
        { ok: false, error: "no-content" },
        { status: 422 },
      );
    }
    return NextResponse.json({ ok: true, url: parsed.toString(), words, text });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      { ok: false, error: timedOut ? "timeout" : "fetch-failed" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
