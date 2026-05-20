"use client";

import Link from "next/link";

export function LogoLink() {
  return (
    <Link
      href="/"
      className="text-xl"
      aria-label="홈"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      🦊
    </Link>
  );
}
