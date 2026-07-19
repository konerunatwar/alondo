"use client";

import { useLayoutEffect, useState } from "react";
import { logoCells } from "@/lib/brand/logo-cells";
import { cn } from "@/lib/utils";

type ErgolytLogoProps = {
  className?: string;
  animate?: boolean;
  animationKey?: string;
};

type PixelPhase = 0 | 1 | 2;

const pixelColors = [
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
] as const;

const donePhases: PixelPhase[] = [2, 2, 2, 2, 2, 2];
const hiddenPhases: PixelPhase[] = [0, 0, 0, 0, 0, 0];

const PIXEL_STAGGER_MS = 100;
const PIXEL_COLOR_HOLD_MS = 500;

export function ErgolytLogo({
  className,
  animate = true,
  animationKey = "static",
}: ErgolytLogoProps) {
  const [phases, setPhases] = useState<PixelPhase[]>(
    animate ? hiddenPhases : donePhases,
  );

  useLayoutEffect(() => {
    if (!animate) {
      setPhases(donePhases);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhases(donePhases);
      return;
    }

    setPhases(hiddenPhases);

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    logoCells.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setPhases((current) => {
            const next = [...current];
            next[index] = 1;
            return next;
          });
        }, index * PIXEL_STAGGER_MS),
      );

      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setPhases((current) => {
            const next = [...current];
            next[index] = 2;
            return next;
          });
        }, index * PIXEL_STAGGER_MS + PIXEL_COLOR_HOLD_MS),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [animate, animationKey]);

  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0 text-foreground", className)}
    >
      {logoCells.map(([column, row], index) => {
        const phase = phases[index];

        return (
          <rect
            key={`${column}-${row}`}
            x={column * 8 + 1}
            y={row * 8 + 1}
            width={6}
            height={6}
            rx={1.75}
            fill={phase === 1 ? pixelColors[index] : "currentColor"}
            style={{
              opacity: phase === 0 ? 0 : 1,
              transform:
                phase === 0
                  ? "scale(0.2)"
                  : phase === 1
                    ? "scale(1.08)"
                    : "scale(1)",
              transformBox: "fill-box",
              transformOrigin: "center",
              transition:
                "opacity 0.28s ease, transform 0.28s ease, fill 0.35s ease",
            }}
          />
        );
      })}
    </svg>
  );
}
