import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AiOutput } from "@/components/AiOutput";
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
import { generateEmail } from "@/lib/ai.functions";
import { logActivity } from "@/lib/activity";
import { ResponsibleAiHint } from "@/components/ResponsibleAiHint";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with a subject line, greeting, message and closing in a formal, friendly, professional or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Draft professional workplace emails in seconds, in the tone you choose.",
      },
    ],
  }),
  component: EmailGenerator,
});

const tones = ["Formal", "Friendly", "Professional", "Persuasive"];

function EmailGenerator() {
  const run = useServerFn(generateEmail);
  const [topic, setTopic] = useState("");
  const [recipient, setRecipient] = useState("");
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState("Professional");
  const [errors, setErrors] = useState<{ topic?: string; recipient?: string }>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const validate = () => {
    const next: { topic?: string; recipient?: string } = {};
    if (!topic.trim()) next.topic = "Tell the assistant what the email is about.";
    if (!recipient.trim()) next.recipient = "Add who this email is intended for.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const generate = async () => {
    if (!validate()) return;
    setLoading(true);
    setAiError(null);
    try {
      const res = await run({ data: { topic, recipient, details, tone } });
      setResult(res.text);
      logActivity("Email Generator", topic);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "We couldn't generate your email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Describe the email you need and the assistant will draft a complete, professional message you can edit and send."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elevated border-border">
          <CardHeader>
            <CardTitle className="text-base">Email details</CardTitle>
            <CardDescription>Fields marked with * are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">What is the email about? *</Label>
              <Textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Requesting an extension on the quarterly report"
                rows={3}
                aria-invalid={!!errors.topic}
              />
              {errors.topic && (
                <p role="alert" className="text-xs text-destructive">
                  {errors.topic}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Who is it for? *</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. My line manager, Thabo Nkosi"
                aria-invalid={!!errors.recipient}
              />
              {errors.recipient && (
                <p role="alert" className="text-xs text-destructive">
                  {errors.recipient}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Important details to include</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Dates, figures, attachments, next steps…"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Choose a tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generate} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          title="Generated email"
          value={result}
          onChange={setResult}
          loading={loading}
          error={aiError}
          onRegenerate={generate}
          canRegenerate={topic.trim().length > 0 && recipient.trim().length > 0}
          emptyHint="Your generated email will appear here, ready to edit and copy."
        />
      </div>

      <ResponsibleAiHint />
    </div>
  );
}
