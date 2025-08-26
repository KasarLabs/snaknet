import { z } from 'zod';

export interface BraavosTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params: any) => Promise<any>;
}