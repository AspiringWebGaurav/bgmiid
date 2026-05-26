"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  dark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bgmi-theme");
    if (saved !== null) setDark(saved === "dark");
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("bgmi-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Returns a full palette based on dark/light
export function usePalette() {
  const { dark } = useTheme();
  return dark ? DARK : LIGHT;
}

const DARK = {
  bg: "#0f0f17",
  bgNav: "rgba(15,15,23,0.85)",
  bgCard: "#16162a",
  bgCardHover: "#1c1c32",
  bgFooter: "#0d0d16",
  bgInput: "#16162a",
  bgSidebar: "#16162a",
  bgTag: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(124,58,237,0.5)",
  borderInput: "rgba(124,58,237,0.4)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.38)",
  textSub: "rgba(255,255,255,0.58)",
  tagText: "rgba(255,255,255,0.28)",
  tagBorder: "rgba(255,255,255,0.08)",
  divider: "rgba(255,255,255,0.06)",
  inputPlaceholder: "rgba(255,255,255,0.2)",
  inputText: "#ffffff",
  ruleRowBg: "rgba(255,255,255,0.02)",
  ruleRowHover: "rgba(255,255,255,0.04)",
  proTipBg: "rgba(255,255,255,0.03)",
  emptyBorder: "rgba(255,255,255,0.08)",
  emptyBg: "rgba(255,255,255,0.02)",
  emptyIcon: "rgba(255,255,255,0.12)",
  symbolBtn: "rgba(255,255,255,0.04)",
  symbolHoverBg: "rgba(124,58,237,0.12)",
  sidebarBtn: "rgba(255,255,255,0.07)",
  sidebarBtnHover: "rgba(255,255,255,0.04)",
  isDark: true,
};

const LIGHT = {
  bg: "#f5f4ff",
  bgNav: "rgba(245,244,255,0.9)",
  bgCard: "#ffffff",
  bgCardHover: "#faf9ff",
  bgFooter: "#ece9ff",
  bgInput: "#ffffff",
  bgSidebar: "#ffffff",
  bgTag: "rgba(124,58,237,0.06)",
  border: "rgba(124,58,237,0.12)",
  borderHover: "rgba(124,58,237,0.5)",
  borderInput: "rgba(124,58,237,0.35)",
  text: "#1a103e",
  textMuted: "#6b7280",
  textSub: "#374151",
  tagText: "#9ca3af",
  tagBorder: "rgba(124,58,237,0.15)",
  divider: "rgba(124,58,237,0.08)",
  inputPlaceholder: "#9ca3af",
  inputText: "#1a103e",
  ruleRowBg: "rgba(124,58,237,0.02)",
  ruleRowHover: "rgba(124,58,237,0.05)",
  proTipBg: "rgba(124,58,237,0.03)",
  emptyBorder: "rgba(124,58,237,0.12)",
  emptyBg: "rgba(124,58,237,0.02)",
  emptyIcon: "rgba(124,58,237,0.2)",
  symbolBtn: "rgba(124,58,237,0.04)",
  symbolHoverBg: "rgba(124,58,237,0.1)",
  sidebarBtn: "rgba(124,58,237,0.07)",
  sidebarBtnHover: "rgba(124,58,237,0.04)",
  isDark: false,
};
