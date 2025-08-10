# 🏥 Medkit.AI - Your AI Health Assistant

<div align="center">

![Medkit.AI Logo](public/logomedkit.png)

**Making Healthcare Accessible Through AI Innovation**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🏥%20Medkit.AI-brightgreen?style=for-the-badge)](https://medkit-ai.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/EshwaranandB/medkit-web)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+1%20(415)%20523--8886-green?style=for-the-badge&logo=whatsapp)](https://wa.me/14155238886?text=join%20three-fort)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Built with ❤️ for the Puch AI Hackathon*

</div>

---

## 🌟 **Project Overview**

**Medkit.AI** is a comprehensive AI-powered health assistant that revolutionizes how people access medical information and guidance. Built with cutting-edge AI models and modern web technologies, it provides instant health insights, prescription analysis, and personalized medical guidance 24/7.

### **🎯 Mission**
To democratize healthcare information by making professional medical guidance accessible to everyone through AI innovation.

### **🚀 Vision**
A world where quality healthcare information is just a click away, powered by intelligent AI systems that understand and assist with health concerns.

---

## ✨ **Key Features**

### 🔍 **AI-Powered Health Search**
- **Intelligent Search Engine** with relevance scoring
- **Dynamic Content Recommendations** based on user queries
- **Comprehensive Health Library** with categorized information
- **Real-time Search Results** with instant feedback

### 💊 **Prescription Analysis with Vision AI**
- **Advanced Image Recognition** using Kimi Vision AI
- **Medication Safety Verification** and dosage analysis
- **Side Effects & Warnings** identification
- **Patient Safety Recommendations** and next steps

### 🤖 **Intelligent Health Chatbot**
- **DeepSeek AI Integration** for natural conversations
- **Context-Aware Responses** with conversation memory
- **Symptom Analysis** and health guidance
- **24/7 Medical Support** with professional insights

### 📱 **Mobile-First Design**
- **Responsive Interface** optimized for all devices
- **WhatsApp Integration** for easy access
- **Cross-Platform Compatibility** (Web, Mobile, Tablet)
- **Modern UI/UX** with intuitive navigation

---

## 🏗️ **Architecture & Technology Stack**

### **Frontend Technologies**
```
React.js 18.x          - Modern UI framework
Vite                   - Fast build tool
Tailwind CSS          - Utility-first CSS framework
React Router DOM      - Client-side routing
React Markdown        - Markdown rendering
React Dropzone        - File upload handling
JSPDF                 - PDF generation
```

### **Backend Services**
```
Node.js               - Server runtime
Express.js            - Web framework
Multer                - File upload middleware
CORS                  - Cross-origin resource sharing
Axios                 - HTTP client
dotenv                - Environment management
```

### **AI Integrations**
```
OpenRouter API        - AI model access
DeepSeek AI           - Chatbot intelligence
Kimi Vision AI        - Prescription analysis
Model Context Protocol - AI assistant integration
```

### **Deployment & Infrastructure**
```
Vercel                - Frontend hosting
Railway               - Backend deployment
GitHub                - Version control
Environment Variables - Secure configuration
```

---

## 🎨 **UI/UX Design System**

### **Color Palette**
- **Primary**: `#000000` (Deep Black) - Professional medical aesthetic
- **Accent**: `#3B82F6` (Blue) - Trust and reliability
- **Success**: `#10B981` (Green) - Health and wellness
- **Warning**: `#F59E0B` (Amber) - Caution and attention
- **Error**: `#EF4444` (Red) - Important alerts

### **Typography**
- **Headings**: Modern sans-serif for clarity
- **Body Text**: Readable fonts optimized for medical content
- **Icons**: Medical and health-themed iconography
- **Spacing**: Consistent padding and margins for readability

### **Component Library**
- **Cards**: Information containers with subtle shadows
- **Buttons**: Interactive elements with hover effects
- **Forms**: Clean input fields with validation
- **Navigation**: Intuitive menu system
- **Search**: Prominent search bar with autocomplete

---

## 📁 **Project Structure**

```
medkit-ai/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── Header.jsx         # Navigation and branding
│   │   ├── Footer.jsx         # Site footer and links
│   │   ├── Hero.jsx           # Landing page hero section
│   │   ├── FAQs.jsx           # Frequently asked questions
│   │   ├── AIHealthAssistant.jsx # AI chatbot interface
│   │   └── ...
│   ├── 📁 pages/              # Application pages
│   │   ├── HomePage.jsx       # Landing page
│   │   ├── HealthLibraryPage.jsx # Health information library
│   │   ├── PrescriptionReaderPage.jsx # Prescription analysis
│   │   ├── AIAssistantPage.jsx # AI chatbot page
│   │   ├── FeaturesPage.jsx   # Features overview
│   │   ├── StoriesPage.jsx    # User stories and testimonials
│   │   └── ToolsPage.jsx      # Health tools directory
│   ├── 📁 config/             # Configuration files
│   │   └── config.js          # Environment-based API URLs
│   ├── App.jsx                # Main application component
│   └── index.css              # Global styles
├── 📁 public/                 # Static assets
│   ├── logomedkit.png         # Main logo
│   ├── logo.jpg               # Alternative logo
│   └── logo_transparent.png   # Transparent logo variant
├── 📁 mcp-server/             # MCP server for AI integration
│   ├── server.js              # MCP server implementation
│   ├── package.json           # MCP server dependencies
│   └── README.md              # MCP server documentation
├── chatbot-backend.cjs        # AI chatbot backend
├── prescription-backend.js    # Prescription analysis backend
├── package.json               # Main project dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── eslint.config.js           # ESLint configuration
└── README.md                  # This file
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/EshwaranandB/medkit-web.git
cd medkit-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Environment Setup**

Create a `.env` file in the root directory:

```env
# Frontend Environment Variables
VITE_APP_TITLE=Medkit.AI
VITE_APP_DESCRIPTION=Your AI Health Assistant

# Backend Environment Variables (for local development)
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
PORT=5001
```

---

## 🔧 **Backend Services**

### **Starting Local Backends**

```bash
# Terminal 1 - Prescription Backend (Port 5001)
node prescription-backend.js

# Terminal 2 - Chatbot Backend (Port 5002)
node chatbot-backend.cjs
```

### **Production Backends**

- **Prescription API**: https://prescriptionbackend.up.railway.app
- **Chatbot API**: https://chatbotbackend.up.railway.app

---

## 🌐 **API Endpoints**

### **Prescription Analysis**
```
POST /analyze
- Analyzes prescription images
- Returns medication information and safety data
- Supports multiple image formats
```

### **AI Chatbot**
```
POST /chat_assistant
- Processes health-related questions
- Maintains conversation context
- Returns AI-generated health guidance

GET /chat_history/:sessionId
- Retrieves conversation history

DELETE /chat_history/:sessionId
- Clears conversation history
```

---

## 📱 **Features in Detail**

### **🔍 Health Library & Search**
- **Comprehensive Content**: Covers major health categories
- **Smart Search**: AI-powered relevance scoring
- **Dynamic Results**: Real-time search suggestions
- **Mobile Optimized**: Responsive design for all devices

### **💊 Prescription Reader**
- **Image Upload**: Drag & drop or click to upload
- **AI Analysis**: Advanced vision AI for medication recognition
- **Safety Information**: Dosage, side effects, and warnings
- **PDF Export**: Download analysis results

### **🤖 AI Health Assistant**
- **Natural Conversations**: Human-like interaction
- **Context Memory**: Remembers conversation history
- **Health Guidance**: Professional medical insights
- **24/7 Availability**: Always ready to help

### **📱 WhatsApp Integration**
- **Direct Access**: Quick health guidance via WhatsApp
- **Pre-filled Messages**: Automatic message templates
- **Professional Support**: Connect with health experts

---

## 🏆 **Hackathon Features**

### **MCP Server Integration**
- **Model Context Protocol**: Enables AI assistants to use Medkit.AI
- **Tool Exposure**: Health tools available to other AI platforms
- **Standardized Interface**: Follows MCP specifications
- **Extensible Architecture**: Easy to add new tools

### **Innovation Highlights**
- **Multi-AI Integration**: Combines different AI models for specialized tasks
- **Real-time Processing**: Instant health information and analysis
- **Professional Quality**: Medical-grade accuracy and reliability
- **Accessibility Focus**: Designed for users of all technical levels

---

## 🔒 **Security & Privacy**

### **Data Protection**
- **No Data Storage**: Chat sessions are not permanently stored
- **Secure APIs**: Environment variable configuration
- **HIPAA Compliance**: Medical data handling best practices
- **Privacy First**: User information is never shared

### **API Security**
- **Environment Variables**: Sensitive keys stored securely
- **CORS Protection**: Controlled cross-origin access
- **Input Validation**: Secure file upload and processing
- **Error Handling**: Safe error responses

---

## 📊 **Performance & Analytics**

### **Vercel Analytics**
- **Visitor Tracking**: Monitor real user engagement
- **Page Views**: Track feature usage and popularity
- **Performance Metrics**: Optimize user experience
- **Real-time Data**: Live insights into application usage

### **Optimization Features**
- **Lazy Loading**: Efficient resource management
- **Image Optimization**: Fast loading times
- **Code Splitting**: Reduced bundle sizes
- **CDN Delivery**: Global content distribution

---

## 🌟 **Impact & Benefits**

### **For Users**
- **Instant Access**: 24/7 health information availability
- **Professional Quality**: Medical-grade accuracy and reliability
- **Cost Effective**: Free access to health guidance
- **Privacy Safe**: No personal data collection

### **For Healthcare**
- **Reduced Burden**: Decreases unnecessary doctor visits
- **Education**: Empowers patients with knowledge
- **Prevention**: Early symptom recognition and guidance
- **Accessibility**: Healthcare information for everyone

### **For Society**
- **Health Literacy**: Improved public health knowledge
- **Preventive Care**: Better health outcomes
- **Digital Health**: Modern healthcare accessibility
- **AI Innovation**: Advancement in medical AI applications

---

## 🚀 **Deployment**

### **Frontend (Vercel)**
- **Automatic Deployment**: Connected to GitHub repository
- **Production Branch**: Main branch deployment
- **Custom Domain**: medkit-ai.vercel.app
- **SSL Certificate**: Automatic HTTPS

### **Backend (Railway)**
- **Scalable Infrastructure**: Automatic scaling
- **Environment Variables**: Secure configuration
- **Custom Domains**: Professional API endpoints
- **Monitoring**: Built-in performance tracking

---

## 🤝 **Contributing**

We welcome contributions to make Medkit.AI even better!

### **How to Contribute**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Development Guidelines**
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure mobile compatibility

---

## 📞 **Contact & Support**

### **Get in Touch**
- **Website**: [https://medkit-ai.vercel.app](https://medkit-ai.vercel.app)
- **WhatsApp**: [+1 (415) 523-8886](https://wa.me/14155238886?text=join%20three-fort)
- **GitHub**: [https://github.com/EshwaranandB/medkit-web](https://github.com/EshwaranandB/medkit-web)

### **Support Channels**
- **Documentation**: Comprehensive guides and tutorials
- **Community**: User forums and discussions
- **Direct Support**: WhatsApp and email assistance

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **OpenRouter** for AI model access
- **DeepSeek** for advanced language models
- **Kimi Vision** for image analysis capabilities
- **Vercel** for frontend hosting
- **Railway** for backend infrastructure
- **Puch AI** for the hackathon opportunity

---

<div align="center">

**🏆 Built for the Puch AI Hackathon**

*Making healthcare accessible through AI innovation*

[![Star on GitHub](https://img.shields.io/github/stars/EshwaranandB/medkit-web?style=social)](https://github.com/EshwaranandB/medkit-web)
[![Fork on GitHub](https://img.shields.io/github/forks/EshwaranandB/medkit-web?style=social)](https://github.com/EshwaranandB/medkit-web)

</div>
