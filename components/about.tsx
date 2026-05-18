"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";

const sections = [
  {
    heading: "시작",
    body: "고등학교 시절 블록체인에 흥미가 생겨 관련 서적을 탐독하고 파이썬으로 직접 구현해보았습니다. 단순히 개념을 아는 것에 그치지 않고 직접 만들어야 이해한다는 믿음이 그때부터 생겼습니다. 대학 입학 후 우연히 참여한 웹 스터디에서 프론트엔드를 처음 접했고, 코드 한 줄이 화면에 바로 반영되는 직접성과 사소한 UX 디테일 하나가 사용자 경험 전체를 바꾼다는 점에 매력을 느껴 본격적으로 공부를 시작했습니다.",
    bullets: null,
  },
  {
    heading: "강점",
    body: "궁금한 것을 끝까지 파고들어 직접 만들어보는 습관입니다. 기술을 선택할 때 항상 왜 이 기술인지를 먼저 따지고, 트레이드오프를 직접 정리하며 판단 기준을 쌓아왔습니다. 이 성향은 개발 외에도 나타납니다.",
    bullets: [
      "수면·컨디션·운동 부하를 가중치 알고리즘으로 통합하는 건강 트래커 직접 설계",
      "미국 마이크로캡 주식 시장의 가격 패턴에서 규칙을 추출해 전략을 수치화하는 백테스팅 프로젝트 진행",
    ],
  },
  {
    heading: "단점과 극복",
    body: "스스로의 잠재성을 충분히 발휘하지 못할까 하는 불안감이 있습니다. 공부한 내용이 실력으로 쌓이고 있는지 느끼지 못할 때 특히 강하게 나타났습니다. 이를 극복하기 위해 매일 학습 내용과 피드백을 노션에 기록하는 루틴을 만들었고, 막연한 불안보다 오늘의 성장에 집중하면서 심리적으로 안정되고 집중력도 높아졌습니다.",
    bullets: null,
  },
  {
    heading: "경험",
    body: "성균관대 코딩동아리 CoMit에서 블록체인만 알던 상태로 입부해 한 학기 만에 개발팀 프로젝트에 합류할 수준으로 성장했습니다. 이후 개인 프로젝트를 통해 전 과정을 직접 구현하며 역량을 키웠습니다.",
    bullets: [
      "CAMS — 동아리 활동관리 시스템, 스키마 설계·PR 템플릿을 통한 협업 프로세스 표준화 경험",
      "Yundo Ceramics — 다국어·토스페이먼츠 결제·장바구니, 상태관리 라이브러리 렌더링 사이클에 맞게 활용",
      "CNS Fatigue Tracker — 피로도 스코어링 알고리즘 설계, BaaS 기반 풀스택 앱 구축 및 PKCE 인증 구현",
    ],
  },
  {
    heading: "목표",
    body: "사용자가 많고 큰 규모의 서비스 환경에서 더 복잡한 문제를 다루고 싶습니다. 개인 프로젝트에서 쌓은 탐구 습관과 설계 능력을 팀 안에서 발휘하며, 사용자 경험을 근본부터 고민하는 개발자로 성장하겠습니다.",
    bullets: null,
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="about"
      ref={ref}
      className="py-16 max-w-[700px]"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Profile header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center gap-6 mb-14"
      >
        <Image
          src="/profile.jpg"
          alt="임정준 프로필"
          width={128}
          height={128}
          className="shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col text-center sm:text-left">
          <p className="text-sm text-muted-foreground">Frontend Developer</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">임정준</p>
          <p className="mt-2 text-base text-muted-foreground">
            쓰기 편한 제품과 읽기 좋은 코드를 지향합니다.
          </p>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section) => (
          <motion.div key={section.heading} variants={fadeUp}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
              {section.heading}
            </h2>
            <p className="text-base leading-[1.8] text-muted-foreground">
              {section.body}
            </p>
            {section.bullets && (
              <ul className="mt-3 space-y-1.5">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-base leading-[1.8] text-muted-foreground"
                  >
                    <span className="mt-[0.725em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
