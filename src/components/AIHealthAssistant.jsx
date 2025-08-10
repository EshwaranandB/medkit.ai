import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { API_URLS } from "../config/config";

const SYSTEM_PROMPT = `You are a polite, helpful AI health assistant named Medkit. Respond in English.\nYou may use the user's profile details like name, age, gender, profession, location, and medical history **only if they are available** to personalize the advice.\nDo not ask for personal information unless it is **relevant to the current health question**. Always prioritize user comfort and privacy.`;

const LOCAL_STORAGE_KEY = "medkit_chat_history";

// Real AI backend integration - DeepSeek through OpenRouter

const AIHealthAssistant = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const chatEndRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Auto-scroll to bottom when chatHistory changes
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: chatHistory.length + 1,
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
    setLoading(true);

    try {
      // Call the real chatbot backend (DeepSeek through OpenRouter)
      const response = await fetch(`${API_URLS.chatbotApi}/chat_assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiReply = data.reply;

      setChatHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "ai",
          content: aiReply,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error('Error calling AI backend:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "ai",
          content: "Sorry, I couldn't connect to the AI service. Please try again later.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat handler
  const handleClearChat = async () => {
    try {
      // Clear backend conversation history
              await fetch(`${API_URLS.chatbotApi}/chat_history/${sessionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error clearing backend history:', error);
    }
    
    const initial = [
      {
        id: 1,
        type: "ai",
        content: "Hello! I'm your AI health assistant. How can you help me today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ];
    setChatHistory(initial);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
  };

  // Toggle expand/collapse
  const handleExpand = () => setExpanded((prev) => !prev);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-violet-950 to-black/90 rounded-3xl shadow-2xl my-16 backdrop-blur-xl animate-fadein" style={{
      minHeight: expanded ? '90vh' : '600px',
      zIndex: 1,
      transition: 'min-height 0.3s ease-in-out'
    }}>
      {/* Animated floating Medkit logo */}
      <div className="absolute -top-16 -right-16 w-72 h-72 opacity-30 pointer-events-none animate-float-slow z-0">
        <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="url(#medkitGradient)" />
          <path d="M64 112C64 112 16 80 16 48C16 34.7452 26.7452 24 40 24C50 24 58 30 64 38C70 30 78 24 88 24C101.255 24 112 34.7452 112 48C112 80 64 112 64 112Z" fill="url(#heartGradient)"/>
          <defs>
            <radialGradient id="medkitGradient" cx="0" cy="0" r="1" gradientTransform="translate(64 64) rotate(90) scale(60)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed"/>
              <stop offset="1" stopColor="#18192b"/>
            </radialGradient>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626"/>
              <stop offset="100%" stopColor="#ea580c"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Animated background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-700/30 rounded-full blur-3xl opacity-40 animate-pulse-glow z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg text-gradient" style={{textShadow:'0 2px 24px #7c3aed88'}}>
                Your Personal AI Health Assistant
              </h2>
              <p className="text-xl text-violet-200 max-w-2xl mx-auto">
                Get instant answers to your health questions, understand medical reports, and receive personalized guidance 24/7.
              </p>
            </div>
            <div className="flex gap-2 justify-center md:justify-end">
              <button
                onClick={handleExpand}
                className="group relative w-12 h-12 bg-gradient-to-br from-violet-700 to-purple-700 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 border border-violet-800 flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={handleClearChat}
                className="px-4 py-2 bg-gradient-to-br from-red-600 to-red-400 text-white rounded-lg shadow hover:scale-105 transition-transform border border-red-800"
              >
                Clear Chat
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          <div className={`glass bg-gradient-to-br from-[#18192b] to-violet-900/80 rounded-2xl shadow-2xl overflow-hidden border border-violet-800/40 ${expanded ? 'h-[70vh]' : ''}`} style={{
            boxShadow: '0 25px 50px -12px #7c3aed55',
            border: '1.5px solid #7c3aed44',
            backdropFilter: 'blur(12px)',
            transition: 'height 0.3s ease-in-out',
            height: expanded ? '70vh' : undefined
          }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-violet-900 px-6 py-4 flex items-center gap-3 animate-pulse-glow">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Medkit AI Assistant</h3>
                <p className="text-violet-100 text-sm">Online • Ready to help</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages-container h-96 overflow-y-auto p-6 space-y-4" style={{
              background: 'linear-gradient(135deg, #18192b 0%, #23234a 100%)',
              borderBottom: '1px solid #7c3aed22',
              height: expanded ? 'calc(60vh - 80px)' : undefined,
              maxHeight: expanded ? '60vh' : undefined,
              scrollBehavior: 'smooth'
            }}>
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-xl border-2 ${
                      msg.type === "user"
                        ? "bg-violet-700/90 text-white border-violet-600"
                        : "bg-white/10 text-violet-100 border-violet-900"
                    }`}
                    style={{
                      boxShadow: msg.type === "user" 
                        ? '0 4px 15px #7c3aed55' 
                        : '0 2px 10px #7c3aed22',
                      backdropFilter: 'blur(6px)'
                    }}
                  >
                    {msg.type === "ai" ? (
                      <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown 
                          components={{
                            h1: ({...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                            h2: ({...props}) => <h2 className="text-base font-semibold mb-2" {...props} />,
                            h3: ({...props}) => <h3 className="text-sm font-semibold mb-1" {...props} />,
                            p: ({...props}) => <p className="mb-2" {...props} />,
                            ul: ({...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                            ol: ({...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                            li: ({...props}) => <li className="text-sm" {...props} />,
                            strong: ({...props}) => <strong className="font-semibold" {...props} />,
                            em: ({...props}) => <em className="italic" {...props} />,
                            code: ({...props}) => <code className="bg-violet-800/50 px-1 rounded text-xs" {...props} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                    <p className={`text-xs mt-2 ${
                      msg.type === "user" ? "text-violet-200" : "text-violet-400"
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {/* Animated AI typing indicator */}
              {loading && (
                <div className="flex items-center gap-2 mt-2 animate-pulse-glow">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></span>
                  <span className="text-violet-300 text-xs ml-2">AI is typing…</span>
                </div>
              )}
              {/* Scroll anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-violet-800/40 p-4 bg-black/60">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your health question here..."
                  className="flex-1 px-4 py-3 rounded-xl bg-[#18192b] text-white border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-inner"
                  style={{
                    background: 'linear-gradient(135deg, #18192b 60%, #23234a 100%)',
                    boxShadow: '0 2px 8px #7c3aed22'
                  }}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px #7c3aed55'
                  }}
                  disabled={loading}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 px-6 py-4 rounded shadow font-medium animate-pulse-glow">
              Note: <span className="font-semibold">medkit</span> doesn’t replace a doctor, but it can offer reliable, science-backed information to guide you. Always consult a healthcare professional for serious concerns.
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 32px #7c3aed88); }
          50% { filter: drop-shadow(0 0 64px #a78bfa); }
        }
        .animate-pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
};

export default AIHealthAssistant; 