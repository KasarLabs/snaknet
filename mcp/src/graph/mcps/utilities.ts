import { readFileSync } from 'fs';
import { join } from 'path';
import {
  MCPServerInfo,
  MCPEnvironment,
  MCPClientConfig,
} from './interfaces.js';
import { logger } from '../../utils/index.js';

function loadMcpsConfig(): Record<string, MCPServerInfo> {
  try {
    const configPath = join(process.cwd(), '../mcps.json');
    const configContent = readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    console.error('Error loading mcps.json:', error);
    return {};
  }
}

export function getMcpInfo(name: string): MCPServerInfo | undefined {
  const config = loadMcpsConfig();
  return config[name];
}

export function getAllMcpInfo(): Record<string, MCPServerInfo> {
  return loadMcpsConfig();
}

export function getMcpNames(): string[] {
  const config = loadMcpsConfig();
  return Object.keys(config);
}

export const AvailableAgents = getMcpNames();
export type AgentName = (typeof AvailableAgents)[number];

export const getMCPClientConfig = (
  serverName: string,
  env?: MCPEnvironment
): MCPClientConfig => {
  const serverInfo = getMcpInfo(serverName);
  if (!serverInfo) {
    throw new Error(`Configuration MCP introuvable pour ${serverName}`);
  }

  const config = { ...serverInfo.client };

  // Construct the full path: ../mcps/{serverName}/{relativePath}
  if (config.args && config.args.length > 0) {
    config.args = config.args.map((arg) =>
      arg.includes('build/') ? `../mcps/${serverName}/${arg}` : arg
    );
  }

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
  return getMcpInfo(serverName)?.description || '';
};

export const getMCPPromptInfo = (
  serverName: string
): { expertise: string; toolsList: string } => {
  const serverInfo = getMcpInfo(serverName);
  if (!serverInfo) {
    return { expertise: '', toolsList: '' };
  }
  return {
    expertise: serverInfo.promptInfo.expertise,
    toolsList: serverInfo.promptInfo.tools.join(', '),
  };
};
