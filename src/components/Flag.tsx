import React from 'react';

interface FlagProps {
  code: 'us' | 'fr' | 'es';
  size?: number;
}

const Flag: React.FC<FlagProps> = ({ code, size = 20 }) => {
  const width = size * 1.5;
  const height = size;

  if (code === 'fr') {
    return (
      <svg width={width} height={height} viewBox="0 0 3 2" className="flex-shrink-0">
        <rect width="1" height="2" fill="#0055A4" />
        <rect x="1" width="1" height="2" fill="#ffffff" />
        <rect x="2" width="1" height="2" fill="#EF4135" />
      </svg>
    );
  }

  if (code === 'es') {
    return (
      <svg width={width} height={height} viewBox="0 0 3 2" className="flex-shrink-0">
        <rect width="3" height="2" fill="#AA151B" />
        <rect y="0.5" width="3" height="1" fill="#F1BF00" />
      </svg>
    );
  }

  // default to US flag
  return (
    <svg width={width} height={height} viewBox="0 0 19 10" className="flex-shrink-0">
      <rect width="19" height="10" fill="#B22234" />
      <g fill="#FFFFFF">
        <rect y="1" width="19" height="1" />
        <rect y="3" width="19" height="1" />
        <rect y="5" width="19" height="1" />
        <rect y="7" width="19" height="1" />
        <rect y="9" width="19" height="1" />
      </g>
      <rect width="7.6" height="5.4" fill="#3C3B6E" />
    </svg>
  );
};

export default Flag;
