"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ErgolytLogo } from "@/components/brand/ergolyt-logo";
import { APP_NAME } from "@/lib/constants";

export function HeaderBrand() {
  const pathname = usePathname();
  const [loadKey] = useState(() => crypto.randomUUID());
  const animationKey = `${pathname}-${loadKey}`;

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
    >
      <ErgolytLogo
        key={animationKey}
        animationKey={animationKey}
        className="h-7 w-9 shrink-0"
        animate
      />
      <span className="text-base font-semibold leading-none tracking-tight">
        {APP_NAME}
      </span>
    </Link>
  );
}
