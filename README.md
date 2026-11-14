# jmcaris_portfolio

Sumi-e editorial portfolio: React + TypeScript + Tailwind CSS v4 + Framer Motion (Vite, npm workspaces + Turbo).

```bash
npm install
npm run dev            # local dev server
npm run build          # type-check + production build
npm run build:github   # build for GitHub Pages (/jmcaris_portfolio/)
```

Notes
- The opening "Ink Awakens" loader plays once per browser session (see `INTRO_KEY` in `apps/web/src/App.tsx`).
- Light rice-paper theme by default; "ink night" is toggled with the moon button (or the `D` key) and remembered.
