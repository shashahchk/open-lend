import { useState } from 'react';
import { X } from 'lucide-react';

export interface LoanFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  amount: string;
  reason: string;
  duration: string;
  employment: string;
  income: string;
  expenses: string;
  assets: string;
  debts: string;
  businessPlan: string;
}

interface BorrowerFormProps {
  onSubmit: (formData: LoanFormData) => void;
  onCancel: () => void;
}

const BorrowerForm = ({ onSubmit, onCancel }: BorrowerFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LoanFormData>({
    name: '', email: '', phone: '', location: '',
    amount: '', reason: '', duration: '12', employment: '',
    income: '', expenses: '', assets: '', debts: '', businessPlan: ''
  });
  
  const updateFormData = (field: keyof LoanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-3xl w-full border border-white/10 shadow-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-clash">Loan Application</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-violet-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 font-inter">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white font-clash">Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Employment Status *</label>
                <select
                  value={formData.employment}
                  onChange={(e) => updateFormData('employment', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                  required
                >
                  <option value="">Select employment status</option>
                  <option value="full-time">Full-time Employee</option>
                  <option value="part-time">Part-time Employee</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="student">Student</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white font-clash">Financial Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Income ($) *</label>
                  <input
                    type="number"
                    value={formData.income}
                    onChange={(e) => updateFormData('income', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="3000"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Expenses ($) *</label>
                  <input
                    type="number"
                    value={formData.expenses}
                    onChange={(e) => updateFormData('expenses', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="2000"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Total Assets ($)</label>
                  <input
                    type="number"
                    value={formData.assets}
                    onChange={(e) => updateFormData('assets', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="10000"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Existing Debts ($)</label>
                  <input
                    type="number"
                    value={formData.debts}
                    onChange={(e) => updateFormData('debts', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="5000"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white font-clash">Loan Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Loan Amount ($) *</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => updateFormData('amount', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    placeholder="5000"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Duration (months) *</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => updateFormData('duration', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors"
                    required
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Reason for Loan *</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => updateFormData('reason', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors h-24 resize-none"
                  placeholder="Describe how you plan to use this loan..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Plan / Additional Details</label>
                <textarea
                  value={formData.businessPlan}
                  onChange={(e) => updateFormData('businessPlan', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400 transition-colors h-32 resize-none"
                  placeholder="Provide details about your business plan, repayment strategy, or any other relevant information..."
                />
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 px-6 py-3 rounded-lg bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/30"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-medium transition-all duration-300 shadow-lg shadow-emerald-500/30"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowerForm;
