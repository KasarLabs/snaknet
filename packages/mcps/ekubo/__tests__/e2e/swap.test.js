// client.js - Simple MCP test
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
    name: 'swap',
    arguments: {
      token_in: {
        assetType: 'SYMBOL',
        assetValue: 'ETH',
      },
      token_out: {
        assetType: 'SYMBOL',
        assetValue: 'USDC',
      },
      amount: '100000000000',
      is_amount_in: true,
      slippage_tolerance: 0.5,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: '0x0',
    },
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
