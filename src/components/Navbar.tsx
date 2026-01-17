"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled ? "bg-homie-green/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl font-bold text-white tracking-tighter">HOMIE.</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Story", "Shop", "Subscription", "Locations"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>

      <button className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-homie-green">
        MY CART (0)
      </button>
    </motion.nav>
  );
}
