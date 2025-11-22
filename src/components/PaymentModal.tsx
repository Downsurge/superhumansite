import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js/checkout";

// Load Stripe publishable key
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

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  if (!isOpen || !plan) return null;

  const currentPlan = planDetails[plan];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* OUTER CONTAINER — mobile scroll FIX */}
          <div
            className="
              fixed inset-0 z-50 
              flex items-center justify-center 
              p-4 
              pointer-events-none 
              overflow-y-auto
            "
          >
            {/* MODAL */}
            <motion.div
              className="
                relative 
                bg-[#0F0F0F] 
                border-2 
                w-full 
                max-w-2xl 
                max-h-[90vh] 
                overflow-y-auto 
                overflow-x-hidden 
                pointer-events-auto 
                rounded-lg
              "
              style={{ borderColor: currentPlan.color }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* INTERNAL GLOW FRAME */}
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
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* CORNER ACCENTS */}
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

              {/* Close Button */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4 z-10 
                  p-2 border-2 
                  hover:bg-[#1A1A1A] 
                  transition-colors rounded-md
                "
                style={{ borderColor: currentPlan.color }}
              >
                <X className="w-6 h-6" style={{ color: currentPlan.color }} />
              </button>

              {/* CONTENT */}
              <div className="relative z-10 p-8">
                {/* PLAN HEADER */}
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

                  <p
                    className="text-4xl font-bold"
                    style={{ color: currentPlan.color }}
                  >
                    {currentPlan.price}
                  </p>

                  {plan === "annual" && currentPlan.savings && (
                    <p className="text-sm text-gray-400 mt-1">
                      {currentPlan.savings}
                    </p>
                  )}
                </div>

                {/* STRIPE CHECKOUT */}
                <StripeEmbeddedCheckout plan={plan} color={currentPlan.color} />

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

/* -------------------------------------------------------------------------- */
/*                STRIPE EMBEDDED CHECKOUT WITH EMAIL + MOBILE FIX            */
/* -------------------------------------------------------------------------- */

function StripeEmbeddedCheckout({
  plan,
  color,
}: {
  plan: "monthly" | "annual";
  color: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch checkout session client secret
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/createCheckoutSession", {
          method: "POST",
          body: JSON.stringify({ plan }),
        });

        const data = await res.json();

        if (!data.checkoutSessionClientSecret) {
          throw new Error(data.error || "Failed to create checkout session");
        }

        setClientSecret(data.checkoutSessionClientSecret);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [plan]);

  if (loading)
    return <p className="text-center text-gray-400 py-8">Loading Checkout…</p>;

  if (error)
    return <p className="text-center text-red-400 py-8">{error}</p>;

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <div className="space-y-4">
        {/* NEON EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full 
            p-4 
            rounded-md
            bg-[#0b0b0b]
            text-white
            border-2
            focus:outline-none
            transition-all
            placeholder-gray-500
            text-base
            font-medium
          "
          style={{
            borderColor: color,
            boxShadow: `0 0 12px ${color}44`,
          }}
          required
        />

        {/* Stripe Card Element */}
        <div className="bg-black/40 rounded-lg p-4 border border-white/10">
          <PaymentElement />
        </div>

        <PayButton email={email} />
      </div>
    </CheckoutProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*                          PAY BUTTON + REDIRECT LOGIC                       */
/* -------------------------------------------------------------------------- */

function PayButton({ email }: { email: string }) {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  if (checkoutState.type === "loading") {
    return (
      <p className="text-center text-gray-400 py-4">Preparing payment…</p>
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
    setLocalError("");

    const result = await checkoutState.checkout.confirm({ email });

    if (result.type === "error") {
      setLocalError(result.error.message);
      setLoading(false);
      return;
    }

    // SUCCESS — REDIRECT
    if (result.type === "completed") {
      window.location.href = `/payment-success?session_id=${result.checkoutSessionId}`;
      return;
    }

    if ((result as any).sessionId) {
      window.location.href = `/payment-success?session_id=${result.sessionId}`;
      return;
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleClick}
        disabled={loading || !email}
        className="
          px-6 py-3 
          rounded-md 
          font-semibold 
          tracking-wide 
          border border-white/20
          hover:bg-white/10 
          transition 
          disabled:opacity-50
        "
      >
        {loading ? "Processing…" : "Complete Payment"}
      </button>

      {localError && (
        <p className="text-sm text-red-center text-red-400 max-w-md">
          {localError}
        </p>
      )}
    </div>
  );
}
