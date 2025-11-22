import { motion } from "motion/react";
import { NeonCard } from "./NeonCard";
import { Trophy, Users, TrendingUp, Sparkles, UserCheck, Dumbbell } from "lucide-react";

export function AboutSection() {
  const cards = [
    {
      icon: Trophy,
      title: "Mastery-Based Training",
      description: "Progressive skill development focused on true bodyweight mastery and elite strength gains.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Community Training",
      description: "Train with motivated athletes in Phoenix, 3x per week. Build strength together.",
      color: "green" as const,
    },
    {
      icon: TrendingUp,
      title: "12-Week Progression System",
      description: "Structured programming that builds strength, mobility, and advanced skills systematically.",
      color: "blue" as const,
    },
    {
      icon: Sparkles,
      title: "Confidence Boost",
      description: "Master impressive bodyweight skills that turn heads. Show off your superhuman abilities.",
      color: "green" as const,
    },
    {
      icon: UserCheck,
      title: "1-on-1 Training",
      description: "Train with a coach multiple times a week to reach your goal with personalized attention.",
      color: "blue" as const,
    },
    {
      icon: Dumbbell,
      title: "Weightlifting Optional",
      description: "This doesn't replace your gym time. If you still want to lift weights, you can.",
      color: "green" as const,
    },
  ];
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="about">
      <div className="max-w-7xl mx-auto">
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
            ABOUT THE PROGRAM
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
        
        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <NeonCard color={card.color} className="h-full">
                <motion.div
                  className="mb-4"
                  animate={{
                    filter: [
                      `drop-shadow(0 0 10px ${card.color === "blue" ? "#00E5FF" : "#39FF14"})`,
                      `drop-shadow(0 0 20px ${card.color === "blue" ? "#00E5FF" : "#39FF14"})`,
                      `drop-shadow(0 0 10px ${card.color === "blue" ? "#00E5FF" : "#39FF14"})`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <card.icon 
                    className="w-10 h-10 sm:w-12 sm:h-12" 
                    style={{ color: card.color === "blue" ? "#00E5FF" : "#39FF14" }}
                  />
                </motion.div>
                
                <h3 
                  className="text-xl sm:text-2xl mb-3 sm:mb-4 tracking-wide"
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    color: card.color === "blue" ? "#00E5FF" : "#39FF14",
                  }}
                >
                  {card.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </NeonCard>
            </motion.div>
          ))}
        </div>
        
        {/* Description text */}
        <motion.div
          className="text-center max-w-3xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            A science-backed progression structure for elite strength, mobility, and skill.
          </p>
        </motion.div>
      </div>
    </section>
  );
}