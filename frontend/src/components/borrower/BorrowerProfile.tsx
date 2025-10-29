import { User, MapPin, Briefcase, DollarSign, TrendingUp, Calendar, Award, CheckCircle, Star, Trophy, Target, Zap, MessageCircle, Phone } from 'lucide-react';

interface BorrowerProfileProps {
  delay: number;
}

const BorrowerProfile = ({ delay }: BorrowerProfileProps) => {
  const profileData = {
    name: 'John Doe',
    location: 'Austin, Texas',
    memberSince: 'January 2023',
    employment: 'Software Engineer',
    income: '$4,500/month',
    creditHistory: [
      { date: '2024', amount: '$3,000', status: 'Repaid on time', impact: '+12 points' },
      { date: '2023', amount: '$1,500', status: 'Repaid early', impact: '+8 points' },
      { date: '2023', amount: '$800', status: 'Repaid on time', impact: '+5 points' }
    ],
    verifications: [
      { type: 'Identity Verified', verified: true },
      { type: 'Income Verified', verified: true },
      { type: 'Employment Verified', verified: true },
      { type: 'Bank Account Verified', verified: true },
      { type: 'References Verified', verified: false }
    ],
    riskFactors: {
      debtToIncomeRatio: '28%',
      paymentHistory: '100%',
      creditUtilization: '35%',
      accountAge: '2.1 years'
    }
  };
  
  return (
    <div 
      className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-linear-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-clash">{profileData.name}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-inter">
            <MapPin className="w-4 h-4" />
            {profileData.location}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-inter">
            <Calendar className="w-4 h-4" />
            Member since {profileData.memberSince}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-slate-400 font-inter">Employment</span>
          </div>
          <p className="text-white font-semibold font-inter">{profileData.employment}</p>
        </div>
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-400 font-inter">Monthly Income</span>
          </div>
          <p className="text-white font-semibold font-inter">{profileData.income}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-3 font-clash flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-400" />
          Credit History
        </h4>
        <div className="space-y-3">
          {profileData.creditHistory.map((record, idx) => (
            <div key={idx} className="p-3 bg-slate-700/20 rounded-lg border border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-semibold font-inter">{record.amount} loan ({record.date})</p>
                  <p className="text-sm text-emerald-400 font-inter">{record.status}</p>
                </div>
                <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full font-inter">
                  {record.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-3 font-clash">Verifications</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {profileData.verifications.map((verification, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${verification.verified ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className={`text-sm font-inter ${verification.verified ? 'text-white' : 'text-slate-400'}`}>
                {verification.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-3 font-clash flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          Risk Assessment
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-inter">Debt-to-Income</p>
            <p className="text-lg font-bold text-emerald-400 font-clash">{profileData.riskFactors.debtToIncomeRatio}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-inter">Payment History</p>
            <p className="text-lg font-bold text-emerald-400 font-clash">{profileData.riskFactors.paymentHistory}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-inter">Credit Utilization</p>
            <p className="text-lg font-bold text-yellow-400 font-clash">{profileData.riskFactors.creditUtilization}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-inter">Account Age</p>
            <p className="text-lg font-bold text-white font-clash">{profileData.riskFactors.accountAge}</p>
          </div>
        </div>
      </div>

      {/* Credibility Level & Achievements */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-3 font-clash flex items-center gap-2">
          <Star className="w-5 h-5 text-violet-400" />
          Credibility Level
        </h4>
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold text-white font-clash">Level 7</span>
              <span className="text-sm text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full font-inter">Trusted Borrower</span>
            </div>
            <span className="text-2xl font-bold text-violet-400 font-clash">780 pts</span>
          </div>
          
          {/* Progress to next level */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400 font-inter">Progress to Level 8</span>
              <span className="text-sm text-violet-400 font-inter">80/100</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-linear-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '80%' }} />
            </div>
          </div>

          {/* Recent achievements */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-emerald-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-inter">5-Payment Streak</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-500/20 rounded-lg">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-inter">Early Payment Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-lg font-bold text-white mb-3 font-clash">Quick Actions</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors font-inter text-sm">
            <MessageCircle className="w-4 h-4" />
            Live Chat
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg transition-colors font-inter text-sm">
            <Phone className="w-4 h-4" />
            Voice Call
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded-lg transition-colors font-inter text-sm">
            <Star className="w-4 h-4" />
            View Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfile;
