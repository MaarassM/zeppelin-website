import { MetadataRoute } from "next";

const BASE = "https://zeppelinbar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1.0, changeFrequency: "monthly" },
    { url: `${BASE}/bar`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/relax`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/jetski`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/wibit`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/tube`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/scuba`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/pedaline`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/sup`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/trampoline`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/fastfood`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/gelato`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/food`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/menu`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/careers`, priority: 0.5, changeFrequency: "monthly" },
  ];
}
