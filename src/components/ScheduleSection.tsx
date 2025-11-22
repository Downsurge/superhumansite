import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import { CommunitySection } from "./CommunitySection";

export function ScheduleSection() {
  const schedule = [
    { day: "Tuesday", time: "6:30 PM" },
    { day: "Thursday", time: "6:30 PM" },
    { day: "Saturday", time: "10:00 AM" },
  ];
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="schedule">
      <div className="max-w-5xl mx-auto">
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
            TRAINING SCHEDULE
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
        </motion.div>
        
        {/* Schedule grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {schedule.map((session, index) => (
            <motion.div
              key={index}
              className="relative bg-[#0F0F0F] border-2 border-[#00E5FF] p-6 sm:p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Glitch flicker effect on grid lines */}
              <motion.div
                className="absolute inset-0 border-2 border-[#39FF14] pointer-events-none"
                animate={{
                  opacity: [0, 0, 0, 0.8, 0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  times: [0, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5],
                }}
              />
              
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar 
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" 
                  style={{ color: "#00E5FF" }}
                />
                
                <h3
                  className="text-xl sm:text-2xl mb-2 tracking-wider"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#39FF14",
                  }}
                >
                  {session.day}
                </h3>
                
                <p 
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#00E5FF" }}
                >
                  {session.time}
                </p>
              </motion.div>
              
              {/* Animated corner accents */}
              <motion.div
                className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#39FF14]"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#39FF14]"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Location info */}
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#39FF14" }} />
            <span 
              className="text-lg sm:text-xl tracking-wider"
              style={{ color: "#39FF14" }}
            >
              Phoenix, Arizona
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-300 mb-6">Indoor/Outdoor Training Locations</p>
          
          {/* Discord notice */}
          <motion.p 
            className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto italic"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Training days and time can change each week, stay connected in our Discord community.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Community Section */}
      <CommunitySection />
    </section>
  );
}