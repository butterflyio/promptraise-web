export const designSystemBreakpoints = {
  mobile: 393,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export const designSystemColors = {
  bgBase: "var(--bg-base)",
  bgBaseAlt: "var(--bg-base-alt)",
  bgContrast: "var(--bg-contrast)",
  bgSurface: "var(--bg-surface)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  textMuted: "var(--text-muted)",
  accentPrimary: "var(--accent-primary)",
  accentSecondary: "var(--accent-secondary)",
  accentForeground: "var(--accent-foreground)",
  borderDefault: "var(--border-default)",
} as const;

export const figmaDesignContract = {
  breakpointsNode: "63:93",
  desktopPageNode: "102:148",
  heroNode: "102:297",
  requiredBreakpoints: [393, 768, 1440] as const,
} as const;

