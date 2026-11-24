import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CloudDownload, Download, RefreshCw, Filter, X, Search } from 'lucide-react';

const API_BASE = "https://us-central1-bimeasy-website.cloudfunctions.net";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  country: string;
  timestamp: string | null;
}

export default function AdminDownloads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 20;

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/adminGetDownloads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setLeads(json.leads || []);
        setTotal(json.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch downloads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Filters
  const filtered = useMemo(() => {
    let result = leads;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(l =>
        l.name.toLowerCase().includes(s) ||
        l.email.toLowerCase().includes(s) ||
        l.phone.includes(s)
      );
    }
    if (roleFilter) result = result.filter(l => l.role === roleFilter);
    if (countryFilter) result = result.filter(l => l.country === countryFilter);
    return result;
  }, [leads, search, roleFilter, countryFilter]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const roles = useMemo(() => [...new Set(leads.map(l => l.role).filter(Boolean))], [leads]);
  const countries = useMemo(() => [...new Set(leads.map(l => l.country).filter(Boolean))], [leads]);

  const clearFilters = () => {
    setSearch('');
    setRoleFilter('');
    setCountryFilter('');
    setPage(1);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Country', 'Date'];
    const rows = filtered.map(l => [
      l.name, l.email, l.phone, l.role, l.country,
      l.timestamp ? new Date(l.timestamp).toLocaleDateString() : ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bimeasy_downloads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (ts: string | null) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (ts: string | null) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' UTC';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('architect')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (r.includes('engineer') || r.includes('mep')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (r.includes('manager') || r.includes('bim')) return 'bg-violet-50 text-violet-700 border-violet-200';
    if (r.includes('student')) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 text-primary mb-1">
          <CloudDownload size={18} />
          <span className="text-xs font-black uppercase tracking-[0.15em]">Download Analytics</span>
        </div>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1">Downloads Data</h1>
          <p className="text-on-surface-variant text-sm">Track and manage BIM asset acquisitions across all regions and professional roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-5 py-2.5 border border-slate-200 rounded-xl bg-white">
            <p className="text-[0.55rem] font-black text-on-surface-variant uppercase tracking-wider">Total Downloads</p>
            <p className="text-xl font-black text-primary">{total.toLocaleString()}</p>
          </div>
          <button onClick={exportCSV} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 bg-white h-[58px]">
            <Download size={16} />
            Export CSV
          </button>
          <button onClick={fetchData} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#003d73] transition-all flex items-center gap-2 active:scale-95 h-[58px]">
            <RefreshCw size={16} />
            Update List
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-[0.55rem] font-black text-on-surface-variant uppercase tracking-wider mb-1.5">Filter by Role</p>
            <select
              value={roleFilter}
              onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[200px]"
            >
              <option value="">All Professional Roles</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <p className="text-[0.55rem] font-black text-on-surface-variant uppercase tracking-wider mb-1.5">Country</p>
            <select
              value={countryFilter}
              onChange={e => { setCountryFilter(e.target.value); setPage(1); }}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[200px]"
            >
              <option value="">Global Presence</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <p className="text-[0.55rem] font-black text-on-surface-variant uppercase tracking-wider mb-1.5">Search</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, email, phone..."
                className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[250px]"
              />
            </div>
          </div>
          {(roleFilter || countryFilter || search) && (
            <div className="self-end">
              <button onClick={clearFilters} className="px-5 py-2.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all flex items-center gap-2">
                <X size={14} />
                Clear All Filters
              </button>
            </div>
          )}
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
                  <tr className="border-b border-slate-200/60">
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Name</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Contact Info</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Phone Number</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Professional Role</th>
                    <th className="text-left px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Region</th>
                    <th className="text-right px-6 py-4 text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em]">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {getInitials(lead.name || '??')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{lead.name || '—'}</p>
                            <p className="text-[0.6rem] text-on-surface-variant/50">ID: #DX-{lead.id.slice(0, 4).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                          <span>✉</span> {lead.email || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface">{lead.phone || '—'}</td>
                      <td className="px-6 py-4">
                        {lead.role ? (
                          <span className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-bold border ${getRoleBadgeColor(lead.role)}`}>
                            {lead.role.toUpperCase()}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-on-surface">
                          <span className="text-on-surface-variant/40">📍</span> {lead.country || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-bold text-on-surface">{formatDate(lead.timestamp)}</p>
                        <p className="text-[0.6rem] text-on-surface-variant/50">{formatTime(lead.timestamp)}</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200/60">
              <p className="text-xs font-bold text-primary">
                Showing {Math.min((page - 1) * perPage + 1, filtered.length)} to {Math.min(page * perPage, filtered.length)} of {filtered.length.toLocaleString()} entries
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
          </>
        )}
      </div>
    </div>
  );
}
