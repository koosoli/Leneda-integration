export type ChartTimeBucket = "year" | "month" | "week" | "day" | "hour" | "quarter_hour";

export interface ChartTimeBucketOption {
  id: ChartTimeBucket;
  label: string;
  shortLabel: string;
  stepLabel: string;
  approxMs: number;
  maxBuckets: number;
}

export const CHART_TIME_BUCKETS: ChartTimeBucketOption[] = [
  { id: "year", label: "Year", shortLabel: "Yr", stepLabel: "year", approxMs: 365 * 86_400_000, maxBuckets: 30 },
  { id: "month", label: "Month", shortLabel: "Mo", stepLabel: "month", approxMs: 30 * 86_400_000, maxBuckets: 72 },
  { id: "week", label: "Week", shortLabel: "Wk", stepLabel: "week", approxMs: 7 * 86_400_000, maxBuckets: 104 },
  { id: "day", label: "Day", shortLabel: "Day", stepLabel: "day", approxMs: 86_400_000, maxBuckets: 370 },
  { id: "hour", label: "Hour", shortLabel: "Hr", stepLabel: "hour", approxMs: 3_600_000, maxBuckets: 744 },
  { id: "quarter_hour", label: "15 min", shortLabel: "15m", stepLabel: "15 minutes", approxMs: 15 * 60_000, maxBuckets: 672 },
];

export function getChartTimeBucketOption(bucket: ChartTimeBucket): ChartTimeBucketOption {
  return CHART_TIME_BUCKETS.find((option) => option.id === bucket) ?? CHART_TIME_BUCKETS[3];
}

export function getChartSpanMs(start?: string | null, end?: string | null): number {
  if (!start || !end) return 0;
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return 0;
  return Math.max(0, endMs - startMs);
}

export function isChartTimeBucketEnabled(bucket: ChartTimeBucket, spanMs: number): boolean {
  const option = getChartTimeBucketOption(bucket);
  if (spanMs <= 0) return bucket === "quarter_hour";
  const bucketCount = spanMs / option.approxMs;
  return bucketCount >= 1.5 && bucketCount <= option.maxBuckets;
}

export function getRecommendedChartTimeBucket(spanMs: number, current?: ChartTimeBucket): ChartTimeBucket {
  if (current && isChartTimeBucketEnabled(current, spanMs)) return current;

  const spanDays = spanMs / 86_400_000;
  const preferred: ChartTimeBucket =
    spanDays <= 1.25 ? "quarter_hour"
      : spanDays <= 7 ? "hour"
        : spanDays <= 45 ? "day"
          : spanDays <= 180 ? "week"
            : spanDays <= 900 ? "month"
              : "year";

  if (isChartTimeBucketEnabled(preferred, spanMs)) return preferred;

  return CHART_TIME_BUCKETS.find((option) => isChartTimeBucketEnabled(option.id, spanMs))?.id ?? "quarter_hour";
}

function getLastDayOfMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function shiftCalendarDate(date: Date, yearDelta: number, monthDelta: number): Date {
  const originalDay = date.getDate();
  const next = new Date(date);
  const targetMonthIndex = next.getMonth() + monthDelta;
  const targetYear = next.getFullYear() + yearDelta + Math.floor(targetMonthIndex / 12);
  const normalizedMonthIndex = ((targetMonthIndex % 12) + 12) % 12;
  const clampedDay = Math.min(originalDay, getLastDayOfMonth(targetYear, normalizedMonthIndex));

  next.setFullYear(targetYear, normalizedMonthIndex, clampedDay);
  return next;
}

export function shiftDateByChartBucket(date: Date, bucket: ChartTimeBucket, amount: number): Date {
  switch (bucket) {
    case "year":
      return shiftCalendarDate(date, amount, 0);
    case "month":
      return shiftCalendarDate(date, 0, amount);
    case "week":
      return new Date(date.getTime() + amount * 7 * 86_400_000);
    case "day":
      return new Date(date.getTime() + amount * 86_400_000);
    case "hour":
      return new Date(date.getTime() + amount * 3_600_000);
    case "quarter_hour":
      return new Date(date.getTime() + amount * 15 * 60_000);
  }
}

export function getShiftedChartRange(
  start: string | null | undefined,
  end: string | null | undefined,
  bucket: ChartTimeBucket,
  direction: -1 | 1,
): { start: Date; end: Date } | null {
  if (!start || !end) return null;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) {
    return null;
  }

  return {
    start: shiftDateByChartBucket(startDate, bucket, direction),
    end: shiftDateByChartBucket(endDate, bucket, direction),
  };
}

export function formatChartPeriodLabel(start?: string | null, end?: string | null): string {
  if (!start || !end) return "No period loaded";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) {
    return "No period loaded";
  }

  const sameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  if (sameDay) {
    const date = startDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const startTime = startDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    const endTime = endDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    return `${date}, ${startTime} - ${endTime}`;
  }

  return `${startDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} - ${endDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}
