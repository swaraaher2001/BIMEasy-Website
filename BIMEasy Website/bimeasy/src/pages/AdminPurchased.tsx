import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Users, Search, RefreshCw, ShieldCheck, TrendingUp } from 'lucide-react';

const API_BASE = "https://us-central1-bimeasy-website.cloudfunctions.net";

interface PurchasedUser {
  uid: string;
  email: string;
  maxSeats: number;
  isActive: boolean;
  expiresAt: string | null;
  registeredMachines: string[];
  fullName: string;
  phone: string;
  company: string;
  role: string;
  country: string;
  createdAt: string | null;
}

export default function AdminPurchased() {
  const [users, setUsers] = useState<PurchasedUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/adminGetPurchasedUsers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setUsers(json.users || []);
        setTotal(json.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch purchased users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    if (!search) return users;
    const s = search.toLowerCase();
    return users.filter(u =>
      u.fullName.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.company.toLowerCase().includes(s) ||
      u.phone.includes(s)
    );
  }, [users, search]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const totalSeats = users.reduce((sum, u) => sum + (u.maxSeats || 0), 0);
  const activeCount = users.filter(u => u.isActive).length;
  const usedSeats = users.reduce((sum, u) => sum + (u.registeredMachines?.length || 0), 0);

  // New this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const newThisMonth = users.filter(u => {
    if (!u.createdAt) return false;
    return new Date(u.createdAt) >= startOfMonth;
  }).length;

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getInitialColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-emerald-100 text-emerald-700',
      'bg-violet-100 text-violet-700',
      'bg-amber-100 text-amber-700',
      'bg-rose-100 text-rose-700',
      'bg-cyan-100 text-cyan-700',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const formatDate = (ts: string | null) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      {/* Hero Stats Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-primary rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 right-24 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative z-10">
            <p className="text-[0.6rem] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Total Active Licenses</p>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl font-black text-white tracking-tight">{activeCount.toLocaleString()}</span>
              <span className="text-sm font-bold text-emerald-300 flex items-center gap-1">
                <TrendingUp size={14} />
                Active
              </span>
            </div>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-white/15 rounded-lg text-xs font-bold text-white">
                {Math.round((usedSeats / Math.max(totalSeats, 1)) * 100)}% Capacity
              </span>
              <span className="px-3 py-1 bg-white/15 rounded-lg text-xs font-bold text-white">
                {totalSeats} Total Seats
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-center"
        >
          <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em] mb-1">New This Month</p>
          <p className="text-4xl font-black text-on-surface tracking-tight mb-2">{newThisMonth}</p>
          <p className="text-xs text-on-surface-variant">Enterprise growth trend</p>
        </motion.div>
      </div>

      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-on-surface tracking-tight">Purchased Users Directory</h2>
          <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
            {total.toLocaleString()} USERS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search users or licenses..."
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 w-72"
            />
          </div>
          <button onClick={fetchData} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/60 bg-slate-50/50">
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">User Name</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Email ID</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Phone Number</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Country</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Company Name</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Job Role</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Purchase Date</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Expiry Date</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Seats</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-16 text-on-surface-variant/40">
                        <ShieldCheck size={36} className="mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium">No purchased users found</p>
                      </td>
                    </tr>
                  ) : (
                    paged.map((user, i) => (
                      <motion.tr
                        key={user.uid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${getInitialColor(user.fullName || user.email)}`}>
                              {getInitials(user.fullName || user.email)}
                            </div>
                            <span className="text-sm font-bold text-on-surface">{user.fullName || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{user.phone || '—'}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{user.country || '—'}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{user.company || '—'}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{user.role || '—'}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{formatDate(user.createdAt)}</td>
                        <td className="px-6 py-4 text-sm text-on-surface">{formatDate(user.expiresAt)}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-on-surface">
                            {user.registeredMachines?.length || 0} / {user.maxSeats} Seats
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-bold ${
                            user.isActive 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {user.isActive ? 'ACTIVE' : 'EXPIRED'}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200/60">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length.toLocaleString()} entries
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all"
                  >
                    ‹
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                        page === p ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  {totalPages > 5 && <span className="px-2 py-1.5 text-slate-400">...</span>}
                  {totalPages > 5 && (
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                        page === totalPages ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || totalPages === 0}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
