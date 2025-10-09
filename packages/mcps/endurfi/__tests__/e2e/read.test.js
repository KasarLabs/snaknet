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
 * Test preview_stake tool for all token types
 */
async function testPreviewStake(client) {
  const tokenTests = [
    { type: 'STRK', amount: '1000000000000000000', decimals: 18 }, // 1 STRK
    { type: 'WBTC', amount: '100000000', decimals: 8 }, // 1 WBTC
    { type: 'tBTC', amount: '1000000000000000000', decimals: 18 }, // 1 tBTC
    { type: 'LBTC', amount: '100000000', decimals: 8 }, // 1 LBTC
  ];

  for (const token of tokenTests) {
    const response = await callTool(client, 'preview_stake', {
      token_type: token.type,
      amount: token.amount,
    });

    if (response.status !== 'success') {
      throw new Error(
        `preview_stake failed for ${token.type}: ${response.error}`
      );
    }

    console.log(`✅ preview_stake test passed for ${token.type}`);
    console.log(
      `   Staking ${response.data.amount_formatted} ${response.data.underlying_token}`
    );
    console.log(
      `   Will receive: ${response.data.estimated_liquid_amount_formatted} ${response.data.liquid_token}`
    );
  }

  return true;
}

/**
 * Test preview_unstake tool for all token types
 */
async function testPreviewUnstake(client) {
  const tokenTests = [
    { type: 'STRK', amount: '1000000000000000000', decimals: 18 }, // 1 xSTRK
    { type: 'WBTC', amount: '100000000', decimals: 8 }, // 1 xyWBTC
    { type: 'tBTC', amount: '1000000000000000000', decimals: 18 }, // 1 xytBTC
    { type: 'LBTC', amount: '100000000', decimals: 8 }, // 1 xyLBTC
  ];

  for (const token of tokenTests) {
    const response = await callTool(client, 'preview_unstake', {
      token_type: token.type,
      amount: token.amount,
    });

    if (response.status !== 'success') {
      throw new Error(
        `preview_unstake failed for ${token.type}: ${response.error}`
      );
    }

    console.log(`✅ preview_unstake test passed for ${token.type}`);
    console.log(
      `   Unstaking ${response.data.liquid_amount_formatted} ${response.data.liquid_token}`
    );
    console.log(
      `   Will receive: ${response.data.estimated_underlying_amount_formatted} ${response.data.underlying_token}`
    );
  }

  return true;
}

/**
 * Test get_user_balance tool for all token types
 */
async function testGetUserBalance(client) {
  // Use a known address with likely balance (replace with actual address)
  const testAddress =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

  const tokenTypes = ['STRK', 'WBTC', 'tBTC', 'LBTC'];

  for (const tokenType of tokenTypes) {
    const response = await callTool(client, 'get_user_balance', {
      token_type: tokenType,
      user_address: testAddress,
    });

    if (response.status !== 'success') {
      throw new Error(
        `get_user_balance failed for ${tokenType}: ${response.error}`
      );
    }

    console.log(`✅ get_user_balance test passed for ${tokenType}`);
    console.log(`   User: ${response.data.user_address}`);
    console.log(
      `   ${response.data.liquid_token} balance: ${response.data.liquid_balance_formatted}`
    );
    console.log(
      `   ${response.data.underlying_token} value: ${response.data.underlying_value_formatted}`
    );
    console.log(`   Exchange rate: ${response.data.exchange_rate}`);
  }

  return true;
}

/**
 * Test get_total_staked tool for all token types
 */
async function testGetTotalStaked(client) {
  const tokenTypes = ['STRK', 'WBTC', 'tBTC', 'LBTC'];

  for (const tokenType of tokenTypes) {
    const response = await callTool(client, 'get_total_staked', {
      token_type: tokenType,
    });

    if (response.status !== 'success') {
      throw new Error(
        `get_total_staked failed for ${tokenType}: ${response.error}`
      );
    }

    console.log(`✅ get_total_staked test passed for ${tokenType}`);
    console.log(
      `   Total staked (TVL): ${response.data.total_staked_formatted} ${response.data.underlying_token}`
    );
    console.log(`   Liquid token: ${response.data.liquid_token}`);
    console.log(`   Description: ${response.data.description}`);
  }

  return true;
}

/**
 * Test get_withdraw_request_info tool for all token types
 */
async function testGetWithdrawRequestInfo(client) {
  console.log(
    '\n--- Testing get_withdraw_request_info (may fail if no NFT exists) ---'
  );

  const tokenTypes = ['STRK', 'WBTC', 'tBTC', 'LBTC'];

  for (const tokenType of tokenTypes) {
    // Test with a hypothetical NFT ID
    const response = await callTool(client, 'get_withdraw_request_info', {
      token_type: tokenType,
      withdraw_request_id: '1',
    });

    if (response.status === 'success') {
      console.log(`✅ get_withdraw_request_info test passed for ${tokenType}`);
      console.log(`   NFT ID: ${response.data.nft_id}`);
      console.log(
        `   Amount: ${response.data.amount_formatted} ${response.data.underlying_token}`
      );
      console.log(`   Claimable: ${response.data.is_claimable}`);
      console.log(`   Owner: ${response.data.owner}`);
    } else {
      console.log(
        `⚠️  get_withdraw_request_info returned error for ${tokenType} (expected if NFT does not exist)`
      );
      console.log(`   Error: ${response.error}`);
    }
  }

  return true;
}

/**
 * Test error handling with invalid inputs
 */
async function testErrorHandling(client) {
  console.log('\n--- Testing error handling ---');

  // Test preview_stake with invalid amount
  try {
    const response = await callTool(client, 'preview_stake', {
      token_type: 'STRK',
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

  // Test with invalid token type
  try {
    const response = await callTool(client, 'preview_stake', {
      token_type: 'INVALID_TOKEN',
      amount: '1000000000000000000',
    });

    if (response.status === 'failure') {
      console.log('✅ Error handling test passed (invalid token type)');
      console.log(`   Error message: ${response.error}`);
    } else {
      console.log('⚠️  Expected error but got success');
    }
  } catch (error) {
    console.log(
      '✅ Error handling test passed (threw exception for invalid token)'
    );
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
