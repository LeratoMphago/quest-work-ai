import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RESPONSIBLE_AI_NOTICE } from "@/components/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Help | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Learn how the AI Workplace Productivity Assistant works, how to get the best results from each tool, and how to use AI responsibly at work.",
      },
      { property: "og:title", content: "About & Help — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "How each AI tool works and how to use AI responsibly at work.",
      },
    ],
  }),
  component: About,
});

const faqs = [
  {
    q: "How does the Smart Email Generator work?",
    a: "You describe the purpose of the email, who it is for, any details that must be included and the tone you want. The assistant writes a structured email with a subject line, greeting, main message and closing. Only the details you supply are used — placeholders are left where information is missing.",
  },
  {
    q: "Will the Meeting Notes Summarizer add things I did not say?",
    a: "No. The summariser is instructed to work strictly from your notes. Where a decision, owner or deadline is not stated, it says so rather than guessing.",
  },
  {
    q: "How should I write my tasks for the planner?",
    a: "One task per line works best. Add a deadline, rough effort or context after the task if you have it, and set a date or timeframe so the plan matches your week.",
  },
  {
    q: "Can I edit the results?",
    a: "Yes. Every result appears in an editable area. You can rewrite it, copy it to your clipboard, clear it or regenerate a fresh version.",
  },
  {
    q: "Is my information stored?",
    a: "Your inputs are sent to the AI model to generate a result and are not saved to a server by this app. A short list of recent activity labels is kept in your own browser only.",
  },
];

function About() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={HelpCircle}
        title="About & Help"
        description="What this platform does, how to get strong results and how to use it responsibly."
      />

      <Card className="card-elevated border-border">
        <CardHeader>
          <CardTitle className="text-base">What this platform is</CardTitle>
          <CardDescription className="leading-relaxed">
            The AI Workplace Productivity Assistant brings three everyday workplace tasks into a
            single product: writing professional emails, turning messy meeting notes into structured
            summaries, and converting a task list into a realistic work plan. Each tool uses a
            carefully structured prompt that defines the assistant's role, your task, the
            information you supplied, the required output format and a firm instruction not to
            invent information.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="card-elevated border-border">
        <CardHeader>
          <CardTitle className="text-base">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-border bg-accent/40">
        <CardHeader>
          <CardTitle className="text-base">Responsible AI</CardTitle>
          <CardDescription className="leading-relaxed text-accent-foreground">
            {RESPONSIBLE_AI_NOTICE}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
