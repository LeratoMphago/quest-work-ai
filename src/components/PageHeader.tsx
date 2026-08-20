import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <header className="mb-7 flex items-start gap-4 sm:mb-9">
      {Icon ? (
        <span className="bg-gradient-brand hidden size-12 shrink-0 items-center justify-center rounded-2xl shadow-[var(--shadow-card)] sm:flex">
          <Icon className="size-5 text-brand-foreground" aria-hidden="true" />
        </span>
      ) : null}
      <div>
        <h1 className="text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className="divider-glow mt-4 max-w-xs" />
      </div>
    </header>

  );
}
