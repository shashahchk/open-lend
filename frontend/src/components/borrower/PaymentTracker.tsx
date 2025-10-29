import { useState, useEffect } from 'react';
import { 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Star,
  Zap,
  Gift,
  Target,
  Flame
} from 'lucide-react';

interface PaymentTrackerProps {
  loanId: string;
  totalAmount: number;
  monthlyPayment: number;
  dueDate: Date;
  paymentHistory: Array<{
    date: Date;
    amount: number;
    status: 'paid' | 'late' | 'pending';
    daysPaid?: number; // negative means early, positive means late
  }>;
  onPayNow: () => void;
}

const PaymentTracker = ({ 
  loanId, 
  totalAmount, 
  monthlyPayment, 
  dueDate, 
  paymentHistory,
  onPayNow 
}: PaymentTrackerProps) => {
  const [daysUntilDue, setDaysUntilDue] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showEarlyPaymentBonus, setShowEarlyPaymentBonus] = useState(false);

  // Calculate days until due
  useEffect(() => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilDue(diffDays);
  }, [dueDate]);

  // Calculate payment streak
  useEffect(() => {
    let currentStreak = 0;
    for (let i = paymentHistory.length - 1; i >= 0; i--) {
      if (paymentHistory[i].status === 'paid' && (paymentHistory[i].daysPaid || 0) <= 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  }, [paymentHistory]);

  const paidOnTime = paymentHistory.filter(p => p.status === 'paid' && (p.daysPaid || 0) <= 0).length;
  const paidEarly = paymentHistory.filter(p => p.status === 'paid' && (p.daysPaid || 0) < 0).length;
  const totalPaid = paymentHistory.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const progressPercentage = (totalPaid / totalAmount) * 100;

  const getStatusColor = () => {
    if (daysUntilDue < 0) return 'text-red-400 bg-red-500/20';
    if (daysUntilDue <= 3) return 'text-yellow-400 bg-yellow-500/20';
    if (daysUntilDue <= 7) return 'text-blue-400 bg-blue-500/20';
    return 'text-emerald-400 bg-emerald-500/20';
  };

  const getStatusText = () => {
    if (daysUntilDue < 0) return `${Math.abs(daysUntilDue)} days overdue`;
    if (daysUntilDue === 0) return 'Due today';
    return `${daysUntilDue} days until due`;
  };

  const getMotivationalMessage = () => {
    if (streak >= 6) return "You're on fire! 🔥 Amazing consistency!";
    if (streak >= 3) return "Great streak! Keep it going! ⭐";
    if (paidEarly > 0) return "Early payments boost your score! 🚀";
    if (daysUntilDue <= 3 && daysUntilDue > 0) return "Payment reminder - don't lose your streak! ⏰";
    return "Stay consistent to build your credibility! 💪";
  };

  const calculateEarlyPaymentBonus = () => {
    if (daysUntilDue > 7) return 25;
    if (daysUntilDue > 3) return 15;
    if (daysUntilDue > 0) return 10;
    return 0;
  };

  const handlePayEarly = () => {
    setShowEarlyPaymentBonus(true);
    setTimeout(() => {
      setShowEarlyPaymentBonus(false);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }, 1000);
    onPayNow();
  };

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white font-clash mb-2">Payment Received!</h2>
            <p className="text-xl text-emerald-400 font-inter">Your credibility score just increased!</p>
          </div>
        </div>
      )}

      {/* Early Payment Bonus */}
      {showEarlyPaymentBonus && (
        <div className="bg-linear-to-r from-emerald-600 to-green-600 p-4 rounded-xl border border-emerald-400/50 shadow-lg">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-300" />
            <div>
              <h3 className="text-white font-bold font-clash">Early Payment Bonus!</h3>
              <p className="text-emerald-100 font-inter text-sm">+{calculateEarlyPaymentBonus()} credibility points</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Payment Card */}
      <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-clash mb-2">Payment Tracker</h3>
            <p className="text-slate-400 font-inter text-sm">Loan #{loanId.slice(0, 8)}...</p>
          </div>
          <div className={`px-3 py-2 rounded-full flex items-center gap-2 ${getStatusColor()}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold font-inter">{getStatusText()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400 font-inter">Loan Progress</span>
            <span className="text-sm text-white font-inter">{progressPercentage.toFixed(1)}% paid</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-linear-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            >
              {progressPercentage > 10 && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1 font-inter">
            <span>${totalPaid.toLocaleString()}</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-emerald-400 font-clash">{streak}</div>
            <div className="text-xs text-slate-400 font-inter flex items-center justify-center gap-1">
              <Flame className="w-3 h-3" />
              Payment Streak
            </div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-clash">{paidOnTime}</div>
            <div className="text-xs text-slate-400 font-inter flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" />
              On Time
            </div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-violet-400 font-clash">{paidEarly}</div>
            <div className="text-xs text-slate-400 font-inter flex items-center justify-center gap-1">
              <Star className="w-3 h-3" />
              Early Pays
            </div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 font-clash">${monthlyPayment}</div>
            <div className="text-xs text-slate-400 font-inter flex items-center justify-center gap-1">
              <DollarSign className="w-3 h-3" />
              Monthly Due
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-linear-to-r from-violet-600/20 to-purple-600/20 p-4 rounded-lg border border-violet-500/30 mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-violet-400" />
            <p className="text-violet-100 font-inter">{getMotivationalMessage()}</p>
          </div>
        </div>

        {/* Payment Actions */}
        <div className="flex gap-3">
          <button
            onClick={handlePayEarly}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold font-inter transition-all flex items-center justify-center gap-2 ${
              daysUntilDue > 0 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            {daysUntilDue > 0 ? 'Pay Early' : daysUntilDue === 0 ? 'Pay Now' : 'Pay Overdue'}
            {daysUntilDue > 0 && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                +{calculateEarlyPaymentBonus()} pts
              </span>
            )}
          </button>
          
          {daysUntilDue > 3 && (
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold font-inter transition-colors">
              Schedule
            </button>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4 font-clash flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          Recent Payments
        </h4>
        
        <div className="space-y-3">
          {paymentHistory.slice(-5).reverse().map((payment, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  payment.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                  payment.status === 'late' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {payment.status === 'paid' ? <CheckCircle className="w-4 h-4" /> :
                   payment.status === 'late' ? <AlertCircle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-white font-semibold font-inter text-sm">
                    ${payment.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 font-inter">
                    {payment.date.toLocaleDateString()}
                    {payment.daysPaid !== undefined && payment.status === 'paid' && (
                      <span className={`ml-2 ${payment.daysPaid < 0 ? 'text-emerald-400' : payment.daysPaid > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                        {payment.daysPaid < 0 ? `${Math.abs(payment.daysPaid)} days early` :
                         payment.daysPaid > 0 ? `${payment.daysPaid} days late` :
                         'on time'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {payment.status === 'paid' && payment.daysPaid !== undefined && payment.daysPaid <= 0 && (
                <div className="flex items-center gap-1">
                  <Gift className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-violet-400 font-inter">
                    +{payment.daysPaid < 0 ? 25 : 15} pts
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {paymentHistory.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-inter">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No payment history yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTracker;
