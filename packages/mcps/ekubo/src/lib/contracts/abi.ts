export const CORE_ABI = [
  {
    "type": "impl",
    "name": "CoreHasInterface",
    "interface_name": "ekubo::components::upgradeable::IHasInterface"
  },
  {
    "type": "interface",
    "name": "ekubo::components::upgradeable::IHasInterface",
    "items": [
      {
        "type": "function",
        "name": "get_primary_interface_id",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Core",
    "interface_name": "ekubo::interfaces::core::ICore"
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::LockerState",
    "members": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "nonzero_delta_count",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::i129::i129",
    "members": [
      {
        "name": "mag",
        "type": "core::integer::u128"
      },
      {
        "name": "sign",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::keys::PoolKey",
    "members": [
      {
        "name": "token0",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "token1",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "fee",
        "type": "core::integer::u128"
      },
      {
        "name": "tick_spacing",
        "type": "core::integer::u128"
      },
      {
        "name": "extension",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::pool_price::PoolPrice",
    "members": [
      {
        "name": "sqrt_ratio",
        "type": "core::integer::u256"
      },
      {
        "name": "tick",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::fees_per_liquidity::FeesPerLiquidity",
    "members": [
      {
        "name": "value0",
        "type": "core::felt252"
      },
      {
        "name": "value1",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::bounds::Bounds",
    "members": [
      {
        "name": "lower",
        "type": "ekubo::types::i129::i129"
      },
      {
        "name": "upper",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::keys::PositionKey",
    "members": [
      {
        "name": "salt",
        "type": "core::felt252"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "bounds",
        "type": "ekubo::types::bounds::Bounds"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::position::Position",
    "members": [
      {
        "name": "liquidity",
        "type": "core::integer::u128"
      },
      {
        "name": "fees_per_liquidity_inside_last",
        "type": "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::GetPositionWithFeesResult",
    "members": [
      {
        "name": "position",
        "type": "ekubo::types::position::Position"
      },
      {
        "name": "fees0",
        "type": "core::integer::u128"
      },
      {
        "name": "fees1",
        "type": "core::integer::u128"
      },
      {
        "name": "fees_per_liquidity_inside_current",
        "type": "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::keys::SavedBalanceKey",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "salt",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::IForwardeeDispatcher",
    "members": [
      {
        "name": "contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u256>",
    "variants": [
      {
        "name": "Some",
        "type": "core::integer::u256"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::UpdatePositionParameters",
    "members": [
      {
        "name": "salt",
        "type": "core::felt252"
      },
      {
        "name": "bounds",
        "type": "ekubo::types::bounds::Bounds"
      },
      {
        "name": "liquidity_delta",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::delta::Delta",
    "members": [
      {
        "name": "amount0",
        "type": "ekubo::types::i129::i129"
      },
      {
        "name": "amount1",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::SwapParameters",
    "members": [
      {
        "name": "amount",
        "type": "ekubo::types::i129::i129"
      },
      {
        "name": "is_token1",
        "type": "core::bool"
      },
      {
        "name": "sqrt_ratio_limit",
        "type": "core::integer::u256"
      },
      {
        "name": "skip_ahead",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::call_points::CallPoints",
    "members": [
      {
        "name": "before_initialize_pool",
        "type": "core::bool"
      },
      {
        "name": "after_initialize_pool",
        "type": "core::bool"
      },
      {
        "name": "before_swap",
        "type": "core::bool"
      },
      {
        "name": "after_swap",
        "type": "core::bool"
      },
      {
        "name": "before_update_position",
        "type": "core::bool"
      },
      {
        "name": "after_update_position",
        "type": "core::bool"
      },
      {
        "name": "before_collect_fees",
        "type": "core::bool"
      },
      {
        "name": "after_collect_fees",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::core::ICore",
    "items": [
      {
        "type": "function",
        "name": "get_protocol_fees_collected",
        "inputs": [
          {
            "name": "token",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_locker_state",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::interfaces::core::LockerState"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_locker_delta",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u32"
          },
          {
            "name": "token_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::i129::i129"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_price",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::pool_price::PoolPrice"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_liquidity",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_fees_per_liquidity",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_fees_per_liquidity_inside",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_tick_liquidity_delta",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "index",
            "type": "ekubo::types::i129::i129"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::i129::i129"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_tick_liquidity_net",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "index",
            "type": "ekubo::types::i129::i129"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_pool_tick_fees_outside",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "index",
            "type": "ekubo::types::i129::i129"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_position",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "position_key",
            "type": "ekubo::types::keys::PositionKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::position::Position"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_position_with_fees",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "position_key",
            "type": "ekubo::types::keys::PositionKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::interfaces::core::GetPositionWithFeesResult"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_saved_balance",
        "inputs": [
          {
            "name": "key",
            "type": "ekubo::types::keys::SavedBalanceKey"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "next_initialized_tick",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "from",
            "type": "ekubo::types::i129::i129"
          },
          {
            "name": "skip_ahead",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(ekubo::types::i129::i129, core::bool)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "prev_initialized_tick",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "from",
            "type": "ekubo::types::i129::i129"
          },
          {
            "name": "skip_ahead",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(ekubo::types::i129::i129, core::bool)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "withdraw_all_protocol_fees",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw_protocol_fees",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "lock",
        "inputs": [
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "forward",
        "inputs": [
          {
            "name": "to",
            "type": "ekubo::interfaces::core::IForwardeeDispatcher"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw",
        "inputs": [
          {
            "name": "token_address",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "save",
        "inputs": [
          {
            "name": "key",
            "type": "ekubo::types::keys::SavedBalanceKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "pay",
        "inputs": [
          {
            "name": "token_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "load",
        "inputs": [
          {
            "name": "token",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "salt",
            "type": "core::felt252"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "initialize_pool",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "initial_tick",
            "type": "ekubo::types::i129::i129"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "maybe_initialize_pool",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "initial_tick",
            "type": "ekubo::types::i129::i129"
          }
        ],
        "outputs": [
          {
            "type": "core::option::Option::<core::integer::u256>"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_position",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "params",
            "type": "ekubo::interfaces::core::UpdatePositionParameters"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::delta::Delta"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "collect_fees",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "salt",
            "type": "core::felt252"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::delta::Delta"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "swap",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "params",
            "type": "ekubo::interfaces::core::SwapParameters"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::delta::Delta"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "accumulate_as_fees",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "amount0",
            "type": "core::integer::u128"
          },
          {
            "name": "amount1",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_call_points",
        "inputs": [
          {
            "name": "call_points",
            "type": "ekubo::types::call_points::CallPoints"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_call_points",
        "inputs": [
          {
            "name": "extension",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::call_points::CallPoints"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Owned",
    "interface_name": "ekubo::components::owned::IOwned"
  },
  {
    "type": "interface",
    "name": "ekubo::components::owned::IOwned",
    "items": [
      {
        "type": "function",
        "name": "get_owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Upgradeable",
    "interface_name": "ekubo::interfaces::upgradeable::IUpgradeable"
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::upgradeable::IUpgradeable",
    "items": [
      {
        "type": "function",
        "name": "replace_class_hash",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
    "kind": "struct",
    "members": [
      {
        "name": "new_class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ClassHashReplaced",
        "type": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "old_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "ekubo::components::owned::Owned::OwnershipTransferred",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::ProtocolFeesPaid",
    "kind": "struct",
    "members": [
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "position_key",
        "type": "ekubo::types::keys::PositionKey",
        "kind": "data"
      },
      {
        "name": "delta",
        "type": "ekubo::types::delta::Delta",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::ProtocolFeesWithdrawn",
    "kind": "struct",
    "members": [
      {
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::PoolInitialized",
    "kind": "struct",
    "members": [
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "initial_tick",
        "type": "ekubo::types::i129::i129",
        "kind": "data"
      },
      {
        "name": "sqrt_ratio",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::PositionUpdated",
    "kind": "struct",
    "members": [
      {
        "name": "locker",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "params",
        "type": "ekubo::interfaces::core::UpdatePositionParameters",
        "kind": "data"
      },
      {
        "name": "delta",
        "type": "ekubo::types::delta::Delta",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::PositionFeesCollected",
    "kind": "struct",
    "members": [
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "position_key",
        "type": "ekubo::types::keys::PositionKey",
        "kind": "data"
      },
      {
        "name": "delta",
        "type": "ekubo::types::delta::Delta",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::Swapped",
    "kind": "struct",
    "members": [
      {
        "name": "locker",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "params",
        "type": "ekubo::interfaces::core::SwapParameters",
        "kind": "data"
      },
      {
        "name": "delta",
        "type": "ekubo::types::delta::Delta",
        "kind": "data"
      },
      {
        "name": "sqrt_ratio_after",
        "type": "core::integer::u256",
        "kind": "data"
      },
      {
        "name": "tick_after",
        "type": "ekubo::types::i129::i129",
        "kind": "data"
      },
      {
        "name": "liquidity_after",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::SavedBalance",
    "kind": "struct",
    "members": [
      {
        "name": "key",
        "type": "ekubo::types::keys::SavedBalanceKey",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::LoadedBalance",
    "kind": "struct",
    "members": [
      {
        "name": "key",
        "type": "ekubo::types::keys::SavedBalanceKey",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::FeesAccumulated",
    "kind": "struct",
    "members": [
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey",
        "kind": "data"
      },
      {
        "name": "amount0",
        "type": "core::integer::u128",
        "kind": "data"
      },
      {
        "name": "amount1",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::core::Core::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "UpgradeableEvent",
        "type": "ekubo::components::upgradeable::Upgradeable::Event",
        "kind": "flat"
      },
      {
        "name": "OwnedEvent",
        "type": "ekubo::components::owned::Owned::Event",
        "kind": "nested"
      },
      {
        "name": "ProtocolFeesPaid",
        "type": "ekubo::core::Core::ProtocolFeesPaid",
        "kind": "nested"
      },
      {
        "name": "ProtocolFeesWithdrawn",
        "type": "ekubo::core::Core::ProtocolFeesWithdrawn",
        "kind": "nested"
      },
      {
        "name": "PoolInitialized",
        "type": "ekubo::core::Core::PoolInitialized",
        "kind": "nested"
      },
      {
        "name": "PositionUpdated",
        "type": "ekubo::core::Core::PositionUpdated",
        "kind": "nested"
      },
      {
        "name": "PositionFeesCollected",
        "type": "ekubo::core::Core::PositionFeesCollected",
        "kind": "nested"
      },
      {
        "name": "Swapped",
        "type": "ekubo::core::Core::Swapped",
        "kind": "nested"
      },
      {
        "name": "SavedBalance",
        "type": "ekubo::core::Core::SavedBalance",
        "kind": "nested"
      },
      {
        "name": "LoadedBalance",
        "type": "ekubo::core::Core::LoadedBalance",
        "kind": "nested"
      },
      {
        "name": "FeesAccumulated",
        "type": "ekubo::core::Core::FeesAccumulated",
        "kind": "nested"
      }
    ]
  }
]

export const POSITIONS_ABI = [
  {
    "type": "impl",
    "name": "PositionsHasInterface",
    "interface_name": "ekubo::components::upgradeable::IHasInterface"
  },
  {
    "type": "interface",
    "name": "ekubo::components::upgradeable::IHasInterface",
    "items": [
      {
        "type": "function",
        "name": "get_primary_interface_id",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ILockerImpl",
    "interface_name": "ekubo::interfaces::core::ILocker"
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::core::ILocker",
    "items": [
      {
        "type": "function",
        "name": "locked",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u32"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "PositionsImpl",
    "interface_name": "ekubo::interfaces::positions::IPositions"
  },
  {
    "type": "struct",
    "name": "ekubo::types::keys::PoolKey",
    "members": [
      {
        "name": "token0",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "token1",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "fee",
        "type": "core::integer::u128"
      },
      {
        "name": "tick_spacing",
        "type": "core::integer::u128"
      },
      {
        "name": "extension",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::i129::i129",
    "members": [
      {
        "name": "mag",
        "type": "core::integer::u128"
      },
      {
        "name": "sign",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::bounds::Bounds",
    "members": [
      {
        "name": "lower",
        "type": "ekubo::types::i129::i129"
      },
      {
        "name": "upper",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::positions::GetTokenInfoRequest",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u64"
      },
      {
        "name": "pool_key",
        "type": "ekubo::types::keys::PoolKey"
      },
      {
        "name": "bounds",
        "type": "ekubo::types::bounds::Bounds"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoRequest>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::types::pool_price::PoolPrice",
    "members": [
      {
        "name": "sqrt_ratio",
        "type": "core::integer::u256"
      },
      {
        "name": "tick",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::positions::GetTokenInfoResult",
    "members": [
      {
        "name": "pool_price",
        "type": "ekubo::types::pool_price::PoolPrice"
      },
      {
        "name": "liquidity",
        "type": "core::integer::u128"
      },
      {
        "name": "amount0",
        "type": "core::integer::u128"
      },
      {
        "name": "amount1",
        "type": "core::integer::u128"
      },
      {
        "name": "fees0",
        "type": "core::integer::u128"
      },
      {
        "name": "fees1",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoResult>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::extensions::twamm::OrderKey",
    "members": [
      {
        "name": "sell_token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "buy_token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "fee",
        "type": "core::integer::u128"
      },
      {
        "name": "start_time",
        "type": "core::integer::u64"
      },
      {
        "name": "end_time",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::extensions::twamm::OrderInfo",
    "members": [
      {
        "name": "sale_rate",
        "type": "core::integer::u128"
      },
      {
        "name": "remaining_sell_amount",
        "type": "core::integer::u128"
      },
      {
        "name": "purchased_amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<ekubo::interfaces::extensions::twamm::OrderInfo>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::extensions::limit_orders::OrderKey",
    "members": [
      {
        "name": "token0",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "token1",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "tick",
        "type": "ekubo::types::i129::i129"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<(core::integer::u64, core::integer::u128)>",
    "variants": [
      {
        "name": "Some",
        "type": "(core::integer::u64, core::integer::u128)"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::extensions::limit_orders::OrderState",
    "members": [
      {
        "name": "initialized_ticks_crossed_snapshot",
        "type": "core::integer::u64"
      },
      {
        "name": "liquidity",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult",
    "members": [
      {
        "name": "state",
        "type": "ekubo::interfaces::extensions::limit_orders::OrderState"
      },
      {
        "name": "executed",
        "type": "core::bool"
      },
      {
        "name": "amount0",
        "type": "core::integer::u128"
      },
      {
        "name": "amount1",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>"
      }
    ]
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::positions::IPositions",
    "items": [
      {
        "type": "function",
        "name": "get_nft_address",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "upgrade_nft",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_twamm",
        "inputs": [
          {
            "name": "twamm_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_limit_orders",
        "inputs": [
          {
            "name": "limit_orders_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_twamm_address",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_limit_orders_address",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_tokens_info",
        "inputs": [
          {
            "name": "params",
            "type": "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_token_info",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::interfaces::positions::GetTokenInfoResult"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_orders_info_with_block_timestamp",
        "inputs": [
          {
            "name": "params",
            "type": "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_orders_info",
        "inputs": [
          {
            "name": "params",
            "type": "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_order_info",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::interfaces::extensions::twamm::OrderInfo"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "mint",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_with_referrer",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "referrer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_v2",
        "inputs": [
          {
            "name": "referrer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "check_liquidity_is_zero",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "unsafe_burn",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "deposit_last",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "deposit_amounts_last",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "amount0",
            "type": "core::integer::u128"
          },
          {
            "name": "amount1",
            "type": "core::integer::u128"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "deposit",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "deposit_amounts",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "amount0",
            "type": "core::integer::u128"
          },
          {
            "name": "amount1",
            "type": "core::integer::u128"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_and_deposit",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_and_deposit_with_referrer",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          },
          {
            "name": "referrer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_and_deposit_and_clear_both",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "min_liquidity",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u128, core::integer::u256, core::integer::u256)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "collect_fees",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "liquidity",
            "type": "core::integer::u128"
          },
          {
            "name": "min_token0",
            "type": "core::integer::u128"
          },
          {
            "name": "min_token1",
            "type": "core::integer::u128"
          },
          {
            "name": "collect_fees",
            "type": "core::bool"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw_v2",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          },
          {
            "name": "bounds",
            "type": "ekubo::types::bounds::Bounds"
          },
          {
            "name": "liquidity",
            "type": "core::integer::u128"
          },
          {
            "name": "min_token0",
            "type": "core::integer::u128"
          },
          {
            "name": "min_token1",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_pool_price",
        "inputs": [
          {
            "name": "pool_key",
            "type": "ekubo::types::keys::PoolKey"
          }
        ],
        "outputs": [
          {
            "type": "ekubo::types::pool_price::PoolPrice"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "mint_and_increase_sell_amount",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "increase_sell_amount_last",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "increase_sell_amount",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "decrease_sale_rate_to",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "sale_rate_delta",
            "type": "core::integer::u128"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "decrease_sale_rate_to_self",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "sale_rate_delta",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw_proceeds_from_sale_to_self",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw_proceeds_from_sale_to",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "swap_to_limit_order_price",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "swap_to_limit_order_price_and_maybe_mint_and_place_limit_order_to",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "swap_to_limit_order_price_and_maybe_mint_and_place_limit_order",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "place_limit_order",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "maybe_mint_and_place_limit_order",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::option::Option::<(core::integer::u64, core::integer::u128)>"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "mint_and_place_limit_order",
        "inputs": [
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "close_limit_order",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "close_limit_order_to",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "order_key",
            "type": "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_limit_orders_info",
        "inputs": [
          {
            "name": "params",
            "type": "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Owned",
    "interface_name": "ekubo::components::owned::IOwned"
  },
  {
    "type": "interface",
    "name": "ekubo::components::owned::IOwned",
    "items": [
      {
        "type": "function",
        "name": "get_owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Upgradeable",
    "interface_name": "ekubo::interfaces::upgradeable::IUpgradeable"
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::upgradeable::IUpgradeable",
    "items": [
      {
        "type": "function",
        "name": "replace_class_hash",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Clear",
    "interface_name": "ekubo::components::clear::IClear"
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::erc20::IERC20Dispatcher",
    "members": [
      {
        "name": "contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "interface",
    "name": "ekubo::components::clear::IClear",
    "items": [
      {
        "type": "function",
        "name": "clear",
        "inputs": [
          {
            "name": "token",
            "type": "ekubo::interfaces::erc20::IERC20Dispatcher"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "clear_minimum",
        "inputs": [
          {
            "name": "token",
            "type": "ekubo::interfaces::erc20::IERC20Dispatcher"
          },
          {
            "name": "minimum",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "clear_minimum_to_recipient",
        "inputs": [
          {
            "name": "token",
            "type": "ekubo::interfaces::erc20::IERC20Dispatcher"
          },
          {
            "name": "minimum",
            "type": "core::integer::u256"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Expires",
    "interface_name": "ekubo::components::expires::IExpires"
  },
  {
    "type": "interface",
    "name": "ekubo::components::expires::IExpires",
    "items": [
      {
        "type": "function",
        "name": "expires",
        "inputs": [
          {
            "name": "at",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "struct",
    "name": "ekubo::interfaces::core::ICoreDispatcher",
    "members": [
      {
        "name": "contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "core",
        "type": "ekubo::interfaces::core::ICoreDispatcher"
      },
      {
        "name": "nft_class_hash",
        "type": "core::starknet::class_hash::ClassHash"
      },
      {
        "name": "token_uri_base",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
    "kind": "struct",
    "members": [
      {
        "name": "new_class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ClassHashReplaced",
        "type": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "old_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "ekubo::components::owned::Owned::OwnershipTransferred",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::positions::Positions::PositionMintedWithReferrer",
    "kind": "struct",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u64",
        "kind": "data"
      },
      {
        "name": "referrer",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::positions::Positions::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "UpgradeableEvent",
        "type": "ekubo::components::upgradeable::Upgradeable::Event",
        "kind": "flat"
      },
      {
        "name": "OwnedEvent",
        "type": "ekubo::components::owned::Owned::Event",
        "kind": "nested"
      },
      {
        "name": "PositionMintedWithReferrer",
        "type": "ekubo::positions::Positions::PositionMintedWithReferrer",
        "kind": "nested"
      }
    ]
  }
]

export const NFT_POSITIONS_CONTRACT_ABI = [
  {
    "type": "impl",
    "name": "OwnedNFTHasInterface",
    "interface_name": "ekubo::components::upgradeable::IHasInterface"
  },
  {
    "type": "interface",
    "name": "ekubo::components::upgradeable::IHasInterface",
    "items": [
      {
        "type": "function",
        "name": "get_primary_interface_id",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC721Impl",
    "interface_name": "ekubo::interfaces::erc721::IERC721"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::erc721::IERC721",
    "items": [
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getApproved",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::felt252>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "owner_of",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_approval_for_all",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_approved",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "is_approved_for_all",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "token_uri",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::felt252>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "SRC5Impl",
    "interface_name": "ekubo::interfaces::src5::ISRC5"
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::src5::ISRC5",
    "items": [
      {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
          {
            "name": "interfaceId",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "supports_interface",
        "inputs": [
          {
            "name": "interface_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "OwnedNFTImpl",
    "interface_name": "ekubo::owned_nft::IOwnedNFT"
  },
  {
    "type": "interface",
    "name": "ekubo::owned_nft::IOwnedNFT",
    "items": [
      {
        "type": "function",
        "name": "mint",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "burn",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "is_account_authorized",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u64"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_next_token_id",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "set_metadata",
        "inputs": [
          {
            "name": "name",
            "type": "core::felt252"
          },
          {
            "name": "symbol",
            "type": "core::felt252"
          },
          {
            "name": "token_uri_base",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Owned",
    "interface_name": "ekubo::components::owned::IOwned"
  },
  {
    "type": "interface",
    "name": "ekubo::components::owned::IOwned",
    "items": [
      {
        "type": "function",
        "name": "get_owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "Upgradeable",
    "interface_name": "ekubo::interfaces::upgradeable::IUpgradeable"
  },
  {
    "type": "interface",
    "name": "ekubo::interfaces::upgradeable::IUpgradeable",
    "items": [
      {
        "type": "function",
        "name": "replace_class_hash",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "name",
        "type": "core::felt252"
      },
      {
        "name": "symbol",
        "type": "core::felt252"
      },
      {
        "name": "token_uri_base",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
    "kind": "struct",
    "members": [
      {
        "name": "new_class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::upgradeable::Upgradeable::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ClassHashReplaced",
        "type": "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "old_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::components::owned::Owned::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "ekubo::components::owned::Owned::OwnershipTransferred",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::owned_nft::OwnedNFT::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::owned_nft::OwnedNFT::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "approved",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::owned_nft::OwnedNFT::ApprovalForAll",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "operator",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "approved",
        "type": "core::bool",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "ekubo::owned_nft::OwnedNFT::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "UpgradeableEvent",
        "type": "ekubo::components::upgradeable::Upgradeable::Event",
        "kind": "flat"
      },
      {
        "name": "OwnedEvent",
        "type": "ekubo::components::owned::Owned::Event",
        "kind": "nested"
      },
      {
        "name": "Transfer",
        "type": "ekubo::owned_nft::OwnedNFT::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "ekubo::owned_nft::OwnedNFT::Approval",
        "kind": "nested"
      },
      {
        "name": "ApprovalForAll",
        "type": "ekubo::owned_nft::OwnedNFT::ApprovalForAll",
        "kind": "nested"
      }
    ]
  }
]