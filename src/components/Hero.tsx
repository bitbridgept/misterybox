import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Stars, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const glowAnimation = {
    opacity: [0.4, 1, 0.4],
    scale: [0.98, 1, 0.98],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="pt-24 md:pt-32 pb-16 px-5 relative overflow-hidden">
      {/* Background decorative elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400/20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`
          }}
        >
          <Stars className={`w-${12 + i * 4} h-${12 + i * 4}`} />
        </motion.div>
      ))}

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400/20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, 20, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            right: `${20 + i * 25}%`,
            bottom: `${20 + i * 15}%`
          }}
        >
          <Sparkles className={`w-${10 + i * 4} h-${10 + i * 4}`} />
        </motion.div>
      ))}

      <div className="container mx-auto text-center relative">
        {/* Main logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 relative"
        >
          <motion.div
            animate={glowAnimation}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"
            />
            <Package className="w-24 h-24 md:w-32 md:h-32 text-purple-400 relative z-10" />
          </motion.div>
        </motion.div>

        {/* Title with gradient and animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 text-transparent bg-clip-text relative leading-[1.4] py-4"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 blur-xl"
          />
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Open Box Button */}
        <motion.button
          onClick={() => navigate('/open-box')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative group"
        >
          <span className="relative z-10">{t('hero.openBox')}</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;