import { z } from 'zod';

export interface TransactionTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params: any) => Promise<any>;
}
