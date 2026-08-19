import { Info } from "lucide-react";
import { RESPONSIBLE_AI_NOTICE } from "@/components/AppShell";

export function ResponsibleAiHint() {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{RESPONSIBLE_AI_NOTICE}</span>
    </p>
  );
}
