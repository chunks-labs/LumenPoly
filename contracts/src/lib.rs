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

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Property {
    pub owner: Option<Address>,
    pub price: u32,
    pub rent: u32,
}

#[contractimpl]
impl LumenPolyGame {
    /// Initializes a new game instance for a player
    pub fn join_game(env: Env, player: Address) {
        player.require_auth();
        
        let mut players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap_or_else(|| Map::new(&env));
        
        if players.contains_key(player.clone()) {
            panic!("Player already joined the game");
        }
        
        // Initialize player at Go (position 0) with 1500 XLM/USDC
        let new_player = Player {
            position: 0,
            balance: 1500,
        };
        
        players.set(player.clone(), new_player);
        env.storage().instance().set(&Symbol::new(&env, "PLAYERS"), &players);
    }

    /// Simulates a dice roll and moves the player
    pub fn roll_dice(env: Env, player: Address) -> u32 {
        player.require_auth();

        let mut players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap();
        let mut current_player = players.get(player.clone()).unwrap();

        // Secure pseudo-randomness in Soroban
        let prng = env.prng();
        let roll1 = prng.gen_range(1..=6);
        let roll2 = prng.gen_range(1..=6);
        let total_roll = (roll1 + roll2) as u32;

        let mut new_position = current_player.position + total_roll;
        
        // Pass GO collect 200
        if new_position >= 40 {
            new_position %= 40;
            current_player.balance += 200;
        }

        current_player.position = new_position;
        players.set(player.clone(), current_player);
        env.storage().instance().set(&Symbol::new(&env, "PLAYERS"), &players);

        total_roll
    }

    /// Buy an unowned property
    pub fn buy_property(env: Env, player: Address, property_id: u32) {
        player.require_auth();

        let mut players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap();
        let mut current_player = players.get(player.clone()).unwrap();
        
        // Check if player is on the property
        if current_player.position != property_id {
            panic!("Player is not on this property");
        }

        let mut properties: Map<u32, Property> = env.storage().instance().get(&Symbol::new(&env, "PROPERTIES")).unwrap_or_else(|| Map::new(&env));
        let mut prop = properties.get(property_id).unwrap_or(Property { owner: None, price: 100, rent: 20 });

        if prop.owner.is_some() {
            panic!("Property is already owned");
        }

        if current_player.balance < prop.price {
            panic!("Insufficient balance");
        }

        // Deduct price and assign ownership
        current_player.balance -= prop.price;
        prop.owner = Some(player.clone());

        players.set(player.clone(), current_player);
        properties.set(property_id, prop);

        env.storage().instance().set(&Symbol::new(&env, "PLAYERS"), &players);
        env.storage().instance().set(&Symbol::new(&env, "PROPERTIES"), &properties);
    }

    /// Fetch the player's current state
    pub fn get_player(env: Env, player: Address) -> Player {
        let players: Map<Address, Player> = env.storage().instance().get(&Symbol::new(&env, "PLAYERS")).unwrap();
        players.get(player).unwrap()
    }
}
