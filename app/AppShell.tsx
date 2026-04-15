'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, BarChart3, Sprout } from 'lucide-react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import ChatWindow from '@/components/ChatWindow';
import BottomNav from '@/components/BottomNav';
import PhotosPage from './photos/PhotosPage';
import { useLanguage } from '@/context/LanguageContext';
import { useChat } from '@/context/ChatContext';

type Tab = 'home' | 'ask' | 'photos';

export default function AppShell() {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const { t } = useLanguage();
    const { messages, addMessage, isChatActive, setIsChatActive } = useChat();
    const hasInitialized = useRef(false);

    // Add initial bot greeting if no messages
    React.useEffect(() => {
        if (!hasInitialized.current && messages.length === 0) {
            hasInitialized.current = true;
            addMessage({
                role: 'bot',
                content: `**${t('hello_farmer')}** ${t('upload_instruction')}`,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    const handleFeatureCardNavigate = () => {
        setActiveTab('ask');
    };

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        if (tab === 'home') {
            setIsChatActive(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#faf7f0]">
            <Header />

            <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col flex-1 min-h-0 overflow-hidden"
                    >
                        {/* Tagline Banner */}
                        <div className="mx-4 mt-4 mb-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-amber-100">
                            <p className="text-xs text-amber-700 text-center font-medium leading-relaxed">
                                {t('tagline')}
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <AnimatePresence>
                            {!isChatActive && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                    className="px-4 mb-4"
                                >
                                    <div className="flex gap-3">
                                        <FeatureCard
                                            icon={
                                                <div className="relative">
                                                    <Sprout className="w-7 h-7 text-white" />
                                                    <Microscope className="w-4 h-4 text-green-100 absolute -bottom-1 -right-1" />
                                                </div>
                                            }
                                            titleKey="crop_disease"
                                            prefillKey="crop_disease_prefill"
                                            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                                            delay={0.1}
                                            onNavigate={handleFeatureCardNavigate}
                                        />
                                        <FeatureCard
                                            icon={
                                                <div className="relative">
                                                    <Sprout className="w-7 h-7 text-white" />
                                                    <BarChart3 className="w-4 h-4 text-amber-100 absolute -bottom-1 -right-1" />
                                                </div>
                                            }
                                            titleKey="yield_prediction"
                                            prefillKey="yield_prefill"
                                            gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                                            delay={0.2}
                                            onNavigate={handleFeatureCardNavigate}
                                        />
                                    </div>

                                    {/* Dot indicator */}
                                    <div className="flex justify-center gap-1 mt-3">
                                        <div className="w-5 h-1.5 bg-green-600 rounded-full" />
                                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Chat section label */}
                        <div className="px-5 mb-2">
                            <p className="text-xs font-bold text-green-800 uppercase tracking-wider">RisaniMitra Chat</p>
                        </div>

                        {/* Chat Window */}
                        <div className="flex-1 min-h-0 flex flex-col">
                            <ChatWindow />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'ask' && (
                    <motion.div
                        key="ask"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col flex-1 min-h-0 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-2">
                            <h2 className="text-lg font-bold text-green-900">Ask RisaniMitra</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Your AI farming assistant</p>
                        </div>
                        <div className="flex-1 min-h-0 flex flex-col">
                            <ChatWindow />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'photos' && (
                    <motion.div
                        key="photos"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="flex-1 overflow-y-auto"
                    >
                        <PhotosPage />
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
    );
}
