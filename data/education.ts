export type Education = {
  school: string;
  degree: string;
  period: string;
  details: string[];
  tags: string[];
};

export const education: Education[] = [
  {
    school: "성균관대학교",
    degree: "학과 미정 (플레이스홀더)",
    period: "20XX ~ 20XX",
    details: [
      "GPA: X.XX / 4.5 (플레이스홀더)",
      "코딩동아리 CoMit 활동",
      "주요 수강 과목 (플레이스홀더)",
    ],
    tags: ["TypeScript", "React", "Next.js"],
  },
];
