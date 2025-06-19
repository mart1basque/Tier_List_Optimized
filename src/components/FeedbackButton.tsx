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
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 71 55"
        className="w-5 h-5 mr-0 md:mr-2"
        fill="currentColor"
      >
        <path d="M60.104 4.539a58.436 58.436 0 00-13.852-4.49.07.07 0 00-.073.035c-.6 1.14-1.272 2.624-1.743 3.792-5.174-.776-10.308-.776-15.442 0-.47-1.155-1.133-2.651-1.741-3.792a.077.077 0 00-.074-.035c-4.676 1.073-9.238 2.634-13.854 4.49a.066.066 0 00-.031.027C4.896 17.761-.213 30.249.076 42.716a.082.082 0 00.031.058c6.103 4.508 12.003 7.267 17.809 9.1a.077.077 0 00.084-.027c1.369-1.878 2.566-3.84 3.611-5.92a.07.07 0 00-.04-.096c-1.984-.76-3.886-1.704-5.741-2.73a.07.07 0 01-.007-.116c.386-.287.772-.582 1.148-.873a.074.074 0 01.075-.01c12.105 5.554 25.173 5.554 37.216 0a.073.073 0 01.076.009c.376.291.761.586 1.149.873a.07.07 0 01-.006.117c-1.856 1.036-3.758 1.98-5.742 2.731a.07.07 0 00-.039.095c1.046 2.083 2.244 4.045 3.612 5.921a.076.076 0 00.084.028c5.806-1.832 11.706-4.592 17.808-9.099a.077.077 0 00.031-.058c.334-13.39-5.44-25.858-17.53-38.15a.062.062 0 00-.03-.028z"/>
        <path d="M24.728 37.89c-3.315 0-6.033-3.062-6.033-6.837 0-3.776 2.687-6.838 6.033-6.838 3.357 0 6.074 3.083 6.033 6.838 0 3.775-2.687 6.837-6.033 6.837zm21.817 0c-3.315 0-6.033-3.062-6.033-6.837 0-3.776 2.686-6.838 6.033-6.838 3.357 0 6.074 3.083 6.033 6.838 0 3.775-2.676 6.837-6.033 6.837z"/>
      </svg>
      <span className="hidden md:inline">{t('giveFeedback')}</span>
    </a>
  );
};

export default FeedbackButton;
