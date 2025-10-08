// stakeStrk.test.js - Test for stake_strk tool
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
    name: 'stake_strk',
    arguments: {
      amount: '150000000000', // 1 STRK (18 decimals)
    },
  });

  console.log('Raw result:', JSON.stringify(result, null, 2));
  const response = JSON.parse(result.content[0].text);
  console.log('Parsed response:', JSON.stringify(response, null, 2));

  if (response.status === 'success') {
    console.log('\n✅ Stake STRK transaction successful!');
    console.log(`   Transaction hash: ${response.data.transaction_hash}`);
  } else {
    console.log('\n❌ Stake STRK transaction failed');
    console.log(`   Error: ${response.error}`);
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
