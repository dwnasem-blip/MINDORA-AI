# MINDORA AI — Phase 1

A bilingual (English/Arabic) Expo + React Native + TypeScript starter for a text-to-explainer-video product.

## Included
- Welcome, script input, visual style selection, and project preview flows.
- Arabic/English language toggle and RTL-aware text/layout alignment.
- Animated / realistic style selection stored in local app state.
- Strict TypeScript configuration and isolated project-flow validation helpers.
- No subscriptions, paid services, API keys, or real video-generation claims.

## Run locally

```bash
npm install
npm test
npm run typecheck
npx expo start
```

Open the Expo Go app on a physical iPhone and scan the QR code from the same local network. This project has not been tested on a physical iPhone as part of this build.

## Project structure

```text
App.tsx
app.json
src/
  i18n/translations.ts
  theme/colors.ts
  utils/projectRules.js
tests/projectRules.test.cjs
```

## Next phase
Move screens into `src/screens`, add Expo Router when navigation grows, then design and connect a video-generation backend only after choosing a provider and validating privacy, cost, and latency.
