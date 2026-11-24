import { renderLlmsTxt } from "@/lib/ai-booking-facts";

/** AI-oriented site index at /llms.txt (generated from live booking facts). */
export function GET() {
  return new Response(renderLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
