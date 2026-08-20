import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActivity } from "@/lib/activity";
import { RESPONSIBLE_AI_NOTICE } from "@/components/AppShell";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    to: "/email-generator",
    icon: Mail,
    title: "Smart Email Generator",
    description: "Create clear, professional workplace emails in seconds.",
    cta: "Generate Email",
    accent: "from-brand/12 to-transparent",
  },
  {
    to: "/meeting-summarizer",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    description: "Turn lengthy meeting notes into clear summaries, decisions and action items.",
    cta: "Summarize Notes",
    accent: "from-accent/50 to-transparent",
  },
  {
    to: "/task-planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    description: "Organize your workload, prioritize tasks and create a practical work plan.",
    cta: "Plan My Tasks",
    accent: "from-success/15 to-transparent",
  },
] as const;

function Dashboard() {
  const { items, clear } = useActivity();

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="card-elevated relative overflow-hidden rounded-3xl border border-border">
        <div className="bg-gradient-hero px-6 py-10 sm:px-10 sm:py-14">
          <Badge className="mb-5 gap-1.5 border-none bg-brand-foreground/15 text-brand-foreground backdrop-blur hover:bg-brand-foreground/25">
            <Sparkles className="size-3.5" aria-hidden="true" /> Workplace AI toolkit
          </Badge>
          <h1 className="max-w-3xl text-3xl leading-tight font-semibold text-balance text-brand-foreground sm:text-4xl lg:text-5xl">
            AI Workplace Productivity Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-foreground/85 sm:text-base">
            Welcome back. Save time on the everyday admin that slows your team down — drafting
            emails, writing up meetings and planning your workload — all in one integrated place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/email-generator">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-foreground/40 bg-brand-foreground/5 text-brand-foreground backdrop-blur hover:bg-brand-foreground/15 hover:text-brand-foreground"
            >
              <Link to="/about">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold sm:text-2xl">My tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Three focused assistants for the tasks that eat your day.
          </p>
          <div className="divider-glow mt-4" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ to, icon: Icon, title, description, cta, accent }) => (
            <Card
              key={to}
              className="card-interactive group relative flex flex-col overflow-hidden rounded-2xl border-border bg-card"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accent}`}
                aria-hidden="true"
              />
              <CardHeader className="relative">
                <span className="bg-gradient-brand mb-3 flex size-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Icon className="size-5 text-brand-foreground" aria-hidden="true" />
                </span>
                <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
                <CardDescription className="leading-relaxed">{description}</CardDescription>
              </CardHeader>
              <CardContent className="relative mt-auto">
                <Button asChild className="w-full">
                  <Link to={to}>
                    {cta}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="card-elevated rounded-2xl border-border lg:col-span-2">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg">Recent activities</CardTitle>
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
              <div className="bg-gradient-surface flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-10 text-center">
                <span className="bg-gradient-brand mb-4 flex size-12 items-center justify-center rounded-2xl">
                  <Rocket className="size-6 text-brand-foreground" aria-hidden="true" />
                </span>
                <p className="text-base font-semibold">Your workspace is ready.</p>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your recent AI activities will appear here once you start using the productivity
                  tools.
                </p>
                <Button asChild className="mt-5">
                  <Link to="/email-generator">
                    Generate your first email <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-surface"
                  >
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

        <Card className="card-elevated bg-gradient-surface rounded-2xl border-brand/20">
          <CardHeader>
            <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-brand-soft">
              <ShieldCheck className="size-5 text-brand" aria-hidden="true" />
            </span>
            <CardTitle className="text-base sm:text-lg">Use AI responsibly</CardTitle>
            <CardDescription className="leading-relaxed">
              Every output is a first draft. Review the facts, adjust the tone to your workplace and
              never paste confidential, sensitive or personal information into the tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="rounded-xl border border-border bg-card/70 p-3 text-xs leading-relaxed text-muted-foreground">
              {RESPONSIBLE_AI_NOTICE}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
