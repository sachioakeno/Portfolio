// ─── PERSONAL INFO ───────────────────────────────────────────
export const personal = {
  name: {
    first: "Sachio Akeno",
    last:  "Chan",          
  },
  role:              "Full-Stack Developer",
  location:          "Jakarta, Indonesia",
  available:         true,
  availabilityLabel: "Open to work",
  heroDescription:
    "Developing and maintaining data-driven web applications to support operational workflows. I build efficient end-to-end solutions using React, C#, and Laravel, focusing on seamless API integration and system reliability.",
  bio: [
    "I am a full-stack developer based in Jakarta, focused on building efficient internal systems, automating ETL pipelines, and centralizing complex external datasets into interactive dashboards.",
    "With hands-on experience in React, C# (.NET), Laravel, and MySQL Workbench, I handle the entire development lifecycle—from data acquisition, cleaning, and database design to testing, debugging, and live server deployment via cPanel."
  ],
  photo:          "/public/foto.jpg",
  cv:             "/cv.pdf",
  currentCompany: "Kemenlu BSKLN",
};

// ─── ABOUT TILES ─────────────────────────────────────────────
export interface Tile {
  label: string;
  value: string;
  emoji: string;
}

export const aboutTiles: Tile[] = [
  { label: "Education",    value: "Computer Science, Binus University", emoji: "🎓" },
  { label: "Languages",    value: "Indonesian · English",               emoji: "🌏" },
  { label: "Availability", value: "Internship or Contract",             emoji: "✅" },
  { label: "Location",     value: "Jakarta — open to remote",           emoji: "📍" },
];

// ─── SKILLS ──────────────────────────────────────────────────
export interface Skill {
  name:  string;
  level: number; // 0–100
  color: string; // pastel fill color
}

export const skills: Skill[] = [
  { name: "React / Next.js", level: 92, color: "#3cb37a" },
  { name: "TypeScript",      level: 85, color: "#3a8fd1" },
  { name: "Node.js & APIs",  level: 80, color: "#7c5cbf" },
  { name: "UI/UX Design",    level: 75, color: "#e07a45" },
  { name: "PostgreSQL",      level: 70, color: "#d97706" },
];

export const familiarWith: string[] = [
  "Docker", "AWS", "GraphQL", "Prisma", "Redis",
  "Figma", "Jest", "Playwright", "Git", "CI/CD",
  "Tailwind", "Framer Motion",
];

// ─── EXPERIENCE ──────────────────────────────────────────────
export interface Experience {
  role:    string;
  company: string;
  period:  string;
  desc:    string;
}

export const experiences: Experience[] = [
  {
    role:    "FullStack Developer",
    company: "Kementrian Luar Negeri - BSKLN",
    period:  "Feb 2026 – Present",
    desc:    "Led the redesign of the core product dashboard, reducing load time by 40%. Mentored 3 junior developers and established the component library used across 5 products.",
  },

  // ── ADD NEW EXPERIENCE BELOW ──
  // {
  //   role:    "Your Role",
  //   company: "Company Name",
  //   period:  "Jan 2025 – Jan 2026",
  //   desc:    "What you did and the impact it had.",
  // },
];

// ─── PROJECTS ────────────────────────────────────────────────
export interface Project {
  title: string;
  type:  string;
  desc:  string;
  tags:  string[];
  bg:    string; // pastel card background
  emoji: string; // fun icon for the card
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Taskflow",
    type:  "SaaS Product",
    desc:  "A project management tool for remote teams. Built with Next.js, Prisma, and Stripe.",
    tags:  ["Next.js", "PostgreSQL", "Stripe"],
    bg:    "#d4f5e9",
    emoji: "📋",
    link:  "",
  },
  {
    title: "Moodboard AI",
    type:  "AI Tool",
    desc:  "Generates design moodboards using OpenAI Vision. Won 2nd place in a 72-hour hackathon.",
    tags:  ["React", "OpenAI", "Tailwind"],
    bg:    "#fde8d8",
    emoji: "🎨",
    link:  "",
  },
  {
    title: "DevMetrics",
    type:  "Dashboard",
    desc:  "Internal analytics dashboard tracking engineering team velocity and sprint health.",
    tags:  ["TypeScript", "D3.js", "REST API"],
    bg:    "#e8e0f8",
    emoji: "📊",
    link:  "",
  },

  // ── ADD NEW PROJECT BELOW ──
  // {
  //   title: "Project Name",
  //   type:  "Web App",
  //   desc:  "Short description.",
  //   tags:  ["Tech1", "Tech2"],
  //   bg:    "#daeeff",
  //   emoji: "🚀",
  //   link:  "",
  // },
];

// ─── CONTACT ─────────────────────────────────────────────────
export interface ContactLink {
  label: string;
  value: string;
  emoji: string;
}

export const contactInfo = {
  heading:     "Let's build something great together.",
  description: "I'm currently open to internship and contract opportunities. Whether you're a startup or an established company, I'd love to hear about what you're building.",
  links: [
    { label: "Email",    value: "sachio.chan@binus.ac.id",     emoji: "✉️"  },
    { label: "LinkedIn", value: "linkedin.com/in/alexpratama", emoji: "💼"  },
    { label: "GitHub",   value: "github.com/alexpratama",      emoji: "🐙"  },
  ] as ContactLink[],
};

// ─── FOOTER ──────────────────────────────────────────────────
export const footerLinks: string[] = ["GitHub", "LinkedIn", "Twitter"];
export const footerYear = "2026";