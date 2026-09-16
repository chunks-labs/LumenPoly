# LumenPoly

**Own the board. Learn the network.**

LumenPoly is a Stellar-inspired property game. Open the app, choose a piece, and play against Orbit, an AI opponent. A wallet is optional; the app never asks you to connect on entry.

## Play locally

Use Node.js 24 and npm:

```sh
cd web
npm ci
npm run dev
```

Open the URL printed by Vite. Choose **Let’s play**, select a piece and difficulty, and start your practice game.

## What works

- Guest-first overview, game room, portfolio, and in-app rules.
- Forty board spaces, property purchases, ownership, rent, complete-group bonuses, event cards, fees, and bankruptcy.
- Three AI buying strategies and a thirty-round finish based on net worth.
- Local save/restore with validation and storage-failure recovery.
- Responsive navigation, selectable board spaces, keyboard-accessible dialogs, reduced-motion and high-contrast support.
- Optional Freighter public-address connection, loaded only when requested.

## Practice and blockchain boundaries

**All gameplay and XLM balances in this release are simulated locally.** They are not wallet balances, deposits, payments, or on-chain transactions. Connecting Freighter does not change this. Saves live in this browser on this device; clearing site data removes them.

`contracts/` contains the earlier experimental Soroban contract. The frontend does not call it. Its rules are not equivalent to the practice engine; multiplayer, real-asset settlement, deployed-contract verification, and production contract hardening remain separate work. No RPC synchronization is claimed by this app.

## Validation

```sh
cd web
npm run check
npx playwright install chromium
npm run test:e2e
```

For an existing Chrome installation, use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`.

## Project map

- `web/src/game/`: typed, immutable practice rules.
- `web/src/components/`: dashboard, table, dialogs, portfolio, and learning views.
- `web/src/store/`: navigation, wallet identity, and persisted match orchestration.
- `web/src/styles/`: explicit CSS without a utility compiler.
- `web/tests/` and `web/e2e/`: rule regression and browser tests.
- `docs/`: gameplay, design, and architecture notes.
- `contracts/`: experimental Rust/Soroban implementation.

React 19, TypeScript, Vite, Zustand, and the Freighter API power the frontend. LumenPoly is an independent educational project, not affiliated with the Stellar Development Foundation.
