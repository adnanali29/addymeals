"use client";

import React from 'react';
import { User, ChefHat } from '@/components/ui/icons';

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900">About <span className="text-orange-600">Addy Meals</span></h1>
                <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">Addy Meals is a nutrition-first food platform built to make healthy, balanced Indian meals accessible and affordable for everyday life. We bridge the gap between traditional Indian meals and modern nutritional science.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-orange-100 flex flex-col justify-center hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><User className="mr-3 text-orange-500" /> Who We Serve</h2>
                    <ul className="space-y-5">
                        {["College students looking for affordable, filling alternatives", "Working professionals needing nutritious food without cooking", "Families seeking consistent, balanced Indian meals", "Fitness-focused individuals aligning Indian food with goals"].map((item, idx) => (
                            <li key={idx} className="flex items-start bg-orange-50 p-3 rounded-xl hover:bg-orange-100 transition-colors">
                                <div className="bg-white p-1 rounded-full mr-3 mt-0.5 shadow-sm">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <span className="text-gray-700 text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-orange-600 rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-center group">
                    <div className="absolute top-0 right-0 p-4 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">🥗</div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><ChefHat className="mr-3" /> What We Do</h3>
                    <div className="space-y-6 relative z-10">
                        <div>
                            <h4 className="font-bold text-xl text-orange-100 mb-2">1. Healthy Indian Meals</h4>
                            <p className="text-orange-50 opacity-90">Balanced in protein, carbohydrates, and fats. Portion-controlled and cooked using mindful techniques.</p>
                        </div>
                        <div className="w-full h-px bg-orange-500"></div>
                        <div>
                            <h4 className="font-bold text-xl text-orange-100 mb-2">2. Functional Products</h4>
                            <p className="text-orange-50 opacity-90">In-house formulated Chia Jiya, Basil Pops, and Tonic Shots designed to support immunity.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900 text-white p-10 rounded-[2rem] hover:scale-[1.02] transition-transform shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-orange-400">Our Vision</h2>
                    <p className="text-lg leading-relaxed opacity-90">To build India’s most trusted nutrition-led food brand—where healthy eating becomes a simple, sustainable part of everyday life.</p>
                </div>
                <div className="bg-white border-2 border-gray-100 text-gray-800 p-10 rounded-[2rem] hover:scale-[1.02] transition-transform shadow-sm hover:border-orange-200">
                    <h2 className="text-2xl font-bold mb-4 text-orange-600">Our Mission</h2>
                    <p className="text-lg leading-relaxed">To provide affordable, balanced Indian meals and functional nutrition products that empower people to eat better, live healthier, and make informed food choices.</p>
                </div>
            </div>
        </div>
    );
}
