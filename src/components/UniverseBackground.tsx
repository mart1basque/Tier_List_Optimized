import React from 'react';
import { UniverseType, universeConfig } from '../data/universes';

interface UniverseBackgroundProps {
  universe: UniverseType;
}

const UniverseBackground: React.FC<UniverseBackgroundProps> = ({ universe }) => {
  const config = universeConfig[universe];
  
  // Add universe-specific backgrounds and effects
  const renderBackgroundElements = () => {
    switch (universe) {
      case 'pokemon':
        return (
          <>
            {/* Stars */}
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </>
        );
        
      case 'naruto':
        return (
          <>
            {/* Leaves */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  width: `${Math.random() * 15 + 10}px`,
                  height: `${Math.random() * 15 + 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  borderRadius: '50% 0 50% 0',
                  backgroundColor: index % 2 === 0 ? '#FFDE40' : '#FF7800',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out ${Math.random() * 10}s`,
                }}
              />
            ))}
          </>
        );
        
      case 'one-piece':
        return (
          <>
            {/* Ocean waves and treasure map elements */}
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full border-2 border-yellow-600 opacity-30"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  borderStyle: 'dashed',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </>
        );
        
      case 'dragon-ball':
        return (
          <>
            {/* Energy particles */}
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.2,
                  backgroundColor: index % 3 === 0 ? '#FFC837' : index % 3 === 1 ? '#FF9232' : '#FFDE40',
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px ${index % 3 === 0 ? '#FFC83777' : index % 3 === 1 ? '#FF923277' : '#FFDE4077'}`,
                  animation: `float ${Math.random() * 8 + 5}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </>
        );
        
      case 'demon-slayer':
        return (
          <>
            {/* Dark forest with light particles */}
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-30 bg-cover bg-center"></div>
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  backgroundColor: index % 2 === 0 ? '#FFC4C0' : '#E6E6FA',
                  boxShadow: `0 0 ${Math.random() * 8 + 3}px ${index % 2 === 0 ? '#FFC4C077' : '#E6E6FA77'}`,
                  animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden" style={config.backgroundStyle}>
      {/* Universe-specific background elements */}
      {renderBackgroundElements()}
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default UniverseBackground;