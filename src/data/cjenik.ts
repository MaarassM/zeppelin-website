// Cjenici prema Odluci o objavi cjenika proizvoda i usluga (NN 101/2026, 110/2026)
// i Odluci o isticanju dodatne cijene (NN 101/2026).
//
// Promjena cijene: dodaj NOVU verziju na POČETAK `versions` (kopija prethodne s
// novim cijenama), povećaj `no` i postavi `publishedAt`. Stare verzije ostavi
// barem 30 dana — one se objavljuju u arhivi. `anchor` (sidrena cijena) se NE
// mijenja: to je cijena na dan 10. 9. 2026. (za novu stavku: cijena prvog dana prodaje).

import { COMPANIES, type Company } from "@/data/companies";

export type PriceItem = {
  code?: string;
  name: string;
  note?: string;
  /** količina u litrama */
  size?: number;
  price: number;
  anchor: number;
  /** naziv posebnog oblika prodaje (npr. "Happy hour"), ako se cijena odnosi na njega */
  specialSale?: string;
};

export type PriceSection = { title: string; items: PriceItem[] };

export type PriceListVersion = {
  no: number;
  publishedAt: string;
  sections: PriceSection[];
};

export type PriceListSlug = "bar" | "fastfood" | "gelato";

export type PriceList = {
  slug: PriceListSlug;
  title: string;
  /** oznaka prodajnog mjesta u nazivu datoteke */
  outletCode: string;
  /** ugostitelj koji posluje ovim prodajnim mjestom */
  operator: Company;
  versions: PriceListVersion[];
};

export const OUTLET = {
  type: "Ugostiteljski objekt",
  name: "Zeppelin Beach Bar",
  address: "Saccorgiana bb, 52100 Pula",
  addressShort: "Saccorgiana bb Pula",
};

export const ANCHOR_DATE = "2026-09-10";

const BAR_V1: PriceSection[] = [
  {
    title: "Topli napitci / Warm drinks",
    items: [
      { name: "KAVA / COFFEE", price: 1.8, anchor: 1.8 },
      { name: "KAVA S MLIJEKOM MALA / COFFEE WITH MILK SMALL", price: 2.0, anchor: 2.0 },
      { name: "KAVA S MLIJEKOM VELIKA / COFFEE WITH MILK BIG", price: 2.2, anchor: 2.2 },
      { name: "CAPPUCCINO MALI / SMALL", price: 2.0, anchor: 2.0 },
      { name: "CAPPUCCINO VELIKI / BIG", price: 2.2, anchor: 2.2 },
      { name: "BIJELA KAVA / WHITE COFFEE", price: 2.7, anchor: 2.7 },
      { name: "NESCAFE", price: 2.8, anchor: 2.8 },
      { name: "KAVA SA ŠLAGOM MALA / COFFEE WITH CREAM SMALL", price: 2.0, anchor: 2.0 },
      { name: "KAVA SA ŠLAGOM VELIKA / COFFEE WITH CREAM BIG", price: 2.2, anchor: 2.2 },
      { name: "KAVA BEZ KOFEINA / DECAF COFFEE", price: 1.8, anchor: 1.8 },
      { name: "KAVA BEZ KOFEINA MALA / DECAF COFFEE WITH MILK SMALL", price: 2.0, anchor: 2.0 },
      { name: "KAVA BEZ KOFEINA VELIKA / DECAF COFFEE WITH MILK BIG", price: 2.2, anchor: 2.2 },
      { name: "BIJELA KAVA BEZ KOFEINA / DECAF WHITE COFFEE", price: 2.7, anchor: 2.7 },
      { name: "KAVA SA BILJNIM MLIJEKOM MALA / HERBAL COFFEE SMALL", price: 2.0, anchor: 2.0 },
      { name: "KAVA SA BILJNIM MLIJEKOM VELIKA / HERBAL COFFEE BIG", price: 2.2, anchor: 2.2 },
      { name: "BIJELA KAVA SA BILJNIM MLIJEKOM / HERBAL WHITE COFFEE", price: 2.7, anchor: 2.7 },
      { name: "ČAJ / TEA", price: 2.5, anchor: 2.5 },
      { name: "ČAJ S MEDOM / TEA WITH HONEY", price: 2.8, anchor: 2.8 },
      { name: "MED / HONEY", price: 0.3, anchor: 0.3 },
      { name: "MLIJEKO / MILK", price: 0.7, anchor: 0.7 },
      { name: "ŠLAG / CREAM", price: 0.8, anchor: 0.8 },
      { name: "KAKAO / CACAO", price: 3.0, anchor: 3.0 },
      { name: "MILK SHAKE JAGODA / MILK SHAKE STRAWBERRY", price: 4.5, anchor: 4.5 },
      { name: "OREO SHAKE WITH ICE CREAM", price: 4.5, anchor: 4.5 },
      { name: "ICE CAFFE WITH ICE CREAM", price: 4.5, anchor: 4.5 },
      { name: "MATCHA LATTE", price: 2.5, anchor: 2.5 },
    ],
  },
  {
    title: "Bezalkoholna pića / Non alcoholic drinks",
    items: [
      { name: "COCA-COLA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "FANTA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SCHWEPPES TONIK", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SCHWEPPES PURPLE TONIK", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SCHWEPPES PINK TONIK", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SCHWEPPES TANGERINA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SPRITE", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "PASARETA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "ORANGINA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "SPEZI", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "COCKTA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "LEDENI ČAJ / ICE TEA", size: 0.25, price: 3.3, anchor: 3.3 },
      { name: "PRIRODNI SOKOVI / NATURAL JUICES", size: 0.2, price: 3.3, anchor: 3.3 },
      { name: "CEDEVITA", size: 0.25, price: 2.5, anchor: 2.5 },
      { name: "LIMUNADA / LEMONADE", size: 0.25, price: 3.0, anchor: 3.0 },
      { name: "LIMUNADA / LEMONADE", size: 0.5, price: 3.3, anchor: 3.3 },
      { name: "LIMUNADA JAGODA / STRAWBERRY LEMONADE", size: 0.4, price: 3.6, anchor: 3.6 },
      { name: "PRIRODNO CIJEĐENA NARANČA / FRESH ORANGE JUICE", size: 0.2, price: 3.5, anchor: 3.5 },
      { name: "PRIRODNO CIJEĐENA NARANČA / FRESH ORANGE JUICE", size: 0.1, price: 1.8, anchor: 1.8 },
      { name: "MINERALNA VODA / MINERAL WATER", size: 0.33, price: 2.7, anchor: 2.7 },
      { name: "MINERALNA VODA / MINERAL WATER", size: 0.5, price: 3.0, anchor: 3.0 },
      { name: "MINERALNA VODA / MINERAL WATER", size: 1.5, price: 5.0, anchor: 5.0 },
      { name: "MINERALNA VODA OKUS / MINERAL WATER FLAVOURED", size: 0.33, price: 2.7, anchor: 2.7 },
      { name: "VODA NEGAZIRANA / STILL WATER", size: 0.33, price: 2.7, anchor: 2.7 },
      { name: "VODA NEGAZIRANA / STILL WATER", size: 0.5, price: 3.0, anchor: 3.0 },
      { name: "VODA NEGAZIRANA / STILL WATER", size: 1.5, price: 5.0, anchor: 5.0 },
      { name: "RED BULL", size: 0.25, price: 4.2, anchor: 4.2 },
    ],
  },
  {
    title: "Pivo / Beer",
    items: [
      { name: "PAN LAGER", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "PAN ZLATNI / GOLD", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "PAN TAMNI / DARK", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "PAN RADLER", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "BUDWEISER", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "BUDWEISER TAMNI / DARK", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "TUBORG", size: 0.33, price: 3.6, anchor: 3.6 },
      { name: "CARLSBERG", size: 0.33, price: 3.6, anchor: 3.6 },
      { name: "GRIMBERGEN BLONDE", size: 0.33, price: 4.0, anchor: 4.0 },
      { name: "GRIMBERGEN DOUBLE AMBRE", size: 0.33, price: 4.0, anchor: 4.0 },
      { name: "GRIMBERGEN BLANCHE", size: 0.33, price: 4.0, anchor: 4.0 },
      { name: "PIVO TOČENO / DRAFT BEER", size: 0.33, price: 3.5, anchor: 3.5 },
      { name: "PIVO TOČENO / DRAFT BEER", size: 0.5, price: 3.9, anchor: 3.9 },
      { name: "PIVO TOČENO STRANO / DRAFT BEER GRIMBERGEN", size: 0.3, price: 4.0, anchor: 4.0 },
      { name: "PIVO TOČENO STRANO / DRAFT BEER GRIMBERGEN", size: 0.5, price: 4.6, anchor: 4.6 },
      { name: "PAULANER WEISSBIER", size: 0.5, price: 4.4, anchor: 4.4 },
      { name: "FABRIKA BIRE JEDNA S MORA", size: 0.33, price: 4.0, anchor: 4.0 },
      { name: "FABRIKA BIRE PULSKI GRAND ALE", size: 0.33, price: 4.0, anchor: 4.0 },
      { name: "FABRIKA BIRE IPA", size: 0.33, price: 4.0, anchor: 4.0 },
    ],
  },
  {
    title: "Vino / Wine",
    items: [
      { name: "VINO BIJELO / WHITE WINE", size: 0.1, price: 2.2, anchor: 2.2 },
      { name: "VINO CRNO / RED WINE", size: 0.1, price: 2.2, anchor: 2.2 },
      { name: "VINO BUTELJA ROSE", size: 0.1, price: 5.0, anchor: 5.0 },
      { name: "VINO BUTELJA MUŠKAT / MOSCATO", size: 0.1, price: 5.0, anchor: 5.0 },
      { name: "VINO BUTELJA / WINE BOTTLE", size: 0.75, price: 30.0, anchor: 30.0 },
      { name: "PROŠEK / PROSECCO", size: 0.1, price: 3.5, anchor: 3.5 },
      { name: "GEMIŠT", size: 0.33, price: 3.7, anchor: 3.7 },
      { name: "GEMIŠT", size: 0.5, price: 4.2, anchor: 4.2 },
      { name: "BAMBUS", size: 0.3, price: 3.7, anchor: 3.7 },
      { name: "BAMBUS", size: 0.5, price: 4.2, anchor: 4.2 },
      { name: "SOMERSBY", size: 0.33, price: 3.9, anchor: 3.9 },
      { name: "SANGRIA", size: 0.3, price: 4.2, anchor: 4.2 },
      { name: "SANGRIA", size: 0.5, price: 7.0, anchor: 7.0 },
      { name: "SANGRIA", size: 1, price: 14.0, anchor: 14.0 },
    ],
  },
  {
    title: "Spritz cocktails",
    items: [
      { name: "HUGO", note: "elderflower, prosecco, sparkling water", price: 7.0, anchor: 7.0 },
      { name: "APEROL SPRITZ", note: "aperol, prosecco, sparkling water", price: 7.0, anchor: 7.0 },
      { name: "CAMPARI SPRITZ", note: "campari, prosecco, sparkling water", price: 7.0, anchor: 7.0 },
      { name: "TERANINO SPRITZ", note: "teranino, pink tonic water", price: 7.0, anchor: 7.0 },
      { name: "MANDARINETTO SPRITZ", note: "tangerine liqueur, prosecco, pink tonic", price: 7.0, anchor: 7.0 },
      { name: "LIMONCELLO SPRITZ", note: "lemon liqueur, prosecco, sparkling water", price: 7.0, anchor: 7.0 },
      { name: "EPULON SPRITZ", note: "bitter herbal liqueur, amaro, pink tonic", price: 7.0, anchor: 7.0 },
      { name: "SUMMER GIN SPRITZ", note: "gin, aperol, fanta", price: 7.0, anchor: 7.0 },
    ],
  },
  {
    title: "Kokteli / Cocktails",
    items: [
      { name: "BLUE HAWAII", note: "malibu, banana liqueur, blue curacao, pineapple juice", price: 9.0, anchor: 9.0 },
      { name: "CAIPIRINHA", note: "cachaca, lime juice, sparkling water", price: 10.0, anchor: 10.0 },
      { name: "CAIPIRINHA STRAWBERRY", note: "cachaca, lime juice, sparkling water, strawberry", price: 11.0, anchor: 11.0 },
      { name: "CUBA LIBRE", note: "rum, lime juice, coca-cola", price: 9.0, anchor: 9.0 },
      { name: "LONG ISLAND ICED TEA", note: "rum, gin, tequila, vodka, triple sec, lime, coca-cola", price: 11.0, anchor: 11.0 },
      { name: "MAI TAI", note: "rum, disaronno, triple sec, apricot, pineapple juice", price: 10.0, anchor: 10.0 },
      { name: "MOJITO", note: "rum, lime juice, sparkling water", price: 10.0, anchor: 10.0 },
      { name: "MOJITO STRAWBERRY", note: "rum, lime juice, sparkling water, strawberry", price: 11.0, anchor: 11.0 },
      { name: "PINA COLADA", note: "rum, cream, coconut, pineapple juice", price: 9.0, anchor: 9.0 },
      { name: "SEX ON THE BEACH", note: "vodka, peach liqueur, grenadine, orange juice", price: 9.0, anchor: 9.0 },
      { name: "TEQUILA SUNRISE", note: "tequila, grenadine, orange juice", price: 9.0, anchor: 9.0 },
      { name: "NEGRONI", note: "campari, martini rosso, gin, sparkling water", price: 10.0, anchor: 10.0 },
      { name: "MOSCOW MULE", note: "vodka, lime juice, ginger beer", price: 11.0, anchor: 11.0 },
      { name: "LONDON MULE", note: "gin, lime juice, ginger beer", price: 11.0, anchor: 11.0 },
      { name: "SKINNY BEACH COCKTAIL – SUGAR FREE", note: "vodka, lime, sparkling water", price: 8.0, anchor: 8.0 },
      { name: "COCKTAIL 1L", size: 1, price: 30.0, anchor: 30.0 },
    ],
  },
  {
    title: "Kokteli bez alkohola / Mocktails",
    items: [
      { name: "BABY KOKTEL / JUICE COCKTAIL", price: 8.0, anchor: 8.0 },
      { name: "MOJITO BEZALKOHOLNI / VIRGIN MOJITO", price: 8.0, anchor: 8.0 },
      { name: "MOJITO SA JAGODOM BEZALKOHOLNI / VIRGIN STRAWBERRY MOJITO", price: 8.0, anchor: 8.0 },
      { name: "PINA COLADA BEZALKOHOLNA / VIRGIN PINA COLADA", price: 8.0, anchor: 8.0 },
    ],
  },
  {
    title: "Shooters",
    items: [
      { name: "B-52", price: 5.0, anchor: 5.0 },
      { name: "BLOW JOB", price: 5.0, anchor: 5.0 },
    ],
  },
  {
    title: "Alkoholna pića / Alcoholic drinks",
    items: [
      { name: "AMARO", size: 0.03, price: 3.0, anchor: 3.0 },
      { name: "AMARO MONTENEGRO", size: 0.03, price: 3.2, anchor: 3.2 },
      { name: "PELINKOVAC", size: 0.03, price: 3.0, anchor: 3.0 },
      { name: "PELINKOVAC ANTIQUE", size: 0.03, price: 3.2, anchor: 3.2 },
      { name: "JAGERMEISTER", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "CYNAR", size: 0.03, price: 3.0, anchor: 3.0 },
      { name: "BACARDI CARTA BLANCA", size: 0.03, price: 3.4, anchor: 3.4 },
      { name: "HAVANA", size: 0.03, price: 3.7, anchor: 3.7 },
      { name: "CAPTAIN MORGAN RUM", size: 0.03, price: 3.4, anchor: 3.4 },
      { name: "CAPTAIN MORGAN SPICED RUM", size: 0.03, price: 3.4, anchor: 3.4 },
      { name: "BAILEYS", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "VODKA", size: 0.03, price: 3.0, anchor: 3.0 },
      { name: "MALIBU", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "TEQUILA", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "RAKIJE", note: "šljiva, biska, loza, travarica", size: 0.03, price: 3.0, anchor: 3.0 },
      { name: "LIKERI", note: "teranino, medica, borovniček", size: 0.03, price: 3.0, anchor: 3.0 },
    ],
  },
  {
    title: "Gin pića / Gin drinks",
    items: [
      { name: "GIN SAX", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "GIN SAX PINK", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "GIN BOMBAY SAPPHIRE", size: 0.03, price: 3.9, anchor: 3.9 },
      { name: "GIN HENDRICKS", size: 0.03, price: 3.9, anchor: 3.9 },
    ],
  },
  {
    title: "Whiskey",
    items: [
      { name: "JACK DANIELS", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "JACK DANIELS HONEY", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "JACK DANIELS APPLE", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "JAMESON", size: 0.03, price: 3.5, anchor: 3.5 },
      { name: "CHIVAS", size: 0.03, price: 3.7, anchor: 3.7 },
    ],
  },
  {
    title: "Zeppelin packs",
    items: [
      { name: "JACK DANIELS 1/1 + COLA 1,5 L", price: 115.0, anchor: 115.0 },
      { name: "VODKA 1/1 + COLA 1,5 L", price: 100.0, anchor: 100.0 },
      { name: "VODKA 1/1 + 4X RED BULL 0,25 L", price: 100.0, anchor: 100.0 },
      { name: "JAGERMEISTER 1/1 + COLA 1,5 L", price: 100.0, anchor: 100.0 },
      { name: "JAGERMEISTER 1/1 + 4X RED BULL 0,25 L", price: 100.0, anchor: 100.0 },
    ],
  },
];

const FASTFOOD_V1: PriceSection[] = [
  {
    title: "Hrana",
    items: [
      { code: "0019", name: "BURGER BEL PICHOTTO SPICY", price: 13.0, anchor: 13.0 },
      { code: "0020", name: "BURGER BACON ORIGINAL", price: 13.0, anchor: 13.0 },
      { code: "0021", name: "BURGER CHEESE", price: 13.0, anchor: 13.0 },
      { code: "0038", name: "BURGER CHICKEN", price: 13.0, anchor: 13.0 },
      { code: "0032", name: "BURGER VEGE CLASSIC", price: 11.0, anchor: 11.0 },
      { code: "0034", name: "BURGER BEL PICHOTTO TARTUFO", price: 15.0, anchor: 15.0 },
      { code: "0022", name: "LIGNJE porcija", price: 13.0, anchor: 13.0 },
      { code: "0028", name: "ĆEVAPČIĆI porcija", price: 13.0, anchor: 13.0 },
      { code: "0066", name: "SARDELE porcija", price: 10.0, anchor: 10.0 },
      { code: "0023", name: "POMMES FRITES", price: 5.0, anchor: 5.0 },
      { code: "0056", name: "HOT DOG", price: 7.0, anchor: 7.0 },
      { code: "0051", name: "TORTILLA PILETINA", price: 8.0, anchor: 8.0 },
      { code: "0052", name: "TORTILLA TUNA", price: 8.0, anchor: 8.0 },
      { code: "0053", name: "TORTILLA VEGE", price: 8.0, anchor: 8.0 },
      { code: "0024", name: "SALATA SIMPLE SALAD", price: 10.0, anchor: 10.0 },
      { code: "0025", name: "SALATA FUNKY CHICKEN", price: 10.0, anchor: 10.0 },
      { code: "0026", name: "SALATA FIT TUNA", price: 10.0, anchor: 10.0 },
      { code: "0035", name: "SALATA CAESAR", price: 10.0, anchor: 10.0 },
      { code: "0036", name: "SALATA ŠOPSKA", price: 10.0, anchor: 10.0 },
      { code: "0054", name: "PALAČINKE ČOKOLADA", price: 5.0, anchor: 5.0 },
      { code: "0055", name: "PALAČINKE MARMELADA", price: 5.0, anchor: 5.0 },
    ],
  },
  {
    title: "Prilozi",
    items: [
      { code: "0039", name: "KEČAP DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0040", name: "MAJONEZA DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0041", name: "KRASTAVCI DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0042", name: "TARTAR DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0043", name: "JAJE DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0044", name: "RAJČICA DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0046", name: "SIR DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0047", name: "PANCETA DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0048", name: "RUKOLA DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0049", name: "ZELENA SALATA DODATAK", price: 1.0, anchor: 1.0 },
      { code: "0050", name: "TARTUFATA DODATAK", price: 1.0, anchor: 1.0 },
    ],
  },
];

const GELATO_V1: PriceSection[] = [
  {
    title: "Sladoled",
    items: [
      { code: "0001", name: "SLADOLED KUGLICA", price: 2.0, anchor: 2.0 },
      { code: "0064", name: "SLATKI KORNET", price: 0.5, anchor: 0.5 },
    ],
  },
  {
    title: "Pakirani sladoledi i slatkiši",
    items: [
      { code: "0002", name: "MAGNUM SLADOLED", price: 4.0, anchor: 4.0 },
      { code: "0003", name: "CORNETTO VANILIJA / ČOKOLADA", price: 3.0, anchor: 3.0 },
      { code: "0006", name: "TWISTER ORANGE", price: 3.0, anchor: 3.0 },
      { code: "0007", name: "CALIPO LIMETA / COLA / JAGODA", price: 3.0, anchor: 3.0 },
      { code: "0009", name: "MAX X-POP", price: 2.0, anchor: 2.0 },
      { code: "0075", name: "GO CORNETTO", price: 5.0, anchor: 5.0 },
      { code: "0074", name: "BEN & JERRY'S 100 ml", price: 5.0, anchor: 5.0 },
      { code: "0073", name: "TIRAMISU 100 g", price: 5.0, anchor: 5.0 },
      { code: "0067", name: "BOUNTY, MARS, SNICKERS, TWIX BAR", price: 3.0, anchor: 3.0 },
      { code: "0071", name: "SNICKERS STICK", price: 4.0, anchor: 4.0 },
      { code: "0068", name: "HARIBO", price: 4.0, anchor: 4.0 },
    ],
  },
  {
    title: "Pića",
    items: [
      { code: "0058", name: "GRANITA", size: 0.3, price: 5.0, anchor: 5.0 },
      { code: "0061", name: "CIJEĐENI SOK – BOČICA", size: 0.3, price: 5.5, anchor: 5.5 },
      { code: "0062", name: "MILK SHAKE", size: 0.3, price: 5.5, anchor: 5.5 },
      { code: "0072", name: "SOK KOMBUCHA", size: 0.33, price: 5.0, anchor: 5.0 },
    ],
  },
  {
    title: "Hrana",
    items: [{ code: "0060", name: "VOĆNA SALATA", price: 6.0, anchor: 6.0 }],
  },
];

export const PRICE_LISTS: PriceList[] = [
  {
    slug: "bar",
    title: "Bar",
    outletCode: "BAR",
    operator: COMPANIES.brid,
    versions: [{ no: 1, publishedAt: "2026-10-21T08:00:00+02:00", sections: BAR_V1 }],
  },
  {
    slug: "fastfood",
    title: "Fast Food",
    outletCode: "FASTFOOD",
    operator: COMPANIES.zeppelin,
    versions: [{ no: 1, publishedAt: "2026-10-21T08:00:00+02:00", sections: FASTFOOD_V1 }],
  },
  {
    slug: "gelato",
    title: "Gelaterija",
    outletCode: "SLADOLED",
    operator: COMPANIES.zeppelin,
    versions: [{ no: 1, publishedAt: "2026-10-21T08:00:00+02:00", sections: GELATO_V1 }],
  },
];

export function getPriceList(slug: string): PriceList | undefined {
  return PRICE_LISTS.find((l) => l.slug === slug);
}
