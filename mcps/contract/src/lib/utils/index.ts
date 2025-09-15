export { ContractManager } from './contractManager.js';

export interface StarknetCredentials {
  accountAddress: string;
  accountPrivateKey: string;
  rpcUrl: string;
}

/**
 * Get Starknet credentials from environment variables
 */
export function getStarknetCredentials(): StarknetCredentials {
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const accountPrivateKey = process.env.STARKNET_PRIVATE_KEY;
  const rpcUrl = process.env.STARKNET_RPC_URL;

  if (!accountAddress || !accountPrivateKey || !rpcUrl) {
    throw new Error(
      'Missing required environment variables: STARKNET_ACCOUNT_ADDRESS, STARKNET_PRIVATE_KEY, STARKNET_RPC_URL'
    );
  }

  return {
    accountAddress,
    accountPrivateKey,
    rpcUrl,
  };
}

/**
 * Validate that file paths exist and are readable
 */
export async function validateFilePaths(
  sierraPath: string,
  casmPath: string
): Promise<void> {
  const fs = await import('fs/promises');
  try {
    await fs.access(sierraPath, fs.constants.R_OK);
    await fs.access(casmPath, fs.constants.R_OK);
  } catch (error) {
    throw new Error(`File validation failed: ${error}`);
  }
}

/**
 * Format contract operation errors
 */
export function formatContractError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Unknown contract operation error';
}