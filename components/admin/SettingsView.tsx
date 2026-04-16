"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, IndianRupee, Save, Zap } from '@/components/ui/icons';
import { supabase } from '@/lib/supabase/client';
import { InstantMenuItem } from '@/lib/supabase/types';

export const SettingsView = () => {
    const [menuItems, setMenuItems] = useState<InstantMenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', note: '' });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('instant_menu')
            .select('*')
            .order('display_order', { ascending: true });
        if (data) setMenuItems(data);
        setLoading(false);
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMenuItem.name || !newMenuItem.price) return;

        const { error } = await supabase
            .from('instant_menu')
            .insert([{
                name: newMenuItem.name,
                price: parseFloat(newMenuItem.price),
                note: newMenuItem.note,
                available: true
            }]);

        if (error) {
            alert("Error adding menu item: " + error.message);
        } else {
            setNewMenuItem({ name: '', price: '', note: '' });
            fetchMenuItems();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this menu item?')) {
            const { error } = await supabase.from('instant_menu').delete().eq('id', id);
            if (!error) fetchMenuItems();
        }
    };

    const toggleAvailability = async (id: string, current: boolean) => {
        const { error } = await supabase
            .from('instant_menu')
            .update({ available: !current })
            .eq('id', id);
        if (!error) fetchMenuItems();
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-8 rounded-[2.5rem] border border-orange-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-100">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-800">Instant Menu Manager</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">Manage items available in the "Order Now" modal</p>
                    </div>
                </div>

                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1 block">Item Name</label>
                        <input
                            value={newMenuItem.name}
                            onChange={e => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                            placeholder="e.g., Fire Chick Rice"
                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1 block">Price (₹)</label>
                        <input
                            type="number"
                            value={newMenuItem.price}
                            onChange={e => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                            placeholder="169"
                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1 block">Note / Variant</label>
                        <input
                            value={newMenuItem.note}
                            onChange={e => setNewMenuItem({ ...newMenuItem, note: e.target.value })}
                            placeholder="e.g., / 220 ML"
                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                        />
                    </div>
                    <div className="md:col-span-4 flex justify-end pt-2">
                        <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all flex items-center gap-3 active:scale-95">
                            <Plus size={18} /> Add to Live Menu
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-orange-50 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                        <tr>
                            <th className="px-8 py-5">Availability</th>
                            <th className="px-8 py-5">Item Details</th>
                            <th className="px-8 py-5 text-right">Price</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-20 text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div></td></tr>
                        ) : menuItems.length === 0 ? (
                            <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No items in the instant menu yet.</td></tr>
                        ) : (
                            menuItems.map(item => (
                                <tr key={item.id} className="hover:bg-orange-50/20 transition-colors group">
                                    <td className="px-8 py-5">
                                        <button
                                            onClick={() => toggleAvailability(item.id, item.available)}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${item.available ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-700'}`}
                                        >
                                            {item.available ? '● LIVE' : '○ DISABLED'}
                                        </button>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-800">{item.name}</div>
                                        {item.note && <div className="text-[10px] text-orange-600 font-bold mt-0.5">{item.note}</div>}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1 font-black text-gray-900">
                                            <IndianRupee size={14} /> {item.price}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
