import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black/30 backdrop-blur-md py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;