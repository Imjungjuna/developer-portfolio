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
