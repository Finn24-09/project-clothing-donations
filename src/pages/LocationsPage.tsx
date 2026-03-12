import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const LOCATIONS = [
  {
    name: 'ClothCare Berlin-Mitte',
    address: 'Unter den Linden 42',
    zip: '10117 Berlin',
    phone: '+49 30 1234 5600',
    hours: [
      { days: 'Mo – Fr', time: '09:00 – 17:00 Uhr' },
      { days: 'Sa', time: '10:00 – 14:00 Uhr' },
      { days: 'So', time: 'Geschlossen' },
    ],
    district: 'Mitte',
    color: 'sky',
  },
  {
    name: 'ClothCare Berlin-Prenzlauer Berg',
    address: 'Schönhauser Allee 118',
    zip: '10437 Berlin',
    phone: '+49 30 1234 5610',
    hours: [
      { days: 'Mo – Fr', time: '09:00 – 17:00 Uhr' },
      { days: 'Sa', time: '10:00 – 14:00 Uhr' },
      { days: 'So', time: 'Geschlossen' },
    ],
    district: 'Prenzlauer Berg',
    color: 'indigo',
  },
  {
    name: 'ClothCare Berlin-Kreuzberg',
    address: 'Bergmannstraße 67',
    zip: '10961 Berlin',
    phone: '+49 30 1234 5620',
    hours: [
      { days: 'Mo – Fr', time: '09:00 – 17:00 Uhr' },
      { days: 'Sa', time: '10:00 – 14:00 Uhr' },
      { days: 'So', time: 'Geschlossen' },
    ],
    district: 'Kreuzberg',
    color: 'amber',
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string }> = {
  sky:    { badge: 'bg-sky-500/20 text-sky-300',    icon: 'bg-sky-500',    border: 'border-sky-500/30' },
  indigo: { badge: 'bg-indigo-500/20 text-indigo-300', icon: 'bg-indigo-500', border: 'border-indigo-500/30' },
  amber:  { badge: 'bg-amber-500/20 text-amber-300',  icon: 'bg-amber-500',  border: 'border-amber-500/30' },
};

export default function LocationsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob w-80 h-80 bg-sky-500 -top-20 -right-20" />
      <div className="blob w-72 h-72 bg-indigo-500 bottom-1/4 -left-20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Standorte
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Unsere Filialen</h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Geben Sie Ihre Kleiderspende direkt in einer unserer drei Berliner Filialen ab —
            schnell, unkompliziert und persönlich.
          </p>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {LOCATIONS.map((loc) => {
            const c = colorMap[loc.color];
            return (
              <GlassCard key={loc.name} className="flex flex-col">
                {/* District badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.badge}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {loc.district}
                  </span>
                  <div className={`w-9 h-9 rounded-xl ${c.icon} flex items-center justify-center shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-white font-bold text-lg mb-1">{loc.name}</h2>
                <p className="text-white/60 text-sm mb-1">{loc.address}</p>
                <p className="text-white/60 text-sm mb-4">{loc.zip}</p>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {loc.phone}
                </div>

                {/* Opening hours */}
                <div className={`p-3 rounded-xl border ${c.border} bg-white/5 mt-auto`}>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Öffnungszeiten</p>
                  {loc.hours.map((h) => (
                    <div key={h.days} className="flex justify-between text-sm py-0.5">
                      <span className="text-white/50">{h.days}</span>
                      <span className={h.time === 'Geschlossen' ? 'text-white/30' : 'text-white/80 font-medium'}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Info box */}
        <GlassCard className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Lieber abholen lassen?</h3>
              <p className="text-white/60 text-sm">
                Wenn ein persönlicher Besuch nicht möglich ist, bieten wir auch eine kostenlose Abholung
                an Ihrer Wohnadresse an. Wählen Sie diese Option einfach im Spendenformular.
              </p>
            </div>
            <Button as="link" to="/donate" variant="secondary" size="sm" className="shrink-0">
              Abholung wählen
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
