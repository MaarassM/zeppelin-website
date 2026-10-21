// Radno vrijeme — jedini izvor podataka za status "otvoreno/zatvoreno" i puni raspored.

export type Venue = "bar" | "fastfood" | "sports";
export type Season = "spring" | "summer" | "autumn" | "winter";

type MonthDay = readonly [month: number, day: number];

export type Period = {
  season: Season;
  /** prvi i zadnji dan razdoblja (uključivo); "to" prije "from" znači prijelaz preko Nove godine */
  from: MonthDay;
  to: MonthDay;
  days: readonly number[];
  open: string;
  close: string;
};

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;
const WEEKENDS = [6, 0] as const;

// Izvan navedenih razdoblja objekt je zatvoren.
// close "24:00" = ponoć; zatvaranje nakon ponoći piši kao npr. "26:00" (02:00 idući dan).
export const SCHEDULE: Record<Venue, readonly Period[]> = {
  bar: [
    { season: "summer", from: [6, 1], to: [9, 23], days: ALL_DAYS, open: "09:00", close: "24:00" },
    { season: "autumn", from: [9, 24], to: [12, 20], days: WEEKENDS, open: "09:00", close: "18:00" },
    { season: "winter", from: [12, 21], to: [3, 20], days: WEEKENDS, open: "09:00", close: "18:00" },
    { season: "spring", from: [3, 21], to: [5, 31], days: ALL_DAYS, open: "09:00", close: "22:00" },
  ],
  fastfood: [
    { season: "summer", from: [6, 1], to: [9, 15], days: ALL_DAYS, open: "10:00", close: "18:00" },
  ],
  sports: [
    { season: "summer", from: [6, 1], to: [9, 15], days: ALL_DAYS, open: "09:00", close: "20:00" },
  ],
};

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const formatTime = (minutes: number) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  return `${h === 0 ? "00" : h}:${String(m % 60).padStart(2, "0")}`;
};

export const isAllDays = (days: readonly number[]) => days.length === 7;
export const isWeekends = (days: readonly number[]) =>
  days.length === 2 && days.includes(6) && days.includes(0);

type LocalDate = { y: number; m: number; d: number };

function zagrebNow(ms: number): LocalDate & { minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zagreb",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), minutes: get("hour") * 60 + get("minute") };
}

const addDays = ({ y, m, d }: LocalDate, days: number): LocalDate => {
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() };
};

const inPeriod = ({ m, d }: LocalDate, { from, to }: Period) => {
  const md = m * 100 + d;
  const start = from[0] * 100 + from[1];
  const end = to[0] * 100 + to[1];
  return start <= end ? md >= start && md <= end : md >= start || md <= end;
};

const periodOn = (venue: Venue, date: LocalDate) => SCHEDULE[venue].find((p) => inPeriod(date, p)) ?? null;

function hoursOn(venue: Venue, date: LocalDate) {
  const period = periodOn(venue, date);
  const weekday = new Date(Date.UTC(date.y, date.m - 1, date.d)).getUTCDay();
  if (!period || !period.days.includes(weekday)) return null;
  return { open: toMinutes(period.open), close: toMinutes(period.close) };
}

export type HoursStatus =
  | { open: true; closesAt: number }
  | { open: false; next: { daysAhead: number; weekday: number; date: LocalDate; opensAt: number } | null };

export function getStatus(venue: Venue, ms: number): HoursStatus {
  const now = zagrebNow(ms);
  const today = hoursOn(venue, now);
  const yesterday = hoursOn(venue, addDays(now, -1));

  if (yesterday && yesterday.close > 1440 && now.minutes < yesterday.close - 1440) {
    return { open: true, closesAt: yesterday.close };
  }
  if (today && now.minutes >= today.open && now.minutes < today.close) {
    return { open: true, closesAt: today.close };
  }

  for (let i = today && now.minutes < today.open ? 0 : 1; i <= 366; i++) {
    const date = addDays(now, i);
    const hours = hoursOn(venue, date);
    if (hours) {
      const weekday = new Date(Date.UTC(date.y, date.m - 1, date.d)).getUTCDay();
      return { open: false, next: { daysAhead: i, weekday, date, opensAt: hours.open } };
    }
  }
  return { open: false, next: null };
}

export const coversWholeYear = (venue: Venue) => {
  for (let i = 0; i < 365; i++) {
    const date = new Date(Date.UTC(2027, 0, 1 + i));
    if (!periodOn(venue, { y: 2027, m: date.getUTCMonth() + 1, d: date.getUTCDate() })) return false;
  }
  return true;
};

export const currentPeriod = (venue: Venue, ms: number) => periodOn(venue, zagrebNow(ms));
