import {
  getLiquidTokenContract,
  getTokenDecimals,
  getLiquidTokenName,
  getUnderlyingTokenName,
} from '../../lib/utils/contracts.js';
import { PreviewUnstakeSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

export const previewUnstake = async (env: envRead, params: PreviewUnstakeSchema) => {
  try {
    const liquidTokenContract = getLiquidTokenContract(env.provider, params.token_type);
    const decimals = getTokenDecimals(params.token_type);
    const liquidTokenName = getLiquidTokenName(params.token_type);
    const underlyingTokenName = getUnderlyingTokenName(params.token_type);

    // Preview how much underlying token will be received for the given liquid token amount
    // starknet.js returns u256 directly as bigint
    const assets = await liquidTokenContract.preview_redeem(BigInt(params.amount));

    return {
      status: 'success',
      data: {
        token_type: params.token_type,
        liquid_token: liquidTokenName,
        underlying_token: underlyingTokenName,
        amount: params.amount,
        amount_formatted: formatUnits(BigInt(params.amount), decimals),
        estimated_assets: assets.toString(),
        estimated_assets_formatted: formatUnits(assets, decimals),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error previewing unstake',
    };
  }
};
