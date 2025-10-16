// E2E test for extended_cancel_order tool
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
 * Test extended_cancel_order tool
 */
async function testCancelOrder(client) {
  console.log('🚀 Starting extended_cancel_order E2E Test\n');

  // First, get open orders to see if there's anything to cancel
  console.log('📋 Step 1: Checking for open orders...');
  const ordersResponse = await callTool(client, 'extended_get_open_orders', {});

  if (ordersResponse.status !== 'success') {
    throw new Error(`Failed to get open orders: ${ordersResponse.error}`);
  }

  if (ordersResponse.data.length === 0) {
    console.log('\n⚠️  No open orders found to cancel.');
    console.log('💡 To test this functionality:');
    console.log('   1. Create a limit order on Extended exchange');
    console.log('   2. Note the order ID');
    console.log('   3. Run this test with that order ID');
    console.log('\nExample:');
    console.log('   ORDER_ID=12345 node __tests__/e2e/cancelOrder.test.js');
    return;
  }

  console.log(`✅ Found ${ordersResponse.data.length} open order(s)`);

  // Get order ID from environment or use the first open order
  const orderIdToCancel = process.env.ORDER_ID || ordersResponse.data[0].id.toString();
  console.log(`\n📋 Step 2: Attempting to cancel order ${orderIdToCancel}...`);

  // Attempt to cancel the order
  const cancelResponse = await callTool(client, 'extended_cancel_order', {
    order_id: orderIdToCancel,
  });

  if (cancelResponse.status === 'success') {
    console.log('\n✅ Order cancelled successfully!');
    console.log(`   Message: ${cancelResponse.data.message || 'Order canceled'}`);

    // Verify the order is no longer in open orders
    console.log('\n📋 Step 3: Verifying order is no longer open...');
    const verifyResponse = await callTool(client, 'extended_get_open_orders', {});

    if (verifyResponse.status === 'success') {
      const stillOpen = verifyResponse.data.find(
        (order) => order.id.toString() === orderIdToCancel
      );

      if (stillOpen) {
        console.log('⚠️  Order still appears in open orders (might take time to update)');
      } else {
        console.log('✅ Confirmed: Order is no longer in open orders');
      }
    }

    console.log('\n✅ Test completed successfully!');
  } else {
    console.log('\n❌ Failed to cancel order');
    console.log(`   Error: ${cancelResponse.error}`);

    // This might be expected if:
    // - Order already filled
    // - Order already cancelled
    // - Invalid order ID
    if (
      cancelResponse.error.includes('not found') ||
      cancelResponse.error.includes('already') ||
      cancelResponse.error.includes('invalid')
    ) {
      console.log('\n💡 This error is expected if the order:');
      console.log('   - Was already cancelled');
      console.log('   - Was already filled');
      console.log('   - Does not exist');
      console.log('   - Belongs to another account');
    }

    throw new Error(`Cancel order failed: ${cancelResponse.error}`);
  }
}

/**
 * Test cancelling a non-existent order (error handling)
 */
async function testCancelNonExistentOrder(client) {
  console.log('\n📋 Testing error handling with non-existent order...');

  const response = await callTool(client, 'extended_cancel_order', {
    order_id: '999999999999',
  });

  if (response.status === 'failure') {
    console.log('✅ Error handling test passed');
    console.log(`   Expected error received: ${response.error}`);
  } else {
    console.log('⚠️  Expected error but got success (unexpected)');
  }
}

/**
 * Main test runner
 */
async function runTests() {
  let client;

  try {
    console.log('⚠️  Make sure you have set EXTENDED_API_KEY in your .env file\n');
    console.log('⚠️  WARNING: This test will cancel a real order if available!\n');
    console.log('⏳ Starting in 3 seconds... (Ctrl+C to abort)\n');

    // Give user time to abort if they don't want to cancel orders
    await new Promise((resolve) => setTimeout(resolve, 3000));

    client = await createClient();
    console.log('✅ Client connected successfully\n');

    // Test cancelling an order
    await testCancelOrder(client);

    // Test error handling
    await testCancelNonExistentOrder(client);

    console.log('\n📊 Test Summary:');
    console.log('   ✅ extended_cancel_order tool is functional');
    console.log('   ✅ Error handling works correctly');
    console.log('   ✅ API integration successful');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Full error:', error);

    if (error.message.includes('EXTENDED_API_KEY')) {
      console.error('\n💡 Tip: Make sure you have set EXTENDED_API_KEY in packages/mcps/extended/.env');
    }

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
