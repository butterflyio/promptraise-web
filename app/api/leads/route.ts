import { NextResponse } from "next/server";

export interface LeadPayload {
  telegramUsername?: string;
  website?: string;
  contactPerson?: string;
}

/**
 * Lead capture endpoint for the "Plans That Scale With You" form.
 * Placeholder for now - returns ok immediately. Will be wired to the
 * Telegram bot for notifications in a follow-up.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const { telegramUsername, website, contactPerson } = body ?? {};

    // Basic shape validation so garbage payloads don't slip through later.
    if (
      typeof telegramUsername !== "string" ||
      typeof website !== "string" ||
      typeof contactPerson !== "string"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "telegramUsername, website and contactPerson are required",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }
}
