import { motion } from "motion/react";
import { NeonButton } from "./NeonButton";
import { useState } from "react";

export function SignUpSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+1 ",
    goal: "",
    timeframe: "",
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Calendly URL with pre-filled data
    const calendlyUrl = "https://calendly.com/superhumanzai/30min"; // Replace with your actual Calendly link
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      location: formData.phone, // Phone as custom answer 1
      a2: formData.goal, // Goal as custom answer 2
      a3: formData.timeframe, // Timeframe as custom answer 3
    });
    
    // Redirect to Calendly with pre-filled information
    window.open(`${calendlyUrl}?${params.toString()}`, '_blank');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="signup">
      <div className="max-w-3xl mx-auto">
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
              color: "#00E5FF",
              textShadow: "0 0 20px #00E5FF",
            }}
          >
            BECOME SUPERHUMAN
          </motion.h2>
          
          <motion.div
            className="h-px w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-[#39FF14] to-transparent mb-6"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          <p className="text-lg sm:text-xl text-gray-300">Get More Info</p>
        </motion.div>
        
        {/* Form container with animated edges */}
        <motion.div
          className="relative bg-[#0F0F0F] border-2 border-[#00E5FF] p-6 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Flowing neon edges animation */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ overflow: 'visible' }}
          >
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              fill="none"
              stroke="#39FF14"
              strokeWidth="2"
              strokeDasharray="20 10"
              initial={{ strokeDashoffset: 0 }}
              animate={{ 
                strokeDashoffset: [0, -60],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
          
          {/* Animated corner accents */}
          {[
            { pos: "top-0 left-0", border: "border-t-4 border-l-4", color: "#00E5FF" },
            { pos: "top-0 right-0", border: "border-t-4 border-r-4", color: "#39FF14" },
            { pos: "bottom-0 left-0", border: "border-b-4 border-l-4", color: "#39FF14" },
            { pos: "bottom-0 right-0", border: "border-b-4 border-r-4", color: "#00E5FF" },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.pos} w-8 h-8 sm:w-12 sm:h-12 ${corner.border}`}
              style={{ borderColor: corner.color }}
              animate={{
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  `0 0 10px ${corner.color}`,
                  `0 0 20px ${corner.color}`,
                  `0 0 10px ${corner.color}`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
            <div>
              <label className="block mb-2 text-sm sm:text-base text-[#00E5FF] tracking-wide">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border-2 border-[#00E5FF] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#39FF14] transition-colors"
                style={{ boxShadow: "inset 0 0 10px rgba(0, 229, 255, 0.2)" }}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm sm:text-base text-[#00E5FF] tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border-2 border-[#00E5FF] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#39FF14] transition-colors"
                style={{ boxShadow: "inset 0 0 10px rgba(0, 229, 255, 0.2)" }}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm sm:text-base text-[#00E5FF] tracking-wide">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border-2 border-[#00E5FF] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#39FF14] transition-colors"
                style={{ boxShadow: "inset 0 0 10px rgba(0, 229, 255, 0.2)" }}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm sm:text-base text-[#00E5FF] tracking-wide">
                Training Goal
              </label>
              <textarea
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-[#0A0A0A] border-2 border-[#00E5FF] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#39FF14] transition-colors resize-none"
                style={{ boxShadow: "inset 0 0 10px rgba(0, 229, 255, 0.2)" }}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm sm:text-base text-[#00E5FF] tracking-wide">
                Start Timeframe
              </label>
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border-2 border-[#00E5FF] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#39FF14] transition-colors"
                style={{ boxShadow: "inset 0 0 10px rgba(0, 229, 255, 0.2)" }}
              >
                <option value="">Select timeframe...</option>
                <option value="immediately">Immediately</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="1month">1 month</option>
                <option value="2-3months">2-3 months</option>
              </select>
            </div>
            
            <motion.div
              className="pt-2 sm:pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <NeonButton 
                variant="green" 
                type="submit"
                className="w-full"
              >
                Submit & Join the Movement
              </NeonButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}