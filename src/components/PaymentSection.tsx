import { motion } from "motion/react";
import { CreditCard, Check } from "lucide-react";
import { PaymentModal } from "./PaymentModal";
import { useState } from "react";

export function PaymentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual" | null>(null);
  
  const handlePlanClick = (plan: "monthly" | "annual") => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  
  const reasons = [
    "Skill development",
    "Coaching in actual progressions",
    "Consistent group structure",
    "A real program",
    "A supportive community",
  ];
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="payment">
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
            ENROLL NOW
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
          
          <p className="text-lg sm:text-xl text-gray-300">Enroll in Superhuman Training</p>
        </motion.div>
        
        {/* Payment options */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Payment selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.button
              onClick={() => handlePlanClick("monthly")}
              className="relative bg-[#0F0F0F] border-2 border-[#00E5FF] p-6 sm:p-8 text-left w-full"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px #00E5FF",
              }}
            >
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 mb-4" style={{ color: "#00E5FF" }} />
              <h3 
                className="text-xl sm:text-2xl mb-2 tracking-wider"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#00E5FF",
                }}
              >
                Monthly Plan
              </h3>
              <p className="text-2xl sm:text-3xl" style={{ color: "#39FF14" }}>$200/mo</p>
            </motion.button>
            
            <motion.button
              onClick={() => handlePlanClick("annual")}
              className="relative bg-[#0F0F0F] border-2 border-[#39FF14] p-6 sm:p-8 text-left w-full"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px #39FF14",
              }}
            >
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 mb-4" style={{ color: "#39FF14" }} />
              <h3 
                className="text-xl sm:text-2xl mb-2 tracking-wider"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#39FF14",
                }}
              >
                Annual Plan
              </h3>
              <p className="text-2xl sm:text-3xl" style={{ color: "#00E5FF" }}>$1,999/yr</p>
              <span className="text-xs sm:text-sm text-gray-400">(Save $401)</span>
            </motion.button>
          </motion.div>
          
          {/* Why sign up box */}
          <motion.div
            className="relative bg-[#0F0F0F] border-2 p-6 sm:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated corner accents */}
            {[
              { pos: "top-0 left-0", border: "border-t-2 border-l-2", delay: 0 },
              { pos: "top-0 right-0", border: "border-t-2 border-r-2", delay: 0.2 },
              { pos: "bottom-0 left-0", border: "border-b-2 border-l-2", delay: 0.4 },
              { pos: "bottom-0 right-0", border: "border-b-2 border-r-2", delay: 0.6 },
            ].map((corner, i) => (
              <motion.div
                key={i}
                className={`absolute ${corner.pos} w-10 h-10 sm:w-16 sm:h-16 ${corner.border}`}
                style={{ borderColor: i % 2 === 0 ? "#00E5FF" : "#39FF14" }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: corner.delay,
                }}
              />
            ))}
            
            {/* Glowing frame */}
            <motion.div
              className="absolute inset-0 border-2"
              style={{ borderColor: "#00E5FF" }}
              animate={{
                boxShadow: [
                  "0 0 10px #00E5FF, inset 0 0 10px #00E5FF",
                  "0 0 25px #00E5FF, inset 0 0 25px #00E5FF",
                  "0 0 10px #00E5FF, inset 0 0 10px #00E5FF",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            <div className="relative z-10">
              <h3 
                className="text-xl sm:text-2xl mb-6 tracking-wider text-center"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#39FF14",
                }}
              >
                Because nobody in Phoenix is doing:
              </h3>
              
              <ul className="space-y-4">
                {reasons.map((reason, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check 
                      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" 
                      style={{ color: "#00E5FF" }}
                    />
                    <span className="text-base sm:text-lg text-gray-200">{reason}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
}