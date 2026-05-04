# Portfolio Website Design Spec

> min-hyuk.com 디자인/레이아웃 기반, 임정준 콘텐츠로 구성하는 포트폴리오

---

## 1. 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Component | shadcn/ui (New York style) |
| Theme | next-themes (다크/라이트 토글) |
| Animation | Framer Motion (2차 단계에서 추가) |
| Icons | Lucide React + devicon SVG |
| Code Highlight | shiki 또는 rehype-pretty-code |
| Font | Montserrat (영문) + 시스템 폰트 (한글 폴백) |

---

## 2. 페이지 구조

```
/ (메인 - 싱글페이지 스크롤)
├── Header (sticky)
├── Hero
├── Education
├── Projects
├── Skills
└── Contact + Footer

/project/[id] (프로젝트 상세 페이지)
```

---

## 3. 전역 레이아웃

### Header
- **좌측:** "임정준" (홈 링크)
- **우측:** Quick Links (About, Projects, Skills, Contact) + 다크/라이트 토글
- `sticky top-0`, 스크롤 시 `backdrop-blur` 배경
- 모바일: 햄버거 메뉴로 전환

### 컨테이너
- `max-w-3xl mx-auto` (min-hyuk.com과 동일한 좁은 중앙 정렬)

### 색상 시스템
- shadcn/ui 기본 테마 토큰: `background`, `card`, `foreground`, `muted-foreground`, `primary`
- `next-themes`로 다크/라이트 전환

### 폰트
- Montserrat (영문 메인) + 시스템 폰트 (한글 폴백)
- `antialiased` 적용

---

## 4. 섹션별 디자인

### 4-1. Hero

- **여백:** `py-32`, 좌측 정렬
- **구성 (위→아래):**
  1. 한줄 소개: "사용자와 동료의 경험을 고민합니다." (`text-muted-foreground`)
  2. 이름: "임정준" (`text-3xl font-bold`)
  3. 설명: "좋은 UI는 예쁜 게 아니라, 사용자의 뇌를 쉬게 하는 것입니다. 기술을 쓸 수 있는 것보다 **왜 그 기술인지**를 먼저 묻는 프론트엔드 개발자입니다." (`text-sm text-muted-foreground`)
  4. 개인 정보 그리드: 생년월일 | 전화번호 | 위치(서울) — 라벨+값 쌍
  5. CTA: "Available for work" 뱃지 + 이메일 링크
- **배경:** 클린한 단색 배경 (파티클 없음, 추후 추가 가능)

### 4-2. Education

- **라벨:** "Education" (`text-sm text-muted-foreground`)
- **카드:** shadcn Card 컴포넌트
  - 상단: 학교명 "성균관대학교" (`font-semibold`) + 기간 (`text-muted-foreground`)
  - 전공/학위: 플레이스홀더
  - 상세: bullet list (GPA, 수강 과목, 동아리 활동 등) — 플레이스홀더
  - 하단: 기술 뱃지 (Badge 컴포넌트)

### 4-3. Projects

- **라벨:** "Projects" (`text-sm text-muted-foreground`)
- **카드 그리드:** 1컬럼 세로 스택
- **카드 구성:**
  - 이미지 영역: 플레이스홀더 (`aspect-video rounded-lg`)
  - 프로젝트명 (`font-semibold`) + 상태 뱃지 (서비스 중 / 중단)
  - 기간 + 인원수 (`text-muted-foreground`)
  - 한줄 설명
  - 기술 태그 (Badge, `bg-muted`)
  - 링크 아이콘: GitHub, 배포 URL
  - 카드 클릭 → `/project/[id]`로 이동

#### 프로젝트 목록:
1. **Yundo Ceramics** — 한/영 다국어 도자기 이커머스 (TypeScript, Next.js, Tailwind, Supabase)
2. **CNS Fatigue Tracker** — 운동인 피로도 측정 웹앱 (TypeScript, Next.js, Tailwind, Supabase)
3. **교내 동아리 홍보 사이트** — CoMit 홍보/네트워킹 (TypeScript, Next.js, Tailwind)
4. **CAMS** — 코딩동아리 관리시스템 5인 협업 (TypeScript, Next.js, Tailwind, Spring Boot)

### 4-4. 프로젝트 상세 페이지 (`/project/[id]`)

- 뒤로가기 링크 (← Projects)
- 프로젝트 제목 + 메타 정보 (기간, 인원, 스택)
- 본문: 마크다운 스타일 렌더링 (h2, h3, p, ul)
- 코드 블록: 신택스 하이라이팅 (`shiki` 또는 `rehype-pretty-code`)
- 콘텐츠: 블루프린트의 "모달 세부 정보"를 그대로 활용
  - 왜 이 기술들을 선택했는가
  - 핵심 문제 해결
  - 서버/클라이언트 역할 분리 등

### 4-5. Skills

- **라벨:** "Skills" (`text-sm text-muted-foreground`)
- **3컬럼 그리드:** `md:grid-cols-3`, 모바일 1컬럼
- **카드 1 — Core:** React, Next.js, TypeScript, JavaScript / 부제: "핵심 프레임워크 & 언어"
- **카드 2 — Styling:** Tailwind CSS, Framer Motion, shadcn/ui / 부제: "UI & 인터랙션"
- **카드 3 — Infrastructure:** Supabase, Git, Vercel / 부제: "백엔드 & 배포"
- **아이템 스타일:** dashed border 아이콘 박스 (`aspect-square border-dashed rounded-lg`) + 아이콘 + 이름
- **호버:** `hover:bg-muted`

### 4-6. Contact

- **헤드라인:** "감사합니다" (`text-3xl font-bold`)
- **부제:** "누구나, 언제든지, 무엇이든 편하게 연락주세요" (`text-muted-foreground`)
- **연락처 카드 (shadcn Card):**
  - Phone: 010.4740.3604 (Phone 아이콘)
  - Email: dalbichi9801@gmail.com (Mail 아이콘, mailto 링크)
  - GitHub: @imjungjuna (Github 아이콘, 프로필 링크)

### 4-7. Footer

- `Separator` 구분선
- 좌측: "임정준" + `© 2025`
- 우측: 소셜 링크 아이콘 (GitHub, Email)
- Quick Links: About, Projects, Skills, Contact (스크롤 이동)
- `text-sm text-muted-foreground`

---

## 5. 구현 단계

### Phase 1: 기본 구조 (shadcn/ui)
1. shadcn/ui 초기화 + next-themes 설정
2. 글로벌 레이아웃 (Header, Container, Footer)
3. Hero 섹션
4. Education 섹션
5. Projects 섹션 (카드 목록)
6. Skills 섹션
7. Contact 섹션
8. 프로젝트 상세 페이지 (`/project/[id]`) + 코드 블록

### Phase 2: Framer Motion 애니메이션
- 스크롤 트리거 fade-in 애니메이션
- 카드 hover 효과
- 페이지 전환 애니메이션
- 헤더 스크롤 반응 효과

---

## 6. 데이터 관리

프로젝트 데이터는 로컬 TypeScript 파일로 관리 (`data/projects.ts`):

```typescript
type Project = {
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
  content: string; // 마크다운 또는 JSX
};
```

Education, Skills 데이터도 동일한 패턴으로 `data/` 디렉토리에서 관리.
