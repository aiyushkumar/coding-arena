import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contestAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CountdownTimer } from '../components/CountdownTimer';
import {
  Swords,
  Users,
  Trophy,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Flame,
  X
} from 'lucide-react';

export const Contests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming', 'past'
  const [registeringId, setRegisteringId] = useState(null);
  const [selectedLeaderboardContest, setSelectedLeaderboardContest] = useState(null);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const res = await contestAPI.getContests();
      if (res.success) {
        setContests(res.contests || []);
      }
    } catch (err) {
      console.error('Failed to fetch contests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (contestId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setRegisteringId(contestId);
    try {
      const res = await contestAPI.register(contestId);
      if (res.success) {
        // Optimistically mark registered
        setContests((prev) =>
          prev.map((c) =>
            c._id === contestId
              ? { ...c, isRegistered: true, registeredCount: (c.registeredCount || 0) + 1 }
              : c
          )
        );
      }
    } catch (err) {
      alert(err.message || 'Registration failed');
    } finally {
      setRegisteringId(null);
    }
  };

  const filteredContests = contests.filter((c) => {
    if (filter === 'active') return c.status === 'active';
    if (filter === 'upcoming') return c.status === 'upcoming';
    if (filter === 'past') return c.status === 'ended';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-indigo-400" />
            Competitive Contest Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test your algorithmic velocity against programmers worldwide in timed rated arenas.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-[#111726] border border-slate-800 p-1 rounded-2xl self-start">
          {['all', 'active', 'upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'past' ? 'Past Contests' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Contests List */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-xs font-mono text-slate-400">Loading scheduled tournaments...</p>
        </div>
      ) : filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => {
            const isActive = contest.status === 'active';
            const isUpcoming = contest.status === 'upcoming';
            const isEnded = contest.status === 'ended';

            return (
              <div
                key={contest._id}
                className={`bg-[#111726]/90 border rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] ${
                  isActive
                    ? 'border-indigo-500/50 shadow-indigo-500/10'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  
                  {/* Status Badge & Countdown */}
                  <div className="flex items-center justify-between mb-4">
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Live Now
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/40">
                        Upcoming
                      </span>
                    )}
                    {isEnded && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        Finished
                      </span>
                    )}

                    {/* Timer widget */}
                    {isActive && (
                      <CountdownTimer targetDate={contest.endTime} label="Ends in" />
                    )}
                    {isUpcoming && (
                      <CountdownTimer targetDate={contest.startTime} label="Starts in" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{contest.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {contest.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 font-mono mb-6">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      {contest.registeredCount || 0} Registered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      {contest.problemCount || 3} Challenges
                    </span>
                  </div>

                  {/* Problem Preview */}
                  {contest.problems?.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Contest Problemset
                      </div>
                      <div className="space-y-1">
                        {contest.problems.map((p, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-[#0a0d14] border border-slate-800/80"
                          >
                            <span className="font-semibold text-slate-300 truncate max-w-[200px]">
                              {p.problem?.title || `Problem ${idx + 1}`}
                            </span>
                            <span className="text-emerald-400 font-mono font-bold">
                              {p.points} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  {contest.scoreboard?.length > 0 && (
                    <button
                      onClick={() => setSelectedLeaderboardContest(contest)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Standings
                    </button>
                  )}

                  {isActive && (
                    <Link
                      to={contest.problems?.[0]?.problem?.slug ? `/arena/${contest.problems[0].problem.slug}` : '/problems'}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs text-center shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-1.5"
                    >
                      <span>Enter Arena</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {isUpcoming && (
                    <button
                      onClick={() => handleRegister(contest._id)}
                      disabled={contest.isRegistered || registeringId === contest._id}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 ${
                        contest.isRegistered
                          ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      {registeringId === contest._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : contest.isRegistered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Registered</span>
                        </>
                      ) : (
                        <span>Register Now</span>
                      )}
                    </button>
                  )}

                  {isEnded && !contest.scoreboard?.length && (
                    <span className="text-xs text-slate-500 italic">Tournament concluded</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 text-xs bg-[#111726] border border-slate-800 rounded-3xl">
          No contests found for the selected filter.
        </div>
      )}

      {/* Leaderboard Standings Modal */}
      {selectedLeaderboardContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111726] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {selectedLeaderboardContest.title} — Standings
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeaderboardContest(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Coder</th>
                    <th className="py-2.5 px-3 text-right">Points</th>
                    <th className="py-2.5 px-3 text-right">Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {selectedLeaderboardContest.scoreboard?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-mono font-bold text-slate-300">
                        {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={row.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${row.username}`}
                            alt={row.username}
                            className="w-6 h-6 rounded-full bg-slate-800"
                          />
                          <span className="font-semibold text-slate-200">{row.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                        {row.score}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">
                        {row.penaltyTime || 0}m
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-800 text-right shrink-0">
              <button
                onClick={() => setSelectedLeaderboardContest(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
