"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";

interface PackageDisplay {
  name: string;
  displayName: string;
  latestVersion: string;
  daysSincePublish: number;
  maintained: boolean;
  publishedAt: string;
}

type FetchState = "idle" | "loading" | "success" | "error";

type Copy = {
  title: string;
  description: string;
  button: string;
  loading: string;
  success: string;
  error: string;
  maintainedLabel: string;
  staleLabel: string;
  updatedLabel: (days: number) => string;
};

const copy: Record<Locale, Copy> = {
  en: {
    title: "Package health check",
    description: "Verify that the dependencies powering the template are still actively maintained.",
    button: "Check package status",
    loading: "Checking package health…",
    success: "Latest release data loaded.",
    error: "Unable to fetch package metadata. Try again in a moment.",
    maintainedLabel: "Maintained",
    staleLabel: "Needs attention",
    updatedLabel: (days) => (days === 0 ? "Updated today" : `Updated ${days} day${days === 1 ? "" : "s"} ago`),
  },
  bn: {
    title: "প্যাকেজের আপডেট অবস্থা",
    description: "এই টেমপ্লেটের প্রধান ডিপেনডেন্সি এখনো রক্ষণাবেক্ষণ হচ্ছে কি না তা যাচাই করুন।",
    button: "প্যাকেজ স্ট্যাটাস দেখুন",
    loading: "প্যাকেজের অবস্থা যাচাই হচ্ছে…",
    success: "সর্বশেষ রিলিজের তথ্য পাওয়া গেছে।",
    error: "প্যাকেজ তথ্য আনা গেল না। একটু পরে আবার চেষ্টা করুন।",
    maintainedLabel: "রক্ষণাবেক্ষিত",
    staleLabel: "দৃষ্টি দরকার",
    updatedLabel: (days) => (days === 0 ? "আজই আপডেট" : `${days} দিন আগে আপডেট`),
  },
};

const confettiPieces = [
  { x: -120, y: 140, delay: 0, rotation: [-15, 35], color: "var(--color-accent)", size: [12, 4] },
  { x: 40, y: 150, delay: 0.1, rotation: [10, -20], color: "#F97316", size: [10, 3] },
  { x: -60, y: 180, delay: 0.15, rotation: [-5, 25], color: "#10B981", size: [14, 4] },
  { x: 120, y: 160, delay: 0.2, rotation: [20, -10], color: "#6366F1", size: [10, 3] },
  { x: -20, y: 170, delay: 0.25, rotation: [-25, 20], color: "#FDE68A", size: [12, 3] },
  { x: 80, y: 140, delay: 0.3, rotation: [15, -30], color: "#EC4899", size: [9, 3] },
];

function ConfettiBurst({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  if (!active || reduceMotion) {
    return null;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {confettiPieces.map((piece, index) => (
        <motion.span
          key={index}
          className="absolute block rounded-sm"
          initial={{ opacity: 0, x: 0, y: 0, rotate: piece.rotation[0], scale: 0.9 }}
          animate={{ opacity: [0, 1, 0], x: piece.x, y: piece.y, rotate: piece.rotation[1], scale: 1 }}
          transition={{ duration: 1.4, delay: piece.delay, ease: "easeOut" }}
          style={{
            left: "50%",
            top: "10%",
            width: `${piece.size[0]}px`,
            height: `${piece.size[1]}px`,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
}

export function PackageMaintenanceSection({ locale }: { locale: Locale }) {
  const strings = copy[locale];
  const [status, setStatus] = useState<FetchState>("idle");
  const [packages, setPackages] = useState<PackageDisplay[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (status !== "success") {
      return;
    }

    const allMaintained = packages.every((pkg) => pkg.maintained);
    if (!allMaintained) {
      setShowConfetti(false);
      return;
    }

    setShowConfetti(true);
    const timeout = setTimeout(() => setShowConfetti(false), 1600);
    return () => clearTimeout(timeout);
  }, [packages, status]);

  const handleCheck = async () => {
    setStatus("loading");

    try {
      const response = await fetch("/api/maintenance");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as { packages: PackageDisplay[] };
      setPackages(data.packages);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const message = useMemo(() => {
    switch (status) {
      case "loading":
        return strings.loading;
      case "success":
        return strings.success;
      case "error":
        return strings.error;
      default:
        return strings.description;
    }
  }, [status, strings]);

  const statusColor = useMemo(
    () => ({
      maintained:
        "border-transparent bg-[color:var(--color-success)]/20 text-[color:var(--color-success-strong)]",
      stale:
        "border-transparent bg-[color:var(--color-warning)]/20 text-[color:var(--color-warning-strong)]",
    }),
    [],
  );

  return (
    <section
      id="maintenance"
      aria-labelledby="maintenance-title"
      className="relative overflow-hidden rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/85 p-8 shadow-sm"
    >
      <ConfettiBurst active={showConfetti} />
      <div className="space-y-3">
        <h2 id="maintenance-title" className="text-xl font-semibold text-[color:var(--color-foreground)]">
          {strings.title}
        </h2>
        <p className="text-sm text-[color:var(--color-foreground-muted)]">{strings.description}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="button" size="lg" onClick={handleCheck} disabled={status === "loading"}>
          {status === "loading" ? strings.loading : strings.button}
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-[color:var(--color-foreground-muted)]">
          {message}
        </p>
      </div>
      {packages.length > 0 ? (
        <ul role="list" className="mt-6 grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => {
            const maintained = pkg.maintained;
            return (
              <li
                key={pkg.name}
                className="rounded-2xl border border-[color:var(--color-surface-muted)] bg-white/90 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-[color:var(--color-foreground)]">{pkg.displayName}</h3>
                    <p className="text-xs text-[color:var(--color-foreground-muted)]">
                      v{pkg.latestVersion} · {strings.updatedLabel(pkg.daysSincePublish)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={maintained ? statusColor.maintained : statusColor.stale}
                    aria-label={maintained ? strings.maintainedLabel : strings.staleLabel}
                  >
                    {maintained ? strings.maintainedLabel : strings.staleLabel}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
