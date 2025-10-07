export const POSITIONS_ABI = [
  {
    type: 'impl',
    name: 'PositionsHasInterface',
    interface_name: 'ekubo::components::upgradeable::IHasInterface',
  },
  {
    type: 'interface',
    name: 'ekubo::components::upgradeable::IHasInterface',
    items: [
      {
        type: 'function',
        name: 'get_primary_interface_id',
        inputs: [],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'ILockerImpl',
    interface_name: 'ekubo::interfaces::core::ILocker',
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::felt252>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    type: 'interface',
    name: 'ekubo::interfaces::core::ILocker',
    items: [
      {
        type: 'function',
        name: 'locked',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u32',
          },
          {
            name: 'data',
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'impl',
    name: 'PositionsImpl',
    interface_name: 'ekubo::interfaces::positions::IPositions',
  },
  {
    type: 'struct',
    name: 'ekubo::types::keys::PoolKey',
    members: [
      {
        name: 'token0',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token1',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'fee',
        type: 'core::integer::u128',
      },
      {
        name: 'tick_spacing',
        type: 'core::integer::u128',
      },
      {
        name: 'extension',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::bool',
    variants: [
      {
        name: 'False',
        type: '()',
      },
      {
        name: 'True',
        type: '()',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::types::i129::i129',
    members: [
      {
        name: 'mag',
        type: 'core::integer::u128',
      },
      {
        name: 'sign',
        type: 'core::bool',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::types::bounds::Bounds',
    members: [
      {
        name: 'lower',
        type: 'ekubo::types::i129::i129',
      },
      {
        name: 'upper',
        type: 'ekubo::types::i129::i129',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::positions::GetTokenInfoRequest',
    members: [
      {
        name: 'id',
        type: 'core::integer::u64',
      },
      {
        name: 'pool_key',
        type: 'ekubo::types::keys::PoolKey',
      },
      {
        name: 'bounds',
        type: 'ekubo::types::bounds::Bounds',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoRequest>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128',
      },
      {
        name: 'high',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::types::pool_price::PoolPrice',
    members: [
      {
        name: 'sqrt_ratio',
        type: 'core::integer::u256',
      },
      {
        name: 'tick',
        type: 'ekubo::types::i129::i129',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::positions::GetTokenInfoResult',
    members: [
      {
        name: 'pool_price',
        type: 'ekubo::types::pool_price::PoolPrice',
      },
      {
        name: 'liquidity',
        type: 'core::integer::u128',
      },
      {
        name: 'amount0',
        type: 'core::integer::u128',
      },
      {
        name: 'amount1',
        type: 'core::integer::u128',
      },
      {
        name: 'fees0',
        type: 'core::integer::u128',
      },
      {
        name: 'fees1',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoResult>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::extensions::twamm::OrderKey',
    members: [
      {
        name: 'sell_token',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'buy_token',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'fee',
        type: 'core::integer::u128',
      },
      {
        name: 'start_time',
        type: 'core::integer::u64',
      },
      {
        name: 'end_time',
        type: 'core::integer::u64',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::extensions::twamm::OrderInfo',
    members: [
      {
        name: 'sale_rate',
        type: 'core::integer::u128',
      },
      {
        name: 'remaining_sell_amount',
        type: 'core::integer::u128',
      },
      {
        name: 'purchased_amount',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<ekubo::interfaces::extensions::twamm::OrderInfo>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
    members: [
      {
        name: 'token0',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token1',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'tick',
        type: 'ekubo::types::i129::i129',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::option::Option::<(core::integer::u64, core::integer::u128)>',
    variants: [
      {
        name: 'Some',
        type: '(core::integer::u64, core::integer::u128)',
      },
      {
        name: 'None',
        type: '()',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::extensions::limit_orders::OrderState',
    members: [
      {
        name: 'initialized_ticks_crossed_snapshot',
        type: 'core::integer::u64',
      },
      {
        name: 'liquidity',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult',
    members: [
      {
        name: 'state',
        type: 'ekubo::interfaces::extensions::limit_orders::OrderState',
      },
      {
        name: 'executed',
        type: 'core::bool',
      },
      {
        name: 'amount0',
        type: 'core::integer::u128',
      },
      {
        name: 'amount1',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>',
      },
    ],
  },
  {
    type: 'interface',
    name: 'ekubo::interfaces::positions::IPositions',
    items: [
      {
        type: 'function',
        name: 'get_nft_address',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'upgrade_nft',
        inputs: [
          {
            name: 'class_hash',
            type: 'core::starknet::class_hash::ClassHash',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'set_twamm',
        inputs: [
          {
            name: 'twamm_address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'set_limit_orders',
        inputs: [
          {
            name: 'limit_orders_address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_twamm_address',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_limit_orders_address',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_tokens_info',
        inputs: [
          {
            name: 'params',
            type: 'core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_token_info',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
        ],
        outputs: [
          {
            type: 'ekubo::interfaces::positions::GetTokenInfoResult',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_orders_info_with_block_timestamp',
        inputs: [
          {
            name: 'params',
            type: 'core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>)',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_orders_info',
        inputs: [
          {
            name: 'params',
            type: 'core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_order_info',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
        ],
        outputs: [
          {
            type: 'ekubo::interfaces::extensions::twamm::OrderInfo',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'mint',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u64',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_with_referrer',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'referrer',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u64',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_v2',
        inputs: [
          {
            name: 'referrer',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u64',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'check_liquidity_is_zero',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
        ],
        outputs: [],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'unsafe_burn',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'deposit_last',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'deposit_amounts_last',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'amount0',
            type: 'core::integer::u128',
          },
          {
            name: 'amount1',
            type: 'core::integer::u128',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'deposit',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'deposit_amounts',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'amount0',
            type: 'core::integer::u128',
          },
          {
            name: 'amount1',
            type: 'core::integer::u128',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_and_deposit',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_and_deposit_with_referrer',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
          {
            name: 'referrer',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_and_deposit_and_clear_both',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'min_liquidity',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::integer::u128, core::integer::u256, core::integer::u256)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'collect_fees',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'withdraw',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'liquidity',
            type: 'core::integer::u128',
          },
          {
            name: 'min_token0',
            type: 'core::integer::u128',
          },
          {
            name: 'min_token1',
            type: 'core::integer::u128',
          },
          {
            name: 'collect_fees',
            type: 'core::bool',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'withdraw_v2',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'bounds',
            type: 'ekubo::types::bounds::Bounds',
          },
          {
            name: 'liquidity',
            type: 'core::integer::u128',
          },
          {
            name: 'min_token0',
            type: 'core::integer::u128',
          },
          {
            name: 'min_token1',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_pool_price',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
        ],
        outputs: [
          {
            type: 'ekubo::types::pool_price::PoolPrice',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'mint_and_increase_sell_amount',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'increase_sell_amount_last',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'increase_sell_amount',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'decrease_sale_rate_to',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'sale_rate_delta',
            type: 'core::integer::u128',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'decrease_sale_rate_to_self',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'sale_rate_delta',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'withdraw_proceeds_from_sale_to_self',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'withdraw_proceeds_from_sale_to',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::twamm::OrderKey',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'swap_to_limit_order_price',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'swap_to_limit_order_price_and_maybe_mint_and_place_limit_order_to',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'swap_to_limit_order_price_and_maybe_mint_and_place_limit_order',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'place_limit_order',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'maybe_mint_and_place_limit_order',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'core::option::Option::<(core::integer::u64, core::integer::u128)>',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'mint_and_place_limit_order',
        inputs: [
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'amount',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u64, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'close_limit_order',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'close_limit_order_to',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'order_key',
            type: 'ekubo::interfaces::extensions::limit_orders::OrderKey',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: '(core::integer::u128, core::integer::u128)',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_limit_orders_info',
        inputs: [
          {
            name: 'params',
            type: 'core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'Owned',
    interface_name: 'ekubo::components::owned::IOwned',
  },
  {
    type: 'interface',
    name: 'ekubo::components::owned::IOwned',
    items: [
      {
        type: 'function',
        name: 'get_owner',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'transfer_ownership',
        inputs: [
          {
            name: 'new_owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'impl',
    name: 'Upgradeable',
    interface_name: 'ekubo::interfaces::upgradeable::IUpgradeable',
  },
  {
    type: 'interface',
    name: 'ekubo::interfaces::upgradeable::IUpgradeable',
    items: [
      {
        type: 'function',
        name: 'replace_class_hash',
        inputs: [
          {
            name: 'class_hash',
            type: 'core::starknet::class_hash::ClassHash',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'impl',
    name: 'Clear',
    interface_name: 'ekubo::components::clear::IClear',
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::erc20::IERC20Dispatcher',
    members: [
      {
        name: 'contract_address',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
  {
    type: 'interface',
    name: 'ekubo::components::clear::IClear',
    items: [
      {
        type: 'function',
        name: 'clear',
        inputs: [
          {
            name: 'token',
            type: 'ekubo::interfaces::erc20::IERC20Dispatcher',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'clear_minimum',
        inputs: [
          {
            name: 'token',
            type: 'ekubo::interfaces::erc20::IERC20Dispatcher',
          },
          {
            name: 'minimum',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'clear_minimum_to_recipient',
        inputs: [
          {
            name: 'token',
            type: 'ekubo::interfaces::erc20::IERC20Dispatcher',
          },
          {
            name: 'minimum',
            type: 'core::integer::u256',
          },
          {
            name: 'recipient',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'Expires',
    interface_name: 'ekubo::components::expires::IExpires',
  },
  {
    type: 'interface',
    name: 'ekubo::components::expires::IExpires',
    items: [
      {
        type: 'function',
        name: 'expires',
        inputs: [
          {
            name: 'at',
            type: 'core::integer::u64',
          },
        ],
        outputs: [],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::interfaces::core::ICoreDispatcher',
    members: [
      {
        name: 'contract_address',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'core',
        type: 'ekubo::interfaces::core::ICoreDispatcher',
      },
      {
        name: 'nft_class_hash',
        type: 'core::starknet::class_hash::ClassHash',
      },
      {
        name: 'token_uri_base',
        type: 'core::felt252',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::components::upgradeable::Upgradeable::ClassHashReplaced',
    kind: 'struct',
    members: [
      {
        name: 'new_class_hash',
        type: 'core::starknet::class_hash::ClassHash',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::components::upgradeable::Upgradeable::Event',
    kind: 'enum',
    variants: [
      {
        name: 'ClassHashReplaced',
        type: 'ekubo::components::upgradeable::Upgradeable::ClassHashReplaced',
        kind: 'nested',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::components::owned::Owned::OwnershipTransferred',
    kind: 'struct',
    members: [
      {
        name: 'old_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'new_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::components::owned::Owned::Event',
    kind: 'enum',
    variants: [
      {
        name: 'OwnershipTransferred',
        type: 'ekubo::components::owned::Owned::OwnershipTransferred',
        kind: 'nested',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::positions::Positions::PositionMintedWithReferrer',
    kind: 'struct',
    members: [
      {
        name: 'id',
        type: 'core::integer::u64',
        kind: 'data',
      },
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::positions::Positions::Event',
    kind: 'enum',
    variants: [
      {
        name: 'UpgradeableEvent',
        type: 'ekubo::components::upgradeable::Upgradeable::Event',
        kind: 'flat',
      },
      {
        name: 'OwnedEvent',
        type: 'ekubo::components::owned::Owned::Event',
        kind: 'nested',
      },
      {
        name: 'PositionMintedWithReferrer',
        type: 'ekubo::positions::Positions::PositionMintedWithReferrer',
        kind: 'nested',
      },
    ],
  },
];
