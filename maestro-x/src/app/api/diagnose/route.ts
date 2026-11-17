import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { normalize, type Diagnosis } from "@/lib/diagnosis";
import { toImageBlocks } from "@/lib/ai-images";

export const maxDuration = 60;

const SYSTEM = `You are Maestro X, the repair-diagnosis engine of a home repair app used by everyday people worldwide. Think like an experienced, friendly handyman ("el maestro").
The user sends up to 4 photos (different angles of the same problem) and/or a description of something broken in their home, apartment, household items or appliances. Look at ALL photos together.

LANGUAGE: Write EVERY human-readable field in the language named in "Reply language". Use plain everyday words people really say in that language and region, not literal translations. Talk to the user informally and warmly (Spanish "tú", Portuguese "você", French "tu", German "du"). Keep part names understandable (add the common local name).
EXCEPTIONS (always in English, for US store search): parts[].search, tools[].search, pro_search.

PATH (choose exactly one):
- "self_service": safe, minor, low-skill (running toilet, clogged sink, reset a tripped breaker once, loose hinge, squeaky door, light bulb, reset GFCI, plunger/drain snake, caulk, filter change).
- "professional": needs a licensed/skilled person, or you're unsure, or photos are unclear. Includes any work inside an electrical panel or wiring, a breaker that keeps tripping, gas appliances, water heater internals, roofs, structural cracks, mold bigger than a small patch, refrigerant/AC sealed systems, anything needing a permit.
- "emergency": possible immediate danger. ALWAYS for: gas smell/hissing, carbon monoxide alarm, smoke/fire/burning smell from outlets or appliances, sparking, water touching outlets/panels/appliances, active flooding, sagging wet ceiling, exposed live wires, structural collapse.

SAFETY RULES (never break):
- Never give instructions to open electrical panels, touch wiring, or repair gas lines/appliances.
- Uncertain between two paths → pick the safer one. Low confidence + any risk → "professional".
- emergency: emergency_action = the single most important action in one short sentence; steps = only safety actions (leave, don't switch lights if gas, shut main water valve if safe, call emergency services/utility); parts and tools empty; difficulty "pro".
- professional: steps = what the user can safely do now while waiting + what to tell the pro (2-5 steps); parts/tools usually empty; difficulty "pro".
- self_service: 3-8 steps. When water or power is involved, step 1 is the safety step (shut water/power). Each step has a short title and a clear 1-3 sentence instruction.
- If the photos don't clearly show something fixable or are too blurry/dark and the text doesn't explain it: recognized=false, path="professional", title like "Couldn't see it clearly", summary asking for closer, well-lit photos from 2-3 angles, arrays empty.

DETAILS:
- parts: exact, searchable products (e.g. name "Válvula de llenado universal Fluidmaster 400H", search "Fluidmaster 400H toilet fill valve") with est_price in US dollars like "$12". Only things they need to buy.
- tools: common tools (search in English, e.g. "adjustable wrench").
- alternatives: 1-2 other likely causes ("it could also be") for self_service/professional; empty for emergency.
- time_estimate like "20-30 min", cost_estimate like "$10-25" (empty for emergency).
- pro_search: the trade to search on Google Maps in English, e.g. "plumber", "electrician", "appliance repair", "HVAC repair", "handyman".
- confidence reflects how sure you are from the photos/description. Never invent details you can't see.`;

const TOOL: Anthropic.Tool = {
  name: "diagnosis",
  description: "Return the repair diagnosis.",
  input_schema: {
    type: "object",
    required: ["recognized", "path", "title", "summary", "confidence", "difficulty", "time_estimate", "cost_estimate", "safety", "steps", "parts", "tools", "alternatives", "call_pro_if", "pro_search"],
    properties: {
      recognized: { type: "boolean" },
      path: { type: "string", enum: ["self_service", "professional", "emergency"] },
      title: { type: "string" },
      summary: { type: "string" },
      confidence: { type: "string", enum: ["low", "medium", "high"] },
      difficulty: { type: "string", enum: ["easy", "medium", "pro"] },
      time_estimate: { type: "string" },
      cost_estimate: { type: "string" },
      emergency_action: { type: "string" },
      safety: { type: "array", items: { type: "string" } },
      steps: {
        type: "array",
        items: { type: "object", required: ["title", "instruction"], properties: { title: { type: "string" }, instruction: { type: "string" } } },
      },
      parts: {
        type: "array",
        items: { type: "object", required: ["name", "est_price", "search"], properties: { name: { type: "string" }, est_price: { type: "string" }, search: { type: "string" } } },
      },
      tools: {
        type: "array",
        items: { type: "object", required: ["name", "search"], properties: { name: { type: "string" }, search: { type: "string" } } },
      },
      alternatives: {
        type: "array",
        items: { type: "object", required: ["title", "explanation"], properties: { title: { type: "string" }, explanation: { type: "string" } } },
      },
      call_pro_if: { type: "array", items: { type: "string" } },
      pro_search: { type: "string" },
    },
  },
};

function mockDiagnosis(lang: string): Diagnosis {
  return normalize({
    recognized: true,
    path: "professional",
    title: "Demo mode",
    summary: `No ANTHROPIC_API_KEY is set, so this is a sample answer (language: ${lang}).`,
    confidence: "low",
    difficulty: "pro",
    steps: [{ title: "Add the API key", instruction: "Set ANTHROPIC_API_KEY in Vercel and redeploy." }],
    pro_search: "handyman",
  });
}

export async function POST(req: Request) {
  let body: { text?: string; images?: string[]; image?: string; langName?: string; region?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const text = (body.text ?? "").slice(0, 4000);
  const imgs = toImageBlocks(body.images ?? body.image);
  if (!imgs) return NextResponse.json({ error: "bad_image" }, { status: 400 });
  const langName = body.langName ?? "English";
  const region = body.region ?? "US";

  if (!text && imgs.length === 0) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json(mockDiagnosis(langName));

  const content: Anthropic.ContentBlockParam[] = [
    ...imgs,
    {
      type: "text",
      text: `Reply language: ${langName}\nUser country/region: ${region}\nPhotos: ${imgs.length}\nUser description (any language, may be empty): ${text || "(none — use the photos)"}`,
    },
  ];

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5",
      max_tokens: 3000,
      system: SYSTEM,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "diagnosis" },
      messages: [{ role: "user", content }],
    });
    const block = msg.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") throw new Error("no tool_use");
    return NextResponse.json(normalize(block.input as Partial<Diagnosis>));
  } catch (e) {
    console.error("diagnose failed", e);
    return NextResponse.json({ error: "ai_failed" }, { status: 502 });
  }
}
