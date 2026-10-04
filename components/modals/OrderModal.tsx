"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Phone, Minus, Plus } from '../ui/icons';
import { useStore } from '@/lib/store';
import { InstantMenuItem } from '@/lib/supabase/types';

export const OrderModal = () => {
    const { isOrderModalOpen, setIsOrderModalOpen } = useStore();
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
    const [menuItems, setMenuItems] = useState<InstantMenuItem[]>([]);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOrderModalOpen) {
            fetchMenu();
        } else {
            setStep(1);
            setCart({});
        }
    }, [isOrderModalOpen]);

    const fetchMenu = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/instant-menu');
            if (res.ok) {
                const data: InstantMenuItem[] = await res.json();
                setMenuItems(data.filter(item => item.available));
            }
        } catch (err) {
            console.error("Fetch menu error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = () => (userDetails.name && userDetails.phone && userDetails.email) ? setStep(2) : alert("Please fill in all details.");

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prev => {
            const currentQty = prev[itemId] || 0;
            const newQty = Math.max(0, currentQty + delta);
            if (newQty === 0) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemId]: newQty };
        });
    };

    const handleOrder = async () => {
        const selectedItems = menuItems.filter(item => cart[item.id] > 0);
        if (selectedItems.length === 0) { alert("Please select at least one item."); return; }

        const total = selectedItems.reduce((acc, item) => acc + (Number(item.price) * cart[item.id]), 0);
        const itemSummaries = selectedItems.map(item => ({
            name: item.name,
            price: item.price,
            qty: cart[item.id]
        }));

        // 1. Save to NeonDB via API
        let orderData: any = null;
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_name: `${userDetails.name} | Pickup`,
                    customer_phone: userDetails.phone,
                    customer_email: userDetails.email,
                    items: itemSummaries,
                    total_amount: total,
                    status: 'Pending'
                })
            });
            if (res.ok) {
                orderData = await res.json();
            }
        } catch (err) {
            console.error("Order save error:", err);
        }

        const orderId = orderData?.id?.slice(0, 6).toUpperCase() || 'NEW';

        // 2. Open WhatsApp (Clean text format for maximum compatibility)
        let message = `*ADDY MEALS - ORDER #${orderId}*\n`;
        message += `==============================\n\n`;

        message += `*CUSTOMER INFO*\n`;
        message += `Name: ${userDetails.name}\n`;
        message += `Phone: ${userDetails.phone}\n`;
        message += `Email: ${userDetails.email}\n`;
        message += `Type: PICKUP ONLY\n\n`;

        message += `*ITEMS ORDERED*\n`;
        selectedItems.forEach(item => {
            const qty = cart[item.id];
            const itemTotal = Number(item.price) * qty;
            message += `- ${item.name} x ${qty} [Rs ${itemTotal}]\n`;
        });

        message += `\n*TOTAL AMOUNT: Rs ${total}*\n`;
        message += `==============================\n\n`;
        message += `Please confirm this order to proceed.`;

        window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9861787335'}?text=${encodeURIComponent(message)}`, '_blank');
        setIsOrderModalOpen(false);
    };

    if (!isOrderModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsOrderModalOpen(false)}></div>
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg max-h-[85vh] overflow-hidden relative z-10 shadow-2xl flex flex-col animate-fade-in border border-orange-100/50">
                <div className="bg-orange-500 p-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black flex items-center gap-3">
                            <ShoppingBag size={28} /> {step === 1 ? "Details" : "Insta Order"}
                        </h2>
                        <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mt-1">{step === 1 ? "Step 1 of 2: Who are you?" : "Step 2 of 2: What are we eating?"}</p>
                    </div>
                    <button onClick={() => setIsOrderModalOpen(false)} className="relative z-10 p-2 hover:bg-orange-600 rounded-full transition-colors"><X size={28} /></button>
                </div>

                {step === 1 ? (
                    <div className="p-10 flex flex-col gap-6 overflow-y-auto">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none font-bold text-gray-800 transition-all" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <input type="tel" name="phone" value={userDetails.phone} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none font-bold text-gray-800 transition-all" placeholder="Enter your phone number" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none font-bold text-gray-800 transition-all" placeholder="Enter your email address" />
                        </div>

                        <button onClick={handleNext} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl mt-4 shadow-xl shadow-orange-100 transition-all transform hover:-translate-y-1 active:scale-95">Next Step</button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-8 space-y-5 no-scrollbar">
                            {loading ? (
                                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div></div>
                            ) : (
                                menuItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[2rem] border border-transparent hover:border-orange-100 transition-all">
                                        <div className="flex-1">
                                            <h3 className="font-black text-gray-800">{item.name}</h3>
                                            <p className="text-xs text-orange-600 font-bold flex items-center gap-2">₹{item.price} {item.note && <span className="bg-orange-100 text-[10px] px-2 py-0.5 rounded-full">{item.note}</span>}</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white rounded-full px-2 py-2 shadow-sm border border-gray-100">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors" disabled={!cart[item.id]}><Minus size={16} /></button>
                                            <span className="font-black w-6 text-center text-gray-800">{cart[item.id] || 0}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200 transition-transform active:scale-90"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Total Estimate</span>
                                <span className="text-3xl font-black text-gray-900">₹{menuItems.reduce((acc, item) => acc + (Number(item.price) * (cart[item.id] || 0)), 0)}</span>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="px-8 py-5 bg-white text-gray-400 font-black text-xs uppercase tracking-widest rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors">Back</button>
                                <button onClick={handleOrder} className="flex-1 bg-green-600 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all transform hover:-translate-y-1 active:scale-95">
                                    <Phone size={20} /> Send on WhatsApp
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
