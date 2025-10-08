// components/ai-assistant/AIAssistantPage.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, History, Send } from "lucide-react";
import { ChatHistorySheet } from "./ChatHistorySheet";
import Image from "next/image";
import ThinkingDots from "@/components/common/ThinkingDots";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const suggestedQuestions = [
  "What are the first steps I should take to start planning my wedding?",
  "How can I manage my timeline?",
  "How much should I budget for each part of the wedding?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Marriage hall suggestion",
      messages: [],
      createdAt: new Date(),
    },
    { id: "2", title: "Hall Booking", messages: [], createdAt: new Date() },
    {
      id: "3",
      title: "Photographer Selection",
      messages: [],
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Photography Place",
      messages: [],
      createdAt: new Date(),
    },
    { id: "5", title: "Priest", messages: [], createdAt: new Date() },
    { id: "6", title: "Church", messages: [], createdAt: new Date() },
    {
      id: "7",
      title: "Bachelorette Party",
      messages: [],
      createdAt: new Date(),
    },
    {
      id: "8",
      title: "Cocktail Party arrangement",
      messages: [],
      createdAt: new Date(),
    },
    { id: "9", title: "Grooms Dress", messages: [], createdAt: new Date() },
    { id: "10", title: "Makeup Artist", messages: [], createdAt: new Date() },
    {
      id: "11",
      title: "Wedding Planner",
      messages: [],
      createdAt: new Date(),
    },
    { id: "12", title: "Marriage", messages: [], createdAt: new Date() },
    { id: "13", title: "Wedflow", messages: [], createdAt: new Date() },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    if (messages.length > 0) {
      inputRef.current?.focus();
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you for your question about "${messageContent}". I'm here to help you plan your perfect wedding. Let me provide you with some guidance...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
    setIsThinking(false);
  };

  const handleSelectChat = (session: ChatSession) => {
    setMessages(session.messages);
    setIsHistoryOpen(false);
  };

  const handleDeleteChat = (sessionId: string) => {
    setChatSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    );
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 flex flex-col md:flex-row items-center md:items-center justify-between gap-4 border-b py-3 px-4 md:px-6 ">
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
            AI assistant
          </h1>
          <p className=" text-gray-600 text-base">
            Get instant answers and planning support
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            size="lg"
            onClick={() => setIsHistoryOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <History className="w-5 h-5" />
            Chat history
          </Button>
          <Button
            size="lg"
            onClick={handleNewChat}
            className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New chat
          </Button>
        </div>
      </div>

      {/* Chat Container - Flexible */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {messages.length === 0 && !isThinking ? (
          // Empty State
          <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
            <div className="md:max-w-5xl w-full text-center space-y-8">
              <div className="md:pb-20 ">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  Hello, John
                </h2>
                <p className="text-gray-600 text-lg">How can I help You?</p>
              </div>

              {/* Suggested Questions */}
              <div className="flex gap-4 justify-center text-center flex-wrap px-4">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-6 py-4 bg-white border border-gray-200 rounded-xl text-center hover:border-primary hover:shadow-md transition-all text-sm text-gray-700 max-w-xs"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="w-full max-w-[95%] mx-auto mt-0 md:mt-16">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask anything"
                    className="w-full px-6 py-4 md:px-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Send className="w-5 h-5 text-primary" />
                  </button>
                  <Plus className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages - Scrollable with Fixed Input
          <>
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 border rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/bot.jpg"
                            alt="AI Assistant"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex flex-col ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-2xl px-6 py-4  ${
                          message.role === "user"
                            ? "bg-primary text-white rounded-tr-xs mt-2 rounded-2xl"
                            : "bg-gray-100 text-gray-900 rounded-tl-xs mt-2 rounded-2xl"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 px-2">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/user.png"
                            alt="User"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Thinking Animation */}
                {isThinking && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 border rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/bot.jpg"
                          alt="AI Assistant"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="max-w-2xl px-6 py-4 bg-gray-100 text-gray-900 rounded-tl-xs mt-2 rounded-2xl">
                        <ThinkingDots size="sm" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Box - Fixed at Bottom */}
            <div className="flex-shrink-0 py-4 px-6 border-t bg-white">
              <div className="w-full max-w-4xl mx-auto">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask anything"
                    className="w-full px-6 py-4 md:px-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900"
                    disabled={isThinking}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors"
                    disabled={isThinking}
                  >
                    <Send className="w-5 h-5 text-primary" />
                  </button>
                  <Plus className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chat History Sheet */}
      <ChatHistorySheet
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        chatSessions={chatSessions}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />
    </div>
  );
}
