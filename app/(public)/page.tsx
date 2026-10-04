"use client";

import React, { useEffect, useState } from 'react';
import { MagicStove } from '@/components/ui/MagicStove';
import { useStore } from '@/lib/store';
import { WHY_ADDY_FEATURES, TESTIMONIALS } from '@/lib/constants';
import { CheckCircle2, Star, MapPin, ArrowRight } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { Category, CategoryItem } from '@/lib/supabase/types';

interface ExtendedCategory extends Category {
  items?: CategoryItem[];
}

export default function HomePage() {
  const { setActiveTab, setIsOrderModalOpen } = useStore();
  const [categories, setCategories] = useState<ExtendedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data || []);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleViewMenu = () => {
    setActiveTab('Recipes');
    router.push('/recipes');
  };

  const handleOurStory = () => {
    setActiveTab('About');
    router.push('/about');
  };

  return (
    <div className="space-y-12 animate-fade-in relative z-10">
      <section className="relative pt-6 md:pt-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center md:text-left z-10 flex flex-col items-center md:items-start">
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">#1 Nutrition-First Food Platform</div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">Desi Soul, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 filter drop-shadow-sm">Healthy Goal.</span></h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">We combine familiar Indian flavors with modern nutrition principles to make everyday eating better and easier.<br /><span className="text-sm text-orange-500 font-bold mt-2 block tracking-wide">(Hover over the stove to start cooking!)</span></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
              <button onClick={handleViewMenu} className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold shadow-lg hover:bg-orange-700 hover:shadow-orange-300 hover:shadow-xl transition-all transform hover:-translate-y-1">View Menu</button>
              <button onClick={handleOurStory} className="hidden lg:block px-8 py-4 bg-white text-orange-600 border-2 border-orange-100 rounded-full font-bold shadow-sm hover:bg-orange-50 transition-colors">Our Story</button>
              <button onClick={() => setIsOrderModalOpen(true)} className="lg:hidden px-8 py-4 bg-white text-orange-600 border-2 border-orange-100 rounded-full font-bold shadow-sm hover:bg-orange-50 transition-colors">Order Now</button>
            </div>
          </div>
          <div className="flex justify-center items-center relative z-10 py-6">
            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.6)]">
              <MagicStove />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">Why Addy Meals?</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {WHY_ADDY_FEATURES.map((item, idx) => (
            <div key={idx} className={`group relative p-8 bg-white rounded-[2rem] text-left transition-all duration-300 border ${item.glow} hover:-translate-y-2 overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>
              <div className={`${item.bg} w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <ul className="space-y-2">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-600 font-medium">
                    <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gray-800 mb-12">Our Meal Categories</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className={`group relative h-72 rounded-[2.5rem] border-2 p-6 text-center cursor-pointer transition-all duration-500 overflow-hidden ${cat.bg_color || 'bg-white'} ${cat.border_color || 'border-orange-200'} ${cat.shadow_style || 'shadow-sm'} hover:-translate-y-2`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-full opacity-100 group-hover:opacity-0 p-4">
                  <div className="text-6xl mb-4 filter drop-shadow-md transform group-hover:scale-110 transition-transform">{cat.emoji}</div>
                  <h3 className={`font-black text-lg leading-tight ${cat.text_accent || 'text-gray-800'}`}>{cat.name}</h3>
                  <div className={`mt-2 w-8 h-1 rounded-full opacity-30 ${(cat.text_accent || 'text-gray-800').replace('text', 'bg')}`}></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-500 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 p-4">
                  <h4 className={`font-black mb-3 text-xs uppercase tracking-wider ${cat.text_accent || 'text-gray-800'}`}>{cat.name}</h4>
                  <div className="w-full h-full overflow-y-auto no-scrollbar">
                    <ul className="space-y-1.5 text-[10px] md:text-xs text-gray-700 font-bold text-left">
                      {cat.items?.map((v, i) => (
                        <li key={i} className="bg-white px-2 py-1.5 rounded-lg shadow-sm border border-gray-100 w-full truncate hover:bg-black hover:text-white transition-colors">{v.item_name}</li>
                      ))}
                      {(!cat.items || cat.items.length === 0) && <li className="text-center text-gray-400 italic">Coming soon...</li>}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-10 bg-yellow-50 border-y border-yellow-100 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-gray-900 leading-none mb-2">Community Love <span className="text-orange-600">770+</span></h2>
          <p className="text-gray-500 font-medium">Real stories from our happy eaters</p>
        </div>
        <div className="relative w-full">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-yellow-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-yellow-50 to-transparent z-10"></div>
          <div className="flex animate-marquee-slow space-x-6 w-max hover:pause py-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 bg-white p-6 rounded-[2rem] shadow-sm border border-yellow-100 flex-shrink-0 hover:shadow-xl transition-all hover:-translate-y-1 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-serif text-xl shadow-lg">"</div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-yellow-200 rounded-full flex items-center justify-center text-orange-700 font-bold mr-3 shadow-inner">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <div className="flex text-yellow-400 gap-0.5 items-center">
                      {[...Array(5)].map((_, s) => (
                        <span key={s + i}>{s + 0.5 < t.rating ? <Star size={10} fill="currentColor" /> : s < t.rating ? <Star size={10} fill="currentColor" className="opacity-50" /> : <Star size={10} className="text-gray-200" />}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed text-xs">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-800 transform -skew-y-2 origin-top-left scale-110"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center bg-white text-orange-700 rounded-full px-6 py-2 mb-4 shadow-xl font-black tracking-wide border-2 border-orange-200">
            <MapPin className="mr-2 text-orange-500" size={20} fill="currentColor" />Cuttack & Bhubaneswar Exclusive
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-3 drop-shadow-md">Ready to Eat & Drink <br /><span className="text-yellow-300">Quick Pickup.</span></h2>
          <p className="text-orange-100 max-w-2xl mx-auto mb-6 text-xl font-medium leading-relaxed">Craving instant nutrition? Residents of the Twin Cities can now order our "Insta Eats" and "Sip Drip" ranges for <span className="text-white font-bold border-b-2 border-white">Quick Pickup!</span></p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {categories.find(c => c.name === 'Insta Eats')?.items?.slice(0, 4).map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white font-bold shadow-lg hover:bg-white/20 transition-all cursor-default">{item.item_name}</div>
            ))}
          </div>
          <button onClick={() => setIsOrderModalOpen(true)} className="bg-white text-orange-700 px-12 py-5 rounded-full font-black text-xl hover:bg-yellow-50 transition-all shadow-2xl hover:scale-105 flex items-center mx-auto">ORDER NOW <ArrowRight className="ml-2" /></button>
        </div>
      </section>
    </div>
  );
}
