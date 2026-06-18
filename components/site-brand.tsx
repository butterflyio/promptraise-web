import Link from "next/link";
import { designSystemAssets } from "@/components/design-system";

type SiteBrandProps = {
  href?: string;
  label?: string;
  siteName?: string;
  logoUrl?: string | null;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

const fallbackMark = designSystemAssets.brand.mark;

export function SiteBrand({
  href = "/",
  label = "PromptRaise home",
  siteName = "PromptRaise",
  logoUrl,
  className = "",
  markClassName = "h-[13px] w-auto shrink-0",
  wordmarkClassName = "text-[13px] leading-none font-medium text-white",
}: SiteBrandProps) {
  const markSrc = logoUrl ?? fallbackMark;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 ${className}`.trim()}
      aria-label={label}
    >
      <img src={markSrc} alt="" aria-hidden="true" className={markClassName} />
      <span className={wordmarkClassName}>{siteName}</span>
    </Link>
  );
}
