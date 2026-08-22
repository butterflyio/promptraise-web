"use client";

import { useState, type ReactNode } from "react";
import { SectionLabel } from "@/components/section-label";
import { DsSection, DsSectionContainer } from "@/components/design-system";
import type { HomePage } from "@/sanity/lib/queries";

/* ── Figma-driven data (133:41035 / 411:3775 / 422:5997) ────────────
 * Pricing row removed per product decision: no Price/mo labels or
 * values anywhere. Everything else matches the Figma comparison table.
 */

const FEATURES = [
  "Content gap analysis",
  "LLM tracking (ChatGPT, Gemini...)",
  "Content from real creators",
  "On-chain verification",
  "Tier-1–2 Web3 media PR",
] as const;

/* [row][column] where columns = PromptRaise, Profound, AthenaHQ, coinbound */
const ROW_MATRIX = [
  [true, false, false, false],
  [true, true, true, false],
  [true, false, false, true],
  [true, false, false, false],
  [true, false, false, true],
] as const;

const BRAND_CHECK = "/figma/comparison-check-green.svg";
const COMPETITOR_CHECK = "/figma/comparison-check-gray.svg";
const COMPETITOR_CHECK_WARM = "/figma/comparison-check-gray-warm.svg";
const MINUS = "/figma/comparison-minus.svg";

interface CompanyMeta {
  key: string;
  name: string;
  logo: ReactNode;
  check: string; // check icon used for a "yes" cell (competitors use light gray checks)
}

const COMPANIES: CompanyMeta[] = [
  {
    key: "promptraise",
    name: "PromptRaise",
    check: BRAND_CHECK,
    logo: (
      <span className="flex items-center justify-center gap-[8.878px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/comparison-logo-shape.svg"
          alt=""
          aria-hidden
          className="h-[12px] w-[24px] mix-blend-luminosity"
        />
        <span className="text-[13.316px] leading-[1.5] tracking-[-0.293px] whitespace-nowrap text-white">
          PromptRaise
        </span>
      </span>
    ),
  },
  {
    key: "profound",
    name: "Profound",
    check: COMPETITOR_CHECK,
    logo: (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src="/figma/comparison-profound.png"
        alt="Profound"
        className="h-[24px] w-[85px] object-cover"
      />
    ),
  },
  {
    key: "athena",
    name: "AthenaHQ",
    check: COMPETITOR_CHECK,
    logo: (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src="/figma/comparison-athenahq.svg"
        alt="AthenaHQ"
        className="h-[17.871px] w-[89.123px]"
      />
    ),
  },
  {
    key: "coinbound",
    name: "coinbound",
    check: COMPETITOR_CHECK_WARM,
    logo: (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src="/figma/comparison-coinbound.svg"
        alt="coinbound"
        className="h-[14.438px] w-[86px]"
      />
    ),
  },
];

function CheckCell({
  company,
  active,
}: {
  company: CompanyMeta;
  active: boolean;
}) {
  return (
    <div className="mobile:px-2 relative flex w-full items-center justify-center rounded-[12px] px-6 py-2">
      {active ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={company.check}
          alt="Yes"
          className="mobile:size-4 relative size-6"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={MINUS} alt="No" className="mobile:size-4 relative size-6" />
      )}
    </div>
  );
}

function CompanyColumn({
  company,
  columns,
  columnIndex,
  className = "",
}: {
  company: CompanyMeta;
  columns: ReadonlyArray<readonly boolean[]>;
  columnIndex: number;
  className?: string;
}) {
  const index = columnIndex;
  const highlight = company.key === "promptraise";
  return (
    <div
      className={`relative flex flex-col content-stretch items-center justify-center gap-4 overflow-clip rounded-[20px] ${
        highlight ? "border border-[#2dc866] p-[25px]" : "p-6"
      } ${className}`}
    >
      {highlight ? (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] bg-[#101011]"
        />
      ) : null}
      <div className="relative h-5 shrink-0">{company.logo}</div>
      {columns.map((row, rowIndex) => (
        <CheckCell
          key={rowIndex}
          company={company}
          active={row[index] ?? false}
        />
      ))}
      {highlight ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_4px_63.2px_-21px_rgba(108,234,154,0.6),inset_0px_4px_63.2px_-21px_rgba(34,197,94,0.6),inset_0px_4px_52px_16px_rgba(26,46,26,0.6)]"
        />
      ) : null}
    </div>
  );
}

function LabelColumn({
  className = "",
  labels = FEATURES,
  mobile = false,
}: {
  className?: string;
  labels?: readonly string[];
  mobile?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 flex-col content-stretch items-start gap-4 rounded-[20px] px-6 pt-[60px] pb-6 ${className}`}
    >
      {labels.map((feature) => (
        <div
          key={feature}
          className={
            mobile
              ? "relative flex w-full flex-col items-center justify-center rounded-[12px] px-1 py-2"
              : "relative flex w-full flex-col items-center justify-center rounded-[12px] px-6 py-2"
          }
        >
          <span
            className={
              mobile
                ? "text-center text-[11px] leading-[1.35] text-[var(--fg-secondary,#d4d4d8)]"
                : "text-center text-[16px] leading-[1.5] tracking-[-0.32px] whitespace-nowrap text-[var(--fg-secondary,#d4d4d8)]"
            }
          >
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Badge row: decorative line + 2 marks flanking the "Comparison" pill
 * (matches Figma 139:124 / 422:5999 and the Process section badge pattern). */
function ComparisonBadgeRow({ badge }: { badge?: string }) {
  return (
    <div className="inline-flex items-center gap-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/comparison-decor-mark-flip.svg"
        alt=""
        aria-hidden
        width={40}
        height={25}
        className="mobile:hidden shrink-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/comparison-decor-line.svg"
        alt=""
        aria-hidden
        width={120}
        height={6}
        className="mobile:hidden shrink-0"
        style={{ transform: "scaleX(-1)" }}
      />
      <div
        className="shrink-0 rounded-[100px] border border-[#3c3e3f] px-6 py-2 text-[15px] leading-[1.5] whitespace-nowrap text-[#a1a1aa] select-none"
        style={{
          background: "rgba(20,20,20,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {badge ?? "Comparison"}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/comparison-decor-line.svg"
        alt=""
        aria-hidden
        width={120}
        height={6}
        className="mobile:hidden shrink-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/comparison-decor-mark.svg"
        alt=""
        aria-hidden
        width={40}
        height={25}
        className="mobile:hidden shrink-0"
      />
    </div>
  );
}

/* Mobile: label column + ONE company column at a time, switched by the
 * TabBar of logo pills (Figma 422:6012 + 422:6333). */
function MobileComparison({
  companies = COMPANIES,
  labels = FEATURES,
}: {
  companies?: CompanyMeta[];
  labels?: readonly string[];
}) {
  const [active, setActive] = useState(0);
  const company = companies[active] ?? companies[0]!;
  return (
    <div className="flex flex-col items-start gap-12">
      <div className="flex w-full [scrollbar-width:none] items-center gap-0 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {companies.map((c, i) => {
          const isActive = i === active;
          const isPromptRaise = c.key === "promptraise";
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex h-[39px] shrink-0 items-center justify-center rounded-[100px] px-6 py-2 ${
                isPromptRaise
                  ? "border border-[#3c3e3f]"
                  : "border border-transparent"
              } ${isActive ? "bg-[rgba(20,20,20,0.8)]" : ""} ${
                isPromptRaise ? "gap-[6px]" : ""
              }`}
            >
              {c.logo}
            </button>
          );
        })}
      </div>

      <div
        className={
          "mobile:gap-[6px] mobile:pr-0 flex w-full content-stretch items-center gap-[9px] pr-6"
        }
      >
        <LabelColumn
          className="mobile:w-[118px] mobile:px-3 w-[256px]"
          labels={labels}
          mobile
        />
        <CompanyColumn
          company={company}
          columns={ROW_MATRIX}
          columnIndex={active}
          className="mobile:flex-[1_1_0%] mobile:p-4 min-w-px flex-[1_0_0]"
        />
      </div>
    </div>
  );
}

/** CMS overrides for the comparison table. Labels + competitor columns are
 * editable; the check matrix and the PromptRaise column stay design-side. */
function resolveComparison(content?: HomePage["comparison"]) {
  const labels =
    (content?.features?.length ?? 0) >= 1 ? content!.features! : FEATURES;

  const companies = COMPANIES.map((company, index) => {
    const cms = content?.companies?.[index];
    if (!cms?.name && !cms?.logo) return company;
    return {
      ...company,
      name: cms.name || company.name,
      logo: cms.logo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={cms.logo}
          alt={cms.name ?? cms.logo}
          className="h-[24px] max-w-[120px] object-contain"
        />
      ) : (
        company.logo
      ),
    } as CompanyMeta;
  });

  return { labels, companies };
}

interface ComparisonSectionProps {
  content?: HomePage["comparison"];
}

export function ComparisonSection({ content }: ComparisonSectionProps) {
  const { labels, companies } = resolveComparison(content);
  return (
    <DsSection className="ds-section-alt mobile:overflow-x-clip relative overflow-hidden">
      <SectionLabel name="ComparisonSection" />

      {/* Radial glows like the Figma background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_70%,rgba(67,255,119,0.22),transparent_18%),radial-gradient(circle_at_100%_32%,rgba(67,255,119,0.26),transparent_18%)]" />

      {/* Decorative ellipse masks (Figma 370:3531 / 370:3530) */}
      <div
        aria-hidden
        className="tablet:block pointer-events-none absolute bottom-0 left-[-40px] hidden h-[393px] w-[361px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/comparison-bg-ellipse.svg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="tablet:block pointer-events-none absolute top-[186px] right-[-100px] hidden h-[393px] w-[347px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/comparison-bg-ellipse.svg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <DsSectionContainer className="relative">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <ComparisonBadgeRow badge={content?.badge} />
          <h2 className="tablet:text-[40px] tablet:leading-[1.15] tablet:tracking-[-0.8px] text-[24px] leading-[1.3] font-bold tracking-[-0.48px] text-white">
            {content?.heading ?? "PromptRaise vs Competitors"}
          </h2>
          <p className="tablet:text-[16px] tablet:leading-[1.5] max-w-[540px] text-[12px] leading-[1.4] tracking-[-0.24px] text-[var(--fg-muted,#52525b)]">
            {content?.subtext ??
              "Competitors can track. We close the full loop - from analysis to publication and measurable result."}
          </p>
        </div>

        {/* Desktop + tablet: 5-column table (label + 4 companies) */}
        <div className="tablet:flex mt-12 hidden w-full items-end gap-[9px]">
          <LabelColumn
            className="desktop:w-[328px] w-[208px]"
            labels={labels}
          />
          {companies.map((company, i) => (
            <CompanyColumn
              key={company.key}
              company={company}
              columns={ROW_MATRIX}
              columnIndex={i}
              className="desktop:w-[156px] w-[122px]"
            />
          ))}
        </div>

        {/* Mobile: TabBar + label + active company column */}
        <div className="tablet:hidden mt-12">
          <MobileComparison companies={companies} labels={labels} />
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
