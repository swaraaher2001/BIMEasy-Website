import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, CloudDownload, UserPlus, RefreshCw, FileText, Zap, Download, UserCheck, ShieldCheck } from 'lucide-react';

const API_BASE = "https://us-central1-bimeasy-website.cloudfunctions.net";

interface SummaryData {
  totalDownloads: number;
  totalLicenses: number;
  activeLicenses: number;
  totalSeats: number;
  totalProfiles: number;
  totalTrials: number;
  activeTrials: number;
  expiredTrials: number;
  recentDownloads: any[];
  recentPurchases: any[];
  recentTrials: any[];
}

export default function AdminSummary() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/adminGetSummary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) setData(json);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const formatTimestamp = (ts: any) => {
    if (!ts) return '';
    // Handle Firestore timestamp objects
    const date = ts._seconds ? new Date(ts._seconds * 1000) : new Date(ts);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { 
      icon: Users, 
      label: 'TOTAL ACTIVE USERS', 
      value: data?.activeLicenses || 0,
      badge: `${data?.totalSeats || 0} Seats`,
      badgeColor: 'text-emerald-600 bg-emerald-50',
      iconBg: 'bg-blue-50 text-blue-600'
    },
    { 
      icon: CloudDownload, 
      label: 'DOWNLOADS (TOTAL)', 
      value: data?.totalDownloads || 0,
      badge: 'All Time',
      badgeColor: 'text-blue-600 bg-blue-50',
      iconBg: 'bg-indigo-50 text-indigo-600'
    },
    { 
      icon: UserPlus, 
      label: 'PURCHASED USERS', 
      value: data?.totalProfiles || 0,
      badge: `${data?.totalLicenses || 0} Licenses`,
      badgeColor: 'text-violet-600 bg-violet-50',
      iconBg: 'bg-violet-50 text-violet-600'
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1">BIMEasy Control Panel</h1>
          <p className="text-on-surface-variant text-sm">System overview and performance metrics as of today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileText size={16} />
            Export Report
          </button>
          <button 
            onClick={fetchData}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#003d73] transition-all flex items-center gap-2 active:scale-95"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon size={20} />
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-bold ${stat.badgeColor}`}>
                {stat.badge}
              </span>
            </div>
            <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-[0.12em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-on-surface tracking-tight">{stat.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-on-surface tracking-tight">Recent Downloads</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">Latest</span>
            </div>
          </div>
          
          {data?.recentDownloads && data.recentDownloads.length > 0 ? (
            <div className="space-y-3">
              {data.recentDownloads.map((lead: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {(lead.name || '?')[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{lead.name || 'Unknown'}</p>
                    <p className="text-xs text-on-surface-variant truncate">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.6rem] font-bold text-on-surface-variant/60 uppercase">{lead.role || '—'}</p>
                    <p className="text-[0.6rem] text-on-surface-variant/40">{formatTimestamp(lead.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant/40">
              <Download size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No download data yet</p>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-on-surface tracking-tight">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {(() => {
              // Merge all notifications
              const notifications: { type: string; name: string; time: any; icon: any; color: string }[] = [];
              
              // Add downloads
              data?.recentDownloads?.forEach((lead: any) => {
                notifications.push({
                  type: 'New Download',
                  name: lead.name || lead.email || 'Unknown',
                  time: lead.timestamp,
                  icon: Download,
                  color: 'bg-blue-50 text-blue-600'
                });
              });

              // Add free trials
              data?.recentTrials?.forEach((trial: any) => {
                notifications.push({
                  type: 'Free Trial Started',
                  name: trial.userName || trial.email || 'Unknown',
                  time: trial.trialStart,
                  icon: Zap,
                  color: 'bg-amber-50 text-amber-600'
                });
              });

              // Add purchases
              data?.recentPurchases?.forEach((user: any) => {
                notifications.push({
                  type: 'New Purchase',
                  name: user.fullName || user.email || 'Unknown',
                  time: user.createdAt,
                  icon: UserCheck,
                  color: 'bg-emerald-50 text-emerald-600'
                });
              });

              // Sort by time (newest first) and take top 8
              notifications.sort((a, b) => {
                const timeA = a.time?._seconds ? a.time._seconds * 1000 : (a.time ? new Date(a.time).getTime() : 0);
                const timeB = b.time?._seconds ? b.time._seconds * 1000 : (b.time ? new Date(b.time).getTime() : 0);
                return timeB - timeA;
              });

              const topNotifications = notifications.slice(0, 8);

              if (topNotifications.length === 0) {
                return (
                  <div className="text-center py-8 text-on-surface-variant/40">
                    <ShieldCheck size={28} className="mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-medium">No recent activity</p>
                  </div>
                );
              }

              return topNotifications.map((n, i) => {
                const IconComp = n.icon;
                return (
                  <div key={i} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${n.color}`}>
                      <IconComp size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-tight">{n.type}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{n.name}</p>
                      <p className="text-[0.6rem] text-on-surface-variant/40 mt-1">{formatTimestamp(n.time)}</p>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* Cloud Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-primary rounded-2xl p-8 flex items-center justify-between overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-[0.6rem] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Cloud Optimization</p>
          <h3 className="text-xl font-black text-white mb-1">Auto-sync active for all regions.</h3>
          <p className="text-sm text-white/60 max-w-md">
            BIMEasy infrastructure is running with automated node balancing enabled.
          </p>
        </div>
        <button className="relative z-10 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex-shrink-0">
          Manage Nodes
        </button>
      </motion.div>
    </div>
  );
}
