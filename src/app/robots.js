export default function robots() {
  const base = process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://bgmiid.eu.cc";

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/guidelines', '/terms'],
      disallow: ['/api/auth/', '/api/utils/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
