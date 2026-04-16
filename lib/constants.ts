import { ChefHat, Leaf, Utensils, IndianRupee } from '@/components/ui/icons';



export const TESTIMONIALS = [
    { name: "Aarav Sharma", rating: 5, text: "Finally, healthy food that actually tastes like home! The chicken meals are a lifesaver." },
    { name: "Priya Patel", rating: 4.5, text: "As a student, Addy Meals fits my budget perfectly. The tiffin combos are generous." },
    { name: "Rahul Verma", rating: 5, text: "Lost 3kgs in a month just by switching to their Paneer & Fitness meals. Highly recommend!" },
    { name: "Sneha Gupta", rating: 4, text: "The ready-to-eat nutrition shots are amazing for my morning rush." },
    { name: "Vikram Singh", rating: 4.5, text: "Authentic Indian taste without the oil overload. My parents love the vegetarian subscription." },
    { name: "Ananya Iyer", rating: 5, text: "The packaging is clean, and the food is always fresh. Best tiffin service in the city." }
];

export const WHY_ADDY_FEATURES = [
    { icon: ChefHat, title: "Indian Nutrition", points: ["Power of Spices (Turmeric, Ginger)", "Gut-friendly Fermentation", "Ancient Wisdom, Modern Plate"], bg: "bg-orange-500", glow: "shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] border-orange-200" },
    { icon: Leaf, title: "In-House Formulas", points: ["Ayurveda-inspired Blends", "No Preservatives", "Lab-tested for Purity"], bg: "bg-green-500", glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] border-green-200" },
    { icon: Utensils, title: "Balanced Nutrition", points: ["Macro-counted Meals", "Fiber-rich Grains", "Sustained Energy Release"], bg: "bg-yellow-500", glow: "shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] border-yellow-200" },
    { icon: IndianRupee, title: "Affordable Pricing", points: ["Planned for Every Pocket", "No Hidden Costs", "Premium Nutrition, Student Prices"], bg: "bg-red-500", glow: "shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] border-red-200" }
];
