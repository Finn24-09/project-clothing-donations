import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-sky-500 -top-24 -left-24" style={{ animationDelay: '0s' }} />
      <div className="blob w-80 h-80 bg-indigo-500 top-1/3 -right-20" style={{ animationDelay: '1s' }} />
      <div className="blob w-72 h-72 bg-amber-400 bottom-1/4 left-1/4" style={{ animationDelay: '2s' }} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Universitätsprojekt
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Kleidung spenden.{' '}
                <span className="text-sky-400">Leben verändern.</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Ihre getragene Kleidung kann Menschen in Krisengebieten eine wertvolle Hilfe sein.
                Registrieren Sie Ihre Spende in wenigen Minuten — wir übernehmen den Rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" to="/donate" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Jetzt spenden
                </Button>
                <Button as="link" to="/about" variant="secondary" size="lg">
                  Mehr erfahren
                </Button>
              </div>
            </div>

            {/* Right: Stats card */}
            <div className="flex flex-col gap-4">
              <GlassCard className="text-center">
                <div className="text-5xl font-extrabold text-sky-400 mb-1">12.400+</div>
                <div className="text-white/70 font-medium">Kleidungsstücke gespendet</div>
              </GlassCard>
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="text-center p-5!">
                  <div className="text-3xl font-extrabold text-amber-400 mb-1">8</div>
                  <div className="text-white/60 text-sm">Krisengebiete</div>
                </GlassCard>
                <GlassCard className="text-center p-5!">
                  <div className="text-3xl font-extrabold text-emerald-400 mb-1">45</div>
                  <div className="text-white/60 text-sm">Ehrenamtliche</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">So funktioniert es</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              In drei einfachen Schritten leisten Sie einen wichtigen Beitrag für Menschen in Not.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                  </svg>
                ),
                title: 'Formular ausfüllen',
                desc: 'Geben Sie Ihre persönlichen Daten und die Art der Kleidung an, die Sie spenden möchten.',
              },
              {
                step: '02',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                title: 'Übergabe wählen',
                desc: 'Bringen Sie die Kleidung zu einer unserer Berliner Filialen oder wählen Sie die Abholung bei Ihnen.',
              },
              {
                step: '03',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Bestätigung erhalten',
                desc: 'Sie erhalten eine Bestätigung mit allen Details Ihrer Spendenanmeldung.',
              },
            ].map((item) => (
              <GlassCard key={item.step} className="relative">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <span className="text-sky-400 text-xs font-bold">{item.step}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative px-4 sm:px-6 py-16 mb-4">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Bereit, einen Unterschied zu machen?
            </h2>
            <p className="text-white/60 mb-8">
              Ihre Spende kommt direkt den Bedürftigsten zugute. Starten Sie jetzt — es dauert nur wenige Minuten.
            </p>
            <Button as="link" to="/donate" size="lg">
              Spende registrieren
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
