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
    degree: "전기전자정보공학부",
    period: "2023 ~ ",
    details: [
      "코딩동아리 CoMit 활동",
      "주요 수강 과목: 자료구조와알고리즘, 데이터통신, 컴퓨터네트워크개론, 전기전자프로그래밍실습",
      "관심 분야: 웹 보안, 암호학",
    ],
    tags: ["TypeScript", "React", "Next.js"],
  },
];
