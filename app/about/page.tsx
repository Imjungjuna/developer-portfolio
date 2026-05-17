import { About } from "@/components/about";

export const metadata = {
  title: "About | 임정준",
  description: "임정준 프론트엔드 개발자 소개",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-8">
      <About />
    </main>
  );
}
