'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bot, Send, MessageSquare, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Add custom styles for animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  /* Custom scroll behavior for 2-second duration */
  html {
    scroll-behavior: smooth;
  }
  
  /* Override default smooth scroll timing */
  * {
    scroll-behavior: smooth;
  }
`;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface BotInfo {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: string;
}

export default function TestBotPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const botId = searchParams.get('botId');
  const [bot, setBot] = useState<BotInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBot, setIsLoadingBot] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth scroll to bottom of entire page when page loads (2 seconds duration)
  const scrollToBottomOnLoad = () => {
    setTimeout(() => {
      const startPosition = window.pageYOffset;
      const targetPosition = document.documentElement.scrollHeight - window.innerHeight;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 second
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }, 100); // Small delay to ensure DOM is ready
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom when page first loads
  useEffect(() => {
    if (!isLoadingBot && bot) {
      scrollToBottomOnLoad();
    }
  }, [isLoadingBot, bot]);

  // Fetch bot information
  useEffect(() => {
    const fetchBot = async () => {
      if (!botId) return;
      
      try {
        const response = await fetch(`/api/manager/bot/${botId}`);
        if (response.ok) {
          const botData = await response.json();
          setBot(botData);
        } else {
          console.error('Failed to fetch bot');
        }
      } catch (error) {
        console.error('Error fetching bot:', error);
      } finally {
        setIsLoadingBot(false);
      }
    };

    fetchBot();
  }, [botId]);

  // Send message to bot via n8n
  const sendMessage = async () => {
    if (!inputMessage.trim() || !bot) return;

    const messageToSend = inputMessage; // Store the message before clearing input

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botId: bot.id,
          message: messageToSend,
          userId: 'test-user' // For testing purposes
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || 'Sorry, I could not process your message.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, there was an error processing your message. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error connecting to the bot. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow Shift + Enter for new line (default behavior)
        return;
      } else {
        // Enter without Shift sends the message
        e.preventDefault();
        sendMessage();
      }
    }
  };

  if (isLoadingBot) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6566F1] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bot...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Bot Not Found</h1>
            <p className="text-gray-600 mb-4">The bot you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
            <Button 
              onClick={() => router.push('/manager-dashboard/manager-bots')}
              className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Manager Bots
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header with Back Button */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/manager-dashboard/manager-bots')}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Manager Bots
            </Button>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Testing Bot</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Bot Info Header */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg shadow-gray-200/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#6566F1] via-[#7B68EE] to-[#9370DB] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200/50">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    bot.status === 'active' ? 'bg-green-500' : 
                    bot.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {bot.name}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">{bot.domain}</p>
                  <p className="text-gray-500 mt-1 max-w-md">{bot.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  bot.status === 'active' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : bot.status === 'paused' 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {bot.status === 'active' ? '🟢' : bot.status === 'paused' ? '🟡' : '⚫'} {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl shadow-gray-200/20 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#6566F1]/10 via-[#7B68EE]/10 to-[#9370DB]/10 border-b border-gray-200/50 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6566F1] to-[#7B68EE] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Test Conversation</h2>
                  <p className="text-gray-600">Chat with your bot to test its responses</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-gray-50/30">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#6566F1]/20 to-[#7B68EE]/20 rounded-3xl flex items-center justify-center">
                      <Bot className="w-12 h-12 text-[#6566F1]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Chat!</h3>
                  <p className="text-gray-600 max-w-md leading-relaxed">
                    Start a conversation with your bot to test its responses and see how it handles different queries.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-[#6566F1]/10 text-[#6566F1] rounded-full text-sm font-medium">Try asking about {bot.domain}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Test different scenarios</span>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div className={`flex items-start space-x-3 max-w-lg ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-[#6566F1] to-[#7B68EE]' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className={`px-5 py-3 rounded-2xl shadow-sm ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-[#6566F1] to-[#7B68EE] text-white' 
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#6566F1] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#6566F1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#6566F1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-6">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-2 focus:border-[#6566F1] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 resize-none min-h-[48px] max-h-32"
                    disabled={isLoading}
                    rows={1}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-7 h-7 bg-gradient-to-br from-[#6566F1] to-[#7B68EE] rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-[#6566F1] to-[#7B68EE] hover:from-[#5A5BD9] hover:to-[#6A5ACD] text-white rounded-2xl shadow-lg shadow-purple-200/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
