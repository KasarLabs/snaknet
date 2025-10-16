import { ExtendedApiEnv, ExtendedApiResponse } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetFundingPaymentsSchema } from '../../schemas/index.js';

interface FundingPayment {
  market_id: string;
  payment: string;
  timestamp: number;
}

export const getFundingPayments = async (
  env: ExtendedApiEnv,
  params: GetFundingPaymentsSchema
): Promise<ExtendedApiResponse<FundingPayment[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.market_id) queryParams.append('market_id', params.market_id);
    if (params.start_time) queryParams.append('start_time', params.start_time.toString());
    if (params.end_time) queryParams.append('end_time', params.end_time.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/api/v1/user/funding-payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await apiGet<{ funding_payments: FundingPayment[] }>(
      env,
      endpoint,
      true
    );

    return {
      status: 'success',
      data: response.funding_payments,
    };
  } catch (error: any) {
    console.error('Error getting funding payments:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get funding payments',
    };
  }
};
