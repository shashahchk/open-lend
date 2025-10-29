import { useState } from 'react';
import { ArrowRight, Users, MapPin, CreditCard, X } from 'lucide-react';

export interface Community {
  id: number;
  name: string;
  location: string;
  category: string;
  raised: number;
  target: number;
  borrowers: number;
  rate: number;
  description: string;
  imageUrl?: string;
}

interface CommunityCardProps extends Community {
  delay: number;
  onSupport: (community: Community) => void;
}

const CommunityCard = ({ 
  id, name, location, category, raised, target, borrowers, rate, description, delay, onSupport 
}: CommunityCardProps) => {
  const progress = (raised / target) * 100;
  const [showDetails, setShowDetails] = useState(false);
  
  const communityData = { 
    id, name, location, category, raised, target, borrowers, rate, description 
  };
  
  return (
    <>
      <div 
        className="group relative glass-morphism rounded-3xl p-6 sm:p-8 border border-silver-edge/20 hover:border-neo-mint/40 transition-all duration-700 neo-shadow cursor-pointer overflow-hidden"
        style={{animation: 'slideUp 0.8s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
        onClick={() => setShowDetails(true)}
      >
        {/* Floating geometric accent */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-wealth-gold rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-8 w-2 h-2 bg-neo-mint/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Main content */}
        <div className="relative z-10">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-neo-mint mb-2 font-bricolage leading-tight group-hover:text-ghost-white transition-colors duration-500">
                  {name}
                </h3>
                <div className="flex items-center gap-3 text-silver-edge text-sm font-mono">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0 text-trust-blue" />
                    <span>{location}</span>
                  </div>
                  <span className="w-1 h-1 bg-silver-edge rounded-full"></span>
                  <span className="uppercase tracking-wider text-xs">{category}</span>
                </div>
              </div>
              
              <div className="px-4 py-2 bg-growth-green/20 rounded-2xl border border-growth-green/30">
                <div className="text-growth-green font-mono font-bold text-sm">
                  {rate}%
                </div>
                <div className="text-growth-green/70 font-mono text-xs uppercase tracking-wider">
                  APR
                </div>
              </div>
            </div>
          </div>
        
          {/* Progress visualization */}
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-2xl font-bold text-ghost-white font-bricolage">
                  ${raised.toLocaleString()}
                </div>
                <div className="text-silver-edge text-sm font-mono">
                  raised of ${target.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-neo-mint font-mono">
                  {Math.round(progress)}%
                </div>
                <div className="text-silver-edge text-xs font-mono uppercase tracking-wider">
                  Complete
                </div>
              </div>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative">
              <div className="h-3 bg-ash-gray rounded-full overflow-hidden border border-silver-edge/20">
                <div 
                  className="h-full bg-neo-gradient rounded-full transition-all duration-1500 relative overflow-hidden"
                  style={{width: `${progress}%`}}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -top-1 bg-wealth-gold w-2 h-5 rounded-sm transition-all duration-1500" 
                   style={{left: `${Math.min(progress, 95)}%`}}>
              </div>
            </div>
          </div>
        
          {/* Bottom action area */}
          <div className="flex items-center justify-between pt-6 border-t border-silver-edge/20">
            <div className="flex items-center gap-3 text-silver-edge text-sm font-mono">
              <Users className="w-4 h-4 text-trust-blue" />
              <span>{borrowers} builders active</span>
            </div>
            <button 
              className="group flex items-center gap-2 px-4 py-2 bg-neo-gradient hover:bg-trust-gradient rounded-2xl text-carbon-black font-semibold transition-all duration-500 neo-shadow text-sm font-bricolage"
              onClick={(e) => {
                e.stopPropagation();
                onSupport(communityData);
              }}
            >
              Fund <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white font-clash">{name}</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="space-y-4 font-inter">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-white font-semibold">{location}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Category</p>
                  <p className="text-white font-semibold">{category}</p>
                </div>
              </div>
              
              <div>
                <p className="text-slate-400 text-sm mb-2">Description</p>
                <p className="text-white">{description}</p>
              </div>
              
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full"
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">${raised.toLocaleString()} raised</span>
                  <span className="text-slate-400">${target.toLocaleString()} goal</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  onSupport(communityData);
                  setShowDetails(false);
                }}
                className="w-full px-6 py-3 rounded-lg bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Support This Community
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityCard;
