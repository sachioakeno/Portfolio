"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef, useEffect } from "react";

// ─── Data untuk animasi kode terbang (Sekarang jauh lebih banyak) ─────────────
const CODE_SNIPPETS = [
  // ── Kiri & Kiri Atas ──
  { text: "<div>", x: -800, y: -400, rot: -45 },
  { text: "useTransform()", x: -700, y: 300, rot: -20 },
  { text: "npm run dev", x: -900, y: -600, rot: 10 },
  { text: "</>", x: -1100, y: 150, rot: -60 },
  { text: "return", x: -500, y: -350, rot: -30 },
  { text: "console.log()", x: -850, y: -100, rot: -15 },
  { text: "const app =", x: -650, y: 500, rot: -40 },
  { text: "import React", x: -1000, y: -200, rot: 25 },
  { text: "useState(0)", x: -750, y: -700, rot: 10 },
  { text: "git push", x: -1200, y: 450, rot: -50 },
  { text: "public class", x: -950, y: 350, rot: 5 },
  { text: "SELECT *", x: -600, y: -500, rot: 40 },
  { text: "function()", x: -800, y: -800, rot: -10 },
  { text: "=>", x: -1300, y: -300, rot: 80 },
  { text: "useEffect()", x: -1000, y: 600, rot: -25 },
  { text: "npm install", x: -1400, y: -100, rot: 15 },
  { text: "flex-col", x: -900, y: 800, rot: -35 },
  { text: "justify-center", x: -750, y: -900, rot: 45 },
  { text: "z-index: 10", x: -1150, y: -500, rot: -15 },
  { text: "border-radius", x: -600, y: 750, rot: 20 },
  { text: "opacity: 0", x: -1300, y: 200, rot: -55 },
  { text: "transition", x: -850, y: -950, rot: 30 },
  { text: "git checkout -b", x: -1050, y: -450, rot: -5 },
  { text: "margin: 0 auto", x: -700, y: 900, rot: 10 },
  { text: "try {", x: -1250, y: -750, rot: -40 },
  
  // ── Kanan & Kanan Atas ──
  { text: "=>", x: 800, y: -300, rot: 30 },
  { text: "SELECT * FROM", x: 750, y: 350, rot: 15 },
  { text: "export const", x: 1100, y: 550, rot: -10 },
  { text: "await fetch()", x: 900, y: -100, rot: 45 },
  { text: "{...props}", x: 600, y: -450, rot: 90 },
  { text: "useRef(null)", x: 850, y: -550, rot: -25 },
  { text: "<motion.div>", x: 950, y: 250, rot: 35 },
  { text: "async () =>", x: 1200, y: -600, rot: -15 },
  { text: "git commit -m", x: 1000, y: -400, rot: 50 },
  { text: "JOIN users", x: 700, y: -800, rot: -45 },
  { text: "namespace", x: 1300, y: -200, rot: 20 },
  { text: "php artisan", x: 850, y: 650, rot: -30 },
  { text: "<?php", x: 1100, y: 50, rot: 10 },
  { text: "[]", x: 900, y: -650, rot: -80 },
  { text: "public IActionResult", x: 1400, y: 300, rot: 15 },
  { text: "[HttpGet]", x: 1250, y: -500, rot: -35 },
  { text: "Route::get()", x: 1050, y: 700, rot: 25 },
  { text: "composer require", x: 800, y: -900, rot: -10 },
  { text: "display: flex", x: 1150, y: -800, rot: 40 },
  { text: "align-items: center", x: 1350, y: -100, rot: -20 },
  { text: "box-shadow", x: 950, y: 850, rot: 5 },
  { text: "position: absolute", x: 1200, y: 500, rot: -45 },
  { text: "cursor: pointer", x: 1000, y: -950, rot: 15 },
  { text: "git pull origin", x: 1450, y: 150, rot: -60 },
  { text: "} catch (e)", x: 850, y: -750, rot: 35 },

  // ── Atas Tengah (Melayang turun) ──
  { text: "localhost:3000", x: 100, y: -900, rot: 5 },
  { text: "npm run build", x: -150, y: -1000, rot: -15 },
  { text: "FROM table", x: 250, y: -850, rot: 25 },
  { text: "UPDATE users", x: -350, y: -1100, rot: -30 },
  { text: "DELETE FROM", x: 400, y: -950, rot: 10 },
  { text: "INSERT INTO", x: -200, y: -1200, rot: -5 },
  { text: "WHERE id =", x: 50, y: -1050, rot: 40 },
  { text: "GROUP BY", x: 300, y: -1300, rot: -20 },
  { text: "ORDER BY", x: -100, y: -800, rot: 15 },
  { text: "LIMIT 10", x: -450, y: -950, rot: -45 },
  { text: "var_dump()", x: 150, y: -1150, rot: 35 },
  { text: "dd($data)", x: 350, y: -1000, rot: -10 },
  { text: "echo", x: -250, y: -850, rot: 20 },
  { text: "$request->all()", x: -50, y: -1250, rot: -25 },
  { text: "interface", x: 450, y: -1100, rot: 5 },
  { text: "type", x: -150, y: -1350, rot: -15 },
  { text: "export default", x: 200, y: -1400, rot: 30 },
  { text: "module.exports", x: -300, y: -1050, rot: -40 },
  { text: "require()", x: 100, y: -950, rot: 10 },
  { text: "Object.keys()", x: 500, y: -1200, rot: -50 },
  { text: "Array.map()", x: -400, y: -1300, rot: 45 },
  { text: "Array.filter()", x: 300, y: -850, rot: -35 },
  { text: "JSON.stringify()", x: -200, y: -1150, rot: 15 },
  { text: "JSON.parse()", x: 400, y: -1450, rot: -25 },
  { text: "localStorage", x: -500, y: -800, rot: 55 },

  // ── Bawah Tengah (Melayang naik) ──
  { text: "gap: 16px", x: 100, y: 900, rot: -10 },
  { text: "padding: 20px", x: -150, y: 1000, rot: 15 },
  { text: "margin-bottom", x: 250, y: 850, rot: -25 },
  { text: "font-weight: 700", x: -350, y: 1100, rot: 30 },
  { text: "line-height", x: 400, y: 950, rot: -5 },
  { text: "text-align", x: -200, y: 1200, rot: 20 },
  { text: "color: var(--ink)", x: 50, y: 1050, rot: -40 },
  { text: "background-color", x: 300, y: 1300, rot: 10 },
  { text: "overflow: hidden", x: -100, y: 800, rot: -15 },
  { text: "max-width", x: -450, y: 950, rot: 45 },
  { text: "width: 100%", x: 150, y: 1150, rot: -35 },
  { text: "height: 100vh", x: 350, y: 1000, rot: 5 },
  { text: "transform", x: -250, y: 850, rot: -20 },
  { text: "scale(1.05)", x: -50, y: 1250, rot: 25 },
  { text: "rotate(45deg)", x: 450, y: 1100, rot: -50 },
  { text: "border: 1px solid", x: -150, y: 1350, rot: 15 },
  { text: "hover:", x: 200, y: 1400, rot: -30 },
  { text: "focus:", x: -300, y: 1050, rot: 40 },
  { text: "active:", x: 100, y: 950, rot: -10 },
  { text: "sm:", x: 500, y: 1200, rot: 50 },
  { text: "md:", x: -400, y: 1300, rot: -45 },
  { text: "lg:", x: 300, y: 850, rot: 35 },
  { text: "xl:", x: -200, y: 1150, rot: -15 },
  { text: "2xl:", x: 400, y: 1450, rot: 25 },
  { text: "!important", x: -500, y: 800, rot: -55 },
];

function FlyingCode({
  text, initX, initY, initRot, scrollYProgress
}: {
  text: string; initX: number; initY: number; initRot: number; scrollYProgress: any;
}) {
  // PERBAIKAN TIMING: Dimulai jauh lebih awal (0.05) dan menyatu lebih cepat (0.50)
  const x = useTransform(scrollYProgress, [0.05, 0.50], [initX, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.50], [initY, 0]);
  const rotate = useTransform(scrollYProgress, [0.05, 0.50], [initRot, 0]);
  
  // Mengecil perlahan saat menyatu
  const scale = useTransform(scrollYProgress, [0.05, 0.50], [1.3, 0]);
  
  // PERBAIKAN OPACITY: Langsung muncul (mulai 0.02), memuncak di 0.20, lalu memudar
  const opacity = useTransform(scrollYProgress, [0.02, 0.20, 0.45], [0, 0.5, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x, y, rotate, scale, opacity,
        fontFamily: "var(--font-mono), monospace",
        fontSize: "1.2rem",
        color: "#7c5cbf", 
        fontWeight: 700,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        transformOrigin: "center",
      }}
    >
      {text}
    </motion.div>
  );
}

// ─── One animated character of the name ──────────────────────────────────────

function NameChar({
  char, index, centerIndex, scrollYProgress,
}: {
  char: string; index: number; centerIndex: number; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const isSpace = char === " ";
  const distance = index - centerIndex;

  const x       = useTransform(scrollYProgress, [0.28, 0.62], [distance * 70, 0]);
  const rotateX = useTransform(scrollYProgress, [0.28, 0.62], [distance * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);

  return (
    <motion.span
      style={{ x, rotateX, opacity, display: "inline-block" }}
      className={isSpace ? "w-3 sm:w-5" : ""}
    >
      {char}
    </motion.span>
  );
}

// ─── Main scroll intro ────────────────────────────────────────────────────────

interface ScrollIntroProps {
  firstName: string;
  onNavVisible: (v: boolean) => void;
}

export function ScrollIntro({ firstName, onNavVisible }: ScrollIntroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      onNavVisible(v > 0.65);
    });
    return unsub;
  }, [scrollYProgress, onNavVisible]);

  const fullName = `${firstName} Akeno Chan`.split("");
  const nameCenter = Math.floor(fullName.length / 2);

  const hintOpacity  = useTransform(scrollYProgress, [0, 0.14, 0.25], [1, 1, 0]);
  const hintY        = useTransform(scrollYProgress, [0.14, 0.28], [0, -20]);
  const arrowY       = useTransform(scrollYProgress, [0, 0.14], [0, 6]);

  const roleOpacity  = useTransform(scrollYProgress, [0.56, 0.70], [0, 1]);
  const roleY        = useTransform(scrollYProgress, [0.56, 0.70], [16, 0]);

  const introOpacity = useTransform(scrollYProgress, [0.84, 1.0], [1, 0]);
  const introY       = useTransform(scrollYProgress, [0.84, 1.0], [0, -32]);

  return (
    <div ref={sectionRef} style={{ height: "320vh", position: "relative" }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f7f4",
          overflow: "hidden",
          opacity: introOpacity,
          y: introY,
        }}
      >
        {/* ── background blobs ── */}
        <div style={{
          position: "absolute", top: "-15%", right: "3%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, #d4f5e9 0%, transparent 68%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "8%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, #fde8d8 0%, transparent 68%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", top: "25%", left: "-8%",
          width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, #e8e0f8 0%, transparent 68%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Flying Code Snippets ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          {CODE_SNIPPETS.map((snippet, i) => (
            <FlyingCode
              key={i}
              text={snippet.text}
              initX={snippet.x}
              initY={snippet.y}
              initRot={snippet.rot}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* ── PHASE 1 — hint ── */}
        <motion.div
          style={{
            position: "absolute",
            opacity: hintOpacity,
            y: hintY,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 2,
          }}
        >
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#9ca3af",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            scroll to get to know sachio
          </p>
          <motion.div style={{ y: arrowY, color: "#9ca3af" }} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── PHASE 2 — name gathers + role appears ── */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(44px, 9vw, 108px)",
              fontWeight: 900,
              color: "#1a1a2e",
              lineHeight: 1.0,
              marginBottom: 28,
              perspective: "700px",
            }}
          >
            {fullName.map((char, i) => (
              <NameChar
                key={i}
                char={char}
                index={i}
                centerIndex={nameCenter}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <motion.div
            style={{ opacity: roleOpacity, y: roleY }}
            className="flex items-center justify-center gap-3"
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 20px",
              background: "#d4f5e9",
              borderRadius: "100px",
              fontSize: 12,
              fontWeight: 700,
              color: "#3cb37a",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              <span>👋</span> Full-Stack Developer · Jakarta, ID
            </span>
          </motion.div>
        </div>

        {/* ── scroll progress line at bottom ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: "rgba(0,0,0,0.04)",
          zIndex: 2,
        }}>
          <motion.div style={{
            height: "100%",
            background: "linear-gradient(90deg, #3cb37a, #7c5cbf)",
            transformOrigin: "left",
            scaleX: scrollYProgress,
          }} />
        </div>
      </motion.div>
    </div>
  );
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}