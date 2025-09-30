import { RpcProvider, Contract } from 'starknet';
import { CORE_ABI } from '../../lib/contracts/abi.js';
import { getContractAddress, calculateActualPrice, convertFeePercentToU128 } from '../../lib/utils/index.js';

interface TokenPriceParams {
  token_address: string;
  quote_currency: string;
  fee?: number;
  tick_spacing?: number;
  extension?: string;
}

export const getTokenPrice = async (
  provider: RpcProvider,
  params: TokenPriceParams
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

    // Default pool parameters (0.05% fee tier, most common)
    const feePercent = params.fee !== undefined ? params.fee : 0.05;
    const poolKey = {
      token0: params.token_address < params.quote_currency ? params.token_address : params.quote_currency,
      token1: params.token_address < params.quote_currency ? params.quote_currency : params.token_address,
      fee: convertFeePercentToU128(feePercent),
      tick_spacing: params.tick_spacing || 10,
      extension: params.extension || '0x0'
    };

    const priceResult = await contract.get_pool_price(poolKey);
    const sqrtPrice = priceResult.sqrt_ratio;
    const price = calculateActualPrice(sqrtPrice);

    // If token order was reversed, invert the price
    const finalPrice = params.token_address < params.quote_currency ? price : 1 / price;

    return JSON.stringify({
      status: 'success',
      data: {
        base_token: params.token_address,
        quote_token: params.quote_currency,
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