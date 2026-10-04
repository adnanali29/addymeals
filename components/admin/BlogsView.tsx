"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Clock, Zap } from '@/components/ui/icons';
import { Blog } from '@/lib/supabase/types';

export const BlogsView = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const res = await fetch('/api/blogs');
        if (res.ok) setBlogs(await res.json());
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (!res.ok) alert('Failed to delete blog');
            else fetchBlogs();
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const blogData = {
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            image_url: formData.get('image_url') as string,
            excerpt: formData.get('excerpt') as string,
            content: formData.get('content') as string,
            read_time: formData.get('read_time') as string,
            quick_tip: formData.get('quick_tip') as string,
            published: true
        };

        if (editingBlog) {
            const res = await fetch(`/api/blogs/${editingBlog.id}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogData)
            });
            if (!res.ok) alert('Failed to update blog');
            else { setIsModalOpen(false); setEditingBlog(null); fetchBlogs(); }
        } else {
            const res = await fetch('/api/blogs', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogData)
            });
            if (!res.ok) alert('Failed to add blog');
            else { setIsModalOpen(false); fetchBlogs(); }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800">Blog Manager</h2>
                <button
                    onClick={() => { setEditingBlog(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-colors"
                >
                    <Plus size={20} /> Add Blog
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-white rounded-[2rem] border border-orange-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col">
                            <div className="h-40 bg-gray-200 relative overflow-hidden">
                                <img src={blog.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setEditingBlog(blog); setIsModalOpen(true); }}
                                        className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-orange-500"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(blog.id)} className="bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-2 inline-block w-fit">{blog.category}</span>
                                <h3 className="font-bold text-lg mb-2 leading-tight line-clamp-2">{blog.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{blog.excerpt}</p>
                                <div className="mt-auto pt-4 border-t border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {blog.read_time} • Quick Tip: {blog.quick_tip}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in shadow-black/20">
                        <div className="bg-orange-500 p-6 flex justify-between items-center text-white">
                            <h3 className="text-xl font-black">{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h3>
                            <button onClick={() => { setIsModalOpen(false); setEditingBlog(null); }} className="hover:bg-orange-600 p-2 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Title</label>
                                <input name="title" defaultValue={editingBlog?.title} placeholder="Blog Title" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                                    <input name="category" defaultValue={editingBlog?.category} placeholder="e.g. Wellness" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Read Time</label>
                                    <input name="read_time" defaultValue={editingBlog?.read_time} placeholder="e.g. 5 min" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Image URL</label>
                                <input name="image_url" defaultValue={editingBlog?.image_url} placeholder="https://unsplash.com/..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Short Excerpt</label>
                                <textarea name="excerpt" defaultValue={editingBlog?.excerpt} rows={2} placeholder="Brief summary of the post" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required></textarea>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Content</label>
                                <textarea name="content" defaultValue={editingBlog?.content} rows={6} placeholder="Full blog story..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required></textarea>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Quick Tip</label>
                                <input name="quick_tip" defaultValue={editingBlog?.quick_tip || ''} placeholder="e.g. Drink warm lemon water" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none font-medium bg-gray-50" required />
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-gray-200 mt-4">
                                {editingBlog ? 'Update Post' : 'Publish Blog Post'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
