import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutDashboard, CloudDownload, Users, LogOut, Search, Bell, HelpCircle, Timer, MessageSquare } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin User');
  const [adminRole, setAdminRole] = useState('System Oversight');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/super-admin');
      return;
    }
    setAdminName(localStorage.getItem('adminName') || 'Admin User');
    setAdminRole(localStorage.getItem('adminRole') || 'System Oversight');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    navigate('/super-admin');
  };

  const navItems = [
    { to: '/super-admin/summary', icon: LayoutDashboard, label: 'Summary' },
    { to: '/super-admin/downloads', icon: CloudDownload, label: 'Downloads Data' },
    { to: '/super-admin/free-trials', icon: Timer, label: 'Free Trials' },
    { to: '/super-admin/purchased', icon: Users, label: 'Purchased Users' },
    { to: '/super-admin/support-requests', icon: MessageSquare, label: 'Support Requests' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-slate-200/80 flex flex-col fixed top-0 left-0 h-screen z-40">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="BIMEasy" className="w-5 h-5 object-contain brightness-0 invert" />
            </div>
            <div>
              <div className="text-sm font-black text-primary tracking-tight leading-none">BIMEasy</div>
              <div className="text-[0.55rem] font-bold text-on-surface-variant/50 uppercase tracking-[0.12em] mt-0.5">Precision Admin</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary/8 text-primary border-l-[3px] border-primary ml-0'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black text-on-surface tracking-tight">BIMEasy Control Panel</h2>
            <div className="relative ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Global search..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-slate-400 hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <div className="text-sm font-bold text-on-surface leading-tight">{adminName}</div>
                <div className="text-[0.65rem] text-on-surface-variant">{adminRole}</div>
              </div>
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {adminName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
