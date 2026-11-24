import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Search, RefreshCw, AlertCircle, MessageSquare, CheckCircle2 } from 'lucide-react';

const API_BASE = "https://us-central1-bimeasy-website.cloudfunctions.net";

interface SupportRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  explanation: string;
  status: string;
  createdAt: { _seconds: number, _nanoseconds: number } | string | null;
}

export default function AdminSupportRequests() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [newRequests, setNewRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/adminGetSupportRequests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setRequests(json.requests || []);
        setTotalRequests(json.requests?.length || 0);
        setNewRequests(json.requests?.filter((r: any) => r.status === 'New').length || 0);
      }
    } catch (err) {
      console.error('Failed to fetch support requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    if (!search) return requests;
    const s = search.toLowerCase();
    return requests.filter(r =>
      r.email.toLowerCase().includes(s) ||
      r.name.toLowerCase().includes(s) ||
      (r.phone && r.phone.includes(s)) ||
      (r.category && r.category.toLowerCase().includes(s))
    );
  }, [requests, search]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const formatDate = (ts: any) => {
    if (!ts) return '—';
    // Handle Firestore timestamp or ISO string
    const d = ts._seconds ? new Date(ts._seconds * 1000) : new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

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

  return (
    <div>
      {/* Hero Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <h3 className="text-white/80 text-sm font-bold tracking-widest uppercase mb-1">Total Requests</h3>
            <div className="text-white text-5xl font-black tracking-tight">{loading ? '...' : totalRequests}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
              <AlertCircle className="text-amber-500 w-6 h-6" />
            </div>
            <h3 className="text-slate-500 text-sm font-bold tracking-widest uppercase mb-1">New Unread</h3>
            <div className="text-slate-800 text-5xl font-black tracking-tight">{loading ? '...' : newRequests}</div>
          </div>
        </motion.div>
      </div>

      {/* Main Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 hover:text-primary transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100 font-semibold">
                <th className="px-6 py-4 font-bold">User / Category</th>
                <th className="px-6 py-4 font-bold">Contact Info</th>
                <th className="px-6 py-4 font-bold w-1/3">Message Snippet</th>
                <th className="px-6 py-4 font-bold">Date Submitted</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <RefreshCw className="w-6 h-6 text-slate-300 animate-spin mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">Loading support requests...</p>
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5 text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium">No requests found matching your search.</p>
                  </td>
                </tr>
              ) : (
                paged.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${getInitialColor(req.name)}`}>
                          {getInitials(req.name)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{req.name}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{req.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {req.email}
                        </div>
                        {req.phone && (
                          <div className="text-xs text-slate-500">{req.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-normal min-w-[250px]">
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed" title={req.explanation}>
                        {req.explanation}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{formatDate(req.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {req.status === 'New' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                          <AlertCircle className="w-3.5 h-3.5" />
                          New
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Reviewed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!loading && filtered.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{(page - 1) * perPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(page * perPage, filtered.length)}</span> of <span className="font-bold text-slate-900">{filtered.length}</span> results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
