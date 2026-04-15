"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.items.includes(p.id));

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">Your Wishlist</h1>
          <p className="text-warm-gray text-sm mt-3">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-blush/40 flex items-center justify-center mb-4">
              <Heart size={32} className="text-rose" />
            </div>
            <h2 className="text-xl font-medium text-charcoal mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-warm-gray mb-8">Save your favorite products to shop later</p>
            <Link
              href="/collections"
              className="inline-block bg-charcoal hover:bg-charcoal/90 text-white px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {wishlistProducts.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={wishlist.clear}
                  className="text-sm text-warm-gray hover:text-red-500 transition-colors underline"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
