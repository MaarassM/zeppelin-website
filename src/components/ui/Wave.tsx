import { cn } from "@/lib/utils";

// Back paths start and end flat at the same height, so two copies side by side
// tile without a seam and the layer can drift sideways in a loop.
const SHAPES = [
  {
    back: "M0,36 C120,36 240,12 420,12 S720,52 900,52 S1260,36 1440,36 L1440,100 L0,100 Z",
    front: "M0,58 C160,34 320,30 500,48 C680,66 820,82 1000,66 C1180,50 1320,44 1440,58 L1440,100 L0,100 Z",
  },
  {
    back: "M0,44 C180,44 300,20 540,20 S900,60 1140,52 S1320,44 1440,44 L1440,100 L0,100 Z",
    front: "M0,62 C200,80 380,44 620,56 C860,68 1040,40 1240,52 C1340,58 1400,64 1440,62 L1440,100 L0,100 Z",
  },
  {
    back: "M0,30 C160,30 320,56 560,50 S960,14 1180,20 S1340,30 1440,30 L1440,100 L0,100 Z",
    front: "M0,54 C220,72 420,74 640,58 C860,42 1060,36 1260,50 C1350,56 1410,56 1440,54 L1440,100 L0,100 Z",
  },
];

interface WaveProps {
  /** CSS color of the section below, e.g. "var(--color-cream)" */
  fill: string;
  /** Color of the drifting back layer; defaults to the deep brand red */
  back?: string;
  backOpacity?: number;
  variant?: 0 | 1 | 2;
  flip?: boolean;
  className?: string;
}

export function Wave({
  fill,
  back = "var(--color-red-deep)",
  backOpacity = 1,
  variant = 0,
  flip = false,
  className,
}: WaveProps) {
  const shape = SHAPES[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-px z-10 h-14 overflow-hidden sm:h-16 lg:h-24",
        flip && "-scale-x-100",
        className
      )}
    >
      {/* Back layer drifts slowly for a sense of moving water */}
      <div className="wave-drift absolute inset-y-0 left-0 flex w-[200%]">
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="block h-full w-1/2"
          >
            <path d={shape.back} fill={back} fillOpacity={backOpacity} />
          </svg>
        ))}
      </div>

      {/* Front layer: solid edge that meets the next section */}
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
      >
        <path d={shape.front} fill={fill} />
      </svg>
    </div>
  );
}
