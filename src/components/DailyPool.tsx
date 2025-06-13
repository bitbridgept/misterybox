import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TelegramIcon } from './icons';

// Function to generate random amount between 100 and 1000 in multiples of 5
const getRandomAmount = () => {
  const min = 20;
  const max = 200;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random * 5; // Makes it a multiple of 5
};

// Function to generate random Telegram username
const getRandomUsername = () => {
  const prefixes = ['', '_'];
  const suffixes = ['', '_', '123', '_88', '99', '_007', '42', '_xd', '_pro', '_gaming'];
  const names = [
    'crypto',
    'trader',
    'player',
    'gamer',
    'hunter',
    'winner',
    'master',
    'lucky',
    'box',
    'mystery',
    'prize',
    'fortune',
    'treasure',
    'seeker',
    'finder',
    'champion',
    'hero',
    'legend',
    'warrior',
    'phoenix'
  ];
  const secondNames = [
    'king',
    'queen',
    'ace',
    'boss',
    'star',
    'elite',
    'prime',
    'max',
    'top',
    'best',
    'pro',
    'master',
    'expert',
    'guru',
    'ninja'
  ];

  const useSecondName = Math.random() > 0.5;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const secondName = useSecondName ? '_' + secondNames[Math.floor(Math.random() * secondNames.length)] : '';

  return '@' + prefix + name + secondName + suffix;
};

const DailyPool: React.FC = () => {
  const { t } = useTranslation();
  const [leaderboardData, setLeaderboardData] = useState<Array<{ tag: string; spent: number }>>([]);

  useEffect(() => {
    // Generate initial leaderboard data
    const newData = Array.from({ length: 5 }, () => ({
      tag: getRandomUsername(),
      spent: getRandomAmount()
    }));
    
    // Sort by spent amount descending
    newData.sort((a, b) => b.spent - a.spent);
    setLeaderboardData(newData);

    // Update leaderboard every 24 hours
    const interval = setInterval(() => {
      const updatedData = Array.from({ length: 5 }, () => ({
        tag: getRandomUsername(),
        spent: getRandomAmount()
      }));
      updatedData.sort((a, b) => b.spent - a.spent);
      setLeaderboardData(updatedData);
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-yellow-500/20 backdrop-blur-lg rounded-2xl p-4 md:p-8 relative overflow-hidden"
        >
          {/* Background effects */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full"
          />

          <div className="relative z-10">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full" />
                <Coins className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
              </motion.div>

              <div className="text-center">
                <motion.h2
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text"
                >
                  {t('dailyPool.title')}
                </motion.h2>
                <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto mb-4 md:mb-8 px-2">
                  {t('dailyPool.subtitle')}
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-3 bg-yellow-400/20 px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-8">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span className="text-yellow-300 font-medium text-sm md:text-base">
                  {t('dailyPool.chances')}
                </span>
              </div>

              {/* Leaderboard Section */}
              <div className="w-full max-w-sm md:max-w-md">
                <div className="flex items-center gap-2 mb-3 md:mb-4 justify-center">
                  <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <h3 className="text-lg md:text-xl font-semibold text-yellow-300">{t('dailyPool.topPlayers')}</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {leaderboardData.map((player, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-500/20"
                    >
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <span className={`
                          w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full font-bold text-xs md:text-sm flex-shrink-0
                          ${index === 0 ? 'bg-yellow-400 text-black' :
                            index === 1 ? 'bg-gray-300 text-black' :
                            index === 2 ? 'bg-yellow-700 text-white' :
                            'bg-yellow-900/50 text-yellow-100/70'}
                        `}>
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
                          <TelegramIcon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="text-gray-300 text-xs md:text-sm truncate">{player.tag}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-yellow-400 text-sm md:text-base flex-shrink-0 ml-2">{player.spent}€</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyPool;