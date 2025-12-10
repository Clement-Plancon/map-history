import { NavLink, Outlet } from 'react-router-dom';

const navLinkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';

const MainLayout = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkBase} ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pax-gold to-amber-500 shadow-lg" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Alternate history sandbox</p>
            <h1 className="text-xl font-semibold text-white">Pax Sandbox</h1>
          </div>
        </div>
        <nav className="flex gap-2 text-sm">
          <NavLink to="/game" className={navClass}>
            Games
          </NavLink>
          <NavLink to="/presets" className={navClass}>
            Presets
          </NavLink>
          <NavLink to="/flags" className={navClass}>
            Flags
          </NavLink>
          <NavLink to="/community" className={navClass}>
            Community
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 px-6 py-6 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
      <footer className="px-6 py-4 text-xs text-slate-500 text-center border-t border-slate-800 bg-slate-900/70">
        Client-only demo inspired by sandbox storytelling. No servers, no tracking.
      </footer>
    </div>
  );
};

export default MainLayout;
