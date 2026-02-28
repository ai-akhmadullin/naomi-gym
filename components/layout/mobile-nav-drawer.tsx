"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { BUY_MEMBERSHIP_ROUTE } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Icon } from "@/components/ui/icon";

type DrawerLink = {
  label: string;
  href: string;
};

type MobileNavDrawerProps = {
  links: DrawerLink[];
};

export function MobileNavDrawer({ links }: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerLinks = [...links, { label: "Buy membership", href: BUY_MEMBERSHIP_ROUTE }];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  function onLinkClick(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) {
      closeDrawer();
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      closeDrawer();
      return;
    }

    const section = document.getElementById(href.slice(1));
    if (!section) {
      closeDrawer();
      return;
    }

    event.preventDefault();
    closeDrawer();

    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== href) {
        window.history.replaceState(null, "", href);
      }
    });
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="md:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-(--color-border) text-foreground"
          onClick={openDrawer}
        >
          <Icon name="menu" className="h-6 w-6" />
        </button>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />

          <Dialog.Content
            id="mobile-menu"
            aria-modal="true"
            className={cn(
              "fixed right-[calc(env(safe-area-inset-right)+0.50rem)] top-[calc(env(safe-area-inset-top)+0.50rem)] z-50",
              "flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem)] w-[66%] max-w-60 flex-col overflow-y-auto",
              "rounded-2xl border border-(--color-border) bg-white p-4 shadow-2xl",
              "transition-transform duration-200 ease-out",
              "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full",
            )}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              closeButtonRef.current?.focus();
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">
                Mobile navigation links for Naomi Gym.
              </Dialog.Description>

              <Dialog.Close asChild>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-(--color-border)"
                >
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {drawerLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-lg font-semibold text-foreground hover:bg-(--color-bg-muted)"
                      onClick={(event) => onLinkClick(item.href, event)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
