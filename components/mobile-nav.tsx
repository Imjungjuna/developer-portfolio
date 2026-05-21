"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-accent hover:text-accent-foreground">
        <Menu className="h-5 w-5" />
        <span className="sr-only">메뉴 열기</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[60vw] sm:max-w-none">
        <SheetTitle className="sr-only">네비게이션</SheetTitle>
        <nav className="flex flex-col gap-4 px-6 pt-14 items-start">
          {navItems.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={<a href={item.href} className="nav-link text-base font-medium text-foreground hover:text-primary transition-colors text-left" />}
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
