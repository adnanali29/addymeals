import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_5Vujel1cEkaW@ep-damp-mode-b4305nb7-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

const CREATE_TABLES = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS recipes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  calories     TEXT,
  type         TEXT CHECK (type IN ('Veg','Non-Veg','Vegan')),
  image_url    TEXT,
  pdf_url      TEXT,
  downloads    INTEGER DEFAULT 0,
  status       TEXT DEFAULT 'Active',
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  emoji         TEXT,
  bg_color      TEXT DEFAULT 'bg-white',
  border_color  TEXT DEFAULT 'border-gray-200',
  shadow_style  TEXT DEFAULT 'shadow-sm',
  text_accent   TEXT DEFAULT 'text-gray-600',
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID REFERENCES categories(id) ON DELETE CASCADE,
  item_name     TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blogs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    TEXT,
  image_url   TEXT,
  excerpt     TEXT,
  content     TEXT,
  read_time   TEXT,
  quick_tip   TEXT,
  published   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  customer_email   TEXT,
  items            JSONB DEFAULT '[]',
  total_amount     NUMERIC(10,2) DEFAULT 0,
  status           TEXT DEFAULT 'Pending' CHECK (status IN ('Pending','Paid','Cancelled')),
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  topic      TEXT,
  message    TEXT NOT NULL,
  status     TEXT DEFAULT 'New' CHECK (status IN ('New','Read','Archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS instant_menu (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  note          TEXT,
  available     BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
`;

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
  { name: "Chapati and Sabji", price: 90 },
  { name: "Panner Curry and rice", price: 140 },
  { name: "Grilled Panner and rice", price: 140 },
  { name: "Chicken Curry and rice", price: 140 },
];

const BLOGS = [
  { title: "Managing Diabetes with Indian Diet", category: "Diabetes", image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", excerpt: "How to enjoy roti and rice without spiking your sugar levels.", read_time: "5 min read", content: "Diabetes management with Indian food is very achievable. Focus on low-glycemic options like dalia, oats, and whole wheat rotis. Pair carbs with proteins and healthy fats.", quick_tip: "Balance carbs with fiber.", published: true },
  { title: "5 Detox Foods in Your Kitchen", category: "Toxin Release", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600", excerpt: "Simple ingredients like turmeric and lemon that help cleanse your body.", read_time: "4 min read", content: "Your kitchen already has powerful detox foods. Turmeric fights inflammation, lemon alkalizes the body, coriander removes heavy metals, ginger aids digestion.", quick_tip: "Drink warm lemon water.", published: true },
  { title: "The Truth About Ghee", category: "Trending", image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600", excerpt: "Why this traditional fat is actually a superfood when used correctly.", read_time: "6 min read", content: "Ghee is rich in fat-soluble vitamins A, D, E and K. It contains conjugated linoleic acid (CLA) which may aid weight loss. Use 1-2 teaspoons daily.", quick_tip: "Use ghee in moderation.", published: true },
];

const RECIPES = [
  { title: "High-Protein Soya Bhurji", calories: "250 kcal", type: "Veg", status: "Active" },
  { title: "Quinoa Chicken Biryani", calories: "400 kcal", type: "Non-Veg", status: "Active" },
  { title: "Low-Cal Palak Paneer", calories: "320 kcal", type: "Veg", status: "Active" },
  { title: "Oats & Moong Dal Chilla", calories: "180 kcal", type: "Veg", status: "Active" },
  { title: "Grilled Fish Curry", calories: "350 kcal", type: "Non-Veg", status: "Active" },
  { title: "Millet Upma Mix", calories: "220 kcal", type: "Veg", status: "Active" },
  { title: "Tofu Masala Sandwich", calories: "300 kcal", type: "Veg", status: "Active" },
  { title: "Chicken Breast Salad", calories: "280 kcal", type: "Non-Veg", status: "Active" },
];

const CATEGORIES = [
  { name: "Plant Rant", emoji: "🌱", text_accent: "text-green-600", items: ["Tofu Bae Curry","No-Moo Stew","Green Queen Bowl","Soya Slay","Plant Power Pop","Leafy Litty","Root Rizz"] },
  { name: "Veggie Edgy", emoji: "🥦", text_accent: "text-emerald-600", items: ["Paneer Poppin","Dal Drip","Mix Veg Vibe","Aloo Act","Gobi Glow","Kofta King","Roti Rizz"] },
  { name: "Meat Heat", emoji: "🍗", text_accent: "text-red-600", items: ["Chick Click","Egg Xtra","Fish Wish","Mutton Glutton","Kebab Dab","Wings Ding","Curry Fury"] },
  { name: "Insta Eats", emoji: "🍱", text_accent: "text-orange-600", items: ["Fire Chick Rice","Lean Chick Rice","Hot Chick Rice","Mint Cluck Bowl","Butter Cluck Bowl","Sizzle Kebab Bowl","Tandoori Paneer Punch"] },
  { name: "Sip Drip", emoji: "🥤", text_accent: "text-blue-600", items: ["Chia Jiya","Basil Pops","Sattu Jaddu","Berry Boujee","Mango Main Character","Green Glow Up","Choco Chaos"] },
  { name: "Cheesy Breezy", emoji: "🧀", text_accent: "text-amber-600", items: ["Corn Ballin","Melted Mood","Gouda Vibes","Cheddar Chase","Mozza Magic","Brie Bestie","Queso Queen"] },
  { name: "Biz Whiz", emoji: "💼", text_accent: "text-indigo-600", items: ["Laptop Lunch","Meeting Meal","Boss Burger","CEO Salad","Deadline Dal","Bonus Bowl","Hustle Hash"] },
  { name: "Liver Lover", emoji: "🩺", text_accent: "text-purple-600", items: ["Detox Drip","Clean Green","Hepa Hero","Filter Fix","Pure Play","Toxin Yeet","Liv-It-Up"] },
  { name: "Sugar Free Glee", emoji: "🩸", text_accent: "text-pink-600", items: ["Karela Kool","Jamun Jam","Methi Magic","Low-G Low-Key","Sweetless Slay","Fiber Flex","Insulin Win"] },
  { name: "Slim Trim", emoji: "⚖️", text_accent: "text-teal-600", items: ["Salad Squad","Keto Kicks","Low Carb Luv","Fat Burn Turn","Calorie Cut","Waist Waste","Light Bite"] },
  { name: "Immune Tune", emoji: "🛡️", text_accent: "text-sky-300", items: ["Turmeric Turn","Ginger Zinger","C-Vitamin Win","Zinc Link","Amla Armor","Kadha Kool","Flu Fly"] },
  { name: "Campus Cram", emoji: "🎒", text_accent: "text-yellow-600", items: ["Chole Chill","Dalma Drip","Rajma Rizz","Tortilla Turnup","Curd Cool","Sambar Slay","Maggi Mood"] },
];

async function main() {
  console.log('🔌 Connecting to NeonDB...');
  await client.connect();
  console.log('✅ Connected!\n');

  console.log('📦 Creating tables...');
  await client.query(CREATE_TABLES);
  console.log('✅ All tables created!\n');

  console.log('🍱 Seeding instant_menu...');
  for (const [i, item] of INSTANT_MENU.entries()) {
    await client.query(
      `INSERT INTO instant_menu (name, price, note, display_order) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
      [item.name, item.price, item.note ?? null, i]
    );
  }
  console.log(`   ✅ ${INSTANT_MENU.length} items`);

  console.log('📝 Seeding blogs...');
  for (const b of BLOGS) {
    await client.query(
      `INSERT INTO blogs (title, category, image_url, excerpt, content, read_time, quick_tip, published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
      [b.title, b.category, b.image_url, b.excerpt, b.content, b.read_time, b.quick_tip, b.published]
    );
  }
  console.log(`   ✅ ${BLOGS.length} blogs`);

  console.log('🥗 Seeding recipes...');
  for (const r of RECIPES) {
    await client.query(
      `INSERT INTO recipes (title, calories, type, status) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
      [r.title, r.calories, r.type, r.status]
    );
  }
  console.log(`   ✅ ${RECIPES.length} recipes`);

  console.log('📂 Seeding categories & items...');
  for (const [ci, cat] of CATEGORIES.entries()) {
    const res = await client.query(
      `INSERT INTO categories (name, emoji, text_accent, display_order) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING RETURNING id`,
      [cat.name, cat.emoji, cat.text_accent, ci]
    );

    let catId = res.rows[0]?.id;
    if (!catId) {
      const existing = await client.query('SELECT id FROM categories WHERE name=$1', [cat.name]);
      catId = existing.rows[0]?.id;
    }

    if (catId) {
      for (const [ii, item] of cat.items.entries()) {
        await client.query(
          `INSERT INTO category_items (category_id, item_name, display_order) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
          [catId, item, ii]
        );
      }
    }
    console.log(`   ✅ ${cat.emoji} ${cat.name}`);
  }

  console.log('\n🎉 Database setup complete!\n');
  console.log('📊 Row counts:');
  for (const t of ['recipes','categories','category_items','blogs','orders','messages','instant_menu']) {
    const { rows } = await client.query(`SELECT COUNT(*) FROM ${t}`);
    console.log(`   ${t.padEnd(18)}: ${rows[0].count} rows`);
  }

  await client.end();
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
