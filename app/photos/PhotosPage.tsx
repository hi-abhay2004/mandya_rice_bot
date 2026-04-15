'use client';

import React, { useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Camera, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function PhotosPage() {
    const { messages } = useChat();
    const { t } = useLanguage();
    const fileRef = useRef<HTMLInputElement>(null);
    const { addMessage } = useChat();

    const photoMessages = messages.filter((m) => m.imageUrl);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        addMessage({ role: 'user', content: t('photo_preview'), imageUrl: url });
        e.target.value = '';
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-green-900">{t('my_crops')}</h2>
                    <p className="text-xs text-gray-500">{photoMessages.length} photos analyzed</p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.04 }}
                    onClick={() => fileRef.current?.click()}
                    className="bg-green-600 text-white px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm font-semibold"
                >
                    <Camera className="w-4 h-4" />
                    {t('upload_photo')}
                </motion.button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {photoMessages.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <Leaf className="w-12 h-12 text-green-300" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">{t('no_photos')}</p>
                    <p className="text-gray-300 text-xs mt-1">Upload crop photos for AI analysis</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {photoMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.07 }}
                            className="rounded-2xl overflow-hidden shadow-md bg-white border border-green-50 group relative"
                        >
                            <div className="relative w-full h-36">
                                <Image
                                    src={msg.imageUrl!}
                                    alt="Crop photo"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="px-3 py-2">
                                <p className="text-[10px] font-semibold text-green-700 truncate">Crop Analysis #{i + 1}</p>
                                <p className="text-[9px] text-gray-400">
                                    {msg.timestamp.toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
