// stake.test.js - Test for stake tool (all token types)
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
  { type: 'STRK', amount: '150000000', description: '0.15 STRK' },
  { type: 'WBTC', amount: '10', description: '0.15 WBTC' },
  { type: 'tBTC', amount: '10', description: '0.15 tBTC' },
  { type: 'LBTC', amount: '10', description: '0.15 LBTC' },
];

try {
  await client.connect(transport);

  // Test stake for each token type
  for (const token of tokenTests) {
    console.log(
      `\n=== Testing stake for ${token.type} (${token.description}) ===`
    );

    const result = await client.callTool({
      name: 'stake',
      arguments: {
        token_type: token.type,
        amount: token.amount,
      },
    });

    console.log('Raw result:', JSON.stringify(result, null, 2));
    const response = JSON.parse(result.content[0].text);
    console.log('Parsed response:', JSON.stringify(response, null, 2));

    if (response.status === 'success') {
      console.log(`\n✅ Stake ${token.type} transaction successful!`);
      console.log(`   Transaction hash: ${response.data.transaction_hash}`);
      console.log(
        `   Amount: ${response.data.amount_formatted} ${response.data.underlying_token}`
      );
      console.log(`   Liquid token received: ${response.data.liquid_token}`);
    } else {
      console.log(`\n❌ Stake ${token.type} transaction failed`);
      console.log(`   Error: ${response.error}`);
    }
  }

  console.log('\n✅ All stake tests completed!');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
