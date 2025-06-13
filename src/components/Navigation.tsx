import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed w-full top-16 md:top-24 z-40">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 flex justify-center gap-4 md:gap-8 pt-4 md:pt-0"
      >
        <button 
          className={`bg-black/30 backdrop-blur-md hover:bg-purple-600 transition-colors text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-full ${selectedCategory === 'basic' ? 'bg-purple-600' : ''}`}
          onClick={() => setSelectedCategory('basic')}
        >
          {t('navigation.basic')}
        </button>
        <button 
          className={`bg-black/30 backdrop-blur-md hover:bg-purple-600 transition-colors text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-full ${selectedCategory === 'premium' ? 'bg-purple-600' : ''}`}
          onClick={() => setSelectedCategory('premium')}
        >
          {t('navigation.premium')}
        </button>
      </motion.nav>
    </div>
  );
};

export default Navigation;