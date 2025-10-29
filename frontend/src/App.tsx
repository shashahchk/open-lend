import React, { useState } from 'react';
import { ArrowRight, Users, MapPin, TrendingUp, Shield, Heart, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Design System
const theme = {
  colors: {
    midnight: '#0A0E27',
    deepBlue: '#1A1F3A',
    oceanBlue: '#2A3F5F',
    accent: '#00D9FF',
    accentGlow: '#00FFF5',
    warmOrange: '#FF6B35',
    softCream: '#FFF8F0',
    mutedGray: '#A0A8B8',
  }
};

// Components
const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
  </div>
);

interface HeaderProps {
  userType: 'donor' | 'borrower';
  setUserType: (type: 'donor' | 'borrower') => void;
}

const Header: React.FC<HeaderProps> = ({ userType, setUserType }) => (
  <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">OpenLend</h1>
          <p className="text-xs text-cyan-400">Community-Powered Credit</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setUserType(userType === 'donor' ? 'borrower' : 'donor')}
          className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 text-sm font-medium"
        >
          Switch to {userType === 'donor' ? 'Borrower' : 'Donor'}
        </button>
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30 text-sm">
          Sign In
        </button>
      </div>
    </div>
  </header>
);

interface StatsCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
  change?: string;
  delay: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, change, delay }) => (
  <div 
    className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20"
    style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
      {change && (
        <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {change}
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm mb-2">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const CommunityCard = ({ name, location, raised, target, borrowers, rate, delay }) => {
  const progress = (raised / target) * 100;
  
  return (
    <div 
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium border border-cyan-500/30">
          {rate}% APR
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Raised</span>
          <span className="text-white font-semibold">${raised.toLocaleString()} / ${target.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-slate-400 text-sm flex items-center gap-2">
          <Users className="w-4 h-4" />
          {borrowers} active borrowers
        </span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1 transition-colors">
          Support <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DonorView = () => {
  const [selectedCause, setSelectedCause] = useState('all');
  
  const communities = [
    { name: 'Small Business Growth', location: 'Southeast Asia', raised: 45000, target: 100000, borrowers: 24, rate: 4.5 },
    { name: 'Education Support', location: 'East Africa', raised: 28000, target: 50000, borrowers: 18, rate: 3.8 },
    { name: 'Healthcare Access', location: 'Latin America', raised: 62000, target: 80000, borrowers: 31, rate: 4.2 },
    { name: 'Women Entrepreneurs', location: 'South Asia', raised: 38000, target: 75000, borrowers: 22, rate: 4.0 },
  ];
  
  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8" style={{animation: 'slideUp 0.6s ease-out'}}>
          <h2 className="text-4xl font-bold text-white mb-2">Support Communities</h2>
          <p className="text-slate-400 text-lg">Your contributions create opportunities worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard icon={Heart} label="Total Contributed" value="$12,450" change="+15%" delay={100} />
          <StatsCard icon={Users} label="People Helped" value="47" delay={200} />
          <StatsCard icon={TrendingUp} label="Avg. Return" value="4.2%" change="+0.3%" delay={300} />
        </div>
        
        <div className="mb-6 flex gap-3 flex-wrap" style={{animation: 'slideUp 0.6s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
          {['all', 'education', 'business', 'healthcare', 'women'].map(cause => (
            <button
              key={cause}
              onClick={() => setSelectedCause(cause)}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                selectedCause === cause
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cause.charAt(0).toUpperCase() + cause.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map((community, idx) => (
            <CommunityCard key={idx} {...community} delay={500 + idx * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BorrowerForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '',
    amount: '', reason: '', duration: '12', employment: ''
  });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-white mb-6">Loan Application</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="City, Country"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Loan Amount ($)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Duration (months)</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Employment Status</label>
            <input
              type="text"
              value={formData.employment}
              onChange={(e) => setFormData({...formData, employment: e.target.value})}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="e.g., Self-employed, Full-time"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Reason for Loan</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors h-32 resize-none"
              placeholder="Describe how you plan to use this loan..."
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onSubmit(formData)}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30"
          >
            Submit Application
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const LoanRequestCard = ({ request, delay }) => {
  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Under Review' },
    approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', label: 'Approved' },
    reviewing: { icon: AlertCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', label: 'AI Reviewing' },
  };
  
  const status = statusConfig[request.status];
  const StatusIcon = status.icon;
  
  return (
    <div 
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-500"
      style={{animation: 'slideUp 0.6s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">${request.amount.toLocaleString()}</h3>
          <p className="text-slate-400 text-sm">{request.duration} months · {request.reason}</p>
        </div>
        <div className={`px-3 py-1 ${status.bg} rounded-full ${status.color} text-xs font-medium border ${status.border} flex items-center gap-1`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </div>
      </div>
      
      {request.aiScore && (
        <div className="mb-4 p-4 bg-slate-700/30 rounded-lg border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">AI Credibility Score</span>
            <span className="text-lg font-bold text-cyan-400">{request.aiScore}/100</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              style={{width: `${request.aiScore}%`}}
            ></div>
          </div>
        </div>
      )}
      
      {request.rate && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-slate-400 text-sm">Offered Rate</span>
          <span className="text-white font-bold">{request.rate}% APR</span>
        </div>
      )}
      
      <p className="text-xs text-slate-500 mt-3">Applied {request.date}</p>
    </div>
  );
};

const BorrowerView = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, amount: 5000, duration: 12, reason: 'Small business expansion', status: 'approved', aiScore: 78, rate: 4.2, date: '2 days ago' },
    { id: 2, amount: 3000, duration: 6, reason: 'Medical emergency', status: 'reviewing', aiScore: 82, date: '5 hours ago' },
  ]);
  
  const handleSubmit = (formData) => {
    const newRequest = {
      id: requests.length + 1,
      amount: parseInt(formData.amount),
      duration: parseInt(formData.duration),
      reason: formData.reason,
      status: 'reviewing',
      aiScore: Math.floor(Math.random() * 20) + 70,
      date: 'Just now'
    };
    setRequests([newRequest, ...requests]);
    setShowForm(false);
  };
  
  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between" style={{animation: 'slideUp 0.6s ease-out'}}>
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Your Loan Dashboard</h2>
            <p className="text-slate-400 text-lg">Manage your applications and track progress</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            New Application <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard icon={Shield} label="Credibility Score" value="78/100" delay={100} />
          <StatsCard icon={CheckCircle} label="Active Loans" value="1" delay={200} />
          <StatsCard icon={Clock} label="Pending Reviews" value="1" delay={300} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-6" style={{animation: 'slideUp 0.6s ease-out', animationDelay: '400ms', animationFillMode: 'both'}}>
          Your Applications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request, idx) => (
            <LoanRequestCard key={request.id} request={request} delay={500 + idx * 100} />
          ))}
        </div>
      </div>
      
      {showForm && <BorrowerForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}
    </div>
  );
};

// Main App
const App = () => {
  const [userType, setUserType] = useState('donor');
  
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        
        body {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          padding: 0;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Smooth scrolling */
        * {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
      
      <AnimatedBackground />
      <Header userType={userType} setUserType={setUserType} />
      
      {userType === 'donor' ? <DonorView /> : <BorrowerView />}
    </div>
  );
};

export default App;