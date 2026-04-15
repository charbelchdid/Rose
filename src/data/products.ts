export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  badge?: "bestseller" | "new" | "sale" | "limited" | "trending";
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  ingredients?: string;
  shades?: { name: string; color: string }[];
  inStock: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  productId: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const IMG = (seed: string, w = 600, h = 700) =>
  `https://images.unsplash.com/${seed}?w=${w}&h=${h}&fit=crop&q=80`;

export const products: Product[] = [
  {
    id: "velvet-rose-lipstick",
    name: "Velvet Rose Matte Lipstick",
    price: 28,
    originalPrice: 35,
    image: IMG("photo-1586495777744-4413f21062fa", 600, 700),
    images: [
      IMG("photo-1586495777744-4413f21062fa", 600, 700),
      IMG("photo-1583241800698-e8ab01830a07", 600, 700),
      IMG("photo-1631214524020-7e18db9a8f92", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Lips",
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 342,
    description: "A luxuriously creamy matte lipstick that glides on effortlessly, delivering intense color payoff with a velvety finish that lasts all day. Enriched with vitamin E and jojoba oil to keep lips soft and hydrated.",
    details: ["Long-wearing formula (up to 8 hours)", "Enriched with Vitamin E", "Cruelty-free & vegan", "Paraben-free"],
    ingredients: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Nylon-611/Dimethicone Copolymer, Disteardimonium Hectorite, Vitamin E, Jojoba Oil",
    shades: [
      { name: "Rose Petal", color: "#C4727F" },
      { name: "Nude Blush", color: "#D4A99A" },
      { name: "Berry Kiss", color: "#8B2252" },
      { name: "Coral Dream", color: "#E8846B" },
      { name: "Mauve Silk", color: "#B57A8E" },
    ],
    inStock: true,
  },
  {
    id: "glow-serum",
    name: "Radiance Glow Serum",
    price: 52,
    image: IMG("photo-1620916566398-39f1143ab7be", 600, 700),
    images: [
      IMG("photo-1620916566398-39f1143ab7be", 600, 700),
      IMG("photo-1611930022073-b7a4ba5fcccd", 600, 700),
    ],
    category: "Skincare",
    subcategory: "Serums",
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 521,
    description: "Our signature vitamin C serum with hyaluronic acid and niacinamide. Brightens, hydrates, and gives your skin that coveted glass-skin glow. Lightweight and fast-absorbing.",
    details: ["15% Vitamin C complex", "Hyaluronic acid for deep hydration", "Suitable for all skin types", "Dermatologist tested"],
    ingredients: "Water, Ascorbic Acid (15%), Hyaluronic Acid, Niacinamide, Glycerin, Aloe Vera Extract, Rose Water",
    inStock: true,
  },
  {
    id: "cloud-blush",
    name: "Cloud Soft Cream Blush",
    price: 24,
    image: IMG("photo-1596462502278-27bfdc403348", 600, 700),
    images: [
      IMG("photo-1596462502278-27bfdc403348", 600, 700),
      IMG("photo-1583241800698-e8ab01830a07", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Cheeks",
    badge: "trending",
    rating: 4.7,
    reviewCount: 189,
    description: "A weightless cream blush that melts into skin for a natural, dewy flush of color. The buildable formula gives you control from a subtle hint to a vibrant pop.",
    details: ["Buildable coverage", "Dewy natural finish", "12 gorgeous shades", "Suitable for all skin tones"],
    shades: [
      { name: "Peach Glow", color: "#FBBFAD" },
      { name: "Rose Quartz", color: "#E8A0BF" },
      { name: "Soft Coral", color: "#F5A882" },
      { name: "Berry Bliss", color: "#C9738E" },
    ],
    inStock: true,
  },
  {
    id: "silk-foundation",
    name: "Silk Skin Foundation SPF 30",
    price: 42,
    originalPrice: 48,
    image: IMG("photo-1631214524020-7e18db9a8f92", 600, 700),
    images: [
      IMG("photo-1631214524020-7e18db9a8f92", 600, 700),
      IMG("photo-1583241800698-e8ab01830a07", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Face",
    badge: "new",
    rating: 4.6,
    reviewCount: 97,
    description: "A breathable, medium-to-full coverage foundation that looks and feels like a second skin. Built-in SPF 30 protects while hyaluronic acid keeps skin plump.",
    details: ["Medium to full coverage", "SPF 30 protection", "24-hour wear", "40 inclusive shades"],
    shades: [
      { name: "Porcelain", color: "#F5DEB3" },
      { name: "Ivory", color: "#FFFFF0" },
      { name: "Sand", color: "#C2B280" },
      { name: "Caramel", color: "#8B6914" },
      { name: "Espresso", color: "#3C1414" },
    ],
    inStock: true,
  },
  {
    id: "rose-mist",
    name: "Rose Hydra Setting Mist",
    price: 22,
    image: IMG("photo-1608248543803-ba4f8c70ae0b", 600, 700),
    images: [
      IMG("photo-1608248543803-ba4f8c70ae0b", 600, 700),
    ],
    category: "Skincare",
    subcategory: "Mists",
    badge: "trending",
    rating: 4.5,
    reviewCount: 268,
    description: "A refreshing rose water mist that sets makeup, hydrates skin, and gives an instant dewy glow. Keep it in your bag for a midday refresh.",
    details: ["Sets makeup for all-day wear", "Real rose water formula", "Travel-friendly size", "Alcohol-free"],
    inStock: true,
  },
  {
    id: "lash-queen-mascara",
    name: "Lash Queen Volumizing Mascara",
    price: 26,
    image: IMG("photo-1631214500115-598fc2cb8ada", 600, 700),
    images: [
      IMG("photo-1631214500115-598fc2cb8ada", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Eyes",
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 456,
    description: "Get dramatic, voluminous lashes without clumps. Our hourglass-shaped wand coats every lash from root to tip for maximum impact.",
    details: ["Smudge-proof formula", "Up to 16 hours of wear", "Ophthalmologist tested", "Easy to remove"],
    inStock: true,
  },
  {
    id: "overnight-mask",
    name: "Beauty Sleep Overnight Mask",
    price: 38,
    image: IMG("photo-1611930022073-b7a4ba5fcccd", 600, 700),
    images: [
      IMG("photo-1611930022073-b7a4ba5fcccd", 600, 700),
      IMG("photo-1620916566398-39f1143ab7be", 600, 700),
    ],
    category: "Skincare",
    subcategory: "Masks",
    badge: "new",
    rating: 4.7,
    reviewCount: 134,
    description: "Wake up to visibly plumper, more radiant skin. This lavender-infused overnight mask works while you sleep to repair, hydrate, and rejuvenate.",
    details: ["Lavender & chamomile infused", "Deep overnight hydration", "Visible results by morning", "For all skin types"],
    inStock: true,
  },
  {
    id: "brow-pencil",
    name: "Micro Precision Brow Pencil",
    price: 18,
    image: IMG("photo-1597225244660-1cd128c64284", 600, 700),
    images: [
      IMG("photo-1597225244660-1cd128c64284", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Brows",
    rating: 4.6,
    reviewCount: 203,
    description: "An ultra-fine tip brow pencil that creates hair-like strokes for natural-looking, perfectly defined brows. Includes a built-in spoolie for seamless blending.",
    details: ["Ultra-fine 1.5mm tip", "Built-in spoolie brush", "Waterproof formula", "Long-lasting color"],
    shades: [
      { name: "Blonde", color: "#C4A96A" },
      { name: "Taupe", color: "#8B7D6B" },
      { name: "Brunette", color: "#4A3728" },
      { name: "Dark Brown", color: "#2D1810" },
    ],
    inStock: true,
  },
  {
    id: "lip-gloss-set",
    name: "Glossy Dreams Lip Gloss Trio",
    price: 32,
    originalPrice: 45,
    image: IMG("photo-1583241800698-e8ab01830a07", 600, 700),
    images: [
      IMG("photo-1583241800698-e8ab01830a07", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Lips",
    badge: "sale",
    rating: 4.5,
    reviewCount: 167,
    description: "Three stunning lip glosses in one beautiful set. From barely-there nude to a bold berry, these non-sticky glosses give your lips a gorgeous, mirror-like shine.",
    details: ["Set of 3 full-size glosses", "Non-sticky formula", "Enriched with vitamin E", "Perfect gift set"],
    inStock: true,
  },
  {
    id: "cleanser-balm",
    name: "Petal Soft Cleansing Balm",
    price: 34,
    image: IMG("photo-1556228578-0d85b1a4d571", 600, 700),
    images: [
      IMG("photo-1556228578-0d85b1a4d571", 600, 700),
    ],
    category: "Skincare",
    subcategory: "Cleansers",
    rating: 4.8,
    reviewCount: 312,
    description: "A silky cleansing balm that melts away makeup, sunscreen, and impurities while nourishing your skin. Transforms from balm to oil to milk as you massage.",
    details: ["Removes all makeup including waterproof", "Nourishing botanical oils", "Leaves skin soft, never stripped", "Fragrance-free"],
    inStock: true,
  },
  {
    id: "eye-palette",
    name: "Rose Garden Eyeshadow Palette",
    price: 46,
    image: IMG("photo-1512496015851-a90fb38ba796", 600, 700),
    images: [
      IMG("photo-1512496015851-a90fb38ba796", 600, 700),
      IMG("photo-1583241800698-e8ab01830a07", 600, 700),
    ],
    category: "Makeup",
    subcategory: "Eyes",
    badge: "limited",
    rating: 4.9,
    reviewCount: 278,
    description: "A curated palette of 12 rose-inspired shades ranging from soft nudes to deep burgundies. Buttery-smooth mattes and stunning metallics for endless eye looks.",
    details: ["12 curated shades", "Mix of mattes & metallics", "Highly pigmented & blendable", "Includes mirror & dual-ended brush"],
    inStock: true,
  },
  {
    id: "body-oil",
    name: "Golden Hour Body Shimmer Oil",
    price: 36,
    image: IMG("photo-1571781926291-c477ebfd024b", 600, 700),
    images: [
      IMG("photo-1571781926291-c477ebfd024b", 600, 700),
    ],
    category: "Skincare",
    subcategory: "Body",
    badge: "trending",
    rating: 4.6,
    reviewCount: 145,
    description: "A lightweight, dry-touch body oil with a subtle golden shimmer. Hydrates and leaves skin with a luminous, sun-kissed glow perfect for any occasion.",
    details: ["Subtle golden shimmer", "Lightweight, non-greasy", "Hydrating blend of argan & rosehip oils", "Delicate floral scent"],
    inStock: true,
  },
];

export const collections: Collection[] = [
  { id: "makeup", name: "Makeup", description: "Enhance your natural beauty with our curated makeup collection", image: IMG("photo-1596462502278-27bfdc403348", 800, 500), productCount: 7 },
  { id: "skincare", name: "Skincare", description: "Nourish and transform your skin with clean, effective formulas", image: IMG("photo-1620916566398-39f1143ab7be", 800, 500), productCount: 5 },
  { id: "lips", name: "Lip Collection", description: "Find your perfect shade from our luxurious lip range", image: IMG("photo-1583241800698-e8ab01830a07", 800, 500), productCount: 3 },
  { id: "bestsellers", name: "Best Sellers", description: "Our most-loved products, tried and adored by thousands", image: IMG("photo-1586495777744-4413f21062fa", 800, 500), productCount: 4 },
  { id: "new-arrivals", name: "New Arrivals", description: "The latest additions to our beauty family", image: IMG("photo-1631214524020-7e18db9a8f92", 800, 500), productCount: 2 },
  { id: "gift-sets", name: "Gift Sets & Bundles", description: "Beautifully curated sets for someone special (or yourself)", image: IMG("photo-1512496015851-a90fb38ba796", 800, 500), productCount: 1 },
];

export const reviews: Review[] = [
  { id: "r1", name: "Sophie M.", avatar: "SM", rating: 5, date: "March 2026", title: "My holy grail serum!", text: "I've been using the Glow Serum for 3 months and my skin has never looked better. The texture is so lightweight and it absorbs quickly. My friends keep asking what I'm using!", verified: true, productId: "glow-serum" },
  { id: "r2", name: "Amira K.", avatar: "AK", rating: 5, date: "February 2026", title: "Best lipstick ever", text: "The Velvet Rose lipstick is absolutely stunning. The shade Rose Petal is my everyday go-to. It stays on through meals and doesn't dry out my lips at all.", verified: true, productId: "velvet-rose-lipstick" },
  { id: "r3", name: "Jessica L.", avatar: "JL", rating: 5, date: "March 2026", title: "Obsessed with this palette!", text: "The Rose Garden palette is a dream. Every shade is pigmented, blendable, and the color story is gorgeous. I reach for this every single day.", verified: true, productId: "eye-palette" },
  { id: "r4", name: "Priya R.", avatar: "PR", rating: 4, date: "January 2026", title: "Love the natural finish", text: "The Silk Skin Foundation gives such a beautiful, natural finish. It looks like real skin but better. The coverage is buildable which I really appreciate.", verified: true, productId: "silk-foundation" },
  { id: "r5", name: "Emma T.", avatar: "ET", rating: 5, date: "March 2026", title: "Game changer for my skin", text: "The overnight mask is incredible. I put it on before bed and wake up with the most glowing, plump skin. It's like getting a facial while you sleep!", verified: true, productId: "overnight-mask" },
  { id: "r6", name: "Olivia N.", avatar: "ON", rating: 5, date: "February 2026", title: "Can't live without this mascara", text: "Lash Queen is the only mascara I use now. It gives incredible volume without clumping and it truly doesn't smudge. Even on hot days, it stays perfect.", verified: true, productId: "lash-queen-mascara" },
];

export const bundles = [
  { id: "b1", name: "The Everyday Glow Bundle", price: 89, originalPrice: 120, products: ["glow-serum", "rose-mist", "cleanser-balm"], image: IMG("photo-1620916566398-39f1143ab7be", 800, 500) },
  { id: "b2", name: "The Perfect Lip Set", price: 68, originalPrice: 86, products: ["velvet-rose-lipstick", "lip-gloss-set"], image: IMG("photo-1583241800698-e8ab01830a07", 800, 500) },
  { id: "b3", name: "Full Glam Collection", price: 129, originalPrice: 166, products: ["silk-foundation", "cloud-blush", "lash-queen-mascara", "brow-pencil"], image: IMG("photo-1596462502278-27bfdc403348", 800, 500) },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.badge === "bestseller");
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.badge === "new");
}

export function getTrending(): Product[] {
  return products.filter((p) => p.badge === "trending" || p.badge === "bestseller");
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProduct(productId);
  if (!product) return products.slice(0, 4);
  return products
    .filter((p) => p.id !== productId && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);
}
