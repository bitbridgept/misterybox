import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import WheelPointer from './WheelPointer';
import WheelBackground from './WheelBackground';
import WheelSegment from './WheelSegment';
import { usePrizeSelection } from './usePrizeSelection';
import { getPrizes } from './prizesData';
import { PrizeWheelProps } from './types';

const PrizeWheel: React.FC<PrizeWheelProps> = ({ spinning, onSpinComplete, boxType }) => {
  const { t } = useTranslation();
  const [hasStarted, setHasStarted] = useState(false);
  const prizes = getPrizes(t, boxType);
  const { rotation, startSpin } = usePrizeSelection(prizes, hasStarted, onSpinComplete);
  const segmentAngle = 360 / prizes.length;

  const handleSpinClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startSpin();
    }
  };

  return (
    <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] flex items-center justify-center">
      <WheelPointer boxType={boxType} />
      
      <motion.div
        animate={{ rotate: rotation }}
        transition={{
          duration: 5,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
        className="absolute inset-0"
      >
        <WheelBackground boxType={boxType}>
          {prizes.map((prize, index) => (
            <WheelSegment
              key={prize.id}
              prize={prize}
              angle={index * segmentAngle}
              index={index}
              radius={100}
              boxType={boxType}
            />
          ))}
        </WheelBackground>
      </motion.div>

      {!hasStarted && (
        <motion.button
          onClick={handleSpinClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute z-50"
        >
          <motion.div
            className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full ${
              boxType === 'basic'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
            } shadow-lg flex items-center justify-center cursor-pointer overflow-hidden`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background effects */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at 30% 30%, ${boxType === 'basic' ? '#60A5FA' : '#A855F7'} 0%, transparent 50%)`,
                  `radial-gradient(circle at 70% 70%, ${boxType === 'basic' ? '#60A5FA' : '#A855F7'} 0%, transparent 50%)`,
                  `radial-gradient(circle at 30% 30%, ${boxType === 'basic' ? '#60A5FA' : '#A855F7'} 0%, transparent 50%)`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Rotating sparkles */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                  }}
                >
                  <motion.div
                    className={`absolute top-0 left-1/2 w-1 h-1 md:w-2 md:h-2 rounded-full ${
                      boxType === 'basic' ? 'bg-blue-200' : 'bg-purple-200'
                    }`}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Center content */}
            <div className="relative z-10 text-center">
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white mb-1 mx-auto" />
              <span className="text-white font-bold text-xs md:text-sm">GIRAR</span>
            </div>

            {/* Pulsing ring */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                boxType === 'basic' ? 'border-blue-300' : 'border-purple-300'
              } border-2`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};

export default PrizeWheel;