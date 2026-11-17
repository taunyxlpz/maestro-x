"use client";

import { useEffect, useRef, useState } from "react";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { LANGUAGES, detectLang, emergencyNumber, getLang, t } from "@/lib/i18n";
import type { Diagnosis } from "./api/diagnose/route";

type HistoryItem = { id: string; at: number; text: string; d: Diagnosis };

// Minimal typing for the browser speech API
type SR = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start: () => void; stop: () => void;
};

async function shrinkImage(file: File, max = 1280): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * scale);
  c.height = Math.round(img.height * scale);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL("image/jpeg", 0.82);
}

const PATH_STYLE: Record<Diagnosis["path"], { card: string; label: string }> = {
  self_service: { card: "border-emerald-500/60 bg-emerald-500/10", label: "text-emerald-400" },
  professional: { card: "border-amber-400/60 bg-amber-400/10", label: "text-amber-300" },
  emergency: { card: "border-brand bg-brand/20 shadow-[0_0_40px_rgba(227,18,11,0.35)]", label: "text-brand-hi" },
};
const PATH_ICON: Record<Diagnosis["path"], string> = { self_service: "🛠️", professional: "👷", emergency: "🚨" };
const CONF_DOTS = { low: 1, medium: 2, high: 3 } as const;

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
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<SR | null>(null);
  const nativeHeard = useRef("");
  const nativeHandles = useRef<PluginListenerHandle[]>([]);

  const L = getLang(lang);
  const tr = (k: Parameters<typeof t>[1], v?: Record<string, string>) => t(lang, k, v);

  // Read browser language + saved data once on the client (not available during SSR)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    setLang(saved ?? detectLang(langs));
    setEmergency(emergencyNumber(langs));
    try { setHistory(JSON.parse(localStorage.getItem("history") ?? "[]")); } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = L.rtl ? "rtl" : "ltr";
  }, [lang, L.rtl]);

  function changeLang(code: string) {
    setLang(code);
    try { localStorage.setItem("lang", code); } catch {}
  }

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try { setImage(await shrinkImage(f)); } catch { setError(tr("errorMsg")); }
    e.target.value = "";
  }

  // Inside the iPhone/Android app: use the phone's native speech recognition
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
    const parts = [d.title, d.emergency_action, d.summary, ...d.safety, ...d.steps.map((s, i) => `${i + 1}. ${s}`)];
    const u = new SpeechSynthesisUtterance(parts.filter(Boolean).join(". "));
    u.lang = L.speech;
    speechSynthesis.speak(u);
  }

  async function diagnose() {
    if (!text.trim() && !image) { setError(tr("needInput")); return; }
    setError(null); setLoading(true); setResult(null);
    try {
      const r = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, image, langName: L.english, region: emergency.region }),
      });
      if (!r.ok) throw new Error();
      const d = (await r.json()) as Diagnosis;
      setResult(d);
      const item: HistoryItem = { id: crypto.randomUUID(), at: Date.now(), text: text || d.title, d };
      const next = [item, ...history].slice(0, 20);
      setHistory(next);
      try { localStorage.setItem("history", JSON.stringify(next)); } catch {}
    } catch {
      setError(tr("errorMsg"));
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    speechSynthesis?.cancel?.();
    setResult(null); setText(""); setImage(null); setError(null);
  }

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-16 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-3xl md:px-8 md:pt-10 lg:max-w-4xl">
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
          <label className="block text-lg font-bold" htmlFor="desc">{tr("describe")}</label>

          {image ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="max-h-72 w-full rounded-xl object-cover" />
              <button onClick={() => setImage(null)} className="absolute end-2 top-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
                {tr("removePhoto")}
              </button>
            </div>
          ) : null}

          <textarea
            id="desc"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ minHeight: "7rem" }}
            placeholder={tr("placeholder")}
            className="w-full resize-none rounded-xl border border-white/15 bg-ink p-3 text-base text-white outline-none placeholder:text-muted focus:border-brand"
          />

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-white/15 bg-ink py-3 font-semibold hover:border-white/40">
              📷 {tr("photo")}
            </button>
            <button
              onClick={toggleVoice}
              className={`rounded-xl border bg-ink py-3 font-semibold ${listening ? "animate-pulse border-brand text-brand-hi" : "border-white/15 hover:border-white/40"}`}
            >
              🎙️ {listening ? tr("listening") : tr("speak")}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={onPhoto} />

          {error && <p className="text-sm text-brand-hi">{error}</p>}

          <button
            onClick={diagnose}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 text-lg font-extrabold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(227,18,11,0.45)] transition hover:bg-brand-hi disabled:opacity-80"
          >
            {loading && <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            {loading ? tr("analyzing") : tr("analyze")}
          </button>
        </section>
      )}

      {result && (
        <section className="space-y-4">
          <div className={`rounded-2xl border-2 p-4 ${PATH_STYLE[result.path].card}`}>
            <p className={`text-sm font-extrabold uppercase tracking-widest ${PATH_STYLE[result.path].label}`}>
              {PATH_ICON[result.path]} {tr(result.path)}
            </p>
            <h2 className="mt-1 text-xl font-black">{result.title}</h2>
            {result.emergency_action && <p className="mt-2 text-lg font-bold text-white">{result.emergency_action}</p>}
            <p className="mt-2 text-white/85">{result.summary}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              {tr("confidence")}
              <span className="tracking-widest">
                {[1, 2, 3].map((n) => (
                  <span key={n} className={n <= (CONF_DOTS[result.confidence] ?? 1) ? "text-white" : "text-white/20"}>●</span>
                ))}
              </span>
            </p>
            {result.path === "emergency" && (
              <a href={`tel:${emergency.number}`} className="mt-4 block animate-pulse rounded-xl bg-brand py-4 text-center text-lg font-extrabold text-white shadow-[0_0_30px_rgba(255,59,48,0.6)]">
                📞 {tr("callEmergency", { n: emergency.number })}
              </a>
            )}
          </div>

          <div className="grid gap-4 md:grid-flow-dense md:grid-cols-2 md:items-start">
            <Card className="md:col-start-1" title={`⚠️ ${tr("safety")}`} items={result.safety} />
            <Card className="md:col-start-2 md:row-span-3 md:row-start-1" title={tr("steps")} items={result.steps} ordered />
            <Card className="md:col-start-1" title={`🧰 ${tr("tools")}`} items={result.tools} />
            <Card className="md:col-start-1" title={`👷 ${tr("callPro")}`} items={result.call_pro_if} />
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
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => setResult(h.d)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-panel p-3 text-start"
                >
                  <span>{PATH_ICON[h.d.path]}</span>
                  <span className="flex-1 truncate">{h.d.title}</span>
                  <span className="text-xs text-muted">{new Date(h.at).toLocaleDateString(lang)}</span>
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

function Card({ title, items, ordered, className = "" }: { title: string; items: string[]; ordered?: boolean; className?: string }) {
  if (!items?.length) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <div className={`rounded-2xl border border-white/10 bg-panel p-4 ${className}`}>
      <h3 className="mb-2 font-extrabold">{title}</h3>
      <List className={`space-y-1.5 ps-5 text-white/90 ${ordered ? "list-decimal marker:font-bold marker:text-brand-hi" : "list-disc marker:text-brand"}`}>
        {items.map((s, i) => <li key={i}>{s}</li>)}
      </List>
    </div>
  );
}
