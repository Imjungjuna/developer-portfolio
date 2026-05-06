import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const quickLinks = [
  { label: "About", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 pb-8">
      <Separator />
      <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">임정준</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}
               className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a href="https://github.com/Imjungjuna" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground transition-colors">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href="mailto:dalbichi9801@gmail.com"
             className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
