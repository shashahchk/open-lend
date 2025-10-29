import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Award, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Clock,
  Gift,
  Users,
  CheckCircle,
  Lock
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  category: 'payment' | 'community' | 'engagement' | 'milestone';
}

interface CredibilityDashboardProps {
  currentScore: number;
  paymentStreak: number;
  totalLoans: number;
  communityRating: number;
}

const CredibilityDashboard = ({ 
  currentScore, 
  paymentStreak, 
  totalLoans, 
  communityRating 
}: CredibilityDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'rewards'>('overview');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= currentScore) {
            clearInterval(interval);
            return currentScore;
          }
          return prev + Math.ceil((currentScore - prev) / 10);
        });
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentScore]);

  const level = Math.floor(currentScore / 100) + 1;
  const nextLevelProgress = currentScore % 100;

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first loan application',
      icon: <CheckCircle className="w-6 h-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 25,
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Payment Streak',
      description: 'Make 5 consecutive on-time payments',
      icon: <Calendar className="w-6 h-6" />,
      unlocked: paymentStreak >= 5,
      progress: Math.min(paymentStreak, 5),
      maxProgress: 5,
      points: 50,
      category: 'payment'
    },
    {
      id: '3',
      title: 'Early Bird',
      description: 'Make 3 early payments',
      icon: <Clock className="w-6 h-6" />,
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      points: 75,
      category: 'payment'
    },
    {
      id: '4',
      title: 'Community Favorite',
      description: 'Receive 10+ positive ratings from donors',
      icon: <Star className="w-6 h-6" />,
      unlocked: communityRating >= 4.5,
      progress: Math.floor(communityRating * 2),
      maxProgress: 10,
      points: 100,
      category: 'community'
    },
    {
      id: '5',
      title: 'Loan Veteran',
      description: 'Successfully complete 3 loans',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: totalLoans >= 3,
      progress: Math.min(totalLoans, 3),
      maxProgress: 3,
      points: 150,
      category: 'milestone'
    },
    {
      id: '6',
      title: 'Engagement Champion',
      description: 'Participate in community discussions 20 times',
      icon: <Users className="w-6 h-6" />,
      unlocked: false,
      progress: 7,
      maxProgress: 20,
      points: 80,
      category: 'engagement'
    }
  ];

  const rewards = [
    {
      id: '1',
      title: 'Interest Rate Reduction',
      description: '0.5% lower interest rate on next loan',
      cost: 500,
      available: currentScore >= 500,
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />
    },
    {
      id: '2',
      title: 'Priority Review',
      description: 'Fast-track application review process',
      cost: 300,
      available: currentScore >= 300,
      icon: <Zap className="w-6 h-6 text-yellow-400" />
    },
    {
      id: '3',
      title: 'Loan Limit Increase',
      description: 'Increase maximum loan amount by $1,000',
      cost: 1000,
      available: currentScore >= 1000,
      icon: <TrendingUp className="w-6 h-6 text-violet-400" />
    },
    {
      id: '4',
      title: 'Community Badge',
      description: 'Special "Trusted Borrower" badge on profile',
      cost: 750,
      available: currentScore >= 750,
      icon: <Award className="w-6 h-6 text-blue-400" />
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const levelUpAnimation = () => {
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  useEffect(() => {
    if (animatedScore > 0 && animatedScore % 100 === 0 && animatedScore === currentScore) {
      levelUpAnimation();
    }
  }, [animatedScore, currentScore]);

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center p-8 bg-linear-to-br from-violet-600 to-purple-600 rounded-2xl border border-white/20 shadow-2xl animate-pulse">
            <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white font-clash mb-2">Level Up!</h2>
            <p className="text-xl text-violet-100 font-inter">You've reached Level {level}!</p>
          </div>
        </div>
      )}

      {/* Header with Score */}
      <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white font-clash mb-2">Credibility Dashboard</h2>
            <p className="text-slate-400 font-inter">Build your reputation, unlock rewards</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-3xl font-bold text-white font-clash">{animatedScore}</span>
            </div>
            <p className="text-sm text-slate-400 font-inter">Level {level}</p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400 font-inter">Progress to Level {level + 1}</span>
            <span className="text-sm text-violet-400 font-inter">{nextLevelProgress}/100</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-linear-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${nextLevelProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-emerald-400 font-clash">{paymentStreak}</div>
            <div className="text-xs text-slate-400 font-inter">Payment Streak</div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-clash">{communityRating.toFixed(1)}</div>
            <div className="text-xs text-slate-400 font-inter">Community Rating</div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-violet-400 font-clash">{totalPoints}</div>
            <div className="text-xs text-slate-400 font-inter">Total Points</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
          { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
          { id: 'rewards', label: 'Rewards', icon: <Gift className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as 'overview' | 'achievements' | 'rewards')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-inter text-sm ${
              selectedTab === tab.id
                ? 'bg-violet-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 font-clash flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-inter text-sm">On-time payment</span>
                </div>
                <span className="text-emerald-400 font-inter text-sm">+15 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-inter text-sm">5-star rating received</span>
                </div>
                <span className="text-violet-400 font-inter text-sm">+20 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-inter text-sm">Community interaction</span>
                </div>
                <span className="text-blue-400 font-inter text-sm">+5 pts</span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 font-clash flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-400" />
              Next Goals
            </h3>
            <div className="space-y-3">
              {achievements.filter(a => !a.unlocked).slice(0, 3).map(achievement => (
                <div key={achievement.id} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-inter text-sm">{achievement.title}</span>
                    <span className="text-violet-400 font-inter text-xs">{achievement.points} pts</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-inter">
                    {achievement.progress}/{achievement.maxProgress}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 ${
                achievement.unlocked 
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/20' 
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-violet-600/20 text-violet-400' 
                    : 'bg-slate-700/50 text-slate-500'
                }`}>
                  {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold font-clash ${
                    achievement.unlocked ? 'text-white' : 'text-slate-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-inter ${
                    achievement.category === 'payment' ? 'bg-emerald-500/20 text-emerald-400' :
                    achievement.category === 'community' ? 'bg-blue-500/20 text-blue-400' :
                    achievement.category === 'engagement' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-violet-500/20 text-violet-400'
                  }`}>
                    {achievement.category}
                  </span>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-4 font-inter">{achievement.description}</p>
              
              {!achievement.unlocked && (
                <div className="mb-4">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-inter">
                    {achievement.progress}/{achievement.maxProgress}
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold font-clash ${
                  achievement.unlocked ? 'text-violet-400' : 'text-slate-500'
                }`}>
                  {achievement.points} pts
                </span>
                {achievement.unlocked && (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map(reward => (
            <div 
              key={reward.id} 
              className={`bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 ${
                reward.available 
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30' 
                  : 'border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  reward.available 
                    ? 'bg-violet-600/20' 
                    : 'bg-slate-700/50'
                }`}>
                  {reward.available ? reward.icon : <Lock className="w-6 h-6 text-slate-500" />}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold font-clash ${
                    reward.available ? 'text-white' : 'text-slate-400'
                  }`}>
                    {reward.title}
                  </h4>
                  <p className="text-slate-400 text-sm font-inter">{reward.description}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold font-clash ${
                  reward.available ? 'text-violet-400' : 'text-slate-500'
                }`}>
                  {reward.cost} pts
                </span>
                <button
                  disabled={!reward.available}
                  className={`px-4 py-2 rounded-lg font-inter text-sm transition-colors ${
                    reward.available
                      ? 'bg-violet-600 hover:bg-violet-700 text-white'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {reward.available ? 'Redeem' : 'Locked'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredibilityDashboard;
