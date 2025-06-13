import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

interface Language {
  code: string;
  name: string;
  flag: string | { left: string; right: string };
}

const languages: Language[] = [
  { 
    code: 'pt-BR',
    name: 'Português (BR)',
    flag: { left: 'pt', right: 'br' }
  },
  { 
    code: 'en',
    name: 'English',
    flag: 'gb'
  },
  { 
    code: 'es',
    name: 'Español',
    flag: 'es'
  },
  { 
    code: 'it',
    name: 'Italiano',
    flag: 'it'
  },
  { 
    code: 'ru',
    name: 'Русский',
    flag: 'ru'
  },
  { 
    code: 'zh',
    name: '中文',
    flag: 'cn'
  }
];

const FlagDisplay: React.FC<{ flag: string | { left: string; right: string } }> = ({ flag }) => {
  if (typeof flag === 'string') {
    return <span className={`fi fi-${flag} w-4 h-3 md:w-6 md:h-4 rounded-sm`} />;
  }

  return (
    <div className="w-4 h-3 md:w-6 md:h-4 relative overflow-hidden rounded-sm">
      <span className={`fi fi-${flag.left} absolute left-0 top-0 w-1/2 h-full`} />
      <span className={`fi fi-${flag.right} absolute right-0 top-0 w-1/2 h-full`} />
    </div>
  );
};

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1 md:gap-2 text-gray-300 hover:text-white bg-white/5 px-2 md:px-3 py-1 md:py-2 rounded-lg"
      >
        {currentLanguage && <FlagDisplay flag={currentLanguage.flag} />}
        <span className="text-xs md:text-sm hidden sm:block">{currentLanguage?.name}</span>
        <span className="text-xs md:text-sm sm:hidden">{currentLanguage?.code}</span>
      </motion.button>
      
      <AnimatePresence>
        {isLanguageMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-36 md:w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg py-2 border border-white/10"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.5)' }}
                className={`w-full text-left px-3 md:px-4 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2 md:gap-3 ${
                  i18n.language === lang.code ? 'bg-purple-600/30 text-white' : ''
                }`}
              >
                <FlagDisplay flag={lang.flag} />
                <span className="text-xs md:text-sm">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;