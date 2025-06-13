import React from 'react';
import { Package, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  handleLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogoClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogoClick();
    navigate('/');
  };

  return (
    <header className="fixed w-full bg-black/30 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="relative flex items-center">
          {/* Left side - Language Selector */}
          <div className="absolute left-0">
            <LanguageSelector />
          </div>
          
          {/* Center - Logo and Title */}
          <div className="w-full flex justify-center">
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Package className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
              <span className="text-xl md:text-3xl font-bold whitespace-nowrap">{t('header.title')}</span>
            </motion.button>
          </div>

          {/* Right side - Telegram Link */}
          <div className="absolute right-0">
            <a 
              href="https://t.me/mysterybox_pt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;