import { NextResponse } from "next/server";

import { projects, SITE_URL } from "../data/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      source: SITE_URL,
      description: "Public project directory for BimRoss LLC.",
      projects,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}
