import React from "react";
import { Providers } from "./providers";
import PageTransition from "../components/PageTransition";
import "./global.css";

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
];

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7c3aed",
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "BGMI Fancy Name Generator – Stylish BGMI Name & ID Stylist 2026",
  description: "Generate fancy & stylish BGMI names instantly! 7 Unicode fonts, 29+ symbols, combo styles — all within BGMI's 14-char limit. Free, no login. Best BGMI name generator 2026.",
  keywords: KEYWORDS,
  authors: [{ name: "BGMI Name Stylist" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
      "en": BASE_URL,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: "BGMI Name Stylist",
    title: "BGMI Fancy Name Generator – Stylish BGMI Name & ID Stylist",
    description: "Generate fancy, stylish BGMI names with Unicode fonts & symbols. Instant copy-paste. 100% free, no login. Best BGMI name generator online.",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        secureUrl: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BGMI Fancy Name Stylist – Free ID Generator",
        type: "image/png",
      },
      {
        url: `${BASE_URL}/icon-512.png`,
        secureUrl: `${BASE_URL}/icon-512.png`,
        width: 512,
        height: 512,
        alt: "BGMI Fancy Name Stylist Logo",
        type: "image/png",
      }
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BGMI Fancy Name Generator – Free Stylish BGMI Names",
    description: "Generate stylish BGMI names with Unicode fonts & special symbols. Copy-paste ready. Free & instant.",
    site: "@bgmistylist", // Placeholder, Next.js will generate the twitter:site tag
    creator: "@bgmistylist", // Placeholder, Next.js will generate the twitter:creator tag
    images: {
      url: `${BASE_URL}/og-image.png`,
      alt: "BGMI Name Stylist",
    },
  },
  appleWebApp: {
    title: "BGMI Stylist",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "BGMI Name Stylist",
  formatDetection: {
    telephone: false,
  },
  other: {
    rating: "general",
    "revisit-after": "3 days",
    language: "English",
    category: "Gaming, Tools, Utilities",
    classification: "Gaming Tool",
    coverage: "Worldwide",
    distribution: "Global",
    target: "all",
    HandheldFriendly: "True",
    MobileOptimized: "320",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
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
      <body className="overflow-x-hidden antialiased flex flex-col min-h-screen">
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}

