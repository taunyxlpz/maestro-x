"use client";

import { useEffect, useRef, useState } from "react";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { LANGUAGES, detectLang, emergencyNumber, getLang, t, type StringKey } from "@/lib/i18n";
import { amazonUrl, findProUrl, homeDepotUrl, type Diagnosis, type Progress } from "@/lib/diagnosis";

const MAX_PHOTOS = 4;
const ROOMS = ["kitchen", "bathroom", "bedroom", "living", "laundry", "outside"] as const;
type Room = (typeof ROOMS)[number];

type HistoryItem = { id: string; at: number; thumb?: string; d: Diagnosis; done: boolean[] };

// Minimal typing for the browser speech API
type SR = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start: () => void; stop: () => void;
};

async function shrinkImage(file: Blob, max = 1024, quality = 0.8): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  try {
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * scale);
    c.height = Math.round(img.height * scale);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function dataUrlToBlob(d: string) {
  return (await fetch(d)).blob();
}

const PATH_STYLE: Record<Diagnosis["path"], { card: string; label: string }> = {
  self_service: { card: "border-emerald-500/60 bg-emerald-500/10", label: "text-emerald-400" },
  professional: { card: "border-amber-400/60 bg-amber-400/10", label: "text-amber-300" },
  emergency: { card: "border-brand bg-brand/20 shadow-[0_0_40px_rgba(227,18,11,0.35)]", label: "text-brand-hi" },
};
const PATH_ICON: Record<Diagnosis["path"], string> = { self_service: "🛠️", professional: "👷", emergency: "🚨" };
const CONF_DOTS = { low: 1, medium: 2, high: 3 } as const;
const DIFF_STYLE: Record<Diagnosis["difficulty"], string> = {
  easy: "bg-emerald-500/15 text-emerald-300",
  medium: "bg-amber-400/15 text-amber-200",
  pro: "bg-brand/20 text-brand-hi",
};

function Logo({ small }: { small?: boolean }) {
  return (
    <span dir="ltr" className={`inline-flex items-baseline gap-1 font-black tracking-[0.12em] ${small ? "text-xl" : "text-2xl"}`}>
      <span className="text-white">MAESTRO</span>
      <span className="inline-block -skew-x-12 text-brand [text-shadow:0_0_14px_rgba(255,59,48,0.75)]">X</span>
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [emergency, setEmergency] = useState({ number: "911", region: "US" });
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [anMsg, setAnMsg] = useState(0);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<HistoryItem | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [guidance, setGuidance] = useState<Record<number, Progress>>({});
  const [checkingStep, setCheckingStep] = useState<number | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const stepPhotoRef = useRef<HTMLInputElement>(null);
  const activeStep = useRef<number | null>(null);
  const recRef = useRef<SR | null>(null);
  const nativeHeard = useRef("");
  const nativeHandles = useRef<PluginListenerHandle[]>([]);

  const L = getLang(lang);
  const tr = (k: StringKey, v?: Record<string, string>) => t(lang, k, v);
  const result = current?.d ?? null;

  // Read browser language + saved data once on the client (not available during SSR)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    setLang(saved ?? detectLang(langs));
    setEmergency(emergencyNumber(langs));
    try {
      const h = JSON.parse(localStorage.getItem("history.v2") ?? "[]") as HistoryItem[];
      setHistory(Array.isArray(h) ? h : []);
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = L.rtl ? "rtl" : "ltr";
  }, [lang, L.rtl]);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setAnMsg((m) => (m + 1) % 3), 1800);
    return () => clearInterval(id);
  }, [loading]);

  function saveHistory(list: HistoryItem[]) {
    setHistory(list);
    try { localStorage.setItem("history.v2", JSON.stringify(list.slice(0, 25))); } catch {}
  }

  function changeLang(code: string) {
    setLang(code);
    try { localStorage.setItem("lang", code); } catch {}
  }

  async function onPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    try {
      const free = MAX_PHOTOS - images.length;
      const next = await Promise.all(files.slice(0, free).map((f) => shrinkImage(f)));
      setImages((prev) => [...prev, ...next].slice(0, MAX_PHOTOS));
      setError(null);
    } catch {
      setError(tr("errorMsg"));
    }
  }

  // ---- Voice -------------------------------------------------------------
  async function finishNativeVoice() {
    const said = nativeHeard.current.trim();
    nativeHeard.current = "";
    for (const h of nativeHandles.current) await h.remove();
    nativeHandles.current = [];
    if (said) setText((prev) => (prev ? prev + " " : "") + said);
    setListening(false);
  }

  async function toggleNativeVoice() {
    if (listening) {
      try { await SpeechRecognition.stop(); } catch {}
      await finishNativeVoice();
      return;
    }
    try {
      const perm = await SpeechRecognition.requestPermissions();
      if (perm.speechRecognition !== "granted") { setError(tr("errorMsg")); return; }
      nativeHeard.current = "";
      nativeHandles.current = [
        await SpeechRecognition.addListener("partialResults", (d) => { nativeHeard.current = d.matches?.[0] ?? nativeHeard.current; }),
        await SpeechRecognition.addListener("listeningState", (d) => { if (d.status === "stopped") void finishNativeVoice(); }),
      ];
      setListening(true);
      await SpeechRecognition.start({ language: L.speech, maxResults: 1, partialResults: true, popup: false });
    } catch {
      await finishNativeVoice();
      setError(tr("errorMsg"));
    }
  }

  function toggleVoice() {
    if (Capacitor.isNativePlatform()) { void toggleNativeVoice(); return; }
    const W = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!Ctor) { setError("Voice input isn't supported in this browser. Try Chrome or Safari."); return; }
    if (listening) { recRef.current?.stop(); return; }
    const rec = new Ctor();
    rec.lang = L.speech;
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      const said = Array.from(e.results).map((r) => r[0].transcript).join(" ");
      setText((prev) => (prev ? prev + " " : "") + said);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  }

  function readAloud(d: Diagnosis) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const parts = [
      d.title, d.emergency_action, d.summary, ...d.safety,
      ...d.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.instruction}`),
    ];
    const u = new SpeechSynthesisUtterance(parts.filter(Boolean).join(". "));
    u.lang = L.speech;
    speechSynthesis.speak(u);
  }

  // ---- Diagnose ----------------------------------------------------------
  async function diagnose() {
    if (!text.trim() && images.length === 0) { setError(tr("needInput")); return; }
    setError(null); setLoading(true); setAnMsg(0);
    try {
      const desc = [room ? `Room: ${room}.` : "", text].filter(Boolean).join(" ");
      const r = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: desc, images, langName: L.english, region: emergency.region }),
      });
      if (!r.ok) throw new Error();
      const d = (await r.json()) as Diagnosis;
      let thumb: string | undefined;
      if (images[0]) { try { thumb = await shrinkImage(await dataUrlToBlob(images[0]), 160, 0.6); } catch {} }
      const item: HistoryItem = { id: crypto.randomUUID(), at: Date.now(), thumb, d, done: d.steps.map(() => false) };
      setGuidance({});
      setCurrent(item);
      if (d.recognized) saveHistory([item, ...history]);
      window.scrollTo({ top: 0 });
    } catch {
      setError(tr("errorMsg"));
    } finally {
      setLoading(false);
    }
  }

  function toggleStep(i: number) {
    if (!current) return;
    const done = [...current.done];
    done[i] = !done[i];
    const next = { ...current, done };
    setCurrent(next);
    saveHistory(history.map((h) => (h.id === next.id ? next : h)));
  }

  async function onStepPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    const i = activeStep.current;
    if (!f || i === null || !result) return;
    const step = result.steps[i];
    setCheckingStep(i);
    try {
      const image = await shrinkImage(f);
      const r = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, langName: L.english, problem: result.title, step: `${step.title} — ${step.instruction}` }),
      });
      if (!r.ok) throw new Error();
      const p = (await r.json()) as Progress;
      setGuidance((g) => ({ ...g, [i]: p }));
    } catch {
      setError(tr("errorMsg"));
    } finally {
      setCheckingStep(null);
    }
  }

  function reset() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) speechSynthesis.cancel();
    setCurrent(null); setText(""); setImages([]); setRoom(null); setError(null); setGuidance({});
    window.scrollTo({ top: 0 });
  }

  const doneCount = current?.done.filter(Boolean).length ?? 0;
  const stepCount = result?.steps.length ?? 0;
  const pct = stepCount ? Math.round((doneCount / stepCount) * 100) : 0;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-16 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-3xl md:px-8 md:pt-10 lg:max-w-4xl">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-ink/95 px-8 text-center backdrop-blur">
          {images[0] && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[0]} alt="" className="size-44 rounded-3xl object-cover opacity-80" />
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="h-1 w-full animate-[scan_1.6s_ease-in-out_infinite] bg-brand-hi shadow-[0_0_18px_4px_rgba(255,59,48,0.7)]" />
              </div>
            </div>
          )}
          {!images[0] && <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-brand" />}
          <p className="text-lg font-bold">{tr((["an1", "an2", "an3"] as const)[anMsg])}</p>
          <Logo small />
        </div>
      )}

      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1><Logo /></h1>
          <p className="mt-1 text-sm text-muted">{tr("tagline")}</p>
        </div>
        <select
          aria-label="Language"
          value={lang}
          onChange={(e) => changeLang(e.target.value)}
          className="rounded-lg border border-white/15 bg-panel px-2 py-2 text-sm text-white"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </header>

      {!result && (
        <section className="space-y-4 rounded-2xl border border-white/10 bg-panel p-4 shadow-[0_0_60px_rgba(227,18,11,0.08)]">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => cameraRef.current?.click()}
              disabled={images.length >= MAX_PHOTOS}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-brand py-5 text-base font-extrabold text-white shadow-[0_0_24px_rgba(227,18,11,0.4)] disabled:opacity-40"
            >
              <span className="text-2xl">📷</span>{tr("takePhoto")}
            </button>
            <button
              onClick={() => uploadRef.current?.click()}
              disabled={images.length >= MAX_PHOTOS}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/15 bg-ink py-5 text-base font-bold hover:border-white/40 disabled:opacity-40"
            >
              <span className="text-2xl">🖼️</span>{tr("uploadPhoto")}
            </button>
          </div>
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={onPhotos} />
          <input ref={uploadRef} type="file" accept="image/*" multiple hidden onChange={onPhotos} />

          {images.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full rounded-xl object-cover" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={tr("removePhoto")}
                    className="absolute end-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/80 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < MAX_PHOTOS && (
                <button
                  onClick={() => uploadRef.current?.click()}
                  className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-white/25 text-2xl text-muted"
                  aria-label={tr("uploadPhoto")}
                >
                  ＋
                </button>
              )}
            </div>
          ) : (
            <p className="text-center text-xs text-muted">{tr("photosHint")}</p>
          )}

          <label className="block pt-1 text-lg font-bold" htmlFor="desc">{tr("describe")}</label>
          <div className="relative">
            <textarea
              id="desc"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder={tr("placeholder")}
              className="w-full resize-none rounded-xl border border-white/15 bg-ink p-3 pe-14 text-base text-white outline-none placeholder:text-muted focus:border-brand"
            />
            <button
              onClick={toggleVoice}
              aria-label={tr("speak")}
              className={`absolute bottom-3 end-3 flex size-10 items-center justify-center rounded-full border ${listening ? "animate-pulse border-brand bg-brand/30" : "border-white/20 bg-panel"}`}
            >
              🎙️
            </button>
          </div>
          {listening && <p className="-mt-2 text-sm text-brand-hi">{tr("listening")}</p>}

          <div>
            <p className="mb-2 text-sm font-bold text-white/80">{tr("whereIsIt")}</p>
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(room === r ? null : r)}
                  aria-pressed={room === r}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${room === r ? "border-brand bg-brand text-white" : "border-white/15 bg-ink text-white/80"}`}
                >
                  {tr(`room_${r}`)}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-brand-hi">{error}</p>}

          <button
            onClick={diagnose}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 text-lg font-extrabold uppercase tracking-wider text-ink transition hover:bg-white/90 disabled:opacity-80"
          >
            {tr("analyze")}
          </button>
        </section>
      )}

      {result && current && (
        <section className="space-y-4">
          <div className={`rounded-2xl border-2 p-4 ${PATH_STYLE[result.path].card}`}>
            <div className="flex items-start gap-4">
              {current.thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.thumb} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0">
                <p className={`text-sm font-extrabold uppercase tracking-widest ${PATH_STYLE[result.path].label}`}>
                  {PATH_ICON[result.path]} {tr(result.path)}
                </p>
                <h2 className="mt-1 text-xl font-black leading-tight">{result.title}</h2>
              </div>
            </div>
            {result.emergency_action && <p className="mt-3 text-lg font-bold text-white">{result.emergency_action}</p>}
            <p className="mt-2 text-white/85">{result.summary}</p>
            {result.path === "emergency" && (
              <a href={`tel:${emergency.number}`} className="mt-4 block animate-pulse rounded-xl bg-brand py-4 text-center text-lg font-extrabold text-white shadow-[0_0_30px_rgba(255,59,48,0.6)]">
                📞 {tr("callEmergency", { n: emergency.number })}
              </a>
            )}
          </div>

          {result.recognized && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label={tr("confidence")}>
                <span className="tracking-widest">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={n <= CONF_DOTS[result.confidence] ? "text-white" : "text-white/20"}>●</span>
                  ))}
                </span>
              </Stat>
              <Stat label={tr("difficulty")}>
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-extrabold ${DIFF_STYLE[result.difficulty]}`}>
                  {tr(`diff_${result.difficulty}`)}
                </span>
              </Stat>
              {result.time_estimate && <Stat label={`⏱ ${tr("timeLabel")}`}>{result.time_estimate}</Stat>}
              {result.cost_estimate && <Stat label={`💵 ${tr("costLabel")}`}>{result.cost_estimate}</Stat>}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <ListCard title={`⚠️ ${tr("safety")}`} items={result.safety} />

              {result.steps.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-panel p-4">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h3 className="font-extrabold">{tr("steps")}</h3>
                    <span className="text-xs font-bold text-muted">{tr("doneOf", { n: String(doneCount), m: String(stepCount) })} · {pct}%</span>
                  </div>
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <ol className="space-y-3">
                    {result.steps.map((s, i) => {
                      const done = current.done[i];
                      const g = guidance[i];
                      return (
                        <li key={i} className={`rounded-xl border p-3 transition ${done ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/10 bg-ink"}`}>
                          <div className="flex gap-3">
                            <button
                              onClick={() => toggleStep(i)}
                              aria-pressed={done}
                              className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black ${done ? "border-emerald-500 bg-emerald-500 text-ink" : "border-white/40"}`}
                            >
                              {done ? "✓" : i + 1}
                            </button>
                            <div className="min-w-0 flex-1">
                              <p className={`font-extrabold leading-snug ${done ? "line-through opacity-60" : ""}`}>{s.title}</p>
                              {s.instruction && <p className="mt-1 text-sm leading-relaxed text-white/75">{s.instruction}</p>}
                            </div>
                          </div>
                          {g && (
                            <div className={`mt-3 rounded-lg p-3 text-sm ${g.looks_good ? "bg-emerald-500/15" : "bg-amber-400/15"}`}>
                              <p className="font-extrabold">{g.looks_good ? tr("looksGood") : tr("whatISee")}</p>
                              <p className="mt-1 text-white/85">{g.guidance}</p>
                            </div>
                          )}
                          {!done && result.path !== "emergency" && (
                            <button
                              onClick={() => { activeStep.current = i; stepPhotoRef.current?.click(); }}
                              disabled={checkingStep !== null}
                              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm font-semibold text-white/80 disabled:opacity-50"
                            >
                              {checkingStep === i
                                ? <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                : "📷"} {tr("stuck")}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                  <input ref={stepPhotoRef} type="file" accept="image/*" capture="environment" hidden onChange={onStepPhoto} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <ShopCard title={`🔩 ${tr("partsLabel")}`} items={result.parts.map((p) => ({ name: p.name, price: p.est_price, search: p.search }))} />
              <ShopCard title={`🧰 ${tr("toolsLabel")}`} items={result.tools.map((p) => ({ name: p.name, search: p.search }))} />
              {(result.parts.length > 0 || result.tools.length > 0) && <p className="px-1 text-xs text-muted">{tr("priceNote")}</p>}

              {result.alternatives.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-panel p-4">
                  <h3 className="mb-2 font-extrabold">🤔 {tr("alsoCouldBe")}</h3>
                  <div className="space-y-2">
                    {result.alternatives.slice(0, 2).map((a, i) => (
                      <div key={i} className="rounded-lg bg-ink p-3">
                        <p className="font-bold">{a.title}</p>
                        <p className="text-sm text-white/70">{a.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(result.call_pro_if.length > 0 || result.path !== "self_service") && (
                <div className="rounded-2xl border border-white/10 bg-panel p-4">
                  <h3 className="mb-2 font-extrabold">👷 {tr("callPro")}</h3>
                  {result.call_pro_if.length > 0 && (
                    <ul className="mb-3 list-disc space-y-1.5 ps-5 text-white/90 marker:text-brand">
                      {result.call_pro_if.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  )}
                  <a
                    href={findProUrl(result.pro_search)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-3 font-bold hover:border-white/50"
                  >
                    📍 {tr("findPro")}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => readAloud(result)} className="rounded-xl border border-white/15 bg-panel py-3 font-semibold">
              🔊 {tr("readAloud")}
            </button>
            <button onClick={reset} className="rounded-xl bg-brand py-3 font-extrabold text-white">
              ＋ {tr("newIssue")}
            </button>
          </div>
        </section>
      )}

      <p className="mt-6 text-center text-xs text-muted">{tr("disclaimer")}</p>

      {history.length > 0 && !result && (
        <section className="mt-8">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">{tr("history")}</h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => { setGuidance({}); setCurrent(h); window.scrollTo({ top: 0 }); }}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-panel p-3 text-start"
                >
                  {h.thumb
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={h.thumb} alt="" className="size-10 rounded-lg object-cover" />
                    : <span className="flex size-10 items-center justify-center">{PATH_ICON[h.d.path]}</span>}
                  <span className="flex-1 truncate">{h.d.title}</span>
                  {h.d.steps.length > 0 && (
                    <span className="text-xs text-muted">{h.done.filter(Boolean).length}/{h.d.steps.length}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-12 flex flex-col items-center gap-1 text-xs text-muted">
        <Logo small />
        <span>by Manny X · mannyxgoat.com</span>
      </footer>
    </main>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-3">
      <p className="text-xs font-bold text-muted">{label}</p>
      <div className="mt-1 text-base font-extrabold">{children}</div>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-4">
      <h3 className="mb-2 font-extrabold">{title}</h3>
      <ul className="list-disc space-y-1.5 ps-5 text-white/90 marker:text-brand">
        {items.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

function ShopCard({ title, items }: { title: string; items: { name: string; price?: string; search: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-4">
      <h3 className="mb-2 font-extrabold">{title}</h3>
      <ul className="divide-y divide-white/10">
        {items.map((it, i) => (
          <li key={i} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-snug">{it.name}</p>
              {it.price && <p className="text-sm text-muted">~{it.price.replace(/^~/, "")}</p>}
            </div>
            <div className="flex gap-2">
              <a href={amazonUrl(it.search)} target="_blank" rel="noopener noreferrer sponsored"
                className="rounded-full bg-[#FF9900] px-3 py-1.5 text-xs font-extrabold text-black">
                Amazon ↗
              </a>
              <a href={homeDepotUrl(it.search)} target="_blank" rel="noopener noreferrer"
                className="rounded-full bg-[#F96302] px-3 py-1.5 text-xs font-extrabold text-white">
                Home Depot ↗
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
