import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const OrderWebsiteButton: React.FC = () => {
  const { t } = useLanguage();
  return (
    <a
      href="https://mankindcorp.fr"
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-2 rounded-full font-semibold text-white bg-violet-600 shadow-md border border-violet-500/50 hover:bg-violet-500 transition-colors"
    >
      {t('orderWebsite')}
    </a>
  );
};

export default OrderWebsiteButton;
