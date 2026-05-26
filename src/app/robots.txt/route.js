export async function GET() {
  const body = `User-agent: *
Allow: /
Allow: /guidelines
Allow: /terms

Disallow: /api/auth/
Disallow: /api/utils/

Sitemap: ${process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://bgmiid.eu.cc"}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
