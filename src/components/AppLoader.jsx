"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AppLoader({ onDone }) {
  const [phase, setPhase] = useState("in"); // "in" | "hold" | "out"

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 1800);
    const t3 = setTimeout(() => onDone?.(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "out") setPhase("done");
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg,#0f0f17 0%,#1a0a2e 50%,#0f0f17 100%)",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse,rgba(124,58,237,0.18) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: "relative", marginBottom: 24 }}
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: "1.5px solid transparent",
                borderTopColor: "rgba(124,58,237,0.7)",
                borderRightColor: "rgba(99,102,241,0.3)",
              }}
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                border: "1px solid transparent",
                borderBottomColor: "rgba(167,139,250,0.5)",
                borderLeftColor: "rgba(99,102,241,0.2)",
              }}
            />
            {/* Logo box */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5,#6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: 26,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-1px",
              }}
            >
              ID
            </div>
          </motion.div>

          {/* App name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              }}
            >
              BGMI{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#a78bfa,#818cf8,#60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Name Stylist
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                fontFamily: "Inter, sans-serif",
                marginTop: 4,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Fancy ID Generator
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ position: "absolute", bottom: 48, width: 120 }}
          >
            <div
              style={{
                height: 2,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                  borderRadius: 99,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
