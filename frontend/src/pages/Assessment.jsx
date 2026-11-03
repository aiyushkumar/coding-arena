import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assessmentAPI } from '../services/api';
import { SkillRadarChart } from '../components/SkillRadarChart';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  HelpCircle,
  Award,
  Layers,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const Assessment = () => {
  const { user, refreshUser, updateSkillProfile } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: optionIndex }
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await assessmentAPI.getQuestions();
      if (res.success && res.questions) {
        setQuestions(res.questions);
      }
    } catch (err) {
      setError('Failed to load diagnostic questions. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await assessmentAPI.submitAssessment(answers);
      if (res.success) {
        setResultData(res);
        updateSkillProfile(res.skillProfile);
        await refreshUser();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading diagnostic question suite...</p>
      </div>
    );
  }

  // Result View
  if (resultData) {
    const profile = resultData.skillProfile;
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-500">
        
        {/* Banner */}
        <div className="text-center bg-gradient-to-br from-violet-900/30 via-[#111726] to-blue-900/20 border border-violet-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Diagnostic Completed!</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
            Your algorithmic baseline has been mapped. Our recommendation engine will now serve challenges targeting your growth areas.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Explore Personalized Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setResultData(null);
                setAnswers({});
                setCurrentIndex(0);
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        </div>

        {/* Skill Profile Breakdown */}
        <SkillRadarChart
          topicScores={profile.topicScores}
          overallProficiency={profile.overallProficiency}
          strengths={profile.strengths}
          weaknesses={profile.weaknesses}
        />

        {/* Question Review with Explanations */}
        <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            Detailed Question Analysis
          </h3>

          <div className="space-y-3">
            {resultData.detailedFeedback?.map((fb, idx) => (
              <div
                key={fb.questionId}
                className={`p-4 rounded-xl border ${
                  fb.isCorrect
                    ? 'bg-emerald-950/15 border-emerald-500/20'
                    : 'bg-rose-950/15 border-rose-500/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">
                    Question {idx + 1}: {fb.topic}
                  </span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      fb.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {fb.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" /> Incorrect
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  💡 <span className="font-semibold text-slate-300">Explanation:</span> {fb.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      
      {/* Onboarding Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-extrabold text-white">Algorithmic Skill Diagnostic</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Answer these conceptual and pattern-matching questions to configure your personalized AI learning path.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-mono">
            Answered: <span className="text-blue-400 font-bold">{answeredCount}</span> of {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar & Jump-to Question Pills */}
      <div className="space-y-2">
        <div className="w-full bg-[#111726] rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const hasAnswered = answers[q._id] !== undefined;
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={q._id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400'
                    : hasAnswered
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Current Question Card */}
      {currentQ && (
        <div className="bg-[#111726]/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 backdrop-blur-sm">
          
          {/* Question Metadata */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-600/15 text-blue-400 border border-blue-500/30">
                Topic: {currentQ.topic}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {currentQ.difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-sm font-semibold text-white leading-relaxed font-sans">
            {currentQ.question}
          </div>

          {/* Code Snippet if present */}
          {currentQ.codeSnippet && (
            <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs text-blue-300 overflow-x-auto whitespace-pre">
              {currentQ.codeSnippet}
            </div>
          )}

          {/* Selectable Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options?.map((optionText, optIdx) => {
              const isSelected = answers[currentQ._id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ._id, optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                      : 'bg-[#0a0d14]/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {optionLetters[optIdx]}
                  </span>
                  <span className="text-xs font-medium leading-relaxed mt-0.5">
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || answeredCount === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 disabled:opacity-50 transition-all"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Submit & Calculate Profile</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
