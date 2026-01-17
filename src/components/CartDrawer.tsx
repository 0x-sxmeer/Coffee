"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeFromCart, clearCart, cartTotal } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const handleCheckout = async () => {
    setStatus("processing");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
    // Wait for success animation then clear and close
    setTimeout(() => {
      clearCart();
      setTimeout(() => {
        closeCart();
        setStatus("idle");
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-white p-6 shadow-2xl"
          >
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-homie-green text-white"
                >
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="mb-2 font-serif text-3xl font-bold text-homie-green">Order Confirmed!</h2>
                <p className="text-gray-500">Your coffee is being roasted.</p>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="font-serif text-2xl font-bold text-homie-green">Your Cart</h2>
                  <button
                    onClick={closeCart}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-gray-400">
                      <p className="text-lg">Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                <p className="ml-4 font-mono text-gray-500">${item.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-sm text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t pt-4">
                  <div className="mb-4 flex justify-between text-lg font-bold text-gray-900">
                    <p>Total</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0 || status === "processing"}
                    className="w-full rounded-full bg-homie-green py-4 text-center font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {status === "processing" ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                      "CHECKOUT"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
