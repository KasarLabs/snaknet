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
    queryParams.append('fromTime', params.fromTime.toString());
    if (params.market) queryParams.append('market', params.market);
    if (params.side) queryParams.append('side', params.side);

    const endpoint = `/api/v1/user/funding/history?${queryParams.toString()}`;
    console.error(endpoint);
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
