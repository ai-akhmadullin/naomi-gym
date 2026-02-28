import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 space-y-2.5 sm:mb-12 sm:space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-pretty text-lg leading-relaxed text-(--color-text-muted) sm:text-xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
