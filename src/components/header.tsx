"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useSearch } from "@/store/search";
import { SearchModal } from "./search-modal";
import { CartDrawer } from "./cart-drawer";

const NAV = [
  { label: "Shop", href: "/collections", children: [
    { label: "All Products", href: "/collections" },
    { label: "Makeup", href: "/collections?category=Makeup" },
    { label: "Skincare", href: "/collections?category=Skincare" },
    { label: "Lips", href: "/collections?category=Makeup&sub=Lips" },
    { label: "Eyes", href: "/collections?category=Makeup&sub=Eyes" },
    { label: "Face", href: "/collections?category=Makeup&sub=Face" },
  ]},
  { label: "Best Sellers", href: "/collections?filter=bestseller" },
  { label: "New Arrivals", href: "/collections?filter=new" },
  { label: "Bundles", href: "/bundles" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const cart = useCart();
  const wishlist = useWishlist();
  const search = useSearch();

  return (
    <>
      {/* Promo bar */}
      <div className="bg-charcoal text-cream text-xs text-center py-2 tracking-widest uppercase font-medium">
        Free shipping on orders over $75 · Use code <span className="text-champagne font-semibold">WELCOME15</span> for 15% off
      </div>

      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-blush-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 -ml-2 text-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-light tracking-[0.15em] text-charcoal uppercase">
                Rosé
              </span>
              <span className="hidden sm:inline text-[10px] tracking-[0.3em] text-warm-gray uppercase mt-1">
                Beauty
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm tracking-wide text-charcoal hover:text-rose transition-colors py-2"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="mt-0.5" />}
                  </Link>
                  {item.children && hoveredNav === item.label && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg py-3 min-w-[180px] animate-fade-in border border-blush/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2 text-sm text-warm-gray hover:text-rose hover:bg-blush/30 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={search.toggle} className="p-2 text-charcoal hover:text-rose transition-colors" aria-label="Search">
                <Search size={20} />
              </button>
              <Link href="/account" className="p-2 text-charcoal hover:text-rose transition-colors hidden sm:block" aria-label="Account">
                <User size={20} />
              </Link>
              <Link href="/wishlist" className="p-2 text-charcoal hover:text-rose transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlist.items.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {wishlist.items.length}
                  </span>
                )}
              </Link>
              <button onClick={() => cart.setCartOpen(true)} className="p-2 text-charcoal hover:text-rose transition-colors relative" aria-label="Cart">
                <ShoppingBag size={20} />
                {cart.itemCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cart.itemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-blush/30 animate-fade-in">
            <nav className="px-4 py-4 space-y-1">
              {NAV.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-3 text-sm tracking-wide text-charcoal hover:text-rose border-b border-blush/20"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-warm-gray hover:text-rose"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/account"
                className="block py-3 text-sm tracking-wide text-charcoal hover:text-rose border-b border-blush/20"
                onClick={() => setMobileOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="/contact"
                className="block py-3 text-sm tracking-wide text-charcoal hover:text-rose"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal />
      <CartDrawer />
    </>
  );
}
