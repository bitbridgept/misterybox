import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { KeyRound, AlertCircle } from 'lucide-react';

interface BoxCodeInputProps {
  onSubmit: (code: string) => void;
  error?: string;
}

const BoxCodeInput: React.FC<BoxCodeInputProps> = ({ onSubmit, error }) => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code.trim().toUpperCase());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md"
    >
      <div className="flex items-center gap-3 mb-6">
        <KeyRound className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-purple-300">{t('openBox.enterCode')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('openBox.codePlaceholder')}
            className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
              error ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
            }`}
          />
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-6 left-0 flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          type="submit"
        >
          {t('openBox.openButton')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BoxCodeInput;