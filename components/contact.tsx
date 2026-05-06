"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { fadeUp, staggerContainer } from "@/lib/animations";

const contacts = [
  { icon: Phone, label: "전화번호", value: "010.4740.3604" },
  { icon: Mail, label: "이메일", value: "dalbichi9801@gmail.com", href: "mailto:dalbichi9801@gmail.com" },
  { icon: GithubIcon, label: "GitHub", value: "@imjungjuna", href: "https://github.com/Imjungjuna" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="py-16"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
        감사합니다
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-2 text-muted-foreground">
        누구나, 언제든지, 무엇이든 편하게 연락주세요
      </motion.p>
      <motion.div variants={fadeUp}>
        <Card className="mt-8">
          <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-sm font-medium">{contact.value}</p>
                  </div>
                </div>
              );
              return contact.href ? (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-primary"
                >
                  {content}
                </a>
              ) : (
                <div key={contact.label}>{content}</div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
