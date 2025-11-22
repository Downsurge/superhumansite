import { motion } from "motion/react";
import { NeonButton } from "./NeonButton";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onNavigateToEnroll?: () => void;
  showVideo?: boolean;
  showButtons?: boolean;
}

export function HeroSection({ onNavigateToEnroll, showVideo = true, showButtons = true }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative py-12 sm:py-0">
      {/* Animated geometric frame */}
      <motion.div
        className="absolute inset-4 sm:inset-8 border-2 border-[#00E5FF] opacity-30 pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 10px #00E5FF, inset 0 0 10px #00E5FF",
            "0 0 30px #00E5FF, inset 0 0 30px #00E5FF",
            "0 0 10px #00E5FF, inset 0 0 10px #00E5FF",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Corner accents */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-8 h-8 sm:w-16 sm:h-16 border-[#39FF14]`}
            style={{
              borderWidth: pos.includes("top") ? "2px 0 0 2px" : 
                          pos.includes("bottom") && pos.includes("left") ? "0 0 2px 2px" : "0 2px 2px 0",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Main title with glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest mb-3 sm:mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#00E5FF",
              textShadow: "0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px #00E5FF",
            }}
            animate={{
              textShadow: [
                "0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px #00E5FF",
                "0 0 30px #00E5FF, 0 0 60px #00E5FF, 0 0 90px #00E5FF",
                "0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px #00E5FF",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SUPERHUMAN
          </motion.h1>
          
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl tracking-widest mb-2"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#39FF14",
              textShadow: "0 0 10px #39FF14, 0 0 20px #39FF14",
            }}
          >
            CALISTHENICS TRAINING
          </motion.p>
          
          <motion.div
            className="h-px w-48 sm:w-64 mx-auto my-4 sm:my-6 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Unlock elite bodyweight mastery. Train like a superhero.
          </p>
        </motion.div>
        
        {/* CTA Buttons */}
        {showButtons && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <NeonButton variant="blue" onClick={onNavigateToEnroll}>Start Your Journey</NeonButton>
            <NeonButton variant="green" onClick={onNavigateToEnroll}>View Pricing</NeonButton>
          </motion.div>
        )}
        
        {/* Promo Video Section */}
        {showVideo && (
          <motion.div
            className="mt-10 sm:mt-16 max-w-4xl mx-auto relative px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative aspect-video bg-[#1A1A1A] border-2 border-[#00E5FF] overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px #00E5FF",
                  "0 0 40px #00E5FF",
                  "0 0 20px #00E5FF",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: "#00E5FF" }} />
                  <span className="text-base sm:text-xl" style={{ color: "#00E5FF" }}>
                    Watch Promo Video
                  </span>
                </motion.div>
              </div>
              
              {/* Animated corner brackets */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-8 h-8 sm:w-12 sm:h-12 border-[#39FF14]`}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}