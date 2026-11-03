import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { aiAPI } from '../services/api';

export const AIHintSidebar = ({
  isOpen,
  onClose,
  problem,
  sourceCode,
  language,
  submissionStatus,
  errorLog
}) => {
  const [loading, setLoading] = useState(false);
  const [hintReport, setHintReport] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [revealedTiers, setRevealedTiers] = useState({ 1: true, 2: false, 3: false });
  const [error, setError] = useState(null);

  const fetchAIHint = async (customPrompt = '') => {
    if (!problem?._id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await aiAPI.getHint({
        problemId: problem._id,
        sourceCode: sourceCode || '',
        language,
        submissionStatus: submissionStatus || 'In Progress',
        errorLog: errorLog || '',
        userQuestion: customPrompt || userQuestion
      });

      if (res.success) {
        setHintReport(res.hintReport);
        // By default reveal tier 1, keep 2 & 3 hidden until user clicks
        setRevealedTiers({ 1: true, 2: false, 3: false });
      }
    } catch (err) {
      setError(err.message || 'Failed to generate AI hints. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomQuestionSubmit = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    fetchAIHint(userQuestion);
  };

  const toggleTier = (tier) => {
    setRevealedTiers((prev) => ({
      ...prev,
      [tier]: !prev[tier]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] z-50 bg-[#0d121f] border-l border-violet-500/30 shadow-2xl flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#111726]/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              AI Algorithmic Coach
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Non-Spoiler
              </span>
            </h3>
            <p className="text-xs text-slate-400">Contextual progressive reasoning guide</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Guardrail Guarantee Banner */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-300">Active Learning Protection:</span> The AI guide provides tiered hints, complexity constraints, and edge-case invariants, but will never spoil the complete working code.
          </div>
        </div>

        {/* Generate / Refresh Button if no report yet */}
        {!hintReport && !loading && (
          <div className="text-center py-8 px-4 border border-dashed border-slate-800 rounded-2xl bg-[#111726]/50">
            <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-3 animate-bounce" />
            <h4 className="text-sm font-bold text-slate-200 mb-1">
              Stuck on "{problem?.title}"?
            </h4>
            <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
              Analyze your current logic, identify failing edge-cases, or get progressive hints without solution code spoilers.
            </p>
            <button
              onClick={() => fetchAIHint()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              Analyze Code & Get Hints
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            <p className="text-xs font-mono text-slate-400">
              Analyzing AST & evaluating algorithmic invariants...
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </div>
        )}

        {/* Hint Report Display */}
        {hintReport && !loading && (
          <div className="space-y-4">
            
            {/* Diagnosis Card */}
            <div className="bg-[#111726] border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
                <Compass className="w-4 h-4 text-violet-400" />
                Diagnostic Evaluation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {hintReport.diagnosis}
              </p>
              {hintReport.personalization && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-violet-300 italic">
                  💡 {hintReport.personalization}
                </div>
              )}
            </div>

            {/* Tiered Progressive Hints */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Progressive Hint Ladder
              </div>

              {hintReport.tieredHints?.map((hint) => {
                const isRevealed = revealedTiers[hint.tier];
                return (
                  <div
                    key={hint.tier}
                    className={`border rounded-xl transition-all ${
                      isRevealed
                        ? 'bg-[#111726] border-slate-700'
                        : 'bg-[#111726]/40 border-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => toggleTier(hint.tier)}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isRevealed
                              ? 'bg-violet-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {hint.tier}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          Tier {hint.tier}: {hint.title}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                        {isRevealed ? 'Hide' : 'Reveal'}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isRevealed ? 'rotate-90' : ''
                          }`}
                        />
                      </span>
                    </button>

                    {isRevealed && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed">
                        {hint.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Complexity Advice */}
            {hintReport.complexityTip && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>⏱️ Complexity Target:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {hintReport.complexityTip}
                </span>
              </div>
            )}

            <button
              onClick={() => fetchAIHint()}
              className="w-full py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-colors"
            >
              Re-analyze with latest code
            </button>
          </div>
        )}

      </div>

      {/* Interactive Question Input at Bottom */}
      <form
        onSubmit={handleCustomQuestionSubmit}
        className="p-3 border-t border-slate-800 bg-[#111726]/90 flex items-center gap-2"
      >
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask AI Guide (e.g. 'Why am I getting TLE?')..."
          className="flex-1 bg-[#0a0d14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !userQuestion.trim()}
          className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:hover:bg-violet-600 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
