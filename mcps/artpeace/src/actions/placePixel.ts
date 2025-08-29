import { SnakAgentInterface } from '../dependances/types.js';
import { Account, constants, Contract } from 'starknet';
import { artpeaceAbi } from '../abis/artpeaceAbi.js';
import { artpeaceAddr } from '../constants/artpeace.js';
import { ArtpeaceHelper } from '../utils/helper.js';
import { placePixelParam } from '../schema/index.js';
import { Checker } from '../utils/checker.js';

/**
 * Places pixels on a Starknet canvas using the Artpeace contract
 * @param agent Interface for interacting with Starknet blockchain
 * @param input Object containing array of pixel parameters
 * @returns JSON string with transaction status and hash(es)
 */
export const placePixel = async (
  agent: SnakAgentInterface,
  input: { params: placePixelParam[] }
) => {
  try {
    const { params } = input;
    const credentials = agent.getAccountCredentials();
    const provider = agent.getProvider();
    const account = new Account(
      provider,
      credentials.accountPublicKey,
      credentials.accountPrivateKey,
      undefined,
      constants.TRANSACTION_VERSION.V3
    );
    const artpeaceContract = new Contract(artpeaceAbi, artpeaceAddr, provider);
    const checker = new Checker(params[0].canvasId);
    const id = await checker.checkWorld();
    await checker.getColors();

    const txHash = [];
    for (const param of params) {
      const { position, color } = await ArtpeaceHelper.validateAndFillDefaults(
        param,
        checker
      );
      const timestamp = Math.floor(Date.now() / 1000);

      artpeaceContract.connect(account);
      const call = artpeaceContract.populate('place_pixel', {
        canvas_id: id,
        pos: position,
        color: color,
        now: timestamp,
      });

      const res = await account.execute(call);
      await provider.waitForTransaction(res.transaction_hash);
      txHash.push(res.transaction_hash);
    }

    return JSON.stringify({
      status: 'success',
      transaction_hash: txHash,
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'error',
      error: {
        code: 'PLACE_PIXEL_DATA_ERROR',
        message: error.message || 'Failed to place a pixel',
      },
    });
  }
};
