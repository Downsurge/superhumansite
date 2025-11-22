import { motion } from "motion/react";
import { MessageSquare, Instagram, Users } from "lucide-react";

export function CommunitySection() {
  const communities = [
    {
      icon: MessageSquare,
      name: "Discord",
      description: "Join our Discord server",
      color: "#00E5FF",
      link: "https://discord.gg/superhuman", // Replace with actual link
    },
    {
      icon: Instagram,
      name: "Instagram",
      description: "Follow us on Instagram",
      color: "#39FF14",
      link: "https://instagram.com/superhuman", // Replace with actual link
    },
    {
      icon: Users,
      name: "Facebook Group",
      description: "Join our Facebook community",
      color: "#00E5FF",
      link: "https://facebook.com/groups/superhuman", // Replace with actual link
    },
  ];
  
  return (
    <div className="max-w-5xl mx-auto mt-12 sm:mt-16 px-4 sm:px-6">
      {/* Section header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h3
          className="text-3xl sm:text-4xl mb-4 tracking-wider"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#39FF14",
            textShadow: "0 0 20px #39FF14",
          }}
        >
          COMMUNITY
        </motion.h3>
        
        <motion.div
          className="h-px w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      {/* Community boxes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {communities.map((community, index) => (
          <motion.a
            key={index}
            href={community.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-[#0F0F0F] border-2 p-6 sm:p-8 text-center cursor-pointer block"
            style={{ borderColor: community.color }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ 
              y: -8,
              scale: 1.05,
              boxShadow: `0 10px 40px ${community.color}`,
            }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 border-2 pointer-events-none"
              style={{ borderColor: community.color }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                boxShadow: [
                  `0 0 10px ${community.color}`,
                  `0 0 25px ${community.color}`,
                  `0 0 10px ${community.color}`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="relative z-10"
              animate={{
                filter: [
                  `drop-shadow(0 0 10px ${community.color})`,
                  `drop-shadow(0 0 20px ${community.color})`,
                  `drop-shadow(0 0 10px ${community.color})`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <community.icon 
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" 
                style={{ color: community.color }}
              />
              
              <h4 
                className="text-xl sm:text-2xl mb-2 tracking-wider"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: community.color,
                }}
              >
                {community.name}
              </h4>
              
              <p className="text-sm sm:text-base text-gray-300">
                {community.description}
              </p>
            </motion.div>
            
            {/* Corner accents */}
            <motion.div
              className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2"
              style={{ borderColor: community.color }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2"
              style={{ borderColor: community.color }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}