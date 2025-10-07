export const NFT_POSITIONS_CONTRACT_ABI = [
  {
    type: 'impl',
    name: 'OwnedNFTHasInterface',
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
    name: 'ERC721Impl',
    interface_name: 'ekubo::interfaces::erc721::IERC721',
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
    type: 'interface',
    name: 'ekubo::interfaces::erc721::IERC721',
    items: [
      {
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'symbol',
        inputs: [],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'approve',
        inputs: [
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'balanceOf',
        inputs: [
          {
            name: 'account',
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
      {
        type: 'function',
        name: 'ownerOf',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'transferFrom',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'setApprovalForAll',
        inputs: [
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'approved',
            type: 'core::bool',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'getApproved',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'isApprovedForAll',
        inputs: [
          {
            name: 'owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'tokenURI',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'balance_of',
        inputs: [
          {
            name: 'account',
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
      {
        type: 'function',
        name: 'owner_of',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'transfer_from',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'set_approval_for_all',
        inputs: [
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'approved',
            type: 'core::bool',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_approved',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'is_approved_for_all',
        inputs: [
          {
            name: 'owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'token_uri',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'SRC5Impl',
    interface_name: 'ekubo::interfaces::src5::ISRC5',
  },
  {
    type: 'interface',
    name: 'ekubo::interfaces::src5::ISRC5',
    items: [
      {
        type: 'function',
        name: 'supportsInterface',
        inputs: [
          {
            name: 'interfaceId',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'supports_interface',
        inputs: [
          {
            name: 'interface_id',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'OwnedNFTImpl',
    interface_name: 'ekubo::owned_nft::IOwnedNFT',
  },
  {
    type: 'interface',
    name: 'ekubo::owned_nft::IOwnedNFT',
    items: [
      {
        type: 'function',
        name: 'mint',
        inputs: [
          {
            name: 'owner',
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
        name: 'burn',
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
        name: 'is_account_authorized',
        inputs: [
          {
            name: 'id',
            type: 'core::integer::u64',
          },
          {
            name: 'account',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_next_token_id',
        inputs: [],
        outputs: [
          {
            type: 'core::integer::u64',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'set_metadata',
        inputs: [
          {
            name: 'name',
            type: 'core::felt252',
          },
          {
            name: 'symbol',
            type: 'core::felt252',
          },
          {
            name: 'token_uri_base',
            type: 'core::felt252',
          },
        ],
        outputs: [],
        state_mutability: 'external',
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
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'name',
        type: 'core::felt252',
      },
      {
        name: 'symbol',
        type: 'core::felt252',
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
    name: 'ekubo::owned_nft::OwnedNFT::Transfer',
    kind: 'struct',
    members: [
      {
        name: 'from',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'to',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'token_id',
        type: 'core::integer::u256',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::owned_nft::OwnedNFT::Approval',
    kind: 'struct',
    members: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'approved',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'token_id',
        type: 'core::integer::u256',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::owned_nft::OwnedNFT::ApprovalForAll',
    kind: 'struct',
    members: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'operator',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'data',
      },
      {
        name: 'approved',
        type: 'core::bool',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::owned_nft::OwnedNFT::Event',
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
        name: 'Transfer',
        type: 'ekubo::owned_nft::OwnedNFT::Transfer',
        kind: 'nested',
      },
      {
        name: 'Approval',
        type: 'ekubo::owned_nft::OwnedNFT::Approval',
        kind: 'nested',
      },
      {
        name: 'ApprovalForAll',
        type: 'ekubo::owned_nft::OwnedNFT::ApprovalForAll',
        kind: 'nested',
      },
    ],
  },
];

const ROUTER_ABI = [
  {
    type: 'impl',
    name: 'LockerImpl',
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
    name: 'RouterImpl',
    interface_name: 'ekubo::router::IRouter',
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
    name: 'ekubo::router::RouteNode',
    members: [
      {
        name: 'pool_key',
        type: 'ekubo::types::keys::PoolKey',
      },
      {
        name: 'sqrt_ratio_limit',
        type: 'core::integer::u256',
      },
      {
        name: 'skip_ahead',
        type: 'core::integer::u128',
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
    name: 'ekubo::router::TokenAmount',
    members: [
      {
        name: 'token',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'amount',
        type: 'ekubo::types::i129::i129',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::types::delta::Delta',
    members: [
      {
        name: 'amount0',
        type: 'ekubo::types::i129::i129',
      },
      {
        name: 'amount1',
        type: 'ekubo::types::i129::i129',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::router::Swap',
    members: [
      {
        name: 'route',
        type: 'core::array::Array::<ekubo::router::RouteNode>',
      },
      {
        name: 'token_amount',
        type: 'ekubo::router::TokenAmount',
      },
    ],
  },
  {
    type: 'struct',
    name: 'ekubo::router::Depth',
    members: [
      {
        name: 'token0',
        type: 'core::integer::u128',
      },
      {
        name: 'token1',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'interface',
    name: 'ekubo::router::IRouter',
    items: [
      {
        type: 'function',
        name: 'swap',
        inputs: [
          {
            name: 'node',
            type: 'ekubo::router::RouteNode',
          },
          {
            name: 'token_amount',
            type: 'ekubo::router::TokenAmount',
          },
        ],
        outputs: [
          {
            type: 'ekubo::types::delta::Delta',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'multihop_swap',
        inputs: [
          {
            name: 'route',
            type: 'core::array::Array::<ekubo::router::RouteNode>',
          },
          {
            name: 'token_amount',
            type: 'ekubo::router::TokenAmount',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<ekubo::types::delta::Delta>',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'multi_multihop_swap',
        inputs: [
          {
            name: 'swaps',
            type: 'core::array::Array::<ekubo::router::Swap>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::array::Array::<ekubo::types::delta::Delta>>',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'quote_multi_multihop_swap',
        inputs: [
          {
            name: 'swaps',
            type: 'core::array::Array::<ekubo::router::Swap>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::array::Array::<ekubo::types::delta::Delta>>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'quote_multihop_swap',
        inputs: [
          {
            name: 'route',
            type: 'core::array::Array::<ekubo::router::RouteNode>',
          },
          {
            name: 'token_amount',
            type: 'ekubo::router::TokenAmount',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<ekubo::types::delta::Delta>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'quote_swap',
        inputs: [
          {
            name: 'node',
            type: 'ekubo::router::RouteNode',
          },
          {
            name: 'token_amount',
            type: 'ekubo::router::TokenAmount',
          },
        ],
        outputs: [
          {
            type: 'ekubo::types::delta::Delta',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_delta_to_sqrt_ratio',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'sqrt_ratio',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'ekubo::types::delta::Delta',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_market_depth',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'sqrt_percent',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'ekubo::router::Depth',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_market_depth_v2',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'percent_64x64',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'ekubo::router::Depth',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'get_market_depth_at_sqrt_ratio',
        inputs: [
          {
            name: 'pool_key',
            type: 'ekubo::types::keys::PoolKey',
          },
          {
            name: 'sqrt_ratio',
            type: 'core::integer::u256',
          },
          {
            name: 'percent_64x64',
            type: 'core::integer::u128',
          },
        ],
        outputs: [
          {
            type: 'ekubo::router::Depth',
          },
        ],
        state_mutability: 'view',
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
        name: 'core',
        type: 'ekubo::interfaces::core::ICoreDispatcher',
      },
    ],
  },
  {
    type: 'event',
    name: 'ekubo::router::Router::Event',
    kind: 'enum',
    variants: [],
  },
];
