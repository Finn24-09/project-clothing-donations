export interface NavLink {
  to: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { to: '/', label: 'Startseite' },
  { to: '/donate', label: 'Spenden' },
  { to: '/about', label: 'Über uns' },
  { to: '/locations', label: 'Standorte' },
];
