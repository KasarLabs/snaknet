import { Contract } from 'starknet';
import { SnakAgentInterface } from '../lib/dependances/types.js';
import { INTERACT_ERC721_ABI } from '../lib/abis/interact.js';
import { validateAndFormatTokenId } from '../lib/utils/utils.js';
import { z } from 'zod';
import { ownerOfSchema } from '../schemas/index.js';
import { bigintToHex } from '../lib/utils/utils.js';
import { validateAndParseAddress } from 'starknet';

/**
 * Get the owner of the token.
 * @param agent The SnakAgentInterface instance.
 * @param params The parameters for the getOwner function.
 * @returns A stringified JSON object with the status and the owner address.
 */
export const getOwner = async (
  agent: SnakAgentInterface,
  params: z.infer<typeof ownerOfSchema>
) => {
  try {
    if (!params?.tokenId || !params?.contractAddress) {
      throw new Error('Both token ID and contract address are required');
    }

    const provider = agent.getProvider();

    const contractAddress = validateAndParseAddress(params.contractAddress);
    const tokenId = validateAndFormatTokenId(params.tokenId);

    const contract = new Contract(
      INTERACT_ERC721_ABI,
      contractAddress,
      provider
    );

    const ownerResponse = await contract.ownerOf(tokenId);

    return {
      status: 'success',
      owner: bigintToHex(BigInt(ownerResponse)),
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
