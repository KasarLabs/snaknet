// claimUnstakeRequest.test.js - Test for claim_unstake_request tool (all token types)
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
  { type: 'STRK', requestId: '1', description: 'STRK withdraw request' },
  { type: 'WBTC', requestId: '1', description: 'WBTC withdraw request' },
  { type: 'tBTC', requestId: '1', description: 'tBTC withdraw request' },
  { type: 'LBTC', requestId: '1', description: 'LBTC withdraw request' },
];

try {
  await client.connect(transport);

  // Test claim_unstake_request for each token type
  for (const token of tokenTests) {
    console.log(`\n=== Testing claim_unstake_request for ${token.type} (${token.description}) ===`);

    const result = await client.callTool({
      name: 'claim_unstake_request',
      arguments: {
        token_type: token.type,
        withdraw_request_id: token.requestId,
      },
    });

    console.log('Raw result:', JSON.stringify(result, null, 2));
    const response = JSON.parse(result.content[0].text);
    console.log('Parsed response:', JSON.stringify(response, null, 2));

    if (response.status === 'success') {
      console.log(`\n✅ Claim unstake request for ${token.type} successful!`);
      console.log(`   Transaction hash: ${response.data.transaction_hash}`);
      console.log(`   Withdraw request ID: ${response.data.withdraw_request_id}`);
      console.log(`   Amount claimed: ${response.data.amount_claimed_formatted} ${response.data.underlying_token}`);
    } else {
      console.log(`\n⚠️  Claim unstake request for ${token.type} failed (may not be claimable yet)`);
      console.log(`   Error: ${response.error}`);
    }
  }

  console.log('\n✅ All claim_unstake_request tests completed!');
  console.log('\n   ℹ️  Note: Some tests may fail if:');
  console.log('   1. The NFT does not exist for this token type');
  console.log('   2. The request is not claimable yet (wait 1-2 days after unstaking)');
  console.log('   3. Replace withdraw_request_id with actual IDs from unstake_queue calls');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
