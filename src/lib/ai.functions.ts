import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runPrompt } from "./ai-run.server";

const EmailInput = z.object({
  topic: z.string().min(1),
  recipient: z.string().min(1),
  details: z.string().optional().default(""),
  tone: z.string().min(1),
});

const NotesInput = z.object({
  notes: z.string().min(1),
});

const TasksInput = z.object({
  tasks: z.string().min(1),
  timeframe: z.string().optional().default(""),
  planType: z.string().optional().default("daily"),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const system = [
      "You are an experienced workplace communication assistant who writes clear, professional business emails.",
      "Write a complete email using only the information the user provides.",
      "Never invent facts, names, dates, figures or commitments that were not given. If a detail is missing, keep the wording general or use a clearly marked placeholder such as [date].",
      "Output format (plain text, no markdown fences):",
      "Subject: <concise subject line>",
      "",
      "<greeting>",
      "",
      "<main message, 1-3 short paragraphs>",
      "",
      "<appropriate closing and sign-off, using [Your Name] if the sender is unknown>",
    ].join("\n");

    const prompt = [
      `Tone: ${data.tone}`,
      `Recipient: ${data.recipient}`,
      `Purpose of the email: ${data.topic}`,
      `Important details to include: ${data.details || "none provided"}`,
    ].join("\n");

    return { text: await runPrompt(system, prompt) };
  });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) => {
    const system = [
      "You are a meticulous meeting-notes analyst for a professional workplace.",
      "Summarise ONLY what is present in the supplied notes. Do not add, infer or invent decisions, owners, dates or context.",
      "If a section has no supporting information in the notes, write 'Not stated in the notes.'",
      "Use a neutral, professional tone. Output plain text with these exact headings:",
      "MEETING SUMMARY",
      "KEY DISCUSSION POINTS",
      "DECISIONS MADE",
      "ACTION ITEMS (format each as: - Task — Owner: <name or Not stated> — Deadline: <date or Not stated>)",
      "Use short bullet lines starting with '- ' under each heading.",
    ].join("\n");

    return { text: await runPrompt(system, `Meeting notes:\n\n${data.notes}`) };
  });

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TasksInput.parse(input))
  .handler(async ({ data }) => {
    const system = [
      "You are a pragmatic workplace productivity planner.",
      "Organise the user's tasks by priority, urgency and estimated effort, and propose a realistic order of completion.",
      "Use only the tasks and deadlines the user supplies. Do not invent tasks, deadlines or people.",
      "Output plain text with these exact sections:",
      "WORK PLAN OVERVIEW — 2-3 sentences.",
      "PLAN — one line per task in recommended order, formatted:",
      "1. <Task> | Priority: High/Medium/Low | Effort: <estimate> | Suggested time: <time slot or day> | Deadline: <date or Not provided>",
      "NOTES & RECOMMENDATIONS — short bullets on sequencing, risks or focus blocks.",
    ].join("\n");

    const prompt = [
      `Plan type: ${data.planType} plan`,
      `Date or timeframe: ${data.timeframe || "not specified"}`,
      "Tasks:",
      data.tasks,
    ].join("\n");

    return { text: await runPrompt(system, prompt) };
  });
