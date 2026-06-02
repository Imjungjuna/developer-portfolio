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
  videoDesktop?: string;
  videoMobile?: string;
  content: string;
};

export const projects: Project[] = [
  {
    id: "cns-fatigue-tracker",
    title: "CNS Fatigue Tracker",
    subtitle: "운동인을 위한 CNS 피로도 측정·관리, 웹 애플리케이션",
    description:
      "수면·컨디션·운동 부하 데이터 기반 피로도 산출. 도메인 로직 직접 설계 + Server Actions 실전 적용",
    period: "2026.02 ~ 2025.04",
    team: "1명",
    status: "active",
    github: "https://github.com/Imjungjuna/my-personal-tracker",
    deploy: "https://jungjun-personal-tracker.vercel.app/",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase"],
    videoDesktop: "/project-videos/sleep-tracker/desktop.mp4",
    videoMobile: "/project-videos/sleep-tracker/mobile.mp4",
    content: `## 왜 이 기술들을 선택했는가

- **Next.js RSC**: 서버에서 직접 Supabase 쿼리 → API Key 클라이언트 비노출, 번들에서 Supabase SDK 제외, 인증→온보딩→데이터 패칭을 하나의 async 함수로 순차 처리
- **Server Actions**: API route 없이 폼 제출→서버 로직→redirect를 하나의 흐름으로. 단, 멀티스텝 폼에서 스텝 간 상태 누적을 FormData가 표현하지 못해 React state → hidden input 브릿지 패턴을 사용했고, 이 경험으로 복잡한 상태 구조가 필요한 경우 API Route를 선택하는 기준을 세움.
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

- Supabase Auth + @supabase/ssr로 쿠키 기반 SSR 인증 구현. Server Component에서 \`getClaims()\`로 JWT 로컬 파싱해 네트워크 없이 인증 상태 확인
- 회원가입 직후 나이·성별·수면패턴·수면 질·낮잠 정보를 5단계 멀티스텝 폼으로 분리 수집하는 온보딩 UX 구현
- \`profiles.age\` 존재 여부로 온보딩 완료 판단. DAL 함수 \`getUserProfile()\` 내부에서 미완료 시 온보딩 페이지로 리다이렉트하는 가드 구현`,
  },
  {
    id: "cams",
    title: "CAMS",
    subtitle: "대학교 코딩동아리 활동관리, 웹 프론트엔드 개발 (5인 팀 협업)",
    description:
      "첫 팀 협업 프로젝트. 스키마 설계부터 참여하며 협업 프로세스와 의사결정을 경험",
    period: "2024.06 ~ 2025.04",
    team: "5명 (FE 2, BE 2, INFRA 1)",
    status: "inactive",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Spring Boot"],
    github: "https://github.com/skku-comit/comit-website.git",
    deploy: "https://comit-cams.vercel.app/",
    videoDesktop: "/project-videos/comit-website/desktop.mp4",
    videoMobile: "/project-videos/comit-website/mobile.mp4",
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
  {
    id: "stock-backtester",
    title: "Stock Backtester",
    subtitle: "미국 당일 급등주 차트 패턴 분석 및 백테스팅 웹",
    description:
      "VCP·컵앤핸들 등 데이트레이딩 패턴을 1분봉 데이터로 백테스팅. 조건별 ON/OFF 토글로 수익률 변화를 실시간 검증.",
    period: "2026.03 ~ 2026.04",
    team: "1명",
    status: "active",
    stack: [
      "TypeScript",
      "Next.js",
      "SQLite",
      "TradingView Lightweight Charts",
      "shadcn/ui",
      "Tailwind CSS v4",
    ],
    deploy: "https://us-stock-trading-backtester.vercel.app/",
    image: "/project-videos/trading-v1/preview.png",
    videoDesktop: "/project-videos/trading-v1/desktop.mp4",
    content: `## 왜 이 기술들을 선택했는가

- **TradingView Lightweight Charts**: Recharts·D3는 SVG 기반이라 1분봉 수천 개 렌더링 시 버벅임. Lightweight Charts는 캔버스 기반으로 캔들스틱 + 거래량 오버레이를 네이티브 지원, 금융 차트에 특화
- **better-sqlite3 (WAL 모드)**: 백테스팅은 OHLCV 수천 행을 순차 스캔하는 작업. ORM 추상화 레이어가 성능 병목. WAL 모드로 새 데이터 fetch 중에도 읽기 차단 없음

## 핵심 문제 해결: 토글 가능한 전략 조건 시스템

"조건 A를 끄면 수익률이 올라가는가?"를 검증하려면 매번 코드를 수정해야 했음. 전략 파일이 \`TOGGLEABLE_CONDITIONS\`를 export하면 UI가 자동으로 체크박스를 생성하고, 비활성 조건 목록을 \`options.disabledConditions\`로 전달하는 구조로 해결.

\`\`\`typescript
// 전략 파일에서 export — UI 코드는 건드리지 않아도 됨
export const TOGGLEABLE_CONDITIONS = [
  { id: 'volume_surge', label: '거래량 급증 확인' },
  { id: 'trend_filter', label: '상위 추세 필터' },
];

export function run(data: StrategyData, options?: StrategyOptions): BacktestResult {
  const disabled = new Set(options?.disabledConditions ?? []);

  for (const bar of bars) {
    if (!disabled.has('volume_surge') && bar.volume < avgVolume * 1.5) continue;
    if (!disabled.has('trend_filter') && bar.close < sma50) continue;
    // 진입 신호 생성...
  }
}
\`\`\`

새 전략 추가 시 \`TOGGLEABLE_CONDITIONS\` 배열 하나만 추가하면 체크박스가 자동 생성. 전략 코드와 UI가 완전히 디커플링됨.

## PnL 시각화

매수/매도 신호를 차트 마커로 표시하고, 각 거래의 진입가·청산가·수익률을 테이블로 집계. 고정 자본 $100 기준, 1R 도달 시 50% 부분 익절 시뮬레이션을 포함해 실전에 가까운 결과를 산출.`,
  },
  {
    id: "yundo-ceramics",
    title: "Yundo Ceramics",
    subtitle: "한/영 다국어 도자기 이커머스, 풀 프론트엔드 프로젝트",
    description:
      "한국 전통 도자기 D2C 웹사이트. 다국어·결제·장바구니까지 프론트엔드 단독 구축",
    period: "2025.04 ~ 2025.05",
    team: "1명",
    status: "active",
    github: "https://github.com/Imjungjuna/portfolio-D2C-commerce-site",
    deploy: "https://yundo-ceramics.vercel.app/",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase"],
    videoDesktop: "/project-videos/yundo-ceramics/desktop.mp4",
    videoMobile: "/project-videos/yundo-ceramics/mobile.mp4",
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
    videoDesktop: "/project-videos/comit-promotion/desktop.mp4",
    videoMobile: "/project-videos/comit-promotion/mobile.mp4",
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
];
