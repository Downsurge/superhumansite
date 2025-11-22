import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 p-4 border-2 border-[#00E5FF] bg-[#0A0A0A] cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px #00E5FF, 0 0 50px #00E5FF",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          {/* Pulsing background glow */}
          <motion.div
            className="absolute inset-0 bg-[#00E5FF] opacity-20"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 border-2 border-[#39FF14]"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          
          <ArrowUp 
            className="w-6 h-6 relative z-10" 
            style={{ color: "#00E5FF" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
