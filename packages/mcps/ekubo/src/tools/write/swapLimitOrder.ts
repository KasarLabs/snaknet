import { Contract, Account, constants } from 'starknet';
import { POSITIONS_ABI } from '../../lib/contracts/abi.js';
import { POSITIONS_NFT_ADDRESS } from '../../lib/contracts/addresses.js';
import { NEW_ERC20_ABI } from '../../lib/contracts/erc20.js';
import { getChain } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { z } from 'zod';
import { assetSchema } from '../../schemas/index.js';

const swapLimitOrderSchema = z.object({
  token_in: assetSchema
    .describe('The asset information (symbol or contract address) of the token to sell'),
  token_out: assetSchema
    .describe('The asset information (symbol or contract address) of the token to buy'),
  amount: z
    .string()
    .describe('The amount to swap (in token decimals)'),
  limit_tick: z
    .number()
    .describe('The tick at which to place the limit order')
});

type SwapLimitOrderSchema = z.infer<typeof swapLimitOrderSchema>;

export const swapLimitOrder = async (
  env: any,
  params: SwapLimitOrderSchema
) => {
  try {
    const chain = await getChain(env.provider);
    const positionsAddress = POSITIONS_NFT_ADDRESS[chain];
    const positionsContract = new Contract(POSITIONS_ABI, positionsAddress, env.provider);

    // Validate tokens
    const { assetSymbol: tokenInSymbol, assetAddress: tokenInAddress } = extractAssetInfo(params.token_in);
    const { assetSymbol: tokenOutSymbol, assetAddress: tokenOutAddress } = extractAssetInfo(params.token_out);

    const tokenIn: validToken = await validateToken(env.provider, tokenInSymbol, tokenInAddress);
    const tokenOut: validToken = await validateToken(env.provider, tokenOutSymbol, tokenOutAddress);

    // Sort tokens by address (Ekubo requirement)
    const token0 = tokenIn.address < tokenOut.address ? tokenIn : tokenOut;
    const token1 = tokenIn.address < tokenOut.address ? tokenOut : tokenIn;

    // Build OrderKey for limit order
    const orderKey = {
      token0: token0.address,
      token1: token1.address,
      tick: {
        mag: BigInt(Math.abs(params.limit_tick)),
        sign: params.limit_tick < 0
      }
    };

    // Create account
    const account = new Account(
      env.provider,
      env.accountAddress,
      env.privateKey,
      undefined,
      constants.TRANSACTION_VERSION.V3
    );

    // Transfer token_in to Positions contract
    const tokenInContract = new Contract(NEW_ERC20_ABI, tokenIn.address, env.provider);
    tokenInContract.connect(account);
    const transferCalldata = tokenInContract.populate('transfer', [positionsAddress, params.amount]);

    // Call swap_to_limit_order_price_and_maybe_mint_and_place_limit_order
    positionsContract.connect(account);
    const swapLimitCalldata = positionsContract.populate('swap_to_limit_order_price_and_maybe_mint_and_place_limit_order', [
      orderKey,
      BigInt(params.amount)
    ]);

    // Clear token_out (to get the swapped tokens back)
    const clearCalldata = positionsContract.populate('clear', [
      { contract_address: tokenOut.address }
    ]);

    // Execute all in a single V3 transaction: transfer, swap+limit, clear
    const { transaction_hash } = await account.execute([
      transferCalldata,
      swapLimitCalldata,
      clearCalldata
    ]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash,
        token_in: tokenIn.symbol,
        token_out: tokenOut.symbol,
        amount: params.amount,
        limit_tick: params.limit_tick
      }
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while swapping to limit order'
    });
  }
};

export { swapLimitOrderSchema };
