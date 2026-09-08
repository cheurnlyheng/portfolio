export type CoreSkill = {
  title: string;
  icon: "design" | "frontend" | "backend" | "database" | "tools";
  items: string[];
};

export const coreSkills: CoreSkill[] = [
  {
    title: "UX/UI Design",
    icon: "design",
    items: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Flow Design",
      "Responsive Design",
    ],
  },
  {
    title: "Frontend Dev",
    icon: "frontend",
    items: ["HTML", "CSS", "JavaScript", "TailwindCSS", "React", "Next.js"],
  },
  {
    title: "Backend Dev",
    icon: "backend",
    items: ["PHP", "Laravel", "Java", "Spring Boot"],
  },
  {
    title: "Database",
    icon: "database",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Tools",
    icon: "tools",
    items: ["Render","Vercel","Resend","Neon","SupaBase","PgAdmin", "GitHub", "Postman", "VS Code", "IntelliJ IDEA",],
  },
];

export const techStackLogos = [
  { label: "Figma", icon: "/icons/tech/figma.svg" },
  { label: "Canva", icon: "/icons/tech/canva.svg" },
  { label: "PgAdmin", icon: "/icons/tech/pgadmin.svg" },
  { label: "PostgreSQL", icon: "/icons/tech/postgresql.svg" },
  { label: "MySQL", icon: "/icons/tech/mysql.svg" },
  { label: "GitHub", icon: "/icons/tech/github.svg" },
  { label: "Postman", icon: "/icons/tech/postman.svg" },
  { label: "VS Code", icon: "/icons/tech/vscode.svg" },
  { label: "IntelliJ IDEA", icon: "/icons/tech/intellij-idea.svg" },
  { label: "HTML", icon: "/icons/tech/html.svg" },
  { label: "CSS", icon: "/icons/tech/css.svg" },
  { label: "JavaScript", icon: "/icons/tech/javascript.svg" },
  { label: "TailwindCSS", icon: "/icons/tech/tailwindcss.svg" },
  { label: "React", icon: "/icons/tech/react.svg" },
  { label: "Next.js", icon: "/icons/tech/nextjs.svg" },
  { label: "PHP", icon: "/icons/tech/php.svg" },
  { label: "Laravel", icon: "/icons/tech/laravel.svg" },
  { label: "Java", icon: "/icons/tech/java.svg" },
  { label: "Spring Boot", icon: "/icons/tech/spring-boot.svg" },
  { label: "CapCut", icon: "/icons/tech/capcut.svg" },
];
