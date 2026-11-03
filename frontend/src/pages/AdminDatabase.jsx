import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Database,
  Users,
  Code2,
  Send,
  Swords,
  FileCode,
  Copy,
  Check,
  Search,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Clock,
  Flame,
  Award
} from 'lucide-react';

export const AdminDatabase = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const fetchDatabase = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getDatabaseOverview();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.error('Failed to load database overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  const handleCopyJSON = () => {
    if (!data?.collections) return;
    navigator.clipboard.writeText(JSON.stringify(data.collections, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading database introspection...</p>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-6 text-center bg-[#111726] border border-slate-800 rounded-3xl space-y-3">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-white">Administrator Access Required</h3>
        <p className="text-xs text-slate-400">
          Only users with the <code className="text-rose-400">admin</code> role can view the internal database. Please sign in with <span className="font-semibold text-slate-200">admin@arena.dev</span>.
        </p>
      </div>
    );
  }

  const collections = data?.collections || {};
  const stats = data?.stats || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Database className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">Database Inspector & Admin Hub</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active Storage Engine:{' '}
            <span className="font-semibold text-emerald-400 font-mono">
              {data?.storageEngine}
            </span>
          </p>
        </div>

        <button
          onClick={fetchDatabase}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Database
        </button>
      </div>

      {/* Database Collection Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('users')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600/15 border-blue-500'
              : 'bg-[#111726]/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Users Collection</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{stats.totalUsers || 0}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Profiles & credentials</div>
        </div>

        <div
          onClick={() => setActiveTab('problems')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            activeTab === 'problems'
              ? 'bg-indigo-600/15 border-indigo-500'
              : 'bg-[#111726]/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Problems Collection</span>
            <Code2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{stats.totalProblems || 0}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">With hidden test suites</div>
        </div>

        <div
          onClick={() => setActiveTab('submissions')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            activeTab === 'submissions'
              ? 'bg-emerald-600/15 border-emerald-500'
              : 'bg-[#111726]/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Submissions</span>
            <Send className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{stats.totalSubmissions || 0}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Judged code executions</div>
        </div>

        <div
          onClick={() => setActiveTab('contests')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            activeTab === 'contests'
              ? 'bg-amber-600/15 border-amber-500'
              : 'bg-[#111726]/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Contests</span>
            <Swords className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{stats.totalContests || 0}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Tournaments & scores</div>
        </div>
      </div>

      {/* Main Table / Collection Inspector */}
      <div className="bg-[#111726]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0e1424] border-b border-slate-800">
          
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['users', 'problems', 'submissions', 'contests', 'raw'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white bg-[#0a0d14] border border-slate-800'
                }`}
              >
                {tab === 'raw' ? 'Raw Database JSON' : tab}
              </button>
            ))}
          </div>

          {activeTab !== 'raw' ? (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter records..."
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <button
              onClick={handleCopyJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Database JSON</span>
                </>
              )}
            </button>
          )}

        </div>

        {/* Tab 1: Users Collection */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0a0d14] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4">Solved (E/M/H)</th>
                  <th className="py-3 px-4">Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {(collections.users || [])
                  .filter((u) => (search ? u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) : true))
                  .map((u) => (
                    <tr key={u._id} className="hover:bg-slate-800/30 font-sans">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {u._id?.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={u.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.name}`}
                            alt={u.name}
                            className="w-6 h-6 rounded-full bg-slate-800"
                          />
                          <span className="font-semibold text-slate-200">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{u.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">
                        {u.rating}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-400">
                        {u.points} pts
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {u.profile?.totalSolved || 0} ({u.profile?.easySolved || 0}/{u.profile?.mediumSolved || 0}/{u.profile?.hardSolved || 0})
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.hasCompletedAssessment
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : 'text-amber-400 bg-amber-500/10'
                          }`}
                        >
                          {u.hasCompletedAssessment ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Problems Collection */}
        {activeTab === 'problems' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0a0d14] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Topics</th>
                  <th className="py-3 px-4 text-center">Sample Tests</th>
                  <th className="py-3 px-4 text-center">Hidden Tests</th>
                  <th className="py-3 px-4 text-center">Points</th>
                  <th className="py-3 px-4 text-center">Acceptance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {(collections.problems || [])
                  .filter((p) => (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true))
                  .map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-white">{p.title}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{p.slug}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.difficulty === 'Easy'
                              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                              : p.difficulty === 'Medium'
                              ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                              : 'text-rose-400 bg-rose-500/10 border border-rose-500/30'
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.topicTags?.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-300">
                        {p.sampleTestCases?.length || 0}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-blue-400 font-bold">
                        {p.hiddenTestCases?.length || 0}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-emerald-400 font-bold">
                        {p.points || 100}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">
                        {p.acceptanceRate || 65}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Submissions */}
        {activeTab === 'submissions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0a0d14] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <th className="py-3 px-4">Submission ID</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Verdict</th>
                  <th className="py-3 px-4">Runtime</th>
                  <th className="py-3 px-4">Memory</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {(collections.submissions || []).length > 0 ? (
                  collections.submissions.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {s._id?.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-slate-200">
                        {s.user?.name || s.user || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {s.problem?.title || s.problem || 'N/A'}
                      </td>
                      <td className="py-3 px-4 font-mono text-blue-400 uppercase text-[11px]">
                        {s.language}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Accepted'
                              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                              : 'text-rose-400 bg-rose-500/10 border border-rose-500/30'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {s.executionTime || 0} ms
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {s.memory || 0} KB
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {new Date(s.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-500 text-xs">
                      No submissions recorded yet. Submissions made from the Arena will appear here in real time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Contests */}
        {activeTab === 'contests' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0a0d14] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <th className="py-3 px-4">Contest Title</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Start Time</th>
                  <th className="py-3 px-4">End Time</th>
                  <th className="py-3 px-4 text-center">Registered</th>
                  <th className="py-3 px-4 text-center">Scoreboard Records</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {(collections.contests || []).map((c) => (
                  <tr key={c._id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white">{c.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {c.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(c.startTime).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(c.endTime).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-emerald-400 font-bold">
                      {c.registeredUsers?.length || 0}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-amber-400 font-bold">
                      {c.scoreboard?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Raw JSON */}
        {activeTab === 'raw' && (
          <div className="p-4 bg-[#0a0d14]">
            <pre className="font-mono text-xs text-blue-300 max-h-[500px] overflow-auto p-4 rounded-2xl bg-[#070a10] border border-slate-800/80 selection:bg-blue-600">
              {JSON.stringify(collections, null, 2)}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
