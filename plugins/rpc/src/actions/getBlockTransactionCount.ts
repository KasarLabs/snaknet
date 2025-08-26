import { BlockIdParams } from '../schema/index.js';
import { SnakAgentInterface } from '../dependances/types.js';

export const getBlockTransactionCount = async (
  agent: SnakAgentInterface,
  params: BlockIdParams
) => {
  const provider = agent.getProvider();
  return await provider.getBlockTransactionCount(params.blockId);
};
