import { streamText } from "ai";
import { AI_MODEL, createLovableAiGatewayProvider } from "./ai-gateway.server";

export async function runPrompt(system: string, prompt: string): Promise<string> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured. Missing LOVABLE_API_KEY.");

  const gateway = createLovableAiGatewayProvider(key);

  try {
    const result = streamText({
      model: gateway(AI_MODEL),
      system,
      prompt,
    });
    const text = await result.text;
    if (!text.trim()) throw new Error("The AI returned an empty response. Please try again.");
    return text.trim();
  } catch (error) {
    const status = (error as { statusCode?: number; status?: number })?.statusCode ??
      (error as { status?: number })?.status;
    if (status === 429) {
      throw new Error("Too many requests right now. Please wait a moment and try again.");
    }
    if (status === 402) {
      throw new Error("AI credits have run out for this workspace. Please add credits to continue.");
    }
    if (status === 403) {
      throw new Error("AI access is currently blocked for this workspace.");
    }
    throw new Error(
      error instanceof Error && error.message
        ? error.message
        : "The AI request failed. Please try again.",
    );
  }
}
