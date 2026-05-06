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
