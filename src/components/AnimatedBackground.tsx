import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Diagonal moving lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-20"
          style={{
            width: "200%",
            top: `${i * 15}%`,
            left: "-50%",
          }}
          animate={{
            x: ["0%", "50%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Vertical circuit lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`v-line-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#39FF14] to-transparent opacity-20"
          style={{
            height: "200%",
            left: `${i * 20}%`,
            top: "-50%",
          }}
          animate={{
            y: ["0%", "50%"],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10 + i * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.8,
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#00E5FF] opacity-5 blur-3xl"
        style={{ top: "20%", left: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#39FF14] opacity-5 blur-3xl"
        style={{ bottom: "20%", right: "10%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
