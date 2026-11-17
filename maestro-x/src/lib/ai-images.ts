import type Anthropic from "@anthropic-ai/sdk";

export const MAX_IMAGES = 4;

type ImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

export function toImageBlocks(images: unknown): Anthropic.ImageBlockParam[] | null {
  const list = (Array.isArray(images) ? images : images ? [images] : []).slice(0, MAX_IMAGES);
  const out: Anthropic.ImageBlockParam[] = [];
  for (const img of list) {
    const m = typeof img === "string" ? img.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/) : null;
    if (!m) return null;
    out.push({ type: "image", source: { type: "base64", media_type: m[1] as ImageMedia, data: m[2] } });
  }
  return out;
}


/** Pull the structured result out of a reply: the tool call if the model made one, otherwise JSON in the text. */
export function extractToolInput(msg: Anthropic.Message, tool: string): unknown {
  const call = msg.content.find((b) => b.type === "tool_use" && b.name === tool);
  if (call && call.type === "tool_use") return call.input;
  const raw = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  const i = raw.indexOf("{");
  const j = raw.lastIndexOf("}");
  if (i < 0 || j <= i) throw new Error("no structured output");
  return JSON.parse(raw.slice(i, j + 1));
}
