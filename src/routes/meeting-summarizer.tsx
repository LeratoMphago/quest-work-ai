import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { NotebookPen, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AiOutput } from "@/components/AiOutput";
import { ResponsibleAiHint } from "@/components/ResponsibleAiHint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes } from "@/lib/ai.functions";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into a structured summary with key discussion points, decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Structured meeting summaries with decisions, action items and owners.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  const run = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const generate = async () => {
    if (notes.trim().length < 20) {
      setError("Please paste your meeting notes — at least a couple of sentences.");
      return;
    }
    setError("");
    setLoading(true);
    setAiError(null);
    try {
      const res = await run({ data: { notes } });
      setResult(res.text);
      logActivity("Meeting Summarizer", notes.split("\n")[0] || "Meeting notes summary");
    } catch (err) {
      setAiError(
        err instanceof Error ? err.message : "We couldn't summarise your notes. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={NotebookPen}
        title="Meeting Notes Summarizer"
        description="Paste your raw notes and get a clear summary with decisions, action items, owners and deadlines — based only on what you wrote."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elevated border-border">
          <CardHeader>
            <CardTitle className="text-base">Meeting notes</CardTitle>
            <CardDescription>
              Rough bullets are fine. Include names and dates if you want them in the summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Your notes *</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={16}
                placeholder={
                  "e.g. Weekly ops sync — 12 May\n- Lerato: Q2 budget still awaiting sign-off\n- Agreed to move launch to 3 June\n- Sipho to draft client update by Friday"
                }
                aria-invalid={!!error}
                className="resize-y text-sm leading-relaxed"
              />
              {error && (
                <p role="alert" className="text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>
            <Button onClick={generate} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Summarising…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate summary
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          title="Structured summary"
          value={result}
          onChange={setResult}
          loading={loading}
          error={aiError}
          onRegenerate={generate}
          canRegenerate={notes.trim().length >= 20}
          emptyHint="Your structured meeting summary will appear here, ready to edit and copy."
          rows={20}
        />
      </div>

      <ResponsibleAiHint />
    </div>
  );
}
