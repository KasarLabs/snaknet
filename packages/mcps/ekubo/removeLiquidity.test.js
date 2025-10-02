// removeLiquidity.test.js - Test for ekubo_remove_liquidity tool
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
    name: "ekubo_remove_liquidity",
    arguments: {
      position_id: "123456",
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "USDC"
      },
      liquidity_amount: "500000",
      lower_tick: -50,
      upper_tick: 50,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0",
      fees_only: false,
      collect_fees: true
    }
  });

  console.log('Raw result:', JSON.stringify(result, null, 2));
  const response = JSON.parse(result.content[0].text);
  console.log('Parsed response:', JSON.stringify(response, null, 2));
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
