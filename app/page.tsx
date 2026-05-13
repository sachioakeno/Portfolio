"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { ScrollIntro, SmoothScroll } from "@/components/ui/scroll-intro";
import {
  personal,
  aboutTiles,
  skills,
  familiarWith,
  experiences,
  projects,
  contactInfo,
  footerLinks,
  footerYear,
  type Skill,
  type Experience,
  type Project,
  type Tile,
  type ContactLink,
} from "@/lib/data";

// FUNGSI SkillRow SUDAH DIHAPUS KARENA KITA MEMAKAI DESAIN BARU

export default function Home() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const handleNavVisible = useCallback((v: boolean) => {
    setNavVisible(v);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.15 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ── NAV ── */}
        <motion.nav
          initial={{ opacity: 0, y: -50, width: "60%" }}
          animate={{
            opacity: navVisible ? 1 : 0,
            y: navVisible ? 0 : -50,
            width: navVisible ? "90%" : "60%",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", top: 20, left: "50%", x: "-50%", zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            maxWidth: 900, background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)", border: "1.5px solid rgba(0,0,0,0.07)",
            borderRadius: "100px", padding: "12px 24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)", pointerEvents: navVisible ? "auto" : "none",
          }}
        >
          <div style={{
            fontFamily: "var(--font-playfair), serif", fontSize: 16, fontWeight: 700, color: "var(--ink)",
            paddingRight: 16, borderRight: "1.5px solid rgba(0,0,0,0.08)", marginRight: 8,
          }}>
            {personal.name.first.split(" ")[0]}<span style={{ color: "var(--mint-dk)" }}>.</span>
          </div>
          {["About", "Skills", "Work", "Projects"].map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollToSection(l)}>
              {l}
            </button>
          ))}
          <div style={{
            display: "flex", alignItems: "center", gap: 6, marginLeft: 8, paddingLeft: 16, borderLeft: "1.5px solid rgba(0,0,0,0.08)",
          }}>
            <div className="availability-dot" />
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
              {personal.availabilityLabel}
            </span>
          </div>
        </motion.nav>

        {/* ── SCROLL INTRO ── */}
        <ScrollIntro
          firstName={personal.name.first.split(" ")[0]}
          onNavVisible={handleNavVisible}
        />

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          padding: "120px 64px 80px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #d4f5e9 0%, transparent 70%)", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #fde8d8 0%, transparent 70%)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "20%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #e8e0f8 0%, transparent 70%)", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 100, width: "100%", maxWidth: 1100, margin: "0 auto" }}>

            {/* LEFT — Photo with Motion Floating Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ flexShrink: 0, position: "relative" }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{ position: "relative" }}
              >
                <div style={{ position: "absolute", inset: -30, background: "radial-gradient(circle, rgba(60,179,122,0.15) 0%, transparent 70%)", filter: "blur(40px)", zIndex: -1 }} />

                <div style={{ width: 240, height: 300, borderRadius: "30px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)", background: "#fff", position: "relative" }}>
                  <img
                    src={personal.photo}
                    alt={personal.name.first}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                      maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                    }}
                  />
                </div>

                <div style={{ position: "absolute", top: -10, right: -20, background: "var(--lav)", padding: "8px 14px", borderRadius: "12px", boxShadow: "0 4px 16px rgba(124,92,191,0.15)", whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: 9, color: "var(--lav-dk)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>Currently at</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{personal.currentCompany}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Text Content with Flying Alphabets */}
            <div style={{ flex: 1 }}>
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                style={{ fontFamily: "var(--font-playfair), serif", lineHeight: 1.05, marginBottom: 28 }}
              >
                {/* First Name */}
                <div className="hero-line" style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900, color: "var(--ink)", overflow: "hidden" }}>
                  {personal.name.first.split("").map((char, index) => (
                    <motion.span
                      key={`first-${index}`}
                      variants={{
                        hidden: { y: "100%", opacity: 0, rotate: 10 },
                        visible: { y: "0%", opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
                      }}
                      style={{ display: "inline-block", whiteSpace: "pre" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <br />
                {/* Last Name */}
                <div className="hero-line" style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 400, fontStyle: "italic", color: "var(--muted)", overflow: "hidden" }}>
                  {personal.name.last.split("").map((char, index) => (
                    <motion.span
                      key={`last-${index}`}
                      variants={{
                        hidden: { y: "100%", opacity: 0, rotate: 10 },
                        visible: { y: "0%", opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
                      }}
                      style={{ display: "inline-block", whiteSpace: "pre" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ fontSize: 16, color: "var(--muted)", maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}
              >
                {personal.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                style={{ display: "flex", gap: 20, alignItems: "center" }}
              >
                <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Open CV
                </a>

                {/* SOCIAL ICONS */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 8 }}>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href={`mailto:${contactInfo?.links?.[0]?.value || ''}`} style={{ color: "var(--ink)", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" /></svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
              <div>
                <p className="section-label" style={{ color: "var(--peach-dk)", marginBottom: 12 }}>About Me</p>
                <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, lineHeight: 1.2, color: "var(--ink)", marginBottom: 20 }}>
                  Building things people love to use.
                </h2>
                {personal.bio.map((para: string, i: number) => (
                  <p key={i} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 12 }}>
                    {para}
                  </p>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {aboutTiles.map((tile: Tile) => (
                  <div key={tile.label} style={{ background: "var(--card)", padding: "24px 20px", borderRadius: "var(--radius-md)", border: "1.5px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }} className="wobble">
                    <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>{tile.label}</div>
                    <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, lineHeight: 1.5 }}>{tile.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── SKILLS ── */}
        {/* PERBAIKAN: Menambahkan ref={skillsRef} ke section ini */}
        <section id="skills" ref={skillsRef} style={{ padding: "100px 64px", background: "#B4D3D9", position: "relative" }}>

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px", zIndex: 0 }} />

          <style>{`
    .skill-box {
      transition: all 0.3s ease;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1); 
      position: relative;
    }
    
    .skill-box:hover {
      transform: translate(-4px, -4px);
      border: 1px solid rgba(0, 0, 0, 0.9);
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.9); 
    }
    
    .skill-icon {
      transition: color 0.3s ease;
      color: #666; 
    }
    .skill-box:hover .skill-icon {
      color: var(--hover-color); 
    }

    .familiar-tag {
      transition: all 0.3s ease;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      position: relative;
    }
    
    .familiar-tag:hover {
      background: #1a1a1a !important;
      color: #ffffff !important;
      border-color: #1a1a1a;
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15);
    }
  `}</style>

          <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

            <div className={`fade-up ${skillsVisible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 70 }}>
              <p style={{ color: "var(--ink)", marginBottom: 16, display: "inline-block", borderBottom: "1px solid var(--ink)", paddingBottom: "4px", fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Tech Arsenal
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.2 }}>
                The tools I reach for every day.
              </h2>
            </div>

            <div className={`fade-up ${skillsVisible ? "visible" : ""}`} style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginBottom: 90 }}>
              {skills.map((s: Skill) => (
                <div
                  key={s.name}
                  className="skill-box"
                  style={{
                    padding: "20px 40px",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    cursor: "default",
                    "--hover-color": s.color,
                  } as React.CSSProperties}
                >
                  <span className="skill-icon" style={{ fontSize: 28, display: "flex", alignItems: "center" }}>
                    {s.icon}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.03em" }}>{s.name}</span>
                </div>
              ))}
            </div>

            <div className={`fade-up ${skillsVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s", maxWidth: 850, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.15)" }} />
                <p style={{ color: "#1a1a1a", fontWeight: 600, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
                  Also familiar with
                </p>
                <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.15)" }} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
                {familiarWith.map((t: string) => (
                  <span
                    key={t}
                    className="familiar-tag"
                    style={{
                      padding: "12px 24px",
                      borderRadius: 0,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgba(0,0,0,0.8)",
                      letterSpacing: "0.05em",
                      cursor: "default"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── EXPERIENCE (Editorial Style) ── */}
        <section id="work" style={{ padding: "120px 64px", background: "#FDFBF7", color: "#1A1A1A" }}>
          
          <style>{`
            /* Layout Grid Responsif */
            .work-layout {
              display: grid;
              gap: 64px;
            }
            @media (min-width: 1024px) {
              .work-layout {
                grid-template-columns: 5fr 7fr;
                gap: 96px;
              }
            }
            
            /* Gaya Kartu Pengalaman */
            .experience-card {
              transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
              background: rgba(255, 255, 255, 0.4);
              backdrop-filter: blur(8px);
              border: 1px solid #E5E1DA;
              border-radius: 4px;
              position: relative;
              overflow: hidden;
            }
            
            .experience-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
              background: #ffffff;
              border-color: #d1cbc1;
            }
            
            /* Panah panah transisi saat di hover */
            .exp-arrow {
              opacity: 0;
              transform: translateX(-15px) translateY(-50%);
              transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
              position: absolute;
              top: 50%;
              right: 32px;
              color: #1A1A1A;
            }
            .experience-card:hover .exp-arrow {
              opacity: 1;
              transform: translateX(0) translateY(-50%);
            }

            /* Efek Grayscale untuk history pekerjaan yang sudah lewat (Selain urutan ke-0) */
            .exp-past {
              opacity: 0.6;
              filter: grayscale(100%);
            }
            .exp-past:hover {
              opacity: 1;
              filter: grayscale(0%);
            }
          `}</style>

          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div className="work-layout">
                
                {/* ── KOLOM KIRI: Header Section ── */}
                <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                  <div style={{ position: "sticky", top: "120px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: 24 }}>
                      Experience
                    </span>
                    <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.1, color: "#1A1A1A", marginBottom: 24 }}>
                      Where I've been,<br/>
                      <span style={{ fontStyle: "italic", fontWeight: 400 }}>what I've built.</span>
                    </h2>
                    <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, maxWidth: 400 }}>
                      A chronological journey through professional milestones, specialized roles, and technical achievements.
                    </p>
                  </div>
                </div>

                {/* ── KOLOM KANAN: Daftar Pekerjaan ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative" }}>
                  
                  {/* Garis Vertikal (Timeline Line) */}
                  <div style={{ position: "absolute", left: "-24px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #E5E1DA 10%, #E5E1DA 90%, transparent)", display: "none" }} className="lg-timeline" />

                  {experiences.map((e: Experience, i: number) => {
                    const isLatest = i === 0;
                    return (
                      <article 
                        key={i} 
                        className={`experience-card ${!isLatest ? "exp-past" : ""}`} 
                        style={{ padding: "36px 40px" }}
                      >
                        {/* Top Bar (Company & Period) */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 24 }}>
                          
                          {/* COMPANY NAME: Dibuat lebih mencolok dengan gaya "Editorial Label" */}
                          <div style={{ 
                            border: "1.5px solid #1A1A1A", 
                            padding: "6px 14px", 
                            display: "inline-block" 
                          }}>
                            <h3 style={{ 
                              fontSize: 11, 
                              fontWeight: 800, 
                              letterSpacing: "0.15em", 
                              textTransform: "uppercase", 
                              color: "#1A1A1A", /* Hitam solid, bukan abu-abu lagi */
                              margin: 0 
                            }}>
                              {e.company}
                            </h3>
                          </div>

                          <time style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", fontStyle: "italic", margin: 0 }}>
                            {e.period}
                          </time>
                        </div>
                        
                        {/* Role */}
                        <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, color: "#1A1A1A", marginBottom: 24 }}>
                          {e.role}
                        </h4>
                        
                        {/* Description */}
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, paddingRight: "24px" }}>
                          {e.desc.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
                              <span style={{ marginTop: 10, marginRight: 14, width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E5E1DA", flexShrink: 0 }} />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>

                        {/* SVG Hover Arrow */}
                        <div className="exp-arrow">
                          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </article>
                    );
                  })}
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECTS (CLEAN UI) ── */}
        <section id="projects" style={{ padding: "100px 64px", background: "#f6f5f3" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <h2 style={{ textAlign: "center", fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 500, color: "var(--ink)", marginBottom: 64 }}>
                Projects
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: 40 }}>
                {projects.map((p: Project, i: number) => (
                  <div key={i} style={{ background: "#ffffff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "100%", height: 340, backgroundColor: p.bg || "#f0f0f0", borderRadius: 16, marginBottom: 24, overflow: "hidden", position: "relative" }}>
                      <img src={p.image || "https://placehold.co/800x600/e2e8f0/878c96?text=Project+Preview"} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <div style={{ padding: "0 8px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontSize: 28, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>{p.title}</h3>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{p.type || "Web Development"}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>{p.date || "August 2022"}</div>
                      <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, marginBottom: 32, flex: 1 }}>{p.desc}</p>
                      <button style={{ background: "#111", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", alignSelf: "flex-start", transition: "background 0.2s ease" }} onMouseOver={(e) => (e.currentTarget.style.background = "#333")} onMouseOut={(e) => (e.currentTarget.style.background = "#111")}>
                        View detail works
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1.5px solid rgba(0,0,0,0.07)", padding: "28px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
            {personal.name.first.split(" ")[0]}<span style={{ color: "var(--mint-dk)" }}>.</span>
          </div>
          <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>
            © {footerYear} · Made with Next.js
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {footerLinks.map((s: string) => (
              <span key={s} style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", cursor: "pointer", padding: "6px 12px", borderRadius: "100px" }}>{s}</span>
            ))}
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}