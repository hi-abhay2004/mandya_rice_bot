'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Message {
    id: string;
    role: 'bot' | 'user';
    content: string;
    imageUrl?: string;
    timestamp: Date;
}

interface ChatContextType {
    messages: Message[];
    addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
    clearMessages: () => void;
    pendingText: string;
    setPendingText: (text: string) => void;
    isChatActive: boolean;
    setIsChatActive: (active: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({
    messages: [],
    addMessage: () => { },
    clearMessages: () => { },
    pendingText: '',
    setPendingText: () => { },
    isChatActive: false,
    setIsChatActive: () => { },
});

const STORAGE_KEY = 'raita_mitra_chat';

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [pendingText, setPendingText] = useState('');
    const [isChatActive, setIsChatActive] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Message[];
                const restored = parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
                setMessages(restored);
            }
        } catch {
            // ignore
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
        const newMsg: Message = {
            ...msg,
            id: crypto.randomUUID(),
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMsg]);
    };

    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, clearMessages, pendingText, setPendingText, isChatActive, setIsChatActive }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
