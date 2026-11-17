import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export type Diagnosis = {
  path: "self_service" | "professional" | "emergency";
  title: string;
  summary: string;
  confidence: "low" | "medium" | "high";
  safety: string[];
  steps: string[];
  tools: string[];
  call_pro_if: string[];
  emergency_action?: string;
};

const SYSTEM = `You are the repair-diagnosis engine of a home repair app used by everyday people worldwide.
The user sends a photo and/or a description of something broken in their home, apartment, household items, or appliances.

LANGUAGE: Write EVERY text field in the language named in "Reply language". Use plain, everyday words people actually say in that language and region, not literal translations. Keep technical part names understandable (add the common local name).

CLASSIFY into exactly one path:
- "self_service": safe, minor, low-skill (running toilet, clogged sink, tripped breaker reset, loose cabinet hinge, squeaky door, replacing a light bulb, resetting a GFCI outlet, unclogging a drain with a plunger).
- "professional": needs a licensed or skilled person, or you are unsure, or the photo is unclear. Includes: any work inside an electrical panel or wiring, gas appliances, water heater internals, roof, structural cracks, mold larger than a small patch, refrigerant/AC sealed systems, anything requiring permits.
- "emergency": possible immediate danger. ALWAYS emergency for: gas smell or hissing gas line, carbon monoxide alarm, smoke/fire/burning smell from outlets or appliances, sparking, water touching electrical outlets/panels/appliances, active flooding, ceiling sagging with water, exposed live wires, structural collapse.

SAFETY RULES (never break):
- Never give instructions to open electrical panels, touch wiring, or repair gas lines/appliances.
- If uncertain between two paths, choose the safer one. Low confidence + any risk => "professional".
- For "emergency": steps must be only safety actions (leave the area, don't switch lights on/off if gas, shut main water valve if safe, call emergency services / gas company / utility). Fill emergency_action with the single most important action in one short sentence.
- Steps for "self_service": 3-8 short numbered actions, each one sentence.
- Never invent details you cannot see. If the photo is unclear, say so in summary and ask for a clearer photo in call_pro_if or steps.

Return ONLY JSON matching this TypeScript type, no markdown:
{"path":"self_service"|"professional"|"emergency","title":string,"summary":string,"confidence":"low"|"medium"|"high","safety":string[],"steps":string[],"tools":string[],"call_pro_if":string[],"emergency_action"?:string}`;

function mockDiagnosis(lang: string): Diagnosis {
  return {
    path: "professional",
    title: "Demo mode",
    summary: `No ANTHROPIC_API_KEY is set, so this is a sample answer (language: ${lang}). Add the key in .env.local to get real diagnoses.`,
    confidence: "low",
    safety: ["Demo response — not a real diagnosis."],
    steps: ["Add ANTHROPIC_API_KEY to .env.local", "Restart the app", "Try again"],
    tools: [],
    call_pro_if: ["You are unsure what the problem is."],
  };
}

export async function POST(req: Request) {
  let body: { text?: string; image?: string; langName?: string; region?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const text = (body.text ?? "").slice(0, 4000);
  const image = body.image; // data URL
  const langName = body.langName ?? "English";
  const region = body.region ?? "US";

  if (!text && !image) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json(mockDiagnosis(langName));

  const content: Anthropic.ContentBlockParam[] = [];
  if (image) {
    const m = image.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/);
    if (!m) return NextResponse.json({ error: "bad_image" }, { status: 400 });
    content.push({
      type: "image",
      source: { type: "base64", media_type: m[1] as "image/jpeg" | "image/png" | "image/webp" | "image/gif", data: m[2] },
    });
  }
  content.push({
    type: "text",
    text: `Reply language: ${langName}\nUser country/region: ${region}\nUser description (may be in any language, may be empty): ${text || "(none — use the photo)"}`,
  });

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5",
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: "user", content }],
    });
    const raw = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const d = JSON.parse(json) as Diagnosis;
    if (!["self_service", "professional", "emergency"].includes(d.path)) d.path = "professional";
    for (const k of ["safety", "steps", "tools", "call_pro_if"] as const) if (!Array.isArray(d[k])) d[k] = [];
    return NextResponse.json(d);
  } catch (e) {
    console.error("diagnose failed", e);
    return NextResponse.json({ error: "ai_failed" }, { status: 502 });
  }
}
