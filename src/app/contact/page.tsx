"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blush/50 via-rose-light/20 to-champagne/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight">Get in Touch</h1>
          <p className="text-warm-gray text-sm mt-3 max-w-md mx-auto">
            We&apos;d love to hear from you. Our team is always here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-medium text-charcoal mb-6">Contact Info</h2>
              <div className="space-y-5">
                {[
                  { icon: <Mail size={18} />, label: "Email", value: "hello@rosebeauty.com" },
                  { icon: <Phone size={18} />, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: <MapPin size={18} />, label: "Address", value: "123 Beauty Lane, Los Angeles, CA 90001" },
                  { icon: <Clock size={18} />, label: "Hours", value: "Mon–Fri: 9am–6pm PST" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-light/30 flex items-center justify-center text-rose shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-warm-gray uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-charcoal mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={20} className="text-green-600" />
                <h3 className="font-medium text-charcoal text-sm">Live Chat on WhatsApp</h3>
              </div>
              <p className="text-xs text-warm-gray mb-4">Get instant support from our beauty consultants.</p>
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-blush/30">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Send size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-2">Message Sent!</h3>
                <p className="text-sm text-warm-gray">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-rose hover:text-rose-dark text-sm underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-blush/30">
                <h2 className="text-xl font-medium text-charcoal mb-6">Send us a Message</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="mt-5">
                  <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Subject</label>
                  <select className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors text-charcoal">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Product Question</option>
                    <option>Returns & Exchanges</option>
                    <option>Wholesale / Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="block text-xs text-warm-gray uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-blush-dark/30 rounded-xl px-4 py-3 text-sm bg-light-gray/30 focus:bg-white transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-charcoal hover:bg-charcoal/90 text-white py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
