import { z } from 'zod';

export interface UnruggableTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params?: any) => Promise<string>;
}