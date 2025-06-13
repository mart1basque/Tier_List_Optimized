import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ExportPanelProps {
  tierListRef: React.RefObject<HTMLDivElement>;
  tierListData: any; // Simplified for this example
}

const ExportPanel: React.FC<ExportPanelProps> = ({ tierListRef, tierListData }) => {
  const { themeColors } = useTheme();
  const [copied, setCopied] = useState(false);
  
  const exportAsImage = async () => {
    if (tierListRef.current) {
      try {
        const dataUrl = await toPng(tierListRef.current, { quality: 0.95 });
        
        // Create a link and trigger download
        const link = document.createElement('a');
        link.download = 'tiersaga-tierlist.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error exporting as image:', error);
      }
    }
  };
  
  const exportAsJson = () => {
    try {
      const jsonString = JSON.stringify(tierListData, null, 2);
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
  
  const generateShareableLink = () => {
    try {
      // Simplified - in a real app, you might want to compress this or use a service
      const encodedData = encodeURIComponent(JSON.stringify(tierListData));
      const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (error) {
      console.error('Error generating shareable link:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h3 className="font-medium mb-4" style={{ color: themeColors.text }}>
        Export & Share
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
          <Download size={18} className="mr-2" />
          Save as Image
        </button>
        
        <button
          onClick={exportAsJson}
          className="flex items-center px-4 py-2 rounded-md transition-all"
          style={{ 
            backgroundColor: `${themeColors.secondary}15`, 
            color: themeColors.secondary 
          }}
        >
          <Code size={18} className="mr-2" />
          Export JSON
        </button>
        
        <button
          onClick={generateShareableLink}
          className="flex items-center px-4 py-2 rounded-md transition-all"
          style={{ 
            backgroundColor: `${themeColors.accent}15`, 
            color: themeColors.accent 
          }}
        >
          <Share2 size={18} className="mr-2" />
          {copied ? 'Link Copied!' : 'Copy Share Link'}
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;