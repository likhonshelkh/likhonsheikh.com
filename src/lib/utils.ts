import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function formatDate(locale: Intl.DateTimeFormat, value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  return locale.format(date);
}
