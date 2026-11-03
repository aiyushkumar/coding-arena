import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = ({ targetDate, onExpire, label = 'Time Remaining' }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      total: diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.total <= 0) {
        clearInterval(timer);
        if (onExpire) onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num) => String(num).padStart(2, '0');

  if (timeLeft.total <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <Clock className="w-3.5 h-3.5" /> Contest Ended
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono">
      {label && <span className="text-xs text-slate-400 mr-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" />{label}:</span>}
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs font-bold border border-slate-700">{pad(timeLeft.days)}d</span>
            <span className="text-slate-500">:</span>
          </>
        )}
        <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs font-bold border border-slate-700">{pad(timeLeft.hours)}h</span>
        <span className="text-slate-500">:</span>
        <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs font-bold border border-slate-700">{pad(timeLeft.minutes)}m</span>
        <span className="text-slate-500">:</span>
        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/40 animate-pulse">{pad(timeLeft.seconds)}s</span>
      </div>
    </div>
  );
};
