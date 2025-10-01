import { z } from 'zod';

export const assetSchema = z.object({
  assetType: z
    .enum(['SYMBOL', 'ADDRESS'])
    .describe(
      'The type of the asset concerned by the allowance: SYMBOL or ADDRESS'
    ),
  assetValue: z
    .string()
    .describe(
      'The symbol (e.g., "ETH", "USDC") or the contract address of the token'
    ),
});

export const poolKeySchema = z.object({
  token0: assetSchema
    .describe('The asset information (symbol or contract address) of the first token in the pool'),
  token1: assetSchema
    .describe('The asset information (symbol or contract address) of the second token in the pool'),
  fee: z
    .number()
    .optional()
    .default(0.05)
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%)'),
  tick_spacing: z
    .number()
    .optional()
    .default(0.1)
    .describe('The tick spacing as a percentage (e.g., 0.01 for 0.01%, 0.1 for 0.1%, 1 for 1%, defaults to 0.1)'),
  extension: z
    .string()
    .optional()
    .default("0x0")
    .describe('The extension contract address (use "0x0" for default pools)')
});

export type PoolKey = z.infer<typeof poolKeySchema>

export const getTokenPriceSchema = z.object({
  token: assetSchema
    .describe('The asset information (symbol or contract address) of the token to get the price for'),
  quote_currency: assetSchema
    .describe('The asset information (symbol or contract address) of the quote currency (e.g., USDC, ETH)'),
  fee: z
    .number()
    .optional()
    .default(0.05)
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%, defaults to 0.05)'),
  tick_spacing: z
    .number()
    .optional()
    .default(0.1)
    .describe('The tick spacing as a percentage (e.g., 0.01 for 0.01%, 0.1 for 0.1%, 1 for 1%, defaults to 0.1)'),
  extension: z
    .string()
    .optional()
    .default("0x0")
    .describe('The extension contract address (default: "0x0")')
});

export type GetTokenPriceSchema = z.infer<typeof getTokenPriceSchema>