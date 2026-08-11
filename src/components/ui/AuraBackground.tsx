import React from 'react';

export function AuraBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* High Contrast Aura Orbs (Matching reference structure) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full animate-blob opacity-80" 
        style={{ 
          backgroundColor: '#ff0055', // High contrast Neon Pink
          filter: 'blur(100px)'
        }} 
      ></div>
      
      <div 
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full animate-blob opacity-80" 
        style={{ 
          backgroundColor: '#00ffcc', // High contrast Cyan
          filter: 'blur(120px)', 
          animationDelay: '2s'
        }} 
      ></div>
      
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full animate-blob opacity-80" 
        style={{ 
          backgroundColor: '#7000ff', // High contrast Purple
          filter: 'blur(150px)', 
          animationDelay: '4s'
        }} 
      ></div>

      {/* Clean Black Blur Layer above the Aura */}
      <div className="absolute inset-0 z-10 bg-background/40 backdrop-blur-3xl"></div>
    </div>
  );
}
