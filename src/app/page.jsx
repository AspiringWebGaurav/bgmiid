"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import {
  Copy,
  Search,
  Check,
  Zap,
  Trophy,
  Shield,
  User,
  Sparkles,
  Star,
  Flame,
  Sun,
  Moon,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import { useTheme, usePalette } from "../utils/ThemeContext";
import { BGMI_SYMBOLS, CATEGORIES, BGMI_RULES } from "../data/bgmi-names";
import AppLoader from "../components/AppLoader";

/* ─── helpers ─────────────────────────────────────────── */
const TYPE_META = {
  font: {
    label: "Font",
    dk: "bg-violet-500/10 text-violet-400",
    lt: "bg-violet-100 text-violet-600",
  },
  symbol: {
    label: "Symbol",
    dk: "bg-orange-500/10 text-orange-400",
    lt: "bg-orange-100 text-orange-500",
  },
  combo: {
    label: "Combo",
    dk: "bg-emerald-500/10 text-emerald-400",
    lt: "bg-emerald-100 text-emerald-600",
  },
};

async function fetchNames(name) {
  if (!name || name.trim().length === 0) return null;
  const res = await fetch(
    `/api/generate?name=${encodeURIComponent(name.trim())}`,
  );
  if (!res.ok) throw new Error("Failed to generate names");
  return res.json();
}

/* ─── sub-components ──────────────────────────────────── */
function CircularProgress({ value, max = 14, p }) {
  const pct = Math.min((value / max) * 100, 100);
  const r = 8,
    circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const stroke = value > max ? "#ef4444" : value > 10 ? "#f97316" : "#7c3aed";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-5 h-5 -rotate-90">
        <circle
          strokeWidth="2"
          fill="transparent"
          r={r}
          cx="10"
          cy="10"
          stroke={p.isDark ? "rgba(255,255,255,0.08)" : "rgba(124,58,237,0.12)"}
        />
        <circle
          strokeWidth="2"
          fill="transparent"
          r={r}
          cx="10"
          cy="10"
          stroke={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.4s" }}
        />
      </svg>
      <span
        className="absolute text-[8px] font-black"
        style={{ color: value > max ? "#ef4444" : p.text }}
      >
        {value}
      </span>
    </div>
  );
}

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

function CardSkeleton({ p }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{ background: p.bgCard, borderColor: p.border }}
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className="h-5 w-14 rounded-full"
          style={{ background: p.border }}
        />
        <div
          className="h-5 w-5 rounded-full"
          style={{ background: p.border }}
        />
      </div>
      <div
        className="h-6 w-3/4 rounded-lg mb-5"
        style={{ background: p.border }}
      />
      <div className="h-9 w-full rounded-lg" style={{ background: p.border }} />
      <style jsx global>{`
        @keyframes shimmer {
          0% { opacity: 0.4; } 50% { opacity: 0.9; } 100% { opacity: 0.4; }
        }
        .skeleton-pulse > * { animation: shimmer 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ─── FAQ Card ─────────────────────────────────────────── */
function FaqCard({ q, a, p }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      itemScope
      itemType="https://schema.org/Question"
      className="rounded-xl border transition-all duration-300 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: p.bgCard,
        borderColor: open ? "rgba(124,58,237,0.35)" : p.border,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-3 p-5 text-left"
        aria-expanded={open}
      >
        <h3
          itemProp="name"
          className="text-sm font-bold leading-snug"
          style={{ color: p.text }}
        >
          {q}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-lg font-light leading-none mt-0.5"
          style={{ background: "rgba(124,58,237,0.12)", color: "#8b5cf6" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            itemScope
            itemType="https://schema.org/Answer"
            itemProp="acceptedAnswer"
          >
            <div className="px-5 pb-5">
              <div className="h-px mb-4" style={{ background: p.border }} />
              <p
                itemProp="text"
                className="text-sm leading-relaxed"
                style={{ color: p.textMuted }}
              >
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/* ─── main page ───────────────────────────────────────── */
export default function BGMIDGenerator() {
  const p = usePalette();
  const [appReady, setAppReady] = useState(false);
  const [inputName, setInputName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const debounceRef = useRef(null);

  // Silent visitor tracking — fires once when app is ready
  useEffect(() => {
    if (!appReady) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/" }),
    }).catch(() => {});
  }, [appReady]);

  // Debounce input → only fires API after 400ms pause
  const handleInput = useCallback((val) => {
    setInputName(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedName(val), 400);
  }, []);

  // Backend query via react-query
  const { data, isFetching, isError } = useQuery({
    queryKey: ["generate", debouncedName],
    queryFn: () => fetchNames(debouncedName),
    enabled: debouncedName.trim().length > 0,
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });

  const results = data?.results || [];

  const handleCopy = useCallback((name) => {
    if (name.length > 14) {
      toast.error("Name exceeds BGMI's 14-character limit!");
      return;
    }
    navigator.clipboard.writeText(name);
    setCopiedId(name);
    toast.success("Copied! Paste directly in BGMI ✅");
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  if (!appReady) {
    return <AppLoader onDone={() => setAppReady(true)} />;
  }

  return (
    <div
      className="min-h-screen font-inter transition-colors duration-300"
      style={{ background: p.bg, color: p.text }}
    >
      <Toaster position="top-center" richColors />

      {/* ── NAVBAR ── */}
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
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-sm text-white"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                boxShadow: "0 0 16px rgba(124,58,237,0.4)",
              }}
            >
              ID
            </div>
            <div>
              <span
                className="font-black text-base tracking-tight leading-none"
                style={{ color: p.text }}
              >
                BGMI <span style={{ color: "#8b5cf6" }}>Name Stylist</span>
              </span>
              <div
                className="text-[9px] font-semibold uppercase tracking-widest leading-none mt-0.5"
                style={{ color: p.tagText }}
              >
                Fancy ID Generator
              </div>
            </div>
          </div>
          {/* Nav items */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-5">
              {[
                { href: "#generator", label: "Generator", ext: false },
                { href: "#symbols", label: "Symbols", ext: false },
                { href: "/guidelines", label: "Guidelines", ext: true },
                { href: "/terms", label: "Terms", ext: true },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.ext
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm font-medium transition-colors duration-200 hover:text-violet-500"
                  style={{ color: p.textMuted }}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div
              className="hidden md:block h-4 w-px"
              style={{ background: p.border }}
            />
            <ThemeToggle p={p} />
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border"
              style={{ background: p.bgTag, borderColor: p.border }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  style={{
                    animation:
                      "bgmi-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: p.tagText }}
              >
                Live
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-14 md:py-20">
        {/* ── HERO ── */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] rounded-full blur-3xl"
              style={{
                background: p.isDark
                  ? "radial-gradient(ellipse,rgba(124,58,237,0.22),transparent 70%)"
                  : "radial-gradient(ellipse,rgba(124,58,237,0.1),transparent 70%)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 border"
            style={{
              background: "rgba(124,58,237,0.1)",
              borderColor: "rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            <Sparkles size={13} />
            <span>Updated for BGMI 2026 Season</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight"
            style={{ color: p.text }}
          >
            Create a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#a78bfa,#818cf8,#60a5fa)",
              }}
            >
              Legendary
            </span>
            <br />
            BGMI Identity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: p.textMuted }}
          >
            Transform any name into a unique styled ID using Unicode fonts,
            special symbols & combos — all within BGMI's official naming rules.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-8 flex-wrap"
          >
            {[
              {
                icon: <Flame size={13} />,
                label: "7 Font Styles",
                bg: "rgba(249,115,22,0.1)",
                bc: "rgba(249,115,22,0.22)",
                tc: "#f97316",
              },
              {
                icon: <Star size={13} />,
                label: "29+ Symbols",
                bg: "rgba(234,179,8,0.1)",
                bc: "rgba(234,179,8,0.22)",
                tc: "#eab308",
              },
              {
                icon: <Shield size={13} />,
                label: "Rule-Compliant",
                bg: "rgba(16,185,129,0.1)",
                bc: "rgba(16,185,129,0.22)",
                tc: "#10b981",
              },
              {
                icon: <Zap size={13} />,
                label: "Instant & Free",
                bg: "rgba(99,102,241,0.1)",
                bc: "rgba(99,102,241,0.22)",
                tc: "#818cf8",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border cursor-default"
                style={{ background: s.bg, borderColor: s.bc, color: s.tc }}
              >
                {s.icon}
                {s.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── GENERATOR ── */}
        <section id="generator" className="mb-20">
          {/* Search input */}
          <div className="sticky top-[80px] z-40 w-full px-2 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-4 rounded-2xl p-[1.5px] shadow-xl transition-all duration-300 focus-within:scale-[1.01] focus-within:shadow-[0_15px_50px_-10px_rgba(124,58,237,0.5)]"
              style={{
                background:
                  "linear-gradient(135deg,rgba(124,58,237,0.6),rgba(79,70,229,0.5),rgba(6,182,212,0.3))",
                boxShadow: "0 10px 40px -10px rgba(124,58,237,0.3)",
              }}
            >
            <div
              className="rounded-[14px] flex items-center"
              style={{ background: p.bgInput }}
            >
              <div className="pl-4 shrink-0" style={{ color: p.textMuted }}>
                {isFetching ? (
                  <Loader2
                    size={20}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Search size={20} />
                )}
              </div>
              <input
                type="text"
                placeholder="Type any name — e.g. Shadow, Alpha, Storm…"
                className="flex-1 pl-3 pr-3 py-4 text-lg bg-transparent border-none outline-none focus:ring-0"
                style={{ color: p.inputText, caretColor: "#8b5cf6" }}
                value={inputName}
                onChange={(e) => handleInput(e.target.value)}
                maxLength={20}
                aria-label="Enter name to stylise"
              />
              <div className="pr-4 flex items-center gap-3">
                <AnimatePresence>
                  {inputName.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => handleInput("")}
                      className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      style={{ color: p.textMuted }}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <CircularProgress value={inputName.length} p={p} />
              </div>
            </div>
            </motion.div>
          </div>

          {/* Live hint */}
          <div className="max-w-2xl mx-auto mb-10 flex items-center justify-between px-1">
            <p className="text-xs" style={{ color: p.tagText }}>
              Max 14 chars in-game • Spaces & symbols count
            </p>
            {data && results.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('results-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                <p className="text-xs font-semibold" style={{ color: p.tagText }}>
                  {results.filter((r) => !r.tooLong).length} valid styles
                </p>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="flex items-center"
                  style={{ color: "#8b5cf6" }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest mr-0.5 hidden sm:inline">Scroll</span>
                  <ChevronRight size={13} className="rotate-90" />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-5 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-200 outline-none"
                style={{
                  color: activeCategory === cat.id ? "#fff" : p.textMuted,
                }}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {activeCategory !== cat.id && (
                  <div
                    className="absolute inset-0 rounded-full border transition-opacity opacity-50 hover:opacity-100"
                    style={{ borderColor: p.border, zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          <AnimatePresence mode="popLayout">
            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 rounded-2xl border"
                style={{
                  background: "rgba(239,68,68,0.05)",
                  borderColor: "rgba(239,68,68,0.2)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#f87171" }}
                >
                  Something went wrong generating names. Please try again.
                </p>
              </motion.div>
            )}

            {/* Skeleton loading */}
            {isFetching && results.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="skeleton-pulse">
                    <CardSkeleton p={p} />
                  </div>
                ))}
              </div>
            )}

            {/* Actual results */}
            {results.length > 0 && (
              <motion.div
                id="results-grid"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {results.map((item, index) => {
                  const meta = TYPE_META[item.type] || TYPE_META.font;
                  const isHov = hoveredCard === index;
                  const isCopied = copiedId === item.name;
                  const tooLong = item.tooLong;
                  return (
                    <motion.div
                      layout
                      key={item.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.025, 0.4) }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={twMerge(
                        "relative rounded-xl p-5 overflow-hidden cursor-default border transition-all duration-300",
                        !tooLong && isHov && "animate-shine-effect"
                      )}
                      style={{
                        background: isHov ? p.bgCardHover : p.bgCard,
                        borderColor: tooLong
                          ? "rgba(239,68,68,0.2)"
                          : isHov
                            ? "rgba(124,58,237,0.4)"
                            : p.border,
                        boxShadow:
                          isHov && !tooLong
                            ? "0 8px 32px rgba(124,58,237,0.12)"
                            : "none",
                        transform: isHov ? "translateY(-3px)" : "translateY(0)",
                        opacity: tooLong ? 0.55 : 1,
                      }}
                    >
                      {isHov && !tooLong && (
                        <div
                          className="absolute inset-0 pointer-events-none rounded-xl"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 0%,rgba(124,58,237,0.06),transparent 70%)",
                          }}
                        />
                      )}

                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={twMerge(
                              "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full",
                              p.isDark ? meta.dk : meta.lt,
                            )}
                          >
                            {meta.label}
                          </span>
                          {item.label && item.label !== meta.label && (
                            <span
                              className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: p.bgTag, color: p.tagText }}
                            >
                              {item.label}
                            </span>
                          )}
                        </div>
                        <CircularProgress
                          value={item.charCount || item.name.length}
                          p={p}
                        />
                      </div>

                      <div
                        className="text-xl font-bold mb-2 truncate"
                        style={{ color: p.text }}
                        title={item.name}
                      >
                        {item.name}
                      </div>

                      {tooLong && (
                        <p
                          className="text-[10px] font-semibold mb-3"
                          style={{ color: "#f87171" }}
                        >
                          ⚠ Exceeds 14-char limit
                        </p>
                      )}
                      {!tooLong && <div className="mb-3" />}

                      <motion.button
                        whileTap={!tooLong ? { scale: 0.95 } : {}}
                        onClick={() => handleCopy(item.name)}
                        disabled={tooLong}
                        className={twMerge(
                          "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200 disabled:cursor-not-allowed",
                          !tooLong && !isCopied && "animate-shine-effect hover:shadow-md"
                        )}
                        style={
                          isCopied
                            ? {
                                background: "rgba(16,185,129,0.1)",
                                color: "#10b981",
                                borderColor: "rgba(16,185,129,0.3)",
                              }
                            : tooLong
                              ? {
                                  background: "transparent",
                                  color: p.tagText,
                                  borderColor: p.border,
                                }
                              : {
                                  background: isHov
                                    ? "rgba(124,58,237,0.09)"
                                    : "transparent",
                                  color: p.isDark
                                    ? "rgba(255,255,255,0.65)"
                                    : "#6d28d9",
                                  borderColor: isHov
                                    ? "rgba(124,58,237,0.35)"
                                    : p.border,
                                }
                        }
                      >
                        {isCopied ? (
                          <>
                            <Check size={15} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={15} />
                            <span>{tooLong ? "Too Long" : "Copy ID"}</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Empty state */}
            {!isFetching && results.length === 0 && !isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 rounded-3xl border-2 border-dashed"
                style={{ borderColor: p.emptyBorder, background: p.emptyBg }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: p.bgTag, color: p.textMuted }}
                >
                  <User size={28} />
                </motion.div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: p.textSub }}
                >
                  Start typing your name
                </h3>
                <p
                  className="text-sm max-w-xs mx-auto leading-relaxed"
                  style={{ color: p.textMuted }}
                >
                  Enter any name above — we'll generate stylised versions using
                  Unicode fonts, symbols, and combos instantly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── GUIDELINES PREVIEW ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            className="md:col-span-2 rounded-2xl border p-8 transition-colors duration-300"
            style={{ background: p.bgCard, borderColor: p.border }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <Shield size={20} style={{ color: "#8b5cf6" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: p.text }}>
                  Naming Rules
                </h2>
                <p className="text-xs" style={{ color: p.textMuted }}>
                  Official BGMI guidelines
                </p>
              </div>
              <a
                href="/guidelines"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-semibold flex items-center gap-1 hover:opacity-75 transition-opacity"
                style={{ color: "#8b5cf6" }}
              >
                Full guide <ChevronRight size={13} />
              </a>
            </div>
            <div className="space-y-2.5">
              {BGMI_RULES.map((rule, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl border"
                  style={{ background: p.ruleRowBg, borderColor: p.border }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      color: "#8b5cf6",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: p.textSub }}
                  >
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-8 flex flex-col justify-between transition-colors duration-300"
            style={{ background: p.bgCard, borderColor: p.border }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} style={{ color: "#f59e0b" }} />
                <h3 className="text-lg font-bold" style={{ color: p.text }}>
                  Style Ideas
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: p.textMuted }}
              >
                Use 1 symbol as a prefix or suffix for a clean, pro-looking
                identity.
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    e: "🔥",
                    l: "々 Shadow 々",
                    bg: "rgba(249,115,22,0.08)",
                    bc: "rgba(249,115,22,0.18)",
                    tc: "#f97316",
                  },
                  {
                    e: "⚡",
                    l: "〆 Alpha 〆",
                    bg: "rgba(99,102,241,0.08)",
                    bc: "rgba(99,102,241,0.18)",
                    tc: "#818cf8",
                  },
                  {
                    e: "★",
                    l: "亗 Storm 亗",
                    bg: "rgba(16,185,129,0.08)",
                    bc: "rgba(16,185,129,0.18)",
                    tc: "#10b981",
                  },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="flex items-center gap-2.5 p-3 rounded-xl border"
                    style={{ background: t.bg, borderColor: t.bc }}
                  >
                    <span className="text-base">{t.e}</span>
                    <span
                      className="text-xs font-bold font-mono"
                      style={{ color: t.tc }}
                    >
                      {t.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-1 text-sm font-semibold hover:opacity-75 transition-opacity"
              style={{ color: "#8b5cf6" }}
            >
              Full naming guide <ChevronRight size={14} />
            </a>
          </div>
        </section>

        {/* ── SYMBOL LIBRARY ── */}
        <section
          id="symbols"
          aria-label="BGMI Symbol Library"
          className="rounded-2xl border p-8 mb-16 transition-colors duration-300"
          style={{ background: p.bgCard, borderColor: p.border }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: p.text }}>
                Symbol Library
              </h2>
              <p className="text-xs" style={{ color: p.textMuted }}>
                Click any symbol to copy it instantly
              </p>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                color: p.tagText,
                background: p.bgTag,
                borderColor: p.tagBorder,
              }}
            >
              {BGMI_SYMBOLS.length} symbols
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {BGMI_SYMBOLS.map((sym, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  navigator.clipboard.writeText(sym);
                  toast.success(`"${sym}" copied!`);
                }}
                className="w-11 h-11 flex items-center justify-center rounded-xl border text-lg font-mono transition-all duration-200 hover:border-violet-500/45 hover:text-violet-500"
                style={{
                  background: p.symbolBtn,
                  borderColor: p.border,
                  color: p.textSub,
                }}
              >
                {sym}
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── FAQ SECTION (SEO rich results) ── */}
        <section
          id="faq"
          aria-label="BGMI Fancy Name FAQ"
          className="mb-16"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight mb-2"
              style={{ color: p.text }}
            >
              Frequently Asked{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                }}
              >
                Questions
              </span>
            </h2>
            <p className="text-sm" style={{ color: p.textMuted }}>
              Everything about BGMI fancy names, stylish fonts & symbols
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                q: "How to get a fancy name in BGMI?",
                a: "Type any nickname in the search bar above. BGMI Name Stylist instantly generates 20+ stylised versions using Unicode fonts, special symbols, and combos. Click 'Copy ID' on your favourite, then paste it in BGMI using a Rename Card.",
              },
              {
                q: "What is the BGMI name character limit?",
                a: "BGMI player names have a maximum of 14 characters. This includes letters, numbers, spaces, and special symbols. Every name card shows a live character counter and flags names that are too long.",
              },
              {
                q: "Which symbols work in BGMI names?",
                a: "Symbols like 々, 〆, ๛, ×, 亗, ★, ⚡, ツ, ✿, Ø, 『 』, 帝, 神 all work in BGMI. Browse the Symbol Library on this page to copy any character instantly.",
              },
              {
                q: "Do fancy Unicode fonts work in BGMI?",
                a: "Yes! Cursive (𝓪𝓫𝓬), Bold (𝐚𝐛𝐜), Outline (𝕒𝕓𝕔), and Cyrillic (αвс) Unicode fonts all work in BGMI player names. Each character counts as one towards the 14-char limit.",
              },
              {
                q: "Is BGMI Name Stylist free?",
                a: "100% free — no account, login, or payment ever. Just type a name and copy any of the generated fancy styles directly into BGMI.",
              },
              {
                q: "How to change BGMI name with stylish fonts?",
                a: "1. Type your name here and copy a fancy result. 2. Open BGMI → Profile → tap your name. 3. Get a Rename Card from the in-game shop. 4. Paste your copied fancy name and confirm.",
              },
              {
                q: "Can I use this BGMI name generator on mobile?",
                a: "Yes! BGMI Name Stylist is fully mobile-optimised. Open it in any Android or iOS browser, generate your fancy name, copy it, and paste directly into BGMI.",
              },
              {
                q: "What are stylish BGMI name ideas?",
                a: "Combine a short word with a symbol pair for a pro look — e.g. 亗 Shadow 亗, 『Alpha』, 〆Storm〆, ★Blade★. Use the generator above to create hundreds of combinations from any name instantly.",
              },
            ].map((item, i) => (
              <FaqCard key={i} q={item.q} a={item.a} p={p} />
            ))}
          </div>
        </section>

        {/* ── HIDDEN SEO KEYWORD BLOCK (screen-reader accessible, not spammy) ── */}
        <div className="sr-only" aria-hidden="true">
          <p>
            BGMI fancy name generator — free stylish BGMI name and ID maker.
            Generate BGMI names with Unicode fonts, special symbols and combos.
            Best BGMI name generator online 2026. Battlegrounds Mobile India
            stylish name, BGMI name change, BGMI ID generator, fancy fonts for
            BGMI, BGMI name copy paste, BGMI symbol list, BGMI name style, BGMI
            cool names, BGMI unique name ideas.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="border-t w-full transition-colors duration-300"
        style={{ background: p.bgFooter, borderColor: p.border }}
      >
        <div className="w-full px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-xs text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  }}
                >
                  ID
                </div>
                <span className="font-black text-lg tracking-tight" style={{ color: p.text }}>
                  BGMI Name Stylist
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: p.textMuted }}
              >
                A free community tool for generating stylised player IDs. Not
                affiliated with or endorsed by Krafton Inc. Built with care for the community.
              </p>
            </div>
            
            {/* Spacer for large screens */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Navigation Column */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-2"
                style={{ color: p.tagText }}
              >
                Navigate
              </p>
              {[
                { href: "#generator", label: "Generator", ext: false },
                { href: "#symbols", label: "Symbol Library", ext: false },
                { href: "/guidelines", label: "Naming Guidelines", ext: true },
                { href: "/terms", label: "Terms & Conditions", ext: true },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.ext
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm font-medium transition-all duration-200 hover:text-violet-500 hover:translate-x-1 w-fit"
                  style={{ color: p.textMuted }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Legal Column */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-2"
                style={{ color: p.tagText }}
              >
                Legal
              </p>
              {[
                { href: "/terms", label: "Terms of Use" },
                { href: "/terms", label: "Privacy Policy" },
                { href: "/guidelines", label: "Naming Rules" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-all duration-200 hover:text-violet-500 hover:translate-x-1 w-fit"
                  style={{ color: p.textMuted }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderColor: p.divider }}
          >
            <p className="text-xs font-medium text-center md:text-left" style={{ color: p.tagText }}>
              © 2026 BGMI Name Stylist. All trademarks belong to their respective owners.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  style={{
                    animation:
                      "bgmi-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: p.text }}
              >
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 99px; }
        @keyframes bgmi-ping { 75%,100% { transform: scale(2); opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.85; } }
        .skeleton-pulse > * { animation: shimmer 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
