
# jmcaris_portfolio

Sumi-e editorial portfolio: React + TypeScript + Tailwind CSS v4 + Framer Motion (Vite, npm workspaces + Turbo).

```bash
npm install
npm run dev            # local dev server
npm run build          # type-check + production build
npm run build:github   # build for GitHub Pages (/jmcaris_portfolio/)
```

## Notes

- The opening "Ink Awakens" loader plays once per browser session (see `INTRO_KEY` in `apps/web/src/App.tsx`).
- Light rice-paper theme by default; "ink night" is toggled with the moon button (or the `D` key) and remembered.

## Ninja Girl Assistant (Gemini chatbot)

The site is static (GitHub Pages), so the Gemini key lives in a small Cloudflare Worker in `workers/gemini-chat`. The browser only knows the Worker's public URL (`VITE_CHAT_API_URL`).

### Deploy once

```bash
cd workers/gemini-chat
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

Then in GitHub:

1. Go to **Settings → Secrets and variables → Actions → Variables**.
2. Add a new variable named `VITE_CHAT_API_URL`.
3. Set its value to your deployed Cloudflare Worker's URL.
4. Re-run the GitHub Pages deployment workflow.

### Vercel deployment

In the Vercel project settings, add `VITE_CHAT_API_URL` as an Environment Variable for Production (and Preview if needed). Set it to the deployed Cloudflare Worker URL, then redeploy the site. The Vercel site origin is included in `workers/gemini-chat/wrangler.toml`; redeploy the Worker after changing its allowed origins.

### Local development

The frontend uses the deployed chat Worker by default, including during local development. To run a local Worker instead, copy `workers/gemini-chat/.dev.vars.example` to `workers/gemini-chat/.dev.vars` and add your Gemini API key, then set `VITE_CHAT_API_URL=http://localhost:8787` in `apps/web/.env.local`.

Start the local Worker:

```bash
npx wrangler dev
```

This starts the Worker locally on port `8787`. In another terminal, run:

```bash
npm run dev
```

Edit `ALLOWED_ORIGINS` and `GEMINI_MODEL` in `workers/gemini-chat/wrangler.toml`.

The chatbot's knowledge lives in `SYSTEM_PROMPT` in `workers/gemini-chat/src/index.js`.
