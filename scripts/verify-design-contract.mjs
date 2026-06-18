import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const mustExist = [
  "components/design-system/assets.ts",
  "components/design-system/badge.tsx",
  "components/design-system/button.tsx",
  "components/design-system/card.tsx",
  "components/design-system/icons.tsx",
  "components/design-system/section.tsx",
  "components/design-system/tokens.ts",
];

const globalsCssPath = path.join(root, "app/globals.css");
const buildPlanPath = path.join(root, "context/docs/specs/00-build-plan.md");
const uiContextPath = path.join(root, "context/docs/ui-context.md");

const failures = [];

for (const file of mustExist) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    failures.push(`Missing required design-system file: ${file}`);
  }
}

const globalsCss = fs.readFileSync(globalsCssPath, "utf8");
const uiContext = fs.readFileSync(uiContextPath, "utf8");
const buildPlan = fs.readFileSync(buildPlanPath, "utf8");

const breakpointChecks = [
  "--breakpoint-mobile-frame: 393px;",
  "--breakpoint-tablet-frame: 768px;",
  "--breakpoint-wide-frame: 1440px;",
];

for (const check of breakpointChecks) {
  if (!globalsCss.includes(check)) {
    failures.push(`globals.css is missing breakpoint token: ${check}`);
  }
}

if (!buildPlan.includes("Design-to-Code Gate")) {
  failures.push("Build plan is missing Design-to-Code Gate section");
}

if (!uiContext.includes("393px")) {
  failures.push("ui-context.md does not reflect 393px mobile design frame");
}

if (failures.length > 0) {
  console.error("Design contract verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Design contract verification passed.");

