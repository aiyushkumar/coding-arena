import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';
import {
  Trophy,
  Flame,
  Award,
  Search,
  CheckCircle2,
  Crown,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await leaderboardAPI.getGlobalLeaderboard({ page, limit: 20 });
      if (res.success) {
        setLeaderboard(res.leaderboard || []);
        setTotalUsers(res.totalUsers || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = leaderboard.filter((u) =>
    search ? u.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-amber-400" />
            Global Hall of Fame & Rankings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global student standings based on contest ratings, speed, and accepted problem points.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name..."
            className="w-full bg-[#111726] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Podium for Top 3 Coders */}
      {!loading && topThree.length >= 3 && !search && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Rank 2 (Silver) */}
          <div className="bg-[#111726]/90 border border-slate-700/60 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center order-2 md:order-1 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-slate-700/40 text-slate-300 font-extrabold text-lg flex items-center justify-center mb-3 border border-slate-600">
              🥈 2
            </div>
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-500 mb-3 shadow-md"
            />
            <h3 className="text-base font-bold text-white">{topThree[1].name}</h3>
            <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px] mb-3">{topThree[1].bio}</p>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-amber-400 font-bold">{topThree[1].rating} Elo</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">{topThree[1].points} pts</span>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="bg-gradient-to-b from-amber-950/30 via-[#111726] to-[#111726] border-2 border-amber-500/50 rounded-3xl p-7 shadow-2xl flex flex-col items-center text-center order-1 md:order-2 relative overflow-hidden scale-105">
            <div className="absolute top-2 right-2">
              <Crown className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold text-xl flex items-center justify-center mb-3 border border-amber-500/40">
              🥇 1
            </div>
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-20 h-20 rounded-full bg-slate-800 border-2 border-amber-400 mb-3 shadow-lg shadow-amber-500/20"
            />
            <h3 className="text-lg font-extrabold text-white">{topThree[0].name}</h3>
            <p className="text-xs text-slate-400 line-clamp-1 max-w-[220px] mb-3">{topThree[0].bio}</p>
            <div className="flex items-center gap-3 text-xs font-mono bg-[#0a0d14] px-4 py-1.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {topThree[0].rating} Elo
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">{topThree[0].points} pts</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-[#111726]/90 border border-amber-900/40 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center order-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/30 text-amber-600 font-extrabold text-lg flex items-center justify-center mb-3 border border-amber-800/40">
              🥉 3
            </div>
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-16 h-16 rounded-full bg-slate-800 border-2 border-amber-700 mb-3 shadow-md"
            />
            <h3 className="text-base font-bold text-white">{topThree[2].name}</h3>
            <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px] mb-3">{topThree[2].bio}</p>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-amber-400 font-bold">{topThree[2].rating} Elo</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">{topThree[2].points} pts</span>
            </div>
          </div>

        </div>
      )}

      {/* Main Table */}
      <div className="bg-[#111726]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-xs font-mono text-slate-400">Loading student rankings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0e1424] text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                  <th className="py-3.5 px-4">Student Programmer</th>
                  <th className="py-3.5 px-4">Contest Rating</th>
                  <th className="py-3.5 px-4 text-center">Score Points</th>
                  <th className="py-3.5 px-4 text-center">Solved (E/M/H)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-300">
                      {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : `#${u.rank}`}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-slate-100 text-sm">{u.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 max-w-sm">
                            {u.bio}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-400" />
                        {u.rating}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-400">
                      {u.points} pts
                    </td>

                    <td className="py-4 px-4 text-center font-mono text-slate-300">
                      <span className="text-white font-bold">{u.totalSolved || 0}</span>
                      <span className="text-slate-500 text-[10px] ml-1.5">
                        ({u.easySolved || 0} / {u.mediumSolved || 0} / {u.hardSolved || 0})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Page {page} of {totalPages} ({totalUsers} total coders)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
