import Link from "next/link";

export function SkipNav() {
  return (
    <Link href="#main" className="skip-nav rounded-full bg-[color:var(--color-accent-strong)] px-4 py-2 text-sm text-white">
      Skip to content
    </Link>
  );
}
