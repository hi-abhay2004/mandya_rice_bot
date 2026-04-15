'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BottomNavProps {
    activeTab: 'home' | 'ask' | 'photos';
    onTabChange: (tab: 'home' | 'ask' | 'photos') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const { t } = useLanguage();

    const tabs = [
        { key: 'home' as const, icon: Home, labelKey: 'home' },
        { key: 'ask' as const, icon: MessageCircle, labelKey: 'ask' },
        { key: 'photos' as const, icon: ImageIcon, labelKey: 'photos' },
    ];

    return (
        <nav className="sticky bottom-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-around px-2 py-1">
                {tabs.map(({ key, icon: Icon, labelKey }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            suppressHydrationWarning
                            key={key}
                            onClick={() => onTabChange(key)}
                            className="flex-1 flex flex-col items-center gap-1 py-2 relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-600 rounded-full"
                                />
                            )}
                            <div
                                className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-green-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                />
                            </div>
                            <span
                                className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'
                                    }`}
                            >
                                {t(labelKey)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
