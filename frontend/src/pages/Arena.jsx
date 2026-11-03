import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { problemAPI, judgeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CodeEditor } from '../components/CodeEditor';
import { TerminalOutput } from '../components/TerminalOutput';
import { AIHintSidebar } from '../components/AIHintSidebar';
import {
  Code2,
  FileText,
  History,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Cpu,
  Loader2,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const Arena = () => {
  const { slug } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [pastSubmissions, setPastSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editor states
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // AI guide sidebar
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);

  // Left pane tab
  const [activeLeftTab, setActiveLeftTab] = useState('description');

  useEffect(() => {
    loadProblemData();
  }, [slug]);

  const loadProblemData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await problemAPI.getProblemBySlug(slug);
      if (res.success && res.problem) {
        setProblem(res.problem);
        setPastSubmissions(res.pastSubmissions || []);

        // Initialize starter code for default language
        const initialTemplate =
          res.problem.starterTemplates?.[language] ||
          'function solution(input) {\n  return "";\n}';
        setCode(initialTemplate);

        if (res.problem.sampleTestCases?.[0]) {
          setCustomInput(res.problem.sampleTestCases[0].input);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load problem.');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterTemplates?.[newLang]) {
      setCode(problem.starterTemplates[newLang]);
    }
  };

  const handleResetCode = () => {
    if (problem?.starterTemplates?.[language]) {
      setCode(problem.starterTemplates[language]);
    }
  };

  const handleRunCode = async () => {
    if (!problem?._id) return;
    setIsRunning(true);
    try {
      const res = await judgeAPI.runCode({
        problemId: problem._id,
        sourceCode: code,
        language,
        customInput: customInput || undefined
      });
      if (res.success) {
        setExecutionResult(res.result);
      }
    } catch (err) {
      setExecutionResult({
        status: 'Runtime Error',
        statusCode: 'RE',
        passedTestCases: 0,
        totalTestCases: 1,
        executionTime: 0,
        errorLog: err.message,
        testResults: [
          {
            testCaseIndex: 1,
            status: 'Runtime Error',
            error: err.message
          }
        ]
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!problem?._id) return;

    setIsSubmitting(true);
    try {
      const res = await judgeAPI.submitCode({
        problemId: problem._id,
        sourceCode: code,
        language
      });

      if (res.success) {
        const sub = res.submission;
        setExecutionResult(sub);

        // If Accepted, fire celebratory victory confetti!
        if (sub.status === 'Accepted') {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
          await refreshUser();
        }

        // Refresh past submissions
        loadProblemData();
      }
    } catch (err) {
      setExecutionResult({
        status: 'Submission Failed',
        statusCode: 'RE',
        errorLog: err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading IDE Arena workspace...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 text-center bg-[#111726] border border-slate-800 rounded-2xl space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h3 className="text-base font-bold text-white">Problem Not Found</h3>
        <p className="text-xs text-slate-400">{error || 'This challenge does not exist.'}</p>
        <Link
          to="/problems"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          Back to Problem Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-[#0a0d14]">
      
      {/* Mini Breadcrumb Header */}
      <div className="h-11 px-4 bg-[#0d121f] border-b border-slate-800/80 flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Problem Catalog</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-bold text-white">{problem.title}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getDifficultyBadge(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
          {problem.isSolved && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" /> Solved
            </span>
          )}
        </div>

        <button
          onClick={() => setAiSidebarOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold transition-all shadow-sm shadow-violet-500/20 animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Ask AI Guide</span>
        </button>
      </div>

      {/* Split Screen Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 overflow-hidden">
        
        {/* Left Pane: Problem Description, Constraints, Test Cases, Submissions (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col bg-[#111726]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Left Pane Navigation Tabs */}
          <div className="flex items-center gap-1 px-3 py-2 bg-[#0e1424] border-b border-slate-800 text-xs">
            <button
              onClick={() => setActiveLeftTab('description')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeLeftTab === 'description'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveLeftTab('hints')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeLeftTab === 'hints'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hints ({problem.hints?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveLeftTab('submissions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeLeftTab === 'submissions'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Submissions</span>
            </button>
          </div>

          {/* Left Content Viewport */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 text-slate-300 text-xs font-sans leading-relaxed">
            
            {/* Tab: Description */}
            {activeLeftTab === 'description' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-extrabold text-white mb-2">{problem.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {problem.topicTags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                    {problem.description}
                  </div>
                </div>

                {/* Sample Test Cases */}
                {problem.sampleTestCases?.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Examples
                    </h3>
                    {problem.sampleTestCases.map((tc, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0a0d14] p-3.5 rounded-xl border border-slate-800/80 space-y-2 font-mono text-xs"
                      >
                        <div className="text-[11px] font-bold text-slate-400 font-sans">
                          Example {idx + 1}:
                        </div>
                        <div>
                          <span className="text-slate-500">Input: </span>
                          <span className="text-slate-200">{tc.input}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Output: </span>
                          <span className="text-emerald-400">{tc.expectedOutput}</span>
                        </div>
                        {tc.explanation && (
                          <div className="text-slate-400 font-sans text-[11px] pt-1">
                            <span className="text-slate-500 font-mono">Explanation: </span>
                            {tc.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800 font-sans">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Constraints
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-xs">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Hints */}
            {activeLeftTab === 'hints' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 mb-2">
                  Need a nudge? Review progressive editorial hints below:
                </div>
                {problem.hints?.length > 0 ? (
                  problem.hints.map((hint, idx) => (
                    <details
                      key={idx}
                      className="group bg-[#0a0d14] border border-slate-800 rounded-xl p-3 cursor-pointer"
                    >
                      <summary className="font-semibold text-xs text-slate-200 flex items-center justify-between">
                        <span>Hint {idx + 1}</span>
                        <span className="text-[10px] text-blue-400 font-bold group-open:hidden">
                          Click to reveal
                        </span>
                      </summary>
                      <p className="mt-2 text-slate-300 text-xs border-t border-slate-800/80 pt-2 font-sans">
                        {hint}
                      </p>
                    </details>
                  ))
                ) : (
                  <div className="text-slate-500 text-center py-8">
                    No static hints available. Click "Ask AI Guide" for live personalized assistance!
                  </div>
                )}
              </div>
            )}

            {/* Tab: Past Submissions */}
            {activeLeftTab === 'submissions' && (
              <div className="space-y-3">
                {pastSubmissions.length > 0 ? (
                  pastSubmissions.map((sub, idx) => (
                    <div
                      key={sub._id || idx}
                      className="p-3 bg-[#0a0d14] border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div
                          className={`font-bold ${
                            sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {sub.status}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {new Date(sub.createdAt).toLocaleString()} | {sub.language}
                        </div>
                      </div>

                      <div className="text-right font-mono text-slate-400 text-[11px]">
                        <div>{sub.executionTime || 0} ms</div>
                        <div>{sub.memory || 0} KB</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-center py-8">
                    You have not submitted any solutions for this problem yet.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right Pane: Code Editor (Upper) + Terminal Output (Lower) (7 cols) */}
        <div className="lg:col-span-7 h-full flex flex-col gap-2 overflow-hidden">
          
          {/* Code Editor (60% height) */}
          <div className="flex-[3] min-h-[280px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
              onReset={handleResetCode}
            />
          </div>

          {/* Terminal Output & Submission Control (40% height) */}
          <div className="flex-[2] min-h-[240px]">
            <TerminalOutput
              executionResult={executionResult}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              customInput={customInput}
              setCustomInput={setCustomInput}
              onAskAI={() => setAiSidebarOpen(true)}
            />
          </div>

        </div>

      </div>

      {/* AI Hint Sidebar Drawer */}
      <AIHintSidebar
        isOpen={aiSidebarOpen}
        onClose={() => setAiSidebarOpen(false)}
        problem={problem}
        sourceCode={code}
        language={language}
        submissionStatus={executionResult?.status || 'In Progress'}
        errorLog={executionResult?.errorLog || ''}
      />

    </div>
  );
};
