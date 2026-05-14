import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillCategory } from "@/data/skills";

export function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Card className="-mx-6 md:mx-0 rounded-none md:rounded-xl">
      <CardHeader className="px-6 md:px-4">
        <CardTitle className="text-base">{category.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{category.subtitle}</p>
      </CardHeader>
      <CardContent className="px-6 md:px-4">
        <div className="w-fit md:w-full flex flex-row gap-2 sm:gap-3 mx-auto">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-center rounded-lg border border-dashed p-3 sm:aspect-square sm:p-0 transition-colors hover:bg-muted"
              title={skill.name}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
                aria-label={skill.name}
              >
                <path d={skill.svgPath} />
              </svg>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
