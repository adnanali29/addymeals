import { supabase } from './client';

const INSTANT_MENU = [
    { name: "Fire Chick Rice", price: 169 },
    { name: "Hot Chick Rice", price: 169 },
    { name: "Lean Chick Rice", price: 169 },
    { name: "Butter Cluck Bowl", price: 169 },
    { name: "Mint Cluck Bowl", price: 169 },
    { name: "Sizzle Kebab Bowl", price: 169 },
    { name: "Tandoori Paneer Punch", price: 169 },
    { name: "Chia Jiya", price: 100, note: "(Pack of 5)" },
    { name: "Basil Pops", price: 100, note: "(Pack of 5)" },
    { name: "Sattu Slay", price: 40, note: "/ 220 ML" },
    { name: "Dal chawal and Sabji", price: 110 },
    { name: "Chapati and Sajbi", price: 90 },
    { name: "Panner Curry and rice", price: 140 },
    { name: "Grilled Panner and rice", price: 140 },
    { name: "Chicken Curry and rice", price: 140 }
];

const INITIAL_BLOG_POSTS = [
    { title: "Managing Diabetes with Indian Diet", category: "Diabetes", image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", excerpt: "How to enjoy roti and rice without spiking your sugar levels.", read_time: "5 min read", content: "Full content here...", quick_tip: "Balance carbs with fiber." },
    { title: "5 Detox Foods in Your Kitchen", category: "Toxin Release", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600", excerpt: "Simple ingredients like turmeric and lemon that help cleanse your body.", read_time: "4 min read", content: "Full content here...", quick_tip: "Drink warm lemon water." },
    { title: "The Truth About Ghee", category: "Trending", image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600", excerpt: "Why this traditional fat is actually a superfood when used correctly.", read_time: "6 min read", content: "Full content here...", quick_tip: "Use ghee in moderation." }
];

const INITIAL_RECIPES = [
    { title: "High-Protein Soya Bhurji", calories: "250 kcal", type: "Veg", status: "Active" },
    { title: "Quinoa Chicken Biryani", calories: "400 kcal", type: "Non-Veg", status: "Active" },
    { title: "Low-Cal Palak Paneer", calories: "320 kcal", type: "Veg", status: "Active" },
    { title: "Oats & Moong Dal Chilla", calories: "180 kcal", type: "Veg", status: "Active" },
    { title: "Grilled Fish Curry", calories: "350 kcal", type: "Non-Veg", status: "Active" },
    { title: "Millet Upma Mix", calories: "220 kcal", type: "Veg", status: "Active" },
    { title: "Tofu Masala Sandwich", calories: "300 kcal", type: "Veg", status: "Active" },
    { title: "Chicken Breast Salad", calories: "280 kcal", type: "Non-Veg", status: "Active" },
];

const INITIAL_CATEGORIES = [
    { name: "Plant Rant", emoji: "🌱", text_accent: "text-green-600", variations: ["Tofu Bae Curry", "No-Moo Stew", "Green Queen Bowl", "Soya Slay", "Plant Power Pop", "Leafy Litty", "Root Rizz"] },
    { name: "Veggie Edgy", emoji: "🥦", text_accent: "text-emerald-600", variations: ["Paneer Poppin'", "Dal Drip", "Mix Veg Vibe", "Aloo Act", "Gobi Glow", "Kofta King", "Roti Rizz"] },
    { name: "Meat Heat", emoji: "🍗", text_accent: "text-red-600", variations: ["Chick Click", "Egg Xtra", "Fish Wish", "Mutton Glutton", "Kebab Dab", "Wings Ding", "Curry Fury"] },
    { name: "Insta Eats", emoji: "🍱", text_accent: "text-orange-600", variations: ["Fire Chick Rice", "Lean Chick Rice", "Hot Chick Rice", "Mint Cluck Bowl", "Butter Cluck Bowl", "Sizzle Kebab Bowl", "Tandoori Paneer Punch"] },
    { name: "Sip Drip", emoji: "🥤", text_accent: "text-blue-600", variations: ["Chia Jiya", "Basil Pops", "Sattu Jaddu", "Berry Boujee", "Mango Main Character", "Green Glow Up", "Choco Chaos"] },
    { name: "Cheesy Breezy", emoji: "🧀", text_accent: "text-amber-600", variations: ["Corn Ballin'", "Melted Mood", "Gouda Vibes", "Cheddar Chase", "Mozza Magic", "Brie Bestie", "Queso Queen"] },
    { name: "Biz Whiz", emoji: "💼", text_accent: "text-indigo-600", variations: ["Laptop Lunch", "Meeting Meal", "Boss Burger", "CEO Salad", "Deadline Dal", "Bonus Bowl", "Hustle Hash"] },
    { name: "Liver Lover", emoji: "🩺", text_accent: "text-purple-600", variations: ["Detox Drip", "Clean Green", "Hepa Hero", "Filter Fix", "Pure Play", "Toxin Yeet", "Liv-It-Up"] },
    { name: "Sugar Free Glee", emoji: "🩸", text_accent: "text-pink-600", variations: ["Karela Kool", "Jamun Jam", "Methi Magic", "Low-G Low-Key", "Sweetless Slay", "Fiber Flex", "Insulin Win"] },
    { name: "Slim Trim", emoji: "⚖️", text_accent: "text-teal-600", variations: ["Salad Squad", "Keto Kicks", "Low Carb Luv", "Fat Burn Turn", "Calorie Cut", "Waist Waste", "Light Bite"] },
    { name: "Immune Tune", emoji: "🛡️", text_accent: "text-sky-300", variations: ["Turmeric Turn", "Ginger Zinger", "C-Vitamin Win", "Zinc Link", "Amla Armor", "Kadha Kool", "Flu Fly"] },
    { name: "Campus Cram", emoji: "🎒", text_accent: "text-yellow-600", variations: ["Chole Chill", "Dalma Drip", "Rajma Rizz", "Tortilla Turnup", "Curd Cool", "Sambar Slay", "Maggi Mood"] }
];

export async function seed() {
    console.log('Starting seed...');

    // Seed Instant Menu
    const { error: menuError } = await supabase.from('instant_menu').upsert(INSTANT_MENU);
    if (menuError) console.error('Error seeding menu:', menuError);

    // Seed Blogs
    const { error: blogError } = await supabase.from('blogs').upsert(INITIAL_BLOG_POSTS);
    if (blogError) console.error('Error seeding blogs:', blogError);

    // Seed Recipes
    const { error: recipeError } = await supabase.from('recipes').upsert(INITIAL_RECIPES);
    if (recipeError) console.error('Error seeding recipes:', recipeError);

    // Seed Categories
    for (const cat of INITIAL_CATEGORIES) {
        const { variations, ...catData } = cat;
        const { data: category, error: catError } = await supabase
            .from('categories')
            .upsert(catData)
            .select()
            .single();

        if (catError) {
            console.error(`Error seeding category ${cat.name}:`, catError);
            continue;
        }

        if (category) {
            const items = variations.map(v => ({
                category_id: category.id,
                item_name: v
            }));
            const { error: itemError } = await supabase.from('category_items').upsert(items);
            if (itemError) console.error(`Error seeding items for ${cat.name}:`, itemError);
        }
    }

    console.log('Seed completed!');
}
