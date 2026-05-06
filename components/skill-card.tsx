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
              className="flex aspect-square items-center justify-center rounded-lg border border-dashed transition-colors hover:bg-muted"
              title={skill.name}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
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
