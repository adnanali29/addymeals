"use client";

import React, { useEffect, useState } from 'react';
import { Flame, Download } from '@/components/ui/icons';
import { supabase } from '@/lib/supabase/client';
import { Recipe } from '@/lib/supabase/types';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data } = await supabase
                .from('recipes')
                .select('*')
                .eq('status', 'Active')
                .order('created_at', { ascending: false });

            if (data) setRecipes(data);
            setLoading(false);
        };
        fetchRecipes();
    }, []);

    const handleDownload = (recipe: Recipe) => {
        if (recipe.pdf_url) {
            window.open(recipe.pdf_url, '_blank');
        } else {
            alert("Digital recipe card coming soon! We are currently uploading our nutrition guides.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-gray-900 mb-4">Recipe & Nutrition Cards</h1>
                <p className="text-gray-500 font-medium max-w-2xl mx-auto">Download our expert-crafted nutrition guides to help you cook healthy, balanced Addy-style meals at home.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            ) : recipes.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold text-xl">
                    New recipe cards arriving soon! 🥦
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white rounded-[2.5rem] shadow-md border border-gray-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col relative">
                            <div className={`h-48 w-full ${recipe.type === 'Veg' ? 'bg-green-50' : recipe.type === 'Non-Veg' ? 'bg-orange-50' : 'bg-purple-50'} flex items-center justify-center relative overflow-hidden`}>
                                {recipe.image_url ? (
                                    <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <span className="text-7xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-500">{recipe.type === 'Veg' ? '🥦' : '🍖'}</span>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    {recipe.type}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="font-extrabold text-xl mb-3 text-gray-900 leading-tight h-14 overflow-hidden">{recipe.title}</h3>
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg flex items-center text-xs font-black uppercase tracking-wider">
                                        <Flame size={14} className="mr-1" /> {recipe.calories}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownload(recipe)}
                                    className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl hover:bg-orange-600 transition-all font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                                >
                                    <Download size={18} /> Download Card
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
