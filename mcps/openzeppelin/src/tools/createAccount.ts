import { RpcProvider } from 'starknet';
import { OZ_CLASSHASH } from '../lib/constant/contract.js';
import { AccountManager } from '../lib/utils/AccountManager.js';

/**
 * Creates a new OpenZeppelin account.
 * @async
 * @function CreateOZAccount
 * @returns {Promise<string>} JSON string with account details
 * @throws {Error} If account creation fails
 */
export const CreateOZAccount = async () => {
  try {
    const accountManager = new AccountManager(undefined);
    const accountDetails = await accountManager.createAccount(OZ_CLASSHASH);

    return JSON.stringify({
      status: 'success',
      wallet: 'Open Zeppelin',
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
