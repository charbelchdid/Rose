"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export function CartDrawer() {
  const cart = useCart();
  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !cart.isOpen) return null;

  const handleApplyDiscount = () => {
    setDiscountError("");
    if (!cart.applyDiscount(discountInput)) {
      setDiscountError("Invalid discount code");
    }
    setDiscountInput("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] animate-fade-in"
        onClick={() => cart.setCartOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-blush/30">
          <h2 className="text-lg font-medium tracking-wide text-charcoal">
            Your Bag ({cart.itemCount()})
          </h2>
          <button onClick={() => cart.setCartOpen(false)} className="p-1 text-warm-gray hover:text-charcoal" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-blush/40 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-rose" />
            </div>
            <p className="text-charcoal font-medium mb-2">Your bag is empty</p>
            <p className="text-sm text-warm-gray mb-6">Discover our beautiful products and treat yourself</p>
            <Link
              href="/collections"
              className="bg-charcoal text-white px-8 py-3 rounded-full text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
              onClick={() => cart.setCartOpen(false)}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.items.map((item) => {
                const key = item.shade ? `${item.id}-${item.shade}` : item.id;
                return (
                  <div key={key} className="flex gap-4 py-3 border-b border-blush/20 last:border-0">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-blush/30 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-charcoal truncate">{item.name}</h4>
                      {item.shade && <p className="text-xs text-warm-gray mt-0.5">Shade: {item.shade}</p>}
                      <p className="text-sm font-semibold text-charcoal mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-blush-dark/30 rounded-full">
                          <button
                            onClick={() => cart.updateQuantity(item.id, item.quantity - 1, item.shade)}
                            className="p-1.5 text-warm-gray hover:text-charcoal"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => cart.updateQuantity(item.id, item.quantity + 1, item.shade)}
                            className="p-1.5 text-warm-gray hover:text-charcoal"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => cart.removeItem(item.id, item.shade)}
                          className="p-1 text-warm-gray hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discount & totals */}
            <div className="border-t border-blush/30 px-6 py-4 space-y-3 bg-light-gray/50">
              {/* Discount code */}
              {!cart.discountCode ? (
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                      <input
                        type="text"
                        placeholder="Discount code"
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value)}
                        className="w-full bg-white border border-blush-dark/30 rounded-full pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-rose"
                      />
                    </div>
                    <button
                      onClick={handleApplyDiscount}
                      className="bg-charcoal text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-charcoal/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 rounded-full px-4 py-2">
                  <span className="text-sm text-green-700 font-medium flex items-center gap-2">
                    <Tag size={14} /> {cart.discountCode} (-{cart.discountPercent}%)
                  </span>
                  <button onClick={cart.removeDiscount} className="text-green-700 hover:text-red-500 text-xs">
                    Remove
                  </button>
                </div>
              )}

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-warm-gray">
                  <span>Subtotal</span>
                  <span>${cart.subtotal().toFixed(2)}</span>
                </div>
                {cart.discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${(cart.subtotal() - cart.total()).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-warm-gray">
                  <span>Shipping</span>
                  <span>{cart.subtotal() >= 75 ? "Free" : "$5.99"}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-charcoal pt-2 border-t border-blush-dark/20">
                <span>Total</span>
                <span>${(cart.total() + (cart.subtotal() < 75 ? 5.99 : 0)).toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-rose hover:bg-rose-dark text-white text-center py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors"
                onClick={() => cart.setCartOpen(false)}
              >
                Checkout · ${(cart.total() + (cart.subtotal() < 75 ? 5.99 : 0)).toFixed(2)}
              </Link>

              <Link
                href="/collections"
                className="block text-center text-sm text-warm-gray hover:text-rose transition-colors"
                onClick={() => cart.setCartOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
