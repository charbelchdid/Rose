"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { bundles, getProduct } from "@/data/products";
import { useCart } from "@/store/cart";

export default function BundlesPage() {
  const cart = useCart();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">
            Bundles & Offers
          </h1>
          <p className="text-warm-gray text-sm mt-3 max-w-md mx-auto">
            Save more when you shop our curated bundles. Perfect for gifting or treating yourself.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8">
          {bundles.map((bundle) => {
            const bundleProducts = bundle.products.map(getProduct).filter(Boolean);
            const savings = bundle.originalPrice - bundle.price;

            return (
              <div key={bundle.id} className="bg-white rounded-3xl overflow-hidden border border-blush/30 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image src={bundle.image} alt={bundle.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Save ${savings}
                    </div>
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-light text-charcoal">{bundle.name}</h2>
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="text-3xl font-semibold text-charcoal">${bundle.price}</span>
                      <span className="text-lg text-warm-gray line-through">${bundle.originalPrice}</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <p className="text-xs text-warm-gray uppercase tracking-wider font-medium">Includes:</p>
                      {bundleProducts.map((product) => product && (
                        <div key={product.id} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-blush/30 shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${product.id}`} className="text-sm font-medium text-charcoal hover:text-rose transition-colors truncate block">
                              {product.name}
                            </Link>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={10} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-warm-gray">${product.price}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        bundleProducts.forEach((product) => {
                          if (product) {
                            cart.addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                          }
                        });
                      }}
                      className="mt-8 w-full bg-charcoal hover:bg-charcoal/90 text-white py-4 rounded-full text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                    >
                      <ShoppingBag size={16} /> Add Bundle to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
