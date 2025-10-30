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
  id, name, location, category, raised, target, borrowers, rate, description, onSupport 
}: CommunityCardProps) => {
  const progress = (raised / target) * 100;
  const [showDetails, setShowDetails] = useState(false);
  
  const communityData = { 
    id, name, location, category, raised, target, borrowers, rate, description 
  };
  
  return (
    <>
      <div 
        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
                <span>•</span>
                <span className="capitalize">{category}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">
                {borrowers}
              </div>
              <div className="text-gray-400 text-xs">
                Helped
              </div>
            </div>
          </div>
        </div>
      
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-xl font-bold text-white">
                ${raised.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">
                of ${target.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-400">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-linear-to-r from-blue-500 to-green-400 h-2 rounded-full transition-all duration-300"
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Users className="w-4 h-4" />
            <span>{borrowers} people helped</span>
          </div>
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
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>${raised.toLocaleString()} raised</span>
                  <span>${target.toLocaleString()} goal</span>
                </div>
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
