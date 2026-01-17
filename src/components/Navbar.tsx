"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { name: "Story", href: "#story" },
  { name: "Shop", href: "#shop" },
  { name: "Subscription", href: "#" },
  { name: "Locations", href: "#" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent ${
        isScrolled
          ? "bg-homie-green/80 backdrop-blur-md shadow-lg py-4 border-white/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="text-2xl font-black tracking-tighter text-white">
          HOMIE.
        </a>

        {/* Links (Desktop) */}
        <div className="hidden space-x-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Cart Action */}
        <button 
          onClick={toggleCart}
          className="relative rounded-full border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-homie-green"
        >
          My Cart {cartCount > 0 && `(${cartCount})`}
        </button>
      </div>
    </motion.nav>
  );
}
