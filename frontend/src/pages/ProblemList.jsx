import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemAPI } from '../services/api';
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  ArrowRight,
  Loader2,
  Sparkles
} from 'lucide-react';

export const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const topics = [
    'All Topics',
    'Arrays',
    'Strings',
    'Dynamic Programming',
    'Graphs',
    'Trees',
    'Searching & Sorting',
    'Math & Logic',
    'Greedy'
  ];

  const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const params = { limit: 100 };
      if (search) params.search = search;
      if (selectedTopic && selectedTopic !== 'All Topics') params.topic = selectedTopic;
      if (selectedDifficulty && selectedDifficulty !== 'All Difficulties')
        params.difficulty = selectedDifficulty;

      const res = await problemAPI.getProblems(params);
      if (res.success) {
        setProblems(res.problems || []);
      }
    } catch (err) {
      console.error('Failed to fetch problems:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProblems();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, selectedTopic, selectedDifficulty]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
              <Code2 className="w-6 h-6 text-blue-400" />
              Problem Catalog & Training Arena
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono font-semibold">
              {problems.length} Challenges
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse algorithmic challenges curated across dynamic programming, graph theory, and advanced data structures.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem title or topic..."
            className="w-full bg-[#111726] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#111726]/60 border border-slate-800 p-3 rounded-2xl">
        
        {/* Topic chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
          {topics.map((t) => {
            const isSelected =
              selectedTopic === t || (t === 'All Topics' && !selectedTopic);
            return (
              <button
                key={t}
                onClick={() => setSelectedTopic(t === 'All Topics' ? '' : t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400'
                    : 'bg-[#0a0d14] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Difficulty Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value === 'All Difficulties' ? '' : e.target.value)}
            className="bg-[#0a0d14] text-slate-200 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-blue-500"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-[#111726]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-xs font-mono text-slate-400">Loading problem catalog...</p>
          </div>
        ) : problems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0e1424] text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Topics</th>
                  <th className="py-3 px-4 text-center">Points</th>
                  <th className="py-3 px-4 text-center">Acceptance</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                {problems.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3.5 px-4 text-center">
                      {p.isSolved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <Link
                        to={`/arena/${p.slug}`}
                        className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors text-sm"
                      >
                        {p.title}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDifficultyBadge(
                          p.difficulty
                        )}`}
                      >
                        {p.difficulty}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.topicTags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-emerald-400">
                      {p.points || 100}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                      {p.acceptanceRate || 65}%
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/arena/${p.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all"
                      >
                        <span>Code</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-slate-400 text-xs">
            No problems match your current search/filter criteria.
          </div>
        )}
      </div>

    </div>
  );
};
