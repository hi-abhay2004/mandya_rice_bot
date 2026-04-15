'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useChat } from '@/context/ChatContext';

interface FeatureCardProps {
    icon: React.ReactNode;
    titleKey: string;
    prefillKey: string;
    gradient: string;
    delay?: number;
    onNavigate?: () => void;
}

export default function FeatureCard({
    icon,
    titleKey,
    prefillKey,
    gradient,
    delay = 0,
    onNavigate,
}: FeatureCardProps) {
    const { t } = useLanguage();
    const { setPendingText } = useChat();

    const handleClick = () => {
        setPendingText(t(prefillKey));
        if (onNavigate) onNavigate();
    };

    return (
        <motion.button
            suppressHydrationWarning
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            className="flex-1 min-w-0 relative overflow-hidden rounded-2xl shadow-md bg-white border border-amber-100 p-4 flex flex-col items-center gap-3 cursor-pointer group"
        >
            {/* Gradient blob */}
            <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${gradient}`} />

            {/* Icon Container */}
            <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center shadow-lg`}>
                {icon}
            </div>

            {/* Title */}
            <span className="text-sm font-bold text-green-900 text-center leading-tight">
                {t(titleKey)}
            </span>

            {/* Tap hint */}
            <span className="text-[10px] text-green-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Tap to ask →
            </span>
        </motion.button>
    );
}
