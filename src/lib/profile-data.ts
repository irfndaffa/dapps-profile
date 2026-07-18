export const profile = {
  name: "Irfandio Daffa Agustantio",
  shortName: "Irfandio Daffa",
  role: "Backend Software Engineer",
  email: "irfandio.daff@gmail.com",
  linkedin: "https://www.linkedin.com/in/irfndaffaa",
  tagline:
    "I build scalable, reliable, and maintainable backend systems — from enterprise platforms to SaaS products.",
  about: [
    "Backend Software Engineer with a strong passion for building scalable, reliable, and maintainable backend systems. Experienced in developing enterprise and SaaS applications using Java Spring Boot, Node.js, and Go, with a focus on designing RESTful APIs, implementing microservices, and delivering high-performance backend solutions.",
    "I also have experience in Android development with Kotlin, including integrating WebView-based micro frontends into mobile applications. While I have worked across both backend and mobile development, my primary focus is backend engineering, where I enjoy solving complex technical challenges, improving system performance, and building software that is secure, scalable, and aligned with industry best practices.",
  ],
};

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

export const experience: Experience[] = [
  {
    role: "Backend Software Engineer",
    company: "PT Prudential Life Assurance",
    period: "Aug 2026 — Present",
    current: true,
    highlights: [],
  },
  {
    role: "Backend Developer",
    company: "Hyperscal Digital ID",
    period: "Jan 2026 — Jul 2026",
    highlights: [
      "Develop and maintain core backend utilities and shared services using Go.",
      "Build reusable helper services consumed by multiple product teams.",
      "Improve backend architecture, scalability, and maintainability.",
      "Troubleshoot cross-service issues and optimize backend performance.",
      "Participate in architectural discussions and backend engineering best practices.",
    ],
  },
  {
    role: "Software Developer",
    company: "PT Mandiri Utama Finance",
    period: "Aug 2023 — Jan 2026",
    highlights: [
      "Developed enterprise Master Data and Reporting Systems using Java Spring Boot and JPA.",
      "Built RESTful APIs using Software AG WebMethods.",
      "Developed backend services for Excel processing using Apache POI.",
      "Implemented data streaming solutions with Apache Kafka.",
      "Developed backend services using Node.js and Sequelize ORM.",
      "Maintained enterprise applications and supported production environments.",
      "Developed backend services using IBM Software AG WebMethods.",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "PT Mandiri Utama Finance",
    period: "Aug 2021 — Jul 2023",
    highlights: [
      "Developed enterprise backend applications using Java Spring Boot.",
      "Built Android applications using Kotlin with Micro Frontend architecture.",
      "Developed custom camera features for Android applications.",
      "Performed System Integration Testing (SIT) and built ETL processes using Pentaho.",
      "Maintained production systems and ensured data consistency between databases and frontend applications.",
    ],
  },
  {
    role: "IT Graduate Development Program",
    company: "Bumi Amartha Teknologi Mandiri",
    period: "Jul 2021 — Aug 2021",
    highlights: [
      "Completed intensive Java and SQL training.",
      "Developed Java Spring applications as part of the bootcamp curriculum.",
    ],
  },
  {
    role: "Android Developer Intern",
    company: "Baramij Integrasi Teknologi",
    period: "Jun 2019 — Aug 2019",
    highlights: [
      "Developed Android features for the Moslem Global application.",
      "Participated in mobile application development for Umrah services.",
    ],
  },
];

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

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    note: "The tools I think in.",
    items: [
      { name: "Java", icon: "java" },
      { name: "Go", icon: "go" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "SQL", icon: "sql" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    title: "Backend",
    note: "Where I spend most of my time.",
    items: [
      { name: "Spring Boot", icon: "spring" },
      { name: "JPA / Hibernate", icon: "hibernate" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Sequelize ORM", icon: "sequelize" },
      { name: "RESTful APIs", icon: "api" },
      { name: "Microservices", icon: "microservices" },
      { name: "Software AG WebMethods", icon: "webmethods" },
    ],
  },
  {
    title: "Data & Messaging",
    note: "Moving data, reliably.",
    items: [
      { name: "Apache Kafka", icon: "kafka" },
      { name: "Pentaho ETL", icon: "pentaho" },
      { name: "Apache POI", icon: "poi" },
    ],
  },
  {
    title: "Mobile",
    note: "A useful second skill.",
    items: [
      { name: "Android", icon: "android" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "WebView Micro Frontends", icon: "webview" },
    ],
  },
];

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
