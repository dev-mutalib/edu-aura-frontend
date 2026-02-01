import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      content: "👋 Hello! I'm EduAura AI, your assistant for EduAura Institute. Ask me about programming, technology, or career paths. I was developed by EduAura Developers.",
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
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenEduBot = () => setIsOpen(true);
    window.addEventListener('openEduBot', handleOpenEduBot);
    return () => window.removeEventListener('openEduBot', handleOpenEduBot);
  }, []);

  /* ------------------ BOT RESPONSES ------------------ */

  const getBotReply = (userText: string): string => {
    const msg = userText.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|hii|hiii|namaste|good morning|good afternoon|good evening)/.test(msg)) {
      return "Hello! 👋 Welcome to EduAura Institute! How can I help you today?\n\nYou can ask about:\n• Courses\n• Admissions\n• Fees\n• Placements\n• Hostel";
    }

    // Courses
    if (/course|program|bca|bba|mca|mba|bcom|b\.com|degree|stream/.test(msg)) {
      return "📚 **Our Programs:**\n\n**Undergraduate:**\n• BCA - Bachelor of Computer Applications\n• BBA - Bachelor of Business Administration\n• B.Com - Bachelor of Commerce\n\n**Postgraduate:**\n• MCA - Master of Computer Applications\n• MBA - Master of Business Administration\n\nAll programs feature industry-focused curriculum with practical training!";
    }

    // Fees
    if (/fee|fees|cost|price|payment|scholarship|afford/.test(msg)) {
      return "💰 **Fee Structure:**\n\n**Undergraduate Programs:**\n• BCA: ₹45,000/year\n• BBA: ₹45,000/year\n• B.Com: ₹40,000/year\n\n**Postgraduate Programs:**\n• MCA: ₹60,000/year\n• MBA: ₹65,000/year\n\n🎓 Scholarships available for meritorious students!\n\n📞 Contact: +91 88307 72432";
    }

    // Placements
    if (/placement|job|career|package|salary|recruit|company|companies|hire/.test(msg)) {
      return "🎯 **Placement Highlights:**\n\n✅ 95% Placement Rate\n💼 Avg Package: 4.5 LPA\n🏆 Highest Package: 12 LPA\n\n**Top Recruiters:**\n• TCS\n• Infosys\n• Wipro\n• Tech Mahindra\n• Cognizant\n• Accenture\n\nWe provide resume building, mock interviews & career counseling!";
    }

    // Admission
    if (/admission|apply|enroll|join|registration|eligibility|entrance|how to join/.test(msg)) {
      return "📋 **Admission Process:**\n\n1️⃣ Fill online application form\n2️⃣ Submit required documents\n3️⃣ Pay application fee\n4️⃣ Appear for entrance test/interview\n5️⃣ Get admission confirmation\n\n**Required Documents:**\n• 10th & 12th Marksheets\n• Transfer Certificate\n• Passport Photos\n• Aadhar Card\n\n📞 Apply Now: +91 88307 72432\n🌐 Or click 'Apply Now' button on our website!";
    }

    // Faculty
    if (/faculty|teacher|professor|staff|instructor/.test(msg)) {
      return "👨‍🏫 **Our Faculty:**\n\n• 200+ Experienced Professors\n• Industry Experts\n• PhD Qualified Teachers\n• Regular Faculty Development Programs\n• Student-friendly approach\n\nOur faculty members bring real-world experience to the classroom!";
    }

    // Library
    if (/library|book|reading|study material|resource/.test(msg)) {
      return "📖 **Smart Library:**\n\n• 50,000+ Books & Journals\n• Digital Library Access\n• E-Journals & Databases\n• 24/7 Reading Room\n• Wi-Fi Enabled\n• Separate Reference Section\n\nStudents get free access to online learning platforms!";
    }

    // Hostel
    if (/hostel|accommodation|stay|room|mess|food|living/.test(msg)) {
      return "🏠 **Hostel Facilities:**\n\n**Boys & Girls Separate Hostels:**\n• AC & Non-AC Rooms\n• 24/7 Wi-Fi\n• Hygienic Mess\n• Laundry Service\n• Security & CCTV\n• Recreation Room\n\n**Monthly Charges:**\n• Non-AC: ₹6,000/month\n• AC: ₹9,000/month\n(Including meals)";
    }

    // Contact
    if (/contact|phone|email|address|location|reach|call/.test(msg)) {
      return "📞 **Contact Us:**\n\n📱 Phone: +91 88307 72432\n📧 Email: principal@ssbesitm.org\n🌐 Website: www.ssbesitm.org\n\n📍 **Address:**\nSSBES ITM Campus,\nMaharashtra, India\n\n⏰ Office Hours: 9 AM - 5 PM (Mon-Sat)";
    }

    // Campus
    if (/campus|infrastructure|facility|facilities|lab|computer/.test(msg)) {
      return "🏫 **Campus Facilities:**\n\n• Modern Computer Labs\n• Smart Classrooms\n• Wi-Fi Campus\n• Sports Ground\n• Cafeteria\n• Auditorium\n• Seminar Halls\n• Parking Area\n• Medical Room\n\nState-of-the-art infrastructure for holistic development!";
    }

    // Programming related
    if (/programming|coding|python|java|javascript|c\+\+|web development|app development/.test(msg)) {
      return "💻 **Programming & Technology:**\n\nWe teach:\n• Python, Java, C++\n• Web Development (HTML, CSS, JavaScript, React)\n• Mobile App Development\n• Database Management (SQL, MongoDB)\n• Cloud Computing\n• AI & Machine Learning basics\n\nOur BCA & MCA programs focus heavily on practical coding skills!";
    }

    // Career guidance
    if (/career path|what should i study|which course|confused|help me choose/.test(msg)) {
      return "🎯 **Career Guidance:**\n\n**For Tech Enthusiasts:**\n→ BCA/MCA - Software Development\n\n**For Business Minds:**\n→ BBA/MBA - Management & Leadership\n\n**For Commerce Students:**\n→ B.Com/M.Com - Finance & Accounting\n\nNeed personalized guidance? Contact our counselor:\n📞 +91 88307 72432";
    }

    // Thanks
    if (/thank|thanks|thankyou|thank you|thx/.test(msg)) {
      return "You're welcome! 😊\n\nIs there anything else I can help you with?\n\nFeel free to ask about courses, admissions, or any other queries!";
    }

    // Bye
    if (/bye|goodbye|see you|exit|quit/.test(msg)) {
      return "Goodbye! 👋\n\nThank you for visiting EduAura!\n\nFeel free to come back anytime you have questions.\n\n📞 For immediate assistance: +91 88307 72432";
    }

    // Default fallback
    return "I'm here to help! 🤖\n\nPlease ask me about:\n\n• **Courses** - BCA, BBA, MCA, MBA, B.Com\n• **Admissions** - Process & Requirements\n• **Fees** - Fee Structure & Scholarships\n• **Placements** - Career & Job Opportunities\n• **Hostel** - Accommodation & Facilities\n• **Contact** - Get in touch with us\n• **Programming** - Tech & Coding queries\n\nType your question and I'll assist you!";
  };

  /* ------------------ SEND MESSAGE ------------------ */

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 400));

    const botMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: getBotReply(trimmedInput),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Only render when open (triggered by navbar button)
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">

      <div className="w-[360px] sm:w-[400px] h-[550px] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-primary-foreground font-bold">EduAura AI</h3>
                <p className="text-primary-foreground/70 text-xs">AI Assistant • Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md p-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-border/50 bg-card shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-muted/50 border-border/50 focus:border-primary rounded-xl"
                placeholder="Type your message..."
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isTyping || !inputValue.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              EduAura AI may occasionally generate incorrect information
            </p>
        </div>
      </div>
    </div>
  );
};

export default EduBot;
