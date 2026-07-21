import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { FLOWERS } from "@/lib/flowers";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const base = SITE.domain;
        const entries = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          ...FLOWERS.map((f) => ({ path: `/flowers/${f.slug}`, changefreq: "weekly", priority: "0.8" })),
        ];
        const urls = entries.map((e) =>
          `  <url>\n    <loc>${base}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});