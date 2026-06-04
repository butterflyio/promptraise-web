import { NextResponse } from "next/server";
const isStaging = process.env.SITE_ENV === "staging";

export function proxy() {
  const response = NextResponse.next();

  if (isStaging) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
