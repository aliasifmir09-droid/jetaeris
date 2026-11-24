import { indexableBlogPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export function GET() {
  const items = indexableBlogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${site.url}/blog/${post.slug}</link>
      <guid>${site.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>JetAeris Private Aviation Blog</title>
    <link>${site.url}/blog</link>
    <description>USA private jet cost, routes, empty legs, safety, and charter how-tos from Jet Aeris Inc.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
