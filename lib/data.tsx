import { FaReact, FaPython, FaLaravel, FaFigma, FaFileExcel} from "react-icons/fa";
import { SiJavascript, SiPostgresql, SiMysql, SiGithub } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { JSX } from "react";

// ─── PERSONAL INFO ───────────────────────────────────────────
export const personal = {
  name: {
    // greet : "H",
    first: "Sachio Akeno",
    last: "Chan",
  },
  role: "Full-Stack Developer",
  location: "Jabodetabek,",
  available: true,
  availabilityLabel: "Open to work",
  heroDescription:
    "I am passionate about exploring new technologies to build scalable, efficient IT environments. I focus on optimizing workflows, leveraging modern tools to drive digital transformation, and solving real-world business challenges.",
  bio: [
    "I am a full-stack developer passionate about exploring new technologies to build scalable, efficient IT environments. I focus on solving real-world business challenges by optimizing workflows and leveraging modern tools to drive digital transformation.",
    "Specifically, I specialize in building efficient internal systems, automating ETL pipelines, and centralizing complex external datasets into interactive dashboards. With hands-on experience in React, Python, Laravel, PostgreSQL, and MySQL, I handle the entire development lifecycle—from data acquisition, cleaning, and database design to comprehensive testing and debugging."
  ],
  photo: "/foto.jpg",
  cv: "/1105.pdf",
  currentCompany: "Kemenlu BSKLN",
};

// ─── ABOUT TILES ─────────────────────────────────────────────
export interface Tile {
  label: string;
  value: string;
}

export const aboutTiles: Tile[] = [
  { label: "Education", value: "Computer Science, Binus University" },
  { label: "Languages", value: "Indonesian · English" },
  { label: "Availability", value: "Internship or Contract" },
  { label: "Location", value: "Jabodetabek — Onsite Hybrid Remote" },
];

// ─── SKILLS ──────────────────────────────────────────────────
export interface Skill {
  name: string;
  color: string;
  icon: JSX.Element;
}

export const skills: Skill[] = [
  { name: "React", color: "#61DAFB", icon: <FaReact /> },
  { name: "JavaScript", color: "#F7DF1E", icon: <SiJavascript /> },
  { name: "Python", color: "#3776AB", icon: <FaPython /> },
  { name: "Laravel", color: "#FF2D20", icon: <FaLaravel /> },
  { name: "PostgreSQL", color: "#4169E1", icon: <SiPostgresql /> },
  { name: "MySQL", color: "#4479A1", icon: <SiMysql /> },
  { name: "Figma", color: "#F24E1E", icon: <FaFigma /> },
  { name: "Excel", color: "#217346", icon: <FaFileExcel /> },
  { name: "GitHub", color: "#a83232", icon: <SiGithub /> },
];

export const familiarWith: string[] = [
  "Web Development", "RESTful APIs", "Data Cleaning & Processing" , "ETL Pipelines" , "SDLC", "Agile Methodologies", "Version Control (Git)", "Tessting & Debugging",
];

// ─── EXPERIENCE ──────────────────────────────────────────────
export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const experiences: Experience[] = [
  {
    role: "FullStack Developer",
    company: "Kementrian Luar Negeri - BSKLN",
    period: "Feb 2026 – Present",
    desc: "Maintain, develop, and optimize internal web applications while performing data acquisition, cleaning, transformation, and validation to ensure data accuracy and usability. Responsible for debugging, testing, and improving overall system performance and reliability to support efficient company operations.",
  },

  {
    role:    "CEO - Project Based Business",
    company: "Coconut Young",
    period:  "Sept 2025 – Dec 2025",
    desc:    "Leading the team in managing operations, sales, marketing, and overall business strategy. Coordinated team members to ensure efficient execution of business activities and achievement of sales targets. Developed branding and promotional strategies to increase customer engagement and product awareness while also handling budgeting, financial planning, and daily operational activities throughout the project period.",
  },

  {
    role:    "Content Creator",
    company: "WHIM Management",
    period:  "Apr 2021 – Dec 2021",
    desc:    "Creating and editing content for social media platforms, especially TikTok, while developing content strategies to increase engagement and followers. Collaborating with companies and brands for product promotions to enhance audience reach and digital presence.",
  },

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
  type: string;
  desc: string;
  tags: string[];
  bg: string; 
  link?: string;
  image: string;
  date: string;
}

export const projects: Project[] = [
  {
    title: "DataBridge",
    type: "Data Puller Application",
    desc: "Developed an internal data aggregation platform using Python and Streamlit that integrates multiple economic intelligence APIs (EIU, UNCTAD) to automate bulk data extraction, transformation, and loading into a centralized database, replacing manual downloads.",
    tags: ["Python, Streamlit, API Integration, ETL"],
    bg: "#d4f5e9",
    link: "",
    image: "/eiu.png",
    date: "2026",
  },
  {
    title: "Roastory",
    type: "Full-Stack Web App",
    desc: "A premium specialty coffee catalog featuring an interactive 'Coffee Lab' with sensory radar chart comparisons and a dynamic recommendation engine.",
    tags: ["React", "Laravel", "Tailwind CSS", "PostgreSQL"],
    bg: "#fde8d8",
    link: "",
    image: "/roastory.png",
    date: "2025",
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
}

export const contactInfo = {
  heading: "Let's build something great together.",
  description: "I'm currently open to internship and contract opportunities. Whether you're a startup or an established company, I'd love to hear about what you're building.",
  links: [
    { label: "Email", value: "sachio.chan@binus.ac.id"},
    { label: "LinkedIn", value: "https://www.linkedin.com/in/sachioakenochan/"},
    { label: "GitHub", value: "https://github.com/sachioakenochan"},
  ] as ContactLink[],
};

// ─── FOOTER ──────────────────────────────────────────────────
export const footerLinks: string[] = ["GitHub", "LinkedIn", "Email"];
export const footerYear = "2026";