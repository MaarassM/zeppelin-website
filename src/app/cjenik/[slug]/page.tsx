import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PriceListPageClient } from "@/components/cjenik/PriceListPageClient";
import { PRICE_LISTS, getPriceList } from "@/data/cjenik";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRICE_LISTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/cjenik/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const list = getPriceList(slug);
  if (!list) return {};
  const title = `Cjenik ${list.title} | Zeppelin Beach Pula`;
  const url = `https://www.zeppelinbar.hr/cjenik/${list.slug}`;
  return {
    title,
    description: `Cjenik — ${list.title}, Zeppelin Beach, Saccorgiana plaža, Pula. Cijene u eurima s istaknutom sidrenom cijenom.`,
    alternates: { canonical: url },
    openGraph: { title, url, siteName: "Zeppelin Beach Complex", locale: "hr_HR", type: "website" },
  };
}

export default async function PriceListPage({ params }: PageProps<"/cjenik/[slug]">) {
  const { slug } = await params;
  const list = getPriceList(slug);
  if (!list) notFound();
  return <PriceListPageClient slug={list.slug} />;
}
