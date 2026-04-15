import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sparkles, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blush via-rose-light/30 to-champagne/40 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight leading-tight">
            Beauty That Feels
            <br />
            <span className="italic font-medium text-rose">Like You</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Rosé Beauty was born from a simple belief: every woman deserves products that are as beautiful, 
            thoughtful, and unique as she is.
          </p>
        </div>
      </div>

      {/* Founder section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&q=80"
              alt="Founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Meet the Founder</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-3 tracking-tight">
              A Letter from Sophia
            </h2>
            <div className="mt-6 space-y-4 text-warm-gray text-sm leading-relaxed">
              <p>
                Growing up, I struggled to find beauty products that truly understood me — products that were 
                clean, luxurious, and made me feel confident without compromising my values.
              </p>
              <p>
                In 2023, after years working in the beauty industry, I decided to create what I couldn&apos;t find: 
                a brand that combines premium quality with clean, cruelty-free formulas. Every Rosé product is 
                crafted with intention, from ingredient selection to the final packaging.
              </p>
              <p>
                Today, Rosé Beauty is a community of over 50,000 women who believe that beauty should be 
                joyful, accessible, and kind. Every product we create starts with a question: &ldquo;Would I love 
                this myself?&rdquo; If the answer isn&apos;t an enthusiastic yes, we go back to the drawing board.
              </p>
              <p className="italic text-charcoal font-medium">
                Thank you for being part of this journey. You make Rosé what it is.
              </p>
              <p className="text-charcoal font-medium">— Sophia Rose, Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-blush/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose text-xs tracking-[0.3em] uppercase font-semibold">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-3 tracking-tight">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Leaf size={28} />, title: "Clean Beauty", desc: "We use only natural, safe ingredients. No parabens, sulfates, or harmful chemicals — ever." },
              { icon: <Heart size={28} />, title: "Cruelty-Free", desc: "We never test on animals. Our commitment to kindness extends to every part of our process." },
              { icon: <Sparkles size={28} />, title: "Premium Quality", desc: "Every formula is developed with dermatologists and beauty experts for exceptional results." },
              { icon: <Globe size={28} />, title: "Sustainability", desc: "Eco-conscious packaging, responsible sourcing, and a commitment to our planet's future." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-light/30 flex items-center justify-center text-rose mb-4">
                  {v.icon}
                </div>
                <h3 className="font-medium text-charcoal mb-3">{v.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight">
            Ready to Experience Rosé?
          </h2>
          <p className="text-warm-gray text-sm mt-4 max-w-md mx-auto">
            Discover our curated collection of clean, luxurious beauty products.
          </p>
          <Link
            href="/collections"
            className="inline-block mt-8 bg-charcoal hover:bg-charcoal/90 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
