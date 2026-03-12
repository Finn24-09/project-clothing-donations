import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { DonationFormData } from '../types/donation';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

function addDays(isoString: string, days: number): string {
  const d = new Date(isoString);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-white/10 last:border-0">
      <span className="text-white/50 text-sm sm:w-44 shrink-0">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

export default function ConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as DonationFormData | null;

  useEffect(() => {
    if (!data) navigate('/donate', { replace: true });
  }, [data, navigate]);

  if (!data) return null;

  const isPickup = data.handover === 'pickup';

  return (
    <div className="relative overflow-hidden">
      <div className="blob w-80 h-80 bg-emerald-500 -top-20 right-0" />
      <div className="blob w-72 h-72 bg-sky-500 bottom-0 -left-20" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-4 shadow-lg shadow-emerald-500/20">
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Spende angemeldet!</h1>
          <p className="text-white/60 max-w-md mx-auto">
            Vielen Dank, <strong className="text-white">{data.firstName}</strong>! Ihre Kleiderspende wurde erfolgreich registriert.
            Nachfolgend finden Sie eine Zusammenfassung Ihrer Angaben.
          </p>
        </div>

        <GlassCard>
          {/* Summary rows */}
          <h2 className="text-white font-semibold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Übersicht Ihrer Angaben
          </h2>

          <div className="mt-4">
            <Row label="Name" value={`${data.firstName} ${data.lastName}`} />
            <Row label="Kleidungsart" value={data.clothingType} />
            <Row label="Krisengebiet" value={data.crisisArea} />
            <Row label="Übergabemethode" value={isPickup ? 'Abholung zuhause' : 'Abgabe in der Filiale'} />
            {isPickup && (
              <>
                <Row
                  label="Adresse"
                  value={`${data.street} ${data.houseNumber}, ${data.zipCode} (${data.country})`}
                />
                <div className="py-3 border-b border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                    <span className="text-white/50 text-sm sm:w-44 shrink-0">Voraussichtliche Abholung</span>
                    <div>
                      <span className="text-emerald-400 font-semibold">{addDays(data.submittedAt, 3)}</span>
                      <p className="text-white/40 text-xs mt-0.5">3 Werktage nach Anmeldung</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Row label="Angemeldet am" value={formatDate(data.submittedAt)} />
          </div>

          {/* Info box */}
          <div className="mt-6 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <p className="text-sky-300 text-sm leading-relaxed">
              <strong>Hinweis:</strong> Dies ist eine Spendenanmeldung für ein fiktives Universitätsprojekt.
              Es werden keine echten Daten gespeichert und keine reale Abholung oder Übergabe durchgeführt.
            </p>
          </div>
        </GlassCard>

        <div className="mt-6 text-center">
          <Button as="link" to="/" variant="secondary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    </div>
  );
}
