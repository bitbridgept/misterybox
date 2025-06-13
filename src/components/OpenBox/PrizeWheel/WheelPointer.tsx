import React from 'react';
import { motion } from 'framer-motion';
import { WheelPointerProps } from './types';

const WheelPointer: React.FC<WheelPointerProps> = ({ className, boxType }) => (
  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${className}`}>
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className={`w-6 h-10 clip-triangle ${
        boxType === 'basic'
          ? 'bg-gradient-to-b from-blue-400 to-blue-600'
          : 'bg-gradient-to-b from-purple-400 to-purple-600'
      } shadow-lg`} />
    </motion.div>
  </div>
);

export default WheelPointer;