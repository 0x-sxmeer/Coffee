"use client";

import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "House Blend",
    desc: "Chocolate, Nutty, Smooth",
    price: "$18.00",
    image: "/house_blend.png",
  },
  {
    id: 2,
    name: "Ethiopian Yirgacheffe",
    desc: "Floral, Citrus, Bright",
    price: "$22.00",
    image: "/ethiopian.png",
  },
  {
    id: 3,
    name: "Colombia Huila",
    desc: "Caramel, Orange, Balanced",
    price: "$20.00",
    image: "/colombia.png",
  },
];

export default function ProductGrid() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-5xl font-bold text-homie-green">
            Our Roasts
          </h2>
          <p className="mx-auto max-w-2xl font-light text-gray-600">
            Small batch roasted in Brooklyn. Sourced directly from farmers we know by name.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group relative cursor-pointer"
            >
              {/* Card Container */}
              <div className="aspect-[4/5] w-full relative flex items-center justify-center bg-gray-50 rounded-3xl overflow-hidden transition-colors group-hover:bg-gray-100">
                
                {/* Product Image with Hover Effect */}
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-3/4 object-contain drop-shadow-xl z-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
                />

                {/* "Quick Add" Circle Overlay */}
                <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-homie-green text-white flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg z-20">
                  <span className="text-xl">+</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-start px-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-homie-green transition-colors font-serif">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-light tracking-wide uppercase">{product.desc}</p>
                </div>
                <span className="font-mono text-lg font-medium text-homie-green">
                  {product.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
