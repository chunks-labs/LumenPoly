export type TileType = 'property' | 'chance' | 'community' | 'tax' | 'corner';

export interface BoardTile {
    id: number;
    name: string;
    type: TileType;
    price?: number;
    rent?: number;
    color?: string;
    description?: string;
}

export const lumenPolyBoard: BoardTile[] = [
    { id: 0, name: "Launch", type: "corner", description: "Collect 200 simulated XLM when you pass or land here." },
    { id: 1, name: "Stellar Quest", type: "property", price: 60, rent: 2, color: "brown" },
    { id: 2, name: "Community Chest", type: "community" },
    { id: 3, name: "Freighter Wallet", type: "property", price: 60, rent: 4, color: "brown" },
    { id: 4, name: "Gas Fee Spike", type: "tax", description: "Pay 200 XLM for network surge pricing." },
    { id: 5, name: "Soroban RPC Node", type: "property", price: 200, rent: 25, color: "gray" },
    { id: 6, name: "Lumen Farm", type: "property", price: 100, rent: 6, color: "lightblue" },
    { id: 7, name: "Chance", type: "chance" },
    { id: 8, name: "USDC Trustline", type: "property", price: 100, rent: 6, color: "lightblue" },
    { id: 9, name: "Stellar DEX", type: "property", price: 120, rent: 8, color: "lightblue" },
    { id: 10, name: "Waiting Room", type: "corner", description: "Just visiting is free. If sent here, miss one roll before rejoining the game." },
    { id: 11, name: "Smart Contract Audit", type: "property", price: 140, rent: 10, color: "pink" },
    { id: 12, name: "Stellar Anchor", type: "property", price: 150, rent: 10, color: "white" },
    { id: 13, name: "AMM Liquidity Pool", type: "property", price: 140, rent: 10, color: "pink" },
    { id: 14, name: "Yield Farming", type: "property", price: 160, rent: 12, color: "pink" },
    { id: 15, name: "Horizon API Server", type: "property", price: 200, rent: 25, color: "gray" },
    { id: 16, name: "Liquidity Mining", type: "property", price: 180, rent: 14, color: "orange" },
    { id: 17, name: "Community Chest", type: "community" },
    { id: 18, name: "Impermanent Loss", type: "property", price: 180, rent: 14, color: "orange" },
    { id: 19, name: "Decentralized Oracle", type: "property", price: 200, rent: 16, color: "orange" },
    { id: 20, name: "Rest Stop", type: "corner", description: "Take a breather. No fee and no bonus on this space." },
    { id: 21, name: "Flash Loan", type: "property", price: 220, rent: 18, color: "red" },
    { id: 22, name: "Chance", type: "chance" },
    { id: 23, name: "Arbitrage Bot", type: "property", price: 220, rent: 18, color: "red" },
    { id: 24, name: "MEV Searcher", type: "property", price: 240, rent: 20, color: "red" },
    { id: 25, name: "Stellar Consensus Node", type: "property", price: 200, rent: 25, color: "gray" },
    { id: 26, name: "NFT Marketplace", type: "property", price: 260, rent: 22, color: "yellow" },
    { id: 27, name: "Governance Token", type: "property", price: 260, rent: 22, color: "yellow" },
    { id: 28, name: "Bridge Exploit", type: "property", price: 150, rent: 10, color: "white" },
    { id: 29, name: "DAO Treasury", type: "property", price: 280, rent: 24, color: "yellow" },
    { id: 30, name: "Take a Break", type: "corner", description: "Move directly to the Waiting Room. Miss one roll; do not collect a Launch reward for this move." },
    { id: 31, name: "Layer 2 Rollup", type: "property", price: 300, rent: 26, color: "green" },
    { id: 32, name: "Zero-Knowledge Proof", type: "property", price: 300, rent: 26, color: "green" },
    { id: 33, name: "Community Chest", type: "community" },
    { id: 34, name: "Soroban Mainnet", type: "property", price: 320, rent: 28, color: "green" },
    { id: 35, name: "Archive Node", type: "property", price: 200, rent: 25, color: "gray" },
    { id: 36, name: "Chance", type: "chance" },
    { id: 37, name: "Stellar Development Foundation", type: "property", price: 350, rent: 35, color: "blue" },
    { id: 38, name: "Rug Pull", type: "tax", description: "You got rugged! Pay 100 XLM." },
    { id: 39, name: "Web3 Ecosystem Fund", type: "property", price: 400, rent: 50, color: "blue" }
];
