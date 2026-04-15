'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, Send, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useChat } from '@/context/ChatContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ChatWindow() {
    const { t } = useLanguage();
    const { messages, addMessage, pendingText, setPendingText, setIsChatActive } = useChat();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMicActive, setIsMicActive] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    // Pre-fill input from feature card clicks
    useEffect(() => {
        if (pendingText) {
            setInput(pendingText);
            setPendingText('');
        }
    }, [pendingText, setPendingText]);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const getMockResponse = (userInput: string): string => {
        const lower = userInput.toLowerCase();
        if (lower.includes('disease') || lower.includes('ರೋಗ') || lower.includes('blast') || lower.includes('leaf')) {
            return t('crop_disease_response');
        }
        if (lower.includes('yield') || lower.includes('ಇಳುವರಿ') || lower.includes('predict') || lower.includes('harvest')) {
            return t('yield_response');
        }
        return t('generic_response');
    };

    const handleSend = async (text?: string) => {
        const userText = text ?? input.trim();
        if (!userText) return;
        setInput('');

        addMessage({ role: 'user', content: userText });
        setIsTyping(true);

        // Simulate AI response delay
        await new Promise((r) => setTimeout(r, 1400));
        setIsTyping(false);
        addMessage({ role: 'bot', content: getMockResponse(userText) });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);

        addMessage({ role: 'user', content: t('photo_preview'), imageUrl: url });
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            addMessage({ role: 'bot', content: t('analyzing') });
        }, 800);

        setTimeout(() => {
            addMessage({ role: 'bot', content: t('crop_disease_response') });
        }, 2400);

        // Reset input so same file can be uploaded again
        e.target.value = '';
    };

    const handleMic = () => {
        setIsMicActive((prev) => !prev);
        if (!isMicActive) {
            setTimeout(() => {
                setIsMicActive(false);
                setInput(t('type_question').replace('...', ''));
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Chat Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-gradient-to-b from-amber-50/30 to-white/80"
                style={{ minHeight: 0 }}
            >
                {messages.map((msg, i) => (
                    <MessageBubble key={msg.id} message={msg} index={i} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-end gap-2"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md flex-shrink-0">
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex gap-1 items-center">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 bg-green-400 rounded-full"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Upload Photo Button */}
            <div className="px-4 py-2 flex justify-center">
                <motion.button
                    suppressHydrationWarning
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => fileRef.current?.click()}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-2xl shadow-lg flex items-center gap-3 font-semibold text-sm hover:shadow-xl transition-shadow"
                >
                    <motion.div
                        animate={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Camera className="w-5 h-5" />
                    </motion.div>
                    {t('upload_photo')}
                </motion.button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {/* Input Area */}
            <div className="px-4 pb-4 pt-1">
                <div className="flex items-center gap-2 bg-white rounded-2xl shadow-md border border-gray-100 px-4 py-2">
                    {/* Mic Button */}
                    <motion.button
                        suppressHydrationWarning
                        onClick={handleMic}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-xl transition-colors flex-shrink-0 ${isMicActive ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                    >
                        <motion.div
                            animate={isMicActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.6, repeat: isMicActive ? Infinity : 0 }}
                        >
                            <Mic className="w-5 h-5" />
                        </motion.div>
                    </motion.button>

                    <input
                        suppressHydrationWarning
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        onFocus={() => setIsChatActive(true)}
                        onClick={() => setIsChatActive(true)}
                        placeholder={t('type_question')}
                        className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                    />

                    <motion.button
                        suppressHydrationWarning
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${input.trim()
                            ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                            : 'bg-gray-100 text-gray-300'
                            }`}
                    >
                        <Send className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
