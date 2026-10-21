// Podaci iz sudskog registra (Trgovački sud u Pazinu). Prikazuju se na cjenicima
// i u podnožju stranice (čl. 21. Zakona o trgovačkim društvima).

export type CompanyId = "brid" | "zeppelin";

export type Company = {
  id: CompanyId;
  name: string;
  legalName: string;
  address: string;
  oib: string;
  mbs: string;
  court: string;
  director: string;
  /** temeljni kapital u eurima */
  shareCapital: number;
  /** null dok nije potvrđeno je li kapital uplaćen u cijelosti */
  capitalPaidInFull: boolean | null;
  vatId: string;
};

export const COMPANIES: Record<CompanyId, Company> = {
  brid: {
    id: "brid",
    name: "BRID d.o.o.",
    legalName:
      "BRID društvo s ograničenom odgovornošću za usluge i posredovanje u prometu roba, putnička agencija",
    address: "Ulica Proštinske bune 41, 52100 Pula",
    oib: "36570179559",
    vatId: "HR36570179559",
    mbs: "040152499",
    court: "Trgovački sud u Pazinu",
    director: "Danijel Birgmajer",
    shareCapital: 3200,
    capitalPaidInFull: null,
  },
  zeppelin: {
    id: "zeppelin",
    name: "ZEPPELIN BAR d.o.o.",
    legalName: "ZEPPELIN BAR društvo s ograničenom odgovornošću za ugostiteljstvo",
    address: "Ulica Proštinske bune 41, 52100 Pula",
    oib: "79786559193",
    vatId: "HR79786559193",
    mbs: "130113508",
    court: "Trgovački sud u Pazinu",
    director: "Danijel Birgmajer",
    shareCapital: 2640,
    capitalPaidInFull: null,
  },
};
