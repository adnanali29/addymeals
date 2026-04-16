"use client";

import React, { useState } from 'react';

export const MagicStove = () => {
    const [isLit, setIsLit] = useState(false);
    return (
        <div
            className="relative w-72 h-60 mx-auto cursor-pointer transition-all duration-300 hover:scale-105 group"
            onMouseEnter={() => setIsLit(true)}
            onMouseLeave={() => setIsLit(false)}
        >
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gray-800 rounded-2xl shadow-2xl border-b-8 border-gray-900 flex justify-center items-center z-10">
                <div className="flex space-x-8">
                    <div className={`w-8 h-8 rounded-full border-4 border-gray-600 transition-all duration-500 shadow-inner ${isLit ? 'rotate-90 bg-orange-500 border-orange-700' : 'bg-gray-300'}`}>
                        <div className="w-1 h-3 bg-gray-600 mx-auto mt-0.5 rounded-full"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-4 border-gray-600 shadow-inner">
                        <div className="w-1 h-3 bg-gray-600 mx-auto mt-0.5 rounded-full"></div>
                    </div>
                </div>
                <div className="absolute top-2 w-full flex justify-center space-x-16 px-4">
                    <div className="w-24 h-4 bg-gray-900 rounded-full opacity-50"></div>
                    <div className="w-24 h-4 bg-gray-900 rounded-full opacity-50"></div>
                </div>
            </div>
            <div className="absolute bottom-24 w-full flex justify-center items-end h-32">
                <div className="relative">
                    <div className="w-40 h-3 bg-gray-700 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg"></div>
                    <div className={`transition-all duration-1000 ease-in-out transform origin-bottom ${isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="relative w-24 h-28 -mt-2">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-t from-blue-600 to-orange-500 rounded-t-[100%] blur-sm opacity-80 animate-pulse"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-yellow-300 rounded-t-[100%] blur-sm opacity-90"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-blue-400 rounded-t-[100%] blur-md opacity-70"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`absolute -top-12 w-full flex justify-center transition-all duration-300 transform ${isLit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className={`relative px-6 py-2 rounded-full shadow-lg overflow-hidden border-2 ${isLit ? 'animate-sizzle border-transparent' : 'bg-white border-orange-200'}`}>
                    <span className={`relative z-10 text-sm font-extrabold flex items-center gap-2 ${isLit ? 'text-white' : 'text-orange-600'}`}>🔥 Sizzle & Serve!</span>
                </div>
            </div>
        </div>
    );
};
