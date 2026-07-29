import type { Locale } from "@/lib/i18n";

export const GYM_TIMEZONE = "Asia/Ho_Chi_Minh";

// Opening hours as minutes-from-midnight intervals, keyed by day of week
// (0 = Sunday … 6 = Saturday). Kept here as the single machine-readable source
// for the live "open now" badge. Keep in sync with the displayed hours.
const SCHEDULE: Record<number, Array<[number, number]>> = {
  0: [[6 * 60, 10 * 60 + 30], [14 * 60, 19 * 60]], // Sun: 6:00–10:30, 14:00–19:00
  1: [[5 * 60, 20 * 60 + 30]], // Mon–Sat: 5:00–20:30
  2: [[5 * 60, 20 * 60 + 30]],
  3: [[5 * 60, 20 * 60 + 30]],
  4: [[5 * 60, 20 * 60 + 30]],
  5: [[5 * 60, 20 * 60 + 30]],
  6: [[5 * 60, 20 * 60 + 30]],
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type OpenStatus = {
  open: boolean;
  /** Minutes-from-midnight of the next change (closing time if open, opening time if closed). */
  changeMinutes: number;
};

/** Current day-of-week and minutes-from-midnight in the gym's local timezone. */
function getGymNow(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: GYM_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const rawHour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const hour = rawHour === 24 ? 0 : rawHour; // some runtimes report midnight as 24
  const day = Math.max(0, WEEKDAYS.indexOf(weekday));

  return { day, minutes: hour * 60 + minute };
}

export function getOpenStatus(now: Date): OpenStatus {
  const { day, minutes } = getGymNow(now);
  const todayIntervals = SCHEDULE[day] ?? [];

  for (const [start, end] of todayIntervals) {
    if (minutes >= start && minutes < end) {
      return { open: true, changeMinutes: end };
    }
  }

  // Closed now — find the next opening time later today.
  for (const [start] of todayIntervals) {
    if (start > minutes) {
      return { open: false, changeMinutes: start };
    }
  }

  // Otherwise the next opening is on an upcoming day.
  for (let offset = 1; offset <= 7; offset += 1) {
    const intervals = SCHEDULE[(day + offset) % 7] ?? [];
    if (intervals.length > 0) {
      return { open: false, changeMinutes: intervals[0][0] };
    }
  }

  return { open: false, changeMinutes: 0 };
}

export function formatTime(totalMinutes: number, locale: Locale): string {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  if (locale === "vi") {
    return `${hour}:${String(minute).padStart(2, "0")}`;
  }

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
