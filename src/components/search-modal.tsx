"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useSearch } from "@/store/search";
import { products } from "@/data/products";

export function SearchModal() {
  const { isOpen, query, setQuery, close } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        useSearch.getState().toggle();
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  if (!isOpen) return null;

  const results = query.length >= 2
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80] animate-fade-in" onClick={close} />
      <div className="fixed inset-x-4 sm:inset-x-0 top-0 z-[90] sm:max-w-2xl sm:mx-auto mt-4 sm:mt-20 animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-blush/30">
            <Search size={20} className="text-warm-gray shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-charcoal placeholder:text-warm-gray/60 text-sm bg-transparent outline-none"
            />
            <button onClick={close} className="p-1 text-warm-gray hover:text-charcoal" aria-label="Close search">
              <X size={18} />
            </button>
          </div>

          {query.length >= 2 && (
            <div className="max-h-80 overflow-y-auto p-4">
              {results.length === 0 ? (
                <p className="text-center text-warm-gray text-sm py-8">
                  No products found for &quot;{query}&quot;
                </p>
              ) : (
                <div className="space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-blush/30 transition-colors"
                      onClick={close}
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-blush/30 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-charcoal truncate">{product.name}</h4>
                        <p className="text-xs text-warm-gray">{product.category} · {product.subcategory}</p>
                      </div>
                      <span className="text-sm font-semibold text-charcoal">${product.price}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div className="p-6 text-center">
              <p className="text-xs text-warm-gray">
                Popular: <span className="text-rose cursor-pointer" onClick={() => setQuery("serum")}>Serum</span>
                {" · "}<span className="text-rose cursor-pointer" onClick={() => setQuery("lipstick")}>Lipstick</span>
                {" · "}<span className="text-rose cursor-pointer" onClick={() => setQuery("blush")}>Blush</span>
                {" · "}<span className="text-rose cursor-pointer" onClick={() => setQuery("mascara")}>Mascara</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
