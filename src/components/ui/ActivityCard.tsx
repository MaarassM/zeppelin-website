import Image from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  icon: LucideIcon;
  name: string;
  image: string;
  href?: string;
}

export function ActivityCard({ icon: Icon, name, image, href }: ActivityCardProps) {
  const className =
    "relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]";

  const inner = (
    <>
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {href && (
        <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
      )}
      <div className="relative flex flex-col gap-1">
        <Icon className="text-white/80 mb-1" size={22} strokeWidth={1.5} />
        <p className="font-display text-white text-sm leading-tight">{name}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
