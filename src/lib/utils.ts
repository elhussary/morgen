import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a local date format.
 * @param dateStr - The date string to format.
 * @param locale - The locale to use for formatting (default is 'en-US').
 * @returns The formatted date string.
 */
export const formatDateToLocal = (dateStr: string, locale = "en-US"): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};
