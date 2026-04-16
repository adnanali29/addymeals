"use client";

import React from 'react';
import { ArrowRight } from '../ui/icons';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export const Footer = () => {
    const { setActiveTab } = useStore();
    const router = useRouter();

    const handleAdminClick = () => {
        router.push('/admin');
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-10 w-full relative z-10 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center text-white mb-4">
                        <img
                            src="https://i.ibb.co/KxYvn1Yk/2.png"
                            alt="Addy Meals"
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <p className="text-sm opacity-70 leading-relaxed mb-4">
                        Healthy, affordable Indian meals for students, professionals, and families. Bridging tradition with nutrition.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {["Home", "About", "Recipes", "Blogs", "Contact"].map(item => (
                            <li key={item} onClick={() => { setActiveTab(item); router.push(item === 'Home' ? '/' : `/${item.toLowerCase()}`); }} className="cursor-pointer hover:text-orange-500 transition-colors flex items-center">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 text-lg">Products</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li className="hover:text-white transition-colors cursor-pointer">Chia Jiya</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Basil Pops</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Tonic Shots</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Ready-to-Eat Meals</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 text-lg">Newsletter</h4>
                    <p className="text-xs opacity-60 mb-3">Get nutrition tips and weekly menu updates.</p>
                    <div className="flex">
                        <input type="text" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none text-sm w-full border border-gray-700 focus:border-orange-600" />
                        <button className="bg-orange-600 px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors">
                            <ArrowRight size={16} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-center text-sm opacity-60">
                © 2025 Addy Meals. All rights reserved. Made with ❤️ by <a href="https://www.pixelwebpages.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">pixel web pages</a> | <span onClick={handleAdminClick} className="cursor-pointer hover:text-orange-500 transition-colors">Admin</span>
            </div>
        </footer>
    );
};
