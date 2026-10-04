"use client";

import React, { useState, useEffect } from 'react';
import { Trash2 } from '@/components/ui/icons';
import { Order } from '@/lib/supabase/types';

export const OrdersView = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (err) {
            console.error("Fetch orders error:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'Pending' ? 'Paid' : currentStatus === 'Paid' ? 'Cancelled' : 'Pending';
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            });
            if (res.ok) {
                fetchOrders();
            } else {
                const err = await res.json();
                alert("Failed to update status: " + (err.error || 'Server error'));
            }
        } catch (err) {
            console.error("Update order status error:", err);
            alert("Failed to update status");
        }
    };

    const handleDeleteOrder = async (id: string) => {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchOrders();
                } else {
                    const err = await res.json();
                    alert("Failed to delete order: " + (err.error || 'Server error'));
                }
            } catch (err) {
                console.error("Delete order error:", err);
                alert("Failed to delete order");
            }
        }
    };

    const formatItems = (items: any) => {
        if (!items) return "No items";
        if (typeof items === 'string') return items;
        if (Array.isArray(items)) {
            return items.map((i: any) => `${i.name} x${i.qty}`).join(', ');
        }
        return JSON.stringify(items);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800">Orders Log</h2>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-3xl border border-orange-50">
                    No orders found yet.
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-orange-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-orange-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5">Customer</th>
                                    <th className="px-6 py-5">Details</th>
                                    <th className="px-6 py-5 text-right">Amount</th>
                                    <th className="px-6 py-5 text-right">Date</th>
                                    <th className="px-6 py-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() => toggleStatus(order.id, order.status || 'Pending')}
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {order.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-gray-800">{order.customer_name}</div>
                                            <div className="text-[10px] text-gray-400 font-bold">{order.customer_phone}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-xs text-gray-600 font-medium line-clamp-1 max-w-xs">{formatItems(order.items)}</div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-black text-gray-900">₹{order.total_amount}</td>
                                        <td className="px-6 py-5 text-right text-[10px] text-gray-400 font-bold">
                                            {new Date(order.created_at || '').toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="text-gray-300 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                title="Delete Order"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
