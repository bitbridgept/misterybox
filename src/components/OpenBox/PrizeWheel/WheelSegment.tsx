import React from 'react';
import { motion } from 'framer-motion';
import { WheelSegmentProps } from './types';

const WheelSegment: React.FC<WheelSegmentProps> = ({ prize, angle, index, radius, boxType }) => {
  const segmentAngle = 360 / 7; // 7 fixed segments

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Segment divider line */}
      <div className={`absolute left-1/2 h-1/2 w-[2px] bg-gradient-to-b ${
        boxType === 'basic'
          ? 'from-blue-500/10 to-cyan-500/10'
          : 'from-purple-500/10 to-pink-500/10'
      } origin-bottom`} />

      {/* Prize content */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '25%',
          transform: `translate(-50%, -50%) rotate(-${angle}deg)`,
          width: '80px',
          textAlign: 'center',
        }}
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-1 md:gap-2"
          whileHover={{ scale: 1.1 }}
        >
          {/* Emoji with glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            className="relative"
          >
            <div className={`absolute inset-0 ${
              boxType === 'basic' ? 'bg-blue-500/50' : 'bg-purple-500/50'
            } blur-lg opacity-50`} />
            <span className="text-xl md:text-3xl relative z-10">{prize.emoji}</span>
          </motion.div>

          {/* Prize value */}
          <motion.div
            className="text-xs font-medium px-1 md:px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm whitespace-nowrap"
            animate={{
              background: [
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.2)',
                'rgba(255, 255, 255, 0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            {prize.value}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WheelSegment;