import type { LucideIcon } from 'lucide-react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  delay: number;
}

const StatsCard = ({ icon: Icon, label, value, change, delay }: StatsCardProps) => (
  <div 
    className="group glass-morphism rounded-3xl p-6 sm:p-8 border border-silver-edge/20 hover:border-neo-mint/30 transition-all duration-700 neo-shadow hover:neo-shadow-lg relative overflow-hidden"
    style={{animation: 'slideUp 0.8s ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both'}}
  >
    {/* Animated background pattern */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neo-mint/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
    </div>
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="p-4 bg-neo-gradient rounded-2xl group-hover:animate-float">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-carbon-black" />
        </div>
        {change && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-growth-green/20 border border-growth-green/30">
            <TrendingUp className="w-4 h-4 text-growth-green" />
            <span className="text-growth-green text-sm font-mono font-semibold">
              {change}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-silver-edge text-sm font-mono uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-neo-mint font-bricolage group-hover:text-ghost-white transition-colors duration-500">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default StatsCard;
