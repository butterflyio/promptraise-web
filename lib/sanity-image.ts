/**
 * Build a Sanity CDN image URL with optimization params.
 *
 * Sanity's image CDN supports on-the-fly resizing/format conversion via
 * query params. Use this everywhere a CMS image renders so we never ship
 * multi-megabyte originals: auto WebP/AVIF, resized to the rendered width.
 *
 * Example:
 *   imageUrl(assetUrl, { width: 320, height: 320 })
 *   -> https://cdn.sanity.io/images/...?w=320&h=320&fit=crop&auto=format&q=80
 */
export function imageUrl(
  assetUrl: string | null | undefined,
  opts: {
    width?: number;
    height?: number;
    fit?: "crop" | "clip" | "max" | "min" | "scale" | "fill";
    quality?: number;
  } = {},
): string | null {
  if (!assetUrl) return null;

  // Only touch Sanity CDN URLs (they accept query params); leave absolute
  // URLs/SVGs alone.
  if (!assetUrl.includes("cdn.sanity.io") || assetUrl.endsWith(".svg")) {
    return assetUrl;
  }

  const params = new URLSearchParams();
  if (opts.width) params.set("w", String(opts.width));
  if (opts.height) params.set("h", String(opts.height));
  params.set("fit", opts.fit ?? "crop");
  params.set("auto", "format");
  params.set("q", String(opts.quality ?? 80));

  const separator = assetUrl.includes("?") ? "&" : "?";
  return `${assetUrl}${separator}${params.toString()}`;
}

/**
 * Return a srcSet string for responsive rendering.
 */
export function imageSrcSet(
  assetUrl: string | null | undefined,
  widths: number[],
): string | null {
  if (!assetUrl || !assetUrl.includes("cdn.sanity.io")) return null;
  return widths
    .map((w) => `${imageUrl(assetUrl, { width: w })} ${w}w`)
    .join(", ");
}

/**
 * Natural aspect ratio (w/h) of a Sanity asset URL, parsed from the embedded
 * `-WIDTHxHEIGHT.` segment in the filename (e.g. `-1600x640.png` -> 2.5).
 * Returns null when the ratio cannot be determined. Use to size media boxes
 * to their source so fit=crop never cuts content.
 */
export function naturalAspectRatio(
  assetUrl: string | null | undefined,
): number | null {
  if (!assetUrl || !assetUrl.includes("cdn.sanity.io")) return null;
  const m = /-(\d+)x(\d+)\./.exec(assetUrl);
  if (!m || m.length < 3) return null;
  const w = Number(m[1]);
  const h = Number(m[2]);
  return Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0
    ? w / h
    : null;
}
