import { useState } from 'react';
import AnimatedBackground from './components/shared/AnimatedBackground';
import Header from './components/shared/Header';
import DonorView from './components/donor/DonorView';
import BorrowerView from './components/borrower/BorrowerView';

// Main App
const App = () => {
  const [userType, setUserType] = useState<'donor' | 'borrower'>('donor');
  
  return (
    <div className="min-h-screen bg-carbon-black text-ghost-white font-manrope flex flex-col relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        :root {
          --neo-mint: #00ffa3;
          --deep-forest: #0a1f1c;
          --growth-green: #22c55e;
          --wealth-gold: #fbbf24;
          --trust-blue: #3b82f6;
          --carbon-black: #0c0c0c;
          --ash-gray: #1a1a1a;
          --silver-edge: #404040;
          --ghost-white: #fafafa;
          --electric-cyan: #00e5ff;
          --warm-coral: #ff6b6b;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: var(--carbon-black);
          font-feature-settings: 'liga' 1, 'calt' 1;
        }
        
        .font-bricolage {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-variation-settings: 'wght' 400;
        }
        
        .font-manrope {
          font-family: 'Manrope', sans-serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, var(--neo-mint), var(--electric-cyan));
          border-radius: 8px;
          border: 2px solid var(--carbon-black);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, var(--growth-green), var(--neo-mint));
        }
        
        .bg-neo-gradient {
          background: linear-gradient(135deg, var(--neo-mint) 0%, var(--growth-green) 50%, var(--trust-blue) 100%);
        }
        
        .bg-wealth-gradient {
          background: linear-gradient(45deg, var(--wealth-gold), var(--warm-coral));
        }
        
        .bg-trust-gradient {
          background: linear-gradient(135deg, var(--trust-blue), var(--electric-cyan));
        }
        
        .glass-morphism {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(26, 26, 26, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .neo-shadow {
          box-shadow: 
            0 0 0 1px rgba(0, 255, 163, 0.1),
            0 8px 32px rgba(0, 255, 163, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .growth-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 163, 0.08) 0%, transparent 50%);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(0, 255, 163, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(0, 255, 163, 0.6));
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
      `}</style>
      
      <AnimatedBackground />
      <Header userType={userType} setUserType={setUserType} />
      
      {userType === 'donor' ? <DonorView /> : <BorrowerView />}
    </div>
  );
};

export default App;