/* eslint-disable @next/next/no-img-element */
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/marketing";

type GalleryLightboxCopy = {
  close: string;
  prev: string;
  next: string;
  counter: string;
};

type GallerySectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  scrollerLabel: string;
  images: GalleryImage[];
  lightbox: GalleryLightboxCopy;
};

export function GallerySection({
  eyebrow,
  index,
  title,
  subtitle,
  scrollerLabel,
  images,
  lightbox,
}: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const go = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === null) {
          return current;
        }
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "ArrowLeft") {
        go(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, go]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    /* The page's dark act, and now more justified than when it held placeholder
       art: the six photographs are all of a black-steel shed shot under strip
       lights, so an ink ground continues the picture instead of framing it. It
       also breaks a run of seven light sections. */
    <SectionShell id="gallery" tone="ink" space="md">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} index={index} title={title} subtitle={subtitle} tone="dark" />
      </Reveal>

      <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator indicatorTone="dark">
        {images.map((image, position) => (
          <figure key={image.id} className="group relative">
            <button
              type="button"
              onClick={() => setActiveIndex(position)}
              className="relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] border border-white/10 transition-[transform,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-ink) group-hover:-translate-y-1 group-hover:border-white/25"
              aria-label={image.alt}
            >
              {/* Portrait frames, not the landscape ones the placeholder art
                  used. The real photographs are phone shots of a tall, open
                  shed — trusses, mezzanine, strip lights — and a 4:3 crop
                  sliced off the ceiling in every one of them, which is the
                  part that makes the room look big. 4:5 keeps the height and
                  reads as a photo strip rather than a row of thumbnails.
                  sizes matches the scroller's basis: 3 up at lg, 2 at md,
                  1 below, so the browser never fetches a 1200px file for a
                  380px card. */}
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={1500}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="aspect-4/5 h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {image.category}
              </span>
            </button>
          </figure>
        ))}
      </HorizontalScroller>

      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none sm:p-8">
            <Dialog.Title className="sr-only">{title}</Dialog.Title>

            <Dialog.Close
              aria-label={lightbox.close}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <Icon name="close" className="h-6 w-6" />
            </Dialog.Close>

            {active ? (
              <>
                <img
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[78vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
                />
                {/* Category and position only. The alt text used to print here
                    too, which meant a sighted reader got a sentence describing
                    what was already on screen in front of them — alt is written
                    for people who cannot see the photo, and it reads as filler
                    once it is made visible. It still does its real job on the
                    img above. */}
                <p className="mt-4 text-center text-sm font-semibold text-white sm:text-base">
                  {active.category}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {lightbox.counter
                    .replace("{current}", String((activeIndex ?? 0) + 1))
                    .replace("{total}", String(images.length))}
                </p>
              </>
            ) : null}

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={lightbox.prev}
                  className={cn(
                    "absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
                    "bg-white/10 text-white transition hover:bg-white/20 sm:left-6",
                  )}
                >
                  <Icon name="chevron-left" className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={lightbox.next}
                  className={cn(
                    "absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
                    "bg-white/10 text-white transition hover:bg-white/20 sm:right-6",
                  )}
                >
                  <Icon name="chevron-right" className="h-7 w-7" />
                </button>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </SectionShell>
  );
}
