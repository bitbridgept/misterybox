import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PaymentMethods from './PaymentMethods';

interface MysteryBoxProps {
  name: string;
  price: number;
  description: string;
  category: string;
  onClick: () => void;
  showPurchaseOptions?: boolean;
}

const MysteryBox: React.FC<MysteryBoxProps> = ({ name, price, description, category, onClick, showPurchaseOptions = false }) => {
  const { t } = useTranslation();
  const [telegramTag, setTelegramTag] = useState('');
  const isPremium = category === 'premium';
  
  const purchaseLink = price === 5 
    ? 'https://buy.stripe.com/5kAdUedM76sW8Bq4gg'
    : 'https://buy.stripe.com/3csaI2fUf9F8g3ScMQ';

  return (
    <motion.div
      onClick={!showPurchaseOptions ? onClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg rounded-2xl p-8 transition-all duration-300 group w-full ${!showPurchaseOptions ? 'cursor-pointer' : ''}`}
    >
      {/* Animated background effect */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Floating particles */}
      {isPremium && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
            >
              <Star className="w-4 h-4 text-purple-400/30" />
            </motion.div>
          ))}
        </>
      )}

      {/* Box icon with glow effect */}
      <div className="relative flex justify-center mb-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"
        />
        <Package className={`w-20 h-20 ${isPremium ? 'text-purple-400' : 'text-blue-400'}`} />
        {isPremium && (
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400" />
        )}
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <h3 className={`text-2xl font-bold mb-3 ${isPremium ? 'text-purple-300' : 'text-blue-300'}`}>
          {name}
        </h3>
        <p className="text-gray-300 mb-6">{description}</p>
        
        {showPurchaseOptions ? (
          <>
            {/* Telegram Tag Input */}
            <div className="mb-6">
              <input
                type="text"
                value={telegramTag}
                onChange={(e) => setTelegramTag(e.target.value)}
                placeholder={t('boxes.telegramPlaceholder')}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Price and Purchase Button */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center px-6 py-3 rounded-full ${
                  isPremium 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                }`}
              >
                <span className="text-2xl font-bold">{price} €</span>
              </motion.div>

              <motion.a
                href={telegramTag.trim() ? purchaseLink : undefined}
                whileHover={telegramTag.trim() ? { scale: 1.05 } : {}}
                className={`w-full px-6 py-3 rounded-full text-center transition-all ${
                  telegramTag.trim()
                    ? `${isPremium ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} cursor-pointer`
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {t('boxes.buyNow')}
              </motion.a>

              <PaymentMethods />
            </div>
          </>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center px-6 py-3 rounded-full ${
              isPremium 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600'
            }`}
          >
            <span className="text-2xl font-bold">{price} €</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MysteryBox;