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
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Make a Donation
          </h2>
          <p className="text-gray-400 mb-6">
            Support communities worldwide with AI-powered matching
          </p>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Bot className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                How It Works
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-white font-medium mb-1">1. Choose a cause</p>
                <p className="text-gray-400">Pick what matters to you</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">2. AI matches projects</p>
                <p className="text-gray-400">We find the best opportunities</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">3. Track your impact</p>
                <p className="text-gray-400">See real results from your donation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
            {[
              { id: 'donate' as TabType, label: 'Donate', icon: Target },
              { id: 'impact' as TabType, label: 'My Impact', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
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
            <div className="mb-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {causes.map(cause => (
                        <button
                          key={cause}
                          onClick={() => setSelectedCause(cause)}
                          className={`px-3 py-2 rounded text-sm transition-all ${
                            selectedCause === cause
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {cause === 'all' ? 'All' : cause.charAt(0).toUpperCase() + cause.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                    >
                      {locations.map(location => (
                        <option key={location} value={location} className="bg-gray-800">
                          {location === 'all' ? 'All Locations' : location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/10 text-sm text-gray-400">
                  <span>
                    {filteredCommunities.length} causes • ${filteredCommunities.reduce((sum, c) => sum + c.raised, 0).toLocaleString()} raised
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>AI Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredCommunities.map((community) => (
                <CommunityCard 
                  key={community.id} 
                  {...community} 
                  delay={0}
                  onSupport={handleSupport}
                />
              ))}
            </div>
            
            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 max-w-sm mx-auto">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-400 mb-4">
                    No causes match your filters
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCause('all');
                      setSelectedLocation('all');
                    }}
                    className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Your Impact</h3>
                <p className="text-gray-400">Projects you've supported</p>
              </div>
              <div className="bg-green-500/20 px-3 py-1 rounded border border-green-500/30">
                <span className="text-green-400 text-sm font-medium">12 People Helped</span>
              </div>
            </div>

            <div className="space-y-4">
              {fundedProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">By {project.borrower} • {project.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">${project.amount.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs">{project.funded.toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">{project.repaymentProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{width: `${project.repaymentProgress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                    <p className="text-green-400 font-medium text-sm mb-1">Impact</p>
                    <p className="text-green-300/80 text-sm">{project.impact}</p>
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
