import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import BoxCodeInput from './BoxCodeInput';
import PrizeWheel from './PrizeWheel';
import PrizeReveal from './PrizeReveal';
import { validateBoxCode } from '../../data/boxCodes';

const OpenBoxPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [error, setError] = useState('');
  const [boxType, setBoxType] = useState<'basic' | 'premium'>('basic');
  const [selectedPrize, setSelectedPrize] = useState<any>(null);
  const [showPrizeReveal, setShowPrizeReveal] = useState(false);

  const handleCodeSubmit = (code: string) => {
    const boxCode = validateBoxCode(code);
    
    if (!boxCode) {
      setError(t('openBox.invalidCode'));
      return;
    }

    setBoxType(boxCode.type);
    setError('');
    setShowWheel(true);
    setTimeout(() => {
      setIsSpinning(true);
    }, 500);
  };

  const handleSpinComplete = (prize: any) => {
    setSelectedPrize(prize);
    setIsSpinning(false);
    setTimeout(() => {
      setShowPrizeReveal(true);
    }, 1000);
  };

  const handlePrizeRevealClose = () => {
    setShowPrizeReveal(false);
    setShowWheel(false);
    setSelectedPrize(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white pt-32">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 text-transparent bg-clip-text"
        >
          {t('openBox.title')}
        </motion.h1>

        <div className="flex flex-col items-center justify-center gap-12">
          {!showWheel && (
            <>
              <BoxCodeInput onSubmit={handleCodeSubmit} error={error} />
              
              {/* Instructions Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="font-semibold text-white">{t('openBox.howToGet.title')}</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>{t('openBox.howToGet.steps.1')}</li>
                      <li>{t('openBox.howToGet.steps.2')}</li>
                      <li>{t('openBox.howToGet.steps.3')}</li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            </>
          )}
          
          {showWheel && (
            <PrizeWheel
              spinning={isSpinning}
              onSpinComplete={handleSpinComplete}
              boxType={boxType}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPrizeReveal && selectedPrize && (
          <PrizeReveal
            prize={selectedPrize}
            onClose={handlePrizeRevealClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpenBoxPage;