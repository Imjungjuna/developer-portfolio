export type SkillCategory = {
  title: string;
  subtitle: string;
  skills: { name: string; icon?: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Core",
    subtitle: "핵심 프레임워크 & 언어",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Styling",
    subtitle: "UI & 인터랙션",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "shadcn/ui" },
    ],
  },
  {
    title: "Infrastructure",
    subtitle: "백엔드 & 배포",
    skills: [
      { name: "Supabase" },
      { name: "Git" },
      { name: "Vercel" },
    ],
  },
];
