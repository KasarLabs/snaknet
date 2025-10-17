import { ExtendedApiEnv, ExtendedApiResponse, Order } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetOpenOrdersSchema } from '../../schemas/index.js';

export const getOpenOrders = async (
  env: ExtendedApiEnv,
  params: GetOpenOrdersSchema
): Promise<ExtendedApiResponse<Order[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.market) queryParams.append('market', params.market);
    if (params.type) queryParams.append('type', params.type);
    if (params.side) queryParams.append('side', params.side);

    const endpoint = `/api/v1/user/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await apiGet<{ orders: Order[] }>(
      env,
      endpoint,
      true
    );

    return {
      status: 'success',
      data: response.orders,
    };
  } catch (error: any) {
    console.error('Error getting open orders:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get open orders',
    };
  }
};
