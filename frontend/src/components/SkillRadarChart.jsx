import React from 'react';
import { Target, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SkillRadarChart = ({ topicScores = {}, overallProficiency = 50, strengths = [], weaknesses = [] }) => {
  const topics = [
    'Arrays',
    'Strings',
    'Dynamic Programming',
    'Graphs',
    'Trees',
    'Searching & Sorting',
    'Math & Logic',
    'Greedy'
  ];

  const getScoreColor = (score) => {
    if (score >= 70) return { bar: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    if (score >= 50) return { bar: 'bg-blue-500', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
    if (score >= 35) return { bar: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    return { bar: 'bg-rose-500', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
  };

  return (
    <div className="bg-[#111726]/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-5">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Algorithmic Skill Profile
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated numerical proficiency (0–100) per topic
          </p>
        </div>

        {/* Circular Overall Badge */}
        <div className="flex items-center gap-3 bg-[#0a0d14] px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Overall</div>
            <div className="text-xl font-extrabold text-blue-400">{overallProficiency}%</div>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-blue-500/40 flex items-center justify-center font-bold text-xs text-white">
            Lv.{Math.floor(overallProficiency / 10)}
          </div>
        </div>
      </div>

      {/* Progress Bars for all Topics */}
      <div className="space-y-3.5">
        {topics.map((topic) => {
          const score = topicScores[topic] !== undefined ? topicScores[topic] : 50;
          const styling = getScoreColor(score);
          const isWeakness = weaknesses.includes(topic);
          const isStrength = strengths.includes(topic);

          return (
            <div key={topic} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  {topic}
                  {isWeakness && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <AlertTriangle className="w-2.5 h-2.5" /> Weakness
                    </span>
                  )}
                  {isStrength && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Strong
                    </span>
                  )}
                </span>
                <span className={`font-mono font-bold ${styling.text}`}>
                  {score}/100
                </span>
              </div>
              
              <div className="w-full bg-[#0a0d14] rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${styling.bar}`}
                  style={{ width: `${Math.max(5, score)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths & Weaknesses Summary Badges */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#0a0d14]/70 p-3 rounded-xl border border-emerald-500/20">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
          </div>
          <div className="flex flex-wrap gap-1.5">
            {strengths.length > 0 ? (
              strengths.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-md text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">Complete more problems to establish strengths</span>
            )}
          </div>
        </div>

        <div className="bg-[#0a0d14]/70 p-3 rounded-xl border border-amber-500/20">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Targeted Focus Areas
          </div>
          <div className="flex flex-wrap gap-1.5">
            {weaknesses.length > 0 ? (
              weaknesses.map((w) => (
                <span key={w} className="px-2 py-0.5 rounded-md text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {w}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No critical weak areas identified!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
