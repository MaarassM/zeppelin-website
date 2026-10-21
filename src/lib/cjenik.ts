import {
  ANCHOR_DATE,
  OUTLET,
  PRICE_LISTS,
  type PriceItem,
  type PriceList,
  type PriceListVersion,
} from "@/data/cjenik";

export type FileFormat = "csv" | "xml";

const TZ = "Europe/Zagreb";

function zagrebParts(iso: string) {
  const parts = new Intl.DateTimeFormat("hr-HR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { d: get("day"), m: get("month"), y: get("year"), h: get("hour"), min: get("minute") };
}

export function formatDateTime(iso: string) {
  const { d, m, y, h, min } = zagrebParts(iso);
  return `${d}.${m}.${y}. ${h}:${min}`;
}

export function formatDate(iso: string) {
  const { d, m, y } = zagrebParts(iso);
  return `${d}.${m}.${y}.`;
}

export function formatPrice(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export function formatSize(size: number) {
  return `${String(size).replace(".", ",")} l`;
}

export const currentVersion = (list: PriceList) => list.versions[0];

// Point VI.: oblik prodajnog objekta, adresa, oznaka, broj pohrane, datum i vrijeme slanja.
// ":" is not allowed in Windows file names, so the time is written as HH-MM.
export function versionFileName(list: PriceList, version: PriceListVersion, format: FileFormat) {
  const { d, m, y, h, min } = zagrebParts(version.publishedAt);
  const slug = (s: string) => s.replace(/,/g, "").trim().replace(/\s+/g, "-");
  return [
    slug(OUTLET.type).toLowerCase(),
    slug(OUTLET.addressShort),
    list.outletCode,
    String(version.no).padStart(3, "0"),
    `${d}.${m}.${y}`,
    `${h}-${min}`,
  ].join("_") + `.${format}`;
}

export const currentFileName = (list: PriceList, format: FileFormat) => `${list.slug}.${format}`;

export const fileHref = (fileName: string) => `/cjenik/datoteke/${encodeURIComponent(fileName)}`;

type Row = { section: string; item: PriceItem };

const rows = (version: PriceListVersion): Row[] =>
  version.sections.flatMap((s) => s.items.map((item) => ({ section: s.title, item })));

const CSV_HEADER = [
  "sifra",
  "naziv",
  "kategorija",
  "kolicina",
  "jedinica_mjere",
  "maloprodajna_cijena",
  "posebni_oblik_prodaje",
  "naziv_posebnog_oblika_prodaje",
  "sidrena_cijena",
  "datum_sidrene_cijene",
  "valuta",
];

function csvCell(value: string) {
  return /[";\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

// UTF-8 with BOM, ";" separator and decimal comma so it opens correctly in Croatian Excel.
export function toCsv(version: PriceListVersion) {
  const lines = [CSV_HEADER, ...rows(version).map(({ section, item }) => [
    item.code ?? "",
    item.note ? `${item.name} (${item.note})` : item.name,
    section,
    item.size !== undefined ? String(item.size).replace(".", ",") : "",
    item.size !== undefined ? "l" : "kom",
    formatPrice(item.price),
    item.specialSale ? "DA" : "NE",
    item.specialSale ?? "",
    formatPrice(item.anchor),
    ANCHOR_DATE,
    "EUR",
  ])];
  return "﻿" + lines.map((l) => l.map(csvCell).join(";")).join("\r\n") + "\r\n";
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toXml(list: PriceList, version: PriceListVersion) {
  const tag = (name: string, value: string, indent: string) =>
    `${indent}<${name}>${xmlEscape(value)}</${name}>`;
  const items = rows(version).map(({ section, item }) => {
    const i = "      ";
    return [
      "    <stavka>",
      item.code ? tag("sifra", item.code, i) : null,
      tag("naziv", item.name, i),
      item.note ? tag("opis", item.note, i) : null,
      tag("kategorija", section, i),
      item.size !== undefined ? tag("kolicina", String(item.size), i) : null,
      tag("jedinica_mjere", item.size !== undefined ? "l" : "kom", i),
      tag("maloprodajna_cijena", item.price.toFixed(2), i),
      `${i}<posebni_oblik_prodaje primijenjen="${item.specialSale ? "DA" : "NE"}">${xmlEscape(item.specialSale ?? "")}</posebni_oblik_prodaje>`,
      `${i}<sidrena_cijena datum="${ANCHOR_DATE}">${item.anchor.toFixed(2)}</sidrena_cijena>`,
      "    </stavka>",
    ].filter(Boolean).join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<cjenik broj_pohrane="${version.no}" datum_objave="${version.publishedAt}" valuta="EUR">`,
    "  <prodajni_objekt>",
    tag("oblik", OUTLET.type, "    "),
    tag("naziv", `${OUTLET.name} – ${list.title}`, "    "),
    tag("adresa", OUTLET.address, "    "),
    tag("oznaka", list.outletCode, "    "),
    "  </prodajni_objekt>",
    "  <stavke>",
    ...items,
    "  </stavke>",
    "</cjenik>",
    "",
  ].join("\n");
}

export type PublishedFile = {
  fileName: string;
  list: PriceList;
  version: PriceListVersion;
  format: FileFormat;
};

// Stable "<slug>.<format>" URLs always serve the newest version; versioned names are the archive.
export function allFiles(): PublishedFile[] {
  return PRICE_LISTS.flatMap((list) =>
    (["csv", "xml"] as const).flatMap((format) => [
      { fileName: currentFileName(list, format), list, version: currentVersion(list), format },
      ...list.versions.map((version) => ({
        fileName: versionFileName(list, version, format),
        list,
        version,
        format,
      })),
    ])
  );
}

export function renderFile({ list, version, format }: PublishedFile) {
  return format === "csv" ? toCsv(version) : toXml(list, version);
}
