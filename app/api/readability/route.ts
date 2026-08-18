import { NextResponse } from "next/server";

/**
 * Old path for the readability endpoint. Kept as a permanent redirect so
 * previously shared links, agents and docs that used /api/readability keep
 * working; the canonical path is /json/readability.
 */
export async function GET(request: Request) {
  return redirect(request);
}

export async function POST(request: Request) {
  return redirect(request);
}

function redirect(request: Request): NextResponse {
  const url = new URL(request.url);
  url.pathname = "/json/readability";
  return NextResponse.redirect(url, 308);
}
