import { useState, useEffect } from 'react';
import { Prize } from './types';

export const usePrizeSelection = (
  prizes: Prize[],
  spinning: boolean,
  onSpinComplete: (prize: Prize) => void
) => {
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const startSpin = () => {
    // Select prize based on probability
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedPrize = prizes[prizes.length - 1]; // Default to last prize
    
    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        selectedPrize = prize;
        break;
      }
    }
    
    setSelectedPrize(selectedPrize);
    
    // Calculate the rotation to stop at the selected prize segment
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const segmentAngle = 360 / prizes.length;
    const baseRotations = 5; // Number of full rotations before stopping
    
    // Calculate the final rotation to align the selected prize at the top (0 degrees)
    // We add 360 to ensure positive rotation and subtract the segment's position
    const finalRotation = -(baseRotations * 360 + (prizeIndex * segmentAngle));
    
    setRotation(finalRotation);
    
    // Notify parent after animation completes
    const animationDuration = 5000; // 5 seconds
    setTimeout(() => {
      onSpinComplete(selectedPrize);
    }, animationDuration);
  };

  return { rotation, selectedPrize, startSpin };
};