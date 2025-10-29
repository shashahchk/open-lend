import { User, MapPin, Briefcase, DollarSign, TrendingUp, Calendar, Award, CheckCircle } from 'lucide-react';

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
      
      <div>
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
    </div>
  );
};

export default BorrowerProfile;
