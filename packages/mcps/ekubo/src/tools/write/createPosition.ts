import { getERC20Contract } from '../../lib/utils/contracts.js';
import { getContract } from '../../lib/utils/contracts.js';
import { preparePoolKeyFromParams } from '../../lib/utils/pools.js';
import { buildBounds, sortAmounts } from '../../lib/utils/liquidity.js';
import { CreatePositionSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';

export const createPosition = async (env: envWrite, params: CreatePositionSchema) => {
  try {
    const account = env.account;
    const positionsContract = await getContract(env.provider, 'positions');

    const { poolKey, token0, token1, isTokenALower } =
      await preparePoolKeyFromParams(env.provider, {
        token0: params.token0,
        token1: params.token1,
        fee: params.fee,
        tick_spacing: params.tick_spacing,
        extension: params.extension,
      });

    const { amount0, amount1 } = sortAmounts(
      params.amount0,
      params.amount1,
      isTokenALower
    );
    const bounds = buildBounds(params.lower_tick, params.upper_tick);
    const minLiquidity = 0;

    const token0Contract = getERC20Contract(token0.address, env.provider);
    token0Contract.connect(account);
    const transfer0Calldata = token0Contract.populate('transfer', [
      positionsContract.address,
      amount0,
    ]);

    const token1Contract = getERC20Contract(token1.address, env.provider);
    token1Contract.connect(account);
    const transfer1Calldata = token1Contract.populate('transfer', [
      positionsContract.address,
      amount1,
    ]);

    positionsContract.connect(account);
    const mintCalldata = positionsContract.populate(
      'mint_and_deposit_and_clear_both',
      [poolKey, bounds, minLiquidity]
    );

    const executeResult = await account.execute([
      transfer0Calldata,
      transfer1Calldata,
      mintCalldata,
    ]);

    const receipt = await account.waitForTransaction(
      executeResult.transaction_hash
    );
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    let positionId: string | undefined;
    const TRANSFER_EVENT_KEY =
      '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9';
    let POSITION_NFT =
      '0x7b696af58c967c1b14c9dde0ace001720635a660a8e90c565ea459345318b30';
    if ('events' in receipt && Array.isArray(receipt.events)) {
      for (const event of receipt.events) {
        if (
          event.from_address === POSITION_NFT &&
          event.keys?.[0] === TRANSFER_EVENT_KEY
        ) {
          const fromAddress = event.data?.[0];
          if (fromAddress === '0x0') {
            console.error(`EVENT DATE: ${event.data}`);
            positionId = event.data?.[2];
            break;
          }
        }
      }
    }

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash: executeResult.transaction_hash,
        position_id: positionId ? BigInt(positionId).toString() : undefined,
        token0: token0.symbol,
        token1: token1.symbol,
        amount0: amount0,
        amount1: amount1,
        lower_tick: params.lower_tick,
        upper_tick: params.upper_tick,
        pool_fee: params.fee,
      },
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while adding liquidity',
    });
  }
};
