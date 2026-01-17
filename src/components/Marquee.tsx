"use client";

import { motion } from "framer-motion";

const TEXT = "FRESHLY ROASTED IN BROOKLYN • SINGLE ORIGIN SOURCING • SUSTAINABLE FARMING • ";

export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden bg-homie-green py-12 border-y border-white/10">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-homie-green via-transparent to-homie-green opacity-90" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mr-8 text-8xl font-serif font-bold text-white/5 opacity-50 select-none"
          >
            {TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
