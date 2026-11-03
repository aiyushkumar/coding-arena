import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => {
  const colorMap = {
    blue: {
      bg: 'from-blue-500/10 to-transparent',
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/15 text-blue-400',
      accent: 'text-blue-400'
    },
    emerald: {
      bg: 'from-emerald-500/10 to-transparent',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      accent: 'text-emerald-400'
    },
    violet: {
      bg: 'from-violet-500/10 to-transparent',
      border: 'border-violet-500/20',
      iconBg: 'bg-violet-500/15 text-violet-400',
      accent: 'text-violet-400'
    },
    amber: {
      bg: 'from-amber-500/10 to-transparent',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/15 text-amber-400',
      accent: 'text-amber-400'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${scheme.bg} bg-[#111726]/80 backdrop-blur-sm border ${scheme.border} p-5 rounded-2xl shadow-xl transition-all duration-300 hover:translate-y-[-2px]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${scheme.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
