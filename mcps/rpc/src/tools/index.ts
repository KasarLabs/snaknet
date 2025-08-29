import { RpcTool } from '../interfaces/index.js';
import { getSpecVersion } from '../actions/getSpecVersion.js';
import { getBlockWithTxHashes } from '../actions/getBlockWithTxHashes.js';
import { getBlockWithReceipts } from '../actions/getBlockWithReceipts.js';
import { getTransactionStatus } from '../actions/getTransactionStatus.js';
import { getClass } from '../actions/getClass.js';
import { getChainId } from '../actions/getChainId.js';
import { getSyncingStats } from '../actions/getSyncingStats.js';
import { getBlockNumber } from '../actions/getBlockNumber.js';
import { getBlockTransactionCount } from '../actions/getBlockTransactionCount.js';
import { getStorageAt } from '../actions/getStorageAt.js';
import { getClassAt } from '../actions/getClassAt.js';
import { getClassHashAt } from '../actions/getClassHashAt.js';
import {
  getStorageAtSchema,
  blockIdSchema,
  blockIdAndContractAddressSchema,
  getClassAtSchema,
  getClassHashAtSchema,
  transactionHashSchema,
} from '../schema/index.js';

export const registerTools = (RpcToolRegistry: RpcTool[]) => {
  RpcToolRegistry.push({
    name: 'get_chain_id',
    description:
      'Retrieve the unique identifier (chain ID) of the Starknet network',
    execute: getChainId,
  });

  RpcToolRegistry.push({
    name: 'get_syncing_status',
    description: 'Retrieve the syncing status of the Starknet node',
    execute: getSyncingStats,
  });

  // Add remaining tools from createTools2
  RpcToolRegistry.push({
    name: 'get_class_hash',
    description:
      'Retrieve the unique class hash for a contract at a specific address',
    schema: getClassHashAtSchema,
    execute: getClassHashAt,
  });

  RpcToolRegistry.push({
    name: 'get_spec_version',
    description: 'Get the current spec version from the Starknet RPC provider',
    execute: getSpecVersion,
  });

  RpcToolRegistry.push({
    name: 'get_block_with_tx_hashes',
    description:
      'Retrieve the details of a block, including transaction hashes',
    schema: blockIdSchema,
    execute: getBlockWithTxHashes,
  });

  RpcToolRegistry.push({
    name: 'get_block_with_receipts',
    description: 'Fetch block details with transaction receipts',
    schema: blockIdSchema,
    execute: getBlockWithReceipts,
  });

  RpcToolRegistry.push({
    name: 'get_transaction_status',
    description: 'Fetch transaction status by hash',
    schema: transactionHashSchema,
    execute: getTransactionStatus,
  });

  // Register blockchain query tools
  RpcToolRegistry.push({
    name: 'get_block_number',
    description: 'Get the current block number from the Starknet network',
    execute: getBlockNumber,
  });

  RpcToolRegistry.push({
    name: 'get_block_transaction_count',
    description: 'Get the number of transactions in a specific block',
    schema: blockIdSchema,
    execute: getBlockTransactionCount,
  });

  RpcToolRegistry.push({
    name: 'get_storage_at',
    description: 'Get the storage value at a specific slot for a contract',
    schema: getStorageAtSchema,
    execute: getStorageAt,
  });

  // Register contract-related tools
  RpcToolRegistry.push({
    name: 'get_class',
    description:
      'Retrieve the complete class definition of a contract at a specified address and block',
    schema: blockIdAndContractAddressSchema,
    execute: getClass,
  });

  RpcToolRegistry.push({
    name: 'get_class_at',
    description:
      'Fetch the class definition of a contract at a specific address in the latest state',
    schema: getClassAtSchema,
    execute: getClassAt,
  });
};
