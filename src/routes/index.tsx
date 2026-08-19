import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActivity } from "@/lib/activity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft professional emails, summarise meeting notes and plan your workday with one AI-powered workplace productivity platform.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "One AI workspace for professional emails, meeting summaries and prioritised task plans.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    to: "/email-generator",
    icon: Mail,
    title: "Smart Email Generator",
    description:
      "Turn a few notes into a polished workplace email with subject line, greeting, message and closing — in the tone you choose.",
    cta: "Open Email Generator",
  },
  {
    to: "/meeting-summarizer",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    description:
      "Paste raw meeting notes and get a structured summary with discussion points, decisions, action items, owners and deadlines.",
    cta: "Open Meeting Summarizer",
  },
  {
    to: "/task-planner",
    icon: ListChecks,
    title: "AI Task Planner",
    description:
      "Enter your tasks and receive a practical daily or weekly plan ordered by priority, urgency and estimated effort.",
    cta: "Open Task Planner",
  },
] as const;

function Dashboard() {
  const { items, clear } = useActivity();

  return (
    <div className="space-y-8">
      <section className="card-elevated overflow-hidden rounded-2xl border border-border bg-card">
        <div className="bg-gradient-brand px-6 py-8 sm:px-10 sm:py-10">
          <Badge className="mb-4 bg-brand-foreground/15 text-brand-foreground hover:bg-brand-foreground/20">
            Workplace AI toolkit
          </Badge>
          <h1 className="text-2xl font-semibold text-brand-foreground sm:text-4xl">
            AI Workplace Productivity Assistant
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-foreground/90 sm:text-base">
            Welcome back. Save time on the everyday admin that slows your team down — drafting
            emails, writing up meetings and planning your workload — all in one integrated place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link to="/email-generator">
                Start with an email <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-foreground/40 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link to="/about">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Your tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ to, icon: Icon, title, description, cta }) => (
            <Card key={to} className="card-elevated flex flex-col border-border">
              <CardHeader>
                <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-brand-soft">
                  <Icon className="size-5 text-brand" aria-hidden="true" />
                </span>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="leading-relaxed">{description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild className="w-full">
                  <Link to={to}>{cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="card-elevated border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Recent activity</CardTitle>
              <CardDescription>The last things you generated on this device.</CardDescription>
            </div>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clear}>
                Clear
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
                Nothing yet. Generate an email, summary or plan and it will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.tool}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(item.at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="card-elevated border-border">
          <CardHeader>
            <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent">
              <ShieldCheck className="size-5 text-accent-foreground" aria-hidden="true" />
            </span>
            <CardTitle className="text-base">Use AI responsibly</CardTitle>
            <CardDescription className="leading-relaxed">
              Every output is a first draft. Review the facts, adjust the tone to your workplace and
              never paste confidential, sensitive or personal information into the tools.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
