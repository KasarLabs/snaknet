// addLiquidity.test.js - Test for ekubo_add_liquidity tool
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

  const result = await client.callTool({
    name: 'add_liquidity',
    arguments: {
      position_id: 2165129,
      token0: {
        assetType: 'SYMBOL',
        assetValue: 'STRK',
      },
      token1: {
        assetType: 'SYMBOL',
        assetValue: 'ETH',
      },
      amount0: '5000000',
      amount1: '5000',
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: '0x0',
    },
  });

  console.log('Raw result:', JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
