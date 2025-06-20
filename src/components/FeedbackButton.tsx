import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FeedbackButton: React.FC = () => {
  const { t } = useLanguage();

  return (
    <a
      href="https://discord.com" // replace with actual server link
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-3 md:px-5 py-2 rounded-full font-semibold text-white shadow-md border hover:bg-[#4752c4] transition-colors text-sm md:text-base"
      style={{ backgroundColor: '#5865F2', borderColor: '#5865F2' }}
      title={t('giveFeedback')}
    >
      <img
        src="/Discord-Symbol-White.svg"
        alt="Discord"
        className="w-5 h-5 mr-0 md:mr-2"
      />
      <span className="hidden md:inline">{t('giveFeedback')}</span>
    </a>
  );
};

export default FeedbackButton;
