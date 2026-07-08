# 🎲 LumenPoly

> "Own the network. Learn the rules of money."

LumenPoly is a next-generation Web3 economic simulator built exclusively for the **Stellar Blockchain** using **Soroban Smart Contracts**. It leverages the speed and low fees of the Stellar network to create a seamless, real-time board game experience.

## ✨ Features

*   **Soroban Smart Contracts:** All game logic (dice rolls, property ownership, and bank management) is executed entirely on-chain.
*   **Stellar Native Integration:** No EVM wallets allowed. Fully integrated with **Freighter Wallet** (`@stellar/freighter-api`).
*   **Pre-Game Battle Setup:** A sleek Cyberpunk lobby to choose your player token (🚀 Rocket, 🖥️ Node, 👨‍🚀 Astronaut) and configure AI difficulty.
*   **AI Opponent Engine:** Don't wait for multiplayer lobbies to fill. Play instantly against a fully simulated `AI_Soroban_Bot` powered by Zustand state management.
*   **Isometric 3D Board:** A premium, fully responsive CSS 3D transformed tabletop experience.
*   **Network Dashboard:** Real-time sidebar tracking live XLM balances and an on-chain Action Log.

## 🛠️ Tech Stack

*   **Smart Contracts:** Rust & Soroban SDK (`v20.5.0`)
*   **Frontend Framework:** React 18 & Vite
*   **State Management:** Zustand
*   **Styling:** Tailwind CSS v4 & Framer Motion
*   **Wallet Integration:** Freighter

## 🚀 Quick Start (Local Development)

### 1. Smart Contract Deployment
The Rust contracts are located in the `/contracts` directory.
```bash
cd contracts
# Build and optimize the WebAssembly binary
cargo build --target wasm32-unknown-unknown --release
stellar contract optimize --wasm target/wasm32-unknown-unknown/release/lumen_poly.wasm

# Deploy to Futurenet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/lumen_poly.optimized.wasm --source <your-identity> --network futurenet
```

### 2. Frontend Launch
The React frontend is located in the `/web` directory.
```bash
cd web
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. Make sure your Freighter wallet is installed and configured for the **Stellar Futurenet**.

## 🤝 Contributing
Contributions are welcome! Please check out the issues tab for "Good First Issues" and submit your PRs. All contributions require you to spin up a local Stellar testnet or connect to Futurenet to test Soroban RPC sync interactions.
