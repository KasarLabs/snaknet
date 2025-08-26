import { z } from 'zod';

export interface Erc20Tool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params?: any) => Promise<string>;
}