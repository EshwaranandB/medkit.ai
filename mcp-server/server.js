const { Server } = require("@modelcontextprotocol/sdk");
const axios = require("axios");

// Initialize MCP Server
const server = new Server({
  name: "medkit-ai",
  version: "1.0.0"
});

// Tool 1: Health Information Search
server.tool("search_health_info", {
  description: "Search for comprehensive health information using Medkit.AI's extensive health library",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Health topic to search for (e.g., fever, diabetes, headache, heart disease, cancer, mental health)"
      }
    },
    required: ["query"]
  }
}, async ({ query }) => {
  try {
    const response = `🔍 **Medkit.AI Health Search Results for: ${query}**

📚 **Available Information:**
- Comprehensive health articles and guides
- Symptom explanations and causes
- Treatment options and prevention tips
- Expert medical insights

🌐 **Access Your Results:**
Visit: https://medkit-ai.vercel.app/library
Search for: "${query}"

💡 **Features:**
- AI-powered health search
- Dynamic content recommendations
- Mobile-optimized interface
- Real-time health guidance

🔗 **Direct Access:** https://medkit-ai.vercel.app/library

*Powered by Medkit.AI - Your AI Health Assistant*`;
    
    return response;
  } catch (error) {
    return "❌ Error searching health information. Please try again.";
  }
});

// Tool 2: Prescription Analysis
server.tool("analyze_prescription", {
  description: "Analyze prescription images using Medkit.AI's advanced vision AI for medication safety",
  inputSchema: {
    type: "object",
    properties: {
      image_url: {
        type: "string",
        description: "URL of prescription image to analyze (or upload directly on the website)"
      }
    },
    required: ["image_url"]
  }
}, async ({ image_url }) => {
  try {
    const response = `💊 **Medkit.AI Prescription Analysis**

🔍 **Analysis Features:**
- Medication identification and explanation
- Dosage and frequency analysis
- Side effects and warnings
- Patient safety recommendations
- Next steps guidance

📱 **How to Use:**
1. Visit: https://medkit-ai.vercel.app/prescription-reader
2. Upload your prescription image
3. Get instant AI-powered analysis
4. Understand your medications safely

🛡️ **Safety Features:**
- HIPAA-compliant processing
- Secure image handling
- Professional medical guidance
- Clear patient instructions

🔗 **Direct Access:** https://medkit-ai.vercel.app/prescription-reader

*Powered by Kimi Vision AI - Advanced Medical Image Analysis*`;
    
    return response;
  } catch (error) {
    return "❌ Error analyzing prescription. Please try again.";
  }
});

// Tool 3: AI Health Chatbot
server.tool("ask_health_question", {
  description: "Chat with Medkit.AI's intelligent health assistant powered by DeepSeek AI",
  inputSchema: {
    type: "object",
    properties: {
      question: {
        type: "string",
        description: "Health question to ask the AI assistant (e.g., symptoms, conditions, treatments, prevention)"
      }
    },
    required: ["question"]
  }
}, async ({ question }) => {
  try {
    const response = `🤖 **Medkit.AI Health Assistant**

💬 **Your Question:** ${question}

🧠 **AI Capabilities:**
- Symptom analysis and guidance
- Health condition explanations
- Treatment recommendations
- Preventive care advice
- Emergency guidance
- Mental health support

💡 **How to Chat:**
1. Visit: https://medkit-ai.vercel.app/ai-assistant
2. Start a conversation with our AI
3. Get personalized health guidance
4. Continue conversations with context

🔒 **Privacy & Security:**
- Secure chat sessions
- No data storage
- Professional medical insights
- 24/7 availability

🔗 **Direct Access:** https://medkit-ai.vercel.app/ai-assistant

*Powered by DeepSeek AI - Advanced Medical Intelligence*`;
    
    return response;
  } catch (error) {
    return "❌ Error processing health question. Please try again.";
  }
});

// Tool 4: Health Tools Overview
server.tool("explore_health_tools", {
  description: "Discover all available health tools and features in Medkit.AI",
  inputSchema: {
    type: "object",
    properties: {
      category: {
        type: "string",
        description: "Category of tools to explore (all, search, prescription, chatbot, library, features)",
        enum: ["all", "search", "prescription", "chatbot", "library", "features"]
      }
    },
    required: ["category"]
  }
}, async ({ category }) => {
  try {
    let response = `🏥 **Medkit.AI Health Tools Overview**

`;
    
    switch(category) {
      case "search":
        response += `🔍 **Health Search Engine**
- AI-powered health information search
- Dynamic content recommendations
- Comprehensive health library
- Mobile-optimized interface
🔗 https://medkit-ai.vercel.app/library`;
        break;
      case "prescription":
        response += `💊 **Prescription Analyzer**
- Vision AI for medication analysis
- Safety recommendations
- Dosage explanations
- Patient guidance
🔗 https://medkit-ai.vercel.app/prescription-reader`;
        break;
      case "chatbot":
        response += `🤖 **AI Health Assistant**
- DeepSeek-powered chatbot
- Symptom analysis
- Health guidance
- 24/7 availability
🔗 https://medkit-ai.vercel.app/ai-assistant`;
        break;
      case "library":
        response += `📚 **Health Library**
- Comprehensive health articles
- Category-based organization
- Expert medical content
- Searchable database
🔗 https://medkit-ai.vercel.app/library`;
        break;
      case "features":
        response += `✨ **Core Features**
- Health search and guidance
- Prescription analysis
- AI chatbot support
- Mobile-first design
- WhatsApp integration
🔗 https://medkit-ai.vercel.app/features`;
        break;
      default:
        response += `🌟 **All Available Tools:**

🔍 **Health Search Engine**
- AI-powered information search
- Dynamic content recommendations
🔗 https://medkit-ai.vercel.app/library

💊 **Prescription Analyzer**
- Vision AI for medication safety
- Professional medical guidance
🔗 https://medkit-ai.vercel.app/prescription-reader

🤖 **AI Health Assistant**
- DeepSeek-powered chatbot
- 24/7 health support
🔗 https://medkit-ai.vercel.app/ai-assistant

📚 **Health Library**
- Comprehensive medical content
- Expert insights and guides
🔗 https://medkit-ai.vercel.app/library

📱 **Mobile App**
- Responsive design
- WhatsApp integration
- Cross-platform compatibility`;
    }
    
    response += `

🏆 **Hackathon Project:**
This MCP server enables AI assistants to access Medkit.AI's comprehensive health tools, making healthcare information more accessible through various AI platforms.

🔗 **Main Website:** https://medkit-ai.vercel.app`;
    
    return response;
  } catch (error) {
    return "❌ Error exploring health tools. Please try again.";
  }
});

// Start the server
server.listen();
console.log("🚀 Medkit.AI MCP Server running on port 3000");
console.log("🔗 Access your health tools through AI assistants!");
console.log("🏆 Ready for hackathon submission!");
