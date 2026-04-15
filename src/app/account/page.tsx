"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Heart, ShoppingBag, ArrowRight } from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-warm-gray text-sm mt-3">
            {isLogin ? "Sign in to access your account" : "Join the Rosé Beauty community"}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-white rounded-3xl p-8 border border-blush/30 shadow-sm">
          {/* Toggle */}
          <div className="flex rounded-full bg-light-gray p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors ${
                isLogin ? "bg-charcoal text-white" : "text-warm-gray"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors ${
                !isLogin ? "bg-charcoal text-white" : "text-warm-gray"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      className="w-full border border-blush-dark/30 rounded-xl pl-11 pr-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-blush-dark/30 rounded-xl pl-11 pr-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full border border-blush-dark/30 rounded-xl pl-11 pr-11 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-rose hover:text-rose-dark transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {!isLogin && (
            <p className="text-xs text-warm-gray text-center mt-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-rose underline">Terms</a> and{" "}
              <a href="#" className="text-rose underline">Privacy Policy</a>.
            </p>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link href="/wishlist" className="bg-white rounded-2xl p-5 border border-blush/30 hover:shadow-sm transition-shadow flex items-center gap-3">
            <Heart size={20} className="text-rose" />
            <div>
              <p className="text-sm font-medium text-charcoal">Wishlist</p>
              <p className="text-xs text-warm-gray">View saved items</p>
            </div>
          </Link>
          <Link href="/collections" className="bg-white rounded-2xl p-5 border border-blush/30 hover:shadow-sm transition-shadow flex items-center gap-3">
            <ShoppingBag size={20} className="text-rose" />
            <div>
              <p className="text-sm font-medium text-charcoal">Shop</p>
              <p className="text-xs text-warm-gray flex items-center gap-1">Browse all <ArrowRight size={12} /></p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
