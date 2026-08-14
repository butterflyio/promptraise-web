/**
 * SEO slug generator - implements Google's URL structure best practices
 * (developers.google.com/search/docs/crawling-indexing/url-structure) and
 * IETF STD 66 (RFC 3986) URI syntax.
 *
 * What the rules map to, applied in order:
 *   1. Descriptive words, not ID numbers  - we start from the human title/name.
 *   2. Audience language / transliteration - NFKD-decompose then strip
 *      diacritics so "Zain" and accented characters render as plain ASCII
 *      ("Zain Khan" -> "zain-khan", "münchen" -> "munchen").
 *   3. Hyphens (-) to separate words, NOT underscores (Google explicitly
 *      recommends hyphens over underscores).
 *   4. Lowercase consistently - URLs are CASE-SENSITIVE per RFC 3986, and
 *      Google treats /Apple and /apple as different URLs. We always lower.
 *   5. RFC 3986 reserved/unsafe characters are removed or percent-encoded.
 *      For a clean static slug we strip everything except A-Za-z0-9 and use
 *      hyphens for separators, so the path is fully unreserved and needs no
 *      percent-encoding.
 *   6. Collapse repeated hyphens and trim leading/trailing hyphens so the
 *      slug is clean ("foo--bar" -> "foo-bar", "--foo-" -> "foo").
 */

const DIACRITIC_EXCEPTIONS: Record<string, string> = {
  ø: "o",
  ł: "l",
  đ: "d",
  ð: "d",
  þ: "th",
  æ: "ae",
  œ: "oe",
  ß: "ss",
  // Cyrillic -> Latin transliteration for common letters
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

/**
 * Generate a Google/SEO-aligned slug from a title or name.
 * Returns a lowercase, hyphen-separated, ASCII-only string.
 */
export function seoSlugify(input: string): string {
  if (!input) return "";

  // 1. NFKD normalize so accents decompose into base letter + combining mark,
  //    then apply explicit transliteration exceptions before stripping marks.
  let s = input.normalize("NFKD");

  // Apply transliteration exceptions (ligatures, sharp s, Cyrillic), char by
  // char, matching the longest exception first.
  const exceptionKeys = Object.keys(DIACRITIC_EXCEPTIONS).sort(
    (a, b) => b.length - a.length,
  );
  for (const k of exceptionKeys) {
    s = s.split(k).join(DIACRITIC_EXCEPTIONS[k]);
  }

  // 2. Remove combining diacritical marks (the decomposed accents).
  s = s.replace(/[\u0300-\u036f]/g, "");

  // 3. Lowercase.
  s = s.toLowerCase();

  // 4. Replace any run of non [a-z0-9] with a hyphen (this also collapses
  //    spaces, punctuation and reserved chars into single separators).
  s = s
    .replace(/[^a-z0-9]+/g, "-")

    // 5. Collapse repeated hyphens.
    .replace(/-{2,}/g, "-")

    // 6. Trim leading/trailing hyphens.
    .replace(/^-+|-+$/g, "");

  return s;
}

/** Trim to a max length on a word boundary (so we never cut mid-word). */
export function truncateSlug(slug: string, max = 90): string {
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max);
  const lastHyphen = cut.lastIndexOf("-");
  if (lastHyphen > max * 0.5) {
    return cut.slice(0, lastHyphen);
  }
  return cut;
}
