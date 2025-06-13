import { ReactNode } from 'react';

export interface Prize {
  id: string;
  emoji: string;
  name: string;
  description: string;
  value: string;
  probability: number;
  image?: string;
}

export interface PrizeWheelProps {
  spinning: boolean;
  onSpinComplete: (prize: Prize) => void;
  boxType: 'basic' | 'premium';
}

export interface WheelPointerProps {
  className?: string;
  boxType: 'basic' | 'premium';
}

export interface WheelSegmentProps {
  prize: Prize;
  angle: number;
  index: number;
  radius: number;
  boxType: 'basic' | 'premium';
}

export interface WheelBackgroundProps {
  children: ReactNode;
  boxType: 'basic' | 'premium';
}