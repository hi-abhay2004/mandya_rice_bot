'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const { t, lang, setLang } = useLanguage();

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Menu + Logo */}
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-xl hover:bg-green-50 transition-colors" aria-label="Menu">
                        <Menu className="w-5 h-5 text-green-800" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-green-900 leading-tight">{t('app_name')}</p>
                            <p className="text-[10px] text-green-600 leading-tight">Mandya Raita Mitra</p>
                        </div>
                    </div>
                </div>

                {/* Right: Language Toggle */}
                <div className="flex items-center bg-amber-50 border border-amber-200 rounded-full p-0.5">
                    <motion.button
                        suppressHydrationWarning
                        onClick={() => setLang('en')}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${lang === 'en'
                            ? 'bg-green-600 text-white shadow-sm'
                            : 'text-amber-800 hover:bg-amber-100'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        EN
                    </motion.button>
                    <motion.button
                        suppressHydrationWarning
                        onClick={() => setLang('kn')}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${lang === 'kn'
                            ? 'bg-green-600 text-white shadow-sm'
                            : 'text-amber-800 hover:bg-amber-100'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        ಕನ್ನಡ
                    </motion.button>
                </div>
            </div>
        </header>
    );
}
