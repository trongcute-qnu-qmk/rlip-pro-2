import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Target, Settings, LogOut, Search, Briefcase, BookOpen } from 'lucide-react';
import { authService } from '@/services/auth.service';

export const AppShell: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Command Center' },
    { to: '/war-room', icon: Target, label: 'War Room' },
    { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/research', icon: BookOpen, label: 'Research' },
  ];

  return (
    <div className="flex h-screen bg-bg-base text-primary overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-display font-bold text-accent-blue tracking-tight">RLIP <span className="text-primary font-light">PRO</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-accent-blue text-white font-medium' 
                    : 'text-secondary hover:bg-surface-hover hover:text-primary'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-surface-hover hover:text-primary w-full transition-colors mb-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button 
            onClick={() => authService.logout()}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-signal-bear hover:bg-signal-bear-bg w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center bg-bg-base border border-border-light rounded-md px-3 py-1.5 w-64 focus-within:border-accent-blue transition-colors">
            <Search className="w-4 h-4 text-muted mr-2" />
            <input 
              type="text" 
              placeholder="Search ticker (e.g. FPT)..." 
              className="bg-transparent border-none text-sm text-primary placeholder-muted focus:outline-none w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-surface-hover border border-border rounded-full flex items-center justify-center text-sm font-semibold">
              PM
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto bg-bg-base">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
