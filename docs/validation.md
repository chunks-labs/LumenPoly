# Redesign validation

Validated locally on 16 September 2026 with Node 24 and system Google Chrome.

- `npm run check`: formatting, Oxlint, 79 unit tests, TypeScript, and production build passed.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: all 20 browser checks passed.
- Browser coverage includes guest setup, radio selection, dialog focus restoration, purchases, turn progression, save restore, corrupt saves, replacement warning, missing Freighter recovery, and lazy wallet loading.
- Layout checks passed at 320, 390, 768, 1440, and 1920 pixels without document overflow. The mobile board scrolls within its own region; dice controls remain outside that region.
- Axe WCAG A/AA checks passed for Overview, setup, game room, rules, portfolio, and wallet dialog.
- `npm audit`: zero known vulnerabilities after dependency cleanup and patch updates.
- Production preview smoke: guest entry, starting a match, completing a round, and navigation passed without runtime errors.

The main application JavaScript is approximately 71 kB gzipped. Game-room code and Freighter load as separate chunks. No external fonts or assets are requested by the guest entry page.

The screenshots below come from the production preview:

- [Desktop overview](screenshots/overview-desktop.png)
- [Desktop game](screenshots/game-desktop.png)
- [Mobile overview](screenshots/overview-mobile.png)
- [Mobile game](screenshots/game-mobile.png)

A real Freighter extension approval was not exercised. No blockchain transaction was submitted, no contract was deployed, and contract behavior was not changed or validated by these frontend tests.
