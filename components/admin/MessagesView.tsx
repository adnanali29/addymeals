"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Trash2, Mail, Phone, Calendar } from '@/components/ui/icons';
import { supabase } from '@/lib/supabase/client';
import { Message } from '@/lib/supabase/types';

export const MessagesView = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setMessages(data);
        setLoading(false);
    };

    const deleteMessage = async (id: string) => {
        if (confirm('Archive this message?')) {
            const { error } = await supabase.from('messages').delete().eq('id', id);
            if (!error) {
                fetchMessages();
                setSelectedMessage(null);
            }
        }
    };

    const updateStatus = async (id: string, isRead: boolean) => {
        const { error } = await supabase
            .from('messages')
            .update({ status: isRead ? 'Read' : 'New' })
            .eq('id', id);
        if (!error) fetchMessages();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800">Inquiries</h2>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-3xl border border-orange-50">
                    No messages found.
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-orange-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-orange-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Sender</th>
                                    <th className="px-6 py-5">Topic</th>
                                    <th className="px-6 py-5">Message Preview</th>
                                    <th className="px-6 py-5 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {messages.map(msg => (
                                    <tr
                                        key={msg.id}
                                        onClick={() => { setSelectedMessage(msg); if (msg.status === 'New') updateStatus(msg.id, true); }}
                                        className={`cursor-pointer transition-colors ${msg.status === 'New' ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {msg.status === 'New' && <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>}
                                                <div className="font-bold text-gray-800">{msg.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="bg-gray-100 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">{msg.topic}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{msg.message}</div>
                                        </td>
                                        <td className="px-6 py-5 text-right text-[10px] text-gray-400 font-bold">
                                            {new Date(msg.created_at || '').toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in shadow-black/20">
                        <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <MessageSquare size={20} /> Inquiry Details
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={() => deleteMessage(selectedMessage.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition-colors"><Trash2 size={20} /></button>
                                <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-gray-800 rounded-full transition-colors"><X size={20} /></button>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">{selectedMessage.name.charAt(0)}</div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-xl leading-tight">{selectedMessage.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="flex items-center text-xs text-gray-400 font-bold"><Mail size={12} className="mr-1" /> {selectedMessage.email}</span>
                                        {selectedMessage.phone && <span className="flex items-center text-xs text-gray-400 font-bold"><Phone size={12} className="mr-1" /> {selectedMessage.phone}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Subject</label>
                                    <p className="font-bold text-gray-700 text-sm">{selectedMessage.topic}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Received</label>
                                    <p className="font-bold text-gray-700 text-sm flex items-center"><Calendar size={14} className="mr-1 opacity-50" /> {new Date(selectedMessage.created_at || '').toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border-2 border-orange-50 relative">
                                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 block">Message Content</label>
                                <p className="text-gray-700 leading-relaxed font-medium">{selectedMessage.message}</p>
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: Addy Meals Inquiry - ${selectedMessage.topic}`}
                                    className="flex-1 bg-orange-600 text-white font-bold py-4 rounded-xl text-center hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100"
                                >
                                    Reply via Email
                                </a>
                                {selectedMessage.phone && (
                                    <a
                                        href={`https://wa.me/${selectedMessage.phone}`}
                                        className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl text-center hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                                    >
                                        WhatsApp Message
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
