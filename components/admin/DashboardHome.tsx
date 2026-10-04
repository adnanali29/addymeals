"use client";

import React, { useEffect, useState } from 'react';
import { IndianRupee, ShoppingBag, Lightbulb, TrendingUp } from '@/components/ui/icons';


export const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        bestSellers: [] as { name: string, count: number }[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const res = await fetch('/api/dashboard');
            const orders = res.ok ? await res.json() : null;

            if (orders) {
                const total = orders.reduce((acc: number, o: any) => acc + Number(o.total_amount), 0);
                const active = orders.filter((o: any) => o.status === 'Pending').length;

                // Calculate best sellers from JSON items
                const itemCounts: Record<string, number> = {};
                orders.forEach((o: any) => {
                    const items = o.items as any[];
                    if (Array.isArray(items)) {
                        items.forEach(item => {
                            itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.qty || 1);
                        });
                    }
                });

                const sellers = Object.entries(itemCounts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3);

                setStats({ totalSales: total, activeOrders: active, bestSellers: sellers });
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-orange-500 text-white p-8 rounded-[2.5rem] shadow-xl shadow-orange-100 relative overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300">
                    <div className="relative z-10">
                        <p className="text-orange-100 font-black text-[10px] uppercase tracking-widest mb-2 opacity-80">Total Sales Volume</p>
                        <h3 className="text-4xl font-black">₹ {stats.totalSales.toLocaleString()}</h3>
                    </div>
                    <div className="absolute -right-8 -bottom-8 opacity-10 text-white transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                        <IndianRupee size={160} />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-orange-50 shadow-sm relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Active Orders</p>
                            <h3 className="text-4xl font-black text-gray-800">{stats.activeOrders}</h3>
                        </div>
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl shadow-inner">
                            <ShoppingBag size={28} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Real-time status</span>
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="bg-orange-500 p-2 rounded-lg text-white shadow-lg"><Lightbulb size={20} /></div>
                        <h3 className="font-black text-xs uppercase tracking-widest opacity-80">Chef AI Insights</h3>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 relative z-10">
                        {stats.bestSellers.length > 0 ? (
                            <>Demand for <b className="text-orange-400">{stats.bestSellers[0].name}</b> is high today. Consider increasing prep levels for the evening rush.</>
                        ) : (
                            <>Welcome back Chef! Start by adding some recipes or items to see your daily business insights here.</>
                        )}
                    </p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-orange-50 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-gray-800 uppercase tracking-[0.2em] text-xs flex items-center gap-3">
                        <TrendingUp size={18} className="text-orange-500" /> Performance Leaders
                    </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {stats.bestSellers.map((item, i) => (
                        <div key={i} className="flex flex-col p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-orange-100 transition-all hover:bg-white hover:shadow-lg group">
                            <div className="flex items-center justify-between mb-4">
                                <span className="bg-white shadow-sm w-10 h-10 flex items-center justify-center rounded-xl font-black text-orange-500">#{i + 1}</span>
                                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Popular Choice</div>
                            </div>
                            <h4 className="font-black text-gray-800 text-lg group-hover:text-orange-600 transition-colors">{item.name}</h4>
                            <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">{item.count} items sold</p>
                        </div>
                    ))}
                    {stats.bestSellers.length === 0 && (
                        <div className="col-span-3 py-10 text-center text-gray-400 italic font-bold">Waiting for your first few orders to track performance...</div>
                    )}
                </div>
            </div>
        </div>
    );
};
