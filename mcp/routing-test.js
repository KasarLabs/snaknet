import 'dotenv/config';
import { selectorAgent } from './build/graph/agents/selector.js';
import { HumanMessage } from '@langchain/core/messages';

// Simple routing test cases
const testCases = [
  {
    name: "Argent Account Creation",
    query: "I want to create a new Argent account",
    expectedAgent: "argent"
  },
  {
    name: "ERC20 Transfer", 
    query: "Transfer 100 USDC to another address",
    expectedAgent: "erc20"
  },
  {
    name: "ERC20 Balance Check",
    query: "What's my ETH balance?",
    expectedAgent: "erc20"
  },
  {
    name: "Invalid Query - Weather",
    query: "What's the weather today?",
    expectedAgent: "__end__"
  },
  {
    name: "Invalid Query - Empty",
    query: "",
    expectedAgent: "__end__"
  },
  {
    name: "Ambiguous Query",
    query: "Help me with blockchain",
    expectedAgent: "__end__" // Should end if unclear
  }
];

async function testRouting() {
  console.log("🧪 Testing MCP Routing Logic\n");
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      console.log(`Query: "${testCase.query}"`);
      
      // Create test state
      const state = {
        messages: [new HumanMessage(testCase.query)],
        next: ""
      };
      
      // Test selector agent
      const result = await selectorAgent(state);
      const selectedAgent = result.next;
      
      console.log(`Expected: ${testCase.expectedAgent}`);
      console.log(`Got: ${selectedAgent}`);
      
      if (selectedAgent === testCase.expectedAgent) {
        console.log("✅ PASS\n");
        passed++;
      } else {
        console.log("❌ FAIL\n");
        failed++;
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}\n`);
      failed++;
    }
  }
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log("\n🚨 Routing errors detected!");
    process.exit(1);
  } else {
    console.log("\n✨ All routing tests passed!");
  }
}

// Run the test
testRouting().catch(error => {
  console.error("Test runner error:", error);
  process.exit(1);
});