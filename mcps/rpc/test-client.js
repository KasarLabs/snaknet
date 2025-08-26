import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function testRpc() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["build/index.js"],
    env: {
      STARKNET_RPC_URL: "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/twNPk5lDPh5t6m0WV6eoXdAD2VfIN0-b"
    }
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0"
  });

  try {
    console.log("🔌 Tentative de connexion...");
    await client.connect(transport);
    console.log("✅ Connecté au serveur MCP");
  
    // Lister tous les outils disponibles
    const tools = await client.listTools();
    console.log("🔧 Tools disponibles:", tools);
  
    // Tester un outil simple (sans paramètres)
    const result = await client.callTool({
      name: "get_block_number", 
      arguments: {}
    });
    console.log(" Résultat get_block_number:", result);
  
    // Tester un outil avec paramètres (exemple)
    const chainResult = await client.callTool({
      name: "get_chain_id",
      arguments: {}
    });
    console.log(" Résultat get_chain_id:", chainResult);
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await client.close();
  }
}

testRpc();