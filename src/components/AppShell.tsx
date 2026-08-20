import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  HelpCircle,
  Menu,
  Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks },
  { to: "/about", label: "About / Help", icon: HelpCircle },
] as const;

export const RESPONSIBLE_AI_NOTICE =
  "Responsible AI Notice: AI-generated content may contain errors or inaccuracies. Always review and verify important information before using it in the workplace. Do not enter confidential, sensitive or personal information.";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
      <p className="px-3 pb-1 text-[11px] font-semibold tracking-[0.14em] text-sidebar-foreground/40 uppercase">
        Workspace
      </p>
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--sidebar-border)]"
                : "text-sidebar-foreground/70 hover:translate-x-0.5 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            )}
          >
            {active && (
              <span
                className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary"
                aria-hidden="true"
              />
            )}
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                active ? "text-sidebar-primary" : "text-sidebar-foreground/50",
              )}
              aria-hidden="true"
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}


function Brand() {
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-xl">
        <Sparkles className="size-5 text-brand-foreground" aria-hidden="true" />
      </span>
      <span className="font-display text-sm leading-tight font-semibold text-sidebar-foreground">
        AI Workplace
        <span className="block text-xs font-normal text-sidebar-foreground/60">
          Productivity Assistant
        </span>
      </span>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-7 border-r border-sidebar-border/60 bg-sidebar p-4 lg:flex">
        <Brand />
        <NavLinks />
        <div className="mt-auto rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3 text-[11px] leading-relaxed text-sidebar-foreground/60">
          Review all AI output before use. Avoid sharing confidential information.
        </div>
      </aside>


      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-none bg-sidebar p-4">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-2 flex flex-col gap-6">
                <Brand />
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-display text-sm font-semibold">AI Workplace Assistant</span>
        </header>

        <main className="flex-1 px-4 py-7 sm:px-6 lg:px-10 lg:py-12">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>


        <footer className="border-t border-border bg-surface px-4 py-5 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-5xl space-y-2">
            <p className="text-xs leading-relaxed text-muted-foreground">{RESPONSIBLE_AI_NOTICE}</p>
            <p className="text-xs text-muted-foreground/70">
              AI Workplace Productivity Assistant — built for professional teams.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
