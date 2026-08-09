"use client";

import { useState } from "react";

import { DsBadge, DsCard, DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import type { HomePage } from "@/sanity/lib/queries";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormValues {
  telegramUsername: string;
  website: string;
  contactPerson: string;
  /** Honeypot field - hidden from humans, bots fill it. */
  company: string;
}

const INITIAL_VALUES: FormValues = {
  telegramUsername: "",
  website: "",
  contactPerson: "",
  company: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const WEBSITE_PATTERN = /^https?:\/\/[^\s]+$/i;

function Field({
  label,
  name,
  value,
  placeholder,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-medium tracking-[0] text-white/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        className="h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-base)] px-4 text-[14px] text-white transition-colors placeholder:text-white/30 focus:border-[rgba(103,255,103,0.55)] focus:ring-1 focus:ring-[rgba(103,255,103,0.25)] focus:outline-none"
      />
      {error ? (
        <span className="text-[12px] leading-[1.4] text-red-400">{error}</span>
      ) : null}
    </label>
  );
}

export function PlansSection({ content }: { content?: HomePage["plans"] }) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(field: keyof FormValues) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!values.telegramUsername.trim()) {
      next.telegramUsername = "Telegram username is required";
    }
    if (!values.website.trim()) {
      next.website = "Website is required";
    } else if (!WEBSITE_PATTERN.test(values.website.trim())) {
      next.website = "Enter a valid URL, e.g. https://yourproject.com";
    }
    if (!values.contactPerson.trim()) {
      next.contactPerson = "Contact person is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot trip: pretend it worked, never send the payload.
    if (values.company.trim()) {
      setValues(INITIAL_VALUES);
      setStatus("success");
      return;
    }

    if (!validate()) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramUsername: values.telegramUsername.trim(),
          website: values.website.trim(),
          contactPerson: values.contactPerson.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <DsSection id="plans" className="ds-section-alt">
      <SectionLabel name="PlansSection" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_130%,rgba(103,255,103,0.12),transparent_50%)]" />

      <DsSectionContainer className="relative">
        <div className="flex flex-col items-center gap-3 text-center">
          <DsBadge variant="muted">{content?.badge ?? "Plans"}</DsBadge>
          <h2 className="max-w-[649px] text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-white tablet:text-[40px] tablet:leading-[1.15]">
            {content?.heading ?? "Plans That Scale With You"}
          </h2>
          <p className="max-w-[560px] text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40 tablet:text-[16px] tablet:leading-[1.5]">
            {content?.subtext ??
              "Start with a free audit. Upgrade when you&apos;re ready to dominate AI answers."}
          </p>
        </div>

        <DsCard className="tablet:p-8 relative mx-auto mt-10 w-full max-w-[560px] overflow-hidden border-white/8 bg-[linear-gradient(180deg,rgba(19,21,19,0.96),rgba(8,9,8,1))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,255,103,0.14),transparent_45%)]" />

          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-5"
            noValidate
          >
            {/* Honeypot - visually hidden, must stay empty */}
            <div className="hidden" aria-hidden="true">
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange("company")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <Field
              label="Telegram Username"
              name="telegramUsername"
              value={values.telegramUsername}
              placeholder="e.g. @promptraise"
              autoComplete="username"
              error={errors.telegramUsername}
              onChange={handleChange("telegramUsername")}
            />

            <Field
              label="Website"
              name="website"
              type="url"
              value={values.website}
              placeholder="https://yourproject.com"
              autoComplete="url"
              error={errors.website}
              onChange={handleChange("website")}
            />

            <Field
              label="Contact Person"
              name="contactPerson"
              value={values.contactPerson}
              placeholder="e.g. Alex Johnson"
              autoComplete="name"
              error={errors.contactPerson}
              onChange={handleChange("contactPerson")}
            />

            {status === "success" ? (
              <div className="rounded-xl border border-[rgba(103,255,103,0.35)] bg-[rgba(103,255,103,0.08)] px-4 py-3 text-[13px] leading-[1.5] text-white/80">
                Thanks! Your request was received. We will get back to you with
                pricing shortly.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-[13px] leading-[1.5] text-red-300">
                Something went wrong. Please try again in a moment.
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-8 text-[16px] leading-none tracking-[0] text-[var(--accent-foreground)] shadow-[var(--shadow-cta)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : (content?.ctaLabel ?? "Get Pricing")}
            </button>

            <p className="text-center text-[11px] leading-[1.5] text-white/30">
              No spam. We only use your details to prepare a tailored plan.
            </p>
          </form>
        </DsCard>
      </DsSectionContainer>
    </DsSection>
  );
}
