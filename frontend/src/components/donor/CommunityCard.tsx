import { useState } from 'react';
import { ArrowRight, MapPin, CreditCard, X } from 'lucide-react';

export interface Community {
  id: number;
  name: string;
  location: string;
  category: string;
  poolBalance: number; // Available funds in the pool
  totalPoolSize: number; // Total pool capacity
  activeLoans: number; // Currently active loans
  loanApplications: number; // Pending applications
  borrowers: number; // Total people helped
  rate: number;
  description: string;
  averageLoanAmount?: number; // Average loan size
  successRate?: number; // Loan success/approval rate
  imageUrl?: string;
}

interface CommunityCardProps extends Community {
  delay: number;
  onSupport: (community: Community) => void;
}

const CommunityCard = ({ 
  id, name, location, category, poolBalance, totalPoolSize, activeLoans, loanApplications, borrowers, rate, description, averageLoanAmount, successRate, onSupport 
}: CommunityCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const communityData = { 
    id, name, location, category, poolBalance, totalPoolSize, activeLoans, loanApplications, borrowers, rate, description, averageLoanAmount, successRate
  };
  
  return (
    <>
      <div 
        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
                <span>•</span>
                <span className="capitalize bg-gray-700/50 px-2 py-1 rounded text-xs">{category}</span>
              </div>
            </div>
            
            <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
              <div className="text-blue-400 font-bold text-xl">
                {borrowers}
              </div>
              <div className="text-blue-300 text-xs font-medium">
                People helped
              </div>
            </div>
          </div>
        </div>
      
        {/* Main Pool Info */}
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-2xl font-bold text-white">
                ${poolBalance.toLocaleString()}
              </div>
              <div className="text-blue-300 text-sm">
                Available for new loans
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-400">
                {activeLoans}
              </div>
              <div className="text-gray-400 text-xs">
                Currently funded
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            {loanApplications > 0 && (
              <span className="text-orange-400">{loanApplications} applications pending approval</span>
            )}
            {averageLoanAmount && (
              <>
                {loanApplications > 0 && <span className="text-gray-500"> • </span>}
                <span>Typical loan: ${averageLoanAmount.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>
      
        <div className="flex justify-end">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onSupport(communityData);
            }}
          >
            Donate <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white">{location}</p>
                </div>
                <div>
                  <p className="text-gray-400">Category</p>
                  <p className="text-white capitalize">{category}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Description</p>
                <p className="text-white text-sm">{description}</p>
              </div>
              
              <div className="p-3 bg-gray-700/50 rounded">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-gray-400 text-xs">Pool Balance</div>
                    <div className="text-white font-bold">${poolBalance.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Total Pool Size</div>
                    <div className="text-white font-bold">${totalPoolSize.toLocaleString()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-gray-400 text-xs">Active Loans</div>
                    <div className="text-blue-400 font-bold">{activeLoans}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Applications</div>
                    <div className="text-orange-400 font-bold">{loanApplications}</div>
                  </div>
                </div>
                {successRate && (
                  <div className="mt-3 pt-2 border-t border-gray-600">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-400 font-bold">{Math.round(successRate)}%</span>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  onSupport(communityData);
                  setShowDetails(false);
                }}
                className="w-full px-4 py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
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
