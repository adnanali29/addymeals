"use client";

import React, { useState, useEffect } from 'react';
import { User, Clock, Zap, XCircle } from '@/components/ui/icons';
import { supabase } from '@/lib/supabase/client';
import { Blog } from '@/lib/supabase/types';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (data) setBlogs(data);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-900 mb-4">Addy Nutrition Blogs</h1>
                <p className="text-gray-600 font-medium max-w-xl mx-auto">Science-backed nutritional insights and traditional wisdom to help you eat better every day.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold text-xl">
                    Our nutritionists are busy writing! New stories coming soon. ✍️
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((post) => (
                        <div key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-orange-50 group flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{post.category}</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4 space-x-6">
                                    <span className="flex items-center"><User size={14} className="mr-1 text-orange-400" /> Addy Team</span>
                                    <span className="flex items-center"><Clock size={14} className="mr-1 text-orange-400" /> {post.read_time}</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2 h-16">{post.title}</h3>
                                <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-medium">{post.excerpt}</p>
                                <button onClick={() => setSelectedPost(post)} className="mt-auto text-orange-600 font-black text-xs tracking-widest flex items-center group-hover:translate-x-3 transition-transform uppercase">
                                    READ FULL STORY <span className="ml-2 font-black">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={() => setSelectedPost(null)}></div>
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in no-scrollbar">
                        <button onClick={() => setSelectedPost(null)} className="fixed md:absolute top-6 right-6 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors z-[110] backdrop-blur-md">
                            <XCircle size={36} className="text-white md:text-gray-800" />
                        </button>
                        <div className="relative h-72 md:h-96">
                            <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <span className="bg-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-xl">{selectedPost.category}</span>
                                <h2 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-md">{selectedPost.title}</h2>
                            </div>
                        </div>
                        <div className="p-8 md:p-12 space-y-8">
                            <div className="flex items-center text-[10px] text-gray-400 font-black uppercase tracking-widest space-x-8 border-b border-gray-100 pb-8">
                                <span className="flex items-center"><User size={18} className="mr-2 text-orange-500" /> Addy Nutritionist</span>
                                <span className="flex items-center"><Clock size={18} className="mr-2 text-orange-500" /> {selectedPost.read_time}</span>
                            </div>
                            <div className="prose prose-orange max-w-none text-gray-700 leading-relaxed font-medium">
                                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-8 border-l-4 border-orange-500 pl-6 italic">"{selectedPost.excerpt}"</p>
                                <div className="whitespace-pre-wrap text-lg opacity-90">{selectedPost.content}</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-[2rem] mt-10 flex items-start gap-6 border border-orange-200/50 shadow-inner">
                                <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-600"><Zap size={28} /></div>
                                <div>
                                    <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-xs">Chef's Nutrition Tip</h4>
                                    <p className="text-orange-900 font-bold leading-relaxed">{selectedPost.quick_tip}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
