import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, EXPERIENCE, SKILLS, VIBE_LOG } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an AI Agent representing Shravan Sriram, an AI Product Manager and Strategist.
Your goal is to answer questions about Shravan's work, experience, and skills in a positive, professional, and enthusiastic tone.

CONTEXT ABOUT SHRAVAN:
- Projects: ${JSON.stringify(PROJECTS)}
- Experience: ${JSON.stringify(EXPERIENCE)}
- Skills: ${JSON.stringify(SKILLS)}
- Vibe-Log (Experiments): ${JSON.stringify(VIBE_LOG)}

GUIDELINES:
1. Tone: Always positive, helpful, and "vibe-coded" (modern, tech-forward, yet human).
2. Requirement Gathering: Your secondary goal is to understand what the visitor is looking for (e.g., hiring, collaboration, advice). Try to understand their requirements in under 3 questions.
3. The Nudge: Once you understand their needs or after a few exchanges, gently nudge them to connect with Shravan via email (shravansv1992@gmail.com) or LinkedIn.
4. Response Style: Keep answers under 100 words. Use short paragraphs and bullet points where appropriate to make information easy to scan and understand.
5. If asked about things not in the context, politely steer back to Shravan's expertise in AI, Product, and Strategy.

Current User Email: shravansv1992@gmail.com
`;

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Hi! I'm Shravan's AI assistant. How can I help you explore his work today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }]
        }))
      });

      const response = await chat.sendMessage({
        message: userMessage
      });

      setMessages(prev => [...prev, { role: "bot", content: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "I'm having a bit of a technical glitch. Feel free to reach out to Shravan directly at shravansv1992@gmail.com!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white text-black">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold">S. Sriram AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-white text-black" : "bg-white/5 text-white"}`}>
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-4 text-sm font-light leading-relaxed rounded-2xl ${m.role === "user" ? "bg-white text-black rounded-tr-none" : "bg-white/5 text-white rounded-tl-none"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 bg-white/5 text-white rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Shravan..."
                  className="flex-1 bg-white/5 border-none px-4 py-3 text-sm font-light focus:ring-1 focus:ring-white/20 outline-none text-white rounded-xl"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-white text-black p-3 hover:bg-white/90 transition-colors disabled:opacity-50 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-white/90 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
