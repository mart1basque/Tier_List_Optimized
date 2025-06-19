import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const OrderWebsiteButton: React.FC = () => {
  const { t } = useLanguage();
  return (
    <a
      href="https://mankindcorp.fr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-3 sm:px-5 py-2 rounded-full font-semibold text-white bg-violet-600 shadow-md border border-violet-500/50 hover:bg-violet-500 transition-colors text-sm sm:text-base"
    >
      <Globe size={18} className="mr-0 sm:mr-2" />
      <span className="hidden sm:inline">{t('orderWebsite')}</span>
    </a>
  );
};

export default OrderWebsiteButton;
