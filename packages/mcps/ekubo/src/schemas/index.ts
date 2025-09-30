import { z } from 'zod';

export const getPoolInfoSchema = z.object({
    token0: z
    .string()
    .describe('The Starknet contract address of the first token in the pool'),
  token1: z
    .string()
    .describe('The Starknet contract address of the second token in the pool'),
  fee: z
    .number()
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%)'),
  tick_spacing: z
    .number()
    .describe('The tick spacing for the pool (e.g., 10)'),
  extension: z
    .string()
    .describe('The extension contract address (use "0x0" for default pools)')
});

export type PoolKey = z.infer<typeof getPoolInfoSchema>

export const getTokenPriceSchema = z.object({
  token_address: z
    .string()
    .describe('The Starknet contract address of the token to get the price for'),
  quote_currency: z
    .string()
    .describe('The Starknet contract address of the quote currency (e.g., USDC, ETH)'),
  fee: z
    .number()
    .optional()
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%, defaults to 0.05)'),
  tick_spacing: z
    .number()
    .optional()
    .describe('The tick spacing for the pool (default: 10)'),
  extension: z
    .string()
    .optional()
    .describe('The extension contract address (default: "0x0")')
});

export const getPoolLiquiditySchema = z.object({
  token0: z
    .string()
    .describe('The Starknet contract address of the first token in the pool'),
  token1: z
    .string()
    .describe('The Starknet contract address of the second token in the pool'),
  fee: z
    .number()
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%)'),
  tick_spacing: z
    .number()
    .describe('The tick spacing for the pool (e.g., 10)'),
  extension: z
    .string()
    .describe('The extension contract address (use "0x0" for default pools)')
});

export const getPoolFeesPerLiquiditySchema = z.object({
  token0: z
    .string()
    .describe('The Starknet contract address of the first token in the pool'),
  token1: z
    .string()
    .describe('The Starknet contract address of the second token in the pool'),
  fee: z
    .number()
    .describe('The fee tier as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%)'),
  tick_spacing: z
    .number()
    .describe('The tick spacing for the pool (e.g., 10)'),
  extension: z
    .string()
    .describe('The extension contract address (use "0x0" for default pools)')
});

