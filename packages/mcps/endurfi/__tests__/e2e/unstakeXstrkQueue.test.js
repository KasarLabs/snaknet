// unstakeQueue.test.js - Test for unstake_queue tool (all token types)
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

// Test data for different token types
const tokenTests = [
  { type: 'STRK', amount: '1', description: '0.05 xSTRK' },
  { type: 'WBTC', amount: '1', description: '0.05 xyWBTC' },
  { type: 'tBTC', amount: '1', description: '0.05 xytBTC' },
  { type: 'LBTC', amount: '1', description: '0.05 xyLBTC' },
];

try {
  await client.connect(transport);

  // Test unstake_queue for each token type
  for (const token of tokenTests) {
    console.log(
      `\n=== Testing unstake for ${token.type} (${token.description}) ===`
    );

    const result = await client.callTool({
      name: 'unstake',
      arguments: {
        token_type: token.type,
        amount: token.amount,
      },
    });

    console.log('Raw result:', JSON.stringify(result, null, 2));
    const response = JSON.parse(result.content[0].text);
    console.log('Parsed response:', JSON.stringify(response, null, 2));

    if (response.status === 'success') {
      console.log(`\n✅ Unstake ${token.type} (queue) transaction successful!`);
      console.log(`   Transaction hash: ${response.data.transaction_hash}`);
      console.log(
        `   Liquid amount: ${response.data.liquid_amount_formatted} ${response.data.liquid_token}`
      );
      console.log(
        `   Withdraw request ID: ${response.data.withdraw_request_id}`
      );
      console.log(
        '\n   ⏳ Wait 1-2 days before claiming with claim_unstake_request'
      );
    } else {
      console.log(`\n❌ Unstake ${token.type} transaction failed`);
      console.log(`   Error: ${response.error}`);
    }
  }

  console.log('\n✅ All unstake_queue tests completed!');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
