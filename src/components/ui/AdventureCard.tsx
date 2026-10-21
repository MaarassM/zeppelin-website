import Image from "next/image";
import { trackOutbound } from "@/lib/analytics";

interface AdventureCardProps {
  name: string;
  url: string;
  ctaLabel: string;
  image: string;
}

export function AdventureCard({
  name,
  url,
  ctaLabel,
  image,
}: AdventureCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutbound(name)}
      className="group relative isolate flex aspect-[3/4] flex-col justify-end gap-4 overflow-hidden rounded-[20px] bg-dark/20 p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="-z-10 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 25vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />

      <p className="font-display text-2xl leading-none text-white lg:text-[28px]">{name}</p>
      <span className="flex h-11 items-center justify-center rounded-full bg-red font-display text-xs tracking-widest text-white transition-colors duration-300 group-hover:bg-white group-hover:text-red">
        {ctaLabel}
      </span>
    </a>
  );
}
