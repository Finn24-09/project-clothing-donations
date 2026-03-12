import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const TEAM = [
  { name: 'Dr. Mia Hoffmann', role: 'Gründerin & Vorsitzende', initials: 'MH', color: 'bg-sky-500' },
  { name: 'Jonas Weber', role: 'Koordinator Logistik', initials: 'JW', color: 'bg-indigo-500' },
  { name: 'Priya Nair', role: 'Leiterin Kommunikation', initials: 'PN', color: 'bg-amber-500' },
  { name: 'Tobias Richter', role: 'IT & Webentwicklung', initials: 'TR', color: 'bg-emerald-500' },
];

const STATS = [
  { value: '12.400+', label: 'Gespendete Kleidungsstücke', color: 'text-sky-400' },
  { value: '8', label: 'Unterstützte Krisengebiete', color: 'text-amber-400' },
  { value: '45', label: 'Ehrenamtliche Helfer', color: 'text-emerald-400' },
  { value: '2019', label: 'Gründungsjahr', color: 'text-indigo-400' },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob w-96 h-96 bg-indigo-500 -top-32 -left-20" />
      <div className="blob w-72 h-72 bg-amber-400 bottom-1/3 -right-20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            Über uns
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">ClothCare e.V.</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Seit 2019 verbinden wir Menschen, die helfen möchten, mit Menschen, die Hilfe benötigen —
            durch gebrauchte Kleidung, die ein neues Leben bekommt.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-4">Unsere Mission</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                ClothCare e.V. wurde mit einer einfachen Überzeugung gegründet: Jeder Mensch verdient
                würdevolle Kleidung — unabhängig von geografischer Lage oder persönlichem Schicksal.
              </p>
              <p>
                Wir sammeln gut erhaltene Kleidungsstücke von Privatpersonen und Unternehmen in Berlin und
                koordinieren den Transport direkt in die Krisengebiete. Dabei arbeiten wir eng mit lokalen
                Partnerorganisationen zusammen, um sicherzustellen, dass die Spenden schnell und zielgerichtet
                dort ankommen, wo sie am dringendsten benötigt werden.
              </p>
              <p>
                Transparenz und Effizienz stehen bei uns an erster Stelle: Sie können jederzeit nachverfolgen,
                welchem Krisengebiet Ihre Spende zugewiesen wurde.
              </p>
            </div>
          </GlassCard>

          <div className="space-y-4">
            {[
              { icon: '🌍', title: 'Globale Reichweite', desc: 'Wir unterstützen aktiv 8 Krisengebiete auf drei Kontinenten.' },
              { icon: '♻️', title: 'Nachhaltigkeit', desc: 'Wir fördern bewussten Konsum und geben Kleidung ein zweites Leben.' },
              { icon: '🤝', title: 'Gemeinschaft', desc: 'Ehrenamtliche aus Berlin halten unser Netzwerk am Laufen.' },
            ].map((item) => (
              <GlassCard key={item.title} className="p-5! flex gap-4 items-start">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">ClothCare in Zahlen</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <GlassCard key={stat.label} className="text-center p-6!">
                <div className={`text-4xl font-extrabold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Unser Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <GlassCard key={member.name} className="text-center p-6!">
                <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                <p className="text-white/50 text-sm">{member.role}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="max-w-xl mx-auto py-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Teil der Bewegung werden</h2>
            <p className="text-white/60 mb-6">
              Schließen Sie sich tausenden von Spendern an und helfen Sie, einen Unterschied zu machen.
            </p>
            <Button as="link" to="/donate" size="lg">
              Jetzt Kleidung spenden
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
