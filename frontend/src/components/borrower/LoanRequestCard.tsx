import { CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export interface LoanRequest {
  id: number;
  amount: number;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'reviewing' | 'rejected';
  aiScore?: number;
  rate?: number;
  date: string;
  monthlyPayment?: number;
  totalInterest?: number;
  riskFactors?: string[];
  strengthFactors?: string[];
}

interface LoanRequestCardProps extends LoanRequest {
  delay: number;
}

const LoanRequestCard = ({ 
  amount, duration, reason, status, aiScore, rate, date, delay,
  monthlyPayment, totalInterest, riskFactors, strengthFactors
}: LoanRequestCardProps) => {
  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Under Review' },
    approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', label: 'Approved' },
    reviewing: { icon: AlertCircle, color: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-500/30', label: 'AI Reviewing' },
    rejected: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Rejected' },
  };
  
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;
  
  return (
    <div 
      className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-violet-400/50 transition-all duration-500"
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-clash">${amount.toLocaleString()}</h3>
          <p className="text-slate-400 text-xs sm:text-sm truncate font-inter">{duration} months · {reason}</p>
        </div>
        <div className={`px-2 sm:px-3 py-1 ${statusInfo.bg} rounded-full ${statusInfo.color} text-xs font-medium border ${statusInfo.border} flex items-center gap-1 ml-2 whitespace-nowrap font-inter`}>
          <StatusIcon className="w-3 h-3" />
          <span className="hidden sm:inline">{statusInfo.label}</span>
        </div>
      </div>
      
      {aiScore && (
        <div className="mb-4 p-3 sm:p-4 bg-slate-700/30 rounded-lg border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-slate-400 font-inter">AI Credibility Score</span>
            <span className="text-base sm:text-lg font-bold text-violet-400 font-clash">{aiScore}/100</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{width: `${aiScore}%`}}
            ></div>
          </div>
          
          {strengthFactors && strengthFactors.length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-emerald-400 font-medium mb-1 font-inter">Strengths:</p>
              <ul className="text-xs text-slate-300 space-y-1 font-inter">
                {strengthFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {riskFactors && riskFactors.length > 0 && (
            <div>
              <p className="text-xs text-yellow-400 font-medium mb-1 font-inter">Areas for improvement:</p>
              <ul className="text-xs text-slate-300 space-y-1 font-inter">
                {riskFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-yellow-400 shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {rate && monthlyPayment && (
        <div className="grid grid-cols-2 gap-4 p-3 bg-slate-700/20 rounded-lg border border-white/5 mb-4">
          <div>
            <p className="text-xs text-slate-400 font-inter">Interest Rate</p>
            <p className="text-sm font-bold text-white font-clash">{rate}% APR</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-inter">Monthly Payment</p>
            <p className="text-sm font-bold text-white font-clash">${monthlyPayment}</p>
          </div>
        </div>
      )}
      
      {totalInterest && (
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 font-inter">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            Total Interest
          </span>
          <span className="text-white font-bold text-sm sm:text-base font-clash">${totalInterest.toLocaleString()}</span>
        </div>
      )}
      
      <p className="text-xs text-slate-500 mt-3 font-inter">Applied {date}</p>
    </div>
  );
};

export default LoanRequestCard;
