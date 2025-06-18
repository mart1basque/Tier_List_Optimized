import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ExportPanelProps {
  tierListRef: React.RefObject<HTMLDivElement>;
  getTierListData: () => any;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ tierListRef, getTierListData }) => {
  const { themeColors, currentUniverse } = useTheme();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  
  const exportAsImage = async () => {
    if (tierListRef.current) {
      setImageLoading(true);
      try {
        const dataUrl = await toPng(tierListRef.current, {
          quality: 0.95,
          filter: (node) =>
            !(node instanceof HTMLElement && node.dataset.exportIgnore === 'true'),
        });

        const link = document.createElement('a');
        const themeName = currentUniverse ?? 'tierlist';
        link.download = `mankind_tier_list_${themeName}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error exporting as image:', error);
      } finally {
        setImageLoading(false);
      }
    }
  };
  
  const exportAsJson = () => {
    try {
      const jsonString = JSON.stringify(getTierListData(), null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = 'tiersaga-tierlist.json';
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting as JSON:', error);
    }
  };
  
  const generateShareableLink = async () => {
    try {
      // Ensure we actually have data to share
      const data = getTierListData ? getTierListData() : undefined;
      if (!data) {
        throw new Error('No tier list data available');
      }

      // Include existing query params so filters/language/etc. are preserved
      const params = new URLSearchParams(window.location.search);
      const encodedData = encodeURIComponent(JSON.stringify(data));
      params.set('data', encodedData);
      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error generating shareable link:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h3 className="font-medium mb-4" style={{ color: themeColors.text }}>
        {t('exportShare')}
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportAsImage}
          className="flex items-center px-4 py-2 rounded-md transition-all"
          style={{
            backgroundColor: `${themeColors.primary}15`,
            color: themeColors.primary
          }}
        >
          {imageLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></div>
          ) : (
            <Download size={18} className="mr-2" />
          )}
          {t('saveAsImage')}
        </button>
        
        <button
          onClick={() => {}}
          className="flex items-center px-4 py-2 rounded-md transition-all"
          style={{
            backgroundColor: `${themeColors.secondary}15`,
            color: themeColors.secondary
          }}
        >
          <Code size={18} className="mr-2" />
          {t('exportJson')}
        </button>
        
        <button
          onClick={() => {}}
          className="flex items-center px-4 py-2 rounded-md transition-all"
          style={{
            backgroundColor: `${themeColors.accent}15`,
            color: themeColors.accent
          }}
        >
          <Share2 size={18} className="mr-2" />
          {copied ? t('linkCopied') : t('copyShareLink')}
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;