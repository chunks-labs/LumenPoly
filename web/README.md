# LumenPoly frontend

## Development

Use Node 24 (`nvm use` in the repository root), then `npm ci` and `npm run dev` in this directory. There are no required environment variables or wallet prerequisites for practice mode.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Type-check and generate `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Check source with Oxlint |
| `npm test` | Run game, persistence, and board regression tests |
| `npm run test:watch` | Watch unit tests during development |
| `npm run test:e2e` | Run Chromium browser and accessibility tests |
| `npm run check` | Run lint, unit tests, and production build |

Install the browser once with `npx playwright install chromium`. Alternatively use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` for system Chrome. Browser tests start their own server on port 4173 and write ignored reports to `playwright-report/` and `test-results/`.

## Build and hosting

Deploy the contents of `dist/` to a static host. Navigation currently uses in-memory page state, so refreshing opens Overview with a **Continue your game** action when a save is present. No server-side wallet secrets or API keys are needed. The wallet API and game-room UI are separate lazy-loaded chunks.

## Browser state

`lumenpoly.practice.v1` stores one validated practice match in localStorage. Wallet addresses are held only in memory. Storage exceptions show an in-app message and do not stop play. Invalid saves are ignored. Starting another match replaces the current save after the setup screen explicitly describes that consequence.

## Manual wallet check

With Freighter installed: open **Connect wallet**, choose **Connect Freighter**, and approve address access. Verify that the header shows a shortened address and disconnect removes it. Also try denying access and retrying. Automated tests cover missing extensions and guest entry; they do not authorize a real extension or sign transactions.
