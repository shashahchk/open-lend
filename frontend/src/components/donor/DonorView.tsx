import { useState } from 'react';
import { Heart, Users, TrendingUp } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import CommunityCard, { type Community } from './CommunityCard';
import PaymentModal from './PaymentModal';

const DonorView = () => {
  const [selectedCause, setSelectedCause] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  const communities: Community[] = [
    { 
      id: 1,
      name: 'Small Business Growth', 
      location: 'Southeast Asia', 
      category: 'business',
      raised: 45000, 
      target: 100000, 
      borrowers: 24, 
      rate: 4.5,
      description: 'Supporting small businesses and entrepreneurs in developing markets to create sustainable economic growth and job opportunities.'
    },
    { 
      id: 2,
      name: 'Education Support', 
      location: 'East Africa', 
      category: 'education',
      raised: 28000, 
      target: 50000, 
      borrowers: 18, 
      rate: 3.8,
      description: 'Funding educational initiatives, school supplies, and student loans to improve access to quality education.'
    },
    { 
      id: 3,
      name: 'Healthcare Access', 
      location: 'Latin America', 
      category: 'healthcare',
      raised: 62000, 
      target: 80000, 
      borrowers: 31, 
      rate: 4.2,
      description: 'Improving healthcare infrastructure and providing medical equipment to underserved communities.'
    },
    { 
      id: 4,
      name: 'Women Entrepreneurs', 
      location: 'South Asia', 
      category: 'women',
      raised: 38000, 
      target: 75000, 
      borrowers: 22, 
      rate: 4.0,
      description: 'Empowering women entrepreneurs with microloans and business development resources.'
    },
    { 
      id: 5,
      name: 'Agricultural Innovation', 
      location: 'West Africa', 
      category: 'agriculture',
      raised: 15000, 
      target: 40000, 
      borrowers: 12, 
      rate: 3.5,
      description: 'Supporting farmers with modern equipment and sustainable farming techniques to increase crop yields.'
    },
    { 
      id: 6,
      name: 'Tech Training Centers', 
      location: 'Eastern Europe', 
      category: 'education',
      raised: 72000, 
      target: 90000, 
      borrowers: 35, 
      rate: 4.8,
      description: 'Creating technology training centers to bridge the digital divide and provide tech skills education.'
    }
  ];
  
  const locations = ['all', ...Array.from(new Set(communities.map(c => c.location)))];
  const causes = ['all', 'education', 'business', 'healthcare', 'women', 'agriculture'];
  
  const filteredCommunities = communities.filter(community => {
    const matchesCause = selectedCause === 'all' || community.category === selectedCause;
    const matchesLocation = selectedLocation === 'all' || community.location === selectedLocation;
    return matchesCause && matchesLocation;
  });
  
  const handleSupport = (community: Community) => {
    setSelectedCommunity(community);
    setShowPayment(true);
  };
  
  const handlePayment = (amount: number, recurring: boolean) => {
    console.log(`Payment of $${amount} to ${selectedCommunity?.name}, recurring: ${recurring}`);
    // Here you would integrate with your payment processor
  };
  
  return (
    <div className="relative z-10 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12" style={{animation: 'slideUp 0.8s ease-out'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-neo-gradient rounded-full"></div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-neo-mint mb-2 font-bricolage">
                Growth Communities
              </h2>
              <p className="text-silver-edge text-lg sm:text-xl font-manrope">
                Fund the future. Grow together.
              </p>
            </div>
          </div>
          
          <div className="w-full h-px bg-linear-to-r from-transparent via-neo-mint/30 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard icon={Heart} label="Total Contributed" value="$12,450" change="+15%" delay={100} />
          <StatsCard icon={Users} label="People Helped" value="47" delay={200} />
          <StatsCard icon={TrendingUp} label="Avg. Return" value="4.2%" change="+0.3%" delay={300} />
        </div>
        
        <div className="mb-8 sm:mb-12" style={{animation: 'slideUp 0.8s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
          <div className="glass-morphism rounded-3xl p-6 sm:p-8 border border-silver-edge/20 neo-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-silver-edge mb-4">
                  ▲ Focus Area
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {causes.map(cause => (
                    <button
                      key={cause}
                      onClick={() => setSelectedCause(cause)}
                      className={`px-4 py-3 rounded-2xl font-medium transition-all duration-500 text-sm font-manrope relative overflow-hidden ${
                        selectedCause === cause
                          ? 'bg-neo-gradient text-carbon-black shadow-lg neo-shadow font-semibold'
                          : 'glass-morphism text-silver-edge hover:text-neo-mint border border-silver-edge/30 hover:border-neo-mint/50'
                      }`}
                    >
                      {cause === 'all' ? 'All Areas' : cause.charAt(0).toUpperCase() + cause.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-silver-edge mb-4">
                  ⟡ Global Markets
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-6 py-4 glass-morphism border border-silver-edge/30 rounded-2xl text-ghost-white text-sm focus:outline-none focus:border-neo-mint/50 transition-all duration-500 font-manrope neo-shadow"
                >
                  {locations.map(location => (
                    <option key={location} value={location} className="bg-ash-gray">
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-silver-edge/20">
              <p className="text-sm text-silver-edge font-mono">
                {filteredCommunities.length} communities • ${filteredCommunities.reduce((sum, c) => sum + c.raised, 0).toLocaleString()} total funding
              </p>
              <div className="flex items-center gap-2 text-growth-green text-sm font-mono">
                <div className="w-2 h-2 bg-growth-green rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {filteredCommunities.map((community, idx) => (
            <CommunityCard 
              key={community.id} 
              {...community} 
              delay={600 + idx * 150}
              onSupport={handleSupport}
            />
          ))}
        </div>
        
        {filteredCommunities.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-3xl p-8 border border-silver-edge/20 neo-shadow max-w-md mx-auto">
              <div className="w-16 h-16 bg-wealth-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-silver-edge text-lg font-manrope mb-6">
                No communities match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCause('all');
                  setSelectedLocation('all');
                }}
                className="px-8 py-3 rounded-2xl bg-neo-gradient hover:bg-trust-gradient text-carbon-black font-semibold transition-all duration-500 neo-shadow font-bricolage"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showPayment && selectedCommunity && (
        <PaymentModal
          community={selectedCommunity}
          onClose={() => setShowPayment(false)}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default DonorView;
