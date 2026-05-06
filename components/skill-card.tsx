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
            <div key={skill.name}
                 className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm transition-colors hover:bg-muted">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <span className="text-xs font-medium">{skill.name.slice(0, 2)}</span>
              </div>
              {skill.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
