import { z } from 'zod';

export interface ScarbTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params?: any) => Promise<string>;
}