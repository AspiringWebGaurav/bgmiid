"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Globe,
  Users,
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Activity,
  MapPin,
  Clock,
  Wifi,
  ArrowUp,
  ArrowDown,
  Minus,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ── helpers ─────────────────────────────── */
const FLAG_URL = (cc) =>
  `https://flagcdn.com/24x18/${(cc || "xx").toLowerCase()}.png`;

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const DEVICE_ICON = { Desktop: Monitor, Mobile: Smartphone, Tablet };

/* ── sub-components ──────────────────────── */
function StatCard({ label, value, sub, icon: Icon, color, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border p-6 flex flex-col gap-3"
      style={{ background: "#16162a", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg" style={{ background: `${color}18` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend !== undefined && trend !== null && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}
          >
            {trend > 0 ? (
              <ArrowUp size={11} />
            ) : trend < 0 ? (
              <ArrowDown size={11} />
            ) : (
              <Minus size={11} />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div
          className="text-xs font-semibold mt-0.5"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {label}
        </div>
        {sub && (
          <div
            className="text-[10px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MiniBar({ pct, color }) {
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

function HourlyChart({ data }) {
  if (!data || data.length === 0)
    return (
      <div
        className="flex items-end justify-center h-20 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        No data yet
      </div>
    );
  const max = Math.max(...data.map((d) => parseInt(d.visits)), 1);
  return (
    <div className="flex items-end gap-1 h-20 w-full">
      {data.map((d, i) => {
        const h = Math.max((parseInt(d.visits) / max) * 100, 4);
        const hr = new Date(d.hour).getHours();
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 group relative"
            title={`${hr}:00 — ${d.visits} visits`}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.02, duration: 0.5 }}
              className="w-full rounded-t-sm"
              style={{
                background: `linear-gradient(180deg,#a78bfa,#7c3aed)`,
                minHeight: 3,
              }}
            />
            {i % 4 === 0 && (
              <span
                className="text-[8px] font-medium"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {hr}h
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DailyChart({ data }) {
  if (!data || data.length === 0)
    return (
      <div
        className="flex items-end justify-center h-24 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        No data yet
      </div>
    );
  const max = Math.max(...data.map((d) => parseInt(d.visits)), 1);
  return (
    <div className="flex items-end gap-1 h-24 w-full">
      {data.map((d, i) => {
        const h = Math.max((parseInt(d.visits) / max) * 100, 4);
        const label = new Date(d.day).toLocaleDateString("en", {
          month: "short",
          day: "numeric",
        });
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 group"
            title={`${label}: ${d.visits} visits`}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.015, duration: 0.5 }}
              className="w-full rounded-t-sm transition-all group-hover:opacity-70"
              style={{
                background: "linear-gradient(180deg,#60a5fa,#3b82f6)",
                minHeight: 3,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── main page ───────────────────────────── */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  const [lastRefresh, setLastRefresh] = useState(null);

  // Derive domain dynamically
  const [domain, setDomain] = useState("");
  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const fetchStats = useCallback(async (pw) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/stats?pw=${encodeURIComponent(pw)}`);
      if (res.status === 401) {
        setError("Wrong password. Try again.");
        setPassword("");
        return;
      }
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      setData(json);
      setPassword(pw);
      setLastRefresh(new Date());
    } catch (e) {
      setError("Could not load data. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchStats(inputPw);
  };

  // Auto-refresh every 60s
  useEffect(() => {
    if (!password) return;
    const t = setInterval(() => fetchStats(password), 60000);
    return () => clearInterval(t);
  }, [password, fetchStats]);

  const totalCountryVisits =
    data?.countries?.reduce((s, c) => s + parseInt(c.visits), 0) || 1;
  const COUNTRY_COLORS = [
    "#a78bfa",
    "#60a5fa",
    "#34d399",
    "#f97316",
    "#f472b6",
    "#facc15",
    "#38bdf8",
    "#fb7185",
    "#4ade80",
    "#e879f9",
  ];

  /* ── LOGIN SCREEN ── */
  if (!password) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-inter"
        style={{
          background:
            "linear-gradient(135deg,#0f0f17 0%,#1a0a2e 50%,#0f0f17 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse,rgba(124,58,237,0.15),transparent 70%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm mx-4 rounded-2xl border p-8"
          style={{
            background: "#16162a",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              }}
            >
              <Shield size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-black text-white">Admin Panel</h1>
            <p
              className="text-xs mt-1 font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {domain}/admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div
              className="relative rounded-xl border overflow-hidden"
              style={{
                borderColor: error
                  ? "rgba(239,68,68,0.4)"
                  : "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <Lock size={16} />
              </div>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Admin password"
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !inputPw}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
            >
              {loading ? "Verifying…" : "Access Dashboard"}
            </button>
          </form>

          <p
            className="text-center text-xs mt-6"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            BGMI Name Stylist · Visitor Analytics
          </p>
        </motion.div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}</style>
      </div>
    );
  }

  /* ── DASHBOARD ── */
  const TABS = ["overview", "countries", "visitors", "devices"];

  return (
    <div
      className="min-h-screen font-inter"
      style={{ background: "#0f0f17", color: "#fff" }}
    >
      {/* Navbar */}
      <nav
        className="w-full sticky top-0 z-50 border-b"
        style={{
          background: "rgba(15,15,23,0.9)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-sm text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
            >
              ID
            </div>
            <div>
              <span className="font-black text-sm text-white">
                Admin <span style={{ color: "#8b5cf6" }}>Analytics</span>
              </span>
              <div
                className="text-[9px] font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {domain}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span
                className="text-[10px] hidden sm:block"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Updated {timeAgo(lastRefresh.toISOString())}
              </span>
            )}
            <button
              onClick={() => fetchStats(password)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => {
                setPassword("");
                setData(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
              style={{
                borderColor: "rgba(239,68,68,0.3)",
                color: "#f87171",
                background: "rgba(239,68,68,0.06)",
              }}
            >
              <Lock size={13} /> Logout
            </button>
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              ← Site
            </a>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 md:px-6 py-8 max-w-7xl mx-auto">
        {/* Tab nav */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all"
              style={
                tab === t
                  ? {
                      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "#fff",
                      borderColor: "transparent",
                    }
                  : {
                      background: "transparent",
                      color: "rgba(255,255,255,0.4)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }
              }
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {loading && !data && (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          </div>
        )}

        {data && (
          <AnimatePresence mode="wait">
            {/* ── OVERVIEW ── */}
            {tab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    label="Total Visitors"
                    value={fmt(data.overview.total)}
                    icon={Users}
                    color="#a78bfa"
                    trend={data.overview.growth}
                    sub="all time"
                  />
                  <StatCard
                    label="Last 24 Hours"
                    value={fmt(data.overview.today)}
                    icon={Activity}
                    color="#60a5fa"
                    sub="unique visits"
                  />
                  <StatCard
                    label="Countries"
                    value={data.countries?.length || 0}
                    icon={Globe}
                    color="#34d399"
                    sub="reached so far"
                  />
                  <StatCard
                    label="Yesterday"
                    value={fmt(data.overview.yesterday)}
                    icon={Clock}
                    color="#f97316"
                    sub="for comparison"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* 24h hourly chart */}
                  <div
                    className="rounded-2xl border p-6"
                    style={{
                      background: "#16162a",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="text-sm font-bold text-white mb-1">
                      Visitors – Last 24 Hours
                    </h3>
                    <p
                      className="text-xs mb-5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Hourly breakdown
                    </p>
                    <HourlyChart data={data.hourly} />
                  </div>

                  {/* 30-day daily chart */}
                  <div
                    className="rounded-2xl border p-6"
                    style={{
                      background: "#16162a",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="text-sm font-bold text-white mb-1">
                      Visitors – Last 30 Days
                    </h3>
                    <p
                      className="text-xs mb-5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Daily totals
                    </p>
                    <DailyChart data={data.daily} />
                  </div>
                </div>

                {/* Top 5 countries */}
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    background: "#16162a",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="text-sm font-bold text-white mb-5">
                    Top Countries
                  </h3>
                  <div className="space-y-3">
                    {(data.countries || []).slice(0, 8).map((c, i) => {
                      const pct = Math.round(
                        (parseInt(c.visits) / totalCountryVisits) * 100,
                      );
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            src={FLAG_URL(c.country_code)}
                            alt={c.country}
                            className="w-6 h-4 rounded-sm object-cover shrink-0"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className="text-sm font-medium text-white w-36 truncate">
                            {c.country || "Unknown"}
                          </span>
                          <div className="flex-1">
                            <MiniBar
                              pct={pct}
                              color={COUNTRY_COLORS[i % COUNTRY_COLORS.length]}
                            />
                          </div>
                          <span
                            className="text-xs font-bold w-8 text-right"
                            style={{
                              color: COUNTRY_COLORS[i % COUNTRY_COLORS.length],
                            }}
                          >
                            {pct}%
                          </span>
                          <span
                            className="text-xs w-12 text-right font-semibold"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {fmt(parseInt(c.visits))}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── COUNTRIES ── */}
            {tab === "countries" && (
              <motion.div
                key="countries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    background: "#16162a",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="px-6 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <h3 className="text-sm font-bold text-white">
                      All Countries
                    </h3>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        color: "#a78bfa",
                      }}
                    >
                      {data.countries?.length} countries
                    </span>
                  </div>
                  <div
                    className="divide-y"
                    style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  >
                    {(data.countries || []).map((c, i) => {
                      const pct = Math.round(
                        (parseInt(c.visits) / totalCountryVisits) * 100,
                      );
                      const color = COUNTRY_COLORS[i % COUNTRY_COLORS.length];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-4 px-6 py-3.5"
                        >
                          <span
                            className="text-sm font-black w-5 text-right"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                          >
                            {i + 1}
                          </span>
                          <img
                            src={FLAG_URL(c.country_code)}
                            alt={c.country}
                            className="w-7 h-5 rounded object-cover shrink-0"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {c.country || "Unknown"}
                            </p>
                            <p
                              className="text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                              {c.country_code}
                            </p>
                          </div>
                          <div className="w-32 hidden sm:block">
                            <MiniBar pct={pct} color={color} />
                          </div>
                          <span
                            className="text-xs font-bold w-8 text-right"
                            style={{ color }}
                          >
                            {pct}%
                          </span>
                          <span className="text-sm font-black w-14 text-right text-white">
                            {fmt(parseInt(c.visits))}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RECENT VISITORS ── */}
            {tab === "visitors" && (
              <motion.div
                key="visitors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    background: "#16162a",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="px-6 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <h3 className="text-sm font-bold text-white">
                      Recent Visitors
                    </h3>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(96,165,250,0.15)",
                        color: "#60a5fa",
                      }}
                    >
                      Last 50
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="border-b"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        >
                          {[
                            "Flag",
                            "Country",
                            "City",
                            "Device",
                            "ISP",
                            "Page",
                            "When",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(data.recent || []).map((v, i) => {
                          const DevIcon = DEVICE_ICON[v.device_type] || Monitor;
                          return (
                            <motion.tr
                              key={v.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.02 }}
                              className="border-b hover:bg-white/[0.02] transition-colors"
                              style={{ borderColor: "rgba(255,255,255,0.03)" }}
                            >
                              <td className="px-4 py-3">
                                <img
                                  src={FLAG_URL(v.country_code)}
                                  alt={v.country}
                                  className="w-6 h-4 rounded-sm object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                                {v.country || "—"}
                              </td>
                              <td
                                className="px-4 py-3 whitespace-nowrap"
                                style={{ color: "rgba(255,255,255,0.45)" }}
                              >
                                {v.city || "—"}
                              </td>
                              <td className="px-4 py-3">
                                <div
                                  className="flex items-center gap-1.5"
                                  style={{ color: "rgba(255,255,255,0.45)" }}
                                >
                                  <DevIcon size={13} />
                                  <span className="text-xs">
                                    {v.device_type}
                                  </span>
                                </div>
                              </td>
                              <td
                                className="px-4 py-3 max-w-[160px] truncate text-xs"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              >
                                {v.isp || "—"}
                              </td>
                              <td
                                className="px-4 py-3 text-xs font-mono"
                                style={{ color: "#8b5cf6" }}
                              >
                                {v.page || "/"}
                              </td>
                              <td
                                className="px-4 py-3 text-xs whitespace-nowrap"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              >
                                {timeAgo(v.visited_at)}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── DEVICES ── */}
            {tab === "devices" && (
              <motion.div
                key="devices"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(data.devices || []).map((d, i) => {
                    const DevIcon = DEVICE_ICON[d.device_type] || Monitor;
                    const totalDeviceVisits = data.devices.reduce(
                      (s, x) => s + parseInt(x.visits),
                      0,
                    );
                    const pct = Math.round(
                      (parseInt(d.visits) / totalDeviceVisits) * 100,
                    );
                    const colors = ["#a78bfa", "#60a5fa", "#34d399"];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border p-8 flex flex-col items-center text-center gap-4"
                        style={{
                          background: "#16162a",
                          borderColor: "rgba(255,255,255,0.08)",
                        }}
                      >
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `${colors[i % colors.length]}18`,
                          }}
                        >
                          <DevIcon
                            size={32}
                            style={{ color: colors[i % colors.length] }}
                          />
                        </div>
                        <div>
                          <div className="text-3xl font-black text-white">
                            {pct}%
                          </div>
                          <div
                            className="text-sm font-bold mt-1"
                            style={{ color: colors[i % colors.length] }}
                          >
                            {d.device_type}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                          >
                            {fmt(parseInt(d.visits))} visits
                          </div>
                        </div>
                        <div className="w-full">
                          <MiniBar
                            pct={pct}
                            color={colors[i % colors.length]}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 99px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
