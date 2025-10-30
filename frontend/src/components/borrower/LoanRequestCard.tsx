import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

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
  amount, duration, reason, status, aiScore, date, delay,
  pendingActions, onViewDetails
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
  const hasActions = pendingActions && pendingActions.length > 0;
  
  return (
    <div 
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all duration-300 ${onViewDetails ? 'cursor-pointer' : 'cursor-default'} group`}
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
      onClick={onViewDetails ? () => onViewDetails() : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
            ${amount.toLocaleString()}
          </h3>
          <p className="text-slate-400 text-sm">{duration} months • {reason}</p>
          <p className="text-xs text-slate-500 mt-1">{date}</p>
        </div>
        <div className={`px-3 py-1 ${statusInfo.bg} rounded-full ${statusInfo.color} text-xs font-medium border ${statusInfo.border} flex items-center gap-2`}>
          <StatusIcon className="w-3 h-3" />
          <span>{statusInfo.label}</span>
        </div>
      </div>
      
      {/* Simple AI Score Bar */}
      {aiScore && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">AI Score</span>
            <span className="text-sm font-semibold text-violet-400">{aiScore}/100</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{width: `${aiScore}%`}}
            ></div>
          </div>
        </div>
      )}

      {/* Action Required Indicator */}
      {hasActions && (
        <div className="flex items-center gap-2 text-orange-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{pendingActions.length} action{pendingActions.length > 1 ? 's' : ''} required</span>
        </div>
      )}

      {/* Click to view more indicator */}
      {onViewDetails && (
        <div className="text-xs text-slate-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to view details →
        </div>
      )}
    </div>
  );
};

export default LoanRequestCard;
