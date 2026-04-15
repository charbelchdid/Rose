"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, CreditCard, Truck, ChevronLeft, CheckCircle, Tag } from "lucide-react";
import { useCart } from "@/store/cart";

export default function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const shipping = cart.subtotal() >= 75 ? 0 : 5.99;
  const finalTotal = cart.total() + shipping;

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-light text-charcoal mb-3">Order Confirmed!</h1>
          <p className="text-warm-gray text-sm mb-2">Order #RSB-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <p className="text-warm-gray text-sm mb-8">
            Thank you for your purchase! You&apos;ll receive a confirmation email shortly with tracking details.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-charcoal hover:bg-charcoal/90 text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-light text-charcoal mb-4">Your cart is empty</h1>
          <Link href="/collections" className="text-rose hover:text-rose-dark text-sm underline">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray/30">
      {/* Secure header */}
      <div className="bg-white border-b border-blush/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-light tracking-[0.15em] text-charcoal uppercase">
            Rosé
          </Link>
          <div className="flex items-center gap-2 text-xs text-warm-gray">
            <Lock size={14} /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link href="/collections" className="inline-flex items-center gap-1 text-sm text-warm-gray hover:text-charcoal transition-colors mb-8">
          <ChevronLeft size={16} /> Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Form — order reversed on mobile so summary shows first */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Steps */}
            <div className="flex items-center gap-4 mb-8">
              {["info", "payment"].map((s, i) => (
                <button
                  key={s}
                  onClick={() => s === "info" && setStep("info")}
                  className={`flex items-center gap-2 text-sm ${step === s ? "text-charcoal font-medium" : "text-warm-gray"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step === s ? "bg-charcoal text-white" :
                    (s === "info" && step === "payment") ? "bg-green-500 text-white" : "bg-blush text-warm-gray"
                  }`}>
                    {s === "info" && step === "payment" ? "✓" : i + 1}
                  </span>
                  {s === "info" ? "Information" : "Payment"}
                </button>
              ))}
            </div>

            {step === "info" && (
              <form onSubmit={(e) => { e.preventDefault(); setStep("payment"); }} className="space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/30">
                  <h2 className="text-lg font-medium text-charcoal mb-5">Contact Information</h2>
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                  />
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/30">
                  <h2 className="text-lg font-medium text-charcoal mb-5">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="First name" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                      <input required placeholder="Last name" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    </div>
                    <input required placeholder="Address" className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    <input placeholder="Apartment, suite, etc. (optional)" className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <input required placeholder="City" className="col-span-2 sm:col-span-1 border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                      <input required placeholder="State" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                      <input required placeholder="ZIP code" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    </div>
                    <input placeholder="Phone (optional)" className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  cart.clearCart();
                  setStep("success");
                }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/30">
                  <h2 className="text-lg font-medium text-charcoal mb-5 flex items-center gap-2">
                    <CreditCard size={20} /> Payment Details
                  </h2>
                  <div className="space-y-4">
                    <input required placeholder="Card number" className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    <input required placeholder="Cardholder name" className="w-full border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="MM/YY" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                      <input required placeholder="CVC" className="border border-blush-dark/30 rounded-xl px-4 py-3.5 text-sm bg-light-gray/30 focus:bg-white transition-colors" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-warm-gray">
                    <Lock size={12} /> Your payment info is encrypted and secure
                  </div>
                </div>

                <button type="submit" className="w-full bg-rose hover:bg-rose-dark text-white py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <Lock size={16} /> Place Order · ${finalTotal.toFixed(2)}
                </button>

                <button type="button" onClick={() => setStep("info")} className="w-full text-center text-sm text-warm-gray hover:text-charcoal transition-colors">
                  Back to Information
                </button>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/30 sticky top-28">
              <h2 className="text-lg font-medium text-charcoal mb-5">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.shade ? `${item.id}-${item.shade}` : item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-blush/30 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-charcoal truncate">{item.name}</h4>
                      {item.shade && <p className="text-xs text-warm-gray">{item.shade}</p>}
                    </div>
                    <span className="text-sm font-medium text-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {cart.discountCode && (
                <div className="flex items-center justify-between py-2 text-sm text-green-600">
                  <span className="flex items-center gap-1"><Tag size={14} /> {cart.discountCode}</span>
                  <span>-{cart.discountPercent}%</span>
                </div>
              )}

              <div className="border-t border-blush/30 pt-4 space-y-2 text-sm">
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
                  <span className="flex items-center gap-1"><Truck size={14} /> Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-charcoal text-base pt-2 border-t border-blush/30">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {cart.subtotal() < 75 && (
                <p className="text-xs text-warm-gray mt-4 text-center">
                  Add ${(75 - cart.subtotal()).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
