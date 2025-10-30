import { useState } from 'react';
import { Shield, CheckCircle, Clock, User, Settings, CreditCard, FileText, TrendingUp, MessageSquare, DollarSign, Plus, Menu, BarChart3, AlertCircle, Calendar, User2 } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import BorrowerForm, { type LoanFormData } from './BorrowerForm';
import LoanRequestCard, { type LoanRequest } from './LoanRequestCard';
import BorrowerProfile from './BorrowerProfile';
import ChatWidget from './ChatWidget';
import CredibilityDashboard from './CredibilityDashboard';
import VoiceChat from './VoiceChat';
import PaymentTracker from './PaymentTracker';
import ActionCenter from './ActionCenter';

const BorrowerView = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'application' | 'credibility' | 'payments' | 'actions' | 'profile' | 'loan-details'>('dashboard');
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLoanRequest, setSelectedLoanRequest] = useState<LoanRequest | null>(null);
  const [requests, setRequests] = useState<LoanRequest[]>([
    { 
      id: 1, 
      amount: 5000, 
      duration: 12, 
      reason: 'Local Coffee Shop Equipment & Inventory Purchase', 
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
          title: 'Coffee Shop Business Plan & Equipment List',
          description: 'Please upload a detailed business plan for your coffee shop including equipment specifications, supplier quotes, and projected customer traffic.',
          priority: 'high',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          requiredDocuments: ['Business Plan PDF', 'Equipment Quotes', 'Lease Agreement'],
          adminNote: 'Your coffee shop concept looks promising. We need detailed equipment lists and supplier agreements to assess the loan viability.',
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
      adminFeedback: 'Your coffee shop loan application shows strong potential. The location and business model look promising. Once you submit the detailed equipment plan and supplier agreements, we can move forward with approval.',
      lastUpdated: '1 hour ago'
    },
    { 
      id: 2, 
      amount: 3000, 
      duration: 6, 
      reason: 'Emergency Dental Surgery & Recovery Expenses', 
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
      adminFeedback: 'Your dental surgery loan is being fast-tracked due to medical urgency. Your excellent payment history qualifies you for emergency processing. Expected decision within 24 hours.',
      lastUpdated: '3 hours ago'
    },
    {
      id: 3,
      amount: 8000,
      duration: 24,
      reason: 'Kitchen Remodel: Cabinets, Appliances & Countertops',
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
          title: 'Kitchen Remodel Contractor Bids & Timeline',
          description: 'Please provide detailed contractor quotes for cabinet installation, appliance purchases, and countertop materials with project timeline.',
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          adminNote: 'We need verified contractor quotes and a realistic timeline to ensure the loan amount covers all renovation costs.',
          completed: false
        },
        {
          id: 'action_4',
          type: 'document_upload',
          title: 'Property Ownership & Valuation Documents',
          description: 'Upload property deed, recent home appraisal, and detailed contractor estimates for the kitchen remodel.',
          priority: 'medium',
          requiredDocuments: ['Property Deed', 'Home Appraisal', 'Contractor Estimates', 'Building Permits'],
          completed: true
        }
      ],
      adminFeedback: 'Your kitchen remodel loan is under review. The proposed renovation should increase your home value significantly. We need final contractor quotes to ensure the loan amount aligns with actual costs.',
      lastUpdated: '2 days ago'
    },
    {
      id: 4,
      amount: 12000,
      duration: 18,
      reason: 'Electric Vehicle Purchase & Home Charging Station Setup',
      status: 'approved',
      aiScore: 91,
      rate: 4.2,
      monthlyPayment: 723,
      totalInterest: 1014,
      date: '3 weeks ago',
      strengthFactors: [
        'Excellent credit history',
        'Stable tech sector employment',
        'Environmental loan incentive eligibility',
        'Home ownership verified'
      ],
      riskFactors: [
        'First electric vehicle purchase'
      ],
      adminFeedback: 'Congratulations! Your EV loan has been approved. You qualify for our green energy incentive rate. The charging station installation will also increase your home value.',
      lastUpdated: '1 week ago'
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
    setCurrentPage('dashboard');
    
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
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedLoanRequest(request);
      setCurrentPage('loan-details');
    }
  };
  
  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { id: 'application', label: 'Apply', icon: Plus, color: 'from-violet-500 to-purple-500' },
    { id: 'credibility', label: 'Credibility', icon: TrendingUp, color: 'from-emerald-500 to-green-500' },
    { id: 'payments', label: 'Payments', icon: CreditCard, color: 'from-orange-500 to-red-500' },
    { id: 'actions', label: 'Actions', icon: FileText, color: 'from-amber-500 to-yellow-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'from-pink-500 to-rose-500' },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard icon={Shield} label="Credibility Score" value="78/100" delay={100} />
              <StatsCard icon={CheckCircle} label="Active Loans" value="1" delay={200} />
              <StatsCard icon={Clock} label="Pending Reviews" value="1" delay={300} />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-clash" style={{animation: 'slideUp 0.6s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
                Recent Applications
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {requests.slice(0, 2).map((request, idx) => (
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
                <div className="text-center py-12 bg-linear-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-white/5">
                  <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-violet-400" />
                  </div>
                  <p className="text-slate-300 text-lg mb-6 font-semibold">Start Your Financial Journey</p>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto">Ready to unlock your potential? Apply for your first loan and join our community-driven lending platform.</p>
                  <button
                    onClick={() => setCurrentPage('application')}
                    className="px-8 py-4 rounded-2xl bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-semibold transition-all duration-300 shadow-lg shadow-violet-500/30 text-lg"
                  >
                    Apply for Your First Loan
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'application':
        return (
          <div className="max-w-4xl mx-auto">
            <BorrowerForm 
              onSubmit={handleSubmit} 
              onCancel={() => setCurrentPage('dashboard')} 
            />
          </div>
        );

      case 'credibility':
        return (
          <div className="max-w-6xl mx-auto">
            <CredibilityDashboard 
              currentScore={780}
              paymentStreak={5}
              totalLoans={2}
              communityRating={4.7}
            />
          </div>
        );

      case 'payments':
        return (
          <div className="max-w-4xl mx-auto">
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
                }
              ]}
              onPayNow={() => {
                console.log('Payment initiated');
              }}
            />
          </div>
        );

      case 'actions':
        return (
          <div className="max-w-6xl mx-auto">
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
        );

      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <BorrowerProfile delay={0} />
          </div>
        );

      case 'loan-details':
        return selectedLoanRequest ? (
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-6">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </div>

            {/* Detailed Loan View */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Loan Request Details</h1>
                    <p className="text-slate-400 text-sm">Request ID: #{selectedLoanRequest.id}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedLoanRequest.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    selectedLoanRequest.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                    selectedLoanRequest.status === 'reviewing' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                    selectedLoanRequest.status === 'action_required' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  } flex items-center gap-2`}>
                    {selectedLoanRequest.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                    {selectedLoanRequest.status === 'pending' && <Clock className="w-4 h-4" />}
                    {selectedLoanRequest.status === 'reviewing' && <AlertCircle className="w-4 h-4" />}
                    {selectedLoanRequest.status === 'action_required' && <AlertCircle className="w-4 h-4" />}
                    {selectedLoanRequest.status === 'rejected' && <AlertCircle className="w-4 h-4" />}
                    {selectedLoanRequest.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-400 block mb-1">Loan Amount</label>
                      <div className="text-2xl font-bold text-white">${selectedLoanRequest.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-400 block mb-1">Duration</label>
                      <div className="text-lg text-white">{selectedLoanRequest.duration} months</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-400 block mb-1">Purpose</label>
                      <div className="text-base text-white">{selectedLoanRequest.reason}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-400 block mb-1">Application Date</label>
                      <div className="flex items-center gap-2 text-white text-base">
                        <Calendar className="w-4 h-4" />
                        {selectedLoanRequest.date}
                      </div>
                    </div>
                    {selectedLoanRequest.lastUpdated && (
                      <div>
                        <label className="text-sm font-semibold text-slate-400 block mb-1">Last Updated</label>
                        <div className="text-white text-base">{selectedLoanRequest.lastUpdated}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Score */}
                {selectedLoanRequest.aiScore && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Assessment</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-300">Overall Score</span>
                      <span className="text-xl font-bold text-violet-400">{selectedLoanRequest.aiScore}/100</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{width: `${selectedLoanRequest.aiScore}%`}}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strength Factors */}
                      {selectedLoanRequest.strengthFactors && selectedLoanRequest.strengthFactors.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Strength Factors
                          </h4>
                          <ul className="space-y-2">
                            {selectedLoanRequest.strengthFactors.map((factor, index) => (
                              <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Risk Factors */}
                      {selectedLoanRequest.riskFactors && selectedLoanRequest.riskFactors.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Risk Factors
                          </h4>
                          <ul className="space-y-2">
                            {selectedLoanRequest.riskFactors.map((factor, index) => (
                              <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 shrink-0"></div>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Admin Feedback */}
              {selectedLoanRequest.adminFeedback && (
                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <User2 className="w-5 h-5" />
                    Admin Feedback
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{selectedLoanRequest.adminFeedback}</p>
                </div>
              )}                {/* Pending Actions */}
                {selectedLoanRequest.pendingActions && selectedLoanRequest.pendingActions.length > 0 && (
                  <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/20">
                    <h3 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Actions Required ({selectedLoanRequest.pendingActions.length})
                    </h3>
                    <div className="space-y-4">
                      {selectedLoanRequest.pendingActions.map((action) => (
                        <div key={action.id} className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium text-base">{action.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded text-white font-medium ${
                              action.priority === 'high' ? 'bg-red-500' :
                              action.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}>
                              {action.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm mb-3 leading-relaxed">{action.description}</p>
                          {action.dueDate && (
                            <p className="text-sm text-slate-400 mb-3">
                              <strong>Due:</strong> {action.dueDate.toLocaleDateString()}
                            </p>
                          )}
                          {action.requiredDocuments && action.requiredDocuments.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold text-slate-400 mb-2">Required Documents:</p>
                              <ul className="text-sm text-slate-300 space-y-1">
                                {action.requiredDocuments.map((doc, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                                    {doc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {action.adminNote && (
                            <div className="border-l-4 border-blue-500/50 pl-4 bg-blue-500/5 rounded-r p-3">
                              <p className="text-sm text-blue-300 italic">
                                <strong>Admin Note:</strong> {action.adminNote}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Loan Terms */}
                {(selectedLoanRequest.rate || selectedLoanRequest.monthlyPayment || selectedLoanRequest.totalInterest) && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Loan Terms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {selectedLoanRequest.rate && (
                        <div className="text-center">
                          <label className="text-sm font-semibold text-slate-400 block mb-1">Interest Rate</label>
                          <div className="text-xl font-bold text-white">{selectedLoanRequest.rate}%</div>
                        </div>
                      )}
                      {selectedLoanRequest.monthlyPayment && (
                        <div className="text-center">
                          <label className="text-sm font-semibold text-slate-400 block mb-1">Monthly Payment</label>
                          <div className="text-xl font-bold text-white">${selectedLoanRequest.monthlyPayment}</div>
                        </div>
                      )}
                      {selectedLoanRequest.totalInterest && (
                        <div className="text-center">
                          <label className="text-sm font-semibold text-slate-400 block mb-1">Total Interest</label>
                          <div className="text-xl font-bold text-white">${selectedLoanRequest.totalInterest}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
                  >
                    Back to Dashboard
                  </button>
                  {selectedLoanRequest.status === 'action_required' && (
                    <button 
                      onClick={() => setCurrentPage('actions')}
                      className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl transition-colors font-medium"
                    >
                      Complete Actions
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Sophisticated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-linear-to-r from-violet-500/10 to-purple-500/10 rounded-2xl border border-violet-500/20">
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-black rounded-full"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">John Doe</h3>
              <p className="text-slate-400 text-sm">Credibility: 780</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const hasNotifications = item.id === 'actions' && requests.some(req => req.pendingActions?.some(action => !action.completed));
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as typeof currentPage);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? `bg-linear-to-r ${item.color} text-white shadow-lg` 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {hasNotifications && (
                    <div className="ml-auto w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {requests.reduce((count, req) => 
                        count + (req.pendingActions?.filter(action => !action.completed).length || 0), 0
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Support Section */}
          <div className="mt-8 p-4 bg-linear-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/5">
            <h4 className="text-white font-medium mb-3">Need Help?</h4>
            <div className="space-y-2">
              <button
                onClick={() => setShowVoiceChat(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Support
              </button>
              {/* <NotificationSystem /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {navigationItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
              </h1>
              <p className="text-slate-400 text-sm">Manage your loan journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowVoiceChat(true)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative z-10">
          {renderPageContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
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
