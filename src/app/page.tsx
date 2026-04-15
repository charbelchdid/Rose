"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Truck, Shield, Leaf, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { products, collections, reviews, getBestsellers, getTrending } from "@/data/products";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush via-rose-light/40 to-champagne/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center min-h-0 md:min-h-[80vh] py-10 md:py-0">
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block text-rose text-xs tracking-[0.3em] uppercase font-semibold mb-4 bg-white/60 px-4 py-1.5 rounded-full">
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-charcoal tracking-tight">
              Unveil Your
              <br />
              <span className="font-medium italic text-rose">Natural Glow</span>
            </h1>
            <p className="mt-6 text-warm-gray text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
              Premium beauty essentials crafted with clean ingredients. 
              Because you deserve to feel beautiful, naturally.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/collections"
                className="bg-charcoal hover:bg-charcoal/90 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/collections?filter=bestseller"
                className="bg-white/70 hover:bg-white text-charcoal px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all border border-blush-dark/20"
              >
                Best Sellers
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start text-xs text-warm-gray">
              <span className="flex items-center gap-1.5"><Leaf size={14} className="text-green-600" /> Clean Beauty</span>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-rose" /> Cruelty Free</span>
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-charcoal" /> Free Shipping</span>
            </div>
          </div>
          {/* Mobile hero image */}
          <div className="relative md:hidden mt-4 -mx-4 sm:-mx-6">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-3xl">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop&q=80"
                alt="Beauty products"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blush/60 to-transparent" />
            </div>
          </div>

          {/* Desktop hero image */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-[3/4] max-w-lg ml-auto">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop&q=80"
                alt="Beauty products"
                fill
                className="object-cover rounded-[2rem] shadow-2xl"
                priority
                sizes="(max-width: 1024px) 50vw, 500px"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <span className="text-xs text-charcoal font-medium">4.9/5</span>
                </div>
                <p className="text-[11px] text-warm-gray mt-1">Loved by 50,000+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-champagne/40 rounded-full blur-3xl" />
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Explore</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
            Shop by Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.slice(0, 3).map((col) => (
            <Link
              key={col.id}
              href={`/collections?category=${col.name}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-medium">{col.name}</h3>
                <p className="text-white/70 text-sm mt-1">{col.description}</p>
                <span className="inline-flex items-center gap-1 text-white/90 text-xs mt-3 tracking-wide uppercase group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = getTrending();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-light-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Trending</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
              What Everyone&apos;s Loving
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-blush-dark/30 flex items-center justify-center hover:bg-blush transition-colors" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-blush-dark/30 flex items-center justify-center hover:bg-blush transition-colors" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x">
          {trending.map((product) => (
            <div key={product.id} className="min-w-[200px] sm:min-w-[240px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const bestsellers = getBestsellers();
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Customer Favorites</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
            Our Best Sellers
          </h2>
          <p className="text-warm-gray text-sm mt-3 max-w-md mx-auto">
            Tried, tested, and adored by thousands. These are the products our community can&apos;t live without.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/collections?filter=bestseller" className="inline-flex items-center gap-2 text-charcoal hover:text-rose text-sm tracking-wide transition-colors border-b border-charcoal hover:border-rose pb-1">
            View All Best Sellers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BeautyBenefits() {
  const benefits = [
    { icon: <Leaf size={28} />, title: "Clean Ingredients", desc: "Every product is made with natural, safe ingredients you can trust" },
    { icon: <Shield size={28} />, title: "Cruelty-Free", desc: "Never tested on animals. Beauty without compromise" },
    { icon: <Sparkles size={28} />, title: "Dermatologist Tested", desc: "Gentle on all skin types, dermatologist approved" },
    { icon: <Truck size={28} />, title: "Free Shipping", desc: "Complimentary shipping on all orders over $75" },
  ];

  return (
    <section className="py-16 md:py-24 bg-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Why Rosé</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
            Beauty You Can Trust
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-rose shadow-sm group-hover:shadow-md transition-shadow mb-4">
                {b.icon}
              </div>
              <h3 className="font-medium text-charcoal text-sm mb-2">{b.title}</h3>
              <p className="text-xs text-warm-gray leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
            What Our Community Says
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-blush/30">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                ))}
              </div>
              <h4 className="font-medium text-charcoal text-sm mb-2">&ldquo;{review.title}&rdquo;</h4>
              <p className="text-warm-gray text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-blush/30">
                <div className="w-9 h-9 rounded-full bg-rose-light flex items-center justify-center text-rose text-xs font-semibold">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{review.name}</p>
                  <p className="text-[11px] text-warm-gray flex items-center gap-1">
                    {review.verified && <Shield size={10} className="text-green-500" />}
                    {review.verified ? "Verified Purchase" : review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramGallery() {
  const images = [
    "photo-1596462502278-27bfdc403348",
    "photo-1583241800698-e8ab01830a07",
    "photo-1620916566398-39f1143ab7be",
    "photo-1512496015851-a90fb38ba796",
    "photo-1586495777744-4413f21062fa",
    "photo-1571781926291-c477ebfd024b",
  ];

  return (
    <section className="py-16 md:py-24 bg-light-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">@rosebeauty</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
            Join Our Community
          </h2>
          <p className="text-warm-gray text-sm mt-2">Share your looks with #RoséGlow</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {images.map((img, i) => (
            <a
              key={i}
              href="#"
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={`https://images.unsplash.com/${img}?w=300&h=300&fit=crop&q=80`}
                alt="Instagram post"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity tracking-wide">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-light via-blush to-champagne p-8 md:p-16 text-center">
          <div className="relative z-10">
            <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Limited Time</span>
            <h2 className="text-3xl md:text-5xl font-light text-charcoal mt-3 tracking-tight">
              Get 20% Off Your First Order
            </h2>
            <p className="text-warm-gray text-sm mt-4 max-w-md mx-auto">
              Join the Rosé family and enjoy exclusive savings. Use code <strong className="text-charcoal">BEAUTY20</strong> at checkout.
            </p>
            <Link
              href="/collections"
              className="inline-block mt-8 bg-charcoal hover:bg-charcoal/90 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
            >
              Shop the Sale
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const newProducts = products.filter(p => p.badge === "new");
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Just Dropped</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2 tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link href="/collections?filter=new" className="hidden sm:inline-flex items-center gap-2 text-charcoal hover:text-rose text-sm tracking-wide transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {[...newProducts, ...products.filter(p => p.badge !== "new").slice(0, 4 - newProducts.length)].slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <TrendingProducts />
      <BestSellers />
      <NewArrivals />
      <BeautyBenefits />
      <PromoBanner />
      <Testimonials />
      <InstagramGallery />
    </>
  );
}
