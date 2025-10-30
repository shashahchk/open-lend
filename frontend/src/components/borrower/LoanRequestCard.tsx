import { CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, FileText, Upload, MessageSquare, Eye, ExternalLink } from 'lucide-react';

export interface PendingAction {
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
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Under Review' },
    approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', label: 'Approved' },
    reviewing: { icon: AlertCircle, color: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-500/30', label: 'AI Reviewing' },
    rejected: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Rejected' },
    action_required: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', label: 'Action Required' },
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

      {/* Pending Actions Section */}
      {pendingActions && pendingActions.length > 0 && (
        <div className="mb-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <h4 className="text-sm font-bold text-orange-400 font-clash">Action Required</h4>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div key={action.id} className={`p-3 rounded-lg border ${
                action.priority === 'high' ? 'bg-red-500/10 border-red-500/30' :
                action.priority === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-blue-500/10 border-blue-500/30'
              } ${action.completed ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white font-clash flex items-center gap-2">
                      {action.type === 'document_upload' && <Upload className="w-4 h-4" />}
                      {action.type === 'verification' && <Eye className="w-4 h-4" />}
                      {action.type === 'clarification' && <MessageSquare className="w-4 h-4" />}
                      {action.type === 'review' && <FileText className="w-4 h-4" />}
                      {action.title}
                    </h5>
                    <p className="text-xs text-slate-300 font-inter">{action.description}</p>
                    {action.adminNote && (
                      <p className="text-xs text-blue-300 mt-1 font-inter italic">
                        Admin Note: {action.adminNote}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-inter ${
                    action.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    action.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {action.priority}
                  </span>
                </div>
                
                {action.requiredDocuments && action.requiredDocuments.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-slate-400 font-inter mb-1">Required Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {action.requiredDocuments.map((doc, idx) => (
                        <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded font-inter">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {action.dueDate && (
                  <p className="text-xs text-slate-400 font-inter mb-3">
                    Due: {action.dueDate.toLocaleDateString()}
                  </p>
                )}
                
                <div className="flex gap-2">
                  {action.type === 'document_upload' && !action.completed && (
                    <button
                      onClick={() => onUploadDocument?.(action.id, action.requiredDocuments?.[0] || 'document')}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors font-inter flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      Upload
                    </button>
                  )}
                  
                  {action.type === 'clarification' && !action.completed && (
                    <button
                      onClick={() => onActionComplete?.(action.id)}
                      className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded transition-colors font-inter flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Respond
                    </button>
                  )}
                  
                  {action.completed && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded font-inter flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  
                  <button
                    onClick={() => onViewDetails?.()}
                    className="text-xs text-blue-400 hover:text-blue-300 px-3 py-1 rounded transition-colors font-inter flex items-center gap-1"
                  >
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
