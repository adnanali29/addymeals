"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X } from '@/components/ui/icons';
import { Category, CategoryItem } from '@/lib/supabase/types';

interface ExtendedCategory extends Category {
    items?: CategoryItem[];
}

export const CategoriesView = () => {
    const [categories, setCategories] = useState<ExtendedCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCatName, setNewCatName] = useState("");
    const [newCatEmoji, setNewCatEmoji] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (err) {
            console.error("Fetch categories error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName || !newCatEmoji) return;

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCatName, emoji: newCatEmoji })
            });

            if (res.ok) {
                setNewCatName("");
                setNewCatEmoji("");
                fetchCategories();
            } else {
                const err = await res.json();
                alert("Failed to add category: " + (err.error || 'Server error'));
            }
        } catch (err: any) {
            console.error("Add category error:", err);
            alert("Failed to add category");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (confirm('Are you sure? This will delete all items in this category.')) {
            try {
                const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchCategories();
                } else {
                    const err = await res.json();
                    alert("Failed to delete category: " + (err.error || 'Server error'));
                }
            } catch (err) {
                console.error("Delete category error:", err);
                alert("Failed to delete category");
            }
        }
    };

    const handleAddItem = async (catId: string, itemName: string) => {
        if (!itemName) return;
        try {
            const res = await fetch('/api/category-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category_id: catId, item_name: itemName })
            });

            if (res.ok) {
                fetchCategories();
            } else {
                const err = await res.json();
                alert("Failed to add item: " + (err.error || 'Server error'));
            }
        } catch (err) {
            console.error("Add item error:", err);
            alert("Failed to add item");
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            const res = await fetch(`/api/category-items/${itemId}`, { method: 'DELETE' });
            if (res.ok) {
                fetchCategories();
            } else {
                const err = await res.json();
                alert("Failed to delete item: " + (err.error || 'Server error'));
            }
        } catch (err) {
            console.error("Delete item error:", err);
            alert("Failed to delete item");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-[2rem] border border-orange-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-4">
                    <input
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        placeholder="Category Name"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none font-medium"
                    />
                    <input
                        value={newCatEmoji}
                        onChange={e => setNewCatEmoji(e.target.value)}
                        placeholder="Emoji (e.g. 🌱)"
                        className="w-full sm:w-40 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none text-center"
                    />
                    <button type="submit" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-colors">
                        Add Category
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {categories.map(cat => (
                        <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-orange-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-xl flex items-center gap-2">
                                    <span className="bg-orange-50 w-10 h-10 flex items-center justify-center rounded-lg">{cat.emoji}</span> {cat.name}
                                </h3>
                                <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="space-y-2 mb-4 flex-1">
                                {cat.items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 px-3 py-2.5 rounded-xl text-sm group border border-transparent hover:border-orange-100 transition-all">
                                        <span className="font-bold text-gray-700">{item.item_name}</span>
                                        <button onClick={() => handleDeleteItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {(!cat.items || cat.items.length === 0) && (
                                    <div className="py-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No items found</p>
                                    </div>
                                )}
                            </div>
                            <form
                                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();
                                    const form = e.currentTarget;
                                    const formData = new FormData(form);
                                    const val = formData.get('item')?.toString().trim();

                                    if (!val) return;

                                    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                                    if (btn) btn.disabled = true;

                                    await handleAddItem(cat.id, val);

                                    form.reset();
                                    if (btn) btn.disabled = false;
                                }}
                                className="flex gap-2"
                            >
                                <input name="item" placeholder="Type item name..." className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-orange-500 outline-none bg-gray-50 focus:bg-white transition-all font-bold" required />
                                <button type="submit" className="bg-gray-900 text-white w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-600 transition-colors shadow-lg active:scale-95 disabled:opacity-50">
                                    <Plus size={20} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
