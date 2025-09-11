import { MCPServerInfo } from './interfaces.js'

export const mcpsInfo: Record<string, MCPServerInfo> = {
  argent: {
    client: {
        command: "node",
        args: ["../mcps/argent/build/index.js"],
        transport: "stdio",
    },
    description: "Gestion des comptes Argent sur Starknet",
    promptInfo: {
      expertise: "compte Argent sur Starknet",
      tools: [
        'create_new_argent_account', 
        'deploy_existing_argent_account'
      ]
    }
  }
};
