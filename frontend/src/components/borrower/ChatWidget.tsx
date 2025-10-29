import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Minimize2, Maximize2, Phone, Video, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support' | 'donor';
  timestamp: Date;
  senderName?: string;
}

interface ChatWidgetProps {
  borrowerId?: string;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
}

const ChatWidget = ({ onVoiceCall, onVideoCall }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I see you have some questions about your loan application. How can I help you today?',
      sender: 'support',
      timestamp: new Date(Date.now() - 300000),
      senderName: 'Sarah (Support)'
    },
    {
      id: '2',
      text: 'Hi! I was wondering about the timeline for my application review.',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      text: 'Your application is currently being reviewed by our AI system and community donors. The typical review time is 2-4 hours. You should receive an update soon!',
      sender: 'support',
      timestamp: new Date(Date.now() - 180000),
      senderName: 'Sarah (Support)'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [onlineUsers] = useState(['Sarah (Support)', 'Mike D. (Donor)', 'Community Bot']);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (messages.length > 3) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Great! I also noticed you've been making payments on time. This is really boosting your credibility score! 🎉",
            sender: 'support',
            timestamp: new Date(),
            senderName: 'Sarah (Support)'
          }]);
        }, 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Thanks for reaching out! Let me check that information for you. 👍",
        sender: 'support',
        timestamp: new Date(),
        senderName: 'Sarah (Support)'
      }]);
    }, 1000);
  };

  const toggleVoiceRecording = () => {
    setIsVoiceRecording(!isVoiceRecording);
    // Here you would integrate with Web Speech API or similar
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            3
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'bottom-6 right-6'} z-50 transition-all duration-300`}>
      <div className={`bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-white/10 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-96 sm:h-[500px]'
      } transition-all duration-300`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="text-white font-semibold font-clash text-sm">
                {isMinimized ? 'Live Support' : 'Live Support & Community'}
              </h3>
              {!isMinimized && (
                <p className="text-xs text-slate-400 font-inter">{onlineUsers.length} people online</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isMinimized && (
              <>
                <button
                  onClick={onVoiceCall}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={onVideoCall}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-sm px-3 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-violet-600 text-white' 
                      : message.sender === 'donor'
                      ? 'bg-emerald-600/80 text-white'
                      : 'bg-slate-700 text-white'
                  }`}>
                    {message.senderName && (
                      <p className="text-xs opacity-75 mb-1 font-inter">{message.senderName}</p>
                    )}
                    <p className="text-sm font-inter">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1 font-inter">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isVoiceRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {isVoiceRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <input
                  ref={chatInputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-400 transition-colors font-inter"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
