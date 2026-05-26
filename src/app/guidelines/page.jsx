"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Check,
  X,
  AlertTriangle,
  Info,
  Zap,
  BookOpen,
  Hash,
  Type,
  ArrowLeft,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { useTheme, usePalette } from "../../utils/ThemeContext";

const SECTIONS = [
  {
    id: "basics",
    icon: <BookOpen size={18} />,
    title: "Basic Rules",
    color: "violet",
    rules: [
      {
        type: "allowed",
        text: "Maximum 14 characters including spaces and symbols.",
      },
      {
        type: "allowed",
        text: "Uppercase and lowercase English letters (A–Z, a–z).",
      },
      { type: "allowed", text: "Numbers 0–9 are fully supported." },
      { type: "allowed", text: "A single space between words is permitted." },
      { type: "denied", text: "Two consecutive spaces are not allowed." },
      {
        type: "denied",
        text: "Spaces at the start or end of a name are not allowed.",
      },
    ],
  },
  {
    id: "fonts",
    icon: <Type size={18} />,
    title: "Fancy Fonts",
    color: "blue",
    rules: [
      {
        type: "allowed",
        text: "Unicode stylised characters (𝕒𝕓𝕔, 𝓪𝓫𝓬, 𝐚𝐛𝐜) are supported.",
      },
      {
        type: "allowed",
        text: "Greek / Cyrillic letters used decoratively (α β γ) work in most cases.",
      },
      {
        type: "allowed",
        text: "Each fancy unicode character counts as 1 character towards the 14-char limit.",
      },
      {
        type: "warn",
        text: "Some stylised characters may not render on older Android devices.",
      },
      {
        type: "denied",
        text: "Combining characters that overlap or display as boxes will be rejected.",
      },
    ],
  },
  {
    id: "symbols",
    icon: <Hash size={18} />,
    title: "Symbols & Special Chars",
    color: "orange",
    rules: [
      {
        type: "allowed",
        text: "々, 〆, ๛, ×, 亗, ★, ⚡, ツ, ✿, Ø are officially supported.",
      },
      {
        type: "allowed",
        text: "Japanese/Chinese decorative CJK characters (帝, 神, 父) are allowed.",
      },
      {
        type: "allowed",
        text: "Bracket pairs like 『 』 are allowed and very popular.",
      },
      {
        type: "warn",
        text: "Symbols count as characters — use them wisely within the 14-char limit.",
      },
      {
        type: "denied",
        text: "Most standard emoji (😀🔥) will render as [?] for other players.",
      },
      {
        type: "denied",
        text: "Control characters or invisible zero-width characters are blocked.",
      },
    ],
  },
  {
    id: "content",
    icon: <Shield size={18} />,
    title: "Content Policy",
    color: "emerald",
    rules: [
      {
        type: "denied",
        text: "Names containing hate speech, slurs, or discriminatory language are permanently banned.",
      },
      {
        type: "denied",
        text: "Impersonating real players, streamers, or Krafton employees is prohibited.",
      },
      {
        type: "denied",
        text: "Sexual, violent, or otherwise explicit content will result in an account ban.",
      },
      {
        type: "denied",
        text: "Using competitor brand names (e.g. PUBG, COD) in your ID is not allowed.",
      },
      {
        type: "allowed",
        text: "Clan tags in brackets are encouraged and widely used by pro teams.",
      },
      {
        type: "warn",
        text: "Krafton reserves the right to force-reset any name without prior notice.",
      },
    ],
  },
  {
    id: "namechange",
    icon: <Zap size={18} />,
    title: "Name Change Rules",
    color: "pink",
    rules: [
      {
        type: "allowed",
        text: "You can rename your ID using a Rename Card obtainable in the in-game shop.",
      },
      {
        type: "allowed",
        text: "Rename Cards are available during events, the store, and Battle Pass rewards.",
      },
      {
        type: "warn",
        text: "Changing your name does NOT change your in-game UID.",
      },
      {
        type: "warn",
        text: "Friends list entries update automatically, but old screenshots will show the old name.",
      },
      {
        type: "denied",
        text: "Free renames are not available — always use a Rename Card.",
      },
    ],
  },
];

const COLOR_ACCENTS = {
  violet: {
    badge: {
      bg: "rgba(124,58,237,0.1)",
      border: "rgba(124,58,237,0.25)",
      text: "#8b5cf6",
    },
    dot: "#7c3aed",
  },
  blue: {
    badge: {
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.25)",
      text: "#60a5fa",
    },
    dot: "#3b82f6",
  },
  orange: {
    badge: {
      bg: "rgba(249,115,22,0.1)",
      border: "rgba(249,115,22,0.25)",
      text: "#fb923c",
    },
    dot: "#f97316",
  },
  emerald: {
    badge: {
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.25)",
      text: "#34d399",
    },
    dot: "#10b981",
  },
  pink: {
    badge: {
      bg: "rgba(236,72,153,0.1)",
      border: "rgba(236,72,153,0.25)",
      text: "#f472b6",
    },
    dot: "#ec4899",
  },
};

const RULE_CFG = {
  allowed: {
    icon: <Check size={13} />,
    bg: "rgba(16,185,129,0.1)",
    text: "#10b981",
    border: "rgba(16,185,129,0.15)",
  },
  denied: {
    icon: <X size={13} />,
    bg: "rgba(239,68,68,0.1)",
    text: "#f87171",
    border: "rgba(239,68,68,0.15)",
  },
  warn: {
    icon: <AlertTriangle size={13} />,
    bg: "rgba(234,179,8,0.1)",
    text: "#fbbf24",
    border: "rgba(234,179,8,0.15)",
  },
};

function ThemeToggle({ p }) {
  const { dark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border transition-all duration-300 hover:scale-105"
      style={{ background: p.bgTag, borderColor: p.border, color: p.textMuted }}
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </motion.div>
      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default function GuidelinesPage() {
  const p = usePalette();
  const [activeSection, setActiveSection] = useState("basics");

  useEffect(() => {
    document.title =
      "BGMI Name Rules & Guidelines – Allowed Fonts, Symbols & 14-Char Limit 2026";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute(
        "content",
        "Official BGMI naming guidelines: 14-character limit, allowed Unicode fonts (cursive, bold, outline), supported symbols (々〆★⚡亗), content policy, and rename card rules for Battlegrounds Mobile India.",
      );
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle)
      ogTitle.setAttribute(
        "content",
        "BGMI Naming Rules & Guidelines – Fonts, Symbols, Character Limit",
      );
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon && typeof window !== "undefined")
      canon.setAttribute("href", `${window.location.origin}/guidelines`);
  }, []);

  return (
    <div
      className="min-h-screen font-inter transition-colors duration-300"
      style={{ background: p.bg, color: p.text }}
    >
      {/* NAVBAR */}
      <nav
        className="w-full sticky top-0 z-50 border-b transition-colors duration-300"
        style={{
          background: p.bgNav,
          borderColor: p.border,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-violet-500"
              style={{ color: p.textMuted }}
            >
              <ArrowLeft size={15} /> Back
            </a>
            <div className="h-4 w-px" style={{ background: p.border }} />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-black italic text-[11px] text-white"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                }}
              >
                ID
              </div>
              <span className="font-bold text-sm" style={{ color: p.text }}>
                Stylist <span style={{ color: "#8b5cf6" }}>BGMI</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-5">
              <a
                href="/"
                className="text-sm font-medium hover:text-violet-500 transition-colors"
                style={{ color: p.textMuted }}
              >
                Generator
              </a>
              <a
                href="/guidelines"
                className="text-sm font-bold"
                style={{ color: "#8b5cf6" }}
              >
                Guidelines
              </a>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-violet-500 transition-colors"
                style={{ color: p.textMuted }}
              >
                Terms
              </a>
            </div>
            <ThemeToggle p={p} />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-14">
        {/* Hero */}
        <div className="mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              borderColor: "rgba(124,58,237,0.25)",
              color: "#8b5cf6",
            }}
          >
            <Shield size={12} /> Official Naming Guidelines
          </div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: p.text }}
          >
            BGMI ID{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#a78bfa,#60a5fa)",
              }}
            >
              Guidelines
            </span>
          </h1>
          <p
            className="text-lg max-w-2xl leading-relaxed"
            style={{ color: p.textMuted }}
          >
            Everything you need to know about naming rules, allowed fonts,
            symbols, and content policies in BGMI.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              "Last updated: May 2026",
              "BGMI Version 3.x",
              "Krafton Policy",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full border"
                style={{
                  color: p.tagText,
                  background: p.bgTag,
                  borderColor: p.tagBorder,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div
              className="sticky top-24 rounded-2xl border p-4 space-y-1 transition-colors duration-300"
              style={{ background: p.bgSidebar, borderColor: p.border }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest px-2 mb-3"
                style={{ color: p.tagText }}
              >
                Sections
              </p>
              {SECTIONS.map((s) => {
                const acc = COLOR_ACCENTS[s.color];
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSection(s.id);
                      document.getElementById(s.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200"
                    style={{
                      background: isActive ? p.sidebarBtn : "transparent",
                      color: isActive ? acc.badge.text : p.textMuted,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: isActive ? acc.dot : p.border }}
                    />
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-5">
            {SECTIONS.map((section, si) => {
              const acc = COLOR_ACCENTS[section.color];
              return (
                <motion.div
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.05 }}
                  viewport={{ once: true }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  className="rounded-2xl border p-7 transition-all duration-300 hover:border-violet-500/30"
                  style={{ background: p.bgCard, borderColor: p.border }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2 rounded-lg border"
                      style={{
                        background: acc.badge.bg,
                        borderColor: acc.badge.border,
                        color: acc.badge.text,
                      }}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h2
                        className="text-lg font-bold"
                        style={{ color: acc.badge.text }}
                      >
                        {section.title}
                      </h2>
                      <p className="text-xs" style={{ color: p.textMuted }}>
                        {section.rules.length} rules
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {section.rules.map((rule, i) => {
                      const cfg = RULE_CFG[rule.type];
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200"
                          style={{
                            background: p.ruleRowBg,
                            borderColor: cfg.border,
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: cfg.bg, color: cfg.text }}
                          >
                            {cfg.icon}
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: p.textSub }}
                          >
                            {rule.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* Disclaimer */}
            <div
              className="rounded-2xl border p-6 flex gap-4"
              style={{
                background: "rgba(234,179,8,0.05)",
                borderColor: "rgba(234,179,8,0.2)",
              }}
            >
              <Info
                size={20}
                className="shrink-0 mt-0.5"
                style={{ color: "#fbbf24" }}
              />
              <div>
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: "#fbbf24" }}
                >
                  Disclaimer
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: p.textMuted }}
                >
                  These guidelines are based on community experience and
                  publicly observable BGMI behaviour. Krafton may change rules
                  at any time without notice. This tool is not affiliated with
                  Krafton Inc. Always verify in-game before committing to a name
                  change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="border-t w-full mt-16 transition-colors duration-300"
        style={{ background: p.bgFooter, borderColor: p.border }}
      >
        <div className="w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: p.tagText }}>
            © 2026 Stylist BGMI. Not affiliated with Krafton Inc.
          </p>
          <div className="flex gap-6">
            <a
              href="/"
              className="text-xs hover:text-violet-500 transition-colors"
              style={{ color: p.textMuted }}
            >
              Generator
            </a>
            <a
              href="/guidelines"
              className="text-xs font-bold"
              style={{ color: "#8b5cf6" }}
            >
              Guidelines
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-violet-500 transition-colors"
              style={{ color: p.textMuted }}
            >
              Terms
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 99px; }
      `}</style>
    </div>
  );
}
