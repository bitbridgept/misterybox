import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Share2, X } from 'lucide-react';

interface Prize {
  id: string;
  emoji: string;
  name: string;
  description: string;
  value: string;
  probability: number;
  image?: string;
}

interface PrizeRevealProps {
  prize: Prize;
  onClose: () => void;
}

const PrizeReveal: React.FC<PrizeRevealProps> = ({ prize, onClose }) => {
  const { t } = useTranslation();

  const generateRandomString = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleTelegramShare = () => {
    const randomCode = generateRandomString();
    const message = `🎉 Acabei de girar na Mystery Box! 🎁\n\n${prize.emoji} ${prize.name}\n💰 Valor: ${prize.value}\n\n${randomCode}`;
    const telegramUrl = `https://t.me/mysterybox_pt?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          {prize.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg overflow-hidden"
            >
              <img
                src={prize.image}
                alt={prize.name}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.5, 1] }}
            className="text-6xl mb-4"
          >
            {prize.emoji}
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold mb-2"
          >
            {prize.name}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mb-4"
          >
            {prize.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-purple-400 mb-8"
          >
            {prize.value}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative group overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Button text */}
              <span className="relative z-10">
                {t('prizes.reveal.openAnother')}
              </span>
            </motion.button>

            <button
              onClick={handleTelegramShare}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>{t('prizes.reveal.obtainPrize')}</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrizeReveal;