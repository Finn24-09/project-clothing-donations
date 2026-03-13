import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DonationFormData, HandoverMethod } from "../types/donation";
import {
  sanitizeName,
  sanitizeNumeric,
  sanitizeStreet,
  sanitizeHouseNumber,
} from "../utils/sanitize";
import { validateDonationForm } from "../utils/validate";
import type { DonationFormInput, FormErrors } from "../utils/validate";
import { submitDonation } from "../services/donationService";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";

const CLOTHING_TYPES = [
  "T-Shirts & Hemden",
  "Jacken & Mäntel",
  "Hosen & Röcke",
  "Schuhe",
  "Kinderkleidung",
  "Unterwäsche & Socken",
  "Decken & Bettwäsche",
  "Sonstiges",
];

const CRISIS_AREAS = [
  "Ukraine",
  "Gaza / Palästina",
  "Sudan",
  "Syrien",
  "Marokko",
];

type FormState = DonationFormInput;

const initial: FormState = {
  firstName: "",
  lastName: "",
  clothingType: "",
  crisisArea: "",
  handover: "",
  street: "",
  houseNumber: "",
  zipCode: "",
  country: "",
};

export default function DonatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [strippedFields, setStrippedFields] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  const isPickup = form.handover === "pickup";

  function set(field: keyof FormState, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "handover" && value === "pickup") {
        next.country = "Deutschland";
      }
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleInput(field: keyof FormState, raw: string, sanitized: string) {
    set(field, sanitized);
    if (raw !== sanitized) {
      setStrippedFields((prev) => ({ ...prev, [field]: true }));
      setTimeout(
        () => setStrippedFields((prev) => ({ ...prev, [field]: false })),
        2500,
      );
    }
  }

  function validate(): boolean {
    const e = validateDonationForm(form, isPickup);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const data: DonationFormData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      clothingType: form.clothingType,
      crisisArea: form.crisisArea,
      handover: form.handover as HandoverMethod,
      submittedAt: new Date().toISOString(),
      ...(isPickup && {
        street: form.street.trim(),
        houseNumber: form.houseNumber.trim(),
        zipCode: form.zipCode.trim(),
        country: form.country,
      }),
    };

    await submitDonation(data);
    navigate("/confirm", { state: data });
  }

  return (
    <div className="relative overflow-hidden">
      <div className="blob w-96 h-96 bg-sky-500 -top-32 -right-32" />
      <div className="blob w-72 h-72 bg-indigo-500 bottom-0 -left-20" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Spende registrieren
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ihre Kleiderspende
          </h1>
          <p className="text-white/60">
            Füllen Sie das Formular aus, um Ihre Spende anzumelden. Alle Felder
            sind Pflichtfelder.
          </p>
        </div>

        <GlassCard>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Personal data */}
            <div>
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-sky-500/30 text-sky-400 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                Persönliche Daten
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Vorname"
                  error={errors.firstName}
                  stripped={strippedFields.firstName}
                >
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Max"
                    value={form.firstName}
                    onChange={(e) =>
                      handleInput(
                        "firstName",
                        e.target.value,
                        sanitizeName(e.target.value),
                      )
                    }
                    autoComplete="given-name"
                  />
                </Field>
                <Field
                  label="Nachname"
                  error={errors.lastName}
                  stripped={strippedFields.lastName}
                >
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Mustermann"
                    value={form.lastName}
                    onChange={(e) =>
                      handleInput(
                        "lastName",
                        e.target.value,
                        sanitizeName(e.target.value),
                      )
                    }
                    autoComplete="family-name"
                  />
                </Field>
              </div>
            </div>

            {/* Donation details */}
            <div>
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-sky-500/30 text-sky-400 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                Spendendetails
              </h2>
              <div className="space-y-4">
                <Field label="Art der Kleidung" error={errors.clothingType}>
                  <select
                    className="glass-input"
                    value={form.clothingType}
                    onChange={(e) => set("clothingType", e.target.value)}
                  >
                    <option value="">— Bitte auswählen —</option>
                    {CLOTHING_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Krisengebiet" error={errors.crisisArea}>
                  <select
                    className="glass-input"
                    value={form.crisisArea}
                    onChange={(e) => set("crisisArea", e.target.value)}
                  >
                    <option value="">— Bitte auswählen —</option>
                    {CRISIS_AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Handover */}
            <div>
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-sky-500/30 text-sky-400 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                Übergabe
              </h2>
              <Field label="Übergabemethode" error={errors.handover}>
                <select
                  className="glass-input"
                  value={form.handover}
                  onChange={(e) =>
                    set("handover", e.target.value as HandoverMethod | "")
                  }
                >
                  <option value="">— Bitte auswählen —</option>
                  <option value="office">Abgabe in der Filiale</option>
                  <option value="pickup">Abholung bei mir zuhause</option>
                </select>
              </Field>

              {/* Conditional pickup address */}
              {isPickup && (
                <div className="mt-4 p-4 rounded-xl border border-sky-500/30 bg-sky-500/5 space-y-4">
                  {/* Berlin-only info banner */}
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    <span>
                      Abholung ist nur{" "}
                      <strong className="font-semibold">
                        innerhalb Berlins
                      </strong>{" "}
                      möglich. Bitte geben Sie eine Berliner Postleitzahl an
                      (beginnt mit <strong className="font-semibold">10</strong>
                      , z.&nbsp;B. 10115).
                    </span>
                  </div>

                  <p className="text-sky-300 text-sm font-medium flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    Abholadresse
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Field
                        label="Straße"
                        error={errors.street}
                        stripped={strippedFields.street}
                      >
                        <input
                          type="text"
                          className="glass-input"
                          placeholder="Musterstraße"
                          value={form.street}
                          onChange={(e) =>
                            handleInput(
                              "street",
                              e.target.value,
                              sanitizeStreet(e.target.value),
                            )
                          }
                          autoComplete="street-address"
                        />
                      </Field>
                    </div>
                    <Field
                      label="Nr."
                      error={errors.houseNumber}
                      stripped={strippedFields.houseNumber}
                    >
                      <input
                        type="text"
                        className="glass-input"
                        placeholder="12a"
                        value={form.houseNumber}
                        onChange={(e) =>
                          handleInput(
                            "houseNumber",
                            e.target.value,
                            sanitizeHouseNumber(e.target.value),
                          )
                        }
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="PLZ" error={errors.zipCode}>
                      <input
                        type="text"
                        className="glass-input"
                        placeholder="10115"
                        value={form.zipCode}
                        onChange={(e) =>
                          set("zipCode", sanitizeNumeric(e.target.value))
                        }
                        autoComplete="postal-code"
                        inputMode="numeric"
                        maxLength={5}
                      />
                    </Field>
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-1.5">
                        Land
                      </label>
                      <p className="glass-input text-white/80">Deutschland</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              Spende absenden
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  stripped,
  children,
}: {
  label: string;
  error?: string;
  stripped?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-white/70 text-sm font-medium mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {error}
        </p>
      )}
      {stripped && !error && (
        <p className="mt-1.5 text-amber-400 text-xs flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          Ungültige Zeichen wurden entfernt.
        </p>
      )}
    </div>
  );
}
