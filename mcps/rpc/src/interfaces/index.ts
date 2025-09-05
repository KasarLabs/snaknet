import { RpcProvider } from 'starknet';
import { z } from 'zod';

export interface RpcTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (provider: RpcProvider, params?: any) => Promise<string>;
}
