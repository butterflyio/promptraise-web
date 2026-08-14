import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Accepts both legacy fields (telegramUsername / website / contactPerson from the
 * homepage "Plans" section) and the newer email/name/source fields (e.g. the
 * free-playbook funnel at /ai-seo-for-web3). Writes each lead as a row in the
 * PromptRaise `audit_leads` table in Supabase via PostgREST (service_role key,
 * server-side only - never exposed to the browser).
 *
 * Env vars (set in Vercel + .env.local, NOT NEXT_PUBLIC):
 *   SUPABASE_URL  e.g. https://<ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  service-role JWT (eyJ...)
 */
export interface LeadPayload {
  email?: string;
  name?: string;
  website?: string;
  telegramUsername?: string;
  contactPerson?: string;
  source?: string;
  consent?: boolean;
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // If Supabase isn't configured, fail loudly + explicitly (not silently "ok").
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error(
      "[leads] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured",
    );
    return NextResponse.json(
      { ok: false, error: "Lead capture is not configured" },
      { status: 500 },
    );
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const email = body.email?.trim() ?? "";
  const name = body.name?.trim() ?? body.contactPerson?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const telegram = body.telegramUsername?.trim() ?? "";
  const source = body.source?.trim() || "web";
  const consent = body.consent ?? true;

  // Require at least a way to reach the person.
  if (!email && !telegram) {
    return NextResponse.json(
      {
        ok: false,
        error: "An email address or Telegram username is required",
        fields: ["email"],
      },
      { status: 400 },
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter a valid email address",
        fields: ["email"],
      },
      { status: 400 },
    );
  }

  const row = {
    // required NOT NULL columns on audit_leads
    url: website || "",
    score: 0,
    // lead classification
    source,
    priority: 1,
    contact_email: email || null,
    contact_telegram: telegram || null,
    requested_deep_audit: false,
    deep_audit_payload: {
      name: name || null,
      website: website || null,
      telegramUsername: telegram || null,
      consent: Boolean(consent),
      // which form / page produced this lead - useful for pipeline analysis
      campaign: source === "playbook" ? "ai-seo-for-web3" : source,
    },
  };

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/audit_leads?select=id,contact_email,source`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(row),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error(
        "[leads] Supabase insert failed",
        res.status,
        detail.slice(0, 300),
      );
      return NextResponse.json(
        { ok: false, error: "Could not save your lead" },
        { status: 502 },
      );
    }

    const created = (await res.json()) as { id?: string }[];
    return NextResponse.json({ ok: true, id: created?.[0]?.id ?? null });
  } catch (err) {
    console.error("[leads] Supabase error", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your lead" },
      { status: 502 },
    );
  }
}
