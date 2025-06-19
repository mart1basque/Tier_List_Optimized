import React, { useRef } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import useIconMode from '../hooks/useIconMode';

const OrderWebsiteButton: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLAnchorElement>(null);
  const iconMode = useIconMode(ref);

  return (
    <a
      ref={ref}
      href="https://mankindcorp.fr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-3 md:px-5 py-2 rounded-full font-semibold text-white bg-violet-600 shadow-md border border-violet-500/50 hover:bg-violet-500 transition-colors text-sm md:text-base"
      title={t('orderWebsite')}
    >
      <Globe size={18} className="mr-0 md:mr-2" />
      {!iconMode && <span className="ml-2">{t('orderWebsite')}</span>}
    </a>
  );
};

export default OrderWebsiteButton;
