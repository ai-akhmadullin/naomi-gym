import Image from "next/image";

import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { GalleryImage } from "@/types/marketing";

type GallerySectionProps = {
  title: string;
  subtitle: string;
  scrollerLabel: string;
  images: GalleryImage[];
};

export function GallerySection({ title, subtitle, scrollerLabel, images }: GallerySectionProps) {
  return (
    <SectionShell id="gallery">
      <SectionHeading title={title} subtitle={subtitle} />

      <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
        {images.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-2xl border border-(--color-border) bg-white">
            <Image
              src={image.src}
              alt={image.alt}
              width={680}
              height={520}
              className="aspect-4/3 h-auto w-full object-cover"
            />
          </article>
        ))}
      </HorizontalScroller>
    </SectionShell>
  );
}
