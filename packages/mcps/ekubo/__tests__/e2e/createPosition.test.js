// createPosition.test.js - Test for ekubo_create_position tool
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
    name: 'create_position',
    arguments: {
      token0: {
        assetType: 'SYMBOL',
        assetValue: 'ETH',
      },
      token1: {
        assetType: 'SYMBOL',
        assetValue: 'STRK',
      },
      amount0: '1000000', // 0.0001 ETH (0.1 wei = 10^14 wei)
      amount1: '1000000000', // 0.1 STRK (10^17 wei)
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
