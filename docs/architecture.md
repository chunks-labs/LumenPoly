# Frontend architecture

## State ownership

`useGameStore` owns page navigation, optional public wallet address, the current match, and save-failure status. A match contains both players, ownership, turn phase, dice, round, pending purchase, bounded activity, and the winner. Wallet identity does not participate in game transitions.

`transition` is the entry point for game actions. It checks phase and dice guards, clones a valid state, and delegates movement, landing, purchase, and round settlement to small rule modules. UI components dispatch actions; they do not directly mutate balances. Randomness is injectable in the rule engine for repeatable tests.

The four phases are `roll`, `resolve`, `bot`, and `finished`. A player cannot roll during resolution or a bot turn. Finishing is terminal. The bot timer is owned by a React effect with cleanup, making Strict Mode and page navigation safe.

## Persistence

Each accepted action writes a versioned localStorage record. Loading checks player positions and balances, phase/winner consistency, property ownership, dice, pending offers, and bounded unique event identifiers. Parsing and browser storage failures are caught. This is resilience against accidental corruption, not an anti-cheat system: local practice saves are user-controlled.

## Wallet boundary

The wallet dialog imports Freighter only after the user asks to connect. `isConnected()` is read through its `isConnected` field, and request-access errors are handled explicitly. The frontend stores a validated public address only. No signing, network requests to a Soroban RPC, contract calls, or asset transfers are implemented.

## Rendering

The dashboard is eager. The game-room and wallet dialogs load on demand. The interactive board uses CSS grid and ordinary buttons; its forty perimeter spaces remain upright and inspectable. A separate decorative board illustration uses CSS transforms and is hidden from assistive technologies. On small screens only the board region scrolls horizontally, while purchase controls remain in the normal page flow.

## Contract boundary

The Rust contract predates this frontend rewrite and is not used by practice matches. Integrating real gameplay requires a separate review of contract rules, storage, authorization, randomness assumptions, network configuration, transaction preparation, signing, submission, and authoritative state reconciliation. Do not wire local practice balances to real transfers.
