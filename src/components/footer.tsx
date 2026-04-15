"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const LINKS = {
  Shop: [
    { label: "All Products", href: "/collections" },
    { label: "Best Sellers", href: "/collections?filter=bestseller" },
    { label: "New Arrivals", href: "/collections?filter=new" },
    { label: "Bundles & Offers", href: "/bundles" },
    { label: "Gift Cards", href: "#" },
  ],
  Help: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/faq" },
    { label: "Track Order", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Size Guide", href: "#" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Affiliates", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Newsletter */}
      <div className="border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-light tracking-wide text-cream mb-3">
              Join the Rosé Club
            </h3>
            <p className="text-sm text-cream/60 mb-6">
              Be the first to know about new launches, exclusive offers, and beauty tips.
              Get 10% off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-cream/10 border border-cream/20 rounded-full px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-rose-light"
              />
              <button
                type="submit"
                className="bg-rose hover:bg-rose-dark text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-light tracking-[0.15em] text-cream uppercase">
              Rosé
            </Link>
            <p className="text-sm text-cream/50 mt-4 leading-relaxed">
              Premium beauty products crafted with love. Cruelty-free, clean ingredients, stunning results.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream/50 hover:text-rose-light transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-cream/50 hover:text-rose-light transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-cream/50 hover:text-rose-light transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-cream mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-wrap gap-6 text-xs text-cream/40">
          <span className="flex items-center gap-2">
            <Mail size={14} /> hello@rosebeauty.com
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} /> +1 (555) 123-4567
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} /> Los Angeles, CA
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/30">
          <p>&copy; {new Date().getFullYear()} Rosé Beauty. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-cream/60 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cream/60 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-cream/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
