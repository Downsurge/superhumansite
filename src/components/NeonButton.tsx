import { motion } from "motion/react";
import { ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "green";
  children: React.ReactNode;
}

export function NeonButton({ 
  variant = "blue", 
  children, 
  className = "",
  ...props 
}: NeonButtonProps) {
  const color = variant === "blue" ? "#00E5FF" : "#39FF14";
  
  return (
    <motion.button
      className={`relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 overflow-hidden text-sm sm:text-base ${className}`}
      style={{
        borderColor: color,
        color: color,
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Pulsing background glow */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ backgroundColor: color }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Border pulse effect */}
      <motion.div
        className="absolute inset-0 border-2"
        style={{ borderColor: color }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <span className="relative z-10 uppercase tracking-wider">{children}</span>
    </motion.button>
  );
}