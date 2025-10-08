// unstakeXstrkQueue.test.js - Test for unstake_xstrk_queue tool
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
    name: 'unstake_xstrk_queue',
    arguments: {
      xstrk_amount: '5000', // 0.5 xSTRK (18 decimals)
    },
  });

  console.log('Raw result:', JSON.stringify(result, null, 2));
  const response = JSON.parse(result.content[0].text);
  console.log('Parsed response:', JSON.stringify(response, null, 2));

  if (response.status === 'success') {
    console.log('\n✅ Unstake xSTRK (queue) transaction successful!');
    console.log(`   Transaction hash: ${response.data.transaction_hash}`);
    console.log(
      '\n   ⏳ Wait 1-2 days before claiming with claim_unstake_request'
    );
  } else {
    console.log('\n❌ Unstake xSTRK transaction failed');
    console.log(`   Error: ${response.error}`);
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
