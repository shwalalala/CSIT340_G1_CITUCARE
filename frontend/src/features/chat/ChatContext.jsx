import React, { createContext, useContext, useState, useCallback } from "react";

// Remove type annotations and keep only the structure
// ChatMessage type is removed - use plain objects instead

// Create context without TypeScript generic type
const ChatContext = createContext(undefined);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const setErrorMessage = useCallback((errorMsg) => {
    setError(errorMsg);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    selectedCategory,
    setSelectedCategory,
    categories,
    setCategories,
    error,
    setErrorMessage,
    clearError,
    addMessage,
    clearMessages,
    user,
    setUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};