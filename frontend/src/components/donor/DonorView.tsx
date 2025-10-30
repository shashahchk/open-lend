import { useState } from 'react';
import { Users, TrendingUp, Bot, Zap, Target, Activity, DollarSign } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import CommunityCard, { type Community } from './CommunityCard';
import PaymentModal from './PaymentModal';

type TabType = 'donate' | 'impact';

const DonorView = () => {
  const [activeTab, setActiveTab] = useState<TabType>('donate');
  const [selectedCause, setSelectedCause] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  // Mock data for funded projects
  const fundedProjects = [
    {
      id: 1,
      name: 'Maria\'s Coffee Shop',
      borrower: 'Maria Santos',
      amount: 2500,
      category: 'business',
      location: 'Guatemala',
      status: 'active',
      funded: new Date('2024-09-15'),
      repaymentProgress: 65,
      impact: 'Created 3 jobs, increased local coffee sales by 40%',
      poolSource: 'Small Business Growth'
    },
    {
      id: 2,
      name: 'Solar Panel Installation',
      borrower: 'Ahmed Hassan',
      amount: 1800,
      category: 'renewable',
      location: 'Morocco',
      status: 'completed',
      funded: new Date('2024-08-01'),
      repaymentProgress: 100,
      impact: 'Reduced energy costs by 60%, powers 15 homes',
      poolSource: 'Renewable Energy'
    },
    {
      id: 3,
      name: 'School Computer Lab',
      borrower: 'Grace Mukasa',
      amount: 3200,
      category: 'education',
      location: 'Uganda',
      status: 'active',
      funded: new Date('2024-10-01'),
      repaymentProgress: 25,
      impact: '150 students now have computer access',
      poolSource: 'Education Support'
    }
  ];



  const communities: Community[] = [
    { 
      id: 1,
      name: 'Small Business Growth', 
      location: 'Southeast Asia', 
      category: 'business',
      raised: 45000, 
      target: 100000, 
      borrowers: 24, 
      rate: 4.5, // keeping for compatibility, but not displaying
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
        {/* Hero Section with AI Explanation */}
        <div className="mb-8 sm:mb-12" style={{animation: 'slideUp 0.8s ease-out'}}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-12 bg-neo-gradient rounded-full"></div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-neo-mint mb-2 font-bricolage">
                Donate & Create Impact
              </h2>
              <p className="text-silver-edge text-lg sm:text-xl font-manrope">
                Your donations. AI-powered distribution. Real impact.
              </p>
            </div>
          </div>

          {/* AI System Explanation */}
          <div className="glass-morphism rounded-3xl p-6 sm:p-8 border border-neo-mint/30 neo-shadow mb-6">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-neo-gradient rounded-2xl shrink-0">
                <Bot className="w-8 h-8 text-carbon-black" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-neo-mint mb-3 font-bricolage">
                  How Your Donations Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-manrope">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-wealth-gold rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="text-ghost-white font-semibold mb-1">1. Choose Your Cause</p>
                      <p className="text-silver-edge">Select causes you care about: education, healthcare, small business, women's empowerment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="text-ghost-white font-semibold mb-1">2. AI Finds Best Projects</p>
                      <p className="text-silver-edge">Our AI automatically identifies the most impactful projects and distributes your donation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-growth-green rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="text-ghost-white font-semibold mb-1">3. See Your Impact</p>
                      <p className="text-silver-edge">Track the specific people and projects your donations helped, with real progress updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full h-px bg-linear-to-r from-transparent via-neo-mint/30 to-transparent"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8" style={{animation: 'slideUp 0.8s ease-out', animationDelay: '200ms', animationFillMode: 'both'}}>
          <div className="flex gap-2 bg-ash-gray/30 p-2 rounded-2xl border border-silver-edge/20">
            {[
              { id: 'donate' as TabType, label: 'Make Donation', icon: Target, description: 'Choose causes to support' },
              { id: 'impact' as TabType, label: 'Your Impact', icon: Activity, description: 'See who you\'ve helped' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-500 ${
                  activeTab === tab.id
                    ? 'bg-neo-gradient text-carbon-black shadow-lg neo-shadow'
                    : 'text-silver-edge hover:text-neo-mint hover:bg-silver-edge/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold font-bricolage">{tab.label}</div>
                  <div className="text-xs opacity-70">{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard icon={DollarSign} label="Your Donations" value="$1,250" change="+$400" delay={100} />
          <StatsCard icon={Users} label="People Helped" value="12" delay={200} />
          <StatsCard icon={TrendingUp} label="Projects Funded" value="8" change="+3" delay={300} />
          <StatsCard icon={Zap} label="AI Matching" value="94%" change="+2%" delay={400} />
        </div>
        
        {/* Tab Content */}
        {activeTab === 'donate' && (
          <div className="space-y-8">
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
                    {filteredCommunities.length} causes available • ${filteredCommunities.reduce((sum, c) => sum + c.raised, 0).toLocaleString()} donated so far
                  </p>
                  <div className="flex items-center gap-2 text-growth-green text-sm font-mono">
                    <div className="w-2 h-2 bg-growth-green rounded-full animate-pulse"></div>
                    AI Active
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
                    No causes match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCause('all');
                      setSelectedLocation('all');
                    }}
                    className="px-8 py-3 rounded-2xl bg-neo-gradient hover:bg-trust-gradient text-carbon-black font-semibold transition-all duration-500 neo-shadow font-bricolage"
                  >
                    Show All Causes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-6" style={{animation: 'slideUp 0.8s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-neo-mint font-bricolage mb-2">People You've Helped</h3>
                <p className="text-silver-edge font-manrope">See the real people and projects your donations supported</p>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-xl border border-silver-edge/20">
                <span className="text-growth-green font-mono text-sm font-semibold">12 People Helped</span>
              </div>
            </div>

            <div className="grid gap-6">
              {fundedProjects.map((project, idx) => (
                <div 
                  key={project.id}
                  className="glass-morphism rounded-3xl p-6 border border-silver-edge/20 neo-shadow hover:border-neo-mint/40 transition-all duration-500"
                  style={{animation: 'slideUp 0.8s ease-out', animationDelay: `${500 + idx * 100}ms`, animationFillMode: 'both'}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-neo-mint font-bricolage">{project.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                          project.status === 'active' 
                            ? 'bg-growth-green/20 text-growth-green border border-growth-green/30' 
                            : 'bg-trust-blue/20 text-trust-blue border border-trust-blue/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-silver-edge text-sm font-manrope mb-1">By {project.borrower} • {project.location}</p>
                      <p className="text-silver-edge text-xs font-mono">From pool: {project.poolSource}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-ghost-white font-bricolage">${project.amount.toLocaleString()}</div>
                      <div className="text-silver-edge text-sm font-mono">Helped {project.funded.toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-silver-edge">Project Progress</span>
                      <span className="text-sm font-bold text-neo-mint font-mono">{project.repaymentProgress}% Complete</span>
                    </div>
                    <div className="h-2 bg-ash-gray rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neo-gradient rounded-full transition-all duration-1000"
                        style={{width: `${project.repaymentProgress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-growth-green/10 rounded-2xl border border-growth-green/20">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-growth-green rounded-full mt-2 shrink-0"></div>
                      <div>
                        <p className="text-growth-green font-semibold text-sm mb-1">Real Impact</p>
                        <p className="text-growth-green/80 text-sm font-manrope">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
