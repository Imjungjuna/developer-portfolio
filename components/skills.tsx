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
