import type { HandoverMethod } from '../types/donation';

export interface DonationFormInput {
  firstName: string;
  lastName: string;
  clothingType: string;
  crisisArea: string;
  handover: HandoverMethod | '';
  street: string;
  houseNumber: string;
  zipCode: string;
  country: string;
}

export type FormErrors = Partial<Record<keyof DonationFormInput, string>>;

// Returns true if the zip code is a valid Berlin postal code.
// Berlin zip codes start with "10" and are exactly 5 digits (10000–10999).
export function validateZipCode(zip: string): boolean {
  return /^10\d{3}$/.test(zip);
}

// Validates the full donation form. Returns a map of field → error message.
export function validateDonationForm(
  form: DonationFormInput,
  isPickup: boolean,
): FormErrors {
  const e: FormErrors = {};

  if (!form.firstName.trim()) e.firstName = 'Bitte Vornamen angeben.';
  if (!form.lastName.trim()) e.lastName = 'Bitte Nachnamen angeben.';
  if (!form.clothingType) e.clothingType = 'Bitte eine Kleidungsart auswählen.';
  if (!form.crisisArea) e.crisisArea = 'Bitte ein Krisengebiet auswählen.';
  if (!form.handover) e.handover = 'Bitte eine Übergabemethode auswählen.';

  if (isPickup) {
    if (!form.street.trim()) e.street = 'Bitte Straße angeben.';
    if (!form.houseNumber.trim()) e.houseNumber = 'Bitte Hausnummer angeben.';
    if (!form.zipCode.trim()) {
      e.zipCode = 'Bitte PLZ angeben.';
    } else if (!validateZipCode(form.zipCode)) {
      e.zipCode = 'Bitte eine gültige Berliner PLZ angeben (z. B. 10115).';
    }
    // country is auto-set to 'Deutschland'. No validation needed
  }

  return e;
}
