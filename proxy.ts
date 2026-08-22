import { NextResponse } from "next/server";
const isStaging = process.env.SITE_ENV === "staging";

export function proxy() {
  const response = NextResponse.next();

  // Explicit crawler intent per environment:
  // - production: index + follow + large image previews + unlimited
  //   snippet/video preview (full content stays visible to crawlers and AI,
  //   supports AEO; recommended by Google for content sites).
  // - staging: never index, never follow; mirrors robots.txt Disallow: /.
  response.headers.set(
    "X-Robots-Tag",
    isStaging
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
