import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { toImageBlocks } from "@/lib/ai-images";

export const maxDuration = 60;

// "Stuck? Send a photo": looks at a progress photo for one repair step.
export async function POST(req: Request) {
  let body: { image?: string; langName?: string; problem?: string; step?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const imgs = toImageBlocks(body.image);
  if (!imgs || imgs.length === 0) return NextResponse.json({ error: "bad_image" }, { status: 400 });
  const langName = body.langName ?? "English";
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ looks_good: true, guidance: "Demo mode — add the API key." });

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5",
      max_tokens: 600,
      system: `You are Maestro X, a friendly, experienced handyman. The user is stuck on one repair step and sent a progress photo. Look closely and give short, specific, encouraging guidance (2-4 sentences) for this step, in ${langName}, informal (Spanish "tú"). Flag anything unsafe FIRST and tell them to stop if it's dangerous. If the photo is unclear, ask for a closer, better-lit shot.`,
      tools: [
        {
          name: "progress",
          description: "Return progress feedback.",
          input_schema: {
            type: "object",
            required: ["looks_good", "guidance"],
            properties: { looks_good: { type: "boolean" }, guidance: { type: "string" } },
          },
        },
      ],
      tool_choice: { type: "tool", name: "progress" },
      messages: [
        {
          role: "user",
          content: [...imgs, { type: "text", text: `Problem: ${(body.problem ?? "").slice(0, 300)}\nStep: ${(body.step ?? "").slice(0, 1200)}` }],
        },
      ],
    });
    const block = msg.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") throw new Error("no tool_use");
    const out = block.input as { looks_good?: boolean; guidance?: string };
    return NextResponse.json({ looks_good: !!out.looks_good, guidance: out.guidance ?? "" });
  } catch (e) {
    console.error("progress failed", e);
    return NextResponse.json({ error: "ai_failed" }, { status: 502 });
  }
}
