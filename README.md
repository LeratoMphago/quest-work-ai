# AI Workplace Productivity Assistant

A modern, responsive workplace productivity platform that helps professionals save time and automate common tasks using AI. Built with [TanStack Start](https://tanstack.com/start), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com).

![AI Workplace Productivity Assistant](https://quest-work-ai.lovable.app/preview.png)

## Features

### Smart Email Generator
Craft polished, professional emails in seconds. Choose the right tone — Formal, Friendly, Professional, or Persuasive — and let AI generate a complete message based on your topic, recipient, and key details. Edit, copy, clear, or regenerate the output directly in the app.

### Meeting Notes Summarizer
Turn raw meeting notes into structured takeaways. The AI extracts the meeting summary, key discussion points, decisions made, and action items with owners and deadlines — without inventing information.

### AI Task Planner
Organize your workload into a realistic daily or weekly plan. The AI prioritizes tasks, estimates effort, and suggests an order of completion based only on the tasks and deadlines you provide.

### Dashboard & Activity Feed
A clean, professional SaaS dashboard gives you quick access to every tool and shows your recent activity, so you can pick up right where you left off.

## Tech Stack

- **Framework:** TanStack Start v1
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Sora (headings) + Manrope (body)
- **AI:** Lovable AI Gateway with Google's Gemini models
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- [Bun](https://bun.sh) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-workplace-productivity-assistant

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
bun run dev
# or
npm run dev
```

The dev server starts at `http://localhost:8080`.

### Build

```bash
bun run build
# or
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AiOutput.tsx     # Editable AI output panel
│   ├── AppShell.tsx     # Sidebar + layout shell
│   ├── PageHeader.tsx   # Page title + description
│   └── ResponsibleAiHint.tsx  # AI disclaimer card
├── lib/                 # Business logic & server functions
│   ├── ai.functions.ts  # generateEmail, summarizeNotes, planTasks
│   ├── ai-gateway.server.ts   # AI gateway configuration
│   ├── ai-run.server.ts       # Prompt execution wrapper
│   └── activity.ts            # Recent activity tracking
├── routes/              # TanStack Start file-based routes
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Dashboard
│   ├── email-generator.tsx
│   ├── meeting-summarizer.tsx
│   ├── task-planner.tsx
│   └── about.tsx
├── styles.css           # Global styles & design tokens
└── router.tsx           # Router configuration
```

## AI Features & Prompt Engineering

All AI features use carefully engineered system prompts that:

- Define a clear role for the AI (workplace communication assistant, meeting analyst, productivity planner).
- Constrain outputs to only the information the user provides.
- Prevent hallucination — the AI never invents facts, dates, names, figures, or commitments.
- Return structured, plain-text output that is easy to scan and edit.

## Responsible AI

This application includes visible disclaimers reminding users that:

- AI-generated content may contain inaccuracies.
- Sensitive or confidential information should not be shared with AI tools unless appropriate privacy safeguards are in place.
- Human review is recommended before sending generated emails or acting on summarized action items.

## Deployment

This project is designed to run on Lovable Cloud and can be published directly from the Lovable editor. You can also connect the project to GitHub for two-way sync and deploy the exported code to any hosting platform that supports edge-ready React frameworks.

## License

This project is built and maintained with [Lovable](https://lovable.dev). The code is yours to use, modify, and deploy as you see fit.

---

Built with Lovable.