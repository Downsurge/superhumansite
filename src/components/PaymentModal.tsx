import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js/checkout";

// Load Stripe with your publishable key (from Vite env)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "monthly" | "annual" | null;
}

const planDetails = {
  monthly: {
    name: "Monthly Plan",
    price: "$199/mo",
    color: "#00E5FF",
  },
  annual: {
    name: "Annual Plan",
    price: "$1,999/yr",
    savings: "Save $401",
    color: "#39FF14",
  },
};

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  if (!isOpen || !plan) return null;

  const currentPlan = planDetails[plan];

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
                    <p className="text-sm text-gray-400 mt-1">
                      {currentPlan.savings}
                    </p>
                  )}
                </div>

                {/* Stripe embedded checkout */}
                <StripeEmbeddedCheckout plan={plan} />

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * This component:
 * - Calls your Netlify function to create a Checkout Session
 * - Gets checkoutSessionClientSecret
 * - Initializes Stripe Custom Checkout
 * - Renders the embedded Payment Element + Pay button
 */
function StripeEmbeddedCheckout({ plan }: { plan: "monthly" | "annual" }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setClientSecret(null);

    (async () => {
      try {
        const res = await fetch(
          "/.netlify/functions/createCheckoutSession",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.checkoutSessionClientSecret) {
          throw new Error(data.error || "Failed to create checkout session");
        }

        if (isMounted) {
          setClientSecret(data.checkoutSessionClientSecret);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Error creating checkout session:", err);
        if (isMounted) {
          setError(err.message || "Payment initialization failed");
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [plan]);

  if (loading) {
    return (
      <p className="text-center text-gray-400 py-8">
        Loading secure Stripe checkout…
      </p>
    );
  }

  if (error || !clientSecret) {
    return (
      <p className="text-center text-red-400 py-8">
        {error || "Unable to initialize payment. Please try again."}
      </p>
    );
  }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-lg p-4 border border-white/10">
          <PaymentElement />
        </div>
        <PayButton />
      </div>
    </CheckoutProvider>
  );
}

/**
 * Submit button that calls checkout.confirm()
 * using Stripe's embedded components API. :contentReference[oaicite:5]{index=5}
 */
function PayButton() {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (checkoutState.type === "loading") {
    return (
      <p className="text-center text-gray-400 py-4">
        Preparing payment…
      </p>
    );
  }

  if (checkoutState.type === "error") {
    return (
      <p className="text-center text-red-400 py-4">
        {checkoutState.error.message}
      </p>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    setLocalError(null);

    const result = await checkoutState.checkout.confirm();

    if (result.type === "error") {
      setLocalError(result.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-6 py-3 rounded-md font-semibold tracking-wide border border-white/20
                   hover:bg-white/10 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Complete Payment"}
      </button>
      {localError && (
        <p className="text-sm text-red-400 text-center max-w-md">
          {localError}
        </p>
      )}
    </div>
  );
}
