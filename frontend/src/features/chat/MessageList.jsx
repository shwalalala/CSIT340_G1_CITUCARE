import React, { useRef, useEffect } from "react";

const MessageList = ({ messages, isLoading }) => {
  
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      const shouldScroll = containerRef.current.scrollHeight > containerRef.current.clientHeight;
      console.log("Scrolling:", {
        scrollHeight: containerRef.current.scrollHeight,
        clientHeight: containerRef.current.clientHeight,
        shouldScroll: shouldScroll
      });
      
      if (shouldScroll) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50"
      style={{ 
        overflowY: "auto",
        scrollBehavior: "smooth"
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[70%] px-4 py-3 rounded-2xl shadow-sm
                ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 border rounded-bl-sm"
                }
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-xl text-gray-500">
              Chatbot is typing...
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default MessageList;