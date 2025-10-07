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
    name: "transfer_position",
    arguments: {
      position_id: 2164575,
      to_address: "0x059a5B246cBf2E4202445A5f1fA74C4A96BAdF0e6bB11067D2fD30Cb5391a8c1" 
    }
  });

  console.log('Raw result:', JSON.stringify(result, null, 2));

} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
