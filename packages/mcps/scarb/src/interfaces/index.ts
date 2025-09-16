import { z } from 'zod';

export interface mcpTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params: any) => Promise<any>;
}
