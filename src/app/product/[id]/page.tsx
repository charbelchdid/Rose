"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Minus, Plus, Truck, RotateCcw, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { getProduct, getRelatedProducts, reviews } from "@/data/products";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  const related = getRelatedProducts(id);
  const productReviews = reviews.filter((r) => r.productId === id);
  const cart = useCart();
  const wishlist = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(product?.shades?.[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("details");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-charcoal mb-4">Product not found</h1>
          <Link href="/collections" className="text-rose hover:text-rose-dark underline text-sm">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = wishlist.has(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shade: selectedShade || undefined,
    }, quantity);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-warm-gray overflow-x-auto scrollbar-hide">
          <Link href="/" className="hover:text-rose transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/collections" className="hover:text-rose transition-colors shrink-0">Shop</Link>
          <span className="shrink-0">/</span>
          <Link href={`/collections?category=${product.category}`} className="hover:text-rose transition-colors shrink-0">{product.category}</Link>
          <span className="shrink-0">/</span>
          <span className="text-charcoal truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-blush/30">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold ${
                  product.badge === "bestseller" ? "bg-rose text-white" :
                  product.badge === "new" ? "bg-charcoal text-white" :
                  product.badge === "sale" ? "bg-red-500 text-white" :
                  product.badge === "limited" ? "bg-amber-600 text-white" :
                  "bg-gradient-to-r from-rose to-nude text-white"
                }`}>
                  {product.badge === "sale" ? `${discount}% off` : product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-rose" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="md:py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-sm text-warm-gray">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-semibold text-charcoal">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-warm-gray line-through">${product.originalPrice}</span>
                  <span className="text-sm font-medium text-red-500">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="text-warm-gray text-sm leading-relaxed mt-5">{product.description}</p>

            {/* Shades */}
            {product.shades && (
              <div className="mt-6">
                <p className="text-sm font-medium text-charcoal mb-3">
                  Shade: <span className="font-normal text-warm-gray">{selectedShade}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedShade === shade.name ? "border-charcoal scale-110" : "border-blush-dark/30 hover:scale-105"
                      }`}
                      style={{ backgroundColor: shade.color }}
                      title={shade.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-blush-dark/30 rounded-full shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 sm:p-3 text-warm-gray hover:text-charcoal" aria-label="Decrease">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 sm:w-10 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 sm:p-3 text-warm-gray hover:text-charcoal" aria-label="Increase">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-charcoal hover:bg-charcoal/90 text-white py-3.5 sm:py-4 rounded-full text-xs sm:text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
                >
                  Add to Bag — ${(product.price * quantity).toFixed(2)}
                </button>
                <button
                  onClick={() => wishlist.toggle(product.id)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    inWishlist ? "border-rose bg-rose-light/30 text-rose" : "border-blush-dark/30 text-charcoal hover:border-rose hover:text-rose"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: <Truck size={18} />, text: "Free Shipping" },
                { icon: <RotateCcw size={18} />, text: "30-Day Returns" },
                { icon: <Shield size={18} />, text: "Secure Payment" },
              ].map((badge) => (
                <div key={badge.text} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="text-rose">{badge.icon}</div>
                  <span className="text-[11px] text-warm-gray">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Accordion sections */}
            <div className="mt-8 border-t border-blush/30 divide-y divide-blush/30">
              {[
                { key: "details", title: "Product Details", content: (
                  <ul className="space-y-2">
                    {product.details.map((d, i) => (
                      <li key={i} className="text-sm text-warm-gray flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )},
                ...(product.ingredients ? [{ key: "ingredients", title: "Ingredients", content: (
                  <p className="text-sm text-warm-gray leading-relaxed">{product.ingredients}</p>
                )}] : []),
                { key: "shipping", title: "Shipping & Returns", content: (
                  <div className="text-sm text-warm-gray space-y-2">
                    <p>Free standard shipping on orders over $75. Express shipping available.</p>
                    <p>30-day hassle-free returns. Items must be unused and in original packaging.</p>
                  </div>
                )},
              ].map((section) => (
                <div key={section.key}>
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="flex items-center justify-between w-full py-4 text-sm font-medium text-charcoal hover:text-rose transition-colors"
                  >
                    {section.title}
                    {openSection === section.key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openSection === section.key && (
                    <div className="pb-4 animate-fade-in">{section.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-light text-charcoal mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {productReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6 border border-blush/30">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <h4 className="font-medium text-charcoal text-sm">&ldquo;{review.title}&rdquo;</h4>
                  <p className="text-warm-gray text-sm mt-2 leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-warm-gray">
                    <span className="font-medium text-charcoal">{review.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-green-600">
                        <Shield size={10} /> Verified
                      </span>
                    )}
                    <span>· {review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 md:mt-24 pb-20 md:pb-0">
            <h2 className="text-2xl font-light text-charcoal mb-8">You May Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky Add to Bag bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-blush/30 p-3 z-40 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-charcoal truncate">${product.price}</p>
            <p className="text-[11px] text-warm-gray truncate">{product.name}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-charcoal hover:bg-charcoal/90 text-white px-6 py-3 rounded-full text-xs tracking-widest uppercase font-medium transition-all shrink-0"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
