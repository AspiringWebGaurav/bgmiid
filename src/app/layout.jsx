import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../utils/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const BASE_URL =
  process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://bgmiid.eu.cc";

/* ── JSON-LD Structured Data ───────────────────────────────────────── */
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BGMI Name Stylist",
  alternateName: [
    "BGMI Fancy Name Generator",
    "BGMI ID Generator",
    "BGMI Stylish Name Maker",
  ],
  url: BASE_URL,
  description:
    "Free online tool to generate fancy, stylish BGMI player names with Unicode fonts, special symbols and combos. Works for BGMI ID name change. 100% free, instant, no login.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  featureList: [
    "BGMI fancy name generator",
    "Unicode font styles for BGMI",
    "Special symbol library for BGMI names",
    "BGMI name copy paste",
    "Stylish BGMI ID generator",
    "14-character limit checker",
    "Dark and light theme",
  ],
  screenshot: `${BASE_URL}/og-image.png`,
  inLanguage: ["en", "hi"],
  isAccessibleForFree: true,
  creator: {
    "@type": "Organization",
    name: "BGMI Name Stylist",
    url: BASE_URL,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to get a fancy name in BGMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get a fancy name in BGMI, use BGMI Name Stylist. Simply type your desired name, choose from 7 font styles or 29+ special symbols, then copy and paste the result into your BGMI ID settings using a Rename Card.",
      },
    },
    {
      "@type": "Question",
      name: "What is the character limit for BGMI names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BGMI player names have a maximum limit of 14 characters. This includes letters, numbers, spaces, and special symbols. Our tool automatically highlights names that exceed this limit.",
      },
    },
    {
      "@type": "Question",
      name: "Which symbols work in BGMI names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many Unicode symbols work in BGMI names including: 々, 〆, ๛, ×, 亗, ★, ⚡, ツ, ✿, Ø, 『, 』, 帝, 神, 父, and more. BGMI Name Stylist provides a full symbol library you can click to copy instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is BGMI Name Stylist free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, BGMI Name Stylist is 100% free. No account, login, or payment is required. Just type any name and instantly get dozens of fancy stylised versions you can copy and paste.",
      },
    },
    {
      "@type": "Question",
      name: "How to change BGMI name with stylish fonts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1. Go to BGMI Name Stylist and type your desired name. 2. Browse the generated fancy font styles. 3. Click 'Copy ID' on your favourite. 4. Open BGMI, go to Profile, tap your name, and paste using a Rename Card.",
      },
    },
    {
      "@type": "Question",
      name: "Do Unicode fancy fonts work in BGMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Unicode stylised fonts like 𝓪𝓫𝓬 (cursive), 𝕒𝕓𝕔 (outline), 𝐚𝐛𝐜 (bold), αвс (Cyrillic) all work in BGMI player names. Each Unicode character counts as one character towards the 14-char limit.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best stylish BGMI names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best stylish BGMI names combine a short word with a symbol pair — for example: 亗 Shadow 亗, 『Alpha』, 〆Storm〆, ★Blade★. Use BGMI Name Stylist to instantly generate hundreds of combinations from any name.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use BGMI Name Stylist on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! BGMI Name Stylist is fully mobile-friendly. You can open it in any mobile browser, generate a fancy name, and copy it directly into BGMI on the same device.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Fancy BGMI Name",
  description:
    "Step-by-step guide to creating a stylish, fancy BGMI player name using Unicode fonts and special symbols.",
  totalTime: "PT2M",
  tool: [
    { "@type": "HowToTool", name: "BGMI Name Stylist (free online tool)" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your name",
      text: "Go to BGMI Name Stylist and type any word or nickname into the search bar.",
      url: `${BASE_URL}/#generator`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Browse stylised results",
      text: "Instantly see your name transformed into 20+ styles: cursive, bold, outline, Cyrillic fonts, symbol combos and more.",
      url: `${BASE_URL}/#generator`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy your favourite",
      text: "Click the 'Copy ID' button on any name card that is 14 characters or fewer.",
      url: `${BASE_URL}/#generator`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Paste in BGMI",
      text: "Open BGMI, go to your Profile, tap your player name, use a Rename Card, and paste the copied name.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "BGMI Fancy Name Generator",
      item: `${BASE_URL}/#generator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Symbol Library",
      item: `${BASE_URL}/#symbols`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Naming Guidelines",
      item: `${BASE_URL}/guidelines`,
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BGMI Name Stylist",
  operatingSystem: "Web, Android, iOS",
  applicationCategory: "UtilitiesApplication",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1247",
    bestRating: "5",
    worstRating: "1",
  },
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "INR",
  },
};

const KEYWORDS = [
  // Core brand + product
  "BGMI name",
  "BGMI names",
  "BGMI name generator",
  "BGMI name maker",
  "BGMI name stylist",
  "BGMI name creator",
  "BGMI name changer",
  // Fancy / stylish variants
  "fancy name BGMI",
  "BGMI fancy name",
  "BGMI fancy names",
  "fancy BGMI name",
  "stylish name BGMI",
  "BGMI stylish name",
  "BGMI stylish names",
  "BGMI stylish ID",
  "BGMI style name",
  "BGMI name style",
  "cool name BGMI",
  "BGMI cool name",
  "BGMI cool names",
  "best BGMI name",
  "BGMI best name",
  "BGMI unique name",
  // ID specific
  "BGMI ID",
  "BGMI player ID",
  "BGMI ID name",
  "BGMI ID generator",
  "BGMI ID style",
  "BGMI ID changer",
  "BGMI ID maker",
  "BGMI ID fancy",
  "fancy BGMI ID",
  // Font / Unicode
  "BGMI font",
  "BGMI fonts",
  "BGMI Unicode name",
  "BGMI font style",
  "BGMI name font",
  "Unicode fonts BGMI",
  "fancy fonts BGMI",
  "BGMI bold name",
  "BGMI cursive name",
  "BGMI outline name",
  // Symbols
  "BGMI symbol",
  "BGMI symbols",
  "BGMI name symbol",
  "BGMI name with symbol",
  "BGMI special characters",
  "BGMI name special character",
  "BGMI name copy paste",
  "copy paste BGMI name",
  "BGMI font copy paste",
  // Action based
  "BGMI name change",
  "how to change BGMI name",
  "BGMI rename",
  "BGMI name change trick",
  "BGMI stylish name copy paste",
  "BGMI name generator free",
  "free BGMI name generator",
  // Long tail
  "battlegrounds mobile india name",
  "battlegrounds mobile india fancy name",
  "BGMI player name ideas",
  "BGMI name ideas",
  "BGMI clan name",
  "BGMI pro name",
  "BGMI gamer name",
  "BGMI gaming name",
  "BGMI name 2024",
  "BGMI name 2025",
  "BGMI name 2026",
  // Competitive / Pro
  "BGMI sweaty name",
  "BGMI tryhard name",
  "BGMI clan tag",
  "BGMI name generator online",
  "online BGMI name generator",
].join(", ");

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* ── Primary SEO ── */}
        <title>
          BGMI Fancy Name Generator – Stylish BGMI Name & ID Stylist 2026
        </title>
        <meta
          name="description"
          content="Generate fancy & stylish BGMI names instantly! 7 Unicode fonts, 29+ symbols, combo styles — all within BGMI's 14-char limit. Free, no login. Best BGMI name generator 2026."
        />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="author" content="BGMI Name Stylist" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href={BASE_URL} />

        {/* ── Language & Region ── */}
        <meta httpEquiv="content-language" content="en-IN" />
        <link rel="alternate" hrefLang="en-in" href={BASE_URL} />
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        {/* ── Open Graph (Facebook, WhatsApp, Telegram, Discord) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BGMI Name Stylist" />
        <meta
          property="og:title"
          content="BGMI Fancy Name Generator – Stylish BGMI Name & ID Stylist"
        />
        <meta
          property="og:description"
          content="Generate fancy, stylish BGMI names with Unicode fonts & symbols. Instant copy-paste. 100% free, no login. Best BGMI name generator online."
        />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="BGMI Fancy Name Stylist – Free ID Generator"
        />
        <meta property="og:locale" content="en_IN" />

        {/* ── Twitter / X Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BGMI Fancy Name Generator – Free Stylish BGMI Names"
        />
        <meta
          name="twitter:description"
          content="Generate stylish BGMI names with Unicode fonts & special symbols. Copy-paste ready. Free & instant."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <meta name="twitter:image:alt" content="BGMI Name Stylist" />

        {/* ── PWA & Mobile App ── */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="application-name" content="BGMI Name Stylist" />
        <meta name="apple-mobile-web-app-title" content="BGMI Stylist" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* ── Extra discovery tags ── */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta name="language" content="English" />
        <meta name="category" content="Gaming, Tools, Utilities" />
        <meta name="classification" content="Gaming Tool" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* ── Sitemap reference ── */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* ── Font preconnect (perf) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="overflow-x-hidden antialiased">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
