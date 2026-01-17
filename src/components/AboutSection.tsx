"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "Altitude", value: "1,800m" },
  { label: "Process", value: "Washed" },
  { label: "Region", value: "Yirgacheffe" },
];

export default function AboutSection() {
  return (
    <section className="relative bg-homie-green text-white py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Typographic Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-[12vw] leading-none font-bold font-serif opacity-10 absolute -top-20 -left-10 select-none">
              ORIGIN
            </h2>
            <div className="relative border-l-2 border-white/20 pl-8 space-y-12">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p className="text-sm font-bold tracking-widest text-white/50 mb-2 uppercase">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-serif">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <h3 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              From Soil <br/> to Sip.
            </h3>
            <p className="text-xl font-light text-white/80 leading-relaxed max-w-lg mb-8">
              We believe that great coffee isn't just made; it's grown. Our partnership with farmers ensures that every cherry is picked at peak ripeness, resulting in a cup that is vibrant, complex, and undeniably fresh.
            </p>
            <p className="text-lg text-white/60 mb-8 border-b border-white/20 pb-8">
              "Coffee is more than a drink. It's a ritual, a craft, and a connection to the earth."
            </p>
            <a href="#shop" className="inline-block text-white font-bold tracking-widest uppercase border-b-2 border-white hover:text-white/80 transition-colors">
              Read Our Full Story
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
