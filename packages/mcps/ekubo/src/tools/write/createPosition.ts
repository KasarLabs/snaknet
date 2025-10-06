import { RpcProvider, Contract, Account, constants, cairo } from 'starknet';
import { POSITIONS_ABI } from '../../lib/contracts/abi.js';
import { POSITIONS_ADDRESS, POSITIONS_NFT_ADDRESS } from '../../lib/contracts/addresses.js';
import { NEW_ERC20_ABI } from '../../lib/contracts/erc20.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent, getChain } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { AddLiquiditySchema } from '../../schemas/index.js';

export const createPosition = async (
  env: any,
  params: AddLiquiditySchema
) => {
  try {
    const chain = await getChain(env.provider);
    const positionsAddress = POSITIONS_ADDRESS[chain];
    const positionsContract = new Contract(POSITIONS_ABI, positionsAddress, env.provider);

    // Validate tokens
    const { assetSymbol: symbol0, assetAddress: address0 } = extractAssetInfo(params.token0);
    const { assetSymbol: symbol1, assetAddress: address1 } = extractAssetInfo(params.token1);

    const token0: validToken = await validateToken(env.provider, symbol0, address0);
    const token1: validToken = await validateToken(env.provider, symbol1, address1);

    // Sort tokens by address (Ekubo requirement)
    const sortedToken0 = token0.address < token1.address ? token0 : token1;
    const sortedToken1 = token0.address < token1.address ? token1 : token0;
    const sortedAmount0 = token0.address < token1.address ? params.amount0 : params.amount1;
    const sortedAmount1 = token0.address < token1.address ? params.amount1 : params.amount0;

    // Build pool key
    const poolKey = {
      token0: sortedToken0.address,
      token1: sortedToken1.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing),
      extension: params.extension
    };

    // Build bounds (price range)
    const bounds = {
      lower: {
        mag: BigInt(Math.abs(params.lower_tick)),
        sign: params.lower_tick < 0
      },
      upper: {
        mag: BigInt(Math.abs(params.upper_tick)),
        sign: params.upper_tick < 0
      }
    };

    // Min liquidity (set to 0 for now, can be improved with calculation)
    const minLiquidity = 0;

    // Create account
    const account = new Account(
      env.provider,
      env.accountAddress,
      env.privateKey,
      undefined,
      constants.TRANSACTION_VERSION.V3
    );

    // Transfer token0 to Positions contract
    const token0Contract = new Contract(NEW_ERC20_ABI, sortedToken0.address, env.provider);
    token0Contract.connect(account);
    const transfer0Calldata = token0Contract.populate('transfer', [positionsAddress, sortedAmount0]);

    // Transfer token1 to Positions contract
    const token1Contract = new Contract(NEW_ERC20_ABI, sortedToken1.address, env.provider);
    token1Contract.connect(account);
    const transfer1Calldata = token1Contract.populate('transfer', [positionsAddress, sortedAmount1]);

    // Call mint_and_deposit_and_clear_both
    positionsContract.connect(account);
    const mintCalldata = positionsContract.populate('mint_and_deposit_and_clear_both', [
      poolKey,
      bounds,
      minLiquidity
    ]);

    // Execute all in a single V3 transaction: transfer token0, transfer token1, mint
    const executeResult = await account.execute([
      transfer0Calldata,
      transfer1Calldata,
      mintCalldata
    ]);

    console.error('Execute result:', JSON.stringify(executeResult, null, 2));

    const receipt = await account.waitForTransaction(executeResult.transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    console.error('Receipt:', JSON.stringify(receipt, null, 2));

    // Extract position ID from Transfer event
    let positionId: string | undefined;
    const TRANSFER_EVENT_KEY = '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9';
    let POSITION_NFT = '0x7b696af58c967c1b14c9dde0ace001720635a660a8e90c565ea459345318b30';
    if ('events' in receipt && Array.isArray(receipt.events)) {
      for (const event of receipt.events) {
        // Check if it's from NFT Positions contract and is a Transfer event
        if (event.from_address === POSITION_NFT &&
            event.keys?.[0] === TRANSFER_EVENT_KEY) {
          const fromAddress = event.data?.[0];
          // Check if it's a mint (from = 0x0)
          if (fromAddress === '0x0') {
            console.error(`EVENT DATE: ${event.data}`);
            positionId = event.data?.[2]; // token_id is at index 2
            break;
          }
        }
      }
    }
    console.error("YO");
    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash: executeResult.transaction_hash,
        position_id: positionId ? BigInt(positionId).toString() : undefined,
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
        amount0: sortedAmount0,
        amount1: sortedAmount1,
        lower_tick: params.lower_tick,
        upper_tick: params.upper_tick,
        pool_fee: params.fee
      }
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while adding liquidity'
    });
  }
};
