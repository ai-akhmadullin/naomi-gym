import type { SVGProps } from "react";

import type { IconName } from "@/types/marketing";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  // The default size must be conditional, not merely first: cn is a plain
  // string joiner, so "h-5 w-5" and a caller's "h-3.5" would BOTH land in the
  // class list and stylesheet order picks the winner — which in the generated
  // CSS was h-5, silently rendering every smaller icon at 20px.
  const callerSized = /(?:^|\s)[hw]-/.test(className ?? "");

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(!callerSized && "h-5 w-5", className)}
      {...props}
    >
      {name === "menu" ? (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      ) : null}
      {name === "close" ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : null}
      {name === "star" ? (
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor" stroke="none" />
      ) : null}
      {name === "chevron-down" ? <path d="m6 9 6 6 6-6" /> : null}
      {name === "map-pin" ? (
        <>
          <path d="M12 22s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ) : null}
      {name === "clock" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5l3 1.8" />
        </>
      ) : null}
      {name === "phone" ? (
        <path d="M22 16.8v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.8 1.8Z" />
      ) : null}
      {name === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      ) : null}
      {name === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {name === "facebook" ? (
        <path
          d="M13.5 21v-7h2.7l.8-3.3h-3.5V8.9c0-1 .3-1.8 1.8-1.8H17V4.1c-.3 0-1.4-.1-2.7-.1-2.8 0-4.8 1.7-4.8 4.9v1.8H7v3.3h2.5v7h4Z"
          fill="currentColor"
          stroke="none"
        />
      ) : null}
      {name === "dumbbell" ? (
        <>
          <path d="M8 12h8" />
          <path d="M8 8.5v7" />
          <path d="M16 8.5v7" />
          <path d="M5.5 10v4" />
          <path d="M18.5 10v4" />
        </>
      ) : null}
      {name === "layers" ? (
        <>
          <path d="m12 3 8.5 4.5-8.5 4.5L3.5 7.5 12 3Z" />
          <path d="m3.5 12 8.5 4.5 8.5-4.5" />
          <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
        </>
      ) : null}
      {name === "heart-handshake" ? (
        <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
      ) : null}
      {name === "sunrise" ? (
        <>
          <path d="M12 2v6" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m8 6 4-4 4 4" />
          <path d="M16 18a4 4 0 0 0-8 0" />
        </>
      ) : null}
      {name === "sparkles" ? (
        <>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
          <path d="M19 14l.7 1.9 1.8.6-1.8.7L19 19l-.7-1.8-1.8-.7 1.8-.6L19 14Z" />
        </>
      ) : null}
      {name === "users" ? (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ) : null}
      {name === "shield-check" ? (
        <>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
          <path d="m9 12 2 2 4-4" />
        </>
      ) : null}
      {name === "arrow-right" ? (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      ) : null}
      {/* The one icon that means "this leaves the site" — same 24-grid and
          stroke as arrow-right, rotated to the diagonal that convention has
          settled on for an outbound link. */}
      {name === "arrow-up-right" ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      ) : null}
      {name === "check" ? <path d="M20 6 9 17l-5-5" /> : null}
      {name === "quote" ? (
        <path
          d="M9.5 7C7.6 7 6 8.7 6 10.8c0 2 1.5 3.6 3.4 3.6.2 0 .5 0 .7-.1-.4 1.6-1.8 2.8-3.4 3l-.2 1.7c3.2-.3 5.7-3 5.7-6.6C12 9 11 7 9.5 7Zm9 0C16.6 7 15 8.7 15 10.8c0 2 1.5 3.6 3.4 3.6.2 0 .5 0 .7-.1-.4 1.6-1.8 2.8-3.4 3l-.2 1.7c3.2-.3 5.7-3 5.7-6.6C21 9 20 7 18.5 7Z"
          fill="currentColor"
          stroke="none"
        />
      ) : null}
      {name === "send" ? (
        <>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </>
      ) : null}
      {name === "message-circle" ? (
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      ) : null}
      {name === "whatsapp" ? (
        <>
          <path d="M12 21a9 9 0 1 0-7.9-4.7L3 21l4.7-1.1A9 9 0 0 0 12 21Z" />
          <path d="M9 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.6 1.4c0 .2 0 .3-.1.5l-.4.4c-.1.1-.2.3 0 .5a6 6 0 0 0 2.4 2.4c.2.1.4.1.5 0l.4-.5c.2-.1.3-.2.5-.1l1.4.6c.4.2.4.4.4.6v.5c0 .2-.1.5-.5.7-.4.2-1 .3-1.6.1a8 8 0 0 1-4.9-4.9c-.2-.6-.1-1.1.1-1.5Z" />
        </>
      ) : null}
      {name === "zalo" ? (
        <path d="M12 4c-4.4 0-8 2.9-8 6.5 0 2 1.1 3.8 3 5-.2.9-.8 1.9-1.5 2.7 1.4-.2 2.7-.7 3.7-1.4.9.2 1.8.2 2.8.2 4.4 0 8-2.9 8-6.5S16.4 4 12 4Z" />
      ) : null}
      {name === "chevron-left" ? <path d="m15 18-6-6 6-6" /> : null}
      {name === "chevron-right" ? <path d="m9 18 6-6-6-6" /> : null}
    </svg>
  );
}
