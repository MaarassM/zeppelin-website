"use client";

import { useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  SCHEDULE,
  coversWholeYear,
  currentPeriod,
  formatTime,
  getStatus,
  isAllDays,
  isWeekends,
  toMinutes,
  type HoursStatus,
  type Venue,
} from "@/lib/hours";

// Ticks once a minute; null during SSR/hydration so the static HTML never shows a stale status.
const subscribeMinute = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerMinute = () => null;

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

const VENUES: Venue[] = ["bar", "fastfood", "sports"];



interface OpeningHoursProps {
  tone?: "onRed" | "onLight";
  className?: string;
}

export function OpeningHours({ tone = "onRed", className }: OpeningHoursProps) {
  const { t, locale } = useT();
  const h = t.hours;
  const now = useSyncExternalStore(subscribeMinute, getMinute, getServerMinute);
  const light = tone === "onLight";
  const venueLabel = (venue: Venue) =>
    ({ bar: t.footer.hours_bar_label, fastfood: t.footer.hours_fastfood_label, sports: t.footer.hours_sports_label })[venue];

  // hr/de write "1. 6." (Intl would pad to "01. 06."); en/it read better with a month name.
  const formatDay = ([m, d]: readonly [number, number]) =>
    locale === "hr" || locale === "de"
      ? `${d}. ${m}.`
      : new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, {
          day: "numeric",
          month: "short",
          timeZone: "UTC",
        }).format(new Date(Date.UTC(2027, m - 1, d)));

  function describe(status: HoursStatus) {
    if (status.open) return fill(h.closes_at, { time: formatTime(status.closesAt) });
    const next = status.next;
    if (!next) return h.closed_season;
    const time = formatTime(next.opensAt);
    if (next.daysAhead === 0) return fill(h.opens_today, { time });
    if (next.daysAhead === 1) return fill(h.opens_tomorrow, { time });
    if (next.daysAhead < 7) return fill(h.opens_on, { day: h.days_on[next.weekday], time });
    const date = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(
      new Date(Date.UTC(next.date.y, next.date.m - 1, next.date.d))
    );
    return fill(h.opens_date, { date });
  }

  function daysLabel(days: readonly number[]) {
    if (isAllDays(days)) return h.all_days;
    if (isWeekends(days)) return h.weekends;
    return days.map((d) => h.days_short[d]).join(", ");
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ul className="flex flex-col gap-3">
        {VENUES.map((venue) => {
          const status = now === null ? null : getStatus(venue, now);
          return (
            <li key={venue} className="flex flex-col gap-1">
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest",
                  light ? "text-red" : "text-white/55"
                )}
              >
                {venueLabel(venue)}
              </p>
              {status === null ? (
                <span className={cn("h-[22px] w-48 animate-pulse rounded-md", light ? "bg-dark/10" : "bg-white/10")} />
              ) : (
                <p className={cn("flex items-center gap-2 text-[15px]", light ? "text-dark/80" : "text-white/85")}>
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      status.open
                        ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]"
                        : light
                          ? "bg-dark/30"
                          : "bg-white/40"
                    )}
                  />
                  <span>
                    <span className={cn("font-semibold", light ? "text-dark" : "text-white")}>
                      {status.open ? h.open : h.closed}
                    </span>
                    {" · "}
                    {describe(status)}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <details className="group">
        <summary
          className={cn(
            "inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-semibold transition-colors [&::-webkit-details-marker]:hidden",
            light ? "text-red hover:text-red-dark" : "text-white/70 hover:text-white"
          )}
        >
          {h.full}
          <ChevronDown size={16} className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="flex flex-col gap-3 pt-1">
          {VENUES.map((venue) => {
            const active = now === null ? undefined : currentPeriod(venue, now);
            const highlight = light ? "font-semibold text-dark" : "font-semibold text-white";
            return (
              <div key={venue} className="flex flex-col gap-1">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest",
                    light ? "text-red" : "text-white/55"
                  )}
                >
                  {venueLabel(venue)}
                </p>
                {SCHEDULE[venue].map((period) => (
                  <p
                    key={period.season}
                    className={cn("text-sm", light ? "text-dark/70" : "text-white/70", period === active && highlight)}
                  >
                    {h.seasons[period.season]} ({formatDay(period.from)} – {formatDay(period.to)}) —{" "}
                    {daysLabel(period.days)} — {formatTime(toMinutes(period.open))}–{formatTime(toMinutes(period.close))}
                  </p>
                ))}
                {!coversWholeYear(venue) && (
                  <p className={cn("text-sm", light ? "text-dark/70" : "text-white/70", active === null && highlight)}>
                    {h.rest_of_year_closed}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
