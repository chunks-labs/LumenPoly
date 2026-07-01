#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map, Symbol};

#[contract]
pub struct LumenPolyGame;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Player {
    pub position: u32,
    pub balance: u32,
}

#[contractimpl]
impl LumenPolyGame {
    /// Initializes a new game instance for a player
    pub fn join_game(env: Env, player: Address) {
        player.require_auth();
        
        let mut players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap_or_else(|| Map::new(&env));
        
        // Prevent joining twice
        if players.contains_key(player.clone()) {
            panic!("Player already joined the game");
        }
        
        // Initialize player at Go (position 0) with 1500 starting balance
        let new_player = Player {
            position: 0,
            balance: 1500,
        };
        
        players.set(player.clone(), new_player);
        env.storage().instance().set(&Symbol::new(&env, "PLAYERS"), &players);
    }

    /// Fetches the player's current state
    pub fn get_player(env: Env, player: Address) -> Player {
        let players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap();
        players.get(player).unwrap()
    }
}
