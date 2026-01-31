
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot, User, Loader2, Info } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface AskAIModalProps {
  onClose: () => void;
}

const AskAIModal: React.FC<AskAIModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '안녕하세요! 서울소방 AI 비서입니다. 연구 자료나 기술 정보에 대해 무엇이든 물어보세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize the GoogleGenAI client with the API key from environment variables
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Call generateContent with gemini-3-pro-preview for complex reasoning tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: "당신은 '서울소방GPT' 플랫폼의 전문 AI 어시스턴트입니다. 사용자는 서울소방GPT의 연구원이나 소방관입니다. 항상 전문적이고 신뢰할 수 있는 말투로 대답하세요. 한국어를 사용하십시오. 소방 기술, 화재 예측 알고리즘, 구급 데이터 분석 등 소방 도메인 지식에 특화된 답변을 제공하세요.",
        }
      });

      // Extract generated text directly from the response object's text property
      const aiText = response.text || "죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="bg-[#E31B23] p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot size={24} />
            </div>
            <div>
              <div className="font-black text-lg">서울소방 AI 비서</div>
              <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Powered by Gemini 3 Pro</div>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                  msg.role === 'user' ? 'ml-3 bg-slate-900 text-white' : 'mr-3 bg-red-100 text-[#E31B23]'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-[#E31B23] text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-3 text-slate-400 font-bold text-xs">
                  <Loader2 className="animate-spin" size={16} />
                  <span>AI가 답변을 생성하고 있습니다...</span>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="궁금한 내용을 입력하세요..."
              className="flex-grow bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-red-500 transition-all outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-[#E31B23] text-white p-4 rounded-2xl shadow-lg shadow-red-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <Info size={12} className="mr-1" /> AI의 답변은 실제 지침과 다를 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIModal;
