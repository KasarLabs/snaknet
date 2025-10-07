import { getXStrkContract } from '../../lib/utils/contracts.js';
import { GetExchangeRateSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { calculateExchangeRate } from '../../lib/utils/formatting.js';

export const getExchangeRate = async (
  env: envRead,
  _params: GetExchangeRateSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Use 1 xSTRK (with 18 decimals) as reference
    const oneXStrk = {
      low: 1000000000000000000n & ((1n << 128n) - 1n),
      high: 1000000000000000000n >> 128n,
    };

    // Get how much STRK 1 xSTRK is worth
    const strkValue = await xStrkContract.convert_to_assets(oneXStrk);
    const strkAmount = BigInt(strkValue.low) + (BigInt(strkValue.high) << 128n);

    // Calculate exchange rate
    const exchangeRate = calculateExchangeRate(strkAmount, 1000000000000000000n, 18);

    return {
      status: 'success',
      data: {
        exchange_rate: exchangeRate,
        description: `1 xSTRK = ${exchangeRate.toFixed(6)} STRK`,
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error getting exchange rate',
    };
  }
};
