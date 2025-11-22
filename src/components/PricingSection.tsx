import { motion } from "motion/react";
import { NeonButton } from "./NeonButton";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onNavigateToEnroll?: () => void;
}

export function PricingSection({ onNavigateToEnroll }: PricingSectionProps) {
  const plans = [
    {
      name: "Monthly",
      price: "$200",
      period: "/mo",
      features: [
        "3 sessions per week",
        "Expert coaching",
        "Community support",
        "Progress tracking",
        "Skill workshops",
      ],
    },
    {
      name: "Annual",
      price: "$1,999",
      period: "/yr",
      badge: "Save $401",
      features: [
        "3 sessions per week",
        "Expert coaching",
        "Community support",
        "Progress tracking",
        "Skill workshops",
        "Priority booking",
      ],
    },
  ];
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="pricing">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl mb-4 tracking-wider"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#39FF14",
              textShadow: "0 0 20px #39FF14",
            }}
          >
            PRICING
          </motion.h2>
          
          <motion.div
            className="h-px w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mb-6"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative bg-[#0F0F0F] border-2 p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
              }}
            >
              {/* Animated cycling border */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  borderColor: ["#00E5FF", "#39FF14", "#00E5FF"],
                  boxShadow: [
                    "0 0 20px #00E5FF, inset 0 0 20px #00E5FF",
                    "0 0 20px #39FF14, inset 0 0 20px #39FF14",
                    "0 0 20px #00E5FF, inset 0 0 20px #00E5FF",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  border: "2px solid",
                }}
              />
              
              {plan.badge && (
                <motion.div
                  className="absolute -top-3 sm:-top-4 right-4 sm:right-8 px-3 sm:px-4 py-1 sm:py-2 bg-[#39FF14] text-[#0A0A0A] text-sm sm:text-base"
                  animate={{
                    boxShadow: [
                      "0 0 10px #39FF14",
                      "0 0 20px #39FF14",
                      "0 0 10px #39FF14",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="uppercase tracking-wider">{plan.badge}</span>
                </motion.div>
              )}
              
              <div className="relative z-10">
                <h3
                  className="text-2xl sm:text-3xl mb-2 tracking-wider"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#00E5FF",
                  }}
                >
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span 
                    className="text-4xl sm:text-5xl"
                    style={{ color: "#39FF14" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-lg sm:text-xl text-gray-400">{plan.period}</span>
                </div>
                
                <motion.div
                  className="h-px w-full bg-gradient-to-r from-[#00E5FF] via-[#39FF14] to-[#00E5FF] mb-6"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                <ul className="space-y-3 sm:space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check 
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
                        style={{ color: "#39FF14" }}
                      />
                      <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <NeonButton variant="green" onClick={onNavigateToEnroll}>
            Become Superhuman Today
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}