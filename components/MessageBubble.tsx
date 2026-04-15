'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import Image from 'next/image';
import { Message } from '@/context/ChatContext';

interface MessageBubbleProps {
    message: Message;
    index: number;
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
    const isBot = message.role === 'bot';
    const timeStr = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
            className={`flex items-end gap-2 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            {/* Bot Avatar */}
            {isBot && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md flex-shrink-0 mb-1">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}

            <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[78%]`}>
                {/* Image if present */}
                {message.imageUrl && (
                    <div className="mb-2 rounded-2xl overflow-hidden shadow-md border-2 border-green-200">
                        <Image
                            src={message.imageUrl}
                            alt="Uploaded crop"
                            width={200}
                            height={150}
                            className="object-cover w-48 h-36"
                        />
                    </div>
                )}

                {/* Text bubble */}
                {message.content && (
                    <div
                        className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isBot
                                ? 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                                : 'bg-green-600 text-white rounded-tr-sm'
                            }`}
                        dangerouslySetInnerHTML={{
                            __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                    />
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-gray-400 mt-1 px-1">{timeStr}</span>
            </div>
        </motion.div>
    );
}
