export type HandoverMethod = 'office' | 'pickup';

export interface DonationFormData {
  firstName: string;
  lastName: string;
  clothingType: string;
  crisisArea: string;
  handover: HandoverMethod;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  country?: string;
  submittedAt: string; // ISO date string
}
