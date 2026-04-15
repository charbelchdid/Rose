"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/data/products";

const BADGE_STYLES: Record<string, string> = {
  bestseller: "bg-rose text-white",
  new: "bg-charcoal text-white",
  sale: "bg-red-500 text-white",
  limited: "bg-amber-600 text-white",
  trending: "bg-gradient-to-r from-rose to-nude text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const inWishlist = wishlist.has(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold ${BADGE_STYLES[product.badge]}`}>
            {product.badge === "sale" ? `${discount}% off` : product.badge.replace("-", " ")}
          </span>
        )}
        {/* Quick actions — always visible on mobile, hover on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 flex gap-2 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              cart.addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
            }}
            className="flex-1 bg-charcoal/90 hover:bg-charcoal text-white py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-wide font-medium flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-sm transition-colors"
          >
            <ShoppingBag size={13} /> <span className="hidden xs:inline">Add to</span> Bag
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              wishlist.toggle(product.id);
            }}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors shrink-0 ${
              inWishlist ? "bg-rose text-white" : "bg-white/90 hover:bg-white text-charcoal"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
            />
          ))}
          <span className="text-[11px] text-warm-gray ml-1">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-charcoal group-hover:text-rose transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-charcoal">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-warm-gray line-through">${product.originalPrice}</span>
          )}
        </div>
        {/* Shades indicator */}
        {product.shades && (
          <div className="flex items-center gap-1 mt-2">
            {product.shades.slice(0, 5).map((shade) => (
              <div
                key={shade.name}
                className="w-3.5 h-3.5 rounded-full border border-blush-dark/30"
                style={{ backgroundColor: shade.color }}
                title={shade.name}
              />
            ))}
            {product.shades.length > 5 && (
              <span className="text-[10px] text-warm-gray">+{product.shades.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
