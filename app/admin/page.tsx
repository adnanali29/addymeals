"use client";

import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    ChefHat,
    GridIcon,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    Lock,
    Plus,
    Trash2,
    Edit,
    Search,
    X,
    TrendingUp,
    Lightbulb,
    IndianRupee,
    User
} from '@/components/ui/icons';
import { useRouter } from 'next/navigation';

// Sub-components for Admin
import { DashboardHome } from '@/components/admin/DashboardHome';
import { OrdersView } from '@/components/admin/OrdersView';
import { RecipesView } from '@/components/admin/RecipesView';
import { CategoriesView } from '@/components/admin/CategoriesView';
import { BlogsView } from '@/components/admin/BlogsView';
import { MessagesView } from '@/components/admin/MessagesView';
import { SettingsView } from '@/components/admin/SettingsView';

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${active
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
            : 'text-black hover:bg-orange-50 hover:text-orange-600'
            }`}
    >
        <div className="flex items-center space-x-3">
            <Icon size={20} className={active ? "text-white" : "text-black group-hover:text-orange-500"} />
            <span className="font-bold">{label}</span>
        </div>
        {badge && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-600'
                }`}>
                {badge}
            </span>
        )}
    </button>
);

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();

    const expectedPin = "1234"; // Default PIN from previous session context or schema

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === expectedPin) {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md border border-orange-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange-200">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-black text-gray-800">Admin Login</h1>
                        <p className="text-gray-500 text-sm mt-1">Please enter your secure PIN.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => { setPin(e.target.value); setError(false); }}
                                placeholder="Enter PIN"
                                className="w-full text-center px-6 py-4 text-xl rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none font-bold transition-all"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-xs font-bold text-center mt-3">Incorrect PIN. Try again.</p>}
                        </div>
                        <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex font-sans text-gray-900 selection:bg-orange-200">
            {/* Mobile Sidebar Overlay */}
            {!sidebarOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden" onClick={() => setSidebarOpen(true)}></div>
            )}

            <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-orange-100 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-24 flex items-center justify-center border-b border-orange-50">
                    <span className="font-black text-2xl text-gray-800">Addy<span className="text-orange-600">Admin</span></span>
                </div>
                <div className="flex-1 py-8 px-6 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={ShoppingBag} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={ChefHat} label="Recipes" active={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')} />
                    <SidebarItem icon={GridIcon} label="Categories" active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} />
                    <SidebarItem icon={BookOpen} label="Blogs" active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} />
                    <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
                    <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </div>
                <div className="p-4 border-t border-orange-50">
                    <button onClick={() => router.push('/')} className="w-full flex items-center justify-center px-4 py-3 text-gray-500 hover:text-red-500 font-bold gap-3">
                        <LogOut size={20} /> Exit Admin
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <header className="h-20 flex items-center justify-between px-6 lg:px-10 z-10 shrink-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-gray-800 capitalize hidden sm:block">{activeTab}</h1>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <div className="text-sm font-bold">Admin User</div>
                            <div className="text-xs text-orange-600">Super Admin</div>
                        </div>
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">AD</div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-10 pb-20">
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'dashboard' && <DashboardHome />}
                        {activeTab === 'orders' && <OrdersView />}
                        {activeTab === 'recipes' && <RecipesView />}
                        {activeTab === 'categories' && <CategoriesView />}
                        {activeTab === 'blogs' && <BlogsView />}
                        {activeTab === 'messages' && <MessagesView />}
                        {activeTab === 'settings' && <SettingsView />}
                    </div>
                </div>
            </main>
        </div>
    );
}
