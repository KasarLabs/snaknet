import * as fs from 'fs/promises';
import { Account, constants, Contract, CallData } from 'starknet';

export interface StarknetCredentials {
  accountAddress: string;
  accountPrivateKey: string;
  rpcUrl: string;
}

/**
 * Contract Manager class for handling contract operations
 */
export class ContractManager {
  private account: Account;
  private sierra: any = null;
  private casm: any = null;

  constructor(account: Account) {
    this.account = account;
  }

  /**
   * Load contract compilation files from file paths
   */
  async loadContractCompilationFiles(
    sierraPath: string,
    casmPath: string
  ): Promise<void> {
    try {
      const sierraContent = await fs.readFile(sierraPath, 'utf-8');
      const casmContent = await fs.readFile(casmPath, 'utf-8');

      this.sierra = JSON.parse(sierraContent);
      this.casm = JSON.parse(casmContent);
    } catch (error) {
      throw new Error(`Failed to load contract files: ${error.message}`);
    }
  }

  /**
   * Declare the contract
   */
  async declareContract(): Promise<any> {
    if (!this.sierra || !this.casm) {
      throw new Error(
        'Contract files not loaded. Call loadContractCompilationFiles first.'
      );
    }

    try {
      const declareResponse = await this.account.declare({
        contract: this.sierra,
        compiledClassHash: this.casm.class_hash,
        classHash: this.sierra.class_hash,
      });

      return declareResponse;
    } catch (error) {
      throw new Error(`Contract declaration failed: ${error.message}`);
    }
  }

  /**
   * Deploy the contract
   */
  async deployContract(
    classHash: string,
    constructorArgs: string[] = []
  ): Promise<any> {
    try {
      const calldata =
        constructorArgs.length > 0 ? CallData.compile(constructorArgs) : [];

      const deployResponse = await this.account.deploy({
        classHash,
        constructorCalldata: calldata,
      });

      return deployResponse;
    } catch (error) {
      throw new Error(`Contract deployment failed: ${error.message}`);
    }
  }

  /**
   * Get constructor parameters from sierra file
   */
  getConstructorParams(): any[] {
    if (!this.sierra) {
      throw new Error(
        'Sierra file not loaded. Call loadContractCompilationFiles first.'
      );
    }

    try {
      // Look for constructor in the ABI
      const constructorEntry = this.sierra.abi?.find(
        (entry: any) => entry.type === 'constructor'
      );

      return constructorEntry?.inputs || [];
    } catch (error) {
      throw new Error(`Failed to get constructor parameters: ${error.message}`);
    }
  }
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
  try {
    await fs.access(sierraPath, fs.constants.R_OK);
    await fs.access(casmPath, fs.constants.R_OK);
  } catch (error) {
    throw new Error(`File validation failed: ${error.message}`);
  }
}

/**
 * Format contract operation errors
 */
export function formatContractError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  return 'Unknown contract operation error';
}
