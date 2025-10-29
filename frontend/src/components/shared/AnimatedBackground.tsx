import React from 'react';

const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Base gradient with growth pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-deep-forest via-carbon-black to-ash-gray growth-pattern"></div>
    
    {/* Floating organic shapes */}
    <div className="absolute top-20 left-1/5 w-64 h-64 bg-neo-mint/5 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-growth-green/8 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
    <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-trust-blue/6 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-[0.02]" 
         style={{
           backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 163, 0.3) 1px, transparent 0)`,
           backgroundSize: '48px 48px'
         }}>
    </div>
    
    {/* Glowing accent lines */}
    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neo-mint/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-growth-green/15 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
    
    {/* Financial chart-inspired elements */}
    <svg className="absolute bottom-0 left-0 w-full h-64 opacity-5" viewBox="0 0 1200 200" preserveAspectRatio="none">
      <path d="M0,200 L0,150 Q300,100 600,120 T1200,80 L1200,200 Z" fill="url(#chartGradient)" />
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 255, 163, 0.1)" />
          <stop offset="50%" stopColor="rgba(34, 197, 94, 0.15)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default AnimatedBackground;
