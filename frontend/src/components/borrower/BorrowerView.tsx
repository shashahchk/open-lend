import { useState } from 'react';
import { ArrowRight, Shield, CheckCircle, Clock } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import BorrowerForm, { type LoanFormData } from './BorrowerForm';
import LoanRequestCard, { type LoanRequest } from './LoanRequestCard';
import BorrowerProfile from './BorrowerProfile';
import ChatWidget from './ChatWidget';
import CredibilityDashboard from './CredibilityDashboard';
import VoiceChat from './VoiceChat';
import PaymentTracker from './PaymentTracker';
import NotificationSystem from './NotificationSystem';
import ActionCenter from './ActionCenter';

const BorrowerView = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCredibilityDashboard, setShowCredibilityDashboard] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showPaymentTracker, setShowPaymentTracker] = useState(false);
  const [showActionCenter, setShowActionCenter] = useState(false);
  const [requests, setRequests] = useState<LoanRequest[]>([
    { 
      id: 1, 
      amount: 5000, 
      duration: 12, 
      reason: 'Small business expansion', 
      status: 'action_required', 
      aiScore: 78, 
      date: '2 days ago',
      strengthFactors: [
        'Excellent payment history on previous loans',
        'Stable employment for 3+ years',
        'Low debt-to-income ratio'
      ],
      riskFactors: [
        'High credit utilization (35%)',
        'Limited business experience'
      ],
      pendingActions: [
        {
          id: 'action_1',
          type: 'document_upload',
          title: 'Business Plan Required',
          description: 'Please upload a detailed business plan showing how you will use the loan funds and your revenue projections.',
          priority: 'high',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          requiredDocuments: ['Business Plan PDF', 'Financial Projections'],
          adminNote: 'Your application shows promise, but we need more details about your business model.',
          completed: false
        },
        {
          id: 'action_2',
          type: 'verification',
          title: 'Income Verification',
          description: 'Please provide recent pay stubs or tax returns to verify your stated income.',
          priority: 'medium',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          requiredDocuments: ['Pay Stubs (Last 3 months)', 'Tax Return (Last year)'],
          completed: false
        }
      ],
      adminFeedback: 'Your application looks strong overall. The AI score of 78 is above average. Once you complete the pending actions, we can move forward with approval.',
      lastUpdated: '1 hour ago'
    },
    { 
      id: 2, 
      amount: 3000, 
      duration: 6, 
      reason: 'Medical emergency', 
      status: 'reviewing', 
      aiScore: 82, 
      date: '5 hours ago',
      strengthFactors: [
        'Higher credibility score than average',
        'Verified income source',
        'Strong community references'
      ],
      riskFactors: [
        'First-time borrower on platform'
      ],
      adminFeedback: 'AI review in progress. Your credibility score is excellent. Expected decision within 24 hours.',
      lastUpdated: '3 hours ago'
    },
    {
      id: 3,
      amount: 8000,
      duration: 24,
      reason: 'Home renovation',
      status: 'action_required',
      aiScore: 65,
      date: '1 week ago',
      strengthFactors: [
        'Property ownership verified',
        'Stable employment history'
      ],
      riskFactors: [
        'High loan amount relative to income',
        'Recent credit inquiries'
      ],
      pendingActions: [
        {
          id: 'action_3',
          type: 'clarification',
          title: 'Renovation Details Needed',
          description: 'Please provide more specific details about the renovation project and contractor quotes.',
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          adminNote: 'We need to understand the scope of work to assess loan viability.',
          completed: false
        },
        {
          id: 'action_4',
          type: 'document_upload',
          title: 'Property Documents',
          description: 'Upload property deed and recent property tax assessment.',
          priority: 'medium',
          requiredDocuments: ['Property Deed', 'Tax Assessment', 'Contractor Quotes'],
          completed: true
        }
      ],
      adminFeedback: 'Your renovation loan application is under review. The AI flagged some concerns about the loan-to-value ratio. Please complete the pending actions for manual review.',
      lastUpdated: '2 days ago'
    }
  ]);
  
  const calculateCredibilityScore = (formData: LoanFormData) => {
    let score = 50; // Base score
    
    // Income to loan ratio
    const income = parseFloat(formData.income);
    const amount = parseFloat(formData.amount);
    const incomeRatio = income > 0 ? amount / (income * 12) : 1;
    
    if (incomeRatio < 0.2) score += 15;
    else if (incomeRatio < 0.4) score += 10;
    else if (incomeRatio < 0.6) score += 5;
    
    // Debt to income ratio
    const expenses = parseFloat(formData.expenses);
    const debtRatio = income > 0 ? expenses / income : 1;
    
    if (debtRatio < 0.3) score += 15;
    else if (debtRatio < 0.5) score += 10;
    else if (debtRatio < 0.7) score += 5;
    
    // Employment stability
    if (formData.employment === 'full-time') score += 10;
    else if (formData.employment === 'self-employed') score += 5;
    
    // Assets
    const assets = parseFloat(formData.assets) || 0;
    if (assets > amount * 2) score += 10;
    else if (assets > amount) score += 5;
    
    // Business plan quality
    if (formData.businessPlan.length > 200) score += 5;
    
    return Math.min(Math.max(score, 30), 95);
  };
  
  const generateStrengthsAndRisks = (formData: LoanFormData, score: number) => {
    const strengths = [];
    const risks = [];
    
    const income = parseFloat(formData.income);
    const expenses = parseFloat(formData.expenses);
    const amount = parseFloat(formData.amount);
    const assets = parseFloat(formData.assets) || 0;
    
    // Analyze strengths
    if (income > expenses * 1.5) strengths.push('Strong positive cash flow');
    if (formData.employment === 'full-time') strengths.push('Stable employment status');
    if (assets > amount) strengths.push('Sufficient asset coverage');
    if (formData.businessPlan.length > 200) strengths.push('Detailed business plan provided');
    
    // Analyze risks
    if (income / expenses < 1.2) risks.push('Tight budget margins');
    if (formData.employment === 'unemployed') risks.push('Unemployment risk');
    if (assets < amount * 0.5) risks.push('Limited asset coverage');
    if (score < 70) risks.push('Below average credibility score');
    
    return { strengthFactors: strengths, riskFactors: risks };
  };
  
  const handleSubmit = (formData: LoanFormData) => {
    const aiScore = calculateCredibilityScore(formData);
    const { strengthFactors, riskFactors } = generateStrengthsAndRisks(formData, aiScore);
    
    const newRequest: LoanRequest = {
      id: requests.length + 1,
      amount: parseInt(formData.amount),
      duration: parseInt(formData.duration),
      reason: formData.reason,
      status: 'reviewing',
      aiScore,
      date: 'Just now',
      strengthFactors,
      riskFactors
    };
    
    setRequests([newRequest, ...requests]);
    setShowForm(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        req.id === newRequest.id 
          ? { 
              ...req, 
              status: aiScore > 80 ? 'approved' : aiScore > 70 ? 'pending' : 'action_required' as const,
              rate: aiScore > 80 ? 3.8 : aiScore > 70 ? 4.5 : undefined,
              monthlyPayment: aiScore > 70 ? Math.round(parseInt(formData.amount) / parseInt(formData.duration) * 1.04) : undefined,
              totalInterest: aiScore > 70 ? Math.round(parseInt(formData.amount) * 0.04 * (parseInt(formData.duration) / 12)) : undefined,
              pendingActions: aiScore <= 70 ? [
                {
                  id: `action_${Date.now()}`,
                  type: 'document_upload',
                  title: 'Additional Documentation Required',
                  description: 'Based on AI analysis, please provide additional documentation to support your application.',
                  priority: 'high',
                  dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                  requiredDocuments: ['Bank Statements (3 months)', 'Employment Letter'],
                  adminNote: 'AI flagged some areas that need manual review.',
                  completed: false
                }
              ] : undefined,
              adminFeedback: aiScore > 80 ? 'Congratulations! Your application has been approved.' :
                            aiScore > 70 ? 'Your application is under final review.' :
                            'Please complete the pending actions for manual review.',
              lastUpdated: 'Just now'
            }
          : req
      ));
    }, 3000);
  };

  const handleActionComplete = (requestId: number, actionId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? {
            ...req,
            pendingActions: req.pendingActions?.map(action => 
              action.id === actionId 
                ? { ...action, completed: true }
                : action
            ),
            lastUpdated: 'Just now'
          }
        : req
    ));
  };

  const handleUploadDocument = (requestId: number, actionId: string, documentType: string) => {
    // Simulate document upload
    console.log(`Uploading ${documentType} for request ${requestId}, action ${actionId}`);
    
    // Mark action as completed after "upload"
    setTimeout(() => {
      handleActionComplete(requestId, actionId);
      
      // Add a success notification or update
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? {
              ...req,
              adminFeedback: `Thank you for uploading ${documentType}. Our team will review it within 24 hours.`,
              lastUpdated: 'Just now'
            }
          : req
      ));
    }, 1000);
  };

  const handleViewDetails = (requestId: number) => {
    console.log(`Viewing details for request ${requestId}`);
    // This could open a detailed view modal
  };
  
  return (
    <div className="relative z-10 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{animation: 'slideUp 0.6s ease-out'}}>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-clash">Your Loan Dashboard</h2>
            <p className="text-slate-400 text-base sm:text-lg font-inter">Manage your applications and track progress</p>
          </div>
          
          {/* Action Buttons with Notifications */}
          <div className="flex items-center gap-3">
            <NotificationSystem />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowProfile(true)}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 text-sm font-inter"
              >
                Profile
              </button>
              <button
                onClick={() => setShowCredibilityDashboard(true)}
                className="px-4 py-2.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 transition-all duration-300 text-sm font-inter"
              >
                Credibility
              </button>
              <button
                onClick={() => setShowPaymentTracker(true)}
                className="px-4 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-all duration-300 text-sm font-inter"
              >
                Payments
              </button>
              <button
                onClick={() => setShowActionCenter(true)}
                className="px-4 py-2.5 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 transition-all duration-300 text-sm font-inter"
              >
                Actions
                {requests.some(req => req.pendingActions?.some(action => !action.completed)) && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {requests.reduce((count, req) => 
                      count + (req.pendingActions?.filter(action => !action.completed).length || 0), 0
                    )}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowVoiceChat(true)}
                className="px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all duration-300 text-sm font-inter"
              >
                Voice Chat
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 text-sm whitespace-nowrap font-inter"
              >
                New Application <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard icon={Shield} label="Credibility Score" value="78/100" delay={100} />
          <StatsCard icon={CheckCircle} label="Active Loans" value="1" delay={200} />
          <StatsCard icon={Clock} label="Pending Reviews" value="1" delay={300} />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-clash" style={{animation: 'slideUp 0.6s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
          Your Applications
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {requests.map((request, idx) => (
            <LoanRequestCard 
              key={request.id} 
              {...request} 
              delay={500 + idx * 100}
              onActionComplete={(actionId) => handleActionComplete(request.id, actionId)}
              onUploadDocument={(actionId, documentType) => handleUploadDocument(request.id, actionId, documentType)}
              onViewDetails={() => handleViewDetails(request.id)}
            />
          ))}
        </div>
        
        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4 font-inter">No loan applications yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30 font-inter"
            >
              Apply for Your First Loan
            </button>
          </div>
        )}
      </div>
      
      {showForm && (
        <BorrowerForm 
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      {showProfile && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowProfile(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowProfile(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="flex items-start justify-center min-h-full p-4">
            <div 
              className="max-w-4xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
            <BorrowerProfile delay={0} />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowProfile(false)}
                className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 font-inter"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {showCredibilityDashboard && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCredibilityDashboard(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowCredibilityDashboard(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="flex items-start justify-center min-h-full p-4">
            <div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 w-full max-w-6xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white font-clash">Credibility System</h2>
                <button
                  onClick={() => setShowCredibilityDashboard(false)}
                  className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 font-inter"
                >
                  Close
                </button>
              </div>
              <div className="p-6">
                <CredibilityDashboard 
                  currentScore={780}
                  paymentStreak={5}
                  totalLoans={2}
                  communityRating={4.7}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentTracker && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPaymentTracker(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowPaymentTracker(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="flex items-start justify-center min-h-full p-4">
            <div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 w-full max-w-4xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white font-clash">Payment Management</h2>
                <button
                  onClick={() => setShowPaymentTracker(false)}
                  className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 font-inter"
                >
                  Close
                </button>
              </div>
              <div className="p-6">
              <PaymentTracker 
                loanId="loan_12345"
                totalAmount={5000}
                monthlyPayment={456}
                dueDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                paymentHistory={[
                  {
                    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    amount: 456,
                    status: 'paid' as const,
                    daysPaid: -2
                  },
                  {
                    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                    amount: 456,
                    status: 'paid' as const,
                    daysPaid: 0
                  },
                  {
                    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                    amount: 456,
                    status: 'paid' as const,
                    daysPaid: -1
                  }
                ]}
                onPayNow={() => {
                  // Handle payment logic here
                  console.log('Payment initiated');
                }}
              />
              </div>
            </div>
          </div>
        </div>
      )}

      {showActionCenter && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowActionCenter(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowActionCenter(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="flex items-start justify-center min-h-full p-4">
            <div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 w-full max-w-6xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white font-clash">Action Center</h2>
                <button
                  onClick={() => setShowActionCenter(false)}
                  className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 font-inter"
                >
                  Close
                </button>
              </div>
              <div className="p-6">
                <ActionCenter 
                  actions={requests.flatMap(req => 
                    (req.pendingActions || []).map(action => ({
                      ...action,
                      loanId: req.id,
                      loanAmount: req.amount,
                      loanPurpose: req.reason
                    }))
                  )}
                  onActionComplete={(loanId, actionId) => handleActionComplete(loanId, actionId)}
                  onUploadDocument={(loanId, actionId, documentType) => handleUploadDocument(loanId, actionId, documentType)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <VoiceChat 
        isOpen={showVoiceChat}
        onClose={() => setShowVoiceChat(false)}
      />

      <ChatWidget 
        onVoiceCall={() => setShowVoiceChat(true)}
        onVideoCall={() => setShowVoiceChat(true)}
      />
    </div>
  );
};

export default BorrowerView;
