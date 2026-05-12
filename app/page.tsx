"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

// ─── SkillRow ─────────────────────────────────────────────────────────────────

function SkillRow({ name, level, color, visible }: Skill & { visible: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{name}</span>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{ width: animated ? `${level}%` : "0%", background: color }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // ── all hooks declared at the top ──
  const skillsRef                       = useRef<HTMLDivElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [navVisible,    setNavVisible]    = useState(false);

  // callback passed to ScrollIntro so it can tell us when to show the nav
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

  return (
    <SmoothScroll>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ── NAV — hidden during intro, fades in during phase 3 ── */}
        <nav style={{
          position: "fixed", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(0,0,0,0.07)",
          borderRadius: "100px",
          padding: "8px 16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          // slides down from above when it appears
          top: navVisible ? 16 : -60,
        }}>
          <div style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 16, fontWeight: 700, color: "var(--ink)",
            paddingRight: 16,
            borderRight: "1.5px solid rgba(0,0,0,0.08)",
            marginRight: 8,
          }}>
            {personal.name.first.split(" ")[0]}
            <span style={{ color: "var(--mint-dk)" }}>.</span>
          </div>
          {["About", "Skills", "Work", "Projects", "Contact"].map((l) => (
            <button key={l} className="nav-link">{l}</button>
          ))}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginLeft: 8, paddingLeft: 16,
            borderLeft: "1.5px solid rgba(0,0,0,0.08)",
          }}>
            <div className="availability-dot" />
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
              {personal.availabilityLabel}
            </span>
          </div>
        </nav>

        {/* ── SCROLL INTRO ── */}
        <ScrollIntro
          firstName={personal.name.first.split(" ")[0]}
          onNavVisible={handleNavVisible}
        />

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          padding: "120px 64px 80px",
          position: "relative", overflow: "hidden",
        }}>
          {/* background blobs */}
          <div style={{
            position: "absolute", top: "-10%", right: "5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, #d4f5e9 0%, transparent 70%)",
            zIndex: 0,
          }} />
          <div style={{
            position: "absolute", bottom: "0%", left: "30%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, #fde8d8 0%, transparent 70%)",
            zIndex: 0,
          }} />
          <div style={{
            position: "absolute", top: "20%", left: "-5%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, #e8e0f8 0%, transparent 70%)",
            zIndex: 0,
          }} />

          <div style={{
            position: "relative", zIndex: 1,
            display: "flex", alignItems: "center",
            gap: 80, width: "100%", maxWidth: 1200, margin: "0 auto",
          }}>
            {/* LEFT */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 20 }}>
                <span className="tag">
                  <span>👋</span> {personal.role} · {personal.location}
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--font-playfair), serif",
                lineHeight: 1.05, marginBottom: 28,
              }}>
                <div className="hero-line" style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 900, color: "var(--ink)" }}>
                  <span>{personal.name.first}</span>
                </div>
                <div className="hero-line" style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 400, fontStyle: "italic", color: "var(--muted)" }}>
                  <span>{personal.name.last}</span>
                </div>
              </h1>

              <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 440, lineHeight: 1.75, marginBottom: 40 }}>
                {personal.heroDescription}
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>📄</span> Open CV
                </a>
                <a
                  href={`mailto:${contactInfo.links[0].value}`}
                  className="btn-primary"
                  style={{ background: "var(--mint)", color: "var(--mint-dk)" }}
                >
                  <span>✉️</span> Say hello
                </a>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div style={{ flexShrink: 0, position: "relative" }}>
              <div style={{
                position: "absolute", inset: -20,
                borderRadius: "50%",
                border: "2px dashed rgba(60,179,122,0.3)",
              }} />
              <div style={{
                width: 280, height: 340,
                borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                overflow: "hidden",
                boxShadow: "0 32px 72px rgba(0,0,0,0.15)",
                background: "linear-gradient(160deg, #d4f5e9, #daeeff)",
                position: "relative",
              }}>
                <img
                  src={personal.photo}
                  alt={`${personal.name.first} ${personal.name.last}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <div style={{ fontSize: 48 }}>🧑‍💻</div>
                </div>
              </div>

              {/* name badge */}
              <div style={{
                position: "absolute", bottom: -16, left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                padding: "10px 20px", borderRadius: "100px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mint-dk)" }} />
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                  {personal.name.first} {personal.name.last}
                </span>
              </div>

              {/* company badge */}
              <div style={{
                position: "absolute", top: -16, right: -24,
                background: "var(--lav)",
                padding: "8px 14px", borderRadius: "var(--radius-md)",
                boxShadow: "0 4px 16px rgba(124,92,191,0.15)",
                whiteSpace: "nowrap",
              }}>
                <div style={{ fontSize: 9, color: "var(--lav-dk)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>
                  Currently at
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
                  {personal.currentCompany}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
              <div>
                <p className="section-label" style={{ color: "var(--peach-dk)", marginBottom: 12 }}>About Me</p>
                <h2 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700,
                  lineHeight: 1.2, color: "var(--ink)", marginBottom: 20,
                }}>
                  Building things people <em>love</em> to use. 🛠️
                </h2>
                {personal.bio.map((para: string, i: number) => (
                  <p key={i} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 12 }}>
                    {para}
                  </p>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {aboutTiles.map((tile: Tile) => (
                  <div key={tile.label} style={{
                    background: "var(--card)",
                    padding: "24px 20px",
                    borderRadius: "var(--radius-md)",
                    border: "1.5px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }} className="wobble">

                    <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
                      {tile.label}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, lineHeight: 1.5 }}>
                      {tile.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── SKILLS ── */}
        <section style={{ padding: "80px 64px", background: "var(--ink)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div ref={skillsRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              <div className={`fade-up ${skillsVisible ? "visible" : ""}`}>
                <p className="section-label" style={{ color: "var(--mint-dk)", marginBottom: 12 }}>Skills</p>
                <h2 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700,
                  color: "#fff", marginBottom: 40, lineHeight: 1.3,
                }}>
                  The tools I reach for every day. ⚡
                </h2>
                {skills.map((s: Skill) => (
                  <SkillRow key={s.name} {...s} visible={skillsVisible} />
                ))}
              </div>

              <div className={`fade-up ${skillsVisible ? "visible" : ""}`} style={{ transitionDelay: "0.18s" }}>
                <p className="section-label" style={{ color: "var(--peach-dk)", marginBottom: 20 }}>Also familiar with</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {familiarWith.map((t: string) => (
                    <span key={t} style={{
                      padding: "7px 14px",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "100px",
                      fontSize: 12, fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p className="section-label" style={{ color: "var(--lav-dk)", marginBottom: 12 }}>Work History</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 40 }}>
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700,
                color: "var(--ink)", lineHeight: 1.3,
              }}>
                Where I've been, what I've built. 🚀
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {experiences.map((e: Experience, i: number) => (
                  <div key={i} style={{
                    background: "var(--card)",
                    borderRadius: "var(--radius-lg)",
                    padding: "28px",
                    border: "1.5px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 4,
                      background: "linear-gradient(90deg, var(--mint-dk), var(--lav-dk))",
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, color: "var(--mint-dk)",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        background: "var(--mint)", padding: "4px 10px", borderRadius: "100px",
                      }}>
                        {e.company}
                      </div>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>{e.period}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
                      {e.role}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── PROJECTS ── */}
        <section style={{ padding: "80px 64px", background: "#f0ede8" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                <div>
                  <p className="section-label" style={{ color: "var(--sky-dk)", marginBottom: 8 }}>Selected Projects</p>
                  <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)" }}>
                    Things I've shipped 📦
                  </h2>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 12, fontWeight: 600, color: "var(--ink)",
                  textDecoration: "none", background: "white",
                  padding: "8px 16px", borderRadius: "100px",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                }}>
                  View all on GitHub ↗
                </a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {projects.map((p: Project, i: number) => (
                  <div key={i} className="proj-card">
                    <div style={{
                      background: p.bg,
                      padding: "32px 28px 24px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>

                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {p.type}
                      </span>
                    </div>
                    <div style={{ padding: "24px 28px 28px" }}>
                      <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
                        {p.title}
                      </div>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                        {p.desc}
                      </p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.tags.map((t: string) => (
                          <span key={t} style={{
                            fontSize: 10, fontWeight: 600,
                            padding: "4px 10px", background: "#f0ede8",
                            borderRadius: "100px", color: "var(--muted)",
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
              <div>
                <p className="section-label" style={{ color: "var(--peach-dk)", marginBottom: 12 }}>Get In Touch</p>
                <h2 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700,
                  color: "var(--ink)", lineHeight: 1.2, marginBottom: 20,
                }}>
                  {contactInfo.heading} 🤝
                </h2>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 36 }}>
                  {contactInfo.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {contactInfo.links.map((link: ContactLink) => (
                    <div key={link.label} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "var(--card)", padding: "14px 18px",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid rgba(0,0,0,0.06)",
                    }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                          {link.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{link.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: "var(--card)",
                borderRadius: "var(--radius-xl)",
                padding: "40px",
                border: "1.5px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                display: "flex", flexDirection: "column", gap: 24,
              }}>
                {[
                  { label: "Your Name", placeholder: "Jane Smith",      type: "input" },
                  { label: "Email",     placeholder: "jane@company.com",  type: "input" },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                      {label}
                    </label>
                    <input className="contact-input" placeholder={placeholder} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    Message
                  </label>
                  <textarea className="contact-input" placeholder="Tell me about the role or project..." rows={4} style={{ resize: "none" }} />
                </div>
                <button className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  <span>🚀</span> Send Message
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1.5px solid rgba(0,0,0,0.07)",
          padding: "28px 64px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
            {personal.name.first.split(" ")[0]}<span style={{ color: "var(--mint-dk)" }}>.</span>
          </div>
          <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>
            © {footerYear} · Made with ☕ & Next.js
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {footerLinks.map((s: string) => (
              <span key={s} style={{
                fontSize: 11, fontWeight: 600, color: "var(--muted)",
                cursor: "pointer", padding: "6px 12px", borderRadius: "100px",
              }}>
                {s}
              </span>
            ))}
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}