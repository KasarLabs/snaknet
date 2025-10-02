// fullFlow.test.js - Test complet du flux Ekubo: create position -> add liquidity -> withdraw liquidity
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

  console.log('\n=== STEP 1: Create Position (ETH/STRK) ===');
  const createResult = await client.callTool({
    name: "ekubo_create_position",
    arguments: {
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "STRK"
      },
      amount0: "100000000000000", // 0.0001 ETH (0.1 wei = 10^14 wei)
      amount1: "100000000000000000", // 0.1 STRK (10^17 wei)
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0"
    }
  });

  console.log('Create Position - Raw result:', JSON.stringify(createResult, null, 2));
  const createResponse = JSON.parse(createResult.content[0].text);
  console.log('Create Position - Parsed response:', JSON.stringify(createResponse, null, 2));

  if (createResponse.status !== 'success') {
    throw new Error('Create position failed: ' + createResponse.error);
  }

  console.log('\n=== STEP 2: Add Liquidity (ETH/STRK) ===');
  const addResult = await client.callTool({
    name: "ekubo_add_liquidity",
    arguments: {
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "STRK"
      },
      amount0: "100000000000000", // 0.0001 ETH
      amount1: "100000000000000000", // 0.1 STRK
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0"
    }
  });

  console.log('Add Liquidity - Raw result:', JSON.stringify(addResult, null, 2));
  const addResponse = JSON.parse(addResult.content[0].text);
  console.log('Add Liquidity - Parsed response:', JSON.stringify(addResponse, null, 2));

  if (addResponse.status !== 'success') {
    throw new Error('Add liquidity failed: ' + addResponse.error);
  }

  console.log('\n=== STEP 3: Withdraw Liquidity (fees only) ===');
  // Note: position_id should be retrieved from a query or known beforehand
  // Using a placeholder here - you may need to query your positions first
  const withdrawResult = await client.callTool({
    name: "ekubo_withdraw_liquidity",
    arguments: {
      position_id: "1", // Vous devrez remplacer par l'ID réel de votre position
      token0: {
        "assetType": "SYMBOL",
        "assetValue": "ETH"
      },
      token1: {
        "assetType": "SYMBOL",
        "assetValue": "STRK"
      },
      liquidity_amount: "0",
      lower_tick: -1000,
      upper_tick: 1000,
      fee: 0.05,
      tick_spacing: 0.1,
      extension: "0x0",
      fees_only: true, // Retirer seulement les frais, pas la liquidité
      collect_fees: true
    }
  });

  console.log('Withdraw Liquidity - Raw result:', JSON.stringify(withdrawResult, null, 2));
  const withdrawResponse = JSON.parse(withdrawResult.content[0].text);
  console.log('Withdraw Liquidity - Parsed response:', JSON.stringify(withdrawResponse, null, 2));

  if (withdrawResponse.status !== 'success') {
    throw new Error('Withdraw liquidity failed: ' + withdrawResponse.error);
  }

  console.log('\n=== FULL FLOW COMPLETED SUCCESSFULLY ===');
  console.log('Summary:');
  console.log('- Create Position TX:', createResponse.data.transaction_hash);
  console.log('- Add Liquidity TX:', addResponse.data.transaction_hash);
  console.log('- Withdraw Liquidity TX:', withdrawResponse.data.transaction_hash);

} catch (error) {
  console.error('\n=== ERROR ===');
  console.error('Error:', error.message);
  console.error('Full error:', error);
} finally {
  await client.close();
}
