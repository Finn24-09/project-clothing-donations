import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Startseite' },
  { to: '/donate', label: 'Spenden' },
  { to: '/about', label: 'Über uns' },
  { to: '/locations', label: 'Standorte' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 glass-sm"
      style={{
        borderRadius: menuOpen ? '0 0 0 0' : '0 0 0.75rem 0.75rem',
        transition: 'border-radius 300ms ease-in-out',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:bg-sky-400 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </span>
          <span className="text-white font-bold text-lg tracking-tight">
            Cloth<span className="text-sky-400">Care</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/donate"
            className="hidden sm:inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/25"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Jetzt spenden
          </Link>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-5">
              {/* Top bar */}
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? 'top-2.25 rotate-45' : 'top-1'
                }`}
              />
              {/* Middle bar */}
              <span
                className={`absolute left-0 top-2.25 h-0.5 w-5 bg-current rounded-full transition-all duration-200 ${
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              {/* Bottom bar */}
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? 'top-2.25 -rotate-45' : 'top-3.5'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu — always rendered, animated via grid-rows trick */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full grid transition-[grid-template-rows] duration-300 ease-in-out z-40 ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        {/* overflow-hidden is required for the grid-rows animation */}
        <div className="overflow-hidden">
          <div className="bg-slate-900/90 border-x border-b border-white/15 rounded-b-xl shadow-xl">
            <ul className="py-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-sky-400 bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="px-4 pt-2 pb-3">
                <Link
                  to="/donate"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 w-full"
                >
                  Jetzt spenden
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
