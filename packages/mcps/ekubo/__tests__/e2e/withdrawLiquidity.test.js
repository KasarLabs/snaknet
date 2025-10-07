// withdrawLiquidity.test.js - Test for ekubo_withdraw_liquidity tool
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['build/index.js'],
});

const client = new Client({
  name: 'test-client',
  version: '1.0.0',
});

try {
  await client.connect(transport);

  // Test 1: Withdraw full liquidity + collect fees
  console.log('\n=== Test 1: Withdraw full liquidity + collect fees ===');
  const result1 = await client.callTool({
    name: "withdraw_liquidity",
    arguments: {
      position_id: 2164550, // Replace with your actual position ID
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "STRK"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      liquidity_amount: "66600", // Replace with actual liquidity amount
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0",
      fees_only: false,
      collect_fees: true
    }
  });

  console.log('Raw result:', JSON.stringify(result1, null, 2));

  // Test 2: Collect fees only (no liquidity withdrawal)
  console.log('\n=== Test 2: Collect fees only ===');
  const result2 = await client.callTool({
    name: "withdraw_liquidity",
    arguments: {
      position_id: 2165129,
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "STRK"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      liquidity_amount: "0", 
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0",
      fees_only: true, // Only collect fees, don't withdraw liquidity
      collect_fees: true
    }
  });

  console.log('Raw result:', JSON.stringify(result2, null, 2));
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
