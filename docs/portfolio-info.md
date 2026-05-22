# Portfolio Text Content

포트폴리오 사이트에 사용된 모든 텍스트 정보 모음. 콘텐츠 수정 시 이 파일을 먼저 업데이트하고, 해당 소스 파일도 함께 수정할 것.

---

## 메타데이터 (`/app/layout.tsx`, `/app/about/page.tsx`)

| 항목 | 값 |
|------|----|
| 사이트 제목 | 임정준 \| Frontend Developer |
| 사이트 설명 | 사용자가 생각하지 않아도 되는 인터페이스를 만드는 프론트엔드 개발자 |
| About 페이지 제목 | About \| 임정준 |
| About 페이지 설명 | 임정준 프론트엔드 개발자 소개 |

---

## 헤더 & 네비게이션 (`/components/header.tsx`)

| 레이블 | 경로 |
|--------|------|
| About | /about |
| Education | /#education |
| Projects | /#projects |
| Skills | /#skills |
| Contact | /#contact |

상태 뱃지: **"Available for work"**

---

## 히어로 섹션 (`/components/hero.tsx`)

| 항목 | 값 |
|------|----|
| 태그라인 | 쓰기 편한 제품과 읽기 좋은 코드를 지향합니다. |
| 이름 | 임정준 |
| 생년월일 | 2004.09.09 |
| 전화번호 | 010.4740.3604 |
| 위치 | 성남시 분당구 |
| 이메일 | dalbichi9801@gmail.com |

**자기소개:**
> 좋은 UI는 예쁜 게 아니라, 사용자의 뇌를 쉬게 하는 것입니다. 기술을 쓸 수 있는 것보다 **왜 그 기술인지**를 먼저 묻는 프론트엔드 개발자입니다.

---

## About 페이지 (`/components/about.tsx`)

**프로필 헤더**

| 항목 | 값 |
|------|----|
| 직함 | Frontend Developer |
| 이름 | 임정준 |
| 한 줄 소개 | 쓰기 편한 제품과 읽기 좋은 코드를 지향합니다. |

---

### 시작

고등학교 시절 블록체인에 흥미가 생겨 관련 서적을 탐독하고 파이썬으로 직접 구현해보았습니다. 단순히 개념을 아는 것에 그치지 않고 직접 만들어야 이해한다는 믿음이 그때부터 생겼습니다. 대학 입학 후 우연히 참여한 웹 스터디에서 프론트엔드를 처음 접했고, 코드 한 줄이 화면에 바로 반영되는 직접성과 사소한 UX 디테일 하나가 사용자 경험 전체를 바꾼다는 점에 매력을 느껴 본격적으로 공부를 시작했습니다.

---

### 강점

궁금한 것을 끝까지 파고들어 직접 만들어보는 습관입니다. 기술을 선택할 때 항상 왜 이 기술인지를 먼저 따지고, 트레이드오프를 직접 정리하며 판단 기준을 쌓아왔습니다. 이 성향은 개발 외에도 나타납니다.

- 수면·컨디션·운동 부하를 가중치 알고리즘으로 통합하는 건강 트래커 직접 설계
- 미국 마이크로캡 주식 시장의 가격 패턴에서 규칙을 추출해 전략을 수치화하는 백테스팅 프로젝트 진행

---

### 단점과 극복

스스로의 잠재성을 충분히 발휘하지 못할까 하는 불안감이 있습니다. 공부한 내용이 실력으로 쌓이고 있는지 느끼지 못할 때 특히 강하게 나타났습니다. 이를 극복하기 위해 매일 학습 내용과 피드백을 노션에 기록하는 루틴을 만들었고, 막연한 불안보다 오늘의 성장에 집중하면서 심리적으로 안정되고 집중력도 높아졌습니다.

---

### 경험

성균관대 코딩동아리 CoMit에서 블록체인만 알던 상태로 입부해 한 학기 만에 개발팀 프로젝트에 합류할 수준으로 성장했습니다. 이후 개인 프로젝트를 통해 전 과정을 직접 구현하며 역량을 키웠습니다.

- CAMS — 동아리 활동관리 시스템, 스키마 설계·PR 템플릿을 통한 협업 프로세스 표준화 경험
- Yundo Ceramics — 다국어·토스페이먼츠 결제·장바구니, 상태관리 라이브러리 렌더링 사이클에 맞게 활용
- CNS Fatigue Tracker — 피로도 스코어링 알고리즘 설계, BaaS 기반 풀스택 앱 구축 및 PKCE 인증 구현

---

### 목표

사용자가 많고 큰 규모의 서비스 환경에서 더 복잡한 문제를 다루고 싶습니다. 개인 프로젝트에서 쌓은 탐구 습관과 설계 능력을 팀 안에서 발휘하며, 사용자 경험을 근본부터 고민하는 개발자로 성장하겠습니다.

---

## 학력 (`/data/education.ts`)

**성균관대학교**
- 전공: 전기전자정보공학부
- 기간: 2023 ~
- 활동: 코딩동아리 CoMit 활동
- 주요 수강 과목: 자료구조와알고리즘, 데이터통신, 컴퓨터네트워크개론, 전기전자프로그래밍실습
- 관심 분야: 웹 보안, 암호학
- 태그: TypeScript, React, Next.js

---

## 스킬 (`/data/skills.ts`)

| 카테고리 | 기술 |
|----------|------|
| CORE (핵심 프레임워크 & 언어) | React, Next.js, TypeScript, JavaScript |
| STYLING (UI & 인터랙션) | Tailwind CSS, Framer Motion, shadcn/ui |
| INFRASTRUCTURE (백엔드 & 배포) | Supabase, Git, Vercel |

---

## 프로젝트 (`/data/projects.ts`)

### 1. Yundo Ceramics

| 항목 | 값 |
|------|----|
| 부제목 | 한/영 다국어 도자기 이커머스, 풀 프론트엔드 프로젝트 |
| 설명 | 한국 전통 도자기 D2C 웹사이트. 다국어·결제·장바구니까지 프론트엔드 단독 구축 |
| 기간 | 2025.04 ~ 2025.05 |
| 팀 | 1명 |
| 상태 | active |
| 스택 | TypeScript, Next.js, Tailwind CSS, Supabase |
| GitHub | https://github.com/Imjungjuna/portfolio-D2C-commerce-site |
| 데모 | https://yundo-ceramics.vercel.app/ |

**기술 선택 이유:**

- **next-intl**: react-i18next는 클라이언트 중심이라 Server Component에서 번역을 가져오려면 우회가 필요했다. next-intl은 App Router의 [locale] 세그먼트를 네이티브로 지원해서 선택
- **Zustand (persist)**: Context API는 Provider 중첩과 리렌더링 문제, Redux는 이 규모에 보일러플레이트가 과했다. create 한 줄로 스토어 생성, persist 미들웨어 하나로 localStorage 연동 완료
- **토스페이먼츠**: 한국 시장 타겟에서 문서가 가장 잘 되어있고, 위젯 방식으로 결제 UI를 제공해 커스텀 폼이 불필요했다

**핵심 구현:**

- Zustand SSR Hydration 문제 해결
- 'use client' 경계 설계: 상품 상세는 서버 컴포넌트로 데이터를 가져오고, 장바구니 버튼·이미지 갤러리처럼 인터랙션이 필요한 부분만 클라이언트로 분리
- 결제 보안: SDK는 클라이언트에서 위젯 렌더링, 최종 승인(confirm)은 Route Handler에서 시크릿 키로 서버사이드 처리
- 한글 폰트 최적화: Noto Serif KR은 용량이 커서 preload: false 설정, display: 'swap'으로 FOUT를 허용하되 레이아웃 시프트 최소화

---

### 2. Stock Backtester

| 항목 | 값 |
|------|----|
| 부제목 | 미국 당일 급등주 차트 패턴 검증 플랫폼 |
| 설명 | VCP·컵앤핸들 등 데이트레이딩 패턴을 1분봉 데이터로 백테스팅. 조건별 ON/OFF 토글로 수익률 변화를 실시간 검증. |
| 기간 | 2026.03 ~ 2026.04 |
| 팀 | 1명 |
| 상태 | active |
| 스택 | TypeScript, Next.js, SQLite, TradingView Lightweight Charts, shadcn/ui, Tailwind CSS v4 |
| GitHub | — |
| 데모 | https://us-stock-trading-backtester.vercel.app/ |

**기술 선택 이유:**

- **TradingView Lightweight Charts**: Recharts·D3는 SVG 기반이라 1분봉 수천 개 렌더링 시 버벅임. Lightweight Charts는 캔버스 기반으로 캔들스틱 + 거래량 오버레이를 네이티브 지원, 금융 차트에 특화
- **better-sqlite3 (WAL 모드)**: 백테스팅은 OHLCV 수천 행을 순차 스캔하는 작업. ORM 추상화 레이어가 성능 병목. WAL 모드로 새 데이터 fetch 중에도 읽기 차단 없음

**핵심 구현:**

- `TOGGLEABLE_CONDITIONS` export 구조로 전략 코드와 UI 완전 디커플링. 새 전략 추가 시 배열 하나만 추가하면 체크박스 자동 생성
- 비활성 조건 목록을 `options.disabledConditions`로 전달해 조건별 ON/OFF 수익률 실시간 검증
- 매수/매도 신호를 차트 마커로 표시, 각 거래 진입가·청산가·수익률 테이블 집계
- 고정 자본 $100 기준 1R 도달 시 50% 부분 익절 시뮬레이션으로 실전에 가까운 결과 산출

---

### 3. CNS Fatigue Tracker

| 항목 | 값 |
|------|----|
| 부제목 | 운동인을 위한 CNS 피로도 측정·관리, 웹 애플리케이션 |
| 설명 | 수면·컨디션·운동 부하 데이터 기반 피로도 산출. 도메인 로직 직접 설계 + Server Actions 실전 적용 |
| 기간 | 2026.02 ~ 2025.04 |
| 팀 | 1명 |
| 상태 | active |
| 스택 | TypeScript, Next.js, Tailwind CSS, Supabase |
| GitHub | https://github.com/Imjungjuna/my-personal-tracker |
| 데모 | https://jungjun-personal-tracker.vercel.app/ |

**기술 선택 이유:**

- **Next.js RSC**: 서버에서 직접 Supabase 쿼리 → API Key 클라이언트 비노출, 번들에서 Supabase SDK 제외, 인증→온보딩→데이터 패칭을 하나의 async 함수로 순차 처리
- **Server Actions**: API route 없이 폼 제출→서버 로직→redirect를 하나의 흐름으로. 단, 배열 데이터를 FormData로 다루는 한계를 체감하고 API route 전환 판단 기준을 세움
- **Supabase (vs Firebase)**: SQL 기반이라 프로필↔운동종목↔일일기록 관계형 모델링이 자연스럽고, Google OAuth 설정이 한 줄로 끝남

**핵심 구현:**

- CNS 피로도 알고리즘 직접 설계 (수면·컨디션·운동 부하 가중치 통합)
- Supabase Auth + @supabase/ssr로 쿠키 기반 SSR 인증 구현, Server Component에서 getUser()로 인증 상태 직접 확인
- 회원가입 직후 모든 정보를 한번에 받는 대신, 멀티스텝 온보딩으로 분리해 이탈률을 줄이는 UX 패턴 적용
- onboarding_completed 플래그로 미완료 사용자를 모든 페이지에서 온보딩으로 리다이렉트하는 가드 구현

---

### 3. 교내 동아리 홍보 사이트

| 항목 | 값 |
|------|----|
| 부제목 | 코딩동아리 신규모집 홍보용, 정적 웹사이트 개발 |
| 설명 | 동아리 홍보·네트워킹 사이트. 디자인 시행착오를 빠르게 반영하기 위해 Next.js + Tailwind 선택 |
| 기간 | 2025.02 ~ 2025.03 |
| 팀 | 1명 |
| 상태 | active |
| 스택 | TypeScript, Next.js, Tailwind CSS |
| GitHub | https://github.com/skku-comit/comit.main-frontend.git |
| 데모 | https://comit-main-frontend.vercel.app/ |

**기술 선택 이유:**

단순 홍보 페이지지만 동적 애니메이션과 잦은 디자인 수정이 필요했다. 정적 HTML로는 반복적인 CSS 수정이 비효율적. Tailwind의 유틸리티 접근이 디자인 시행착오를 빠르게 반영하는 데 적합했고, 홍보 목적상 SEO도 고려해야 했기 때문에 Next.js 선택.

**핵심 구현:**

- Framer Motion으로 페이지 전환, 스크롤 트리거 카운팅 애니메이션 등 사용자 상호작용 구현
- TechMarquee 같은 커스텀 컴포넌트로 기술 스택 섹션을 동적으로 전시
- 재사용 가능한 UI 요소를 분리해 명확한 컴포넌트 기반 아키텍처로 구조화
- TypeScript 전면 적용으로 컴포넌트와 데이터 구조 전반의 타입 안전성 확보
- ESLint + Prettier 설정으로 일관된 코드 스타일 적용

---

### 4. CAMS

| 항목 | 값 |
|------|----|
| 부제목 | 대학교 코딩동아리 활동관리, 웹 프론트엔드 개발 (5인 팀 협업) |
| 설명 | 첫 팀 협업 프로젝트. 스키마 설계부터 참여하며 협업 프로세스와 의사결정을 경험 |
| 기간 | 2024.06 ~ 2025.04 |
| 팀 | 5명 (FE 2, BE 2, INFRA 1) |
| 상태 | inactive |
| 스택 | TypeScript, Next.js, Tailwind CSS, Spring Boot |
| GitHub | https://github.com/skku-comit/comit-website.git |
| 데모 | https://comit-cams.vercel.app/ |

**왜 이 프로젝트가 중요한가:**

Postman 사용법도 몰랐던 상태에서 시작한 첫 팀 프로젝트. 스키마 설계부터 참여하며 백엔드와의 소통 방식을 배움. 간단해 보이는 프로젝트도 스키마 구조, 일정 조율에서 의사결정 충돌이 일어날 수 있다는 걸 체감. 코드 실력보다 협업 근육을 키운 프로젝트 — GitHub 이슈·PR 템플릿으로 협업 프로세스를 표준화.

**핵심 구현:**

- 스터디 목록 조회, 개설, 상세 정보 확인 및 세부 페이지 개발
- Zod + React Hook Form으로 회원가입 폼 유효성 검증 구현
- Next.js 서버 액션으로 라이브러리 없이 로그인 세션 관리
- Tailwind CSS + shadcn/ui 기반 컴포넌트 시스템 구축
- Framer Motion 활용 애니메이션, HeightPopulatedDiv로 푸터 동적 높이 관리
- TypeScript 기반 타입 안전성 확보 및 절대 경로 별칭(@/*) 설정

---

## 연락처 (`/components/contact.tsx`)

| 항목 | 값 |
|------|----|
| 헤딩 | 감사합니다 |
| 부제목 | 누구나, 언제든지, 무엇이든 편하게 연락주세요 |
| 전화번호 | 010.4740.3604 |
| 이메일 | dalbichi9801@gmail.com |
| GitHub | @imjungjuna — https://github.com/Imjungjuna |

---

## 푸터 (`/components/footer.tsx`)

| 항목 | 값 |
|------|----|
| 이름 | 임정준 |
| 저작권 | © [Year] All rights reserved. |
| GitHub | @imjungjuna — https://github.com/Imjungjuna |
| 이메일 | dalbichi9801@gmail.com |

빠른 링크: About (`/about`), Projects (`#projects`), Skills (`#skills`), Contact (`#contact`)
