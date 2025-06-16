import React from 'react';
import { useNavigate } from 'react-router-dom';
import NightModeToggle from '../components/NightModeToggle';

const GuidePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white relative">
      <NightModeToggle />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-8 bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-40 transition-all text-white"
        >
          Back to Home
        </button>
        <h1 className="text-3xl font-bold mb-4">Guide</h1>
        <p className="mb-4">
          Use this application to create tier lists from your favourite universes. Select an universe,
          apply filters and drag characters into tiers.
        </p>
        <p className="mb-4">
          Note: there is a small bug with the colour display of Temtem in normal mode (not Luma).
        </p>
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default GuidePage;
