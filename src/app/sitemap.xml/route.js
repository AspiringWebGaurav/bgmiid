export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://bgmiid.eu.cc";
  const now = new Date().toISOString().split("T")[0];

  const pages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/guidelines", priority: "0.85", changefreq: "weekly" },
    { url: "/terms", priority: "0.6", changefreq: "monthly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (p) => `  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
