"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Settings, Trash2, ChefHat, X, UploadCloud, ImageIcon } from '@/components/ui/icons';
import { Recipe } from '@/lib/supabase/types';

export const RecipesView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        const res = await fetch('/api/recipes');
        if (res.ok) setRecipes(await res.json());
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this recipe?')) {
            const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
            if (!res.ok) alert('Failed to delete recipe');
            else fetchRecipes();
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const recipeData = {
            title: formData.get('title') as string,
            calories: formData.get('calories') as string,
            type: formData.get('type') as any,
            image_url: formData.get('image_url') as string,
            status: 'Active'
        };

        if (editingRecipe) {
            const res = await fetch(`/api/recipes/${editingRecipe.id}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recipeData)
            });
            if (!res.ok) alert('Failed to update recipe');
            else { setIsModalOpen(false); setEditingRecipe(null); fetchRecipes(); }
        } else {
            const res = await fetch('/api/recipes', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recipeData)
            });
            if (!res.ok) alert('Failed to add recipe');
            else { setIsModalOpen(false); fetchRecipes(); }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Recipe Manager</h2>
                </div>
                <button
                    onClick={() => { setEditingRecipe(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg"
                >
                    <Plus size={20} /> Add Recipe
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : recipes.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-3xl border border-orange-50">
                    No recipes found. Add your first one!
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="bg-white p-4 rounded-[2rem] border border-orange-100 shadow-sm flex items-start gap-5 hover:shadow-xl transition-all">
                            <div className={`w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl shadow-inner ${recipe.type === 'Veg' ? 'bg-green-50' : recipe.type === 'Non-Veg' ? 'bg-red-50' : 'bg-purple-50'}`}>
                                {recipe.image_url ? (
                                    <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <span>{recipe.type === 'Veg' ? '🥦' : '🍖'}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{recipe.title}</h3>
                                        <p className="text-sm text-gray-500">{recipe.calories} • {recipe.type}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setEditingRecipe(recipe); setIsModalOpen(true); }}
                                            className="p-2 bg-gray-50 rounded-lg hover:text-orange-500 transition-colors"
                                        >
                                            <Settings size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(recipe.id)} className="p-2 bg-gray-50 rounded-lg hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in shadow-black/20">
                        <div className="bg-orange-500 p-6 flex justify-between items-center text-white">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <ChefHat size={24} /> {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
                            </h3>
                            <button onClick={() => { setIsModalOpen(false); setEditingRecipe(null); }} className="hover:bg-orange-600 p-2 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Recipe Name</label>
                                <input name="title" defaultValue={editingRecipe?.title} type="text" placeholder="e.g., Keto Salad Bowl" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Calories</label>
                                    <input name="calories" defaultValue={editingRecipe?.calories} type="text" placeholder="e.g., 350 kcal" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Type</label>
                                    <select name="type" defaultValue={editingRecipe?.type || 'Veg'} className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium text-gray-700">
                                        <option value="Veg">Vegetarian</option>
                                        <option value="Non-Veg">Non-Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Image URL</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input name="image_url" defaultValue={editingRecipe?.image_url || ''} type="url" placeholder="https://..." className="w-full pl-12 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-gray-200">
                                {editingRecipe ? 'Update Recipe' : 'Publish Recipe Card'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
