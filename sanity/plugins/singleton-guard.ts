import type { DocumentActionComponent } from "sanity";

/**
 * Singleton document guards.
 *
 * siteSettings, glossary and auditLanding are singletons - exactly one of
 * each, and they must never be accidentally deleted, duplicated or
 * unpublished. This filters those actions out of the document header for the
 * singleton types, so a stray click can't destabilize global chrome.
 */
const SINGLETON_TYPES = new Set([
  "siteSettings",
  "glossary",
  "auditLanding",
  "fleschKincaidLanding",
]);

const FORBIDDEN_ACTION_NAMES = new Set(["delete", "duplicate", "unpublish"]);

/** Returns true if `type` is a guarded singleton document type. */
export function isSingletonType(type: string): boolean {
  return SINGLETON_TYPES.has(type);
}

/**
 * Reducer for `document.actions`. Removes destructive actions on singleton
 * types; leaves everything else untouched.
 */
export function filterSingletonActions(
  prev: DocumentActionComponent[],
  type: string,
): DocumentActionComponent[] {
  if (!SINGLETON_TYPES.has(type)) return prev;
  return prev.filter((action) => {
    const name = (action as { action?: string }).action ?? "";
    return !FORBIDDEN_ACTION_NAMES.has(name);
  });
}
