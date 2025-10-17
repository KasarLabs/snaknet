import { ExtendedApiEnv, ExtendedApiResponse, Order } from '../../lib/types/index.js';
import { apiPost } from '../../lib/utils/api.js';
import { CreateMarketOrderSchema } from '../../schemas/index.js';
import { signOrderMessage, createOrderMessageHash } from '../../lib/utils/signature.js';

export const createMarketOrder = async (
  env: ExtendedApiEnv,
  params: CreateMarketOrderSchema
): Promise<ExtendedApiResponse<Order>> => {
  try {
    if (!env.STARKNET_PRIVATE_KEY) {
      throw new Error('STARKNET_PRIVATE_KEY is required for order creation');
    }

    // Generate nonce (must be >= 1 and <= 2^31)
    const nonce = params.nonce || Math.floor(Math.random() * Math.pow(2, 31)) + 1;

    // Market orders still need an expiry (default to 1 hour from now)
    const expiryEpochMillis = Date.now() + (60 * 60 * 1000);

    // Market orders need a price for signature (use a very high buy or very low sell price)
    // This follows the Extended API convention for market orders
    const signaturePrice = params.side === 'BUY' ? '999999999' : '0.00000001';

    // Create message hash for signing
    const messageHash = createOrderMessageHash({
      market: params.market,
      side: params.side,
      price: signaturePrice,
      quantity: params.qty,
      nonce,
      expiryEpochMillis,
    });

    // Sign the order
    const signature = signOrderMessage(env.STARKNET_PRIVATE_KEY, messageHash);

    // Build order payload (market orders don't include price in API payload)
    const orderPayload = {
      id: params.external_id,
      market: params.market,
      type: 'MARKET',
      side: params.side,
      qty: params.qty,
      reduceOnly: params.reduce_only || false,
      selfTradeProtectionLevel: 'ACCOUNT',
      settlement: {
        starkKey: signature.starkKey,
        signature: {
          r: signature.r,
          s: signature.s,
        },
        nonce,
      },
    };

    const response = await apiPost<{ data: Order }>(
      env,
      '/api/v1/user/order',
      orderPayload
    );

    return {
      status: 'success',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating market order:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to create market order',
    };
  }
};
