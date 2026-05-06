"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="py-24 sm:py-32"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
        사용자와 동료의 경험을 고민합니다.
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        임정준
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground text-balance"
      >
        좋은 UI는 예쁜 게 아니라, 사용자의 뇌를 쉬게 하는 것입니다. 기술을 쓸
        수 있는 것보다{" "}
        <span className="font-semibold text-foreground">왜 그 기술인지</span>를
        먼저 묻는 프론트엔드 개발자입니다.
      </motion.p>

      <motion.dl
        variants={fadeUp}
        className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3"
      >
        <div>
          <dt className="text-muted-foreground">생년월일</dt>
          <dd className="mt-1 font-medium">2004.09.09</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">전화번호</dt>
          <dd className="mt-1 font-medium">010.4740.3604</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">위치</dt>
          <dd className="mt-1 font-medium">성남시 분당구</dd>
        </div>
      </motion.dl>

      <motion.a
        variants={fadeUp}
        href="mailto:dalbichi9801@gmail.com"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="h-4 w-4" />
        dalbichi9801@gmail.com
      </motion.a>
    </motion.section>
  );
}
