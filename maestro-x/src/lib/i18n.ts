// UI translations. The AI itself answers in ANY language the user writes or speaks in;
// these strings only cover the buttons and labels. Add a language by adding one block.

export const APP_NAME = "Maestro X";

export type Lang = {
  code: string; // BCP-47 base code
  name: string; // native name
  english: string;
  speech: string; // locale for voice input / read aloud
  rtl?: boolean;
};

export const LANGUAGES: Lang[] = [
  { code: "en", name: "English", english: "English", speech: "en-US" },
  { code: "es", name: "Español", english: "Spanish", speech: "es-US" },
  { code: "pt", name: "Português", english: "Portuguese", speech: "pt-BR" },
  { code: "fr", name: "Français", english: "French", speech: "fr-FR" },
  { code: "ht", name: "Kreyòl ayisyen", english: "Haitian Creole", speech: "fr-HT" },
  { code: "zh", name: "中文", english: "Mandarin Chinese", speech: "zh-CN" },
  { code: "ar", name: "العربية", english: "Arabic", speech: "ar-SA", rtl: true },
  { code: "ru", name: "Русский", english: "Russian", speech: "ru-RU" },
  { code: "hi", name: "हिन्दी", english: "Hindi", speech: "hi-IN" },
  { code: "bn", name: "বাংলা", english: "Bengali", speech: "bn-BD" },
  { code: "ko", name: "한국어", english: "Korean", speech: "ko-KR" },
  { code: "vi", name: "Tiếng Việt", english: "Vietnamese", speech: "vi-VN" },
  { code: "it", name: "Italiano", english: "Italian", speech: "it-IT" },
  { code: "de", name: "Deutsch", english: "German", speech: "de-DE" },
  { code: "pl", name: "Polski", english: "Polish", speech: "pl-PL" },
  { code: "ur", name: "اردو", english: "Urdu", speech: "ur-PK", rtl: true },
];

export type StringKey =
  | "tagline" | "describe" | "placeholder" | "photo" | "speak" | "listening"
  | "analyze" | "analyzing" | "self_service" | "professional" | "emergency"
  | "steps" | "safety" | "callPro" | "tools" | "readAloud" | "newIssue"
  | "history" | "callEmergency" | "disclaimer" | "errorMsg" | "needInput"
  | "confidence" | "removePhoto";

type Dict = Record<StringKey, string>;

const en: Dict = {
  tagline: "Snap it. Say it. Fix it — in your language.",
  describe: "What's wrong?",
  placeholder: "Describe the problem, or tap Speak…",
  photo: "Add photo",
  speak: "Speak",
  listening: "Listening…",
  analyze: "Diagnose",
  analyzing: "Analyzing…",
  self_service: "You can fix this",
  professional: "Call a professional",
  emergency: "Emergency",
  steps: "Steps",
  safety: "Safety first",
  callPro: "Call a pro if",
  tools: "Tools & parts",
  readAloud: "Read aloud",
  newIssue: "New problem",
  history: "Recent",
  callEmergency: "Call {n} now",
  disclaimer: "AI guidance can be wrong. If you are unsure or feel unsafe, stop and call a professional.",
  errorMsg: "Something went wrong. Please try again.",
  needInput: "Add a photo or describe the problem.",
  confidence: "Confidence",
  removePhoto: "Remove",
};

const es: Dict = {
  tagline: "Tómale foto. Dilo. Arréglalo — en tu idioma.",
  describe: "¿Qué pasa?",
  placeholder: "Describe el problema o toca Hablar…",
  photo: "Agregar foto",
  speak: "Hablar",
  listening: "Escuchando…",
  analyze: "Diagnosticar",
  analyzing: "Analizando…",
  self_service: "Lo puedes arreglar tú",
  professional: "Llama a un profesional",
  emergency: "Emergencia",
  steps: "Pasos",
  safety: "Primero la seguridad",
  callPro: "Llama a un profesional si",
  tools: "Herramientas y piezas",
  readAloud: "Leer en voz alta",
  newIssue: "Nuevo problema",
  history: "Recientes",
  callEmergency: "Llamar al {n} ahora",
  disclaimer: "La IA puede equivocarse. Si no estás seguro o te sientes en peligro, detente y llama a un profesional.",
  errorMsg: "Algo salió mal. Inténtalo de nuevo.",
  needInput: "Agrega una foto o describe el problema.",
  confidence: "Confianza",
  removePhoto: "Quitar",
};

const pt: Dict = {
  tagline: "Fotografe. Fale. Conserte — no seu idioma.",
  describe: "Qual é o problema?",
  placeholder: "Descreva o problema ou toque em Falar…",
  photo: "Adicionar foto",
  speak: "Falar",
  listening: "Ouvindo…",
  analyze: "Diagnosticar",
  analyzing: "Analisando…",
  self_service: "Você mesmo pode consertar",
  professional: "Chame um profissional",
  emergency: "Emergência",
  steps: "Passos",
  safety: "Segurança em primeiro lugar",
  callPro: "Chame um profissional se",
  tools: "Ferramentas e peças",
  readAloud: "Ler em voz alta",
  newIssue: "Novo problema",
  history: "Recentes",
  callEmergency: "Ligar para {n} agora",
  disclaimer: "A IA pode errar. Se tiver dúvida ou não se sentir seguro, pare e chame um profissional.",
  errorMsg: "Algo deu errado. Tente novamente.",
  needInput: "Adicione uma foto ou descreva o problema.",
  confidence: "Confiança",
  removePhoto: "Remover",
};

const fr: Dict = {
  tagline: "Photographiez. Dites-le. Réparez — dans votre langue.",
  describe: "Quel est le problème ?",
  placeholder: "Décrivez le problème ou appuyez sur Parler…",
  photo: "Ajouter une photo",
  speak: "Parler",
  listening: "À l'écoute…",
  analyze: "Diagnostiquer",
  analyzing: "Analyse en cours…",
  self_service: "Vous pouvez le réparer",
  professional: "Appelez un professionnel",
  emergency: "Urgence",
  steps: "Étapes",
  safety: "La sécurité d'abord",
  callPro: "Appelez un pro si",
  tools: "Outils et pièces",
  readAloud: "Lire à voix haute",
  newIssue: "Nouveau problème",
  history: "Récents",
  callEmergency: "Appeler le {n} maintenant",
  disclaimer: "L'IA peut se tromper. En cas de doute ou de danger, arrêtez et appelez un professionnel.",
  errorMsg: "Une erreur s'est produite. Réessayez.",
  needInput: "Ajoutez une photo ou décrivez le problème.",
  confidence: "Confiance",
  removePhoto: "Retirer",
};

const ht: Dict = {
  tagline: "Pran foto. Di l. Ranje l — nan lang ou.",
  describe: "Ki pwoblèm nan?",
  placeholder: "Dekri pwoblèm nan, oswa peze Pale…",
  photo: "Ajoute foto",
  speak: "Pale",
  listening: "M ap koute…",
  analyze: "Dyagnostike",
  analyzing: "M ap analize…",
  self_service: "Ou ka ranje l ou menm",
  professional: "Rele yon pwofesyonèl",
  emergency: "Ijans",
  steps: "Etap yo",
  safety: "Sekirite an premye",
  callPro: "Rele yon pwofesyonèl si",
  tools: "Zouti ak pyès",
  readAloud: "Li l fò",
  newIssue: "Nouvo pwoblèm",
  history: "Resan",
  callEmergency: "Rele {n} kounye a",
  disclaimer: "IA a ka fè erè. Si ou pa sèten oswa ou pa santi ou an sekirite, kanpe epi rele yon pwofesyonèl.",
  errorMsg: "Gen yon bagay ki pa mache. Eseye ankò.",
  needInput: "Ajoute yon foto oswa dekri pwoblèm nan.",
  confidence: "Konfyans",
  removePhoto: "Retire",
};

const zh: Dict = {
  tagline: "拍一张，说一句，修好它 —— 用你的语言。",
  describe: "出了什么问题？",
  placeholder: "描述问题，或点击“说话”…",
  photo: "添加照片",
  speak: "说话",
  listening: "正在听…",
  analyze: "诊断",
  analyzing: "分析中…",
  self_service: "你可以自己修",
  professional: "请联系专业人员",
  emergency: "紧急情况",
  steps: "步骤",
  safety: "安全第一",
  callPro: "以下情况请找专业人员",
  tools: "工具和零件",
  readAloud: "朗读",
  newIssue: "新问题",
  history: "最近",
  callEmergency: "立即拨打 {n}",
  disclaimer: "AI 建议可能有误。如果不确定或感到不安全，请停止并联系专业人员。",
  errorMsg: "出错了，请重试。",
  needInput: "请添加照片或描述问题。",
  confidence: "可信度",
  removePhoto: "移除",
};

const ar: Dict = {
  tagline: "صوّرها. قلها. أصلحها — بلغتك.",
  describe: "ما المشكلة؟",
  placeholder: "صف المشكلة أو اضغط تحدّث…",
  photo: "إضافة صورة",
  speak: "تحدّث",
  listening: "جارٍ الاستماع…",
  analyze: "تشخيص",
  analyzing: "جارٍ التحليل…",
  self_service: "يمكنك إصلاحها بنفسك",
  professional: "اتصل بفني مختص",
  emergency: "طوارئ",
  steps: "الخطوات",
  safety: "السلامة أولاً",
  callPro: "اتصل بمختص إذا",
  tools: "الأدوات والقطع",
  readAloud: "قراءة بصوت عالٍ",
  newIssue: "مشكلة جديدة",
  history: "الأخيرة",
  callEmergency: "اتصل بـ {n} الآن",
  disclaimer: "قد يخطئ الذكاء الاصطناعي. إذا لم تكن متأكدًا أو شعرت بالخطر، توقف واتصل بمختص.",
  errorMsg: "حدث خطأ. حاول مرة أخرى.",
  needInput: "أضف صورة أو صف المشكلة.",
  confidence: "درجة الثقة",
  removePhoto: "إزالة",
};

const ru: Dict = {
  tagline: "Сфотографируй. Скажи. Почини — на своём языке.",
  describe: "Что случилось?",
  placeholder: "Опишите проблему или нажмите «Сказать»…",
  photo: "Добавить фото",
  speak: "Сказать",
  listening: "Слушаю…",
  analyze: "Диагностика",
  analyzing: "Анализ…",
  self_service: "Можно починить самому",
  professional: "Вызовите специалиста",
  emergency: "Экстренная ситуация",
  steps: "Шаги",
  safety: "Безопасность прежде всего",
  callPro: "Вызовите специалиста, если",
  tools: "Инструменты и детали",
  readAloud: "Прочитать вслух",
  newIssue: "Новая проблема",
  history: "Недавние",
  callEmergency: "Позвонить {n} сейчас",
  disclaimer: "ИИ может ошибаться. Если вы не уверены или чувствуете опасность, остановитесь и вызовите специалиста.",
  errorMsg: "Что-то пошло не так. Попробуйте ещё раз.",
  needInput: "Добавьте фото или опишите проблему.",
  confidence: "Уверенность",
  removePhoto: "Удалить",
};

const hi: Dict = {
  tagline: "फ़ोटो लें। बोलें। ठीक करें — अपनी भाषा में।",
  describe: "क्या समस्या है?",
  placeholder: "समस्या लिखें, या बोलें दबाएँ…",
  photo: "फ़ोटो जोड़ें",
  speak: "बोलें",
  listening: "सुन रहा है…",
  analyze: "जाँच करें",
  analyzing: "विश्लेषण हो रहा है…",
  self_service: "आप इसे खुद ठीक कर सकते हैं",
  professional: "किसी पेशेवर को बुलाएँ",
  emergency: "आपातकाल",
  steps: "चरण",
  safety: "सुरक्षा पहले",
  callPro: "पेशेवर को बुलाएँ अगर",
  tools: "औज़ार और पुर्ज़े",
  readAloud: "पढ़कर सुनाएँ",
  newIssue: "नई समस्या",
  history: "हाल के",
  callEmergency: "अभी {n} पर कॉल करें",
  disclaimer: "AI गलत हो सकता है। अगर आप निश्चित नहीं हैं या असुरक्षित महसूस करते हैं, तो रुकें और पेशेवर को बुलाएँ।",
  errorMsg: "कुछ गलत हो गया। फिर से कोशिश करें।",
  needInput: "फ़ोटो जोड़ें या समस्या बताएँ।",
  confidence: "विश्वास स्तर",
  removePhoto: "हटाएँ",
};

const bn: Dict = {
  tagline: "ছবি তুলুন। বলুন। ঠিক করুন — আপনার ভাষায়।",
  describe: "সমস্যা কী?",
  placeholder: "সমস্যাটি লিখুন, অথবা বলুন চাপুন…",
  photo: "ছবি যোগ করুন",
  speak: "বলুন",
  listening: "শুনছি…",
  analyze: "নির্ণয় করুন",
  analyzing: "বিশ্লেষণ চলছে…",
  self_service: "আপনি নিজেই ঠিক করতে পারবেন",
  professional: "একজন পেশাদারকে ডাকুন",
  emergency: "জরুরি অবস্থা",
  steps: "ধাপসমূহ",
  safety: "নিরাপত্তা আগে",
  callPro: "পেশাদার ডাকুন যদি",
  tools: "যন্ত্রপাতি ও যন্ত্রাংশ",
  readAloud: "জোরে পড়ুন",
  newIssue: "নতুন সমস্যা",
  history: "সাম্প্রতিক",
  callEmergency: "এখনই {n}-এ কল করুন",
  disclaimer: "AI ভুল করতে পারে। নিশ্চিত না হলে বা অনিরাপদ মনে হলে থামুন এবং পেশাদার ডাকুন।",
  errorMsg: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
  needInput: "একটি ছবি যোগ করুন বা সমস্যাটি লিখুন।",
  confidence: "নিশ্চয়তা",
  removePhoto: "সরান",
};

const ko: Dict = {
  tagline: "찍고, 말하고, 고치세요 — 당신의 언어로.",
  describe: "무엇이 문제인가요?",
  placeholder: "문제를 설명하거나 말하기를 누르세요…",
  photo: "사진 추가",
  speak: "말하기",
  listening: "듣는 중…",
  analyze: "진단하기",
  analyzing: "분석 중…",
  self_service: "직접 고칠 수 있어요",
  professional: "전문가를 부르세요",
  emergency: "긴급 상황",
  steps: "단계",
  safety: "안전 우선",
  callPro: "이럴 땐 전문가를 부르세요",
  tools: "도구 및 부품",
  readAloud: "소리 내어 읽기",
  newIssue: "새 문제",
  history: "최근",
  callEmergency: "지금 {n}에 전화",
  disclaimer: "AI 안내는 틀릴 수 있습니다. 확실하지 않거나 위험하다고 느끼면 멈추고 전문가를 부르세요.",
  errorMsg: "문제가 발생했습니다. 다시 시도하세요.",
  needInput: "사진을 추가하거나 문제를 설명하세요.",
  confidence: "신뢰도",
  removePhoto: "삭제",
};

const vi: Dict = {
  tagline: "Chụp. Nói. Sửa — bằng ngôn ngữ của bạn.",
  describe: "Có vấn đề gì?",
  placeholder: "Mô tả sự cố, hoặc nhấn Nói…",
  photo: "Thêm ảnh",
  speak: "Nói",
  listening: "Đang nghe…",
  analyze: "Chẩn đoán",
  analyzing: "Đang phân tích…",
  self_service: "Bạn có thể tự sửa",
  professional: "Hãy gọi thợ chuyên nghiệp",
  emergency: "Khẩn cấp",
  steps: "Các bước",
  safety: "An toàn là trên hết",
  callPro: "Gọi thợ nếu",
  tools: "Dụng cụ và phụ tùng",
  readAloud: "Đọc to",
  newIssue: "Sự cố mới",
  history: "Gần đây",
  callEmergency: "Gọi {n} ngay",
  disclaimer: "AI có thể sai. Nếu không chắc chắn hoặc cảm thấy không an toàn, hãy dừng lại và gọi thợ.",
  errorMsg: "Đã xảy ra lỗi. Vui lòng thử lại.",
  needInput: "Thêm ảnh hoặc mô tả sự cố.",
  confidence: "Độ tin cậy",
  removePhoto: "Xóa",
};

const it: Dict = {
  tagline: "Scatta. Dillo. Aggiustalo — nella tua lingua.",
  describe: "Qual è il problema?",
  placeholder: "Descrivi il problema o tocca Parla…",
  photo: "Aggiungi foto",
  speak: "Parla",
  listening: "In ascolto…",
  analyze: "Diagnostica",
  analyzing: "Analisi in corso…",
  self_service: "Puoi ripararlo da solo",
  professional: "Chiama un professionista",
  emergency: "Emergenza",
  steps: "Passaggi",
  safety: "Prima la sicurezza",
  callPro: "Chiama un professionista se",
  tools: "Attrezzi e ricambi",
  readAloud: "Leggi ad alta voce",
  newIssue: "Nuovo problema",
  history: "Recenti",
  callEmergency: "Chiama il {n} ora",
  disclaimer: "L'IA può sbagliare. Se hai dubbi o non ti senti al sicuro, fermati e chiama un professionista.",
  errorMsg: "Qualcosa è andato storto. Riprova.",
  needInput: "Aggiungi una foto o descrivi il problema.",
  confidence: "Affidabilità",
  removePhoto: "Rimuovi",
};

const de: Dict = {
  tagline: "Foto machen. Sagen. Reparieren — in deiner Sprache.",
  describe: "Was ist kaputt?",
  placeholder: "Beschreibe das Problem oder tippe auf Sprechen…",
  photo: "Foto hinzufügen",
  speak: "Sprechen",
  listening: "Hört zu…",
  analyze: "Diagnose",
  analyzing: "Wird analysiert…",
  self_service: "Das kannst du selbst reparieren",
  professional: "Fachkraft rufen",
  emergency: "Notfall",
  steps: "Schritte",
  safety: "Sicherheit zuerst",
  callPro: "Fachkraft rufen, wenn",
  tools: "Werkzeug & Teile",
  readAloud: "Vorlesen",
  newIssue: "Neues Problem",
  history: "Zuletzt",
  callEmergency: "Jetzt {n} anrufen",
  disclaimer: "KI kann sich irren. Wenn du unsicher bist oder dich nicht sicher fühlst, hör auf und ruf eine Fachkraft.",
  errorMsg: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
  needInput: "Füge ein Foto hinzu oder beschreibe das Problem.",
  confidence: "Sicherheit der Einschätzung",
  removePhoto: "Entfernen",
};

const pl: Dict = {
  tagline: "Zrób zdjęcie. Powiedz. Napraw — w swoim języku.",
  describe: "Co się zepsuło?",
  placeholder: "Opisz problem lub dotknij Mów…",
  photo: "Dodaj zdjęcie",
  speak: "Mów",
  listening: "Słucham…",
  analyze: "Diagnozuj",
  analyzing: "Analizuję…",
  self_service: "Możesz to naprawić sam",
  professional: "Wezwij fachowca",
  emergency: "Sytuacja awaryjna",
  steps: "Kroki",
  safety: "Bezpieczeństwo przede wszystkim",
  callPro: "Wezwij fachowca, jeśli",
  tools: "Narzędzia i części",
  readAloud: "Czytaj na głos",
  newIssue: "Nowy problem",
  history: "Ostatnie",
  callEmergency: "Zadzwoń teraz pod {n}",
  disclaimer: "AI może się mylić. Jeśli nie masz pewności lub czujesz zagrożenie, przerwij i wezwij fachowca.",
  errorMsg: "Coś poszło nie tak. Spróbuj ponownie.",
  needInput: "Dodaj zdjęcie lub opisz problem.",
  confidence: "Pewność",
  removePhoto: "Usuń",
};

const ur: Dict = {
  tagline: "تصویر لیں۔ بولیں۔ ٹھیک کریں — اپنی زبان میں۔",
  describe: "کیا مسئلہ ہے؟",
  placeholder: "مسئلہ لکھیں، یا بولیں دبائیں…",
  photo: "تصویر شامل کریں",
  speak: "بولیں",
  listening: "سن رہا ہے…",
  analyze: "تشخیص کریں",
  analyzing: "تجزیہ ہو رہا ہے…",
  self_service: "آپ اسے خود ٹھیک کر سکتے ہیں",
  professional: "کسی ماہر کو بلائیں",
  emergency: "ہنگامی صورتحال",
  steps: "مراحل",
  safety: "حفاظت پہلے",
  callPro: "ماہر کو بلائیں اگر",
  tools: "اوزار اور پرزے",
  readAloud: "بلند آواز میں پڑھیں",
  newIssue: "نیا مسئلہ",
  history: "حالیہ",
  callEmergency: "ابھی {n} پر کال کریں",
  disclaimer: "AI غلط ہو سکتا ہے۔ اگر آپ کو یقین نہیں یا خطرہ محسوس ہو تو رک جائیں اور ماہر کو بلائیں۔",
  errorMsg: "کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔",
  needInput: "تصویر شامل کریں یا مسئلہ بیان کریں۔",
  confidence: "اعتماد",
  removePhoto: "ہٹائیں",
};

const DICTS: Record<string, Dict> = { en, es, pt, fr, ht, zh, ar, ru, hi, bn, ko, vi, it, de, pl, ur };

export function t(lang: string, key: StringKey, vars?: Record<string, string>): string {
  let s = (DICTS[lang] ?? en)[key] ?? en[key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

export function getLang(code: string): Lang {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

/** Pick the best supported language from the browser's language list. */
export function detectLang(browserLangs: readonly string[]): string {
  for (const bl of browserLangs) {
    const base = bl.toLowerCase().split("-")[0];
    if (DICTS[base]) return base;
  }
  return "en";
}

/** Emergency numbers by country (region from the browser locale). Fallback: 911. */
const EMERGENCY: Record<string, string> = {
  US: "911", CA: "911", MX: "911", DO: "911", PR: "911", HT: "114", BR: "190", PT: "112",
  ES: "112", FR: "112", DE: "112", IT: "112", PL: "112", GB: "999", IE: "112",
  CN: "119", KR: "119", VN: "114", IN: "112", BD: "999", PK: "15", RU: "112",
  SA: "911", AE: "999", EG: "122", CO: "123", AR: "911", CL: "131", PE: "105", VE: "911",
};

export function emergencyNumber(browserLangs: readonly string[]): { number: string; region: string } {
  for (const bl of browserLangs) {
    const region = bl.split("-")[1]?.toUpperCase();
    if (region && EMERGENCY[region]) return { number: EMERGENCY[region], region };
  }
  return { number: "911", region: "US" };
}
