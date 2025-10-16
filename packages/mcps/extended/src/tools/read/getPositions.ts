import { ExtendedApiEnv, ExtendedApiResponse, Position } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetPositionsSchema } from '../../schemas/index.js';

export const getPositions = async (
  env: ExtendedApiEnv,
  params: GetPositionsSchema
): Promise<ExtendedApiResponse<Position[]>> => {
  try {
    const response = await apiGet<{ positions: Position[] }>(
      env,
      '/api/v1/user/positions',
      true
    );

    return {
      status: 'success',
      data: response.positions,
    };
  } catch (error: any) {
    console.error('Error getting positions:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get positions',
    };
  }
};
