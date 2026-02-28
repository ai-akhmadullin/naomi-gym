import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type IconName =
  | "menu"
  | "close"
  | "star"
  | "chevron-down"
  | "map-pin"
  | "clock"
  | "phone"
  | "mail"
  | "instagram"
  | "facebook";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
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
    </svg>
  );
}
