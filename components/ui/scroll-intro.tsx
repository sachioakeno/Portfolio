"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef, useEffect } from "react";

// ─── Data animasi kode terbang (Masif & Edge-to-Edge) ─────────────
const CODE_SNIPPETS = [
  { text: "const app = express();", x: -1800, y: -600, rot: -45 },
  { text: "npm run build", x: -2000, y: 300, rot: 25 },
  { text: "git checkout -b feature", x: -1600, y: 900, rot: -15 },
  { text: "<div className='flex'>", x: -1900, y: -200, rot: 35 },
  { text: "console.log(data);", x: -1700, y: 700, rot: -50 },
  { text: "useEffect(() => {}, [])", x: -1500, y: -1000, rot: 10 },
  { text: "SELECT * FROM users", x: -2200, y: 100, rot: -20 },
  { text: "border-radius: 8px;", x: -1400, y: 1200, rot: 40 },
  { text: "await fetch('/api')", x: -2100, y: -800, rot: -60 },
  { text: "return null;", x: -1850, y: -1200, rot: 15 },
  { text: "<div>", x: -800, y: -400, rot: -45 },
  { text: "useTransform()", x: -700, y: 300, rot: -20 },
  { text: "npm run dev", x: -900, y: -600, rot: 10 },
  { text: "</>", x: -1100, y: 150, rot: -60 },
  { text: "try {", x: -1250, y: -750, rot: -40 },
  { text: "await", x: -1500, y: 300, rot: -15 },
  { text: "throw new Error", x: -1100, y: -800, rot: 20 },
  { text: "padding-top", x: -1600, y: -200, rot: 35 },
  
  // ── Kanan Jauh & Atas Kanan ──
  { text: "export default function", x: 1800, y: -500, rot: 30 },
  { text: "interface UserProps", x: 2000, y: 400, rot: -25 },
  { text: "php artisan migrate", x: 1700, y: 800, rot: 15 },
  { text: "Route::get('/home')", x: 2100, y: -200, rot: -35 },
  { text: "public IActionResult", x: 1600, y: -1000, rot: 45 },
  { text: "[ApiController]", x: 1900, y: 600, rot: -10 },
  { text: "box-shadow: 0 4px;", x: 2200, y: 100, rot: 20 },
  { text: "display: grid;", x: 1500, y: 1200, rot: -40 },
  { text: "composer install", x: 2300, y: -700, rot: 60 },
  { text: "npm install", x: 1850, y: -1200, rot: -15 },
  { text: "=>", x: 800, y: -300, rot: 30 },
  { text: "SELECT * FROM", x: 750, y: 350, rot: 15 },
  { text: "export const", x: 1100, y: 550, rot: -10 },
  { text: "{...props}", x: 600, y: -450, rot: 90 },
  { text: "<motion.div>", x: 950, y: 250, rot: 35 },
  { text: "async () =>", x: 1200, y: -600, rot: -15 },
  { text: "git commit -m", x: 1000, y: -400, rot: 50 },
  { text: "type", x: 1300, y: -850, rot: 55 },

  // ── Atas Jauh (Menutupi langit-langit) ──
  { text: "margin: 0 auto;", x: 300, y: -1600, rot: 5 },
  { text: "const [state, setState]", x: -400, y: -1800, rot: -15 },
  { text: "Object.keys(obj)", x: 800, y: -1500, rot: 25 },
  { text: "Array.isArray()", x: -800, y: -1700, rot: -20 },
  { text: "JSON.stringify()", x: -100, y: -1900, rot: 10 },
  { text: "catch (error) {", x: 1200, y: -1400, rot: -30 },
  { text: "throw new Error()", x: -1200, y: -1600, rot: 35 },
  { text: "localhost", x: 100, y: -900, rot: 5 },
  { text: "UPDATE", x: -350, y: -1100, rot: -30 },
  { text: "DELETE", x: 400, y: -950, rot: 10 },
  { text: "INSERT INTO", x: -200, y: -1200, rot: -5 },
  { text: "GROUP BY", x: 300, y: -1300, rot: -20 },
  { text: "LIMIT 10", x: -450, y: -950, rot: -45 },
  { text: "var_dump()", x: 150, y: -1150, rot: 35 },
  { text: "dd()", x: 350, y: -1000, rot: -10 },
  
  // ── Bawah Jauh (Menutupi dasar layar) ──
  { text: "z-index: 100;", x: 200, y: 1600, rot: -5 },
  { text: "opacity: 20;", x: -300, y: 1800, rot: 15 },
  { text: "transform: scale(1.1)", x: 700, y: 1500, rot: -25 },
  { text: "transition: all", x: -700, y: 1700, rot: 20 },
  { text: "width: 100vw;", x: 100, y: 1900, rot: -10 },
  { text: "height: 100vh;", x: 1100, y: 1400, rot: 30 },
  { text: "cursor: pointer;", x: -1100, y: 1600, rot: -35 },
  { text: "gap: 16px", x: 100, y: 900, rot: -10 },
  { text: "padding", x: -150, y: 1000, rot: 15 },
  { text: "font-weight", x: -350, y: 1100, rot: 30 },
  { text: "line-height", x: 400, y: 950, rot: -5 },
  { text: "text-align", x: -200, y: 1200, rot: 20 },
  { text: "color:", x: 50, y: 1050, rot: -40 },
  { text: "overflow", x: -100, y: 800, rot: -15 },
  { text: "scale(1)", x: -50, y: 1250, rot: 25 },
  { text: "rotate", x: 450, y: 1100, rot: -50 },
  { text: "border:", x: -150, y: 1350, rot: 15 },
  { text: "hover:", x: 200, y: 1400, rot: -30 },
];

function FlyingCode({
  text, initX, initY, initRot, scrollYProgress
}: {
  text: string; initX: number; initY: number; initRot: number; scrollYProgress: any;
}) {
  const x = useTransform(scrollYProgress, [0.05, 0.50], [initX, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.50], [initY, 0]);
  const rotate = useTransform(scrollYProgress, [0.05, 0.50], [initRot, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.50], [1.5, 0]);
  const opacity = useTransform(scrollYProgress, [0.02, 0.25, 0.55], [0, 0.35, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x, y, rotate, scale, opacity,
        fontFamily: "var(--font-mono), monospace",
        fontSize: "1.3rem",
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

  const hintOpacity  = useTransform(scrollYProgress, [0, 0.14, 0.25], [1, 1, 0]);
  const hintY        = useTransform(scrollYProgress, [0.14, 0.28], [0, -20]);
  const arrowY       = useTransform(scrollYProgress, [0, 0.14], [0, 6]);
  const introOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  return (
    <div ref={sectionRef} style={{ height: "175vh", position: "relative" }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent", 
          overflow: "hidden",
          opacity: introOpacity,
        }}
      >
        <div style={{ position: "absolute", top: "-15%", right: "3%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, #d4f5e9 0%, transparent 68%)", pointerEvents: "none", zIndex: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, #fde8d8 0%, transparent 68%)", pointerEvents: "none", zIndex: 0, opacity: 0.5 }} />

        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          {CODE_SNIPPETS.map((snippet, i) => (
            <FlyingCode key={i} text={snippet.text} initX={snippet.x} initY={snippet.y} initRot={snippet.rot} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* PERBAIKAN: Kontainer inset 0 & flex center untuk memposisikan teks TEPAT di tengah layar */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0, 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: hintOpacity,
            y: hintY,
            zIndex: 2,
          }}
        >
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 18,
            fontWeight: 900,
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