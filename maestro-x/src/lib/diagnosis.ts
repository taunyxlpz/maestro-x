// Shared types + store links for Maestro X diagnoses.

/** Add an Amazon Associates tag here to earn commission, e.g. "maestrox-20". */
export const AMAZON_AFFILIATE_TAG = "";

export type Path = "self_service" | "professional" | "emergency";

export type Diagnosis = {
  recognized: boolean;
  path: Path;
  title: string;
  summary: string;
  confidence: "low" | "medium" | "high";
  difficulty: "easy" | "medium" | "pro";
  time_estimate: string;
  cost_estimate: string;
  emergency_action?: string;
  safety: string[];
  steps: { title: string; instruction: string }[];
  parts: { name: string; est_price: string; search: string }[];
  tools: { name: string; search: string }[];
  alternatives: { title: string; explanation: string }[];
  call_pro_if: string[];
  pro_search: string;
};

export type Progress = { looks_good: boolean; guidance: string };

export function amazonUrl(q: string) {
  const u = new URL("https://www.amazon.com/s");
  u.searchParams.set("k", q);
  if (AMAZON_AFFILIATE_TAG) u.searchParams.set("tag", AMAZON_AFFILIATE_TAG);
  return u.toString();
}

export function homeDepotUrl(q: string) {
  return `https://www.homedepot.com/s/${encodeURIComponent(q)}`;
}

export function findProUrl(trade: string) {
  return `https://www.google.com/maps/search/${encodeURIComponent(`${trade || "handyman"} near me`)}`;
}

/** Normalize anything the model returns so the UI never crashes. */
export function normalize(d: Partial<Diagnosis>): Diagnosis {
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const path: Path = d.path === "self_service" || d.path === "emergency" ? d.path : "professional";
  return {
    recognized: d.recognized !== false,
    path,
    title: d.title ?? "",
    summary: d.summary ?? "",
    confidence: d.confidence === "high" || d.confidence === "medium" ? d.confidence : "low",
    difficulty: d.difficulty === "easy" || d.difficulty === "medium" ? d.difficulty : "pro",
    time_estimate: d.time_estimate ?? "",
    cost_estimate: d.cost_estimate ?? "",
    emergency_action: d.emergency_action || undefined,
    safety: arr<string>(d.safety),
    steps: arr<Diagnosis["steps"][number] | string>(d.steps).map((s) =>
      typeof s === "string" ? { title: s, instruction: "" } : s,
    ),
    parts: arr<Diagnosis["parts"][number]>(d.parts).map((p) => ({ ...p, search: p.search || p.name })),
    tools: arr<Diagnosis["tools"][number]>(d.tools).map((p) => ({ ...p, search: p.search || p.name })),
    alternatives: arr(d.alternatives),
    call_pro_if: arr<string>(d.call_pro_if),
    pro_search: d.pro_search ?? "",
  };
}
