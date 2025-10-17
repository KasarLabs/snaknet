import { ExtendedApiEnv, ExtendedApiResponse } from '../../lib/types/index.js';
import { apiPost } from '../../lib/utils/api.js';
import { MassCancelOrdersSchema } from '../../schemas/index.js';

export const massCancelOrders = async (
  env: ExtendedApiEnv,
  params: MassCancelOrdersSchema
): Promise<ExtendedApiResponse<{ message: string }>> => {
  try {
    const payload: Record<string, any> = {};

    if (params.order_ids) payload.orderIds = params.order_ids;
    if (params.external_order_ids) payload.externalOrderIds = params.external_order_ids;
    if (params.markets) payload.markets = params.markets;
    if (params.cancel_all !== undefined) payload.cancelAll = params.cancel_all;

    await apiPost<{ status: string }>(
      env,
      '/api/v1/user/order/massCancel',
      payload
    );

    return {
      status: 'success',
      data: { message: 'Mass cancel request submitted successfully' },
    };
  } catch (error: any) {
    console.error('Error mass canceling orders:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to mass cancel orders',
    };
  }
};
