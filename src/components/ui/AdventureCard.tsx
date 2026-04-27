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
    <div className="relative flex flex-col justify-end gap-3 p-5 rounded-xl overflow-hidden min-h-[200px] lg:min-h-[240px]">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex flex-col gap-3">
        <p className="font-display text-white text-sm leading-tight">{name}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutbound(name)}
          className="flex items-center justify-center h-9 bg-red text-white text-xs font-display tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
