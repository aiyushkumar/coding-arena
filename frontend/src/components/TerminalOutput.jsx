import React, { useState } from 'react';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Loader2
} from 'lucide-react';

export const TerminalOutput = ({
  executionResult,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
  customInput,
  setCustomInput,
  onAskAI
}) => {
  const [activeTab, setActiveTab] = useState('testcases');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  const testResults = executionResult?.testResults || [];
  const currentCase = testResults[selectedCaseIndex] || testResults[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
      case 'AC':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 glow-green">
            <CheckCircle2 className="w-4 h-4" /> Accepted
          </span>
        );
      case 'Wrong Answer':
      case 'WA':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40">
            <XCircle className="w-4 h-4" /> Wrong Answer
          </span>
        );
      case 'Time Limit Exceeded':
      case 'TLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
            <Clock className="w-4 h-4" /> Time Limit Exceeded
          </span>
        );
      case 'Runtime Error':
      case 'RE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/40">
            <AlertTriangle className="w-4 h-4" /> Runtime Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
            {status || 'Ready'}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d121f] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Header & Tab Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111726] border-b border-slate-800 text-xs">
        
        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('testcases')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
              activeTab === 'testcases'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Test Cases</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
              activeTab === 'custom'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Custom Input</span>
          </button>
        </div>

        {/* Action Buttons: Run, Submit & AI Guide */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAskAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 text-xs font-bold transition-all shadow-sm shadow-violet-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Ask AI Guide</span>
          </button>

          <button
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold disabled:opacity-50 transition-colors"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            )}
            <span>Run Code</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold disabled:opacity-50 shadow-md shadow-emerald-600/20 transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Submit Solution</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Viewport */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
        
        {/* Loading state indicator */}
        {(isRunning || isSubmitting) && (
          <div className="h-full flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-slate-400">
              {isSubmitting ? 'Evaluating against full test suite...' : 'Executing code in isolated sandbox...'}
            </p>
          </div>
        )}

        {/* Tab 1: Test Cases & Execution Results */}
        {!isRunning && !isSubmitting && activeTab === 'testcases' && (
          <div>
            {executionResult ? (
              <div className="space-y-4">
                
                {/* Result Summary Bar */}
                <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-[#111726] border border-slate-800">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(executionResult.status)}
                    <span className="text-slate-300 font-semibold font-sans">
                      {executionResult.passedTestCases}/{executionResult.totalTestCases} Testcases Passed
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {executionResult.executionTime} ms
                    </span>
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      {executionResult.memory} KB
                    </span>
                  </div>
                </div>

                {/* Case Selector Pills */}
                {testResults.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {testResults.map((tc, idx) => {
                      const passed = tc.status === 'Accepted';
                      const isSelected = selectedCaseIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedCaseIndex(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-slate-700 text-white border border-slate-600'
                              : 'bg-slate-900/90 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              passed ? 'bg-emerald-400' : 'bg-rose-400'
                            }`}
                          />
                          Case {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Case Breakdown */}
                {currentCase && (
                  <div className="space-y-3 bg-[#111726]/60 p-3.5 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                        Input
                      </div>
                      <div className="bg-[#0a0d14] p-2.5 rounded-lg border border-slate-800 text-slate-200 whitespace-pre-wrap">
                        {currentCase.input}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                        Expected Output
                      </div>
                      <div className="bg-[#0a0d14] p-2.5 rounded-lg border border-slate-800 text-emerald-400 whitespace-pre-wrap">
                        {currentCase.expectedOutput || 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                        Your Output
                      </div>
                      <div
                        className={`bg-[#0a0d14] p-2.5 rounded-lg border text-slate-200 whitespace-pre-wrap ${
                          currentCase.status === 'Accepted'
                            ? 'border-emerald-500/30 text-emerald-300'
                            : 'border-rose-500/30 text-rose-300'
                        }`}
                      >
                        {currentCase.actualOutput || '(Empty or None)'}
                      </div>
                    </div>

                    {currentCase.error && (
                      <div>
                        <div className="text-rose-400 font-semibold mb-1 text-[11px] uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Error Log
                        </div>
                        <div className="bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/30 text-rose-300 whitespace-pre-wrap">
                          {currentCase.error}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2 py-12 text-slate-500 font-sans">
                <Terminal className="w-8 h-8 text-slate-600 mb-1" />
                <p className="text-xs">
                  Run your code to test against sample cases, or click Submit for official ranking evaluation.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Input */}
        {!isRunning && !isSubmitting && activeTab === 'custom' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">
                Provide custom input (JSON formatted arguments or raw lines):
              </label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder='e.g. [[2, 7, 11, 15], 9]'
                className="w-full h-28 bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <div className="text-right">
              <button
                onClick={onRun}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Run with Custom Input
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
