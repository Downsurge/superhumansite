import { motion } from "motion/react";
import { Instagram, Youtube } from "lucide-react";

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateToEnroll: () => void;
  currentPage: "home" | "enroll";
}

export function Footer({ onNavigateHome, onNavigateToEnroll, currentPage }: FooterProps) {
  const links = [
    { name: "Home", action: onNavigateHome },
    { name: "About", href: "#about", homeOnly: true },
    { name: "Pricing", href: "#pricing", homeOnly: true },
    { name: "Schedule", href: "#schedule", homeOnly: true },
    { name: "Sign Up", href: "#signup", homeOnly: true },
    { name: "Enroll", action: onNavigateToEnroll },
  ];
  
  const socialLinks = [
    { icon: Instagram, label: "Instagram", color: "#00E5FF" },
    { icon: Youtube, label: "YouTube", color: "#39FF14" },
  ];
  
  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t-2 border-[#00E5FF]">
      {/* Electric pulse animation on divider */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#00E5FF] via-[#39FF14] to-[#00E5FF]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 10px #00E5FF",
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Logo section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl sm:text-3xl mb-3 sm:mb-4 tracking-wider"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#00E5FF",
                textShadow: "0 0 15px #00E5FF",
              }}
              animate={{
                textShadow: [
                  "0 0 15px #00E5FF",
                  "0 0 25px #00E5FF",
                  "0 0 15px #00E5FF",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              SUPERHUMAN
            </motion.h3>
            <p className="text-sm sm:text-base text-gray-400 mb-2">Calisthenics Training</p>
            <p className="text-sm sm:text-base text-gray-400">Phoenix, Arizona</p>
          </motion.div>
          
          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 
              className="text-lg sm:text-xl mb-3 sm:mb-4 tracking-wider"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                color: "#39FF14",
              }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {links.map((link, index) => {
                // Skip home-only links on enroll page
                if (link.homeOnly && currentPage === "enroll") return null;
                
                return (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    {link.action ? (
                      <button
                        onClick={link.action}
                        className="text-sm sm:text-base text-gray-400 hover:text-[#00E5FF] transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm sm:text-base text-gray-400 hover:text-[#00E5FF] transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
          
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 
              className="text-lg sm:text-xl mb-3 sm:mb-4 tracking-wider"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                color: "#39FF14",
              }}
            >
              CONNECT
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 sm:p-3 border-2 border-[#00E5FF] hover:border-[#39FF14] transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 0 20px ${social.color}`,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div
          className="text-center pt-6 sm:pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-px w-48 sm:w-64 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Superhuman Calisthenics Training. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}