import { CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, FileText, Upload, MessageSquare, Eye, ExternalLink } from 'luc                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loan Details - Simple */}
      {(monthlyPayment || rate) && (
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          {monthlyPayment && (
            <div>
              <p className="text-xs text-slate-400">Monthly Payment</p>
              <p className="text-white font-semibold">${monthlyPayment}</p>
            </div>
          )}
          {rate && (
            <div>
              <p className="text-xs text-slate-400">Interest Rate</p>
              <p className="text-white font-semibold">{rate}%</p>
            </div>
          )}rt interface PendingAction {
  id: string;
  type: 'document_upload' | 'verification' | 'clarification' | 'review';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  requiredDocuments?: string[];
  adminNote?: string;
  completed?: boolean;
}

export interface LoanRequest {
  id: number;
  amount: number;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'reviewing' | 'rejected' | 'action_required';
  aiScore?: number;
  rate?: number;
  date: string;
  monthlyPayment?: number;
  totalInterest?: number;
  riskFactors?: string[];
  strengthFactors?: string[];
  pendingActions?: PendingAction[];
  adminFeedback?: string;
  lastUpdated?: string;
}

interface LoanRequestCardProps extends LoanRequest {
  delay: number;
  onActionComplete?: (actionId: string) => void;
  onUploadDocument?: (actionId: string, documentType: string) => void;
  onViewDetails?: () => void;
}

const LoanRequestCard = ({ 
  amount, duration, reason, status, aiScore, rate, date, delay,
  monthlyPayment, totalInterest, riskFactors, strengthFactors, pendingActions,
  adminFeedback, lastUpdated, onActionComplete, onUploadDocument, onViewDetails
}: LoanRequestCardProps) => {
  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Under Review' },
    approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Approved' },
    reviewing: { icon: AlertCircle, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', label: 'AI Reviewing' },
    rejected: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Rejected' },
    action_required: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Action Required' },
  };
  
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;
  
  return (
    <div 
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">${amount.toLocaleString()}</h3>
          <p className="text-slate-400 text-sm">{duration} months • {reason}</p>
          <p className="text-xs text-slate-500 mt-1">{date}</p>
        </div>
        <div className={`px-3 py-1 ${statusInfo.bg} rounded-full ${statusInfo.color} text-xs font-medium border ${statusInfo.border} flex items-center gap-2`}>
          <StatusIcon className="w-3 h-3" />
          <span>{statusInfo.label}</span>
        </div>
      </div>
      
      {/* AI Score - Simplified */}
      {aiScore && (
        <div className="mb-4 p-4 bg-white/5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-300">AI Score</span>
            <span className="text-lg font-bold text-violet-400">{aiScore}/100</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{width: `${aiScore}%`}}
            ></div>
          </div>
        </div>
      )}

      {/* Simple Status Info */}
      {adminFeedback && (
        <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-sm">{adminFeedback}</p>
          {lastUpdated && (
            <p className="text-xs text-slate-400 mt-2">Updated {lastUpdated}</p>
          )}
        </div>
      )}

      {/* Actions Required - Simplified */}
      {pendingActions && pendingActions.length > 0 && (
        <div className="mb-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <h4 className="text-sm font-semibold text-orange-300">Actions Required</h4>
          </div>
          <div className="space-y-2">
            {pendingActions.slice(0, 2).map((action) => (
              <div key={action.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-white">{action.title}</h5>
                    <p className="text-xs text-slate-400 mt-1">{action.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded text-white ${
                    action.priority === 'high' ? 'bg-red-500' :
                    action.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}>
                    {action.priority}
                  </span>
                </div>
                
                {action.dueDate && (
                  <p className="text-xs text-slate-400 font-inter mb-3">
                    Due: {action.dueDate.toLocaleDateString()}
                  </p>
                )}
                
                <div className="flex gap-2">
                  </div>
                    <ExternalLink className="w-3 h-3" />
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Feedback Section */}
      {adminFeedback && (
        <div className="mb-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-bold text-blue-400 font-clash">Admin Feedback</h4>
          </div>
          <p className="text-sm text-slate-300 font-inter">{adminFeedback}</p>
          {lastUpdated && (
            <p className="text-xs text-slate-400 mt-2 font-inter">Updated: {lastUpdated}</p>
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
