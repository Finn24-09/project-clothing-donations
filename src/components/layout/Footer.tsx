import { Link } from "react-router-dom";

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
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
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
              {[
                { to: "/", label: "Startseite" },
                { to: "/donate", label: "Kleidung spenden" },
                { to: "/about", label: "Über uns" },
                { to: "/locations", label: "Standorte" },
              ].map((link) => (
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
