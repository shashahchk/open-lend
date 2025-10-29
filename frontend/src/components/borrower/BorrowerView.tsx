import { useState } from 'react';
import { ArrowRight, Shield, CheckCircle, Clock } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import BorrowerForm, { type LoanFormData } from './BorrowerForm';
import LoanRequestCard, { type LoanRequest } from './LoanRequestCard';
import BorrowerProfile from './BorrowerProfile';

const BorrowerView = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [requests, setRequests] = useState<LoanRequest[]>([
    { 
      id: 1, 
      amount: 5000, 
      duration: 12, 
      reason: 'Small business expansion', 
      status: 'approved', 
      aiScore: 78, 
      rate: 4.2, 
      date: '2 days ago',
      monthlyPayment: 456,
      totalInterest: 472,
      strengthFactors: [
        'Excellent payment history on previous loans',
        'Stable employment for 3+ years',
        'Low debt-to-income ratio'
      ],
      riskFactors: [
        'High credit utilization (35%)',
        'Limited business experience'
      ]
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
      ]
    },
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
              status: aiScore > 70 ? 'approved' : 'pending' as const,
              rate: aiScore > 80 ? 3.8 : aiScore > 70 ? 4.5 : undefined,
              monthlyPayment: aiScore > 70 ? Math.round(parseInt(formData.amount) / parseInt(formData.duration) * 1.04) : undefined,
              totalInterest: aiScore > 70 ? Math.round(parseInt(formData.amount) * 0.04 * (parseInt(formData.duration) / 12)) : undefined
            }
          : req
      ));
    }, 3000);
  };
  
  return (
    <div className="relative z-10 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{animation: 'slideUp 0.6s ease-out'}}>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-clash">Your Loan Dashboard</h2>
            <p className="text-slate-400 text-base sm:text-lg font-inter">Manage your applications and track progress</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfile(true)}
              className="px-5 py-2.5 sm:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 text-sm sm:text-base font-inter"
            >
              View Profile
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap font-inter"
            >
              New Application <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
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
            <LoanRequestCard key={request.id} {...request} delay={500 + idx * 100} />
          ))}
        </div>
        
        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4 font-inter">No loan applications yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-lg bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30 font-inter"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
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
      )}
    </div>
  );
};

export default BorrowerView;
