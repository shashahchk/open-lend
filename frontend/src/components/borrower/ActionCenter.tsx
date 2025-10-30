import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Upload, 
  MessageSquare, 
  FileText, 
  Eye,
  Calendar,
  Filter,
  ArrowRight
} from 'lucide-react';
import type { PendingAction } from './LoanRequestCard';

interface ActionCenterProps {
  actions: Array<PendingAction & { loanId: number; loanAmount: number; loanPurpose: string }>;
  onActionComplete: (loanId: number, actionId: string) => void;
  onUploadDocument: (loanId: number, actionId: string, documentType: string) => void;
}

const ActionCenter = ({ actions, onActionComplete, onUploadDocument }: ActionCenterProps) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'type'>('priority');

  const filteredActions = actions.filter(action => {
    if (filterStatus === 'pending') return !action.completed;
    if (filterStatus === 'completed') return action.completed;
    return true;
  });

  const sortedActions = [...filteredActions].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'dueDate' && a.dueDate && b.dueDate) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  const pendingCount = actions.filter(a => !a.completed).length;
  const overdueCount = actions.filter(a => 
    !a.completed && a.dueDate && a.dueDate < new Date()
  ).length;

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'document_upload': return Upload;
      case 'verification': return Eye;
      case 'clarification': return MessageSquare;
      case 'review': return FileText;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getDaysUntilDue = (dueDate?: Date) => {
    if (!dueDate) return null;
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 font-clash">{pendingCount}</div>
            <div className="text-xs text-slate-400 font-inter">Pending Actions</div>
          </div>
        </div>
        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 font-clash">{overdueCount}</div>
            <div className="text-xs text-slate-400 font-inter">Overdue</div>
          </div>
        </div>
        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400 font-clash">{actions.filter(a => a.completed).length}</div>
            <div className="text-xs text-slate-400 font-inter">Completed</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'completed')}
            className="bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter"
          >
            <option value="all">All Actions</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'priority' | 'dueDate' | 'type')}
            className="bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400 font-inter">{sortedActions.length} actions</span>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {sortedActions.length === 0 ? (
          <div className="text-center py-12 bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-white/10">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 font-clash">All Caught Up!</h3>
            <p className="text-slate-400 font-inter">No pending actions at this time.</p>
          </div>
        ) : (
          sortedActions.map((action) => {
            const ActionIcon = getActionIcon(action.type);
            const daysUntilDue = getDaysUntilDue(action.dueDate);
            const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
            
            return (
              <div 
                key={`${action.loanId}-${action.id}`}
                className={`bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border transition-all hover:border-violet-400/50 ${
                  isOverdue ? 'border-red-500/50 shadow-lg shadow-red-500/10' :
                  action.priority === 'high' ? 'border-orange-500/30' :
                  'border-white/10'
                } ${action.completed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  {/* Action Icon */}
                  <div className={`p-3 rounded-lg ${getPriorityColor(action.priority)}`}>
                    <ActionIcon className="w-5 h-5" />
                  </div>

                  {/* Action Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white font-clash flex items-center gap-2">
                          {action.title}
                          {isOverdue && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        </h4>
                        <p className="text-sm text-slate-400 font-inter">
                          Loan #{action.loanId} - ${action.loanAmount.toLocaleString()} for {action.loanPurpose}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-inter ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                        {action.completed && (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-inter">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 font-inter">{action.description}</p>

                    {action.adminNote && (
                      <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-blue-300 font-inter italic">
                          <strong>Admin Note:</strong> {action.adminNote}
                        </p>
                      </div>
                    )}

                    {/* Required Documents */}
                    {action.requiredDocuments && action.requiredDocuments.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-400 font-inter mb-2">Required Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {action.requiredDocuments.map((doc, idx) => (
                            <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full font-inter">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Due Date */}
                    {action.dueDate && (
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className={`text-sm font-inter ${
                          isOverdue ? 'text-red-400' :
                          daysUntilDue !== null && daysUntilDue <= 2 ? 'text-yellow-400' :
                          'text-slate-400'
                        }`}>
                          Due: {action.dueDate.toLocaleDateString()}
                          {daysUntilDue !== null && (
                            <span className="ml-2">
                              ({isOverdue ? `${Math.abs(daysUntilDue)} days overdue` :
                                daysUntilDue === 0 ? 'Due today' :
                                `${daysUntilDue} days left`})
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {!action.completed && action.type === 'document_upload' && (
                        <button
                          onClick={() => onUploadDocument(action.loanId, action.id, action.requiredDocuments?.[0] || 'document')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold font-inter transition-colors flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Documents
                        </button>
                      )}

                      {!action.completed && action.type === 'clarification' && (
                        <button
                          onClick={() => onActionComplete(action.loanId, action.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold font-inter transition-colors flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Provide Response
                        </button>
                      )}

                      <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg font-semibold font-inter transition-colors flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        View Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActionCenter;
