export interface MCPEnvironment {
  rpcProvider?: string | undefined;
  accountAddress?: string | undefined;
  privateKey?: string | undefined;
  [key: string]: string | undefined;
}

export interface MCPClientConfig {
  command: string;
  args: string[];
  transport: 'stdio';

  env?: Record<string, string>;
  encoding?: string;
  stderr?: 'overlapped' | 'pipe' | 'ignore' | 'inherit';
  cwd?: string;
  restart?: {
    enabled?: boolean;
    maxAttempts?: number;
    delayMs?: number;
  };
}

export interface MCPPromptInfo {
  expertise: string;
  tools: string[];
}

export interface MCPServerInfo {
  client: MCPClientConfig;
  description: string;
  promptInfo: MCPPromptInfo;
}
