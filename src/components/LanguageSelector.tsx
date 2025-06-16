import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Flag from './Flag';

const options = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'es', label: 'Español', flag: 'es' }
] as const;

type Option = typeof options[number];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = options.find(o => o.code === language) as Option;

  const handleSelect = (code: string) => {
    setLanguage(code as any);
    setOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 text-sm z-50">
      <button
        className="flex items-center gap-1 bg-white text-black px-3 py-2 rounded shadow"
        onClick={() => setOpen(o => !o)}
      >
        <Flag code={current.flag} size={16} />
        <span className="font-medium uppercase">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded shadow overflow-hidden">
          {options.map(o => (
            <div
              key={o.code}
              onClick={() => handleSelect(o.code)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
            >
              <Flag code={o.flag} size={16} />
              <span>{o.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
