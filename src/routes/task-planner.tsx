import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ListChecks, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AiOutput } from "@/components/AiOutput";
import { ResponsibleAiHint } from "@/components/ResponsibleAiHint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { planTasks } from "@/lib/ai.functions";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Organise workplace tasks by priority, urgency and effort, and generate a practical daily or weekly work plan with suggested times.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Turn a task list into a prioritised daily or weekly work plan.",
      },
    ],
  }),
  component: TaskPlanner;
});

function TaskPlanner() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [planType, setPlanType] = useState("daily");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const generate = async () => {
    if (!tasks.trim()) {
      setError("Add at least one task before generating a plan.");
      return;
    }
    setError("");
    setLoading(true);
    setAiError(null);
    try {
      const res = await run({ data: { tasks, timeframe, planType } });
      setResult(res.text);
      logActivity("Task Planner", `${planType === "daily" ? "Daily" : "Weekly"} work plan`);
    } catch (err) {
      setAiError(
        err instanceof Error ? err.message : "We couldn't build your plan. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="List what's on your plate and get a realistic plan ordered by priority, urgency and effort."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elevated border-border">
          <CardHeader>
            <CardTitle className="text-base">Your tasks</CardTitle>
            <CardDescription>One task per line. Add deadlines or context if you have them.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks *</Label>
              <Textarea
                id="tasks"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                rows={12}
                placeholder={
                  "Finalise Q2 budget — due Thursday\nReview supplier contract\nPrepare slides for Friday client meeting\nRespond to onboarding emails"
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="planType">Plan type</Label>
                <Select value={planType} onValueChange={setPlanType}>
                  <SelectTrigger id="planType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily plan</SelectItem>
                    <SelectItem value="weekly">Weekly plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Date or timeframe</Label>
                <Input
                  id="timeframe"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  placeholder="e.g. Monday 3 June, or this week"
                />
              </div>
            </div>

            <Button onClick={generate} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Building plan…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          title="Your work plan"
          value={result}
          onChange={setResult}
          loading={loading}
          error={aiError}
          onRegenerate={generate}
          canRegenerate={tasks.trim().length > 0}
          emptyHint="Your prioritised work plan will appear here, ready to edit and copy."
          rows={20}
        />
      </div>

      <ResponsibleAiHint />
    </div>
  );
}
