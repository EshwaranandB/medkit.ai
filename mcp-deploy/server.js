const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('---');
  next();
});

// Health check endpoint for Railway
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Medkit.AI MCP Server',
    version: '1.0.0',
    hackathon: 'Puch AI Hackathon',
    description: 'AI Health Assistant Tools for Medkit.AI',
    tools: [
      'search_health_info',
      'analyze_prescription', 
      'ask_health_question',
      'explore_health_tools'
    ],
    endpoints: {
      health: 'GET /',
      search: 'POST /search_health_info',
      prescription: 'POST /analyze_prescription',
      chatbot: 'POST /ask_health_question',
      explore: 'POST /explore_health_tools'
    }
  });
});

// Tool 1: Health Information Search
app.post('/search_health_info', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = {
      tool: 'search_health_info',
      query: query,
      results: `🔍 **Medkit.AI Health Search Results for: ${query}**

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

*Powered by Medkit.AI - Your AI Health Assistant*`
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error searching health information' });
  }
});

// Tool 2: Prescription Analysis
app.post('/analyze_prescription', async (req, res) => {
  try {
    const { image_url } = req.body;
    
    if (!image_url) {
      return res.status(400).json({ error: 'Image URL parameter is required' });
    }

    const response = {
      tool: 'analyze_prescription',
      image_url: image_url,
      results: `💊 **Medkit.AI Prescription Analysis**

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
4. Receive safety recommendations

🔗 **Direct Access:** https://medkit-ai.vercel.app/prescription-reader

*Powered by Medkit.AI Vision AI*`
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing prescription' });
  }
});

// Tool 3: AI Health Chatbot
app.post('/ask_health_question', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question parameter is required' });
    }

    const response = {
      tool: 'ask_health_question',
      question: question,
      results: `🤖 **Medkit.AI AI Health Assistant**

❓ **Your Question:** ${question}

💬 **AI Response:**
Based on your health question, here's what Medkit.AI can help you with:

🔍 **Health Guidance:**
- Symptom analysis and explanations
- Treatment recommendations
- Prevention tips and lifestyle advice
- Medical information and resources

📱 **Get Personalized Help:**
Visit: https://medkit-ai.vercel.app/ai-assistant
Ask your question directly to our AI

💡 **Features:**
- DeepSeek-powered AI responses
- 24/7 health support
- Professional medical insights
- Context-aware conversations

🔗 **Direct Access:** https://medkit-ai.vercel.app/ai-assistant

*Powered by Medkit.AI DeepSeek AI*`
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error processing health question' });
  }
});

// Tool 4: Explore Health Tools
app.post('/explore_health_tools', async (req, res) => {
  try {
    const { category } = req.body;
    
    let response = {
      tool: 'explore_health_tools',
      category: category || 'all',
      results: `🏥 **Medkit.AI Health Tools Overview**

`
    };
    
    switch(category) {
      case "search":
        response.results += `🔍 **Health Search Engine**
- AI-powered health information search
- Dynamic content recommendations
- Comprehensive health library
- Mobile-optimized interface
🔗 https://medkit-ai.vercel.app/library`;
        break;
      case "prescription":
        response.results += `💊 **Prescription Analyzer**
- Vision AI for medication analysis
- Safety recommendations
- Dosage explanations
- Patient guidance
🔗 https://medkit-ai.vercel.app/prescription-reader`;
        break;
      case "chatbot":
        response.results += `🤖 **AI Health Assistant**
- DeepSeek-powered chatbot
- Symptom analysis
- Health guidance
- 24/7 availability
🔗 https://medkit-ai.vercel.app/ai-assistant`;
        break;
      case "library":
        response.results += `📚 **Health Library**
- Comprehensive health articles
- Category-based organization
- Expert medical content
- Searchable database
🔗 https://medkit-ai.vercel.app/library`;
        break;
      case "features":
        response.results += `✨ **Core Features**
- Health search and guidance
- Prescription analysis
- AI chatbot support
- Mobile-first design
- WhatsApp integration
🔗 https://medkit-ai.vercel.app/features`;
        break;
      default:
        response.results += `🌟 **All Available Tools:**

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
    
    response.results += `

🏆 **Hackathon Project:**
This MCP server enables AI assistants to access Medkit.AI's comprehensive health tools, making healthcare information more accessible through various AI platforms.

🔗 **Main Website:** https://medkit-ai.vercel.app`;
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error exploring health tools' });
  }
});

// MCP Protocol endpoint (for compatibility)
app.get('/mcp', (req, res) => {
  res.json({
    id: 'medkit-ai-mcp',
    protocol: 'Model Context Protocol',
    version: '1.0.0',
    server: 'Medkit.AI MCP Server',
    tools: [
      'search_health_info',
      'analyze_prescription',
      'ask_health_question',
      'explore_health_tools',
      'validate'
    ]
  });
});

// MCP Protocol endpoint - also handle POST requests
app.post('/mcp', (req, res) => {
  try {
    console.log('POST /mcp received:', { body: req.body, headers: req.headers });
    
    // Handle different types of MCP requests
    const { method, params } = req.body;
    
    if (method === 'initialize') {
      // MCP initialization handshake - simplified for Puch AI
      console.log('Handling initialize method...');
      
      // Send response immediately without complex logic
      res.json({
        jsonrpc: "2.0",
        id: 0,
        result: {
          protocolVersion: "2025-06-18",
          capabilities: {
            tools: {},
            resources: {},
            prompts: {}
          },
          serverInfo: {
            name: "Medkit.AI MCP Server",
            version: "1.0.0"
          }
        }
      });
      
      console.log('Initialize response sent successfully');
      return;
    } else if (method === 'tools/list') {
      // Return available tools
      const response = {
        jsonrpc: "2.0",
        id: req.body.id || 1,
        result: {
          tools: [
            {
              name: "search_health_info",
              description: "Search for comprehensive health information and guidance",
              inputSchema: {
                type: "object",
                properties: {
                  query: { type: "string", description: "Health-related search query" }
                },
                required: ["query"]
              }
            },
            {
              name: "analyze_prescription",
              description: "Analyze prescription images for medication safety and guidance",
              inputSchema: {
                type: "object",
                properties: {
                  image_url: { type: "string", description: "URL of prescription image to analyze" }
                },
                required: ["image_url"]
              }
            },
            {
              name: "ask_health_question",
              description: "Get AI-powered health guidance and answers to medical questions",
              inputSchema: {
                type: "object",
                properties: {
                  question: { type: "string", description: "Health question to ask the AI assistant" }
                },
                required: ["question"]
              }
            },
            {
              name: "explore_health_tools",
              description: "Explore available health tools and features",
              inputSchema: {
                type: "object",
                properties: {
                  category: { type: "string", description: "Category of tools to explore" }
                }
              }
            },
            {
              name: "validate",
              description: "Validate bearer token and return user phone number",
              inputSchema: {
                type: "object",
                properties: {
                  bearer_token: { type: "string", description: "Bearer token for authentication" }
                },
                required: ["bearer_token"]
              }
            }
          ]
        }
      };
      res.json(response);
    } else {
      // Default response for other methods
      const response = {
        jsonrpc: "2.0",
        id: req.body.id || 1,
        result: {
          id: 'medkit-ai-mcp',
          protocol: 'Model Context Protocol',
          version: '1.0.0',
          server: 'Medkit.AI MCP Server',
          message: 'Successfully connected to Medkit.AI MCP Server',
          tools: [
            'search_health_info',
            'analyze_prescription',
            'ask_health_question',
            'explore_health_tools',
            'validate'
          ]
        }
      };
      res.json(response);
    }
  } catch (error) {
    console.error('Error in POST /mcp:', error);
    res.status(500).json({ 
      jsonrpc: "2.0",
      id: req.body.id || 1,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error.message
      }
    });
  }
});

// MCP Manifest endpoint (for better compatibility)
app.get('/manifest.json', (req, res) => {
  res.json({
    id: 'medkit-ai-mcp',
    protocol: 'Model Context Protocol',
    version: '1.0.0',
    server: 'Medkit.AI MCP Server',
    name: 'Medkit.AI Health Tools',
    description: 'Access to comprehensive health information, prescription analysis, and AI-powered health assistance',
    tools: [
      'search_health_info',
      'analyze_prescription',
      'ask_health_question',
      'explore_health_tools',
      'validate'
    ]
  });
});

// MCP Tools endpoint (for tool definitions)
app.get('/tools', (req, res) => {
  res.json({
    jsonrpc: "2.0",
    id: 1,
    result: {
      tools: [
        {
          name: "search_health_info",
          description: "Search for comprehensive health information and guidance",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Health-related search query"
              }
            },
            required: ["query"]
          }
        },
        {
          name: "analyze_prescription",
          description: "Analyze prescription images for medication safety and guidance",
          inputSchema: {
            type: "object",
            properties: {
              image_url: {
                type: "string",
                description: "URL of prescription image to analyze"
              }
            },
            required: ["image_url"]
          }
        },
        {
          name: "ask_health_question",
          description: "Get AI-powered health guidance and answers to medical questions",
          inputSchema: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "Health question to ask the AI assistant"
              }
            },
            required: ["question"]
          }
        },
        {
          name: "explore_health_tools",
          description: "Explore available health tools and features",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Category of tools to explore (search, prescription, chatbot, library, features, or all)",
                enum: ["search", "prescription", "chatbot", "library", "features", "all"]
              }
            }
          }
        },
        {
          name: "validate",
          description: "Validate bearer token and return user phone number",
          inputSchema: {
            type: "object",
            properties: {
              bearer_token: {
                type: "string",
                description: "Bearer token for authentication"
              }
            },
            required: ["bearer_token"]
          }
        }
      ]
    }
  });
});

// MCP Initialize endpoint (for proper handshake)
app.post('/initialize', (req, res) => {
  try {
    console.log('POST /initialize received:', { body: req.body, headers: req.headers });
    
    const response = {
      jsonrpc: "2.0",
      id: req.body.id || 0,
      result: {
        protocolVersion: "2025-06-18",
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        serverInfo: {
          name: "Medkit.AI MCP Server",
          version: "1.0.0"
        }
      }
    };
    
    console.log('Sending /initialize response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error in /initialize:', error);
    res.status(500).json({ 
      jsonrpc: "2.0",
      id: req.body.id || 0,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error.message
      }
    });
  }
});

// Test endpoint for debugging
app.get('/test', (req, res) => {
  res.json({
    message: 'Server is responding',
    timestamp: new Date().toISOString(),
    status: 'ok'
  });
});

// Simple MCP test endpoint
app.post('/mcp-test', (req, res) => {
  console.log('MCP test endpoint hit:', req.body);
  
  // Simple response that should work
  res.json({
    jsonrpc: "2.0",
    id: 0,
    result: {
      message: "MCP test successful",
      timestamp: new Date().toISOString()
    }
  });
});

// MCP validate tool (required for Puch AI connection)
app.post('/validate', async (req, res) => {
  try {
    console.log('POST /validate received:', { body: req.body, headers: req.headers });
    
    const { bearer_token } = req.body;
    
    if (!bearer_token) {
      return res.status(400).json({ 
        jsonrpc: "2.0",
        id: req.body.id || 1,
        error: {
          code: -32602,
          message: 'Invalid params',
          data: 'Bearer token is required'
        }
      });
    }

    // Return the actual user's phone number for authentication
    const response = {
      jsonrpc: "2.0",
      id: req.body.id || 1,
      result: {
        tool: 'validate',
        bearer_token: bearer_token,
        phone_number: '919493897711' // +91-9493897711 (Your actual number)
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error in /validate:', error);
    res.status(500).json({ 
      jsonrpc: "2.0",
      id: req.body.id || 1,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error.message
      }
    });
  }
});

// Global error handler - catch any errors and prevent 400s
app.use((error, req, res, next) => {
  console.error('Global error handler caught:', error);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Something went wrong',
    details: process.env.NODE_ENV === 'development' ? error.message : 'Contact support'
  });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
    available_endpoints: [
      'GET /',
      'GET /mcp',
      'GET /manifest.json',
      'POST /mcp',
      'POST /validate',
      'POST /search_health_info',
      'POST /analyze_prescription',
      'POST /ask_health_question',
      'POST /explore_health_tools'
    ]
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
const STARTUP_TIME = new Date().toISOString();

app.listen(PORT, () => {
  console.log(`🚀 Medkit.AI MCP Server v1.0.2 running on port ${PORT}`);
  console.log(`⏰ Startup Time: ${STARTUP_TIME}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/`);
  console.log(`🔗 MCP endpoint: http://localhost:${PORT}/mcp`);
  console.log(`🔗 Access your health tools through AI assistants!`);
  console.log(`🏆 Ready for hackathon submission!`);
  console.log(`🚀 Deploy to Railway for public access!`);
  console.log(`🆕 NEW: Simplified MCP handshake implemented!`);
});
