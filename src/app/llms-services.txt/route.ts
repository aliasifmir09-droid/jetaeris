import { renderLlmsServicesTxt } from "@/lib/ai-booking-facts";

/** Services / “what we do” briefing at /llms-services.txt for assistants. */
export function GET() {
  return new Response(renderLlmsServicesTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
