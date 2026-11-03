import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recommendationAPI, leaderboardAPI, contestAPI } from '../services/api';
import { StatCard } from '../components/StatCard';
import { SkillRadarChart } from '../components/SkillRadarChart';
import { CountdownTimer } from '../components/CountdownTimer';
import {
  Flame,
  Award,
  CheckCircle2,
  Trophy,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Swords,
  ChevronRight,
  Loader2,
  Code2
} from 'lucide-react';

export const Dashboard = () => {
  const { user, skillProfile } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [skillSummary, setSkillSummary] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [activeContest, setActiveContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [recRes, lbRes, contestRes] = await Promise.allSettled([
        recommendationAPI.getRecommendations(4),
        leaderboardAPI.getGlobalLeaderboard({ limit: 5 }),
        contestAPI.getContests()
      ]);

      if (recRes.status === 'fulfilled' && recRes.value.success) {
        setRecommendations(recRes.value.data.recommendations || []);
        setSkillSummary(recRes.value.data.skillSummary || null);
      }

      if (lbRes.status === 'fulfilled' && lbRes.value.success) {
        setTopUsers(lbRes.value.leaderboard || []);
      }

      if (contestRes.status === 'fulfilled' && contestRes.value.success) {
        const active = contestRes.value.contests.find((c) => c.status === 'active');
        setActiveContest(active || null);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-[#111726] to-violet-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Adaptive Learning Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{user?.name}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Your personalized training queue is optimized targeting your current algorithmic gap:{' '}
            <span className="font-semibold text-slate-200">
              {skillProfile?.recommendedFocus || 'Algorithms & Data Structures'}
            </span>.
          </p>
        </div>

        {/* Action button */}
        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <Link
            to="/problems"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all"
          >
            <Code2 className="w-4 h-4" />
            Browse Problem Catalog
          </Link>

          {!user?.hasCompletedAssessment && (
            <Link
              to="/assessment"
              className="px-5 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              Retake Diagnostic Quiz
            </Link>
          )}
        </div>
      </div>

      {/* Active Contest Alert if running */}
      {activeContest && (
        <div className="bg-gradient-to-r from-indigo-950/50 via-[#111726] to-blue-950/50 border border-indigo-500/40 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 animate-pulse">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Contest
                </span>
                <h4 className="text-sm font-bold text-white">{activeContest.title}</h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{activeContest.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CountdownTimer targetDate={activeContest.endTime} label="Ends In" />
            <Link
              to="/contests"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 whitespace-nowrap"
            >
              Enter Contest
            </Link>
          </div>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Contest Rating"
          value={user?.rating || 1200}
          subtitle="Top 15% percentile"
          icon={Flame}
          color="amber"
        />
        <StatCard
          title="Total Score Points"
          value={`${user?.points || 0} pts`}
          subtitle="Earned from accepted solves"
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Problems Solved"
          value={user?.profile?.totalSolved || 0}
          subtitle={`E: ${user?.profile?.easySolved || 0} | M: ${user?.profile?.mediumSolved || 0} | H: ${user?.profile?.hardSolved || 0}`}
          icon={CheckCircle2}
          color="blue"
        />
        <StatCard
          title="Overall Proficiency"
          value={`${skillProfile?.overallProficiency || 45}%`}
          subtitle={`Focus: ${skillProfile?.weaknesses?.[0] || 'Arrays'}`}
          icon={TrendingUp}
          color="violet"
        />
      </div>

      {/* Main Grid: Personalized Recommendations + Algorithmic Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans): Personalized Weakness-Targeted Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                Targeted Recommendations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                AI selected challenges based on your weakest skill profile areas
              </p>
            </div>

            <Link
              to="/problems"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-2 bg-[#111726] border border-slate-800 rounded-2xl">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <p className="text-xs font-mono text-slate-500">Querying weakness matching models...</p>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.problem._id}
                  className="bg-[#111726]/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDifficultyBadge(
                          rec.problem.difficulty
                        )}`}
                      >
                        {rec.problem.difficulty}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {rec.problem.points || 100} pts
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                      <Link to={`/arena/${rec.problem.slug}`}>{rec.problem.title}</Link>
                    </h3>

                    <div className="flex flex-wrap gap-1.5 my-2.5">
                      {rec.problem.topicTags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0a0d14] border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{rec.reason}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">
                      Acceptance: {rec.problem.acceptanceRate || 65}%
                    </span>
                    <Link
                      to={`/arena/${rec.problem.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300"
                    >
                      Solve Challenge <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#111726] border border-slate-800 rounded-2xl text-slate-400 text-xs space-y-2">
              <p>
                {user?.hasCompletedAssessment
                  ? 'All targeted challenges in your current focus area are up to date! Explore new problems to expand your repertoire.'
                  : 'No personalized recommendations yet. Take the diagnostic assessment to seed your algorithmic profile!'}
              </p>
              <Link
                to={user?.hasCompletedAssessment ? '/problems' : '/assessment'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold hover:bg-blue-600 hover:text-white transition-all text-xs"
              >
                {user?.hasCompletedAssessment ? 'Browse Problem Catalog' : 'Start Diagnostic Assessment'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Right Column (1 span): Skill Radar Profile */}
        <div className="space-y-4">
          <SkillRadarChart
            topicScores={skillProfile?.topicScores || {}}
            overallProficiency={skillProfile?.overallProficiency || 45}
            strengths={skillProfile?.strengths || []}
            weaknesses={skillProfile?.weaknesses || []}
          />
        </div>

      </div>

      {/* Global Leaderboard Snapshot */}
      <div className="bg-[#111726]/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Global Arena Leaderboard (Top Rankers)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live standings based on rating and accepted problem points
            </p>
          </div>

          <Link
            to="/leaderboard"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Full Standings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 uppercase tracking-wider border-b border-slate-800 font-mono">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Coder</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Score Points</th>
                <th className="py-2.5 px-3">Total Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {topUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-300">
                    {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : `#${u.rank}`}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.name}`}
                        alt={u.name}
                        className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700"
                      />
                      <div>
                        <div className="font-semibold text-slate-200">{u.name}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-xs">{u.bio}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-bold font-mono text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      {u.rating}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-emerald-400">
                    {u.points} pts
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono">
                    {u.totalSolved}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
