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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-400" />
            Donate to {community.name}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
          <h4 className="text-sm font-medium text-blue-400 mb-2">How it works</h4>
          <div className="space-y-1 text-xs text-gray-300">
            <p>• Supports {community.category} projects in {community.location}</p>
            <p>• AI matches your donation to high-impact projects</p>
            <p>• Track progress of people you help</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 pl-8 bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="100"
                min="1"
                required
              />
              <Banknote className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded">
            <input
              type="checkbox"
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="recurring" className="text-sm text-white">
              Monthly recurring donation
            </label>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2 rounded border transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'card' 
                    ? 'border-blue-400 bg-blue-500/20 text-blue-400' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-2 rounded border transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'crypto' 
                    ? 'border-blue-400 bg-blue-500/20 text-blue-400' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Banknote className="w-4 h-4" />
                Crypto
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <h4 className="text-sm font-medium text-white mb-2">Impact Estimate</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Your donation:</span>
                <span className="text-white">${amount || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span>People helped:</span>
                <span className="text-green-400">~{Math.ceil((parseFloat(amount) || 0) / 800)}</span>
              </div>
              <div className="flex justify-between">
                <span>Matching:</span>
                <span className="text-blue-400">24-48 hours</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
