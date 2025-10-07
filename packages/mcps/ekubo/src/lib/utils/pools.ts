import { RpcProvider } from "starknet";
import { PoolKey } from "../../schemas/index.js";
import { extractAssetInfo, validateToken, validToken } from "./token.js";
import { convertFeePercentToU128, convertTickSpacingPercentToExponent } from "./math.js";

export async function preparePoolKeyFromParams(
  provider: RpcProvider,
  params: PoolKey
): Promise<{ poolKey: any, token0: validToken, token1: validToken, isTokenALower: boolean }> {
  const { assetSymbol: symbolToken0, assetAddress: addressToken0 } = extractAssetInfo(params.token0);
  const { assetSymbol: symbolToken1, assetAddress: addressToken1 } = extractAssetInfo(params.token1);

  const token0 = await validateToken(provider, symbolToken0, addressToken0);
  const token1 = await validateToken(provider, symbolToken1, addressToken1);
  
  const poolKey = {
    ...params,
    token0: token0.address < token1.address ? token0.address : token1.address,
    token1: token0.address < token1.address ? token1.address : token0.address,
    fee: convertFeePercentToU128(params.fee),
    tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing)
  };

  const isTokenALower = token0.address < token1.address ? true : false;
  return { poolKey, token0, token1, isTokenALower };
}