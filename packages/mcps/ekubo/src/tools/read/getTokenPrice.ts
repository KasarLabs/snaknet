import { RpcProvider, Contract } from 'starknet';
import { CORE_ABI } from '../../lib/contracts/abi.js';
import { getContractAddress, calculateActualPrice, convertFeePercentToU128 } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { GetTokenPriceSchema } from '../../schemas/index.js';

export const getTokenPrice = async (
  provider: RpcProvider,
  params: GetTokenPriceSchema
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

    const { assetSymbol: tokenSymbol, assetAddress: tokenAddress } = extractAssetInfo(params.token);
    const { assetSymbol: currencySymbol, assetAddress: currencyAddress } = extractAssetInfo(params.quote_currency);

    const token: validToken = await validateToken(
      provider,
      tokenSymbol,
      tokenAddress
    );

    const quote_currency: validToken = await validateToken(
      provider,
      currencySymbol,
      currencyAddress
    );

    // Default pool parameters (0.05% fee tier, most common)
    const feePercent = params.fee !== undefined ? params.fee : 0.05;
    const poolKey = {
      token0: token.address < quote_currency.address ? token.address : quote_currency.address,
      token1: token.address < quote_currency.address ? quote_currency.address : token.address,
      fee: convertFeePercentToU128(feePercent),
      tick_spacing: params.tick_spacing,
      extension: params.extension
    };

    const priceResult = await contract.get_pool_price(poolKey);
    const sqrtPrice = priceResult.sqrt_ratio;
    const price = calculateActualPrice(sqrtPrice);

    // If token order was reversed, invert the price
    const finalPrice = token.address < quote_currency.address ? price : 1 / price;

    return JSON.stringify({
      status: 'success',
      data: {
        base_token: token.symbol,
        quote_token: quote_currency.symbol,
        price: finalPrice,
        sqrt_price: sqrtPrice.toString(),
      }
    });
  } catch (error: any) {
    console.error('Error getting token price:', error);

    // Si le pool n'existe pas avec les paramètres par défaut, suggérer d'essayer d'autres valeurs
    const errorMessage = error.message;
    const suggestion = errorMessage.includes('Pool not found') || errorMessage.includes('does not exist')
      ? `${errorMessage}. Try specifying different fee/tick_spacing values. Common pairs: fee=0.05 tick_spacing=10 (0.05%), fee=0.3 tick_spacing=60 (0.3%), or fee=1 tick_spacing=200 (1%).`
      : errorMessage;

    return JSON.stringify({
      status: 'failure',
      error: suggestion,
    });
  }
};