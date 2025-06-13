import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Gift, Sparkles, AlertTriangle } from 'lucide-react';

interface PrizeDisplayProps {
  category: 'basic' | 'premium';
}

const PrizeDisplay: React.FC<PrizeDisplayProps> = ({ category }) => {
  const { t } = useTranslation();

  const prizeEmojis = {
    iphone: '📱',
    steamKey: '🧩',
    game: '🎮',
    serviceVoucher: '🎟️',
    subscription: '🎟️',
    gameVoucher: '🎮',
    voucher: '💳',
    giftCard: '💳',
    freeBox: '🔁',
    noPrize: '❌'
  };

  const prizes = [
    'iphone',
    category === 'basic' ? 'steamKey' : 'game',
    category === 'basic' ? 'serviceVoucher' : 'subscription',
    category === 'basic' ? 'gameVoucher' : 'voucher',
    category === 'basic' ? 'giftCard' : 'freeBox',
    'freeBox',
    'noPrize'
  ].filter((prize, index, self) => self.indexOf(prize) === index); // Remove duplicates

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-lg rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-purple-300">{t('prizes.title')}</h2>
        </div>

        <div className="grid gap-4">
          {prizes.map((prize, index) => {
            const prizeData = t(`prizes.${category}.${prize}`, { returnObjects: true });
            const isUltraRare = prize === 'iphone';

            // Early return if prizeData is not properly structured
            if (!prizeData || typeof prizeData !== 'object') {
              return null;
            }

            const value = prizeData.value?.toString() || '0';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative group
                  bg-gradient-to-r from-white/5 to-transparent
                  hover:from-white/10 hover:to-white/5
                  rounded-xl p-4 transition-all duration-300
                  ${isUltraRare ? 'border border-purple-500/30' : ''}
                `}
              >
                {isUltraRare && (
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-purple-500/10 rounded-xl blur-xl"
                  />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-2xl">{prizeEmojis[prize]}</span>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{prizeData.name || ''}</h3>
                      {isUltraRare && (
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{prizeData.description || ''}</p>
                  </div>
                  <div className="text-right">
                    <span className={`
                      font-bold
                      ${value.includes('-') ? 'text-purple-400' :
                        parseInt(value) > 100 ? 'text-yellow-400' : 
                        parseInt(value) > 20 ? 'text-purple-400' : 
                        parseInt(value) > 0 ? 'text-blue-400' : 'text-gray-500'}
                    `}>
                      {value}
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
          <AlertTriangle className="w-4 h-4" />
          <p>{t('prizes.warning')}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrizeDisplay;