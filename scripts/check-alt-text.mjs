#!/usr/bin/env node
/**
 * Alt-text guard for PromptRaise codebase images.
 *
 * POLICY (see context/docs/code-standards.md -> Images & alt text):
 *   1. Every meaningful <img> / <Image> MUST have a descriptive alt (literal or
 *      JSX expression). Empty alt="" is reserved for DECORATIVE images.
 *   2. Every decorative image MUST pair alt="" with aria-hidden
 *      (`aria-hidden` or `aria-hidden="true"`).
 *
 * Scans components/ and app/ .tsx/.jsx. Exits non-zero on any violation so
 * CI / pre-commit can fail. Run with: npm run check:alt
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["components", "app"];
const EXT = /\.(tsx|jsx)$/;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      out.push(...walk(p));
    } else if (EXT.test(entry)) {
      out.push(p);
    }
  }
  return out;
}

function lineNumber(src, index) {
  return src.slice(0, index).split("\n").length;
}

const failures = [];
let imgCount = 0;

for (const dirName of SCAN_DIRS) {
  const dir = join(ROOT, dirName);
  if (!statSync(dir).isDirectory()) continue;
  for (const file of walk(dir)) {
    const src = readFileSync(file, "utf8");
    const tagRe = /<(?:img|Image)\b[^>]*>/g;
    let m;
    while ((m = tagRe.exec(src))) {
      const tag = m[0];
      imgCount++;
      const line = lineNumber(src, m.index);
      const rel = relative(ROOT, file);
      const hasAlt = /\balt\s*=/.test(tag);
      const emptyAlt = /alt\s*=\s*(""|'')/.test(tag);
      const hasAriaHidden = /\baria-hidden\b/.test(tag);

      if (!hasAlt) {
        failures.push(
          `${rel}:${line} - <img>/<Image> has NO alt attribute (add descriptive alt, or alt="" + aria-hidden for decorative)`,
        );
      } else if (emptyAlt && !hasAriaHidden) {
        failures.push(
          `${rel}:${line} - decorative image has alt="" but missing aria-hidden (add aria-hidden="true")`,
        );
      }
    }
  }
}

console.log(`Alt-text check: ${imgCount} <img>/<Image> tags scanned.`);
if (failures.length === 0) {
  console.log("PASS - every image has alt (or is marked decorative with aria-hidden).");
  process.exit(0);
}
console.error(`FAIL - ${failures.length} image(s) need attention:`);
for (const f of failures.slice(0, 40)) console.error("  " + f);
if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
process.exit(1);