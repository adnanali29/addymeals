export type Recipe = {
    id: string;
    title: string;
    calories: string;
    type: 'Veg' | 'Non-Veg' | 'Vegan';
    image_url: string | null;
    pdf_url: string | null;
    downloads: number;
    status: string;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: string;
    name: string;
    emoji: string;
    bg_color: string;
    border_color: string;
    shadow_style: string;
    text_accent: string;
    display_order: number;
    created_at: string;
    updated_at: string;
};

export type CategoryItem = {
    id: string;
    category_id: string;
    item_name: string;
    display_order: number;
    created_at: string;
};

export type Blog = {
    id: string;
    title: string;
    category: string;
    image_url: string;
    excerpt: string;
    content: string;
    read_time: string;
    quick_tip: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export type Order = {
    id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    items: any; // JSONB
    total_amount: number;
    status: 'Pending' | 'Paid' | 'Cancelled';
    created_at: string;
    updated_at: string;
};

export type Message = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    topic: string;
    message: string;
    status: 'New' | 'Read' | 'Archived';
    created_at: string;
};

export type InstantMenuItem = {
    id: string;
    name: string;
    price: number;
    note: string | null;
    available: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
};
