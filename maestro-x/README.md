# Maestro X

Snap a photo, speak, or type a home-repair problem in any language. AI answers in that language with one of three paths:
- 🛠️ **Self-service**: safe DIY steps
- 👷 **Call a professional**: what to tell them and why
- 🚨 **Emergency**: safety actions plus a one-tap call to the local emergency number

## Stack
Next.js (App Router) · Tailwind · Claude API for photo and text diagnosis · browser speech API for voice input and read-aloud (free) · history saved on the device.
Supabase (accounts and cloud history) gets added once the account is active.

## Run
```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY (from console.anthropic.com)
npm run dev                  # http://localhost:3000
```
With no key, the app runs in demo mode.

## Languages
16 UI languages in `src/lib/i18n.ts`: EN, ES, PT, FR, HT, ZH, AR, RU, HI, BN, KO, VI, IT, DE, PL, UR. Arabic and Urdu display right to left.
The AI replies in whichever language is selected. Add a language by adding one block to the file.
Rename the app: change `APP_NAME` in `src/lib/i18n.ts`.

## Deploy
Push to GitHub, import the repo in Vercel, and add `ANTHROPIC_API_KEY` as an environment variable.
