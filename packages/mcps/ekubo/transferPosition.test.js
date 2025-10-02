// transferPosition.test.js - Test for ekubo_transfer_position tool
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
    name: "ekubo_transfer_position",
    arguments: {
      position_id: "123456",
      to_address: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
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
