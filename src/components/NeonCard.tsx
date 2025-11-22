import { motion } from "motion/react";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  color?: "blue" | "green";
  className?: string;
}

export function NeonCard({ children, color = "blue", className = "" }: NeonCardProps) {
  const neonColor = color === "blue" ? "#00E5FF" : "#39FF14";
  
  return (
    <motion.div
      className={`relative bg-[#0F0F0F] border-2 p-6 sm:p-8 ${className}`}
      style={{ borderColor: neonColor }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        boxShadow: `0 10px 40px ${neonColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Pulsing border glow */}
      <motion.div
        className="absolute inset-0 border-2 pointer-events-none"
        style={{ borderColor: neonColor }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          boxShadow: [
            `0 0 10px ${neonColor}`,
            `0 0 25px ${neonColor}`,
            `0 0 10px ${neonColor}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {children}
    </motion.div>
  );
}