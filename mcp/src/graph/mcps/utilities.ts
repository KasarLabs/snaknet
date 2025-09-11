import { mcpsInfo } from './infos.js'
import { 
    MCPEnvironment,
    MCPClientConfig
} from './interfaces.js'

import { logger } from '../../utils/index.js';

export const AvailableAgents = Object.keys(mcpsInfo);
export type AgentName = typeof AvailableAgents[number]

export const getMCPClientConfig = (
  serverName: string, 
  env?: MCPEnvironment
): MCPClientConfig => {
  const serverInfo = mcpsInfo[serverName];
  if (!serverInfo) {
    throw new Error(`Configuration MCP introuvable pour ${serverName}`);
  }
  
  const config = { ...serverInfo.client };

  if (env) {
    config.env = {
      ...config.env,
      STARKNET_RPC_URL: env.rpcProvider || '',
      STARKNET_ACCOUNT_ADDRESS: env.accountAddress || '',
      STARKNET_PRIVATE_KEY: env.privateKey || '',
    };
  }
  logger.error('CONFIG: ', config);
  return config;
};

export const getMCPDescription = (serverName: string): string => {
  return mcpsInfo[serverName]?.description;
};

export const getMCPPromptInfo = (serverName: string): { expertise: string; toolsList: string } => {
  const serverInfo = mcpsInfo[serverName];
  return {
    expertise: serverInfo.promptInfo.expertise,
    toolsList: serverInfo.promptInfo.tools.join(', ')
  };
};