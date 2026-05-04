# Portfolio Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** min-hyuk.com 스타일의 싱글페이지 포트폴리오 + 프로젝트 상세 페이지 구현 (애니메이션 제외)

**Architecture:** Next.js 16 App Router 싱글페이지 스크롤 구조. shadcn/ui 컴포넌트 + next-themes 다크/라이트 모드. 프로젝트 데이터는 로컬 TS 파일로 관리하고, `/project/[id]` 동적 라우트로 상세 페이지 제공. 코드 블록은 shiki로 하이라이팅.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, next-themes, Lucide React, shiki

---

## File Structure

```
app/
├── layout.tsx              (수정: 폰트, 테마, 전역 레이아웃)
├── page.tsx                (수정: 메인 싱글페이지)
├── globals.css             (수정: shadcn/ui 테마 토큰)
├── project/
│   └── [id]/
│       └── page.tsx        (생성: 프로젝트 상세)
components/
├── header.tsx              (생성: 고정 헤더 + 네비게이션)
├── mobile-nav.tsx          (생성: 모바일 햄버거 메뉴)
├── theme-toggle.tsx        (생성: 다크/라이트 토글)
├── theme-provider.tsx      (생성: next-themes provider)
├── section-label.tsx       (생성: 섹션 라벨 재사용 컴포넌트)
├── hero.tsx                (생성: Hero 섹션)
├── education.tsx           (생성: Education 섹션)
├── projects.tsx            (생성: Projects 카드 목록)
├── project-card.tsx        (생성: 개별 프로젝트 카드)
├── skills.tsx              (생성: Skills 3컬럼 그리드)
├── skill-card.tsx          (생성: 개별 스킬 카드)
├── contact.tsx             (생성: Contact 섹션)
├── footer.tsx              (생성: Footer)
└── ui/                     (shadcn/ui가 자동 생성)
data/
├── projects.ts             (생성: 프로젝트 데이터)
├── skills.ts               (생성: 스킬 데이터)
└── education.ts            (생성: 학력 데이터)
lib/
└── utils.ts                (shadcn/ui가 자동 생성)
```

---

### Task 1: shadcn/ui + next-themes 초기화

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/theme-provider.tsx`
- Create: `lib/utils.ts` (shadcn 자동생성)
- Create: `components/ui/` (shadcn 자동생성)

- [ ] **Step 1: shadcn/ui 초기화**

Run:
```bash
npx shadcn@latest init -d
```

이 명령은 `components.json`, `lib/utils.ts`, `globals.css` 테마 토큰을 자동 생성한다. 프롬프트가 뜨면: style=new-york, base-color=neutral, css-variables=yes 선택.

- [ ] **Step 2: 필요한 shadcn 컴포넌트 + next-themes 설치**

Run:
```bash
npx shadcn@latest add card badge button separator sheet
npm install next-themes lucide-react
```

- [ ] **Step 3: Montserrat 폰트로 전환 + theme-provider 생성**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "임정준 | Frontend Developer",
  description:
    "사용자가 생각하지 않아도 되는 인터페이스를 만드는 프론트엔드 개발자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`components/theme-provider.tsx`:
```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 4: globals.css에 font-sans 등록 확인**

shadcn init이 생성한 `globals.css`에 `--font-sans` 토큰이 있어야 한다. `@theme inline` 블록 안에:
```css
--font-sans: var(--font-montserrat);
```
가 포함되어야 한다. 없으면 추가.

- [ ] **Step 5: 빈 메인 페이지로 교체 후 빌드 확인**

`app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-3xl px-6">
        <p className="py-32 text-foreground">Portfolio coming soon</p>
      </div>
    </main>
  );
}
```

Run:
```bash
npm run build
```
Expected: 빌드 성공, 에러 없음.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat: initialize shadcn/ui, next-themes, Montserrat font"
```

---

### Task 2: Header + Theme Toggle

**Files:**
- Create: `components/header.tsx`
- Create: `components/theme-toggle.tsx`
- Create: `components/mobile-nav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: theme-toggle 컴포넌트 생성**

`components/theme-toggle.tsx`:
```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">테마 전환</span>
    </Button>
  );
}
```

- [ ] **Step 2: mobile-nav 컴포넌트 생성**

`components/mobile-nav.tsx`:
```tsx
"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { label: "About", href: "#hero" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="sr-only">네비게이션</SheetTitle>
        <nav className="flex flex-col gap-4 pt-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 3: header 컴포넌트 생성**

`components/header.tsx`:
```tsx
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { label: "About", href: "#hero" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <a href="#" className="text-lg font-bold">
          임정준
        </a>
        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: layout.tsx에 Header 추가**

`app/layout.tsx` body 내부를 수정:
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <Header />
  {children}
</ThemeProvider>
```

상단에 `import { Header } from "@/components/header";` 추가.

- [ ] **Step 5: 브라우저에서 확인**

Run:
```bash
npm run dev
```
Expected: 헤더 고정, 다크/라이트 토글 동작, 모바일 사이즈에서 햄버거 메뉴 표시.

- [ ] **Step 6: 커밋**

```bash
git add components/header.tsx components/theme-toggle.tsx components/mobile-nav.tsx app/layout.tsx
git commit -m "feat: add sticky header with nav, theme toggle, mobile menu"
```

---

### Task 3: 데이터 파일 생성

**Files:**
- Create: `data/projects.ts`
- Create: `data/skills.ts`
- Create: `data/education.ts`

- [ ] **Step 1: 프로젝트 데이터 생성**

`data/projects.ts`:
```ts
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  team: string;
  status: "active" | "inactive";
  stack: string[];
  github?: string;
  deploy?: string;
  image?: string;
  content: string; // 마크다운 형식
};

export const projects: Project[] = [
  {
    id: "yundo-ceramics",
    title: "Yundo Ceramics",
    subtitle: "한/영 다국어 도자기 이커머스, 풀 프론트엔드 프로젝트",
    description:
      "한국 전통 도자기 D2C 웹사이트. 다국어·결제·장바구니까지 프론트엔드 단독 구축",
    period: "2025.04 ~ 2025.05",
    team: "1명",
    status: "active",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase"],
    content: `## 왜 이 기술들을 선택했는가

- **next-intl**: react-i18next는 클라이언트 중심이라 Server Component에서 번역을 가져오려면 우회가 필요했다. next-intl은 App Router의 \`[locale]\` 세그먼트를 네이티브로 지원해서 선택
- **Zustand (persist)**: Context API는 Provider 중첩과 리렌더링 문제, Redux는 이 규모에 보일러플레이트가 과했다. \`create\` 한 줄로 스토어 생성, persist 미들웨어 하나로 localStorage 연동 완료
- **토스페이먼츠**: 한국 시장 타겟에서 문서가 가장 잘 되어있고, 위젯 방식으로 결제 UI를 제공해 커스텀 폼이 불필요했다

## 핵심 문제 해결: Zustand SSR Hydration

SSR 환경에서 서버 렌더링 HTML과 클라이언트 localStorage 값이 달라 hydration mismatch 발생.

\`\`\`tsx
// useEffect로 마운트 후 동기화하는 패턴
const useHydration = <T,>(useStore: UseBoundStore<StoreApi<T>>) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    return unsubscribe;
  }, [useStore]);

  return hydrated;
};
\`\`\`

이 패턴은 persist 미들웨어를 쓰는 모든 Zustand 스토어에 적용 가능한 범용 해결책.

## 서버/클라이언트 역할 분리

- **'use client' 경계 설계**: 상품 상세는 서버 컴포넌트로 데이터를 가져오고, 장바구니 버튼·이미지 갤러리처럼 인터랙션이 필요한 부분만 클라이언트로 분리
- **결제 보안**: SDK는 클라이언트에서 위젯 렌더링, 최종 승인(confirm)은 Route Handler에서 시크릿 키로 서버사이드 처리
- **한글 폰트 최적화**: Noto Serif KR은 용량이 커서 \`preload: false\` 설정, \`display: 'swap'\`으로 FOUT를 허용하되 레이아웃 시프트 최소화`,
  },
  {
    id: "cns-fatigue-tracker",
    title: "CNS Fatigue Tracker",
    subtitle: "운동인을 위한 CNS 피로도 측정·관리, 웹 애플리케이션",
    description:
      "수면·컨디션·운동 부하 데이터 기반 피로도 산출. 도메인 로직 직접 설계 + Server Actions 실전 적용",
    period: "2025.04 ~ 2025.05",
    team: "1명",
    status: "active",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase"],
    content: `## 왜 이 기술들을 선택했는가

- **Next.js RSC**: 서버에서 직접 Supabase 쿼리 → API Key 클라이언트 비노출, 번들에서 Supabase SDK 제외, 인증→온보딩→데이터 패칭을 하나의 async 함수로 순차 처리
- **Server Actions**: API route 없이 폼 제출→서버 로직→redirect를 하나의 흐름으로. 단, 배열 데이터를 FormData로 다루는 한계를 체감하고 API route 전환 판단 기준을 세움
- **Supabase (vs Firebase)**: SQL 기반이라 프로필↔운동종목↔일일기록 관계형 모델링이 자연스럽고, Google OAuth 설정이 한 줄로 끝남

## 도메인 로직 직접 설계: CNS 피로도 알고리즘

수면(시간·질), 정신 컨디션, 신체 에너지, 근육통, 운동 부하(RPE), HRV를 가중치 기반으로 통합 산출하는 스코어링 로직 자체 설계.

\`\`\`typescript
type FatigueInput = {
  sleepHours: number;
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  mentalCondition: 1 | 2 | 3 | 4 | 5;
  physicalEnergy: 1 | 2 | 3 | 4 | 5;
  muscleSoreness: 1 | 2 | 3 | 4 | 5;
  rpe: number;
  hrv?: number;
};

function calculateFatigueScore(input: FatigueInput): number {
  const weights = input.hrv
    ? { sleep: 0.25, mental: 0.15, physical: 0.15, soreness: 0.1, rpe: 0.15, hrv: 0.2 }
    : { sleep: 0.3, mental: 0.2, physical: 0.2, soreness: 0.1, rpe: 0.2 };
  // HRV 유무에 따라 가중치를 동적으로 재분배
  // ...
}
\`\`\`

## 인증 흐름과 온보딩 UX

- Supabase Auth + @supabase/ssr로 쿠키 기반 SSR 인증 구현, Server Component에서 \`getUser()\`로 인증 상태 직접 확인
- 회원가입 직후 모든 정보를 한번에 받는 대신, 멀티스텝 온보딩으로 분리해 이탈률을 줄이는 UX 패턴 적용
- \`onboarding_completed\` 플래그로 미완료 사용자를 모든 페이지에서 온보딩으로 리다이렉트하는 가드 구현`,
  },
  {
    id: "comit-promotion",
    title: "교내 동아리 홍보 사이트",
    subtitle: "코딩동아리 신규모집 홍보용, 정적 웹사이트 개발",
    description:
      "동아리 홍보·네트워킹 사이트. 디자인 시행착오를 빠르게 반영하기 위해 Next.js + Tailwind 선택",
    period: "2025.02 ~ 2025.03",
    team: "1명",
    status: "active",
    stack: ["TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/skku-comit/comit.main-frontend.git",
    deploy: "https://comit-main-frontend.vercel.app/",
    content: `## 왜 Next.js + Tailwind인가

단순 홍보 페이지지만 동적 애니메이션과 잦은 디자인 수정이 필요했다. 정적 HTML로는 반복적인 CSS 수정이 비효율적. Tailwind의 유틸리티 접근이 디자인 시행착오를 빠르게 반영하는 데 적합했고, 홍보 목적상 SEO도 고려해야 했기 때문에 Next.js 선택.

## 반응형 인터페이스 & 인터랙션

- Framer Motion으로 페이지 전환, 스크롤 트리거 카운팅 애니메이션 등 사용자 상호작용 구현
- TechMarquee 같은 커스텀 컴포넌트로 기술 스택 섹션을 동적으로 전시
- 재사용 가능한 UI 요소를 분리해 명확한 컴포넌트 기반 아키텍처로 구조화

## 코드 품질

- TypeScript 전면 적용으로 컴포넌트와 데이터 구조 전반의 타입 안전성 확보
- ESLint + Prettier 설정으로 일관된 코드 스타일 적용`,
  },
  {
    id: "cams",
    title: "CAMS",
    subtitle:
      "대학교 코딩동아리 활동관리, 웹 프론트엔드 개발 (5인 팀 협업)",
    description:
      "첫 팀 협업 프로젝트. 스키마 설계부터 참여하며 협업 프로세스와 의사결정을 경험",
    period: "2024.06 ~ 2025.05",
    team: "5명 (FE 2, BE 2, INFRA 1)",
    status: "active",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Spring Boot"],
    github: "https://github.com/skku-comit/comit-website.git",
    deploy: "https://comit-cams.vercel.app/",
    content: `## 왜 이 프로젝트가 중요한가

Postman 사용법도 몰랐던 상태에서 시작한 첫 팀 프로젝트. 스키마 설계부터 참여하며 백엔드와의 소통 방식을 배움. 간단해 보이는 프로젝트도 스키마 구조, 일정 조율에서 의사결정 충돌이 일어날 수 있다는 걸 체감. 코드 실력보다 협업 근육을 키운 프로젝트 — GitHub 이슈·PR 템플릿으로 협업 프로세스를 표준화.

## 스터디 플랫폼 프론트엔드 개발

- 스터디 목록 조회, 개설, 상세 정보 확인 및 세부 페이지 개발
- Zod + React Hook Form으로 회원가입 폼 유효성 검증 구현

\`\`\`typescript
const signUpSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
});
\`\`\`

- Next.js 서버 액션으로 라이브러리 없이 로그인 세션 관리

## UI 시스템 & 코드 품질

- Tailwind CSS + shadcn/ui 기반 컴포넌트 시스템 구축
- Framer Motion 활용 애니메이션, HeightPopulatedDiv로 푸터 동적 높이 관리
- TypeScript 기반 타입 안전성 확보 및 절대 경로 별칭(\`@/*\`) 설정`,
  },
];
```

- [ ] **Step 2: 스킬 데이터 생성**

`data/skills.ts`:
```ts
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
```

- [ ] **Step 3: 학력 데이터 생성**

`data/education.ts`:
```ts
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
```

- [ ] **Step 4: 커밋**

```bash
git add data/
git commit -m "feat: add project, skill, education data files"
```

---

### Task 4: 재사용 컴포넌트 + Hero 섹션

**Files:**
- Create: `components/section-label.tsx`
- Create: `components/hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: section-label 컴포넌트 생성**

`components/section-label.tsx`:
```tsx
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-muted-foreground">{children}</p>
  );
}
```

- [ ] **Step 2: Hero 섹션 생성**

`components/hero.tsx`:
```tsx
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="py-24 sm:py-32">
      <p className="text-sm text-muted-foreground">
        사용자와 동료의 경험을 고민합니다.
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        임정준
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground text-balance">
        좋은 UI는 예쁜 게 아니라, 사용자의 뇌를 쉬게 하는 것입니다. 기술을 쓸
        수 있는 것보다{" "}
        <span className="font-semibold text-foreground">왜 그 기술인지</span>를
        먼저 묻는 프론트엔드 개발자입니다.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">생년월일</dt>
          <dd className="mt-1 font-medium">1998.01.01</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">전화번호</dt>
          <dd className="mt-1 font-medium">010.4740.3604</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">위치</dt>
          <dd className="mt-1 font-medium">서울</dd>
        </div>
      </dl>

      <div className="mt-8 flex items-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </Badge>
        <a
          href="mailto:dalbichi9801@gmail.com"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="h-4 w-4" />
          dalbichi9801@gmail.com
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx에 Hero 연결**

`app/page.tsx`:
```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: 브라우저에서 확인**

Run: `npm run dev`
Expected: Hero 섹션이 중앙 정렬로 표시됨. 다크/라이트 모드에서 텍스트 색상 전환. "Available for work" 뱃지에 초록색 ping 애니메이션.

- [ ] **Step 5: 커밋**

```bash
git add components/section-label.tsx components/hero.tsx app/page.tsx
git commit -m "feat: add Hero section with personal info and CTA"
```

---

### Task 5: Education 섹션

**Files:**
- Create: `components/education.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Education 컴포넌트 생성**

`components/education.tsx`:
```tsx
import { SectionLabel } from "@/components/section-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="py-16">
      <SectionLabel>Education</SectionLabel>
      <div className="mt-6 space-y-4">
        {education.map((edu) => (
          <Card key={edu.school}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{edu.school}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {edu.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {edu.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: page.tsx에 추가**

`app/page.tsx`에 Education import 추가:
```tsx
import { Hero } from "@/components/hero";
import { Education } from "@/components/education";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <Hero />
      <Education />
    </main>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add components/education.tsx app/page.tsx
git commit -m "feat: add Education section with placeholder data"
```

---

### Task 6: Projects 카드 목록

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/projects.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: project-card 컴포넌트 생성**

`components/project-card.tsx`:
```tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
      <Link href={`/project/${project.id}`} className="block">
        {/* 이미지 플레이스홀더 */}
        <div className="aspect-video w-full rounded-t-lg bg-muted" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Badge
              variant={project.status === "active" ? "default" : "secondary"}
            >
              {project.status === "active" ? "서비스 중" : "중단"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {project.period} · {project.team}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
      {(project.github || project.deploy) && (
        <div className="flex gap-2 border-t px-6 py-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
```

- [ ] **Step 2: projects 섹션 컴포넌트 생성**

`components/projects.tsx`:
```tsx
import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <SectionLabel>Projects</SectionLabel>
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx에 추가**

```tsx
import { Hero } from "@/components/hero";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <Hero />
      <Education />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 4: 커밋**

```bash
git add components/project-card.tsx components/projects.tsx app/page.tsx
git commit -m "feat: add Projects section with card grid"
```

---

### Task 7: Skills 섹션

**Files:**
- Create: `components/skill-card.tsx`
- Create: `components/skills.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: skill-card 컴포넌트 생성**

`components/skill-card.tsx`:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillCategory } from "@/data/skills";

export function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{category.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{category.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm transition-colors hover:bg-muted"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <span className="text-xs font-medium">
                  {skill.name.slice(0, 2)}
                </span>
              </div>
              {skill.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: skills 섹션 컴포넌트 생성**

`components/skills.tsx`:
```tsx
import { SectionLabel } from "@/components/section-label";
import { SkillCard } from "@/components/skill-card";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-16">
      <SectionLabel>Skills</SectionLabel>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {skillCategories.map((category) => (
          <SkillCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx에 추가**

```tsx
import { Hero } from "@/components/hero";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <Hero />
      <Education />
      <Projects />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 4: 커밋**

```bash
git add components/skill-card.tsx components/skills.tsx app/page.tsx
git commit -m "feat: add Skills section with 3-column grid"
```

---

### Task 8: Contact + Footer

**Files:**
- Create: `components/contact.tsx`
- Create: `components/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Contact 컴포넌트 생성**

`components/contact.tsx`:
```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Github } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    label: "전화번호",
    value: "010.4740.3604",
  },
  {
    icon: Mail,
    label: "이메일",
    value: "dalbichi9801@gmail.com",
    href: "mailto:dalbichi9801@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@imjungjuna",
    href: "https://github.com/Imjungjuna",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold tracking-tight">감사합니다</h2>
      <p className="mt-2 text-muted-foreground">
        누구나, 언제든지, 무엇이든 편하게 연락주세요
      </p>
      <Card className="mt-8">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const content = (
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {contact.label}
                  </p>
                  <p className="text-sm font-medium">{contact.value}</p>
                </div>
              </div>
            );

            return contact.href ? (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="transition-colors hover:text-primary"
              >
                {content}
              </a>
            ) : (
              <div key={contact.label}>{content}</div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
```

- [ ] **Step 2: Footer 컴포넌트 생성**

`components/footer.tsx`:
```tsx
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 pb-8">
      <Separator />
      <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">임정준</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a
            href="https://github.com/Imjungjuna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="mailto:dalbichi9801@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: page.tsx에 Contact 추가, layout.tsx에 Footer 추가**

`app/page.tsx` 최종:
```tsx
import { Hero } from "@/components/hero";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <Hero />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
```

`app/layout.tsx`에 Footer import 추가하고 `{children}` 뒤에 배치:
```tsx
<ThemeProvider ...>
  <Header />
  <div className="flex-1">{children}</div>
  <Footer />
</ThemeProvider>
```

상단에 `import { Footer } from "@/components/footer";` 추가.

- [ ] **Step 4: 커밋**

```bash
git add components/contact.tsx components/footer.tsx app/page.tsx app/layout.tsx
git commit -m "feat: add Contact section and Footer"
```

---

### Task 9: 프로젝트 상세 페이지

**Files:**
- Create: `app/project/[id]/page.tsx`

- [ ] **Step 1: shiki 설치**

Run:
```bash
npm install shiki
```

- [ ] **Step 2: 프로젝트 상세 페이지 생성**

`app/project/[id]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { codeToHtml } from "shiki";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | 임정준`,
    description: project.description,
  };
}

async function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      const code = codeLines.join("\n");
      const html = await codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
      });

      elements.push(
        <div
          key={key++}
          className="my-4 overflow-x-auto rounded-lg border text-sm [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
      continue;
    }

    // Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 text-xl font-semibold">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{
              __html: item
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-xs">$1</code>')
            }} />
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    if (line.trim()) {
      elements.push(
        <p
          key={key++}
          className="my-2 text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-xs">$1</code>')
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const contentElements = await renderMarkdown(project.content);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Projects
      </Link>

      <h1 className="mt-8 text-2xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{project.subtitle}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{project.period}</span>
        <span>·</span>
        <span>{project.team}</span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.deploy && (
          <a
            href={project.deploy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      <article className="mt-10">{contentElements}</article>
    </main>
  );
}
```

- [ ] **Step 3: 빌드 확인**

Run:
```bash
npm run build
```
Expected: 빌드 성공. `/project/yundo-ceramics`, `/project/cns-fatigue-tracker`, `/project/comit-promotion`, `/project/cams` 4개 정적 페이지 생성.

- [ ] **Step 4: 커밋**

```bash
git add app/project/ package.json package-lock.json
git commit -m "feat: add project detail page with shiki code highlighting"
```

---

### Task 10: 최종 빌드 확인 및 정리

- [ ] **Step 1: 전체 빌드**

Run:
```bash
npm run build
```
Expected: 에러 없이 빌드 성공.

- [ ] **Step 2: dev 서버로 전체 확인**

Run:
```bash
npm run dev
```

확인 항목:
- Header 고정, 네비 링크 스크롤 이동
- 다크/라이트 토글 동작
- 모바일에서 햄버거 메뉴
- Hero → Education → Projects → Skills → Contact 순서
- 프로젝트 카드 클릭 → 상세 페이지 이동
- 상세 페이지에서 코드 블록 하이라이팅
- 뒤로가기 링크 → 메인 Projects 섹션
- Footer 소셜 링크, Quick Links

- [ ] **Step 3: 최종 커밋**

남은 변경사항이 있으면:
```bash
git add -A
git commit -m "chore: phase 1 portfolio build complete"
```
