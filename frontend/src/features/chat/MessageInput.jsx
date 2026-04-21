import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState(""); // Remove <string> type annotation
  const inputRef = useRef(null);

  // Auto-focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-focus after message is sent (when disabled becomes false)
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
      // Keep focus after sending
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // We can safely trigger submit behavior here:
      if (input.trim()) {
        onSendMessage(input);
        setInput("");
        // Keep focus after sending via Enter key
        inputRef.current?.focus();
      }
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          {/* Input Field */}
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <button
              type="button"
              disabled={disabled}
              className="p-1 text-gray-500 hover:text-red-700 disabled:opacity-50 transition-colors"
            >
              <Paperclip size={20} />
            </button>

            <input
              ref={inputRef} // Add this ref to the input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500 disabled:opacity-50"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="p-2 bg-gradient-to-r from-red-700 to-amber-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={20} />
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-2">Press Shift+Enter for new line</p>
      </div>
    </div>
  );
};

export default MessageInput;