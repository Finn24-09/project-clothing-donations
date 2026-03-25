import { Link } from "react-router-dom";
import LogoIcon from '../ui/LogoIcon';
import { navLinks } from './navLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto glass-sm border-x-0 border-b-0" style={{ borderRadius: '0.75rem 0.75rem 0 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
                <LogoIcon className="w-4 h-4 text-white" />
              </span>
              <span className="text-white font-bold">
                Cloth<span className="text-sky-400">Care</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Kleidungsspenden für Menschen in Krisengebieten weltweit. Ein
              fiktives Universitätsprojekt.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks
                .map((link) =>
                  link.to === '/donate' ? { ...link, label: 'Kleidung spenden' } : link,
                )
                .map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-white/80 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Impressum" },
                { label: "Datenschutzerklärung" },
                { label: "Nutzungsbedingungen" },
              ].map((item) => (
                <li key={item.label}>
                  <span className="text-white/50 text-sm cursor-default select-none">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">&copy; {year} Finn24-09</p>
          <p className="text-white/30 text-xs">
            Dies ist ein fiktives Universitätsprojekt. Keine echten Spenden
            werden verarbeitet.
          </p>
        </div>
      </div>
    </footer>
  );
}
