import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const EduBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m EduBot, your AI assistant at Edu Aura Institute. How can I help you today? Ask me about courses, admissions, faculty, or anything else!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const botResponses: Record<string, string> = {
        course: 'We offer various courses including BCA, BBA, B.Com, MCA, and MBA. Each program is designed with industry-relevant curriculum. Would you like details about a specific course?',
        admission: 'Admissions are open! You can apply online through our Admissions page. Required documents include 10th & 12th mark sheets, ID proof, and passport photos. Contact us at +91 88307 72432 for more info.',
        faculty: 'Our faculty comprises 200+ experienced professors, 85% with Ph.D. degrees. They bring both academic excellence and industry experience. Visit our Faculty page to learn more!',
        fee: 'Fee structure varies by program. BCA/BBA: ₹45,000/year, MCA/MBA: ₹60,000/year. Scholarships available for meritorious students!',
        placement: 'We have a 95% placement rate! Our students are placed in top companies like TCS, Infosys, Wipro, and more. Average package is 4.5 LPA with highest at 12 LPA.',
        library: 'Our Smart Library has 50,000+ books, digital resources, and 24/7 study areas. Access e-journals and online databases with your student login.',
        hostel: 'We have separate hostels for boys and girls with AC/Non-AC rooms, mess facility, Wi-Fi, and 24/7 security.',
        contact: 'You can reach us at: Email: principal@ssbesitm.org, Phone: +91 88307 72432. Our campus is located in Maharashtra, India.',
        default: 'Thank you for your question! I can help you with information about our courses, admissions, faculty, fees, placements, library, hostel, and more. What would you like to know?',
      };

      const lowerMessage = userMessage.content.toLowerCase();
      let response = botResponses.default;

      if (lowerMessage.includes('course') || lowerMessage.includes('program') || lowerMessage.includes('bca') || lowerMessage.includes('mca')) {
        response = botResponses.course;
      } else if (lowerMessage.includes('admission') || lowerMessage.includes('apply') || lowerMessage.includes('enroll')) {
        response = botResponses.admission;
      } else if (lowerMessage.includes('faculty') || lowerMessage.includes('teacher') || lowerMessage.includes('professor')) {
        response = botResponses.faculty;
      } else if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
        response = botResponses.fee;
      } else if (lowerMessage.includes('placement') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
        response = botResponses.placement;
      } else if (lowerMessage.includes('library') || lowerMessage.includes('book')) {
        response = botResponses.library;
      } else if (lowerMessage.includes('hostel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay')) {
        response = botResponses.hostel;
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        response = botResponses.contact;
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = 'Hello! Welcome to Edu Aura Institute. I\'m here to help you with any questions about our programs, admissions, or campus life. What would you like to know?';
      } else if (lowerMessage.includes('thank')) {
        response = 'You\'re welcome! If you have any more questions, feel free to ask. I\'m here to help! 😊';
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting. Please try again or contact us directly at +91 88307 72432.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleChat}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-xl shimmer cursor-pointer"
        >
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
          <span className="text-primary-foreground font-semibold">Ask EduBot</span>
          <Sparkles className="h-4 w-4 text-primary-foreground/80" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[520px] bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary to-secondary p-4 flex-shrink-0">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-primary-foreground animate-pulse" />
                </div>
                <div>
                  <h3 className="text-primary-foreground font-bold text-lg flex items-center gap-2">
                    EduBot
                    <Sparkles className="h-4 w-4" />
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">Your AI Assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleChat}
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-primary-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                } animate-fade-in`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-secondary/20'
                      : 'bg-primary/20'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-secondary" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-br-sm'
                      : 'bg-muted/50 border border-border/50 text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.role === 'user'
                        ? 'text-secondary-foreground/60'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border/50 p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50 bg-card/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-muted/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              <Button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EduBot;
