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
    <header className="mb-6 flex items-start gap-4 sm:mb-8">
      {Icon ? (
        <span className="bg-gradient-brand hidden size-11 shrink-0 items-center justify-center rounded-xl sm:flex">
          <Icon className="size-5 text-brand-foreground" aria-hidden="true" />
        </span>
      ) : null}
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      </div>
    </header>
  );
}
