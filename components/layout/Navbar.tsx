"use client";

import React, { useState } from 'react';
import { Menu, X } from '../ui/icons';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab, setActiveTab, setIsOrderModalOpen } = useStore();
    const router = useRouter();
    const pathname = usePathname();

    const navItems = ["Home", "About", "Recipes", "Blogs", "Contact"];

    const handleNavClick = (item: string) => {
        setActiveTab(item);
        setIsOpen(false);
        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
        router.push(path);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-orange-50/95 backdrop-blur-md z-50 shadow-sm border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('Home')}>
                        <img src="https://i.ibb.co/0RbyMnzS/1.png" alt="Addy Meals" className="h-20 w-auto object-contain" />
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`text-lg font-medium transition-colors duration-200 px-3 py-1 rounded-full ${activeTab === item ? 'text-orange-600 bg-orange-100' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => setIsOrderModalOpen(true)}
                            className="px-6 py-2 bg-orange-600 text-white rounded-full font-bold shadow-md hover:bg-orange-700 transition-colors transform hover:scale-105 flex items-center"
                        >
                            ORDER NOW
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white border-b border-orange-100 absolute w-full z-50">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => { setIsOrderModalOpen(true); setIsOpen(false); }}
                            className="block w-full text-center px-3 py-3 mt-2 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-md"
                        >
                            ORDER NOW
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
