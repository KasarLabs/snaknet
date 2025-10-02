import { RpcProvider, Contract, Account, CallData } from 'starknet';
import { CORE_ABI } from '../../lib/contracts/abi.js';
import { getContractAddress, convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { AddLiquiditySchema } from '../../schemas/index.js';

export const addLiquidity = async (
  provider: RpcProvider,
  account: Account,
  params: AddLiquiditySchema
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

    // Validate tokens
    const { assetSymbol: symbol0, assetAddress: address0 } = extractAssetInfo(params.token0);
    const { assetSymbol: symbol1, assetAddress: address1 } = extractAssetInfo(params.token1);

    const token0: validToken = await validateToken(provider, symbol0, address0);
    const token1: validToken = await validateToken(provider, symbol1, address1);

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

    // Calculate liquidity from amounts
    // L = sqrt(amount0 * amount1)
    const amount0BigInt = BigInt(sortedAmount0);
    const amount1BigInt = BigInt(sortedAmount1);
    const liquiditySquared = amount0BigInt * amount1BigInt;
    const liquidity = BigInt(Math.floor(Math.sqrt(Number(liquiditySquared))));

    // Build position parameters
    const positionParams = {
      salt: '0x0', // Default salt, can be made configurable
      bounds: {
        lower: {
          mag: Math.abs(params.lower_tick),
          sign: params.lower_tick < 0
        },
        upper: {
          mag: Math.abs(params.upper_tick),
          sign: params.upper_tick < 0
        }
      },
      liquidity_delta: {
        mag: liquidity.toString(),
        sign: false // false = positive (adding liquidity)
      }
    };

    // Connect contract to account for write operations
    contract.connect(account);

    // Build calldata
    const calldata = CallData.compile({
      pool_key: poolKey,
      params: positionParams
    });

    // Execute update_position
    const result = await account.execute({
      contractAddress,
      entrypoint: 'update_position',
      calldata
    });

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash: result.transaction_hash,
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
        amount0: sortedAmount0,
        amount1: sortedAmount1,
        liquidity: liquidity.toString(),
        lower_tick: params.lower_tick,
        upper_tick: params.upper_tick,
        pool_fee: params.fee
      }
    });
  } catch (error: any) {
    console.error('Error adding liquidity:', error);
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while adding liquidity'
    });
  }
};
