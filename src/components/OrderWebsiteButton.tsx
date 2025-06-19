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
      className="flex items-center px-3 md:px-5 py-2 rounded-full font-semibold text-white bg-violet-600 shadow-md border border-violet-500/50 hover:bg-violet-500 transition-colors text-sm md:text-base"
      title={t('orderWebsite')}
    >
      <Globe size={18} className="mr-0 md:mr-2" />
      <span className="hidden md:inline">{t('orderWebsite')}</span>
    </a>
  );
};

export default OrderWebsiteButton;
