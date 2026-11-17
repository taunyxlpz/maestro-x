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
  | "confidence" | "removePhoto" | ExtraKey;

type ExtraKey =
  | "photosHint" | "diff_easy" | "diff_medium" | "diff_pro" | "timeLabel" | "costLabel"
  | "alsoCouldBe" | "findPro" | "doneOf" | "stuck" | "looksGood" | "whatISee"
  | "priceNote" | "partsLabel" | "toolsLabel"
  | "takePhoto" | "uploadPhoto" | "whereIsIt" | "room_kitchen" | "room_bathroom" | "room_bedroom"
  | "room_living" | "room_laundry" | "room_outside" | "an1" | "an2" | "an3" | "difficulty";

type Dict = Record<Exclude<StringKey, ExtraKey>, string>;
type ExtraDict = Record<ExtraKey, string>;

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


// Added with the richer diagnosis (photos, buy links, checkable steps).
const EXTRA: Record<string, ExtraDict> = {
  en: { photosHint: "Add up to 4 photos from different angles", diff_easy: "Easy", diff_medium: "Medium", diff_pro: "Pro job", timeLabel: "Time", costLabel: "Cost", alsoCouldBe: "It could also be", findPro: "Find a pro near me", doneOf: "{n} of {m} done", stuck: "Stuck? Send a photo", looksGood: "Looking good 👍", whatISee: "Here's what I see", priceNote: "Prices are estimates. Check before you buy.", partsLabel: "Parts to buy", toolsLabel: "Tools you'll need", takePhoto: "Take photo", uploadPhoto: "Upload photos", whereIsIt: "Where is it?", room_kitchen: "Kitchen", room_bathroom: "Bathroom", room_bedroom: "Bedroom", room_living: "Living room", room_laundry: "Laundry", room_outside: "Outside", an1: "Looking at your photos…", an2: "Finding the problem…", an3: "Checking it's safe…", difficulty: "Difficulty" },
  es: { photosHint: "Agrega hasta 4 fotos desde diferentes ángulos", diff_easy: "Fácil", diff_medium: "Intermedio", diff_pro: "Para un profesional", timeLabel: "Tiempo", costLabel: "Costo", alsoCouldBe: "También podría ser", findPro: "Buscar un profesional cerca", doneOf: "{n} de {m} listos", stuck: "¿Te trabaste? Manda una foto", looksGood: "¡Vas bien! 👍", whatISee: "Esto es lo que veo", priceNote: "Los precios son estimados. Verifica antes de comprar.", partsLabel: "Piezas para comprar", toolsLabel: "Herramientas que necesitas", takePhoto: "Tomar foto", uploadPhoto: "Subir fotos", whereIsIt: "¿Dónde está?", room_kitchen: "Cocina", room_bathroom: "Baño", room_bedroom: "Cuarto", room_living: "Sala", room_laundry: "Lavandería", room_outside: "Afuera", an1: "Mirando tus fotos…", an2: "Buscando el problema…", an3: "Revisando que sea seguro…", difficulty: "Dificultad" },
  pt: { photosHint: "Adicione até 4 fotos de ângulos diferentes", diff_easy: "Fácil", diff_medium: "Médio", diff_pro: "Para profissional", timeLabel: "Tempo", costLabel: "Custo", alsoCouldBe: "Também pode ser", findPro: "Encontrar um profissional perto", doneOf: "{n} de {m} feitos", stuck: "Travou? Mande uma foto", looksGood: "Está indo bem 👍", whatISee: "Isto é o que eu vejo", priceNote: "Preços estimados. Confira antes de comprar.", partsLabel: "Peças para comprar", toolsLabel: "Ferramentas necessárias", takePhoto: "Tirar foto", uploadPhoto: "Enviar fotos", whereIsIt: "Onde fica?", room_kitchen: "Cozinha", room_bathroom: "Banheiro", room_bedroom: "Quarto", room_living: "Sala", room_laundry: "Lavanderia", room_outside: "Área externa", an1: "Olhando suas fotos…", an2: "Encontrando o problema…", an3: "Verificando a segurança…", difficulty: "Dificuldade" },
  fr: { photosHint: "Ajoutez jusqu'à 4 photos sous différents angles", diff_easy: "Facile", diff_medium: "Moyen", diff_pro: "Pour un pro", timeLabel: "Temps", costLabel: "Coût", alsoCouldBe: "Ça pourrait aussi être", findPro: "Trouver un pro près de moi", doneOf: "{n} sur {m} faits", stuck: "Bloqué ? Envoie une photo", looksGood: "Ça a l'air bien 👍", whatISee: "Voici ce que je vois", priceNote: "Prix estimés. Vérifie avant d'acheter.", partsLabel: "Pièces à acheter", toolsLabel: "Outils nécessaires", takePhoto: "Prendre une photo", uploadPhoto: "Importer des photos", whereIsIt: "C'est où ?", room_kitchen: "Cuisine", room_bathroom: "Salle de bain", room_bedroom: "Chambre", room_living: "Salon", room_laundry: "Buanderie", room_outside: "Extérieur", an1: "J'examine tes photos…", an2: "Je cherche le problème…", an3: "Je vérifie la sécurité…", difficulty: "Difficulté" },
  ht: { photosHint: "Ajoute jiska 4 foto nan diferan ang", diff_easy: "Fasil", diff_medium: "Mwayen", diff_pro: "Pou yon pwofesyonèl", timeLabel: "Tan", costLabel: "Pri", alsoCouldBe: "Li ta ka tou", findPro: "Jwenn yon pwofesyonèl toupre", doneOf: "{n} sou {m} fini", stuck: "Ou bloke? Voye yon foto", looksGood: "Sa sanble bon 👍", whatISee: "Men sa m wè", priceNote: "Pri yo se estimasyon. Verifye anvan ou achte.", partsLabel: "Pyès pou achte", toolsLabel: "Zouti ou bezwen", takePhoto: "Pran foto", uploadPhoto: "Voye foto", whereIsIt: "Ki kote li ye?", room_kitchen: "Kizin", room_bathroom: "Twalèt", room_bedroom: "Chanm", room_living: "Salon", room_laundry: "Lesiv", room_outside: "Deyò", an1: "M ap gade foto ou yo…", an2: "M ap chèche pwoblèm nan…", an3: "M ap verifye sekirite…", difficulty: "Difikilte" },
  zh: { photosHint: "最多添加 4 张不同角度的照片", diff_easy: "简单", diff_medium: "中等", diff_pro: "需专业人员", timeLabel: "时间", costLabel: "费用", alsoCouldBe: "也可能是", findPro: "查找附近的师傅", doneOf: "已完成 {n}/{m}", stuck: "卡住了？发张照片", looksGood: "做得不错 👍", whatISee: "我看到的情况", priceNote: "价格为估算，购买前请核实。", partsLabel: "需要购买的零件", toolsLabel: "需要的工具", takePhoto: "拍照", uploadPhoto: "上传照片", whereIsIt: "在哪里？", room_kitchen: "厨房", room_bathroom: "浴室", room_bedroom: "卧室", room_living: "客厅", room_laundry: "洗衣房", room_outside: "室外", an1: "正在查看你的照片…", an2: "正在找问题…", an3: "正在检查安全…", difficulty: "难度" },
  ar: { photosHint: "أضف حتى 4 صور من زوايا مختلفة", diff_easy: "سهل", diff_medium: "متوسط", diff_pro: "يحتاج مختصًا", timeLabel: "الوقت", costLabel: "التكلفة", alsoCouldBe: "قد يكون أيضًا", findPro: "ابحث عن فني قريب", doneOf: "تم {n} من {m}", stuck: "علقت؟ أرسل صورة", looksGood: "يبدو جيدًا 👍", whatISee: "هذا ما أراه", priceNote: "الأسعار تقديرية. تحقق قبل الشراء.", partsLabel: "قطع للشراء", toolsLabel: "الأدوات المطلوبة", takePhoto: "التقط صورة", uploadPhoto: "رفع صور", whereIsIt: "أين هي؟", room_kitchen: "المطبخ", room_bathroom: "الحمام", room_bedroom: "غرفة النوم", room_living: "غرفة المعيشة", room_laundry: "غرفة الغسيل", room_outside: "الخارج", an1: "أنظر إلى صورك…", an2: "أبحث عن المشكلة…", an3: "أتحقق من السلامة…", difficulty: "الصعوبة" },
  ru: { photosHint: "Добавьте до 4 фото с разных сторон", diff_easy: "Легко", diff_medium: "Средне", diff_pro: "Работа для мастера", timeLabel: "Время", costLabel: "Стоимость", alsoCouldBe: "Ещё это может быть", findPro: "Найти мастера рядом", doneOf: "Готово {n} из {m}", stuck: "Застряли? Пришлите фото", looksGood: "Всё идёт хорошо 👍", whatISee: "Вот что я вижу", priceNote: "Цены примерные. Проверьте перед покупкой.", partsLabel: "Что купить", toolsLabel: "Нужные инструменты", takePhoto: "Сделать фото", uploadPhoto: "Загрузить фото", whereIsIt: "Где это?", room_kitchen: "Кухня", room_bathroom: "Ванная", room_bedroom: "Спальня", room_living: "Гостиная", room_laundry: "Прачечная", room_outside: "Снаружи", an1: "Смотрю ваши фото…", an2: "Ищу проблему…", an3: "Проверяю безопасность…", difficulty: "Сложность" },
  hi: { photosHint: "अलग-अलग कोणों से 4 तक फ़ोटो जोड़ें", diff_easy: "आसान", diff_medium: "मध्यम", diff_pro: "पेशेवर का काम", timeLabel: "समय", costLabel: "लागत", alsoCouldBe: "यह भी हो सकता है", findPro: "पास में पेशेवर खोजें", doneOf: "{m} में से {n} पूरे", stuck: "अटक गए? फ़ोटो भेजें", looksGood: "अच्छा चल रहा है 👍", whatISee: "मुझे यह दिख रहा है", priceNote: "कीमतें अनुमानित हैं। खरीदने से पहले जाँच लें।", partsLabel: "खरीदने के पुर्ज़े", toolsLabel: "ज़रूरी औज़ार", takePhoto: "फ़ोटो लें", uploadPhoto: "फ़ोटो अपलोड करें", whereIsIt: "यह कहाँ है?", room_kitchen: "रसोई", room_bathroom: "बाथरूम", room_bedroom: "बेडरूम", room_living: "बैठक", room_laundry: "लॉन्ड्री", room_outside: "बाहर", an1: "आपकी फ़ोटो देख रहा है…", an2: "समस्या ढूँढ रहा है…", an3: "सुरक्षा जाँच रहा है…", difficulty: "कठिनाई" },
  bn: { photosHint: "বিভিন্ন কোণ থেকে ৪টি পর্যন্ত ছবি দিন", diff_easy: "সহজ", diff_medium: "মাঝারি", diff_pro: "পেশাদারের কাজ", timeLabel: "সময়", costLabel: "খরচ", alsoCouldBe: "এটাও হতে পারে", findPro: "কাছের পেশাদার খুঁজুন", doneOf: "{m}টির মধ্যে {n}টি শেষ", stuck: "আটকে গেছেন? ছবি পাঠান", looksGood: "ভালো হচ্ছে 👍", whatISee: "আমি যা দেখছি", priceNote: "দাম আনুমানিক। কেনার আগে যাচাই করুন।", partsLabel: "কেনার যন্ত্রাংশ", toolsLabel: "প্রয়োজনীয় যন্ত্রপাতি", takePhoto: "ছবি তুলুন", uploadPhoto: "ছবি আপলোড করুন", whereIsIt: "কোথায়?", room_kitchen: "রান্নাঘর", room_bathroom: "বাথরুম", room_bedroom: "শোবার ঘর", room_living: "বসার ঘর", room_laundry: "লন্ড্রি", room_outside: "বাইরে", an1: "আপনার ছবি দেখছি…", an2: "সমস্যা খুঁজছি…", an3: "নিরাপত্তা যাচাই করছি…", difficulty: "কঠিনতা" },
  ko: { photosHint: "다른 각도에서 최대 4장까지 사진을 추가하세요", diff_easy: "쉬움", diff_medium: "보통", diff_pro: "전문가 작업", timeLabel: "시간", costLabel: "비용", alsoCouldBe: "이것일 수도 있어요", findPro: "근처 전문가 찾기", doneOf: "{m}개 중 {n}개 완료", stuck: "막혔나요? 사진을 보내세요", looksGood: "잘하고 있어요 👍", whatISee: "제가 보기엔", priceNote: "가격은 추정치입니다. 구매 전 확인하세요.", partsLabel: "구매할 부품", toolsLabel: "필요한 도구", takePhoto: "사진 찍기", uploadPhoto: "사진 올리기", whereIsIt: "어디인가요?", room_kitchen: "주방", room_bathroom: "욕실", room_bedroom: "침실", room_living: "거실", room_laundry: "세탁실", room_outside: "실외", an1: "사진을 살펴보는 중…", an2: "문제를 찾는 중…", an3: "안전을 확인하는 중…", difficulty: "난이도" },
  vi: { photosHint: "Thêm tối đa 4 ảnh từ các góc khác nhau", diff_easy: "Dễ", diff_medium: "Trung bình", diff_pro: "Cần thợ", timeLabel: "Thời gian", costLabel: "Chi phí", alsoCouldBe: "Cũng có thể là", findPro: "Tìm thợ gần tôi", doneOf: "Xong {n}/{m}", stuck: "Bị kẹt? Gửi ảnh", looksGood: "Đang ổn 👍", whatISee: "Đây là những gì tôi thấy", priceNote: "Giá chỉ là ước tính. Kiểm tra trước khi mua.", partsLabel: "Phụ tùng cần mua", toolsLabel: "Dụng cụ cần có", takePhoto: "Chụp ảnh", uploadPhoto: "Tải ảnh lên", whereIsIt: "Ở đâu?", room_kitchen: "Bếp", room_bathroom: "Phòng tắm", room_bedroom: "Phòng ngủ", room_living: "Phòng khách", room_laundry: "Phòng giặt", room_outside: "Bên ngoài", an1: "Đang xem ảnh của bạn…", an2: "Đang tìm sự cố…", an3: "Đang kiểm tra an toàn…", difficulty: "Độ khó" },
  it: { photosHint: "Aggiungi fino a 4 foto da angolazioni diverse", diff_easy: "Facile", diff_medium: "Media", diff_pro: "Da professionista", timeLabel: "Tempo", costLabel: "Costo", alsoCouldBe: "Potrebbe anche essere", findPro: "Trova un professionista vicino", doneOf: "{n} di {m} fatti", stuck: "Bloccato? Manda una foto", looksGood: "Sta andando bene 👍", whatISee: "Ecco cosa vedo", priceNote: "Prezzi stimati. Controlla prima di comprare.", partsLabel: "Pezzi da comprare", toolsLabel: "Attrezzi necessari", takePhoto: "Scatta foto", uploadPhoto: "Carica foto", whereIsIt: "Dov'è?", room_kitchen: "Cucina", room_bathroom: "Bagno", room_bedroom: "Camera", room_living: "Soggiorno", room_laundry: "Lavanderia", room_outside: "Esterno", an1: "Guardo le tue foto…", an2: "Cerco il problema…", an3: "Controllo la sicurezza…", difficulty: "Difficoltà" },
  de: { photosHint: "Füge bis zu 4 Fotos aus verschiedenen Winkeln hinzu", diff_easy: "Leicht", diff_medium: "Mittel", diff_pro: "Für Profis", timeLabel: "Zeit", costLabel: "Kosten", alsoCouldBe: "Es könnte auch sein", findPro: "Fachkraft in der Nähe finden", doneOf: "{n} von {m} erledigt", stuck: "Hängst du fest? Schick ein Foto", looksGood: "Sieht gut aus 👍", whatISee: "Das sehe ich", priceNote: "Preise sind Schätzungen. Vor dem Kauf prüfen.", partsLabel: "Teile zum Kaufen", toolsLabel: "Benötigtes Werkzeug", takePhoto: "Foto machen", uploadPhoto: "Fotos hochladen", whereIsIt: "Wo ist es?", room_kitchen: "Küche", room_bathroom: "Bad", room_bedroom: "Schlafzimmer", room_living: "Wohnzimmer", room_laundry: "Waschraum", room_outside: "Draußen", an1: "Ich schaue mir deine Fotos an…", an2: "Ich suche das Problem…", an3: "Ich prüfe die Sicherheit…", difficulty: "Schwierigkeit" },
  pl: { photosHint: "Dodaj do 4 zdjęć z różnych stron", diff_easy: "Łatwe", diff_medium: "Średnie", diff_pro: "Dla fachowca", timeLabel: "Czas", costLabel: "Koszt", alsoCouldBe: "To może być też", findPro: "Znajdź fachowca w pobliżu", doneOf: "Zrobione {n} z {m}", stuck: "Utknąłeś? Wyślij zdjęcie", looksGood: "Idzie dobrze 👍", whatISee: "Oto co widzę", priceNote: "Ceny są szacunkowe. Sprawdź przed zakupem.", partsLabel: "Części do kupienia", toolsLabel: "Potrzebne narzędzia", takePhoto: "Zrób zdjęcie", uploadPhoto: "Wgraj zdjęcia", whereIsIt: "Gdzie to jest?", room_kitchen: "Kuchnia", room_bathroom: "Łazienka", room_bedroom: "Sypialnia", room_living: "Salon", room_laundry: "Pralnia", room_outside: "Na zewnątrz", an1: "Oglądam twoje zdjęcia…", an2: "Szukam problemu…", an3: "Sprawdzam bezpieczeństwo…", difficulty: "Trudność" },
  ur: { photosHint: "مختلف زاویوں سے 4 تک تصاویر شامل کریں", diff_easy: "آسان", diff_medium: "درمیانہ", diff_pro: "ماہر کا کام", timeLabel: "وقت", costLabel: "لاگت", alsoCouldBe: "یہ بھی ہو سکتا ہے", findPro: "قریب ماہر تلاش کریں", doneOf: "{m} میں سے {n} مکمل", stuck: "پھنس گئے؟ تصویر بھیجیں", looksGood: "اچھا جا رہا ہے 👍", whatISee: "مجھے یہ نظر آ رہا ہے", priceNote: "قیمتیں اندازاً ہیں۔ خریدنے سے پہلے تصدیق کریں۔", partsLabel: "خریدنے کے پرزے", toolsLabel: "ضروری اوزار", takePhoto: "تصویر لیں", uploadPhoto: "تصاویر اپ لوڈ کریں", whereIsIt: "یہ کہاں ہے؟", room_kitchen: "باورچی خانہ", room_bathroom: "باتھ روم", room_bedroom: "سونے کا کمرہ", room_living: "بیٹھک", room_laundry: "لانڈری", room_outside: "باہر", an1: "آپ کی تصاویر دیکھ رہا ہے…", an2: "مسئلہ تلاش کر رہا ہے…", an3: "حفاظت جانچ رہا ہے…", difficulty: "مشکل" },
};

const DICTS: Record<string, Dict> = { en, es, pt, fr, ht, zh, ar, ru, hi, bn, ko, vi, it, de, pl, ur };

export function t(lang: string, key: StringKey, vars?: Record<string, string>): string {
  const base = { ...en, ...EXTRA.en };
  const dict = { ...(DICTS[lang] ?? en), ...(EXTRA[lang] ?? EXTRA.en) } as Record<StringKey, string>;
  let s = dict[key] ?? base[key];
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
