"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "Orders & Shipping",
    questions: [
      { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) is available at checkout. International orders typically arrive in 7-14 business days." },
      { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders over $75. Use the promo bar at the top of our site for the latest shipping offers." },
      { q: "Can I track my order?", a: "Absolutely! Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order in your account dashboard." },
      { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries worldwide. International shipping rates and delivery times vary by destination." },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Items must be unused, in their original packaging, and in resalable condition. Sale items and gift cards are final sale." },
      { q: "How do I initiate a return?", a: "Contact our support team at hello@rosebeauty.com with your order number. We'll provide you with a prepaid return label and instructions." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method." },
    ],
  },
  {
    title: "Products",
    questions: [
      { q: "Are your products cruelty-free?", a: "Yes! All Rosé Beauty products are 100% cruelty-free. We never test on animals and we don't sell in markets that require animal testing." },
      { q: "Are your products vegan?", a: "Most of our products are vegan. Each product page clearly indicates whether the product is vegan. Look for the 'Vegan' badge on product listings." },
      { q: "What if I have sensitive skin?", a: "All our products are dermatologist-tested and formulated without common irritants. However, we always recommend doing a patch test before full use, especially if you have known allergies." },
      { q: "How should I store my products?", a: "Store products in a cool, dry place away from direct sunlight. Skincare products with active ingredients like vitamin C should be used within 6 months of opening." },
    ],
  },
  {
    title: "Payments & Discounts",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All payments are processed securely." },
      { q: "How do I use a discount code?", a: "Enter your discount code in the 'Discount Code' field in the shopping cart or at checkout. Codes are case-insensitive and only one code can be used per order." },
      { q: "Do you offer gift cards?", a: "Yes! Digital gift cards are available in denominations of $25, $50, $75, and $100. They make the perfect gift for any beauty lover." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredSections = searchQuery.length >= 2
    ? FAQ_SECTIONS.map((section) => ({
        ...section,
        questions: section.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((s) => s.questions.length > 0)
    : FAQ_SECTIONS;

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-warm-gray text-sm mt-3 max-w-md mx-auto">
            Find answers to common questions about orders, products, and more.
          </p>
          <div className="max-w-lg mx-auto mt-8 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-blush-dark/30 rounded-full pl-11 pr-5 py-3.5 text-sm focus:outline-none focus:border-rose shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-warm-gray">No questions found matching &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-medium text-charcoal mb-4">{section.title}</h2>
                <div className="space-y-2">
                  {section.questions.map((item) => {
                    const key = `${section.title}-${item.q}`;
                    const isOpen = openItems.has(key);
                    return (
                      <div key={key} className="bg-white rounded-2xl border border-blush/30 overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="flex items-center justify-between w-full px-6 py-4 text-left text-sm font-medium text-charcoal hover:text-rose transition-colors"
                        >
                          {item.q}
                          {isOpen ? <ChevronUp size={16} className="shrink-0 ml-4" /> : <ChevronDown size={16} className="shrink-0 ml-4" />}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 text-sm text-warm-gray leading-relaxed animate-fade-in">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center bg-blush/30 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl font-medium text-charcoal mb-3">Still Have Questions?</h3>
          <p className="text-sm text-warm-gray mb-6">Our team is happy to help with anything you need.</p>
          <Link
            href="/contact"
            className="inline-block bg-charcoal hover:bg-charcoal/90 text-white px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
