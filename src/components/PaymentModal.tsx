import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "monthly" | "annual" | null;
}

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const planDetails = {
    monthly: {
      name: "Monthly Plan",
      price: "$200/mo",
      color: "#00E5FF",
    },
    annual: {
      name: "Annual Plan",
      price: "$1,999/yr",
      savings: "Save $401",
      color: "#39FF14",
    },
  };

  const currentPlan = plan ? planDetails[plan] : null;

  // Fetch Square Checkout URL (via Netlify function)
  useEffect(() => {
    if (!isOpen || !plan) return;

    async function loadCheckout() {
      try {
        const response = await fetch("/.netlify/functions/createCheckout", {
          method: "POST",
          body: JSON.stringify({ plan }),
        });

        const data = await response.json();

        if (data.url) {
          setCheckoutUrl(data.url);
        }
      } catch (err) {
        console.error("Checkout creation failed:", err);
      }
    }

    loadCheckout();
  }, [isOpen, plan]);

  if (!currentPlan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative bg-[#0F0F0F] border-2 w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto rounded-lg"
              style={{ borderColor: currentPlan.color }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >

              {/* Glowing frame */}
              <motion.div
                className="absolute inset-0 border-2 pointer-events-none rounded-lg"
                style={{ borderColor: currentPlan.color }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${currentPlan.color}, inset 0 0 20px ${currentPlan.color}`,
                    `0 0 40px ${currentPlan.color}, inset 0 0 40px ${currentPlan.color}`,
                    `0 0 20px ${currentPlan.color}, inset 0 0 20px ${currentPlan.color}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Corner Accents */}
              {[
                { pos: "top-0 left-0", border: "border-t-4 border-l-4" },
                { pos: "top-0 right-0", border: "border-t-4 border-r-4" },
                { pos: "bottom-0 left-0", border: "border-b-4 border-l-4" },
                { pos: "bottom-0 right-0", border: "border-b-4 border-r-4" },
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.pos} w-16 h-16 ${corner.border}`}
                  style={{ borderColor: currentPlan.color }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 border-2 hover:bg-[#1A1A1A] transition-colors rounded-md"
                style={{ borderColor: currentPlan.color }}
              >
                <X className="w-6 h-6" style={{ color: currentPlan.color }} />
              </button>

              {/* Modal Content */}
              <div className="relative z-10 p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <motion.h2
                    className="text-3xl mb-2 tracking-wider"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: currentPlan.color,
                      textShadow: `0 0 20px ${currentPlan.color}`,
                    }}
                  >
                    {currentPlan.name}
                  </motion.h2>

                  <p className="text-4xl font-bold" style={{ color: currentPlan.color }}>
                    {currentPlan.price}
                  </p>

                  {plan === "annual" && currentPlan.savings && (
                    <p className="text-sm text-gray-400 mt-1">{currentPlan.savings}</p>
                  )}
                </div>

                {/* Checkout iframe */}
                {checkoutUrl ? (
                  <iframe
                    src={checkoutUrl}
                    className="w-full h-[600px] border-0 rounded-lg"
                  />
                ) : (
                  <p className="text-center text-gray-400 py-20">
                    Loading secure checkout…
                  </p>
                )}

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure checkout powered by Square
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
