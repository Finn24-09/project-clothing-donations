//Keeps ASCII letters, umlauts (ä ö ü Ä Ö Ü ß), spaces, and hyphens.
export function sanitizeName(value: string): string {
  return value.replace(/[^a-zA-ZäöüÄÖÜß \-]/g, '');
}

// Keeps only digit characters 0–9. Use for zip code fields.
export function sanitizeNumeric(value: string): string {
  return value.replace(/\D/g, '');
}

// Strips HTML tags first, then keeps letters (incl. all umlauts), spaces,
// hyphens, and dots.
export function sanitizeStreet(value: string): string {
  const stripped = value.replace(/<[^>]*>/g, '');
  return stripped.replace(/[^a-zA-ZäöüÄÖÜß \-.]/g, '');
}

// Keeps digits, ASCII letters, hyphens, and forward-slashes.
// Handles formats like "12a", "5-7", "3/4". Use for house number fields.
export function sanitizeHouseNumber(value: string): string {
  return value.replace(/[^a-zA-Z0-9\-\/]/g, '');
}
