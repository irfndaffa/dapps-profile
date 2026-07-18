import siteContent from "@/data/site-content.json";

export const profile = {
  name: "Irfandio Daffa Agustantio",
  shortName: "Irfandio Daffa",
  role: "Backend Software Engineer",
  email: siteContent.contact.email,
  linkedin: siteContent.contact.linkedin,
  tagline:
    "I build scalable, reliable, and maintainable backend systems — from enterprise platforms to SaaS products.",
  about: siteContent.about,
};

export const photo = siteContent.photo;

export type Experience = {
  role: string;
  company: string;
  client?: string;
  period: string;
  current?: boolean;
  highlights: string[];
};

// First full-time engineering role — used to derive a real "years of
// experience" figure instead of a hard-coded/invented number.
const careerStart = new Date(2021, 7, 1); // Aug 2021

function yearsSince(start: Date) {
  const now = new Date();
  const years =
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years * 2) / 2; // round to nearest 0.5
}

export const experience: Experience[] = siteContent.experience;

export type SkillIcon =
  | "java"
  | "go"
  | "javascript"
  | "typescript"
  | "kotlin"
  | "sql"
  | "python"
  | "spring"
  | "hibernate"
  | "nodejs"
  | "sequelize"
  | "api"
  | "microservices"
  | "webmethods"
  | "kafka"
  | "pentaho"
  | "poi"
  | "android"
  | "webview";

export type Skill = { name: string; icon: SkillIcon };
export type SkillGroup = { title: string; note: string; items: Skill[] };

export const skillGroups: SkillGroup[] = siteContent.skillGroups as SkillGroup[];


// Derived, not invented — computed from the experience/skill data above.
export const stats = [
  { value: `${yearsSince(careerStart)}+`, label: "Years of experience" },
  {
    value: `${new Set(experience.map((job) => job.company)).size}`,
    label: "Companies worked with",
  },
  {
    value: `${skillGroups.reduce((sum, group) => sum + group.items.length, 0)}`,
    label: "Technologies in daily use",
  },
];

export const education = {
  school: "Telkom University",
  degree: "Bachelor of Computer Engineering",
  period: "2016 — 2020",
  gpa: "3.40 / 4.00",
};

export const activities = [
  {
    title: "Assistant Laboratory — Software Design & Analysis",
    description:
      "Mentored students in UML, ERD, DFD, Class Diagrams, and software design. Reviewed assignments and prepared learning materials.",
  },
  {
    title: "Assistant Laboratory — Human Resource Management",
    description:
      "Managed recruitment processes and organized laboratory events and activities.",
  },
  {
    title: "Study Group Laboratory",
    description:
      "Developed Python-based projects for Excel data processing and image processing.",
  },
];

export const achievement = {
  title: "Bronze Medal — Korea International Youth Olympiad",
  detail: "Best of the Best Innovation",
};

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Intermediate" },
];
