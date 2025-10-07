// E2E tests for all read-only Ekubo MCP tools
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

  // The MCP response is double-encoded JSON, so we need to parse twice
  const firstParse = JSON.parse(result.content[0].text);
  const response = typeof firstParse === 'string' ? JSON.parse(firstParse) : firstParse;
  console.log('Parsed response:', JSON.stringify(response, null, 2));

  return response;
}

/**
 * Test get_token_price tool
 */
async function testGetTokenPrice(client) {
  const response = await callTool(client, 'get_token_price', {
    token: {
      assetType: 'SYMBOL',
      assetValue: 'ETH',
    },
    quote_currency: {
      assetType: 'SYMBOL',
      assetValue: 'USDC',
    },
    fee: 0.05,
    tick_spacing: 0.1,
    extension: '0x0',
  });

  if (response.status !== 'success') {
    throw new Error(`get_token_price failed: ${response.error}`);
  }

  console.log('✅ get_token_price test passed');
  console.log(`   Price: ${response.data.base_token}/${response.data.quote_token} = ${response.data.price}`);

  return response;
}

/**
 * Test get_pool_info tool
 */
async function testGetPoolInfo(client) {
  const response = await callTool(client, 'get_pool_info', {
    token0: {
      assetType: 'SYMBOL',
      assetValue: 'ETH',
    },
    token1: {
      assetType: 'SYMBOL',
      assetValue: 'USDC',
    },
    fee: 0.05,
    tick_spacing: 0.1,
    extension: '0x0',
  });

  if (response.status !== 'success') {
    throw new Error(`get_pool_info failed: ${response.error}`);
  }

  console.log('✅ get_pool_info test passed');
  console.log(`   Pool: ${response.data.token0}/${response.data.token1}`);
  console.log(`   Price: ${response.data.price}`);
  console.log(`   Liquidity: ${response.data.liquidity}`);
  console.log(`   Current tick: ${response.data.current_tick}`);

  return response;
}

/**
 * Test get_pool_liquidity tool
 */
async function testGetPoolLiquidity(client) {
  const response = await callTool(client, 'get_pool_liquidity', {
    token0: {
      assetType: 'SYMBOL',
      assetValue: 'STRK',
    },
    token1: {
      assetType: 'SYMBOL',
      assetValue: 'USDC',
    },
    fee: 0.05,
    tick_spacing: 0.1,
    extension: '0x0',
  });

  if (response.status !== 'success') {
    throw new Error(`get_pool_liquidity failed: ${response.error}`);
  }

  console.log('✅ get_pool_liquidity test passed');
  console.log(`   Liquidity: ${response.data.liquidity}`);

  return response;
}

/**
 * Test get_pool_fees_per_liquidity tool
 */
async function testGetPoolFeesPerLiquidity(client) {
  const response = await callTool(client, 'get_pool_fees_per_liquidity', {
    token0: {
      assetType: 'SYMBOL',
      assetValue: 'ETH',
    },
    token1: {
      assetType: 'SYMBOL',
      assetValue: 'USDC',
    },
    fee: 0.05,
    tick_spacing: 0.1,
    extension: '0x0',
  });

  if (response.status !== 'success') {
    throw new Error(`get_pool_fees_per_liquidity failed: ${response.error}`);
  }

  console.log('✅ get_pool_fees_per_liquidity test passed');
  console.log(`   Fee growth (token0): ${response.data.fee_growth_global_0}`);
  console.log(`   Fee growth (token1): ${response.data.fee_growth_global_1}`);

  return response;
}

/**
 * Test with different token formats (ADDRESS vs SYMBOL)
 */
async function testDifferentTokenFormats(client) {
  console.log('\n--- Testing different token formats ---');

  // Test with ADDRESS format
  const response = await callTool(client, 'get_token_price', {
    token: {
      assetType: 'ADDRESS',
      assetValue: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH
    },
    quote_currency: {
      assetType: 'ADDRESS',
      assetValue: '0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8', // USDC
    },
    fee: 0.05,
    tick_spacing: 0.1,
    extension: '0x0',
  });

  if (response.status !== 'success') {
    throw new Error(`get_token_price with ADDRESS failed: ${response.error}`);
  }

  console.log('✅ Token format (ADDRESS) test passed');

  return response;
}

/**
 * Test error handling with invalid pool parameters
 */
async function testErrorHandling(client) {
  console.log('\n--- Testing error handling ---');

  const response = await callTool(client, 'get_token_price', {
    token: {
      assetType: 'SYMBOL',
      assetValue: 'ETH',
    },
    quote_currency: {
      assetType: 'SYMBOL',
      assetValue: 'USDC',
    },
    fee: 999, // Invalid fee tier
    tick_spacing: 999, // Invalid tick spacing
    extension: '0x0',
  });

  if (response.status === 'success') {
    console.log('⚠️  Expected error but got success (pool might exist with these params)');
  } else {
    console.log('✅ Error handling test passed');
    console.log(`   Error message: ${response.error}`);
  }

  return response;
}

/**
 * Main test runner
 */
async function runTests() {
  let client;

  try {
    console.log('🚀 Starting Ekubo Read Tools E2E Tests\n');

    client = await createClient();
    console.log('✅ Client connected successfully\n');

    // Run all tests
    await testGetTokenPrice(client);
    await testGetPoolInfo(client);
    await testGetPoolLiquidity(client);
    await testGetPoolFeesPerLiquidity(client);
    await testDifferentTokenFormats(client);
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
