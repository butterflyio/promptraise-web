# PromptRaise — UI Context

> Brand Design System v1.0 — Dark theme only. No light mode.

## Color System

### Raw Brand Colors

| Token         | Hex       | Usage                                  |
| ------------- | --------- | -------------------------------------- |
| Near Black    | `#0F0F0F` | Primary background, deep surfaces      |
| Accent Green  | `#67FF67` | Primary CTA, highlights, active states |
| Dark Charcoal | `#242628` | Cards, elevated surfaces, borders      |
| White         | `#FFFFFF` | Primary text on dark                   |
| Light Gray    | `#C9CDD2` | Secondary/muted text                   |
| Muted Green   | `#3D6944` | Secondary accent, subtle highlights    |

### Semantic Tokens (CSS Variables)

```css
--bg-base: #0f0f0f; /* Page background */
--bg-surface: #242628; /* Cards, elevated surfaces */
--bg-surface-hover: #2a2d2f; /* Hover state for surfaces */
--text-primary: #ffffff; /* Headings, primary text */
--text-secondary: #dedcd7; /* Body text */
--text-muted: #c9cdd2; /* Captions, placeholders, labels */
--accent-primary: #67ff67; /* Primary CTA, links, highlights */
--accent-secondary: #3d6944; /* Subtle accents, badges */
--accent-foreground: #0f0f0f; /* Text on accent backgrounds */
--border-default: #242628; /* Dividers, borders */
--border-subtle: #1a1a1a; /* Very subtle separators */
```

## Typography

- **Primary**: Neutral Sans (fallback: Geist Sans)
- **Mono**: Geist Mono
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale**: Base 16px, line-height 1.5, tracking tight for headings

## Component Patterns

### Header

- Sticky, transparent-to-solid on scroll (optional)
- Nav items: Solutions, Pricing, Company, Resources
- Right-side CTA: **"Get Audit"** (green pill, `accent-primary` bg, `accent-foreground` text)

### Buttons

- **Primary**: `bg-accent-primary text-accent-foreground` rounded-full
- **Secondary**: `border border-border-default text-text-primary` rounded-full
- **Ghost**: `text-text-muted hover:text-text-primary` no border

### Cards

- `bg-bg-surface` with `border-border-default`
- Hover: `bg-bg-surface-hover` subtle lift

### Footer

- Dark band (`bg-bg-base` or `bg-bg-surface`)
- "powered by Pencil" attribution
- Legal links: Privacy Policy · Terms of Service · Cookie Usage
- Social links (placeholder URLs until provided)

## Layout

- Max content width: `max-w-6xl` (72rem / 1152px)
- Horizontal padding: `px-6` (mobile), consistent gutters
- Section vertical spacing: `py-16` to `py-20`
- Border style: 1px solid `border-default` for section separators

## Motion

- Transitions: `transition-colors duration-200` for interactive elements
- Hover opacity: `hover:opacity-90` for primary CTAs
- No runtime AI-generated animations on the site
