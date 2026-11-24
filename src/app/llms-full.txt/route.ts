import { renderLlmsFullTxt } from "@/lib/ai-booking-facts";

/** Extended AI briefing at /llms-full.txt for assistants that need booking depth. */
export function GET() {
  return new Response(renderLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
