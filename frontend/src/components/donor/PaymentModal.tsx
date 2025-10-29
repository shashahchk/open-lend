import { useState } from 'react';
import { X, CreditCard, Heart, Banknote } from 'lucide-react';
import type { Community } from './CommunityCard';

interface PaymentModalProps {
  community: Community;
  onClose: () => void;
  onPayment: (amount: number, recurring: boolean) => void;
}

const PaymentModal = ({ community, onClose, onPayment }: PaymentModalProps) => {
  const [amount, setAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      onPayment(parseFloat(amount), recurring);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-lg w-full border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white font-clash flex items-center gap-2">
            <Heart className="w-5 h-5 text-violet-400" />
            Support {community.name}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 font-inter">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Contribution Amount (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 pl-8 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                placeholder="100"
                min="1"
                required
              />
              <Banknote className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
            <input
              type="checkbox"
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="w-4 h-4 text-violet-500 bg-slate-600 border-slate-500 rounded focus:ring-violet-500"
            />
            <label htmlFor="recurring" className="text-sm text-white">
              Make this a monthly recurring contribution
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
                  paymentMethod === 'card' 
                    ? 'border-violet-400 bg-violet-500/20 text-violet-400' 
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
                  paymentMethod === 'crypto' 
                    ? 'border-violet-400 bg-violet-500/20 text-violet-400' 
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Banknote className="w-4 h-4" />
                Crypto
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-slate-700/20 rounded-lg border border-white/5">
            <h4 className="text-sm font-medium text-white mb-2">Impact Summary</h4>
            <div className="space-y-1 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Your contribution:</span>
                <span className="text-white">${amount || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected return:</span>
                <span className="text-emerald-400">{community.rate}% APR</span>
              </div>
              <div className="flex justify-between">
                <span>People impacted:</span>
                <span className="text-violet-400">~{Math.ceil((parseFloat(amount) || 0) / 1000)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30"
            >
              Contribute Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
