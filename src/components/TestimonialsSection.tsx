import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "I unlocked my first muscle-up in 7 weeks.",
      author: "Alex M.",
    },
    {
      text: "The community and coaching are next level.",
      author: "Jordan P.",
    },
    {
      text: "The best fitness investment I've made.",
      author: "Casey R.",
    },
  ];
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="testimonials">
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
            TESTIMONIALS
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
        
        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative bg-[#0F0F0F] border-2 p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
              }}
            >
              {/* Edge tracing animation - creates animated border effect */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                style={{ overflow: 'visible' }}
              >
                <motion.rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeDasharray="400"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ 
                    strokeDashoffset: [0, -800],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
              
              {/* Glowing corners */}
              <motion.div
                className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#39FF14]"
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
              />
              <motion.div
                className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#00E5FF]"
                animate={{
                  boxShadow: [
                    "0 0 10px #00E5FF",
                    "0 0 20px #00E5FF",
                    "0 0 10px #00E5FF",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              
              <div className="relative z-10">
                <Quote 
                  className="w-8 h-8 sm:w-10 sm:h-10 mb-4 opacity-50" 
                  style={{ color: "#00E5FF" }}
                />
                
                <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <motion.div
                  className="h-px w-12 sm:w-16 bg-[#39FF14] mb-4"
                  animate={{
                    width: ["3rem", "4.5rem", "3rem"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                <p 
                  className="text-sm sm:text-base tracking-wider"
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#39FF14",
                  }}
                >
                  — {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}