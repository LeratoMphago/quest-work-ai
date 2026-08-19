import { Copy, Eraser, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error?: string | null;
  onRegenerate: () => void;
  canRegenerate: boolean;
  emptyHint: string;
  rows?: number;
};

export function AiOutput({
  title,
  value,
  onChange,
  loading,
  error,
  onRegenerate,
  canRegenerate,
  emptyHint,
  rows = 16,
}: Props) {
  const copy = async () => {
    if (!value.trim()) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy. Please select the text and copy manually.");
    }
  };

  return (
    <Card className="card-elevated border-border">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copy} disabled={!value.trim() || loading}>
            <Copy className="size-4" /> Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange("")}
            disabled={!value.trim() || loading}
          >
            <Eraser className="size-4" /> Clear
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate} disabled={!canRegenerate || loading}>
            <RefreshCw className="size-4" /> Regenerate
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3" role="status" aria-live="polite">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Generating with AI…
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : value ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            aria-label={`${title} — editable`}
            className="resize-y font-sans text-sm leading-relaxed"
          />
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            {emptyHint}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
