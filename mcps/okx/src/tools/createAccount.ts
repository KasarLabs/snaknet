import { RpcProvider } from 'starknet';
import { OKX_CLASSHASH } from '../lib/constant/contract.js';
import { AccountManager } from '../lib/utils/AccountManager.js';

/**
 * Creates a new OKX account.
 * @async
 * @function CreateOKXAccount
 * @returns {Promise<string>} JSON string with account details
 * @throws {Error} If account creation fails
 */
export const CreateOKXAccount = async () => {
  try {
    const accountManager = new AccountManager(undefined);
    const accountDetails = await accountManager.createAccount(OKX_CLASSHASH);

    return JSON.stringify({
      status: 'success',
      wallet: 'OKX',
      publicKey: accountDetails.publicKey,
      privateKey: accountDetails.privateKey,
      contractAddress: accountDetails.contractAddress,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
