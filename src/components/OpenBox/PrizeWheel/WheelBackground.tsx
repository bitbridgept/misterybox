import React from 'react';
import { motion } from 'framer-motion';
import { WheelBackgroundProps } from './types';

const WheelBackground: React.FC<WheelBackgroundProps> = ({ children, boxType }) => (
  <div className={`absolute inset-0 rounded-full ${
    boxType === 'basic'
      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
      : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
  } backdrop-blur-lg border-2 ${
    boxType === 'basic' ? 'border-blue-500/10' : 'border-purple-500/10'
  }`}>
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-conic-gradient(
            from 0deg,
            transparent 0deg 10deg,
            rgba(255, 255, 255, 0.1) 10deg 20deg
          )`
        }}
      />
    </div>
    {children}
  </div>
);

export default WheelBackground;