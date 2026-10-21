import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  icon: LucideIcon;
  name: string;
  image: string;
  href?: string;
  meta?: string;
  sizes?: string;
  imageClassName?: string;
  className?: string;
}

export function ActivityCard({
  icon: Icon,
  name,
  image,
  href,
  meta,
  sizes = "(max-width: 768px) 50vw, 25vw",
  imageClassName,
  className,
}: ActivityCardProps) {
  const classes = cn(
    "group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[20px] bg-dark/20 p-4 lg:p-5",
    href && "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
    className
  );

  const inner = (
    <>
      <Image
        src={image}
        alt={name}
        fill
        className={cn(
          "-z-10 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]",
          imageClassName
        )}
        sizes={sizes}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/0" />

      <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-black/30 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md lg:left-5 lg:top-5">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      {href && (
        <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white text-red transition-transform duration-500 ease-out-expo group-hover:rotate-45 lg:right-5 lg:top-5">
          <ArrowUpRight size={18} strokeWidth={2.25} />
        </span>
      )}

      <div className="flex flex-col gap-1.5">
        <p className="font-display text-xl leading-none text-white lg:text-2xl">{name}</p>
        {meta && <p className="text-[13px] leading-snug text-white/75">{meta}</p>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
