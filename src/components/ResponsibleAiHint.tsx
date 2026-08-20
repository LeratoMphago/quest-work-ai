import { ShieldCheck } from "lucide-react";
import { RESPONSIBLE_AI_NOTICE } from "@/components/AppShell";

export function ResponsibleAiHint() {
  return (
    <aside className="bg-gradient-surface flex items-start gap-3 rounded-xl border border-brand/20 p-4 shadow-[var(--shadow-card)]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
        <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold">Responsible AI</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {RESPONSIBLE_AI_NOTICE}
        </p>
      </div>
    </aside>
  );
}
