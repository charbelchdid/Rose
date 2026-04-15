"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

const CATEGORIES = ["All", "Makeup", "Skincare"];
const SUBCATEGORIES: Record<string, string[]> = {
  All: [],
  Makeup: ["All", "Lips", "Eyes", "Face", "Cheeks", "Brows"],
  Skincare: ["All", "Serums", "Cleansers", "Masks", "Mists", "Body"],
};
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

function CollectionsContent() {
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category") || "All";
  const paramSub = searchParams.get("sub") || "";
  const paramFilter = searchParams.get("filter") || "";

  const [category, setCategory] = useState(paramCategory);
  const [subcategory, setSubcategory] = useState(paramSub);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }
    if (subcategory && subcategory !== "All") {
      result = result.filter((p) => p.subcategory === subcategory);
    }
    if (paramFilter) {
      result = result.filter((p) => p.badge === paramFilter);
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (a.badge === "new" ? -1 : 1)); break;
    }

    return result;
  }, [category, subcategory, sort, paramFilter]);

  const title = paramFilter
    ? paramFilter === "bestseller" ? "Best Sellers" : paramFilter === "new" ? "New Arrivals" : "Shop All"
    : category !== "All" ? category : "All Products";

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">{title}</h1>
          <p className="text-warm-gray text-sm mt-3">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-charcoal hover:text-rose transition-colors border border-blush-dark/30 px-4 py-2.5 rounded-full"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Category pills */}
          <div className="hidden md:flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setSubcategory(""); }}
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  category === cat
                    ? "bg-charcoal text-white"
                    : "bg-blush/40 text-charcoal hover:bg-blush"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-blush-dark/30 rounded-full px-4 sm:px-5 py-2.5 pr-9 sm:pr-10 text-xs sm:text-sm text-charcoal cursor-pointer focus:outline-none focus:border-rose max-w-[140px] sm:max-w-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white border border-blush/30 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-charcoal">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-warm-gray hover:text-charcoal" aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Mobile category */}
              <div className="md:hidden">
                <p className="text-xs text-warm-gray uppercase tracking-wider mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setSubcategory(""); }}
                      className={`px-4 py-2 rounded-full text-xs transition-colors ${
                        category === cat ? "bg-charcoal text-white" : "bg-blush/40 text-charcoal hover:bg-blush"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Subcategory */}
              {category !== "All" && SUBCATEGORIES[category]?.length > 0 && (
                <div>
                  <p className="text-xs text-warm-gray uppercase tracking-wider mb-2">Type</p>
                  <div className="flex flex-wrap gap-2">
                    {SUBCATEGORIES[category].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSubcategory(sub)}
                        className={`px-4 py-2 rounded-full text-xs transition-colors ${
                          subcategory === sub ? "bg-rose text-white" : "bg-blush/40 text-charcoal hover:bg-blush"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-warm-gray text-lg">No products found</p>
            <p className="text-sm text-warm-gray/60 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-shimmer w-32 h-8 rounded-full" /></div>}>
      <CollectionsContent />
    </Suspense>
  );
}
