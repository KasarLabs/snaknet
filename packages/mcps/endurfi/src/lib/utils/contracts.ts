import { Contract, RpcProvider } from 'starknet';
import { endurfiAddress, strkTokenAddress } from '../constants/addresses.js';
import { WITHDRAW_QUEUE_ABI, XSTRK_ABI, NEW_ERC20_ABI } from '../constants/abis/index.js';

// Determine network from RPC URL
const getNetwork = (provider: RpcProvider): 'mainnet' | 'sepolia' => {
  const nodeUrl = provider.channel.nodeUrl;
  return nodeUrl.includes('sepolia') ? 'sepolia' : 'mainnet';
};

// Get xSTRK ERC4626 vault contract
export const getXStrkContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = endurfiAddress.xSTRK[network];
  return new Contract(XSTRK_ABI, address, provider);
};

// Get STRK ERC20 token contract
export const getStrkContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = strkTokenAddress[network];
  return new Contract(NEW_ERC20_ABI, address, provider);
};

// Get withdraw queue NFT contract
export const getWithdrawQueueNFTContract = (provider: RpcProvider): Contract => {
  const network = getNetwork(provider);
  const address = endurfiAddress.withdrawQueueNFT[network];
  return new Contract(WITHDRAW_QUEUE_ABI, address, provider);
};

// Get withdraw queue NFT contract address
export const getWithdrawQueueNFTAddress = (provider: RpcProvider): string => {
  const network = getNetwork(provider);
  return endurfiAddress.withdrawQueueNFT[network];
};
