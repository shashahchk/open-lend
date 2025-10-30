import { User, MapPin, Briefcase, Calendar, CheckCircle, Shield, TrendingUp, CreditCard, DollarSign, Edit, Clock } from 'lucide-react';

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
    credibilityScore: 780,
    totalLoans: 3,
    totalRepaid: '$12,300',
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
    <div className="space-y-6" style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}>
      {/* Profile Header - Simple & Clean */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-linear-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-slate-800 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Since {profileData.memberSince}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{profileData.employment}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">{profileData.credibilityScore}</div>
            <div className="text-xs text-slate-400">Credibility</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">{profileData.totalLoans}</div>
            <div className="text-xs text-slate-400">Total Loans</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">{profileData.totalRepaid}</div>
            <div className="text-xs text-slate-400">Repaid</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-slate-400">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Simple Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Verifications - Simplified */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Verification Status</h3>
          </div>
          <div className="space-y-3">
            {profileData.verifications.map((verification, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-slate-300 text-sm">{verification.type}</span>
                {verification.verified ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Pending</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Financial Health - Simplified */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Financial Health</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(profileData.riskFactors).map(([key, value], index) => {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              const isGood = (key === 'paymentHistory' && value === '100%') || 
                           (key === 'debtToIncomeRatio' && parseFloat(value) < 30);
              
              return (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-slate-300 text-sm">{label}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isGood ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loan History - Clean List */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Loan History</h3>
        </div>
        <div className="space-y-3">
          {profileData.creditHistory.map((loan, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{loan.amount}</div>
                  <div className="text-slate-400 text-xs">{loan.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 text-sm font-medium">{loan.status}</div>
                <div className="text-emerald-400 text-xs">{loan.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfile;
