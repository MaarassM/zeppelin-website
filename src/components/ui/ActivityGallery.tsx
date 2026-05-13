"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ActivityGalleryProps {
  images: string[];
}

export function ActivityGallery({ images }: ActivityGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const slides = images.map((src) => ({ src }));

  return (
    <section className="pt-12 lg:pt-20">
      <p className="text-dark/40 text-xs uppercase tracking-widest mb-6">
        Gallery
      </p>

      <div className="columns-2 md:columns-3 gap-3">
        {images.map((src, i) => (
          <div key={src} className="break-inside-avoid mb-3">
            <button
              type="button"
              className="block w-full overflow-hidden rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark/40 cursor-pointer"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={src}
                alt={`Gallery photo ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-auto"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
