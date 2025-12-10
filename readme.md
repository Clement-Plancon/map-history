# Pax Sandbox

A lightweight alternate-history sandbox inspired by Pax Historia but built entirely with React, TypeScript, and Vite. Everything runs in the browser—no backend services or external APIs. Deploy-ready for Netlify.

## Getting started

```bash
npm install
npm run dev   # start local dev server
npm run build # production build
```

## Features
- Scenario presets across historical, alt-historical, sci-fi, and fantasy eras.
- Turn-based narrative events with branching stat impacts.
- Client-side persistence via `localStorage` (auto-saves every turn).
- Simple faction color legend and preset browser.
- SPA routing for /game, /presets, /flags, and /community.

## Tech stack
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS for styling

## Netlify
Netlify config lives in `netlify.toml` with SPA-friendly redirects and the `npm run build` command.
