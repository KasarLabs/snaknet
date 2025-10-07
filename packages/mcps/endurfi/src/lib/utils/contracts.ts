import { Contract, RpcProvider } from 'starknet';
import { endurfiAddress, strkTokenAddress } from '../constants/addresses.js';
import { erc4626Abi, erc20Abi } from '../constants/abis/index.js';

// Determine network from RPC URL
const getNetwork = (provider: RpcProvider): 'mainnet' | 'sepolia' => {
  const nodeUrl = provider.channel.nodeUrl;
  return nodeUrl.includes('sepolia') ? 'sepolia' : 'mainnet';
};

// Get xSTRK ERC4626 vault contract
export const getXStrkContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = endurfiAddress.xSTRK[network];
  return new Contract(erc4626Abi, address, provider);
};

// Get STRK ERC20 token contract
export const getStrkContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = strkTokenAddress[network];
  return new Contract(erc20Abi, address, provider);
};

// Get withdraw queue NFT contract (if needed in the future)
export const getWithdrawQueueNFTContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = endurfiAddress.withdrawQueueNFT[network];
  // For now, return a basic contract - we'll need the proper ABI for NFT operations
  return new Contract([], address, provider);
};
