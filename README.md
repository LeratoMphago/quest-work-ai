# AI Workplace Companion

Build a complete, modern, responsive web application called AI Workplace Productivity Assistant.

The application should be a single integrated workplace productivity platform that helps professionals save time and automate common workplace tasks using AI.

Main AI Features

The application must include these three AI-powered tools:

1. Smart Email Generator

Create a tool that allows users to generate professional workplace emails.

The user should be able to enter:

What the email is about

Who the email is intended for

Any important details they want included

Preferred tone

Provide tone options such as:

Formal

Friendly

Professional

Persuasive

The AI should generate a complete, professional email with:

Subject line

Greeting

Main message

Appropriate closing

The generated email must be editable by the user and include an easy Copy button.

2. Meeting Notes Summarizer

Create a tool where users can paste or enter meeting notes.

The AI should analyse the notes and produce a clear structured summary containing:

Meeting summary

Key discussion points

Decisions made

Action items

People responsible for action items, when this information is provided

Deadlines, when mentioned

Do not invent information that is not contained in the user's notes.

The generated summary should be editable and easy to copy.

3. AI Task Planner

Create a tool where users can enter their workplace tasks.

The AI should help organise the tasks by:

Priority

Urgency

Estimated effort

Suggested order of completion

Allow the user to specify a date or timeframe where appropriate.

Generate a practical daily or weekly work plan.

The output should clearly show:

Task

Priority

Suggested time

Recommended order

Deadline, if provided

The generated plan should be editable by the user.

Dashboard

Create a professional dashboard as the application's home page.

The dashboard should include:

Application name: AI Workplace Productivity Assistant

A short welcome message

A brief explanation of what the application does

Three feature cards for:

Smart Email Generator

Meeting Notes Summarizer

AI Task Planner

Clear buttons allowing users to open each feature

A simple overview of recent or current tasks where appropriate

Use a clean, professional SaaS-style dashboard design.

Sidebar Navigation

Create a persistent sidebar navigation containing:

Dashboard

Email Generator

Meeting Summarizer

Task Planner

About / Help

The currently selected section should be visually highlighted.

On mobile devices, the sidebar should become a mobile-friendly menu.

User Interface and Design

Use a clean, modern and professional SaaS-style interface.

Design requirements:

Professional workplace appearance

Simple and intuitive navigation

Clear headings

Well-spaced content

Modern cards and buttons

Consistent typography

Appropriate icons

Good visual hierarchy

Avoid clutter

Make the application look like a real professional productivity product rather than a basic student project

Use a professional and accessible colour palette with a modern appearance.

Responsive Design

The application must work properly on:

Desktop computers

Laptops

Tablets

Mobile phones

Make sure buttons, forms, cards, navigation and text adjust appropriately for smaller screens.

AI Prompt Engineering

Use structured prompts for each AI feature.

The prompts should clearly define:

The AI's role

The user's task

The information provided by the user

The expected output format

Appropriate professional tone

Instructions not to invent information

The AI responses should be structured, readable and useful in a real workplace environment.

Editable AI Outputs

All AI-generated results should appear in an editable output area.

Users should be able to:

Edit generated content

Copy the result

Clear the result

Generate a new result

Where appropriate, include buttons such as:

Generate

Copy

Clear

Regenerate

Responsible AI

Include a visible but unobtrusive responsible AI disclaimer in the application.

Use wording similar to:

"Responsible AI Notice: AI-generated content may contain errors or inaccuracies. Always review and verify important information before using it in the workplace. Do not enter confidential, sensitive or personal information."

The disclaimer should be visible across the application, preferably in the footer and/or relevant AI feature pages.

Error Handling and User Experience

Add helpful validation and error messages.

For example:

Do not allow important forms to be submitted completely empty.

Tell the user when required information is missing.

Show a clear loading state while AI content is being generated.

Display a friendly error message if an AI request fails.

Make buttons and forms easy to understand.

Overall Goal

The finished application should feel like a realistic workplace productivity product that demonstrates:

Practical AI implementation

Prompt engineering

Workplace problem solving

Responsible AI usage

Good UI/UX design

Responsive web design

Prioritise functionality, usability, professional presentation and a polished user experience.

Build the application as one integrated platform, not three separate applications.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://quest-work-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6710a50f-28c6-45c6-874d-5a349e6d6fe5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
