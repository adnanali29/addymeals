"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from '@/components/ui/icons';
export default function ContactPage() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setSending(true);

        const formData = new FormData(form);
        const contactData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            topic: formData.get('topic') as string,
            message: formData.get('message') as string,
        };

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });

            if (res.ok) {
                setSent(true);
                form.reset();
                setTimeout(() => setSent(false), 5000);
            } else {
                alert("Oops! Something went wrong. Please try again or WhatsApp us directly.");
            }
        } catch (err) {
            alert("Oops! Something went wrong. Please try again or WhatsApp us directly.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Get in <span className="text-orange-600">Touch</span></h1>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">Have questions about our meal plans or products? We're here to help you on your health journey. Send us a message and our team will get back to you within 24 hours.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-orange-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mr-6 shadow-inner">
                                <Phone size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Call/WhatsApp</p>
                                <p className="text-2xl font-black text-gray-800 tracking-tight">+91 9861787335</p>
                            </div>
                        </div>

                        <div className="flex items-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mr-6 shadow-inner">
                                <Mail size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                <p className="text-2xl font-black text-gray-800 tracking-tight text-blue-600">hello@addymeals.com</p>
                            </div>
                        </div>

                        <div className="flex items-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-green-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mr-6 shadow-inner">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Flagship Pickup</p>
                                <p className="text-lg font-bold text-gray-800 leading-snug">333/b Christian sahi sutahat cuttack</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-orange-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 opacity-20 rounded-bl-full -translate-y-4 translate-x-4 transition-transform group-hover:scale-110"></div>
                    <h2 className="text-3xl font-black text-gray-800 mb-10 relative z-10">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input name="name" type="text" placeholder="John Doe" className="w-full px-7 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none transition-all font-bold text-gray-800" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input name="phone" type="tel" placeholder="+91 ..." className="w-full px-7 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none transition-all font-bold text-gray-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input name="email" type="email" placeholder="john@example.com" className="w-full px-7 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none transition-all font-bold text-gray-800" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Topic</label>
                            <div className="relative">
                                <select name="topic" className="w-full px-7 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none transition-all font-bold text-gray-800 appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Meal Subscription</option>
                                    <option>Instant Order Support</option>
                                    <option>Business/Catering</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Message</label>
                            <textarea name="message" rows={4} placeholder="How can we help you?" className="w-full px-7 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-500 outline-none transition-all font-bold text-gray-800 resize-none h-32" required></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={sending || sent}
                            className={`w-full font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 ${sent ? 'bg-green-600 text-white cursor-default' : 'bg-gray-900 text-white hover:bg-orange-600 hover:-translate-y-1'
                                }`}
                        >
                            {sending ? (
                                <>Sending... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                            ) : sent ? (
                                "Message Sent Successfully! ✓"
                            ) : (
                                "Send Message Now"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
