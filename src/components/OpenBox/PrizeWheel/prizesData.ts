import { Prize } from './types';
import { TFunction } from 'i18next';

export const getPrizes = (t: TFunction, boxType: 'basic' | 'premium'): Prize[] => {
  const isBasic = boxType === 'basic';
  
  return [
    {
      id: 'iphone',
      emoji: '📱',
      name: t(`prizes.${boxType}.iphone.name`),
      description: t(`prizes.${boxType}.iphone.description`),
      value: t(`prizes.${boxType}.iphone.value`),
      probability: 0.001,
      image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg'
    },
    {
      id: isBasic ? 'steamKey' : 'game',
      emoji: '🎮',
      name: t(`prizes.${boxType}.${isBasic ? 'steamKey' : 'game'}.name`),
      description: t(`prizes.${boxType}.${isBasic ? 'steamKey' : 'game'}.description`),
      value: t(`prizes.${boxType}.${isBasic ? 'steamKey' : 'game'}.value`),
      probability: 0.05,
      image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg'
    },
    {
      id: isBasic ? 'serviceVoucher' : 'subscription',
      emoji: '🎟️',
      name: t(`prizes.${boxType}.${isBasic ? 'serviceVoucher' : 'subscription'}.name`),
      description: t(`prizes.${boxType}.${isBasic ? 'serviceVoucher' : 'subscription'}.description`),
      value: t(`prizes.${boxType}.${isBasic ? 'serviceVoucher' : 'subscription'}.value`),
      probability: 0.1,
      image: 'https://images.pexels.com/photos/6956892/pexels-photo-6956892.jpeg'
    },
    {
      id: isBasic ? 'gameVoucher' : 'voucher',
      emoji: '💳',
      name: t(`prizes.${boxType}.${isBasic ? 'gameVoucher' : 'voucher'}.name`),
      description: t(`prizes.${boxType}.${isBasic ? 'gameVoucher' : 'voucher'}.description`),
      value: t(`prizes.${boxType}.${isBasic ? 'gameVoucher' : 'voucher'}.value`),
      probability: 0.1,
      image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg'
    },
    {
      id: 'freeBox',
      emoji: '🎁',
      name: t(`prizes.${boxType}.freeBox.name`),
      description: t(`prizes.${boxType}.freeBox.description`),
      value: t(`prizes.${boxType}.freeBox.value`),
      probability: 0.15,
      image: 'https://images.pexels.com/photos/6956800/pexels-photo-6956800.jpeg'
    },
    {
      id: 'retry',
      emoji: '🔄',
      name: t('Try Again'),
      description: t('One more chance'),
      value: '0€',
      probability: 0.199,
      image: 'https://images.pexels.com/photos/7319294/pexels-photo-7319294.jpeg'
    },
    {
      id: 'noPrize',
      emoji: '❌',
      name: t(`prizes.${boxType}.noPrize.name`),
      description: t(`prizes.${boxType}.noPrize.description`),
      value: t(`prizes.${boxType}.noPrize.value`),
      probability: 0.4,
      image: 'https://images.pexels.com/photos/7319294/pexels-photo-7319294.jpeg'
    }
  ];
};