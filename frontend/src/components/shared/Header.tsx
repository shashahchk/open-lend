import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Menu, X } from 'lucide-react';

interface HeaderProps {
  userType: 'donor' | 'borrower';
  setUserType: (type: 'donor' | 'borrower') => void;
}

const Header = ({ userType, setUserType }: HeaderProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="relative z-10 glass-morphism border-b border-silver-edge/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-neo-gradient rounded-2xl flex items-center justify-center neo-shadow animate-glow">
                <Users className="w-7 h-7 text-carbon-black font-bold" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-wealth-gold rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neo-mint tracking-tight font-bricolage">
                OpenLend
              </h1>
              <p className="text-xs text-silver-edge hidden sm:block font-mono uppercase tracking-widest">
                ▲ Community Growth Protocol
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                const newType = userType === 'donor' ? 'borrower' : 'donor';
                setUserType(newType);
                navigate(`/${newType}`);
              }}
              className="px-6 py-3 rounded-2xl glass-morphism hover:bg-silver-edge/20 text-ghost-white border border-silver-edge/30 transition-all duration-500 text-sm font-medium font-mono uppercase tracking-wider neo-shadow group"
            >
              <span className="group-hover:text-neo-mint transition-colors">
                → {userType === 'donor' ? 'Builder' : 'Funder'}
              </span>
            </button>
            <button className="px-8 py-3 rounded-2xl bg-neo-gradient hover:bg-trust-gradient text-carbon-black font-semibold transition-all duration-500 neo-shadow text-sm font-bricolage animate-glow">
              Connect Wallet
            </button>
          </div>
          
          <button 
            className="sm:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            <button
              onClick={() => {
                const newType = userType === 'donor' ? 'borrower' : 'donor';
                setUserType(newType);
                navigate(`/${newType}`);
                setMobileMenuOpen(false);
              }}
              className="w-full px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 text-sm font-medium font-inter"
            >
              Switch to {userType === 'donor' ? 'Borrower' : 'Donor'}
            </button>
            <button className="w-full px-6 py-2 rounded-lg bg-linear-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-medium transition-all duration-300 shadow-lg shadow-sky-500/30 text-sm font-inter">
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
