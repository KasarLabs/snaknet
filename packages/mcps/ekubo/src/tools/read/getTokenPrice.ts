import { calculateActualPrice, convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/math.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { GetTokenPriceSchema, envRead } from '../../schemas/index.js';
import { getContract } from '../../lib/contracts/index.js';

export const getTokenPrice = async (
  env: envRead,
  params: GetTokenPriceSchema
) => {
  const provider = env.provider;
  try {
    const contract = await getContract(provider, 'core');

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

    const poolKey = {
      token0: token.address < quote_currency.address ? token.address : quote_currency.address,
      token1: token.address < quote_currency.address ? quote_currency.address : token.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing),
      extension: params.extension
    };

    const priceResult = await contract.get_pool_price(poolKey);
    const sqrtPrice = priceResult.sqrt_ratio;

    // poolKey.token0 is the lower address, poolKey.token1 is the higher address
    const token0 = token.address < quote_currency.address ? token : quote_currency;
    const token1 = token.address < quote_currency.address ? quote_currency : token;

    // Price from Ekubo is always token1/token0
    const price = calculateActualPrice(sqrtPrice, token0.decimals, token1.decimals);

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
      ? `${errorMessage}. Try specifying different fee/tick_spacing values. Common pairs: fee=0.05 tick_spacing=0.1, fee=0.3 tick_spacing=0.6, or fee=1 tick_spacing=2.`
      : errorMessage;

    return JSON.stringify({
      status: 'failure',
      error: suggestion,
    });
  }
};