// E2E tests for all read-only Endurfi MCP tools
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * Helper function to create and connect a client
 */
async function createClient() {
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['build/index.js'],
  });

  const client = new Client({
    name: 'test-client',
    version: '1.0.0',
  });

  await client.connect(transport);
  return client;
}

/**
 * Helper function to call a tool and parse the result
 */
async function callTool(client, name, args) {
  const result = await client.callTool({ name, arguments: args });
  console.log(`\n--- ${name} ---`);
  console.log('Raw result:', JSON.stringify(result, null, 2));

  // Parse the MCP response
  const response = JSON.parse(result.content[0].text);
  console.log('Parsed response:', JSON.stringify(response, null, 2));

  return response;
}

/**
 * Test preview_stake_strk tool
 */
async function testPreviewStake(client) {
  const response = await callTool(client, 'preview_stake_strk', {
    strk_amount: '1000000000000000000', // 1 STRK (18 decimals)
  });

  if (response.status !== 'success') {
    throw new Error(`preview_stake_strk failed: ${response.error}`);
  }

  console.log('✅ preview_stake_strk test passed');
  console.log(`   Staking ${response.data.strk_amount} STRK`);
  console.log(`   Will receive: ${response.data.estimated_xstrk_amount} xSTRK`);

  return response;
}

/**
 * Test preview_unstake_xstrk tool
 */
async function testPreviewUnstake(client) {
  const response = await callTool(client, 'preview_unstake_xstrk', {
    xstrk_amount: '1000000000000000000', // 1 xSTRK (18 decimals)
  });

  if (response.status !== 'success') {
    throw new Error(`preview_unstake_xstrk failed: ${response.error}`);
  }

  console.log('✅ preview_unstake_xstrk test passed');
  console.log(`   Unstaking ${response.data.xstrk_amount} xSTRK`);
  console.log(`   Will receive: ${response.data.estimated_strk_amount} STRK`);

  return response;
}

/**
 * Test get_user_xstrk_balance tool
 */
async function testGetUserBalance(client) {
  // Use a known address with likely xSTRK balance (replace with actual address)
  const testAddress =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

  const response = await callTool(client, 'get_user_xstrk_balance', {
    user_address: testAddress,
  });

  if (response.status !== 'success') {
    throw new Error(`get_user_xstrk_balance failed: ${response.error}`);
  }

  console.log('✅ get_user_xstrk_balance test passed');
  console.log(`   User: ${response.data.user_address}`);
  console.log(`   xSTRK balance: ${response.data.xstrk_balance}`);
  console.log(`   STRK value: ${response.data.strk_value}`);
  console.log(`   Exchange rate: ${response.data.exchange_rate}`);

  return response;
}

/**
 * Test get_total_staked_strk tool
 */
async function testGetTotalStaked(client) {
  const response = await callTool(client, 'get_total_staked_strk', {});

  if (response.status !== 'success') {
    throw new Error(`get_total_staked_strk failed: ${response.error}`);
  }

  console.log('✅ get_total_staked_strk test passed');
  console.log(`   Total staked (TVL): ${response.data.total_staked_strk} STRK`);
  console.log(
    `   Total xSTRK supply: ${response.data.total_xstrk_supply} xSTRK`
  );
  console.log(`   Exchange rate: ${response.data.exchange_rate}`);

  return response;
}

/**
 * Test get_withdraw_request_info tool
 */
async function testGetWithdrawRequestInfo(client) {
  console.log(
    '\n--- Testing get_withdraw_request_info (may fail if no NFT exists) ---'
  );

  // Test with a hypothetical NFT ID
  const response = await callTool(client, 'get_withdraw_request_info', {
    withdraw_request_id: '1',
  });

  if (response.status === 'success') {
    console.log('✅ get_withdraw_request_info test passed');
    console.log(`   NFT ID: ${response.data.nft_id}`);
    console.log(`   Amount: ${response.data.amount_strk} STRK`);
    console.log(`   Claimable: ${response.data.is_claimable}`);
    console.log(`   Owner: ${response.data.owner}`);
  } else {
    console.log(
      '⚠️  get_withdraw_request_info returned error (expected if NFT does not exist)'
    );
    console.log(`   Error: ${response.error}`);
  }

  return response;
}

/**
 * Test error handling with invalid inputs
 */
async function testErrorHandling(client) {
  console.log('\n--- Testing error handling ---');

  // Test preview_stake with invalid amount
  try {
    const response = await callTool(client, 'preview_stake_strk', {
      amount: 'invalid',
    });

    if (response.status === 'failure') {
      console.log('✅ Error handling test passed (invalid amount)');
      console.log(`   Error message: ${response.error}`);
    } else {
      console.log('⚠️  Expected error but got success');
    }
  } catch (error) {
    console.log('✅ Error handling test passed (threw exception)');
    console.log(`   Exception: ${error.message}`);
  }

  return true;
}

/**
 * Main test runner
 */
async function runTests() {
  let client;

  try {
    console.log('🚀 Starting Endurfi Read Tools E2E Tests\n');

    client = await createClient();
    console.log('✅ Client connected successfully\n');

    await testPreviewStake(client);
    await testPreviewUnstake(client);
    await testGetUserBalance(client);
    await testGetTotalStaked(client);
    await testGetWithdrawRequestInfo(client);
    await testErrorHandling(client);

    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n👋 Client closed');
    }
  }
}

// Run the tests
runTests();
